import React, { useMemo } from 'react';
import { Transaction } from './TransactionTracker';
import { AlertCircle, ShieldCheck } from 'lucide-react';

interface BudgetAnalyticsProps {
  transactions: Transaction[];
  monthlyBudgetLimit?: number;
}

export const BudgetAnalytics: React.FC<BudgetAnalyticsProps> = ({
  transactions,
  monthlyBudgetLimit = 2500,
}) => {
  const totals = useMemo(() => {
    let income = 0;
    let expense = 0;
    const categoryExpenses: Record<string, number> = {};

    transactions.forEach((tx) => {
      if (tx.type === 'income') {
        income += tx.amount;
      } else {
        expense += tx.amount;
        categoryExpenses[tx.category] = (categoryExpenses[tx.category] || 0) + tx.amount;
      }
    });

    return {
      income,
      expense,
      balance: income - expense,
      categoryExpenses,
    };
  }, [transactions]);

  const budgetUsagePercent = Math.min(Math.round((totals.expense / monthlyBudgetLimit) * 100), 100);
  const isBudgetExceeded = totals.expense > monthlyBudgetLimit;

  return (
    <div className="card" role="region" aria-label="Budget Analytics Summary">
      <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', color: '#f8fafc' }}>Financial Analytics</h3>

      {/* Monthly Budget SLA Warning Banner */}
      <div
        style={{
          padding: '0.85rem 1rem',
          borderRadius: '12px',
          background: isBudgetExceeded ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
          border: `1px solid ${isBudgetExceeded ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
        role="alert"
      >
        {isBudgetExceeded ? <AlertCircle color="#f87171" size={20} /> : <ShieldCheck color="#34d399" size={20} />}
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.85rem', color: isBudgetExceeded ? '#f87171' : '#34d399' }}>
            {isBudgetExceeded ? 'Budget Limit Exceeded' : 'Budget Within Safe Limits'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            Monthly Budget: ${monthlyBudgetLimit.toLocaleString()} • Spent: ${totals.expense.toLocaleString()} ({budgetUsagePercent}%)
          </div>
        </div>
      </div>

      {/* Category Spending Breakdown Progress Bars */}
      <h4 style={{ margin: '0 0 0.85rem 0', fontSize: '0.95rem', color: '#cbd5e1' }}>Category Spending Distribution</h4>
      {Object.keys(totals.categoryExpenses).length === 0 ? (
        <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>No expense records recorded yet.</p>
      ) : (
        Object.entries(totals.categoryExpenses).map(([cat, amt]) => {
          const pct = Math.min(Math.round((amt / monthlyBudgetLimit) * 100), 100);
          return (
            <div key={cat} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#cbd5e1' }}>
                <span>{cat}</span>
                <span>${amt.toFixed(2)} ({pct}%)</span>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${pct}%`,
                    background: pct > 50 ? '#f87171' : '#34d399',
                  }}
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
