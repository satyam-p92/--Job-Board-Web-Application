import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Alert from '../ui/Alert';

interface LoginFormProps {
  redirectTo?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ redirectTo = '/' }) => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      await login(email, password);
      navigate(redirectTo);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during login';
      setError(errorMessage);
    }
  };

  // For demo purposes, add login shortcuts
  const loginAsEmployer = async () => {
    try {
      await login('employer@example.com', 'password');
      navigate(redirectTo);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during login';
      setError(errorMessage);
    }
  };

  const loginAsJobSeeker = async () => {
    try {
      await login('jobseeker@example.com', 'password');
      navigate(redirectTo);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during login';
      setError(errorMessage);
    }
  };

  const loginAsAdmin = async () => {
    try {
      await login('admin@example.com', 'password');
      navigate(redirectTo);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during login';
      setError(errorMessage);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Sign in to your account</h2>
        <p className="mt-2 text-gray-600">
          Or{' '}
          <Link to="/register" className="text-blue-700 hover:text-blue-800 font-medium">
            create a new account
          </Link>
        </p>
      </div>
      
      {error && (
        <Alert 
          variant="error" 
          message={error} 
          onClose={() => setError(null)} 
          className="mb-4"
        />
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="email"
          type="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          fullWidth
          required
        />
        
        <Input
          id="password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          fullWidth
          required
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-700 focus:ring-blue-500"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          
          <div className="text-sm">
            <Link to="/forgot-password" className="text-blue-700 hover:text-blue-800 font-medium">
              Forgot your password?
            </Link>
          </div>
        </div>
        
        <Button 
          type="submit" 
          fullWidth 
          isLoading={loading}
          icon={<LogIn className="h-4 w-4" />}
        >
          Sign in
        </Button>
      </form>

      {/* Demo shortcuts */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-center text-sm text-gray-600 mb-4">
          Demo shortcuts:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loginAsEmployer}
            isLoading={loading}
          >
            Login as Employer
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loginAsJobSeeker} 
            isLoading={loading}
          >
            Login as Job Seeker
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loginAsAdmin} 
            isLoading={loading}
          >
            Login as Admin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;