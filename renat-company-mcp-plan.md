# Renat company MCP + product plan

Owner: Renat Razumov (`renatrazumov@protonmail.com`)  
Repo context: `renat.ai-2` (AGI assistant scaffold)  
Date: 2026-09-05

## Verdict

**Start with timber.bid for Stripe Connect and payments MCP.**  
**Treat renat.ai as a separate product: productivity MCPs + optional standard Stripe Billing — not Connect.**

---

## Company map

| Company | Model | Payments need | Priority for this agent |
| --- | --- | --- | --- |
| **timber.bid** | Marketplace (firewood, tree services) + Pro SaaS | **Stripe Connect** (hold until delivery) + platform Billing for Pro | **P0 — start here** |
| **renat.ai** | AGI / chat assistant (this repo) | Standard Stripe if you monetize; no multi-party Connect | **P1 — MCP + product, not Connect** |
| **Flowstake.com** | Fitness stake / prediction-style | Crypto + possibly fiat rails later | P2 |
| **DevStudio.Pro** | Agency / services | Invoices / Checkout (standard Stripe) | P2 |
| **CustomComputer.io** | Hardware retail | Standard Checkout | P3 |
| **RoomMining.io** | Mining infra | Hardware / deposits — standard Stripe or wire | P3 |
| **Razu.mov / MasterMindRoom** | Coaching / events | Checkout or Payment Links | P3 |

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

## Best plan for renat.ai (P1)

This repo is an OpenAI + Supabase + Vite AGI chat app — **not a marketplace**. Do **not** put Stripe Connect here unless renat.ai starts routing money between third parties.

Recommended product path:

1. **MCP-powered assistant** — Gmail + Calendar + Drive as tools behind the chat (user-scoped OAuth), so renat.ai becomes Renat’s personal/ops AGI.
2. **Monetization (optional)** — if you charge for the assistant, use **standard Stripe Checkout/Billing** on a renat.ai Stripe account (subscriptions or credits). No connected accounts.
3. **Shared brand / SSO later** — keep timber.bid and renat.ai as separate Netlify/Supabase projects; share design system only when needed.
4. **Do not block timber.bid** on renat.ai features — Connect marketplace revenue is the higher-stakes payments work.

Netlify note: if you add AI server routes on Netlify, prefer Netlify AI Gateway for model calls; keep Stripe secrets in Netlify env (`Netlify.env.get` in functions).

---

## Rollout sequence

```
[1] Desktop: auth Stripe MCP → timber.bid platform account
[2] Confirm connect-recommend-plan.md (or adjust open questions)
[3] Implement Connect on timber.bid codebase (separate repo from renat.ai-2)
[4] Desktop: auth Google MCPs → wire into renat.ai tool layer
[5] Optional: standard Billing for renat.ai Pro
[6] Later companies: DevStudio / CustomComputer standard Stripe; Flowstake crypto-first
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
