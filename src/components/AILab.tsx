import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Mic, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  Play, 
  Music, 
  Sparkles, 
  ChevronRight,
  Info,
  RotateCcw,
  AudioLines
} from 'lucide-react';

type LabState = 'selection' | 'evaluating' | 'result' | 'remedial';

interface NoteResult {
  note: string;
  isCorrect: boolean;
  feedback?: string;
}

interface Song {
  id: string;
  title: string;
  artist: string;
  level: string;
  targetTechnique: string;
  description: string;
  score?: number;
}

const SONGS: Song[] = [
  {
    id: 'canghai',
    title: '沧海一声笑',
    artist: '黄霑',
    level: '入门',
    targetTechnique: '猱',
    description: '经典旋律 · 基础调式练习',
    score: 88
  },
  {
    id: 'xiaoao',
    title: '笑傲江湖',
    artist: '琴箫合奏版',
    level: '进阶',
    targetTechnique: '吟',
    description: '豪情万丈 · 宽广音域练习'
  },
  {
    id: 'qiufeng',
    title: '秋风词',
    artist: '古琴传统曲',
    level: '入门',
    targetTechnique: '撞',
    description: '凄婉动人 · 走手音基础'
  },
  {
    id: 'yangguan',
    title: '阳关三叠',
    artist: '唐代经典',
    level: '专业',
    targetTechnique: '分',
    description: '深情含蓄 · 复合力度控制'
  }
];

const PRACTICE_RESULTS: NoteResult[] = [
  { note: '宫', isCorrect: true },
  { note: '商', isCorrect: true },
  { note: '角', isCorrect: false, feedback: '音准略高' },
  { note: '徵', isCorrect: true },
  { note: '羽', isCorrect: true },
  { note: '宫', isCorrect: false, feedback: '音没按实' },
  { note: '羽', isCorrect: true },
  { note: '商', isCorrect: true },
];

