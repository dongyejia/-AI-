import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Send, 
  Sparkles, 
  Wind, 
  Music, 
  Download, 
  RefreshCcw,
  Flag,
  CloudRain,
  Mountain,
  Heart,
  Volume2,
  Settings2,
  Check
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Composition {
  title: string;
  analysis: string;
  atmosphere: string;
  tags: string[];
}

interface WaveformBar {
  id: number;
  height: number;
}

const TAG_OPTIONS = ['家国情怀', '隐逸生活', '思念远方', '高山大川', '禅意入定'];

const COMPOSER_SYSTEM_PROMPT = `
你是一位精通中国传统音乐理论和古琴指法、意境的“AI乐师”。
当用户输入情感、意境或关键词时，你需要为一段30秒的古琴曲撰写“曲志”及“乐理分析”。

如果用户在之前的创作基础上提出修改建议（如“添加一些风雪感”），你需要在保留核心意境的同时，调整分析内容，说明新加入的技法如何体现新意境。

格式要求（必须返回合法的JSON）：
{
  "title": "曲名",
  "analysis": "详细的乐理分析（Markdown格式），包含调式、指法等",
  "atmosphere": "意境描述词",
  "tags": ["标签1", "标签2"]
}

风格：专业、典雅、充满文学气息。
`;

