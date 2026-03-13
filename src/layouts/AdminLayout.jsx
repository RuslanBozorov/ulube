import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  LayoutDashboard,
  User,
  Link2,
  Clapperboard,
  Video,
  FolderOpen,
  Image as ImageIcon,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import useAuthStore from '../store/authStore';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { path: '/admin/about', label: 'About', icon: User },
  { path: '/admin/social', label: 'Ijtimoiy tarmoqlar', icon: Link2 },
  { path: '/admin/video-categories', label: 'Video kategoriyalar', icon: Clapperboard },
  { path: '/admin/video-items', label: 'Video itemlar', icon: Video },
  { path: '/admin/image-categories', label: 'Rasm kategoriyalar', icon: FolderOpen },
  { path: '/admin/image-items', label: 'Rasm itemlar', icon: ImageIcon },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="flex h-screen bg-[var(--bg-primary)] text-white overflow-hidden">
      {/* Sidebar - desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[var(--bg-card)] border-r border-[var(--border-color)] p-4 overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-lg font-bold tracking-wide">Admin Panel</h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">Ulug'bek Portfolio</p>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(({ path, label, icon: Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-black'
                    : 'text-[var(--text-secondary)] hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 mt-4"
        >
          <LogOut className="w-4 h-4" />
          Chiqish
        </button>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 bg-[var(--bg-card)] border-b border-[var(--border-color)]">
        <h2 className="text-sm font-bold">Admin Panel</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-14 bottom-0 w-64 bg-[var(--bg-card)] border-r border-[var(--border-color)] p-4 overflow-y-auto">
            <nav className="flex flex-col gap-1">
              {navItems.map(({ path, label, icon: Icon, end }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={end}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-white text-black'
                        : 'text-[var(--text-secondary)] hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {label}
                </NavLink>
              ))}
            </nav>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 mt-4 w-full"
            >
              <LogOut className="w-4 h-4" />
              Chiqish
            </button>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto md:pt-0 pt-14">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
