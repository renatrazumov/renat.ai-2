# Recommended Connect integration — timber.bid

## Decision summary

| Decision | Choice |
| --- | --- |
| Business | Marketplace (firewood + tree services) with delivery-gated payout |
| Accounts API | `/v2/core/accounts` (no legacy `type`) |
| Dashboard | Express (lightweight view for sellers) |
| Fee collection | Your platform manages pricing |
| Negative balance liability | Your platform |
| Charge pattern | Separate charges and transfers |
| Onboarding | Embedded components |
| Secondary flow | Platform Billing for Pro ($99/mo) — not Connect |

---

## Recommended Connect integration

### A. Account configuration

Accounts API: `/v2/core/accounts`  
Legacy account `type`: not used  
Dashboard: Express (lightweight view for sellers)  
Fee collection: your platform manages pricing (`fees_collector: "application"`)  
Negative balance liability: your platform (`losses_collector: "application"`)

These settings fit a marketplace where timber.bid owns checkout, takes published marketplace fees, and must reverse transfers when disputes or failed deliveries hit after funds moved. Express keeps onboarding light for local firewood sellers and tree companies without giving them full independent Stripe Dashboard access.

Each connected account needs recipient configuration (`configuration.recipient`) with `stripe_transfers` on `stripe_balance` requested, so the account can receive transfers from the platform. Marketplace connected accounts should **not** request merchant configuration or `card_payments` for this flow — that lengthens onboarding and is unnecessary when the platform is merchant of record.

### B. Charge pattern: separate charges and transfers

timber.bid authorizes payment at checkout and releases funds only after delivery confirmation. Destination charges transfer immediately and cannot hold platform-side funds until a delivery trigger. Separate charges and transfers keep the charge on the platform, then you transfer the seller net after confirmation (or reverse / refund before transfer if the job fails).

Use **transfer math** (charge amount minus buyer fee minus seller fee minus estimated Stripe processing) — do **not** use `application_fee_amount` with separate charges and transfers.

### C. Seller / provider onboarding flow

Onboarding method: embedded

Sellers already “Connect your Stripe account” in-product. Embedded onboarding keeps KYC inside timber.bid (mobile + web) instead of a full Stripe-hosted redirect, which matches a local-services marketplace UX.

Flow:

1. Seller signs up and completes profile (business, location, services).
2. Platform creates a v2 account with Express dashboard + platform fee/loss responsibilities + recipient config.
3. Seller completes `account_onboarding` embedded component (identity, bank).
4. Platform gates live payouts until `stripe_transfers` (and payouts) capabilities are `active`.
5. Ongoing: show `notification_banner` when Stripe adds requirements; block new payouts until remediated.

### D. Payments dashboard access for sellers

Connected accounts access the Express dashboard through platform-generated Express login links. Prefer in-app embedded components (`account_management`, `payouts`, `payments`) for day-to-day balance and payout views so sellers stay inside timber.bid.

### E. Embedded components

