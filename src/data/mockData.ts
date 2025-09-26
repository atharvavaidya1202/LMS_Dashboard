// Mock data for Power Grid Corporation of India Limited LMS Dashboard
import { User, Course, Skill, IDP, Notification, AnalyticsData } from '../types/lms'

export const mockUsers: User[] = [
  // Core User (Employee)
  {
    id: '1',
    name: 'Atharva Vaidya',
    email: 'atharva.vaidya@powergridindia.com',
    role: 'employee',
    department: 'Grid Operations',
    position: 'Grid Operations Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    skills: ['Grid Operations', 'Power System Analysis', 'SCADA Systems', 'Load Dispatch'],
    skillLevels: { 'Grid Operations': 85, 'Power System Analysis': 78, 'SCADA Systems': 82, 'Load Dispatch': 75 },
    completedCourses: 12,
    inProgressCourses: 3,
    joinDate: '2022-03-15',
    lastLogin: '2025-01-15T10:30:00Z'
  },
  // Extended Team Members
  {
    id: '2',
    name: 'Soham Patil',
    email: 'soham.patil@powergridindia.com',
    role: 'employee',
    department: 'Transmission Engineering',
    position: 'Senior Electrical Engineer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    skills: ['Power System Planning', 'Grid Management', 'Electrical Safety', 'Transmission Lines'],
    skillLevels: { 'Power System Planning': 92, 'Grid Management': 88, 'Electrical Safety': 95, 'Transmission Lines': 85 },
    completedCourses: 18,
    inProgressCourses: 2,
    joinDate: '2021-08-10',
    lastLogin: '2025-01-15T11:45:00Z'
  },
  {
    id: '3',
    name: 'Aditya Pharande',
    email: 'aditya.pharande@powergridindia.com',
    role: 'employee',
    department: 'Operations Management',
    position: 'Operations Manager - Transmission Projects',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    skills: ['Transmission Projects', 'Operations Excellence', 'Project Management', 'Electrical Safety'],
    skillLevels: { 'Transmission Projects': 90, 'Operations Excellence': 87, 'Project Management': 84, 'Electrical Safety': 92 },
    completedCourses: 15,
    inProgressCourses: 1,
    joinDate: '2020-05-12',
    lastLogin: '2025-01-15T09:15:00Z'
  },
  {
    id: '4',
    name: 'Neha Kedar',
    email: 'neha.kedar@powergridindia.com',
    role: 'employee',
    department: 'IT & Digital',
    position: 'IT & Digital Manager / Renewable Integration Specialist',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    skills: ['Renewable Integration', 'Digital Transformation', 'Smart Grid Tech', 'Data Analytics'],
    skillLevels: { 'Renewable Integration': 89, 'Digital Transformation': 85, 'Smart Grid Tech': 82, 'Data Analytics': 78 },
    completedCourses: 16,
    inProgressCourses: 2,
    joinDate: '2021-11-20',
    lastLogin: '2025-01-15T08:45:00Z'
  },
  // HR Manager
  {
    id: '5',
    name: 'Shashank Ponna',
    email: 'shashank.ponna@powergridindia.com',
    role: 'hr',
    department: 'Human Resources',
    position: 'HR Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    skills: ['Talent Management', 'Performance Review', 'Learning Strategy', 'Team Development'],
    skillLevels: { 'Talent Management': 90, 'Performance Review': 85, 'Learning Strategy': 88, 'Team Development': 82 },
    completedCourses: 22,
    inProgressCourses: 2,
    joinDate: '2019-07-15',
    lastLogin: '2025-01-15T08:30:00Z'
  },
  // Administrator
  {
    id: '6',
    name: 'Vivek Dalimbkar',
    email: 'vivek.dalimbkar@powergridindia.com',
    role: 'admin',
    department: 'Corporate Administration',
    position: 'Corporate Administrator',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    skills: ['System Administration', 'Security Management', 'Corporate Governance', 'Strategic Planning'],
    skillLevels: { 'System Administration': 95, 'Security Management': 88, 'Corporate Governance': 92, 'Strategic Planning': 85 },
    completedCourses: 28,
    inProgressCourses: 2,
    joinDate: '2018-02-15',
    lastLogin: '2025-01-15T06:00:00Z'
  },
  // Additional Context Staff
  {
    id: '7',
    name: 'Priya Deshmukh',
    email: 'priya.deshmukh@powergridindia.com',
    role: 'employee',
    department: 'Transmission Engineering',
    position: 'Transmission Engineering Manager',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    skills: ['Transmission Engineering', 'Project Planning', 'Technical Leadership', 'Grid Design'],
    skillLevels: { 'Transmission Engineering': 93, 'Project Planning': 87, 'Technical Leadership': 85, 'Grid Design': 90 },
    completedCourses: 20,
    inProgressCourses: 1,
    joinDate: '2019-03-10',
    lastLogin: '2025-01-15T07:20:00Z'
  },
  {
    id: '8',
    name: 'Arjun Nair',
    email: 'arjun.nair@powergridindia.com',
    role: 'employee',
    department: 'Renewables Integration',
    position: 'Renewables Integration Manager',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    skills: ['Renewable Energy', 'Grid Integration', 'Clean Energy Tech', 'Sustainability'],
    skillLevels: { 'Renewable Energy': 91, 'Grid Integration': 86, 'Clean Energy Tech': 83, 'Sustainability': 88 },
    completedCourses: 17,
    inProgressCourses: 3,
    joinDate: '2020-09-05',
    lastLogin: '2025-01-15T07:45:00Z'
  },
  {
    id: '9',
    name: 'Ravi Kumar',
    email: 'ravi.kumar@powergridindia.com',
    role: 'employee',
    department: 'Finance & Audit',
    position: 'Finance & Audit Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    skills: ['Financial Analysis', 'Audit Management', 'Budget Planning', 'Risk Assessment'],
    skillLevels: { 'Financial Analysis': 89, 'Audit Management': 92, 'Budget Planning': 86, 'Risk Assessment': 84 },
    completedCourses: 14,
    inProgressCourses: 2,
    joinDate: '2020-01-20',
    lastLogin: '2025-01-15T08:15:00Z'
  }
]

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Advanced Grid Management Certification',
    description: 'Master advanced power grid management, control systems, and stability analysis',
    category: 'Technical Skills',
    duration: '8 weeks',
    difficulty: 'Advanced',
    instructor: 'Dr. Rajesh Sharma',
    rating: 4.8,
    enrolledCount: 124,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop',
    tags: ['Grid Management', 'Power Systems', 'Control Systems'],
    completionRate: 87
  },
  {
    id: '2',
    title: 'Electrical Safety Workshop',
    description: 'Comprehensive electrical safety protocols and emergency procedures for transmission systems',
    category: 'Safety & Compliance',
    duration: '4 weeks',
    difficulty: 'Intermediate',
    instructor: 'Priya Deshmukh',
    rating: 4.9,
    enrolledCount: 189,
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=300&h=200&fit=crop',
    tags: ['Safety', 'Electrical', 'Protocols'],
    completionRate: 95
  },
  {
    id: '3',
    title: 'Renewable Integration Bootcamp',
    description: 'Learn renewable energy integration techniques and smart grid technologies',
    category: 'Digital Transformation',
    duration: '6 weeks',
    difficulty: 'Advanced',
    instructor: 'Arjun Nair',
    rating: 4.7,
    enrolledCount: 97,
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=300&h=200&fit=crop',
    tags: ['Renewable Energy', 'Smart Grid', 'Integration'],
    completionRate: 82
  },
  {
    id: '4',
    title: 'Leadership in Power Sector',
    description: 'Develop leadership skills specific to power transmission and infrastructure management',
    category: 'Leadership & Management',
    duration: '8 weeks',
    difficulty: 'Intermediate',
    instructor: 'Vivek Dalimbkar',
    rating: 4.8,
    enrolledCount: 156,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop',
    tags: ['Leadership', 'Management', 'Power Sector'],
    completionRate: 78
  },
  {
    id: '5',
    title: 'Power System Data Analytics',
    description: 'Learn data analysis techniques for power system optimization and predictive maintenance',
    category: 'Digital Transformation',
    duration: '10 weeks',
    difficulty: 'Advanced',
    instructor: 'Neha Kedar',
    rating: 4.6,
    enrolledCount: 143,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
    tags: ['Data Analytics', 'Power Systems', 'AI/ML'],
    completionRate: 73
  },
  {
    id: '6',
    title: 'SCADA Systems Operations',
    description: 'Master SCADA system operations for grid monitoring and control',
    category: 'Technical Skills',
    duration: '5 weeks',
    difficulty: 'Intermediate',
    instructor: 'Soham Patil',
    rating: 4.7,
    enrolledCount: 112,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop',
    tags: ['SCADA', 'Grid Operations', 'Monitoring'],
    completionRate: 89
  }
]

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'deadline',
    title: 'Grid Operations IDP Review Due Soon',
    message: 'Your Individual Development Plan review is due in 3 days - contact Shashank Ponna',
    date: '2025-01-15T10:00:00Z',
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'training',
    title: 'New Power System Course Available',
    message: 'Advanced Grid Management Certification course is now available for enrollment',
    date: '2025-01-14T15:30:00Z',
    read: false,
    priority: 'medium'
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Power Systems Badge Earned',
    message: 'Congratulations! You earned the Grid Operations Specialist badge',
    date: '2025-01-13T09:20:00Z',
    read: true,
    priority: 'low'
  },
  {
    id: '4',
    type: 'feedback',
    title: 'Mentor Feedback from Neha Kedar',
    message: 'Your mentor has provided feedback on your SCADA systems practical assignment',
    date: '2025-01-12T14:45:00Z',
    read: true,
    priority: 'medium'
  },
  {
    id: '5',
    type: 'training',
    title: 'Safety Protocol Update',
    message: 'New electrical safety protocols have been released - mandatory training required',
    date: '2025-01-11T08:00:00Z',
    read: false,
    priority: 'high'
  },
  {
    id: '6',
    type: 'system',
    title: 'PowerGrid LMS System Maintenance',
    message: 'Scheduled maintenance on Jan 18, 2025 from 2-4 AM IST',
    date: '2025-01-10T16:00:00Z',
    read: true,
    priority: 'medium'
  }
]

