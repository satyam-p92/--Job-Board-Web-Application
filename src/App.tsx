import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EmployerDashboardPage from './pages/EmployerDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// Protected route component
const ProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  redirectPath = '/login' 
}: { 
  children: React.ReactNode, 
  allowedRoles?: string[], 
  redirectPath?: string 
}) => {
  // In a real app, we would check from context/state if user is authenticated
  const userString = localStorage.getItem('currentUser');
  const user = userString ? JSON.parse(userString) : null;
  
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <JobProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="jobs" element={<JobsPage />} />
              <Route path="jobs/:id" element={<JobDetailPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route 
                path="employer/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['employer']}>
                    <EmployerDashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="admin/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </JobProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;