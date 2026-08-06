import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BudgetAnalytics } from './BudgetAnalytics';
import { Transaction } from './TransactionTracker';

const MOCK_TXS: Transaction[] = [
  { id: '1', title: 'Salary', amount: 3000, type: 'income', category: 'Salary', date: 'Aug 1' },
  { id: '2', title: 'Rent', amount: 1000, type: 'expense', category: 'Housing', date: 'Aug 2' },
];

describe('BudgetAnalytics Component', () => {
  it('renders monthly budget limit and expense percentage correctly', () => {
    render(<BudgetAnalytics transactions={MOCK_TXS} monthlyBudgetLimit={2500} />);
    expect(screen.getByText(/Monthly Budget: \$2,500/i)).toBeInTheDocument();
    expect(screen.getByText(/Budget Within Safe Limits/i)).toBeInTheDocument();
  });

  it('displays budget limit exceeded alert when expenses exceed limit', () => {
    const HIGH_EXPENSE_TXS: Transaction[] = [
      { id: '1', title: 'Rent', amount: 3000, type: 'expense', category: 'Housing', date: 'Aug 2' },
    ];
    render(<BudgetAnalytics transactions={HIGH_EXPENSE_TXS} monthlyBudgetLimit={2500} />);
    expect(screen.getByText(/Budget Limit Exceeded/i)).toBeInTheDocument();
  });
});
