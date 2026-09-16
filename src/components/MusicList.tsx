import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Music, 
  Play, 
  Star,
  Clock,
  Sparkles
} from 'lucide-react';

interface MusicItem {
  id: string;
  title: string;
  artist: string;
  duration: string;
  desc: string;
  color: string;
}

const MUSIC_DATA: MusicItem[] = [
  { id: '1', title: '高山流水', artist: '伯牙', duration: '5:42', desc: '峨峨兮若泰山，洋洋兮若江河。传世名篇，知音之始。', color: 'teal' },
  { id: '2', title: '梅花三弄', artist: '桓伊 (晋)', duration: '8:20', desc: '寒梅傲雪，三弄清音。表现梅花高洁、坚韧的品格。', color: 'rose' },
  { id: '3', title: '广陵散', artist: '嵇康 (魏晋)', duration: '12:15', desc: '戈矛杀伐之声，英雄孤傲之志。广陵孤响，此后不再。', color: 'amber' },
  { id: '4', title: '平沙落雁', artist: '佚名', duration: '6:50', desc: '秋高气爽，风静沙平。云程万里，雁阵翩翩。', color: 'sky' }
];

interface Props {
  onBack: () => void;
  onSelect: (id: string) => void;
}

export const MusicList: React.FC<Props> = ({ onBack, onSelect }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto py-20 px-6"
    >
      <div className="flex flex-col items-center text-center mb-24">
        <div className="flex items-center gap-4 text-slate-300 font-serif tracking-[0.8em] text-[10px] uppercase font-bold mb-6">
           <span className="w-12 h-px bg-slate-200" />
           Timeless Melodies
           <span className="w-12 h-px bg-slate-200" />
        </div>
        <h2 className="text-7xl font-serif font-black text-slate-900 tracking-[0.1em] mb-8">名曲赏听</h2>
        <p className="text-slate-400 font-serif text-sm max-w-2xl leading-loose tracking-widest">
          跨越时空的弦响，正在此处等你驻足。每一处指法，每一次振动，皆是古人对山川与心境的至诚独白。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {MUSIC_DATA.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => onSelect(item.id)}
            className="group relative cursor-pointer"
          >
            <div className={`absolute -inset-2 rounded-[48px] bg-${item.color}-100/50 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl`} />
            <div className="relative bg-white/60 backdrop-blur-xl p-10 rounded-[40px] border border-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] h-full flex flex-col justify-between overflow-hidden transition-all duration-700 group-hover:translate-y-[-10px]">
               {/* Background Decorative element */}
               <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                  <Music size={120} />
               </div>

               <div>
                 <div className="flex items-center justify-between mb-8">
                    <div className={`w-12 h-12 rounded-2xl bg-${item.color}-50 text-${item.color}-900 flex items-center justify-center`}>
                      <Star size={20} />
                    </div>
                    <div className="text-[10px] font-mono text-slate-300 uppercase tracking-widest flex items-center gap-2">
                       <Clock size={12} /> {item.duration}
                    </div>
                 </div>
                 <h3 className="text-3xl font-serif font-black text-slate-900 mb-4 tracking-wider">{item.title}</h3>
                 <p className="text-slate-400 text-xs font-serif leading-relaxed mb-10">{item.desc}</p>
               </div>

               <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em] font-serif">{item.artist} · 修复版</span>
                  <div className="w-12 h-12 rounded-full bg-slate-950 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                    <Play size={18} fill="currentColor" />
                  </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-32 flex justify-center">
        <button onClick={onBack} className="flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-all duration-500">
           <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center">
             <ArrowLeft size={16} />
           </div>
           <span className="text-xs font-bold uppercase tracking-[0.4em]">返回主页</span>
        </button>
      </div>
    </motion.div>
  );
};
