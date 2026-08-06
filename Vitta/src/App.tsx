import { useState, useEffect } from 'react';
import { Wallet, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { TransactionTracker, Transaction } from './components/TransactionTracker';
import { BudgetAnalytics } from './components/BudgetAnalytics';

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', title: 'Monthly Salary Deposit', amount: 4500, type: 'income', category: 'Salary & Client', date: 'Aug 1' },
  { id: '2', title: 'Apartment Rent Payment', amount: 1200, type: 'expense', category: 'Housing', date: 'Aug 2' },
  { id: '3', title: 'Grocery Shopping', amount: 240, type: 'expense', category: 'Food & Dining', date: 'Aug 4' },
];

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('vitta_transactions');
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vitta_transactions', JSON.stringify(transactions));
    } catch (e) {
      console.error('Failed to sync Vitta transactions to localStorage', e);
    }
  }, [transactions]);

  const handleAddTransaction = (tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const income = transactions.filter((t) => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter((t) => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expense;

  return (
    <div className="vitta-app">
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Wallet size={32} color="#34d399" />
          <div>
            <h1 className="logo-title">Vitta</h1>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>
              Wealth & Expense Financial Tracker
            </p>
          </div>
        </div>
        <span style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', border: '1px solid rgba(52, 211, 153, 0.3)', borderRadius: '9999px', fontWeight: 600 }}>
          Week 3 AI React Build
        </span>
      </header>

      {/* Summary KPI Cards Grid */}
      <div className="overview-grid">
        <div className="summary-card">
          <div className="summary-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Net Balance</span>
            <DollarSign size={16} color="#34d399" />
          </div>
          <div className="summary-amount">${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>

        <div className="summary-card">
          <div className="summary-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Total Income</span>
            <TrendingUp size={16} color="#34d399" />
          </div>
          <div className="summary-amount amount-income">+${income.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>

        <div className="summary-card">
          <div className="summary-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Total Expenses</span>
            <TrendingDown size={16} color="#f87171" />
          </div>
          <div className="summary-amount amount-expense">-${expense.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
      </div>

      <div className="main-grid">
        <TransactionTracker
          transactions={transactions}
          onAddTransaction={handleAddTransaction}
          onDeleteTransaction={handleDeleteTransaction}
        />
        <BudgetAnalytics transactions={transactions} monthlyBudgetLimit={2500} />
      </div>
    </div>
  );
}
