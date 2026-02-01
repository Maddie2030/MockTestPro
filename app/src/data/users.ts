import type { User, UserStats, TestAttempt, Notification } from '@/types';

export const usersData: User[] = [
  {
    id: 'user-1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul',
    createdAt: '2024-01-01'
  },
  {
    id: 'user-2',
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
    createdAt: '2024-01-05'
  },
  {
    id: 'user-3',
    name: 'Amit Kumar',
    email: 'amit.kumar@email.com',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amit',
    createdAt: '2024-01-10'
  },
  {
    id: 'admin-1',
    name: 'Dr. Rajesh Verma',
    email: 'admin@mocktestpro.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    createdAt: '2023-12-01'
  }
];

export const testAttemptsData: TestAttempt[] = [
  {
    id: 'attempt-1',
    userId: 'user-1',
    testId: 'jee-mock-1',
    testName: 'JEE Main Full Mock Test - 1',
    testType: 'JEE',
    startTime: '2024-02-10T09:00:00Z',
    endTime: '2024-02-10T12:00:00Z',
    status: 'completed',
    responses: [],
    totalScore: 245,
    maxScore: 360,
    correctAnswers: 65,
    wrongAnswers: 20,
    unattempted: 5,
    timeTaken: 10800,
    percentage: 68.06,
    rank: 156,
    totalParticipants: 2500,
    sectionScores: [
      { sectionId: 'jee-sec-1', sectionName: 'Physics', score: 85, maxScore: 120 },
      { sectionId: 'jee-sec-2', sectionName: 'Chemistry', score: 80, maxScore: 120 },
      { sectionId: 'jee-sec-3', sectionName: 'Mathematics', score: 80, maxScore: 120 }
    ],
    topicAnalysis: [
      { topic: 'Mechanics', subject: 'Physics', totalQuestions: 15, correct: 10, wrong: 4, unattempted: 1, accuracy: 71.4, averageTime: 45, weakArea: false },
      { topic: 'Electrostatics', subject: 'Physics', totalQuestions: 10, correct: 6, wrong: 3, unattempted: 1, accuracy: 66.7, averageTime: 50, weakArea: true },
      { topic: 'Organic Chemistry', subject: 'Chemistry', totalQuestions: 15, correct: 11, wrong: 3, unattempted: 1, accuracy: 78.6, averageTime: 40, weakArea: false },
      { topic: 'Physical Chemistry', subject: 'Chemistry', totalQuestions: 10, correct: 6, wrong: 3, unattempted: 1, accuracy: 66.7, averageTime: 55, weakArea: true },
      { topic: 'Calculus', subject: 'Mathematics', totalQuestions: 15, correct: 10, wrong: 4, unattempted: 1, accuracy: 71.4, averageTime: 48, weakArea: false },
      { topic: 'Algebra', subject: 'Mathematics', totalQuestions: 10, correct: 7, wrong: 2, unattempted: 1, accuracy: 77.8, averageTime: 42, weakArea: false }
    ]
  },
  {
    id: 'attempt-2',
    userId: 'user-1',
    testId: 'jee-math-practice',
    testName: 'JEE Mathematics Practice Test',
    testType: 'JEE',
    startTime: '2024-02-12T14:00:00Z',
    endTime: '2024-02-12T15:00:00Z',
    status: 'completed',
    responses: [],
    totalScore: 72,
    maxScore: 100,
    correctAnswers: 18,
    wrongAnswers: 5,
    unattempted: 2,
    timeTaken: 3600,
    percentage: 72,
    rank: 89,
    totalParticipants: 1200,
    sectionScores: [
      { sectionId: 'math-prac-1', sectionName: 'Mathematics', score: 72, maxScore: 100 }
    ],
    topicAnalysis: [
      { topic: 'Calculus', subject: 'Mathematics', totalQuestions: 15, correct: 11, wrong: 3, unattempted: 1, accuracy: 78.6, averageTime: 50, weakArea: false },
      { topic: 'Algebra', subject: 'Mathematics', totalQuestions: 10, correct: 7, wrong: 2, unattempted: 1, accuracy: 77.8, averageTime: 45, weakArea: false }
    ]
  },
  {
    id: 'attempt-3',
    userId: 'user-1',
    testId: 'eamcet-mock-1',
    testName: 'AP EAMCET Full Mock Test - 1',
    testType: 'EAMCET',
    startTime: '2024-02-15T08:00:00Z',
    endTime: '2024-02-15T11:00:00Z',
    status: 'completed',
    responses: [],
    totalScore: 128,
    maxScore: 160,
    correctAnswers: 128,
    wrongAnswers: 32,
    unattempted: 0,
    timeTaken: 10800,
    percentage: 80,
    rank: 45,
    totalParticipants: 1800,
    sectionScores: [
      { sectionId: 'eamcet-sec-1', sectionName: 'Mathematics', score: 68, maxScore: 80 },
      { sectionId: 'eamcet-sec-2', sectionName: 'Physics', score: 30, maxScore: 40 },
      { sectionId: 'eamcet-sec-3', sectionName: 'Chemistry', score: 30, maxScore: 40 }
    ],
    topicAnalysis: [
      { topic: 'Trigonometry', subject: 'Mathematics', totalQuestions: 40, correct: 34, wrong: 6, unattempted: 0, accuracy: 85, averageTime: 35, weakArea: false },
      { topic: 'Calculus', subject: 'Mathematics', totalQuestions: 40, correct: 34, wrong: 6, unattempted: 0, accuracy: 85, averageTime: 38, weakArea: false },
      { topic: 'Mechanics', subject: 'Physics', totalQuestions: 20, correct: 15, wrong: 5, unattempted: 0, accuracy: 75, averageTime: 42, weakArea: true },
      { topic: 'Electrostatics', subject: 'Physics', totalQuestions: 20, correct: 15, wrong: 5, unattempted: 0, accuracy: 75, averageTime: 45, weakArea: true },
      { topic: 'Organic Chemistry', subject: 'Chemistry', totalQuestions: 20, correct: 16, wrong: 4, unattempted: 0, accuracy: 80, averageTime: 38, weakArea: false },
      { topic: 'Inorganic Chemistry', subject: 'Chemistry', totalQuestions: 20, correct: 14, wrong: 6, unattempted: 0, accuracy: 70, averageTime: 40, weakArea: true }
    ]
  },
  {
    id: 'attempt-4',
    userId: 'user-1',
    testId: 'jee-physics-practice',
    testName: 'JEE Physics Practice Test - Mechanics',
    testType: 'JEE',
    startTime: '2024-02-18T10:00:00Z',
    endTime: '2024-02-18T11:00:00Z',
    status: 'completed',
    responses: [],
    totalScore: 68,
    maxScore: 100,
    correctAnswers: 17,
    wrongAnswers: 6,
    unattempted: 2,
    timeTaken: 3600,
    percentage: 68,
    rank: 145,
    totalParticipants: 980,
    sectionScores: [
      { sectionId: 'phy-prac-1', sectionName: 'Physics', score: 68, maxScore: 100 }
    ],
    topicAnalysis: [
      { topic: 'Mechanics', subject: 'Physics', totalQuestions: 15, correct: 10, wrong: 4, unattempted: 1, accuracy: 71.4, averageTime: 50, weakArea: false },
      { topic: 'Kinematics', subject: 'Physics', totalQuestions: 10, correct: 7, wrong: 2, unattempted: 1, accuracy: 77.8, averageTime: 45, weakArea: false }
    ]
  },
  {
    id: 'attempt-5',
    userId: 'user-1',
    testId: 'ssc-cgl-mock-1',
    testName: 'SSC CGL Tier-I Mock Test - 1',
    testType: 'SSC',
    startTime: '2024-02-20T09:30:00Z',
    endTime: '2024-02-20T10:30:00Z',
    status: 'completed',
    responses: [],
    totalScore: 145,
    maxScore: 200,
    correctAnswers: 75,
    wrongAnswers: 20,
    unattempted: 5,
    timeTaken: 3600,
    percentage: 72.5,
    rank: 234,
    totalParticipants: 3200,
    sectionScores: [
      { sectionId: 'ssc-sec-1', sectionName: 'General Intelligence', score: 42, maxScore: 50 },
      { sectionId: 'ssc-sec-2', sectionName: 'General Awareness', score: 35, maxScore: 50 },
      { sectionId: 'ssc-sec-3', sectionName: 'Quantitative Aptitude', score: 38, maxScore: 50 },
      { sectionId: 'ssc-sec-4', sectionName: 'English Comprehension', score: 30, maxScore: 50 }
    ],
    topicAnalysis: [
      { topic: 'Reasoning', subject: 'General Intelligence', totalQuestions: 25, correct: 21, wrong: 3, unattempted: 1, accuracy: 87.5, averageTime: 30, weakArea: false },
      { topic: 'Indian Polity', subject: 'General Awareness', totalQuestions: 8, correct: 6, wrong: 1, unattempted: 1, accuracy: 85.7, averageTime: 25, weakArea: false },
      { topic: 'Indian History', subject: 'General Awareness', totalQuestions: 8, correct: 5, wrong: 2, unattempted: 1, accuracy: 71.4, averageTime: 30, weakArea: true },
      { topic: 'Percentage', subject: 'Quantitative Aptitude', totalQuestions: 8, correct: 6, wrong: 1, unattempted: 1, accuracy: 85.7, averageTime: 35, weakArea: false },
      { topic: 'Time and Work', subject: 'Quantitative Aptitude', totalQuestions: 8, correct: 5, wrong: 2, unattempted: 1, accuracy: 71.4, averageTime: 40, weakArea: true },
      { topic: 'Grammar', subject: 'English', totalQuestions: 12, correct: 8, wrong: 3, unattempted: 1, accuracy: 72.7, averageTime: 28, weakArea: true },
      { topic: 'Comprehension', subject: 'English', totalQuestions: 13, correct: 9, wrong: 3, unattempted: 1, accuracy: 75, averageTime: 45, weakArea: false }
    ]
  }
];

