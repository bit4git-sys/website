import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Users, Heart, Shield, Briefcase, Home, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type Opening = {
  title: string;
  type: 'Internship' | 'Full-time';
  mode: 'Remote' | 'On-site';
  description: string;
  skills: string[];
  startDate: string;
  duration: string;
  applyPath: string;
};

const openings: Opening[] = [
  {
    title: 'Web Development Intern',
    type: 'Internship',
    mode: 'Remote',
    description: 'Work on real projects, sharpen coding skills, and learn modern web technologies. Open to freshers and passionate learners.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React.js'],
    startDate: 'December 11, 2025',
    duration: '1 Month',
    applyPath: '/#contact',
  },
  {
    title: 'Cybersecurity Intern',
    type: 'Internship',
    mode: 'Remote',
    description: 'Gain practical experience with cybersecurity tools and real-world scenarios. Open to passionate learners and freshers.',
    skills: ['Networking', 'Cyber Hygiene', 'Wireshark', 'Linux'],
    startDate: 'December 11, 2025',
    duration: '1 Month',
    applyPath: '/#contact',
  },
];

export default function CareersPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [filterType, setFilterType] = useState<'All' | 'Internship' | 'Full-time'>('All');
  const [filterMode, setFilterMode] = useState<'All' | 'Remote' | 'On-site'>('All');
  const filtered = openings.filter((o) => (filterType === 'All' || o.type === filterType) && (filterMode === 'All' || o.mode === filterMode));

  return (
    <div className="min-h-screen bg-[#0B1220] text-[#D9E8FF]">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <section className="pt-32 pb-20 bg-gradient-to-b from-[#0B1220] via-[#11192c] to-[#121a2e]">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-extrabold text-center">
            Careers at Bit4Git — Join India’s Elite Team
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-5 text-center text-[#BFC8D9] max-w-3xl mx-auto">
            Join Bit4Git and work with the brightest minds to build modern solutions. We’re looking for passionate individuals to help shape the future.
          </motion.p>
          <div className="mt-10 flex justify-center">
            <a href="#openings" className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#3BAFDA] to-[#8C75FF] text-white font-semibold shadow-softGlow hover:scale-105 transition-transform">View Open Positions</a>
          </div>
        </div>
      </section>

      <section id="openings" className="py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Current Openings</h2>
          <p className="mt-4 text-center text-[#BFC8D9]">Explore available positions and find the perfect fit.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => { setFilterType('All'); setFilterMode('All'); }} className={`px-4 py-2 rounded-lg ${(filterType === 'All' && filterMode === 'All') ? 'bg-[#3BAFDA] text-[#0B1220]' : 'bg-[#131A2C] text-[#BFC8D9]'} transition-colors`}>All Positions</button>
            <button onClick={() => setFilterType('Full-time')} className={`px-4 py-2 rounded-lg ${filterType === 'Full-time' ? 'bg-[#3BAFDA] text-[#0B1220]' : 'bg-[#131A2C] text-[#BFC8D9]'} transition-colors`}>Full‑time</button>
            <button onClick={() => setFilterType('Internship')} className={`px-4 py-2 rounded-lg ${filterType === 'Internship' ? 'bg-[#3BAFDA] text-[#0B1220]' : 'bg-[#131A2C] text-[#BFC8D9]'} transition-colors`}>Internships</button>
            <button onClick={() => setFilterMode('Remote')} className={`px-4 py-2 rounded-lg ${filterMode === 'Remote' ? 'bg-[#3BAFDA] text-[#0B1220]' : 'bg-[#131A2C] text-[#BFC8D9]'} transition-colors`}>Remote</button>
            <button onClick={() => setFilterMode('On-site')} className={`px-4 py-2 rounded-lg ${filterMode === 'On-site' ? 'bg-[#3BAFDA] text-[#0B1220]' : 'bg-[#131A2C] text-[#BFC8D9]'} transition-colors`}>On‑site</button>
          </div>

          <div className="mt-12 space-y-8">
            {filtered.length === 0 && (
              <div className="rounded-2xl bg-[#0e1628] border border-[#223055] shadow-soft p-10 text-center">
                <div className="text-2xl font-semibold">Coming Soon</div>
                <div className="mt-2 text-[#BFC8D9]">No {filterType !== 'All' ? filterType.toLowerCase() + ' ' : ''}{filterMode !== 'All' ? filterMode.toLowerCase() + ' ' : ''}openings at the moment.</div>
              </div>
            )}
            {filtered.map((o, i) => (
              <div key={i} className="rounded-2xl bg-[#0e1628] border border-[#223055] shadow-soft p-7 hover:shadow-xl transition-shadow">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-3xl">
                    <h3 className="text-2xl font-semibold">{o.title}</h3>
                    <div className="h-0.5 w-16 bg-gradient-to-r from-[#3BAFDA] to-[#8C75FF] mt-2"></div>
                    <p className="mt-3 text-[#BFC8D9]">{o.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-[#1C2340] text-[#BFC8D9] text-xs md:text-sm">{o.type}</span>
                    <span className="px-3 py-1 rounded-lg bg-[#1C2340] text-[#BFC8D9] text-xs md:text-sm">{o.mode}</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-[#8892A6]">Key Skills</div>
                    <div className="mt-2 text-[#D9E8FF]">{o.skills.join(', ')}</div>
                  </div>
                  <div>
                    <div className="text-[#8892A6]">Start Date</div>
                    <div className="mt-2 text-[#D9E8FF]">{o.startDate}</div>
                  </div>
                  <div>
                    <div className="text-[#8892A6]">Duration</div>
                    <div className="mt-2 text-[#D9E8FF]">{o.duration}</div>
                  </div>
                </div>

                <div className="mt-7 flex justify-end">
                  <Link to={o.applyPath} className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#3BAFDA] to-[#8C75FF] text-white font-semibold shadow-softGlow hover:scale-105 transition-transform flex items-center gap-2">
                    Apply Now
                    <Send className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Why Join Bit4Git?</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-[#121a2e] border border-[#2B3561] p-6">
              <Rocket className="h-6 w-6 text-[#F59E0B]" />
              <div className="mt-3 font-semibold">Cutting‑Edge Projects</div>
              <div className="mt-1 text-[#BFC8D9]">Work with the latest technologies and tools.</div>
            </div>
            <div className="rounded-2xl bg-[#121a2e] border border-[#2B3561] p-6">
              <Briefcase className="h-6 w-6 text-[#3BAFDA]" />
              <div className="mt-3 font-semibold">Professional Growth</div>
              <div className="mt-1 text-[#BFC8D9]">Mentorship, training, and certification support.</div>
            </div>
            <div className="rounded-2xl bg-[#121a2e] border border-[#2B3561] p-6">
              <Heart className="h-6 w-6 text-[#F472B6]" />
              <div className="mt-3 font-semibold">Wellbeing</div>
              <div className="mt-1 text-[#BFC8D9]">Supportive culture and flexible work options.</div>
            </div>
            <div className="rounded-2xl bg-[#121a2e] border border-[#2B3561] p-6">
              <Users className="h-6 w-6 text-[#8C75FF]" />
              <div className="mt-3 font-semibold">Collaborative Culture</div>
              <div className="mt-1 text-[#BFC8D9]">Learn with experts who love to share knowledge.</div>
            </div>
            <div className="rounded-2xl bg-[#121a2e] border border-[#2B3561] p-6">
              <Shield className="h-6 w-6 text-[#F59E0B]" />
              <div className="mt-3 font-semibold">Impactful Work</div>
              <div className="mt-1 text-[#BFC8D9]">Solve real problems for businesses and users.</div>
            </div>
            <div className="rounded-2xl bg-[#121a2e] border border-[#2B3561] p-6">
              <Home className="h-6 w-6 text-[#22D3EE]" />
              <div className="mt-3 font-semibold">Remote Friendly</div>
              <div className="mt-1 text-[#BFC8D9]">Options for remote engagement when applicable.</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
