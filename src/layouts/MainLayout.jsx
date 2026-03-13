import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ScrollDots from '../components/ScrollDots';

const navLinks = [
  { path: '/', label: 'About' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/commerce', label: 'Commerce' },
  { path: '/social', label: 'Social' },
];

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum distance for a swipe to be registered
  const minSwipeDistance = 70;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      const currentIndex = navLinks.findIndex(link => link.path === location.pathname);
      
      if (isLeftSwipe && currentIndex < navLinks.length - 1) {
        // Swipe Left -> Next Page
        navigate(navLinks[currentIndex + 1].path);
      } else if (isRightSwipe && currentIndex > 0) {
        // Swipe Right -> Previous Page
        navigate(navLinks[currentIndex - 1].path);
      }
    }
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-[#0A0A0A]"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background image */}
      <div
        className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat opacity-20 pointer-events-none"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <Navbar />
        <main className="flex-1 overflow-y-auto custom-scroll">
          <Outlet />
        </main>
        <ScrollDots />
      </div>

      {/* Developer Link - Bottom Right */}
      <a 
        href="https://t.me/ruslanbozorov2007" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="footer-credit"
        title="Developer Telegram"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <circle cx="12" cy="7" r="4" />
          <path d="M12 13c-4.418 0-8 2.239-8 5v1h10v-2.028c0-.623.111-1.235.326-1.815.111-.299.25-.589.417-.864l1.248 1.48c.11.132.274.207.447.207h.124c.23 0 .44-.132.544-.337l.019-.039a.526.526 0 0 1 .472-.284h1.002a.5.5 0 0 0 .426-.763l-1.002-1.63a.5.5 0 0 1 .094-.65c.675-.544 1.458-.876 2.308-.94L20 13c0-2.761-3.582-5-8-5z" opacity="0" />
          {/* Main User Body */}
          <path d="M12 13c-4.4 0-8 2.2-8 5v2h9v-2c0-1.2.4-2.3 1.1-3.2-.6-.5-1.3-.8-2.1-.8z" />
          {/* Logic for the < > part in bottom right */}
          <path d="M18.5 15.5l-2.5 2.5 2.5 2.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22.5 18l-2.5-2.5 2.5-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}
