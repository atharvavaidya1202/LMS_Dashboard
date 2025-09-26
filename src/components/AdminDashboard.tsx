import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Switch } from './ui/switch'
import { useAuth } from '../contexts/AuthContext'
import { mockUsers, mockAnalytics } from '../data/mockData'
import {
  Shield,
  Users,
  Database,
  Activity,
  Server,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings,
  Key,
  Globe,
  Monitor,
  HardDrive,
  Cpu,
  Wifi,
  Bell,
  Lock,
  UserCheck,
  LogOut
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth()
  // Admin manages only HR, Manager, and other Admin accounts - NOT individual employees
  const managedUsers = [
    {
      id: '2',
      name: 'Shashank Ponna',
      email: 'shashank.ponna@powergrid.in',
      role: 'hr',
      department: 'Learning & Development',
      avatar: '',
      lastLogin: Date.now() - 86400000,
      status: 'active'
    },
    {
      id: 'hr2',
      name: 'Priya Sharma',
      email: 'priya.sharma@powergrid.in',
      role: 'hr',
      department: 'Learning & Development',
      avatar: '',
      lastLogin: Date.now() - 86400000,
      status: 'active'
    },
    {
      id: 'mgr1',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@powergrid.in',
      role: 'manager',
      department: 'Transmission',
      avatar: '',
      lastLogin: Date.now() - 172800000,
      status: 'active'
    },
    {
      id: 'mgr2',
      name: 'Anita Desai',
      email: 'anita.desai@powergrid.in',
      role: 'manager',
      department: 'Distribution',
      avatar: '',
      lastLogin: Date.now() - 259200000,
      status: 'active'
    },
    {
      id: 'admin2',
      name: 'Karthik Nair',
      email: 'karthik.nair@powergrid.in',
      role: 'admin',
      department: 'IT Administration',
      avatar: '',
      lastLogin: Date.now() - 432000000,
      status: 'active'
    }
  ]
  const systemHealth = {
    cpu: 45,
    memory: 68,
    storage: 32,
    network: 12
  }

  const userActivityData = [
    { hour: '00', active: 45 },
    { hour: '04', active: 12 },
    { hour: '08', active: 234 },
    { hour: '12', active: 567 },
    { hour: '16', active: 489 },
    { hour: '20', active: 234 },
    { hour: '24', active: 98 }
  ]

  const integrationStatus = [
    { name: 'HRMS System', status: 'connected', lastSync: '2 minutes ago', health: 95 },
    { name: 'LMS Platform', status: 'connected', lastSync: '5 minutes ago', health: 98 },
    { name: 'Performance System', status: 'warning', lastSync: '2 hours ago', health: 78 },
    { name: 'Payroll System', status: 'disconnected', lastSync: '1 day ago', health: 0 }
  ]

  const auditLogs = [
    { timestamp: '2025-01-15 10:30:00', user: 'admin', action: 'User role updated', details: 'Changed Soham Patil role to Senior Engineer', severity: 'medium' },
    { timestamp: '2025-01-15 09:15:00', user: 'system', action: 'Data sync completed', details: 'PowerGrid HRMS sync completed successfully', severity: 'low' },
    { timestamp: '2025-01-15 08:45:00', user: 'hr_manager', action: 'IDP approved', details: 'Approved IDP for Atharva Vaidya', severity: 'low' },
    { timestamp: '2025-01-15 08:30:00', user: 'admin', action: 'Security alert', details: 'Multiple failed login attempts detected', severity: 'high' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'disconnected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />
      case 'disconnected':
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-600'
    if (health >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">LMS System Administration</h1>
            <p className="text-gray-300 mt-1">
              Monitor learning platform health, manage users, and configure integrations
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">System Online</span>
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

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Cpu className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{systemHealth.cpu}%</p>
                  <p className="text-gray-600 text-sm">CPU Usage</p>
                </div>
              </div>
              <div className={`text-2xl ${getHealthColor(100 - systemHealth.cpu)}`}>
                {systemHealth.cpu < 80 ? '✓' : '⚠'}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <HardDrive className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{systemHealth.memory}%</p>
                  <p className="text-gray-600 text-sm">Memory</p>
                </div>
              </div>
              <div className={`text-2xl ${getHealthColor(100 - systemHealth.memory)}`}>
                {systemHealth.memory < 80 ? '✓' : '⚠'}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Database className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{systemHealth.storage}%</p>
                  <p className="text-gray-600 text-sm">Storage</p>
                </div>
              </div>
              <div className={`text-2xl ${getHealthColor(100 - systemHealth.storage)}`}>
                ✓
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Wifi className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{systemHealth.network}ms</p>
                  <p className="text-gray-600 text-sm">Latency</p>
                </div>
              </div>
              <div className="text-2xl text-green-600">✓</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="analytics">System Analytics</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="mr-2 h-5 w-5" />
                HR & Manager Account Management
              </CardTitle>
              <CardDescription>Manage HR, Manager, and Admin accounts (Employee data managed by HR)</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Info Alert */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="font-medium text-blue-900">Access Level Information</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      As a Corporate Admin, you manage only HR, Manager, and Admin accounts. 
                      Individual employee data and learning records are managed by HR teams to ensure privacy compliance.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {managedUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className={getStatusColor('connected')}>
                            {user.role.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-gray-500">{user.department}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          Last login: {new Date(user.lastLogin).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          Account Status: Active
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch checked={true} />
                        <Button size="sm" variant="outline">
                          <Settings className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Managed Account Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {managedUsers.filter(u => u.role === 'hr').length}
                    </p>
                    <p className="text-gray-600 text-sm">HR Accounts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {managedUsers.filter(u => u.role === 'manager').length}
                    </p>
                    <p className="text-gray-600 text-sm">Manager Accounts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Shield className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {managedUsers.filter(u => u.role === 'admin').length}
                    </p>
                    <p className="text-gray-600 text-sm">Admin Accounts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Activity Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  User Activity (24h)
                </CardTitle>
                <CardDescription>Active users throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="active" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* System Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Monitor className="mr-2 h-5 w-5" />
                  System Performance
                </CardTitle>
                <CardDescription>Resource utilization metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">CPU Usage</span>
                    <span className="text-sm text-gray-600">{systemHealth.cpu}%</span>
                  </div>
                  <Progress value={systemHealth.cpu} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Memory Usage</span>
                    <span className="text-sm text-gray-600">{systemHealth.memory}%</span>
                  </div>
                  <Progress value={systemHealth.memory} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Storage Usage</span>
                    <span className="text-sm text-gray-600">{systemHealth.storage}%</span>
                  </div>
                  <Progress value={systemHealth.storage} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Network Latency</span>
                    <span className="text-sm text-gray-600">{systemHealth.network}ms</span>
                  </div>
                  <Progress value={100 - systemHealth.network} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Department Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="mr-2 h-5 w-5" />
                Department Analytics
              </CardTitle>
              <CardDescription>User distribution and activity by department</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockAnalytics.departmentProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="employees" fill="#8884d8" />
                  <Bar dataKey="completion" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          {/* Integration Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                System Integrations
              </CardTitle>
              <CardDescription>Monitor external system connections and health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrationStatus.map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        {getStatusIcon(integration.status)}
                      </div>
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-sm text-gray-600">Last sync: {integration.lastSync}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className={`text-lg font-semibold ${getHealthColor(integration.health)}`}>
                          {integration.health}%
                        </div>
                        <div className="text-xs text-gray-500">Health</div>
                      </div>
                      <Badge variant="outline" className={getStatusColor(integration.status)}>
                        {integration.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3 mr-1" />
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* API Health */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">2</p>
                    <p className="text-gray-600 text-sm">Connected</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">1</p>
                    <p className="text-gray-600 text-sm">Warning</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">1</p>
                    <p className="text-gray-600 text-sm">Disconnected</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          {/* Audit Logs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Audit Logs
              </CardTitle>
              <CardDescription>System activity and security events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {auditLogs.map((log, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <Badge variant="outline" className={getSeverityColor(log.severity)}>
                        {log.severity}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-medium">{log.action}</h3>
                        <span className="text-xs text-gray-500">by {log.user}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                      <p className="text-xs text-gray-500 mt-1">{log.timestamp}</p>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Bell className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Lock className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">99.8%</p>
                    <p className="text-gray-600 text-sm">Uptime</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Key className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">0</p>
                    <p className="text-gray-600 text-sm">Security Threats</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Server className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">4</p>
                    <p className="text-gray-600 text-sm">Active Sessions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminDashboard