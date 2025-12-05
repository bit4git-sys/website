import { useEffect, useRef, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { ExternalLink, Globe } from 'lucide-react';
import forebrainImg from '../project icons/forebrain.png';

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  

  type Project = {
    title: string;
    category: string;
    image: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    url?: string;
  };

  const projects: Project[] = [
    {
      title: 'Forebrain',
      category: 'Web Development',
      image: forebrainImg,
      icon: Globe,
      color: 'cyan',
      url: 'https://www.forebrain.in/',
    },
  ];

  const filters = ['All', 'Web Development', 'App Development', 'Cloud Services', 'Cybersecurity'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative pt-12 pb-24 bg-transparent overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="text-[#D9E8FF]">Our Work Speaks for Itself</span>
          </h2>
          <p
            className={`text-[#BFC8D9] text-lg max-w-3xl mx-auto mb-8 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            We have built secure, high-performance websites, cloud infrastructures, mobile apps, and cybersecurity frameworks for multiple businesses across industries.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter, index) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-[#3BAFDA] to-[#8C75FF] text-white scale-105 shadow-softGlow'
                    : 'bg-[#131A2C] text-[#8892A6] hover:text-[#D9E8FF] hover:bg-[#172238]'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${300 + index * 50}ms` }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div key={project.title} initial={{ opacity: 0, y: 24 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: index * 0.08 }}>
            <Tilt
              className={`group relative overflow-hidden rounded-2xl transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              glareEnable={true}
              glareMaxOpacity={0.2}
            >
              <div className="relative h-80 overflow-hidden rounded-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1F] via-[#131A2C]/70 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>

                <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-[#1C2340] backdrop-blur-sm">
                      <project.icon className="h-6 w-6 text-[#3BAFDA]" />
                    </div>
                    <span className="text-sm text-[#8892A6] font-semibold">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#D9E8FF] mb-2">{project.title}</h3>

                  <div className="flex items-center gap-2 text-[#3BAFDA] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <a href={project.url ?? '#'} target="_blank" rel="noopener noreferrer" className="text-sm">View Project</a>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <a href={project.url ?? '#'} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-gradient-to-r from-[#3BAFDA] to-[#8C75FF] hover:scale-105 transition-transform duration-300 shadow-softGlow btn-hoverGlow">
                    <ExternalLink className="h-5 w-5 text-white" />
                  </a>
                </div>
              </div>
            </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
