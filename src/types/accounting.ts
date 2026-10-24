export type AccountClassNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type AccountNature =
  | 'aktivni'
  | 'pasivni'
  | 'aktivne_pasivni'
  | 'nakladovy'
  | 'vynosovy'
  | 'zaverkovy'
  | 'vnitropodnikovy';

export interface AccountInfo {
  code: string; // e.g., "381"
  name: string; // e.g., "Náklady příštích období"
  accountClass: AccountClassNumber;
  nature: AccountNature;
  taxNote?: string;
  description: string;
}

export interface TAccountEntry {
  id: string;
  document: string; // e.g., "FAP 124/2026", "VÚD 01/2027"
  date: string; // e.g., "01. 10. 2026"
  description: string; // e.g., "Předplatné odborného tisku na 12 měsíců (10/2026–09/2027)"
  amount: number; // e.g., 12000
  debitAccount: string; // MD účet, e.g., "381"
  creditAccount: string; // D účet, e.g., "321"
  pedagogicalHint: string; // Vysvětlení proč jde na MD/D
  taxImpact?: string; // Dopad do základu daně
}

export interface StudyCard {
  id: string;
  topicId: number;
  order: number;
  title: string;
  subtitle: string;
  keyAccounts: string[]; // e.g., ["381", "382", "383", "384"]
  corePrinciple: string;
  legislativeRule: string; // Zákon o účetnictví / ČÚS / ZDP
  commonMistake: string; // Častá chyba u maturity
  taxDeductibilityRule: string; // Daňová uznatelnost dle ZDP
  scenarioTitle: string;
  scenarioContext: string;
  initialBalances?: Record<string, { side: 'MD' | 'D'; amount: number }>;
  transactions: TAccountEntry[];
}

export interface CheatSheetItem {
  id: string;
  operation: string;
  document: string;
  debitAccount: string;
  creditAccount: string;
  conditionOrNote: string;
  taxDeductible: 'ano' | 'ne' | 'podminene';
}

export interface TopicCheatSheet {
  id: string;
  title: string;
  summary: string;
  items: CheatSheetItem[];
}

export type QuestionDifficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'single_choice' | 'booking' | 'error_detection';

export interface BaseQuestion {
  id: string;
  topicId: number;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  title: string;
  prompt: string;
  explanation: string;
  principleExplanation: string; // Proč je/není daňově uznatelný, proč patří na daný účet
  relatedAccounts: string[];
  points: number;
}

export interface SingleChoiceOption {
  id: string;
  text: string;
  debitPreview?: string;
  creditPreview?: string;
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: 'single_choice';
  options: SingleChoiceOption[];
  correctOptionId: string;
}

export interface BookingQuestion extends BaseQuestion {
  type: 'booking';
  documentType: string; // e.g., "VÚD 19/12/2026"
  transactionDate: string;
  expectedDebit: string; // e.g., "381"
  expectedCredit: string; // e.g., "221"
  expectedAmount: number; // e.g., 24000
  acceptableDebits?: string[]; // Alternativní uznatelné syntetické účty
  acceptableCredits?: string[];
  calculationHint: string;
}

export interface JournalRow {
  document: string;
  date: string;
  description: string;
  amount: number;
  debit: string;
  credit: string;
}

export interface ErrorDetectionQuestion extends BaseQuestion {
  type: 'error_detection';
  journalRow: JournalRow;
  isCorrectlyBooked: boolean;
  errorCategory?: 'wrong_sides' | 'wrong_account' | 'wrong_amount' | 'none';
  correctDebit: string;
  correctCredit: string;
  correctAmount: number;
  correctionChoices: {
    id: string;
    label: string;
    debit: string;
    credit: string;
    amount: number;
  }[];
  correctChoiceId: string;
}

export type AccountingQuestion =
  | SingleChoiceQuestion
  | BookingQuestion
  | ErrorDetectionQuestion;

export interface AccountingTopic {
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  keyAccounts: string[];
  accountClasses: AccountClassNumber[];
  estimatedMinutes: number;
  examWeightPercent: number; // Váha u maturitní zkoušky
  studyCards: StudyCard[];
  cheatSheets: TopicCheatSheet[];
  questions: AccountingQuestion[];
}

export type TestLengthPreset = 5 | 15 | 30;

export interface TestConfiguration {
  length: TestLengthPreset;
  selectedTopicIds: number[];
  questionTypes: QuestionType[];
  timed: boolean;
  timeLimitSeconds: number;
}

export interface UserAnswerRecord {
  questionId: string;
  questionType: QuestionType;
  isCorrect: boolean;
  earnedPoints: number;
  maxPoints: number;
  timeSpentSeconds: number;
  // User inputs depending on type
  selectedOptionId?: string;
  enteredDebit?: string;
  enteredCredit?: string;
  enteredAmount?: number;
  judgedCorrect?: boolean;
  selectedCorrectionId?: string;
}

export interface TopicProgress {
  topicId: number;
  completedCardIds: string[];
  answeredQuestionIds: string[];
  correctQuestionIds: string[];
  lastScorePercent: number | null;
  attemptsCount: number;
}
