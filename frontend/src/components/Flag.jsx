'use client';

import { getCountryCode } from '@/lib/countryConfig';

const flags = {
  TR: ({ width, height }) => (
    <svg viewBox="0 0 360 240" width={width} height={height}>
      <rect width="360" height="240" fill="#E30A17" />
      <circle cx="160" cy="120" r="60" fill="white" />
      <circle cx="175" cy="120" r="48" fill="#E30A17" />
      <polygon fill="white" points="215,120 196.7,108.5 200.8,130 186.5,114.5 208.2,125.5" />
    </svg>
  ),
  AZ: ({ width, height }) => (
    <svg viewBox="0 0 360 240" width={width} height={height}>
      <rect width="360" height="80" fill="#0092BC" />
      <rect y="80" width="360" height="80" fill="#E4002B" />
      <rect y="160" width="360" height="80" fill="#00AF66" />
      <circle cx="170" cy="120" r="30" fill="white" />
      <circle cx="178" cy="120" r="25" fill="#E4002B" />
      <polygon fill="white" points="205,120 195.5,113 197.1,124 190,116.5 203,122" />
    </svg>
  ),
  KZ: ({ width, height }) => (
    <svg viewBox="0 0 360 240" width={width} height={height}>
      <rect width="360" height="240" fill="#00AFCA" />
      {/* Sun */}
      <circle cx="180" cy="110" r="40" fill="#FFD700" />
      {/* Sun rays */}
      {Array.from({ length: 32 }, (_, i) => {
        const angle = (i * 360) / 32;
        const rad = (angle * Math.PI) / 180;
        const x1 = 180 + 44 * Math.cos(rad);
        const y1 = 110 + 44 * Math.sin(rad);
        const x2 = 180 + 56 * Math.cos(rad);
        const y2 = 110 + 56 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFD700" strokeWidth="2" />;
      })}
      {/* Eagle silhouette (simplified) */}
      <path d="M155,135 Q165,125 180,130 Q195,125 205,135 Q195,140 180,138 Q165,140 155,135Z" fill="#FFD700" />
      {/* Ornament on left */}
      <rect x="20" y="30" width="16" height="180" fill="#FFD700" rx="3" />
      <rect x="24" y="40" width="8" height="10" fill="#00AFCA" rx="1" />
      <rect x="24" y="60" width="8" height="10" fill="#00AFCA" rx="1" />
      <rect x="24" y="80" width="8" height="10" fill="#00AFCA" rx="1" />
      <rect x="24" y="100" width="8" height="10" fill="#00AFCA" rx="1" />
      <rect x="24" y="120" width="8" height="10" fill="#00AFCA" rx="1" />
      <rect x="24" y="140" width="8" height="10" fill="#00AFCA" rx="1" />
      <rect x="24" y="160" width="8" height="10" fill="#00AFCA" rx="1" />
      <rect x="24" y="180" width="8" height="10" fill="#00AFCA" rx="1" />
    </svg>
  ),
  UZ: ({ width, height }) => (
    <svg viewBox="0 0 360 240" width={width} height={height}>
      <rect width="360" height="76" fill="#1EB53A" />
      <rect y="82" width="360" height="76" fill="white" />
      <rect y="164" width="360" height="76" fill="#0099B5" />
      <rect y="76" width="360" height="6" fill="#CE1126" />
      <rect y="158" width="360" height="6" fill="#CE1126" />
      {/* Crescent */}
      <circle cx="80" cy="38" r="18" fill="white" />
      <circle cx="87" cy="38" r="15" fill="#0099B5" />
      {/* Stars - 3 rows: 3, 4, 5 */}
      {[[115,22],[135,22],[155,22],
        [105,38],[125,38],[145,38],[165,38],
        [115,54],[135,54],[155,54],[175,54],[195,54]].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5" fill="white" />
      ))}
    </svg>
  ),
  TM: ({ width, height }) => (
    <svg viewBox="0 0 360 240" width={width} height={height}>
      <rect width="360" height="240" fill="#00843D" />
      {/* Red ornamental stripe */}
      <rect x="50" width="50" height="240" fill="#D22630" />
      {/* Ornament patterns on red stripe */}
      {[20, 60, 100, 140, 180].map((y, i) => (
        <g key={i}>
          <circle cx="75" cy={y + 15} r="10" fill="none" stroke="white" strokeWidth="2" />
          <circle cx="75" cy={y + 15} r="5" fill="white" />
        </g>
      ))}
      {/* Crescent */}
      <circle cx="180" cy="80" r="30" fill="white" />
      <circle cx="190" cy="80" r="25" fill="#00843D" />
      {/* Stars */}
      {[[220,55],[225,75],[220,95],[210,105],[230,105]].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill="white" />
      ))}
    </svg>
  ),
  KG: ({ width, height }) => (
    <svg viewBox="0 0 360 240" width={width} height={height}>
      <rect width="360" height="240" fill="#E8112D" />
      {/* Sun */}
      <circle cx="180" cy="120" r="40" fill="#FFCD00" />
      {/* 40 rays */}
      {Array.from({ length: 40 }, (_, i) => {
        const angle = (i * 360) / 40;
        const rad = (angle * Math.PI) / 180;
        const x1 = 180 + 44 * Math.cos(rad);
        const y1 = 120 + 44 * Math.sin(rad);
        const x2 = 180 + 65 * Math.cos(rad);
        const y2 = 120 + 65 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFCD00" strokeWidth="2.5" />;
      })}
      {/* Tunduk - center element */}
      <circle cx="180" cy="120" r="20" fill="#E8112D" />
      <line x1="160" y1="120" x2="200" y2="120" stroke="#FFCD00" strokeWidth="3" />
      <line x1="180" y1="100" x2="180" y2="140" stroke="#FFCD00" strokeWidth="3" />
      <line x1="165" y1="105" x2="195" y2="135" stroke="#FFCD00" strokeWidth="2" />
      <line x1="195" y1="105" x2="165" y2="135" stroke="#FFCD00" strokeWidth="2" />
    </svg>
  ),
  TJ: ({ width, height }) => (
    <svg viewBox="0 0 360 240" width={width} height={height}>
      <rect width="360" height="68" fill="#CC0000" />
      <rect y="68" width="360" height="104" fill="white" />
      <rect y="172" width="360" height="68" fill="#006600" />
      {/* Crown */}
      <path d="M160,110 L165,95 L172,105 L180,90 L188,105 L195,95 L200,110 Z" fill="#F8C300" />
      <rect x="162" y="110" width="36" height="8" fill="#F8C300" rx="2" />
      {/* Stars arranged in arc above crown */}
      {[[-35,-15],[-20,-25],[0,-30],[20,-25],[35,-15],[25,5],[-25,5]].map(([dx,dy], i) => (
        <circle key={i} cx={180+dx} cy={95+dy} r="4" fill="#F8C300" />
      ))}
    </svg>
  ),
};

export default function Flag({ size = 'small', className = '' }) {
  const country = getCountryCode();
  const FlagComponent = flags[country];
  if (!FlagComponent) return null;

  const dimensions = size === 'large'
    ? { width: 200, height: 133 }
    : { width: 24, height: 16 };

  return (
    <span className={`inline-block ${className}`} style={{ lineHeight: 0 }}>
      <FlagComponent width={dimensions.width} height={dimensions.height} />
    </span>
  );
}
