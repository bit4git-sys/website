import { Linkedin, Instagram, Youtube, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const links = {
    services: ['Web Development', 'App Development', 'Cloud Services', 'IT Services', 'Cybersecurity', 'IT Consulting'],
    company: ['Home', 'About', 'Services', 'Portfolio', 'Contact'],
    legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'],
  };

  const socials = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="relative bg-transparent overflow-hidden py-8 sm:py-12 lg:py-16 xl:py-20">

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="group mb-6">
              <h2 className="text-4xl font-bold text-[#D9E8FF] group-hover:scale-105 transition-transform duration-300 inline-block">
                Bit4Git
              </h2>
              <div className="h-1 w-0 bg-gradient-to-r from-[#1C2340] to-[#2B3561] transition-all duration-300 group-hover:w-32"></div>
            </div>
            <p className="text-[#BFC8D9] mb-6 leading-relaxed">
              Bit4Git – IT Solutions for a Secure Digital Future
            </p>
            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="group p-3 rounded-full card-overlay transition-all duration-300 hover:scale-105 shadow-soft"
                >
                  <social.icon className="h-5 w-5 text-[#3BAFDA] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[#D9E8FF] font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              {links.services.map((link) => (
                <li key={link}>
                  <a
                    href="#services"
                    className="text-[#8892A6] hover:text-[#3BAFDA] transition-colors duration-300 relative group"
                  >
                    <span className="relative">
                      {link}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2B3561] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#D9E8FF] font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[#8892A6] hover:text-[#3BAFDA] transition-colors duration-300 relative group"
                  >
                    <span className="relative">
                      {link}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2B3561] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#D9E8FF] font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[#8892A6] hover:text-[#3BAFDA] transition-colors duration-300 relative group"
                  >
                    <span className="relative">
                      {link}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2B3561] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1C2340]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#8892A6] text-sm">
              © 2025 Bit4Git. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-[#8892A6] text-sm">Built with passion and innovation</span>
              <div className="h-2 w-2 rounded-full bg-[#3BAFDA]"></div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-4 rounded-full bg-gradient-to-r from-[#3BAFDA] to-[#8C75FF] text-white shadow-softGlow hover:scale-105 transition-all duration-300 z-50 group"
      >
        <ArrowUp className="h-6 w-6 group-hover:-translate-y-1 transition-transform" />
      </button>

      
    </footer>
  );
}
