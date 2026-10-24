/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Moon, Sun, BookOpen, ClipboardCheck } from 'lucide-react';
import { AccountingProvider, useAccounting } from './context/AccountingContext';
import { DashboardBento } from './components/DashboardBento';
import { StudyWorkspace } from './components/StudyWorkspace';
import { TestConfigurator } from './components/TestConfigurator';
import { TestRunner } from './components/TestRunner';
import { TestResults } from './components/TestResults';
import { ChartOfAccountsView } from './components/ChartOfAccountsView';

const MainShell: React.FC = () => {
  const {
    theme,
    toggleTheme,
    currentView,
    setCurrentView,
    selectTopic,
    activeTopicId,
    startTest,
  } = useAccounting();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
          {/* Zone 1: Single text element wordmark */}
          <button
            type="button"
            onClick={() => setCurrentView('dashboard')}
            className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 cursor-pointer"
          >
            ÚčtoMaturita
          </button>

          {/* Zone 2: 4 concise single-line text navigation links */}
          <nav
            aria-label="Hlavní navigace"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            <button
              type="button"
              onClick={() => setCurrentView('dashboard')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                currentView === 'dashboard'
                  ? 'text-blue-600 dark:text-blue-400 underline underline-offset-8 decoration-2'
                  : ''
              }`}
            >
              Přehled okruhů
            </button>
            <button
              type="button"
              onClick={() => selectTopic(activeTopicId, 'study')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                currentView === 'study'
                  ? 'text-blue-600 dark:text-blue-400 underline underline-offset-8 decoration-2'
                  : ''
              }`}
            >
              Režim studia
            </button>
            <button
              type="button"
              onClick={() => setCurrentView('test_config')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                currentView === 'test_config' ||
                currentView === 'test_runner' ||
                currentView === 'test_results'
                  ? 'text-blue-600 dark:text-blue-400 underline underline-offset-8 decoration-2'
                  : ''
              }`}
            >
              Režim testu
            </button>
            <button
              type="button"
              onClick={() => setCurrentView('chart_of_accounts')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                currentView === 'chart_of_accounts'
                  ? 'text-blue-600 dark:text-blue-400 underline underline-offset-8 decoration-2'
                  : ''
              }`}
            >
              Účtový rozvrh
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() =>
                startTest({
                  length: 30,
                  selectedTopicIds: [1, 2, 3, 4, 5, 6],
                  timed: true,
                })
              }
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0"
            >
              Maturitní test (30)
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {currentView === 'dashboard' && <DashboardBento />}
        {currentView === 'study' && <StudyWorkspace />}
        {currentView === 'test_config' && <TestConfigurator />}
        {currentView === 'test_runner' && <TestRunner />}
        {currentView === 'test_results' && <TestResults />}
        {currentView === 'chart_of_accounts' && <ChartOfAccountsView />}
      </main>

      {/* Quiet Pedagogical Footer with Theme Switch */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            ÚčtoMaturita · Interaktivní výuková aplikace pro 4. ročník obchodních akademií (České účetní standardy & Zákon o daních z příjmů)
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => selectTopic(1, 'study')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
            >
              Okruh 1: Časové rozlišení
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setCurrentView('test_config')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
            >
              Maturitní trenažér
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setCurrentView('chart_of_accounts')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
            >
              Účtový rozvrh
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Přepnout na tmavý režim' : 'Přepnout na světlý režim'}
              className="inline-flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-3.5 h-3.5" />
                  <span>Tmavé téma</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Světlé téma</span>
                </>
              )}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AccountingProvider>
      <MainShell />
    </AccountingProvider>
  );
}
