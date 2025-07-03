import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { DemoAuthProvider } from './contexts/DemoAuthContext'
import { isDemoMode } from './lib/demo'
import AuthGuard from './components/Auth/AuthGuard'
import Dashboard from './components/Dashboard'
import DocumentList from './components/DocumentList'
import DocumentUpload from './components/DocumentUpload'
import Navigation from './components/Navigation'
import OperationsPage from './components/Operations/OperationsPage'
import UserManagementPage from './components/UserManagement/UserManagementPage'
import InviteAcceptPage from './components/UserManagement/InviteAcceptPage'
import OAuthCallbackPage from './components/OAuth/OAuthCallbackPage'
import OAuthConnectionManager from './components/OAuth/OAuthConnectionManager'
import DemoModeIndicator from './components/Demo/DemoModeIndicator'

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
                <main className="container mx-auto px-4 py-8">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/documents" element={<DocumentList />} />
                    <Route path="/upload" element={<DocumentUpload />} />
                    <Route path="/operations/:category" element={<OperationsPage />} />
                    <Route path="/users" element={<UserManagementPage />} />
                    <Route path="/oauth" element={<OAuthConnectionManager />} />
                  </Routes>
                </main>
              </div>
            </AuthGuard>
          } />
        </Routes>
      </Router>
    </AuthContextProvider>
  )
}

export default App