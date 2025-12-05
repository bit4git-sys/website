import { useEffect, useRef } from 'react';

type StarfieldProps = {
  count?: number;
  speed?: number; // base speed multiplier
  color?: string; // star color
  twinkle?: boolean;
};

export default function Starfield({ count = 140, speed = 0.04, color = '#D9E8FF', twinkle = true }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const { clientWidth, clientHeight } = canvas.parentElement!;
      canvas.width = Math.floor(clientWidth * dpr);
      canvas.height = Math.floor(clientHeight * dpr);
    };
    resize();

    type Star = { x: number; y: number; r: number; v: number; a: number; ta: number };
    const stars: Star[] = [];
    const w = canvas.width;
    const h = canvas.height;
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 1.8 + 0.4;
      const v = speed * (Math.random() * 0.6 + 0.4); // slight variance
      const a = twinkle ? Math.random() * 0.6 + 0.2 : 0.8;
      const ta = twinkle ? (Math.random() * 0.004 + 0.001) : 0; // twinkle delta
      stars.push({ x: Math.random() * w, y: Math.random() * h, r, v, a, ta });
    }

    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.fillStyle = color;
      for (const s of stars) {
        // horizontal drift
        s.x += s.v * dpr;
        if (s.x > canvas.width) s.x -= canvas.width;
        // vertical slight drift
        s.y += s.v * 0.15 * dpr;
        if (s.y > canvas.height) s.y -= canvas.height;
        // twinkle
        if (twinkle) {
          s.a += (Math.random() - 0.5) * s.ta;
          s.a = Math.max(0.15, Math.min(0.85, s.a));
        }
        ctx.globalAlpha = s.a;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    const onResize = () => {
      resize();
    };
    window.addEventListener('resize', onResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [count, speed, color, twinkle]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}
