import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, ArrowLeft, User, Sparkles, Wind, Music } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "model";
  text: string;
}

export const BoyaChat: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "（在这虚拟的星辰之下，伯牙轻轻拭去琴上的尘埃，微微抬头，目光仿佛穿透了千年）\n\n“小友，你终于来了。那曲《流水》，你可曾在那数字的光影里，听出我的心念？”",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessageText = input;
    const userMessage: Message = { role: "user", text: userMessageText };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat/boya", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      setMessages((prev) => [...prev, { role: "model", text: "" }]);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      if (reader) {
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const blocks = buffer.split("\n\n");
          buffer = blocks.pop() || "";

          for (const block of blocks) {
            const lines = block.split("\n");
            for (const line of lines) {
              const trimmed = line.trim();
              if (trimmed.startsWith("data: ")) {
                const dataStr = trimmed.slice(6);
                if (dataStr === "[DONE]") {
                  break;
                }
                try {
                  const parsed = JSON.parse(dataStr);
                  if (parsed.text) {
                    fullText += parsed.text;
                    setMessages((prev) => {
                      const newM = [...prev];
                      newM[newM.length - 1] = { role: "model", text: fullText };
                      return newM;
                    });
                  }
                } catch {
                  // ignore non-json
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "（伯牙低头不语，似乎是这跨越时空的连接出现了一丝波折...）\n\n“小友，此时心绪难平，待我重新调理琴弦...”",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto py-12 px-6 h-[calc(100vh-160px)] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-serif font-bold tracking-widest uppercase">
            离开语境
          </span>
        </button>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-lg">
            <Music size={18} />
          </div>
          <div>
            <h3 className="text-xl font-serif font-black text-slate-800 tracking-wider">
              对话 · 伯牙
            </h3>
            <p className="text-[10px] text-slate-400 font-serif uppercase tracking-[0.2em]">
              Dialogue with the Master
            </p>
          </div>
        </div>
        <div className="w-20" />
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white/40 backdrop-blur-2xl rounded-[48px] border border-white shadow-2xl overflow-hidden flex flex-col mb-6">
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-10 space-y-8 scroll-smooth"
        >
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} items-end gap-3`}
            >
              {m.role === "model" && (
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 mb-1 flex-shrink-0">
                  <Music size={14} />
                </div>
              )}
              <div
                className={`max-w-[75%] p-6 rounded-[32px] font-serif leading-relaxed ${
                  m.role === "user"
                    ? "bg-slate-900 text-slate-50 rounded-br-none"
                    : "bg-white/80 border border-slate-100 text-slate-800 rounded-bl-none shadow-sm"
                }`}
              >
                <div className="prose prose-sm prose-slate max-w-none">
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
              </div>
              {m.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-800 mb-1 flex-shrink-0">
                  <User size={14} />
                </div>
              )}
            </motion.div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex justify-start items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 animate-spin">
                <Wind size={14} />
              </div>
              <div className="bg-white/80 p-6 rounded-[32px] rounded-bl-none border border-slate-100">
                <div className="flex gap-1">
                  <span
                    className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0s" }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white/50 border-t border-slate-100">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="与抚琴者对话你的心念..."
              className="w-full px-10 py-6 bg-white rounded-full border border-slate-100 shadow-inner focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all font-serif"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-3 w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale shadow-lg shadow-slate-900/20"
            >
              <Send size={20} strokeWidth={1.5} />
            </button>
          </div>
          <div className="mt-4 flex justify-center gap-6 opacity-20 pointer-events-none">
            <Sparkles size={16} />
            <div className="w-24 h-px bg-slate-900 self-center" />
            <Sparkles size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
