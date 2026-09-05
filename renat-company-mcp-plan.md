# Renat company MCP + product plan

Owner: Renat Razumov (`renatrazumov@protonmail.com`)  
Repo context: `renat.ai-2` (AGI assistant scaffold)  
Date: 2026-09-05

## Verdict

**Start with timber.bid for Stripe Connect and payments MCP.**  
**renat.ai is your Personal OS** (companies + lifestyle) — see [`renat-ai-os-brief.md`](./renat-ai-os-brief.md). It orchestrates ventures; it is not Connect.

---

## Company map

| Company | Model | Payments need | Priority for this agent |
| --- | --- | --- | --- |
| **timber.bid** | Marketplace (firewood, tree services) + Pro SaaS | **Stripe Connect** (hold until delivery) + platform Billing for Pro | **P0 — start here** |
| **renat.ai** | **Personal OS** — private command center for all companies + designer lifestyle | Standard Stripe only if you later productize; no Connect | **P1 — OS build** |
| **razu.mov** | Elite performance & leadership coaching (Providence, RI) | Standard Checkout / Payment Links / Billing for packages — **not Connect** | **P1 — coaching revenue** |
| **renatrazumov.com** | Personal brand hub (ventures + “Book a Consultation” + Limitless Alignment waitlist) | Usually no Connect; link-outs + simple Checkout/calendar booking | **P2 — hub / funnel** |
| **Flowstake.com** | Fitness stake / prediction-style | Crypto + possibly fiat rails later | P2 |
| **DevStudio.Pro** | Agency / services | Invoices / Checkout (standard Stripe) | P2 |
| **CustomComputer.io** | Hardware retail | Standard Checkout | P3 |
| **RoomMining.io** | Mining infra | Hardware / deposits — standard Stripe or wire | P3 |
| **MasterMindRoom.org** | Mastermind / networking events | Checkout or Payment Links | P3 |

### Notes on the two personal domains

