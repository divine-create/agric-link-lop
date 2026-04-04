# Technical Architecture

## System Design and Technology Stack

---

## Architectural Overview

LOP is designed as an **API-first, event-driven platform** built on a microservices architecture. The system is designed for high availability, horizontal scalability, and rapid provider/client integration.

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│   AgriLink Platform │ E-Commerce Apps │ SME Portals │ Web UI   │
└───────────────────────────┬─────────────────────────────────────┘
                            │ REST / WebSocket
┌───────────────────────────▼─────────────────────────────────────┐
│                       API GATEWAY                               │
│          Auth │ Rate Limiting │ Routing │ Load Balancing        │
└──────┬────────┬───────────┬────────────┬───────────┬────────────┘
       │        │           │            │           │
┌──────▼──┐ ┌──▼──────┐ ┌──▼──────┐ ┌──▼──────┐ ┌──▼──────────┐
│Delivery │ │Provider │ │Decision │ │Tracking │ │Notification │
│Service  │ │Registry │ │Engine   │ │Service  │ │Service      │
└──────┬──┘ └──┬──────┘ └──┬──────┘ └──┬──────┘ └─────────────┘
       │        │           │            │
┌──────▼────────▼───────────▼────────────▼────────────────────────┐
│                     MESSAGE BUS (Event Queue)                   │
└──────────────────────────────┬──────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────┐
│                      DATA LAYER                                 │
│   PostgreSQL (primary) │ Redis (cache) │ TimescaleDB (tracking) │
└─────────────────────────────────────────────────────────────────┘
```

---

## Core Services

### 1. API Gateway
- **Role:** Single entry point for all external requests
- **Responsibilities:** Authentication (JWT), rate limiting, request routing, TLS termination
- **Technology:** Kong or AWS API Gateway

### 2. Delivery Service
- **Role:** Manages the full lifecycle of a delivery request
- **Responsibilities:** Request intake, status management, SLA tracking, dispute handling
- **Technology:** Node.js / TypeScript

### 3. Provider Registry
- **Role:** Maintains the directory of all logistics providers on the platform
- **Responsibilities:** Provider profiles, availability status, geographic coverage, performance scores
- **Technology:** Node.js / TypeScript + PostgreSQL

### 4. Decision Engine
- **Role:** Core matching and optimization logic (see [Decision Engine Spec](decision-engine.md))
- **Responsibilities:** Provider scoring, assignment, cost optimization, load balancing
- **Technology:** Python (for ML components) + Node.js (for orchestration)

### 5. Tracking Service
- **Role:** Aggregates and serves real-time location and delivery status data
- **Responsibilities:** GPS ingestion from provider apps, status event processing, customer-facing tracking links
- **Technology:** Node.js + TimescaleDB (time-series optimized)

### 6. Notification Service
- **Role:** Delivers delivery updates to all stakeholders
- **Responsibilities:** SMS, push notifications, webhooks, email alerts
- **Technology:** Node.js + Twilio (SMS) + Firebase (push)

---

## Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| Backend services | Node.js / TypeScript | Fast development, strong async I/O performance |
| Decision engine (ML) | Python (FastAPI) | Rich ML ecosystem (scikit-learn, XGBoost) |
| Primary database | PostgreSQL | ACID compliance, strong relational model |
| Cache layer | Redis | Low-latency provider availability lookups |
| Time-series data | TimescaleDB | Optimized for GPS tracking and event data |
| Message queue | RabbitMQ / AWS SQS | Reliable async event delivery between services |
| API Gateway | Kong | Open-source, extensible, battle-tested |
| Mobile (provider app) | React Native | Single codebase for iOS and Android |
| Infrastructure | AWS (Lagos region) | Low-latency for Nigerian users, compliance |
| Container orchestration | Kubernetes (EKS) | Scalable, self-healing service deployment |
| CI/CD | GitHub Actions | Automated testing and deployment pipelines |
| Monitoring | Datadog + PagerDuty | Observability and incident alerting |

---

## Data Flow: Delivery Request Lifecycle

```
1. Client (AgriLink) submits delivery request via REST API
   POST /v1/deliveries
   { pickup, dropoff, packageType, urgency, callbackUrl }

2. Delivery Service creates delivery record (status: PENDING)
   → Publishes `delivery.requested` event to message bus

3. Decision Engine consumes event
   → Queries Provider Registry for eligible providers
   → Scores and selects best provider
   → Publishes `delivery.assigned` event

4. Notification Service consumes `delivery.assigned`
   → Sends push notification to provider app
   → Sends webhook to client's callbackUrl

5. Provider accepts via mobile app
   → Delivery status transitions: PENDING → ASSIGNED → IN_TRANSIT

6. Tracking Service ingests GPS pings from provider app
   → Customer-facing tracking link updated in real-time

7. Provider marks delivery complete
   → Status transitions to DELIVERED
   → Notification Service alerts client and recipient
   → Performance data written to analytics store
```

---

## Security Architecture

- **Authentication:** JWT tokens with short expiry + refresh token rotation
- **Authorization:** Role-based access control (RBAC) — client, provider, admin roles
- **Data encryption:** TLS 1.3 in transit, AES-256 at rest
- **API security:** Rate limiting, IP allowlisting for enterprise clients, request signing
- **PII handling:** Driver location data retained for 30 days then anonymized

---

## Scalability Design

- **Stateless services:** All services are horizontally scalable with no shared state
- **Database read replicas:** Read-heavy operations (provider lookup, status checks) routed to replicas
- **Caching strategy:** Provider availability and geographic data cached in Redis with 30-second TTL
- **Geographic sharding:** As platform expands to new regions, services can be deployed regionally to reduce latency

---

## Monitoring & Alerting

| Metric | Alert Threshold |
|---|---|
| API response time (p99) | > 500ms |
| Delivery assignment time | > 2 minutes |
| Failed delivery rate | > 5% |
| Provider app crash rate | > 1% |
| Database connection pool | > 80% utilization |

---

*Last updated: 2025 | [Back to Repository Root](../../README.md)*
