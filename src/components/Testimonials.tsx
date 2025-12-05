import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
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

  const testimonials = [
    {
      name: 'Client Review',
      role: '',
      content: 'Bit4Git transformed our digital presence and delivered a high-quality website with exceptional performance.',
      rating: 5,
      image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      name: 'Client Review',
      role: '',
      content: 'Their cloud and IT services helped us scale without downtime.',
      rating: 5,
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    {
      name: 'Client Review',
      role: '',
      content: 'Professional, secure, and highly reliable. A perfect partner for cybersecurity services.',
      rating: 5,
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section
      id="testimonials"
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
            <span className="text-[#D9E8FF]">Client Testimonials</span>
          </h2>
          <p
            className={`text-[#BFC8D9] text-lg max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Hear what our clients say about working with us
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) => (
                index === currentSlide ? (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                <div className="p-8 md:p-12 rounded-2xl card-overlay transition-all duration-500 shadow-soft">
                  <Quote className="h-12 w-12 text-[#3BAFDA]/30 mb-6" />

                  <p className="text-[#BFC8D9] text-lg md:text-xl mb-8 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full overflow-hidden ring-2 ring-[#2B3561]">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h4 className="text-[#D9E8FF] font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-[#8892A6] text-sm">{testimonial.role}</p>
                    </div>

                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-[#4CC9A7] fill-[#4CC9A7]" />
                      ))}
                    </div>
                  </div>
                    </div>
                  </motion.div>
                ) : null
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-12 bg-gradient-to-r from-[#3BAFDA] to-[#8C75FF]'
                    : 'w-2 bg-[#172238] hover:bg-[#1C2340]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
