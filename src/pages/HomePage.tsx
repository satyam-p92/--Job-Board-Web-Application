import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Briefcase, Users, Building } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import Button from '../components/ui/Button';
import JobList from '../components/jobs/JobList';

const HomePage: React.FC = () => {
  const { jobs } = useJobs();
  
  // Show only 3 latest jobs
  const latestJobs = [...jobs]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-20 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Find Your Dream Job Today
          </h1>
          <p className="text-xl md:text-2xl text-center mb-10 max-w-3xl">
            Connect with top employers and discover opportunities that match your skills and aspirations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
            <Link to="/jobs" className="flex-grow">
              <Button 
                variant="primary" 
                size="lg" 
                fullWidth 
                className="bg-white text-blue-700 hover:bg-gray-100"
              >
                Browse Jobs
              </Button>
            </Link>
            <Link to="/register" className="flex-grow">
              <Button 
                variant="outline" 
                size="lg" 
                fullWidth 
                className="border-white text-white hover:bg-blue-800"
              >
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Job Board</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform duration-300 hover:transform hover:scale-105">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <Search className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Job Search</h3>
              <p className="text-gray-600">
                Find relevant jobs with our powerful search and filtering system, tailored to your preferences.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform duration-300 hover:transform hover:scale-105">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <Briefcase className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Top Job Listings</h3>
              <p className="text-gray-600">
                Access premium job opportunities from leading companies across various industries.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform duration-300 hover:transform hover:scale-105">
              <div className="bg-blue-100 p-3 rounded-full inline-block mb-4">
                <Users className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Career Growth</h3>
              <p className="text-gray-600">
                Discover opportunities that align with your career goals and help you grow professionally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Latest Job Openings</h2>
            <Link to="/jobs">
              <Button variant="outline">View All Jobs</Button>
            </Link>
          </div>
          
          <JobList jobs={latestJobs} />
        </div>
      </section>

      {/* For Employers Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-3xl font-bold mb-6">For Employers</h2>
              <p className="text-xl text-gray-600 mb-8">
                Looking to hire top talent? Post your job openings and reach thousands of qualified candidates.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <span className="ml-2 text-gray-700">Post jobs that reach the right candidates</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <span className="ml-2 text-gray-700">Manage applications efficiently in one place</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <span className="ml-2 text-gray-700">Build your employer brand with a company profile</span>
                </li>
              </ul>
              <Link to="/register">
                <Button variant="primary" size="lg">
                  Sign Up as Employer
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200 w-full max-w-md">
                <div className="flex items-center mb-6">
                  <Building className="h-12 w-12 text-blue-700 mr-4" />
                  <div>
                    <h3 className="text-2xl font-bold">Employer Dashboard</h3>
                    <p className="text-gray-600">Manage your recruitment process</p>
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Active Job Posts</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">12</span>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">New Applications</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">28</span>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Interviews Scheduled</span>
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-medium">5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Next Opportunity?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of job seekers who have found their dream jobs through our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/jobs">
              <Button 
                variant="primary" 
                size="lg" 
                className="bg-white text-blue-700 hover:bg-gray-100"
              >
                Search Jobs
              </Button>
            </Link>
            <Link to="/register">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-blue-800"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;