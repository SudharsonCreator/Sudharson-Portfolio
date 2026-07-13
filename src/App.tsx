/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { 
  Shield, 
  Lock, 
  Server, 
  Terminal, 
  Search, 
  Activity, 
  CheckCircle2, 
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  GraduationCap,
  ChevronRight,
  Code2,
  Cpu,
  Network,
  Zap,
  Globe,
  Box,
  Layers,
  Hexagon,
  ArrowRight,
  Instagram,
  Twitter,
  Send
} from "lucide-react";
import React, { useState, useEffect, useRef, useCallback } from "react";

// --- Custom Hooks ---

const useParallax = (value: any, distance: number) => {
  return useTransform(value, [0, 1], [-distance, distance]);
};

const TextScramble = ({ text, className = "" }: { text: string, className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  const intervalRef = useRef<any>(null);

  const scramble = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        text.split("").map((char, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      
      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }
      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    scramble();
    return () => clearInterval(intervalRef.current);
  }, [text]);

  return (
    <span 
      className={className} 
      onMouseEnter={scramble}
    >
      {displayText}
    </span>
  );
};

const TiltCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

const Magnetic = ({ children, strength = 0.5 }: { children: React.ReactNode, strength?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = (clientX - centerX) * strength;
    const y = (clientY - centerY) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

// --- Components ---

const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-brand-primary/20 rounded-full"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5
          }}
          animate={{ 
            y: [null, Math.random() * 100 + "%"],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: Math.random() * 20 + 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      ))}
    </div>
  );
};

