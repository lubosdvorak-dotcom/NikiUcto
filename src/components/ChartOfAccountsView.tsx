import React, { useState } from 'react';
import { Search, ArrowLeft, Scale } from 'lucide-react';
import { useAccounting } from '../context/AccountingContext';
import { AccountClassNumber } from '../types/accounting';
import {
  ACCOUNT_CLASS_THEMES,
  CHART_OF_ACCOUNTS,
  getAccountClassTheme,
} from '../utils/accountingLogic';

export const ChartOfAccountsView: React.FC = () => {
  const { setCurrentView } = useAccounting();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<AccountClassNumber | 'all'>('all');

  const filteredAccounts = CHART_OF_ACCOUNTS.filter((acc) => {
    const matchesClass = selectedClass === 'all' || acc.accountClass === selectedClass;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      acc.code.toLowerCase().includes(q) ||
      acc.name.toLowerCase().includes(q) ||
      acc.description.toLowerCase().includes(q);
    return matchesClass && matchesQuery;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <button
              type="button"
              onClick={() => setCurrentView('dashboard')}
              className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-blue-600 font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Zpět na přehled</span>
            </button>
            <span aria-hidden="true">·</span>
            <span>Směrná účtová osnova pro obchodní akademie</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Interaktivní účtový rozvrh (Třídy 0–9)
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Barevně kódovaný přehled syntetických účtů, jejich rozvahové či výsledkové povahy a daňové uznatelnosti.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Hledat podle čísla účtu (např. 381, 451, 591) nebo názvu (např. rezervy, dohadné, nájemné)..."
            aria-label="Hledat účet v účtovém rozvrhu"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-slate-100 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedClass('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
              selectedClass === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Všechny třídy ({CHART_OF_ACCOUNTS.length})
          </button>
          {Object.values(ACCOUNT_CLASS_THEMES).map((cls) => {
            const active = selectedClass === cls.classNum;
            return (
              <button
                key={cls.classNum}
                type="button"
                onClick={() => setSelectedClass(cls.classNum)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap border ${
                  active
                    ? `${cls.badgeBg} ${cls.badgeText} ${cls.borderClass} font-bold`
                    : 'border-transparent bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {cls.shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accounts Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Účet</th>
                <th className="py-3 px-4 font-semibold">Název syntetického účtu</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Účtová třída</th>
                <th className="py-3 px-4 font-semibold whitespace-nowrap">Povaha a pravidlo stran</th>
                <th className="py-3 px-4 font-semibold">Vysvětlení a daňová poznámka u maturity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredAccounts.map((acc) => {
                const theme = getAccountClassTheme(acc.accountClass);
                return (
                  <tr
                    key={acc.code}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono text-sm font-bold whitespace-nowrap">
                      <span className={theme.badgeText}>{acc.code}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-slate-100">
                      {acc.name}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`font-medium ${theme.badgeText}`}>{theme.shortLabel}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {acc.nature === 'aktivni' && 'Aktivní (+MD / −D)'}
                      {acc.nature === 'pasivni' && 'Pasivní (−MD / +D)'}
                      {acc.nature === 'aktivne_pasivni' && 'Aktivně-pasivní'}
                      {acc.nature === 'nakladovy' && 'Nákladový (+MD)'}
                      {acc.nature === 'vynosovy' && 'Výnosový (+D)'}
                      {acc.nature === 'zaverkovy' && 'Závěrkový (Tř. 7)'}
                      {acc.nature === 'vnitropodnikovy' && 'Vnitropodnikový'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 space-y-1">
                      <div>{acc.description}</div>
                      {acc.taxNote && (
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-blue-700 dark:text-blue-400">
                          <Scale className="w-3 h-3 shrink-0" />
                          <span>{acc.taxNote}</span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
