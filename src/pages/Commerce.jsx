import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

// Default commerce images with random placeholder images
const defaultImages916 = [
  { id: 1, title: 'Poster Design', price: '$45', imageUrl: 'https://picsum.photos/450/800?random=11', ratio: '9:16' },
  { id: 2, title: 'Story Edit', price: '$30', imageUrl: 'https://picsum.photos/450/800?random=12', ratio: '9:16' },
  { id: 3, title: 'Vertical Ad', price: '$50', imageUrl: 'https://picsum.photos/450/800?random=13', ratio: '9:16' },
  { id: 4, title: 'Social Media', price: '$25', imageUrl: 'https://picsum.photos/450/800?random=14', ratio: '9:16' },
  { id: 5, title: 'Promotion', price: '$40', imageUrl: 'https://picsum.photos/450/800?random=15', ratio: '9:16' },
  { id: 6, title: 'VFX Reel', price: '$60', imageUrl: 'https://picsum.photos/450/800?random=16', ratio: '9:16' },
];

const defaultImages169 = [
  { id: 1, title: 'Campaign Video', price: '$120', imageUrl: 'https://picsum.photos/800/450?random=21', ratio: '16:9' },
  { id: 2, title: 'Brand Story', price: '$150', imageUrl: 'https://picsum.photos/800/450?random=22', ratio: '16:9' },
  { id: 3, title: 'Product Launch', price: '$200', imageUrl: 'https://picsum.photos/800/450?random=23', ratio: '16:9' },
  { id: 4, title: 'Commercial', price: '$180', imageUrl: 'https://picsum.photos/800/450?random=24', ratio: '16:9' },
];

export default function Commerce() {
  const [activeRatio, setActiveRatio] = useState('9:16');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAutoFlow, setIsAutoFlow] = useState(false);

  const displayImages = activeRatio === '9:16' ? defaultImages916 : defaultImages169;

  const ratios = [
    { id: '9:16', label: '9:16' },
    { id: '16:9', label: '16:9' },
  ];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % displayImages.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  // Auto-flow logic
  useEffect(() => {
    let interval;
    if (isAutoFlow && selectedIndex !== null) {
      interval = setInterval(() => {
        handleNext();
      }, 3000); // Har 3 sekundda keyingisiga o'tadi
    }
    return () => clearInterval(interval);
  }, [isAutoFlow, selectedIndex]);

  return (
    <div className="min-h-full bg-black text-white flex flex-col justify-center items-center py-10 px-10 sm:px-6">
      <div className="w-full max-w-5xl flex flex-col items-center">
        {/* Header: Title + Ratio filter */}
        <div className="flex flex-col items-center mb-8 shrink-0">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Commerce
          </motion.h1>

          {/* Ratio switcher */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex bg-[#111] rounded-lg border border-[#333] p-1"
          >
            {ratios.map((ratio) => (
              <button
                key={ratio.id}
                onClick={() => {
                  setActiveRatio(ratio.id);
                  setSelectedIndex(null); // Ratio o'zgarganda lightboxni yopish yaxshiroq
                }}
                className={`text-sm font-medium p-[10px] px-[30px] rounded-md transition-all duration-300 ${activeRatio === ratio.id
                    ? 'bg-[#333] text-white shadow-lg'
                    : 'text-[#666] hover:text-white'
                  }`}
              >
                {ratio.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <div className="w-full">
          <motion.div
            layout
            className={`grid gap-6 lg:gap-8 justify-items-center ${activeRatio === '9:16'
                ? 'grid-cols-2 md:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2'
              }`}
          >
            {displayImages.map((img, index) => (
              <motion.div
                key={img.id || index}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`group relative w-full rounded-xl overflow-hidden border border-white/5 hover:border-white/20 bg-[#0a0a0a] cursor-pointer transition-all duration-300 ${activeRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-video'
                  }`}
                onClick={() => setSelectedIndex(index)}
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-white font-medium text-lg">{img.title}</span>
                  <span className="text-white/60 text-sm font-light">{img.price}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Lightbox with Auto Flow */}
      <AnimatePresence mode="wait">
        {selectedIndex !== null && (
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
            {/* Close Button */}
            <button className="absolute top-8 right-8 text-white/50 hover:text-white z-[110]">
              <X size={32} />
            </button>

            {/* Auto Flow Toggle */}
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

            {/* Navigation Buttons */}
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

            {/* Image Container */}
            <div className="relative flex flex-col items-center max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={displayImages[selectedIndex].imageUrl}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={displayImages[selectedIndex].imageUrl}
                className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain border border-white/10"
              />
              <div className="mt-6 text-center">
                <h3 className="text-xl font-medium text-white">{displayImages[selectedIndex].title}</h3>
                <p className="text-white/40">{displayImages[selectedIndex].price}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
