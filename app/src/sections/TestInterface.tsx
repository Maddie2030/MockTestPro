import React, { useEffect, useState } from 'react';
import { useTest } from '@/hooks/useTest';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Flag, 
  BookOpen, 
  AlertTriangle,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestInterfaceProps {
  onSubmit: () => void;
  onExit: () => void;
}

const TestInterface: React.FC<TestInterfaceProps> = ({ onSubmit, onExit }) => {
  const { 
    activeTest, 
    saveResponse, 
    markForReview, 
    navigateToQuestion, 
    navigateToSection,
    getCurrentQuestion,
    getCurrentResponse,
    submitTest,
    updateTimeRemaining
  } = useTest();

  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQuestion = getCurrentQuestion();
  const currentResponse = getCurrentResponse();

  // Timer effect
  useEffect(() => {
    if (!activeTest) return;

    const timer = setInterval(() => {
      if (activeTest.timeRemaining > 0) {
        updateTimeRemaining(activeTest.timeRemaining - 1);
      } else {
        handleSubmit();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTest?.timeRemaining]);

  // Update selected option when question changes
  useEffect(() => {
    if (currentResponse?.selectedAnswer !== null && typeof currentResponse?.selectedAnswer === 'number') {
      setSelectedOption(currentResponse.selectedAnswer);
    } else {
      setSelectedOption(null);
    }
  }, [currentQuestion?.id]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    if (currentQuestion) {
      saveResponse(currentQuestion.id, index);
    }
  };

  const handleClear = () => {
    setSelectedOption(null);
    if (currentQuestion) {
      saveResponse(currentQuestion.id, null);
    }
  };

  const handleMarkReview = () => {
    if (currentQuestion) {
      markForReview(currentQuestion.id);
    }
  };

  const handleSubmit = () => {
    const result = submitTest();
    if (result) {
      onSubmit();
    }
  };

  const getQuestionStatus = (index: number) => {
    const response = activeTest?.responses[index];
    if (!response) return 'not-visited';
    if (response.selectedAnswer !== null) return 'answered';
    if (response.isMarkedForReview) return 'marked-review';
    if (response.isVisited) return 'unanswered';
    return 'not-visited';
  };

  const getStatusCounts = () => {
    if (!activeTest) return { answered: 0, unanswered: 0, marked: 0, notVisited: 0 };
    
    return activeTest.responses.reduce((acc, r) => {
      if (r.selectedAnswer !== null) acc.answered++;
      else if (r.isMarkedForReview) acc.marked++;
      else if (r.isVisited) acc.unanswered++;
      else acc.notVisited++;
      return acc;
    }, { answered: 0, unanswered: 0, marked: 0, notVisited: 0 });
  };

  const statusCounts = getStatusCounts();

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!activeTest || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Loading test...</p>
        </div>
      </div>
    );
  }

  const currentSection = activeTest.test.sections[activeTest.currentSectionIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900">{activeTest.test.name}</h1>
                <p className="text-sm text-gray-500">{currentSection?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {/* Timer */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeTest.timeRemaining < 300 ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-blue-50 text-blue-700'
              }`}>
                <Clock className="w-5 h-5" />
                <span className="font-mono text-xl font-bold">
                  {formatTime(activeTest.timeRemaining)}
                </span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="text-gray-500"
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </Button>

              <Button 
                variant="outline" 
                className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => setShowExitDialog(true)}
              >
                Exit
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Question */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Question Card */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                {/* Question Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                      Q{activeTest.currentQuestionIndex + 1} of {activeTest.questions.length}
                    </Badge>
                    <Badge variant="outline" className="text-gray-600">
                      {currentQuestion.subject}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        currentQuestion.difficulty === 'easy' && 'text-green-600 border-green-200',
                        currentQuestion.difficulty === 'medium' && 'text-yellow-600 border-yellow-200',
                        currentQuestion.difficulty === 'hard' && 'text-red-600 border-red-200'
                      )}
                    >
                      {currentQuestion.difficulty}
                    </Badge>
                    {currentResponse?.isMarkedForReview && (
                      <Badge className="bg-purple-100 text-purple-700">
                        <Flag className="w-3 h-3 mr-1" />
                        Marked for Review
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    Marks: <span className="font-semibold text-green-600">+{currentQuestion.marks}</span>
                    {activeTest.test.negativeMarking && (
                      <span className="text-red-600 ml-2">-{currentQuestion.negativeMarks}</span>
                    )}
                  </div>
                </div>

                {/* Question Text */}
                <div className="mb-8">
                  <p className="text-lg text-gray-900 leading-relaxed whitespace-pre-wrap">
                    {currentQuestion.question}
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      className={cn(
                        'w-full p-4 rounded-lg border-2 text-left transition-all flex items-start gap-4',
                        selectedOption === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      )}
                    >
                      <div className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm shrink-0',
                        selectedOption === index
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      )}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-gray-800 pt-1">{option}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                onClick={handleClear}
                disabled={selectedOption === null}
                className="px-6"
              >
                Clear Selection
              </Button>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={handleMarkReview}
                  className={cn(
                    'px-6',
                    currentResponse?.isMarkedForReview && 'bg-purple-50 border-purple-300 text-purple-700'
                  )}
                >
                  <Flag className="w-4 h-4 mr-2" />
                  {currentResponse?.isMarkedForReview ? 'Unmark Review' : 'Mark for Review'}
                </Button>

                <Button
                  variant="default"
                  onClick={() => setShowSubmitDialog(true)}
                  className="bg-green-600 hover:bg-green-700 px-8"
                >
                  Submit Test
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Navigation */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-auto">
          <div className="p-4 space-y-4">
            {/* Section Selector */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Sections</h3>
              <div className="space-y-2">
                {activeTest.test.sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => navigateToSection(index)}
                    className={cn(
                      'w-full p-3 rounded-lg text-left transition-all',
                      activeTest.currentSectionIndex === index
                        ? 'bg-blue-50 border-2 border-blue-200'
                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{section.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {section.questionCount}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200" />

            {/* Legend */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Legend</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gray-200" />
                  <span className="text-gray-600">Not Visited</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-100 border border-red-300" />
                  <span className="text-gray-600">Unanswered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-500" />
                  <span className="text-gray-600">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-purple-500" />
                  <span className="text-gray-600">Marked</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200" />

            {/* Question Palette */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Question Palette</h3>
              <div className="grid grid-cols-5 gap-2">
                {activeTest.questions.map((_, index) => {
                  const status = getQuestionStatus(index);
                  return (
                    <button
                      key={index}
                      onClick={() => navigateToQuestion(index)}
                      className={cn(
                        'w-10 h-10 rounded-lg font-medium text-sm transition-all',
                        activeTest.currentQuestionIndex === index
                          ? 'ring-2 ring-blue-500 ring-offset-2'
                          : '',
                        status === 'not-visited' && 'bg-gray-200 text-gray-600 hover:bg-gray-300',
                        status === 'unanswered' && 'bg-red-100 text-red-700 border border-red-300 hover:bg-red-200',
                        status === 'answered' && 'bg-green-500 text-white hover:bg-green-600',
                        status === 'marked-review' && 'bg-purple-500 text-white hover:bg-purple-600'
                      )}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-gray-200" />

            {/* Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Answered</span>
                  <span className="font-semibold text-green-600">{statusCounts.answered}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Unanswered</span>
                  <span className="font-semibold text-red-600">{statusCounts.unanswered}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Marked for Review</span>
                  <span className="font-semibold text-purple-600">{statusCounts.marked}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Not Visited</span>
                  <span className="font-semibold text-gray-600">{statusCounts.notVisited}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <footer className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => navigateToQuestion(activeTest.currentQuestionIndex - 1)}
            disabled={activeTest.currentQuestionIndex === 0}
            className="px-6"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              Question {activeTest.currentQuestionIndex + 1} of {activeTest.questions.length}
            </span>
          </div>

          <Button
            variant="outline"
            onClick={() => navigateToQuestion(activeTest.currentQuestionIndex + 1)}
            disabled={activeTest.currentQuestionIndex === activeTest.questions.length - 1}
            className="px-6"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </footer>

      {/* Submit Dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Submit Test?
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your test? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Questions</span>
              <span className="font-semibold">{activeTest.questions.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Answered</span>
              <span className="font-semibold text-green-600">{statusCounts.answered}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Unanswered</span>
              <span className="font-semibold text-red-600">{statusCounts.unanswered + statusCounts.notVisited}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Marked for Review</span>
              <span className="font-semibold text-purple-600">{statusCounts.marked}</span>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowSubmitDialog(false)}>
              Continue Test
            </Button>
            <Button 
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700"
            >
              Submit Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Exit Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Test?</AlertDialogTitle>
            <AlertDialogDescription>
              Your progress will be lost if you exit now. Are you sure you want to leave?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowExitDialog(false)}>
              Continue Test
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={onExit}
              className="bg-red-600 hover:bg-red-700"
            >
              Exit Test
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TestInterface;
