import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Settings, FileText, Users, Plus, Lock, DollarSign, TrendingUp, BarChart3, Brain } from 'lucide-react'
import { useDocuments } from '../../hooks'
import { useUserManagement } from '../../hooks'
import DocumentActionsWidget from '../Operations/DocumentActionsWidget'
import DonorAnalyticsPlatform from '../DonorAnalytics/DonorAnalyticsPlatform'

const FundraisingDepartmentPage = () => {
  const navigate = useNavigate()
  const { documents } = useDocuments()
  const { isAdmin } = useUserManagement()

  // Department configuration for Fundraising & Donor Management
  const departmentConfig = {
    title: 'Fundraising & Donor Management',
    description: 'Comprehensive donor analytics and fundraising management platform',
    color: 'green',
    icon: '💰',
    features: [
      'AI-powered donor analytics and insights',
      'Donation trend analysis and forecasting',
      'Donor retention and segmentation',
      'Economic correlation analysis',
      'Campaign optimization recommendations',
      'Real-time fundraising dashboards',
      'Donor database management',
      'Grant and funding tracking'
    ]
  }

  // Check if user has access to this department
  const hasAccess = isAdmin // Only admins can access fundraising analytics

  // Filter documents by fundraising category
  const fundraisingDocuments = documents.filter(doc => 
    doc.category.toLowerCase().includes('funding') ||
    doc.category.toLowerCase().includes('financial') ||
    doc.tags.some(tag => 
      tag.toLowerCase().includes('donor') ||
      tag.toLowerCase().includes('fundraising') ||
      tag.toLowerCase().includes('grant')
    )
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
            <h1 className="text-3xl font-bold text-gray-900">{departmentConfig.title}</h1>
            <p className="text-gray-600 mt-1">{departmentConfig.description}</p>
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
            You don't have access to the {departmentConfig.title} department. This area contains sensitive donor information and requires administrator privileges.
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
              <span className="text-2xl">{departmentConfig.icon}</span>
              <span>{departmentConfig.title}</span>
            </h1>
            <p className="text-gray-600 mt-1">{departmentConfig.description}</p>
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
            <div className={`bg-${departmentConfig.color}-500 p-3 rounded-lg`}>
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Fundraising Documents</p>
              <p className="text-2xl font-bold text-gray-900">{fundraisingDocuments.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`bg-${departmentConfig.color}-500 p-3 rounded-lg`}>
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">AI Analytics</p>
              <p className="text-2xl font-bold text-gray-900">Active</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`bg-${departmentConfig.color}-500 p-3 rounded-lg`}>
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Forecasting</p>
              <p className="text-2xl font-bold text-gray-900">Enabled</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`bg-${departmentConfig.color}-500 p-3 rounded-lg`}>
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">AI Insights</p>
              <p className="text-2xl font-bold text-gray-900">Ready</p>
            </div>
          </div>
        </div>
      </div>

      {/* Department Features */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Fundraising & Analytics Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departmentConfig.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 bg-${departmentConfig.color}-500 rounded-full`}></div>
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI-Powered Donor Analytics Platform */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Brain className="h-6 w-6 text-purple-600" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">AI-Powered Donor Analytics</h2>
            <p className="text-gray-600">Advanced analytics platform with AI insights and economic correlation analysis</p>
          </div>
        </div>
        
        {/* Embedded Donor Analytics Platform */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <DonorAnalyticsPlatform />
        </div>
      </div>

      {/* Document Management for Fundraising */}
      <DocumentActionsWidget 
        category="fundraising"
        categoryTitle={departmentConfig.title}
        color={departmentConfig.color}
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
            <span className="text-gray-600 font-medium">Upload Grant Documents</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors">
            <BarChart3 className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600 font-medium">Generate Reports</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors">
            <Settings className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600 font-medium">Analytics Settings</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FundraisingDepartmentPage