export const mockAnalytics: AnalyticsData = {
  totalEmployees: 500,
  activeUsers: 380,
  coursesCompleted: 2845,
  skillGapsClosed: 456,
  avgCompletionRate: 78,
  trainingROI: 285,
  departmentProgress: [
    { department: 'Transmission Engineering', completion: 88, employees: 150, budget: '₹54.2 Cr' },
    { department: 'Grid Operations', completion: 79, employees: 100, budget: '₹32.5 Cr' },
    { department: 'Renewables Integration', completion: 82, employees: 85, budget: '₹42.8 Cr' },
    { department: 'IT & Digital', completion: 85, employees: 70, budget: '₹38.6 Cr' },
    { department: 'Finance & Audit', completion: 87, employees: 55, budget: '₹19.4 Cr' },
    { department: 'Human Resources', completion: 95, employees: 40, budget: '₹22.4 Cr' }
  ],
  skillDistribution: [
    { skill: 'Power System Planning', count: 234, level: 'Advanced' },
    { skill: 'Grid Management', count: 456, level: 'Intermediate' },
    { skill: 'Electrical Safety', count: 398, level: 'Advanced' },
    { skill: 'Renewable Integration', count: 167, level: 'Intermediate' },
    { skill: 'Digital Transformation', count: 123, level: 'Beginner' },
    { skill: 'SCADA Systems', count: 189, level: 'Intermediate' }
  ],
  monthlyProgress: [
    { month: 'Jul', completed: 52, enrolled: 89 },
    { month: 'Aug', completed: 68, enrolled: 95 },
    { month: 'Sep', completed: 61, enrolled: 102 },
    { month: 'Oct', completed: 74, enrolled: 108 },
    { month: 'Nov', completed: 71, enrolled: 94 },
    { month: 'Dec', completed: 89, enrolled: 101 },
    { month: 'Jan', completed: 73, enrolled: 112 }
  ]
}

