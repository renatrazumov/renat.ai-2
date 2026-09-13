# renat.ai — Performance, security & legal review

**Scope:** Personal OS + sellable **Designer Lifestyle OS template**  
**Principle:** *If you do not own your data, you will inevitably give it away.*  
**Date:** 2026-09-05  
**Status:** Engineering + product review. **Not formal legal advice** — engage counsel before selling to consumers or processing sensitive data at scale.  
**Related:** [`renat-ai-os-brief.md`](./renat-ai-os-brief.md)

---

## Executive verdict

| Track | Verdict |
| --- | --- |
| **Performance** | Current chat SPA is fine for solo chat; **not** ready for always-on AGI logging, multi-device sync, or multi-tenant template customers. |
| **Security** | Critical gap: browser OpenAI keys / plaintext lifestyle logs would **violate** the data-ownership thesis. Target = **user-held keys + encrypted-at-rest vault**; host sees ciphertext only. |
| **Legal / template sales** | Sellable as a **self-hosted / BYO-vault template** with clear privacy tiers. Consumer SaaS that stores plaintext journals + calendar + company ops needs Privacy Policy, DPA options, retention, and (often) counsel for health/finance adjacency. |
| **Product positioning** | Sell **“Designer Lifestyle OS”** — private log → encrypted vault → AI that works for *you*. Public marketing site ≠ customer vault contents. |

---

## 1. Always identify: who has access & what is public

### 1.1 Data classification

| Class | Examples | Default |
| --- | --- | --- |
| **PUBLIC** | Marketing pages, pricing, docs, open-source template code, company *names* on renatrazumov.com | Anyone |
| **ACCOUNT** | Email, display name, plan tier, billing status | User + platform billing ops |
| **PRIVATE (ciphertext)** | Lifestyle journal, company SOPs, meeting notes, health/training logs, drafts | User only (keys); host stores blobs |
| **PRIVATE (transient plaintext)** | Prompt context sent to an LLM for one request | Model provider for that request unless local model |
| **SECRET** | Stripe keys, OAuth tokens, vault master keys | Never in client bundles; never in PUBLIC |
| **OPERATOR-ONLY** | Your own Renat OS instance internals | Renat only |

### 1.2 Access matrix — Renat’s private OS (your instance)

| Data | You | renat.ai host (Netlify/Supabase) | LLM provider (OpenAI/Anthropic/Google via Gateway) | Stripe | Google (Gmail/Cal/Drive) | Public internet |
| --- | --- | --- | --- | --- | --- | --- |
| Marketing site HTML | ✓ | ✓ (CDN) | — | — | — | **PUBLIC** |
| Auth email / user id | ✓ | ✓ (Auth DB) | — | — | — | No |
| Vault ciphertext (journals, company packs) | ✓ (decrypt) | ✓ **blobs only** (cannot read if E2EE) | — | — | — | No |
| Vault plaintext on device | ✓ | No | No | No | No | No |
| Chat prompt + retrieved notes (if cloud LLM) | ✓ | May transit functions | **✓ for request** | — | — | No |
| Chat prompt (local/on-device model) | ✓ | No | No | — | — | No |
| Gmail/Calendar contents | ✓ | Only if your backend proxies with tokens | Only if you paste/send | — | **✓ (their ToS)** | No |
| Stripe Connect (timber.bid) | Platform ops | Only if you proxy | No | **✓** | — | No (Dashboard is private) |
| Approvals / agent action logs | ✓ | Prefer ciphertext or redacted | — | — | — | No |

**Rule for the product UI:** every screen that shows data must label **PUBLIC / ACCOUNT / PRIVATE / SECRET**, and every tool call must show **who will receive plaintext**.

### 1.3 Access matrix — Template customers (sold product)

