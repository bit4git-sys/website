import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import mobileDevImg from '../icons/mobile-dev.webp';
import { Send, Star, Quote } from 'lucide-react';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { getServiceBySlug } from '../data/services';
import Navbar from '../components/Navbar';
import AppServiceBadgesCarousel from '../components/AppServiceBadgesCarousel';
// Removed ServicesCarousel as per request

export default function AppDevelopmentPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [focusField, setFocusField] = useState<string | null>(null);
  const [lottieData, setLottieData] = useState<Record<string, unknown> | null>(null);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
    if (!endpoint) {
      console.warn('Missing VITE_CONTACT_ENDPOINT');
      setSubmitStatus('error');
      return;
    }
    const params = new URLSearchParams();
    const payload = { ...formData, source: 'app-development', path: typeof window !== 'undefined' ? window.location.pathname : '' };
    Object.entries(payload).forEach(([k, v]) => params.append(k, String(v ?? '')));
    try {
      setSubmitStatus('submitting');
      await fetch(endpoint, { method: 'POST', body: params, mode: 'no-cors', headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    }
  };
  const listVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } } } as const;
  const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } } as const;
  const reviews = [
    { content: 'Bit4Git built our mobile app with great UX.', name: 'Client Review', rating: 5 },
    { content: 'Performance and stability exceeded expectations.', name: 'Client Review', rating: 5 },
    { content: 'Smooth delivery and clear communication.', name: 'Client Review', rating: 5 },
    { content: 'Scalable architecture for future growth.', name: 'Client Review', rating: 5 },
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

  // Load local Lottie icon for App Development page
  useEffect(() => {
    const url = new URL('../icons/App devlopemt page.json', import.meta.url).href;
    fetch(url)
      .then((res) => res.json())
      .then((json: unknown) => setLottieData(json as Record<string, unknown>))
      .catch(() => {});
  }, []);
  const service = getServiceBySlug('app-development');

  if (!service) {
    return (
      <div className="min-h-screen bg-[#0A0F1F] text-center pt-32 px-6">
        <h1 className="text-3xl font-bold text-[#D9E8FF] mb-4">Service not found</h1>
        <p className="text-[#8892A6] mb-6">The service you are looking for does not exist.</p>
        <Link to="/" className="px-6 py-3 rounded-full bg-gradient-to-r from-[#3BAFDA] to-[#8C75FF] text-white shadow-softGlow">Go Home</Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark' : ''}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <section className="min-h-screen bg-[#0A0F1F] overflow-hidden">
      <div className="relative pt-28 pb-16">
        <div className="absolute inset-0 ios-grass"></div>
        <div className="bg-aurora"></div>
        <div className="absolute top-24 left-1/4 h-96 w-96 rounded-full bg-[#3BAFDA]/12 blur-3xl animate-float"></div>
        <div className="absolute top-36 right-1/4 h-96 w-96 rounded-full bg-[#8C75FF]/12 blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="md:col-span-2">
              {/* Removed hero header card */}

              {/* Removed About, tech stack chips, and CTA sections */}
            </div>

            
          </div>
        </div>
      </div>

      <section className="bg-[#0A0F1F] mt-12">
        <div className="container mx-auto px-6">
          <div className="space-y-12">
            {/* Hero: text left, large icon right */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-5xl md:text-6xl font-extrabold text-[#D9E8FF] leading-tight mb-6">
                  Best <span className="text-[#8C75FF]">App Development</span> Company in Hyderabad
                </h2>
                <p className="text-[#8892A6] mb-8">
                  We design and build high‑quality mobile apps that delight users and scale with your business. From MVPs to enterprise‑grade solutions, our team delivers robust performance, thoughtful UX, and secure integrations.
                </p>
                <a href="/#contact" className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#3BAFDA] to-[#8C75FF] text-white shadow-softGlow">CONTACT US</a>
              </div>
              <div>
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  {lottieData ? (
                    <Lottie animationData={lottieData} loop className="w-full h-[420px] md:h-[520px]" />
                  ) : (
                    <img src={mobileDevImg} alt="App development" className="w-full h-[420px] md:h-[520px] object-cover" />
                  )}
                </div>
              </div>
            </div>

            {/* Features grid below hero */}
            <div>
              <motion.div className="mt-6 mx-auto max-w-5xl p-5 md:p-6 rounded-2xl border border-[#8C75FF] bg-[#131A2C]" initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} variants={listVariants}>
                <div className="grid sm:grid-cols-3 gap-3 md:gap-5">
                  {[
                    { emoji: '📱', title: 'Cross-Platform Support' },
                    { emoji: '⚡', title: 'High Performance' },
                    { emoji: '🎨', title: 'Modern UI/UX' },
                    { emoji: '🔐', title: 'Security First' },
                    { emoji: '☁️', title: 'Cloud Integrated Apps' },
                    { emoji: '🚀', title: 'Fast Deployment' },
                    { emoji: '💡', title: 'Smart & Scalable Architecture' },
                    { emoji: '🔄', title: 'Seamless Updates' },
                    { emoji: '🔗', title: 'API & Third-Party Integration' },
                    { emoji: '🧩', title: 'Modular Components' },
                    { emoji: '🤝', title: 'Client Collaboration' },
                    { emoji: '🛠', title: 'Custom Features' },
                    { emoji: '🔍', title: 'In-App Analytics' },
                    { emoji: '🧭', title: 'Navigation Optimized' },
                    { emoji: '🔔', title: 'Push Notifications' },
                    { emoji: '💳', title: 'Payment Gateway Integration' },
                    { emoji: '🧪', title: 'Extensively Tested' },
                    { emoji: '📦', title: 'App Store Publishing' },
                  ].map((f) => (
                    <motion.div key={f.title} className="group flex flex-col items-center gap-2.5 p-4 rounded-xl bg-[#0F162C] border border-[#2B3561]" variants={itemVariants} whileHover={{ scale: 1.04 }}>
                      <motion.div
                        className="text-2xl md:text-3xl"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        whileHover={{ rotate: 3 }}
                        style={{ willChange: 'transform' }}
                      >
                        {f.emoji}
                      </motion.div>
                      <div className="text-center text-[#BFC8D9] text-xs font-semibold">{f.title}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <AppServiceBadgesCarousel />

      {/* ServicesCarousel removed */}

      <section className="bg-[#0A0F1F]">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div ref={formColRef} className="p-6 rounded-2xl bg-[#131A2C] border border-[#2B3561]">
              <h3 className="text-[#D9E8FF] font-bold text-2xl mb-6">Contact Us</h3>
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">Your Name</label>
                  <input type="text" value={formData.name} onChange={(e)=>setFormData({ ...formData, name: e.target.value })} onFocus={()=>setFocusField('name')} onBlur={()=>setFocusField(null)} className={`w-full px-5 py-3 rounded-xl bg-[#0F162C] border ${focusField==='name'?'border-[#2B3561] shadow-softGlow':'border-[#1C2340]'} text-[#D9E8FF] focus:outline-none transition-all`} placeholder="John Doe" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm">Email</label>
                    <input type="email" value={formData.email} onChange={(e)=>setFormData({ ...formData, email: e.target.value })} onFocus={()=>setFocusField('email')} onBlur={()=>setFocusField(null)} className={`w-full px-5 py-3 rounded-xl bg-[#0F162C] border ${focusField==='email'?'border-[#2B3561] shadow-softGlow':'border-[#1C2340]'} text-[#D9E8FF] focus:outline-none transition-all`} placeholder="john@example.com" required />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm">Phone</label>
                    <input type="tel" value={formData.phone} onChange={(e)=>setFormData({ ...formData, phone: e.target.value })} onFocus={()=>setFocusField('phone')} onBlur={()=>setFocusField(null)} className={`w-full px-5 py-3 rounded-xl bg-[#0F162C] border ${focusField==='phone'?'border-[#2B3561] shadow-softGlow':'border-[#1C2340]'} text-[#D9E8FF] focus:outline-none transition-all`} placeholder="+91 98765 43210" required />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">Service</label>
                  <select value={formData.service} onChange={(e)=>setFormData({ ...formData, service: e.target.value })} onFocus={()=>setFocusField('service')} onBlur={()=>setFocusField(null)} className={`w-full px-5 py-3 rounded-xl bg-[#0F162C] border ${focusField==='service'?'border-[#2B3561] shadow-softGlow':'border-[#1C2340]'} text-[#D9E8FF] focus:outline-none transition-all`} required>
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
                  <textarea rows={5} value={formData.message} onChange={(e)=>setFormData({ ...formData, message: e.target.value })} onFocus={()=>setFocusField('message')} onBlur={()=>setFocusField(null)} className={`w-full px-5 py-3 rounded-xl bg-[#0F162C] border ${focusField==='message'?'border-[#2B3561] shadow-softGlow':'border-[#1C2340]'} text-[#D9E8FF] focus:outline-none transition-all resize-none`} placeholder="Tell us about your project..." required />
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
                <motion.div ref={reviewsRef} className="flex flex-col gap-6" animate={scrollDistance ? { y: [0, -scrollDistance] } : {}} transition={{ duration: 24, ease: 'linear', repeat: Infinity }}>
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

      </section>
      <Footer />
    </div>
  );
}
