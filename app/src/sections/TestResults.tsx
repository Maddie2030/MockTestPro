import React from 'react';
import type { TestAttempt } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronLeft, 
  RotateCcw, 
  Download, 
  Share2, 
  Trophy, 
  Target, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  BookOpen,
  Star
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn } from '@/lib/utils';

interface TestResultsProps {
  attempt: TestAttempt;
  onBack: () => void;
  onRetake: () => void;
}

const TestResults: React.FC<TestResultsProps> = ({ attempt, onBack, onRetake }) => {
  const isPassed = attempt.percentage >= 35;

  const pieData = [
    { name: 'Correct', value: attempt.correctAnswers, color: '#22c55e' },
    { name: 'Wrong', value: attempt.wrongAnswers, color: '#ef4444' },
    { name: 'Unattempted', value: attempt.unattempted, color: '#9ca3af' }
  ];

  const sectionChartData = attempt.sectionScores.map(s => ({
    name: s.sectionName,
    score: s.score,
    maxScore: s.maxScore,
    percentage: (s.score / s.maxScore) * 100
  }));

  const weakAreas = attempt.topicAnalysis.filter(t => t.weakArea);
  const strongAreas = attempt.topicAnalysis.filter(t => !t.weakArea);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Test Results</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button size="sm" onClick={onRetake}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Score Overview */}
        <Card className={cn(
          'mb-8 border-0',
          isPassed 
            ? 'bg-gradient-to-br from-green-500 to-green-600' 
            : 'bg-gradient-to-br from-orange-500 to-orange-600'
        )}>
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-4 gap-8 items-center">
              {/* Score Circle */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <svg className="w-40 h-40 transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="white"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(attempt.percentage / 100) * 440} 440`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-white">{attempt.percentage.toFixed(1)}%</span>
                    <span className="text-sm text-white/80">Score</span>
                  </div>
                </div>
              </div>

              {/* Test Info */}
              <div className="lg:col-span-2 text-white space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">{attempt.testName}</h2>
                  <p className="text-white/80">{attempt.testType} • {new Date(attempt.startTime).toLocaleDateString()}</p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                    <Trophy className="w-5 h-5" />
                    <div>
                      <p className="text-xs text-white/80">Rank</p>
                      <p className="font-bold">#{attempt.rank} of {attempt.totalParticipants}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                    <Clock className="w-5 h-5" />
                    <div>
                      <p className="text-xs text-white/80">Time Taken</p>
                      <p className="font-bold">{formatTime(attempt.timeTaken)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                    <Target className="w-5 h-5" />
                    <div>
                      <p className="text-xs text-white/80">Total Score</p>
                      <p className="font-bold">{attempt.totalScore}/{attempt.maxScore}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="text-center">
                <div className={cn(
                  'inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-bold',
                  isPassed ? 'bg-green-700 text-white' : 'bg-orange-700 text-white'
                )}>
                  {isPassed ? (
                    <>
                      <CheckCircle2 className="w-6 h-6" />
                      PASSED
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-6 h-6" />
                      NEEDS IMPROVEMENT
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Correct Answers</p>
                  <p className="text-2xl font-bold text-green-600">{attempt.correctAnswers}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Wrong Answers</p>
                  <p className="text-2xl font-bold text-red-600">{attempt.wrongAnswers}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Unattempted</p>
                  <p className="text-2xl font-bold text-gray-600">{attempt.unattempted}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Accuracy</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {((attempt.correctAnswers / (attempt.correctAnswers + attempt.wrongAnswers)) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Section-wise Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-5 h-5 text-blue-600" />
                Section-wise Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={sectionChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                  <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="maxScore" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-blue-500" />
                  <span className="text-sm text-gray-600">Your Score</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gray-200" />
                  <span className="text-sm text-gray-600">Max Score</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Answer Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-purple-600" />
                Answer Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
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
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Topic-wise Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attempt.topicAnalysis.map(topic => (
                <div key={`${topic.subject}-${topic.topic}`} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900">{topic.topic}</span>
                      <Badge variant="outline" className="text-xs">{topic.subject}</Badge>
                      {topic.weakArea && (
                        <Badge className="bg-red-100 text-red-700 text-xs flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Weak Area
                        </Badge>
                      )}
                      {!topic.weakArea && topic.accuracy >= 80 && (
                        <Badge className="bg-green-100 text-green-700 text-xs flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Strong
                        </Badge>
                      )}
                    </div>
                    <span className={cn(
                      'font-semibold',
                      topic.accuracy >= 80 ? 'text-green-600' :
                      topic.accuracy >= 60 ? 'text-yellow-600' : 'text-red-600'
                    )}>
                      {topic.accuracy.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{topic.correct}/{topic.totalQuestions} correct</span>
                    <span>•</span>
                    <span>{topic.wrong} wrong</span>
                    <span>•</span>
                    <span>{topic.unattempted} unattempted</span>
                    <span>•</span>
                    <span>Avg time: {topic.averageTime}s</span>
                  </div>
                  <Progress 
                    value={topic.accuracy} 
                    className={cn(
                      'h-2',
                      topic.accuracy >= 80 ? '[&>div]:bg-green-500' :
                      topic.accuracy >= 60 ? '[&>div]:bg-yellow-500' : '[&>div]:bg-red-500'
                    )}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Improvement Suggestions */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weak Areas */}
          {weakAreas.length > 0 && (
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <TrendingDown className="w-5 h-5" />
                  Areas Needing Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weakAreas.map(area => (
                    <div key={area.topic} className="p-4 bg-red-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-red-900">{area.topic}</span>
                        <Badge variant="outline" className="text-red-700 border-red-300">
                          {area.accuracy.toFixed(1)}%
                        </Badge>
                      </div>
                      <p className="text-sm text-red-700">
                        Practice more questions in {area.topic}. Your accuracy is below 75%.
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                        <BookOpen className="w-4 h-4" />
                        <span>Recommended: Solve 20+ practice questions</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Strong Areas */}
          {strongAreas.length > 0 && (
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <TrendingUp className="w-5 h-5" />
                  Your Strong Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {strongAreas.slice(0, 4).map(area => (
                    <div key={area.topic} className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-green-900">{area.topic}</span>
                        <Badge variant="outline" className="text-green-700 border-green-300">
                          {area.accuracy.toFixed(1)}%
                        </Badge>
                      </div>
                      <p className="text-sm text-green-700">
                        Great performance! Maintain this level of accuracy.
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-sm text-green-600">
                        <Star className="w-4 h-4" />
                        <span>Keep practicing to maintain consistency</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" size="lg" onClick={onBack}>
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Button>
          <Button size="lg" onClick={onRetake}>
            <RotateCcw className="w-5 h-5 mr-2" />
            Retake Test
          </Button>
        </div>
      </main>
    </div>
  );
};

export default TestResults;
