import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import LottieBackground from './components/LottieBackground';

function App() {
  // Show loader on first visit in a tab AND on hard reloads
  const [loading, setLoading] = useState(() => {
    const navEntry = (performance.getEntriesByType?.('navigation')?.[0] as PerformanceNavigationTiming | undefined);
    const isReload = !!navEntry && navEntry.type === 'reload';
    const hasSeen = !!sessionStorage.getItem('hasSeenLoader');
    return isReload || !hasSeen;
  });
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // If loader is needed (first visit in this session), show it then mark as seen
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('hasSeenLoader', 'true');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark' : ''}`}>
      <div className="fixed inset-0 pointer-events-none -z-10">
        <LottieBackground />
      </div>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <Loader />
          </motion.div>
        ) : (
          <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Hero />
            <About />
            <Services />
            <WhyChooseUs />
            <Portfolio />
            <Testimonials />
            <Contact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
