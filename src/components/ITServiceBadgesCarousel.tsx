import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Server, Settings, LifeBuoy, BadgeCheck, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

type Badge = {
  icon: React.ComponentType<{ className?: string; color?: string; style?: React.CSSProperties }>;
  title: string;
  description: string;
  accentFrom: string;
  accentTo: string;
};

const badges: Badge[] = [
  { icon: Server, title: 'IT Infrastructure Setup', description: 'Servers • Networking • Workstations', accentFrom: '#3BAFDA', accentTo: '#8C75FF' },
  { icon: Settings, title: 'System Administration', description: 'Linux/Windows server management', accentFrom: '#8C75FF', accentTo: '#3BAFDA' },
  { icon: LifeBuoy, title: 'IT Support', description: 'On‑site • Remote troubleshooting', accentFrom: '#34D399', accentTo: '#3BAFDA' },
  { icon: BadgeCheck, title: 'Software Licensing', description: 'OS • Antivirus • Tools • Firewalls', accentFrom: '#F59E0B', accentTo: '#8C75FF' },
  { icon: SlidersHorizontal, title: 'IT Automation', description: 'Workflows • Monitoring • Logging', accentFrom: '#0EA5E9', accentTo: '#22D3EE' },
];

export default function ITServiceBadgesCarousel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef<number | null>(null);

  const scrollToIndex = (idx: number, behavior: ScrollBehavior = 'smooth') => {
    const container = containerRef.current;
    const card = cardRefs.current[idx];
    if (!container || !card) return;
    const left = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
    container.scrollTo({ left, behavior });
    setActiveIndex(idx);
  };

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    autoplayRef.current = window.setInterval(() => {
      const next = (activeIndex + 1) % badges.length;
      scrollToIndex(next);
    }, 4000);
  }, [activeIndex, stopAutoplay]);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [activeIndex, startAutoplay, stopAutoplay]);

  useEffect(() => {
    scrollToIndex(0, 'auto');
  }, []);

  const goPrev = () => scrollToIndex((activeIndex - 1 + badges.length) % badges.length);
  const goNext = () => scrollToIndex((activeIndex + 1) % badges.length);
  const progress = ((activeIndex + 1) / badges.length) * 100;

  return (
    <section className="bg-[#0A0F1F]">
      <div className="container mx-auto px-6 py-14">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-[#D9E8FF] font-extrabold text-2xl md:text-3xl tracking-tight">Services we offer</h3>
          <div className="flex items-center gap-3">
            <button onClick={goPrev} className="h-10 w-10 rounded-full bg-white shadow-md border border-[#e6e6f3] flex items-center justify-center hover:shadow-lg transition" aria-label="Previous">
              <ChevronLeft className="h-5 w-5 text-[#1b2234]" />
            </button>
            <button onClick={goNext} className="h-10 w-10 rounded-full bg-white shadow-md border border-[#e6e6f3] flex items-center justify-center hover:shadow-lg transition" aria-label="Next">
              <ChevronRight className="h-5 w-5 text-[#1b2234]" />
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
          className="relative overflow-x-auto hide-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          <div className="flex gap-6">
            {badges.map((b, i) => (
              <motion.div
                key={b.title}
                ref={(el) => (cardRefs.current[i] = el!)}
                className="flex-shrink-0 w-[85%] sm:w-[60%] lg:w-[32%]"
                style={{ scrollSnapAlign: 'center' }}
                whileHover={{ scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              >
                <div
                  className={`rounded-2xl md:rounded-3xl bg-white p-6 shadow-[0_12px_40px_rgba(27,34,52,0.08)] border ${
                    i === activeIndex ? 'border-2 border-transparent bg-clip-padding relative' : 'border-[#e6e6f3] opacity-95'
                  }`}
                >
                  {i === activeIndex && (
                    <div className="pointer-events-none absolute inset-0 rounded-2xl md:rounded-3xl p-[2px]">
                      <div className="h-full w-full rounded-2xl md:rounded-3xl" style={{ background: `linear-gradient(135deg, ${b.accentFrom}, ${b.accentTo})` }}></div>
                    </div>
                  )}
                  <div className="relative z-10">
                    <div className="h-14 w-14 rounded-full mx-auto mb-4 bg-[#f5f5ff] border border-[#e6e6f3] shadow-inner flex items-center justify-center">
                      <b.icon className="h-6 w-6" style={{ color: b.accentTo }} />
                    </div>
                    <div className={`text-center font-semibold text-lg ${i === activeIndex ? 'text-[#8C75FF]' : 'text-[#1b2234]'}`}>{b.title}</div>
                    <p className="mt-2 text-center text-[#606c86] text-sm leading-[24px]">{b.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            {badges.map((_, i) => (
              <button key={i} onClick={() => scrollToIndex(i)} className={`h-2.5 w-2.5 rounded-full ${i === activeIndex ? 'bg-[#8C75FF]' : 'bg-[#d9d9ef]'}`} aria-label={`Go to slide ${i + 1}`} />
            ))}
          </div>
          <div className="flex items-center gap-3 text-[#606c86] text-sm">
            <span>{String(activeIndex + 1).padStart(2, '0')}</span>
            <span>—</span>
            <span>{String(badges.length).padStart(2, '0')}</span>
          </div>
          <div className="h-[2px] w-full max-w-md bg-[#e6e6f3] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r" style={{ backgroundImage: 'linear-gradient(90deg, #f472b6, #8C75FF)', width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
