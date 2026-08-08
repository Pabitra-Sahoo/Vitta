# Vitta — Wealth & Expense Financial Tracker

## Track: Frontend AI Engineering (Week 5 Assignment: FE-07 & FE-08)

Vitta is a modern, accessible financial tracking web application built with **React 19**, **Next.js 15 App Router**, **TypeScript**, and **Tailwind CSS**.

---

## FE-07 Generative UI Server Tool Contract

### Tool Name: `calculateCategoryBudgetAnalysis`
- **Purpose**: Server-side tool that analyzes expense categories against monthly targets and SLA warning thresholds ($2,500 limit).

### Zod Schema Definition:
```typescript
import { z } from 'zod';

export const FinancialAnalysisInputSchema = z.object({
  category: z.string().describe('The financial transaction category'),
  monthlyBudget: z.number().min(1).describe('User target monthly budget in USD'),
  currentSpent: z.number().min(0).describe('Total current expenditure in USD'),
  slaThreshold: z.number().default(2500).describe('Monthly SLA warning limit ($2,500)'),
});
```

### Return Shape:
```typescript
export interface FinancialAnalysisResult {
  category: string;
  monthlyBudget: number;
  currentSpent: number;
  slaThreshold: number;
  remainingBudget: number;
  percentageUsed: number;
  isOverBudget: boolean;
  isSlaExceeded: boolean;
  healthScore: number;
  recommendation: string;
}
```

---

## FE-08 Error & Sabotage Testing (Checkpoint 1)
- **Next.js Error Boundary**: Defined in `src/app/error.tsx` catching unexpected route failures.
- **Mid-Stream Error Recovery**: Retry action button allowing instant re-execution of failed messages.
- **Onboarding Empty State**: Interactive click-to-fill sample prompt cards.
- **Sabotage Selector**: Live toggle in header to test 429 rate limits and mid-stream breaks.

---

## Run Locally
```bash
npm install
npm run dev
```

## Run Production Build
```bash
npm run build
```
