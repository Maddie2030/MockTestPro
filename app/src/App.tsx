import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { TestProvider, useTest } from '@/hooks/useTest';
import Login from '@/sections/Login';
import StudentDashboard from '@/sections/StudentDashboard';
import TestInterface from '@/sections/TestInterface';
import TestResults from '@/sections/TestResults';
import AdminDashboard from '@/sections/AdminDashboard';
import { getUserAttempts } from '@/data/users';
import type { TestAttempt } from '@/types';

// Main App Content Component
const AppContent: React.FC = () => {
  const { isAuthenticated, hasRole } = useAuth();
  const { activeTest, testHistory } = useTest();
  
  const [view, setView] = useState<'dashboard' | 'test' | 'results' | 'analytics'>('dashboard');
  const [selectedAttempt, setSelectedAttempt] = useState<TestAttempt | null>(null);

  // Handle starting a test
  const handleStartTest = () => {
    setView('test');
  };

  // Handle test submission
  const handleTestSubmit = () => {
    if (testHistory.length > 0) {
      setSelectedAttempt(testHistory[testHistory.length - 1]);
      setView('results');
    } else {
      const mockAttempt = getUserAttempts('user-1')[0];
      if (mockAttempt) {
        setSelectedAttempt(mockAttempt);
        setView('results');
      }
    }
  };

  // Handle test exit
  const handleTestExit = () => {
    setView('dashboard');
  };

  // Handle viewing results
  const handleViewResults = (attemptId: string) => {
    const attempt = getUserAttempts('user-1').find(a => a.id === attemptId);
    if (attempt) {
      setSelectedAttempt(attempt);
      setView('results');
    }
  };

  // Handle retaking a test
  const handleRetakeTest = () => {
    setView('dashboard');
  };

  // Handle admin logout
  const handleAdminLogout = () => {
    setView('dashboard');
  };

  // If not authenticated, show login
  if (!isAuthenticated) {
    return <Login />;
  }

  // If user is admin, show admin dashboard
  if (hasRole('admin')) {
    return <AdminDashboard onLogout={handleAdminLogout} />;
  }

  // If there's an active test, show test interface
  if (activeTest || view === 'test') {
    return (
      <TestInterface 
        onSubmit={handleTestSubmit} 
        onExit={handleTestExit} 
      />
    );
  }

  // Show results view
  if (view === 'results' && selectedAttempt) {
    return (
      <TestResults 
        attempt={selectedAttempt}
        onBack={() => setView('dashboard')}
        onRetake={handleRetakeTest}
      />
    );
  }

  // Default: Show student dashboard
  return (
    <StudentDashboard 
      onStartTest={handleStartTest}
      onViewResults={handleViewResults}
      onViewAnalytics={() => setView('analytics')}
    />
  );
};

// Main App Component with Providers
function App() {
  return (
    <AuthProvider>
      <TestProvider>
        <AppContent />
      </TestProvider>
    </AuthProvider>
  );
}

export default App;
