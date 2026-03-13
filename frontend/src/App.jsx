import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import PrivateRoute from './components/PrivateRoute';

// Public pages
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Commerce from './pages/Commerce';
import PublicSocial from './pages/Social';

// Admin pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminAbout from './pages/admin/About';
import Social from './pages/admin/Social';
import VideoCategories from './pages/admin/VideoCategories';
import VideoItems from './pages/admin/VideoItems';
import ImageCategories from './pages/admin/ImageCategories';
import ImageItems from './pages/admin/ImageItems';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* ── Public routes ── */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<About />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="commerce" element={<Commerce />} />
          <Route path="social" element={<PublicSocial />} />
        </Route>

        {/* ── Admin login (public) ── */}
        <Route path="/admin/login" element={<Login />} />

        {/* ── Admin routes (protected) ── */}
        <Route path="/admin" element={<PrivateRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="social" element={<Social />} />
            <Route path="video-categories" element={<VideoCategories />} />
            <Route path="video-items" element={<VideoItems />} />
            <Route path="image-categories" element={<ImageCategories />} />
            <Route path="image-items" element={<ImageItems />} />
          </Route>
        </Route>

        {/* ── Fallback ── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
