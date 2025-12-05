import { motion } from 'framer-motion';
import { MonitorSmartphone, Settings, ShoppingCart, Car, Wallet, GraduationCap, Cpu, Bot, Sparkles, ArrowRight } from 'lucide-react';

type ServiceItem = {
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  details: string;
  accentFrom: string;
  accentTo: string;
};

const services: ServiceItem[] = [
  { icon: MonitorSmartphone, category: 'Mobile Apps', details: 'Android, iOS, Hybrid, Flutter', accentFrom: '#3BAFDA', accentTo: '#8C75FF' },
  { icon: Settings, category: 'Business Apps', details: 'CRM, ERP, HRMS, Task Automation', accentFrom: '#8C75FF', accentTo: '#3BAFDA' },
  { icon: ShoppingCart, category: 'E-Commerce Apps', details: 'Food Delivery, Marketplace, Subscription Models', accentFrom: '#34D399', accentTo: '#3BAFDA' },
  { icon: Car, category: 'On-Demand Apps', details: 'Cab Booking, Home Services, Repair Apps', accentFrom: '#3BAFDA', accentTo: '#34D399' },
  { icon: Wallet, category: 'FinTech & Payment', details: 'UPI, Wallets, Billing, Invoices', accentFrom: '#F59E0B', accentTo: '#8C75FF' },
  { icon: GraduationCap, category: 'Edu-Tech Apps', details: 'LMS, Student Portals, Tests & Courses', accentFrom: '#8C75FF', accentTo: '#3BAFDA' },
  { icon: Cpu, category: 'IoT / Smart Apps', details: 'Home Automation, Sensor Integration', accentFrom: '#0EA5E9', accentTo: '#22D3EE' },
  { icon: Bot, category: 'AI + Chatbot Systems', details: 'Voice Assistants, NLP Bots', accentFrom: '#8C75FF', accentTo: '#F472B6' },
  { icon: Sparkles, category: 'Custom Apps', details: 'Any App as per Client Requirement', accentFrom: '#3BAFDA', accentTo: '#8C75FF' },
];

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function AppServicesMatrix() {
  return (
    <section className="bg-[#0A0F1F] mt-8">
      <div className="container mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-[#121826] to-[#1b2234]" />
          <div className="relative p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#D9E8FF] font-extrabold text-2xl md:text-3xl tracking-tight">📱 App Development – What We Build</h3>
            </div>

            <div className="rounded-2xl md:rounded-3xl border border-[#2B3561] bg-white/5 backdrop-blur-xl shadow-softGlow p-4 md:p-6">
              <div className="grid grid-cols-2 text-[#8892A6] text-sm md:text-base mb-3">
                <div className="uppercase tracking-wide">Category</div>
                <div className="uppercase tracking-wide">What We Build</div>
              </div>

              <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="divide-y divide-[#1C2340]">
                {services.map((s) => (
                  <motion.div key={s.category} variants={rowVariants} className="group py-4 md:py-5 flex items-start md:items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-3 md:gap-4 min-w-[220px]">
                      <div className="relative h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-xl md:rounded-2xl bg-[#0F162C] border border-[#2B3561] shadow-[0_0_30px_rgba(140,117,255,0.08)]">
                        <s.icon className="h-5 w-5 md:h-6 md:w-6 text-[#D9E8FF]" />
                        <span className="absolute inset-x-2 bottom-0 h-[2px] rounded-full bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(90deg, ${s.accentFrom}, ${s.accentTo})` }} />
                      </div>
                      <div className="relative">
                        <div className="text-[#D9E8FF] font-semibold text-sm md:text-base leading-[26px]">{s.category}</div>
                        <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-[#3BAFDA] to-[#8C75FF] transition-all duration-300 group-hover:w-full" />
                      </div>
                    </div>
                    <div className="text-[#BFC8D9] text-sm md:text-[15px] leading-[26px]">
                      {s.details}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <a href="/#contact" className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#3BAFDA] to-[#8C75FF] text-white shadow-softGlow hover:scale-[1.03] transition-all">
                Build Your App
                <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a href="/portfolio" className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#2B3561] text-[#D9E8FF] bg-[#0F162C]/70 hover:bg-[#0F162C] hover:scale-[1.03] transition-all">
                View Portfolio
                <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
