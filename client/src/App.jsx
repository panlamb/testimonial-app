import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CollectPage from './pages/CollectPage'
import WallPage from './pages/WallPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import DeleteTestimonial from './pages/DeleteTestimonial'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

function PrivateRoute({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/login" replace />
}

function AdminRoute({ children }) {
  return localStorage.getItem('admin_token') ? children : <Navigate to="/admin" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/collect/:slug" element={<CollectPage />} />
      <Route path="/wall/:slug" element={<WallPage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/delete/:token" element={<DeleteTestimonial />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
    </Routes>
  )
}
