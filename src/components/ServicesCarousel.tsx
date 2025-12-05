import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Globe, ShoppingCart, Building2, PenTool, ChevronLeft, ChevronRight } from 'lucide-react';

type ServiceCard = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

const services: ServiceCard[] = [
  { icon: Smartphone, title: 'Mobile App Development', description: 'Design and build fast, secure Android and iOS apps with Flutter and native tech.' },
  { icon: Globe, title: 'Web App Development', description: 'Modern, scalable web apps with clean UI and robust backend architecture.' },
  { icon: ShoppingCart, title: 'E-Commerce Solutions', description: 'Full-featured online stores, marketplaces, and subscription platforms.' },
  { icon: Building2, title: 'Business & Enterprise Apps', description: 'Custom CRM, ERP, HRMS and automation tools for growing teams.' },
  { icon: PenTool, title: 'UI/UX Design', description: 'Pixel-perfect interfaces, prototypes, and user flows focused on conversion.' },
];

export default function ServicesCarousel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(n, max));

  const scrollToIndex = (idx: number) => {
    const container = containerRef.current;
    const card = cardRefs.current[idx];
    if (!container || !card) return;
    const left = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
    container.scrollTo({ left, behavior: 'smooth' });
  };

  const updateActiveOnScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const centerX = container.scrollLeft + container.clientWidth / 2;
    let closest = 0;
    let bestDist = Infinity;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const cardCenter = el.offsetLeft + el.clientWidth / 2;
      const dist = Math.abs(cardCenter - centerX);
      if (dist < bestDist) {
        bestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  };

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const handler = () => updateActiveOnScroll();
    c.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);
    handler();
    return () => {
      c.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
  }, []);

  const goPrev = () => scrollToIndex(clamp(activeIndex - 1, 0, services.length - 1));
  const goNext = () => scrollToIndex(clamp(activeIndex + 1, 0, services.length - 1));

  const progress = ((activeIndex + 1) / services.length) * 100;

  return (
    <section className="bg-[#f8f7ff]">
      <div className="container mx-auto px-6 py-14">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-[#1b2234] font-extrabold text-2xl md:text-3xl tracking-tight">Services we offer</h3>
          <div className="flex items-center gap-3">
            <button onClick={goPrev} className="h-10 w-10 rounded-full bg-white shadow-md border border-[#e6e6f3] flex items-center justify-center hover:shadow-lg transition">
              <ChevronLeft className="h-5 w-5 text-[#1b2234]" />
            </button>
            <button onClick={goNext} className="h-10 w-10 rounded-full bg-white shadow-md border border-[#e6e6f3] flex items-center justify-center hover:shadow-lg transition">
              <ChevronRight className="h-5 w-5 text-[#1b2234]" />
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative overflow-x-auto hide-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          <div className="flex gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                ref={(el) => (cardRefs.current[i] = el!)}
                className="flex-shrink-0 w-[85%] sm:w-[60%] lg:w-[32%]"
                style={{ scrollSnapAlign: 'center' }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              >
                <div
                  className={`rounded-2xl md:rounded-3xl bg-white p-6 shadow-[0_12px_40px_rgba(27,34,52,0.08)] border ${
                    i === activeIndex
                      ? 'border-2 border-transparent bg-clip-padding relative'
                      : 'border-[#e6e6f3] opacity-95'
                  }`}
                >
                  {i === activeIndex && (
                    <div className="pointer-events-none absolute inset-0 rounded-2xl md:rounded-3xl p-[2px]">
                      <div className="h-full w-full rounded-2xl md:rounded-3xl" style={{ background: 'linear-gradient(135deg,#f472b6,#8C75FF)' }}></div>
                    </div>
                  )}
                  <div className="relative z-10">
                    <div className="h-14 w-14 rounded-full mx-auto mb-4 bg-[#f5f5ff] border border-[#e6e6f3] shadow-inner flex items-center justify-center">
                      <s.icon className="h-6 w-6 text-[#8C75FF]" />
                    </div>
                    <div className={`text-center font-semibold text-lg ${i === activeIndex ? 'text-[#8C75FF]' : 'text-[#1b2234]'}`}>{s.title}</div>
                    <p className="mt-2 text-center text-[#606c86] text-sm leading-[24px]">
                      {s.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            {services.map((_, i) => (
              <button key={i} onClick={() => scrollToIndex(i)} className={`h-2.5 w-2.5 rounded-full ${i === activeIndex ? 'bg-[#8C75FF]' : 'bg-[#d9d9ef]'}`} />
            ))}
          </div>
          <div className="flex items-center gap-3 text-[#606c86] text-sm">
            <span>{String(activeIndex + 1).padStart(2, '0')}</span>
            <span>—</span>
            <span>{String(services.length).padStart(2, '0')}</span>
          </div>
          <div className="h-[2px] w-full max-w-md bg-[#e6e6f3] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#f472b6] to-[#8C75FF]" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}

