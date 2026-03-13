import { motion } from 'framer-motion';
import { User, Video, Palette, Code } from 'lucide-react';

const aboutData  = {
  name: "Ulug'bek Bekmurodov",
  title: 'Professional Videograf & Montajchi',
  description: `Men professional videograf va video montaj ustasiman. Adobe Premiere Pro, After Effects va Cinema 4D kabi dasturlarda ishlayman, shuningdek, 3D modellashtirish va moshn-dizayn ko'nikmalariga egaman.

Ish tajribam davomida:
• YouTube va Instagram uchun yuqori sifatli video kontent;
• Hujjatli filmlar suratga olish va professional montaj;
• Darsliklar va intervyular uchun maxsus vizual yechimlar.

Har bir loyihaga ijodiy va analitik yondashib, eng yaxshi natijani taqdim etishga harakat qilaman.`,
  imageUrl: '/profile.jpg',
};

const SkillItem = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 p-[5px] px-[15px] rounded-full 
    bg-[#121212] border border-white/[0.05] text-[11px] text-white/50
    hover:scale-105 hover:border-white/20 hover:text-white
    transition-all duration-200 ease-out cursor-pointer group">
    
    <Icon size={14} className="opacity-40 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
    <span className="uppercase tracking-widest font-semibold text-[10px]">{label}</span>
  </div>
);
export default function About() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-white/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-white/5 rounded-full blur-[120px]" />

      <div className="w-full max-w-5xl mx-auto z-10 px-10 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-20">

          {/* Left: Profile Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 relative group"
          >
            {/* Design Elements - hidden on mobile for cleaner look */}
            <div className="absolute -inset-4 border border-white/10 rounded-2xl group-hover:border-white/20 transition-colors duration-500 hidden sm:block" />
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-white/30 hidden sm:block" />

            <div className="relative w-64 h-80 sm:w-72 sm:h-96 lg:w-80 lg:h-[450px] rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 mx-auto">
              <img
                src={aboutData.imageUrl}
                alt={aboutData.name}
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                onError={(e) => {
                  e.target.src = "https://picsum.photos/400/600?random=1";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

              {/* Floating label */}
              <div className="absolute bottom-4 left-4 right-4 p-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg">
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Based in</p>
                <p className="text-xs font-medium">Tashkent, Uzbekistan</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col pt-4 items-center lg:items-start text-center lg:text-left"
          >
            <div className="mb-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-white/60 mb-4"
              >
                Experience Designer
              </motion.div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-3 tracking-tight">
                About <span className="text-white/40">Me</span>
              </h1>
              <p className="text-base lg:text-xl text-white/80 font-medium">{aboutData.title}</p>
            </div>

            {/* Description Card */}
            <div className="relative group w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-sm group-hover:from-white/10 transition-all duration-500" />
              <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 sm:p-8 backdrop-blur-sm shadow-xl">
                <p className="text-white/60 text-sm sm:text-base leading-relaxed whitespace-pre-line mb-8 text-center lg:text-left">
                  {aboutData.description}
                </p>

                {/* Skills Grid */}
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start mt-auto">
                  <SkillItem icon={Video} label="Video Editing" />
                  <SkillItem icon={Palette} label="Motion Design" />
                  <SkillItem icon={Code} label="3D Modeling" />
                  <SkillItem icon={User} label="Storytelling" />
                </div>
              </div>
            </div>

            {/* Quote or Status */}
            <div className="mt-8 flex items-center gap-4 text-white/30 italic text-sm border-l border-white/10 pl-4 w-full justify-center lg:justify-start">
              "Kreativ yondashuv — muvaffaqiyat garovi."
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
