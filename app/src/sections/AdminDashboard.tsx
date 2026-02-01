import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { usersData, getUserAttempts } from '@/data/users';
import { testsData } from '@/data/tests';
import { questionsData, getSubjects, getTopicsBySubject } from '@/data/questions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye,
  LogOut,
  TrendingUp,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  Minus,
  Save
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import type { TestType, DifficultyLevel, QuestionType } from '@/types';

interface SubjectDistribution {
  subject: string;
  topic: string;
  percentage: number;
  difficulty: DifficultyLevel;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateTestDialog, setShowCreateTestDialog] = useState(false);
  const [showAddQuestionDialog, setShowAddQuestionDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Create Test Form State
  const [testName, setTestName] = useState('');
  const [testType, setTestType] = useState<TestType>('JEE');
  const [testDuration, setTestDuration] = useState('180');
  const [testTotalQuestions, setTestTotalQuestions] = useState('90');
  const [testTotalMarks, setTestTotalMarks] = useState('360');
  const [testNegativeMarking, setTestNegativeMarking] = useState(true);
  const [testInstructions, setTestInstructions] = useState('');
  const [subjectDistributions, setSubjectDistributions] = useState<SubjectDistribution[]>([
    { subject: '', topic: '', percentage: 0, difficulty: 'medium' }
  ]);

  // Add Question Form State
  const [questionText, setQuestionText] = useState('');
  const [questionOptions, setQuestionOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('0');
  const [questionExplanation, setQuestionExplanation] = useState('');
  const [questionSubject, setQuestionSubject] = useState('');
  const [questionTopic, setQuestionTopic] = useState('');
  const [questionDifficulty, setQuestionDifficulty] = useState<DifficultyLevel>('medium');
  const [questionMarks, setQuestionMarks] = useState('4');
  const [questionNegativeMarks, setQuestionNegativeMarks] = useState('1');
  const [questionType, setQuestionType] = useState<QuestionType>('single');
  const [questionTags, setQuestionTags] = useState('');

  // Calculate admin stats
  const totalUsers = usersData.filter(u => u.role === 'student').length;
  const totalTests = testsData.length;
  const totalAttempts = usersData.reduce((sum, u) => sum + getUserAttempts(u.id).length, 0);
  const activeTests = testsData.filter(t => t.isActive).length;

  const subjects = getSubjects();
  const availableTopics = questionSubject ? getTopicsBySubject(questionSubject) : [];

  const userGrowthData = [
    { month: 'Jan', users: 120 },
    { month: 'Feb', users: 180 },
    { month: 'Mar', users: 250 },
    { month: 'Apr', users: 320 },
    { month: 'May', users: 450 },
    { month: 'Jun', users: 580 }
  ];

  const testPerformanceData = testsData.map(test => ({
    name: test.name.split(' ').slice(0, 2).join(' '),
    attempts: Math.floor(Math.random() * 500) + 100,
    avgScore: Math.floor(Math.random() * 30) + 50
  }));

  const subjectDistribution = [
    { name: 'Mathematics', value: 35, color: '#3b82f6' },
    { name: 'Physics', value: 25, color: '#8b5cf6' },
    { name: 'Chemistry', value: 25, color: '#22c55e' },
    { name: 'Others', value: 15, color: '#f59e0b' }
  ];

  const filteredTests = testsData.filter(test => 
    test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = usersData.filter(u => 
    u.role === 'student' && 
    (u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     u.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getTestTypeColor = (type: TestType) => {
    const colors: Record<TestType, string> = {
      'JEE': 'bg-blue-100 text-blue-700',
      'EAMCET': 'bg-green-100 text-green-700',
      'NEET': 'bg-purple-100 text-purple-700',
      'SSC': 'bg-orange-100 text-orange-700',
      'BANKING': 'bg-pink-100 text-pink-700',
      'UPSC': 'bg-red-100 text-red-700',
      'GATE': 'bg-cyan-100 text-cyan-700',
      'CUSTOM': 'bg-gray-100 text-gray-700'
    };
    return colors[type] || colors['CUSTOM'];
  };

  // Subject Distribution Handlers
  const addSubjectDistribution = () => {
    setSubjectDistributions([...subjectDistributions, { subject: '', topic: '', percentage: 0, difficulty: 'medium' }]);
  };

  const removeSubjectDistribution = (index: number) => {
    setSubjectDistributions(subjectDistributions.filter((_, i) => i !== index));
  };

  const updateSubjectDistribution = (index: number, field: keyof SubjectDistribution, value: string | number) => {
    const updated = [...subjectDistributions];
    updated[index] = { ...updated[index], [field]: value };
    setSubjectDistributions(updated);
  };

  const getTotalPercentage = () => {
    return subjectDistributions.reduce((sum, dist) => sum + (dist.percentage || 0), 0);
  };

  // Question Options Handlers
  const updateOption = (index: number, value: string) => {
    const updated = [...questionOptions];
    updated[index] = value;
    setQuestionOptions(updated);
  };

  const handleCreateTest = () => {
    // In a real app, this would send data to backend
    console.log('Creating test:', {
      name: testName,
      type: testType,
      duration: parseInt(testDuration),
      totalQuestions: parseInt(testTotalQuestions),
      totalMarks: parseInt(testTotalMarks),
      negativeMarking: testNegativeMarking,
      instructions: testInstructions,
      subjectDistribution: subjectDistributions
    });
    
    // Reset form and close dialog
    setTestName('');
    setTestDuration('180');
    setTestTotalQuestions('90');
    setTestTotalMarks('360');
    setTestNegativeMarking(true);
    setTestInstructions('');
    setSubjectDistributions([{ subject: '', topic: '', percentage: 0, difficulty: 'medium' }]);
    setShowCreateTestDialog(false);
    alert('Test created successfully! (In a real app, this would be saved to the database)');
  };

  const handleSaveQuestion = () => {
    // In a real app, this would send data to backend
    const newQuestion = {
      question: questionText,
      options: questionOptions.filter(o => o.trim() !== ''),
      correctAnswer: parseInt(correctAnswer),
      explanation: questionExplanation,
      subject: questionSubject,
      topic: questionTopic,
      difficulty: questionDifficulty,
      marks: parseInt(questionMarks),
      negativeMarks: parseInt(questionNegativeMarks),
      type: questionType,
      tags: questionTags.split(',').map(t => t.trim()).filter(t => t)
    };
    
    console.log('Saving question:', newQuestion);
    
    // Reset form and close dialog
    setQuestionText('');
    setQuestionOptions(['', '', '', '']);
    setCorrectAnswer('0');
    setQuestionExplanation('');
    setQuestionSubject('');
    setQuestionTopic('');
    setQuestionDifficulty('medium');
    setQuestionMarks('4');
    setQuestionNegativeMarks('1');
    setQuestionType('single');
    setQuestionTags('');
    setShowAddQuestionDialog(false);
    alert('Question saved successfully! (In a real app, this would be saved to the database)');
  };

  const isCreateTestValid = () => {
    return testName.trim() !== '' && 
           testDuration !== '' && 
           testTotalQuestions !== '' && 
           testTotalMarks !== '' &&
           getTotalPercentage() === 100 &&
           subjectDistributions.every(d => d.subject !== '' && d.topic !== '' && d.percentage > 0);
  };

  const isSaveQuestionValid = () => {
    return questionText.trim() !== '' &&
           questionOptions.every(o => o.trim() !== '') &&
           questionSubject !== '' &&
           questionTopic !== '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-xs text-gray-500">MockTest Pro Management</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src={user?.avatar} 
                  alt={user?.name} 
                  className="w-9 h-9 rounded-full border-2 border-gray-100"
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" onClick={() => { logout(); onLogout(); }}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-gray-200 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="tests" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              <BookOpen className="w-4 h-4 mr-2" />
              Tests
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="questions" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              <Award className="w-4 h-4 mr-2" />
              Questions
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Users</p>
                      <p className="text-3xl font-bold">{totalUsers}</p>
                    </div>
                    <Users className="w-10 h-10 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Total Tests</p>
                      <p className="text-3xl font-bold">{totalTests}</p>
                    </div>
                    <BookOpen className="w-10 h-10 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Total Attempts</p>
                      <p className="text-3xl font-bold">{totalAttempts}</p>
                    </div>
                    <TrendingUp className="w-10 h-10 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Active Tests</p>
                      <p className="text-3xl font-bold">{activeTests}</p>
                    </div>
                    <CheckCircle2 className="w-10 h-10 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Line type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subject Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={subjectDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {subjectDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-4 mt-4 flex-wrap">
                    {subjectDistribution.map(item => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-gray-600">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Test Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Test Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={testPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Bar dataKey="attempts" fill="#3b82f6" />
                    <Bar dataKey="avgScore" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tests Tab */}
          <TabsContent value="tests" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Search tests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={() => setShowCreateTestDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Test
              </Button>
            </div>

            <div className="grid gap-4">
              {filteredTests.map(test => (
                <Card key={test.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{test.name}</h3>
                          <Badge className={getTestTypeColor(test.type)}>{test.type}</Badge>
                          {test.isActive ? (
                            <Badge className="bg-green-100 text-green-700">Active</Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-700">Inactive</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mb-3">{test.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {test.duration} min
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {test.totalQuestions} questions
                          </span>
                          <span className="flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            {test.totalMarks} marks
                          </span>
                          <span className="flex items-center gap-1">
                            {test.negativeMarking ? (
                              <XCircle className="w-4 h-4 text-red-500" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            )}
                            {test.negativeMarking ? 'Negative marking' : 'No negative marking'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tests Attempted</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Score</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredUsers.map(user => {
                        const attempts = getUserAttempts(user.id);
                        const avgScore = attempts.length > 0 
                          ? (attempts.reduce((sum, a) => sum + a.percentage, 0) / attempts.length).toFixed(1)
                          : 'N/A';
                        
                        return (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                                <span className="font-medium text-gray-900">{user.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{user.email}</td>
                            <td className="px-6 py-4 text-gray-600">{attempts.length}</td>
                            <td className="px-6 py-4">
                              <span className="font-medium text-blue-600">{avgScore}%</span>
                            </td>
                            <td className="px-6 py-4">
                              <Badge className="bg-green-100 text-green-700">Active</Badge>
                            </td>
                            <td className="px-6 py-4">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Questions Tab */}
          <TabsContent value="questions" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Search questions..."
                  className="pl-10"
                />
              </div>
              <Button onClick={() => setShowAddQuestionDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </Button>
            </div>

            <div className="grid gap-4">
              {questionsData.slice(0, 10).map((question, index) => (
                <Card key={question.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm text-gray-500">Q{index + 1}</span>
                          <Badge variant="outline">{question.subject}</Badge>
                          <Badge variant="outline">{question.topic}</Badge>
                          <Badge 
                            variant="outline" 
                            className={
                              question.difficulty === 'easy' ? 'text-green-600 border-green-200' :
                              question.difficulty === 'medium' ? 'text-yellow-600 border-yellow-200' :
                              'text-red-600 border-red-200'
                            }
                          >
                            {question.difficulty}
                          </Badge>
                        </div>
                        <p className="text-gray-900 mb-3">{question.question}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Marks: +{question.marks}</span>
                          <span>Negative: -{question.negativeMarks}</span>
                          <span>Type: {question.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Configuration Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Randomize Questions</Label>
                    <p className="text-sm text-gray-500">Shuffle questions for each attempt</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="border-t border-gray-200" />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Randomize Options</Label>
                    <p className="text-sm text-gray-500">Shuffle answer options for each attempt</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="border-t border-gray-200" />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Show Results Immediately</Label>
                    <p className="text-sm text-gray-500">Display results right after test submission</p>
                  </div>
                  <Switch />
                </div>
                <div className="border-t border-gray-200" />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Allow Review</Label>
                    <p className="text-sm text-gray-500">Let students review answers after test</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="border-t border-gray-200" />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Maximum Attempts</Label>
                    <p className="text-sm text-gray-500">Limit number of attempts per test</p>
                  </div>
                  <Select defaultValue="3">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Create Test Dialog */}
      <Dialog open={showCreateTestDialog} onOpenChange={setShowCreateTestDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Create New Test</DialogTitle>
            <DialogDescription>
              Configure a new mock test with subject/topic distribution and percentage weightage.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Basic Test Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Test Name *</Label>
                <Input 
                  placeholder="Enter test name" 
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Test Type *</Label>
                <Select value={testType} onValueChange={(v) => setTestType(v as TestType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select test type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JEE">JEE</SelectItem>
                    <SelectItem value="EAMCET">EAMCET</SelectItem>
                    <SelectItem value="NEET">NEET</SelectItem>
                    <SelectItem value="SSC">SSC</SelectItem>
                    <SelectItem value="BANKING">BANKING</SelectItem>
                    <SelectItem value="UPSC">UPSC</SelectItem>
                    <SelectItem value="GATE">GATE</SelectItem>
                    <SelectItem value="CUSTOM">CUSTOM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Duration (minutes) *</Label>
                <Input 
                  type="number" 
                  placeholder="180" 
                  value={testDuration}
                  onChange={(e) => setTestDuration(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Total Questions *</Label>
                <Input 
                  type="number" 
                  placeholder="90" 
                  value={testTotalQuestions}
                  onChange={(e) => setTestTotalQuestions(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Total Marks *</Label>
                <Input 
                  type="number" 
                  placeholder="360" 
                  value={testTotalMarks}
                  onChange={(e) => setTestTotalMarks(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Enable Negative Marking</Label>
              <Switch 
                checked={testNegativeMarking} 
                onCheckedChange={setTestNegativeMarking} 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Instructions</Label>
              <Textarea 
                placeholder="Enter test instructions..."
                value={testInstructions}
                onChange={(e) => setTestInstructions(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            {/* Subject/Topic Distribution */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Label className="text-base font-medium">Subject/Topic Distribution *</Label>
                  <p className="text-sm text-gray-500">Define percentage weightage for each subject and topic</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${getTotalPercentage() === 100 ? 'text-green-600' : 'text-red-600'}`}>
                    Total: {getTotalPercentage()}%
                  </span>
                  {getTotalPercentage() !== 100 && (
                    <p className="text-xs text-red-500">Must equal 100%</p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {subjectDistributions.map((dist, index) => (
                  <div key={index} className="grid grid-cols-12 gap-3 items-end bg-gray-50 p-3 rounded-lg">
                    <div className="col-span-3">
                      <Label className="text-xs">Subject</Label>
                      <Select 
                        value={dist.subject} 
                        onValueChange={(v) => updateSubjectDistribution(index, 'subject', v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map(subject => (
                            <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-3">
                      <Label className="text-xs">Topic</Label>
                      <Select 
                        value={dist.topic} 
                        onValueChange={(v) => updateSubjectDistribution(index, 'topic', v)}
                        disabled={!dist.subject}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select topic" />
                        </SelectTrigger>
                        <SelectContent>
                          {dist.subject && getTopicsBySubject(dist.subject).map(topic => (
                            <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-2">
                      <Label className="text-xs">Percentage (%)</Label>
                      <Input 
                        type="number" 
                        min="0" 
                        max="100"
                        placeholder="25"
                        value={dist.percentage || ''}
                        onChange={(e) => updateSubjectDistribution(index, 'percentage', parseInt(e.target.value) || 0)}
                      />
                    </div>

                    <div className="col-span-2">
                      <Label className="text-xs">Difficulty</Label>
                      <Select 
                        value={dist.difficulty} 
                        onValueChange={(v) => updateSubjectDistribution(index, 'difficulty', v as DifficultyLevel)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeSubjectDistribution(index)}
                        disabled={subjectDistributions.length === 1}
                        className="text-red-500"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Button 
                  variant="outline" 
                  onClick={addSubjectDistribution}
                  className="w-full"
                  disabled={getTotalPercentage() >= 100}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Subject/Topic
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateTestDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateTest}
              disabled={!isCreateTestValid()}
            >
              <Save className="w-4 h-4 mr-2" />
              Create Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Question Dialog */}
      <Dialog open={showAddQuestionDialog} onOpenChange={setShowAddQuestionDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Add New Question</DialogTitle>
            <DialogDescription>
              Enter all the required details for the new question. This will be saved to the question bank.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Question Text */}
            <div className="space-y-2">
              <Label>Question *</Label>
              <Textarea 
                placeholder="Enter the question text..."
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            {/* Options */}
            <div className="space-y-3">
              <Label>Options *</Label>
              {questionOptions.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <Input 
                    placeholder={`Enter option ${String.fromCharCode(65 + index)}`}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                  />
                </div>
              ))}
            </div>

            {/* Correct Answer */}
            <div className="space-y-2">
              <Label>Correct Answer *</Label>
              <Select value={correctAnswer} onValueChange={setCorrectAnswer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select correct answer" />
                </SelectTrigger>
                <SelectContent>
                  {questionOptions.map((_, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      Option {String.fromCharCode(65 + index)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Explanation */}
            <div className="space-y-2">
              <Label>Explanation</Label>
              <Textarea 
                placeholder="Enter the explanation for the correct answer..."
                value={questionExplanation}
                onChange={(e) => setQuestionExplanation(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            {/* Subject and Topic */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Subject *</Label>
                <Select value={questionSubject} onValueChange={setQuestionSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Topic *</Label>
                <Select 
                  value={questionTopic} 
                  onValueChange={setQuestionTopic}
                  disabled={!questionSubject}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTopics.map(topic => (
                      <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Difficulty and Type */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Difficulty *</Label>
                <Select 
                  value={questionDifficulty} 
                  onValueChange={(v) => setQuestionDifficulty(v as DifficultyLevel)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Question Type *</Label>
                <Select 
                  value={questionType} 
                  onValueChange={(v) => setQuestionType(v as QuestionType)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Correct</SelectItem>
                    <SelectItem value="multiple">Multiple Correct</SelectItem>
                    <SelectItem value="integer">Integer Type</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Marks */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Marks (Correct)</Label>
                <Input 
                  type="number" 
                  placeholder="4"
                  value={questionMarks}
                  onChange={(e) => setQuestionMarks(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Negative Marks (Wrong)</Label>
                <Input 
                  type="number" 
                  placeholder="1"
                  value={questionNegativeMarks}
                  onChange={(e) => setQuestionNegativeMarks(e.target.value)}
                />
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags (comma separated)</Label>
              <Input 
                placeholder="e.g., jee, physics, mechanics"
                value={questionTags}
                onChange={(e) => setQuestionTags(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddQuestionDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveQuestion}
              disabled={!isSaveQuestionValid()}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Question
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
