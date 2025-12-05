import { motion } from 'framer-motion';
import { MonitorSmartphone, Settings, ShoppingCart, Car, Wallet, GraduationCap, Cpu, Bot, Sparkles } from 'lucide-react';

type Badge = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  accentFrom: string;
  accentTo: string;
};

const badges: Badge[] = [
  { icon: MonitorSmartphone, title: 'Mobile Apps', description: 'Android • iOS • Hybrid • Flutter', accentFrom: '#3BAFDA', accentTo: '#8C75FF' },
  { icon: Settings, title: 'Business Apps', description: 'CRM • ERP • HRMS • Automations', accentFrom: '#8C75FF', accentTo: '#3BAFDA' },
  { icon: ShoppingCart, title: 'E-Commerce Apps', description: 'Food Delivery • Marketplace • Subscription', accentFrom: '#34D399', accentTo: '#3BAFDA' },
  { icon: Car, title: 'On-Demand Apps', description: 'Cab Booking • Services • Repair/Home', accentFrom: '#3BAFDA', accentTo: '#34D399' },
  { icon: Wallet, title: 'FinTech & Payments', description: 'UPI • Wallets • Billing • Invoices', accentFrom: '#F59E0B', accentTo: '#8C75FF' },
  { icon: GraduationCap, title: 'Edu-Tech Apps', description: 'LMS • Portals • Tests • Courses', accentFrom: '#8C75FF', accentTo: '#3BAFDA' },
  { icon: Cpu, title: 'IoT & Smart Apps', description: 'Automation • Sensors • Remote Control', accentFrom: '#0EA5E9', accentTo: '#22D3EE' },
  { icon: Bot, title: 'AI & Chatbots', description: 'NLP Bots • Voice Assistants • Recommenders', accentFrom: '#8C75FF', accentTo: '#F472B6' },
  { icon: Sparkles, title: 'Custom Solutions', description: 'Any App as per requirements', accentFrom: '#3BAFDA', accentTo: '#8C75FF' },
];

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function AppServiceBadgesGrid() {
  return (
    <section className="bg-[#0d1117]">
      <div className="relative">
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(650px_circle_at_0%_0%,rgba(140,117,255,0.06),transparent_40%),radial-gradient(650px_circle_at_100%_100%,rgba(59,175,218,0.06),transparent_40%)]" />
        <div className="container mx-auto px-6 relative z-10 py-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[#D9E8FF] font-extrabold text-2xl md:text-3xl tracking-tight">Premium Services — Badge Grid</h3>
          </div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((b) => (
              <motion.div
                key={b.title}
                variants={cardVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                className="group relative p-5 rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-xl border border-[#2B3561] shadow-[0_12px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_0_0_2px_rgba(140,117,255,0.45),0_30px_60px_rgba(59,175,218,0.18)]"
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="relative h-12 w-12 flex items-center justify-center rounded-xl md:rounded-2xl bg-[#0F162C] border border-[#2B3561]">
                      <b.icon className="h-6 w-6 text-[#D9E8FF]" />
                      <span className="absolute inset-x-2 bottom-0 h-[2px] rounded-full bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(90deg, ${b.accentFrom}, ${b.accentTo})` }} />
                    </div>
                    <div className="flex-1">
                      <div className="text-[#D9E8FF] font-semibold text-base leading-[26px]">{b.title}</div>
                      <div className="text-[#8892A6] text-sm leading-[24px] mt-1">{b.description}</div>
                      <div className="mt-3 h-[1px] bg-gradient-to-r from-transparent via-[#2B3561] to-transparent opacity-70 group-hover:from-[#3BAFDA] group-hover:via-[#8C75FF] group-hover:to-transparent transition-all" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

