import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { useAuth } from '../contexts/AuthContext'
import { mockAnalytics, mockUsers, formatINR } from '../data/mockData'
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Award,
  DollarSign,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  Area,
  AreaChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'

const AnalyticsDashboard: React.FC = () => {
  const { user } = useAuth()
  const [timeRange, setTimeRange] = useState('last-6-months')
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  const isHROrAdmin = user?.role === 'hr' || user?.role === 'admin'

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

  const departmentPerformance = mockAnalytics.departmentProgress.map(dept => ({
    ...dept,
    efficiency: Math.round(dept.completion * 0.8 + Math.random() * 20),
    engagement: Math.round(dept.completion * 0.9 + Math.random() * 10)
  }))

  const skillTrends = [
    { month: 'Jul', technical: 65, leadership: 58, communication: 72, creative: 45 },
    { month: 'Aug', technical: 68, leadership: 62, communication: 75, creative: 48 },
    { month: 'Sep', technical: 72, leadership: 65, communication: 78, creative: 52 },
    { month: 'Oct', technical: 75, leadership: 68, communication: 80, creative: 55 },
    { month: 'Nov', technical: 78, leadership: 72, communication: 82, creative: 58 },
    { month: 'Dec', technical: 80, leadership: 75, communication: 85, creative: 62 },
    { month: 'Jan', technical: 82, leadership: 78, communication: 87, creative: 65 }
  ]

  const learningEffectiveness = [
    { category: 'Online Courses', completion: 85, satisfaction: 4.2, retention: 78 },
    { category: 'Mentorship', completion: 92, satisfaction: 4.6, retention: 88 },
    { category: 'Workshops', completion: 78, satisfaction: 4.0, retention: 72 },
    { category: 'Self-Study', completion: 65, satisfaction: 3.8, retention: 65 },
    { category: 'Job Rotation', completion: 88, satisfaction: 4.4, retention: 85 }
  ]

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <ArrowUp className="w-4 h-4 text-green-500" />
    if (current < previous) return <ArrowDown className="w-4 h-4 text-red-500" />
    return <Minus className="w-4 h-4 text-gray-500" />
  }

  const getTrendColor = (current: number, previous: number) => {
    if (current > previous) return 'text-green-600'
    if (current < previous) return 'text-red-600'
    return 'text-gray-600'
  }

  const keyMetrics = [
    {
      title: 'Active Learners',
      value: mockAnalytics.activeUsers,
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      description: 'Employees actively engaged in learning'
    },
    {
      title: 'Course Completions',
      value: mockAnalytics.coursesCompleted,
      change: '+8%',
      changeType: 'positive',
      icon: Award,
      description: 'Total courses completed this month'
    },
    {
      title: 'Skill Gaps Closed',
      value: mockAnalytics.skillGapsClosed,
      change: '+15%',
      changeType: 'positive',
      icon: Target,
      description: 'Skills gaps addressed through learning'
    },
    {
      title: 'Training ROI',
      value: `${mockAnalytics.trainingROI}%`,
      change: '+5%',
      changeType: 'positive',
      icon: DollarSign,
      description: 'Return on training investment (INR)'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {isHROrAdmin ? 'Learning Analytics' : 'My Learning Analytics'}
            </h1>
            <p className="text-violet-100 mt-1">
              {isHROrAdmin ? 
                'Comprehensive insights into organizational learning and development' :
                'Track your learning progress and performance insights'
              }
            </p>
          </div>
          <div className="flex space-x-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40 bg-white/10 text-white border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="secondary" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <metric.icon className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-600">{metric.title}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.changeType === 'positive' ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : (
                      <ArrowDown className="w-3 h-3" />
                    )}
                    <span>{metric.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${
                  metric.changeType === 'positive' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <metric.icon className={`w-6 h-6 ${
                    metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`} />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          {isHROrAdmin && <TabsTrigger value="departments">Departments</TabsTrigger>}
          {isHROrAdmin && <TabsTrigger value="roi">ROI Analysis</TabsTrigger>}
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Learning Progress Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Learning Progress Trend
                </CardTitle>
                <CardDescription>
                  Course completions and enrollments over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={mockAnalytics.monthlyProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="completed" 
                      stackId="1"
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="enrolled" 
                      stackId="1"
                      stroke="#82ca9d" 
                      fill="#82ca9d" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Skill Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Skill Distribution
                </CardTitle>
                <CardDescription>
                  Current skill levels across the organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={mockAnalytics.skillDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {mockAnalytics.skillDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {mockAnalytics.skillDistribution.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-xs">{skill.skill}</span>
                      <span className="text-xs font-medium">{skill.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Learning Effectiveness */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Learning Method Effectiveness
              </CardTitle>
              <CardDescription>
                Comparison of different learning approaches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={learningEffectiveness} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completion" fill="#8884d8" name="Completion Rate %" />
                  <Bar dataKey="retention" fill="#82ca9d" name="Knowledge Retention %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Skill Development Trends
                </CardTitle>
                <CardDescription>
                  Track skill progression across different categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={skillTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="technical" stroke="#8884d8" strokeWidth={2} name="Technical" />
                    <Line type="monotone" dataKey="leadership" stroke="#82ca9d" strokeWidth={2} name="Leadership" />
                    <Line type="monotone" dataKey="communication" stroke="#ffc658" strokeWidth={2} name="Communication" />
                    <Line type="monotone" dataKey="creative" stroke="#ff7300" strokeWidth={2} name="Creative" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {['Technical', 'Leadership', 'Communication', 'Creative'].map((skill, index) => (
                <Card key={skill}>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {skillTrends[skillTrends.length - 1][skill.toLowerCase()]}%
                    </div>
                    <div className="text-sm text-gray-600 mb-2">{skill} Skills</div>
                    <div className="flex items-center justify-center space-x-1 text-sm text-green-600">
                      <ArrowUp className="w-3 h-3" />
                      <span>+5% this month</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  Key performance indicators for learning and development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{mockAnalytics.avgCompletionRate}%</div>
                    <div className="text-sm text-blue-700">Average Completion Rate</div>
                    <div className="flex items-center justify-center mt-2 text-sm text-green-600">
                      <ArrowUp className="w-3 h-3 mr-1" />
                      +3% from last month
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">4.2</div>
                    <div className="text-sm text-green-700">Average Course Rating</div>
                    <div className="flex items-center justify-center mt-2 text-sm text-green-600">
                      <ArrowUp className="w-3 h-3 mr-1" />
                      +0.2 from last month
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">78%</div>
                    <div className="text-sm text-purple-700">Knowledge Retention</div>
                    <div className="flex items-center justify-center mt-2 text-sm text-green-600">
                      <ArrowUp className="w-3 h-3 mr-1" />
                      +5% from last month
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {isHROrAdmin && (
          <TabsContent value="departments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Department Performance
                </CardTitle>
                <CardDescription>
                  Learning progress and engagement by department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={departmentPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completion" fill="#8884d8" name="Completion Rate %" />
                    <Bar dataKey="engagement" fill="#82ca9d" name="Engagement Score" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {isHROrAdmin && (
          <TabsContent value="roi">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Training ROI Analysis
                </CardTitle>
                <CardDescription>
                  Return on investment for learning and development programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">₹{mockAnalytics.trainingROI}L</div>
                    <div className="text-sm text-green-700">Cost Savings</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">315%</div>
                    <div className="text-sm text-blue-700">ROI Percentage</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">₹10.4 Cr</div>
                    <div className="text-sm text-purple-700">Training Investment</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">ROI by Program Type</h4>
                  {[
                    { program: 'Leadership Development', roi: 245, investment: 4200000 }, // ₹42L
                    { program: 'Technical Skills Training', roi: 180, investment: 6300000 }, // ₹63L
                    { program: 'Soft Skills Workshop', roi: 320, investment: 2500000 }, // ₹25L
                    { program: 'Mentorship Program', roi: 275, investment: 2100000 } // ₹21L
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{item.program}</div>
                        <div className="text-sm text-gray-600">Investment: {formatINR(item.investment)}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">{item.roi}% ROI</div>
                        <div className="text-sm text-gray-600">
                          Return: {formatINR(item.investment * (item.roi / 100))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}

export default AnalyticsDashboard