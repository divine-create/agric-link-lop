# LOP Platform Navigation Flow

## Individual User Flow
```
Landing Page (/) 
    ↓
Login (/login) → Select "Casual Shipping" → (/dashboard/individual)
    ↓
Individual Dashboard (/dashboard/individual)
    ├→ Send a Package → (/new-delivery) → Step 1-4 → (/confirm-dispatch) → Deploying → Success
    │                                                        ↓
    │                                              (/track/:id) or (/dashboard/individual)
    ├→ Track Parcel → (/track/DEMO) or enter ID → (/track/:id) 
    ├→ My Deliveries → (/deliveries) → Click order → (/track/:id)
    ├→ Wallet → (/wallet) → Top up → (/topup)
    ├→ Notifications → (/notifications)
    └→ Settings → (/settings)
```

## Business User Flow
```
Landing Page (/) 
    ↓
Register (/register/business) → Complete KYB → Approve → (/dashboard/business)
    ↓
Business Dashboard (/dashboard/business)
    ├→ New Dispatch → (/new-delivery) → Step 1-4 → (/confirm-dispatch) → Deploying → Success
    │                                                        ↓
    │                                              (/track/:id) or (/dashboard/business)
    ├→ Templates → (/templates) → Create/Use template → (/new-delivery)
    ├→ Deliveries → (/deliveries) → Click order → (/track/:id)
    ├→ Analytics → (/analytics)
    ├→ COD Management → (/cod)
    ├→ Subscriptions → (/subscriptions) → Upgrade
    ├→ Invoices → (/invoices) → Download PDF
    ├→ Notifications → (/notifications)
    ├→ Wallet → (/wallet) → Top up → (/topup)
    └→ Settings → (/settings)
```

## Provider User Flow
```
Landing Page (/) 
    ↓
Register (/register/provider) → Complete verification → Approve → (/dashboard/provider)
    ↓
Provider Dashboard (/dashboard/provider)
    ├→ Accept Haul → (/accept-haul/:id) → Confirm → (/live-dispatch/:id)
    │                                                        ↓
    │                                    Update status → Complete → (/delivery-complete/:id)
    ├→ Job Feed → (/dashboard/provider) - View all jobs
    ├→ Deliveries → (/deliveries) → Click job → (/track/:id)
    ├→ Earnings → (/earnings) → Withdraw
    ├→ Performance → (/performance) → View badges/tiers
    ├→ Fleet Management → (/fleet) [Fleet owners only]
    └→ Notifications → (/notifications)
```

## Admin User Flow
```
Landing Page (/) 
    ↓
Login (/login) → Select "System Admin" → (/dashboard/admin)
    ↓
Admin Dashboard (/dashboard/admin)
    ├→ System Pulse → (/dashboard/admin)
    ├→ Corridor Mesh → (/dashboard/routes)
    ├→ Entity Registry → (/dashboard/admin) - Manage users
    ├→ Dispatch Flow → (/analytics)
    ├→ Financial Core → (/dashboard/admin) - Manage finance
    └→ Notifications → (/notifications)
```

## Public (No Login) Flow
```
Public Tracking (/public-track/:id) → View delivery status, ETA, provider info
```

## Key Navigation Patterns

### DashboardLayout Sidebar Links:
- **Business**: Dashboard | Deliveries | Templates | Analytics | COD | Subscriptions | Invoices | Notifications | Wallet | Settings
- **Provider**: Job Feed | Deliveries | Earnings | Performance | Fleet | Notifications  
- **Individual**: Dashboard | My Deliveries | Wallet | Track Parcel | Notifications | Settings
- **Admin**: System Pulse | Corridor Mesh | Entity Registry | Dispatch Flow | Financial Core | Notifications

### Common Cross-Links:
- Any tracking page (`/track/:id`) can be accessed from: Deliveries, Dashboard, Email/SMS links
- Public tracking (`/public-track/:id`) is for recipients via shared links
- New Delivery (`/new-delivery`) is accessible from Business & Individual dashboards
- Notifications (`/notifications`) is in all dashboard sidebars

### Auth Flow:
1. **New User**: Landing (/) → Register (/register/business or /register/provider) → Login (/login) → Dashboard
2. **Existing User**: Landing (/) → Login (/login) → Select Persona → Dashboard

### External Integrations:
- **API Docs**: (/docs) - For developers
- **Pricing**: (/pricing) - Public pricing page
- **Subscriptions**: (/subscriptions) - Business plan management

---

## Page Status Checklist

✅ **Core Pages**:
- [x] Landing Page (/)
- [x] Login Page (/login)
- [x] Business Registration (/register/business)
- [x] Provider Registration (/register/provider)
- [x] Business Dashboard (/dashboard/business)
- [x] Provider Dashboard (/dashboard/provider)
- [x] Individual Dashboard (/dashboard/individual)
- [x] Admin Dashboard (/dashboard/admin)

✅ **Feature Pages**:
- [x] New Delivery (/new-delivery)
- [x] Dispatch Confirmation (/confirm-dispatch)
- [x] Accept Haul (/accept-haul/:id)
- [x] Live Dispatch (/live-dispatch/:id)
- [x] Delivery Complete (/delivery-complete/:id)
- [x] Delivery Tracking (/track/:id)
- [x] Public Tracking (/public-track/:id)
- [x] Deliveries List (/deliveries)
- [x] Delivery Templates (/templates)
- [x] COD Management (/cod)
- [x] Fleet Management (/fleet)
- [x] Performance (/performance)
- [x] Analytics (/analytics)
- [x] Notifications (/notifications)
- [x] Wallet (/wallet)
- [x] Topup (/topup)
- [x] Subscriptions (/subscriptions)
- [x] Invoices (/invoices)
- [x] Settings (/settings)
- [x] API Docs (/docs)
- [x] Pricing (/pricing)

✅ **All pages are connected and navigable!**
