import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { DemoAuthProvider } from './contexts/DemoAuthContext'
import { isDemoMode } from './lib/demo'
import AuthGuard from './components/Auth/AuthGuard'
import Dashboard from './components/Dashboard'
import DocumentList from './components/DocumentList'
import DocumentUpload from './components/DocumentUpload'
import Navigation from './components/Navigation'
import CollapsibleSidebar from './components/Navigation/CollapsibleSidebar'
import OperationsPage from './components/Operations/OperationsPage'
import OperationsLandingPage from './components/Operations/OperationsLandingPage'
import DepartmentPage from './components/Departments/DepartmentPage'
import UserManagementPage from './components/UserManagement/UserManagementPage'
import InviteAcceptPage from './components/UserManagement/InviteAcceptPage'
import OAuthCallbackPage from './components/OAuth/OAuthCallbackPage'
import OAuthConnectionManager from './components/OAuth/OAuthConnectionManager'
import DemoModeIndicator from './components/Demo/DemoModeIndicator'
import FundraisingDepartmentPage from './components/Departments/FundraisingDepartmentPage'

function App() {
  const AuthContextProvider = isDemoMode ? DemoAuthProvider : AuthProvider

  return (
    <AuthContextProvider>
      <Router>
        <DemoModeIndicator />
        <Routes>
          {/* Public routes */}
          <Route path="/invite/:token" element={<InviteAcceptPage />} />
          <Route path="/oauth/callback/:provider" element={<OAuthCallbackPage />} />
          
          {/* Protected routes */}
          <Route path="/*" element={
            <AuthGuard>
              <div className={`min-h-screen bg-gray-50 ${isDemoMode ? 'pt-10' : ''}`}>
                <Navigation />
                <div className="flex">
                  <CollapsibleSidebar />
                  <main className="flex-1 p-8 transition-all duration-300">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/documents" element={<DocumentList />} />
                      <Route path="/upload" element={<DocumentUpload />} />
                      <Route path="/operations" element={<OperationsLandingPage />} />
                      <Route path="/operations/:category" element={<OperationsPage />} />
                      <Route path="/department/:department" element={<DepartmentPage />} />
                      <Route path="/department/fundraising-donor-management" element={<FundraisingDepartmentPage />} />
                      <Route path="/users" element={<UserManagementPage />} />
                      <Route path="/oauth" element={<OAuthConnectionManager />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </AuthGuard>
          } />
        </Routes>
      </Router>
    </AuthContextProvider>
  )
}

export default App