import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CollectPage from './pages/CollectPage'
import WallPage from './pages/WallPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import DeleteTestimonial from './pages/DeleteTestimonial'

function PrivateRoute({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/login" replace />
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
    </Routes>
  )
}
