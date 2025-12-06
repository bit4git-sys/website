import { useEffect, useRef, useState } from 'react';
import { Menu, X, Moon, Sun, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import logoImg from '../logo/logo for website.png';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = ['Home', 'About', 'Services', 'Portfolio', 'Careers', 'Contact'];
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const openServices = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setServicesOpen(true);
  };

  const scheduleClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
    }
    closeTimer.current = window.setTimeout(() => {
      setServicesOpen(false);
      closeTimer.current = null;
    }, 180);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-[#131A2C]/80 backdrop-blur-lg shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="group cursor-pointer">
            <img src={logoImg} alt="Bit4Git" className="h-10 w-auto transition-all duration-300 group-hover:scale-105" />
            <div className="h-0.5 w-0 bg-gradient-to-r from-[#1C2340] to-[#2B3561] transition-all duration-300 group-hover:w-full"></div>
          </div>

          <div className="hidden md:flex flex-1 justify-center items-center gap-8">
            {menuItems.map((item) => {
              if (item === 'Services') {
                return (
                  <div key={item} className="relative" onMouseEnter={openServices} onMouseLeave={scheduleClose}>
                    <button type="button" className="inline-flex items-center gap-1 text-[#8892A6] hover:text-[#3BAFDA] transition-colors">
                      <span>Services</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {servicesOpen && (
                      <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-64 p-3 rounded-2xl bg-[#131A2C]/95 border border-[#2B3561] shadow-soft" onMouseEnter={openServices} onMouseLeave={scheduleClose}>
                        <div className="grid grid-cols-1 gap-2">
                          {services.map((s) => (
                            <Link
                              key={s.slug}
                              to={
                                s.slug === 'website-development' ? '/website-development' :
                                s.slug === 'app-development' ? '/app-development' :
                                s.slug === 'cloud-services' ? '/cloud-services' :
                                s.slug === 'it-services' ? '/it-services' :
                                s.slug === 'cybersecurity' ? '/cybersecurity' :
                                s.slug === 'it-consulting' ? '/it-consulting' : `/services/${s.slug}`
                              }
                              className="px-3 py-2 rounded-lg text-[#8892A6] hover:text-[#D9E8FF] hover:bg-[#1C2340]"
                            >
                              {s.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              if (item === 'Careers') {
                return (
                  <Link
                    key={item}
                    to="/careers"
                    className="relative text-[#8892A6] hover:text-[#3BAFDA] transition-colors duration-300 group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#1C2340] to-[#2B3561] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                );
              }
              return (
                <a
                  key={item}
                  href={`/#${item.toLowerCase()}`}
                  className="relative text-[#8892A6] hover:text-[#3BAFDA] transition-colors duration-300 group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#1C2340] to-[#2B3561] transition-all duration-300 group-hover:w-full"></span>
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gradient-to-r from-[#1C2340] to-[#2B3561] hover:from-[#2B3561] hover:to-[#1C2340] transition-all duration-300 hover:scale-105"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-[#D9E8FF]" />
              ) : (
                <Moon className="h-5 w-5 text-[#8C75FF]" />
              )}
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#3BAFDA] hover:text-[#8C75FF] transition-colors"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#131A2C]/95 backdrop-blur-lg animate-slideDown">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            {menuItems.map((item) => {
              if (item === 'Services') {
                return (
                  <div key={item} className="space-y-2">
                    <div className="text-[#BFC8D9] hover:text-[#3BAFDA] transition-colors duration-300 py-2">Services</div>
                    <div className="grid grid-cols-1 gap-1">
                      {services.map((s) => (
                        <Link
                          key={s.slug}
                          to={
                            s.slug === 'website-development' ? '/website-development' :
                            s.slug === 'app-development' ? '/app-development' :
                            s.slug === 'cloud-services' ? '/cloud-services' :
                            s.slug === 'it-services' ? '/it-services' :
                            s.slug === 'cybersecurity' ? '/cybersecurity' :
                            s.slug === 'it-consulting' ? '/it-consulting' : `/services/${s.slug}`
                          }
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-[#8892A6] hover:text-[#D9E8FF] transition-colors duration-300 py-1 pl-3"
                        >
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              if (item === 'Careers') {
                return (
                  <Link
                    key={item}
                    to="/careers"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#BFC8D9] hover:text-[#3BAFDA] transition-colors duration-300 py-2"
                  >
                    {item}
                  </Link>
                );
              }
              return (
                <a
                  key={item}
                  href={`/#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#BFC8D9] hover:text-[#3BAFDA] transition-colors duration-300 py-2"
                >
                  {item}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
