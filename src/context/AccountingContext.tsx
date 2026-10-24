import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AccountingQuestion,
  AccountingTopic,
  TestConfiguration,
  TopicProgress,
  UserAnswerRecord,
} from '../types/accounting';
import { ALL_ACCOUNTING_TOPICS, getTopicById } from '../data/allTopics';
import { buildTestQuestions } from '../utils/accountingLogic';

export type AppView =
  | 'dashboard'
  | 'study'
  | 'test_config'
  | 'test_runner'
  | 'test_results'
  | 'chart_of_accounts';

export type PrimaryMode = 'study' | 'test';

interface AccountingContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  primaryMode: PrimaryMode;
  setPrimaryMode: (mode: PrimaryMode) => void;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  activeTopicId: number;
  selectTopic: (topicId: number, targetMode?: PrimaryMode) => void;
  activeTopic: AccountingTopic;
  topics: AccountingTopic[];
  progressByTopic: Record<number, TopicProgress>;
  markCardCompleted: (topicId: number, cardId: string) => void;
  // Test state
  testConfig: TestConfiguration;
  setTestConfig: React.Dispatch<React.SetStateAction<TestConfiguration>>;
  activeQuestions: AccountingQuestion[];
  userAnswers: UserAnswerRecord[];
  startTest: (customConfig?: Partial<TestConfiguration>) => void;
  recordQuestionAnswer: (record: UserAnswerRecord) => void;
  finishTest: (finalAnswers?: UserAnswerRecord[]) => void;
  resetProgress: () => void;
}

const STORAGE_KEY_PROGRESS = 'uctomaturita_progress_v1';
const STORAGE_KEY_THEME = 'uctomaturita_theme_v1';

const DEFAULT_PROGRESS: Record<number, TopicProgress> = {
  1: {
    topicId: 1,
    completedCardIds: ['t1-card-1'],
    answeredQuestionIds: ['t1-q1', 't1-q2'],
    correctQuestionIds: ['t1-q1', 't1-q2'],
    lastScorePercent: 85,
    attemptsCount: 1,
  },
  2: {
    topicId: 2,
    completedCardIds: [],
    answeredQuestionIds: [],
    correctQuestionIds: [],
    lastScorePercent: null,
    attemptsCount: 0,
  },
  3: {
    topicId: 3,
    completedCardIds: [],
    answeredQuestionIds: [],
    correctQuestionIds: [],
    lastScorePercent: null,
    attemptsCount: 0,
  },
  4: {
    topicId: 4,
    completedCardIds: [],
    answeredQuestionIds: [],
    correctQuestionIds: [],
    lastScorePercent: null,
    attemptsCount: 0,
  },
  5: {
    topicId: 5,
    completedCardIds: [],
    answeredQuestionIds: [],
    correctQuestionIds: [],
    lastScorePercent: null,
    attemptsCount: 0,
  },
  6: {
    topicId: 6,
    completedCardIds: [],
    answeredQuestionIds: [],
    correctQuestionIds: [],
    lastScorePercent: null,
    attemptsCount: 0,
  },
};

const AccountingContext = createContext<AccountingContextValue | undefined>(undefined);

