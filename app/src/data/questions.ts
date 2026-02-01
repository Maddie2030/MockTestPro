import type { Question } from '@/types';

export const questionsData: Question[] = [
  // Mathematics - JEE/EAMCET Level
  {
    id: 'm1',
    question: 'Evaluate the expression: √(1+cos θ)/(1-cos θ) = ?',
    options: ['cosec θ - cot θ', 'cosec θ + cot θ', 'tan θ - cot θ', 'None of these'],
    correctAnswer: 1,
    explanation: 'Using half-angle formulas, we can simplify √(1+cos θ)/(1-cos θ) = √(2cos²(θ/2))/(2sin²(θ/2)) = cot(θ/2) = cosec θ + cot θ',
    subject: 'Mathematics',
    topic: 'Trigonometry',
    subTopic: 'Trigonometric Identities',
    difficulty: 'medium',
    marks: 4,
    negativeMarks: 1,
    type: 'single',
    tags: ['jee', 'eamcet', 'trigonometry']
  },
  {
    id: 'm2',
    question: 'If sin θ + cos θ = 1/5, then find the value of sin 2θ.',
    options: ['24/25', '-24/25', '12/25', '-12/25'],
    correctAnswer: 1,
    explanation: 'Squaring both sides: (sin θ + cos θ)² = 1/25 → 1 + sin 2θ = 1/25 → sin 2θ = -24/25',
    subject: 'Mathematics',
    topic: 'Trigonometry',
    subTopic: 'Multiple Angles',
    difficulty: 'hard',
    marks: 4,
    negativeMarks: 1,
    type: 'single',
    tags: ['jee', 'trigonometry']
  },
  {
    id: 'm3',
    question: 'Find the derivative of f(x) = x³ - 3x² + 2x - 1 at x = 2.',
    options: ['2', '4', '6', '8'],
    correctAnswer: 0,
    explanation: 'f\'(x) = 3x² - 6x + 2. At x = 2: f\'(2) = 3(4) - 6(2) + 2 = 12 - 12 + 2 = 2',
    subject: 'Mathematics',
    topic: 'Calculus',
    subTopic: 'Differentiation',
    difficulty: 'easy',
    marks: 4,
    negativeMarks: 1,
    type: 'single',
    tags: ['jee', 'eamcet', 'calculus']
  },
  {
    id: 'm4',
    question: '∫(0 to π/2) sin²x dx = ?',
    options: ['π/4', 'π/2', 'π', '2π'],
    correctAnswer: 0,
    explanation: 'Using the formula ∫sin²x dx = (x/2) - (sin 2x)/4. Evaluating from 0 to π/2 gives π/4',
    subject: 'Mathematics',
    topic: 'Calculus',
    subTopic: 'Integration',
    difficulty: 'medium',
    marks: 4,
    negativeMarks: 1,
    type: 'single',
    tags: ['jee', 'eamcet', 'integration']
  },
  {
    id: 'm5',
    question: 'The sum of first n terms of an AP is 3n² + 5n. Find the common difference.',
    options: ['3', '5', '6', '8'],
    correctAnswer: 2,
    explanation: 'S₁ = a₁ = 8, S₂ = 22, so a₂ = 14. Common difference d = a₂ - a₁ = 6',
    subject: 'Mathematics',
    topic: 'Algebra',
    subTopic: 'Arithmetic Progression',
    difficulty: 'medium',
    marks: 4,
    negativeMarks: 1,
    type: 'single',
    tags: ['eamcet', 'jee', 'ap']
  },
  {
    id: 'm6',
    question: 'If |z - 2i| = |z + 2i|, then the locus of z is:',
    options: ['Real axis', 'Imaginary axis', 'Circle', 'Line y = x'],
    correctAnswer: 0,
    explanation: 'The condition implies z is equidistant from 2i and -2i, which is the real axis (x-axis)',
    subject: 'Mathematics',
    topic: 'Complex Numbers',
    subTopic: 'Locus',
    difficulty: 'medium',
    marks: 4,
    negativeMarks: 1,
    type: 'single',
    tags: ['jee', 'complex']
  },
  {
    id: 'm7',
    question: 'The probability of getting a sum of 7 when two dice are thrown is:',
    options: ['1/6', '1/9', '1/12', '5/36'],
    correctAnswer: 0,
    explanation: 'Favorable outcomes: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6. Total = 36. P = 6/36 = 1/6',
    subject: 'Mathematics',
    topic: 'Probability',
    subTopic: 'Basic Probability',
    difficulty: 'easy',
    marks: 4,
    negativeMarks: 1,
    type: 'single',
    tags: ['eamcet', 'jee', 'probability']
  },
  {
    id: 'm8',
    question: 'Find the equation of the line passing through (2, 3) and perpendicular to 3x + 4y = 7.',
    options: ['4x - 3y = -1', '4x - 3y = 1', '3x - 4y = -6', '3x + 4y = 18'],
    correctAnswer: 0,
    explanation: 'Slope of given line = -3/4. Perpendicular slope = 4/3. Equation: y - 3 = (4/3)(x - 2) → 4x - 3y = -1',
    subject: 'Mathematics',
    topic: 'Coordinate Geometry',
    subTopic: 'Straight Lines',
    difficulty: 'medium',
    marks: 4,
    negativeMarks: 1,
    type: 'single',
    tags: ['eamcet', 'coordinate']
  },
  
  // Physics - JEE/EAMCET Level
  {
    id: 'p1',
    question: 'A particle moves with velocity v = 3t² - 4t + 5 m/s. Find its acceleration at t = 2s.',
    options: ['4 m/s²', '8 m/s²', '12 m/s²', '16 m/s²'],
    correctAnswer: 1,
    explanation: 'a = dv/dt = 6t - 4. At t = 2: a = 6(2) - 4 = 8 m/s²',
    subject: 'Physics',
    topic: 'Mechanics',
    subTopic: 'Kinematics',
    difficulty: 'easy',
    marks: 4,
    negativeMarks: 1,
    type: 'single',
    tags: ['jee', 'eamcet', 'kinematics']
  },
  {
    id: 'p2',
    question: 'Two charges q₁ and q₂ are placed at a distance r. The force between them is F. If distance is doubled, the new force is:',
    options: ['F/2', 'F/4', '2F', '4F'],
    correctAnswer: 1,
    explanation: 'By Coulomb\'s law, F ∝ 1/r². If r becomes 2r, F becomes F/4',
    subject: 'Physics',
    topic: 'Electrostatics',
    subTopic: 'Coulomb Law',
    difficulty: 'easy',
    marks: 4,
    negativeMarks: 1,
    type: 'single',
    tags: ['jee', 'eamcet', 'electrostatics']
  },
  {
    id: 'p3',
    question: 'In a Young\'s double slit experiment, the fringe width is β. If the wavelength is doubled and slit separation is halved, the new fringe width is:',
    options: ['β/4', 'β/2', '2β', '4β'],
    correctAnswer: 3,
    explanation: 'Fringe width β = λD/d. New β\' = (2λ)D/(d/2) = 4λD/d = 4β',
    subject: 'Physics',
    topic: 'Optics',
    subTopic: 'Interference',
    difficulty: 'medium',
    marks: 4,
    negativeMarks: 1,
    type: 'single',
    tags: ['jee', 'optics']
  },
  {
    id: 'p4',
    question: 'The de Broglie wavelength of an electron accelerated through 100V is approximately:',
    options: ['0.12 nm', '0.12 Å', '1.2 nm', '12 nm'],
    correctAnswer: 0,
    explanation: 'λ = h/√(2meV) ≈ 1.227/√V nm = 1.227/10 = 0.1227 nm ≈ 0.12 nm',
    subject: 'Physics',
    topic: 'Modern Physics',
    subTopic: 'Quantum Mechanics',
    difficulty: 'hard',
    marks: 4,
    negativeMarks: 1,
    type: 'single',
    tags: ['jee', 'modern-physics']
  },
  {
    id: 'p5',
    question: 'A transformer has 100 turns in primary and 500 turns in secondary. If primary voltage is 220V, the secondary voltage is:',
    options: ['44V', '110V', '440V', '1100V'],
    correctAnswer: 3,
    explanation: 'V₂/V₁ = N₂/N₁ → V₂ = 220 × (500/100) = 1100V',
    subject: 'Physics',
    topic: 'Electromagnetism',
    subTopic: 'Transformers',
    difficulty: 'easy',
    marks: 4,
    negativeMarks: 1,
    type: 'single',
    tags: ['eamcet', 'jee', 'electromagnetism']
  },
  {
    id: 'p6',
    question: 'The time period of a simple pendulum on Earth is 2s. On a planet with g\' = g/4, the time period will be:',
    options: ['1s', '2s', '4s', '8s'],
    correctAnswer: 2,
    explanation: 'T ∝ 1/√g. If g becomes g/4, T becomes 2T = 4s',
    subject: 'Physics',
    topic: 'Oscillations',
    subTopic: 'Simple Pendulum',
    difficulty: 'medium',
    marks: 4,
    negativeMarks: 1,
    type: 'single',
    tags: ['jee', 'eamcet', 'shm']
  },
  
  // Chemistry - JEE/EAMCET Level
  {
    id: 'c1',
    question: 'The IUPAC name of CH₃-CH₂-CH(CH₃)-CH₂-CH₃ is:',
    options: ['2-methylpentane', '3-methylpentane', '2-ethylbutane', 'isohexane'],
    correctAnswer: 0,
    explanation: 'Longest chain has 5 carbons with methyl at position 2: 2-methylpentane',
    subject: 'Chemistry',
    topic: 'Organic Chemistry',
    subTopic: 'IUPAC Nomenclature',
    difficulty: 'easy',
    marks: 4,
    negativeMarks: 1,
    type: 'single',
    tags: ['jee', 'eamcet', 'organic']
  },
  {
    id: 'c2',
    question: 'The pH of 10⁻⁸ M HCl solution at 25°C is approximately:',
    options: ['6', '6.98', '7', '8'],
    correctAnswer: 1,
    explanation: 'Total [H⁺] = 10⁻⁸ + 10⁻⁷ = 1.1 × 10⁻⁷. pH = -log(1.1 × 10⁻⁷) ≈ 6.98',
    subject: 'Chemistry',
    topic: 'Physical Chemistry',
    subTopic: 'pH Calculations',
    difficulty: 'hard',
    marks: 4,
    negativeMarks: 1,
    type: 'single',
    tags: ['jee', 'physical']
  },
  {
    id: 'c3',
    question: 'The hybridization of carbon in ethene (C₂H₄) is:',
    options: ['sp', 'sp²', 'sp³', 'dsp²'],
    correctAnswer: 1,
    explanation: 'Each carbon forms 3 σ bonds (2 C-H and 1 C-C) and 1 π bond, so sp² hybridization',
    subject: 'Chemistry',
    topic: 'Organic Chemistry',
    subTopic: 'Hybridization',
    difficulty: 'easy',
    marks: 4,
    negativeMarks: 1,
    type: 'single',
    tags: ['jee', 'eamcet', 'hybridization']
  },
  {
    id: 'c4',
    question: 'Which of the following has the highest boiling point?',
    options: ['HF', 'HCl', 'HBr', 'HI'],
    correctAnswer: 0,
    explanation: 'HF has hydrogen bonding, which is stronger than dipole-dipole interactions in others',
    subject: 'Chemistry',
    topic: 'Physical Chemistry',
    subTopic: 'Intermolecular Forces',
    difficulty: 'medium',
    marks: 4,
    negativeMarks: 1,
    type: 'single',
    tags: ['jee', 'eamcet', 'bonding']
  },
  {
    id: 'c5',
    question: 'The oxidation state of Cr in K₂Cr₂O₇ is:',
    options: ['+3', '+4', '+6', '+7'],
    correctAnswer: 2,
    explanation: '2(+1) + 2x + 7(-2) = 0 → 2 + 2x - 14 = 0 → x = +6',
    subject: 'Chemistry',
    topic: 'Inorganic Chemistry',
    subTopic: 'Oxidation States',
    difficulty: 'easy',
    marks: 4,
    negativeMarks: 1,
    type: 'single',
    tags: ['jee', 'eamcet', 'inorganic']
  },
  {
    id: 'c6',
    question: 'The number of unpaired electrons in Fe²⁺ (Z=26) is:',
    options: ['2', '4', '6', '0'],
    correctAnswer: 1,
    explanation: 'Fe²⁺: [Ar] 3d⁶. According to Hund\'s rule, there are 4 unpaired electrons',
    subject: 'Chemistry',
    topic: 'Inorganic Chemistry',
    subTopic: 'Electronic Configuration',
    difficulty: 'medium',
    marks: 4,
    negativeMarks: 1,
    type: 'single',
    tags: ['jee', 'inorganic']
  },

  // SSC/Banking - General Awareness & Quant
  {
    id: 's1',
    question: 'Who is known as the "Father of Indian Constitution"?',
    options: ['Mahatma Gandhi', 'B.R. Ambedkar', 'Jawaharlal Nehru', 'Sardar Patel'],
    correctAnswer: 1,
    explanation: 'Dr. B.R. Ambedkar is known as the Father of Indian Constitution as he was the chairman of the drafting committee.',
    subject: 'General Awareness',
    topic: 'Indian Polity',
    subTopic: 'Constitution',
    difficulty: 'easy',
    marks: 2,
    negativeMarks: 0.5,
    type: 'single',
    tags: ['ssc', 'banking', 'polity']
  },
  {
    id: 's2',
    question: 'If A can complete a work in 10 days and B can complete the same work in 15 days, how many days will they take working together?',
    options: ['5 days', '6 days', '7.5 days', '8 days'],
    correctAnswer: 1,
    explanation: 'A\'s 1 day work = 1/10, B\'s 1 day work = 1/15. Together = 1/10 + 1/15 = 1/6. So 6 days.',
    subject: 'Quantitative Aptitude',
    topic: 'Time and Work',
    subTopic: 'Work Efficiency',
    difficulty: 'medium',
    marks: 2,
    negativeMarks: 0.5,
    type: 'single',
    tags: ['ssc', 'banking', 'quant']
  },
  {
    id: 's3',
    question: 'The ratio of ages of A and B is 3:5. After 10 years, the ratio becomes 5:7. Find the present age of A.',
    options: ['15 years', '20 years', '25 years', '30 years'],
    correctAnswer: 0,
    explanation: 'Let ages be 3x and 5x. (3x+10)/(5x+10) = 5/7 → 21x + 70 = 25x + 50 → x = 5. A\'s age = 15 years.',
    subject: 'Quantitative Aptitude',
    topic: 'Problems on Ages',
    subTopic: 'Ratio Based',
    difficulty: 'medium',
    marks: 2,
    negativeMarks: 0.5,
    type: 'single',
    tags: ['ssc', 'banking', 'ages']
  },
  {
    id: 's4',
    question: 'Which river is known as the "Sorrow of Bengal"?',
    options: ['Ganga', 'Brahmaputra', 'Damodar', 'Hooghly'],
    correctAnswer: 2,
    explanation: 'Damodar River is known as the "Sorrow of Bengal" due to its devastating floods.',
    subject: 'General Awareness',
    topic: 'Indian Geography',
    subTopic: 'Rivers',
    difficulty: 'medium',
    marks: 2,
    negativeMarks: 0.5,
    type: 'single',
    tags: ['ssc', 'geography']
  },
  {
    id: 's5',
    question: 'Find the compound interest on ₹8000 at 10% per annum for 2 years.',
    options: ['₹1520', '₹1600', '₹1680', '₹1760'],
    correctAnswer: 2,
    explanation: 'CI = P[(1 + r/100)ⁿ - 1] = 8000[(1.1)² - 1] = 8000 × 0.21 = ₹1680',
    subject: 'Quantitative Aptitude',
    topic: 'Compound Interest',
    subTopic: 'CI Calculations',
    difficulty: 'medium',
    marks: 2,
    negativeMarks: 0.5,
    type: 'single',
    tags: ['ssc', 'banking', 'ci']
  },
  {
    id: 's6',
    question: 'The passage of the Rowlatt Act in 1919 led to which movement?',
    options: ['Non-Cooperation Movement', 'Civil Disobedience Movement', 'Quit India Movement', 'Jallianwala Bagh Massacre'],
    correctAnswer: 3,
    explanation: 'The Rowlatt Act led to widespread protests, culminating in the Jallianwala Bagh Massacre on April 13, 1919.',
    subject: 'General Awareness',
    topic: 'Indian History',
    subTopic: 'Freedom Struggle',
    difficulty: 'medium',
    marks: 2,
    negativeMarks: 0.5,
    type: 'single',
    tags: ['ssc', 'history']
  },
  {
    id: 's7',
    question: 'A train 150m long crosses a pole in 15 seconds. Find its speed in km/h.',
    options: ['30 km/h', '36 km/h', '45 km/h', '54 km/h'],
    correctAnswer: 1,
    explanation: 'Speed = Distance/Time = 150/15 = 10 m/s = 10 × 18/5 = 36 km/h',
    subject: 'Quantitative Aptitude',
    topic: 'Time and Distance',
    subTopic: 'Trains',
    difficulty: 'easy',
    marks: 2,
    negativeMarks: 0.5,
    type: 'single',
    tags: ['ssc', 'banking', 'trains']
  },
  {
    id: 's8',
    question: 'Which is the largest gland in the human body?',
    options: ['Pancreas', 'Liver', 'Thyroid', 'Adrenal'],
    correctAnswer: 1,
    explanation: 'The liver is the largest gland in the human body, weighing about 1.5 kg.',
    subject: 'General Awareness',
    topic: 'Biology',
    subTopic: 'Human Body',
    difficulty: 'easy',
    marks: 2,
    negativeMarks: 0.5,
    type: 'single',
    tags: ['ssc', 'biology']
  },
  {
    id: 's9',
    question: 'If 20% of a = b, then b% of 20 is the same as:',
    options: ['4% of a', '5% of a', '20% of a', 'None of these'],
    correctAnswer: 0,
    explanation: 'b = 0.2a. b% of 20 = (0.2a/100) × 20 = 0.04a = 4% of a',
    subject: 'Quantitative Aptitude',
    topic: 'Percentage',
    subTopic: 'Percentage Calculations',
    difficulty: 'medium',
    marks: 2,
    negativeMarks: 0.5,
    type: 'single',
    tags: ['ssc', 'banking', 'percentage']
  },
  {
    id: 's10',
    question: 'The headquarters of the World Bank is located in:',
    options: ['Geneva', 'New York', 'Washington D.C.', 'London'],
    correctAnswer: 2,
    explanation: 'The World Bank headquarters is in Washington D.C., United States.',
    subject: 'General Awareness',
    topic: 'World Organizations',
    subTopic: 'Banking Institutions',
    difficulty: 'easy',
    marks: 2,
    negativeMarks: 0.5,
    type: 'single',
    tags: ['ssc', 'banking', 'world-bank']
  }
];

// Helper function to get questions by filters
export const getQuestionsByFilters = (filters: {
  subjects?: string[];
  topics?: string[];
  difficulties?: string[];
  testType?: string;
  count?: number;
}): Question[] => {
  let filtered = [...questionsData];
  
  if (filters.subjects?.length) {
    filtered = filtered.filter(q => filters.subjects!.includes(q.subject));
  }
  
  if (filters.topics?.length) {
    filtered = filtered.filter(q => filters.topics!.includes(q.topic));
  }
  
  if (filters.difficulties?.length) {
    filtered = filtered.filter(q => filters.difficulties!.includes(q.difficulty));
  }
  
  if (filters.testType) {
    filtered = filtered.filter(q => q.tags.includes(filters.testType!.toLowerCase()));
  }
  
  // Shuffle and limit
  filtered = filtered.sort(() => Math.random() - 0.5);
  
  if (filters.count && filters.count < filtered.length) {
    filtered = filtered.slice(0, filters.count);
  }
  
  return filtered;
};

export const getSubjects = (): string[] => {
  return [...new Set(questionsData.map(q => q.subject))];
};

export const getTopicsBySubject = (subject: string): string[] => {
  return [...new Set(questionsData.filter(q => q.subject === subject).map(q => q.topic))];
};
