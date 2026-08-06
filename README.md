# Vitta — Wealth & Expense Financial Tracker

## Track: Frontend AI Engineering (Week 3 Assignment)

Vitta is a modern, accessible financial tracking web application built with **React 18**, **TypeScript**, **Vite**, and **Glassmorphic CSS**.

## Features
- 💰 **Financial KPI Overview**: Net Balance, Total Income, and Total Expense cards.
- 📊 **Category Spending Breakdown**: Visual progress bars tracking category distribution against monthly budgets.
- 🚨 **SLA Budget Warning**: Accessible `role="alert"` banner notifying users when expenses exceed budget limits ($2,500).
- 🔍 **Transaction Ledger**: Search filtering, category tagging, and localStorage persistence.
- 🧪 **Vitest Suite**: Co-located unit tests (`BudgetAnalytics.test.tsx`).

## Assignment Documentation
- [`PROMPTS_LOG.md`](./PROMPTS_LOG.md): Full log of prompts used during AI-assisted development.
- [`AI_ASSISTANCE_REPORT.md`](./AI_ASSISTANCE_REPORT.md): AI role breakdown + 3 case studies of manual code refactoring and bug fixes.

## Run Locally
```bash
cd Vitta
npm install
npm run dev
```

## Run Tests
```bash
cd Vitta
npm test
```
