'use client';

import React from 'react';
import { FinancialAnalysisInput, FinancialAnalysisResult } from '@/lib/tools';
import { ShieldAlert, CheckCircle, AlertTriangle, Activity, Loader2, RefreshCw } from 'lucide-react';

export type ToolState = 'input-streaming' | 'input-available' | 'output-available' | 'output-error';

export interface FinancialToolResultCardProps {
  state: ToolState;
  input?: Partial<FinancialAnalysisInput>;
  result?: FinancialAnalysisResult;
  error?: string;
  onRetry?: () => void;
}

export function FinancialToolResultCard({
  state,
  input,
  result,
  error,
  onRetry,
}: FinancialToolResultCardProps) {
  // STATE 1: Input Streaming (Distinct Pulsing Tool Call Visual Treatment)
  if (state === 'input-streaming') {
    return (
      <div className="p-4 rounded-xl bg-[#022c22]/80 border border-emerald-500/40 animate-pulse text-xs space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 font-bold">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>[Tool Streaming]: Requesting Vitta Financial Health Analysis...</span>
        </div>
        <div className="text-[11px] text-emerald-200/70 font-mono">
          Streaming Input Parameters: {JSON.stringify(input || {})}
        </div>
      </div>
    );
  }

  // STATE 2: Input Available (Executing Tool Call)
  if (state === 'input-available') {
    return (
      <div className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-extrabold text-emerald-300 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-emerald-400 animate-bounce" />
            Tool Executing: calculateCategoryBudgetAnalysis
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
            EXECUTING
          </span>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px] font-mono text-emerald-200">
          <span className="px-2 py-0.5 rounded bg-emerald-900/60 border border-emerald-800">
            Category: {input?.category || 'General'}
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-900/60 border border-emerald-800">
            Budget: ${input?.monthlyBudget || 0}
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-900/60 border border-emerald-800">
            Spent: ${input?.currentSpent || 0}
          </span>
        </div>
      </div>
    );
  }

  // STATE 3: Output Error (Designed Error State, Not a Crash!)
  if (state === 'output-error') {
    return (
      <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-xs space-y-3 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-400 font-extrabold">
            <AlertTriangle className="w-4 h-4" />
            <span>Tool Execution Failed</span>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex items-center gap-1 px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 rounded-lg font-bold text-[11px] transition-all"
            >
              <RefreshCw className="w-3 h-3" /> Retry Tool Call
            </button>
          )}
        </div>
        <p className="text-[11px] text-red-200/90 font-medium">
          {error || 'An unexpected error occurred while executing the financial analysis tool.'}
        </p>
      </div>
    );
  }

  // STATE 4: Output Available (Real Generative UI Component Rendered, NOT JSON dump!)
  if (!result) return null;

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-[#022c22] to-[#064e3b] border border-emerald-500/40 shadow-xl space-y-4 text-xs font-sans animate-fade-in">
      {/* Header Badge & Title */}
      <div className="flex items-center justify-between border-b border-emerald-800/60 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-[#10b981]">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-emerald-300">
              Vitta Generative UI Tool Output
            </h3>
            <p className="text-[10px] text-emerald-200/70 font-semibold">
              Category: <span className="text-white font-bold">{result.category}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono font-bold text-xs">
          <span>Score: {result.healthScore}/100</span>
        </div>
      </div>

      {/* SLA Alert Banner if threshold exceeded */}
      {result.isSlaExceeded && (
        <div role="alert" className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center gap-2.5 text-red-300 font-bold">
          <ShieldAlert className="w-5 h-5 shrink-0 text-red-400" />
          <span>SLA LIMIT EXCEEDED: Expenses (${result.currentSpent.toLocaleString()}) surpass the $${result.slaThreshold.toLocaleString()} monthly SLA alert threshold.</span>
        </div>
      )}

      {/* Progress Bar & Key Numbers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800/60">
          <div className="text-[10px] text-emerald-300/70 font-semibold">Target Budget</div>
          <div className="text-sm font-extrabold text-white">${result.monthlyBudget.toLocaleString()}</div>
        </div>

        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800/60">
          <div className="text-[10px] text-emerald-300/70 font-semibold">Total Spent</div>
          <div className={`text-sm font-extrabold ${result.isOverBudget ? 'text-red-400' : 'text-emerald-400'}`}>
            ${result.currentSpent.toLocaleString()}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800/60 col-span-2 sm:col-span-1">
          <div className="text-[10px] text-emerald-300/70 font-semibold">Remaining Balance</div>
          <div className={`text-sm font-extrabold ${result.remainingBudget < 0 ? 'text-red-400' : 'text-emerald-300'}`}>
            ${result.remainingBudget.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Visual Spending Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] font-bold">
          <span className="text-emerald-300">Budget Usage ({result.percentageUsed}%)</span>
          <span className={result.percentageUsed > 100 ? 'text-red-400' : 'text-emerald-400'}>
            {result.percentageUsed}% Used
          </span>
        </div>
        <div className="w-full h-3 bg-emerald-950 rounded-full overflow-hidden border border-emerald-800">
          <div
            className={`h-full transition-all duration-500 ${
              result.percentageUsed > 100
                ? 'bg-red-500'
                : result.percentageUsed > 80
                ? 'bg-amber-400'
                : 'bg-[#10b981]'
            }`}
            style={{ width: `${Math.min(100, result.percentageUsed)}%` }}
          />
        </div>
      </div>

      {/* AI Recommendation Summary */}
      <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-[11px] text-emerald-200/90 font-medium">
        <span className="font-bold text-emerald-300">AI Recommendation: </span>
        {result.recommendation}
      </div>
    </div>
  );
}
