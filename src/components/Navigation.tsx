import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { useAuth } from '../contexts/AuthContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {
  Home,
  BookOpen,
  Users,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  User,
  Shield,

  Target,
  Award,
  Calendar,
  TrendingUp
} from 'lucide-react'

interface NavigationProps {
  currentView: string
  onViewChange: (view: string) => void
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const { user, logout } = useAuth()

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800'
      case 'hr':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-green-100 text-green-800'
    }
  }

  const getNavigationItems = () => {
    const commonItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'courses', label: 'Courses', icon: BookOpen },
      { id: 'skills', label: 'Skills', icon: Target },
    ]

    if (user?.role === 'employee') {
      return [
        ...commonItems,
        { id: 'idp', label: 'My IDP', icon: Award },
        { id: 'mentorship', label: 'Mentorship', icon: Users },
        { id: 'calendar', label: 'Calendar', icon: Calendar },
      ]
    }

    if (user?.role === 'hr') {
      return [
        ...commonItems,
        { id: 'team-analytics', label: 'Team Analytics', icon: BarChart3 },
        { id: 'succession', label: 'Succession Planning', icon: TrendingUp },
        { id: 'idp-management', label: 'IDP Management', icon: Award },
        { id: 'reports', label: 'Reports', icon: BarChart3 },
      ]
    }

    if (user?.role === 'admin') {
      return [
        ...commonItems,
        { id: 'user-management', label: 'User Management', icon: Users },
        { id: 'system-analytics', label: 'System Analytics', icon: BarChart3 },
        { id: 'integrations', label: 'Integrations', icon: Settings },
        { id: 'audit', label: 'Audit Logs', icon: Shield },
      ]
    }

    return commonItems
  }

  if (!user) return null

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">LMS Dashboard</h1>
            <p className="text-sm text-gray-500">Learning Platform</p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.position}</p>
            <Badge 
              variant="secondary" 
              className={`text-xs mt-1 ${getRoleColor(user.role)}`}
            >
              {user.role.toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {getNavigationItems().map((item) => (
            <li key={item.id}>
              <Button
                variant={currentView === item.id ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => onViewChange(item.id)}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}

              </Button>
            </li>
          ))}
        </ul>
      </nav>

      <Separator />

      {/* Footer Actions */}
      <div className="p-4 space-y-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={logout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onViewChange('profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Preferences</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Navigation