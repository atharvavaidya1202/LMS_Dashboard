import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { useAuth } from '../contexts/AuthContext'
import { mockAnalytics, mockUsers, mockIDPs, formatINR } from '../data/mockData'
import {
  Users,
  TrendingUp,
  Target,
  DollarSign,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Calendar,
  Filter,
  Download,
  Plus,
  LogOut
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line } from 'recharts'

const HRDashboard: React.FC = () => {
  const { logout } = useAuth()
  const analytics = mockAnalytics
  const employees = mockUsers.filter(u => u.role === 'employee')
  
  const leadershipLearners = [
    { name: 'Soham Patil', currentRole: 'Senior Electrical Engineer', learningPath: 'Leadership in Engineering', progress: 85, department: 'Transmission Engineering' },
    { name: 'Aditya Pharande', currentRole: 'Operations Manager', learningPath: 'Advanced Operations Leadership', progress: 78, department: 'Operations Management' },
    { name: 'Neha Kedar', currentRole: 'IT & Digital Manager', learningPath: 'Digital Leadership Program', progress: 82, department: 'IT & Digital' }
  ]

  const criticalSkillGaps = [
    { skill: 'Advanced Grid Management', employees: 18, gap: 'High', priority: 'Critical' },
    { skill: 'Renewable Integration', employees: 25, gap: 'Medium', priority: 'High' },
    { skill: 'Digital Transformation', employees: 32, gap: 'Medium', priority: 'Medium' },
    { skill: 'AI/ML', employees: 12, gap: 'High', priority: 'Critical' }
  ]

  const trainingROI = [
    { program: 'Leadership Development', cost: 4200000, savings: 15500000, roi: 270 }, // ₹42L investment, ₹1.55Cr savings
    { program: 'Technical Skills', cost: 6300000, savings: 18400000, roi: 193 }, // ₹63L investment, ₹1.84Cr savings  
    { program: 'Soft Skills', cost: 2500000, savings: 7900000, roi: 217 } // ₹25L investment, ₹79L savings
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600'
    if (progress >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getProgressBadge = (progress: number) => {
    if (progress >= 80) return 'bg-green-100 text-green-800'
    if (progress >= 60) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-100 text-red-800'
      case 'High':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Learning & Development Dashboard</h1>
            <p className="text-blue-100 mt-1">
              Manage organizational learning and skill development
            </p>
          </div>
          <div className="flex space-x-4">
            <Button variant="secondary" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="secondary" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Create IDP
            </Button>
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{analytics.totalEmployees}</p>
                <p className="text-gray-600 text-sm">Total Employees</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{analytics.avgCompletionRate}%</p>
                <p className="text-gray-600 text-sm">Avg Completion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{analytics.skillGapsClosed}</p>
                <p className="text-gray-600 text-sm">Skill Gaps Closed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{analytics.trainingROI}%</p>
                <p className="text-gray-600 text-sm">Training ROI</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics">Team Analytics</TabsTrigger>
          <TabsTrigger value="succession">Succession Planning</TabsTrigger>
          <TabsTrigger value="idp">IDP Management</TabsTrigger>
          <TabsTrigger value="reports">Reports & ROI</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Department Progress
                </CardTitle>
                <CardDescription>Training completion rates by department</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.departmentProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completion" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Skill Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="mr-2 h-5 w-5" />
                  Skill Distribution
                </CardTitle>
                <CardDescription>Current skill levels across organization</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      dataKey="count"
                      data={analytics.skillDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      fill="#8884d8"
                    >
                      {analytics.skillDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Critical Skill Gaps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Critical Skill Gaps
              </CardTitle>
              <CardDescription>Skills requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criticalSkillGaps.map((gap, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Target className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{gap.skill}</h3>
                        <p className="text-sm text-gray-600">{gap.employees} employees affected</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className={getPriorityColor(gap.priority)}>
                        {gap.priority}
                      </Badge>
                      <Button size="sm" variant="outline">Address Gap</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="succession" className="space-y-6">
          {/* Learning Leadership Development */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Leadership Development Program
              </CardTitle>
              <CardDescription>Track learners developing leadership skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leadershipLearners.map((learner, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{learner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{learner.name}</h3>
                        <p className="text-sm text-gray-600">
                          {learner.currentRole}
                        </p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {learner.learningPath}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className={`text-lg font-semibold ${getProgressColor(learner.progress)}`}>
                          {learner.progress}%
                        </div>
                        <div className="text-xs text-gray-500">Progress</div>
                      </div>
                      <div className="w-24">
                        <Progress value={learner.progress} className="h-2" />
                      </div>
                      <Button size="sm" variant="outline">View Learning</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Learning Progress Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">5</p>
                    <p className="text-gray-600 text-sm">Advanced Learners (80%+)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-gray-600 text-sm">In Progress (60-79%)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">8</p>
                    <p className="text-gray-600 text-sm">Need Support (&lt;60%)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="idp" className="space-y-6">
          {/* IDP Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                IDP Management
              </CardTitle>
              <CardDescription>Track and manage Individual Development Plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employees.slice(0, 5).map((employee) => {
                  const idp = mockIDPs.find(i => i.employeeId === employee.id)
                  return (
                    <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{employee.name}</h3>
                          <p className="text-sm text-gray-600">{employee.position}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {idp ? (
                          <>
                            <div className="text-right">
                              <div className="text-sm font-medium">{idp.progress}% Complete</div>
                              <Badge variant="outline" className="text-xs mt-1 bg-green-100 text-green-800">
                                {idp.status}
                              </Badge>
                            </div>
                            <div className="w-24">
                              <Progress value={idp.progress} className="h-2" />
                            </div>
                            <Button size="sm" variant="outline">Review</Button>
                          </>
                        ) : (
                          <>
                            <Badge variant="outline" className="text-xs bg-gray-100 text-gray-600">
                              No IDP
                            </Badge>
                            <Button size="sm">Create IDP</Button>
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          {/* Training ROI */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Training ROI Analysis
              </CardTitle>
              <CardDescription>Return on investment for training programs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainingROI.map((program, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{program.program}</h3>
                      <p className="text-sm text-gray-600">Investment: {formatINR(program.cost)}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-lg font-semibold text-green-600">{program.roi}%</div>
                        <div className="text-xs text-gray-500">ROI</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatINR(program.savings)}</div>
                        <div className="text-xs text-gray-500">Savings</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Training Progress</CardTitle>
              <CardDescription>Course completions and enrollments over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="completed" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="enrolled" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default HRDashboard