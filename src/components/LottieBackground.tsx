import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export default function LottieBackground() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const url = new URL('../bg/Background looping animation.json', import.meta.url).href;
    fetch(url)
      .then((res) => res.json())
      .then((json: unknown) => setData(json as Record<string, unknown>))
      .catch(() => setData(null));
  }, []);

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      {data && (
        <div className="w-full h-full">
          <Lottie
            animationData={data}
            loop
            className="w-full h-full"
            style={{ opacity: 0.18, filter: 'saturate(0.7) brightness(0.85)' }}
          />
        </div>
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(2,8,33,0.45) 0%, rgba(2,8,33,0.35) 35%, rgba(2,8,33,0.25) 65%, rgba(2,8,33,0.10) 100%)',
        }}
      />
    </div>
  );
}
