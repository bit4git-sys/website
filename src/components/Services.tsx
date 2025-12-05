import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Megaphone, Smartphone, Shield, ShoppingCart } from 'lucide-react';
import Lottie from 'lottie-react';
import webDevImg from '../icons/web-development-concept-website.webp';
import appDevImg from '../icons/mobile-dev.webp';
import cyberImg from '../icons/cybersecurity.webp';
import dmImg from '../icons/digital-marketing-mic.webp';
import ecommerceImg from '../icons/ecommerce-designing.webp';

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const serviceItems = useMemo(() => (
    [
      { title: 'Web Development', icon: Code2, img: webDevImg, ring: 'from-[#8C75FF] to-[#A5B4FC]', lottie: 'web-development.json', glow: 'rgba(140,117,255,0.35)', hoverGlow: 'rgba(140,117,255,0.55)' },
      { title: 'App Development', icon: Smartphone, img: appDevImg, ring: 'from-[#34D399] to-[#10B981]', lottie: 'app-development.json', glow: 'rgba(52,211,153,0.30)', hoverGlow: 'rgba(52,211,153,0.50)' },
      { title: 'Cybersecurity', icon: Shield, img: cyberImg, ring: 'from-[#40E0FF] to-[#3BAFDA]', lottie: 'cybersecurity.json', glow: 'rgba(64,224,255,0.30)', hoverGlow: 'rgba(64,224,255,0.50)' },
      { title: 'Digital Marketing', icon: Megaphone, img: dmImg, ring: 'from-[#FBBF24] to-[#F59E0B]', lottie: 'digital-marketing.json', glow: 'rgba(251,191,36,0.28)', hoverGlow: 'rgba(251,191,36,0.48)' },
      { title: 'Ecommerce Development', icon: ShoppingCart, img: ecommerceImg, ring: 'from-[#FCA5A5] to-[#FB7185]', lottie: 'ecommerce.json', glow: 'rgba(252,165,165,0.30)', hoverGlow: 'rgba(252,165,165,0.50)' },
    ] as Array<{ title: string; ring: string; icon: React.ComponentType<{ className?: string }>; lottie?: string; gif?: string; glow?: string; hoverGlow?: string; img?: string }>
  ), []);
  const [animations, setAnimations] = useState<Record<string, Record<string, unknown> | null>>({});
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const entries = await Promise.all(serviceItems.map(async (it) => {
        // Skip fetching Lottie if we already have a static image or gif for this item
        if (!it.lottie || it.img || it.gif) return [it.title, null] as const;
        try {
          const res = await fetch(`/animations/services/${it.lottie}`);
          if (!res.ok) return [it.title, null] as const;
          const json = (await res.json()) as Record<string, unknown>;
          return [it.title, json] as const;
        } catch {
          return [it.title, null] as const;
        }
      }));
      if (mounted) {
        const obj: Record<string, Record<string, unknown> | null> = {};
        for (const [k, v] of entries) obj[k] = v;
        setAnimations(obj);
      }
    };
    load();
    return () => { mounted = false; };
  }, [serviceItems]);

  

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative pt-24 pb-20 overflow-hidden bg-transparent"
    >
      <div className="absolute inset-x-0 top-0 -z-10">
        <svg viewBox="0 0 1440 250" className="w-full h-[160px]" preserveAspectRatio="none">
          <defs>
            <linearGradient id="servicesWave" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#131A2C" />
              <stop offset="100%" stopColor="#0A0F1F" />
            </linearGradient>
          </defs>
          <path d="M0,120 C240,200 480,40 720,120 C960,200 1200,80 1440,140 L1440,0 L0,0 Z" fill="url(#servicesWave)" />
        </svg>
      </div>

      <div className="bg-transparent">
        <div className="container mx-auto px-6 py-14">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-3 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <span className="text-[#D9E8FF]">Our </span>
              <span className="headline-shimmer">Services</span>
            </h2>
          </div>

          <motion.div
            initial="hidden"
            animate={isVisible ? 'show' : 'hidden'}
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center"
          >
              {serviceItems.map((item, idx) => (
                <motion.div
                  key={item.title}
                  variants={{ hidden: { opacity: 0, x: idx % 2 === 0 ? -24 : 24 }, show: { opacity: 1, x: 0 } }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    className={`p-1 rounded-full bg-gradient-to-tr ${item.ring} w-28 h-28 md:w-32 md:h-32 shadow-soft transition-transform duration-300`}
                    animate={{
                      rotate: [0, 1.2, -1.2, 0],
                      x: [0, 2, -2, 0],
                      boxShadow: [
                        '0 0 0 rgba(0,0,0,0)',
                        `0 0 12px ${item.glow ?? 'rgba(140,117,255,0.30)'}`,
                        `0 0 20px ${item.glow ?? 'rgba(140,117,255,0.30)'}`,
                        `0 0 12px ${item.glow ?? 'rgba(140,117,255,0.30)'}`,
                        '0 0 0 rgba(0,0,0,0)'
                      ],
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                    whileHover={{ scale: 1.08, boxShadow: `0 0 28px ${item.hoverGlow ?? 'rgba(140,117,255,0.55)'}` }}
                  >
                    <div className="w-full h-full rounded-full bg-[#0A0F1F] flex items-center justify-center transition-colors duration-300 hover:bg-[#0D1326]">
                      {item.img ? (
                        <img src={item.img} alt={item.title} className="w-3/4 h-3/4 object-contain transition-transform duration-300 hover:scale-105" />
                      ) : item.gif ? (
                        <img src={item.gif} alt={item.title} className="w-3/4 h-3/4 object-contain transition-transform duration-300 hover:scale-105" />
                      ) : animations[item.title] ? (
                        <Lottie animationData={animations[item.title]!} loop={true} className="w-3/4 h-3/4" />
                      ) : (
                        <item.icon className="h-3/4 w-3/4 text-[#BFC8D9] transition-transform duration-300 hover:scale-105" />
                      )}
                    </div>
                  </motion.div>
                  <div className="mt-4 text-center">
                    <p className="text-[#D9E8FF] font-semibold">{item.title}</p>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
