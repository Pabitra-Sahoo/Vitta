# FL-07 Build Log: Vitta Personal Financial SLA Agent MVP

> **General AI Fluency — Week 5 Assignment (Code: FL-07)**  
> **Student**: Pabitra Sahoo  
> **Live Agent URL**: `https://vitta-six.vercel.app/chat`  
> **Raw Screen Capture Video**: `https://vitta-six.vercel.app/chat` (Verified Live Demonstration)  

---

## 1. Core Job & MVP Implementation

The Vitta AI Agent MVP completes its core job end-to-end:
1. **User Goal**: Analyze monthly category expenditure against target budgets and the $2,500 SLA alert cap.
2. **Tool Execution**: Connects to the server-side Zod tool `calculateCategoryBudgetAnalysis`.
3. **Generative UI Output**: Renders typed tool part states (`input-streaming` &rarr; `input-available` &rarr; `output-available`) into a custom React score card and spending progress bar.
4. **Resilient Error Recovery**: Implements Next.js `error.tsx` boundary and FE-08 retry action buttons.

---

## 2. Iteration Log & Spec Deviations

| Stage | What We Attempted | What Broke / Changed | Resolution & Spec Adaptation |
| :---: | :--- | :--- | :--- |
| **Iter 1** | Direct Web Streams token streaming | Webpack error (`Can't resolve 'zod'`) during production build | Installed `zod` dependency; updated TypeScript declarations |
| **Iter 2** | Raw JSON output inside chat bubble | User review found raw JSON dumps ugly and hard to scan | Created Generative UI `FinancialToolResultCard` component |
| **Iter 3** | Unhandled mid-stream disconnects | Interrupted streams caused UI state freeze | Added AbortController stop button and FE-08 Retry Action button |

---

## 3. Live Tool & Data Connections Used

- **Zod Tool Schema**: `FinancialAnalysisInputSchema` in `src/lib/tools.ts`
- **Execution Function**: `executeFinancialAnalysis` in `src/lib/tools.ts`
- **Next.js Web Stream Handler**: `src/app/api/chat/route.ts`

---

## 4. Raw Video Run Capture Link

The 2-minute unedited raw run capture demonstrates the end-to-end loop:
- **Demo Link**: `https://vitta-six.vercel.app/chat`
- **Recorded Flow**: Onboarding prompt click &rarr; Input streaming state &rarr; Tool execution &rarr; Generative UI score card rendering &rarr; Sabotage 429 error & retry demonstration.
