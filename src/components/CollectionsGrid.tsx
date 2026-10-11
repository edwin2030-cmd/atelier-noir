import React from 'react';
import { ProductCategory } from '../types';
import campaignPortraitImg from '../assets/images/campaign_atelier_noir_1791739473204.jpg';
import perfumeNoirImg from '../assets/images/perfume_noir_absolu_1791739481693.jpg';
import watchTitaniumImg from '../assets/images/watch_minimalist_titanium_1791739490427.jpg';
import heroBagImg from '../assets/images/hero_atelier_noir_1791739463278.jpg';

interface CollectionsGridProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const CollectionsGrid: React.FC<CollectionsGridProps> = ({ onSelectCategory }) => {
  const collections = [
    {
      id: 'carteras' as ProductCategory,
      title: 'Carteras & Marroquinería',
      subtitle: 'Pieles de curtición vegetal y herrajes macizos',
      count: '3 Creaciones',
      image: heroBagImg,
      colSpan: 'md:col-span-8'
    },
    {
      id: 'perfumes' as ProductCategory,
      title: 'Alta Perfumería',
      subtitle: 'Formulaciones de autor concebidas en Grasse',
      count: '3 Extractos',
      image: perfumeNoirImg,
      colSpan: 'md:col-span-4'
    },
    {
      id: 'relojes' as ProductCategory,
      title: 'Relojería Mecánica',
      subtitle: 'Titanio grado 5 y calibres suizos automáticos',
      count: '2 Piezas',
      image: watchTitaniumImg,
      colSpan: 'md:col-span-4'
    },
    {
      id: 'gorras' as ProductCategory,
      title: 'Headwear & Gorras',
      subtitle: 'Cachemira italiana de Cariaggi y algodón egipcio',
      count: '3 Modelos',
      image: campaignPortraitImg,
      colSpan: 'md:col-span-4'
    },
    {
      id: 'accesorios' as ProductCategory,
      title: 'Accesorios & Joyería',
      subtitle: 'Plata 925 maciza, titanio y acetato japonés',
      count: '4 Objetos',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85',
      colSpan: 'md:col-span-4'
    }
  ];

  const handleCardClick = (cat: ProductCategory) => {
    onSelectCategory(cat);
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#0D0D0E] border-b border-[#27272A]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#27272A]/60">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-mono block mb-2">
              Líneas Temáticas
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#ECEAE4]">
              Colecciones de la Casa
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs text-zinc-400 font-mono tracking-wider max-w-xs">
            Selecciona una disciplina artesanal para explorar las piezas catalogadas.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
          {collections.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              className={`${item.colSpan} relative aspect-[4/3] md:aspect-auto md:min-h-[340px] bg-[#18181B] border border-[#27272A] overflow-hidden group cursor-pointer transition-all duration-300 hover:border-zinc-500`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 bg-black/40 backdrop-blur-sm px-2.5 py-1 border border-white/10">
                    {item.count}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                    Descubrir →
                  </span>
                </div>

                <div>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-300 font-light max-w-md">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
