import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  Building,
  ChevronLeft,
  Share2,
  Bookmark,
  CheckCircle
} from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import Card, { CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';
import Alert from '../components/ui/Alert';

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJobById, applyToJob, loading } = useJobs();
  const { currentUser } = useAuth();
  
  const job = getJobById(id || '');
  
  const [applicationData, setApplicationData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    coverLetter: '',
    resumeUrl: ''
  });
  
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-8">
            The job you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/jobs">
            <Button variant="primary">Browse All Jobs</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleApplyClick = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    setShowApplicationForm(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!applicationData.coverLetter) {
      setError('Please provide a cover letter');
      return;
    }
    
    try {
      if (!currentUser) {
        throw new Error('You must be logged in to apply');
      }
      
      await applyToJob(job.id, {
        ...applicationData,
        userId: currentUser.id
      });
      
      setApplicationSubmitted(true);
      setShowApplicationForm(false);
    } catch (err) {
      setError('There was an error submitting your application. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link 
            to="/jobs" 
            className="inline-flex items-center text-blue-700 hover:text-blue-800 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to all jobs
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent>
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                  <div className="flex items-center text-gray-700 mb-4">
                    <Building className="h-5 w-5 mr-1" />
                    <span className="font-medium">{job.company}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-1 text-gray-500" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-1 text-gray-500" />
                      <span className="capitalize">{job.type.replace('-', ' ')}</span>
                    </div>
                    {job.salary && (
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 mr-1 text-gray-500" />
                        <span>{job.salary}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-1 text-gray-500" />
                      <span>Posted: {formatDate(job.createdAt)}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {job.category}
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                  <div className="prose max-w-none text-gray-700">
                    <p className="mb-4">{job.description}</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              
              <CardFooter>
                <div className="flex flex-wrap gap-4 justify-between items-center">
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      icon={<Share2 className="h-4 w-4" />}
                    >
                      Share
                    </Button>
                    <Button 
                      variant="outline" 
                      icon={<Bookmark className="h-4 w-4" />}
                    >
                      Save
                    </Button>
                  </div>
                  
                  {currentUser?.role !== 'employer' && !applicationSubmitted && (
                    <Button 
                      onClick={handleApplyClick}
                      isLoading={loading}
                    >
                      Apply Now
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
            
            {showApplicationForm && (
              <Card className="mt-8 animate-fadeIn">
                <CardContent>
                  <h2 className="text-xl font-semibold mb-4">Apply for this position</h2>
                  
                  {error && (
                    <Alert 
                      variant="error" 
                      message={error} 
                      onClose={() => setError(null)} 
                      className="mb-6"
                    />
                  )}
                  
                  <form onSubmit={handleSubmitApplication} className="space-y-6">
                    <Input
                      label="Full Name"
                      name="name"
                      value={applicationData.name}
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                    
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={applicationData.email}
                      onChange={handleInputChange}
                      required
                      fullWidth
                    />
                    
                    <TextArea
                      label="Cover Letter"
                      name="coverLetter"
                      value={applicationData.coverLetter}
                      onChange={handleInputChange}
                      placeholder="Explain why you're a good fit for this position..."
                      rows={6}
                      required
                      fullWidth
                    />
                    
                    <Input
                      label="Resume URL (Optional)"
                      name="resumeUrl"
                      type="url"
                      value={applicationData.resumeUrl}
                      onChange={handleInputChange}
                      placeholder="https://example.com/resume.pdf"
                      helperText="Provide a link to your resume if available"
                      fullWidth
                    />
                    
                    <div className="flex justify-end space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowApplicationForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        isLoading={loading}
                      >
                        Submit Application
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
            
            {applicationSubmitted && (
              <Card className="mt-8 bg-green-50 animate-fadeIn">
                <CardContent>
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                    <div>
                      <h3 className="text-xl font-semibold text-green-700">Application Submitted!</h3>
                      <p className="text-green-600">
                        Your application has been submitted successfully. The employer will contact you if they're interested.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent>
                <h2 className="text-xl font-semibold mb-4">Company Information</h2>
                <div className="flex items-center mb-4">
                  <div className="bg-gray-200 rounded-full p-3 mr-3">
                    <Building className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">{job.company}</h3>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  This company is looking for a talented {job.title} to join their team.
                </p>
                <Button variant="outline" fullWidth>
                  View Company Profile
                </Button>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardContent>
                <h2 className="text-xl font-semibold mb-4">Similar Jobs</h2>
                <div className="space-y-4">
                  <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Link to="#" className="block">
                      <h3 className="font-medium text-blue-700">Frontend Developer</h3>
                      <p className="text-sm text-gray-600 mt-1">Creative Agency Inc.</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>New York, NY</span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Link to="#" className="block">
                      <h3 className="font-medium text-blue-700">Full Stack Developer</h3>
                      <p className="text-sm text-gray-600 mt-1">Tech Innovations</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>Remote</span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Link to="#" className="block">
                      <h3 className="font-medium text-blue-700">UI/UX Designer</h3>
                      <p className="text-sm text-gray-600 mt-1">Digital Products Inc.</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>San Francisco, CA</span>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Link 
                    to="/jobs" 
                    className="text-blue-700 hover:text-blue-800 font-medium"
                  >
                    View All Jobs
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;