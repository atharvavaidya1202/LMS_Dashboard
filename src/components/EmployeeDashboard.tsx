import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useAuth } from '../contexts/AuthContext'
import { mockCourses, mockNotifications, mockIDPs } from '../data/mockData'
import {
  BookOpen,
  Target,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Play,
  Calendar,
  Users,

  LogOut,
  Brain,
  Sparkles,
  Database,
  Activity,
  HelpCircle,
  Radar
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, RadialBarChart, RadialBar, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

const EmployeeDashboard: React.FC = () => {
  const { user, logout } = useAuth()

  const skillProgressData = user?.skills.map(skill => ({
    skill,
    progress: user.skillLevels[skill] || 0
  })) || []

  const monthlyProgressData = [
    { month: 'Aug', completed: 2, planned: 3 },
    { month: 'Sep', completed: 3, planned: 4 },
    { month: 'Oct', completed: 1, planned: 2 },
    { month: 'Nov', completed: 4, planned: 4 },
    { month: 'Dec', completed: 2, planned: 3 },
    { month: 'Jan', completed: 3, planned: 5 }
  ]

  const currentIDP = mockIDPs.find(idp => idp.employeeId === user?.id)
  const recentNotifications = mockNotifications.filter(n => !n.read).slice(0, 3)
  const recommendedCourses = mockCourses.slice(0, 3)

  const getSkillColor = (level: number) => {
    if (level >= 80) return 'text-green-600'
    if (level >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getSkillBadgeColor = (level: number) => {
    if (level >= 80) return 'bg-green-100 text-green-800'
    if (level >= 60) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  // Enhanced data for new widgets
  const skillGapData = [
    { skill: 'Grid Ops', currentLevel: 75, targetLevel: 90, subject: 'Grid Operations' },
    { skill: 'SCADA', currentLevel: 85, targetLevel: 95, subject: 'SCADA Systems' },
    { skill: 'Protection', currentLevel: 60, targetLevel: 85, subject: 'Protection Systems' },
    { skill: 'Safety', currentLevel: 90, targetLevel: 95, subject: 'Safety Protocols' },
    { skill: 'Analysis', currentLevel: 70, targetLevel: 80, subject: 'Data Analysis' },
    { skill: 'Leadership', currentLevel: 45, targetLevel: 75, subject: 'Team Leadership' }
  ]

  const aiRecommendations = [
    {
      id: 1,
      type: 'course',
      title: 'Advanced Protection Systems',
      reason: 'Based on your Protection Systems skill gap',
      priority: 'high',
      estimatedTime: '4 weeks',
      icon: BookOpen,
      confidence: 95
    },
    {
      id: 2,
      type: 'mentor',
      title: 'Connect with Rajesh Kumar',
      reason: 'Transmission expert with 15+ years experience',
      priority: 'medium',
      estimatedTime: '1 hour/week',
      icon: Users,
      confidence: 88
    },
    {
      id: 3,
      type: 'rotation',
      title: 'Control Room Assignment',
      reason: 'Enhance SCADA operations skills',
      priority: 'medium',
      estimatedTime: '3 months',
      icon: Activity,
      confidence: 82
    }
  ]

  const integrationStatus = {
    hrms: { status: 'connected', lastSync: '2 min ago', health: 98 },
    lms: { status: 'connected', lastSync: '1 min ago', health: 100 },
    performance: { status: 'warning', lastSync: '1 hour ago', health: 75 }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'error': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100'
      case 'warning': return 'bg-yellow-100'
      case 'error': return 'bg-red-100'
      default: return 'bg-gray-100'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50'
      case 'medium': return 'border-yellow-200 bg-yellow-50'
      case 'low': return 'border-green-200 bg-green-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-2 border-white/20">
              <AvatarFallback className="bg-white/20 text-white text-lg">
                {user?.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
              <p className="text-indigo-100 mt-1">
                Continue your learning journey and achieve your career goals
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-3xl font-bold">{user?.completedCourses}</div>
              <div className="text-indigo-100 text-sm">Courses Completed</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{user?.inProgressCourses}</p>
                <p className="text-gray-600 text-sm">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{user?.skills.length}</p>
                <p className="text-gray-600 text-sm">Active Skills</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{currentIDP?.progress || 0}%</p>
                <p className="text-gray-600 text-sm">IDP Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">85%</p>
                <p className="text-gray-600 text-sm">Avg Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* IDP Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Individual Development Plan
            </CardTitle>
            <CardDescription>
              Track your career development goals and progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentIDP ? (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{currentIDP.title}</h3>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {currentIDP.status}
                  </Badge>
                </div>
                <Progress value={currentIDP.progress} className="w-full" />
                <div className="text-sm text-gray-600">
                  {currentIDP.progress}% complete • Due {new Date(currentIDP.endDate).toLocaleDateString()}
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Current Goals</h4>
                  {currentIDP.goals.slice(0, 3).map((goal) => (
                    <div key={goal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {goal.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : goal.status === 'in-progress' ? (
                          <Clock className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-gray-400" />
                        )}
                        <span className="text-sm">{goal.title}</span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          goal.status === 'completed' ? 'border-green-200 text-green-700' :
                          goal.status === 'in-progress' ? 'border-yellow-200 text-yellow-700' :
                          'border-gray-200 text-gray-600'
                        }`}
                      >
                        {goal.progress}%
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full">View Full IDP</Button>
              </>
            ) : (
              <div className="text-center py-8">
                <Target className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No IDP Created</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating your Individual Development Plan</p>
                <Button className="mt-4">Create IDP</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Skill Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2 h-5 w-5" />
              Skill Levels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillProgressData.map((skill) => (
                <div key={skill.skill} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{skill.skill}</span>
                    <Badge 
                      variant="secondary"
                      className={getSkillBadgeColor(skill.progress)}
                    >
                      {skill.progress}%
                    </Badge>
                  </div>
                  <Progress value={skill.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Learning Progress</CardTitle>
            <CardDescription>Your course completion over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Line type="monotone" dataKey="completed" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="planned" stroke="#82ca9d" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recommended Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Recommended for You
            </CardTitle>
            <CardDescription>
              AI-powered course recommendations based on your skills and goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedCourses.map((course) => (
                <div key={course.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{course.title}</h3>
                    <p className="text-xs text-gray-500 truncate">{course.instructor} • {course.duration}</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600 ml-1">{course.rating}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {course.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Play className="h-3 w-3 mr-1" />
                    Start
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Innovation Section: New Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Gap Analysis Widget */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Radar className="mr-2 h-5 w-5 text-blue-600" />
              Skill Gap Analysis
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="ml-2 h-4 w-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>AI-powered analysis comparing your current skills vs target levels</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription>
              AI-driven insights into your skill development opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={skillGapData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar name="Current" dataKey="currentLevel" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  <Radar name="Target" dataKey="targetLevel" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                  <RechartsTooltip />
                </RadarChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#8884d8] rounded-full mr-2"></div>
                  <span>Current Level</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#82ca9d] rounded-full mr-2"></div>
                  <span>Target Level</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {skillGapData.slice(0, 4).map((skill) => (
                  <div key={skill.skill} className="p-2 bg-gray-50 rounded">
                    <div className="font-medium">{skill.subject}</div>
                    <div className="text-gray-600">Gap: {skill.targetLevel - skill.currentLevel}%</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations Feed */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-5 w-5 text-purple-600" />
              AI Recommendations
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <Sparkles className="ml-2 h-4 w-4 text-purple-400 animate-pulse cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Personalized suggestions powered by machine learning algorithms</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription>
              Personalized learning paths tailored for your growth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiRecommendations.map((rec) => {
                const IconComponent = rec.icon
                return (
                  <div key={rec.id} className={`p-3 rounded-lg border-2 ${getPriorityColor(rec.priority)} transition-all hover:shadow-md`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${rec.priority === 'high' ? 'bg-red-100' : rec.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'}`}>
                        <IconComponent className={`h-4 w-4 ${rec.priority === 'high' ? 'text-red-600' : rec.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{rec.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {rec.confidence}% match
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{rec.reason}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">{rec.estimatedTime}</span>
                          <Button size="sm" variant="outline" className="text-xs h-6">
                            Start
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* HRMS/LMS Integration Status */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="mr-2 h-5 w-5 text-indigo-600" />
            System Integration Status
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="ml-2 h-4 w-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Real-time sync status of connected HR and learning systems</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </CardTitle>
          <CardDescription>
            Real-time API connectivity and sync status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${getStatusBg(integrationStatus.hrms.status)} ${getStatusColor(integrationStatus.hrms.status)} animate-pulse`}></div>
                <div>
                  <p className="font-medium text-sm">HRMS System</p>
                  <p className="text-xs text-gray-600">Employee data sync</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${getStatusColor(integrationStatus.hrms.status)}`}>
                  {integrationStatus.hrms.health}%
                </div>
                <div className="text-xs text-gray-500">{integrationStatus.hrms.lastSync}</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${getStatusBg(integrationStatus.lms.status)} ${getStatusColor(integrationStatus.lms.status)} animate-pulse`}></div>
                <div>
                  <p className="font-medium text-sm">LMS Platform</p>
                  <p className="text-xs text-gray-600">Learning progress sync</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${getStatusColor(integrationStatus.lms.status)}`}>
                  {integrationStatus.lms.health}%
                </div>
                <div className="text-xs text-gray-500">{integrationStatus.lms.lastSync}</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${getStatusBg(integrationStatus.performance.status)} ${getStatusColor(integrationStatus.performance.status)} animate-pulse`}></div>
                <div>
                  <p className="font-medium text-sm">Performance System</p>
                  <p className="text-xs text-gray-600">Goal tracking sync</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${getStatusColor(integrationStatus.performance.status)}`}>
                  {integrationStatus.performance.health}%
                </div>
                <div className="text-xs text-gray-500">{integrationStatus.performance.lastSync}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Completed "SCADA Systems Operations"</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Mentorship session with Neha Kedar</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Earned Grid Operations Specialist badge</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="mr-2 h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className={`mt-1 w-2 h-2 rounded-full ${
                      notification.priority === 'high' ? 'bg-red-500' :
                      notification.priority === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notification.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </TooltipProvider>
  )
}

export default EmployeeDashboard