import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Clock } from 'lucide-react';
import heroBagImg from '../assets/images/hero_atelier_noir_1791739463278.jpg';

interface HeroProps {
  onExploreClick: () => void;
  onNewArrivalsClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onNewArrivalsClick }) => {
  return (
    <section className="relative w-full border-b border-[#27272A]/70 overflow-hidden bg-[#0D0D0E]">
      {/* Main Editorial Hero Split / Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial Typography & Purchase Intent */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-mono mb-4">
              Colección Permanente · París & Florencia
            </span>

            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#ECEAE4] leading-[1.08] mb-6 [text-wrap:balance]">
              La materia del silencio.
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8 max-w-lg font-light">
              Objetos de manufactura rigurosa, cueros de curtición vegetal y relojería mecánica. Una estética depurada nacida para trascender temporadas y modas efímeras.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#ECEAE4] text-[#0D0D0E] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-white transition-all cursor-pointer shadow-sm group"
              >
                <span>Explorar Colección</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onNewArrivalsClick}
                className="inline-flex items-center justify-center px-6 py-3.5 border border-zinc-700 hover:border-zinc-400 text-zinc-300 hover:text-white text-xs font-medium uppercase tracking-[0.18em] transition-all cursor-pointer bg-transparent"
              >
                Ver Novedades
              </button>
            </div>

            {/* Editorial Metadata Strip */}
            <div className="pt-6 border-t border-[#27272A]/60 flex items-center gap-6 text-xs text-zinc-400 font-mono">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">Edición</span>
                <span className="text-zinc-200">2026 Limitada</span>
              </div>
              <div className="h-6 w-px bg-zinc-800" />
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">Origen</span>
                <span className="text-zinc-200">Florencia & Grasse</span>
              </div>
              <div className="h-6 w-px bg-zinc-800" />
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">Garantía</span>
                <span className="text-zinc-200">2 Años Integral</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Hero Image Asset */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden bg-[#18181B] border border-[#27272A]/80 shadow-2xl group">
              <img
                src={heroBagImg}
                alt="Colección Atelier Noir — Bolso de viaje Sac Weekend en cuero vegetal y accesorios de lujo"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Discreet Image Corner Caption */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-xs text-zinc-300 backdrop-blur-md bg-black/40 px-4 py-2 border border-white/10">
                <div>
                  <p className="font-serif-luxury text-sm tracking-wide text-white">Sac Weekend Cuir Végétal</p>
                  <p className="text-[10px] text-zinc-400 font-mono">Florencia · Cuero curtido artesanal</p>
                </div>
                <span className="font-mono tabular-nums text-xs text-white">680 €</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4-Pillar Strip below Hero (Zero-pill discipline, clean typography) */}
      <div className="border-t border-[#27272A]/70 bg-[#121214]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-zinc-400 shrink-0" />
              <div>
                <p className="text-xs font-medium text-zinc-200">Manufactura Artesanal</p>
                <p className="text-[11px] text-zinc-500">Talleres certificados en Europa</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-zinc-400 shrink-0" />
              <div>
                <p className="text-xs font-medium text-zinc-200">Materiales Nobles</p>
                <p className="text-[11px] text-zinc-500">Titanio, seda, cachemira y cuero</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
              <div>
                <p className="text-xs font-medium text-zinc-200">Envío Asegurado 24/48h</p>
                <p className="text-[11px] text-zinc-500">Embalaje térmico personalizado</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border border-zinc-600 flex items-center justify-center text-[10px] text-zinc-400 font-mono">
                30
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-200">Devoluciones en 30 Días</p>
                <p className="text-[11px] text-zinc-500">Gestión sin coste añadido</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
