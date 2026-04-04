# Legal & Compliance

## Regulatory Requirements and Legal Framework

> **Disclaimer:** This document is for internal planning purposes only and does not constitute legal advice. LOP should retain qualified Nigerian legal counsel before commencing operations.

---

## Legal Structure

### Recommended Entity Type
**Private Limited Company (Ltd)** registered with the Corporate Affairs Commission (CAC) of Nigeria.

### Registration Requirements
- Minimum of 2 directors (at least one must be Nigerian resident)
- Memorandum and Articles of Association
- Registered office address in Nigeria
- Share capital (minimum ₦100,000 for a private company)
- Tax Identification Number (TIN) from FIRS
- CAC registration certificate

### Recommended Name
**LOP Technologies Limited** or **AgriLink Logistics Technologies Limited**

---

## Regulatory Landscape

### Federal Regulators

| Regulator | Relevance | Requirement |
|---|---|---|
| **Corporate Affairs Commission (CAC)** | Company registration | Register as a private limited company |
| **Federal Inland Revenue Service (FIRS)** | Taxation | Register for VAT, CIT, WHT; file monthly and annual returns |
| **Central Bank of Nigeria (CBN)** | Payment flows | Ensure payment processing partners hold appropriate CBN licenses |
| **National Information Technology Development Agency (NITDA)** | Data protection | Comply with Nigeria Data Protection Act (NDPA) 2023 |
| **Federal Competition and Consumer Protection Commission (FCCPC)** | Platform/marketplace rules | Comply with marketplace transparency and consumer protection rules |

### State-Level Considerations
- Some states require additional business permits or levy local taxes on commercial operations
- Lagos State: Lagos State Internal Revenue Service (LIRS) registration required for operations in Lagos
- Rivers State: State-level business permit for operations in Port Harcourt

---

## Data Protection Compliance

### Nigeria Data Protection Act (NDPA) 2023

LOP collects and processes personal data from providers (drivers) and end recipients. Key obligations:

**Data Inventory — Personal Data Collected:**
- Provider: Full name, phone, ID number, bank account, GPS location
- Recipient: Name, phone, delivery address
- Client: Company name, contact details, API credentials

**NDPA Obligations:**

| Obligation | LOP Action Required |
|---|---|
| Lawful basis for processing | Document consent and legitimate interest bases for each data category |
| Privacy policy | Publish a clear privacy policy on the platform and provider app |
| Data subject rights | Build mechanisms for data access, correction, and deletion requests |
| Data breach notification | Notify NDPC within 72 hours of a reportable breach |
| Data retention limits | Define and enforce retention periods (see [Tracking & Visibility](../operations/tracking.md)) |
| Cross-border transfers | Implement appropriate safeguards if data is processed outside Nigeria |

**NDPC Registration:** LOP must register with the Nigeria Data Protection Commission (NDPC) as a data controller.

---

## Financial & Tax Compliance

### Value Added Tax (VAT)
- Nigerian VAT rate: **7.5%**
- LOP's commission revenue is subject to VAT
- Register for VAT with FIRS; file monthly VAT returns
- Issue VAT-compliant invoices to clients

### Company Income Tax (CIT)
- Standard CIT rate: **30%** (companies with turnover >₦100M)
- Small company rate: **0%** (turnover <₦25M); **20%** (₦25M–₦100M)
- Annual CIT returns due 6 months after fiscal year end

### Withholding Tax (WHT)
- Payments to logistics providers (individuals) may be subject to WHT at **5–10%**
- LOP must deduct, remit to FIRS, and issue WHT credit notes to providers
- Consult tax counsel on exact treatment of platform-to-provider payments

### Transfer Pricing
- If LOP has related-party transactions (e.g., with AgriLink), maintain transfer pricing documentation per FIRS regulations

---

## Provider Legal Framework

### Provider Agreement
All logistics providers must sign a **Provider Service Agreement** before onboarding. Key clauses:

- **Independent contractor status** — Providers are not employees of LOP; LOP has no employer obligations (pension, health insurance, PAYE)
- **Platform rules compliance** — Providers agree to LOP's code of conduct, performance standards, and dispute resolution process
- **Payment terms** — Weekly settlement schedule; grounds for withholding payment
- **Termination** — LOP's right to suspend or terminate providers for cause
- **Liability** — Provider's liability for lost or damaged goods; LOP's limited liability
- **Data consent** — Provider consents to GPS tracking and performance monitoring

### Vehicle & Driver Compliance
LOP verifies but is not responsible for ensuring providers maintain:
- Valid driver's license
- Vehicle roadworthiness certificate (FRSC)
- Third-party vehicle insurance
- State-level commercial transport permits (where applicable)

Provider Agreement requires providers to self-certify ongoing compliance.

---

## Client Legal Framework

### Client Service Agreement
All platform clients sign a **Client Service Agreement** covering:

- API access terms and acceptable use
- SLA commitments and remedies for breach
- Commission structure and payment terms
- Liability cap (LOP's liability limited to fees paid in the prior 3 months)
- Data sharing and privacy obligations
- Termination and offboarding

---

## Intellectual Property

- All platform software, algorithms, and documentation are the **proprietary IP of LOP Technologies Limited**
- Provider and client agreements include IP assignment clauses for any platform-related contributions
- The LOP name, logo, and brand elements should be trademarked with the Nigerian Trademarks Registry

---

## Insurance Recommendations

| Insurance Type | Purpose | Priority |
|---|---|---|
| Professional Indemnity | Coverage for errors or omissions in platform services | High |
| Cyber Liability | Coverage for data breaches and cyber incidents | High |
| Directors & Officers (D&O) | Protection for leadership against claims | Medium |
| Goods in Transit (optional) | Coverage for client goods lost or damaged in transit | Low (can be offered as premium add-on) |

---

## Compliance Calendar

| Month | Action |
|---|---|
| Month 1 | CAC registration, TIN registration, open corporate bank account |
| Month 1 | Draft and execute Provider Agreement template |
| Month 1 | Draft and execute Client Service Agreement |
| Month 2 | NDPC registration, publish privacy policy |
| Month 2 | VAT registration with FIRS |
| Month 3 | First VAT return filed |
| Month 6 | Review WHT treatment with tax counsel |
| Month 12 | First annual CIT return |
| Ongoing | Monthly VAT and WHT returns |

---

*Last updated: 2025 | [Back to Repository Root](../../README.md)*
