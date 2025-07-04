import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Settings, FileText, Users, Plus, Lock } from 'lucide-react'
import { useDocuments } from '../../hooks'
import { useUserManagement } from '../../hooks'
import DocumentActionsWidget from '../Operations/DocumentActionsWidget'

const DepartmentPage = () => {
  const { department } = useParams<{ department: string }>()
  const navigate = useNavigate()
  const { documents } = useDocuments()
  const { isAdmin } = useUserManagement()

  // Department configurations
  const departmentConfig = {
    'foster-adopt': {
      title: 'Foster & Adopt',
      description: 'Foster care and adoption services management',
      color: 'pink',
      icon: '❤️',
      features: [
        'Family assessments and documentation',
        'Adoption process tracking',
        'Foster family management',
        'Child placement coordination',
        'Legal documentation',
        'Training and certification records'
      ]
    },
    'r-kids': {
      title: 'R/Kids',
      description: 'Children\'s ministry programs and activities',
      color: 'blue',
      icon: '👶',
      features: [
        'Children\'s program planning',
        'Volunteer coordination',
        'Safety and security protocols',
        'Curriculum and materials',
        'Parent communication',
        'Event planning and execution'
      ]
    },
    'r-youth': {
      title: 'R/Youth',
      description: 'Youth ministry and engagement programs',
      color: 'green',
      icon: '🎮',
      features: [
        'Youth program development',
        'Event planning and trips',
        'Small group coordination',
        'Volunteer leadership training',
        'Parent and student communication',
        'Discipleship tracking'
      ]
    },
    'creative-media': {
      title: 'Creative Media',
      description: 'Media production and creative services',
      color: 'purple',
      icon: '📸',
      features: [
        'Video production planning',
        'Graphic design projects',
        'Photography coordination',
        'Brand asset management',
        'Equipment and resource tracking',
        'Creative project workflows'
      ]
    },
    'cge': {
      title: 'CGE',
      description: 'Christian Growth & Education programs',
      color: 'indigo',
      icon: '🎓',
      features: [
        'Educational program development',
        'Curriculum planning',
        'Teacher and leader resources',
        'Student progress tracking',
        'Class scheduling',
        'Resource and material management'
      ]
    },
    'worship': {
      title: 'Worship',
      description: 'Worship ministry and music coordination',
      color: 'orange',
      icon: '🎵',
      features: [
        'Service planning and coordination',
        'Music team scheduling',
        'Song and setlist management',
        'Equipment and instrument tracking',
        'Volunteer musician coordination',
        'Special event worship planning'
      ]
    },
    'sunday-production': {
      title: 'Sunday Production',
      description: 'Sunday service production and technical operations',
      color: 'red',
      icon: '📺',
      features: [
        'Service production planning',
        'Technical equipment management',
        'Volunteer tech team coordination',
        'Audio/visual setup tracking',
        'Live streaming coordination',
        'Equipment maintenance schedules'
      ]
    },
    'elder-board': {
      title: 'Elder Board',
      description: 'Elder board governance and decision making',
      color: 'gray',
      icon: '🛡️',
      features: [
        'Board meeting planning',
        'Decision tracking and documentation',
        'Policy development',
        'Strategic planning',
        'Governance oversight',
        'Leadership development'
      ]
    },
    'deacon-board': {
      title: 'Deacon Board',
      description: 'Deacon board service and support coordination',
      color: 'cyan',
      icon: '👥',
      features: [
        'Service project coordination',
        'Community outreach planning',
        'Member care and support',
        'Facility and maintenance oversight',
        'Volunteer coordination',
        'Resource allocation'
      ]
    }
  }

  const config = departmentConfig[department as keyof typeof departmentConfig]
  
  if (!config) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Department Not Found</h2>
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Return to Dashboard
        </button>
      </div>
    )
  }

  // Check if user has access to this department (for demo, we'll show access for all)
  const hasAccess = true // In real implementation, this would check user permissions

  // Filter documents by department
  const departmentDocuments = documents.filter(doc => 
    doc.category.toLowerCase().includes(department?.toLowerCase() || '') ||
    doc.tags.some(tag => tag.toLowerCase().includes(department?.toLowerCase() || ''))
  )

  if (!hasAccess) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{config.title}</h1>
            <p className="text-gray-600 mt-1">{config.description}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="bg-red-100 rounded-full p-6 mx-auto w-24 h-24 flex items-center justify-center mb-6">
            <Lock className="h-12 w-12 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Access Restricted
          </h3>
          <p className="text-gray-600 mb-6">
            You don't have access to the {config.title} department. Contact your administrator to request access.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
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
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
              <span className="text-2xl">{config.icon}</span>
              <span>{config.title}</span>
            </h1>
            <p className="text-gray-600 mt-1">{config.description}</p>
          </div>
        </div>
        
        {isAdmin && (
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <Settings className="h-4 w-4" />
            <span>Manage Access</span>
          </button>
        )}
      </div>

      {/* Department Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`bg-${config.color}-500 p-3 rounded-lg`}>
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Documents</p>
              <p className="text-2xl font-bold text-gray-900">{departmentDocuments.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`bg-${config.color}-500 p-3 rounded-lg`}>
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Team Members</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`bg-${config.color}-500 p-3 rounded-lg`}>
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Projects</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`bg-${config.color}-500 p-3 rounded-lg`}>
              <Plus className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Resources</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Department Features */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Department Features & Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {config.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 bg-${config.color}-500 rounded-full`}></div>
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Document Management */}
      <DocumentActionsWidget 
        category={department || ''}
        categoryTitle={config.title}
        color={config.color}
      />

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/upload')}
            className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            <FileText className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600 font-medium">Upload Documents</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors">
            <Users className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600 font-medium">Manage Team</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors">
            <Settings className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600 font-medium">Department Settings</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DepartmentPage