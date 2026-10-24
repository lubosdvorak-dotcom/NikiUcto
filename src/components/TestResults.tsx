import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  Scale,
  ArrowLeft,
  SlidersHorizontal,
} from 'lucide-react';
import { useAccounting } from '../context/AccountingContext';
import {
  formatCZK,
  getAccountClassTheme,
  getAccountInfo,
} from '../utils/accountingLogic';

export const TestResults: React.FC = () => {
  const {
    activeQuestions,
    userAnswers,
    startTest,
    setCurrentView,
    selectTopic,
    testConfig,
  } = useAccounting();

  const [filterMode, setFilterMode] = useState<'all' | 'wrong' | 'correct'>('all');

  const totalMaxPoints = activeQuestions.reduce((sum, q) => sum + q.points, 0);
  const earnedPoints = userAnswers.reduce((sum, a) => sum + a.earnedPoints, 0);
  const scorePercent =
    totalMaxPoints > 0 ? Math.round((earnedPoints / totalMaxPoints) * 100) : 0;

  const correctCount = userAnswers.filter((a) => a.isCorrect).length;
  const wrongCount = activeQuestions.length - correctCount;

  const getMaturitaGrade = (pct: number) => {
    if (pct >= 85) return { grade: '1 — Výborně', status: 'Uspěl(a) s vyznamenáním' };
    if (pct >= 70) return { grade: '2 — Chvalitebně', status: 'Uspěl(a) velmi dobře' };
    if (pct >= 55) return { grade: '3 — Dobře', status: 'Uspěl(a) u zkoušky' };
    if (pct >= 44) return { grade: '4 — Dostatečně', status: 'Uspěl(a) (nad hranicí 44 %)' };
    return { grade: '5 — Nedostatečně', status: 'Pod maturitní hranicí 44 %' };
  };

  const gradeMeta = getMaturitaGrade(scorePercent);

  const filteredQuestions = activeQuestions.filter((q) => {
    const rec = userAnswers.find((a) => a.questionId === q.id);
    const isCorrect = rec?.isCorrect || false;
    if (filterMode === 'wrong') return !isCorrect;
    if (filterMode === 'correct') return isCorrect;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Top Summary Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>Vyhodnocení maturitního testu</span>
              <span aria-hidden="true">·</span>
              <span>Rozsah {activeQuestions.length} otázek</span>
              <span aria-hidden="true">·</span>
              <span>{gradeMeta.status}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Výsledné skóre: <span className="font-mono tabular-nums">{scorePercent} %</span> ({gradeMeta.grade})
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Získáno <strong className="font-mono tabular-nums">{earnedPoints}</strong> z{' '}
              <strong className="font-mono tabular-nums">{totalMaxPoints}</strong> bodů · Správně zodpovězeno{' '}
              <strong className="font-mono tabular-nums">{correctCount}</strong> z{' '}
              <strong className="font-mono tabular-nums">{activeQuestions.length}</strong> úloh.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => startTest()}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors whitespace-nowrap inline-flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Zopakovat test</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentView('test_config')}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition-colors whitespace-nowrap inline-flex items-center gap-2"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Změnit konfiguraci</span>
            </button>

            <button
              type="button"
              onClick={() => selectTopic(testConfig.selectedTopicIds[0] || 1, 'study')}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition-colors whitespace-nowrap inline-flex items-center gap-2"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Přejít do režimu studia</span>
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Detailní rozbor odpovědí, správných účtů a daňových principů
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 self-start">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                filterMode === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Všechny ({activeQuestions.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('wrong')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                filterMode === 'wrong'
                  ? 'bg-white dark:bg-slate-900 text-rose-700 dark:text-rose-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Chybné ({wrongCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('correct')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                filterMode === 'correct'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Správné ({correctCount})
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Question Breakdown List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center text-sm text-slate-500">
            V této kategorii nejsou žádné otázky.
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const answer = userAnswers.find((a) => a.questionId === q.id);
            const isCorrect = answer?.isCorrect || false;

            return (
              <div
                key={q.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                    )}
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {idx + 1}. {q.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                    <span>Okruh {q.topicId}</span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={
                        isCorrect
                          ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                          : 'text-rose-700 dark:text-rose-400 font-bold'
                      }
                    >
                      {answer?.earnedPoints || 0} / {q.points} b.
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {q.prompt}
                </p>

                {/* Comparison of Student Answer vs Correct Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div
                    className={`p-3.5 rounded-xl border ${
                      isCorrect
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                        : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800'
                    }`}
                  >
                    <div className="font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Tvoje odpověď:
                    </div>
                    {!answer ? (
                      <div className="font-medium text-rose-700 dark:text-rose-400">
                        Nezodpovězeno
                      </div>
                    ) : q.type === 'single_choice' ? (
                      <div className="font-medium text-slate-900 dark:text-slate-100">
                        {q.options.find((o) => o.id === answer.selectedOptionId)?.text ||
                          'Nevybráno'}
                      </div>
                    ) : q.type === 'booking' ? (
                      <div className="font-mono font-bold text-slate-900 dark:text-slate-100">
                        MD {answer.enteredDebit || '—'} / D {answer.enteredCredit || '—'} ·{' '}
                        {formatCZK(answer.enteredAmount || 0)}
                      </div>
                    ) : (
                      <div className="font-medium text-slate-900 dark:text-slate-100">
                        {answer.judgedCorrect
                          ? 'Označeno jako: Zápis je správně'
                          : `Označeno jako chybný zápis (${
                              q.correctionChoices.find(
                                (c) => c.id === answer.selectedCorrectionId
                              )?.label || 'bez vybrané opravy'
                            })`}
                      </div>
                    )}
                  </div>

                  <div className="p-3.5 rounded-xl border bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
                    <div className="font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Správné řešení dle ČÚS:
                    </div>
                    {q.type === 'single_choice' ? (
                      <div className="font-semibold text-emerald-700 dark:text-emerald-400">
                        {q.options.find((o) => o.id === q.correctOptionId)?.text}
                      </div>
                    ) : q.type === 'booking' ? (
                      <div className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                        MD {q.expectedDebit} ({getAccountInfo(q.expectedDebit).name}) / D{' '}
                        {q.expectedCredit} ({getAccountInfo(q.expectedCredit).name}) ·{' '}
                        {formatCZK(q.expectedAmount)}
                      </div>
                    ) : (
                      <div className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                        {q.isCorrectlyBooked
                          ? `Zápis v deníku byl správně: MD ${q.correctDebit} / D ${q.correctCredit} (${formatCZK(
                              q.correctAmount
                            )})`
                          : `V deníku byla chyba -> Správně: MD ${q.correctDebit} / D ${q.correctCredit} (${formatCZK(
                              q.correctAmount
                            )})`}
                      </div>
                    )}
                  </div>
                </div>

                {/* Detailed Principle & Tax Explanation */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
                  <div className="text-slate-700 dark:text-slate-200 leading-relaxed">
                    <strong className="font-semibold text-slate-900 dark:text-slate-100">
                      Vysvětlení postupu:{' '}
                    </strong>
                    {q.explanation}
                  </div>
                  <div className="pt-2 border-t border-slate-200/70 dark:border-slate-700/70 flex items-start gap-2 text-slate-600 dark:text-slate-300">
                    <Scale className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold text-slate-900 dark:text-slate-100">
                        Účetní a daňový princip:{' '}
                      </strong>
                      {q.principleExplanation}
                    </div>
                  </div>

                  {/* Color-coded account badges for quick review */}
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-slate-500">Dotčené účty:</span>
                    {q.relatedAccounts.map((code) => {
                      const info = getAccountInfo(code);
                      const theme = getAccountClassTheme(code);
                      return (
                        <span
                          key={code}
                          className={`px-2 py-0.5 rounded font-mono text-[11px] border ${theme.borderClass} ${theme.badgeBg} ${theme.badgeText}`}
                        >
                          <strong>{code}</strong> · {info.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={() => setCurrentView('dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zpět na hlavní přehled okruhů</span>
        </button>
      </div>
    </div>
  );
};
