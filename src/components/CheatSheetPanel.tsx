import React, { useState } from 'react';
import { ChevronDown, BookOpenCheck, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';
import { TopicCheatSheet } from '../types/accounting';
import { getAccountClassTheme, getAccountInfo } from '../utils/accountingLogic';

interface CheatSheetPanelProps {
  cheatSheets: TopicCheatSheet[];
  defaultOpen?: boolean;
}

export const CheatSheetPanel: React.FC<CheatSheetPanelProps> = ({
  cheatSheets,
  defaultOpen = true,
}) => {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpen && cheatSheets.length > 0 ? [cheatSheets[0].id] : []
  );

  const toggleSheet = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      {cheatSheets.map((sheet) => {
        const isOpen = openIds.includes(sheet.id);
        return (
          <div
            key={sheet.id}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggleSheet(sheet.id)}
              aria-expanded={isOpen}
              className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <BookOpenCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Sbalitelný maturitní tahák · Souvztažnosti a daňový režim
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
                    {sheet.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {sheet.summary}
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-slate-500 transition-transform duration-200 shrink-0 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="border-t border-slate-200 dark:border-slate-800 overflow-x-auto transition-all duration-150">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                        <th className="py-3 px-4 font-semibold">Účetní operace</th>
                        <th className="py-3 px-3 font-semibold whitespace-nowrap">Doklad</th>
                        <th className="py-3 px-3 font-semibold whitespace-nowrap">Má dáti (MD)</th>
                        <th className="py-3 px-3 font-semibold whitespace-nowrap">Dal (D)</th>
                        <th className="py-3 px-4 font-semibold">Podmínka / Legislativní poznámka</th>
                        <th className="py-3 px-4 font-semibold whitespace-nowrap">Daňová uznatelnost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {sheet.items.map((item) => {
                        const primaryMD = item.debitAccount.split('/')[0].trim();
                        const primaryD = item.creditAccount.split('/')[0].trim();
                        const mdTheme = getAccountClassTheme(primaryMD);
                        const dTheme = getAccountClassTheme(primaryD);

                        return (
                          <tr
                            key={item.id}
                            className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors"
                          >
                            <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">
                              {item.operation}
                            </td>
                            <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
                              {item.document}
                            </td>
                            <td className="py-3 px-3 whitespace-nowrap">
                              <span
                                title={getAccountInfo(primaryMD).name}
                                className={`font-mono font-bold ${mdTheme.badgeText}`}
                              >
                                {item.debitAccount}
                              </span>
                            </td>
                            <td className="py-3 px-3 whitespace-nowrap">
                              <span
                                title={getAccountInfo(primaryD).name}
                                className={`font-mono font-bold ${dTheme.badgeText}`}
                              >
                                {item.creditAccount}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                              {item.conditionOrNote}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              {item.taxDeductible === 'ano' && (
                                <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Daňově uznatelné</span>
                                </span>
                              )}
                              {item.taxDeductible === 'ne' && (
                                <span className="inline-flex items-center gap-1.5 text-rose-700 dark:text-rose-400 font-medium">
                                  <AlertTriangle className="w-3.5 h-3.5" />
                                  <span>Nedaňové (§ 25 ZDP)</span>
                                </span>
                              )}
                              {item.taxDeductible === 'podminene' && (
                                <span className="inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-medium">
                                  <HelpCircle className="w-3.5 h-3.5" />
                                  <span>Dle období / podmínky</span>
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
          </div>
        );
      })}
    </div>
  );
};
