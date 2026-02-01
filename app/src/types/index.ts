// User Types
export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

// Question Types
export type DifficultyLevel = 'easy' | 'medium' | 'hard';
export type QuestionType = 'single' | 'multiple' | 'integer';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number | number[];
  explanation: string;
  subject: string;
  topic: string;
  subTopic?: string;
  difficulty: DifficultyLevel;
  marks: number;
  negativeMarks: number;
  type: QuestionType;
  image?: string;
  tags: string[];
}

// Test Types
export type TestType = 'EAMCET' | 'JEE' | 'NEET' | 'SSC' | 'BANKING' | 'UPSC' | 'GATE' | 'CUSTOM';
export type TestStatus = 'not_started' | 'in_progress' | 'completed' | 'abandoned';

export interface TestSection {
  id: string;
  name: string;
  subject: string;
  questionCount: number;
  marks: number;
  timeLimit: number; // in minutes
}

export interface Test {
  id: string;
  name: string;
  type: TestType;
  description: string;
  duration: number; // in minutes
  totalMarks: number;
  totalQuestions: number;
  sections: TestSection[];
  instructions: string[];
  negativeMarking: boolean;
  passingPercentage: number;
  createdAt: string;
  isActive: boolean;
}

// Test Configuration for Admin
export interface TestConfig {
  id: string;
  testId: string;
  questionDistribution: {
    subject: string;
    topic: string;
    easyCount: number;
    mediumCount: number;
    hardCount: number;
  }[];
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
  showResultImmediately: boolean;
  allowReview: boolean;
  maxAttempts: number;
}

// User Response Types
export interface UserResponse {
  questionId: string;
  selectedAnswer: number | number[] | null;
  timeSpent: number; // in seconds
  isMarkedForReview: boolean;
  isVisited: boolean;
}

export interface TestAttempt {
  id: string;
  userId: string;
  testId: string;
  testName: string;
  testType: TestType;
  startTime: string;
  endTime?: string;
  status: TestStatus;
  responses: UserResponse[];
  totalScore: number;
  maxScore: number;
  correctAnswers: number;
  wrongAnswers: number;
  unattempted: number;
  timeTaken: number; // in seconds
  percentage: number;
  rank?: number;
  totalParticipants?: number;
  sectionScores: {
    sectionId: string;
    sectionName: string;
    score: number;
    maxScore: number;
  }[];
  topicAnalysis: TopicAnalysis[];
}

// Analytics Types
export interface TopicAnalysis {
  topic: string;
  subject: string;
  totalQuestions: number;
  correct: number;
  wrong: number;
  unattempted: number;
  accuracy: number;
  averageTime: number;
  weakArea: boolean;
}

export interface PerformanceTrend {
  date: string;
  testName: string;
  score: number;
  maxScore: number;
  percentage: number;
  rank?: number;
}

export interface UserStats {
  userId: string;
  totalTestsAttempted: number;
  totalTestsCompleted: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  averageAccuracy: number;
  totalTimeSpent: number; // in minutes
  strongestSubject: string;
  weakestSubject: string;
  improvementRate: number; // percentage improvement over time
  topicWisePerformance: TopicAnalysis[];
  recentTests: TestAttempt[];
  performanceTrend: PerformanceTrend[];
}

// Admin Dashboard Types
export interface AdminStats {
  totalUsers: number;
  totalTests: number;
  totalAttempts: number;
  activeUsers: number;
  averageScore: number;
  testCompletionRate: number;
}

export interface UserManagement {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  testsAttempted: number;
  lastActive: string;
  status: 'active' | 'inactive';
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}
