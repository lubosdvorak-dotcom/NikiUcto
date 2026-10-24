import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  HelpCircle,
  BookOpen,
  Scale,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import { useAccounting } from '../context/AccountingContext';
import { UserAnswerRecord } from '../types/accounting';
import {
  CHART_OF_ACCOUNTS,
  evaluateQuestion,
  EvaluationResult,
  formatCZK,
  getAccountClassTheme,
  getAccountInfo,
  parseCZKInput,
} from '../utils/accountingLogic';

export const TestRunner: React.FC = () => {
  const {
    activeQuestions,
    testConfig,
    userAnswers,
    recordQuestionAnswer,
    finishTest,
    setCurrentView,
  } = useAccounting();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(
    testConfig.timeLimitSeconds
  );
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  // Local inputs for current question
  const [selectedOptionId, setSelectedOptionId] = useState<string>('');
  const [enteredDebit, setEnteredDebit] = useState<string>('');
  const [enteredCredit, setEnteredCredit] = useState<string>('');
  const [enteredAmountStr, setEnteredAmountStr] = useState<string>('');
  const [judgedCorrect, setJudgedCorrect] = useState<boolean | null>(null);
  const [selectedCorrectionId, setSelectedCorrectionId] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);

  // Evaluation feedback state for current question
  const [submittedEval, setSubmittedEval] = useState<EvaluationResult | null>(null);
  const [feedbackAnimKey, setFeedbackAnimKey] = useState<number>(0);

  const currentQuestion = activeQuestions[currentIndex];

  // Timer countdown for timed tests
  useEffect(() => {
    if (!testConfig.timed) return;
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [testConfig.timed]);

  // Reset question inputs when changing question index
  useEffect(() => {
    setSelectedOptionId('');
    setEnteredDebit('');
    setEnteredCredit('');
    setEnteredAmountStr('');
    setJudgedCorrect(null);
    setSelectedCorrectionId('');
    setSubmittedEval(null);
    setShowHint(false);
    setQuestionStartTime(Date.now());
  }, [currentIndex, currentQuestion?.id]);

  if (!currentQuestion) {
    return (
      <div className="max-w-3xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center space-y-4">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Žádné otázky nebyly načteny. Zvol prosím parametry v konfigurátoru testu.
        </p>
        <button
          type="button"
          onClick={() => setCurrentView('test_config')}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
        >
          Otevřít konfigurátor testu
        </button>
      </div>
    );
  }

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const canSubmit = () => {
    if (submittedEval) return false;
    if (currentQuestion.type === 'single_choice') {
      return Boolean(selectedOptionId);
    }
    if (currentQuestion.type === 'booking') {
      return (
        enteredDebit.trim().length > 0 &&
        enteredCredit.trim().length > 0 &&
        enteredAmountStr.trim().length > 0
      );
    }
    if (currentQuestion.type === 'error_detection') {
      if (judgedCorrect === null) return false;
      if (judgedCorrect === false) {
        return Boolean(selectedCorrectionId);
      }
      return true;
    }
    return false;
  };

  const handleVerifyAnswer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!canSubmit()) return;

    const numericAmount = parseCZKInput(enteredAmountStr);
    const evalResult = evaluateQuestion(currentQuestion, {
      selectedOptionId,
      enteredDebit,
      enteredCredit,
      enteredAmount: numericAmount,
      judgedCorrect: judgedCorrect ?? true,
      selectedCorrectionId,
    });

    setSubmittedEval(evalResult);
    setFeedbackAnimKey((prev) => prev + 1);

    const record: UserAnswerRecord = {
      questionId: currentQuestion.id,
      questionType: currentQuestion.type,
      isCorrect: evalResult.isCorrect,
      earnedPoints: evalResult.earnedPoints,
      maxPoints: evalResult.maxPoints,
      timeSpentSeconds: Math.max(1, Math.round((Date.now() - questionStartTime) / 1000)),
      selectedOptionId,
      enteredDebit: enteredDebit.trim(),
      enteredCredit: enteredCredit.trim(),
      enteredAmount: numericAmount,
      judgedCorrect: judgedCorrect ?? true,
      selectedCorrectionId,
    };

    recordQuestionAnswer(record);
  };

  const handleNextOrFinish = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishTest();
    }
  };

  // Suggested quick accounts for booking questions (combines relatedAccounts + key accounts from chart)
  const quickAccountSuggestions = Array.from(
    new Set([
      ...currentQuestion.relatedAccounts,
      '381',
      '383',
      '384',
      '385',
      '388',
      '389',
      '451',
      '459',
      '502',
      '511',
      '518',
      '548',
      '552',
      '554',
      '591',
      '602',
      '648',
      '211',
      '221',
      '321',
      '341',
    ])
  ).slice(0, 12);

  const feedbackCardAnimation = submittedEval
    ? submittedEval.isCorrect
      ? 'animate-pulse-success border-emerald-500 dark:border-emerald-500 ring-2 ring-emerald-500/20'
      : 'animate-shake-error border-rose-500 dark:border-rose-500 ring-2 ring-rose-500/20'
    : 'border-slate-200 dark:border-slate-800';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Status & Progress Bar */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 tabular-nums">
            Otázka {currentIndex + 1} / {activeQuestions.length}
          </div>
          <div className="h-2 w-36 sm:w-48 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-200"
              style={{
                width: `${Math.round(((currentIndex + 1) / activeQuestions.length) * 100)}%`,
              }}
            />
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden md:inline">
            {currentQuestion.difficulty === 'easy'
              ? 'Základní obtížnost'
              : currentQuestion.difficulty === 'medium'
              ? 'Střední obtížnost'
              : 'Maturitní chyták'}
            {' · '}
            {currentQuestion.points} b.
          </span>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          {testConfig.timed && (
            <div
              className={`flex items-center gap-1.5 font-mono text-xs font-bold tabular-nums px-3 py-1.5 rounded-lg border ${
                remainingSeconds < 300
                  ? 'border-rose-300 bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTimer(remainingSeconds)}</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => finishTest()}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
          >
            Ukončit a vyhodnotit
          </button>
        </div>
      </div>

      {/* Main Question Card with Green Pulse / Red Shake Feedback */}
      <div
        key={`${currentQuestion.id}-${feedbackAnimKey}`}
        className={`rounded-2xl border bg-white dark:bg-slate-900 p-6 sm:p-8 transition-colors ${feedbackCardAnimation}`}
      >
        {/* Question Header Metadata */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
          <div className="flex items-center gap-2">
            <span>
              {currentQuestion.type === 'single_choice'
                ? 'Výběr správné možnosti'
                : currentQuestion.type === 'booking'
                ? 'Interaktivní zaúčtování (MD / D / Částka)'
                : 'Detekce chyb v účetním deníku'}
            </span>
            <span aria-hidden="true">·</span>
            <span>Okruh {currentQuestion.topicId}</span>
          </div>
          <span className="font-mono tabular-nums font-semibold text-slate-700 dark:text-slate-300">
            {currentQuestion.points} body
          </span>
        </div>

        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          {currentQuestion.title}
        </h2>

        <p className="mt-2.5 text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
          {currentQuestion.prompt}
        </p>

        {/* TYPE A: SINGLE CHOICE */}
        {currentQuestion.type === 'single_choice' && (
          <div className="mt-6 space-y-3">
            {currentQuestion.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const isCorrectOption = opt.id === currentQuestion.correctOptionId;

              let optionStyle =
                'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900';
              if (submittedEval) {
                if (isCorrectOption) {
                  optionStyle =
                    'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 dark:border-emerald-500';
                } else if (isSelected && !isCorrectOption) {
                  optionStyle =
                    'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 dark:border-rose-500';
                }
              } else if (isSelected) {
                optionStyle =
                  'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 dark:border-blue-500 ring-2 ring-blue-500/20';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={Boolean(submittedEval)}
                  onClick={() => setSelectedOptionId(opt.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-start justify-between gap-4 ${optionStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-6 h-6 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {opt.id.toUpperCase()}
                    </span>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {opt.text}
                    </span>
                  </div>

                  {(opt.debitPreview || opt.creditPreview) && (
                    <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-slate-500 dark:text-slate-400 shrink-0">
                      <span>MD {opt.debitPreview}</span>
                      <span>/</span>
                      <span>D {opt.creditPreview}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* TYPE B: INTERACTIVE BOOKING (MD / D / AMOUNT) */}
        {currentQuestion.type === 'booking' && (
          <form onSubmit={handleVerifyAnswer} className="mt-6 space-y-5">
            {/* Voucher Header */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 font-mono text-slate-700 dark:text-slate-300">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="font-bold">Doklad: {currentQuestion.documentType}</span>
                <span aria-hidden="true">·</span>
                <span>Datum: {currentQuestion.transactionDate}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowHint((prev) => !prev)}
                className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showHint ? 'Skrýt nápovědu k výpočtu' : 'Zobrazit nápovědu k výpočtu'}</span>
              </button>
            </div>

            {showHint && (
              <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs text-slate-700 dark:text-slate-300">
                <strong>Nápověda:</strong> {currentQuestion.calculationHint}
              </div>
            )}

            {/* Quick Account Picker Bar */}
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                Rychlý výběr z účtového rozvrhu (kliknutím vyplníš prázdné pole MD nebo D):
              </div>
              <div className="flex flex-wrap gap-1.5">
                {quickAccountSuggestions.map((code) => {
                  const info = getAccountInfo(code);
                  const theme = getAccountClassTheme(code);
                  return (
                    <button
                      key={code}
                      type="button"
                      disabled={Boolean(submittedEval)}
                      onClick={() => {
                        if (!enteredDebit) {
                          setEnteredDebit(code);
                        } else if (!enteredCredit) {
                          setEnteredCredit(code);
                        } else {
                          setEnteredDebit(code);
                        }
                      }}
                      title={info.name}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-mono transition-colors ${theme.borderClass} ${theme.badgeBg} ${theme.badgeText} hover:opacity-80`}
                    >
                      <span className="font-bold">{code}</span>
                      <span className="font-sans text-[11px] ml-1 text-slate-600 dark:text-slate-400">
                        {info.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3-Column Booking Input: MD | D | Amount */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="booking-debit-input"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Účet Má dáti (MD)
                </label>
                <input
                  id="booking-debit-input"
                  type="text"
                  list="accounts-datalist"
                  disabled={Boolean(submittedEval)}
                  placeholder="např. 381 nebo 518"
                  value={enteredDebit}
                  onChange={(e) => setEnteredDebit(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 dark:text-slate-100 focus:border-blue-600 focus:outline-none"
                />
                {enteredDebit.trim().length === 3 && (
                  <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {getAccountInfo(enteredDebit).name}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="booking-credit-input"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Účet Dal (D)
                </label>
                <input
                  id="booking-credit-input"
                  type="text"
                  list="accounts-datalist"
                  disabled={Boolean(submittedEval)}
                  placeholder="např. 321 nebo 221"
                  value={enteredCredit}
                  onChange={(e) => setEnteredCredit(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 dark:text-slate-100 focus:border-blue-600 focus:outline-none"
                />
                {enteredCredit.trim().length === 3 && (
                  <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {getAccountInfo(enteredCredit).name}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="booking-amount-input"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Částka (v Kč)
                </label>
                <input
                  id="booking-amount-input"
                  type="text"
                  inputMode="numeric"
                  disabled={Boolean(submittedEval)}
                  placeholder="např. 60000"
                  value={enteredAmountStr}
                  onChange={(e) => setEnteredAmountStr(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm font-mono font-bold tabular-nums text-slate-900 dark:text-slate-100 focus:border-blue-600 focus:outline-none"
                />
                {enteredAmountStr && (
                  <div className="mt-1 text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
                    Zadáno: {formatCZK(parseCZKInput(enteredAmountStr))}
                  </div>
                )}
              </div>
            </div>

            <datalist id="accounts-datalist">
              {CHART_OF_ACCOUNTS.map((acc) => (
                <option key={acc.code} value={acc.code}>
                  {acc.code} — {acc.name}
                </option>
              ))}
            </datalist>
          </form>
        )}

        {/* TYPE C: ERROR DETECTION IN JOURNAL */}
        {currentQuestion.type === 'error_detection' && (
          <div className="mt-6 space-y-5">
            {/* Journal Row Table */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                    <th className="py-2.5 px-3 font-semibold">Doklad</th>
                    <th className="py-2.5 px-3 font-semibold">Datum</th>
                    <th className="py-2.5 px-4 font-semibold">Text účetního případu v deníku</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Částka (Kč)</th>
                    <th className="py-2.5 px-3 font-semibold text-center">MD</th>
                    <th className="py-2.5 px-3 font-semibold text-center">D</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white dark:bg-slate-900 font-mono">
                    <td className="py-3.5 px-3 font-semibold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                      {currentQuestion.journalRow.document}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {currentQuestion.journalRow.date}
                    </td>
                    <td className="py-3.5 px-4 font-sans font-medium text-slate-900 dark:text-slate-100">
                      {currentQuestion.journalRow.description}
                    </td>
                    <td className="py-3.5 px-3 text-right font-bold tabular-nums text-slate-900 dark:text-slate-100 whitespace-nowrap">
                      {formatCZK(currentQuestion.journalRow.amount)}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`px-2 py-1 rounded font-bold ${
                          getAccountClassTheme(currentQuestion.journalRow.debit).badgeBg
                        } ${getAccountClassTheme(currentQuestion.journalRow.debit).badgeText}`}
                      >
                        {currentQuestion.journalRow.debit}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`px-2 py-1 rounded font-bold ${
                          getAccountClassTheme(currentQuestion.journalRow.credit).badgeBg
                        } ${getAccountClassTheme(currentQuestion.journalRow.credit).badgeText}`}
                      >
                        {currentQuestion.journalRow.credit}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Step 1: Verdict Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                disabled={Boolean(submittedEval)}
                onClick={() => setJudgedCorrect(true)}
                className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                  judgedCorrect === true
                    ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Zápis v deníku je SPRÁVNĚ
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Účty MD, D i částka odpovídají předpisům
                  </div>
                </div>
              </button>

              <button
                type="button"
                disabled={Boolean(submittedEval)}
                onClick={() => setJudgedCorrect(false)}
                className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                  judgedCorrect === false
                    ? 'border-amber-600 bg-amber-50/50 dark:bg-amber-950/30 ring-2 ring-amber-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    V zápisu je CHYBA
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Chybný účet, převrácené strany nebo částka
                  </div>
                </div>
              </button>
            </div>

            {/* Step 2: Correction Picker when judged as Error */}
            {judgedCorrect === false && (
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Vyber správný opravný zápis do účetního deníku:
                </div>
                {currentQuestion.correctionChoices.map((choice) => {
                  const isPicked = selectedCorrectionId === choice.id;
                  return (
                    <button
                      key={choice.id}
                      type="button"
                      disabled={Boolean(submittedEval)}
                      onClick={() => setSelectedCorrectionId(choice.id)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between gap-3 ${
                        isPicked
                          ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 dark:border-blue-500'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-slate-900 dark:text-slate-100">{choice.label}</span>
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400 shrink-0">
                        MD {choice.debit} / D {choice.credit}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Submit / Next Action Bar */}
        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          {!submittedEval ? (
            <>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Po potvrzení uvidíš okamžité vyhodnocení a rozbor daňového dopadu.
              </span>
              <button
                type="button"
                disabled={!canSubmit()}
                onClick={() => handleVerifyAnswer()}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap"
              >
                Ověřit odpověď
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-xs font-semibold">
                {submittedEval.isCorrect ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Správná odpověď (+{submittedEval.earnedPoints} b.)</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-rose-700 dark:text-rose-400">
                    <XCircle className="w-4 h-4" />
                    <span>Chybná odpověď (0 b.)</span>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleNextOrFinish}
                className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap inline-flex items-center gap-2"
              >
                <span>
                  {currentIndex < activeQuestions.length - 1
                    ? 'Další otázka'
                    : 'Zobrazit celkové vyhodnocení'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Immediate Pedagogical Explanation Panel */}
        {submittedEval && (
          <div
            className={`mt-6 p-5 rounded-xl border space-y-3 ${
              submittedEval.isCorrect
                ? 'bg-emerald-50/60 dark:bg-emerald-950/25 border-emerald-200 dark:border-emerald-800/80'
                : 'bg-rose-50/60 dark:bg-rose-950/25 border-rose-200 dark:border-rose-800/80'
            }`}
          >
            <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
              {submittedEval.feedbackSummary}
            </div>

            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              <strong className="font-semibold">Postup a souvztažnost: </strong>
              {currentQuestion.explanation}
            </div>

            <div className="pt-2.5 border-t border-slate-200/70 dark:border-slate-800 flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
              <Scale className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Účetní a daňový princip:{' '}
                </strong>
                {currentQuestion.principleExplanation}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
