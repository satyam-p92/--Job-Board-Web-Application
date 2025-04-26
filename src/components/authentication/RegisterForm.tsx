import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Alert from '../ui/Alert';

const RegisterForm: React.FC = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'jobSeeker',
    company: '',
    title: '',
    location: ''
  });
  
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    if (formData.role === 'employer' && !formData.company) {
      setError('Company name is required for employer accounts');
      return;
    }
    
    try {
      // Convert form data to user data format
      const userData = {
        name: formData.name,
        email: formData.email,
        role: formData.role as 'employer' | 'jobSeeker' | 'admin',
        company: formData.company,
        title: formData.title,
        location: formData.location
      };
      
      await register(userData, formData.password);
      navigate('/');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during registration';
      setError(errorMessage);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Create a new account</h2>
        <p className="mt-2 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-700 hover:text-blue-800 font-medium">
            Sign in
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
        <Select
          id="role"
          name="role"
          label="I am a"
          value={formData.role}
          onChange={handleChange}
          options={[
            { value: 'jobSeeker', label: 'Job Seeker' },
            { value: 'employer', label: 'Employer' }
          ]}
          fullWidth
          required
        />
        
        <Input
          id="name"
          name="name"
          type="text"
          label={formData.role === 'employer' ? 'Company Name' : 'Full Name'}
          value={formData.name}
          onChange={handleChange}
          placeholder={formData.role === 'employer' ? 'Acme Inc.' : 'John Doe'}
          fullWidth
          required
        />
        
        <Input
          id="email"
          name="email"
          type="email"
          label="Email address"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          fullWidth
          required
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            fullWidth
            required
            helperText="Minimum 6 characters"
          />
          
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            fullWidth
            required
          />
        </div>
        
        {formData.role === 'employer' && (
          <Input
            id="company"
            name="company"
            type="text"
            label="Company Name"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your company"
            fullWidth
            required
          />
        )}
        
        {formData.role === 'jobSeeker' && (
          <>
            <Input
              id="title"
              name="title"
              type="text"
              label="Job Title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Software Developer"
              fullWidth
            />
            
            <Input
              id="location"
              name="location"
              type="text"
              label="Location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, State"
              fullWidth
            />
          </>
        )}
        
        <div className="pt-2">
          <Button 
            type="submit" 
            fullWidth 
            isLoading={loading}
            icon={<UserPlus className="h-4 w-4" />}
          >
            Create Account
          </Button>
        </div>
      </form>
      
      <p className="mt-6 text-center text-sm text-gray-600">
        By signing up, you agree to our{' '}
        <Link to="/terms" className="text-blue-700 hover:text-blue-800 font-medium">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link to="/privacy" className="text-blue-700 hover:text-blue-800 font-medium">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;