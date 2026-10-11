import React from 'react';
import { Package, ShieldCheck, RefreshCw, MessageSquare } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Package,
      title: 'Embalaje Térmico Couture',
      description: 'Cada envío se acondiciona en cofre rígido forrado en tela con cierre magnético y precinto numerado que protege fragancias y piezas delicadas.'
    },
    {
      icon: ShieldCheck,
      title: 'Garantía Integral de 2 Años',
      description: 'Cobertura directa frente a cualquier defecto de confección, costura o calibre mecánico en nuestros talleres de Madrid y Milán.'
    },
    {
      icon: RefreshCw,
      title: 'Devoluciones en 30 Días',
      description: 'Prueba la pieza en tu hogar con tranquilidad. Si no colma tus expectativas, gestionamos la recogida asegurada sin coste adicional.'
    },
    {
      icon: MessageSquare,
      title: 'Concierge & Asesoría Privada',
      description: 'Atención personalizada para reservas de ediciones limitadas, peticiones de grabado artesanal y recomendaciones de fragancias de autor.'
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#0D0D0E] border-b border-[#27272A]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500 block mb-2">
            Compromiso de Excelencia
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-normal">
            La Experiencia de Adquisición
          </h2>
          <p className="text-xs text-zinc-400 mt-2 font-light">
            Transparencia, rapidez y cuidado meticuloso en cada etapa del pedido.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-[#121214] border border-[#27272A]/80 flex flex-col justify-between hover:border-zinc-500 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 border border-[#27272A] bg-[#18181B] flex items-center justify-center text-zinc-300 mb-5">
                    <Icon className="w-5 h-5 stroke-1" />
                  </div>
                  <h3 className="font-serif-luxury text-xl text-white font-normal mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
