# renat.ai — Personal Operating System brief

**Owner:** Renat Razumov  
**Intent:** Use [renat.ai](https://renat.ai) as your private AI that runs companies, businesses, and lifestyle — a **designer lifestyle OS**, not a public chat demo.  
**Date:** 2026-09-05  
**Related:** [`renat-company-mcp-plan.md`](./renat-company-mcp-plan.md) · [`connect-recommend-plan.md`](./connect-recommend-plan.md) · [`renat-ai-security-legal-review.md`](./renat-ai-security-legal-review.md)

**Data doctrine:** If you do not own your data, you will inevitably give it away. Every surface must label **who can access data** and **what is public**.

---

## Verdict

**renat.ai should become Renat OS: a single-operator command center**, then a **sellable Designer Lifestyle template** with an encrypted private vault (customer-held keys).  
Chat is the interface. Memory + company contexts + tools + approval-gated agents are the product.  
Each company stays its own product (timber.bid Connect, razu.mov Checkout, etc.). renat.ai **orchestrates** them — it does not replace their apps or Stripe platforms.

| What it is | What it is not |
| --- | --- |
| Private AGI for one principal (you) | Multi-tenant SaaS AGI (yet) |
| Cross-company ops + lifestyle designer | Stripe Connect marketplace |
| Tool-using agent with memory & rituals | GPT wrapper with pretty UI |
| Hub that links renatrazumov.com / razu.mov / ventures | Replacement for every venture frontend |

---

## Where the platform is today

| Layer | Reality |
| --- | --- |
| **This repo (`renat.ai-2`)** | README only — no app source checked in |
| **Live renat.ai** | Hackathon SPA: React + Vite + Supabase Auth + OpenAI chat (gpt-3.5-era), Netlify |
| **Devpost positioning** | “Personal AGI Assistant” + “What’s next: third-party integrations” — that next step *is* this OS |
| **Payments / Connect** | None in renat.ai (correct). Connect belongs on timber.bid |
| **MCP in Cloud Agent** | Stripe / Gmail / Calendar / Drive / Link need desktop auth; GitHub MCP errored |

Gap: you have a **chat shell**. You need an **operating system** — identity (you), company workspaces, tools, agents, and a lifestyle loop.

---

## North star: designer lifestyle

A designer lifestyle here means **intentional design** of time, energy, money, and ventures — not more dashboards.

renat.ai should help you:

1. **Decide** — weekly priorities across timber.bid, coaching, Flowstake, agency, life  
2. **Delegate** — agents draft emails, reconcile Stripe, prep claims packages, schedule consults  
3. **Protect** — approval gates before send/pay/post; quiet hours; training blocks  
4. **Compound** — memory of preferences, SOPs, brand voice, financial targets  
5. **Review** — Sunday OS review: companies health + body + calendar + cash  

Tagline for the private product: **“One mind. Every company. Designed days.”**

---

## Domain map (what renat.ai runs)

### A. Companies (venture ops)

| Workspace | Job for renat.ai | Primary tools |
| --- | --- | --- |
| **timber.bid** | Ops brief: orders, sellers, disputes, Pro subs, Connect health | Stripe MCP (platform), Gmail, Drive, GitHub |
| **razu.mov** | Coaching pipeline: leads, sessions, packages, follow-ups | Calendar, Gmail, Stripe (standard) |
| **Flowstake.com** | Product/community pulse; later staking ops | GitHub, Gmail; crypto tooling later |
| **DevStudio.Pro** | Pipeline, proposals, invoices | Gmail, Drive, Stripe Payment Links |
| **CustomComputer.io** | Orders / quotes | Stripe, Gmail |
| **RoomMining.io** | Infra / client deposits | Stripe or wire notes in Drive |
| **MasterMindRoom.org** | Events, guests, tickets | Calendar, Payment Links |
| **renatrazumov.com** | Hub funnel, consult booking, Limitless Alignment waitlist | Calendar, Gmail |

### B. Lifestyle (personal OS)

| Module | Outcomes |
| --- | --- |
| **Body** | Training plan, marathon/flow goals, recovery (ties to Flowstake / athlete identity) |
| **Mind** | Coaching content, journaling prompts, Limitless Alignment program ops |
| **Time** | Calendar as source of truth; deep work vs meetings vs family |
| **Money** | Cross-company cash snapshot (read-only Stripe + manual accounts); burn vs goals |
| **Home / travel** | Logistics, bookings, packing (Calendar + Gmail) |
| **Presence** | Content drafts (LinkedIn, YouTube) from one brand voice file |

### C. Meta (how you run you)

- Morning brief (calendar + urgent email + company alerts)  
- Midday focus guard  
- Evening shutdown  
- Weekly designer review (90 min ritual, AI-facilitated)

---

## Product architecture

```
┌─────────────────────────────────────────────────────────┐
│  renat.ai UI (chat + workspace switcher + brief panels) │
└───────────────────────────┬─────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────┐
│  Orchestrator (Netlify Functions + AI Gateway)          │
│  - system prompt = Renat OS constitution                │
│  - active company/lifestyle context                     │
│  - tool router + approval policy                        │
└───┬─────────────┬─────────────┬─────────────┬───────────┘
    │             │             │             │
 Memory       Tools         Agents        Surfaces
 (Supabase)   (MCP/API)     (jobs)        (briefs)
 - profile    - Gmail       - morning     - Today
 - SOPs       - Calendar    - weekly      - Company
 - brand      - Drive       - Stripe digests
 - goals      - Stripe×N    - content
 - decisions  - GitHub      - coaching CRM
              - Link
```

### 1. Identity & tenancy

- **Single principal:** you (Supabase Auth allowlist / private invite).  
- Optional later: executive assistant seat with narrower tools.  
- Do **not** open public signup until OS is useful for you.

### 2. Memory (the moat)

Store in Supabase (or Drive as files + DB index):

- **Constitution** — values, non‑negotiables, designer-lifestyle rules  
- **Company packs** — one markdown/JSON pack per venture (positioning, fees, SOPs, KPIs)  
- **People** — key contacts, coaching clients, timber sellers (with privacy care)  
- **Decisions log** — what you decided and why (agents must read this)  
- **Brand voice** — LinkedIn / coaching / timber tones  

Without memory, renat.ai stays a chat toy.

### 3. Tools (MCP + APIs)

Wire tools **behind the orchestrator**, not only in Cursor:

| Priority | Integration | Mode |
| --- | --- | --- |
| P0 | Gmail, Calendar, Drive | Read + draft; send needs approval |
| P0 | Stripe (timber.bid platform) | Read-only first; write later with gates |
| P1 | GitHub | Issues/PRs for timber + renat.ai |
| P1 | Stripe (razu.mov / DevStudio) | Separate keys or account switch |
| P2 | Link / banking later | Lifestyle spend awareness |
| P2 | timber.bid / Flowstake app APIs | When those backends expose admin APIs |

**Rule:** Cursor MCP auth unblocks *this agent*. Productized renat.ai needs the **same capabilities as OAuth apps + Netlify functions**, not a dependency on Cursor being open.

### 4. Agents (scheduled + chat-triggered)

| Agent | Cadence | Output |
| --- | --- | --- |
| Morning Brief | Daily | Calendar, top 5 emails, company alerts |
| Timber Pulse | Daily/weekly | Orders, payouts stuck, Pro churn signals |
| Coaching Concierge | On event | Prep notes before razu.mov sessions |
| Money Mirror | Weekly | Stripe snapshots per company (read-only) |
| Lifestyle Designer | Weekly | Propose next week’s calendar shape vs goals |
| Content Ghost | 2–3×/week | Draft posts; you approve publish |

Every agent that **sends money, email, or public content** requires explicit approval in UI.

### 5. Surfaces (beyond chat)

Keep chat primary, add three panels:

1. **Today** — brief + focus block  
2. **Companies** — switcher with health chips  
3. **Lifestyle** — training, recovery, consults, money targets  

renatrazumov.com stays public hub; renat.ai stays private cockpit.

---

## Tech stack recommendation (evolve the hackathon app)

| Piece | Keep / change |
| --- | --- |
| Netlify | Keep; use **AI Gateway** for models (no raw keys in client) |
| Supabase | Keep Auth + Postgres; add `workspaces`, `memories`, `agent_runs`, `approvals` |
| Vite/React | Keep UI; stop shipping `VITE_OPENAI_API_KEY` to the browser |
| OpenAI in browser | **Remove** — all LLM calls via Netlify Functions + AI Gateway |
| Models | Claude Sonnet for ops reasoning; Gemini/GPT where Gateway fits |
| Secrets | `Netlify.env.get` / blobby env — never client |
| Stripe | Server-only restricted keys per company; never Connect platform logic inside renat.ai except **admin read/assist** |

---

## What stays outside renat.ai

| Concern | Lives in |
| --- | --- |
| Marketplace checkout, Connect, delivery holds | **timber.bid** app + Stripe Connect |
| Coaching sales pages | **razu.mov** |
| Public brand / venture gallery | **renatrazumov.com** |
| Fitness staking product | **Flowstake.com** |
| Heavy engineering of each product | That product’s repo |

renat.ai may **call** those systems; it should not **become** them.

---

## Phased build (utilization path)

### Phase 0 — Private cockpit (1 thin slice)

- Lock auth to you only  
- Workspace switcher: Personal / timber.bid / razu.mov / …  
- Load company pack into system prompt  
- Server-side chat via Netlify AI Gateway  
- Decisions + notes memory table  

### Phase 1 — Lifestyle + ops eyes

- OAuth: Gmail, Calendar, Drive  
- Morning Brief agent  
- “Draft reply” / “propose calendar block” with Approve  
- Weekly Designer Review prompt pack  

### Phase 2 — Money awareness

- Stripe read-only digests per company (start timber.bid)  
- Surface Connect/Pro health without moving Connect code here  
- Coaching Payment Link status for razu.mov  

### Phase 3 — Hands (still gated)

- Send email, create calendar events, file Drive docs on approval  
- GitHub issue creation from chat  
- timber.bid admin API actions when available  

### Phase 4 — Designer lifestyle loop

- Goals → weekly calendar auto-proposal  
- Training + business deep-work templates  
- Quarterly “portfolio + life” review  

### Phase 5 — Optional productization

Only after you live on it: invite-only seats, or a sanitized “Renat OS” template for other founders. Monetize with standard Billing — still not Connect unless you sell a multi-party product.

---

## MCP + Cursor usage (how you utilize agents now)

While the product is rebuilt:

1. Auth **Gmail / Calendar / Drive / Stripe** in Cursor desktop  
2. Use Cloud/desktop agents with **company context** (“acting as timber.bid ops”)  
3. Keep plans in this repo as the constitution until memory is in Supabase  
4. Implement Connect in **timber.bid / lumberbid** repos; use renat.ai agents for orchestration and reviews  

---

## Success metrics (designer lifestyle)

| Signal | Target sense |
| --- | --- |
| Morning brief opened | Most days |
| Time-to-first-reply on coaching / timber support | Down |
| Hours in deep work vs reactive email | Up / down |
| Companies with weekly health check | All P0/P1 |
| Approvals without regret | High trust in drafts |
| You open renat.ai before Slack/email | Habit formed |

---

## Immediate next actions

1. Confirm this OS framing (or adjust: more lifestyle-first vs company-first).  
2. Desktop-auth Google + Stripe MCPs so agents can operate with live data.  
3. Restore or import full renat.ai source into this repo (currently README-only).  
4. Implement Phase 0 (private auth + workspaces + Gateway chat).  
5. Parallel track: timber.bid Connect per `connect-recommend-plan.md` (revenue engine the OS will oversee).

---

## Open questions for you

1. **Lifestyle-first or company-first** for Phase 1 (Calendar/body vs Stripe/timber)?  
2. Should renat.ai stay **private forever**, or become a productized founder OS later?  
3. Which Google account is canonical for OS OAuth?  
4. One Stripe “holding” view across companies, or strict per-company key switching only?  
5. Do you want voice / mobile (PWA) in Phase 1 or later?

Reply with preferences on those five and we can turn Phase 0 into an implementation plan in this repo.
