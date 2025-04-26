import React from 'react';
import { Briefcase as BriefcaseBusiness } from 'lucide-react';
import RegisterForm from '../components/authentication/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Left side - Branding */}
            <div className="lg:w-1/2 bg-gradient-to-br from-blue-700 to-blue-900 text-white p-12 flex flex-col justify-center">
              <div className="mb-8 flex items-center">
                <BriefcaseBusiness className="h-10 w-10 mr-3" />
                <span className="text-2xl font-bold">JobBoard</span>
              </div>
              <h1 className="text-3xl font-bold mb-6">Join Our Community</h1>
              <p className="text-xl text-blue-100 mb-8">
                Create an account to access all features and start your journey with us.
              </p>
              
              <div className="bg-blue-800 bg-opacity-30 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-3">For Job Seekers</h3>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Apply to thousands of jobs with one click
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Track all your applications in one place
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Get notified about new matching opportunities
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-800 bg-opacity-30 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">For Employers</h3>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Post unlimited job listings
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Reach thousands of qualified candidates
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Manage applications efficiently
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right side - Registration Form */}
            <div className="lg:w-1/2 p-12 flex items-center justify-center">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;