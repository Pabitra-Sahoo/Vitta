import { TransactionTracker } from '@/components/TransactionTracker';

export const metadata = {
  title: 'Transaction Ledger | Vitta Capstone',
  description: 'Searchable transaction ledger and expense tracking in Vitta Next.js Capstone',
};

export default function LedgerPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-fade-in">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-extrabold text-[var(--text-main)]">Transaction Ledger</h1>
        <p className="text-xs text-[var(--text-muted)]">Search, filter, and audit income &amp; expense items</p>
      </div>
      <TransactionTracker />
    </div>
  );
}
