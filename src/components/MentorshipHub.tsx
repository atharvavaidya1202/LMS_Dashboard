import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Input } from './ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import { useAuth } from '../contexts/AuthContext'
import { mockUsers } from '../data/mockData'
import {
  Users,
  Search,
  Star,
  Calendar,
  MessageSquare,
  BookOpen,
  Award,
  Clock,
  MapPin,
  Filter,
  Plus,
  CheckCircle,
  Video,
  Phone
} from 'lucide-react'

interface Mentor {
  id: string
  name: string
  position: string
  department: string
  avatar: string
  rating: number
  sessions: number
  skills: string[]
  availability: string
  bio: string
  yearsExperience: number
}

const MentorshipHub: React.FC = () => {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSkill, setSelectedSkill] = useState('all')

  // Mock mentors data
  const mentors: Mentor[] = [
    {
      id: '2',
      name: 'Soham Patil',
      position: 'Senior Electrical Engineer',
      department: 'Transmission Engineering',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      sessions: 52,
      skills: ['Power System Planning', 'Grid Management', 'Electrical Safety', 'Transmission Lines'],
      availability: 'Weekdays 2-4 PM',
      bio: 'Senior electrical engineer with extensive experience in power system planning and grid management. Specializes in mentoring junior engineers in electrical safety and transmission systems.',
      yearsExperience: 15
    },
    {
      id: '3',
      name: 'Aditya Pharande',
      position: 'Operations Manager - Transmission Projects',
      department: 'Operations Management',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      sessions: 45,
      skills: ['Transmission Projects', 'Operations Excellence', 'Project Management', 'Team Leadership'],
      availability: 'Weekdays 10-12 AM',
      bio: 'Operations manager with proven expertise in transmission projects and operations excellence. Passionate about developing future leaders in power sector operations.',
      yearsExperience: 12
    },
    {
      id: '4',
      name: 'Neha Kedar',
      position: 'IT & Digital Manager / Renewable Integration Specialist',
      department: 'IT & Digital',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 4.7,
      sessions: 38,
      skills: ['Renewable Integration', 'Digital Transformation', 'Smart Grid Tech', 'Data Analytics'],
      availability: 'Flexible',
      bio: 'Digital transformation leader specializing in renewable energy integration and smart grid technologies. Expert mentor for grid operations optimization and modern power systems.',
      yearsExperience: 10
    },
    {
      id: '7',
      name: 'Priya Deshmukh',
      position: 'Transmission Engineering Manager',
      department: 'Transmission Engineering',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      sessions: 67,
      skills: ['Transmission Engineering', 'Project Planning', 'Technical Leadership', 'Grid Design'],
      availability: 'Weekdays 3-5 PM',
      bio: 'Transmission engineering manager with extensive experience in grid design and project planning. Committed to developing technical excellence in power transmission systems.',
      yearsExperience: 18
    },
    {
      id: '5',
      name: 'Shashank Ponna',
      position: 'HR Manager',
      department: 'Human Resources',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      sessions: 43,
      skills: ['Talent Management', 'Performance Review', 'Learning Strategy', 'Career Development'],
      availability: 'Weekdays 1-3 PM',
      bio: 'HR manager specializing in talent development and performance management within the power sector. Expert in designing career development pathways for technical professionals.',
      yearsExperience: 14
    }
  ]

  // Mock mentorship sessions
  const currentMentorships = [
    {
      id: '1',
      mentorName: 'Neha Kedar',
      mentorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      focus: 'Grid Operations Optimization',
      startDate: '2024-12-01',
      progress: 65,
      nextSession: '2025-01-20T14:00:00Z',
      totalSessions: 8,
      completedSessions: 5
    }
  ]

  const upcomingSessions = [
    {
      id: '1',
      mentorName: 'Neha Kedar',
      mentorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      topic: 'Grid Operations Optimization Techniques',
      date: '2025-01-20T14:00:00Z',
      duration: '60 min',
      type: 'video'
    },
    {
      id: '2',
      mentorName: 'Soham Patil',
      mentorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      topic: 'Advanced Grid Management Best Practices',
      date: '2025-01-25T10:00:00Z',
      duration: '45 min',
      type: 'phone'
    }
  ]

  const allSkills = ['all', ...Array.from(new Set(mentors.flatMap(m => m.skills)))]

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSkill = selectedSkill === 'all' || mentor.skills.includes(selectedSkill)
    return matchesSearch && matchesSkill
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">PowerGrid Mentorship Hub</h1>
            <p className="text-blue-100 mt-1">
              Connect with power sector experts and accelerate your technical career growth
            </p>
          </div>
          <div className="flex space-x-3">
            <div className="text-center">
              <div className="text-2xl font-bold">{currentMentorships.length}</div>
              <div className="text-blue-100 text-sm">Active Mentorships</div>
            </div>
            <Button variant="secondary" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Request Mentor
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{mentors.length}</div>
            <div className="text-sm text-gray-600">Available Mentors</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{currentMentorships.length}</div>
            <div className="text-sm text-gray-600">Active Mentorships</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{upcomingSessions.length}</div>
            <div className="text-sm text-gray-600">Upcoming Sessions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {currentMentorships.reduce((acc, m) => acc + m.completedSessions, 0)}
            </div>
            <div className="text-sm text-gray-600">Sessions Completed</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="find-mentors" className="space-y-6">
        <TabsList>
          <TabsTrigger value="find-mentors">Find Mentors</TabsTrigger>
          <TabsTrigger value="my-mentorships">My Mentorships</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="find-mentors">
          <div className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search mentors by name or skill..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select 
                    value={selectedSkill} 
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className="px-3 py-2 border rounded-md bg-white"
                  >
                    {allSkills.map(skill => (
                      <option key={skill} value={skill}>
                        {skill === 'all' ? 'All Skills' : skill}
                      </option>
                    ))}
                  </select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Mentors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor) => (
                <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{mentor.name}</CardTitle>
                    <CardDescription>
                      {mentor.position} • {mentor.department}
                    </CardDescription>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        {mentor.rating}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {mentor.sessions} sessions
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{mentor.bio}</p>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Expertise</h4>
                      <div className="flex flex-wrap gap-1">
                        {mentor.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {mentor.availability}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button className="flex-1">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                      <Button variant="outline">
                        <BookOpen className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="my-mentorships">
          <div className="space-y-6">
            {currentMentorships.length > 0 ? (
              currentMentorships.map((mentorship) => (
                <Card key={mentorship.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>
                            {mentorship.mentorName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{mentorship.mentorName}</h3>
                          <p className="text-sm text-gray-600">{mentorship.focus}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            Started {new Date(mentorship.startDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-gray-600">{mentorship.progress}%</span>
                        </div>
                        <Progress value={mentorship.progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Sessions: {mentorship.completedSessions}/{mentorship.totalSessions}</span>
                        <span>Next: {new Date(mentorship.nextSession).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex space-x-2 mt-4">
                        <Button size="sm">
                          <Video className="w-4 h-4 mr-2" />
                          Join Session
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Mentorships</h3>
                  <p className="text-gray-500 mb-4">Connect with a mentor to start your development journey</p>
                  <Button>Find a Mentor</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="sessions">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={session.mentorAvatar} />
                          <AvatarFallback>
                            {session.mentorName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{session.topic}</h4>
                          <p className="text-sm text-gray-600">with {session.mentorName}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(session.date).toLocaleString()} • {session.duration}
                            {session.type === 'video' ? (
                              <Video className="w-3 h-3 ml-2" />
                            ) : (
                              <Phone className="w-3 h-3 ml-2" />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm">Join</Button>
                        <Button size="sm" variant="outline">Reschedule</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Mentorship Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">
                      {currentMentorships.reduce((acc, m) => acc + m.completedSessions, 0)}
                    </div>
                    <div className="text-sm text-blue-700">Sessions Completed</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">
                      {currentMentorships.length > 0 ? Math.round(currentMentorships.reduce((acc, m) => acc + m.progress, 0) / currentMentorships.length) : 0}%
                    </div>
                    <div className="text-sm text-green-700">Average Progress</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">4.8</div>
                    <div className="text-sm text-purple-700">Average Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Developed */}
            <Card>
              <CardHeader>
                <CardTitle>Skills Developed Through Mentorship</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Leadership', 'Communication', 'Strategic Thinking', 'Team Management'].map((skill, index) => (
                    <div key={skill} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{skill}</span>
                        <Badge className="bg-green-100 text-green-800">
                          +{15 + index * 5}%
                        </Badge>
                      </div>
                      <Progress value={70 + index * 5} className="h-2" />
                    </div>
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

export default MentorshipHub