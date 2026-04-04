# Deployment Guide

## Infrastructure Setup and CI/CD Pipeline

---

## Infrastructure Overview

LOP runs on **AWS (Africa/Lagos region — af-south-1)** using a containerized microservices architecture orchestrated by Kubernetes (EKS).

```
AWS af-south-1 (Lagos)
├── EKS Cluster
│   ├── delivery-service (3 replicas)
│   ├── provider-registry (2 replicas)
│   ├── decision-engine (2 replicas)
│   ├── tracking-service (3 replicas)
│   └── notification-service (2 replicas)
├── RDS PostgreSQL (Multi-AZ)
├── ElastiCache Redis
├── MSK (Managed Kafka) — message bus
├── S3 — delivery photos, document storage
├── CloudFront — tracking link CDN
└── API Gateway (Kong on EKS)
```

---

## Prerequisites

Before deploying, ensure you have:
- AWS CLI configured with appropriate IAM credentials
- `kubectl` installed and configured for the EKS cluster
- `helm` v3+ installed
- Docker installed
- Access to the private container registry (AWS ECR)

---

## Environment Setup

### 1. Clone Infrastructure Repository

```bash
git clone https://github.com/agrilink/lop-infrastructure
cd lop-infrastructure
```

### 2. Configure Environment Variables

Copy the environment template and populate values:

```bash
cp .env.example .env.production
```

Required variables:

```bash
# Database
DB_HOST=lop-prod.xxxxx.af-south-1.rds.amazonaws.com
DB_PORT=5432
DB_NAME=lop_production
DB_USER=lop_app
DB_PASSWORD=<from AWS Secrets Manager>

# Redis
REDIS_URL=redis://lop-prod.xxxxx.cache.amazonaws.com:6379

# Message Bus
KAFKA_BROKERS=b-1.lop-prod.xxxxx.kafka.af-south-1.amazonaws.com:9092

# External Services
TWILIO_ACCOUNT_SID=<from Secrets Manager>
TWILIO_AUTH_TOKEN=<from Secrets Manager>
TWILIO_PHONE_NUMBER=+234XXXXXXXXX
FIREBASE_SERVER_KEY=<from Secrets Manager>

# JWT
JWT_SECRET=<from Secrets Manager>
JWT_EXPIRY=3600

# AWS
AWS_REGION=af-south-1
S3_BUCKET_DOCS=lop-provider-documents
S3_BUCKET_PHOTOS=lop-delivery-photos
```

### 3. Initialize Database

```bash
# Run migrations
kubectl exec -it deploy/delivery-service -- npm run migrate

# Seed lookup data (vehicle types, coverage zones)
kubectl exec -it deploy/delivery-service -- npm run seed:prod
```

---

## CI/CD Pipeline

The CI/CD pipeline is managed via **GitHub Actions**. All code merged to `main` triggers an automated deployment to production.

### Pipeline Stages

```
Push to main
    │
    ├── 1. Test
    │       └── Unit tests, integration tests, linting
    │
    ├── 2. Build
    │       └── Docker image built and pushed to ECR
    │
    ├── 3. Staging Deploy
    │       └── Auto-deployed to staging environment
    │
    ├── 4. Smoke Tests
    │       └── End-to-end API tests against staging
    │
    └── 5. Production Deploy (manual approval required)
            └── Rolling update to EKS production cluster
```

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: |
          npm ci
          npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build and push Docker image
        run: |
          aws ecr get-login-password --region af-south-1 | \
            docker login --username AWS --password-stdin $ECR_REGISTRY
          docker build -t $ECR_REGISTRY/lop-delivery-service:$GITHUB_SHA .
          docker push $ECR_REGISTRY/lop-delivery-service:$GITHUB_SHA

  deploy-production:
    needs: [build, smoke-tests]
    runs-on: ubuntu-latest
    environment: production  # requires manual approval
    steps:
      - name: Deploy to EKS
        run: |
          kubectl set image deployment/delivery-service \
            delivery-service=$ECR_REGISTRY/lop-delivery-service:$GITHUB_SHA
          kubectl rollout status deployment/delivery-service
```

---

## Deployment Commands

### Rolling Update (Zero-Downtime)

```bash
# Update a specific service image
kubectl set image deployment/delivery-service \
  delivery-service=<ecr-uri>/lop-delivery-service:<tag>

# Monitor rollout
kubectl rollout status deployment/delivery-service

# Roll back if needed
kubectl rollout undo deployment/delivery-service
```

### Scale a Service

```bash
# Scale delivery-service to 5 replicas
kubectl scale deployment delivery-service --replicas=5
```

### View Logs

```bash
# Tail logs for decision engine
kubectl logs -f deployment/decision-engine

# View logs for a specific pod
kubectl logs -f pod/delivery-service-abc123
```

---

## Monitoring Setup

### Datadog Integration

```bash
# Install Datadog agent via Helm
helm repo add datadog https://helm.datadoghq.com
helm install datadog-agent datadog/datadog \
  --set datadog.apiKey=$DD_API_KEY \
  --set datadog.site=datadoghq.eu
```

### Key Dashboards
- **Delivery Operations** — Volume, assignment times, failure rates
- **Provider Network** — Active providers, acceptance rates, coverage gaps
- **Infrastructure** — CPU, memory, database connections, queue depth
- **Business Metrics** — GMV, commission revenue, new clients

### Alerts (PagerDuty)

| Alert | Threshold | Escalation |
|---|---|---|
| API error rate | >2% of requests | On-call engineer |
| Assignment time p99 | >3 minutes | On-call engineer + Ops lead |
| Database CPU | >80% for 5 minutes | DevOps on-call |
| Failed webhook delivery | >5 in 10 minutes | On-call engineer |

---

## Backup & Recovery

- **Database:** Automated daily snapshots via RDS; 30-day retention; point-in-time recovery enabled
- **S3 objects:** Versioning enabled on all document and photo buckets
- **Recovery Time Objective (RTO):** 4 hours for full platform restoration
- **Recovery Point Objective (RPO):** 1 hour maximum data loss

---

*Last updated: 2025 | [Back to Repository Root](../../README.md)*
