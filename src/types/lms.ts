// Type definitions for LMS Dashboard

export interface User {
  id: string
  name: string
  email: string
  role: 'employee' | 'hr' | 'admin'
  department: string
  position: string
  avatar: string
  skills: string[]
  skillLevels: Record<string, number>
  completedCourses: number
  inProgressCourses: number
  joinDate: string
  lastLogin: string
}

export interface Course {
  id: string
  title: string
  description: string
  category: string
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  instructor: string
  rating: number
  enrolledCount: number
  image: string
  tags: string[]
  completionRate: number
}

export interface Skill {
  id: string
  name: string
  category: string
  level: number
  maxLevel: number
  progress: number
  lastUpdated: string
}

export interface Goal {
  id: string
  title: string
  description: string
  status: 'not-started' | 'in-progress' | 'completed'
  progress: number
  dueDate: string
}

export interface IDP {
  id: string
  employeeId: string
  title: string
  status: 'draft' | 'active' | 'completed' | 'archived'
  progress: number
  startDate: string
  endDate: string
  goals: Goal[]
  skillGaps: string[]
  recommendations: string[]
}

export interface Notification {
  id: string
  type: 'deadline' | 'training' | 'achievement' | 'feedback' | 'system'
  title: string
  message: string
  date: string
  read: boolean
  priority: 'low' | 'medium' | 'high'
}

export interface AnalyticsData {
  totalEmployees: number
  activeUsers: number
  coursesCompleted: number
  skillGapsClosed: number
  avgCompletionRate: number
  trainingROI: number
  departmentProgress: Array<{
    department: string
    completion: number
    employees: number
  }>
  skillDistribution: Array<{
    skill: string
    count: number
    level: string
  }>
  monthlyProgress: Array<{
    month: string
    completed: number
    enrolled: number
  }>
}

export interface AuthContext {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

export interface DashboardStats {
  totalCourses: number
  completedCourses: number
  inProgressCourses: number
  skillsAcquired: number
  certificationsEarned: number
  hoursLearned: number
}

export interface Mentor {
  id: string
  name: string
  department: string
  skills: string[]
  rating: number
  availability: string
  avatar: string
}

export interface JobRotation {
  id: string
  title: string
  department: string
  duration: string
  requirements: string[]
  description: string
  applications: number
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
  read: boolean
  type: 'direct' | 'group' | 'announcement'
}