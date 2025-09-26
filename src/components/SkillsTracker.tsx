import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { useAuth } from '../contexts/AuthContext'
import { mockCourses } from '../data/mockData'
import {
  Target,
  TrendingUp,
  Award,
  Plus,
  BookOpen,
  Users,
  Calendar,
  Star,
  CheckCircle,
  AlertCircle,
  Clock,
  BarChart3,
  Zap,
  Trophy,
  Lightbulb
} from 'lucide-react'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts'

const SkillsTracker: React.FC = () => {
  const { user } = useAuth()
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('all')

  const skillCategories = [
    { id: 'technical', name: 'Technical Skills', color: 'bg-blue-500', icon: '💻' },
    { id: 'leadership', name: 'Leadership', color: 'bg-purple-500', icon: '👥' },
    { id: 'communication', name: 'Communication', color: 'bg-green-500', icon: '💬' },
    { id: 'creative', name: 'Creative', color: 'bg-pink-500', icon: '🎨' },
    { id: 'analytical', name: 'Analytical', color: 'bg-orange-500', icon: '📊' }
  ]

  const skillsData = user?.skills.map(skill => ({
    skill,
    current: user.skillLevels[skill] || 0,
    target: Math.min((user.skillLevels[skill] || 0) + 15, 100),
    category: skill.includes('React') || skill.includes('TypeScript') || skill.includes('Node') || skill.includes('AWS') ? 'technical' :
              skill.includes('Leadership') ? 'leadership' :
              skill.includes('Communication') || skill.includes('Social') ? 'communication' :
              skill.includes('Design') || skill.includes('UX') || skill.includes('Figma') ? 'creative' : 'analytical'
  })) || []

  const radarData = skillsData.slice(0, 6).map(skill => ({
    skill: skill.skill.substring(0, 10),
    current: skill.current,
    target: skill.target
  }))

  const skillGaps = skillsData
    .filter(skill => (skill.target - skill.current) > 10)
    .sort((a, b) => (b.target - b.current) - (a.target - a.current))

  const topSkills = skillsData
    .filter(skill => skill.current >= 80)
    .sort((a, b) => b.current - a.current)

  const skillProgress = [
    { month: 'Jul', skills: 12 },
    { month: 'Aug', skills: 14 },
    { month: 'Sep', skills: 16 },
    { month: 'Oct', skills: 18 },
    { month: 'Nov', skills: 19 },
    { month: 'Dec', skills: 21 },
    { month: 'Jan', skills: 23 }
  ]

  const getSkillLevelText = (level: number) => {
    if (level >= 90) return 'Expert'
    if (level >= 70) return 'Advanced'
    if (level >= 50) return 'Intermediate'
    if (level >= 30) return 'Beginner'
    return 'Novice'
  }

  const getSkillColor = (level: number) => {
    if (level >= 80) return 'bg-green-100 text-green-800'
    if (level >= 60) return 'bg-yellow-100 text-yellow-800'
    if (level >= 40) return 'bg-orange-100 text-orange-800'
    return 'bg-red-100 text-red-800'
  }

  const recommendedCourses = mockCourses.filter(course => 
    skillGaps.some(gap => 
      course.tags.some(tag => 
        gap.skill.toLowerCase().includes(tag.toLowerCase())
      )
    )
  ).slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Skills Tracker</h1>
            <p className="text-emerald-100 mt-1">
              Monitor your skill development and identify growth opportunities
            </p>
          </div>
          <div className="flex space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{user?.skills.length}</div>
              <div className="text-emerald-100 text-sm">Active Skills</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{topSkills.length}</div>
              <div className="text-emerald-100 text-sm">Expert Level</div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{skillGaps.length}</p>
                <p className="text-gray-600 text-sm">Skill Gaps</p>
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
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(skillsData.reduce((acc, skill) => acc + skill.current, 0) / skillsData.length) || 0}%
                </p>
                <p className="text-gray-600 text-sm">Avg Level</p>
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
                <p className="text-2xl font-bold text-gray-900">{topSkills.length}</p>
                <p className="text-gray-600 text-sm">Expert Skills</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-gray-600 text-sm">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">All Skills</TabsTrigger>
          <TabsTrigger value="gaps">Skill Gaps</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Skills Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Skills Radar
                </CardTitle>
                <CardDescription>
                  Current skill levels vs target goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Current" dataKey="current" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    <Radar name="Target" dataKey="target" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.1} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Skill Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5" />
                  Top Skills
                </CardTitle>
                <CardDescription>
                  Your strongest competencies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topSkills.slice(0, 5).map((skill, index) => (
                    <div key={skill.skill} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{skill.skill}</span>
                          <Badge className={getSkillColor(skill.current)}>
                            {getSkillLevelText(skill.current)}
                          </Badge>
                        </div>
                        <Progress value={skill.current} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skill Progress Over Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Skill Development Progress
              </CardTitle>
              <CardDescription>
                Your skill acquisition over the past 7 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={skillProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="skills" stroke="#8884d8" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <div className="space-y-4">
            {/* Skill Categories Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                variant={selectedSkillCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSkillCategory('all')}
              >
                All Skills
              </Button>
              {skillCategories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedSkillCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSkillCategory(category.id)}
                >
                  {category.icon} {category.name}
                </Button>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillsData
                .filter(skill => selectedSkillCategory === 'all' || skill.category === selectedSkillCategory)
                .map(skill => (
                <Card key={skill.skill} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{skill.skill}</h3>
                      <Badge className={getSkillColor(skill.current)}>
                        {skill.current}%
                      </Badge>
                    </div>
                    <Progress value={skill.current} className="mb-2" />
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{getSkillLevelText(skill.current)}</span>
                      <span>Target: {skill.target}%</span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Plus className="w-3 h-3 mr-1" />
                        Improve
                      </Button>
                      <Button size="sm" variant="ghost">
                        <BarChart3 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gaps">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-orange-500" />
                Skill Gaps Analysis
              </CardTitle>
              <CardDescription>
                Areas where you can improve to reach your career goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillGaps.map((gap) => (
                  <div key={gap.skill} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{gap.skill}</h3>
                      <Badge variant="outline" className="text-orange-600 border-orange-200">
                        {gap.target - gap.current}% gap
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Current Level</span>
                        <span>{gap.current}%</span>
                      </div>
                      <Progress value={gap.current} className="h-2" />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Target Level</span>
                        <span>{gap.target}%</span>
                      </div>
                      <Progress value={gap.target} className="h-2 opacity-50" />
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm">
                        <BookOpen className="w-3 h-3 mr-1" />
                        Find Courses
                      </Button>
                      <Button size="sm" variant="outline">
                        <Users className="w-3 h-3 mr-1" />
                        Find Mentor
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
                  AI-Powered Recommendations
                </CardTitle>
                <CardDescription>
                  Personalized learning paths based on your skill gaps and career goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendedCourses.map((course) => (
                    <Card key={course.id} className="hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-32 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-2 right-2 bg-yellow-100 text-yellow-800">
                          Recommended
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2 line-clamp-2">{course.title}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{course.duration}</span>
                          <Star className="w-3 h-3 ml-2 mr-1 text-yellow-400 fill-current" />
                          <span>{course.rating}</span>
                        </div>
                        <Button size="sm" className="w-full">
                          Start Learning
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SkillsTracker