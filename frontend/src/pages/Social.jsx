import { motion } from 'framer-motion';

const socials = [
  { id: 1, platform: 'Instagram', url: 'https://www.instagram.com/ulube_portfolio/?__pwa=1', icon: 'instagram' },
  { id: 2, platform: 'YouTube', url: 'https://youtube.com/@Ulubeuu', icon: 'youtube' },
  { id: 3, platform: 'Telegram', url: 'https://t.me/ULUBE', icon: 'telegram' },
];

// SVG icons for social platforms
const socialIcons = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.07a6.17 6.17 0 0 0-.88-.06 6.28 6.28 0 0 0 0 12.56 6.29 6.29 0 0 0 6.28-6.28V8.72a8.16 8.16 0 0 0 3.82.96V6.69z" />
    </svg>
  ),
};

const getIcon = (platform) => {
  const key = platform?.toLowerCase();
  return socialIcons[key] || socialIcons.instagram;
};

// Calculate position around circle
function getOrbitPosition(index, total, radius) {
  const angleStep = (2 * Math.PI) / total;
  const angle = -Math.PI / 2 + angleStep * index;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
}

export default function Social() {
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-8 sm:mb-12"
      >
        Social
      </motion.h1>

      {/* Orbit layout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="social-orbit"
      >
        {/* Orbit ring */}
        <div className="absolute inset-4 rounded-full border border-[#222]" />

        {/* Center profile photo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-[#333] z-10">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-full h-full object-cover grayscale-[30%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-full" />
        </div>

        {/* Social icons orbiting */}
        {socials.map((social, index) => {
          const radius = typeof window !== 'undefined' && window.innerWidth >= 640 ? 170 : 130;
          const pos = getOrbitPosition(index, socials.length, radius);

          return (
            <motion.a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="social-icon-btn"
              style={{
                top: `calc(50% + ${pos.y}px - 24px)`,
                left: `calc(50% + ${pos.x}px - 24px)`,
              }}
              title={social.platform}
            >
              {getIcon(social.icon)}
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}
