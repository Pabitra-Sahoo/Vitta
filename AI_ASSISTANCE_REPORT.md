# Week 3 AI Assistance & Manual Refactoring Report: Vitta

## Overview of AI Assistance

AI served as an interactive co-developer during the construction of **Vitta (Wealth & Expense Financial Tracker)**:
- **Component Drafting**: AI accelerated initial setup by generating component templates for `TransactionTracker.tsx` and `BudgetAnalytics.tsx`.
- **Styling**: AI generated custom CSS tokens for the dark emerald & gold financial interface.
- **Testing**: AI produced initial Vitest unit test cases.

---

## Manual Corrections, Bug Fixes & Refactoring Case Studies

Reviewing AI-generated code is a mandatory engineering step. Below are three concrete manual improvements made to AI-generated code:

### Case Study 1: Floating-Point Currency Precision Bug Fix
* **AI Output Issue**: The AI initially used raw addition on input string values (`total += tx.amount`), leading to string concatenation bugs (e.g., `'100' + '50' = '10050'`) and JavaScript floating-point representation errors (e.g., `$124.30000000000001`).
* **Manual Fix**: Added explicit `parseFloat()` conversion during state creation and formatted display strings using `.toFixed(2)` and `toLocaleString()`.

```typescript
// AI Code (Buggy String Concatenation):
const handleAdd = (e) => {
  onAdd({ amount: amount }); // ❌ Passing unparsed string
};

// Manual Engineering Fix:
const handleAdd = (e: React.FormEvent) => {
  e.preventDefault();
  const numAmount = parseFloat(amount);
  if (!title.trim() || isNaN(numAmount) || numAmount <= 0) return; // ✅ Validated float
  onAddTransaction({ ...newTx, amount: numAmount });
};
```

---

### Case Study 2: Category Expense Memoization Performance
* **AI Output Issue**: The AI computed category distribution totals directly in the render body without `useMemo`. Every time a user typed a character in the search input, the entire transaction list was re-iterated and category totals re-calculated.
* **Manual Fix**: Wrapped category expense calculations in a memoized `useMemo` hook dependent strictly on `transactions`.

```typescript
// Manual Engineering Fix:
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

  return { income, expense, balance: income - expense, categoryExpenses };
}, [transactions]);
```

---

### Case Study 3: ARIA Alert Role Semantics for SLA Warnings
* **AI Output Issue**: The AI generated budget limit status banners using plain `<div>` containers, preventing screen readers from alerting users when their expenses exceeded monthly budget thresholds.
* **Manual Fix**: Refactored the status banner to include `role="alert"` and accessible SVG icon indicators.

---

## Conclusion
AI accelerated routine UI scaffolding by ~60%, while human engineering review fixed floating-point currency calculation bugs, optimized memoization performance, and guaranteed web accessibility compliance.
