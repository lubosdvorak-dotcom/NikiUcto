import React from 'react';
import {
  Zap,
  ClipboardCheck,
  Timer,
  CheckSquare,
  Square,
  Play,
  ArrowLeft,
  SlidersHorizontal,
} from 'lucide-react';
import { useAccounting } from '../context/AccountingContext';
import { QuestionType, TestLengthPreset } from '../types/accounting';

const LENGTH_PRESETS: {
  length: TestLengthPreset;
  title: string;
  subtitle: string;
  durationLabel: string;
  timedDefault: boolean;
  icon: React.FC<{ className?: string }>;
}[] = [
  {
    length: 5,
    title: 'Expresní dril (5 otázek)',
    subtitle: 'Rychlé procvičení klíčových souvztažností a chytáků s okamžitou zpětnou vazbou.',
    durationLabel: '~5 min · Bez časomíry',
    timedDefault: false,
    icon: Zap,
  },
  {
    length: 15,
    title: 'Standardní přezkoušení (15 otázek)',
    subtitle: 'Důkladná písemka kombinující výběr z možností, zaúčtování MD/D a kontrolu účetního deníku.',
    durationLabel: '~15 min · Volitelná časomíra',
    timedDefault: false,
    icon: ClipboardCheck,
  },
  {
    length: 30,
    title: 'Maturitní formát (30 otázek s časomírou)',
    subtitle: 'Kompletní maturitní zkouška nanečisto s aktivním odpočtem času 45 minut.',
    durationLabel: '45:00 časomíra · Maturitní simulace',
    timedDefault: true,
    icon: Timer,
  },
];

const QUESTION_TYPE_OPTIONS: {
  type: QuestionType;
  label: string;
  desc: string;
}[] = [
  {
    type: 'single_choice',
    label: 'Výběr z možností (Single Choice)',
    desc: 'Teoretické principy, výpočty základu daně a volba správné souvztažnosti.',
  },
  {
    type: 'booking',
    label: 'Interaktivní zaúčtování (MD / D / Částka)',
    desc: 'Zadání syntetického účtu Má dáti, účtu Dal a přesné částky v Kč podle účetního dokladu.',
  },
  {
    type: 'error_detection',
    label: 'Detekce chyb v účetním deníku',
    desc: 'Audit zobrazeného řádku v účetním deníku — odhalení převrácených stran či chybného účtu.',
  },
];

