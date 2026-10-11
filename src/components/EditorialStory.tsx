import React from 'react';
import campaignPortraitImg from '../assets/images/campaign_atelier_noir_1791739473204.jpg';

interface EditorialStoryProps {
  onDiscoverClick: () => void;
}

export const EditorialStory: React.FC<EditorialStoryProps> = ({ onDiscoverClick }) => {
  return (
    <section id="editorial" className="py-20 lg:py-32 bg-[#0D0D0E] border-b border-[#27272A]/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Striking Campaign Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[3/4] w-full bg-[#18181B] border border-[#27272A] overflow-hidden group">
              <img
                src={campaignPortraitImg}
                alt="Editorial Campaña Atelier Noir — Casquette Cachemire y Alta Joyería en Plata"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 text-xs text-zinc-300 font-mono flex justify-between items-end border-t border-white/20 pt-3 backdrop-blur-xs">
                <span>Campaña Otoño / Invierno</span>
                <span>Fotografía en Estudio Privado · Milán</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text & Manifesto */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500 mb-4">
              Manifiesto de la Maison
            </span>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-[1.12] mb-6 [text-wrap:balance]">
              Rechazar lo ruidoso.<br />Elegir lo perdurable.
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-zinc-400 font-light leading-relaxed mb-8">
              <p>
                Atelier Noir no persigue el ciclo frenético de las temporadas de la moda. Cada pieza nace de una obsesión por la proporción pura, los materiales nobles sin artificios y el trabajo manual de maestros artesanos en pequeños talleres familiares de Italia, Francia y Japón.
              </p>
              <p>
                Desde la cachemira pura de Cariaggi hilada en las colinas del Piamonte hasta el titanio grado 5 microgranallado en el Jura suizo, concebimos objetos con peso, sustancia y vocación de acompañar durante décadas.
              </p>
            </div>

            {/* Editorial Quote */}
            <blockquote className="p-4 bg-[#141416] border-l-2 border-zinc-500 text-xs text-zinc-300 italic font-serif-luxury text-sm mb-8">
              "El verdadero lujo contemporáneo no reclama atención con logotipos ostentosos; se revela en la tensión impecable de una costura y en el tacto cálido de la materia auténtica."
            </blockquote>

            <div>
              <button
                onClick={onDiscoverClick}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-transparent border border-zinc-600 hover:border-white text-zinc-200 hover:text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all cursor-pointer"
              >
                Explorar Colección de Autor
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