const ThreeDModel = () => {
  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 perspective-1000 preserve-3d">
      <motion.div 
        animate={{ 
          rotateY: [0, 360],
          rotateX: [0, 180, 0]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="w-full h-full relative preserve-3d"
      >
        {/* Futuristic Wireframe Shell */}
        <div className="absolute inset-0 border-2 border-brand-primary/20 rounded-xl" />
        <div className="absolute inset-4 border border-brand-primary/10 rounded-lg transform translateZ(20px)" />
        <div className="absolute inset-8 border border-brand-primary/5 rounded-md transform translateZ(40px)" />
        
        {/* Inner Core */}
        <div className="absolute inset-[30%] bg-brand-primary/10 backdrop-blur-md rounded-full shadow-[0_0_50px_rgba(56,189,248,0.3)] animate-pulse border border-brand-primary/30 transform translateZ(10px)" />
        
        {/* Floating Rings */}
        <div className="absolute inset-0 border-t-2 border-brand-primary/40 rounded-full animate-spin-slow rotate-45" />
        <div className="absolute inset-4 border-b-2 border-brand-accent/40 rounded-full animate-spin-slow -rotate-45" />
      </motion.div>
      
      {/* HUD Elements */}
      <div className="absolute -top-10 -left-10 p-3 glass-card text-[8px] font-mono whitespace-nowrap text-brand-primary border-brand-primary/20">
        <div className="flex gap-2 mb-1">
          <div className="w-1 h-1 bg-brand-primary rounded-full animate-ping" />
          SYSTEM_SCAN: ACTIVE
        </div>
        <div className="opacity-50 tracking-widest">ENCRYPTION: AES_256_GCM</div>
      </div>
    </div>
  );
};

const SecurityPanel = ({ onClose }: { onClose: () => void }) => {
  const [status, setStatus] = useState<"IDLE" | "ALARM" | "PROTECTED">("IDLE");
  const [message, setMessage] = useState("");

  const handleRedClick = () => {
    setStatus("ALARM");
    setMessage("999 Hackers Blocked 😎");
    // Reset after 3 seconds
    setTimeout(() => {
      setStatus("IDLE");
      setMessage("");
    }, 3000);
  };

  const handleGreenClick = () => {
    setStatus("PROTECTED");
    setMessage("Guardian Mode ON 🤖");
    setTimeout(() => {
      setStatus("IDLE");
      setMessage("");
    }, 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 transition-colors duration-500 ${
        status === "ALARM" ? "bg-red-950/90" : status === "PROTECTED" ? "bg-emerald-950/90" : "bg-brand-bg/95"
      } backdrop-blur-2xl`}
    >
      {/* Background Siren Pulse */}
      <AnimatePresence>
        {status === "ALARM" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="absolute inset-0 bg-red-600 pointer-events-none"
          />
        )}
        {status === "PROTECTED" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-emerald-400 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-2xl text-center">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-full border-2 transition-colors duration-500 ${
              status === "ALARM" ? "border-red-500 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]" : 
              status === "PROTECTED" ? "border-emerald-400 text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.5)]" : 
              "border-brand-primary text-brand-primary"
            }`}>
              <Shield size={48} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 font-mono tracking-tighter">SECURE_PROTOCOL_v3.1</h2>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">AUTHORIZED PERSONNEL ONLY</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Red Button */}
          <button 
            onClick={handleRedClick}
            className="group relative h-48 rounded-2xl bg-red-500/10 border-2 border-red-500/20 hover:border-red-500 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/5 transition-colors" />
            <div className="relative z-10 flex flex-col items-center justify-center p-6 h-full text-red-500">
              <Zap size={40} className="mb-4" />
              <span className="font-bold tracking-[0.2em] font-mono">NEUTRALIZE</span>
            </div>
          </button>

          {/* Green Button */}
          <button 
            onClick={handleGreenClick}
            className="group relative h-48 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/20 hover:border-emerald-400 transition-all overflow-hidden"
          >
            <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors" />
            <div className="relative z-10 flex flex-col items-center justify-center p-6 h-full text-emerald-400">
              <Shield size={40} className="mb-4" />
              <span className="font-bold tracking-[0.2em] font-mono">PROTECT</span>
            </div>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {message && (
            <motion.div 
              key={message}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              className={`p-6 rounded-xl font-bold text-2xl md:text-3xl font-mono shadow-2xl ${
                status === "ALARM" ? "text-red-500 bg-red-500/10 border border-red-500/30" : "text-emerald-400 bg-emerald-400/10 border border-emerald-400/30"
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={onClose}
          className="mt-12 text-slate-500 hover:text-white transition-colors flex items-center gap-2 mx-auto uppercase text-xs tracking-widest font-mono"
        >
          <Terminal size={14} /> Terminate Session
        </button>
      </div>
    </motion.div>
  );
};

const Glitch = ({ text, className = "" }: { text: string, className?: string }) => {
  return (
    <div className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 text-red-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] group-hover:translate-y-[-1px] transition-all duration-75 mix-blend-screen">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 text-cyan-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-[-2px] group-hover:translate-y-[1px] transition-all duration-75 mix-blend-screen">
        {text}
      </span>
    </div>
  );
};

const Nav = ({ onShieldClick }: { onShieldClick: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 backdrop-blur-md bg-brand-bg/50 border-b border-brand-border">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center font-bold text-white text-xl shadow-[0_0_15px_rgba(56,189,248,0.5)] animate-pulse">S</div>
      <span className="hidden md:block font-bold tracking-widest text-white uppercase">
        <Glitch text="Sudharson A" />
      </span>
    </div>
    <div className="hidden md:flex items-center gap-10 text-xs font-medium tracking-[0.2em] uppercase text-slate-400">
      <a href="#about" className="hover:text-brand-primary transition-colors">About</a>
      <a href="#skills" className="hover:text-brand-primary transition-colors">Skills</a>
      <a href="#projects" className="hover:text-brand-primary transition-colors">Projects</a>
      <a href="#contact" className="hover:text-brand-primary transition-colors">Contact</a>
    </div>
    <div className="flex items-center gap-4">
      <button 
        onClick={onShieldClick}
        className="p-2 border border-brand-border rounded-lg text-slate-400 hover:text-brand-primary hover:border-brand-primary/50 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all"
      >
        <Shield size={18} />
      </button>
    </div>
  </nav>
);

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useParallax(scrollYProgress, 100);
  const y2 = useParallax(scrollYProgress, -50);

  return (
    <section id="about" className="relative pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        <motion.div 
          style={{ y: y1 }}
          className="lg:w-3/5 text-center lg:text-left z-10"
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-[10px] font-mono tracking-widest text-brand-primary mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse" />
            NODE ACTIVE • NETWORK SECURE • V3.1
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold text-white leading-[0.9] tracking-tighter mb-8"
          >
            Securing the<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-white to-brand-accent glow-text-blue">
              <TextScramble text="Next Frontier" />
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mb-12 font-medium"
          >
            Computer Engineering student at <span className="text-white">Bannari Amman Institute</span>. 
            Forging advanced defenses in <span className="text-brand-primary">Network Architecture</span> and Specialized Cybersecurity.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center lg:justify-start gap-6"
          >
            <Magnetic strength={0.3}>
              <a 
                href="#projects"
                className="px-10 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-2xl flex items-center gap-3 transition-all group shadow-[0_0_20px_rgba(56,189,248,0.3)]"
              >
                OPERATIONS <Terminal size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a 
                href="#contact"
                className="px-10 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl transition-all backdrop-blur-md"
              >
                ESTABLISH UPLINK
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div 
          style={{ y: y2 }}
          className="relative lg:w-2/5 flex justify-center perspective-1000"
        >
          {/* Main 3D Model Component */}
          <ThreeDModel />
          
          {/* Floating Profile Over Model */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <div className="relative w-48 h-48 md:w-56 md:h-56 group">
              <div className="absolute inset-0 rounded-3xl border-2 border-brand-primary/50 group-hover:rotate-12 transition-transform duration-700" />
              <div className="absolute inset-0 rounded-3xl border border-white/20 group-hover:-rotate-12 transition-transform duration-700 delay-75" />
              <div className="absolute inset-2 rounded-2xl overflow-hidden bg-brand-bg border border-brand-primary/30 p-1">
                <img 
                  src={`${import.meta.env.BASE_URL}profile.png`}
                  alt="Sudharson A" 
                  className="w-full h-full object-cover rounded-xl transition-all duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-white shadow-xl glow-blue">
                <Shield size={20} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Background Section Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-primary/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 blur-[150px] rounded-full" />
    </section>
  );
};

const ProfileSnapshot = () => (
  <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      <div>
        <h2 className="text-xs font-mono tracking-[0.4em] text-brand-primary uppercase mb-4">Profile</h2>
        <h3 className="text-4xl font-bold text-white mb-8">SNAPSHOT</h3>
        <p className="text-slate-400 leading-relaxed italic text-lg border-l-2 border-brand-primary/30 pl-6">
          "A Computer Engineering student with basic to intermediate knowledge in Networking and Network Security. Familiar with firewall administration and network troubleshooting. Keen to strengthen technical skills through hands-on learning and practical projects."
        </p>
      </div>

      <div className="glass-card p-8 md:p-12">
        <div className="flex items-center gap-3 mb-10">
          <GraduationCap className="text-brand-primary" />
          <h4 className="text-xs font-mono tracking-widest text-slate-500 uppercase">Academic & Involvement</h4>
        </div>
        
        <div className="space-y-12 mb-12">
          {[
            { 
              degree: "B. E Computer Science and Engineering", 
              school: "Bannari Amman Institute of Technology • Sathyamangalam",
              years: "2023 - 2026",
              scoreLabel: "CUMULATIVE GPA",
              score: "6.71"
            },
            { 
              degree: "Diploma in Electrical & Electronics Engineering", 
              school: "Nandha Polytechnic College • Perundurai",
              years: "2019 - 2022",
              scoreLabel: "AGGREGATE SCORE",
              score: "89%"
            },
            { 
              degree: "Secondary School Leaving Certificate (SSLC)", 
              school: "Sri Venkateswara Vidyalaya Matriculation School • GOBI",
              years: "2019",
              scoreLabel: "SCORE",
              score: "69.0%"
            }
          ].map((item, idx) => (
            <div key={idx} className="relative pl-8 border-l border-brand-border">
              <div className="absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full bg-brand-primary" />
              <div className="flex justify-between items-start gap-4 mb-2">
                <h5 className="text-lg font-bold text-white">{item.degree}</h5>
                <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap">{item.years}</span>
              </div>
              <p className="text-sm text-slate-500 mb-4">{item.school}</p>
              <div className="inline-flex items-center gap-3 px-3 py-1 rounded bg-white/5 border border-white/10">
                <span className="text-[10px] font-mono text-slate-500">{item.scoreLabel}</span>
                <span className="text-sm font-bold text-brand-primary">{item.score}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-brand-border/50">
          <h5 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-6">Leadership & Involvement</h5>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[10px] font-mono text-brand-primary mb-1">02 / 2022</div>
              <div className="text-sm text-white font-bold">EDC Member</div>
              <div className="text-[10px] text-slate-500">Entrepreneurship Dev Cell</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[10px] font-mono text-brand-primary mb-1">08 / 2021</div>
              <div className="text-sm text-white font-bold">Dept Coordinator</div>
              <div className="text-[10px] text-slate-500">Nandha Polytechnic</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Skills = () => (
  <section id="skills" className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-center">
    <h3 className="text-4xl font-bold text-white mb-2">
      <TextScramble text="Arsenal & Skills" />
    </h3>
    <div className="w-20 h-1 bg-brand-primary mx-auto mb-16 rounded-full" />
    
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        {
          title: "Programming",
          icon: <Code2 />,
          skills: [
            { name: "C Language", level: "INTERMEDIATE" },
            { name: "Python", level: "BASIC" },
            { name: "HTML", level: "BASIC" }
          ]
        },
        {
          title: "Security Tools",
          icon: <Shield />,
          items: ["Wireshark", "BurpSuite", "Metasploit", "Nmap"]
        },
        {
          title: "Networking",
          icon: <Network />,
          custom: [
            { name: "FUNDAMENTALS", desc: "Core routing & switching logic" },
            { name: "VPN ADMIN", desc: "Secure tunnel management (Intermediate)" }
          ]
        },
        {
          title: "Soft Skills",
          icon: <Activity />,
          items: ["Teamwork", "Leadership", "Adaptability", "Problem Solving"]
        }
      ].map((cat, idx) => (
        <TiltCard key={idx} className="group h-full">
          <div className="glass-card p-8 text-left h-full hover:border-brand-primary/30 transition-all group bg-gradient-to-br from-white/5 to-transparent">
            <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <div className="text-brand-primary">{cat.icon}</div>
            </div>
            <h4 className="text-xl font-bold text-white mb-8">
              <TextScramble text={cat.title} />
            </h4>
            
            <div className="space-y-4">
              {cat.skills?.map((s, i) => (
                <div key={i} className="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                  <span className="text-sm text-slate-300">{s.name}</span>
                  <span className="text-[10px] font-mono text-brand-primary/60 px-2 py-0.5 border border-brand-primary/20 rounded">{s.level}</span>
                </div>
              ))}
              
              <div className="flex flex-wrap gap-2">
                {cat.items?.map((item, i) => (
                  <span key={i} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-400">{item}</span>
                ))}
              </div>

              {cat.custom?.map((c, i) => (
                <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/5 group-hover:border-brand-primary/30 transition-colors">
                  <div className="text-[10px] font-mono text-brand-primary mb-1 uppercase tracking-wider">{c.name}</div>
                  <div className="text-xs text-slate-500 group-hover:text-slate-400">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </TiltCard>
      ))}
    </div>
  </section>
);

const OperationsJournal = () => (
  <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
      <div>
        <h3 className="text-4xl font-bold text-white mb-4">
          <TextScramble text="Operations Journal" />
        </h3>
        <p className="text-slate-500 text-sm max-w-md">A collection of technical deployments ranging from security analyzers to web-based platforms.</p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { 
          title: "PassGuard", 
          tags: ["TOOLS"], 
          lang: ["JS", "CS"],
          desc: "Privacy-first password strength analyzer featuring real-time scoring, entropy analysis, and crack-time estimation. Built for high-security environments.",
          icon: <Shield />,
          link: "https://sudharsoncreator.github.io/passguard/"
        },
        { 
          title: "Vulnerability Scanner", 
          tags: ["NETSEC"], 
          lang: ["HT", "JS"],
          desc: "Comprehensive simulated scanner with live terminal output. TCP port scanning, SSL/TLS audit, and HTTP header analysis for rapid security assessment.",
          icon: <Terminal />,
          link: "https://sudharsoncreator.github.io/vulnerability-scanner/"
        },
        { 
          title: "Phishing Detector", 
          tags: ["ML/AI"], 
          lang: ["PY", "ML"],
          desc: "ML-powered classifier using heuristic feature extraction for URL analysis and keyword detection. Engineered to mitigate impersonation attacks.",
          icon: <Search />,
          link: "https://sudharsoncreator.github.io/phishing-detector/"
        },
        { 
          title: "Secure Login", 
          tags: ["SECURITY"], 
          lang: ["HT", "JS"],
          desc: "Auth system featuring bcrypt password hashing, unique salt generation, and input validation. Demonstrates advanced credential management.",
          icon: <Lock />,
          link: "https://sudharsoncreator.github.io/secure-login/"
        },
        { 
          title: "Join-Journey", 
          tags: ["FULLSTACK"], 
          lang: ["PH", "SQ"],
          desc: "Ride-sharing platform connecting commuters. Built with secure authentication and real-time ride search logic. High-efficiency matching system.",
          icon: <Globe />,
          link: "https://mid-journey-ride-sha-fksl.bolt.host/"
        },
        { 
          title: "RBAC System", 
          tags: ["AUTH"], 
          lang: ["RE", "MG"],
          desc: "Role-Based Access Control system using JWT and OAuth. Governs permissions for Admin, User, and Moderator roles in MongoDB environments.",
          icon: <Shield />,
          link: "#"
        },
        { 
          title: "IOT Smart Dustbin", 
          tags: ["IOT"], 
          lang: ["C", "ESP"],
          desc: "Real-time waste detection using Ultrasonic sensors and ESP8266. Automated alerts and remote monitoring via Wi-Fi connectivity.",
          icon: <Cpu />,
          link: "#"
        },
        { 
          title: "E-Medical Service", 
          tags: ["WEB"], 
          lang: ["PY", "FL"],
          desc: "Medical chatbot providing specialty-based doctor matching and geolocation-based clinic recommendations. Built with Flask and Geopy.",
          icon: <Activity />,
          link: "#"
        }
      ].map((proj, idx) => (
        <TiltCard key={idx}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            onClick={() => proj.link !== "#" && window.open(proj.link, "_blank")}
            className="glass-card p-8 flex flex-col group cursor-pointer border-brand-primary/10 hover:border-brand-primary/40 transition-all bg-gradient-to-br from-brand-card to-transparent h-full"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary group-hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all">
                {proj.icon}
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-2">
                  {proj.tags.map(t => (
                    <span key={t} className="text-[10px] font-mono tracking-widest text-brand-primary bg-brand-primary/5 px-2 py-0.5 rounded border border-brand-primary/10">{t}</span>
                  ))}
                </div>
                {proj.link !== "#" && (
                  <span className="flex items-center gap-1.5 text-[8px] font-bold text-brand-success uppercase tracking-widest bg-brand-success/10 px-2 py-0.5 rounded-full border border-brand-success/20">
                    <div className="w-1 h-1 rounded-full bg-brand-success animate-pulse" />
                    Live System
                  </span>
                )}
              </div>
            </div>
            
            <h4 className="text-xl font-bold text-white mb-4 group-hover:text-brand-primary group-hover:glow-text-blue transition-colors">
              <TextScramble text={proj.title} />
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed mb-8 flex-grow">{proj.desc}</p>
            
            <div className="flex justify-between items-end">
              <div className="flex gap-2">
                {proj.lang.map(l => (
                  <span key={l} className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-mono text-slate-400 group-hover:border-brand-primary/20 transition-colors uppercase">{l}</span>
                ))}
              </div>
              <ExternalLink size={18} className="text-slate-600 group-hover:text-white transition-colors" />
            </div>
          </motion.div>
        </TiltCard>
      ))}
    </div>
  </section>
);

const Credentials = () => (
  <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
    <div>
      <div className="flex items-center gap-3 mb-10">
        <CheckCircle2 className="text-brand-primary" />
        <h3 className="text-2xl font-bold text-white">Credentials</h3>
      </div>
      
      <div className="space-y-4">
        {[
          { title: "FCP - Fortinet Certified Professional", cat: "NETWORK SECURITY", id: "02 / 2025" },
          { title: "FCF - Fortinet Certified Fundamentals", cat: "CYBERSECURITY FOUNDATIONS", id: "01 / 2025" },
          { title: "FCA - Fortinet Certified Associate", cat: "CLOUD SECURITY", id: "12 / 2024" }
        ].map((item, idx) => (
          <div key={idx} className="glass-card p-6 flex justify-between items-center group cursor-pointer hover:border-brand-primary/20 transition-all">
            <div>
              <h4 className="text-slate-200 font-bold mb-1 group-hover:text-brand-primary transition-colors">{item.title}</h4>
              <p className="text-[10px] font-mono text-slate-500 tracking-[0.2em]">{item.cat}</p>
            </div>
            <span className="text-[10px] font-mono text-slate-600">{item.id}</span>
          </div>
        ))}
      </div>
    </div>

    <div>
      <div className="flex items-center gap-3 mb-10">
        <Zap className="text-brand-accent" />
        <h3 className="text-2xl font-bold text-white">Security Disclosure</h3>
      </div>
      
      <div className="glass-card p-10 border-l-4 border-l-brand-accent h-[calc(100%-80px)]">
        <h4 className="text-xl font-bold text-white mb-6">IDOR Vulnerability Identification</h4>
        <p className="text-slate-400 leading-relaxed mb-10">
          Identified and responsibly disclosed a critical <span className="text-brand-accent">Insecure Direct Object Reference (IDOR)</span> vulnerability in the college student portal that exposed sensitive student financial and personal information due to broken access control.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent/10 border border-brand-accent/20 rounded-full text-xs font-medium text-brand-accent">
          <div className="w-2 h-2 rounded-full bg-brand-accent" />
          RESPONSIBLE DISCLOSURE FILED
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append(
      "access_key",
      import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    );

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        form.reset();
        setIsSent(true);
      } else {
        setResult("TRANSMISSION FAILED // PLEASE TRY AGAIN");
      }
    } catch (error) {
      setResult("NETWORK ERROR // PLEASE TRY AGAIN");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center">
      <h3 className="text-5xl font-bold text-white mb-4">
        <TextScramble text="Establish Uplink" />
      </h3>
      <p className="text-slate-500 mb-16">Collaborate on security audits, networking projects, or software architecture.</p>

      <AnimatePresence mode="wait">
        {!isSent ? (
          <motion.div
            key="contact-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <TiltCard>
              <form onSubmit={handleSubmit} className="glass-card p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-50" />

                <input type="hidden" name="subject" value="New Portfolio Transmission" />
                <input type="hidden" name="from_name" value="Sudharson Portfolio" />

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="text-left">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">Identity / Name</label>
                    <input 
                      required
                      type="text"
                      name="name"
                      placeholder="Agent Zero" 
                      className="w-full bg-white/5 border border-brand-border rounded-xl px-5 py-4 text-white focus:border-brand-primary outline-none transition-colors"
                    />
                  </div>
                  <div className="text-left">
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">Communication Channel / Email</label>
                    <input 
                      required
                      type="email"
                      name="email"
                      placeholder="agent@secure.network" 
                      className="w-full bg-white/5 border border-brand-border rounded-xl px-5 py-4 text-white focus:border-brand-primary outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="text-left mb-8">
                  <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">Transmission Payload / Message</label>
                  <textarea 
                    required
                    name="message"
                    placeholder="Initiate mission details here..." 
                    rows={5}
                    className="w-full bg-white/5 border border-brand-border rounded-xl px-5 py-4 text-white focus:border-brand-primary outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center gap-3 transition-all group"
                >
                  {isSubmitting ? "TRANSMITTING..." : "SEND TRANSMISSION"}
                  {!isSubmitting && <Zap size={18} className="group-hover:translate-x-1 transition-transform" />}
                </button>

                {result && (
                  <p className="mt-5 text-center text-sm font-mono text-red-400">
                    {result}
                  </p>
                )}
              </form>
            </TiltCard>
          </motion.div>
        ) : (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 py-20 border-brand-success/30 bg-brand-success/5"
          >
            <div className="w-20 h-20 rounded-full bg-brand-success/10 border border-brand-success/20 flex items-center justify-center mx-auto mb-8 text-brand-success">
              <Shield size={40} className="animate-pulse" />
            </div>
            <h4 className="text-3xl font-bold text-white mb-4">Uplink Established</h4>
            <p className="text-slate-400 max-w-sm mx-auto mb-8">
              Transmission received. Data packets have been successfully routed to the secure terminal. Expect a response within one standard business cycle.
            </p>
            <button 
              onClick={() => {
                setIsSent(false);
                setResult("");
              }}
              className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-xs font-mono tracking-widest uppercase transition-all"
            >
              Reset Terminal
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 border-t border-brand-border flex flex-col items-center gap-8">
    <div className="flex gap-6">
      <Magnetic strength={0.3}>
        <a 
          href="https://github.com/SudharsonCreator" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-3 glass-card hover:border-brand-primary transition-all text-slate-400 hover:text-white group"
        >
          <Github size={20} className="group-hover:scale-110 transition-transform" />
        </a>
      </Magnetic>
      <Magnetic strength={0.3}>
        <a 
          href="https://www.linkedin.com/in/sudharsonofficial24" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-3 glass-card hover:border-brand-primary transition-all text-slate-400 hover:text-white group"
        >
          <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
        </a>
      </Magnetic>
      <Magnetic strength={0.3}>
        <a 
          href="https://t.me/sudharson_official" 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-3 glass-card hover:border-brand-primary transition-all text-slate-400 hover:text-white group"
        >
          <Send size={20} className="group-hover:scale-110 transition-transform" />
        </a>
      </Magnetic>
      <Magnetic strength={0.3}>
        <a 
          href="mailto:sudharsonkvp2004@gmail.com" 
          className="p-3 glass-card hover:border-brand-primary transition-all text-slate-400 hover:text-white group"
        >
          <Mail size={20} className="group-hover:scale-110 transition-transform" />
        </a>
      </Magnetic>
    </div>
    
    <div className="text-[10px] font-mono text-slate-600 tracking-[0.4em] uppercase text-center px-6">
      © 2026 SUDHARSON A // SYSTEM VER: 3.1.4 // SECURE PORTFOLIO PROTOCOL
    </div>
  </footer>
);

const MouseGlow = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
        animate={{
          background: `radial-gradient(1000px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.1), transparent 80%)`,
        }}
      />
      <motion.div
        className="fixed top-0 bottom-0 w-[1px] bg-brand-primary/20 pointer-events-none z-10"
        animate={{ left: mousePos.x }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
      <motion.div
        className="fixed left-0 right-0 h-[1px] bg-brand-primary/20 pointer-events-none z-10"
        animate={{ top: mousePos.y }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
    </>
  );
};

interface ParallaxProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ParallaxDecorative: React.FC<ParallaxProps> = ({ children, offset = 50, className = "", style = {} }) => {
  const { scrollYProgress } = useScroll();
  const y = useParallax(scrollYProgress, offset);

  return (
    <motion.div style={{ ...style, y }} className={`absolute pointer-events-none -z-10 ${className}`}>
      {children}
    </motion.div>
  );
};

const ScrollingLog = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div className="absolute top-1/2 left-0 right-0 h-40 overflow-hidden -z-20 opacity-5 pointer-events-none">
      <motion.div 
        style={{ x }} 
        className="flex whitespace-nowrap text-9xl font-bold font-mono tracking-tighter text-white"
      >
        <span>SYSTEM_SCAN // DATA_ENCRYPTION // NETWORK_BYPASS // FIREWALL_ACTIVE // </span>
        <span>SYSTEM_SCAN // DATA_ENCRYPTION // NETWORK_BYPASS // FIREWALL_ACTIVE // </span>
      </motion.div>
    </div>
  );
};

const DataFragments = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <ParallaxDecorative key={i} offset={Math.random() * 300 + 100} className="opacity-10 font-mono text-[10px] text-brand-primary" style={{ left: `${i * 18}%`, top: `${Math.random() * 100}%` }}>
          <div className="flex flex-col gap-1">
            <span>0x{Math.random().toString(16).slice(2, 8).toUpperCase()}</span>
            <span>CONNECT_P_{i}</span>
            <span>{Math.random() > 0.5 ? ">> ALLOW" : ">> BLOCK"}</span>
          </div>
        </ParallaxDecorative>
      ))}
    </div>
  );
};

export default function App() {
  const [showSecurity, setShowSecurity] = useState(false);
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-brand-bg relative selection:bg-brand-primary/30 selection:text-white overflow-x-hidden">
      <div className="noise-overlay" />
      <MouseGlow />
      
      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,11,25,1)_100%)] opacity-80" />
        <div className="scanline" />
      </div>

      <FloatingParticles />
      <DataFragments />
      <ScrollingLog />

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-primary z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <AnimatePresence>
        {showSecurity && (
          <SecurityPanel onClose={() => setShowSecurity(false)} />
        )}
      </AnimatePresence>

      <Nav onShieldClick={() => setShowSecurity(true)} />
      
      <main className="relative z-20">
        <Hero />
        
        <div className="relative">
          <ParallaxDecorative offset={-250} className="top-20 left-10">
            <Shield size={450} className="text-brand-primary/5 rotate-12 blur-[2px]" />
          </ParallaxDecorative>
          <ParallaxDecorative offset={150} className="top-1/3 -right-20">
            <Network size={500} className="text-brand-accent/5 -rotate-12 blur-[4px]" />
          </ParallaxDecorative>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <ProfileSnapshot />
            
            <div className="relative">
              <ParallaxDecorative offset={-100} className="top-0 right-1/4">
                <Cpu size={250} className="text-white/5 opacity-20" />
              </ParallaxDecorative>
              <Skills />
            </div>
            
            <div className="relative">
              <ParallaxDecorative offset={350} className="bottom-0 left-1/4">
                <Box size={350} className="text-brand-primary/5 blur-sm" />
              </ParallaxDecorative>
              <OperationsJournal />
            </div>
            
            <Credentials />
            <Contact />
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
