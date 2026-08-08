import { z } from 'zod';

/**
 * FE-07 Tool Contract: Financial Health & SLA Budget Analysis Tool
 * Defined with Zod schema and server-side execution function.
 */

export const FinancialAnalysisInputSchema = z.object({
  category: z.string().describe('The financial transaction category (e.g., Housing, Utilities, Dining, Investments)'),
  monthlyBudget: z.number().min(1).describe('User target monthly budget limit in USD'),
  currentSpent: z.number().min(0).describe('Total current expenditure in USD for the category'),
  slaThreshold: z.number().default(2500).describe('Monthly SLA warning threshold limit ($2,500 default)'),
});

export type FinancialAnalysisInput = z.infer<typeof FinancialAnalysisInputSchema>;

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

export function executeFinancialAnalysis(input: FinancialAnalysisInput): FinancialAnalysisResult {
  const remainingBudget = input.monthlyBudget - input.currentSpent;
  const percentageUsed = Math.min(100, Math.round((input.currentSpent / input.monthlyBudget) * 100));
  const isOverBudget = input.currentSpent > input.monthlyBudget;
  const isSlaExceeded = input.currentSpent > input.slaThreshold;

  let healthScore = 100 - Math.min(100, percentageUsed);
  if (isOverBudget) healthScore = Math.max(10, healthScore - 20);
  if (isSlaExceeded) healthScore = Math.max(5, healthScore - 30);

  let recommendation = 'Your spending is well within safe thresholds.';
  if (isSlaExceeded) {
    recommendation = `CRITICAL WARNING: Expenses ($${input.currentSpent.toLocaleString()}) exceed the $${input.slaThreshold.toLocaleString()} SLA threshold limit! Immediate budget freeze advised.`;
  } else if (isOverBudget) {
    recommendation = `Warning: You have exceeded your monthly category budget by $${Math.abs(remainingBudget).toLocaleString()}.`;
  } else if (percentageUsed > 80) {
    recommendation = `Caution: You have utilized ${percentageUsed}% of your budget. $${remainingBudget.toLocaleString()} remaining.`;
  }

  return {
    category: input.category,
    monthlyBudget: input.monthlyBudget,
    currentSpent: input.currentSpent,
    slaThreshold: input.slaThreshold,
    remainingBudget,
    percentageUsed,
    isOverBudget,
    isSlaExceeded,
    healthScore,
    recommendation,
  };
}