export const userStatsData: UserStats[] = [
  {
    userId: 'user-1',
    totalTestsAttempted: 5,
    totalTestsCompleted: 5,
    averageScore: 71.3,
    highestScore: 80,
    lowestScore: 68,
    averageAccuracy: 74.2,
    totalTimeSpent: 32400,
    strongestSubject: 'Mathematics',
    weakestSubject: 'Physics',
    improvementRate: 12.5,
    topicWisePerformance: [
      { topic: 'Trigonometry', subject: 'Mathematics', totalQuestions: 40, correct: 34, wrong: 6, unattempted: 0, accuracy: 85, averageTime: 35, weakArea: false },
      { topic: 'Calculus', subject: 'Mathematics', totalQuestions: 30, correct: 24, wrong: 5, unattempted: 1, accuracy: 82.8, averageTime: 48, weakArea: false },
      { topic: 'Algebra', subject: 'Mathematics', totalQuestions: 20, correct: 16, wrong: 3, unattempted: 1, accuracy: 84.2, averageTime: 43, weakArea: false },
      { topic: 'Mechanics', subject: 'Physics', totalQuestions: 35, correct: 25, wrong: 9, unattempted: 1, accuracy: 73.5, averageTime: 48, weakArea: true },
      { topic: 'Electrostatics', subject: 'Physics', totalQuestions: 30, correct: 21, wrong: 8, unattempted: 1, accuracy: 72.4, averageTime: 50, weakArea: true },
      { topic: 'Organic Chemistry', subject: 'Chemistry', totalQuestions: 35, correct: 27, wrong: 7, unattempted: 1, accuracy: 79.4, averageTime: 39, weakArea: false },
      { topic: 'Physical Chemistry', subject: 'Chemistry', totalQuestions: 30, correct: 20, wrong: 9, unattempted: 1, accuracy: 69, averageTime: 52, weakArea: true },
      { topic: 'Inorganic Chemistry', subject: 'Chemistry', totalQuestions: 20, correct: 14, wrong: 6, unattempted: 0, accuracy: 70, averageTime: 40, weakArea: true },
      { topic: 'Reasoning', subject: 'General Intelligence', totalQuestions: 25, correct: 21, wrong: 3, unattempted: 1, accuracy: 87.5, averageTime: 30, weakArea: false },
      { topic: 'Indian History', subject: 'General Awareness', totalQuestions: 8, correct: 5, wrong: 2, unattempted: 1, accuracy: 71.4, averageTime: 30, weakArea: true },
      { topic: 'Time and Work', subject: 'Quantitative Aptitude', totalQuestions: 8, correct: 5, wrong: 2, unattempted: 1, accuracy: 71.4, averageTime: 40, weakArea: true },
      { topic: 'Grammar', subject: 'English', totalQuestions: 12, correct: 8, wrong: 3, unattempted: 1, accuracy: 72.7, averageTime: 28, weakArea: true }
    ],
    recentTests: testAttemptsData.filter(a => a.userId === 'user-1').slice(0, 5),
    performanceTrend: [
      { date: '2024-02-10', testName: 'JEE Main Full Mock', score: 245, maxScore: 360, percentage: 68.06, rank: 156 },
      { date: '2024-02-12', testName: 'JEE Math Practice', score: 72, maxScore: 100, percentage: 72, rank: 89 },
      { date: '2024-02-15', testName: 'EAMCET Mock', score: 128, maxScore: 160, percentage: 80, rank: 45 },
      { date: '2024-02-18', testName: 'JEE Physics Practice', score: 68, maxScore: 100, percentage: 68, rank: 145 },
      { date: '2024-02-20', testName: 'SSC CGL Mock', score: 145, maxScore: 200, percentage: 72.5, rank: 234 }
    ]
  }
];

