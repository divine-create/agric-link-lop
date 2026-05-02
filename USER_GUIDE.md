# LOP Platform User Guide

## Quick Start

### For Business Clients
1. **Register**: Go to `/register/business` - Complete KYB (Know Your Business) verification
2. **Login**: Access your dashboard at `/dashboard/business`
3. **Create Delivery**: Click "New Dispatch" - Enter pickup/delivery info, select carrier
4. **Track**: Monitor deliveries in real-time at `/track/:id`
5. **Manage**: View all orders at `/deliveries`, manage wallet at `/wallet`

### For Logistics Providers
1. **Register**: Go to `/register/provider` - Submit NIN, vehicle docs, bank details
2. **Login**: Access provider dashboard at `/dashboard/provider`
3. **Accept Jobs**: View available jobs, accept/decline within 60 seconds
4. **Deliver**: Update status as you progress through delivery steps
5. **Earnings**: Track earnings and request payouts at `/earnings`

### For Admins
1. **Login**: Access admin dashboard at `/dashboard/admin`
2. **Manage**: Oversee all users, providers, and deliveries
3. **Configure**: Set pricing zones, manage disputes, view analytics

---

## Key Features

### Business Portal
- **Dashboard** (`/dashboard/business`): View stats, active shipments, wallet balance
- **New Delivery** (`/new-delivery`): Create single or bulk deliveries
- **Deliveries** (`/deliveries`): Track all orders with filters
- **Templates** (`/templates`): Save frequently used delivery configs
- **Analytics** (`/analytics`): Performance reports, spend analysis
- **Wallet** (`/wallet`): Fund wallet, view transactions
- **COD Management** (`/cod`): Track cash-on-delivery orders
- **Subscriptions** (`/subscriptions`): Manage pricing plans
- **Invoices** (`/invoices`): Download PDF invoices with VAT

### Provider Portal
- **Dashboard** (`/dashboard/provider`): View jobs, earnings, performance
- **Performance** (`/performance`): Ratings, badges, tier progress
- **Fleet Management** (`/fleet`): Manage sub-drivers (fleet owners)

### Tracking
- **Public Tracking** (`/public-track/:id`): No-login tracking for recipients
- **Authenticated Tracking** (`/track/:id`): Full tracking with timeline

### Notifications
- **Notification Center** (`/notifications`): View all alerts, mark read/unread
- **Preferences**: Configure email/SMS/in-app notifications

---

## Delivery Workflow

### Creating a Delivery (Business)
1. **Route**: Enter pickup & delivery addresses
2. **Package**: Select category, weight, dimensions, special handling
3. **Carrier**: Choose from available providers (sorted by rating/price)
4. **Confirm**: Review details, accept terms, confirm dispatch

### Provider Job Flow
1. **Receive**: Get notified of new job with 60-second response window
2. **Accept/Decline**: Accept to begin or decline with reason
3. **Execute**: Update status (En Route → At Pickup → Collected → In Transit → Delivered)
4. **Complete**: Capture proof of delivery (photo/signature/PIN)

---

## Account Tiers

### Business Plans
- **Starter**: Pay-per-delivery, basic features
- **Growth**: Volume discounts (10-20%), priority support, bulk upload
- **Enterprise**: Custom pricing, dedicated manager, white-label options

### Provider Tiers
- **Bronze**: New providers, standard jobs
- **Silver**: Good performance, priority jobs
- **Gold**: Excellent rating, highest pay, exclusive zones
- **Platinum**: Top performers, max benefits

---

## Tips

### For Businesses
- Save frequent routes as **Templates** for quick re-ordering
- Use **Bulk Upload** for 100+ deliveries at once
- Monitor **COD collections** to ensure timely remittance
- Check **Analytics** to optimize delivery spend

### For Providers
- Maintain >98% completion rate for tier upgrades
- Respond to jobs within 30 seconds for better ratings
- Use in-app navigation for optimal routing
- Keep vehicle and documents up-to-date

### For Everyone
- Enable **2FA** for account security
- Check **Notifications** regularly for updates
- Contact support via the help button in tracking pages

---

## Emergency Contacts
- **Support Call**: +234 800 000 0000
- **Support Email**: support@agrilink.ng
- **Emergency**: Use in-app support button on tracking pages
