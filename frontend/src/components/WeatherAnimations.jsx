'use client';

// Animated wind turbine
export function WindTurbine({ speed = 12, className = '' }) {
  const duration = Math.max(1, 8 - speed / 5);
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <svg width="32" height="48" viewBox="0 0 32 48" className="drop-shadow-lg">
        {/* Blades */}
        <g
          style={{ transformOrigin: '16px 16px', animation: `spin-slow ${duration}s linear infinite` }}
        >
          <path d="M16 16 L16 2 Q20 8 16 16" fill="white" opacity="0.9" />
          <path d="M16 16 L28 24 Q20 22 16 16" fill="white" opacity="0.9" />
          <path d="M16 16 L4 24 Q12 22 16 16" fill="white" opacity="0.9" />
        </g>
        {/* Center hub */}
        <circle cx="16" cy="16" r="2.5" fill="white" />
        {/* Pole */}
        <rect x="15" y="18" width="2" height="28" fill="white" opacity="0.7" rx="1" />
      </svg>
    </div>
  );
}

// Floating cloud decoration
export function FloatingClouds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Cloud 1 */}
      <svg className="absolute top-8 left-[10%] animate-float-cloud opacity-10" width="120" height="60" viewBox="0 0 120 60">
        <path d="M20 45 Q20 30 35 30 Q30 15 50 15 Q65 5 80 20 Q100 15 100 35 Q110 35 110 45 Z" fill="white" />
      </svg>
      {/* Cloud 2 */}
      <svg className="absolute top-20 right-[15%] animate-float-cloud-slow opacity-[0.06]" width="160" height="80" viewBox="0 0 160 80">
        <path d="M25 60 Q25 40 45 40 Q40 20 65 20 Q85 5 105 25 Q130 18 135 45 Q148 45 148 60 Z" fill="white" />
      </svg>
      {/* Cloud 3 */}
      <svg className="absolute bottom-16 left-[60%] animate-float-cloud opacity-[0.08]" width="100" height="50" viewBox="0 0 100 50" style={{ animationDelay: '4s' }}>
        <path d="M15 38 Q15 25 28 25 Q25 12 42 12 Q55 4 68 18 Q85 12 85 30 Q95 30 95 38 Z" fill="white" />
      </svg>
    </div>
  );
}