export const AILab: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [state, setState] = useState<LabState>('selection');
  const [selectedSong, setSelectedSong] = useState<Song>(SONGS[0]);
  const [showRemedialSuccess, setShowRemedialSuccess] = useState(false);

  const startEvaluation = (song: Song) => {
    setSelectedSong(song);
    setState('evaluating');
    setTimeout(() => setState('result'), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto py-12 px-6 min-h-screen"
    >
      <header className="flex items-center justify-between mb-16">
        <button onClick={onBack} className="flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-all font-serif">
          <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="text-[10px] uppercase font-black tracking-[0.4em]">离开实验室</span>
        </button>

        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-serif font-black text-slate-800 tracking-widest">AI 习琴室</h2>
          <span className="text-[10px] text-emerald-800/40 font-bold uppercase tracking-[0.6em] mt-2">Intelligent Tutoring System</span>
        </div>

        <div className="w-[120px] flex justify-end">
           <div className="px-4 py-2 bg-emerald-50 rounded-full flex items-center gap-2 border border-emerald-100">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-black text-emerald-900 uppercase tracking-widest">Mic Ready</span>
           </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {state === 'selection' && (
          <motion.div 
            key="selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
             <div className="text-center max-w-2xl mx-auto mb-16">
                <h3 className="text-2xl font-serif font-black text-slate-800 mb-4 tracking-widest">选择练习曲目</h3>
                <p className="text-slate-400 text-sm font-serif leading-relaxed">通过AI精准捕捉您的每一个细微指法，从入门到精通，步步为营。</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {SONGS.map(song => (
                   <div 
                    key={song.id} 
                    className="group cursor-pointer" 
                    onClick={() => startEvaluation(song)}
                   >
                      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[40px] border border-slate-100 shadow-xl transition-all group-hover:scale-[1.02] group-hover:shadow-2xl relative overflow-hidden h-full flex flex-col">
                         <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
                            <Music size={80} />
                         </div>
                         <div className="flex items-center justify-between mb-6">
                            <span className={`px-3 py-1 bg-emerald-50 text-emerald-800 text-[9px] font-bold uppercase tracking-widest rounded-full border border-emerald-100`}>
                              {song.level}
                            </span>
                            {song.score && (
                              <span className="text-[10px] font-black text-emerald-600 font-serif">最高分: {song.score}</span>
                            )}
                         </div>
                         <h3 className="text-2xl font-serif font-black text-slate-800 mb-2">{song.title}</h3>
                         <p className="text-slate-400 text-[11px] font-serif mb-8 tracking-widest leading-relaxed flex-grow">{song.description}</p>
                         
                         <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                            <div className="flex items-center gap-2 text-slate-300 group-hover:text-emerald-600 transition-colors">
                              <Sparkles size={12} />
                              <span className="text-[9px] font-bold uppercase tracking-widest">侧重训练: {song.targetTechnique}</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-900 group-hover:bg-emerald-600 text-white flex items-center justify-center transition-all">
                               <Play size={14} fill="currentColor" />
                            </div>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </motion.div>
        )}

        {state === 'evaluating' && (
          <motion.div 
            key="eval"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-[500px] space-y-8"
          >
             <div className="relative">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-32 h-32 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-800"
                >
                   <AudioLines size={48} />
                </motion.div>
                <div className="absolute inset-0 rounded-full border-4 border-emerald-100 border-t-emerald-500 animate-spin" />
             </div>
             <div className="text-center">
                <h3 className="text-2xl font-serif font-black text-slate-800 tracking-widest mb-2">AI 正在深度阅谱...</h3>
                <p className="text-slate-400 text-xs font-serif uppercase tracking-[0.4em]">Analyzing pitch, rhythm and articulation</p>
             </div>
          </motion.div>
        )}

        {state === 'result' && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-12 gap-10 items-start"
          >
            {/* Score & Feedback Column */}
            <div className="col-span-12 lg:col-span-4 space-y-8">
               <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-2xl text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-[0.05]">
                    <Trophy size={80} />
                  </div>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4 block">本次评测得分</span>
                  <h3 className="text-8xl font-serif font-black text-slate-900 mb-6 relative">
                    88
                    <span className="text-2xl absolute -top-4 -right-8 text-emerald-500 font-sans">+4</span>
                  </h3>
                  <div className="flex justify-center gap-1 mb-8">
                     {[...Array(5)].map((_, i) => (
                       <Sparkles key={i} size={16} className={i < 4 ? 'text-amber-400' : 'text-slate-200'} />
                     ))}
                  </div>
                  <p className="text-slate-500 font-serif leading-relaxed px-4">
                    “琴声沉稳，气势初现。但细微处的韵味仍有提升空间。”
                  </p>
               </div>

               <div className="bg-amber-50 p-8 rounded-[40px] border border-amber-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.1] group-hover:scale-110 transition-transform">
                    <Sparkles size={100} className="text-amber-900" />
                  </div>
                  <div className="flex items-center gap-3 mb-4 text-amber-900">
                    <Info size={18} />
                    <h4 className="text-sm font-black uppercase tracking-widest font-serif">AI 特别提示</h4>
                  </div>
                  <p className="text-amber-900/70 text-sm leading-relaxed font-serif mb-8 relative z-10">
                    “你这次在第二段的‘<span className="font-black text-amber-900 underline">{selectedSong.targetTechnique}</span>’这个指法，手腕幅度偏大了，压弦过深，听起来韵味稍显粗犷，不足细腻。建议针对性加强此指法练习。”
                  </p>
                  <button 
                    onClick={() => setState('remedial')}
                    className="w-full py-4 bg-amber-900 text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-amber-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    开启“{selectedSong.targetTechnique}指法”专项强化
                    <ChevronRight size={14} />
                  </button>
               </div>
            </div>

            {/* Score Visualization Column */}
            <div className="col-span-12 lg:col-span-8 bg-white/40 backdrop-blur-xl p-12 rounded-[56px] border border-white shadow-inner min-h-[600px]">
               <div className="flex items-center justify-between mb-16">
                  <h4 className="text-xl font-serif font-black text-slate-800 tracking-wider">动态谱面检查</h4>
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-emerald-500" />
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">到位</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-3 h-3 rounded-full bg-rose-500" />
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">偏离</span>
                    </div>
                  </div>
               </div>

               {/* Virtual Strings & Notes */}
               <div className="relative h-[300px] flex items-center justify-around px-10">
                  <div className="absolute inset-x-0 h-full flex flex-col justify-between opacity-10">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className="w-full h-px bg-slate-900" />
                    ))}
                  </div>
                  
                  {PRACTICE_RESULTS.map((res, i) => (
                    <motion.div 
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="relative flex flex-col items-center gap-4"
                    >
                       <div className={`w-14 h-14 rounded-full flex items-center justify-center relative ${res.isCorrect ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600 shadow-[0_0_20px_rgba(244,63,94,0.2)]'}`}>
                          {res.isCorrect ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                          <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${res.isCorrect ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                       </div>
                       <span className="text-2xl font-serif font-black text-slate-800">{res.note}</span>
                       {res.feedback && (
                         <span className="absolute -bottom-8 px-2 py-1 bg-slate-900 text-white text-[8px] rounded uppercase tracking-tighter whitespace-nowrap">
                           {res.feedback}
                         </span>
                       )}
                    </motion.div>
                  ))}
               </div>

               <div className="mt-32 pt-12 border-t border-slate-100 flex justify-center">
                  <button onClick={() => setState('selection')} className="flex items-center gap-2 text-slate-300 hover:text-slate-900 transition-colors uppercase font-black text-[10px] tracking-[0.4em]">
                    <RotateCcw size={14} /> 重新弹奏一次
                  </button>
               </div>
            </div>
          </motion.div>
        )}

        {state === 'remedial' && (
          <motion.div 
            key="remedial"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl mx-auto space-y-12"
          >
            <div className="bg-emerald-950 p-16 rounded-[64px] text-white relative overflow-hidden shadow-3xl">
               <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
               <div className="relative z-10 space-y-10">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-[32px] bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/10">
                      <Sparkles size={40} className="text-emerald-300" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-serif font-black tracking-wider">AI 现场生成：{selectedSong.targetTechnique}指练习曲</h3>
                      <p className="text-emerald-300/40 text-xs font-serif uppercase tracking-[0.4em] mt-2">Targeted Remedial Composition</p>
                    </div>
                  </div>

                  <p className="text-emerald-50/60 font-serif leading-loose text-lg max-w-2xl px-2">
                    “此曲由AI根据您《{selectedSong.title}》的弹奏记录生成，特意缩减了复杂的旋律变幻，将主要的转场替换为密集的‘{selectedSong.targetTechnique}’音训练点。请在使用左手指法动时，注意气韵的流动，切勿用力过猛。”
                  </p>

                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="w-1/3 h-full bg-emerald-400"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-6">
                    <button 
                      onClick={() => setShowRemedialSuccess(true)}
                      className="px-12 py-6 bg-white text-emerald-950 rounded-full font-black uppercase tracking-[0.4em] text-[12px] shadow-2xl hover:scale-105 active:scale-95 transition-all"
                    >
                       开始跟随练习
                    </button>
                    <div className="flex gap-4">
                       <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity cursor-pointer">
                          <RotateCcw size={20} />
                       </div>
                    </div>
                  </div>
               </div>
            </div>

            <AnimatePresence>
               {showRemedialSuccess && (
                 <motion.div 
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-2xl flex items-center justify-between px-16 group"
                 >
                   <div className="flex items-center gap-8">
                      <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 size={32} />
                      </div>
                      <div>
                        <h4 className="text-2xl font-serif font-black text-slate-800">指法已有显著精进！</h4>
                        <p className="text-slate-400 text-xs font-serif tracking-widest mt-1 uppercase font-bold">Feedback Loop Completed</p>
                      </div>
                   </div>
                   <button 
                    onClick={() => setState('result')} 
                    className="px-8 py-4 border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-slate-900 hover:text-slate-900 transition-all"
                   >
                     返回评测
                   </button>
                 </motion.div>
               )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