// Mock IDP data for Power Grid Corporation
export const mockIDPs: IDP[] = [
  {
    id: '1',
    employeeId: '1',
    title: 'Grid Operations Specialist to Senior Engineer Transition',
    status: 'active',
    progress: 65,
    startDate: '2024-09-01',
    endDate: '2025-08-31',
    goals: [
      {
        id: '1',
        title: 'Complete Advanced Grid Management Certification',
        description: 'Obtain Advanced Grid Management certification for senior role progression',
        status: 'in-progress',
        progress: 70,
        dueDate: '2025-03-01'
      },
      {
        id: '2',
        title: 'Lead Grid Optimization Project',
        description: 'Successfully lead a grid optimization project involving multiple substations',
        status: 'not-started',
        progress: 0,
        dueDate: '2025-06-01'
      },
      {
        id: '3',
        title: 'Mentor Junior Grid Operators',
        description: 'Mentor at least 2 junior grid operations engineers',
        status: 'completed',
        progress: 100,
        dueDate: '2024-12-01'
      }
    ],
    skillGaps: ['Advanced Grid Management', 'Team Leadership', 'Power System Planning'],
    recommendations: [
      'Enroll in Advanced Grid Management Certification course',
      'Schedule mentoring sessions with Soham Patil',
      'Join the Grid Operations Review Committee'
    ]
  },
  {
    id: '2',
    employeeId: '2',
    title: 'Senior Engineer to Engineering Manager Path',
    status: 'active',
    progress: 78,
    startDate: '2024-06-01',
    endDate: '2025-05-31',
    goals: [
      {
        id: '1',
        title: 'Leadership in Power Sector Certification',
        description: 'Complete leadership development program for power sector management',
        status: 'completed',
        progress: 100,
        dueDate: '2024-12-01'
      },
      {
        id: '2',
        title: 'Strategic Planning Workshop',
        description: 'Attend strategic planning workshop for transmission engineering',
        status: 'in-progress',
        progress: 60,
        dueDate: '2025-02-15'
      }
    ],
    skillGaps: ['Strategic Planning', 'Budget Management'],
    recommendations: [
      'Complete Strategic Planning Workshop',
      'Shadow current engineering managers',
      'Participate in budget planning exercises'
    ]
  }
]

