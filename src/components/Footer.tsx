import React from 'react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: ProductCategory | 'todos') => void;
  onOpenPrivacyModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const currentYear = 2026;

  const handleCategoryClick = (cat: ProductCategory | 'todos') => {
    onSelectCategory(cat);
    const catEl = document.getElementById('catalogo');
    if (catEl) {
      catEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#09090A] text-[#ECEAE4] border-t border-[#27272A]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#27272A]/60">
          
          {/* Col 1: Maison Overview */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif-luxury text-2xl tracking-[0.22em] text-white">
              ATELIER NOIR
            </h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm">
              Maison de marroquinería de autor, perfumería artesanal y relojería contemporánea con talleres en Florencia, Grasse y el Jura suizo.
            </p>
            <div className="pt-2 text-xs font-mono text-zinc-500 space-y-1">
              <p>Atención al Cliente: <span className="text-zinc-300">concierge@atelier-noir.com</span></p>
              <p>Línea Privada: <span className="text-zinc-300">+34 91 088 42 10</span></p>
            </div>
          </div>

          {/* Col 2: Colecciones */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300 mb-4">
              Colecciones
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-light">
              <li>
                <button
                  onClick={() => handleCategoryClick('carteras')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Carteras & Marroquinería
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('perfumes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Alta Perfumería de Grasse
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('relojes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Relojería Mecánica
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('gorras')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Headwear en Cachemira
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('accesorios')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Accesorios & Joyería 925
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Boutiques Insignia */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300 mb-4">
              Boutiques
            </h4>
            <ul className="space-y-3 text-xs text-zinc-400 font-mono">
              <li>
                <span className="text-white block font-sans">Madrid</span>
                <span>Calle de Serrano 48</span>
              </li>
              <li>
                <span className="text-white block font-sans">París</span>
                <span>28 Rue du Faubourg Saint-Honoré</span>
              </li>
              <li>
                <span className="text-white block font-sans">Milán</span>
                <span>Via Montenapoleone 14</span>
              </li>
              <li>
                <span className="text-white block font-sans">Tokio</span>
                <span>Ginza 6-Chōme, Chuo</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Compromiso & Políticas */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300 mb-4">
              Garantía & Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-light">
              <li className="hover:text-white transition-colors cursor-pointer">
                Envíos y Seguimiento Térmico
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Política de Devolución 30 Días
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Certificados de Autenticidad
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Curtición Vegetal Responsable
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Privacidad & Términos de Compra
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <p>© {currentYear} ATELIER NOIR MAISON. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6">
            <span>España / EUR (€)</span>
            <span>·</span>
            <span>Español / Castellano</span>
            <span>·</span>
            <span>Versión Demostración 2026</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
