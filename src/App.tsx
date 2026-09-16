/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Music, 
  Smartphone, 
  Lock, 
  ShieldCheck, 
  ArrowRight,
  X,
  Play,
  Zap,
  Globe,
  Headphones,
  Cpu,
  MessageSquare,
  Music2,
  Wind,
  Sparkles,
  ChevronRight
} from 'lucide-react';

// New specialized views
import { MusicList } from './components/MusicList';
import { MusicAppreciation } from './components/MusicAppreciation';
import { BoyaChat } from './components/BoyaChat';
import { EmotionComposer } from './components/EmotionComposer';
import { AILab } from './components/AILab';
import { UserProfile } from './components/UserProfile';

type LoginMode = 'password' | 'code';
type Page = 'home' | 'map' | 'wuhan-detail' | 'guqin-home' | 'music-list' | 'appreciation' | 'boya-chat' | 'emotion-composer' | 'ai-lab' | 'profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [previousPage, setPreviousPage] = useState<Page>('home');
  const [selectedMusicId, setSelectedMusicId] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMode, setLoginMode] = useState<LoginMode>('password');
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSendCode = () => {
    setIsSendingCode(true);
    setTimeout(() => setIsSendingCode(false), 60000);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setCurrentPage('map');
  };

  const navigateToProfile = () => {
    setPreviousPage(currentPage);
    setCurrentPage('profile');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-soft-gradient selection:bg-teal-100 scroll-smooth overflow-x-hidden">
      {/* Enhanced Background Design Elements */}
      <div className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${currentPage === 'map' ? 'opacity-0' : 'opacity-100'}`}>
        {! (currentPage === 'map') && (
          <>
            <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-teal-200/20 rounded-full blur-[120px]" />
            <div className="absolute top-[40%] right-[-5%] w-[600px] h-[600px] bg-sky-200/20 rounded-full blur-[140px]" />
            <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-lime-100/30 rounded-full blur-[150px]" />
            
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #0f172a 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <div className="absolute top-0 right-0 w-full h-full opacity-[0.05]">
              {[...Array(7)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute h-px bg-slate-900 w-[200%] top-[25%] left-[-50%] -rotate-[12deg]"
                  style={{ marginTop: `${i * 60}px`, opacity: 1 - i * 0.12 }}
                />
              ))}
            </div>

            <div className="absolute top-[20%] right-[15%] opacity-20 transform rotate-12">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <path d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z" stroke="#0d9488" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute bottom-[20%] left-[10%] opacity-20 transform -rotate-12">
              <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
                <circle cx="70" cy="70" r="69.5" stroke="#0284c7" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
            </div>
          </>
        )}
      </div>

      {/* Unified Background for Map & Detail Pages to keep it clean */}
      {(currentPage === 'map' || currentPage === 'wuhan-detail') && (
        <div className="fixed inset-0 bg-aged-paper z-0 shadow-inner">
          {/* Atmospheric Mist/Clouds - Increased opacity and layer depth */}
          <div className="absolute top-[5%] left-[-15%] w-[80%] h-[50%] bg-teal-600/10 blur-[140px] rounded-full animate-pulse opacity-80" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[50%] bg-sky-600/10 blur-[120px] rounded-full animate-pulse opacity-80" style={{ animationDelay: '3s' }} />
          <div className="absolute top-[35%] right-[5%] w-[40%] h-[40%] bg-lime-600/10 blur-[100px] rounded-full animate-pulse opacity-80" style={{ animationDelay: '6s' }} />
          
          {/* Faint Artistic Mountain Silhouette - Increased visibility and multi-layered perspective */}
          <div className="absolute bottom-0 w-full h-[55%] opacity-[0.08] pointer-events-none translate-y-[5%]">
            <svg viewBox="0 0 1440 320" className="w-[120%] h-full -ml-[10%] preserve-3d transition-transform duration-1000">
              {/* Back Layer */}
              <path fill="#0f766e" opacity="0.4" d="M0,160L48,154.7C96,149,192,139,288,149.3C384,160,480,192,576,202.7C672,213,768,203,864,181.3C960,160,1056,128,1152,122.7C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              {/* Middle Layer */}
              <path fill="#134e4a" opacity="0.6" d="M0,224L48,229.3C96,235,192,245,288,234.7C384,224,480,192,576,176C672,160,768,160,864,181.3C960,203,1056,245,1152,250.7C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              {/* Foreground Accent */}
              <path fill="#064e3b" d="M0,288L48,272C96,256,192,224,288,218.7C384,213,480,235,576,250.7C672,267,768,277,864,266.7C960,256,1056,224,1152,213.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>

          {/* Floating Dust/Particles for texture */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.3, 0], 
                  y: [0, -100],
                  x: [0, (i % 2 === 0 ? 50 : -50)]
                }}
                transition={{ 
                  duration: 5 + Math.random() * 5, 
                  repeat: Infinity, 
                  delay: Math.random() * 5 
                }}
                className="absolute w-1 h-1 bg-teal-400/20 rounded-full"
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  top: `${Math.random() * 100}%` 
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="sticky top-0 z-50 px-8 py-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-3 items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Music size={22} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 font-serif">知音AI乐坊</span>
          </div>

          <div className="hidden lg:flex items-center justify-center gap-10">
            <button onClick={() => setCurrentPage('home')} className="nav-link-centered">
              {currentPage === 'home' && <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />} 首页
            </button>
            <a href="#features" className="nav-link-centered">产品介绍</a>
            <a href="#features" className="nav-link-centered">操作指南</a>
            <a href="#features" className="nav-link-centered">关于我们</a>
          </div>

          <div className="flex items-center justify-end gap-3">
            {isLoggedIn ? (
              /* Only show profile UI if logged in */
              <div 
                className="flex items-center gap-4 bg-white/50 backdrop-blur-md px-5 py-2 rounded-2xl border border-white/50 cursor-pointer hover:bg-white/80 transition-all group"
                onClick={navigateToProfile}
              >
                <div className="flex flex-col items-end">
                   <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">楚天阔</span>
                   <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Level 4 · 琴心境</span>
                </div>
                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm transition-transform group-hover:scale-105">
                  <img 
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100" 
                    alt="User Avatar" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ) : currentPage === 'home' ? (
              /* Home page guest view */
              <>
                <button onClick={() => setShowLogin(true)} className="btn-dark">登录</button>
                <button onClick={() => setCurrentPage('map')} className="btn-light">
                  即刻体验 <ArrowRight size={14} />
                </button>
              </>
            ) : (
              /* Other pages guest view: just a login option without user info */
              <button onClick={() => setShowLogin(true)} className="btn-dark text-[10px] py-2 px-6">登录账号</button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          {currentPage === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <section className="px-6 pt-32 pb-40 text-center max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="mb-10 flex justify-center">
                    <span className="px-4 py-1.5 rounded-full border border-teal-200 text-teal-600 text-xs font-bold bg-teal-50/30">
                      以乐载道 · 匠心智传
                    </span>
                  </div>
                  
                  <h1 className="hero-title mb-8">知音AI乐坊</h1>
                  
                  <h2 className="hero-subtitle mb-10 max-w-3xl mx-auto">
                    高山流水觅知音，在数字艺境中开启智慧思政与古琴乐教的新篇章。<br />
                    通过 AI 实时测评，让传统艺术触手及。
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-left">
                    <motion.div className="feature-card p-10 group cursor-pointer" onClick={() => setCurrentPage('map')}>
                      <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6 text-teal-600 shadow-inner">
                        <Globe size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4 font-serif">思政融合</h3>
                      <p className="text-slate-500 leading-relaxed text-sm">
                        将传统乐理与家国情怀深度结合，在指尖流转中体悟中华文明的博大精深。
                      </p>
                    </motion.div>

                    <motion.div className="feature-card p-10 group cursor-pointer" onClick={() => setCurrentPage('map')}>
                      <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-6 text-orange-600 shadow-inner">
                        <Zap size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4 font-serif">AI 实时测评</h3>
                      <p className="text-slate-500 leading-relaxed text-sm">
                        亚秒级采样频率，实时纠偏指法误区，为您提供最权威的数字化教导。
                      </p>
                    </motion.div>

                    <motion.div className="feature-card p-10 group cursor-pointer" onClick={() => setCurrentPage('map')}>
                      <div className="w-14 h-14 bg-sky-500/10 rounded-2xl flex items-center justify-center mb-6 text-sky-600 shadow-inner">
                        <Play size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4 font-serif">数字艺境</h3><p className="text-slate-500 leading-relaxed text-sm">沉浸式的视听体验，带您穿越时空，领略大美河山与古琴乐律的完美交响。</p></motion.div></div></motion.div></section></motion.div>) : currentPage === "map" ? (
            <motion.div
              key="map"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center p-10"
            >
              <div className="max-w-6xl w-full relative">
                <div className="text-center mb-16 px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center"
                  >
                    <span className="w-12 h-px bg-[#2c2a26]/20 mb-6" />
                    <div className="relative">
                      <h2 className="text-6xl font-serif font-black text-[#2c2a26] tracking-[0.2em] mb-8">中国音乐艺术地图</h2>
                      <div className="absolute -right-16 top-0 w-10 h-10 border-2 border-[#b91c1c] text-[#b91c1c] flex items-center justify-center font-serif text-[10px] leading-none opacity-40 rotate-12">
                        <span className="text-center font-bold">乐律<br/>瑰宝</span>
                      </div>
                    </div>
                    <div className="space-y-3 text-[#4a4740] font-serif italic text-sm tracking-[0.4em] opacity-80 leading-relaxed">
                      <p>九州共襄 · 山河锦绣</p>
                      <p>华夏同心 · 地大物博</p>
                      <p>文明古国 · 历久弥新</p>
                    </div>
                    <span className="w-12 h-px bg-[#2c2a26]/20 mt-10" />
                  </motion.div>
                </div>

                <div className="relative aspect-[16/9] w-full bg-[#f4f1ea] rounded-[60px] overflow-hidden border-[12px] border-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] group transition-all duration-700">
                  {/* High Quality Artistic Ink Wash Map of China - Masking potential text on source */}
                  <div className="absolute inset-0 scale-[1.08] translate-y-[-2%]">
                    <img 
                      src="https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&q=80&w=2000" 
                      alt="中国音乐艺术地图" 
                      className="w-full h-full object-cover opacity-90 brightness-[1.02] contrast-[1.05]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Atmospheric Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#2c2a26]/10 via-transparent to-[#134e4a]/5 pointer-events-none" />
                  <div className="absolute inset-0 bg-white/5 mix-blend-overlay pointer-events-none" />
                  <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }} />

                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.5 }}
                    className="absolute top-[62%] left-[68%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/point cursor-pointer z-20"
                    onClick={() => setCurrentPage('wuhan-detail')}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-amber-400 rounded-full animate-ping absolute inset-0 opacity-40" />
                      <div className="w-8 h-8 bg-amber-500 rounded-full shadow-[0_0_30px_rgba(245,158,11,1)] border-2 border-white relative z-10" />
                    </div>
                    <div className="mt-4 px-5 py-2.5 bg-[#2c2a26] border border-[#3d3b37] text-[#f4f1ea] rounded-2xl shadow-2xl transform group-hover/point:scale-110 transition-transform flex flex-col items-center">
                      <span className="text-sm font-bold whitespace-nowrap font-serif">古琴 · 知音</span>
                      <span className="text-[10px] text-amber-400 mt-1 uppercase tracking-widest font-black">湖北武汉 · 已开启</span>
                    </div>
                  </motion.div>

                  {/* Inactive Hotspots - Adjusted for artistic map scales */}
                  <div className="absolute top-[28%] left-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center opacity-40 grayscale cursor-pointer z-10" onClick={() => showToast('“秦风·民歌”内容筹备中，敬请期待')}>
                    <div className="w-4 h-4 bg-slate-500 rounded-full border-2 border-white/50 border-dashed" />
                    <div className="mt-3 px-3 py-1.5 bg-white/60 border border-slate-200 rounded-lg shadow-sm backdrop-blur-md">
                      <span className="text-[10px] font-bold text-slate-700 whitespace-nowrap tracking-wider font-serif">秦风 · 民歌</span>
                    </div>
                  </div>

                  <div className="absolute top-[60%] left-[83%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center opacity-40 grayscale cursor-pointer z-10" onClick={() => showToast('“江南·丝竹”内容筹备中，敬请期待')}>
                    <div className="w-4 h-4 bg-slate-500 rounded-full border-2 border-white/50 border-dashed" />
                    <div className="mt-3 px-3 py-1.5 bg-white/60 border border-slate-200 rounded-lg shadow-sm backdrop-blur-md">
                      <span className="text-[10px] font-bold text-slate-700 whitespace-nowrap tracking-wider font-serif">江南 · 丝竹</span>
                    </div>
                  </div>

                  <div className="absolute top-[72%] left-[42%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center opacity-40 grayscale cursor-pointer z-10" onClick={() => showToast('“川韵·山歌”内容筹备中，敬请期待')}>
                    <div className="w-4 h-4 bg-slate-500 rounded-full border-2 border-white/50 border-dashed" />
                    <div className="mt-3 px-3 py-1.5 bg-white/60 border border-slate-200 rounded-lg shadow-sm backdrop-blur-md">
                      <span className="text-[10px] font-bold text-slate-700 whitespace-nowrap tracking-wider font-serif">川韵 · 山歌</span>
                    </div>
                  </div>

                  {/* Complete the Map Visual instructions */}
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-3 bg-white/50 border border-white/70 rounded-full backdrop-blur-2xl shadow-xl">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">以梦为马，循音入画。请点击金色地标开启艺术之旅</p>
                  </div>
                </div>

                {/* Toast Notification Container */}
                <AnimatePresence>
                  {toast && (
                    <motion.div 
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -50, scale: 0.9 }}
                      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[200] px-10 py-5 bg-teal-600 text-white rounded-full shadow-[0_20px_50px_rgba(13,148,136,0.3)] flex items-center gap-3 border border-teal-500 scale-100"
                    >
                      <Zap size={18} fill="currentColor" />
                      <span className="text-sm font-bold tracking-widest">{toast}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-12 flex justify-center">
                  <button onClick={() => setCurrentPage('home')} className="text-slate-400 hover:text-slate-900 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
                    ← 返回产品首页
                  </button>
                </div>
              </div>
            </motion.div>
          ) : currentPage === 'wuhan-detail' ? (
            <motion.div
              key="wuhan"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-screen relative flex items-center justify-center overflow-hidden"
            >
              {/* Background Landscape Elements */}
              <div className="absolute inset-0 z-0">
                {/* Yangtze & Han Rivers - Animated Flowing Water */}
                <svg viewBox="0 0 1440 800" className="absolute inset-0 w-full h-full opacity-20">
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    d="M-50,400 C200,350 400,450 600,400 S900,300 1200,400 S1440,450 1500,400"
                    fill="none"
                    stroke="#0ea5e9"
                    strokeWidth="80"
                    strokeLinecap="round"
                    className="filter blur-2xl"
                  />
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    transition={{ duration: 2.5, delay: 0.7 }}
                    d="M600,400 C620,450 580,550 600,700"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="60"
                    strokeLinecap="round"
                    className="filter blur-xl"
                  />
                </svg>

                {/* Yellow Crane Tower Silhouette - Highly Detailed Artistic Rendering */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 0.35, y: 0 }}
                  transition={{ delay: 1, duration: 1.5 }}
                  className="absolute top-[18%] right-[10%] w-80 h-[28rem] pointer-events-none drop-shadow-2xl"
                >
                  <svg viewBox="0 0 100 150" className="w-full h-full">
                    <defs>
                      <linearGradient id="towerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#92400e" />
                        <stop offset="100%" stopColor="#450a0a" />
                      </linearGradient>
                    </defs>
                    <g fill="url(#towerGrad)" stroke="#78350f" strokeWidth="0.2">
                      {/* Spire */}
                      <path d="M50 5 L55 15 L45 15 Z" />
                      {/* First Tier */}
                      <path d="M35 15 L65 15 Q75 15 78 28 L22 28 Q25 15 35 15 Z" />
                      <rect x="42" y="18" width="16" height="8" fill="#fde68a" opacity="0.1" />
                      {/* Second Tier */}
                      <path d="M28 28 L72 28 Q85 28 88 45 L12 45 Q15 28 28 28 Z" />
                      <rect x="40" y="32" width="20" height="10" fill="#fde68a" opacity="0.1" />
                      {/* Third Tier */}
                      <path d="M22 45 L78 45 Q95 45 98 68 L2 68 Q5 45 22 45 Z" />
                      {/* Bottom Sturdy Layer */}
                      <path d="M10 68 L90 68 L100 95 L0 95 Z" fill="#2c2a26" opacity="0.9" />
                      {/* Detailed Cornices */}
                      <path d="M12 45 L18 40 M88 45 L82 40" strokeWidth="0.5" />
                    </g>
                  </svg>
                </motion.div>
              </div>

              {/* Boya & Ziqi Illustrations - Refined Artistic Line Art */}
              <div className="absolute inset-0 z-5 pointer-events-none">
                {/* Boya (Playing) - More Intricate Ink Wash Style */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 0.15, x: 0 }}
                  transition={{ delay: 1.8, duration: 2.5 }}
                  className="absolute top-[20%] left-[-5%] w-[45rem] h-[45rem] text-emerald-950 pointer-events-none"
                >
                  <svg viewBox="0 0 200 200" className="w-full h-full filter blur-[0.5px]">
                    <defs>
                      <linearGradient id="brushBoya" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                      </linearGradient>
                      <filter id="inkSplat">
                        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
                      </filter>
                    </defs>
                    <g filter="url(#inkSplat)">
                      {/* Flowing Robes */}
                      <path d="M30,170 C50,120 80,110 120,120 S170,140 190,180" stroke="url(#brushBoya)" strokeWidth="2.5" fill="none" />
                      <path d="M35,160 Q60,80 110,85 T180,175" stroke="url(#brushBoya)" strokeWidth="1.8" fill="none" opacity="0.6" />
                      {/* Head & Upper Body */}
                      <path d="M100,75 Q90,45 110,35 T135,65 Q130,95 100,75" stroke="currentColor" strokeWidth="0.8" fill="currentColor" opacity="0.2" />
                      {/* Hands/Arms Action */}
                      <path d="M80,130 Q90,110 110,115" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
                      <path d="M115,112 Q130,110 145,125" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
                      {/* Guqin Shape */}
                      <rect x="65" y="125" width="100" height="5" rx="2.5" fill="currentColor" opacity="0.4" transform="rotate(-3, 115, 127)" />
                    </g>
                  </svg>
                </motion.div>

                {/* Ziqi (Listening) - More Intricate Ink Wash Style */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 0.15, x: 0 }}
                  transition={{ delay: 2.2, duration: 2.5 }}
                  className="absolute top-[15%] right-[-8%] w-[42rem] h-[42rem] text-teal-950 pointer-events-none"
                >
                  <svg viewBox="0 0 200 200" className="w-full h-full filter blur-[0.5px]">
                    <g filter="url(#inkSplat)">
                      {/* Contemplative Pose */}
                      <path d="M120,170 C100,110 130,80 160,90 S190,130 185,175" stroke="url(#brushBoya)" strokeWidth="2" fill="none" />
                      <path d="M110,165 Q125,70 155,75 T195,160" stroke="url(#brushBoya)" strokeWidth="1.5" fill="none" opacity="0.5" />
                      {/* Head & Concentration */}
                      <path d="M145,65 Q135,35 155,25 T185,55 Q180,85 145,65" stroke="currentColor" strokeWidth="0.8" fill="currentColor" opacity="0.2" />
                    </g>
                  </svg>
                </motion.div>
              </div>

              {/* Main Content Area */}
              <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center">
                {/* Central Icon: Guqin Terrace - Enhanced to match artistic style */}
                <motion.div
                  initial={{ scale: 0, rotate: -20, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", delay: 1.5, damping: 15 }}
                  className="w-48 h-48 flex items-center justify-center mb-16 relative group"
                >
                  <div className="absolute inset-0 bg-amber-100/50 rounded-full blur-3xl group-hover:bg-amber-200/50 transition-colors" />
                  
                  {/* Guqintai Silhouette Icon */}
                  <svg viewBox="0 0 100 100" className="w-40 h-40 relative z-10 drop-shadow-2xl">
                    <defs>
                      <linearGradient id="gateGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#991b1b" />
                        <stop offset="100%" stopColor="#450a0a" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <path d="M10 45 Q50 25 90 45 L90 55 Q50 35 10 55 Z" fill="url(#gateGradient)" filter="url(#glow)" />
                    <rect x="25" y="55" width="6" height="35" rx="1" fill="#450a0a" />
                    <rect x="69" y="55" width="6" height="35" rx="1" fill="#450a0a" />
                    <rect x="35" y="55" width="30" height="4" rx="1" fill="#7f1d1d" opacity="0.4" />
                    <rect x="5" y="85" width="90" height="12" rx="2" fill="#171717" />
                  </svg>
                  
                  <div className="absolute -bottom-2 bg-amber-950 text-amber-50 text-[11px] font-bold px-6 py-2 rounded-full uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(69,10,10,0.3)] border border-white/10 whitespace-nowrap z-20">
                    知音故里 · 武汉
                  </div>
                </motion.div>

                {/* Calligraphy background watermark */}
                <div className="absolute top-[50%] opacity-5 select-none pointer-events-none -rotate-6 scale-125">
                  <p className="text-9xl font-serif font-black text-amber-900 leading-none">琴台<br/>知音</p>
                </div>

                {/* Scroll Card (卷轴式卡片) - Redesigned for premium look */}
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5, type: "spring", damping: 20 }}
                  className="relative group w-full max-w-2xl"
                >
                  <div className="absolute inset-0 bg-amber-900 rounded-full blur-[100px] opacity-[0.07] group-hover:opacity-15 transition-opacity" />
                  
                  {/* The Scroll Body */}
                  <div className="bg-[#fcfaf2] border-x-[16px] border-amber-950/20 rounded-2xl p-12 shadow-[0_40px_80px_-15px_rgba(69,10,10,0.15)] relative overflow-hidden flex flex-col items-center">
                    {/* Paper Texture Overlay */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/handmade-paper.png")' }} />
                    
                    {/* Decorative Borders */}
                    <div className="absolute top-6 left-6 right-6 bottom-6 border border-amber-900/5 pointer-events-none rounded-lg" />
                    
                    <div className="text-center space-y-10 relative z-10 w-full">
                      <div className="flex items-center justify-center gap-4">
                        <span className="w-10 h-px bg-amber-900/10" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-900/40" />
                        <span className="w-10 h-px bg-amber-900/10" />
                      </div>

                      <div className="flex flex-col items-center gap-4">
                        <p className="text-4xl md:text-6xl font-serif font-black text-slate-900 tracking-[0.2em] leading-tight drop-shadow-sm">
                          摔碎瑶琴凤尾寒
                        </p>
                        <p className="text-4xl md:text-6xl font-serif font-black text-slate-900/70 tracking-[0.2em] leading-tight drop-shadow-sm">
                          子期不在对谁弹
                        </p>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <div className="w-16 h-px bg-amber-900/20" />
                        <span className="text-[10px] font-bold text-amber-800/40 uppercase tracking-[0.8em] font-serif">知音难觅 · 乐传千古</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage('guqin-home')}
                      className="mt-12 px-16 py-5 bg-amber-950 text-amber-50 rounded-full font-bold uppercase tracking-[0.6em] text-[11px] shadow-[0_20px_40px_rgba(69,10,10,0.3)] border border-amber-900/50 hover:bg-black transition-all duration-500 relative group overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      <span className="relative z-10 flex items-center gap-3">
                        走进知音故里 <ArrowRight size={14} className="opacity-50" />
                      </span>
                    </motion.button>
                  </div>
                </motion.div>

                {/* Back Link */}
                <button 
                  onClick={() => setCurrentPage('map')}
                  className="mt-12 text-slate-400 hover:text-slate-900 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2"
                >
                  ← 返回地图选择
                </button>
              </div>
            </motion.div>
          ) : currentPage === 'guqin-home' ? (
            <motion.div
              key="guqin-home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen pt-16 pb-20 px-6 relative z-10 overflow-hidden"
            >
              {/* Artistic Background - Minimalist Atmosphere */}
              <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[60%] h-[40%] bg-teal-50/40 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-amber-50/50 blur-[150px] rounded-full" />
              </div>

              <div className="max-w-7xl mx-auto relative mt-8 mb-20">
                {/* Floating Aesthetic Header */}
                <header className="mb-32 relative">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col items-center text-center gap-6"
                  >
                    <div className="flex items-center gap-4 text-emerald-800/20 font-serif tracking-[0.8em] text-[9px] uppercase font-bold">
                       <span className="w-8 h-px bg-emerald-800/10" />
                       Wisdom of Ancient Sound
                       <span className="w-8 h-px bg-emerald-800/10" />
                    </div>
                    <h2 className="text-8xl font-serif font-black text-slate-800/90 tracking-[0.2em] relative">
                      琴台知音
                      <div className="absolute -top-6 -right-12 opacity-[0.05] pointer-events-none select-none">
                        <span className="text-9xl font-serif italic">01</span>
                      </div>
                    </h2>
                    <p className="text-slate-400 font-serif text-sm tracking-[0.3em] font-medium max-w-xl leading-loose">
                      在数字的光影里，重构那曲断掉的弦，<br/>
                      让千年的高山流水，在你的指尖再次起意。
                    </p>
                  </motion.div>
                </header>

                {/* Overlapping Experimental Layout */}
                <div className="relative min-h-[800px]">
                  
                  {/* Card 1: The Soulful Dialogue (Large, Off-center) */}
                  <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    onClick={() => setCurrentPage('boya-chat')}
                    className="absolute top-0 left-0 w-[60%] z-20 group"
                  >
                    <div className="relative bg-white/40 backdrop-blur-3xl p-16 rounded-[80px] border border-white/80 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.03)] cursor-pointer overflow-hidden transition-all duration-1000">
                      <div className="absolute top-0 right-0 p-12 opacity-[0.02]">
                        <MessageSquare size={200} />
                      </div>
                      
                      <div className="flex items-center gap-4 mb-10">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-800/50 border border-emerald-100/50">
                          <MessageSquare size={16} />
                        </div>
                        <span className="text-[9px] font-bold tracking-[0.5em] text-emerald-800/30 uppercase font-serif">Legendary Encounter</span>
                      </div>

                      <h3 className="text-5xl font-serif font-black text-slate-800 mb-8 tracking-[0.1em]">与伯牙对话</h3>
                      <p className="text-slate-500 font-serif text-xl leading-relaxed italic max-w-lg mb-12">
                        “若世间再无子期，<br/>
                        <span className="text-slate-400">这半生乐律可曾有过回响？</span>”
                      </p>

                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-slate-900/5 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-700">
                          <ArrowRight size={24} strokeWidth={1} />
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em] font-serif">进入跨时空交互</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 2: AI Lab (Smaller, Overlapping Right) */}
                  <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    onClick={() => setCurrentPage('ai-lab')}
                    className="absolute top-20 right-0 w-[45%] z-30 group"
                  >
                    <div className="relative bg-[#fdfcf8]/90 backdrop-blur-2xl p-14 rounded-[70px] border border-amber-100/50 shadow-[0_40px_80px_-20px_rgba(180,83,9,0.05)] cursor-pointer transition-all duration-700 group-hover:translate-y-[-10px]">
                      <div className="flex flex-col gap-10">
                        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-800/60 flex items-center justify-center shadow-inner">
                          <Cpu size={24} strokeWidth={1.2} />
                        </div>
                        <div>
                          <h4 className="text-3xl font-serif font-black text-slate-800 mb-4 tracking-wider">AI 习琴室</h4>
                          <p className="text-slate-400 text-sm font-serif leading-relaxed max-w-xs">借助智能视觉与重构算法，让千年指法在数字空间里精准复现。</p>
                        </div>
                        <div className="flex items-center gap-3 opacity-20 group-hover:opacity-100 transition-opacity">
                          <div className="w-8 h-px bg-amber-900" />
                          <span className="text-[9px] uppercase tracking-[0.3em] font-black">Explore Practice</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card 3: Music Appreciation (Bottom Left, Decorative) */}
                  <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    onClick={() => setCurrentPage('music-list')}
                    className="absolute bottom-20 left-[10%] w-[35%] z-10 group"
                  >
                    <div className="relative bg-emerald-50/50 backdrop-blur-xl p-12 rounded-[60px] border border-emerald-100/50 shadow-[0_30px_60px_-15px_rgba(6,78,59,0.03)] cursor-pointer transition-all duration-700">
                      <div className="flex items-center gap-6 mb-8">
                         <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-emerald-800 shadow-sm border border-emerald-50">
                           <Headphones size={20} strokeWidth={1} />
                         </div>
                         <h4 className="text-2xl font-serif font-black text-slate-800 tracking-wider">名曲赏听</h4>
                      </div>
                      <p className="text-slate-400 text-xs font-serif leading-relaxed italic">穿越高山，俯瞰流水，听懂那段从未消逝的心语。</p>
                    </div>
                  </motion.div>

                  {/* Card 4: Emotion Composition (Bottom Right, Long Banner style) */}
                  <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    onClick={() => setCurrentPage('emotion-composer')}
                    className="absolute bottom-0 right-[5%] w-[50%] z-20 group"
                  >
                    <div className="relative bg-white/60 backdrop-blur-3xl py-10 px-12 rounded-[40px] border border-white shadow-xl flex items-center justify-between cursor-pointer transition-all duration-700 group-hover:scale-[1.02]">
                       <div className="flex items-center gap-8">
                          <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg">
                            <Music2 size={24} strokeWidth={1} />
                          </div>
                          <div>
                            <h4 className="text-xl font-serif font-black text-slate-800 tracking-[0.1em]">因情生乐</h4>
                            <p className="text-slate-400 text-[10px] font-serif tracking-[0.3em] mt-1">以琴声述心意，即兴成曲</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-4">
                          <Sparkles size={18} className="text-emerald-300 animate-pulse" />
                          <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                             <ArrowRight size={16} />
                          </div>
                       </div>
                    </div>
                  </motion.div>
                </div>

                {/* Vertical Decorative Element - The Seven Strings */}
                <div className="absolute left-1/2 top-40 -translate-x-1/2 w-px h-[600px] flex gap-4 pointer-events-none opacity-[0.05]">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="w-px h-full bg-slate-900" 
                      style={{ height: `${100 - i * 5}%`, marginTop: `${i * 10}px` }} 
                    />
                  ))}
                </div>

                {/* Bottom Navigation */}
                <div className="mt-40 flex flex-col items-center gap-10">
                   <div className="flex items-center gap-12 text-slate-300">
                      <Wind size={20} className="opacity-20" />
                      <div className="w-24 h-px bg-slate-100" />
                      <Wind size={20} className="opacity-20" />
                   </div>
                   <button 
                    onClick={() => setCurrentPage('map')} 
                    className="group flex flex-col items-center gap-4 transition-all duration-500"
                  >
                    <span className="text-[10px] font-black tracking-[1em] uppercase font-serif text-slate-400 group-hover:text-slate-900">返回地图</span>
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-slate-800 transition-colors"
                    >
                      <ChevronRight size={16} />
                    </motion.div>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : currentPage === 'music-list' ? (
            <MusicList 
              onBack={() => setCurrentPage('guqin-home')} 
              onSelect={(id) => {
                setSelectedMusicId(id);
                setCurrentPage('appreciation');
              }} 
            />
          ) : currentPage === 'appreciation' ? (
            <MusicAppreciation 
              onBack={() => setCurrentPage('music-list')} 
              onTalkToBoya={() => setCurrentPage('boya-chat')}
            />
          ) : currentPage === 'boya-chat' ? (
            <BoyaChat onBack={() => setCurrentPage('guqin-home')} />
          ) : currentPage === 'emotion-composer' ? (
            <EmotionComposer onBack={() => setCurrentPage('guqin-home')} />
          ) : currentPage === 'ai-lab' ? (
            <AILab onBack={() => setCurrentPage('guqin-home')} />
          ) : currentPage === 'profile' ? (
            <UserProfile onBack={() => setCurrentPage(previousPage)} />
          ) : null}
        </AnimatePresence>
      </main>

      <footer className="px-10 py-16 bg-white border-t border-slate-50 text-center relative z-10">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-3 opacity-30">
            <Music size={20} />
            <span className="text-xs font-black tracking-[0.5em] uppercase">知音AI乐坊 © 2026</span>
          </div>
          <div className="flex gap-10">
            <a href="#" className="text-[10px] font-bold text-slate-300 hover:text-teal-600 transition-colors uppercase tracking-[0.2em]">法律条款</a>
            <a href="#" className="text-[10px] font-bold text-slate-300 hover:text-teal-600 transition-colors uppercase tracking-[0.2em]">隐私政策</a>
            <a href="#" className="text-[10px] font-bold text-slate-300 hover:text-teal-600 transition-colors uppercase tracking-[0.2em]">联系支持</a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showLogin && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-lg bg-white rounded-[48px] p-12 shadow-[0_50px_100px_rgba(0,0,0,0.15)] relative overflow-hidden"
            >
              <button onClick={() => setShowLogin(false)} className="absolute top-10 right-10 w-12 h-12 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100"><X size={24} /></button>
              <div className="mb-12"><h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">进入知音空间</h2><p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">请选择您的验证方式</p></div>

              <div className="relative flex bg-slate-100/80 p-2 rounded-2xl mb-12 border border-white/50">
                <motion.div animate={{ x: loginMode === 'password' ? 0 : '100%' }} className="absolute top-2 bottom-2 left-2 w-[calc(50%-8px)] bg-white rounded-xl shadow-lg" transition={{ type: "spring", stiffness: 350, damping: 35 }} />
                <button onClick={() => setLoginMode('password')} className={`flex-1 py-3.5 text-xs font-bold rounded-xl relative z-10 uppercase tracking-widest ${loginMode === 'password' ? 'text-slate-900' : 'text-slate-500'}`}>账号登录</button>
                <button onClick={() => setLoginMode('code')} className={`flex-1 py-3.5 text-xs font-bold rounded-xl relative z-10 uppercase tracking-widest ${loginMode === 'code' ? 'text-slate-900' : 'text-slate-500'}`}>验证码登录</button>
              </div>

              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-3"><label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Smartphone size={12} /> 手机号码</label><input type="tel" placeholder="请输入 11 位手机号" className="w-full px-8 py-5 bg-slate-50/50 border border-slate-100 rounded-3xl" /></div>
                {loginMode === 'password' ? (
                  <div className="space-y-3"><label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Lock size={12} /> 登录密码</label><input type="password" placeholder="请输入密码" className="w-full px-8 py-5 bg-slate-50/50 border border-slate-100 rounded-3xl" /></div>
                ) : (
                  <div className="space-y-3"><label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><ShieldCheck size={12} /> 验证码</label><div className="flex gap-4"><input type="text" placeholder="6 位" className="flex-1 px-8 py-5 bg-slate-50/50 border border-slate-100 rounded-3xl" /><button className="px-8 py-5 bg-slate-900 text-white rounded-3xl text-xs font-bold uppercase" onClick={handleSendCode} disabled={isSendingCode}>{isSendingCode ? '重发 (59s)' : '获取'}</button></div></div>
                )}
                <div className="pt-10">
                  <motion.button 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }} 
                    onClick={handleLogin} 
                    className="w-full py-6 rounded-[32px] text-white font-bold text-base tracking-[0.4em] uppercase teal-gradient relative shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-500/20"
                  >
                    立即体验
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
