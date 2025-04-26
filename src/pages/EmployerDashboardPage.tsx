import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Edit2, Trash2, Users, Eye } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import { Job, Application } from '../types';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';
import Select from '../components/ui/Select';
import Alert from '../components/ui/Alert';
import { jobCategories, jobTypes, locations } from '../data/mockData';

const EmployerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { jobs, applications, createJob, updateJob, deleteJob, getJobApplications, loading } = useJobs();
  
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [viewApplications, setViewApplications] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // New job form state
  const [jobForm, setJobForm] = useState({
    title: '',
    company: currentUser?.company || '',
    location: '',
    description: '',
    requirements: '',
    salary: '',
    category: 'Engineering',
    type: 'full-time' as 'full-time' | 'part-time' | 'contract' | 'remote',
    deadline: '',
    isActive: true
  });

  // Filter only this employer's jobs
  const employerJobs = currentUser ? jobs.filter(job => job.employerId === currentUser.id) : [];

  // Redirect if not an employer
  if (currentUser && currentUser.role !== 'employer') {
    navigate('/');
    return null;
  }

  // Redirect if not logged in
  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const resetForm = () => {
    setJobForm({
      title: '',
      company: currentUser?.company || '',
      location: '',
      description: '',
      requirements: '',
      salary: '',
      category: 'Engineering',
      type: 'full-time',
      deadline: '',
      isActive: true
    });
    setEditingJob(null);
  };

  const handleShowJobForm = () => {
    resetForm();
    setShowJobForm(true);
  };

  const handleEditJob = (job: Job) => {
    // Set form values from job
    setJobForm({
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      requirements: job.requirements.join('\n'),
      salary: job.salary || '',
      category: job.category,
      type: job.type,
      deadline: job.deadline ? new Date(job.deadline).toISOString().split('T')[0] : '',
      isActive: job.isActive
    });
    setEditingJob(job);
    setShowJobForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    // Handle checkbox separately
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setJobForm(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setJobForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    try {
      const requirementsArray = jobForm.requirements
        .split('\n')
        .map(req => req.trim())
        .filter(req => req !== '');
      
      if (requirementsArray.length === 0) {
        setError('Please enter at least one requirement');
        return;
      }
      
      const jobData = {
        title: jobForm.title,
        company: jobForm.company,
        location: jobForm.location,
        description: jobForm.description,
        requirements: requirementsArray,
        salary: jobForm.salary || undefined,
        category: jobForm.category,
        type: jobForm.type,
        employerId: currentUser!.id,
        deadline: jobForm.deadline ? new Date(jobForm.deadline) : undefined,
        isActive: jobForm.isActive
      };
      
      if (editingJob) {
        await updateJob(editingJob.id, jobData);
        setSuccess('Job updated successfully!');
      } else {
        await createJob(jobData);
        setSuccess('Job created successfully!');
      }
      
      setShowJobForm(false);
      resetForm();
    } catch (err) {
      setError('There was an error saving the job. Please try again.');
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job posting? This action cannot be undone.')) {
      try {
        await deleteJob(jobId);
        setSuccess('Job deleted successfully');
      } catch (err) {
        setError('There was an error deleting the job');
      }
    }
  };

  const handleViewApplications = (jobId: string) => {
    setViewApplications(jobId);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const currentJobApplications = viewApplications 
    ? getJobApplications(viewApplications) 
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employer Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Manage your job postings and applications
            </p>
          </div>
          <Button 
            variant="primary" 
            icon={<PlusCircle className="h-5 w-5 mr-1" />}
            onClick={handleShowJobForm}
          >
            Post a New Job
          </Button>
        </div>

        {success && (
          <Alert 
            variant="success" 
            message={success} 
            onClose={() => setSuccess(null)} 
            className="mb-6"
          />
        )}
        
        {error && (
          <Alert 
            variant="error" 
            message={error} 
            onClose={() => setError(null)} 
            className="mb-6"
          />
        )}

        {/* Job Form */}
        {showJobForm && (
          <Card className="mb-8 animate-fadeIn">
            <CardHeader>
              <h2 className="text-xl font-semibold">{editingJob ? 'Edit Job Posting' : 'Create New Job Posting'}</h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Job Title"
                    name="title"
                    value={jobForm.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Senior Frontend Developer"
                    required
                    fullWidth
                  />
                  
                  <Input
                    label="Company"
                    name="company"
                    value={jobForm.company}
                    onChange={handleInputChange}
                    placeholder="Your company name"
                    required
                    fullWidth
                  />
                  
                  <Select
                    label="Location"
                    name="location"
                    value={jobForm.location}
                    onChange={handleInputChange}
                    options={[
                      { value: '', label: 'Select a location' },
                      ...locations.map(loc => ({ value: loc, label: loc }))
                    ]}
                    required
                    fullWidth
                  />
                  
                  <Input
                    label="Salary (Optional)"
                    name="salary"
                    value={jobForm.salary}
                    onChange={handleInputChange}
                    placeholder="e.g. $80,000 - $100,000"
                    fullWidth
                  />
                  
                  <Select
                    label="Category"
                    name="category"
                    value={jobForm.category}
                    onChange={handleInputChange}
                    options={jobCategories.map(cat => ({ value: cat, label: cat }))}
                    required
                    fullWidth
                  />
                  
                  <Select
                    label="Job Type"
                    name="type"
                    value={jobForm.type}
                    onChange={handleInputChange}
                    options={jobTypes.map(type => ({ 
                      value: type, 
                      label: type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
                    }))}
                    required
                    fullWidth
                  />
                  
                  <Input
                    label="Application Deadline (Optional)"
                    name="deadline"
                    type="date"
                    value={jobForm.deadline}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  
                  <div className="flex items-center mt-4">
                    <input
                      id="isActive"
                      name="isActive"
                      type="checkbox"
                      checked={jobForm.isActive}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                      Active Job Posting
                    </label>
                  </div>
                </div>
                
                <TextArea
                  label="Job Description"
                  name="description"
                  value={jobForm.description}
                  onChange={handleInputChange}
                  placeholder="Describe the job role, responsibilities, and what you're looking for..."
                  rows={6}
                  required
                  fullWidth
                />
                
                <TextArea
                  label="Requirements"
                  name="requirements"
                  value={jobForm.requirements}
                  onChange={handleInputChange}
                  placeholder="Enter each requirement on a new line"
                  helperText="Enter each requirement on a new line"
                  rows={6}
                  required
                  fullWidth
                />
                
                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowJobForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    isLoading={loading}
                  >
                    {editingJob ? 'Update Job' : 'Post Job'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Job Listings */}
        {!viewApplications ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">Your Job Postings</h2>
            
            {employerJobs.length === 0 ? (
              <Card>
                <CardContent className="text-center py-16">
                  <p className="text-gray-500 mb-4">You haven't posted any jobs yet.</p>
                  <Button 
                    variant="primary" 
                    icon={<PlusCircle className="h-5 w-5 mr-1" />}
                    onClick={handleShowJobForm}
                  >
                    Post Your First Job
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Posted Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applications
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {employerJobs.map((job) => {
                      const jobApplications = getJobApplications(job.id);
                      
                      return (
                        <tr key={job.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{job.title}</div>
                            <div className="text-sm text-gray-500">{job.company}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {job.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(job.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              job.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {job.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button 
                              className="text-blue-700 hover:text-blue-900 flex items-center"
                              onClick={() => handleViewApplications(job.id)}
                            >
                              <Users className="h-4 w-4 mr-1" />
                              {jobApplications.length}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button 
                                className="text-blue-700 hover:text-blue-900"
                                onClick={() => navigate(`/jobs/${job.id}`)}
                              >
                                <Eye className="h-5 w-5" />
                              </button>
                              <button 
                                className="text-indigo-700 hover:text-indigo-900"
                                onClick={() => handleEditJob(job)}
                              >
                                <Edit2 className="h-5 w-5" />
                              </button>
                              <button 
                                className="text-red-600 hover:text-red-900"
                                onClick={() => handleDeleteJob(job.id)}
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          // Applications View
          <>
            <div className="mb-6">
              <button 
                onClick={() => setViewApplications(null)}
                className="text-blue-700 hover:text-blue-900 flex items-center"
              >
                <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to Job Postings
              </button>
            </div>
            
            <h2 className="text-2xl font-semibold mb-4">
              Applications for {jobs.find(j => j.id === viewApplications)?.title}
            </h2>
            
            {currentJobApplications.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-gray-500">
                    No applications have been received for this job yet.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {currentJobApplications.map((application: Application) => (
                  <Card key={application.id}>
                    <CardContent>
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-4 md:mb-0">
                          <h3 className="text-lg font-semibold">{application.name}</h3>
                          <p className="text-gray-600">{application.email}</p>
                          <p className="text-gray-500 text-sm">
                            Applied on {formatDate(application.createdAt)}
                          </p>
                          
                          <div className="mt-4">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              application.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : application.status === 'reviewed'
                                ? 'bg-blue-100 text-blue-800'
                                : application.status === 'shortlisted'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Select
                            value={application.status}
                            onChange={(e) => {
                              // In a real app, this would update the application status
                              console.log('Update status to:', e.target.value);
                            }}
                            options={[
                              { value: 'pending', label: 'Pending' },
                              { value: 'reviewed', label: 'Reviewed' },
                              { value: 'shortlisted', label: 'Shortlisted' },
                              { value: 'rejected', label: 'Rejected' }
                            ]}
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="font-medium mb-2">Cover Letter</h4>
                        <div className="bg-gray-50 p-4 rounded-md text-gray-700">
                          <p>{application.coverLetter}</p>
                        </div>
                      </div>
                      
                      {application.resumeUrl && (
                        <div className="mt-4">
                          <a 
                            href={application.resumeUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-700 hover:text-blue-900 font-medium flex items-center"
                          >
                            <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m-9 3h10.5a7.5 7.5 0 100-15H6"></path>
                            </svg>
                            View Resume
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboardPage;