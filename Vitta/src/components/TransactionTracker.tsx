import { useState } from 'react';
import { PlusCircle, Trash2, ArrowUpRight, ArrowDownRight, Search, AlertTriangle } from 'lucide-react';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
}

interface TransactionTrackerProps {
  transactions: Transaction[];
  onAddTransaction: (tx: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
}

export const TransactionTracker: React.FC<TransactionTrackerProps> = ({
  transactions,
  onAddTransaction,
  onDeleteTransaction,
}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState('Housing');
  const [search, setSearch] = useState('');
  const [txToDelete, setTxToDelete] = useState<Transaction | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!title.trim() || isNaN(numAmount) || numAmount <= 0) return;

    const newTx: Transaction = {
      id: Date.now().toString(),
      title: title.trim(),
      amount: numAmount,
      type,
      category,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };

    onAddTransaction(newTx);
    setTitle('');
    setAmount('');
  };

  const confirmDeleteTransaction = () => {
    if (txToDelete) {
      onDeleteTransaction(txToDelete.id);
      setTxToDelete(null);
    }
  };

  const filteredTransactions = transactions.filter((t) =>
    t.title.toLowerCase().includes(search.trim().toLowerCase()) ||
    t.category.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="card card-scrollable" role="region" aria-label="Transaction Ledger">
      <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', color: '#f8fafc' }}>Add New Transaction</h3>

      <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (e.g. Monthly Rent, Client Invoice)"
          style={{ gridColumn: 'span 2', padding: '0.65rem 1rem', borderRadius: '10px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
          aria-label="Transaction Title"
        />

        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount ($)"
          style={{ padding: '0.65rem 1rem', borderRadius: '10px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
          aria-label="Transaction Amount"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType)}
          style={{ padding: '0.65rem 1rem', borderRadius: '10px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
          aria-label="Transaction Type"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ gridColumn: 'span 2', padding: '0.65rem 1rem', borderRadius: '10px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
          aria-label="Category"
        >
          <option value="Housing">Housing</option>
          <option value="Food & Dining">Food & Dining</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Salary & Client">Salary & Client</option>
        </select>

        <button type="submit" className="btn" style={{ gridColumn: 'span 2', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', fontWeight: 700, padding: '0.75rem', borderRadius: '10px', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
          <PlusCircle size={18} /> Add Transaction
        </button>
      </form>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <Search size={16} color="#94a3b8" />
        <input
          type="text"
          placeholder="Filter ledger by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: '0.5rem 0.75rem', borderRadius: '8px', background: 'rgba(15,23,42,0.4)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', fontSize: '0.85rem' }}
          aria-label="Filter ledger"
        />
      </div>

      {/* Delete Confirmation Banner */}
      {txToDelete && (
        <div className="delete-banner" role="alert">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#f87171' }}>
            <AlertTriangle size={18} /> Delete transaction: {txToDelete.title.slice(0, 18)} (${txToDelete.amount})?
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={confirmDeleteTransaction}
              style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', padding: '0.25rem 0.6rem', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}
            >
              Confirm
            </button>
            <button
              onClick={() => setTxToDelete(null)}
              style={{ background: 'rgba(255,255,255,0.1)', color: '#cbd5e1', border: 'none', borderRadius: '6px', padding: '0.25rem 0.6rem', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Fixed Container Height + Internal Scrollable Ledger */}
      <div className="scrollable-list">
        {filteredTransactions.length === 0 ? (
          <p role="status" style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem', padding: '1rem 0' }}>
            No transactions found matching "{search}"
          </p>
        ) : (
          filteredTransactions.map((tx) => (
            <div key={tx.id} className="tx-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {tx.type === 'income' ? <ArrowUpRight color="#34d399" size={20} /> : <ArrowDownRight color="#f87171" size={20} />}
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{tx.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{tx.date} • <span className="badge-tag" style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399' }}>{tx.category}</span></div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className={tx.type === 'income' ? 'amount-income' : 'amount-expense'} style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                  {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => setTxToDelete(tx)}
                  style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.2rem' }}
                  aria-label={`Delete ${tx.title}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
