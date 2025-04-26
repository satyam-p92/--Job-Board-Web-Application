import React from 'react';
import { Job } from '../../types';
import JobCard from './JobCard';

interface JobListProps {
  jobs: Job[];
  loading?: boolean;
  emptyMessage?: string;
}

const JobList: React.FC<JobListProps> = ({ 
  jobs, 
  loading = false, 
  emptyMessage = 'No jobs found matching your criteria.' 
}) => {
  if (loading) {
    return (
      <div className="my-8">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-4 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="flex space-x-4 mb-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="h-16 bg-gray-200 rounded mb-4"></div>
            <div className="flex justify-end">
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="my-8 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
        <p className="mt-2 text-gray-600">Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="my-8 space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;