import { FileText, Clock, AlertTriangle, Users, Calculator, Palette, MessageSquare, Mail, UserCheck, Video, Scale, Monitor } from 'lucide-react'
import { useDocuments } from '../hooks'
import { useUserManagement } from '../hooks'
import { format, isAfter, isBefore, addDays } from 'date-fns'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { documents, loading: documentsLoading } = useDocuments()
  const { userProfile, organization, loading: userLoading } = useUserManagement()
  const navigate = useNavigate()

  const loading = documentsLoading || userLoading

  // Calculate real stats from documents
  const totalDocuments = documents.length
  const expiringSoon = documents.filter(doc => {
    if (!doc.expiry_date) return false
    const expiryDate = new Date(doc.expiry_date)
    const thirtyDaysFromNow = addDays(new Date(), 30)
    return isAfter(expiryDate, new Date()) && isBefore(expiryDate, thirtyDaysFromNow)
  }).length
  
  const overdue = documents.filter(doc => {
    if (!doc.expiry_date) return false
    return isBefore(new Date(doc.expiry_date), new Date())
  }).length

  const stats = [
    { label: 'Total Documents', value: totalDocuments.toString(), icon: FileText, color: 'bg-blue-500' },
    { label: 'Expiring Soon', value: expiringSoon.toString(), icon: Clock, color: 'bg-yellow-500' },
    { label: 'Overdue', value: overdue.toString(), icon: AlertTriangle, color: 'bg-red-500' },
    { label: 'Categories', value: new Set(documents.map(d => d.category)).size.toString(), icon: Users, color: 'bg-green-500' },
  ]

  // Business operation categories
  const businessCategories = [
    {
      id: 'hr',
      name: 'HR',
      description: 'Human Resources Management',
      icon: UserCheck,
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      route: '/operations/hr'
    },
    {
      id: 'accounting',
      name: 'Accounting',
      description: 'Financial Management & Bookkeeping',
      icon: Calculator,
      color: 'bg-green-600 hover:bg-green-700',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      route: '/operations/accounting'
    },
    {
      id: 'legal',
      name: 'Legal',
      description: 'Legal Affairs & Compliance',
      icon: Scale,
      color: 'bg-gray-600 hover:bg-gray-700',
      textColor: 'text-gray-600',
      bgColor: 'bg-gray-50',
      route: '/operations/legal'
    },
    {
      id: 'branding',
      name: 'Branding',
      description: 'Brand Management & Design',
      icon: Palette,
      color: 'bg-purple-600 hover:bg-purple-700',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      route: '/operations/branding'
    },
    {
      id: 'social-media',
      name: 'Social Media',
      description: 'Social Media Management',
      icon: MessageSquare,
      color: 'bg-pink-600 hover:bg-pink-700',
      textColor: 'text-pink-600',
      bgColor: 'bg-pink-50',
      route: '/operations/social-media'
    },
    {
      id: 'communications',
      name: 'Communications',
      description: 'Internal & External Communications',
      icon: Mail,
      color: 'bg-indigo-600 hover:bg-indigo-700',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      route: '/operations/communications'
    },
    {
      id: 'volunteer-management',
      name: 'Volunteer/People Management',
      description: 'Volunteer Coordination & Management',
      icon: Users,
      color: 'bg-orange-600 hover:bg-orange-700',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      route: '/operations/volunteer-management'
    },
    {
      id: 'streaming',
      name: 'Streaming: Video & Podcast',
      description: 'Media Production & Broadcasting',
      icon: Video,
      color: 'bg-red-600 hover:bg-red-700',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
      route: '/operations/streaming'
    },
    {
      id: 'it',
      name: 'IT & Technology',
      description: 'Technology Infrastructure & Digital Tools',
      icon: Monitor,
      color: 'bg-cyan-600 hover:bg-cyan-700',
      textColor: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      route: '/operations/it'
    }
  ]

  // Get recent documents (last 5)
  const recentDocuments = documents.slice(0, 5)

  // Get upcoming renewals
  const upcomingRenewals = documents
    .filter(doc => doc.expiry_date)
    .sort((a, b) => new Date(a.expiry_date!).getTime() - new Date(b.expiry_date!).getTime())
    .slice(0, 5)

  const handleCategoryClick = (route: string) => {
    navigate(route)
  }

  // Show organization setup if user doesn't have one
  if (!loading && userProfile && !userProfile.organization_id) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome to Adminezer</h2>
          <p className="text-gray-600 mt-2">Let's get you set up with your organization</p>
        </div>

        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="bg-blue-100 rounded-full p-6 mx-auto w-24 h-24 flex items-center justify-center mb-6">
            <Users className="h-12 w-12 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Set up your organization
          </h3>
          <p className="text-gray-600 mb-6">
            Create or join an organization to start managing documents and collaborating with your team.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/users')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Set Up Organization
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Business Operations Dashboard</h2>
          <p className="text-gray-600">Centralized hub for all your business operations</p>
        </div>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow p-8">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Business Operations Dashboard</h2>
        <p className="text-gray-600 mt-2">
          Centralized hub for all your business operations and document management
          {organization && (
            <span className="block text-sm text-blue-600 mt-1">
              {organization.name}
            </span>
          )}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Business Operations Categories */}
      <div className="bg-white rounded-lg shadow p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Business Operations</h3>
          <p className="text-gray-600 mt-2">Access your integrated business tools and services</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {businessCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.route)}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 text-left transition-all duration-200 hover:border-gray-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${category.bgColor} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <category.icon className={`h-6 w-6 ${category.textColor}`} />
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
                {category.name}
              </h4>
              
              <p className="text-sm text-gray-600 group-hover:text-gray-500">
                {category.description}
              </p>
              
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
          ))}
        </div>
      </div>

      {/* Document Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Documents</h3>
            <button 
              onClick={() => navigate('/documents')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View all
            </button>
          </div>
          <div className="space-y-3">
            {recentDocuments.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm mb-4">No documents uploaded yet</p>
                <button
                  onClick={() => navigate('/upload')}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Upload your first document
                </button>
              </div>
            ) : (
              recentDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                    <p className="text-sm text-gray-600">{doc.category}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {format(new Date(doc.created_at), 'MMM dd, yyyy')}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Renewals</h3>
            <button 
              onClick={() => navigate('/documents')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Manage
            </button>
          </div>
          <div className="space-y-3">
            {upcomingRenewals.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm mb-4">No documents with expiry dates</p>
                <button
                  onClick={() => navigate('/upload')}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Add documents with expiry dates
                </button>
              </div>
            ) : (
              upcomingRenewals.map((doc) => {
                const expiryDate = new Date(doc.expiry_date!)
                const isOverdue = isBefore(expiryDate, new Date())
                const isExpiringSoon = !isOverdue && isBefore(expiryDate, addDays(new Date(), 30))
                
                return (
                  <div key={doc.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-600">
                        Expires: {format(expiryDate, 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      isOverdue ? 'bg-red-100 text-red-800' :
                      isExpiringSoon ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {isOverdue ? 'overdue' : isExpiringSoon ? 'soon' : 'ok'}
                    </span>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard