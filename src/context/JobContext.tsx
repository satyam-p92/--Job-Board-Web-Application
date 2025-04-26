import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job, Application, JobFilter } from '../types';
import { jobs as initialJobs, applications as initialApplications } from '../data/mockData';

interface JobContextType {
  jobs: Job[];
  applications: Application[];
  filteredJobs: Job[];
  loading: boolean;
  createJob: (job: Omit<Job, 'id' | 'createdAt'>) => Promise<Job>;
  updateJob: (id: string, jobData: Partial<Job>) => Promise<Job>;
  deleteJob: (id: string) => Promise<void>;
  getJobById: (id: string) => Job | undefined;
  applyToJob: (jobId: string, application: Omit<Application, 'id' | 'jobId' | 'createdAt' | 'status'>) => Promise<Application>;
  getUserApplications: (userId: string) => Application[];
  getJobApplications: (jobId: string) => Application[];
  updateApplicationStatus: (id: string, status: Application['status']) => Promise<Application>;
  filterJobs: (filters: JobFilter) => void;
  currentFilters: JobFilter;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(initialJobs);
  const [loading, setLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<JobFilter>({});

  // Create a new job
  const createJob = async (jobData: Omit<Job, 'id' | 'createdAt'>): Promise<Job> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newJob: Job = {
      ...jobData,
      id: `${jobs.length + 1}`,
      createdAt: new Date()
    };
    
    setJobs(prevJobs => [...prevJobs, newJob]);
    setLoading(false);
    return newJob;
  };

  // Update an existing job
  const updateJob = async (id: string, jobData: Partial<Job>): Promise<Job> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedJobs = jobs.map(job => 
      job.id === id ? { ...job, ...jobData } : job
    );
    
    setJobs(updatedJobs);
    setLoading(false);
    
    const updatedJob = updatedJobs.find(job => job.id === id);
    if (!updatedJob) {
      throw new Error('Job not found');
    }
    
    return updatedJob;
  };

  // Delete a job
  const deleteJob = async (id: string): Promise<void> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
    setLoading(false);
  };

  // Get job by ID
  const getJobById = (id: string): Job | undefined => {
    return jobs.find(job => job.id === id);
  };

  // Apply to a job
  const applyToJob = async (
    jobId: string, 
    applicationData: Omit<Application, 'id' | 'jobId' | 'createdAt' | 'status'>
  ): Promise<Application> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newApplication: Application = {
      ...applicationData,
      id: `${applications.length + 1}`,
      jobId,
      status: 'pending',
      createdAt: new Date()
    };
    
    setApplications(prevApplications => [...prevApplications, newApplication]);
    setLoading(false);
    return newApplication;
  };

  // Get applications for a specific user
  const getUserApplications = (userId: string): Application[] => {
    return applications.filter(app => app.userId === userId);
  };

  // Get applications for a specific job
  const getJobApplications = (jobId: string): Application[] => {
    return applications.filter(app => app.jobId === jobId);
  };

  // Update application status
  const updateApplicationStatus = async (
    id: string, 
    status: Application['status']
  ): Promise<Application> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedApplications = applications.map(app => 
      app.id === id ? { ...app, status } : app
    );
    
    setApplications(updatedApplications);
    setLoading(false);
    
    const updatedApplication = updatedApplications.find(app => app.id === id);
    if (!updatedApplication) {
      throw new Error('Application not found');
    }
    
    return updatedApplication;
  };

  // Filter jobs based on criteria
  const filterJobs = (filters: JobFilter) => {
    setCurrentFilters(filters);
    
    let filtered = [...jobs];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchLower) || 
        job.company.toLowerCase().includes(searchLower) || 
        job.description.toLowerCase().includes(searchLower)
      );
    }
    
    if (filters.location) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    if (filters.category) {
      filtered = filtered.filter(job => job.category === filters.category);
    }
    
    if (filters.type) {
      filtered = filtered.filter(job => job.type === filters.type);
    }
    
    setFilteredJobs(filtered);
  };

  // Update filtered jobs when jobs change
  useEffect(() => {
    filterJobs(currentFilters);
  }, [jobs]);

  const value = {
    jobs,
    applications,
    filteredJobs,
    loading,
    createJob,
    updateJob,
    deleteJob,
    getJobById,
    applyToJob,
    getUserApplications,
    getJobApplications,
    updateApplicationStatus,
    filterJobs,
    currentFilters
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};