# MockTest Pro - Complete Technical Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture & Tech Stack](#architecture--tech-stack)
3. [Role-Based Access Control (RBAC)](#role-based-access-control-rbac)
4. [Authentication System](#authentication-system)
5. [Student Dashboard](#student-dashboard)
6. [Test Interface](#test-interface)
7. [Test Results & Analytics](#test-results--analytics)
8. [Admin Dashboard](#admin-dashboard)
9. [Data Models](#data-models)
10. [Data Flow Diagrams](#data-flow-diagrams)
11. [API Endpoints (Mock)](#api-endpoints-mock)
12. [State Management](#state-management)

---

## System Overview

MockTest Pro is a comprehensive online mock test platform designed for competitive exam preparation. The platform supports multiple exam types (JEE, EAMCET, NEET, SSC, Banking, etc.) with role-based access for students and administrators.

### Key Features
- **Multi-exam support**: JEE, EAMCET, NEET, SSC, Banking, UPSC, GATE, Custom
- **Dynamic test generation**: Based on subject/topic distribution with percentage weightage
- **Real-time test interface**: Timer, navigation, marking for review
- **Detailed analytics**: Topic-wise performance, weak area identification
- **Admin management**: Test creation, question bank management, user tracking

---

## Architecture & Tech Stack

### Frontend Stack
```
Framework: React 18 + TypeScript
Build Tool: Vite 7.x
Styling: Tailwind CSS 3.4
UI Components: shadcn/ui (40+ pre-built components)
Icons: Lucide React
Charts: Recharts
State Management: React Context API + Hooks
```

### Project Structure
```
/src
├── /components/ui/        # shadcn/ui components
├── /data/                 # Mock data files
│   ├── questions.ts       # 30+ sample questions
│   ├── tests.ts           # 8 pre-configured tests
│   └── users.ts           # User accounts & attempts
├── /hooks/                # Custom React hooks
│   ├── useAuth.tsx        # Authentication context
│   └── useTest.tsx        # Test session management
├── /sections/             # Page sections
│   ├── Login.tsx          # Authentication page
│   ├── StudentDashboard.tsx
│   ├── TestInterface.tsx
│   ├── TestResults.tsx
│   └── AdminDashboard.tsx
├── /types/                # TypeScript interfaces
│   └── index.ts
└── App.tsx                # Main application component
```

---

## Role-Based Access Control (RBAC)

### User Roles

| Role | Permissions | Dashboard Access |
|------|-------------|------------------|
| `student` | Take tests, view results, track progress | Student Dashboard |
| `admin` | Create tests, manage questions, view analytics | Admin Dashboard |

### Role Determination Flow
```
Login → AuthProvider validates credentials → Checks user.role → Redirects to respective dashboard
```

### Protected Route Logic
```typescript
if (!isAuthenticated) → Show Login
if (user.role === 'admin') → Show AdminDashboard
if (user.role === 'student') → Show StudentDashboard
```

---

## Authentication System

### Login Page (`/src/sections/Login.tsx`)

#### UI Components
- **Hero Section** (Left side - desktop only)
  - Platform logo and tagline
  - Feature cards: 1000+ Questions, Detailed Analytics, Live Rankings, Exam Patterns
  
- **Login Form** (Right side)
  - Email input field
  - Password input field with show/hide toggle
  - Sign In button with loading state
  - Quick Demo Login buttons (Student/Admin)
  - Demo credentials hint

#### Form Fields
| Field | Type | Validation | Required |
|-------|------|------------|----------|
| Email | email | Valid email format | Yes |
| Password | password | Any (demo mode) | Yes |

#### Demo Accounts
```
Student: student@demo.com / any password
Admin: admin@demo.com / any password
```

#### Authentication Flow
```
1. User enters credentials
2. login(email, password) called from useAuth hook
3. Simulated API delay (800ms)
4. User lookup in usersData array
5. If found: setUser(foundUser) → Redirect to dashboard
6. If not found: Return error message
```

#### State Management
```typescript
interface AuthContextType {
  user: User | null;           // Current logged-in user
  isAuthenticated: boolean;    // Auth status
  isLoading: boolean;          // Login in progress
  login: (email, password) => Promise<{success, error}>;
  logout: () => void;
  hasRole: (role) => boolean;  // Check user role
}
```

---

## Student Dashboard

### Header Component
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] MockTest Pro                    [🔔] [Avatar] Logout │
└─────────────────────────────────────────────────────────────┘
```

**Elements:**
- Platform logo (BookOpen icon + gradient text)
- Notification bell with unread indicator
- User avatar with name and role
- Logout button

### Navigation Tabs
| Tab | Icon | Description |
|-----|------|-------------|
| Overview | BarChart3 | Performance summary and stats |
| Available Tests | BookOpen | Browse and start tests |
| Test History | RotateCcw | Past test attempts |
| Analytics | TrendingUp | Detailed performance analysis |

---

### 1. OVERVIEW TAB

#### Stats Cards (4-column grid)
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Tests        │ │ Average      │ │ Accuracy     │ │ Best Rank    │
│ Attempted    │ │ Score        │ │              │ │              │
│ ████████ 5   │ │ ████████ 71% │ │ ████████ 74% │ │ ████ #45     │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

**Data Source:** `userStatsData` from `/src/data/users.ts`

| Stat | Calculation | Display |
|------|-------------|---------|
| Tests Attempted | `stats.totalTestsAttempted` | Number |
| Average Score | `stats.averageScore` | Percentage |
| Accuracy | `stats.averageAccuracy` | Percentage |
| Best Rank | `min(attempts.map(a => a.rank))` | #Rank |

#### Performance Trend Chart
- **Type:** Line Chart (Recharts)
- **X-Axis:** Test names (abbreviated)
- **Y-Axis:** Percentage score
- **Data:** `stats.performanceTrend` array
- **Features:** Tooltip on hover, grid lines

#### Notifications Panel
```
┌─────────────────┐
│ Notifications   │
├─────────────────┤
│ [i] New Test    │
│ [✓] Completed   │
│ [!] Improvement │
│ [i] Weekly Report│
└─────────────────┘
```

**Notification Types:**
- `info` - Blue background
- `success` - Green background  
- `warning` - Yellow background
- `error` - Red background

**Data Source:** `notificationsData` filtered by userId

#### Weak Areas Alert (Conditional)
```
┌─────────────────────────────────────────┐
│ ⚠️ Areas Needing Improvement            │
│ Focus on: Electrostatics, Mechanics     │
│ [View detailed analysis →]              │
└─────────────────────────────────────────┘
```

**Condition:** Shows when `weakAreas.length > 0`
**Data:** Topics with `accuracy < 75%`

#### Recent Test Attempts
```
┌─────────────────────────────────────────────────────────────┐
│ [Status Icon] Test Name                    Score    [→]     │
│ Date • Correct/Total • Rank #X                              │
└─────────────────────────────────────────────────────────────┘
```

**Status Icons:**
- Green (≥70%): CheckCircle2
- Yellow (50-69%): TrendingUp
- Red (<50%): TrendingDown

**Actions:**
- Click row → View detailed results
- Chevron button → Navigate to results

---

### 2. AVAILABLE TESTS TAB

#### Filter Bar
```
Available Mock Tests                    [All] [JEE] [EAMCET] [NEET] [SSC] [BANKING]
```

#### Test Cards Grid
```
┌─────────────────────────────────────┐
│ [JEE Badge]              ⏱ 180 min │
│ JEE Main Full Mock Test - 1         │
│ Complete JEE Main pattern...        │
│ 📄 90 Qs  🎯 360 Marks              │
│ ─────────────────────────────────── │
│ Physics: 30 Qs                      │
│ Chemistry: 30 Qs                    │
│ Mathematics: 30 Qs                  │
│ ─────────────────────────────────── │
│ [-Ve Marking]        [▶ Start Test] │
└─────────────────────────────────────┘
```

**Test Card Elements:**
| Element | Source | Display |
|---------|--------|---------|
| Badge | `test.type` | Color-coded by exam type |
| Duration | `test.duration` | Minutes with Clock icon |
| Name | `test.name` | Bold title |
| Description | `test.description` | Truncated text |
| Questions | `test.totalQuestions` | With BookOpen icon |
| Marks | `test.totalMarks` | With Target icon |
| Sections | `test.sections` | List with question counts |
| Marking | `test.negativeMarking` | Badge (green/red) |
| Action | onClick | Start Test button |

**Exam Type Colors:**
```typescript
const colors = {
  'JEE': 'bg-blue-100 text-blue-700',
  'EAMCET': 'bg-green-100 text-green-700',
  'NEET': 'bg-purple-100 text-purple-700',
  'SSC': 'bg-orange-100 text-orange-700',
  'BANKING': 'bg-pink-100 text-pink-700',
  'UPSC': 'bg-red-100 text-red-700',
  'GATE': 'bg-cyan-100 text-cyan-700',
  'CUSTOM': 'bg-gray-100 text-gray-700'
};
```

---

### 3. TEST HISTORY TAB

#### Attempt List
```
┌─────────────────────────────────────────────────────────────┐
│ [Score%] Test Name                         [View Details]   │
│ Date • X/Y correct • Rank #X of Y participants              │
└─────────────────────────────────────────────────────────────┘
```

**Columns:**
1. Score badge (color-coded)
2. Test name
3. Date, correct/total, rank
4. View Details button

**Sorting:** Chronological (newest first)

---

### 4. ANALYTICS TAB

#### Subject-wise Performance (Radar Chart)
```
         Mathematics
              ▲
             /|\
            / | \
    Physics ◄──●──► Chemistry
            \ | /
             \|/
              ▼
           Others
```

**Data:** Aggregated from `topicWisePerformance` by subject
**Metrics:** Accuracy percentage per subject

#### Answer Distribution (Pie Chart)
```
     ┌─────────┐
    /   65%    \
   /  Correct   \
  │      ▓▓▓    │
  │  ▓▓▓▓▓▓▓   │
   \   20% Wrong/
    \  15% Unatt/
     └─────────┘
```

**Data Points:**
- Correct: Sum of all `correctAnswers`
- Wrong: Sum of all `wrongAnswers`
- Unattempted: Sum of all `unattempted`

#### Topic-wise Analysis Table
```
Topic Name [Subject] [Weak Area Badge]
Correct/Total • Wrong • Unattempted • Avg Time: Xs
[████████░░] 85%
```

**Progress Bar Colors:**
- Green (≥80%): `bg-green-500`
- Yellow (60-79%): `bg-yellow-500`
- Red (<60%): `bg-red-500`

#### Improvement Suggestions

**Weak Areas Section:**
```
┌─────────────────────────────────────────┐
│ ⚠️ Focus Areas (Accuracy < 75%)         │
├─────────────────────────────────────────┤
│ Electrostatics [70%]                    │
│ Practice more questions...              │
│ 📚 Recommended: Solve 20+ questions     │
└─────────────────────────────────────────┘
```

**Strong Areas Section:**
```
┌─────────────────────────────────────────┐
│ ⭐ Strong Areas (Keep it up!)           │
├─────────────────────────────────────────┤
│ Trigonometry [85%]                      │
│ Great performance!                      │
│ ⭐ Keep practicing to maintain          │
└─────────────────────────────────────────┘
```

---

## Test Interface

### Layout Structure
```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo] Test Name - Section                    ⏱ 02:59:59 [Exit]│
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────┐  ┌─────────────────┐  │
│  │                                     │  │ Sections        │  │
│  │  Q1/90 [Subject] [Difficulty]       │  │ ┌─────────────┐ │  │
│  │  [Marked for Review]                │  │ │ Physics  ●  │ │  │
│  │                                     │  │ │ Chemistry   │ │  │
│  │  Question text goes here...         │  │ │ Mathematics │ │  │
│  │                                     │  │ └─────────────┘ │  │
│  │  ○ A) Option 1                      │  │ ─────────────── │  │
│  │  ● B) Option 2 (selected)           │  │ Legend          │  │
│  │  ○ C) Option 3                      │  │ ■ Not Visited   │  │
│  │  ○ D) Option 4                      │  │ ■ Unanswered    │  │
│  │                                     │  │ ■ Answered      │  │
│  │                                     │  │ ■ Marked        │  │
│  │                                     │  │ ─────────────── │  │
│  │                                     │  │ Question Palette│  │
│  │                                     │  │ 1  2  3  4  5   │  │
│  │                                     │  │ 6  7  8  9  10  │  │
│  │                                     │  │ ...             │  │
│  │                                     │  │ ─────────────── │  │
│  │                                     │  │ Summary         │  │
│  │                                     │  │ Answered: 45    │  │
│  │                                     │  │ Unanswered: 20  │  │
│  │                                     │  │ Marked: 5       │  │
│  │                                     │  │ Not Visited: 20 │  │
│  └─────────────────────────────────────┘  └─────────────────┘  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  [← Previous]        Question 1 of 90        [Next →]          │
└─────────────────────────────────────────────────────────────────┘
```

### Header Elements
| Element | Description |
|---------|-------------|
| Logo | Platform branding |
| Test Name | Current test name |
| Section | Current section name |
| Timer | Countdown with color alert (<5min = red + pulse) |
| Fullscreen | Toggle fullscreen mode |
| Exit | Exit test (with confirmation) |

### Timer Behavior
```typescript
// Normal state
if (timeRemaining > 300) → Blue background

// Warning state  
if (timeRemaining <= 300) → Red background + pulse animation

// Auto-submit
if (timeRemaining === 0) → Auto-submit test
```

### Question Card

**Question Header:**
```
[Q1/90 Badge] [Subject Badge] [Difficulty Badge] [Marked Badge?]
Marks: +4 -1
```

**Difficulty Colors:**
- Easy: `text-green-600 border-green-200`
- Medium: `text-yellow-600 border-yellow-200`
- Hard: `text-red-600 border-red-200`

**Options:**
- Radio button style (A, B, C, D)
- Selected: Blue background + white text
- Unselected: Gray background
- Click to select

### Action Buttons
| Button | Action |
|--------|--------|
| Clear Selection | Reset selected answer to null |
| Mark for Review | Toggle review flag |
| Submit Test | Open submit confirmation dialog |

### Right Sidebar

#### Section Selector
```
Sections
┌─────────────────┐
│ Physics      30 │  ← Active (blue border)
│ Chemistry    30 │
│ Mathematics  30 │
└─────────────────┘
```

#### Legend
```
Legend
■ Gray  = Not Visited
■ Red   = Unanswered
■ Green = Answered
■ Purple= Marked for Review
```

#### Question Palette
```
1   2   3   4   5
6   7   8   9   10
11  12  13  14  15
...
```

**Button Colors:**
- Gray: Not visited
- Red border: Unanswered
- Green: Answered
- Purple: Marked for review
- Blue ring: Current question

#### Summary Panel
```
Summary
Answered:       45
Unanswered:     20
Marked:          5
Not Visited:    20
```

### Navigation Footer
```
[← Previous]    Question X of Y    [Next →]
```

### Dialogs

#### Submit Confirmation Dialog
```
┌─────────────────────────────────┐
│ ⚠️ Submit Test?                 │
│ Are you sure?                   │
├─────────────────────────────────┤
│ Total Questions:    90          │
│ Answered:           45          │
│ Unanswered:         45          │
│ Marked for Review:   5          │
├─────────────────────────────────┤
│ [Continue Test]  [Submit Test]  │
└─────────────────────────────────┘
```

#### Exit Confirmation Dialog
```
┌─────────────────────────────────┐
│ Exit Test?                      │
│ Progress will be lost!          │
├─────────────────────────────────┤
│ [Continue Test]  [Exit Test]    │
└─────────────────────────────────┘
```

---

## Test Results & Analytics

### Score Overview Card
```
┌─────────────────────────────────────────────────────────────────┐
│  ┌────┐  Test Name                          [PASSED/NEEDS WORK] │
│  │ 75%│  JEE • Date                          ┌──────────────┐   │
│  │    │                                     │   PASSED     │   │
│  └────┘  Rank: #45 of 2500                  │   ✓          │   │
│          Time: 2h 45m                       └──────────────┘   │
│          Score: 270/360                                        │
└─────────────────────────────────────────────────────────────────┘
```

### Stats Cards
| Stat | Icon | Color |
|------|------|-------|
| Correct Answers | CheckCircle2 | Green |
| Wrong Answers | XCircle | Red |
| Unattempted | HelpCircle | Gray |
| Accuracy | Target | Blue |

### Charts

#### Section-wise Performance (Bar Chart)
- X-Axis: Section names
- Y-Axis: Score
- Bars: Your Score (blue) vs Max Score (gray)

#### Answer Distribution (Pie Chart)
- Inner radius: 60px
- Outer radius: 90px
- Labels: Name + Value

### Topic-wise Analysis
Each topic shows:
- Topic name + Subject badge
- Weak Area / Strong badge (if applicable)
- Accuracy percentage (color-coded)
- Breakdown: Correct/Total • Wrong • Unattempted • Avg Time
- Progress bar

### Improvement Suggestions

**Weak Areas:**
- Red border card
- Topic name + accuracy
- Recommendation text
- Action icon

**Strong Areas:**
- Green border card
- Topic name + accuracy
- Encouragement text
- Star icon

---

## Admin Dashboard

### Header
```
┌─────────────────────────────────────────────────────────────┐
│ [⚙️] Admin Dashboard          [Avatar] Name • admin  Logout │
└─────────────────────────────────────────────────────────────┘
```

### Navigation Tabs
| Tab | Description |
|-----|-------------|
| Overview | Platform statistics and charts |
| Tests | Test management (CRUD) |
| Users | User management and tracking |
| Questions | Question bank management |
| Settings | Platform configuration |

---

### 1. OVERVIEW TAB

#### Stats Cards
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Total Users  │ │ Total Tests  │ │ Total        │ │ Active Tests │
│ ████████ 3   │ │ ████████ 8   │ │ ████████ 5   │ │ ████████ 8   │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

**Calculations:**
- Total Users: `usersData.filter(u => u.role === 'student').length`
- Total Tests: `testsData.length`
- Total Attempts: Sum of all user attempts
- Active Tests: `testsData.filter(t => t.isActive).length`

#### Charts
- User Growth (Line Chart)
- Subject Distribution (Pie Chart)
- Test Performance (Bar Chart)

---

### 2. TESTS TAB

#### Search & Create Bar
```
[Search tests...]                    [+ Create Test]
```

#### Test List Cards
```
┌─────────────────────────────────────────────────────────────┐
│ Test Name [JEE] [Active]                    [✏️] [👁] [🗑]  │
│ Description text...                                         │
│ ⏱ 180 min  📄 90 Qs  🎯 360 marks  ✓ No negative marking   │
└─────────────────────────────────────────────────────────────┘
```

**Actions:**
- Edit (pencil icon)
- View (eye icon)
- Delete (trash icon, red)

---

### 3. USERS TAB

#### User Table
```
┌──────────┬─────────────┬──────────┬──────────┬────────┬─────────┐
│ User     │ Email       │ Tests    │ Avg      │ Status │ Actions │
├──────────┼─────────────┼──────────┼──────────┼────────┼─────────┤
│ [Avatar] │ user@email  │ 5        │ 71.3%    │ Active │ [View]  │
│ Name     │             │          │          │        │         │
└──────────┴─────────────┴──────────┴──────────┴────────┴─────────┘
```

**Columns:**
1. User (avatar + name)
2. Email
3. Tests Attempted
4. Average Score
5. Status badge
6. View button

---

### 4. QUESTIONS TAB

#### Search & Add Bar
```
[Search questions...]                [+ Add Question]
```

#### Question Cards
```
┌─────────────────────────────────────────────────────────────┐
│ Q1 [Mathematics] [Trigonometry] [medium]      [✏️] [🗑]      │
│ Question text goes here...                                  │
│ Marks: +4  Negative: -1  Type: single                       │
└─────────────────────────────────────────────────────────────┘
```

---

### 5. SETTINGS TAB

#### Configuration Options
```
┌─────────────────────────────────────────────────────────────┐
│ Test Configuration Settings                                 │
├─────────────────────────────────────────────────────────────┤
│ Randomize Questions                              [Toggle ✓] │
│ Shuffle questions for each attempt                          │
│ ─────────────────────────────────────────────────────────── │
│ Randomize Options                                [Toggle ✓] │
│ Shuffle answer options for each attempt                     │
│ ─────────────────────────────────────────────────────────── │
│ Show Results Immediately                         [Toggle  ] │
│ Display results right after test submission                 │
│ ─────────────────────────────────────────────────────────── │
│ Allow Review                                     [Toggle ✓] │
│ Let students review answers after test                      │
│ ─────────────────────────────────────────────────────────── │
│ Maximum Attempts                                 [▼ 3]      │
│ Limit number of attempts per test                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Create Test Dialog (Enhanced)

### Form Structure
```
┌─────────────────────────────────────────────────────────────┐
│ Create New Test                                             │
│ Configure subject/topic distribution with percentage        │
├─────────────────────────────────────────────────────────────┤
│ Basic Information                                           │
│ Test Name *        [________________]                       │
│ Test Type *        [▼ JEE]                                  │
│                                                            │
│ Duration (min) *   [180]     Total Qs *  [90]   Marks *[360]│
│                                                            │
│ Enable Negative Marking                          [Toggle ✓] │
│                                                            │
│ Instructions       [________________]                       │
│                    [________________]                       │
│                    [________________]                       │
├─────────────────────────────────────────────────────────────┤
│ Subject/Topic Distribution *              Total: 100% ✓     │
│ Define percentage weightage for each subject and topic      │
├─────────────────────────────────────────────────────────────┤
│ [▼ Mathematics] [▼ Trigonometry] [25%] [▼ medium] [-]       │
│ [▼ Physics]     [▼ Mechanics]    [25%] [▼ medium] [-]       │
│ [▼ Chemistry]   [▼ Organic]      [25%] [▼ medium] [-]       │
│ [▼ Physics]     [▼ Electrostatics][25%][▼ medium] [-]       │
├─────────────────────────────────────────────────────────────┤
│ [+ Add Subject/Topic]                                       │
├─────────────────────────────────────────────────────────────┤
│                              [Cancel]  [💾 Create Test]     │
└─────────────────────────────────────────────────────────────┘
```

### Form Fields

#### Basic Information
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Test Name | text | Yes | Non-empty |
| Test Type | select | Yes | From enum |
| Duration | number | Yes | > 0 |
| Total Questions | number | Yes | > 0 |
| Total Marks | number | Yes | > 0 |
| Negative Marking | toggle | No | boolean |
| Instructions | textarea | No | Any text |

#### Subject Distribution
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Subject | select | Yes | From subjects array |
| Topic | select | Yes | From topics by subject |
| Percentage | number | Yes | 1-100, sum=100 |
| Difficulty | select | Yes | easy/medium/hard |

**Validation Rules:**
1. All basic fields required
2. At least one subject distribution
3. Total percentage must equal 100%
4. All distributions must have subject, topic, percentage > 0

---

## Add Question Dialog

### Form Structure
```
┌─────────────────────────────────────────────────────────────┐
│ Add New Question                                            │
│ Enter all required details for the question bank            │
├─────────────────────────────────────────────────────────────┤
│ Question *                                                  │
│ [________________________________________________]          │
│ [________________________________________________]          │
│                                                            │
│ Options *                                                   │
│ A) [________________________________________________]       │
│ B) [________________________________________________]       │
│ C) [________________________________________________]       │
│ D) [________________________________________________]       │
│                                                            │
│ Correct Answer *       [▼ Option A]                         │
│                                                            │
│ Explanation                                                   │
│ [________________________________________________]          │
│ [________________________________________________]          │
├─────────────────────────────────────────────────────────────┤
│ Subject *              [▼ Mathematics]                      │
│ Topic *                [▼ Trigonometry]                     │
│                                                            │
│ Difficulty *           [▼ medium]                           │
│ Question Type *        [▼ Single Correct]                   │
│                                                            │
│ Marks (Correct)        [4]                                  │
│ Negative Marks (Wrong) [1]                                  │
│                                                            │
│ Tags (comma separated) [jee, physics, mechanics]            │
├─────────────────────────────────────────────────────────────┤
│                              [Cancel]  [💾 Save Question]   │
└─────────────────────────────────────────────────────────────┘
```

### Form Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Question | textarea | Yes | Question text |
| Options | text[4] | Yes | 4 answer choices |
| Correct Answer | select | Yes | Index of correct option |
| Explanation | textarea | No | Answer explanation |
| Subject | select | Yes | From subjects array |
| Topic | select | Yes | From topics by subject |
| Difficulty | select | Yes | easy/medium/hard |
| Question Type | select | Yes | single/multiple/integer |
| Marks | number | Yes | Points for correct answer |
| Negative Marks | number | Yes | Penalty for wrong answer |
| Tags | text | No | Comma-separated tags |

**Validation Rules:**
1. Question text required
2. All 4 options required
3. Subject and topic required
4. Correct answer must be selected

---

## Data Models

### User
```typescript
interface User {
  id: string;           // Unique identifier
  name: string;         // Display name
  email: string;        // Login email
  role: UserRole;       // 'student' | 'admin'
  avatar?: string;      // Profile image URL
  createdAt: string;    // ISO date string
}
```

### Question
```typescript
interface Question {
  id: string;                    // Unique identifier
  question: string;              // Question text
  options: string[];             // Answer choices
  correctAnswer: number | number[]; // Correct option index(es)
  explanation: string;           // Answer explanation
  subject: string;               // Subject category
  topic: string;                 // Topic within subject
  subTopic?: string;             // Optional sub-topic
  difficulty: DifficultyLevel;   // 'easy' | 'medium' | 'hard'
  marks: number;                 // Points for correct
  negativeMarks: number;         // Penalty for wrong
  type: QuestionType;            // 'single' | 'multiple' | 'integer'
  image?: string;                // Optional image URL
  tags: string[];                // Search/filter tags
}
```

### Test
```typescript
interface Test {
  id: string;              // Unique identifier
  name: string;            // Test name
  type: TestType;          // Exam type enum
  description: string;     // Test description
  duration: number;        // Minutes
  totalMarks: number;      // Maximum score
  totalQuestions: number;  // Question count
  sections: TestSection[]; // Section breakdown
  instructions: string[];  // Test instructions
  negativeMarking: boolean;// Enable negative marking
  passingPercentage: number; // Pass threshold
  createdAt: string;       // ISO date
  isActive: boolean;       // Published status
}

interface TestSection {
  id: string;           // Section identifier
  name: string;         // Section name
  subject: string;      // Subject
  questionCount: number;// Questions in section
  marks: number;        // Section marks
  timeLimit: number;    // Optional time limit
}
```

### Test Attempt
```typescript
interface TestAttempt {
  id: string;              // Unique identifier
  userId: string;          // Student ID
  testId: string;          // Test ID
  testName: string;        // Denormalized name
  testType: TestType;      // Denormalized type
  startTime: string;       // ISO start timestamp
  endTime?: string;        // ISO end timestamp
  status: TestStatus;      // 'not_started' | 'in_progress' | 'completed' | 'abandoned'
  responses: UserResponse[]; // Answer data
  totalScore: number;      // Achieved score
  maxScore: number;        // Maximum possible
  correctAnswers: number;  // Count correct
  wrongAnswers: number;    // Count wrong
  unattempted: number;     // Count skipped
  timeTaken: number;       // Seconds spent
  percentage: number;      // Score percentage
  rank?: number;           // Overall rank
  totalParticipants?: number; // For rank context
  sectionScores: SectionScore[]; // Per-section breakdown
  topicAnalysis: TopicAnalysis[]; // Detailed topic stats
}

interface UserResponse {
  questionId: string;      // Question reference
  selectedAnswer: number | number[] | null; // Answer(s)
  timeSpent: number;       // Seconds on question
  isMarkedForReview: boolean; // Flag for review
  isVisited: boolean;      // Has been viewed
}

interface TopicAnalysis {
  topic: string;           // Topic name
  subject: string;         // Subject name
  totalQuestions: number;  // Questions from topic
  correct: number;         // Correct count
  wrong: number;           // Wrong count
  unattempted: number;     // Skipped count
  accuracy: number;        // Percentage correct
  averageTime: number;     // Avg seconds per question
  weakArea: boolean;       // Accuracy < 75%
}
```

### User Stats
```typescript
interface UserStats {
  userId: string;                    // User reference
  totalTestsAttempted: number;       // All attempts
  totalTestsCompleted: number;       // Finished tests
  averageScore: number;              // Mean percentage
  highestScore: number;              // Best percentage
  lowestScore: number;               // Worst percentage
  averageAccuracy: number;           // Mean accuracy
  totalTimeSpent: number;            // Minutes total
  strongestSubject: string;          // Best performing
  weakestSubject: string;            // Needs improvement
  improvementRate: number;           // % improvement over time
  topicWisePerformance: TopicAnalysis[]; // All topic data
  recentTests: TestAttempt[];        // Last 5 attempts
  performanceTrend: PerformanceTrend[]; // Historical scores
}
```

---

## Data Flow Diagrams

### 1. User Authentication Flow
```
┌─────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Login  │────▶│  useAuth    │────▶│  usersData  │────▶│   Dashboard │
│  Page   │     │  login()    │     │   Lookup    │     │  (Student/  │
│         │     │             │     │             │     │   Admin)    │
└─────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                      │
                      ▼
               ┌─────────────┐
               │  Set user   │
               │  in context │
               └─────────────┘
```

### 2. Test Start Flow
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Student   │────▶│  useTest    │────▶│  getTestById│────▶│  Generate   │
│ Clicks Start│     │ startTest() │     │             │     │  Questions  │
│             │     │             │     │             │     │  (filtered) │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                    │
                                                                    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Render    │◀────│  Initialize │◀────│  Shuffle    │◀────│  Initialize │
│   Test UI   │     │  Responses  │     │  (optional) │     │  Responses  │
│             │     │             │     │             │     │  Array      │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

### 3. Answer Submission Flow
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Student   │────▶│ saveResponse│────▶│  Update     │
│   Selects   │     │   (hook)    │     │  responses  │
│   Option    │     │             │     │  array      │
└─────────────┘     └─────────────┘     └─────────────┘
                                                │
                                                ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   UI Update │◀────│  setState   │◀────│  Mark as    │
│   (selected)│     │             │     │  visited    │
└─────────────┘     └─────────────┘     └─────────────┘
```

### 4. Test Submission Flow
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Student   │────▶│ submitTest()│────▶│  Calculate  │
│   Clicks    │     │             │     │   Scores    │
│   Submit    │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
                                                │
                        ┌───────────────────────┼───────────────────────┐
                        ▼                       ▼                       ▼
                ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
                │  Calculate  │         │  Generate   │         │  Calculate  │
                │  Section    │         │  Topic      │         │  Percentage │
                │  Scores     │         │  Analysis   │         │             │
                └─────────────┘         └─────────────┘         └─────────────┘
                        │                       │                       │
                        └───────────────────────┼───────────────────────┘
                                                ▼
                                        ┌─────────────┐
                                        │  Create     │
                                        │  TestAttempt│
                                        │  Object     │
                                        └─────────────┘
                                                │
                                                ▼
                                        ┌─────────────┐
                                        │  Add to     │
                                        │  testHistory│
                                        │  & Redirect │
                                        │  to Results │
                                        └─────────────┘
```

### 5. Admin Create Test Flow
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Admin     │────▶│  Open       │────▶│  Fill Form  │
│   Clicks    │     │  Dialog     │     │  (Basic +   │
│ Create Test │     │             │     │  Subject    │
│             │     │             │     │  Dist)      │
└─────────────┘     └─────────────┘     └─────────────┘
                                                │
                                                ▼
                                        ┌─────────────┐
                                        │  Validate   │
                                        │  (Total=100%)│
                                        └─────────────┘
                                                │
                        ┌───────────────────────┴───────────────────────┐
                        │ Valid                                          │ Invalid
                        ▼                                               ▼
                ┌─────────────┐                                 ┌─────────────┐
                │  Click      │                                 │  Show       │
                │  Create     │                                 │  Error      │
                └─────────────┘                                 └─────────────┘
                        │
                        ▼
                ┌─────────────┐
                │  Console.log│  ← In real app: API call
                │  (mock save)│
                └─────────────┘
                        │
                        ▼
                ┌─────────────┐
                │  Reset Form │
                │  & Close    │
                └─────────────┘
```

---

## API Endpoints (Mock)

### Authentication
```
POST /api/auth/login
Request: { email: string, password: string }
Response: { user: User, token: string }

POST /api/auth/logout
Request: {}
Response: { success: boolean }

GET /api/auth/me
Request: { token: string }
Response: { user: User }
```

### Tests
```
GET /api/tests
Response: { tests: Test[] }

GET /api/tests/:id
Response: { test: Test }

POST /api/tests
Request: { 
  name, type, duration, totalQuestions, totalMarks,
  negativeMarking, instructions, subjectDistribution[]
}
Response: { test: Test }

PUT /api/tests/:id
Request: { ...test fields }
Response: { test: Test }

DELETE /api/tests/:id
Response: { success: boolean }
```

### Questions
```
GET /api/questions
Query: { subject?, topic?, difficulty?, page?, limit? }
Response: { questions: Question[], total: number }

POST /api/questions
Request: {
  question, options[], correctAnswer, explanation,
  subject, topic, difficulty, marks, negativeMarks,
  type, tags[]
}
Response: { question: Question }

PUT /api/questions/:id
Request: { ...question fields }
Response: { question: Question }

DELETE /api/questions/:id
Response: { success: boolean }
```

### Test Attempts
```
POST /api/attempts/start
Request: { testId: string }
Response: { attemptId: string, questions: Question[] }

POST /api/attempts/:id/save-response
Request: { questionId, selectedAnswer, timeSpent }
Response: { success: boolean }

POST /api/attempts/:id/submit
Request: {}
Response: { attempt: TestAttempt }

GET /api/attempts/user/:userId
Response: { attempts: TestAttempt[] }

GET /api/attempts/:id
Response: { attempt: TestAttempt }
```

### Analytics
```
GET /api/analytics/user/:userId
Response: { stats: UserStats }

GET /api/analytics/leaderboard/:testId
Response: { rankings: { userId, name, score, rank }[] }
```

---

## State Management

### AuthContext State
```typescript
{
  user: User | null,
  isAuthenticated: boolean,
  isLoading: boolean
}
```

### TestContext State
```typescript
{
  activeTest: {
    test: Test,
    questions: Question[],
    responses: UserResponse[],
    currentQuestionIndex: number,
    currentSectionIndex: number,
    startTime: number,
    timeRemaining: number
  } | null,
  testHistory: TestAttempt[]
}
```

### Local Component State Examples

**StudentDashboard:**
```typescript
{
  activeTab: 'overview' | 'tests' | 'history' | 'analytics',
  searchQuery: string
}
```

**AdminDashboard (Create Test):**
```typescript
{
  testName: string,
  testType: TestType,
  testDuration: string,
  testTotalQuestions: string,
  testTotalMarks: string,
  testNegativeMarking: boolean,
  testInstructions: string,
  subjectDistributions: SubjectDistribution[]
}
```

**AdminDashboard (Add Question):**
```typescript
{
  questionText: string,
  questionOptions: string[4],
  correctAnswer: string,
  questionExplanation: string,
  questionSubject: string,
  questionTopic: string,
  questionDifficulty: DifficultyLevel,
  questionMarks: string,
  questionNegativeMarks: string,
  questionType: QuestionType,
  questionTags: string
}
```

---

## File Structure Summary

```
/mnt/okcomputer/output/app/
├── src/
│   ├── components/ui/          # 40+ shadcn components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── switch.tsx
│   │   ├── tabs.tsx
│   │   └── ... (30+ more)
│   ├── data/
│   │   ├── questions.ts        # 30 sample questions
│   │   ├── tests.ts            # 8 pre-configured tests
│   │   └── users.ts            # User data + attempts
│   ├── hooks/
│   │   ├── useAuth.tsx         # Auth context + provider
│   │   └── useTest.tsx         # Test session management
│   ├── sections/
│   │   ├── Login.tsx           # Authentication page
│   │   ├── StudentDashboard.tsx # Student home (4 tabs)
│   │   ├── TestInterface.tsx   # Active test UI
│   │   ├── TestResults.tsx     # Results + analytics
│   │   └── AdminDashboard.tsx  # Admin home (5 tabs)
│   ├── types/
│   │   └── index.ts            # All TypeScript interfaces
│   ├── lib/
│   │   └── utils.ts            # Utility functions (cn)
│   ├── App.tsx                 # Main app + routing logic
│   ├── App.css                 # App-specific styles
│   ├── index.css               # Global styles
│   └── main.tsx                # Entry point
├── index.html                  # HTML template
├── package.json                # Dependencies
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript config
└── vite.config.ts              # Vite configuration
```

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| Total Components | 40+ (shadcn) + 5 (custom sections) |
| Sample Questions | 30 |
| Pre-configured Tests | 8 |
| User Accounts | 4 (3 students + 1 admin) |
| Test Attempts (sample) | 5 |
| TypeScript Interfaces | 15+ |
| Custom Hooks | 2 |
| Chart Types | 3 (Line, Bar, Pie) |

---

## Deployment

**Live URL:** https://6i5wskf7ki2xe.ok.kimi.link

**Build Output:** `/mnt/okcomputer/output/app/dist/`

**Tech Stack:**
- Frontend: React 18 + TypeScript + Vite
- Styling: Tailwind CSS + shadcn/ui
- Charts: Recharts
- Icons: Lucide React

---

*Documentation generated for MockTest Pro - Comprehensive Online Mock Test Platform*