// Additional department budget data
export const departmentBudgets = [
  { department: 'Transmission Engineering', allocated: 5420000000, used: 2850000000, manager: 'Priya Deshmukh' }, // ₹54.2 Cr
  { department: 'Renewables Integration', allocated: 4280000000, used: 2456000000, manager: 'Arjun Nair' }, // ₹42.8 Cr
  { department: 'IT & Digital', allocated: 3860000000, used: 2234000000, manager: 'Neha Kedar' }, // ₹38.6 Cr
  { department: 'Human Resources', allocated: 2240000000, used: 1890000000, manager: 'Shashank Ponna' }, // ₹22.4 Cr
  { department: 'Finance & Audit', allocated: 1940000000, used: 1456000000, manager: 'Ravi Kumar' } // ₹19.4 Cr
]

// Helper function to format Indian currency
export const formatINR = (amount: number): string => {
  // Convert to crores
  if (amount >= 10000000) {
    const crores = amount / 10000000
    return `₹${crores.toFixed(1)} Cr`
  }
  // Convert to lakhs  
  if (amount >= 100000) {
    const lakhs = amount / 100000
    return `₹${lakhs.toFixed(1)} L`
  }
  // For smaller amounts
  return `₹${amount.toLocaleString('en-IN')}`
}

// Learning mentorship network data
export const mentorshipNetwork = [
  { mentorId: '3', mentorName: 'Aditya Pharande', menteeId: '2', menteeName: 'Soham Patil', focus: 'Electrical Systems & Safety' },
  { mentorId: '4', mentorName: 'Neha Kedar', menteeId: '1', menteeName: 'Atharva Vaidya', focus: 'Grid Operations Optimization' },
  { mentorId: '2', mentorName: 'Soham Patil', menteeId: '4', menteeName: 'Neha Kedar', focus: 'Renewable Energy Integration' }
]