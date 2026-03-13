import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'About' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/commerce', label: 'Commerce' },
  { path: '/social', label: 'Social' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="relative z-50 w-full shrink-0">
      <div className="w-full" style={{ padding: '0 10px' }}>
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center group">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-8 h-8 rounded-full object-cover border border-[#333] group-hover:border-white/40 transition-colors duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </NavLink>

          {/* Desktop Nav Links — center */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `relative text-sm font-medium tracking-wide transition-all duration-200 ${isActive
                    ? 'text-white'
                    : 'text-[#777] hover:text-white/80'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-white rounded-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right: CV Download */}
          <div className="hidden md:flex items-center">
            <a
              href="/cv.pdf"
              download="cv.pdf"
              className="flex items-center gap-1.5 text-xs font-medium border border-[#333] rounded-full text-white/70 hover:text-white hover:border-white/40 transition-all duration-200 p-[10px] px-[20px]"
            >
              CV
              <Download className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 md:hidden glass-effect border-t border-b border-[#222] overflow-hidden z-[1001]"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-left text-base font-medium transition-all duration-200 ${isActive ? 'text-white' : 'text-[#777]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="flex items-center pt-3 border-t border-[#222]">
                <a
                  href="/cv.pdf"
                  download="cv.pdf"
                  className="px-4 py-1.5 text-sm font-medium border border-[#333] rounded-full text-white hover:bg-white hover:text-black transition-all duration-200"
                >
                  <span className="flex items-center gap-1.5">
                    CV
                    <Download className="w-3.5 h-3.5" />
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
