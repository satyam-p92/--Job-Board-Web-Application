import React, { useEffect } from 'react';
import { useJobs } from '../context/JobContext';
import JobFilters from '../components/jobs/JobFilters';
import JobList from '../components/jobs/JobList';

const JobsPage: React.FC = () => {
  const { filteredJobs, loading, filterJobs, currentFilters } = useJobs();

  const handleFilterChange = (filters: any) => {
    filterJobs(filters);
  };

  useEffect(() => {
    // Reset to empty filters when component mounts
    if (Object.keys(currentFilters).length === 0) {
      filterJobs({});
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Jobs</h1>
          <p className="text-gray-600">
            Find your next opportunity from our collection of {filteredJobs.length} job listings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Section */}
          <div className="lg:col-span-1">
            <JobFilters 
              onFilterChange={handleFilterChange} 
              currentFilters={currentFilters}
            />
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center my-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">
                    {filteredJobs.length} jobs found
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Sort by:</span>
                    <select 
                      className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="newest">Most Recent</option>
                      <option value="relevant">Relevance</option>
                      <option value="salary">Salary (High to Low)</option>
                    </select>
                  </div>
                </div>
                <JobList jobs={filteredJobs} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;