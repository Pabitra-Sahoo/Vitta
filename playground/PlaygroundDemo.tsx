'use client';

import React, { useState } from 'react';
import { ModalDialog } from './ModalDialog';
import { Tabs } from './Tabs';
import { Disclosure } from './Disclosure';

export function PlaygroundDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInput, setModalInput] = useState('');

  const sampleTabs = [
    {
      id: 'aria-modal',
      label: '1. Modal Dialog Specs',
      content: (
        <div className="space-y-2">
          <p className="font-bold text-emerald-400">W3C ARIA Dialog Pattern</p>
          <ul className="list-disc list-inside text-xs space-y-1 text-emerald-200/90">
            <li><code className="bg-emerald-950 px-1 py-0.5 rounded font-mono">role="dialog"</code> and <code className="bg-emerald-950 px-1 py-0.5 rounded font-mono">aria-modal="true"</code></li>
            <li>Focus trapped on <kbd className="px-1.5 py-0.5 bg-emerald-900 border border-emerald-700 rounded text-[10px]">Tab</kbd> / <kbd className="px-1.5 py-0.5 bg-emerald-900 border border-emerald-700 rounded text-[10px]">Shift+Tab</kbd></li>
            <li>Closes on <kbd className="px-1.5 py-0.5 bg-emerald-900 border border-emerald-700 rounded text-[10px]">Escape</kbd></li>
            <li>Focus restored to trigger button upon close</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'aria-tabs',
      label: '2. Tabs Specs',
      content: (
        <div className="space-y-2">
          <p className="font-bold text-emerald-400">W3C ARIA Tablist Pattern</p>
          <ul className="list-disc list-inside text-xs space-y-1 text-emerald-200/90">
            <li><code className="bg-emerald-950 px-1 py-0.5 rounded font-mono">role="tablist"</code>, <code className="bg-emerald-950 px-1 py-0.5 rounded font-mono">role="tab"</code>, <code className="bg-emerald-950 px-1 py-0.5 rounded font-mono">role="tabpanel"</code></li>
            <li><kbd className="px-1.5 py-0.5 bg-emerald-900 border border-emerald-700 rounded text-[10px]">←</kbd> / <kbd className="px-1.5 py-0.5 bg-emerald-900 border border-emerald-700 rounded text-[10px]">→</kbd> arrow key navigation</li>
            <li><kbd className="px-1.5 py-0.5 bg-emerald-900 border border-emerald-700 rounded text-[10px]">Home</kbd> / <kbd className="px-1.5 py-0.5 bg-emerald-900 border border-emerald-700 rounded text-[10px]">End</kbd> jump navigation</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'aria-disclosure',
      label: '3. Disclosure Specs',
      content: (
        <div className="space-y-2">
          <p className="font-bold text-emerald-400">W3C ARIA Disclosure Pattern</p>
          <ul className="list-disc list-inside text-xs space-y-1 text-emerald-200/90">
            <li><code className="bg-emerald-950 px-1 py-0.5 rounded font-mono">aria-expanded="true|false"</code> trigger</li>
            <li><code className="bg-emerald-950 px-1 py-0.5 rounded font-mono">aria-controls="panel-id"</code> link</li>
            <li>Native keyboard activation (<kbd className="px-1.5 py-0.5 bg-emerald-900 border border-emerald-700 rounded text-[10px]">Enter</kbd> / <kbd className="px-1.5 py-0.5 bg-emerald-900 border border-emerald-700 rounded text-[10px]">Space</kbd>)</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6 bg-[#022c22]/40 rounded-2xl border border-emerald-800/40">
      <div className="border-b border-emerald-800/60 pb-4">
        <h1 className="text-2xl font-extrabold text-emerald-400">
          FE-05 Accessible Components Playground
        </h1>
        <p className="text-xs text-emerald-200/80 mt-1">
          Hand-built React + TypeScript components implemented against W3C ARIA patterns (No component libraries).
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-emerald-300 flex items-center gap-2">
          <span>1. Modal Dialog (Focus Trap & ARIA Role)</span>
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-xs rounded-xl shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          Open Accessible Modal Dialog
        </button>

        <ModalDialog
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Vitta Financial Budget Setup"
          description="Test keyboard focus trap (Tab/Shift+Tab) and press Escape to close."
        >
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-emerald-300 mb-1">
                Category Monthly Target ($)
              </label>
              <input
                type="number"
                value={modalInput}
                onChange={(e) => setModalInput(e.target.value)}
                placeholder="Enter amount (e.g. 500)"
                className="w-full px-3 py-2 bg-emerald-950/80 border border-emerald-700 rounded-lg text-emerald-100 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 text-xs font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Budget target saved: $${modalInput || 0}`);
                  setIsModalOpen(false);
                }}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 text-xs font-extrabold rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                Save Budget
              </button>
            </div>
          </div>
        </ModalDialog>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-emerald-300">
          2. Tabs (Arrow Key Navigation & ARIA Roles)
        </h2>
        <Tabs tabs={sampleTabs} />
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-emerald-300">
          3. Disclosure / Accordion (Aria-Expanded Trigger)
        </h2>
        <div className="space-y-2">
          <Disclosure id="disc-1" title="What is the W3C ARIA Focus Trap Requirement?">
            Focus trapping ensures that when a modal is open, pressing Tab or Shift+Tab cycles focus exclusively between elements inside the modal, preventing keyboard users from interacting with covered background elements.
          </Disclosure>

          <Disclosure id="disc-2" title="How does keyboard navigation work in Tabs?">
            When focused on a tab header, pressing Left or Right arrow keys moves focus to the adjacent tab and updates the active tabpanel. Home jumps to the first tab, and End jumps to the final tab.
          </Disclosure>
        </div>
      </section>
    </div>
  );
}
