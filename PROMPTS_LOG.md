# Week 3 AI Development Prompts Log: Vitta Budget Tracker

## Target Application
**Vitta — Wealth & Expense Financial Tracker** (React 18 + TypeScript + Vite)

---

## Chronological Prompts Log

### Phase 1: Architecture Scaffolding
> **Prompt 1**:  
> *"Act as a Senior React Engineer. Design a modern personal expense and budget analytics application called Vitta using React 18, TypeScript, and Vite. The application requires: 1) Transaction Ledger to record Income & Expenses with categories, 2) Financial KPI Summary Cards (Net Balance, Income, Expense), 3) Category Spending Distribution Progress Bars, and 4) Monthly Budget SLA Warning Alerts. Provide modular components and dark emerald glassmorphic CSS."*

---

### Phase 2: Core Components Development

> **Prompt 2 (Transaction Ledger)**:  
> *"Write `TransactionTracker.tsx` handling form inputs for transaction title, amount, type ('income' | 'expense'), and category selection. Include real-time query filtering and deletion triggers."*

> **Prompt 3 (Budget Analytics & SLA Warning)**:  
> *"Create `BudgetAnalytics.tsx` calculating category expenses with `useMemo`. Render progress bars for category spending and display an accessible SLA alert banner when total expenses exceed the monthly budget limit ($2,500)."*

---

### Phase 3: Verification & Test Suite

> **Prompt 4 (Vitest Suite)**:  
> *"Write co-located Vitest unit tests in `BudgetAnalytics.test.tsx` asserting monthly budget limit rendering, safe limits status, and budget limit exceeded alert triggers."*
