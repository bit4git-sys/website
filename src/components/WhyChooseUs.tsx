import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import htmlLogo from '../icons/html.png';
import cssLogo from '../icons/cssl.png';
import jsLogo from '../icons/javascript.png';
import phpLogo from '../icons/php.png';
import bootstrapLogo from '../icons/bootstrap.png';
import jqueryLogo from '../icons/jquery.png';
import sqlLogo from '../icons/sql.png';
import amazonLogo from '../icons/amazon.svg';
import splunkLogo from '../icons/splunk.jpeg';

export default function WhyChooseUs() {
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

  const logos: Array<{ src: string; alt: string }> = [
    { src: htmlLogo, alt: 'HTML5' },
    { src: cssLogo, alt: 'CSS3' },
    { src: jsLogo, alt: 'JavaScript' },
    { src: phpLogo, alt: 'PHP' },
    { src: bootstrapLogo, alt: 'Bootstrap' },
    { src: jqueryLogo, alt: 'jQuery' },
    { src: sqlLogo, alt: 'SQL' },
    { src: amazonLogo, alt: 'Amazon Web Services' },
    { src: splunkLogo, alt: 'Splunk' },
  ];

  return (
    <section id="tech-ingredients" ref={sectionRef} className="relative py-24 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className={`grid md:grid-cols-2 gap-10 items-start transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-[#D9E8FF]">Our Tech </span>
              <span className="bg-gradient-to-r from-[#3BAFDA] to-[#8C75FF] bg-clip-text text-transparent">Ingredients</span>
            </h2>
            <div className="space-y-4 text-[#8892A6] max-w-2xl">
              <p>
                With strong technical capability and a team of skilled professionals, we at Bit4Git Technologies utilize a wide spectrum of technologies to build powerful and future-ready digital solutions.
              </p>
              <p>
                From core web technologies like HTML, CSS, and JavaScript, to reliable backend stacks such as PHP, Python, and SQL, we ensure that every product stands on a strong and secure foundation.
              </p>
              <p>
                Our expertise expands across modern frameworks and development tools, including Bootstrap and TailwindCSS for responsive UI, React for dynamic experience-driven applications, and Node.js / Laravel for scalable backend development. For cloud deployments, DevOps practices, and cybersecurity-focused systems, we combine engineering excellence with innovative thinking.
              </p>
              <p>
                With every project, our team applies precision, creativity, and technical depth to deliver solutions that not only meet expectations — but consistently surpass them.
              </p>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-3 gap-6">
              {logos.map((l, idx) => (
                <motion.div key={l.alt} className="p-4 rounded-2xl bg-[#172238] border border-[#2B3561] flex items-center justify-center shadow-soft"
                  initial={{ opacity: 0, y: 24 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + idx * 0.06 }}
                >
                  <img src={l.src} alt={l.alt} className="w-20 h-20 object-contain" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
