import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BookOpen, GraduationCap, Users, BarChart3, AlertCircle, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error || 'Login failed');
    }
  };

  const quickLogin = (type: 'student' | 'admin') => {
    setEmail(`${type}@demo.com`);
    setPassword('password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Hero */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                MockTest Pro
              </h1>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed">
              Master your competitive exams with our comprehensive mock test platform. 
              Practice, analyze, and improve your performance.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-gray-100">
              <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">1000+ Questions</h3>
              <p className="text-sm text-gray-500">Curated by experts</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-gray-100">
              <BarChart3 className="w-8 h-8 text-indigo-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Detailed Analytics</h3>
              <p className="text-sm text-gray-500">Track your progress</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-gray-100">
              <Users className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Live Rankings</h3>
              <p className="text-sm text-gray-500">Compete with peers</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-gray-100">
              <GraduationCap className="w-8 h-8 text-pink-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Exam Patterns</h3>
              <p className="text-sm text-gray-500">JEE, NEET, SSC & more</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <div className="lg:hidden flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                MockTest Pro
              </span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back!</CardTitle>
            <CardDescription className="text-gray-500">
              Sign in to access your tests and track your progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Quick Demo Login</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => quickLogin('student')}
                className="h-10 border-gray-200 hover:bg-blue-50 hover:border-blue-300"
              >
                <Users className="w-4 h-4 mr-2" />
                Student
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => quickLogin('admin')}
                className="h-10 border-gray-200 hover:bg-purple-50 hover:border-purple-300"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>Demo credentials: student@demo.com / admin@demo.com</p>
              <p>Any password works for demo</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
