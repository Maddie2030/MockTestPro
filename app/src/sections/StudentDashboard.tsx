import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getActiveTests } from '@/data/tests';
import { getUserStats, getUserAttempts, getUserNotifications } from '@/data/users';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Target, 
  Award, 
  Bell,
  ChevronRight,
  Star,
  BarChart3,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Play,
  RotateCcw,
  TrendingDown,
  TrendingUp as TrendingUpIcon
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import type { TestType } from '@/types';

interface StudentDashboardProps {
  onStartTest: (testId: string) => void;
  onViewResults: (attemptId: string) => void;
  onViewAnalytics: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ 
  onStartTest, 
  onViewResults,
  onViewAnalytics 
}) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  const stats = user ? getUserStats(user.id) : null;
  const attempts = user ? getUserAttempts(user.id) : [];
  const notifications = user ? getUserNotifications(user.id) : [];
  const availableTests = getActiveTests();

  const getTestTypeColor = (type: TestType) => {
    const colors: Record<TestType, string> = {
      'JEE': 'bg-blue-100 text-blue-700 border-blue-200',
      'EAMCET': 'bg-green-100 text-green-700 border-green-200',
      'NEET': 'bg-purple-100 text-purple-700 border-purple-200',
      'SSC': 'bg-orange-100 text-orange-700 border-orange-200',
      'BANKING': 'bg-pink-100 text-pink-700 border-pink-200',
      'UPSC': 'bg-red-100 text-red-700 border-red-200',
      'GATE': 'bg-cyan-100 text-cyan-700 border-cyan-200',
      'CUSTOM': 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[type] || colors['CUSTOM'];
  };

  const performanceData = stats?.performanceTrend.map(t => ({
    name: t.testName.split(' ').slice(0, 2).join(' '),
    percentage: parseFloat(t.percentage.toFixed(1)),
    rank: t.rank
  })) || [];

  const subjectPerformance = stats?.topicWisePerformance.reduce((acc, topic) => {
    const existing = acc.find(a => a.subject === topic.subject);
    if (existing) {
      existing.total += topic.totalQuestions;
      existing.correct += topic.correct;
    } else {
      acc.push({ subject: topic.subject, total: topic.totalQuestions, correct: topic.correct });
    }
    return acc;
  }, [] as { subject: string; total: number; correct: number }[]).map(s => ({
    subject: s.subject,
    accuracy: parseFloat(((s.correct / s.total) * 100).toFixed(1))
  })) || [];

  const weakAreas = stats?.topicWisePerformance.filter(t => t.weakArea).slice(0, 5) || [];
  const strongAreas = stats?.topicWisePerformance.filter(t => !t.weakArea).slice(0, 5) || [];

  const pieData = [
    { name: 'Correct', value: attempts.reduce((sum, a) => sum + a.correctAnswers, 0), color: '#22c55e' },
    { name: 'Wrong', value: attempts.reduce((sum, a) => sum + a.wrongAnswers, 0), color: '#ef4444' },
    { name: 'Unattempted', value: attempts.reduce((sum, a) => sum + a.unattempted, 0), color: '#9ca3af' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                MockTest Pro
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <Bell className="w-5 h-5" />
                {notifications.filter(n => !n.isRead).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>
              
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
              
              <Button variant="ghost" size="sm" onClick={logout} className="text-gray-500">
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
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="tests" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              <BookOpen className="w-4 h-4 mr-2" />
              Available Tests
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              <RotateCcw className="w-4 h-4 mr-2" />
              Test History
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
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
                      <p className="text-blue-100 text-sm">Tests Attempted</p>
                      <p className="text-3xl font-bold">{stats?.totalTestsAttempted || 0}</p>
                    </div>
                    <BookOpen className="w-10 h-10 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Average Score</p>
                      <p className="text-3xl font-bold">{stats?.averageScore.toFixed(1) || 0}%</p>
                    </div>
                    <Target className="w-10 h-10 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Accuracy</p>
                      <p className="text-3xl font-bold">{stats?.averageAccuracy.toFixed(1) || 0}%</p>
                    </div>
                    <Zap className="w-10 h-10 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Best Rank</p>
                      <p className="text-3xl font-bold">#{Math.min(...(attempts.map(a => a.rank || 999))) || '-'}</p>
                    </div>
                    <Award className="w-10 h-10 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Performance Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Performance Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="percentage" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Quick Actions & Notifications */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-48">
                      <div className="space-y-3">
                        {notifications.slice(0, 5).map(notif => (
                          <div 
                            key={notif.id} 
                            className={`p-3 rounded-lg text-sm ${
                              notif.type === 'success' ? 'bg-green-50 text-green-800' :
                              notif.type === 'warning' ? 'bg-yellow-50 text-yellow-800' :
                              notif.type === 'error' ? 'bg-red-50 text-red-800' :
                              'bg-blue-50 text-blue-800'
                            }`}
                          >
                            <p className="font-medium">{notif.title}</p>
                            <p className="text-xs opacity-80">{notif.message}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Weak Areas Alert */}
                {weakAreas.length > 0 && (
                  <Card className="border-orange-200 bg-orange-50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-orange-900">Areas Needing Improvement</p>
                          <p className="text-sm text-orange-700 mt-1">
                            Focus on: {weakAreas.slice(0, 3).map(a => a.topic).join(', ')}
                          </p>
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-orange-700 text-sm mt-2"
                            onClick={onViewAnalytics}
                          >
                            View detailed analysis →
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Recent Tests */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Test Attempts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {attempts.slice(0, 3).map(attempt => (
                    <div 
                      key={attempt.id} 
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          attempt.percentage >= 70 ? 'bg-green-100' :
                          attempt.percentage >= 50 ? 'bg-yellow-100' : 'bg-red-100'
                        }`}>
                          {attempt.percentage >= 70 ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                          ) : attempt.percentage >= 50 ? (
                            <TrendingUpIcon className="w-6 h-6 text-yellow-600" />
                          ) : (
                            <TrendingDown className="w-6 h-6 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{attempt.testName}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(attempt.startTime).toLocaleDateString()} • 
                            Score: {attempt.totalScore}/{attempt.maxScore}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className={`text-lg font-bold ${
                            attempt.percentage >= 70 ? 'text-green-600' :
                            attempt.percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {attempt.percentage.toFixed(1)}%
                          </p>
                          <p className="text-sm text-gray-500">Rank #{attempt.rank}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onViewResults(attempt.id)}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Available Tests Tab */}
          <TabsContent value="tests" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Available Mock Tests</h2>
              <div className="flex gap-2">
                {['All', 'JEE', 'EAMCET', 'NEET', 'SSC', 'BANKING'].map(type => (
                  <Badge 
                    key={type} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableTests.map(test => (
                <Card key={test.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={getTestTypeColor(test.type)}>
                        {test.type}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {test.duration} min
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2">{test.name}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{test.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {test.totalQuestions} Qs
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        {test.totalMarks} Marks
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      {test.sections.map(section => (
                        <div key={section.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">{section.name}</span>
                          <span className="text-gray-500">{section.questionCount} Qs</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        {test.negativeMarking ? (
                          <Badge variant="outline" className="text-red-600 border-red-200">
                            -Ve Marking
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            No -Ve
                          </Badge>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => onStartTest(test.id)}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Start Test
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Test History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Test Attempts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {attempts.map(attempt => (
                    <div 
                      key={attempt.id} 
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          attempt.percentage >= 70 ? 'bg-green-100' :
                          attempt.percentage >= 50 ? 'bg-yellow-100' : 'bg-red-100'
                        }`}>
                          <span className={`text-lg font-bold ${
                            attempt.percentage >= 70 ? 'text-green-600' :
                            attempt.percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {attempt.percentage.toFixed(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{attempt.testName}</p>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span>{new Date(attempt.startTime).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{attempt.correctAnswers}/{attempt.correctAnswers + attempt.wrongAnswers + attempt.unattempted} correct</span>
                            <span>•</span>
                            <span>Rank #{attempt.rank} of {attempt.totalParticipants}</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onViewResults(attempt.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Subject-wise Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Subject-wise Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={subjectPerformance}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Accuracy"
                        dataKey="accuracy"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Answer Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Answer Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-4 mt-4">
                    {pieData.map(item => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-gray-600">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Topic-wise Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Topic-wise Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.topicWisePerformance.map(topic => (
                    <div key={`${topic.subject}-${topic.topic}`} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{topic.topic}</span>
                          <Badge variant="outline" className="text-xs">{topic.subject}</Badge>
                          {topic.weakArea && (
                            <Badge className="bg-red-100 text-red-700 text-xs">Weak Area</Badge>
                          )}
                        </div>
                        <span className={`font-semibold ${
                          topic.accuracy >= 80 ? 'text-green-600' :
                          topic.accuracy >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {topic.accuracy.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{topic.correct}/{topic.totalQuestions} correct</span>
                        <span>•</span>
                        <span>Avg time: {topic.averageTime}s</span>
                      </div>
                      <Progress 
                        value={topic.accuracy} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Improvement Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Improvement Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weakAreas.length > 0 && (
                    <div>
                      <h4 className="font-medium text-red-700 mb-2">Focus Areas (Accuracy &lt; 75%)</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {weakAreas.map(area => (
                          <div key={area.topic} className="p-3 bg-red-50 rounded-lg border border-red-100">
                            <p className="font-medium text-red-900">{area.topic}</p>
                            <p className="text-sm text-red-700">
                              Current accuracy: {area.accuracy.toFixed(1)}% • 
                              Practice more questions in this topic
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {strongAreas.length > 0 && (
                    <div>
                      <h4 className="font-medium text-green-700 mb-2">Strong Areas (Keep it up!)</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {strongAreas.slice(0, 4).map(area => (
                          <div key={area.topic} className="p-3 bg-green-50 rounded-lg border border-green-100">
                            <p className="font-medium text-green-900">{area.topic}</p>
                            <p className="text-sm text-green-700">
                              Accuracy: {area.accuracy.toFixed(1)}% • 
                              Great performance!
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StudentDashboard;
