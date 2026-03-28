import { getCountryCode } from '@/lib/countryConfig';

// Thin flag-colored stripe at the very top of the page
export default function FlagStripe() {
  const code = getCountryCode();
  const stripes = {
    TR: ['bg-red-600'],
    AZ: ['bg-sky-500', 'bg-red-500', 'bg-green-600'],
    KZ: ['bg-sky-500'],
    UZ: ['bg-blue-600', 'bg-white', 'bg-green-600'],
    TM: ['bg-green-700'],
    KG: ['bg-red-600'],
    TJ: ['bg-red-600', 'bg-white', 'bg-green-600'],
  };

  const colors = stripes[code] || ['bg-blue-500'];

  return (
    <div className="flex h-1">
      {colors.map((color, i) => (
        <div key={i} className={`flex-1 ${color}`} />
      ))}
    </div>
  );
}
