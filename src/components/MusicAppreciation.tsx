import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Volume2, 
  ArrowLeft, 
  MessageSquare,
  Sparkles,
  Wind,
  Layers,
  Heart
} from 'lucide-react';

interface TechniqueHighlight {
  time: number;
  text: string;
}

const TECHNIQUES: TechniqueHighlight[] = [
  { time: 2, text: "【泛音】清脆如坠玉，引出山间静谧之境。" },
  { time: 8, text: "【注】指法圆润，如山泉初涌。" },
  { time: 15, text: "【滚拂】七弦同响，模拟流水奔腾、大浪淘沙之势。" },
  { time: 25, text: "【掐撮三声】节奏紧凑，表现急湍跳沫。" },
  { time: 40, text: "【走手音】韵味悠长，余音绕梁。" }
];

interface Props {
  onBack: () => void;
  onTalkToBoya: () => void;
}

export const MusicAppreciation: React.FC<Props> = ({ onBack, onTalkToBoya }) => {
  const [activeTab, setActiveTab] = useState<'technique' | 'spirit'>('technique');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentTime(prev => {
           if (prev >= 60) return 0; // Loop or stop
           return prev + 0.5;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeTechnique = TECHNIQUES.find(t => currentTime >= t.time && currentTime < t.time + 4);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto py-12 px-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-16">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors">
          <ArrowLeft size={20} />
          <span className="text-sm font-serif font-bold uppercase tracking-widest">返回选曲</span>
        </button>
        <div className="text-center">
          <h2 className="text-5xl font-serif font-black text-slate-900 tracking-[0.2em]">高山流水</h2>
          <p className="text-slate-400 text-xs font-serif tracking-[0.4em] uppercase mt-2">Guqin · Flowing Water</p>
        </div>
        <div className="w-24" /> {/* Spacer */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Visualization & Player Controls */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-10">
          <div className="relative aspect-video bg-gradient-to-br from-slate-950 to-emerald-950 rounded-[40px] overflow-hidden shadow-2xl flex items-center justify-center">
             {/* Animated Strings */}
             <div className="absolute inset-0 flex justify-around items-center px-12 opacity-20">
                {[...Array(7)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={isPlaying ? { 
                      scaleY: [1, 1.2, 0.8, 1],
                      opacity: [0.2, 0.5, 0.2]
                    } : {}}
                    transition={{ duration: 1.5 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[1px] h-4/5 bg-white"
                  />
                ))}
             </div>

             {/* Danmaku / Highlights Overlay */}
             <AnimatePresence mode="wait">
               {activeTab === 'technique' && activeTechnique && (
                 <motion.div 
                   key={activeTechnique.text}
                   initial={{ opacity: 0, x: 100 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -100 }}
                   className="absolute top-1/2 -translate-y-1/2 left-10 right-10 text-center"
                 >
                   <span className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20 text-teal-50 text-xl font-serif italic tracking-wide">
                     {activeTechnique.text}
                   </span>
                 </motion.div>
               )}
             </AnimatePresence>

             {/* Center Play Button Overlay */}
             {!isPlaying && (
               <motion.button 
                 whileHover={{ scale: 1.1 }}
                 onClick={() => setIsPlaying(true)}
                 className="w-24 h-24 rounded-full bg-white text-emerald-950 flex items-center justify-center shadow-2xl relative z-10"
               >
                 <Play size={40} fill="currentColor" />
               </motion.button>
             )}
          </div>

          {/* Controls Bar */}
          <div className="bg-white/40 backdrop-blur-xl p-8 rounded-[32px] border border-white flex items-center justify-between shadow-xl">
             <div className="flex items-center gap-6">
                <button onClick={() => setIsPlaying(!isPlaying)} className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg">
                  {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                </button>
                <div className="w-64 h-1 bg-slate-200 rounded-full overflow-hidden relative">
                   <motion.div 
                      animate={{ width: `${(currentTime / 60) * 100}%` }}
                      className="absolute top-0 left-0 h-full bg-teal-600"
                   />
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {Math.floor(currentTime/60)}:{(currentTime%60).toFixed(0).padStart(2, '0')} / 1:00
                </span>
             </div>
             <div className="flex items-center gap-4 text-slate-400">
                <Volume2 size={20} />
                <div className="w-24 h-1 bg-slate-200 rounded-full" />
             </div>
          </div>
        </div>

        {/* Right: Dual Layer Toggle & Info */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-8">
           <div className="bg-white/60 backdrop-blur-xl p-6 rounded-[32px] border border-white shadow-xl">
              <div className="flex p-1 bg-slate-100 rounded-2xl mb-8">
                <button 
                  onClick={() => setActiveTab('technique')}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'technique' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                >
                  <Layers size={14} /> 听技艺
                </button>
                <button 
                  onClick={() => setActiveTab('spirit')}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'spirit' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                >
                  <Heart size={14} /> 悟精神
                </button>
              </div>

              <div className="min-h-[320px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'technique' ? (
                    <motion.div 
                      key="tech-pane"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] font-serif">技法解析 · Analysis</h4>
                      <div className="space-y-4">
                        <div className="p-5 bg-teal-50/30 rounded-2xl border border-teal-100/50">
                          <p className="text-slate-700 text-sm leading-relaxed font-serif">古琴基本指法中，最核心的为右手的“抹、挑、勾、剔”，这也是琴声气韵流转的基础。</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-5 bg-amber-50/30 rounded-2xl border border-amber-100/50">
                              <span className="text-[10px] font-bold text-amber-800/40 uppercase block mb-2 tracking-widest">抹</span>
                              <p className="text-slate-600 text-[11px] leading-relaxed font-serif">食指向内入弦。发音坚实，多用于表现古朴苍劲之感。</p>
                           </div>
                           <div className="p-5 bg-emerald-50/30 rounded-2xl border border-emerald-100/50">
                              <span className="text-[10px] font-bold text-emerald-800/40 uppercase block mb-2 tracking-widest">挑</span>
                              <p className="text-slate-600 text-[11px] leading-relaxed font-serif">食指向外出弦。音色清越灵动，常与“抹”结对使用。</p>
                           </div>
                           <div className="p-5 bg-rose-50/30 rounded-2xl border border-rose-100/50">
                              <span className="text-[10px] font-bold text-rose-800/40 uppercase block mb-2 tracking-widest">勾</span>
                              <p className="text-slate-600 text-[11px] leading-relaxed font-serif">中指向内入弦。力度深沉，取音浑厚，乃八法中最重之音。</p>
                           </div>
                           <div className="p-5 bg-sky-50/30 rounded-2xl border border-sky-100/50">
                              <span className="text-[10px] font-bold text-sky-800/40 uppercase block mb-2 tracking-widest">剔</span>
                              <p className="text-slate-600 text-[11px] leading-relaxed font-serif">中指向外出弦。声如裂帛，遒劲有力，与“勾”阴阳相对。</p>
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="spirit-pane"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6 text-center"
                    >
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Sparkles size={24} />
                      </div>
                      <h4 className="text-2xl font-serif font-black text-slate-800 tracking-wider">高山流水 · 知音何在</h4>
                      <p className="text-slate-500 font-serif text-base leading-loose italic px-4">
                        “伯牙与子期的故事，讲的不仅是音乐，更是中国人对‘懂得’与‘信义’的极致追求。音乐在那一刻成为了灵魂的共振。”
                      </p>
                      <div className="pt-8">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={onTalkToBoya}
                          className="px-10 py-5 bg-emerald-950 text-emerald-50 rounded-full font-bold uppercase tracking-[0.4em] text-[10px] shadow-2xl flex items-center gap-3 mx-auto"
                        >
                          <MessageSquare size={16} /> 与伯牙对话
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
           </div>

           {/* Calligraphy Watermark */}
           <div className="flex justify-end opacity-[0.03]">
              <span className="text-8xl font-serif font-black text-slate-900 writing-vertical-rl tracking-widest leading-none">
                知音
              </span>
           </div>
        </div>
      </div>
    </motion.div>
  );
};
