import React from 'react';

const brands = [
  { name: 'Çimstone', sub: 'Kuvars' },
  { name: 'Silestone', sub: 'Cosentino' },
  { name: 'Dekton', sub: 'Cosentino' },
  { name: 'Belenco', sub: 'Kuvars' },
  { name: 'Neolith', sub: 'Porselen' },
  { name: 'Caesarstone', sub: 'Quartz' },
  { name: 'Laminam', sub: 'Porselen' },
  { name: 'Corian', sub: 'DuPont' },
  { name: 'HI-MACS', sub: 'LG' },
  { name: 'Staron', sub: 'Samsung' },
  { name: 'EGGER', sub: 'Laminat' },
  { name: 'Carrara', sub: 'İtalyan Mermer' },
];

function LogoItem({ name, sub }: { name: string; sub: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-10 shrink-0 select-none group">
      <span className="font-serif text-[15px] font-bold tracking-widest text-neutral-400 group-hover:text-neutral-700 transition-colors duration-300 uppercase whitespace-nowrap">
        {name}
      </span>
      <span className="font-mono text-[8px] tracking-[0.2em] text-neutral-300 group-hover:text-amber-500 transition-colors duration-300 uppercase mt-0.5">
        {sub}
      </span>
    </div>
  );
}

export default function BrandLogoBar() {
  return (
    <div className="w-full bg-white border-y border-stone-100 py-5 overflow-hidden relative">
      {/* sol fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      {/* sağ fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div
        className="flex"
        style={{
          animation: 'marquee 32s linear infinite',
          width: 'max-content',
        }}
      >
        {/* iki kopya → seamless loop */}
        {[...brands, ...brands].map((b, i) => (
          <LogoItem key={i} name={b.name} sub={b.sub} />
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