export const TestConfigurator: React.FC = () => {
  const { topics, testConfig, setTestConfig, startTest, setCurrentView } = useAccounting();

  const handleSelectLength = (preset: TestLengthPreset) => {
    setTestConfig((prev) => ({
      ...prev,
      length: preset,
      timed: preset === 30 ? true : prev.timed,
      timeLimitSeconds: preset === 30 ? 45 * 60 : preset === 15 ? 20 * 60 : 10 * 60,
    }));
  };

  const toggleTopicId = (id: number) => {
    setTestConfig((prev) => {
      const exists = prev.selectedTopicIds.includes(id);
      if (exists && prev.selectedTopicIds.length === 1) {
        return prev; // Keep at least 1 topic selected
      }
      const nextIds = exists
        ? prev.selectedTopicIds.filter((item) => item !== id)
        : [...prev.selectedTopicIds, id].sort((a, b) => a - b);
      return {
        ...prev,
        selectedTopicIds: nextIds,
      };
    });
  };

  const selectAllTopics = () => {
    setTestConfig((prev) => ({
      ...prev,
      selectedTopicIds: topics.map((t) => t.id),
    }));
  };

  const selectOnlyTopic1 = () => {
    setTestConfig((prev) => ({
      ...prev,
      selectedTopicIds: [1],
    }));
  };

  const toggleQuestionType = (qType: QuestionType) => {
    setTestConfig((prev) => {
      const exists = prev.questionTypes.includes(qType);
      if (exists && prev.questionTypes.length === 1) {
        return prev; // Keep at least 1 type active
      }
      return {
        ...prev,
        questionTypes: exists
          ? prev.questionTypes.filter((t) => t !== qType)
          : [...prev.questionTypes, qType],
      };
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
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
            <span>Interaktivní testovací modul</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Konfigurace maturitního testu
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Zvol si rozsah přezkoušení, testované maturitní okruhy a typy úloh před zahájením testu.
          </p>
        </div>

        <button
          type="button"
          onClick={() => startTest()}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-2 shadow-xs"
        >
          <Play className="w-4 h-4" />
          <span>Spustit test ({testConfig.length} otázek)</span>
        </button>
      </div>

      {/* Step 1: Test Length Selection (5 / 15 / 30) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            1. Zvol délku a formát testu
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
            Vybráno: {testConfig.length} otázek
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LENGTH_PRESETS.map((preset) => {
            const Icon = preset.icon;
            const isSelected = testConfig.length === preset.length;
            return (
              <button
                key={preset.length}
                type="button"
                onClick={() => handleSelectLength(preset.length)}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 dark:border-blue-500 ring-2 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                      {preset.durationLabel}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {preset.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {preset.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
                  <span
                    className={
                      isSelected
                        ? 'text-blue-700 dark:text-blue-400'
                        : 'text-slate-500 dark:text-slate-400'
                    }
                  >
                    {isSelected ? 'Aktivní formát' : 'Zvolit tento formát'}
                  </span>
                  <span className="font-mono tabular-nums text-slate-900 dark:text-slate-100">
                    {preset.length} úloh
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Topic Selection */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              2. Vyber testované maturitní okruhy
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Můžeš procvičovat pouze Okruh 1 (Časové rozlišení a rezervy) nebo sestavit průřezový maturitní mix.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={selectOnlyTopic1}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
            >
              Pouze Okruh 1
            </button>
            <button
              type="button"
              onClick={selectAllTopics}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
            >
              Vybrat všech 6 okruhů
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {topics.map((topic) => {
            const isChecked = testConfig.selectedTopicIds.includes(topic.id);
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => toggleTopicId(topic.id)}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                  isChecked
                    ? 'border-blue-600/80 bg-blue-50/30 dark:bg-blue-950/20 dark:border-blue-500/70'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {topic.id}. {topic.shortTitle}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 shrink-0">
                      {topic.questions.length} úloh
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-1 truncate">
                    Účty: {topic.keyAccounts.join(', ')}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Question Types & Timer Toggle */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              3. Typy testových úloh a časomíra
            </h2>
          </div>

          <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={testConfig.timed}
              onChange={(e) =>
                setTestConfig((prev) => ({ ...prev, timed: e.target.checked }))
              }
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Zapnout časomíru ({Math.round(testConfig.timeLimitSeconds / 60)} min)</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {QUESTION_TYPE_OPTIONS.map((opt) => {
            const active = testConfig.questionTypes.includes(opt.type);
            return (
              <button
                key={opt.type}
                type="button"
                onClick={() => toggleQuestionType(opt.type)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  active
                    ? 'border-slate-900 dark:border-slate-200 bg-slate-50 dark:bg-slate-800/60'
                    : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 dark:text-slate-100">
                  {active ? (
                    <CheckSquare className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span>{opt.label}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {opt.desc}
                </p>
              </button>
            );
          })}
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-600 dark:text-slate-400">
            Připraveno <strong className="font-mono">{testConfig.length} otázek</strong> z{' '}
            <strong className="font-mono">{testConfig.selectedTopicIds.length}</strong> zvolených
            okruhů. Okamžité vyhodnocení s vysvětlením daňové uznatelnosti.
          </div>
          <button
            type="button"
            onClick={() => startTest()}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors whitespace-nowrap inline-flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            <span>Spustit test nyní</span>
          </button>
        </div>
      </div>
    </div>
  );
};
