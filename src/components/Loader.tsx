import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

export default function Loader() {
  const [lottieData, setLottieData] = useState<Record<string, unknown> | null>(null);
  

  useEffect(() => {
    // Load brand booting logo from local file placed at src/bg/boot animation.json
    const url = new URL('../bg/boot animation.json', import.meta.url).href;
    fetch(url)
      .then((res) => res.json())
      .then((json: unknown) => setLottieData(json as Record<string, unknown>))
      .catch(() => {});
  }, []);

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative w-screen h-screen overflow-hidden">

        <div className="relative z-10 w-full h-full flex items-center justify-center" style={{ willChange: 'transform, opacity' }}>
          <div className="w-full h-full">
            {lottieData ? (
              <Lottie
                animationData={lottieData}
                loop={false}
                className="w-full h-full"
                rendererSettings={{ preserveAspectRatio: 'xMidYMid slice', progressiveLoad: true }}
                style={{ filter: 'drop-shadow(0 0 14px rgba(59,175,218,0.25))', willChange: 'transform, opacity' }}
              />
            ) : (
              <span className="text-6xl font-bold animate-pulse bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Bit4Git
              </span>
            )}
          </div>
        </div>
        
      </div>
    </motion.div>
  );
}
