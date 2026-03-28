import { getCountryCode } from '@/lib/countryConfig';

// Subtle patriotic SVG emblems for hero background
export default function CountryEmblem({ className = '' }) {
  const code = getCountryCode();

  return (
    <div className={`pointer-events-none select-none ${className}`}>
      {code === 'TR' && <TurkeyEmblem />}
      {code === 'AZ' && <AzerbaijanEmblem />}
      {code === 'KZ' && <KazakhstanEmblem />}
      {code === 'UZ' && <UzbekistanEmblem />}
      {code === 'TM' && <TurkmenistanEmblem />}
      {code === 'KG' && <KyrgyzstanEmblem />}
      {code === 'TJ' && <TajikistanEmblem />}
    </div>
  );
}

// Turkey - crescent and star
function TurkeyEmblem() {
  return (
    <svg viewBox="0 0 400 400" width="400" height="400" className="opacity-[0.06]">
      <circle cx="160" cy="200" r="100" fill="white" />
      <circle cx="180" cy="200" r="80" fill="currentColor" className="text-red-600" />
      <polygon points="270,200 240,215 250,185 225,205 255,205" fill="white" transform="rotate(15, 255, 200) scale(2.5) translate(-155, -120)" />
      {/* Simplified star */}
      <path d="M290 180 L296 198 L315 198 L300 210 L306 228 L290 216 L274 228 L280 210 L265 198 L284 198 Z" fill="white" />
    </svg>
  );
}

// Azerbaijan - crescent, star, and fire
function AzerbaijanEmblem() {
  return (
    <svg viewBox="0 0 400 400" width="400" height="400" className="opacity-[0.06]">
      {/* Crescent */}
      <circle cx="180" cy="200" r="90" fill="white" />
      <circle cx="200" cy="200" r="72" fill="currentColor" className="text-blue-600" />
      {/* Star */}
      <path d="M250 170 L258 194 L283 194 L263 209 L270 233 L250 218 L230 233 L237 209 L217 194 L242 194 Z" fill="white" />
      {/* Fire symbol - 8 pointed */}
      <path d="M200 80 Q210 110 200 130 Q190 110 200 80" fill="white" opacity="0.5" />
      <path d="M160 100 Q180 120 175 140 Q165 115 160 100" fill="white" opacity="0.4" />
      <path d="M240 100 Q220 120 225 140 Q235 115 240 100" fill="white" opacity="0.4" />
    </svg>
  );
}

// Kazakhstan - sun with 32 rays and eagle
function KazakhstanEmblem() {
  return (
    <svg viewBox="0 0 400 400" width="400" height="400" className="opacity-[0.06]">
      {/* Sun */}
      <circle cx="200" cy="200" r="60" fill="white" />
      {/* Rays */}
      {Array.from({ length: 32 }).map((_, i) => {
        const angle = (i * 360) / 32;
        const rad = (angle * Math.PI) / 180;
        const x1 = 200 + 70 * Math.cos(rad);
        const y1 = 200 + 70 * Math.sin(rad);
        const x2 = 200 + 110 * Math.cos(rad);
        const y2 = 200 + 110 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth={i % 2 === 0 ? "3" : "1.5"} />;
      })}
      {/* Simplified eagle silhouette */}
      <path d="M200 160 C220 140 250 150 240 170 C260 160 270 180 250 190 L200 180 L150 190 C130 180 140 160 160 170 C150 150 180 140 200 160Z" fill="white" opacity="0.8" />
    </svg>
  );
}

// Uzbekistan - crescent and stars
function UzbekistanEmblem() {
  return (
    <svg viewBox="0 0 400 400" width="400" height="400" className="opacity-[0.06]">
      {/* Crescent */}
      <circle cx="160" cy="170" r="50" fill="white" />
      <circle cx="175" cy="165" r="42" fill="currentColor" className="text-blue-600" />
      {/* 12 stars in 3 rows */}
      {[
        [220, 140], [245, 140], [270, 140],
        [220, 165], [245, 165], [270, 165], [295, 165],
        [220, 190], [245, 190], [270, 190], [295, 190], [320, 190],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" fill="white" />
      ))}
      {/* Ornamental border pattern */}
      <rect x="100" y="280" width="200" height="4" rx="2" fill="white" opacity="0.4" />
      <rect x="120" y="290" width="160" height="3" rx="1.5" fill="white" opacity="0.3" />
    </svg>
  );
}

