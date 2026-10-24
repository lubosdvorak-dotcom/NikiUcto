import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTestQuestions,
  computeTAccountsForScenario,
  evaluateQuestion,
  getAccountClassNumber,
  parseCZKInput,
} from './accountingLogic';
import { TOPIC_1_ACCRUALS } from '../data/topic1-accruals';
import { ALL_ACCOUNTING_TOPICS } from '../data/allTopics';

test('Topic 1 dataset fulfills Maturita requirements (>= 10 questions, >= 4 study cards)', () => {
  assert.equal(TOPIC_1_ACCRUALS.id, 1);
  assert.ok(
    TOPIC_1_ACCRUALS.questions.length >= 10,
    `Expected at least 10 questions in Topic 1, got ${TOPIC_1_ACCRUALS.questions.length}`
  );
  assert.ok(
    TOPIC_1_ACCRUALS.studyCards.length >= 4,
    `Expected at least 4 study cards in Topic 1, got ${TOPIC_1_ACCRUALS.studyCards.length}`
  );
});

test('All 6 Maturita topics exist and contain valid study cards and questions', () => {
  assert.equal(ALL_ACCOUNTING_TOPICS.length, 6);
  const totalQuestions = ALL_ACCOUNTING_TOPICS.reduce((sum, t) => sum + t.questions.length, 0);
  assert.ok(totalQuestions >= 30, `Expected at least 30 total questions, got ${totalQuestions}`);
});

test('computeTAccountsForScenario calculates MD/D turnovers and ending balances accurately', () => {
  const card1 = TOPIC_1_ACCRUALS.studyCards[0];
  // Step 2: FAP 120 000 on MD 381 / D 321, then VÚD 30 000 on MD 518 / D 381
  const ledgersAfterStep2 = computeTAccountsForScenario(
    card1.transactions,
    card1.initialBalances || {},
    2
  );

  const acc381 = ledgersAfterStep2.find((a) => a.accountCode === '381');
  assert.ok(acc381);
  assert.equal(acc381.totalDebit, 120000);
  assert.equal(acc381.totalCredit, 30000);
  assert.equal(acc381.endingBalance, 90000);
  assert.equal(acc381.balanceSide, 'MD');

  // Step 3: Remaining 90 000 released from 381 to 518 -> 381 is balanced (0)
  const ledgersAfterStep3 = computeTAccountsForScenario(
    card1.transactions,
    card1.initialBalances || {},
    3
  );
  const acc381Final = ledgersAfterStep3.find((a) => a.accountCode === '381');
  assert.ok(acc381Final);
  assert.equal(acc381Final.endingBalance, 0);
  assert.equal(acc381Final.balanceSide, 'vyrovnano');
});

test('evaluateQuestion validates single_choice, booking, and error_detection accurately', () => {
  const q1 = TOPIC_1_ACCRUALS.questions[0]; // single_choice
  const res1 = evaluateQuestion(q1, { selectedOptionId: 'a' });
  assert.equal(res1.isCorrect, true);

  const q2 = TOPIC_1_ACCRUALS.questions[1]; // booking: MD 381 / D 211, 4800
  const res2Correct = evaluateQuestion(q2, {
    enteredDebit: '381',
    enteredCredit: '211',
    enteredAmount: 4800,
  });
  assert.equal(res2Correct.isCorrect, true);

  const res2Swapped = evaluateQuestion(q2, {
    enteredDebit: '211',
    enteredCredit: '381',
    enteredAmount: 4800,
  });
  assert.equal(res2Swapped.isCorrect, false);
  assert.ok(res2Swapped.feedbackSummary.includes('Převrácené strany MD a D'));

  const q3 = TOPIC_1_ACCRUALS.questions[2]; // error_detection (has error, c1 is right)
  const res3Correct = evaluateQuestion(q3, {
    judgedCorrect: false,
    selectedCorrectionId: 'c1',
  });
  assert.equal(res3Correct.isCorrect, true);
});

test('buildTestQuestions returns exact requested preset lengths (5, 15, 30)', () => {
  assert.equal(buildTestQuestions(ALL_ACCOUNTING_TOPICS, [1], 5).length, 5);
  assert.equal(buildTestQuestions(ALL_ACCOUNTING_TOPICS, [1, 2], 15).length, 15);
  assert.equal(buildTestQuestions(ALL_ACCOUNTING_TOPICS, [1, 2, 3, 4, 5, 6], 30).length, 30);
});

test('account class parser and CZK parser handle inputs cleanly', () => {
  assert.equal(getAccountClassNumber('042'), 0);
  assert.equal(getAccountClassNumber('381'), 3);
  assert.equal(getAccountClassNumber('554'), 5);
  assert.equal(parseCZKInput('120 000 Kč'), 120000);
});