export const AccountingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {
      // ignore
    }
    return 'light';
  });

  const [primaryMode, setPrimaryModeState] = useState<PrimaryMode>('study');
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [activeTopicId, setActiveTopicId] = useState<number>(1);

  const [progressByTopic, setProgressByTopic] = useState<Record<number, TopicProgress>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (saved) {
        return { ...DEFAULT_PROGRESS, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return DEFAULT_PROGRESS;
  });

  const [testConfig, setTestConfig] = useState<TestConfiguration>({
    length: 5,
    selectedTopicIds: [1],
    questionTypes: ['single_choice', 'booking', 'error_detection'],
    timed: false,
    timeLimitSeconds: 45 * 60,
  });

  const [activeQuestions, setActiveQuestions] = useState<AccountingQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswerRecord[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progressByTopic));
    } catch {
      // ignore
    }
  }, [progressByTopic]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentView, activeTopicId]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setPrimaryMode = (mode: PrimaryMode) => {
    setPrimaryModeState(mode);
    if (currentView === 'study' && mode === 'test') {
      setTestConfig((prev) => ({
        ...prev,
        selectedTopicIds: [activeTopicId],
      }));
      setCurrentView('test_config');
    } else if (
      (currentView === 'test_config' || currentView === 'test_results') &&
      mode === 'study'
    ) {
      setCurrentView('study');
    }
  };

  const selectTopic = (topicId: number, targetMode?: PrimaryMode) => {
    const modeToUse = targetMode || primaryMode;
    setActiveTopicId(topicId);
    setPrimaryModeState(modeToUse);
    if (modeToUse === 'study') {
      setCurrentView('study');
    } else {
      setTestConfig((prev) => ({
        ...prev,
        selectedTopicIds: [topicId],
      }));
      setCurrentView('test_config');
    }
  };

  const markCardCompleted = (topicId: number, cardId: string) => {
    setProgressByTopic((prev) => {
      const current = prev[topicId] || {
        topicId,
        completedCardIds: [],
        answeredQuestionIds: [],
        correctQuestionIds: [],
        lastScorePercent: null,
        attemptsCount: 0,
      };
      if (current.completedCardIds.includes(cardId)) return prev;
      return {
        ...prev,
        [topicId]: {
          ...current,
          completedCardIds: [...current.completedCardIds, cardId],
        },
      };
    });
  };

  const startTest = (customConfig?: Partial<TestConfiguration>) => {
    const merged: TestConfiguration = {
      ...testConfig,
      ...customConfig,
      timed: (customConfig?.length ?? testConfig.length) === 30 ? true : (customConfig?.timed ?? testConfig.timed),
    };
    setTestConfig(merged);
    const questions = buildTestQuestions(
      ALL_ACCOUNTING_TOPICS,
      merged.selectedTopicIds.length > 0 ? merged.selectedTopicIds : [1],
      merged.length,
      merged.questionTypes
    );
    setActiveQuestions(questions);
    setUserAnswers([]);
    setCurrentView('test_runner');
  };

  const recordQuestionAnswer = (record: UserAnswerRecord) => {
    setUserAnswers((prev) => {
      const existingIdx = prev.findIndex((r) => r.questionId === record.questionId);
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = record;
        return copy;
      }
      return [...prev, record];
    });
  };

  const finishTest = (finalAnswers?: UserAnswerRecord[]) => {
    const answersToProcess = finalAnswers || userAnswers;
    const totalMax = answersToProcess.reduce((s, a) => s + a.maxPoints, 0);
    const totalEarned = answersToProcess.reduce((s, a) => s + a.earnedPoints, 0);
    const overallPercent = totalMax > 0 ? Math.round((totalEarned / totalMax) * 100) : 0;

    setProgressByTopic((prev) => {
      const next = { ...prev };
      testConfig.selectedTopicIds.forEach((tId) => {
        const current = next[tId] || {
          topicId: tId,
          completedCardIds: [],
          answeredQuestionIds: [],
          correctQuestionIds: [],
          lastScorePercent: null,
          attemptsCount: 0,
        };
        const topicQIds = ALL_ACCOUNTING_TOPICS.find((t) => t.id === tId)?.questions.map((q) => q.id) || [];
        const relevantAnswers = answersToProcess.filter((a) => topicQIds.includes(a.questionId));

        const newAnswered = new Set(current.answeredQuestionIds);
        const newCorrect = new Set(current.correctQuestionIds);
        relevantAnswers.forEach((a) => {
          newAnswered.add(a.questionId);
          if (a.isCorrect) newCorrect.add(a.questionId);
        });

        next[tId] = {
          ...current,
          answeredQuestionIds: Array.from(newAnswered),
          correctQuestionIds: Array.from(newCorrect),
          lastScorePercent: overallPercent,
          attemptsCount: current.attemptsCount + 1,
        };
      });
      return next;
    });

    setCurrentView('test_results');
  };

  const resetProgress = () => {
    setProgressByTopic(DEFAULT_PROGRESS);
  };

  const activeTopic = getTopicById(activeTopicId);

  return (
    <AccountingContext.Provider
      value={{
        theme,
        toggleTheme,
        primaryMode,
        setPrimaryMode,
        currentView,
        setCurrentView,
        activeTopicId,
        selectTopic,
        activeTopic,
        topics: ALL_ACCOUNTING_TOPICS,
        progressByTopic,
        markCardCompleted,
        testConfig,
        setTestConfig,
        activeQuestions,
        userAnswers,
        startTest,
        recordQuestionAnswer,
        finishTest,
        resetProgress,
      }}
    >
      {children}
    </AccountingContext.Provider>
  );
};

export function useAccounting() {
  const ctx = useContext(AccountingContext);
  if (!ctx) {
    throw new Error('useAccounting must be used within an AccountingProvider');
  }
  return ctx;
}
