# renat.ai — Personal Operating System

Private AI command center for Renat Razumov’s companies, businesses, and designer lifestyle.

> **Not** a public chat demo. **Not** Stripe Connect. Orchestrates ventures; each product keeps its own app and payments.

Live site: [renat.ai](https://renat.ai)

## Consolidation note

This repository (`renat.ai-2` on GitHub) is the **canonical source** for renat.ai. The live Netlify SPA + `/api/chat` shell was restored from production source maps and merged with the Personal OS planning docs.

**Owner action:** rename the GitHub repo from `renat.ai-2` → `renat.ai` when ready (this token cannot rename repositories).

## App (Phase 0 shell)

| Layer | Stack |
| --- | --- |
| UI | React + TypeScript + Vite + Tailwind |
| Auth / DB | Supabase Auth + `messages` table |
| Chat API | Netlify Function `POST /api/chat` (AI Gateway preferred; OpenRouter optional) |
| Hosting | Netlify |

```bash
cp .env.example .env   # fill Supabase (+ optional OPENROUTER_API_KEY)
npm install
npm run dev
```

Build: `npm run build` · Publish dir: `dist`

## Plans

| Doc | Purpose |
| --- | --- |
| [`docs/renat-ai-os-brief.md`](./docs/renat-ai-os-brief.md) | Architecture, lifestyle loop, phased build |
| [`docs/renat-ai-security-legal-review.md`](./docs/renat-ai-security-legal-review.md) | Performance, security, legal + data access matrix |
| [`docs/renat-company-mcp-plan.md`](./docs/renat-company-mcp-plan.md) | Company map + MCP auth rollout |
| [`docs/connect-recommend-plan.md`](./docs/connect-recommend-plan.md) | Stripe Connect recommendation for timber.bid |

**Doctrine:** own your vault keys. Always label who has access and what is public.

## Created by

[Renat Razumov](https://renatrazumov.com) · Coaching: [razu.mov](https://razu.mov) · Marketplace: [timber.bid](https://timber.bid)
