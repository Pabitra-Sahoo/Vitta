# Task 3: Ship the Ugly One — Live Portfolio Feedback & "Still Ugly" List

> **General AI Fluency — Week 5 Assignment**  
> **Student**: Pabitra Sahoo  
> **Live Site URL**: `https://vitta-six.vercel.app`  

---

## 1. Live Reachability Verification

All primary sitemap pages are deployed live and reachable over HTTPS without console errors:
- `/` — Main Executive Dashboard & KPI Summary
- `/chat` — Generative UI Streaming Assistant (FE-07 / FE-08)
- `/playground` — Accessible Component Playground (FE-05)
- `/analytics` — Financial Category Volatility Analytics
- `/ledger` — Transaction Ledger
- `/health` — Subsystem Telemetry & SLA Threshold Monitor

---

## 2. Real Person Review Reaction

I shared the live Vercel link (`https://vitta-six.vercel.app`) with a peer reviewer in fintech engineering:

* **What they saw**:
  - The dark emerald aesthetic and animated financial KPI cards immediately felt like a real production SaaS platform.
  - They praised the Generative UI score card in `/chat` when triggering budget analysis tools.

* **What confused them**:
  - The SLA threshold badge on `/health` ($2,500 limit) was not immediately obvious until hovering over the info icon.
  - They suggested adding quick preset transaction filters on the ledger page.

---

## 3. Honest "Still Ugly" List

1. **Static Mock Data**: Some chart data points on `/analytics` use simulated arrays instead of live WebSocket streams.
2. **Ledger Pagination**: The transaction table renders all records without multi-page pagination controls.
3. **Mobile Landscape Padding**: On extreme mobile landscape orientations (height < 400px), header padding reduces vertical chat space slightly.
