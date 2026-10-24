import React, { useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Plus,
  RotateCcw,
  Scale,
  Info,
} from 'lucide-react';
import { TAccountEntry } from '../types/accounting';
import {
  CHART_OF_ACCOUNTS,
  computeTAccountsForScenario,
  formatCZK,
  getAccountClassTheme,
  getAccountInfo,
} from '../utils/accountingLogic';

interface InteractiveTAccountProps {
  scenarioTitle: string;
  scenarioContext: string;
  transactions: TAccountEntry[];
  initialBalances?: Record<string, { side: 'MD' | 'D'; amount: number }>;
}

export const InteractiveTAccount: React.FC<InteractiveTAccountProps> = ({
  scenarioTitle,
  scenarioContext,
  transactions,
  initialBalances = {},
}) => {
  const [customTransactions, setCustomTransactions] = useState<TAccountEntry[]>([]);
  const allTransactions = [...transactions, ...customTransactions];

  const [activeStep, setActiveStep] = useState<number>(allTransactions.length);
  const [showCustomForm, setShowCustomForm] = useState<boolean>(false);
  const [customDebit, setCustomDebit] = useState<string>('518');
  const [customCredit, setCustomCredit] = useState<string>('381');
  const [customAmount, setCustomAmount] = useState<string>('15000');
  const [customDesc, setCustomDesc] = useState<string>('Vlastní zkušební přeúčtování');

  // Ensure activeStep stays valid when switching cards
  const effectiveStep = Math.min(activeStep, allTransactions.length);
  const currentTx = effectiveStep > 0 ? allTransactions[effectiveStep - 1] : null;

  const computedAccounts = computeTAccountsForScenario(
    allTransactions,
    initialBalances,
    effectiveStep
  );

  const handleAddCustomTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseInt(customAmount.replace(/\s+/g, ''), 10);
    if (!customDebit.trim() || !customCredit.trim() || Number.isNaN(numericAmount) || numericAmount <= 0) {
      return;
    }
    const newEntry: TAccountEntry = {
      id: `custom-${Date.now()}`,
      document: `VÚD ${allTransactions.length + 1}`,
      date: '31. 12.',
      description: customDesc.trim() || 'Vlastní účetní zápis',
      amount: numericAmount,
      debitAccount: customDebit.trim(),
      creditAccount: customCredit.trim(),
      pedagogicalHint: `Vlastní souvztažný zápis: částka ${formatCZK(numericAmount)} byla připsána na MD ${customDebit.trim()} a současně na D ${customCredit.trim()}.`,
    };
    const updated = [...customTransactions, newEntry];
    setCustomTransactions(updated);
    setActiveStep(transactions.length + updated.length);
    setShowCustomForm(false);
  };

  const handleReset = () => {
    setCustomTransactions([]);
    setActiveStep(transactions.length);
    setShowCustomForm(false);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
      {/* Header & Stepper Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Interaktivní T-účty (Šibenice)</span>
            <span aria-hidden="true">·</span>
            <span>Podvojný tok Má dáti / Dal</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {scenarioTitle}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
            {scenarioContext}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
            disabled={effectiveStep <= 1}
            aria-label="Předchozí účetní krok"
            className="px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Předchozí krok</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveStep((prev) => Math.min(allTransactions.length, prev + 1))}
            disabled={effectiveStep >= allTransactions.length}
            aria-label="Další účetní krok"
            className="px-3 py-2 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
          >
            <span>Další krok</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setShowCustomForm((prev) => !prev)}
            className="px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Zkusit vlastní zápis</span>
          </button>

          {customTransactions.length > 0 && (
            <button
              type="button"
              onClick={handleReset}
              aria-label="Obnovit výchozí příklad"
              className="px-3 py-2 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Custom Sandbox Entry Form */}
      {showCustomForm && (
        <form
          onSubmit={handleAddCustomTransaction}
          className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end transition-all duration-150"
        >
            <div>
              <label
                htmlFor="custom-md-select"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Účet Má dáti (MD)
              </label>
              <select
                id="custom-md-select"
                value={customDebit}
                onChange={(e) => setCustomDebit(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100"
              >
                {CHART_OF_ACCOUNTS.map((acc) => (
                  <option key={`md-${acc.code}`} value={acc.code}>
                    {acc.code} — {acc.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="custom-d-select"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Účet Dal (D)
              </label>
              <select
                id="custom-d-select"
                value={customCredit}
                onChange={(e) => setCustomCredit(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100"
              >
                {CHART_OF_ACCOUNTS.map((acc) => (
                  <option key={`d-${acc.code}`} value={acc.code}>
                    {acc.code} — {acc.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="custom-amount-input"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Částka (Kč)
              </label>
              <input
                id="custom-amount-input"
                type="number"
                min={1}
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-mono tabular-nums text-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label
                htmlFor="custom-desc-input"
                className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Popis operace
              </label>
              <input
                id="custom-desc-input"
                type="text"
                value={customDesc}
                onChange={(e) => setCustomDesc(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="w-full px-4 py-2 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                Zaúčtovat do T-účtů
              </button>
            </div>
        </form>
      )}

      {/* Step Selector Timeline */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {allTransactions.map((tx, index) => {
          const stepNum = index + 1;
          const isCurrent = stepNum === effectiveStep;
          const isIncluded = stepNum <= effectiveStep;
          return (
            <button
              key={tx.id}
              type="button"
              onClick={() => setActiveStep(stepNum)}
              className={`px-3 py-2 rounded-xl text-left transition-all border ${
                isCurrent
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : isIncluded
                  ? 'bg-slate-100 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700'
                  : 'bg-transparent text-slate-500 dark:text-slate-500 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-medium">
                <span className="font-mono tabular-nums">
                  {stepNum}. {tx.document}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">
                  MD {tx.debitAccount} / D {tx.creditAccount}
                </span>
              </div>
              <div
                className={`text-[11px] mt-0.5 font-mono tabular-nums ${
                  isCurrent ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {tx.date} · {formatCZK(tx.amount)}
              </div>
            </button>
          );
        })}
      </div>

      {/* Visual Flow Diagram of Current Step */}
      {currentTx && (
        <div
          key={currentTx.id}
          className="mt-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 transition-all duration-150"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                  Krok {effectiveStep} z {allTransactions.length}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{currentTx.document}</span>
                <span aria-hidden="true">·</span>
                <span>{currentTx.date}</span>
              </div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {currentTx.description}
              </p>
            </div>

            {/* Visual Flow Pill Indicator: MD <--- Amount ---> D */}
            <div className="flex items-center gap-2.5 bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
              <div className="text-right">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Strana Má dáti (MD)
                </div>
                <div
                  className={`text-sm font-mono font-bold ${
                    getAccountClassTheme(currentTx.debitAccount).badgeText
                  }`}
                >
                  {currentTx.debitAccount} · {getAccountInfo(currentTx.debitAccount).name}
                </div>
              </div>

              <div className="flex flex-col items-center px-3">
                <span className="text-xs font-mono font-bold tabular-nums text-blue-600 dark:text-blue-400">
                  {formatCZK(currentTx.amount)}
                </span>
                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 my-0.5">
                  <div className="h-0.5 w-8 bg-blue-600 dark:bg-blue-400 rounded-full" />
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] text-slate-400 font-mono">souvztažně</span>
              </div>

              <div className="text-left">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Strana Dal (D)
                </div>
                <div
                  className={`text-sm font-mono font-bold ${
                    getAccountClassTheme(currentTx.creditAccount).badgeText
                  }`}
                >
                  {currentTx.creditAccount} · {getAccountInfo(currentTx.creditAccount).name}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-700/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
              <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>{currentTx.pedagogicalHint}</span>
            </div>
            {currentTx.taxImpact && (
              <div className="text-slate-500 dark:text-slate-400 font-medium shrink-0">
                Daňový dopad: <span className="text-slate-800 dark:text-slate-200">{currentTx.taxImpact}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* T-Accounts Grid ("Šibenice") */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {computedAccounts.map((tAcc) => {
          const isTouchedInCurrentStep =
            currentTx &&
            (currentTx.debitAccount === tAcc.accountCode ||
              currentTx.creditAccount === tAcc.accountCode);

          return (
            <div
              key={tAcc.accountCode}
              className={`rounded-xl border transition-all overflow-hidden flex flex-col justify-between ${
                tAcc.theme.borderClass
              } ${
                isTouchedInCurrentStep
                  ? 'ring-2 ring-blue-500/40 dark:ring-blue-400/40 bg-white dark:bg-slate-900'
                  : 'bg-slate-50/40 dark:bg-slate-900/50'
              }`}
            >
              {/* T-Account Header */}
              <div>
                <div className={`px-4 py-2.5 ${tAcc.theme.headerBg} border-b ${tAcc.theme.borderClass}`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-medium ${tAcc.theme.badgeText}`}>
                      {tAcc.theme.shortLabel}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {tAcc.accountInfo.nature === 'aktivni'
                        ? 'Aktivní (+MD / −D)'
                        : tAcc.accountInfo.nature === 'pasivni'
                        ? 'Pasivní (−MD / +D)'
                        : tAcc.accountInfo.nature === 'nakladovy'
                        ? 'Nákladový (+MD)'
                        : tAcc.accountInfo.nature === 'vynosovy'
                        ? 'Výnosový (+D)'
                        : 'Rozvahový / Závěrkový'}
                    </span>
                  </div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-base font-mono font-bold text-slate-900 dark:text-slate-100">
                      {tAcc.accountCode}
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {tAcc.accountInfo.name}
                    </span>
                  </div>
                </div>

                {/* Classic T-bar Crossbar ("Šibenice") */}
                <div className="grid grid-cols-2 border-b-2 border-slate-800 dark:border-slate-300 bg-slate-100/60 dark:bg-slate-800/50 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  <div className="px-3 py-1.5 border-r border-slate-800 dark:border-slate-300 flex items-center justify-between">
                    <span>MD (Má dáti)</span>
                    <span className="font-mono text-[10px] text-slate-500">vrub</span>
                  </div>
                  <div className="px-3 py-1.5 flex items-center justify-between">
                    <span>D (Dal)</span>
                    <span className="font-mono text-[10px] text-slate-500">prospěch</span>
                  </div>
                </div>

                {/* T-Account Body Columns */}
                <div className="grid grid-cols-2 min-h-[132px] text-xs">
                  {/* Left Side: MD */}
                  <div className="p-2.5 border-r-2 border-slate-800 dark:border-slate-300 space-y-1.5">
                    {tAcc.debitEntries.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-[11px] text-slate-400 dark:text-slate-600 py-6">
                        Bez zápisu na MD
                      </div>
                    ) : (
                      tAcc.debitEntries.map((item) => {
                        const isLatest = item.stepIndex === effectiveStep && !item.isInitialBalance;
                        return (
                          <div
                            key={item.id}
                            className={`px-2 py-1.5 rounded-lg font-mono tabular-nums flex items-center justify-between gap-1 ${
                              isLatest
                                ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800'
                                : 'text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                              {item.isInitialBalance ? 'PS' : `${item.stepIndex})`} /{item.contraAccount}
                            </span>
                            <span>{formatCZK(item.amount)}</span>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Right Side: D */}
                  <div className="p-2.5 space-y-1.5">
                    {tAcc.creditEntries.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-[11px] text-slate-400 dark:text-slate-600 py-6">
                        Bez zápisu na D
                      </div>
                    ) : (
                      tAcc.creditEntries.map((item) => {
                        const isLatest = item.stepIndex === effectiveStep && !item.isInitialBalance;
                        return (
                          <div
                            key={item.id}
                            className={`px-2 py-1.5 rounded-lg font-mono tabular-nums flex items-center justify-between gap-1 ${
                              isLatest
                                ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800'
                                : 'text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                              {item.isInitialBalance ? 'PS' : `${item.stepIndex})`} /{item.contraAccount}
                            </span>
                            <span>{formatCZK(item.amount)}</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              {/* T-Account Turnovers & Ending Balance Footer */}
              <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 px-3 py-2 text-xs font-mono tabular-nums">
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-slate-400 pb-1.5 border-b border-slate-200/70 dark:border-slate-800">
                  <div className="flex justify-between pr-1">
                    <span>Σ MD:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">
                      {formatCZK(tAcc.totalDebit)}
                    </span>
                  </div>
                  <div className="flex justify-between pl-1">
                    <span>Σ D:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">
                      {formatCZK(tAcc.totalCredit)}
                    </span>
                  </div>
                </div>

                <div className="pt-1.5 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Scale className="w-3 h-3" />
                    <span>Konečný zůstatek (KZ):</span>
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {tAcc.balanceSide === 'vyrovnano'
                      ? '0 Kč (vyrovnáno)'
                      : `${formatCZK(tAcc.endingBalance)} (${tAcc.balanceSide})`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
