import { Job, User, Application } from '../types';

// Mock users data
export const users: User[] = [
  {
    id: '1',
    email: 'employer@example.com',
    name: 'Tech Solutions Inc.',
    role: 'employer',
    company: 'Tech Solutions Inc.',
    location: 'San Francisco, CA',
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    email: 'jobseeker@example.com',
    name: 'John Doe',
    role: 'jobSeeker',
    title: 'Software Developer',
    location: 'New York, NY',
    createdAt: new Date('2023-02-10')
  },
  {
    id: '3',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date('2023-01-01')
  }
];

// Mock jobs data
export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Tech Solutions Inc.',
    location: 'San Francisco, CA',
    description: 'We are looking for an experienced Frontend Developer proficient in React, TypeScript, and modern CSS frameworks to join our growing team.',
    requirements: [
      'Minimum 4 years of experience with React',
      'Strong TypeScript skills',
      'Experience with modern CSS frameworks like Tailwind',
      'Knowledge of state management solutions',
      'Bachelor degree in Computer Science or related field'
    ],
    salary: '$120,000 - $150,000',
    category: 'Engineering',
    type: 'full-time',
    employerId: '1',
    createdAt: new Date('2023-05-15'),
    deadline: new Date('2023-07-15'),
    isActive: true
  },
  {
    id: '2',
    title: 'Backend Developer',
    company: 'Data Systems Co.',
    location: 'Remote',
    description: 'Looking for a backend developer with strong Node.js skills to help build scalable APIs and microservices.',
    requirements: [
      'Experience with Node.js and Express',
      'Knowledge of SQL and NoSQL databases',
      'Understanding of microservices architecture',
      'Good communication skills'
    ],
    salary: '$100,000 - $130,000',
    category: 'Engineering',
    type: 'remote',
    employerId: '1',
    createdAt: new Date('2023-05-20'),
    deadline: new Date('2023-07-20'),
    isActive: true
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    company: 'Creative Agency Ltd',
    location: 'Los Angeles, CA',
    description: 'Join our creative team to design beautiful and functional user interfaces for web and mobile applications.',
    requirements: [
      'Portfolio demonstrating UI/UX skills',
      'Experience with Figma and Adobe Creative Suite',
      'Understanding of user-centered design principles',
      'Knowledge of frontend implementation constraints'
    ],
    salary: '$90,000 - $120,000',
    category: 'Design',
    type: 'full-time',
    employerId: '1',
    createdAt: new Date('2023-05-25'),
    deadline: new Date('2023-07-25'),
    isActive: true
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'Cloud Services Inc.',
    location: 'Seattle, WA',
    description: 'Help us build and maintain our cloud infrastructure and deployment pipelines.',
    requirements: [
      'Experience with AWS or Azure',
      'Knowledge of Docker and Kubernetes',
      'Familiarity with CI/CD pipelines',
      'Linux system administration skills'
    ],
    salary: '$130,000 - $160,000',
    category: 'Operations',
    type: 'full-time',
    employerId: '1',
    createdAt: new Date('2023-06-01'),
    deadline: new Date('2023-08-01'),
    isActive: true
  },
  {
    id: '5',
    title: 'Marketing Specialist',
    company: 'Growth Hackers',
    location: 'Chicago, IL',
    description: 'Join our marketing team to create and execute digital marketing campaigns.',
    requirements: [
      'Experience with digital marketing channels',
      'Knowledge of SEO and SEM',
      'Data analysis skills',
      'Creative problem solving'
    ],
    salary: '$70,000 - $90,000',
    category: 'Marketing',
    type: 'part-time',
    employerId: '1',
    createdAt: new Date('2023-06-05'),
    deadline: new Date('2023-08-05'),
    isActive: true
  },
  {
    id: '6',
    title: 'Product Manager',
    company: 'Tech Solutions Inc.',
    location: 'San Francisco, CA',
    description: 'We need an experienced product manager to lead the development of our SaaS products.',
    requirements: [
      'Experience managing software products',
      'Strong communication and leadership skills',
      'Ability to work with technical and non-technical stakeholders',
      'Agile/Scrum experience'
    ],
    salary: '$130,000 - $160,000',
    category: 'Product',
    type: 'full-time',
    employerId: '1',
    createdAt: new Date('2023-06-10'),
    deadline: new Date('2023-08-10'),
    isActive: true
  }
];

// Mock applications data
export const applications: Application[] = [
  {
    id: '1',
    jobId: '1',
    userId: '2',
    name: 'John Doe',
    email: 'john.doe@example.com',
    coverLetter: 'I am excited to apply for this position as I have extensive experience with React and TypeScript...',
    resumeUrl: 'https://example.com/resume/johndoe.pdf',
    status: 'pending',
    createdAt: new Date('2023-06-01')
  },
  {
    id: '2',
    jobId: '2',
    userId: '2',
    name: 'John Doe',
    email: 'john.doe@example.com',
    coverLetter: 'I believe my backend development skills would be a perfect match for this role...',
    resumeUrl: 'https://example.com/resume/johndoe.pdf',
    status: 'reviewed',
    createdAt: new Date('2023-06-02')
  }
];

// Common categories for jobs
export const jobCategories = [
  'Engineering',
  'Design',
  'Marketing',
  'Sales',
  'Customer Service',
  'Operations',
  'Finance',
  'HR',
  'Product',
  'Legal'
];

// Job types
export const jobTypes = [
  'full-time',
  'part-time',
  'contract',
  'remote'
];

// Common locations
export const locations = [
  'San Francisco, CA',
  'New York, NY',
  'Seattle, WA',
  'Austin, TX',
  'Chicago, IL',
  'Los Angeles, CA',
  'Boston, MA',
  'Remote'
];