// Turkmenistan - 5 carpet guls (simplified)
function TurkmenistanEmblem() {
  return (
    <svg viewBox="0 0 400 400" width="400" height="400" className="opacity-[0.06]">
      {/* 5 carpet medallions */}
      {[140, 180, 220, 260, 300].map((y, i) => (
        <g key={i}>
          <rect x="175" y={y - 15} width="50" height="30" rx="4" fill="none" stroke="white" strokeWidth="2" />
          <rect x="185" y={y - 10} width="30" height="20" rx="2" fill="none" stroke="white" strokeWidth="1" />
          <circle cx="200" cy={y} r="5" fill="white" />
        </g>
      ))}
      {/* Crescent and stars */}
      <circle cx="200" cy="90" r="25" fill="white" />
      <circle cx="210" cy="88" r="20" fill="currentColor" className="text-green-700" />
      {[170, 185, 215, 230].map((x, i) => (
        <circle key={i} cx={x} cy={i < 2 ? 60 : 55} r="4" fill="white" />
      ))}
    </svg>
  );
}

// Kyrgyzstan - sun with 40 rays and tunduk
function KyrgyzstanEmblem() {
  return (
    <svg viewBox="0 0 400 400" width="400" height="400" className="opacity-[0.06]">
      {/* Tunduk (yurt crown) */}
      <circle cx="200" cy="200" r="60" fill="none" stroke="white" strokeWidth="3" />
      <circle cx="200" cy="200" r="40" fill="none" stroke="white" strokeWidth="2" />
      {/* Cross lines of tunduk */}
      <line x1="160" y1="200" x2="240" y2="200" stroke="white" strokeWidth="3" />
      <line x1="200" y1="160" x2="200" y2="240" stroke="white" strokeWidth="3" />
      <line x1="172" y1="172" x2="228" y2="228" stroke="white" strokeWidth="2" />
      <line x1="228" y1="172" x2="172" y2="228" stroke="white" strokeWidth="2" />
      {/* 40 rays */}
      {Array.from({ length: 40 }).map((_, i) => {
        const angle = (i * 360) / 40;
        const rad = (angle * Math.PI) / 180;
        const x1 = 200 + 70 * Math.cos(rad);
        const y1 = 200 + 70 * Math.sin(rad);
        const x2 = 200 + 105 * Math.cos(rad);
        const y2 = 200 + 105 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="2" />;
      })}
    </svg>
  );
}

// Tajikistan - crown and stars
function TajikistanEmblem() {
  return (
    <svg viewBox="0 0 400 400" width="400" height="400" className="opacity-[0.06]">
      {/* Crown */}
      <path d="M150 220 L160 170 L180 200 L200 155 L220 200 L240 170 L250 220 Z" fill="white" />
      <rect x="150" y="220" width="100" height="15" rx="3" fill="white" />
      {/* 7 stars above crown in arc */}
      {Array.from({ length: 7 }).map((_, i) => {
        const angle = Math.PI + (i * Math.PI) / 8 + Math.PI / 8;
        const x = 200 + 90 * Math.cos(angle);
        const y = 185 + 70 * Math.sin(angle);
        return <circle key={i} cx={x} cy={y} r="6" fill="white" />;
      })}
      {/* Wreath at bottom */}
      <path d="M160 260 Q180 280 200 270 Q220 280 240 260" fill="none" stroke="white" strokeWidth="3" />
      <path d="M155 265 Q180 290 200 275 Q220 290 245 265" fill="none" stroke="white" strokeWidth="2" opacity="0.5" />
    </svg>
  );
}
