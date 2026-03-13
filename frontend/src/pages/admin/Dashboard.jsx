import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Video, Image as ImageIcon, FolderOpen } from 'lucide-react';
import { apiRequest } from '../../api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    videoCategories: 0,
    imageCategories: 0,
    videos: 0,
    images: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [vidCats, imgCats, videos, images] = await Promise.allSettled([
          apiRequest('/video-categories'),
          apiRequest('/img-categories'),
          apiRequest('/video-items'),
          apiRequest('/img-items'),
        ]);

        setStats({
          videoCategories: Array.isArray(vidCats.value) ? vidCats.value.length : 0,
          imageCategories: Array.isArray(imgCats.value) ? imgCats.value.length : 0,
          videos: Array.isArray(videos.value) ? videos.value.length : 0,
          images: Array.isArray(images.value) ? images.value.length : 0,
        });
      } catch {
        // silent
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Video kategoriyalar', value: stats.videoCategories, icon: FolderOpen, color: 'from-blue-500/20 to-blue-600/5' },
    { label: 'Videolar', value: stats.videos, icon: Video, color: 'from-purple-500/20 to-purple-600/5' },
    { label: 'Rasm kategoriyalar', value: stats.imageCategories, icon: FolderOpen, color: 'from-green-500/20 to-green-600/5' },
    { label: 'Rasmlar', value: stats.images, icon: ImageIcon, color: 'from-orange-500/20 to-orange-600/5' },
  ];

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-8"
      >
        Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-gradient-to-br ${color} border border-[var(--border-color)] rounded-xl p-5`}
          >
            <div className="flex items-center justify-between mb-3">
              <Icon className="w-5 h-5 text-[var(--text-secondary)]" />
              <span className="text-2xl font-bold">{value}</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">{label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
