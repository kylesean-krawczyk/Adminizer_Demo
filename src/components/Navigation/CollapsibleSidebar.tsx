import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  FileText, 
  Building2, 
  Users, 
  Shield,
  Heart, 
  Baby, 
  Gamepad2, 
  Camera, 
  GraduationCap, 
  Music, 
  Tv, 
  Users2,
  UserCheck, 
  Calculator, 
  Scale, 
  Palette, 
  MessageSquare, 
  Mail, 
  Video, 
  Monitor,
  DollarSign
} from 'lucide-react'
import { Settings } from 'lucide-react'
import { useUserManagement } from '../../hooks'

const CollapsibleSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAdmin } = useUserManagement()
  
  // Load initial state from sessionStorage, default to expanded
  const [isExpanded, setIsExpanded] = useState(() => {
    const saved = sessionStorage.getItem('sidebar-expanded')
    return saved !== null ? JSON.parse(saved) : true
  })
  
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['departments']))
  const [isMobileOverlay, setIsMobileOverlay] = useState(false)

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('sidebar-expanded', JSON.stringify(isExpanded))
  }, [isExpanded])

  // Close mobile overlay when route changes
  useEffect(() => {
    setIsMobileOverlay(false)
  }, [location.pathname])

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
    setIsMobileOverlay(false)
  }

  const toggleMobileOverlay = () => {
    setIsMobileOverlay(!isMobileOverlay)
  }

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const businessDepartments = [
    {
      id: 'foster-adopt',
      name: 'Foster & Adopt',
      icon: Heart,
      route: '/department/foster-adopt'
    },
    {
      id: 'r-kids',
      name: 'R/Kids',
      icon: Baby,
      route: '/department/r-kids'
    },
    {
      id: 'r-youth',
      name: 'R/Youth',
      icon: Gamepad2,
      route: '/department/r-youth'
    },
    {
      id: 'creative-media',
      name: 'Creative Media',
      icon: Camera,
      route: '/department/creative-media'
    },
    {
      id: 'cge',
      name: 'CGE',
      icon: GraduationCap,
      route: '/department/cge'
    },
    {
      id: 'worship',
      name: 'Worship',
      icon: Music,
      route: '/department/worship'
    },
    {
      id: 'sunday-production',
      name: 'Sunday Production',
      icon: Tv,
      route: '/department/sunday-production'
    },
    {
      id: 'elder-board',
      name: 'Elder Board',
      icon: Shield,
      route: '/department/elder-board'
    },
    {
      id: 'deacon-board',
      name: 'Deacon Board',
      icon: Users2,
      route: '/department/deacon-board'
    },
    {
      id: 'fundraising-donor-management',
      name: 'Fundraising & Donor Management',
      icon: DollarSign,
      route: '/department/fundraising-donor-management'
    }
  ]

  const operationsCategories = [
    {
      id: 'hr',
      name: 'HR',
      icon: UserCheck,
      route: '/operations/hr'
    },
    {
      id: 'accounting',
      name: 'Accounting',
      icon: Calculator,
      route: '/operations/accounting'
    },
    {
      id: 'legal',
      name: 'Legal',
      icon: Scale,
      route: '/operations/legal'
    },
    {
      id: 'branding',
      name: 'Branding',
      icon: Palette,
      route: '/operations/branding'
    },
    {
      id: 'social-media',
      name: 'Social Media',
      icon: MessageSquare,
      route: '/operations/social-media'
    },
    {
      id: 'communications',
      name: 'Communications',
      icon: Mail,
      route: '/operations/communications'
    },
    {
      id: 'volunteer-management',
      name: 'Volunteer/People Management',
      icon: Users,
      route: '/operations/volunteer-management'
    },
    {
      id: 'streaming',
      name: 'Streaming: Video & Podcast',
      icon: Video,
      route: '/operations/streaming'
    },
    {
      id: 'it',
      name: 'IT & Technology',
      icon: Monitor,
      route: '/operations/it'
    }
  ]

  const adminItems = [
    {
      id: 'users',
      name: 'Users',
      icon: Users,
      route: '/users'
    },
    {
      id: 'oauth',
      name: 'OAuth',
      icon: Shield,
      route: '/oauth'
    }
  ]

  const isActive = (route: string) => {
    return location.pathname === route || 
           (route !== '/' && location.pathname.startsWith(route))
  }

  const handleNavigation = (route: string) => {
    navigate(route)
    if (window.innerWidth < 768) {
      setIsMobileOverlay(false)
    }
  }

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-600">
        <div className="flex items-center justify-between">
          {isExpanded && (
            <h2 className="text-lg font-semibold text-white">Navigation</h2>
          )}
          <button
            onClick={isMobile ? toggleMobileOverlay : toggleSidebar}
            className="p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-lg transition-colors"
            aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isMobile || !isExpanded ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Navigation Content */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-2">
          {/* Document Center */}
          <div className="px-4">
            <button
              onClick={() => handleNavigation('/documents')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive('/documents')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-600'
              }`}
              title={!isExpanded ? 'Document Center' : undefined}
            >
              <FileText className="h-5 w-5 flex-shrink-0" />
              {isExpanded && <span className="font-medium">Document Center</span>}
            </button>
          </div>

          {/* Business Departments */}
          <div className="px-4">
            <button
              onClick={() => isExpanded && toggleSection('departments')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                location.pathname.startsWith('/department')
                  ? 'bg-gray-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-600'
              }`}
              title={!isExpanded ? 'Business Departments' : undefined}
            >
              <div className="flex items-center space-x-3">
                <Building2 className="h-5 w-5 flex-shrink-0" />
                {isExpanded && <span className="font-medium">Business Departments</span>}
              </div>
              {isExpanded && (
                expandedSections.has('departments') 
                  ? <ChevronDown className="h-4 w-4" />
                  : <ChevronRight className="h-4 w-4" />
              )}
            </button>
            
            {isExpanded && expandedSections.has('departments') && (
              <div className="mt-2 ml-6 space-y-1">
                {businessDepartments.map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => handleNavigation(dept.route)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive(dept.route)
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-600'
                    }`}
                  >
                    <dept.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{dept.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Operations Center */}
          <div className="px-4">
            <button
              onClick={() => isExpanded ? toggleSection('operations') : handleNavigation('/operations')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                location.pathname.startsWith('/operations')
                  ? 'bg-gray-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-600'
              }`}
              title={!isExpanded ? 'Operations Center' : undefined}
            >
              <div className="flex items-center space-x-3">
                <Settings className="h-5 w-5 flex-shrink-0" />
                {isExpanded && <span className="font-medium">Operations Center</span>}
              </div>
              {isExpanded && (
                expandedSections.has('operations') 
                  ? <ChevronDown className="h-4 w-4" />
                  : <ChevronRight className="h-4 w-4" />
              )}
            </button>
            
            {isExpanded && expandedSections.has('operations') && (
              <div className="mt-2 ml-6 space-y-1">
                {operationsCategories.map((op) => (
                  <button
                    key={op.id}
                    onClick={() => handleNavigation(op.route)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive(op.route)
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-600'
                    }`}
                  >
                    <op.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{op.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Admin Section */}
          {isAdmin && (
            <div className="px-4">
              <button
                onClick={() => isExpanded && toggleSection('admin')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === '/users' || location.pathname === '/oauth'
                    ? 'bg-gray-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-600'
                }`}
                title={!isExpanded ? 'Admin' : undefined}
              >
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 flex-shrink-0" />
                  {isExpanded && <span className="font-medium">Admin</span>}
                </div>
                {isExpanded && (
                  expandedSections.has('admin') 
                    ? <ChevronDown className="h-4 w-4" />
                    : <ChevronRight className="h-4 w-4" />
                )}
              </button>
              
              {isExpanded && expandedSections.has('admin') && (
                <div className="mt-2 ml-6 space-y-1">
                  {adminItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.route)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive(item.route)
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-600'
                      }`}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleMobileOverlay}
        className="md:hidden fixed top-20 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg shadow-lg"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOverlay && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleMobileOverlay} />
          <div className="relative w-80 h-full bg-gray-800 shadow-xl">
            <SidebarContent isMobile={true} />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div 
        className={`hidden md:flex flex-col bg-gray-800 border-r border-gray-600 transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-64' : 'w-16'
        }`}
        style={{ height: 'calc(100vh - 4rem)' }} // Account for top navigation height
      >
        {/* Toggle Button */}
        <div className="p-4 border-b border-gray-600">
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-lg transition-colors"
            aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <SidebarContent />
      </div>
    </>
  )
}

export default CollapsibleSidebar