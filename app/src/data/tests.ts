import type { Test, TestConfig } from '@/types';

export const testsData: Test[] = [
  {
    id: 'jee-mock-1',
    name: 'JEE Main Full Mock Test - 1',
    type: 'JEE',
    description: 'Complete JEE Main pattern mock test with Physics, Chemistry, and Mathematics sections. Duration: 3 hours. Total Questions: 90.',
    duration: 180,
    totalMarks: 360,
    totalQuestions: 90,
    sections: [
      { id: 'jee-sec-1', name: 'Physics', subject: 'Physics', questionCount: 30, marks: 120, timeLimit: 60 },
      { id: 'jee-sec-2', name: 'Chemistry', subject: 'Chemistry', questionCount: 30, marks: 120, timeLimit: 60 },
      { id: 'jee-sec-3', name: 'Mathematics', subject: 'Mathematics', questionCount: 30, marks: 120, timeLimit: 60 }
    ],
    instructions: [
      'The test contains 3 sections: Physics, Chemistry, and Mathematics.',
      'Each section has 30 questions.',
      'Each question carries 4 marks for correct answer.',
      'There is negative marking of 1 mark for each wrong answer.',
      'No marks will be deducted for unattempted questions.',
      'You can navigate between sections and questions freely.',
      'Use the question palette to track your progress.',
      'The test will be automatically submitted when time expires.',
      'Do not click the "Submit Test" button before completing the test.'
    ],
    negativeMarking: true,
    passingPercentage: 60,
    createdAt: '2024-01-15',
    isActive: true
  },
  {
    id: 'eamcet-mock-1',
    name: 'AP EAMCET Full Mock Test - 1',
    type: 'EAMCET',
    description: 'AP EAMCET pattern mock test with 160 questions. Duration: 3 hours. No negative marking.',
    duration: 180,
    totalMarks: 160,
    totalQuestions: 160,
    sections: [
      { id: 'eamcet-sec-1', name: 'Mathematics', subject: 'Mathematics', questionCount: 80, marks: 80, timeLimit: 90 },
      { id: 'eamcet-sec-2', name: 'Physics', subject: 'Physics', questionCount: 40, marks: 40, timeLimit: 45 },
      { id: 'eamcet-sec-3', name: 'Chemistry', subject: 'Chemistry', questionCount: 40, marks: 40, timeLimit: 45 }
    ],
    instructions: [
      'The test contains 3 sections: Mathematics (80 questions), Physics (40 questions), and Chemistry (40 questions).',
      'Each question carries 1 mark.',
      'There is NO negative marking for wrong answers.',
      'No marks will be deducted for unattempted questions.',
      'You can navigate between sections and questions freely.',
      'The question palette shows: Not Visited (Grey), Unanswered (Red), Answered (Green), Marked for Review (Blue).',
      'The test will be automatically submitted when time expires.',
      'Do not click the "Submit Test" button before completing the test.'
    ],
    negativeMarking: false,
    passingPercentage: 50,
    createdAt: '2024-01-20',
    isActive: true
  },
  {
    id: 'neet-mock-1',
    name: 'NEET Full Mock Test - 1',
    type: 'NEET',
    description: 'NEET pattern mock test with Physics, Chemistry, and Biology sections. Duration: 3 hours 20 minutes.',
    duration: 200,
    totalMarks: 720,
    totalQuestions: 180,
    sections: [
      { id: 'neet-sec-1', name: 'Physics', subject: 'Physics', questionCount: 45, marks: 180, timeLimit: 50 },
      { id: 'neet-sec-2', name: 'Chemistry', subject: 'Chemistry', questionCount: 45, marks: 180, timeLimit: 50 },
      { id: 'neet-sec-3', name: 'Botany', subject: 'Biology', questionCount: 45, marks: 180, timeLimit: 40 },
      { id: 'neet-sec-4', name: 'Zoology', subject: 'Biology', questionCount: 45, marks: 180, timeLimit: 40 }
    ],
    instructions: [
      'The test contains 4 sections: Physics, Chemistry, Botany, and Zoology.',
      'Each section has 45 questions.',
      'Each question carries 4 marks for correct answer.',
      'There is negative marking of 1 mark for each wrong answer.',
      'No marks will be deducted for unattempted questions.',
      'You can navigate between sections and questions freely.',
      'The test will be automatically submitted when time expires.',
      'Do not click the "Submit Test" button before completing the test.'
    ],
    negativeMarking: true,
    passingPercentage: 50,
    createdAt: '2024-01-25',
    isActive: true
  },
  {
    id: 'ssc-cgl-mock-1',
    name: 'SSC CGL Tier-I Mock Test - 1',
    type: 'SSC',
    description: 'SSC CGL Tier-I pattern mock test with General Intelligence, General Awareness, Quantitative Aptitude, and English.',
    duration: 60,
    totalMarks: 200,
    totalQuestions: 100,
    sections: [
      { id: 'ssc-sec-1', name: 'General Intelligence', subject: 'Reasoning', questionCount: 25, marks: 50, timeLimit: 15 },
      { id: 'ssc-sec-2', name: 'General Awareness', subject: 'General Awareness', questionCount: 25, marks: 50, timeLimit: 15 },
      { id: 'ssc-sec-3', name: 'Quantitative Aptitude', subject: 'Quantitative Aptitude', questionCount: 25, marks: 50, timeLimit: 15 },
      { id: 'ssc-sec-4', name: 'English Comprehension', subject: 'English', questionCount: 25, marks: 50, timeLimit: 15 }
    ],
    instructions: [
      'The test contains 4 sections with 25 questions each.',
      'Each question carries 2 marks.',
      'There is negative marking of 0.5 marks for each wrong answer.',
      'No marks will be deducted for unattempted questions.',
      'You can navigate between sections and questions freely.',
      'The test will be automatically submitted when time expires.',
      'Do not click the "Submit Test" button before completing the test.'
    ],
    negativeMarking: true,
    passingPercentage: 35,
    createdAt: '2024-02-01',
    isActive: true
  },
  {
    id: 'banking-po-mock-1',
    name: 'IBPS PO Prelims Mock Test - 1',
    type: 'BANKING',
    description: 'IBPS PO Prelims pattern mock test with English, Quantitative Aptitude, and Reasoning.',
    duration: 60,
    totalMarks: 100,
    totalQuestions: 100,
    sections: [
      { id: 'bank-sec-1', name: 'English Language', subject: 'English', questionCount: 30, marks: 30, timeLimit: 20 },
      { id: 'bank-sec-2', name: 'Quantitative Aptitude', subject: 'Quantitative Aptitude', questionCount: 35, marks: 35, timeLimit: 20 },
      { id: 'bank-sec-3', name: 'Reasoning Ability', subject: 'Reasoning', questionCount: 35, marks: 35, timeLimit: 20 }
    ],
    instructions: [
      'The test contains 3 sections: English (30), Quant (35), and Reasoning (35).',
      'Each question carries 1 mark.',
      'There is negative marking of 0.25 marks for each wrong answer.',
      'Sectional timing is applicable.',
      'You cannot navigate between sections until time expires for the current section.',
      'The test will be automatically submitted when time expires.',
      'Do not click the "Submit Test" button before completing the test.'
    ],
    negativeMarking: true,
    passingPercentage: 40,
    createdAt: '2024-02-05',
    isActive: true
  },
  {
    id: 'jee-math-practice',
    name: 'JEE Mathematics Practice Test',
    type: 'JEE',
    description: 'Focused practice test for JEE Mathematics covering Calculus, Algebra, and Coordinate Geometry.',
    duration: 60,
    totalMarks: 100,
    totalQuestions: 25,
    sections: [
      { id: 'math-prac-1', name: 'Mathematics', subject: 'Mathematics', questionCount: 25, marks: 100, timeLimit: 60 }
    ],
    instructions: [
      'This is a Mathematics-only practice test.',
      'Each question carries 4 marks.',
      'There is negative marking of 1 mark for wrong answers.',
      'Focus on accuracy and speed.',
      'The test will be automatically submitted when time expires.'
    ],
    negativeMarking: true,
    passingPercentage: 50,
    createdAt: '2024-02-10',
    isActive: true
  },
  {
    id: 'jee-physics-practice',
    name: 'JEE Physics Practice Test - Mechanics',
    type: 'JEE',
    description: 'Focused practice test for JEE Physics covering Mechanics, Kinematics, and Dynamics.',
    duration: 60,
    totalMarks: 100,
    totalQuestions: 25,
    sections: [
      { id: 'phy-prac-1', name: 'Physics', subject: 'Physics', questionCount: 25, marks: 100, timeLimit: 60 }
    ],
    instructions: [
      'This is a Physics-only practice test.',
      'Each question carries 4 marks.',
      'There is negative marking of 1 mark for wrong answers.',
      'Focus on conceptual understanding.',
      'The test will be automatically submitted when time expires.'
    ],
    negativeMarking: true,
    passingPercentage: 50,
    createdAt: '2024-02-12',
    isActive: true
  },
  {
    id: 'ssc-quant-practice',
    name: 'SSC Quantitative Aptitude Practice',
    type: 'SSC',
    description: 'Practice test for SSC Quantitative Aptitude with Arithmetic, Algebra, and Geometry questions.',
    duration: 45,
    totalMarks: 50,
    totalQuestions: 25,
    sections: [
      { id: 'ssc-quant-1', name: 'Quantitative Aptitude', subject: 'Quantitative Aptitude', questionCount: 25, marks: 50, timeLimit: 45 }
    ],
    instructions: [
      'This is a Quant-only practice test.',
      'Each question carries 2 marks.',
      'There is negative marking of 0.5 marks for wrong answers.',
      'Focus on calculation speed.',
      'The test will be automatically submitted when time expires.'
    ],
    negativeMarking: true,
    passingPercentage: 40,
    createdAt: '2024-02-15',
    isActive: true
  }
];

