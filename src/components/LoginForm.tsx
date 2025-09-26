import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Alert, AlertDescription } from './ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { useAuth } from '../contexts/AuthContext'
import { GraduationCap, Shield, Users, User } from 'lucide-react'

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    try {
      const success = await login(email, password)
      if (!success) {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  const quickLogin = (userEmail: string) => {
    setEmail(userEmail)
    setPassword('password123') // Mock password
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Powergrid LMS</h1>
          <p className="text-gray-600 mt-2">
            Power Grid Corporation of India Limited - Learning Management System
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Quick Login</CardTitle>
            <CardDescription className="text-center">
              Demo accounts for testing different roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="employee" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="employee">Employee</TabsTrigger>
                <TabsTrigger value="hr">HR</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>
              
              <TabsContent value="employee" className="space-y-2 mt-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => quickLogin('atharva.vaidya@powergridindia.com')}
                >
                  <User className="mr-2 h-4 w-4" />
                  Atharva Vaidya - Grid Operations Engineer
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => quickLogin('soham.patil@powergridindia.com')}
                >
                  <User className="mr-2 h-4 w-4" />
                  Soham Patil - Senior Electrical Engineer
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => quickLogin('neha.kedar@powergridindia.com')}
                >
                  <User className="mr-2 h-4 w-4" />
                  Neha Kedar - IT & Digital Manager
                </Button>
              </TabsContent>
              
              <TabsContent value="hr" className="space-y-2 mt-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => quickLogin('shashank.ponna@powergridindia.com')}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Shashank Ponna - HR Manager
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => quickLogin('priya.deshmukh@powergridindia.com')}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Priya Deshmukh - Transmission Engineering Manager
                </Button>
              </TabsContent>
              
              <TabsContent value="admin" className="space-y-2 mt-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => quickLogin('vivek.dalimbkar@powergridindia.com')}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Vivek Dalimbkar - Corporate Administrator
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LoginForm