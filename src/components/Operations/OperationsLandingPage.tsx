import { useNavigate } from 'react-router-dom'
import { ArrowLeft, UserCheck, Calculator, Scale, Palette, MessageSquare, Mail, Users, Video, Monitor } from 'lucide-react'
import { useDocuments } from '../../hooks'
import { useUserManagement } from '../../hooks'
import { extractColorFromClass } from '../../utils/tailwindColors'

const OperationsLandingPage = () => {
  const navigate = useNavigate()
  const { documents } = useDocuments()
  const { isAdmin } = useUserManagement()

  // Business operation categories (moved from Dashboard)
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

  const handleCategoryClick = (route: string) => {
    navigate(route)
  }

  // Calculate stats for operations
  const operationsStats = [
    {
      label: 'Total Operations',
      value: businessCategories.length.toString(),
      description: 'Available business operations'
    },
    {
      label: 'Active Integrations',
      value: '12',
      description: 'Connected services'
    },
    {
      label: 'Documents',
      value: documents.length.toString(),
      description: 'Total documents managed'
    },
    {
      label: 'Access Level',
      value: isAdmin ? 'Admin' : 'User',
      description: 'Your permission level'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Operations Center</h1>
            <p className="text-gray-600 mt-1">Manage your organization's business operations and integrations</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {operationsStats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Operations Categories */}
      <div className="bg-white rounded-lg shadow p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Business Operations</h2>
          <p className="text-gray-600 mt-2">Access your integrated business tools and administrative functions</p>
        </div>
        
        <div className="hexagon-grid">
          {businessCategories.map((category) => (
            <div
              key={category.id}
              className="hexagon-item"
            >
              <button
                onClick={() => handleCategoryClick(category.route)}
                className="hexagon-button group"
                style={{
                  '--hex-border-color': '#e2e8f0',
                  '--hex-content-bg': '#ffffff',
                  '--hex-icon-color': extractColorFromClass(category.textColor),
                  '--hex-title-color': '#1f2937',
                  '--hex-description-color': '#6b7280',
                  '--hex-hover-border-color': extractColorFromClass(category.color.replace('hover:', '')),
                  '--hex-hover-content-bg': extractColorFromClass(category.bgColor),
                  '--hex-hover-icon-color': extractColorFromClass(category.color.replace('hover:', '')),
                  '--hex-hover-title-color': extractColorFromClass(category.color.replace('hover:', '')),
                  '--hex-hover-description-color': '#4b5563'
                } as React.CSSProperties}
              >
                <div className="hexagon-content">
                  <div className="hexagon-icon">
                    <category.icon className="h-8 w-8" />
                  </div>
                  <h4 className="hexagon-title">
                    {category.name}
                  </h4>
                  <p className="hexagon-description">
                    {category.description}
                  </p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Access Information */}
      <div className="bg-blue-50 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 rounded-lg p-3">
            <UserCheck className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Access Management</h3>
            <p className="text-blue-800 mb-4">
              Your access to operations is managed by your organization administrators. 
              Contact your admin if you need access to additional operations areas.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-blue-700">
                <strong>Current Role:</strong> {isAdmin ? 'Administrator' : 'User'}
              </span>
              <span className="text-blue-700">
                <strong>Access Level:</strong> {isAdmin ? 'Full Access' : 'Restricted Access'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OperationsLandingPage