| Party | Sees |
| --- | --- |
| **Customer (end user)** | Their vault plaintext (after unlock); their integrations |
| **Customer’s chosen host** (their Netlify/Supabase/VPS) | Ciphertext + account metadata — **not** journal plaintext if E2EE done right |
| **You (Renat) as template vendor** | **Nothing** from their vault if they self-host; only license/billing email if you sell licenses |
| **You as hosted SaaS** (if offered) | Ciphertext + account; still **no** plaintext if zero-knowledge; if you offer “managed plaintext,” you become a data controller — disclose that |
| **LLM provider** | Whatever the customer’s instance sends in prompts |
| **App stores / public GitHub template** | PUBLIC code + docs only — never sample real journals |

### 1.4 What must stay PUBLIC vs PRIVATE when selling

| PUBLIC (ok to ship / market) | PRIVATE (never in template screenshots with real data) |
| --- | --- |
| Architecture diagrams, empty UI, demo *synthetic* data | Real emails, Stripe live data, health logs, client names |
| Privacy tiers explanation, threat model summary | Master keys, recovery phrases, OAuth tokens |
| License, pricing, feature list | Customer vault backups |

---

## 2. Security review

### 2.1 Findings on current renat.ai direction (hackathon baseline)

| ID | Severity | Finding | Fix |
| --- | --- | --- | --- |
| S1 | **Critical** | Client-side `VITE_OPENAI_API_KEY` pattern (per old README) exposes keys and puts lifestyle prompts on a path you don’t control well | All LLM calls via server (Netlify AI Gateway / Functions). No provider keys in Vite. |
| S2 | **Critical** | Plaintext chat in Supabase without field encryption = host + DB admins can read life/company logs | E2EE vault: encrypt before write; store ciphertext + nonce + key id |
| S3 | **High** | Always-on “log everything” without retention/redaction = mega breach blast radius | Classes of logs; auto-expire; selective capture; user kill-switch |
| S4 | **High** | OAuth tokens for Gmail/Calendar in one DB without HSM/KMS wrapping | Encrypt tokens at rest with platform KMS; per-user isolation; short-lived tokens |
| S5 | **High** | Agent send/pay without hard approvals | Mandatory approval objects; step-up auth for money/email |
| S6 | **Medium** | Multi-company Stripe keys in one env | Separate restricted keys (RAKs) per company; never `sk_live` in repo ([Stripe key practices](https://docs.stripe.com/keys-best-practices)) |
| S7 | **Medium** | CSP / secure headers claimed on Devpost — must be verified in `netlify.toml` for template | Ship strict CSP, no `unsafe-eval` if possible; lock framing |
| S8 | **Low** | Public repo with only plans is fine; future app must use secret scanning | Pre-commit hooks for `sk_`, `rk_`, Supabase service keys |

### 2.2 Target threat model (template)

**Assume:**

- Host (Netlify/Supabase) is curious or compromised → must learn **nothing useful** from vault rows.  
- LLM provider sees **only** the redacted context you intentionally send.  
- Laptop thief → vault locked at rest (passphrase / OS keychain / WebAuthn).  
- You as vendor → **cannot** read customer journals (zero-knowledge sync), or you **disclose** if offering a non-ZK managed tier.

**Non-goals (honest):**

- Pure zero-knowledge **and** full cloud LLM with automatic full-vault RAG is contradictory unless you encrypt→decrypt **on device** and only send minimized snippets.  
- Google/Stripe will always see data inside **their** products; OS integration does not equal ownership of Gmail’s servers.

### 2.3 Recommended vault architecture (sellable + ownership-true)

```
Device (unlock)
  └─ DEK (data encryption key) in memory
       │
       ├─ encrypt journal / company note / lifestyle event
       │     → ciphertext + iv + auth tag + key_version
       │
       └─ upload to PRIVATE store (Supabase/S3/user’s backend)
              host stores opaque bytes only

Optional sync: same ciphertext to user’s own Drive/iCloud/Git remote
Recovery: printed recovery kit (user-held) — vendor holds no escrow by default
```

**Modes to productize (label clearly in UI):**

| Mode | Who can read vault | LLM | Sell as |
| --- | --- | --- | --- |
| **A. Local-first / on-device model** | User only | Local | Strongest privacy |
| **B. E2EE vault + cloud LLM snippets** | User only at rest; provider sees prompts | Cloud | Best UX compromise — **default for template** |
| **C. Managed plaintext DB** | User + host admins | Cloud | Cheaper UX; **must disclose “host can read”** |

**Default for Designer Lifestyle Template = Mode B**, with Mode A as upsell / power-user, Mode C only with loud warnings.

### 2.4 Logging “everything you do” safely

Conceptual AGI-with-you-all-day implies continuous capture. Security rules:

1. **Explicit sensors** — calendar poll, manual “log moment,” optional browser extension, optional voice note — each opt-in.  
2. **On-device buffer** — encrypt before sync.  
3. **Minimization** — store embeddings of ciphertext or encrypted chunks; don’t keep raw mic forever.  
4. **Purpose tags** — `lifestyle` / `company:timber` / `health` — separate keys optional.  
5. **Right to delete** — wipe ciphertext + local keys; publish how long LLM providers retain prompts (link their policies).  
6. **No silent exfiltration** — every outbound tool shows destination + data class.

### 2.5 Stripe / payments boundary (template customers)

- Template **must not** teach embedding `sk_live` in apps.  
- Use [restricted API keys](https://docs.stripe.com/keys/restricted-api-keys.md), webhook signature verification, no Connect unless *their* product is a marketplace.  
- Designer Lifestyle OS selling = **standard Billing/Checkout** for the template license — not Connect.

---

## 3. Performance review

| Area | Current risk | Target |
| --- | --- | --- |
| **Chat latency** | Client→OpenAI OK for low QPS | Netlify Function + Gateway; stream tokens; edge where possible |
| **Vault search** | Full-table plaintext search won’t scale + breaks E2EE | Client-side index over decrypted cache; or encrypted search research later — start with on-device Fuse/FTS after unlock |
| **Always-on logging** | Naive insert/sec will melt free tiers | Batch events; compress; sync on interval / wifi; backpressure |
| **Multi-company context** | Stuffing all SOPs into every prompt = cost + latency | Workspace switcher; retrieve top-k encrypted chunks, decrypt locally, send only those |
| **Agent fan-out** | Parallel Gmail+Stripe+Calendar without limits | Queue + concurrency caps; cache digests |
| **Template multi-tenant** | One Supabase project for all customers = noisy neighbor + legal blast radius | **Prefer one deploy per customer** (template) or strict row-level security + separate vault keys per tenant |
| **Mobile** | SPA only | PWA with offline encrypted queue before sync |

**Performance north star:** unlock → local decrypt cache → sub-100ms search on device; cloud LLM only for reasoning turns the user initiates (or scheduled digests with budgets).

---

## 4. Legal & commercial review (guidance, not counsel)

### 4.1 What you’re selling

**Recommended SKU:** “Designer Lifestyle OS” **template / license**  

- Source or deployable starter (Netlify + Supabase + vault client)  
- Docs: privacy tiers, data matrix, setup  
- Optional paid support / hosted relay for **ciphertext only**

**Avoid initially:** claiming “HIPAA,” “bank-grade,” “AGI,” or “we never see your data” unless architecture + contracts match.

### 4.2 Privacy & consumer rules (high level)

| Topic | Implication |
| --- | --- |
| **Privacy Policy** | Required if you operate any hosted auth/billing; state Mode A/B/C and LLM subprocessors |
| **Terms / License** | Template license (MIT vs commercial); no warranty for life decisions / medical / financial advice |
| **GDPR / CCPA-style** | Export + delete; disclose processors (Netlify, Supabase, OpenAI/Anthropic/Google) |
| **Health / coaching adjacency** | Lifestyle + training logs may be sensitive; don’t market as medical device; razu.mov coaching content separate |
| **Employee / client data** | If users log third-party PII (coachees, timber sellers), template docs must warn about their own compliance |
| **Recording / always-on** | Consent laws for audio; workplace monitoring rules — default **manual log**, not covert capture |
| **Children** | 18+ only |
| **Marketing claims** | “Encrypted” must specify E2EE vs TLS-in-transit-only |

### 4.3 Liability posture for a lifestyle OS

- AI output = **assistive**, not professional advice (legal/tax/medical).  
- Agent actions = user-approved; keep approval audit (hash of action).  
- Template “as is”; production hardening checklist in docs.  
- Cyber insurance if you run hosted Mode C.

### 4.4 Open source vs commercial

| Approach | Pros | Cons |
| --- | --- | --- |
| **Open core** (vault client OSS, hosted relay paid) | Trust, adoption | Competitors fork |
| **Commercial license** (paid template) | Clear SKU | Less viral trust |
| **Dual license** | Flexibility | Complexity |

Align with data-ownership brand: **publish the threat model and access matrix publicly**; keep proprietary polish optional.

---

## 5. Product: template for others’ designer lifestyles

### 5.1 Promise (honest)

> Log your days into **your** encrypted vault. AI helps design your lifestyle and companies.  
> **You hold the keys.** Hosts store locked boxes. Model providers see only what you send.

### 5.2 Template contents (MVP SKU)

1. Auth (allowlist or single-user first)  
2. Encrypted vault (notes, lifestyle events, company packs)  
3. Workspace switcher  
4. Chat over **decrypted local context** + optional cloud LLM  
5. Data access labels in UI  
6. Morning brief + weekly review agents (read vault; draft only)  
7. Integration stubs: Google OAuth, Stripe read-only  
8. Docs: this review’s matrices + setup  
9. Synthetic demo dataset (PUBLIC)  

### 5.3 Pricing sketch (not final)

| SKU | Includes |
| --- | --- |
| **Template license** | Code + docs; self-host; you never hold their vault keys |
| **Ciphertext sync relay** (optional) | Store blobs only; zero-knowledge claim auditable |
| **Setup / coaching** (razu.mov adjacency) | Help them design rituals — separate from vault access |

### 5.4 UX copy requirement (every settings page)

```
Data class: PRIVATE (encrypted vault)
At rest: readable by you only (keys on your devices)
In transit: TLS
Cloud LLM: OFF | ON — when ON, prompts go to: [provider]
Host operator: cannot read vault plaintext
Public: nothing in this vault
```

---

## 6. Alignment with conceptual always-on AGI

| Aspiration | Practical control |
| --- | --- |
| With you all day | Mobile PWA + optional capture apps; not rootkit |
| Integrated into apps/accounts | OAuth tools with least privilege + revocation UI |
| Own your data | E2EE vault + export (encrypted + plaintext unlock export) |
| Don’t give it away | Default deny outbound; prompt preview; local model path |
| Sell to others | Same architecture; their keys; your business = template/relay not data mining |

**Strategic line:** *AGI-as-companion is a UX vision; data ownership is a non-negotiable constraint that shapes every integration.*

---

## 7. Priority remediation checklist

### P0 — before any real lifestyle logging

- [ ] Remove any browser provider API keys  
- [ ] Netlify AI Gateway (or local model) only  
- [ ] Encrypt vault fields before write; document Mode B  
- [ ] UI data-class labels + “who receives this” on tool use  
- [ ] Approval gate for send/pay/post  

### P1 — before selling template

- [ ] Privacy Policy + Terms + License  
- [ ] Synthetic demo data only in marketing  
- [ ] Per-customer deploy instructions (avoid shared plaintext DB)  
- [ ] Retention + delete + export  
- [ ] Restricted Stripe keys for your license Billing  

### P2 — scale / always-on

- [ ] On-device index; batch sync  
- [ ] Optional Mode A local LLM  
- [ ] Security.txt + vulnerability contact  
- [ ] Third-party pen test if hosted relay launches  

---

## 8. Open decisions (need your call)

1. **Default mode for the sold template:** B (E2EE + cloud snippets) vs A (local-only)?  
2. **Will you offer hosted SaaS** (even ciphertext relay) or **license-only self-host**?  
3. **Always-on capture:** manual + calendar only for v1, or mic/location later?  
4. **License:** open core vs paid template?  
5. Counsel engagement before collecting health-adjacent or EU personal data at scale?

---

## Disclaimer

This document is an engineering and product risk review for planning. It is **not** legal advice, a compliance certification, or a guarantee of security. Laws vary by jurisdiction; encryption and privacy claims must match shipped code.
