import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Scale,
  AlertCircle,
  BookOpen,
  Play,
  Layers,
} from 'lucide-react';
import { useAccounting } from '../context/AccountingContext';
import { InteractiveTAccount } from './InteractiveTAccount';
import { CheatSheetPanel } from './CheatSheetPanel';
import {
  ACCOUNT_CLASS_THEMES,
  getAccountClassTheme,
  getAccountInfo,
} from '../utils/accountingLogic';

export const StudyWorkspace: React.FC = () => {
  const {
    activeTopic,
    topics,
    selectTopic,
    setCurrentView,
    progressByTopic,
    markCardCompleted,
    startTest,
  } = useAccounting();

  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  useEffect(() => {
    setActiveCardIndex(0);
  }, [activeTopic.id]);

  const cards = activeTopic.studyCards;
  const currentCard = cards[activeCardIndex] || cards[0];
  const topicProgress = progressByTopic[activeTopic.id];
  const isCardDone = topicProgress?.completedCardIds.includes(currentCard.id) || false;

  const handleCompleteAndNext = () => {
    markCardCompleted(activeTopic.id, currentCard.id);
    if (activeCardIndex < cards.length - 1) {
      setActiveCardIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Context Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <button
              type="button"
              onClick={() => setCurrentView('dashboard')}
              className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Přehled okruhů</span>
            </button>
            <span aria-hidden="true">/</span>
            <span>Okruh {activeTopic.id} z 6</span>
            <span aria-hidden="true">·</span>
            <span>Váha u maturity {activeTopic.examWeightPercent} %</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {activeTopic.id}. {activeTopic.title}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            {activeTopic.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() =>
              startTest({
                selectedTopicIds: [activeTopic.id],
                length: 5,
              })
            }
            className="px-4 py-2.5 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Expresní dril z okruhu (5 otázek)</span>
          </button>

          <button
            type="button"
            onClick={() => selectTopic(activeTopic.id, 'test')}
            className="px-4 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
          >
            Konfigurátor testu
          </button>
        </div>
      </div>

      {/* Topic Selector Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {topics.map((t) => {
          const isSelected = t.id === activeTopic.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => selectTopic(t.id, 'study')}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-colors whitespace-nowrap shrink-0 border ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.id}. {t.shortTitle}
            </button>
          );
        })}
      </div>

      {/* Microlearning Cards Navigation Strip */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>Microlearningová karta {activeCardIndex + 1} z {cards.length}</span>
              <span aria-hidden="true">·</span>
              <span>
                Nastudováno {topicProgress?.completedCardIds.length || 0} / {cards.length} karet
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
              {currentCard.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              {currentCard.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setActiveCardIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeCardIndex === 0}
              aria-label="Předchozí výuková karta"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {cards.map((c, idx) => {
              const completed = topicProgress?.completedCardIds.includes(c.id);
              const active = idx === activeCardIndex;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCardIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                    active
                      ? 'bg-blue-600 text-white'
                      : completed
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Karta {idx + 1}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setActiveCardIndex((prev) => Math.min(cards.length - 1, prev + 1))}
              disabled={activeCardIndex === cards.length - 1}
              aria-label="Další výuková karta"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Key Accounts Used in Card (Color-coded by Czech Account Class) */}
        <div className="py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Klíčové syntetické účty v této kartě:
          </span>
          {currentCard.keyAccounts.map((code) => {
            const info = getAccountInfo(code);
            const theme = getAccountClassTheme(code);
            return (
              <div
                key={code}
                className={`px-3 py-1.5 rounded-lg border ${theme.borderClass} ${theme.badgeBg} flex items-center gap-2 text-xs`}
              >
                <span className={`font-mono font-bold ${theme.badgeText}`}>{code}</span>
                <span className="text-slate-800 dark:text-slate-200 font-medium">{info.name}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  ({theme.shortLabel})
                </span>
              </div>
            );
          })}
        </div>

        {/* 4-Grid Pedagogical Breakdown */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1.5">
              <BookOpen className="w-4 h-4" />
              <span>Hlavní účetní princip</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentCard.corePrinciple}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700 dark:text-indigo-400 mb-1.5">
              <Scale className="w-4 h-4" />
              <span>Legislativní ukotvení (ZÚ, ČÚS, ZDP)</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentCard.legislativeRule}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/70 dark:border-rose-900/50">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 dark:text-rose-400 mb-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>Pozor na častou chybu u maturity</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentCard.commonMistake}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-900/50">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Daňová uznatelnost a dopad do základu daně</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentCard.taxDeductibilityRule}
            </p>
          </div>
        </div>

        {/* Complete Card Action */}
        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {isCardDone
              ? 'Tato výuková karta je již označena jako zvládnutá.'
              : 'Projdi si interaktivní šibenici níže a označ kartu jako nastudovanou.'}
          </div>
          <button
            type="button"
            onClick={handleCompleteAndNext}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap inline-flex items-center gap-2 ${
              isCardDone
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {isCardDone
                ? activeCardIndex < cards.length - 1
                  ? 'Zvládnuto · Pokračovat na další kartu'
                  : 'Karta zvládnuta'
                : 'Označit jako nastudované'}
            </span>
          </button>
        </div>
      </div>

      {/* Interactive T-Account ("Šibenice") */}
      <InteractiveTAccount
        key={currentCard.id}
        scenarioTitle={currentCard.scenarioTitle}
        scenarioContext={currentCard.scenarioContext}
        transactions={currentCard.transactions}
        initialBalances={currentCard.initialBalances}
      />

      {/* Collapsible Cheat Sheets */}
      <CheatSheetPanel cheatSheets={activeTopic.cheatSheets} defaultOpen={true} />

      {/* Czech Chart of Accounts Color Legend */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
          <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Barevné kódování účtových tříd dle českého směrného účtového rozvrhu</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {Object.values(ACCOUNT_CLASS_THEMES).map((theme) => (
            <div
              key={theme.classNum}
              className={`p-3 rounded-xl border ${theme.borderClass} ${theme.badgeBg}`}
            >
              <div className={`text-xs font-bold ${theme.badgeText}`}>{theme.title}</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                {theme.sideRule}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