export const testConfigsData: TestConfig[] = [
  {
    id: 'config-jee-1',
    testId: 'jee-mock-1',
    questionDistribution: [
      { subject: 'Physics', topic: 'Mechanics', easyCount: 5, mediumCount: 10, hardCount: 5 },
      { subject: 'Physics', topic: 'Electrostatics', easyCount: 3, mediumCount: 5, hardCount: 2 },
      { subject: 'Chemistry', topic: 'Organic Chemistry', easyCount: 5, mediumCount: 10, hardCount: 5 },
      { subject: 'Chemistry', topic: 'Physical Chemistry', easyCount: 3, mediumCount: 5, hardCount: 2 },
      { subject: 'Mathematics', topic: 'Calculus', easyCount: 5, mediumCount: 10, hardCount: 5 },
      { subject: 'Mathematics', topic: 'Algebra', easyCount: 3, mediumCount: 5, hardCount: 2 }
    ],
    randomizeQuestions: true,
    randomizeOptions: true,
    showResultImmediately: false,
    allowReview: true,
    maxAttempts: 3
  },
  {
    id: 'config-eamcet-1',
    testId: 'eamcet-mock-1',
    questionDistribution: [
      { subject: 'Mathematics', topic: 'Trigonometry', easyCount: 15, mediumCount: 20, hardCount: 5 },
      { subject: 'Mathematics', topic: 'Calculus', easyCount: 10, mediumCount: 15, hardCount: 5 },
      { subject: 'Physics', topic: 'Mechanics', easyCount: 8, mediumCount: 10, hardCount: 2 },
      { subject: 'Physics', topic: 'Electrostatics', easyCount: 8, mediumCount: 10, hardCount: 2 },
      { subject: 'Chemistry', topic: 'Organic Chemistry', easyCount: 8, mediumCount: 10, hardCount: 2 },
      { subject: 'Chemistry', topic: 'Inorganic Chemistry', easyCount: 8, mediumCount: 10, hardCount: 2 }
    ],
    randomizeQuestions: true,
    randomizeOptions: true,
    showResultImmediately: true,
    allowReview: true,
    maxAttempts: 5
  }
];

export const getTestById = (id: string): Test | undefined => {
  return testsData.find(t => t.id === id);
};

export const getTestsByType = (type: string): Test[] => {
  return testsData.filter(t => t.type === type);
};

export const getActiveTests = (): Test[] => {
  return testsData.filter(t => t.isActive);
};

export const getTestConfig = (testId: string): TestConfig | undefined => {
  return testConfigsData.find(c => c.testId === testId);
};
