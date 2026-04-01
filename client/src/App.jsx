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
import Landing from './pages/Landing'
import Pricing from './pages/Pricing'
import Help from './pages/Help'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import TermsOfService from './pages/TermsOfService'
import NotFound from './pages/NotFound'
import VsPage from './pages/VsPage'
import ForPage from './pages/ForPage'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'
import ReviewResponseTool from './pages/ReviewResponseTool'
import Leaderboard from './pages/Leaderboard'
import Partners from './pages/Partners'
import ZapierIntegration from './pages/ZapierIntegration'
import Contact from './pages/Contact'
import About from './pages/About'
import CookieConsent from './components/CookieConsent'

function PrivateRoute({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/login" replace />
}

function AdminRoute({ children }) {
  return localStorage.getItem('admin_token') ? children : <Navigate to="/admin" replace />
}

export default function App() {
  return (
    <>
      <CookieConsent />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/collect/:slug" element={<CollectPage />} />
        <Route path="/wall/:slug" element={<WallPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/help" element={<Help />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/delete/:token" element={<DeleteTestimonial />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/vs/:competitor" element={<VsPage />} />
        <Route path="/for/:industry" element={<ForPage />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/tools/review-response" element={<ReviewResponseTool />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/integrations/zapier" element={<ZapierIntegration />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
