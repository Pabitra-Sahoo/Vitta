'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Plus, Trash2, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

interface TransactionTrackerProps {
  onTransactionAdded?: (t: Transaction) => void;
  onTransactionDeleted?: (id: string) => void;
}

export function TransactionTracker({
  onTransactionAdded,
  onTransactionDeleted,
}: TransactionTrackerProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('vitta_transactions');
      return saved ? JSON.parse(saved) : [
        { id: '1', title: 'Monthly Software Consulting', amount: 3200, type: 'income', category: 'Income', date: '2026-08-01' },
        { id: '2', title: 'AWS Cloud Hosting Server', amount: 480, type: 'expense', category: 'Infrastructure', date: '2026-08-03' },
        { id: '3', title: 'Office Workstation Hardware', amount: 1200, type: 'expense', category: 'Equipment', date: '2026-08-04' },
        { id: '4', title: 'AI API Model Credits', amount: 350, type: 'expense', category: 'Software', date: '2026-08-05' },
      ];
    } catch {
      return [];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('Software');
  const [txToDelete, setTxToDelete] = useState<Transaction | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('vitta_transactions', JSON.stringify(transactions));
    } catch (e) {
      console.error('Failed to save transactions', e);
    }
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [transactions, searchQuery]);

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!title.trim() || isNaN(parsedAmount) || parsedAmount <= 0) return;

    const newTx: Transaction = {
      id: Date.now().toString(),
      title: title.trim(),
      amount: parsedAmount,
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    };

    setTransactions((prev) => [newTx, ...prev]);
    if (onTransactionAdded) onTransactionAdded(newTx);

    setTitle('');
    setAmount('');
  };

  const confirmDelete = () => {
    if (txToDelete) {
      setTransactions((prev) => prev.filter((t) => t.id !== txToDelete.id));
      if (onTransactionDeleted) onTransactionDeleted(txToDelete.id);
      setTxToDelete(null);
    }
  };

  return (
    <div className="vitta-card flex flex-col h-[520px]" role="region" aria-label="Transaction Ledger Search">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-extrabold text-[var(--text-main)] m-0">Transaction Ledger</h3>
        <div className="relative w-48">
          <Search className="w-3.5 h-3.5 text-[var(--text-dim)] absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ledger..."
            className="w-full pl-8 pr-2 py-1 text-xs rounded-lg bg-[var(--bg-input)] border border-[var(--border-card)] text-[var(--text-main)] outline-none"
            aria-label="Search ledger transactions"
          />
        </div>
      </div>

      {/* Add Transaction Form */}
      <form onSubmit={handleAddTransaction} className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-3 p-2 bg-[var(--bg-input)] rounded-xl border border-[var(--border-card)]">
        <input
          type="text"
          placeholder="Title (e.g. Vercel Hosting)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="sm:col-span-2 px-2 py-1.5 text-xs rounded-lg bg-[var(--bg-card)] border border-[var(--border-card)] text-[var(--text-main)] outline-none"
          aria-label="Transaction Title"
        />
        <input
          type="number"
          step="0.01"
          placeholder="Amount ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="px-2 py-1.5 text-xs rounded-lg bg-[var(--bg-card)] border border-[var(--border-card)] text-[var(--text-main)] outline-none"
          aria-label="Transaction Amount"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as 'income' | 'expense')}
          className="px-2 py-1.5 text-xs rounded-lg bg-[var(--bg-card)] border border-[var(--border-card)] text-[var(--text-main)] cursor-pointer"
          aria-label="Transaction Type"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <button type="submit" className="py-1.5 rounded-lg bg-gradient-to-r from-[#10b981] to-[#059669] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1 cursor-pointer">
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </form>

      {/* Delete Confirmation Alert */}
      {txToDelete && (
        <div className="p-3 mb-3 bg-rose-500/15 border border-rose-500/30 rounded-xl flex items-center justify-between animate-fade-in" role="alert">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
            <AlertTriangle className="w-4 h-4" /> Delete: {txToDelete.title.slice(0, 18)}?
          </div>
          <div className="flex gap-2">
            <button onClick={confirmDelete} className="px-2.5 py-1 text-xs font-bold bg-rose-500 text-white rounded-lg cursor-pointer">
              Confirm
            </button>
            <button onClick={() => setTxToDelete(null)} className="px-2.5 py-1 text-xs font-semibold bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-card)] rounded-lg cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Ledger List */}
      <div className="scrollable-list flex-1">
        {filteredTransactions.length === 0 ? (
          <p className="text-center text-xs text-[var(--text-dim)] py-6">No matching transactions found.</p>
        ) : (
          filteredTransactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-3 mb-2 rounded-xl bg-[var(--bg-input)] border border-[var(--border-card)] hover:border-[var(--accent-color)] transition-all">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.type === 'income' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'}`}>
                  {t.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                </div>
                <div>
                  <div className="text-xs md:text-sm font-bold text-[var(--text-main)]">{t.title}</div>
                  <div className="text-[11px] text-[var(--text-dim)]">{t.date} &bull; {t.category}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-sm font-mono font-extrabold ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                </span>
                <button onClick={() => setTxToDelete(t)} className="text-rose-400 hover:text-rose-500 p-1 cursor-pointer" aria-label={`Delete transaction ${t.title}`}>
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
