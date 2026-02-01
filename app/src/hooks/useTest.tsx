import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Test, Question, TestAttempt, UserResponse, TopicAnalysis } from '@/types';
import { getQuestionsByFilters } from '@/data/questions';
import { getTestById, getTestConfig } from '@/data/tests';

interface ActiveTest {
  test: Test;
  questions: Question[];
  responses: UserResponse[];
  currentQuestionIndex: number;
  currentSectionIndex: number;
  startTime: number;
  timeRemaining: number;
}

interface TestContextType {
  activeTest: ActiveTest | null;
  testHistory: TestAttempt[];
  startTest: (testId: string) => Promise<{ success: boolean; error?: string }>;
  submitTest: () => TestAttempt | null;
  saveResponse: (questionId: string, answer: number | number[] | null) => void;
  markForReview: (questionId: string) => void;
  navigateToQuestion: (index: number) => void;
  navigateToSection: (index: number) => void;
  getCurrentQuestion: () => Question | null;
  getCurrentResponse: () => UserResponse | null;
  updateTimeRemaining: (time: number) => void;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export const TestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTest, setActiveTest] = useState<ActiveTest | null>(null);
  const [testHistory, setTestHistory] = useState<TestAttempt[]>([]);

  const startTest = useCallback(async (testId: string): Promise<{ success: boolean; error?: string }> => {
    const test = getTestById(testId);
    if (!test) {
      return { success: false, error: 'Test not found' };
    }

    const config = getTestConfig(testId);
    
    // Generate questions based on test configuration
    const questions: Question[] = [];
    
    if (config) {
      // Use configured distribution
      for (const dist of config.questionDistribution) {
        const easy = getQuestionsByFilters({ 
          subjects: [dist.subject], 
          topics: [dist.topic], 
          difficulties: ['easy'],
          count: dist.easyCount 
        });
        const medium = getQuestionsByFilters({ 
          subjects: [dist.subject], 
          topics: [dist.topic], 
          difficulties: ['medium'],
          count: dist.mediumCount 
        });
        const hard = getQuestionsByFilters({ 
          subjects: [dist.subject], 
          topics: [dist.topic], 
          difficulties: ['hard'],
          count: dist.hardCount 
        });
        questions.push(...easy, ...medium, ...hard);
      }
    } else {
      // Default: get questions for each section
      for (const section of test.sections) {
        const sectionQuestions = getQuestionsByFilters({
          subjects: [section.subject],
          count: section.questionCount
        });
        questions.push(...sectionQuestions);
      }
    }

    // Shuffle if needed
    const shuffledQuestions = config?.randomizeQuestions 
      ? questions.sort(() => Math.random() - 0.5)
      : questions;

    // Initialize responses
    const responses: UserResponse[] = shuffledQuestions.map(q => ({
      questionId: q.id,
      selectedAnswer: null,
      timeSpent: 0,
      isMarkedForReview: false,
      isVisited: false
    }));

    setActiveTest({
      test,
      questions: shuffledQuestions,
      responses,
      currentQuestionIndex: 0,
      currentSectionIndex: 0,
      startTime: Date.now(),
      timeRemaining: test.duration * 60
    });

    return { success: true };
  }, []);

  const submitTest = useCallback((): TestAttempt | null => {
    if (!activeTest) return null;

    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - activeTest.startTime) / 1000);
    
    let totalScore = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let unattempted = 0;

    const sectionScores = activeTest.test.sections.map(section => ({
      sectionId: section.id,
      sectionName: section.name,
      score: 0,
      maxScore: section.marks
    }));

    const topicMap = new Map<string, TopicAnalysis>();

    activeTest.questions.forEach((question, index) => {
      const response = activeTest.responses[index];
      const sectionScore = sectionScores.find(s => s.sectionName === question.subject || 
        activeTest.test.sections.find(sec => sec.id === s.sectionId)?.subject === question.subject);

      if (response.selectedAnswer === null) {
        unattempted++;
      } else if (response.selectedAnswer === question.correctAnswer) {
        totalScore += question.marks;
        correctAnswers++;
        if (sectionScore) sectionScore.score += question.marks;
      } else {
        wrongAnswers++;
        if (activeTest.test.negativeMarking) {
          totalScore -= question.negativeMarks;
          if (sectionScore) sectionScore.score -= question.negativeMarks;
        }
      }

      // Topic analysis
      const topicKey = `${question.subject}-${question.topic}`;
      if (!topicMap.has(topicKey)) {
        topicMap.set(topicKey, {
          topic: question.topic,
          subject: question.subject,
          totalQuestions: 0,
          correct: 0,
          wrong: 0,
          unattempted: 0,
          accuracy: 0,
          averageTime: 0,
          weakArea: false
        });
      }
      const topicAnalysis = topicMap.get(topicKey)!;
      topicAnalysis.totalQuestions++;
      if (response.selectedAnswer === null) {
        topicAnalysis.unattempted++;
      } else if (response.selectedAnswer === question.correctAnswer) {
        topicAnalysis.correct++;
      } else {
        topicAnalysis.wrong++;
      }
    });

    // Calculate topic accuracies and identify weak areas
    const topicAnalysis = Array.from(topicMap.values()).map(t => {
      t.accuracy = (t.correct / t.totalQuestions) * 100;
      t.weakArea = t.accuracy < 75;
      return t;
    });

    const attempt: TestAttempt = {
      id: `attempt-${Date.now()}`,
      userId: 'user-1', // Current user
      testId: activeTest.test.id,
      testName: activeTest.test.name,
      testType: activeTest.test.type,
      startTime: new Date(activeTest.startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      status: 'completed',
      responses: activeTest.responses,
      totalScore,
      maxScore: activeTest.test.totalMarks,
      correctAnswers,
      wrongAnswers,
      unattempted,
      timeTaken,
      percentage: (totalScore / activeTest.test.totalMarks) * 100,
      sectionScores,
      topicAnalysis
    };

    setTestHistory(prev => [...prev, attempt]);
    setActiveTest(null);

    return attempt;
  }, [activeTest]);

  const saveResponse = useCallback((questionId: string, answer: number | number[] | null) => {
    if (!activeTest) return;

    setActiveTest(prev => {
      if (!prev) return null;
      const newResponses = [...prev.responses];
      const index = prev.questions.findIndex(q => q.id === questionId);
      if (index !== -1) {
        newResponses[index] = {
          ...newResponses[index],
          selectedAnswer: answer,
          isVisited: true
        };
      }
      return { ...prev, responses: newResponses };
    });
  }, [activeTest]);

  const markForReview = useCallback((questionId: string) => {
    if (!activeTest) return;

    setActiveTest(prev => {
      if (!prev) return null;
      const newResponses = [...prev.responses];
      const index = prev.questions.findIndex(q => q.id === questionId);
      if (index !== -1) {
        newResponses[index] = {
          ...newResponses[index],
          isMarkedForReview: !newResponses[index].isMarkedForReview,
          isVisited: true
        };
      }
      return { ...prev, responses: newResponses };
    });
  }, [activeTest]);

  const navigateToQuestion = useCallback((index: number) => {
    if (!activeTest) return;
    if (index < 0 || index >= activeTest.questions.length) return;

    setActiveTest(prev => {
      if (!prev) return null;
      // Mark current question as visited
      const newResponses = [...prev.responses];
      newResponses[index] = { ...newResponses[index], isVisited: true };
      return { ...prev, currentQuestionIndex: index, responses: newResponses };
    });
  }, [activeTest]);

  const navigateToSection = useCallback((index: number) => {
    if (!activeTest) return;
    if (index < 0 || index >= activeTest.test.sections.length) return;

    // Find first question of this section
    let questionIndex = 0;
    for (let i = 0; i < index; i++) {
      questionIndex += activeTest.test.sections[i].questionCount;
    }

    setActiveTest(prev => {
      if (!prev) return null;
      return { ...prev, currentSectionIndex: index, currentQuestionIndex: questionIndex };
    });
  }, [activeTest]);

  const getCurrentQuestion = useCallback((): Question | null => {
    if (!activeTest) return null;
    return activeTest.questions[activeTest.currentQuestionIndex] || null;
  }, [activeTest]);

  const getCurrentResponse = useCallback((): UserResponse | null => {
    if (!activeTest) return null;
    return activeTest.responses[activeTest.currentQuestionIndex] || null;
  }, [activeTest]);

  const updateTimeRemaining = useCallback((time: number) => {
    if (!activeTest) return;
    setActiveTest(prev => prev ? { ...prev, timeRemaining: time } : null);
  }, [activeTest]);

  return (
    <TestContext.Provider value={{
      activeTest,
      testHistory,
      startTest,
      submitTest,
      saveResponse,
      markForReview,
      navigateToQuestion,
      navigateToSection,
      getCurrentQuestion,
      getCurrentResponse,
      updateTimeRemaining
    }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTest = (): TestContextType => {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
};
