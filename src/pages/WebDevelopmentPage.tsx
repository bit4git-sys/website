import { useEffect, useRef, useState } from 'react';
import webDevImg from '../icons/web-development-concept-website.webp';
import Navbar from '../components/Navbar';
import { User, Code2, Search, MonitorSmartphone, Rocket, BadgeDollarSign, SlidersHorizontal, Puzzle, LifeBuoy, Settings, Files, TrendingUp, Send, Star, Quote } from 'lucide-react';
import Footer from '../components/Footer';
import Lottie from 'lottie-react';
import { motion, useInView } from 'framer-motion';
 

export default function WebDevelopmentPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [lottieData, setLottieData] = useState<Record<string, unknown> | null>(null);
  const listVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
  } as const;
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  } as const;
  const Counter = ({ end, duration = 1200, suffix = '', className = '' }: { end: number; duration?: number; suffix?: string; className?: string }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const [value, setValue] = useState(0);
    useEffect(() => {
      if (inView) {
        const startTime = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          setValue(Math.floor(end * progress));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, [inView, end, duration]);
    return <div ref={ref} className={className}>{value}{suffix}</div>;
  };
  
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const submitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
    if (!endpoint) {
      console.warn('Missing VITE_CONTACT_ENDPOINT');
      setSubmitStatus('error');
      return;
    }
    const payload = { ...contactForm, source: 'web-development', path: typeof window !== 'undefined' ? window.location.pathname : '' };
    const params = new URLSearchParams();
    Object.entries(payload).forEach(([k, v]) => params.append(k, String(v ?? '')));
    try {
      setSubmitStatus('submitting');
      await fetch(endpoint, { method: 'POST', body: params, mode: 'no-cors', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
      setContactForm({ name: '', email: '', phone: '', service: '', message: '' });
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    }
  };
  const reviews = [
    { content: 'Bit4Git transformed our digital presence with a high-quality website.', name: 'Client Review', rating: 5 },
    { content: 'Reliable, secure, and professional service delivery.', name: 'Client Review', rating: 5 },
    { content: 'Fast communication and smooth project execution.', name: 'Client Review', rating: 5 },
    { content: 'Great ROI and scalable architecture delivered on time.', name: 'Client Review', rating: 5 },
  ];
  const reviewsLoop = [...reviews, ...reviews];
  const reviewsRef = useRef<HTMLDivElement | null>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  useEffect(() => {
    const el = reviewsRef.current;
    if (el) {
      const total = el.scrollHeight;
      setScrollDistance(total / 2);
    }
  }, []);
  const formColRef = useRef<HTMLDivElement | null>(null);
  const [formHeight, setFormHeight] = useState<number | null>(null);
  useEffect(() => {
    const measure = () => setFormHeight(formColRef.current ? formColRef.current.offsetHeight : null);
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  useEffect(() => {
    const url = new URL('../icons/web devlopemnt page.json', import.meta.url).href;
    fetch(url)
      .then((res) => res.json())
      .then((json: unknown) => setLottieData(json as Record<string, unknown>))
      .catch(() => {});
  }, []);
  

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <section className="pt-44 pb-28 bg-[#0A0F1F]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-[#D9E8FF] leading-tight mb-6">
                Best <span className="text-[#8C75FF]">Website Designing</span> Company in Hyderabad
              </h1>
              <p className="text-[#8892A6] mb-8">
                Designing a website is an art and you are here in the artist's den. Our agenda is to not only design premium good looking websites but also satisfy our customers in the web needs. Right from basic static websites to full functional dynamic e‑commerce websites to showcase your products or services online. With just a few clicks people can navigate to your website and purchase the product or book a service. Our in‑house expert team of website designers with experience over a half decade, we are fully focused and dedicated to ensure the best of website outcome with all corners of the web pages to be creative and attractive.
              </p>
              <a href="/#contact" className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#3BAFDA] to-[#8C75FF] text-white shadow-softGlow">CONTACT US</a>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                {lottieData ? (
                  <Lottie animationData={lottieData} loop={true} className="w-full h-[420px] md:h-[520px]" />
                ) : (
                  <img src={webDevImg} alt="Responsive web design" className="w-full h-[420px] md:h-[520px] object-cover" />
                )}
              </div>
            </div>
          </div>

          <motion.div className="mt-12 mx-auto max-w-5xl p-5 md:p-6 rounded-2xl border border-[#8C75FF] bg-[#131A2C]" initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} variants={listVariants}>
            <div className="grid sm:grid-cols-3 gap-3 md:gap-5">
              {[
                { title: 'USER FRIENDLY', icon: User },
                { title: 'MINIMAL CODING', icon: Code2 },
                { title: 'SEO FRIENDLY', icon: Search },
                { title: 'RESPONSIVE DESIGN', icon: MonitorSmartphone },
                { title: 'QUICK INSTALLATION', icon: Rocket },
                { title: 'COST EFFECTIVE', icon: BadgeDollarSign },
                { title: 'FULL CONTROL', icon: SlidersHorizontal },
                { title: 'PLENTY OF PLUGINS', icon: Puzzle },
                { title: 'UPGRADE & SUPPORT', icon: LifeBuoy },
                { title: 'CUSTOMIZABILITY', icon: Settings },
                { title: 'MULTIPLE PAGES', icon: Files },
                { title: 'SCALABLE', icon: TrendingUp },
              ].map((f) => (
                <motion.div key={f.title} className="flex flex-col items-center gap-2.5 p-4 rounded-xl bg-[#0F162C] border border-[#2B3561]" variants={itemVariants} whileHover={{ scale: 1.03 }}>
                  <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                    <f.icon className="h-7 w-7 text-[#34D399]" />
                  </motion.div>
                  <div className="text-center text-[#BFC8D9] text-xs font-semibold">{f.title}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <section className="bg-[#0A0F1F] mt-20">
            <div className="container mx-auto px-6 md:px-8 py-20">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="text-sm text-[#8892A6] mb-2">About Us</div>
                  <h2 className="text-6xl md:text-7xl font-extrabold text-[#D9E8FF] mb-8">What makes us <span className="bg-gradient-to-r from-[#8C75FF] to-[#3BAFDA] bg-clip-text text-transparent">special?</span></h2>
                  <p className="text-[#8892A6] mb-10">We are a dynamic, versatile and full‑service website design team focused on building custom websites that help businesses grow. We rely on strong design, SEO best practices and clear marketing strategy to drive new customers to your website.</p>
                  <a href="/#contact" className="inline-block px-6 py-3 rounded-full bg-[#4F46E5] text-white shadow-softGlow">CONTACT US</a>
                </div>
                <div className="grid grid-cols-2 gap-10">
                  <div className="p-10 md:p-12 rounded-2xl bg-[#131A2C] border border-[#2B3561] shadow-soft">
                    <Counter end={190} suffix="+" className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-[#8C75FF] to-[#3BAFDA] bg-clip-text text-transparent" />
                    <div className="mt-4 text-[#BFC8D9]">Websites Completed</div>
                  </div>
                  <div className="p-10 md:p-12 rounded-2xl bg-[#131A2C] border border-[#2B3561] shadow-soft">
                    <Counter end={400} suffix="+" className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-[#8C75FF] to-[#3BAFDA] bg-clip-text text-transparent" />
                    <div className="mt-4 text-[#BFC8D9]">Campaigns Managed</div>
                  </div>
                  <div className="p-10 md:p-12 rounded-2xl bg-[#131A2C] border border-[#2B3561] shadow-soft">
                    <Counter end={7} suffix="+" className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-[#8C75FF] to-[#3BAFDA] bg-clip-text text-transparent" />
                    <div className="mt-4 text-[#BFC8D9]">Years Of Experience</div>
                  </div>
                  <div className="p-10 md:p-12 rounded-2xl bg-[#131A2C] border border-[#2B3561] shadow-soft">
                    <Counter end={99} suffix="%" className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-[#8C75FF] to-[#3BAFDA] bg-clip-text text-transparent" />
                    <div className="mt-4 text-[#BFC8D9]">Happy Customers</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="bg-[#0A0F1F]">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div ref={formColRef} className="p-6 rounded-2xl bg-[#131A2C] border border-[#2B3561]">
              <h3 className="text-[#D9E8FF] font-bold text-2xl mb-6">Contact Us</h3>
              <form onSubmit={submitContact} className="space-y-5">
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">Your Name</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-5 py-3 rounded-xl bg-[#0F162C] border ${focusedField === 'name' ? 'border-[#2B3561] shadow-softGlow' : 'border-[#1C2340]'} text-[#D9E8FF] focus:outline-none transition-all`}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm">Email</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-5 py-3 rounded-xl bg-[#0F162C] border ${focusedField === 'email' ? 'border-[#2B3561] shadow-softGlow' : 'border-[#1C2340]'} text-[#D9E8FF] focus:outline-none transition-all`}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm">Phone</label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-5 py-3 rounded-xl bg-[#0F162C] border ${focusedField === 'phone' ? 'border-[#2B3561] shadow-softGlow' : 'border-[#1C2340]'} text-[#D9E8FF] focus:outline-none transition-all`}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">Service</label>
                  <select
                    value={contactForm.service}
                    onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                    onFocus={() => setFocusedField('service')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-5 py-3 rounded-xl bg-[#0F162C] border ${focusedField === 'service' ? 'border-[#2B3561] shadow-softGlow' : 'border-[#1C2340]'} text-[#D9E8FF] focus:outline-none transition-all`}
                    required
                  >
                    <option value="">Select a service</option>
                    <option>Website Development</option>
                    <option>App Development</option>
                    <option>Cloud Solutions</option>
                    <option>IT Services</option>
                    <option>Cybersecurity</option>
                    <option>IT Consulting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">Message</label>
                  <textarea
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-5 py-3 rounded-xl bg-[#0F162C] border ${focusedField === 'message' ? 'border-[#2B3561] shadow-softGlow' : 'border-[#1C2340]'} text-[#D9E8FF] focus:outline-none transition-all resize-none`}
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>
                <button type="submit" className="group w-full px-8 py-4 rounded-xl bg-gradient-to-r from-[#3BAFDA] to-[#8C75FF] text-white font-semibold hover:scale-105 transition-all shadow-softGlow flex items-center justify-center gap-2">
                  Send Message
                  <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                {submitStatus === 'submitting' && (
                  <div className="text-[#BFC8D9] text-sm mt-2">Submitting...</div>
                )}
                {submitStatus === 'success' && (
                  <div className="text-green-400 text-sm mt-2">Submitted successfully</div>
                )}
                {submitStatus === 'error' && (
                  <div className="text-red-400 text-sm mt-2">Submission failed. Please try again.</div>
                )}
              </form>
            </div>

            <div className="space-y-6 flex flex-col" style={{ height: formHeight ?? undefined }}>
              <h3 className="text-[#D9E8FF] font-bold text-2xl">Customer Reviews</h3>
              <div className="relative overflow-hidden flex-1 min-h-0">
                <motion.div
                  ref={reviewsRef}
                  className="flex flex-col gap-6"
                  animate={scrollDistance ? { y: [0, -scrollDistance] } : {}}
                  transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
                >
                  {reviewsLoop.map((t, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-[#131A2C] border border-[#2B3561] h-40 flex flex-col justify-between">
                      <Quote className="h-8 w-8 text-[#3BAFDA]/40 mb-3" />
                      <p className="text-[#BFC8D9] mb-4">"{t.content}"</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[#8892A6]">{t.name}</span>
                        <div className="flex gap-1">{Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-[#4CC9A7] fill-[#4CC9A7]" />
                        ))}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      

      
    </div>
  );
}