export const EmotionComposer: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [composition, setComposition] = useState<Composition | null>({
    title: '家国山河 · 宫调',
    analysis: '此曲采用**宫**调式，营造出庄重、宏阔且具有庙堂之气的意境。\n\n- **旋律特征**：上行旋律线多次跳跃，如高山崇峻，象征民族之脊梁。\n- **关键指法**：在处理“家国”主题时，大量运用了“滚拂”技巧，模拟江河奔涌之声；结在泛音，清澈悠远，寓意对未来的无限希望。\n- **意蕴呈现**：通过稳健的节奏与浑厚的共鸣，展现出一种厚德载物、忧国忧民却又不失浩然正气的文士情怀。',
    atmosphere: '庄重、阔大、民族气节',
    tags: ['家国情怀', '浩然正气']
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [history, setHistory] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [waveform, setWaveform] = useState<WaveformBar[]>(
    Array.from({ length: 40 }, (_, i) => ({ 
      id: i, 
      height: 30 + Math.sin(i * 0.3) * 20 + Math.random() * 20 
    }))
  );
  const [showExportSuccess, setShowExportSuccess] = useState(false);

  // Sound pulse effect
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setWaveform(prev => prev.map(bar => ({
          ...bar,
          height: Math.max(10, Math.min(100, bar.height + (Math.random() - 0.5) * 15))
        })));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleCompose = async (customInput?: string) => {
    const textToProcess = customInput || input;
    if (!textToProcess.trim()) return;

    setIsLoading(true);
    setIsPlaying(false);

    try {
      const currentHistory = [...history, { role: 'user' as const, text: textToProcess }];
      const response = await fetch('/api/composer/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: textToProcess,
          history: currentHistory
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const newComp: Composition = {
        title: data.title || '无名调',
        analysis: data.analysis || '指法随心而动。',
        atmosphere: data.atmosphere || '宁静致远。',
        tags: Array.isArray(data.tags) ? data.tags : []
      };

      setComposition(newComp);
      setHistory([...currentHistory, { role: 'model', text: JSON.stringify(data) }]);
      
      // Dramatic initial waveform generation
      setWaveform(Array.from({ length: 40 }, (_, i) => ({ 
        id: i, 
        height: 15 + Math.random() * 70 
      })));

      setIsPlaying(true);
      setInput(''); 
    } catch (error) {
      console.error('Composition Error:', error);
      const fallback: Composition = {
        title: '心之回响',
        analysis: '采用“宫”调式，营造庄重、辽阔之感。上行的旋律线如高山耸立，象征民族脊梁；结尾的泛音清澈悠远，寓意对未来的希望。',
        atmosphere: '庄重、辽阔、充满希望',
        tags: ['家国情怀']
      };
      setComposition(fallback);
      setIsPlaying(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWaveformEdit = (id: number, e: any) => {
    if (isLoading) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clientY = (e as any).touches ? (e as any).touches[0].clientY : (e as any).clientY;
    const newHeight = Math.max(10, Math.min(100, 100 - ((clientY - rect.top) / rect.height) * 100));
    
    setWaveform(prev => prev.map(bar => bar.id === id ? { ...bar, height: newHeight } : bar));
  };

  const handleExport = () => {
    setIsLoading(true);
    setTimeout(() => {
      const dummyContent = "dummy mp3 content for sim";
      const blob = new Blob([dummyContent], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${composition?.title || '古琴创作'}.mp3`;
      a.click();
      URL.revokeObjectURL(url);
      setIsLoading(false);
      setShowExportSuccess(true);
      setTimeout(() => setShowExportSuccess(false), 3000);
    }, 1500);
  };

  const handleTagClick = (tag: string) => {
    setInput(tag);
    handleCompose(tag);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto py-12 px-6"
    >
      <header className="flex items-center justify-between mb-16">
        <button onClick={onBack} className="flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-all font-serif">
          <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="text-[10px] uppercase font-black tracking-[0.4em]">返回主页</span>
        </button>

        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-serif font-black text-slate-800 tracking-widest">因情生乐</h2>
          <span className="text-[10px] text-emerald-800/40 font-bold uppercase tracking-[0.6em] mt-2">AI Generative Composition</span>
        </div>

        <div className="w-[100px]" />
      </header>

      <div className="grid grid-cols-12 gap-12 items-start relative">
        {/* Creative Background Elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-50 rounded-full blur-[100px] opacity-50 pointer-events-none" />
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-amber-50 rounded-full blur-[120px] opacity-30 pointer-events-none" />

        {/* Left: Input & Interaction */}
        <div className="col-span-12 lg:col-span-5 space-y-10 relative z-10 lg:sticky lg:top-8">
          <div className="bg-[#fcfbf7]/90 backdrop-blur-xl p-10 rounded-[48px] border border-amber-100/50 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]">
             <h3 className="text-2xl font-serif font-black text-slate-800 mb-6 tracking-wider">
               输入您的想法
             </h3>
             <p className="text-slate-400 text-sm font-serif leading-relaxed mb-10">
               {composition 
                 ? '觉得还不够完美？再添一笔（如“添加一些风雪感”），让AI为您继续捕捉那些细碎的感悟。' 
                 : '输入感悟、心情，或选择一个关键词，让AI为您的情感寻找最契合的千年弦响。'}
             </p>

             <div className="space-y-4 mb-2">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest font-serif block">精选意象 · Presets</span>
                <div className="flex flex-wrap gap-2">
                   {TAG_OPTIONS.map(tag => (
                     <button 
                       key={tag}
                       onClick={() => handleTagClick(tag)}
                       className={`px-5 py-2 rounded-xl text-[10px] font-bold border transition-all ${input === tag ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-100 text-slate-400 hover:border-slate-300 bg-white/50'}`}
                     >
                       {tag}
                     </button>
                   ))}
                </div>
             </div>

             <div className="relative pt-4">
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleCompose())}
                  placeholder="如：再添加一些风雪感，或者输入新的情感意境..."
                  className="w-full h-44 p-8 bg-white/80 rounded-[32px] border border-amber-100/20 focus:outline-none focus:ring-4 focus:ring-emerald-950/5 transition-all font-serif resize-none text-slate-700 shadow-inner text-sm leading-relaxed"
                />
                <button 
                  onClick={() => handleCompose()}
                  disabled={isLoading || !input.trim()}
                  className={`absolute bottom-6 right-6 w-14 h-14 ${composition ? 'bg-emerald-950' : 'bg-slate-900'} text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl disabled:opacity-50 z-10`}
                >
                  {isLoading ? <RefreshCcw size={20} className="animate-spin" /> : <Send size={20} />}
                </button>
             </div>

             <div className="mt-8 flex items-center gap-6 px-4">
                <div className="flex -space-x-2">
                   {[...Array(3)].map((_, i) => (
                     <div key={i} className="w-6 h-6 rounded-full border-2 border-[#fcfbf7] bg-slate-200" />
                   ))}
                </div>
                <span className="text-[9px] text-slate-400 font-serif tracking-widest uppercase">1.2k+ 用户曾在这里留下共鸣</span>
             </div>

             {composition && (
               <div className="mt-8 pt-8 border-t border-slate-100">
                 <button 
                   onClick={() => { setComposition(null); setHistory([]); }}
                   className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2 hover:text-slate-900 transition-colors"
                 >
                   <RefreshCcw size={12} /> 重新开始新主题
                 </button>
               </div>
             )}
          </div>

          <div className="flex gap-6 opacity-30 justify-center">
             <Flag size={20} />
             <CloudRain size={20} />
             <Mountain size={20} />
             <Heart size={20} />
          </div>
        </div>

        {/* Right: Composition Result */}
        <div className="col-span-12 lg:col-span-7 relative z-10">
           <AnimatePresence mode="wait">
             {isLoading && !composition ? (
               <motion.div 
                 key="loading"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="h-[650px] flex flex-col items-center justify-center space-y-8 bg-white/40 rounded-[64px] border border-white"
               >
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="text-slate-300"
                  >
                    <RefreshCcw size={48} strokeWidth={1} />
                  </motion.div>
                  <div className="text-center">
                    <p className="text-xl font-serif font-black text-slate-800 tracking-widest mb-2">AI 正在调律...</p>
                    <p className="text-slate-400 text-xs font-serif uppercase tracking-[0.4em]">Translating soul to string</p>
                  </div>
               </motion.div>
             ) : composition ? (
               <motion.div 
                 key="result"
                 initial={{ opacity: 0, x: 30 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="space-y-8"
               >
                  {/* Waveform Visualization & Editor */}
                  <div className="bg-slate-950 rounded-[48px] overflow-hidden relative shadow-2xl p-10 flex flex-col space-y-10 group">
                    <div className="flex items-center justify-between">
                       <div className="flex flex-col">
                          <h3 className="text-white font-serif text-3xl font-black tracking-[0.1em]">{composition.title}</h3>
                          <span className="text-teal-400/50 text-[10px] font-serif uppercase tracking-widest mt-1">Generated Manuscript</span>
                       </div>
                       <div className="flex items-center gap-3">
                          <button 
                            onClick={handleExport}
                            disabled={isLoading}
                            className="h-12 px-6 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center gap-2 text-white transition-all active:scale-95 disabled:opacity-50"
                          >
                             {isLoading ? <RefreshCcw size={14} className="animate-spin" /> : <Download size={14} />}
                             <span className="text-[10px] font-black uppercase tracking-widest">导出 MP3</span>
                          </button>
                          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer">
                             <Settings2 size={18} />
                          </div>
                       </div>
                    </div>

                    <div className="relative h-48 flex items-end gap-1.5 px-4 bg-white/[0.02] rounded-3xl border border-white/[0.05] shadow-inner overflow-hidden">
                       {waveform.map((bar) => (
                         <motion.div 
                           key={bar.id}
                           onMouseEnter={(e: any) => (e.buttons === 1 || e.touches) && handleWaveformEdit(bar.id, e)}
                           onMouseDown={(e: any) => handleWaveformEdit(bar.id, e)}
                           onTouchMove={(e: any) => handleWaveformEdit(bar.id, e)}
                           initial={{ height: 0 }}
                           animate={{ 
                             height: `${bar.height}%`,
                             opacity: isPlaying ? [0.4, 0.8, 0.4] : 0.6,
                             backgroundColor: isPlaying ? 'rgb(45 212 191)' : 'rgba(255, 255, 255, 0.3)'
                           }}
                           transition={isPlaying ? { 
                             duration: 1.5, 
                             repeat: Infinity, 
                             delay: bar.id * 0.05 
                           } : { duration: 0.5 }}
                           className="flex-1 rounded-t-full cursor-ns-resize transition-all hover:bg-teal-400/50"
                         />
                       ))}
                       <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40" />
                    </div>

                    <div className="flex items-center justify-between relative z-10">
                       <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="flex items-center gap-4 group/play"
                       >
                         <div className="w-14 h-14 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-xl group-hover/play:scale-110 transition-transform">
                            {isPlaying ? <Music className="animate-pulse" /> : <Music size={20} />}
                         </div>
                         <div className="text-left">
                            <p className="text-white text-xs font-bold uppercase tracking-widest">{isPlaying ? '正在奏响' : '停止奏响'}</p>
                            <p className="text-white/30 text-[10px] font-serif">00:30 Stereo Render</p>
                         </div>
                       </button>

                       <div className="sm:flex gap-4 hidden">
                          {composition.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] text-teal-100/40 font-serif uppercase tracking-widest">
                              {tag}
                            </span>
                          ))}
                       </div>
                    </div>
                  </div>

                  {/* Interpretation Card */}
                  <div className="bg-[#fdfdfb] p-12 rounded-[48px] border border-amber-100/30 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                         <Sparkles size={160} />
                      </div>

                      <div className="flex items-center gap-4 mb-8">
                         <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center">
                            <Sparkles size={18} />
                         </div>
                         <h4 className="text-xl font-serif font-black text-slate-800 tracking-wider">乐志 · Transcription</h4>
                      </div>

                      <div className="prose prose-slate max-w-none prose-p:font-serif prose-p:leading-loose text-slate-600 relative z-10">
                         <ReactMarkdown>{composition.analysis}</ReactMarkdown>
                      </div>

                      <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                         <div className="flex items-center gap-4">
                            <Wind size={20} className="text-slate-300" />
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">意境：{composition.atmosphere}</span>
                         </div>
                         <div className="flex items-center gap-4">
                            <AnimatePresence>
                              {showExportSuccess && (
                                <motion.span 
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0 }}
                                  className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1"
                                >
                                  <Check size={10} /> 文件已就绪
                                </motion.span>
                              )}
                            </AnimatePresence>
                         </div>
                      </div>
                  </div>
               </motion.div>
             ) : null}
           </AnimatePresence>
        </div>
      </div>

      {/* Experimental Note */}
      <div className="mt-20 text-center opacity-10">
         <p className="text-[9px] font-serif uppercase tracking-[1em] text-slate-900">Virtual Acoustics Research Institute © 2026</p>
      </div>
    </motion.div>
  );
};
