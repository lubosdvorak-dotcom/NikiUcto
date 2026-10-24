import React from 'react';
import {
  BookOpen,
  ClipboardCheck,
  ArrowRight,
  Play,
  Layers,
  Clock,
  RotateCcw,
  Moon,
  Sun,
} from 'lucide-react';
import { useAccounting } from '../context/AccountingContext';
import { getAccountClassTheme } from '../utils/accountingLogic';
import { InteractiveTAccount } from './InteractiveTAccount';
import { TOPIC_1_ACCRUALS } from '../data/topic1-accruals';

export const DashboardBento: React.FC = () => {
  const {
    theme,
    toggleTheme,
    topics,
    primaryMode,
    setPrimaryMode,
    selectTopic,
    progressByTopic,
    startTest,
    setCurrentView,
    resetProgress,
  } = useAccounting();

  // Compute aggregate progress across all 6 topics
  const totalCardsCount = topics.reduce((sum, t) => sum + t.studyCards.length, 0);
  const completedCardsCount = topics.reduce(
    (sum, t) => sum + (progressByTopic[t.id]?.completedCardIds.length || 0),
    0
  );

  const totalQuestionsCount = topics.reduce((sum, t) => sum + t.questions.length, 0);
  const answeredQuestionsCount = topics.reduce(
    (sum, t) => sum + (progressByTopic[t.id]?.answeredQuestionIds.length || 0),
    0
  );

  const scoredTopics = Object.values(progressByTopic).filter(
    (p) => p.lastScorePercent !== null
  );
  const avgScore =
    scoredTopics.length > 0
      ? Math.round(
          scoredTopics.reduce((s, p) => s + (p.lastScorePercent || 0), 0) /
            scoredTopics.length
        )
      : 85;

  return (
    <div className="space-y-10">
      {/* Top Hero & Workspace Mode Switcher */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>Obchodní akademie · 4. ročník</span>
              <span aria-hidden="true">·</span>
              <span>Praktická a ústní maturita z účetnictví</span>
              <span aria-hidden="true">·</span>
              <span>ČÚS č. 001–023 & ZDP</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Interaktivní příprava k maturitě z účetnictví
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Procvič si všech 6 maturitních okruhů na živých T-účtech (šibenicích), sbalitelných
              tahácích souvztažností a v testovém trenažéru s detailním rozborem daňové uznatelnosti.
            </p>
          </div>

          {/* Mode Toggle ("Režim studia" vs "Režim testu") */}
          <div className="flex flex-col sm:items-end gap-3 shrink-0">
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Zvol výchozí pracovní režim po kliknutí na okruh:
            </div>
            <div
              role="group"
              aria-label="Přepínač režimu studia a testu"
              className="inline-flex items-center gap-1 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700"
            >
              <button
                type="button"
                onClick={() => setPrimaryMode('study')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap inline-flex items-center gap-2 ${
                  primaryMode === 'study'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Režim studia</span>
              </button>

              <button
                type="button"
                onClick={() => setPrimaryMode('test')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap inline-flex items-center gap-2 ${
                  primaryMode === 'test'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ClipboardCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Režim testu</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4-Column Metric Strip */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Nastudované výukové karty
            </div>
            <div className="mt-1 text-xl font-mono font-bold tabular-nums text-slate-900 dark:text-slate-100">
              {completedCardsCount} / {totalCardsCount} karet
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Zodpovězené testové úlohy
            </div>
            <div className="mt-1 text-xl font-mono font-bold tabular-nums text-slate-900 dark:text-slate-100">
              {answeredQuestionsCount} / {totalQuestionsCount} úloh
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Průměrná úspěšnost v testech
            </div>
            <div className="mt-1 text-xl font-mono font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
              {avgScore} % (známka 1)
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'light' ? 'Přepnout na tmavý režim' : 'Přepnout na světlý režim'}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold transition-colors whitespace-nowrap inline-flex items-center gap-1.5"
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
              <button
                type="button"
                onClick={() => setCurrentView('test_config')}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors whitespace-nowrap inline-flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Spustit testovací modul</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: 6 Maturita Topics */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Maturitní okruhy z účetnictví (Bento přehled pokroku)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Aktivní režim: <strong className="text-slate-800 dark:text-slate-200">{primaryMode === 'study' ? 'Režim studia (výukové karty, šibenice a taháky)' : 'Režim testu (přímý přechod do konfigurace testu)'}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentView('chart_of_accounts')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Otevřít kompletní účtový rozvrh (Třídy 0–9)</span>
            </button>
            <button
              type="button"
              onClick={resetProgress}
              title="Resetovat uložený pokrok"
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 inline-flex items-center gap-1 whitespace-nowrap"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset pokroku</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topics.map((topic, index) => {
            const prog = progressByTopic[topic.id];
            const cardsDone = prog?.completedCardIds.length || 0;
            const totalCards = topic.studyCards.length;
            const questionsDone = prog?.answeredQuestionIds.length || 0;
            const totalQs = topic.questions.length;

            const combinedPct = Math.round(
              ((cardsDone + questionsDone) / Math.max(1, totalCards + totalQs)) * 100
            );

            // Make Topic 1 (Časové rozlišení) span 2 columns on desktop Bento grid
            const bentoSpan = index === 0 ? 'lg:col-span-2' : 'lg:col-span-1';

            return (
              <div
                key={topic.id}
                className={`${bentoSpan} rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between transition-all hover:border-slate-300 dark:hover:border-slate-700`}
              >
                <div>
                  {/* Top Metadata Line (Zero-pill discipline: unboxed text with · separators) */}
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                        0{topic.id}. OKRUH
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>Váha {topic.examWeightPercent} %</span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {topic.estimatedMinutes} min
                      </span>
                    </div>
                    <span className="font-mono tabular-nums font-semibold text-slate-700 dark:text-slate-300">
                      {combinedPct} % hotovo
                    </span>
                  </div>

                  {/* Topic Title & Description */}
                  <h3 className="mt-2.5 text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                    {topic.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {topic.description}
                  </p>

                  {/* Color-coded Key Accounts Strip (Zero-pill unboxed typography with · separators) */}
                  <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                    <span className="text-slate-400 dark:text-slate-500">Syntetické účty:</span>
                    {topic.keyAccounts.slice(0, index === 0 ? 11 : 7).map((code, i, arr) => {
                      const clsTheme = getAccountClassTheme(code);
                      return (
                        <React.Fragment key={code}>
                          <span className={`font-mono font-bold ${clsTheme.badgeText}`}>
                            {code}
                          </span>
                          {i < arr.length - 1 && (
                            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>

                {/* Progress Bar & Action Footer */}
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                    <span>
                      Karty: {cardsDone}/{totalCards} · Testové úlohy: {questionsDone}/{totalQs}
                    </span>
                    {prog?.lastScorePercent !== null && prog?.lastScorePercent !== undefined && (
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        Poslední test: {prog.lastScorePercent} %
                      </span>
                    )}
                  </div>

                  <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${Math.max(6, combinedPct)}%` }}
                    />
                  </div>

                  <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => selectTopic(topic.id)}
                      className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition-opacity whitespace-nowrap inline-flex items-center gap-1.5"
                    >
                      <span>
                        {primaryMode === 'study'
                          ? `Studovat okruh ${topic.id}`
                          : `Spustit test okruhu ${topic.id}`}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {primaryMode === 'study' ? (
                        <button
                          type="button"
                          onClick={() =>
                            startTest({
                              selectedTopicIds: [topic.id],
                              length: 5,
                            })
                          }
                          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
                        >
                          Rychlý test (5 otázek)
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => selectTopic(topic.id, 'study')}
                          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
                        >
                          Otevřít výukové karty
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Interactive T-Account Sandbox right on the Dashboard (Okruh 1 Preview) */}
      <section className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Ukázka interaktivního T-účtu (Okruh 1: Časové rozlišení nájemného 381)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Krokuj jednotlivé účetní operace nebo si přidej vlastní souvztažný zápis přímo do šibenice.
            </p>
          </div>
          <button
            type="button"
            onClick={() => selectTopic(1, 'study')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 whitespace-nowrap"
          >
            <span>Otevřít všech 5 karet a tahák Okruhu 1</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <InteractiveTAccount
          scenarioTitle={TOPIC_1_ACCRUALS.studyCards[0].scenarioTitle}
          scenarioContext={TOPIC_1_ACCRUALS.studyCards[0].scenarioContext}
          transactions={TOPIC_1_ACCRUALS.studyCards[0].transactions}
        />
      </section>
    </div>
  );
};