Recommended [Connect embedded components](https://docs.stripe.com/connect/supported-embedded-components):

- `account_onboarding`
- `notification_banner` (required; keeps accounts healthy as requirements evolve)
- `account_management`
- `payments` (note: separate charges show reduced payment/dispute detail vs direct)
- `payouts`
- `balance_report` / `payout_reconciliation_report` (ops / admin reconciliation)

### F. Webhook integration

Use webhooks for reliable payment confirmation, especially for async payment methods. Always verify incoming webhook signatures before processing event data ([webhook signature verification](https://stripe.com/docs/webhooks/signatures)). Specific events and implementation details belong in the Connect build step.

### G. Onboarding status gating

Verify capability statuses with `stripe.v2.core.accounts.retrieve(id)` before enabling transfers/payouts:

- `configuration.recipient.capabilities.stripe_balance.stripe_transfers.status === 'active'`
- Also confirm payouts capability in the recipient subtree

Only enable “accept orders / receive payout” when those are active.

### H. Fee structure

- Platform fee model: **tiered + split** (published on timber.bid/pricing)
  - Buyer: **8%** on the first $2,500, then **4%**
  - Seller: **2.5%** (Pro sellers **1%**)
  - No fee stacking: a job never pays both a lead credit fee and a marketplace fee
- `application_fee_amount` strategy: **N/A for separate charges** — retain margin by transferring less than the captured amount (`applicationFeeIncludes` equivalent: include estimated Stripe processing in what the platform keeps so net margin stays intact)
- Check regional card rates at [stripe.com/pricing](https://stripe.com/pricing). Monitor the [margin report](https://docs.stripe.com/connect/margin-reports.md). Optional: [Platform Pricing Tool](https://dashboard.stripe.com/settings/connect/platform_pricing) if you later move some flows to destination charges (mutually exclusive with explicit `application_fee_amount`).

Example funds flow (illustrative $1,000 firewood order, non-Pro seller):

```
Buyer pays $1,000 (+ buyer fee collected at checkout per your pricing UX)
         │
         ▼
  ┌───────────────┐
  │  timber.bid   │ ─── captures charge; holds until delivery confirm
  └──────┬────────┘
         │ after delivery: transfer seller net
         │ (= order − buyer fee − seller fee − Stripe processing estimate)
         ▼
  ┌───────────────┐
  │     Seller    │ ─── receives remainder to Stripe balance → bank payout
  └───────────────┘
```

Combined take (~10.5% on the first $2,500 band before processing) is generally above standard card processing, but still size `transfer` amounts so Stripe fees do not erase platform margin on small tickets.

### I. SaaS monetization

timber.bid runs **both**:

1. **Marketplace transaction fees** (above) via Connect separate charges and transfers.
2. **Pro subscription** — $99/mo ($990/yr) billed to tree companies via **standard Stripe Billing / Checkout on the platform account** (not Connect). Use a normal Customer + Subscription on timber.bid’s Stripe account.

Do **not** use `customer_account` Connect SaaS billing for Pro unless you later bill connected accounts as the subscription customer of record through Connect’s v2 subscription path. Today’s Pro checkout can stay simple platform Billing.

Lead credits (coming soon) can be prepaid credits or one-off Checkout on the platform account; keep them off Connect until you define connected-account billing.

### J. Implementation plan

1. **Platform Stripe account** — enable Connect; configure brand, Radar for Platforms, platform profile.
2. **Accounts v2** — create sellers with Express + `fees_collector`/`losses_collector` = application + recipient capabilities.
3. **Embedded onboarding** — ship `account_onboarding` + `notification_banner` in seller app.
4. **Checkout** — PaymentIntent/Checkout Session on the platform; authorize or capture per product rules; store `payment_intent` ↔ order mapping.
5. **Delivery release** — on confirm (or timeout policy), `transfers.create` seller net; on cancel/dispute before transfer, refund from platform.
6. **Webhooks + gating** — payment success, transfer failures, account requirement updates; gate payouts on capability status.
7. **Pro Billing** — separate Checkout/Billing products for Pro; webhook `invoice.paid` → Pro entitlements in Supabase.
8. **Go-live** — test mode E2E (order → hold → deliver → transfer → payout); dispute/refund drills; live restricted key (RAK); go-live checklist.

### K. Risk and liability

- Negative balance liability owner: **your platform**
- Risk controls owner: **your platform** (merchant of record) with Stripe Radar for Platforms enabled

When a customer disputes after you transferred to a seller, Stripe can debit the platform. Platform-owned negative balance liability lets connected-account balances go negative so you can reverse transfers and recover. Without that, losses stick on the platform with weaker recovery.

### L. Why this fits your business

- Schema.org and docs describe a **marketplace** with Stripe Connect escrow-style hold until delivery.
- Checkout is platform-branded; sellers receive payouts after confirmation — platform is merchant of record.
- Published buyer/seller fee splits map cleanly to transfer math.
- Express + embedded onboarding matches local sellers who need bank payouts without full Stripe ops overhead.
- Pro is a second monetization rail and should stay on platform Billing to avoid hybrid Connect complexity on day one.

### M. Open questions

- Exact authorize-vs-capture timing today (auth hold vs immediate capture + delayed transfer).
- Whether tree-service jobs and firewood orders share one order/payment pipeline.
- Target net margin after Stripe fees (drives how aggressively you bake processing into retained amount).
- Whether any sellers already have Stripe accounts that must be linked (OAuth) vs greenfield embedded only.

---

## Sources

- https://timber.bid
- https://timber.bid/pricing
- https://timber.bid/about
- https://timber.bid/docs
- https://timber.bid/onboarding
