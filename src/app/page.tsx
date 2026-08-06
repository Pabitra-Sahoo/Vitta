'use client';

import { useState } from 'react';
import { BudgetAnalytics, CategoryBudget } from '@/components/BudgetAnalytics';
import { TransactionTracker, Transaction } from '@/components/TransactionTracker';

export default function DashboardPage() {
  const [categories] = useState<CategoryBudget[]>([
    { category: 'Software & Infrastructure', spent: 1030, limit: 1200 },
    { category: 'Hardware & Equipment', spent: 1200, limit: 1000 },
    { category: 'Marketing & Research', spent: 450, limit: 800 },
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', title: 'Monthly Software Consulting', amount: 3200, type: 'income', category: 'Income', date: '2026-08-01' },
    { id: '2', title: 'AWS Cloud Hosting Server', amount: 480, type: 'expense', category: 'Software & Infrastructure', date: '2026-08-03' },
    { id: '3', title: 'Office Workstation Hardware', amount: 1200, type: 'expense', category: 'Hardware & Equipment', date: '2026-08-04' },
    { id: '4', title: 'AI API Model Credits', amount: 350, type: 'expense', category: 'Software & Infrastructure', date: '2026-08-05' },
  ]);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

  const handleTxAdded = (newTx: Transaction) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleTxDeleted = (id: string) => {
    setTransactions((prev) => prev.filter(t => t.id !== id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
      <div>
        <BudgetAnalytics
          income={totalIncome}
          expenses={totalExpenses}
          categories={categories}
          slaThreshold={2500}
        />
      </div>
      <div>
        <TransactionTracker
          onTransactionAdded={handleTxAdded}
          onTransactionDeleted={handleTxDeleted}
        />
      </div>
    </div>
  );
}
