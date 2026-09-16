import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Settings, 
  Award, 
  Clock, 
  BookOpen, 
  Heart,
  Music,
  TrendingUp,
  ChevronRight,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const UserProfile: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const stats = [
    { label: '练习曲目', value: '12', icon: Music, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: '获得勋章', value: '5', icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: '共鸣感悟', value: '28', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: '习琴时长', value: '42h', icon: Clock, color: 'text-sky-600', bg: 'bg-sky-50' },
  ];

  const recentActivities = [
    { title: '完成练习《沧海一声笑》', time: '2小时前', score: '88分', type: 'practice' },
    { title: '与伯牙进行了一次深度对话', time: '昨天', score: '', type: 'chat' },
    { title: '因情生乐：生成了《家国山河》', time: '3天前', score: '', type: 'composition' },
  ];

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
          <span className="text-[10px] uppercase font-black tracking-[0.4em]">返回主页</span>
        </button>

        <h2 className="text-xl font-serif font-black text-slate-800 tracking-widest uppercase">个人主页 · Profile</h2>

        <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all">
          <Settings size={18} />
        </button>
      </header>

      <div className="grid grid-cols-12 gap-10">
        {/* Left: User Info Card */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="bg-white p-12 rounded-[56px] border border-slate-100 shadow-2xl text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                <TrendingUp size={120} />
             </div>
             
             <div className="relative mb-8 flex justify-center">
                <div className="w-32 h-32 rounded-full border-8 border-slate-50 relative overflow-hidden shadow-xl">
                   <img 
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200" 
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                   />
                </div>
                <div className="absolute bottom-1 right-1/2 translate-x-8 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center text-white">
                   <Award size={14} />
                </div>
             </div>

             <h3 className="text-3xl font-serif font-black text-slate-800 mb-2">楚天阔</h3>
             <p className="text-slate-400 text-xs font-serif uppercase tracking-[0.3em] mb-10">初窥门径 · 入门乐者</p>

             <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className={`${stat.bg} p-6 rounded-3xl flex flex-col items-center gap-2`}>
                     <stat.icon size={18} className={stat.color} />
                     <span className="text-2xl font-serif font-black text-slate-900 leading-none">{stat.value}</span>
                     <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-slate-900 p-10 rounded-[48px] text-white relative overflow-hidden shadow-3xl">
             <div className="absolute top-0 right-0 p-8 opacity-10">
               <BookOpen size={80} />
             </div>
             <h4 className="text-lg font-serif font-bold tracking-widest mb-6">今日琴言</h4>
             <p className="text-slate-400 font-serif leading-relaxed italic text-sm">
               “清风入弦，心随指动。今日建议练习《秋风词》，重点体会‘撞’音的虚实转换。”
             </p>
          </div>
        </div>

        {/* Right: Activities & Progress */}
        <div className="col-span-12 lg:col-span-8 space-y-10">
           {/* Section 1: Recent Activity */}
           <div className="bg-white/40 backdrop-blur-xl p-12 rounded-[64px] border border-white shadow-inner">
              <div className="flex items-center justify-between mb-12">
                 <h4 className="text-2xl font-serif font-black text-slate-800 tracking-wider">最近动态</h4>
                 <button className="text-[10px] font-black text-slate-300 hover:text-slate-900 transition-colors uppercase tracking-widest">查看全部</button>
              </div>

              <div className="space-y-6">
                 {recentActivities.map((activity, i) => (
                   <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-50 flex items-center justify-between group hover:shadow-xl transition-all cursor-pointer">
                      <div className="flex items-center gap-6">
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                           activity.type === 'practice' ? 'bg-emerald-50 text-emerald-600' : 
                           activity.type === 'chat' ? 'bg-sky-50 text-sky-600' : 'bg-rose-50 text-rose-600'
                         }`}>
                           {activity.type === 'practice' ? <Music size={20} /> : activity.type === 'chat' ? <MessageSquare size={20} /> : <Sparkles size={20} />}
                         </div>
                         <div>
                            <h5 className="font-serif font-black text-slate-800 text-lg">{activity.title}</h5>
                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{activity.time}</span>
                         </div>
                      </div>
                      <div className="flex items-center gap-6">
                         {activity.score && (
                           <span className="text-xl font-serif font-black text-emerald-600">{activity.score}</span>
                         )}
                         <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all">
                            <ChevronRight size={16} />
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Section 2: Learning Progress */}
           <div className="grid grid-cols-2 gap-8">
              <div className="bg-emerald-50/50 p-10 rounded-[48px] border border-emerald-100 flex flex-col justify-between h-[280px]">
                 <div>
                    <h4 className="text-xl font-serif font-black text-emerald-950 tracking-wider mb-2">指法掌握度</h4>
                    <span className="text-[10px] font-bold text-emerald-600/60 uppercase tracking-widest">Technique Proficiency</span>
                 </div>
                 <div className="space-y-4">
                    {[
                      { name: '勾/剔', val: '92%' },
                      { name: '猱/吟', val: '65%' },
                      { name: '滚/拂', val: '40%' }
                    ].map((tech, i) => (
                      <div key={i} className="space-y-1.5">
                         <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-emerald-800">
                            <span>{tech.name}</span>
                            <span>{tech.val}</span>
                         </div>
                         <div className="h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: tech.val }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-emerald-500" 
                            />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-rose-50/50 p-10 rounded-[48px] border border-rose-100 flex flex-col justify-between h-[280px]">
                 <div>
                    <h4 className="text-xl font-serif font-black text-rose-950 tracking-wider mb-2">艺术修行</h4>
                    <span className="text-[10px] font-bold text-rose-600/60 uppercase tracking-widest">Artistic Spirit</span>
                 </div>
                 <div className="flex flex-col items-center gap-4">
                    <div className="w-24 h-24 rounded-full border-4 border-rose-200 border-t-rose-500 flex items-center justify-center font-serif font-black text-3xl text-rose-950">
                       Lv.4
                    </div>
                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">距离下一境界还需 500 经验</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};
