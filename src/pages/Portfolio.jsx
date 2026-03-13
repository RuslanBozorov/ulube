import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ChevronLeft, ChevronRight, Pause } from 'lucide-react';

// YouTube ID ajratib olish funksiyasi
function getYouTubeId(url) {
  if (!url) return null;
  const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

const defaultVideos = [
  { id: 1, title: 'MONTAJ', price: '$25', url: 'https://youtu.be/VD6RroGP91o?si=mUY7_Li-9l7YxN7o', type: 'video' },
  { id: 2, title: 'MONTAJ', price: '$30', url: 'https://youtu.be/r3CfMixqIrI?si=kptv41s8Hs1bQgUa', type: 'video' },
  { id: 3, title: 'Reklama', price: '$40', url: 'https://youtu.be/ojGj7Hpa-OQ?si=GPyENPMH9TAVnqCK', type: 'video' },
  { id: 4, title: 'Short video', price: '$15', url: 'https://youtu.be/ZOu4q4stPio?si=QWMVLgXd_VPKgb9X', type: 'video' },
  { id: 5, title: 'Intro', price: '$20', url: 'https://youtu.be/UNOmaFs6KaY?si=F3hPA1T0wJRYjkUp', type: 'video' },
  { id: 6, title: 'Outro', price: '$18', url: 'https://youtu.be/0gGR1xD28DA?si=Q1g_MnFfgLZYI1td', type: 'video' },
];

const defaultImages = [
  { id: 1, title: 'Portrait Edit', price: '$10', imageUrl: 'https://picsum.photos/450/800?random=31', ratio: '9:16' },
  { id: 2, title: 'Cinematic Shot', price: '$15', imageUrl: 'https://picsum.photos/800/450?random=32', ratio: '16:9' },
  { id: 3, title: 'Mobile Story', price: '$20', imageUrl: 'https://picsum.photos/450/800?random=33', ratio: '9:16' },
  { id: 4, title: 'Commercial Frame', price: '$25', imageUrl: 'https://picsum.photos/800/450?random=34', ratio: '16:9' },
  { id: 5, title: 'Product Shoot', price: '$30', imageUrl: 'https://picsum.photos/450/800?random=35', ratio: '9:16' },
  { id: 6, title: 'Landscape Art', price: '$20', imageUrl: 'https://picsum.photos/800/450?random=36', ratio: '16:9' },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('video');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAutoFlow, setIsAutoFlow] = useState(false);

  const tabs = [
    { id: 'video', label: 'video' },
    { id: 'image', label: 'img' },
  ];

  const items = activeTab === 'video' ? defaultVideos : defaultImages;

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  useEffect(() => {
    let interval;
    if (isAutoFlow && selectedIndex !== null) {
      interval = setInterval(handleNext, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoFlow, selectedIndex, items.length]); // Added items.length to dependency array

  return (
    <div className="min-h-full bg-black text-white flex flex-col justify-center items-center py-10">
      <div className="w-full max-w-4xl px-10 sm:px-6 flex flex-col items-center">

        {/* 1. Title — Sahifa markazida */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center"
        >
          Portfolio
        </motion.h1>

        {/* 2. Filter — Sarlavha tagidan 25px masofada va markazda */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mt-[25px] mb-12"
        >
          <div className="flex gap-5 bg-[#111] rounded-lg border border-[#333] p-2 ">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedIndex(null);
                }}
                className={`text-sm font-medium p-[5px] px-[15px] rounded-md transition-all duration-300 ${activeTab === tab.id
                    ? 'bg-[#333] text-white shadow-lg'
                    : 'text-[#666] hover:text-white'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 3. Grid — Videolar va Rasmlar */}
        <div className="w-full">
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
          >
            {items.map((item, index) => {
              const isVideo = activeTab === 'video';
              const videoId = isVideo ? getYouTubeId(item.url || "") : null;
              const thumbnail = isVideo
                ? (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null)
                : item.imageUrl;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative group cursor-pointer w-full max-w-[400px] bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all ${!isVideo && item.ratio === '9:16' ? 'aspect-[9/16]' : 'aspect-video'
                    }`}
                  onClick={() => {
                    if (isVideo && item.url) window.open(item.url, '_blank');
                    else if (!isVideo) setSelectedIndex(index);
                  }}
                >
                  {/* Thumbnail */}
                  {thumbnail ? (
                    <img src={thumbnail} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#111]">
                      <Play className="w-12 h-12 text-white/20" />
                    </div>
                  )}

                  {/* Play Button Overlay */}
                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 text-white fill-white" />
                      </div>
                    </div>
                  )}

                  {/* Bottom Info — Faqat hover bo'lganda ko'rinadi */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <span className="text-white font-medium text-lg">{item.title}</span>
                    <span className="text-white/60 text-sm font-light">{item.price}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Lightbox with Auto Flow */}
      <AnimatePresence mode="wait">
        {selectedIndex !== null && !activeTab.includes('video') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => {
              setSelectedIndex(null);
              setIsAutoFlow(false);
            }}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white z-[110]">
              <X size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsAutoFlow(!isAutoFlow);
              }}
              className={`absolute top-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full border flex items-center gap-2 transition-all ${isAutoFlow ? 'bg-white text-black border-white' : 'bg-white/5 text-white border-white/10'
                } z-[110] text-xs uppercase tracking-widest font-bold`}
            >
              {isAutoFlow ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
              {isAutoFlow ? 'Auto Flowing' : 'Auto Flow'}
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 sm:left-10 text-white/20 hover:text-white transition-colors z-[110]"
            >
              <ChevronLeft size={48} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 sm:right-10 text-white/20 hover:text-white transition-colors z-[110]"
            >
              <ChevronRight size={48} />
            </button>

            <div className="relative flex flex-col items-center max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={items[selectedIndex].imageUrl}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={items[selectedIndex].imageUrl}
                className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain border border-white/10"
              />
              <div className="mt-6 text-center">
                <h3 className="text-xl font-medium text-white">{items[selectedIndex].title}</h3>
                <p className="text-white/40">{items[selectedIndex].price}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}