'use client';

import { DollarSign, AlertTriangle, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export interface CategoryBudget {
  category: string;
  spent: number;
  limit: number;
}

interface BudgetAnalyticsProps {
  income: number;
  expenses: number;
  categories: CategoryBudget[];
  slaThreshold?: number;
}

export function BudgetAnalytics({
  income,
  expenses,
  categories,
  slaThreshold = 2500,
}: BudgetAnalyticsProps) {
  const netBalance = income - expenses;
  const isOverSlaLimit = expenses > slaThreshold;

  return (
    <div className="vitta-card space-y-6" role="region" aria-label="Budget Analytics Summary">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-card)] flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[var(--text-dim)] uppercase">Total Income</div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono">${income.toLocaleString()}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-card)] flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[var(--text-dim)] uppercase">Total Expenses</div>
            <div className="text-2xl font-extrabold text-rose-400 font-mono">${expenses.toLocaleString()}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/15 flex items-center justify-center text-rose-400">
            <TrendingDown className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--border-card)] flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[var(--text-dim)] uppercase">Net Balance</div>
            <div className={`text-2xl font-extrabold font-mono ${netBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              ${netBalance.toLocaleString()}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[var(--badge-bg)] flex items-center justify-center text-[#10b981]">
            <Wallet className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* SLA Alert Warning Banner */}
      {isOverSlaLimit && (
        <div className="p-4 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-between animate-fade-in" role="alert">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <div className="text-sm font-extrabold text-amber-400">SLA Budget Limit Threshold Exceeded</div>
              <div className="text-xs font-medium text-amber-200/80">
                Monthly expenses (${expenses.toLocaleString()}) have surpassed the designated limit threshold of ${slaThreshold.toLocaleString()}.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Spending Bars */}
      <div className="space-y-3">
        <h3 className="text-base font-extrabold text-[var(--text-main)] flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#10b981]" /> Category Budget Progress
        </h3>

        <div className="space-y-3">
          {categories.map((c) => {
            const percentage = Math.min(100, Math.round((c.spent / c.limit) * 100));
            const isExceeded = c.spent > c.limit;

            return (
              <div key={c.category} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[var(--text-main)]">{c.category}</span>
                  <span className={isExceeded ? 'text-rose-400' : 'text-[var(--text-dim)]'}>
                    ${c.spent.toLocaleString()} / ${c.limit.toLocaleString()} ({percentage}%)
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-[var(--bg-input)] overflow-hidden border border-[var(--border-card)]">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isExceeded ? 'bg-gradient-to-r from-rose-500 to-red-600' : 'bg-gradient-to-r from-[#10b981] to-[#059669]'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
