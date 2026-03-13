import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const pages = [
  { path: '/', label: 'About' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/commerce', label: 'Commerce' },
  { path: '/social', label: 'Social' },
];

export default function ScrollDots() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {/* Desktop: right side vertical dots */}
      <div className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-4">
        {pages.map((page) => {
          const isActive = location.pathname === page.path;
          return (
            <button
              key={page.path}
              onClick={() => navigate(page.path)}
              className="group relative flex items-center justify-center"
              title={page.label}
            >
              {/* Label on hover */}
              <span className="absolute right-7 text-[10px] font-medium text-[#666] opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {page.label}
              </span>
              <motion.div
                className={`rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'bg-white border-white w-3 h-3'
                    : 'bg-transparent border-[#555] w-2.5 h-2.5 group-hover:border-white/60'
                }`}
                animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.4 }}
              />
            </button>
          );
        })}
      </div>

      {/* Mobile: bottom center dots */}
      <div className="flex md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-40 gap-3">
        {pages.map((page) => {
          const isActive = location.pathname === page.path;
          return (
            <button
              key={page.path}
              onClick={() => navigate(page.path)}
              className="flex items-center justify-center p-1"
              title={page.label}
            >
              <motion.div
                className={`rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'bg-white border-white w-3 h-3'
                    : 'bg-transparent border-[#555] w-2.5 h-2.5'
                }`}
                animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.4 }}
              />
            </button>
          );
        })}
      </div>
    </>
  );
}