// Animated weather icon (larger, with motion)
export function AnimatedWeatherIcon({ icon, size = 80 }) {
  const isDay = icon?.endsWith('d');
  const code = icon?.replace(/[dn]$/, '') || '01';

  if (code === '01') {
    // Clear - glowing sun/moon
    return isDay ? (
      <div className="relative" style={{ width: size, height: size }}>
        <div className="absolute inset-0 rounded-full bg-yellow-300/30 animate-pulse-glow" />
        <svg viewBox="0 0 100 100" width={size} height={size}>
          <circle cx="50" cy="50" r="22" fill="#FBBF24" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <line
              key={i}
              x1="50" y1="50" x2={50 + 35 * Math.cos((angle * Math.PI) / 180)} y2={50 + 35 * Math.sin((angle * Math.PI) / 180)}
              stroke="#FCD34D" strokeWidth="3" strokeLinecap="round" opacity="0.6"
              style={{ transformOrigin: '50px 50px', animation: `pulse-glow 3s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </svg>
      </div>
    ) : (
      <div className="relative" style={{ width: size, height: size }}>
        <div className="absolute inset-2 rounded-full bg-blue-200/20 animate-pulse-glow" />
        <svg viewBox="0 0 100 100" width={size} height={size}>
          <circle cx="45" cy="50" r="22" fill="#CBD5E1" />
          <circle cx="58" cy="42" r="18" fill="#0f172a" />
        </svg>
      </div>
    );
  }

  if (code === '02' || code === '03' || code === '04') {
    // Cloudy
    return (
      <div className="relative" style={{ width: size, height: size }}>
        {isDay && code === '02' && <svg viewBox="0 0 100 100" width={size} height={size} className="absolute">
          <circle cx="65" cy="30" r="16" fill="#FBBF24" opacity="0.8" />
        </svg>}
        <svg viewBox="0 0 100 100" width={size} height={size} className="animate-float-cloud" style={{ animationDuration: '6s' }}>
          <path d="M20 70 Q20 52 38 52 Q34 35 55 35 Q70 22 82 40 Q98 36 98 55 Q105 55 105 70 Z" fill="white" opacity="0.95" />
        </svg>
      </div>
    );
  }

  if (code === '09' || code === '10') {
    // Rain
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" width={size} height={size}>
          <path d="M18 55 Q18 40 33 40 Q30 26 48 26 Q60 16 72 30 Q88 25 88 45 Q96 45 96 55 Z" fill="white" opacity="0.9" className="animate-float-cloud" style={{ animationDuration: '8s' }} />
          {[30, 45, 60, 75].map((x, i) => (
            <line key={i} x1={x} y1="65" x2={x - 3} y2="80" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" opacity="0.7"
              style={{ animation: `rain-drop 1.2s linear infinite`, animationDelay: `${i * 0.3}s` }} />
          ))}
        </svg>
      </div>
    );
  }

  if (code === '13') {
    // Snow
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" width={size} height={size}>
          <path d="M18 50 Q18 35 33 35 Q30 22 48 22 Q60 12 72 26 Q88 20 88 40 Q96 40 96 50 Z" fill="white" opacity="0.9" />
          {[28, 42, 56, 70].map((x, i) => (
            <text key={i} x={x} y="75" fill="white" fontSize="10" opacity="0.8"
              style={{ animation: `rain-drop 2s linear infinite`, animationDelay: `${i * 0.5}s` }}>*</text>
          ))}
        </svg>
      </div>
    );
  }

  if (code === '11') {
    // Thunderstorm
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" width={size} height={size}>
          <path d="M18 48 Q18 33 33 33 Q30 20 48 20 Q60 10 72 24 Q88 18 88 38 Q96 38 96 48 Z" fill="#94A3B8" opacity="0.95" />
          <path d="M48 52 L55 52 L50 65 L58 65 L45 85 L50 70 L43 70 Z" fill="#FCD34D" className="animate-pulse-glow" style={{ animationDuration: '1.5s' }} />
        </svg>
      </div>
    );
  }

  // Default
  return (
    <div className="relative animate-bounce-subtle" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size}>
        {isDay && <circle cx="65" cy="28" r="16" fill="#FBBF24" opacity="0.7" />}
        <path d="M20 65 Q20 48 35 48 Q32 33 50 33 Q63 22 75 36 Q90 30 90 50 Q100 50 100 65 Z" fill="white" opacity="0.9" />
      </svg>
    </div>
  );
}

// Wind direction compass
export function WindCompass({ deg = 0, speed = 0 }) {
  return (
    <div className="relative w-12 h-12">
      <svg viewBox="0 0 48 48" width="48" height="48">
        <circle cx="24" cy="24" r="22" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
        <circle cx="24" cy="24" r="18" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" />
        {/* N E S W marks */}
        <text x="24" y="8" fill="white" fontSize="6" textAnchor="middle" opacity="0.5">N</text>
        <text x="42" y="26" fill="white" fontSize="6" textAnchor="middle" opacity="0.5">E</text>
        <text x="24" y="44" fill="white" fontSize="6" textAnchor="middle" opacity="0.5">S</text>
        <text x="6" y="26" fill="white" fontSize="6" textAnchor="middle" opacity="0.5">W</text>
        {/* Arrow */}
        <g style={{ transformOrigin: '24px 24px', transform: `rotate(${deg}deg)` }}>
          <path d="M24 8 L27 20 L24 18 L21 20 Z" fill="white" opacity="0.9" />
          <path d="M24 40 L27 28 L24 30 L21 28 Z" fill="white" opacity="0.4" />
        </g>
        <circle cx="24" cy="24" r="2" fill="white" />
      </svg>
    </div>
  );
}
