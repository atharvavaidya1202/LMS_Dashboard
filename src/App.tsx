import React, { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LoginForm from './components/LoginForm'
import Navigation from './components/Navigation'
import EmployeeDashboard from './components/EmployeeDashboard'
import HRDashboard from './components/HRDashboard'
import AdminDashboard from './components/AdminDashboard'
import CourseLibrary from './components/CourseLibrary'
import SkillsTracker from './components/SkillsTracker'

import IDPManager from './components/IDPManager'
import AnalyticsDashboard from './components/AnalyticsDashboard'
import MentorshipHub from './components/MentorshipHub'
import { mockNotifications } from './data/mockData'
import { Toaster } from './components/ui/sonner'

const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth()
  const [currentView, setCurrentView] = useState('dashboard')

  if (!isAuthenticated || !user) {
    return <LoginForm />
  }

  const renderMainContent = () => {
    switch (currentView) {
      case 'dashboard':
        if (user.role === 'employee') return <EmployeeDashboard />
        if (user.role === 'hr') return <HRDashboard />
        if (user.role === 'admin') return <AdminDashboard />
        return <EmployeeDashboard />
      
      case 'courses':
        return <CourseLibrary />
      
      case 'skills':
        return <SkillsTracker />
      

      case 'idp':
        return <IDPManager />
      
      case 'mentorship':
        return <MentorshipHub />
      
      case 'calendar':
        return <div className="p-6">Learning calendar feature coming soon...</div>
      
      case 'team-analytics':
        return <AnalyticsDashboard />
      
      case 'succession':
        return <div className="p-6">Succession planning feature coming soon...</div>
      
      case 'idp-management':
        return <IDPManager />
      
      case 'reports':
        return <AnalyticsDashboard />
      
      case 'user-management':
        return <div className="p-6">User management feature coming soon...</div>
      
      case 'system-analytics':
        return <AnalyticsDashboard />
      
      case 'integrations':
        return <div className="p-6">API integrations feature coming soon...</div>
      
      case 'audit':
        return <div className="p-6">Audit logs feature coming soon...</div>
      
      case 'profile':
        return <div className="p-6">User profile settings coming soon...</div>
      
      default:
        return <EmployeeDashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Navigation 
        currentView={currentView} 
        onViewChange={setCurrentView}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {renderMainContent()}
        </div>
      </main>
      <Toaster />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}