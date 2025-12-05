import { useEffect, useRef, useState } from 'react';
import { ArrowRightCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import teamAnimation from '../about icon/team.json';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // no-op: visibility is used for entrance animations
  }, [isVisible]);

  const priorities = [
    {
      title: 'Performance-Driven Engineering',
      desc: 'We build systems that load faster, respond smarter & handle growth without breaking.',
    },
    {
      title: 'Security at Every Layer',
      desc: 'From development to deployment, security isn’t an addon — it’s a foundation.',
    },
    {
      title: 'Future-Ready Architecture',
      desc: 'Scalable, cloud-powered & optimized solutions built to evolve with technology.',
    },
    {
      title: 'Client-Focused Delivery',
      desc: 'We collaborate deeply, build transparently & deliver more than expectations.',
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="relative py-24 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
          <div className={`grid md:grid-cols-2 gap-10 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <motion.div className="order-2 md:order-1" initial={{ opacity: 0, x: -40 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <div className="rounded-2xl">
              <div className="rounded-2xl bg-transparent overflow-visible flex items-center justify-center">
                <Lottie animationData={teamAnimation} loop className="w-full h-[380px] md:h-[460px]" />
              </div>
            </div>
          </motion.div>

          <motion.div className="order-1 md:order-2" initial={{ opacity: 0, x: 40 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="text-[#D9E8FF]">About </span>
              <span className="bg-gradient-to-r from-[#3BAFDA] to-[#8C75FF] bg-clip-text text-transparent">Bit4Git Technologies</span>
            </h2>
            <p className="text-[#8892A6] mb-5">Innovation, Reliability & Security aren’t just offerings — they are our identity.</p>

            <div className="space-y-4 text-[#BFC8D9]">
              <p>
                Bit4Git Technologies is a modern IT Solutions & Cyber Engineering company dedicated to building scalable, secure, and high-performance digital ecosystems. We specialize in Website Development, Cloud Infrastructure, App Development, DevOps, IT Automation, and Advanced Cybersecurity Services.
              </p>
              <p>
                Our team is composed of skilled engineers, developers, and security professionals who believe in creating technology that not only works — but scales, protects, and evolves with your business. From infrastructure design to secure deployments, we ensure every product we build is future-ready, robust, and aligned with business growth objectives.
              </p>
              <p>
                Driven by innovation and guided by experience, Bit4Git continues to help startups, enterprises, and institutions achieve digital transformation with speed, security, and real-world performance.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-[#D9E8FF] mb-3">Our Priorities</h3>
              <div className="space-y-3">
                {priorities.map((p, idx) => (
                  <motion.div key={p.title} className="flex items-start gap-3 p-4 rounded-xl bg-[#172238] border border-[#2B3561]" initial={{ opacity: 0, x: 30 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 + idx * 0.08 }}>
                    <ArrowRightCircle className="mt-0.5 h-5 w-5 text-[#3BAFDA]" />
                    <div>
                      <div className="text-[#D9E8FF] font-semibold">{p.title}</div>
                      <div className="text-[#8892A6] text-sm">{p.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
