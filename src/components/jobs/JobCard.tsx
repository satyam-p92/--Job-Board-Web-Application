import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Calendar, DollarSign } from 'lucide-react';
import { Job } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface JobCardProps {
  job: Job;
  showApplyButton?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, showApplyButton = true }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg border border-gray-200">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between">
          <div className="flex-1">
            <Link 
              to={`/jobs/${job.id}`} 
              className="text-xl font-semibold text-blue-700 hover:text-blue-800 transition"
            >
              {job.title}
            </Link>
            <div className="mt-1 text-gray-700 font-medium">{job.company}</div>
            
            <div className="mt-4 flex flex-wrap gap-3">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{job.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Briefcase className="h-4 w-4 mr-1" />
                <span className="text-sm capitalize">{job.type.replace('-', ' ')}</span>
              </div>
              {job.salary && (
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span className="text-sm">{job.salary}</span>
                </div>
              )}
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="text-sm">Posted: {formatDate(job.createdAt)}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="text-sm text-gray-600 line-clamp-2">
                {job.description}
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {job.category}
              </span>
            </div>
          </div>
          
          {showApplyButton && (
            <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0">
              <Link to={`/jobs/${job.id}`}>
                <Button variant="primary">View Details</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default JobCard;