**[razu.mov](https://razu.mov)** — Coaching brand (“Elite Performance & Leadership Coaching”). Schema lists ProfessionalService in Providence, RI; contact `rrazumov@gmail.com`. Money flow is **you → client** (sessions, retainers, programs). Use **standard Stripe** (Payment Links, Checkout, or Billing). No connected accounts unless you later pay affiliate coaches.

**[renatrazumov.com](https://renatrazumov.com)** — Founder portfolio: Flowstake, Timber.bid, DevStudio.Pro, CustomComputer.io, Limitless Alignment waitlist, “Book a Consultation.” Treat as the **top-of-funnel hub**, not a payment platform. Best pattern: calendar booking + optional deposit Checkout, with CTAs into timber.bid / razu.mov / Flowstake. MCP fit: Google Calendar + Gmail for consults; Stripe only if deposits live on this domain.

---

## MCP connection status (this Cloud Agent)

Interactive MCP login **cannot** run in Cloud Agents. Authenticate each server in **Cursor desktop** (Settings → MCP), then re-run tools here.

| MCP | Status | Use for Renat |
| --- | --- | --- |
| **Stripe** | needsAuth | timber.bid Connect + Pro Billing; later DevStudio/CustomComputer |
| **Gmail** | needsAuth | renat.ai inbox actions; timber.bid support ops |
| **Google Calendar** | needsAuth | renat.ai scheduling; job/estimate windows |
| **Google Drive** | needsAuth | renat.ai docs; timber.bid claim packages |
| **Link** | needsAuth | Personal wallet / test purchases |
| **GitHub** | error | Repo/ops — fix connection in desktop |
| cursor-cloud / subscriptions | ready | Agent diagnostics only |

### Auth checklist (desktop)

1. Open Cursor desktop → MCP → authenticate **Stripe** with the **timber.bid** Stripe account (platform account that will own Connect).
2. Authenticate **Gmail**, **Google Calendar**, **Google Drive** with the Google account you want renat.ai / ops to use.
3. Optionally authenticate **Link** for checkout testing.
4. Reconnect **GitHub** if you want PR/issue tools from MCP.
5. Ping this agent again: “Stripe MCP connected — inspect timber.bid account.”

One Stripe MCP session = **one** Stripe account at a time. For multiple companies, switch account in Stripe MCP settings when you change focus, or use separate Cursor profiles / restricted keys per company.

---

## Best plan for timber.bid (P0)

See full Connect recommendation: [`connect-recommend-plan.md`](./connect-recommend-plan.md)

Short version:

- Accounts v2, Express dashboard, platform fee + negative-balance liability
- **Separate charges and transfers** (payment held until delivery confirm)
- Embedded onboarding + `notification_banner`
- Marketplace fees from pricing page (buyer 8%/4%, seller 2.5%/1% Pro)
- Pro $99/mo on **platform Billing**, not Connect

After Stripe MCP is authenticated, next agent steps: list products/customers, verify Connect settings, draft build checklist against live account.

---

## Best plan for renat.ai (P1) — Personal OS

Full brief: [`renat-ai-os-brief.md`](./renat-ai-os-brief.md)

**Positioning:** private command center for all companies + designer lifestyle — not a public chat demo, not Connect.

1. **Phase 0** — You-only auth, company/lifestyle workspaces, memory, Netlify AI Gateway (no browser API keys).
2. **Phase 1** — Gmail + Calendar + Drive; morning brief; draft-and-approve actions.
3. **Phase 2** — Stripe read-only digests per company (start timber.bid); razu.mov coaching pipeline.
4. **Keep Connect in timber.bid** — renat.ai oversees; it does not host marketplace checkout.
5. **Productize later** (optional) — founder OS template only after you live on it daily.

---

## Best plan for razu.mov (P1)

Elite coaching site — **you are the merchant**, clients pay you. No Connect.

1. Stripe Payment Links or Checkout for session packages / retainers / Limitless Alignment.
2. Google Calendar + Gmail MCP for booking and follow-up (same Google auth as renat.ai ops).
3. Optional: Stripe Billing if you sell monthly coaching memberships.
4. Keep branding on razu.mov; funnel “Book a Consultation” from renatrazumov.com here or to Calendar.

## Best plan for renatrazumov.com (P2)

Personal hub — **not a payment platform**.

1. CTAs → timber.bid, Flowstake, DevStudio, CustomComputer, razu.mov.
2. “Book a Consultation” → Calendar (Cal.com / Google) with optional Stripe deposit Payment Link.
3. Limitless Alignment waitlist → email capture; charge later via razu.mov Checkout.
4. MCP: Calendar + Gmail only unless deposits are collected on this domain.

---

## Rollout sequence

```
[1] Desktop: auth Stripe MCP → timber.bid platform account
[2] Confirm connect-recommend-plan.md (or adjust open questions)
[3] Implement Connect on timber.bid codebase (separate repo from renat.ai-2)
[4] Desktop: auth Google MCPs → wire into renat.ai + razu.mov booking/ops
[5] razu.mov: Payment Links / Checkout for coaching packages (standard Stripe)
[6] renatrazumov.com: consult booking + funnel links (Calendar; optional deposit)
[7] Optional: standard Billing for renat.ai Pro
[8] Later: DevStudio / CustomComputer standard Stripe; Flowstake crypto-first
```

---

## What this Cloud Agent cannot do until you auth

- Read live Stripe products, Connect accounts, or balance for timber.bid
- Send/read Gmail, Calendar, or Drive
- Fix GitHub MCP from this environment

Reply with one of:

1. **“Auth done — inspect Stripe for timber.bid”**
2. **“Looks good — write connect-recommend-plan into timber.bid repo next”**
3. **“Change something”** (dashboard, charge pattern, fees, or company priority)
4. **“Focus renat.ai MCP wiring in this repo”**
