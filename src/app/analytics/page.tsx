import { BudgetAnalytics } from '@/components/BudgetAnalytics';

export const metadata = {
  title: 'Budget Analytics | Vitta Capstone',
  description: 'Category spending breakdown and KPI analytics in Vitta Next.js Capstone',
};

export default function AnalyticsPage() {
  const categories = [
    { category: 'Software & Infrastructure', spent: 1030, limit: 1200 },
    { category: 'Hardware & Equipment', spent: 1200, limit: 1000 },
    { category: 'Marketing & Research', spent: 450, limit: 800 },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-fade-in">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-extrabold text-[var(--text-main)]">Category Budget Analytics</h1>
        <p className="text-xs text-[var(--text-muted)]">Track monthly expense thresholds and category spending ratios</p>
      </div>
      <BudgetAnalytics
        income={3200}
        expenses={2680}
        categories={categories}
        slaThreshold={2500}
      />
    </div>
  );
}
