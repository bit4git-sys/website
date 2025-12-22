import { ArrowRight, Code2, Cloud, Shield, Smartphone, Server, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
 

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [badgeTyped, setBadgeTyped] = useState('');
  const [isBadgeTyping, setIsBadgeTyping] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  useEffect(() => {
    const fullText = ' Transforming Ideas into Scalable Digital Solutions ';
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText((prev) => (prev + fullText[i]).replace(/undefined/gi, ''));
        i += 1;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const words = ['Premium IT Services', 'Web Development', 'Cybersecurity Services'];
    let idx = 0;
    let timer: number | undefined;

    const type = (text: string) => {
      let i = 0;
      setIsBadgeTyping(true);
      setBadgeTyped('');
      timer = window.setInterval(() => {
        if (i < text.length) {
          setBadgeTyped(text.slice(0, i + 1));
          i += 1;
        } else {
          if (timer) clearInterval(timer);
          setIsBadgeTyping(false);
          setTimeout(() => erase(text), 1200);
        }
      }, 35);
    };

    const erase = (text: string) => {
      let i = text.length;
      timer = window.setInterval(() => {
        if (i > 0) {
          setBadgeTyped(text.slice(0, i - 1));
          i -= 1;
        } else {
          if (timer) clearInterval(timer);
          idx = (idx + 1) % words.length;
          const next = `<${words[idx]} />`;
          setTimeout(() => type(next), 300);
        }
      }, 20);
    };

    type(`<${words[idx]} />`);
    return () => { if (timer) clearInterval(timer); };
  }, []);
  

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent"
    >
      <div className="absolute inset-0 overflow-hidden z-10 flex items-center justify-center">
        <div
          className="absolute top-20 left-20 h-96 w-96 rounded-full bg-[#3BAFDA]/06 blur-3xl"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        ></div>
        <div
          className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-[#8C75FF]/06 blur-3xl"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        ></div>

        <div className="absolute top-10 right-1/4 animate-float glow-soft">
          <Code2 className="h-12 w-12 text-[#3BAFDA]/30" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 animate-float glow-soft" style={{ animationDelay: '1s' }}>
          <Cloud className="h-16 w-16 text-[#8C75FF]/30" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-float glow-soft" style={{ animationDelay: '2s' }}>
          <Shield className="h-14 w-14 text-[#4CC9A7]/30" />
        </div>

      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center">
          <motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
            <motion.span
              className="inline-block px-6 py-2 rounded-full card-overlay text-[#8892A6] text-sm font-mono badge-shine"
              initial={{ y: -6, scale: 0.98 }}
              animate={{
                y: [0, -2, 0],
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="inline-flex items-center gap-2">
                <span className="sparkle-anim">
                  <Sparkles className="h-4 w-4 text-[#3BAFDA]" />
                </span>
                <span>{badgeTyped}{isBadgeTyping && <span className="typing-cursor">|</span>}</span>
                <span className="sparkle-anim" style={{ animationDelay: '0.8s' }}>
                  <Sparkles className="h-4 w-4 text-[#8C75FF]" />
                </span>
              </span>
            </motion.span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-bold mb-6 text-[clamp(1.6rem,4vw,3.2rem)]">
            <span className="headline-shimmer">{typedText}</span>{isTyping && <span className="typing-cursor">|</span>}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-[#BFC8D9] mb-8 text-[clamp(0.9rem,1.8vw,1.2rem)]">
            Powering businesses with Website Development, Cloud Services, IT Infrastructure, and Cybersecurity Solutions.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="flex flex-wrap justify-center gap-4">
            <a href="#services" className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#3BAFDA] to-[#8C75FF] text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-105 shadow-softGlow btn-hoverGlow glow-cyan">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#2B3561] to-[#1C2340] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>

            <a href="#contact" className="group px-8 py-4 rounded-full border-2 border-[#2B3561] text-[#3BAFDA] font-semibold hover:bg-[#1C2340] transition-all duration-300 hover:scale-105 shadow-soft glow-purple">
              Contact Us
            </a>
            <Link to="/careers" className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#3BAFDA] to-[#8C75FF] text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-105 shadow-softGlow btn-hoverGlow glow-cyan">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Enroll Now
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#2B3561] to-[#1C2340] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 rounded-full card-overlay text-[#3BAFDA] flex items-center gap-2">
              <Code2 className="h-4 w-4" /> Web Development
            </span>
            <span className="px-4 py-2 rounded-full card-overlay text-[#8C75FF] flex items-center gap-2">
              <Smartphone className="h-4 w-4" /> App Development
            </span>
            <span className="px-4 py-2 rounded-full card-overlay text-[#BFC8D9] flex items-center gap-2">
              <Cloud className="h-4 w-4" /> Cloud & DevOps
            </span>
            <span className="px-4 py-2 rounded-full card-overlay text-[#BFC8D9] flex items-center gap-2">
              <Shield className="h-4 w-4" /> Cybersecurity
            </span>
            <span className="px-4 py-2 rounded-full card-overlay text-[#4CC9A7] flex items-center gap-2">
              <Server className="h-4 w-4" /> IT Services
            </span>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="h-12 w-6 rounded-full border-2 border-cyan-400/50 flex justify-center pt-2 outline-glow-cyan">
          <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
