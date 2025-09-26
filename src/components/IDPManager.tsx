import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { useAuth } from '../contexts/AuthContext'
import { mockIDPs, mockUsers } from '../data/mockData'
// import { format } from 'date-fns' // Using native date formatting instead
import {
  Target,
  Plus,
  Calendar as CalendarIcon,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Award,
  BookOpen,
  Users,
  MessageSquare,
  Star,
  BarChart3,
  Edit,
  Trash2,
  Eye,
  Share2,
  Download,
  Upload,
  Filter,
  Search
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const IDPManager: React.FC = () => {
  const { user } = useAuth()
  const [selectedIDP, setSelectedIDP] = useState(mockIDPs[0]?.id || null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [date, setDate] = useState<Date>()

  const userIDP = mockIDPs.find(idp => idp.employeeId === user?.id)
  const isHRUser = user?.role === 'hr' || user?.role === 'admin'

  const progressData = [
    { month: 'Jul', progress: 20 },
    { month: 'Aug', progress: 35 },
    { month: 'Sep', progress: 45 },
    { month: 'Oct', progress: 50 },
    { month: 'Nov', progress: 58 },
    { month: 'Dec', progress: 62 },
    { month: 'Jan', progress: 65 }
  ]

  const goalStatusData = userIDP ? [
    { name: 'Completed', value: userIDP.goals.filter(g => g.status === 'completed').length, color: '#22c55e' },
    { name: 'In Progress', value: userIDP.goals.filter(g => g.status === 'in-progress').length, color: '#f59e0b' },
    { name: 'Not Started', value: userIDP.goals.filter(g => g.status === 'not-started').length, color: '#6b7280' }
  ] : []

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'in-progress':
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'active':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (dueDate: string) => {
    const due = new Date(dueDate)
    const now = new Date()
    const daysUntilDue = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysUntilDue < 30) return 'border-l-red-500'
    if (daysUntilDue < 60) return 'border-l-yellow-500'
    return 'border-l-green-500'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {isHRUser ? 'IDP Management' : 'My Development Plan'}
            </h1>
            <p className="text-teal-100 mt-1">
              {isHRUser ? 
                'Manage and track individual development plans across the organization' :
                'Track your career development goals and progress'
              }
            </p>
          </div>
          <div className="flex space-x-3">
            {userIDP && (
              <div className="text-center">
                <div className="text-2xl font-bold">{userIDP.progress}%</div>
                <div className="text-teal-100 text-sm">Overall Progress</div>
              </div>
            )}
            <Button variant="secondary" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              {isHRUser ? 'Create IDP' : 'Add Goal'}
            </Button>
          </div>
        </div>
      </div>

      {userIDP ? (
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            {isHRUser && <TabsTrigger value="team">Team IDPs</TabsTrigger>}
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* IDP Summary */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Target className="mr-2 h-5 w-5" />
                        {userIDP.title}
                      </CardTitle>
                      <CardDescription>
                        {new Date(userIDP.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} - {new Date(userIDP.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={getStatusColor(userIDP.status)}>
                        {userIDP.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm text-gray-600">{userIDP.progress}%</span>
                    </div>
                    <Progress value={userIDP.progress} className="h-3" />
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Recent Goals</h4>
                    <div className="space-y-3">
                      {userIDP.goals.slice(0, 3).map((goal) => (
                        <div key={goal.id} className={`p-3 border rounded-lg border-l-4 ${getPriorityColor(goal.dueDate)}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(goal.status)}
                              <h5 className="font-medium">{goal.title}</h5>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {goal.progress}%
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{goal.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              Due: {new Date(goal.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </span>
                            <Progress value={goal.progress} className="w-20 h-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {userIDP.goals.filter(g => g.status === 'completed').length}
                      </div>
                      <div className="text-sm text-green-700">Completed Goals</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        {userIDP.goals.filter(g => g.status === 'in-progress').length}
                      </div>
                      <div className="text-sm text-yellow-700">In Progress</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {userIDP.skillGaps.length}
                      </div>
                      <div className="text-sm text-blue-700">Skill Gaps</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Goal Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Goal Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={goalStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {goalStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-4">
                    {goalStatusData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Progress Over Time
                </CardTitle>
                <CardDescription>
                  Your IDP completion progress over the past 7 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="progress" stroke="#0891b2" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2 h-5 w-5 text-yellow-500" />
                  AI Recommendations
                </CardTitle>
                <CardDescription>
                  Personalized suggestions to accelerate your development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userIDP.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{recommendation}</p>
                      </div>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">
                          <BookOpen className="w-3 h-3 mr-1" />
                          Learn
                        </Button>
                        <Button size="sm" variant="outline">
                          <Users className="w-3 h-3 mr-1" />
                          Connect
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Development Goals</h3>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Goal
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userIDP.goals.map((goal) => (
                  <Card key={goal.id} className={`border-l-4 ${getPriorityColor(goal.dueDate)}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(goal.status)}
                          <CardTitle className="text-base">{goal.title}</CardTitle>
                        </div>
                        <Badge className={getStatusColor(goal.status)}>
                          {goal.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-600">{goal.description}</p>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium">Progress</span>
                          <span className="text-xs text-gray-600">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Due: {new Date(goal.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Skill Development Areas
                </CardTitle>
                <CardDescription>
                  Focus areas identified for your career growth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userIDP.skillGaps.map((skill, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{skill}</h4>
                        <Badge variant="outline" className="text-xs">
                          Gap Identified
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <Button size="sm" variant="outline" className="w-full">
                          <BookOpen className="w-3 h-3 mr-1" />
                          Find Courses
                        </Button>
                        <Button size="sm" variant="outline" className="w-full">
                          <Users className="w-3 h-3 mr-1" />
                          Find Mentor
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Progress Analysis</CardTitle>
                  <CardDescription>
                    Comprehensive view of your development journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="progress" stroke="#0891b2" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {userIDP.goals.filter(g => g.status === 'completed').length}
                    </div>
                    <div className="text-sm text-gray-600">Goals Completed</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {Math.round((userIDP.goals.reduce((acc, goal) => acc + goal.progress, 0) / userIDP.goals.length) || 0)}%
                    </div>
                    <div className="text-sm text-gray-600">Average Goal Progress</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {Math.ceil((new Date(userIDP.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                    </div>
                    <div className="text-sm text-gray-600">Days Remaining</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {isHRUser && (
            <TabsContent value="team">
              <Card>
                <CardHeader>
                  <CardTitle>Team IDP Overview</CardTitle>
                  <CardDescription>
                    Manage and track individual development plans across your team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUsers.filter(u => u.role === 'employee').map(employee => (
                      <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={employee.avatar} />
                            <AvatarFallback>
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{employee.name}</h4>
                            <p className="text-sm text-gray-500">{employee.position}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <div className="text-sm font-medium">75% Complete</div>
                            <div className="text-xs text-gray-500">Last updated 2 days ago</div>
                          </div>
                          <Progress value={75} className="w-20" />
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No IDP Created</h3>
            <p className="text-gray-500 mb-4">
              Start your development journey by creating an Individual Development Plan
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create My IDP
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default IDPManager