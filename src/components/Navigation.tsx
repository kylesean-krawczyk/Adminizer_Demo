import { Link, useLocation } from 'react-router-dom'
import { FileText, Upload, BarChart3, LogOut, User, Users, Shield } from 'lucide-react'
import { useAuth } from '../contexts/DemoAuthContext'
import { useUserManagement } from '../hooks'

const Navigation = () => {
  const location = useLocation()
  const { user, signOut } = useAuth()
  const { userProfile, isAdmin } = useUserManagement()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: BarChart3 },
    { path: '/documents', label: 'Documents', icon: FileText },
    { path: '/upload', label: 'Upload', icon: Upload },
  ]

  // Add admin-only items
  if (isAdmin) {
    navItems.push({ path: '/users', label: 'Users', icon: Users })
    navItems.push({ path: '/oauth', label: 'OAuth', icon: Shield })
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'master_admin':
        return { text: 'Master Admin', color: 'bg-purple-100 text-purple-800' }
      case 'admin':
        return { text: 'Admin', color: 'bg-blue-100 text-blue-800' }
      default:
        return { text: 'User', color: 'bg-gray-100 text-gray-800' }
    }
  }

  const roleBadge = userProfile ? getRoleBadge(userProfile.role) : null

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-gray-900">
              Adminezer
            </h1>
            <div className="flex space-x-4">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === path
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <User size={16} />
                <div className="text-right">
                  <div className="font-medium text-gray-900">
                    {userProfile?.full_name || user?.email}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{user?.email}</span>
                    {roleBadge && (
                      <span className={`px-2 py-0.5 text-xs rounded-full ${roleBadge.color}`}>
                        {roleBadge.text}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              <LogOut size={16} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation