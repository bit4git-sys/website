import Starfield from './Starfield';

export default function BackgroundScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Starfield count={160} speed={0.03} color="#D9E8FF" twinkle />

      <div className="absolute top-24 left-20 w-[28rem] h-[28rem] orbit-wrap" style={{ animation: 'orbitSlow 120s linear infinite' }}>
        <div className="orbit-track"></div>
        <div className="planet"></div>
        <div className="moon" style={{ animation: 'orbitReverse 80s linear infinite' }}></div>
      </div>

      <div className="absolute bottom-24 right-24 w-[28rem] h-[28rem] orbit-wrap" style={{ animation: 'orbitReverse 140s linear infinite' }}>
        <div className="orbit-track"></div>
        <div className="planet secondary"></div>
        <div className="moon" style={{ animation: 'orbitSlow 90s linear infinite' }}></div>
      </div>

      <div className="rocket" style={{ animation: 'rocketFly 60s linear infinite' }}>
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <g opacity="0.65">
            <path d="M60 18 L78 54 L60 48 L42 54 Z" fill="#1C2340" stroke="#2B3561" strokeWidth="2" />
            <path d="M60 48 L72 66 L60 62 L48 66 Z" fill="#131A2C" stroke="#2B3561" strokeWidth="1.5" />
            <circle cx="60" cy="42" r="6" fill="#3BAFDA" />
          </g>
          <g>
            <path d="M60 74 C64 86, 54 92, 60 104" stroke="#8C75FF" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
            <path d="M62 74 C66 86, 58 92, 64 104" stroke="#3BAFDA" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
          </g>
        </svg>
      </div>
    </div>
  );
}

