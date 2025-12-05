import { useEffect, useRef } from 'react';

type Node = { x: number; y: number; r: number; vx: number; vy: number; pulse: number; pulseDelta: number };

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const parent = canvas.parentElement!;
      const { clientWidth, clientHeight } = parent;
      canvas.width = Math.floor(clientWidth * dpr);
      canvas.height = Math.floor(clientHeight * dpr);
    };
    resize();

    const nodes: Node[] = [];
    const baseCount = Math.floor((canvas.width * canvas.height) / (36000 * dpr));
    const isSmall = (canvas.width / dpr) < 640;
    const count = Math.floor(baseCount * (isSmall ? 0.6 : 1));
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.6,
        vx: (Math.random() - 0.5) * (isSmall ? 0.015 : 0.02),
        vy: (Math.random() - 0.5) * (isSmall ? 0.015 : 0.02),
        pulse: Math.random() * 0.35 + 0.18,
        pulseDelta: (Math.random() - 0.5) * 0.002,
      });
    }

    const hexCenter = { x: canvas.width / 2, y: canvas.height / 2.2 };
    const hexRadius = Math.min(canvas.width, canvas.height) * 0.12;
    let hexAngle = 0;

    const drawBlurSpots = () => {
      const spots = 3;
      for (let i = 0; i < spots; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const r = Math.random() * 180 + 120;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, 'rgba(5,11,22,0.25)');
        g.addColorStop(1, 'rgba(5,11,22,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // deep navy gradient background
      const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bg.addColorStop(0, '#020821');
      bg.addColorStop(1, '#050B16');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const heroH = window.innerHeight;

      // cyber mesh grid (low contrast, wavy lines)
      const gridSpacing = 140 * dpr;
      timeRef.current += 0.0015;
      ctx.save();
      ctx.strokeStyle = 'rgba(217,232,255,0.06)';
      ctx.lineWidth = 0.6 * dpr;
      // vertical wave lines
      for (let x = 0; x <= canvas.width; x += gridSpacing) {
        ctx.beginPath();
        for (let y = 0; y <= canvas.height; y += 20 * dpr) {
          const offset = Math.sin((y / (220 * dpr)) + timeRef.current + x * 0.0008) * (6 * dpr);
          const px = x + offset;
          const py = y;
          if (y === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      // horizontal wave lines
      for (let y = 0; y <= canvas.height; y += gridSpacing) {
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 20 * dpr) {
          const offset = Math.cos((x / (220 * dpr)) + timeRef.current + y * 0.0008) * (6 * dpr);
          const px = x;
          const py = y + offset;
          if (x === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      ctx.restore();

      // blurred background spots (very subtle)
      ctx.save();
      ctx.globalAlpha = 0.12;
      drawBlurSpots();
      ctx.restore();

      // nodes movement and connections
      ctx.save();
      for (const n of nodes) {
        n.x += n.vx * dpr;
        n.y += n.vy * dpr;
        if (n.x < 0) n.x += canvas.width; else if (n.x > canvas.width) n.x -= canvas.width;
        if (n.y < 0) n.y += canvas.height; else if (n.y > canvas.height) n.y -= canvas.height;
        n.pulse += n.pulseDelta;
        if (n.pulse < 0.15 || n.pulse > 0.65) n.pulseDelta *= -1;
      }

      // connect nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < (140 * dpr) * (140 * dpr)) {
            const dist = Math.sqrt(d2);
            const baseAlpha = Math.max(0, 0.12 - dist / (140 * dpr) * 0.12);
            const avgY = (a.y + b.y) * 0.5;
            const fadeTop = avgY < heroH * 0.8 ? Math.max(0, (avgY - heroH * 0.3) / (heroH * 0.5)) : 1;
            const alpha = baseAlpha * fadeTop;
            ctx.strokeStyle = `rgba(217,232,255,${alpha})`;
            ctx.lineWidth = 0.6 * dpr;
            if ((i + j) % 7 === 0) {
              ctx.setLineDash([3 * dpr, 3 * dpr]);
            } else {
              ctx.setLineDash([]);
            }
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // draw nodes (some teal/blue glow)
      for (const n of nodes) {
        const isAccent = (Math.floor(n.x + n.y) % 23) === 0;
        const base = isAccent ? (Math.floor(n.x) % 2 === 0 ? '#4CC9A7' : '#3BAFDA') : '#D9E8FF';
        ctx.save();
        const fadeTop = n.y < heroH * 0.8 ? Math.max(0, (n.y - heroH * 0.3) / (heroH * 0.5)) : 1;
        ctx.globalAlpha = (isAccent ? 0.2 : 0.18) * fadeTop;
        ctx.fillStyle = base;
        ctx.beginPath();
        ctx.arc(n.x, n.y, (n.r + n.pulse * 0.7) * dpr, 0, Math.PI * 2);
        ctx.fill();
        if (isAccent) {
          ctx.globalAlpha = 0.08 * fadeTop;
          ctx.beginPath();
          ctx.arc(n.x, n.y, (n.r * 6) * dpr, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // central wireframe hexagon (dotted + solid)
      hexAngle += 0.0008;
      const points: Array<{ x: number; y: number }> = [];
      for (let k = 0; k < 6; k++) {
        const ang = hexAngle + (Math.PI / 3) * k;
        points.push({ x: hexCenter.x + Math.cos(ang) * hexRadius, y: hexCenter.y + Math.sin(ang) * hexRadius });
      }
      ctx.save();
      ctx.lineWidth = 0.8 * dpr;
      ctx.strokeStyle = 'rgba(217,232,255,0.16)';
      ctx.setLineDash([4 * dpr, 3 * dpr]);
      ctx.beginPath();
      for (let k = 0; k < points.length; k++) {
        const a = points[k];
        const b = points[(k + 1) % points.length];
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = 'rgba(217,232,255,0.08)';
      ctx.beginPath();
      for (let k = 0; k < points.length; k++) {
        const b = points[(k + 2) % points.length];
        const a = points[k];
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
      }
      ctx.stroke();
      ctx.restore();

      ctx.save();
      const topFade = ctx.createLinearGradient(0, 0, 0, heroH * 0.7);
      topFade.addColorStop(0, 'rgba(2,8,33,0.35)');
      topFade.addColorStop(1, 'rgba(2,8,33,0)');
      ctx.fillStyle = topFade;
      ctx.fillRect(0, 0, canvas.width, heroH * 0.7);
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
  }, []);

  return (
    <div className="absolute inset-0 network-bg">
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
    </div>
  );
}
