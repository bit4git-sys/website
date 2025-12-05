import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
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

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
    if (!endpoint) {
      console.warn('Missing VITE_CONTACT_ENDPOINT');
      setSubmitStatus('error');
      return;
    }
    const payload = { ...formData, source: 'contact', path: typeof window !== 'undefined' ? window.location.pathname : '' };
    const params = new URLSearchParams();
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

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'bit4git@gmail.com',
      color: 'cyan',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '9225524601',
      color: 'purple',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Hyderabad, India',
      color: 'pink',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 bg-transparent overflow-hidden"
    >
      

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="text-[#D9E8FF]">Get In Touch</span>
          </h2>
          <p
            className={`text-[#BFC8D9] text-lg max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Ready to transform your business? Let's start a conversation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="space-y-6 mb-8">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="group flex items-start gap-4 p-6 rounded-xl card-overlay transition-all duration-500 hover:scale-105 shadow-soft"
                >
                  <div className={`p-3 rounded-lg bg-gradient-to-br from-[#1C2340] to-[#2B3561] group-hover:scale-105 transition-transform duration-300`}>
                    <info.icon className={`h-6 w-6 text-[#3BAFDA]`} />
                  </div>
                  <div>
                    <h3 className="text-[#D9E8FF] font-semibold mb-1">{info.label}</h3>
                    <p className="text-[#8892A6]">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-xl card-overlay">
              <h3 className="text-[#D9E8FF] font-bold text-xl mb-4">Office Hours</h3>
              <div className="space-y-2 text-[#8892A6]">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2 text-sm">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-6 py-4 rounded-xl bg-[#131A2C] backdrop-blur-sm border ${
                    focusedField === 'name'
                      ? 'border-[#2B3561] shadow-softGlow'
                      : 'border-[#1C2340]'
                  } text-[#D9E8FF] focus:outline-none transition-all duration-300`}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2 text-sm">Your Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-6 py-4 rounded-xl bg-[#131A2C] backdrop-blur-sm border ${
                    focusedField === 'email'
                      ? 'border-[#2B3561] shadow-softGlow'
                      : 'border-[#1C2340]'
                  } text-[#D9E8FF] focus:outline-none transition-all duration-300`}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2 text-sm">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-6 py-4 rounded-xl bg-[#131A2C] backdrop-blur-sm border ${
                    focusedField === 'phone'
                      ? 'border-[#2B3561] shadow-softGlow'
                      : 'border-[#1C2340]'
                  } text-[#D9E8FF] focus:outline-none transition-all duration-300`}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2 text-sm">Service Required</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  onFocus={() => setFocusedField('service')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-6 py-4 rounded-xl bg-[#131A2C] backdrop-blur-sm border ${
                    focusedField === 'service'
                      ? 'border-[#2B3561] shadow-softGlow'
                      : 'border-[#1C2340]'
                  } text-[#D9E8FF] focus:outline-none transition-all duration-300`}
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
                <label className="block text-gray-400 mb-2 text-sm">Your Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={6}
                  className={`w-full px-6 py-4 rounded-xl bg-[#131A2C] backdrop-blur-sm border ${
                    focusedField === 'message'
                      ? 'border-[#2B3561] shadow-softGlow'
                      : 'border-[#1C2340]'
                  } text-[#D9E8FF] focus:outline-none transition-all duration-300 resize-none`}
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                className="group w-full px-8 py-4 rounded-xl bg-gradient-to-r from-[#3BAFDA] to-[#8C75FF] text-white font-semibold hover:scale-105 transition-all duration-300 shadow-softGlow btn-hoverGlow flex items-center justify-center gap-2"
              >
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
      </div>
      </div>

      <div className="container mx-auto px-6 mt-12 relative z-10">
        <div className="rounded-2xl overflow-hidden border border-[#2B3561]">
          <iframe
            title="Bit4Git Location"
            src="https://www.google.com/maps?q=Hyderabad,+Telangana,+India&output=embed"
            width="100%"
            height="360"
            loading="lazy"
            allowFullScreen={true}
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
