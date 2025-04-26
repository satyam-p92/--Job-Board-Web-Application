import React from 'react';
import { Briefcase as BriefcaseBusiness } from 'lucide-react';
import LoginForm from '../components/authentication/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Left side - Image/Branding */}
            <div className="lg:w-1/2 bg-blue-700 text-white p-12 flex flex-col justify-center">
              <div className="mb-8 flex items-center">
                <BriefcaseBusiness className="h-10 w-10 mr-3" />
                <span className="text-2xl font-bold">JobBoard</span>
              </div>
              <h1 className="text-3xl font-bold mb-6">Welcome Back!</h1>
              <p className="text-xl text-blue-100 mb-8">
                Sign in to access your account and manage your job applications or postings.
              </p>
              <div className="space-y-4 text-blue-100">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <span className="ml-2">Access thousands of job opportunities</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <span className="ml-2">Track your applications in one place</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <span className="ml-2">Connect with top employers</span>
                </div>
              </div>
            </div>
            
            {/* Right side - Login Form */}
            <div className="lg:w-1/2 p-12 flex items-center justify-center">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;