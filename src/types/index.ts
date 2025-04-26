export interface User {
  id: string;
  email: string;
  name: string;
  role: 'employer' | 'jobSeeker' | 'admin';
  company?: string;
  title?: string;
  location?: string;
  createdAt: Date;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary?: string;
  category: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  employerId: string;
  createdAt: Date;
  deadline?: Date;
  isActive: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  name: string;
  email: string;
  coverLetter: string;
  resumeUrl?: string;
  status: 'pending' | 'reviewed' | 'rejected' | 'shortlisted';
  createdAt: Date;
}

export interface JobFilter {
  search?: string;
  location?: string;
  category?: string;
  type?: string;
}