export const notificationsData: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    title: 'New Test Available',
    message: 'JEE Advanced Mock Test - 1 is now available. Start practicing!',
    type: 'info',
    isRead: false,
    createdAt: '2024-02-22T10:00:00Z'
  },
  {
    id: 'notif-2',
    userId: 'user-1',
    title: 'Test Completed',
    message: 'Congratulations! You scored 72.5% in SSC CGL Tier-I Mock Test.',
    type: 'success',
    isRead: true,
    createdAt: '2024-02-20T11:00:00Z'
  },
  {
    id: 'notif-3',
    userId: 'user-1',
    title: 'Improvement Suggested',
    message: 'Focus on Physics - Electrostatics. Your accuracy is below 75%.',
    type: 'warning',
    isRead: false,
    createdAt: '2024-02-18T12:00:00Z'
  },
  {
    id: 'notif-4',
    userId: 'user-1',
    title: 'Weekly Report',
    message: 'Your weekly performance report is ready. Check your progress!',
    type: 'info',
    isRead: true,
    createdAt: '2024-02-17T09:00:00Z'
  }
];

export const getUserById = (id: string): User | undefined => {
  return usersData.find(u => u.id === id);
};

export const getUserByEmail = (email: string): User | undefined => {
  return usersData.find(u => u.email === email);
};

export const getUserStats = (userId: string): UserStats | undefined => {
  return userStatsData.find(s => s.userId === userId);
};

export const getUserAttempts = (userId: string): TestAttempt[] => {
  return testAttemptsData.filter(a => a.userId === userId);
};

export const getUserNotifications = (userId: string): Notification[] => {
  return notificationsData.filter(n => n.userId === userId).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};
