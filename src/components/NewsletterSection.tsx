import React, { useState } from 'react';
import { Check, Mail } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Por favor, indica un correo electrónico válido');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#121214] border-b border-[#27272A]/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500 block mb-2">
          Círculo Privado Atelier
        </span>
        
        <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-4 [text-wrap:balance]">
          Invitación a las Presentaciones Privadas
        </h2>

        <p className="text-zinc-400 text-xs sm:text-sm font-light max-w-xl mx-auto mb-8 leading-relaxed">
          Recibe acceso anticipado de 48 horas a tiradas limitadas de numeración única, comunicados editoriales y el código de bienvenida personal <strong>BIENVENUE10</strong> (-10%).
        </p>

        {submitted ? (
          <div className="p-6 bg-[#18181B] border border-emerald-900/60 max-w-md mx-auto text-center animate-in fade-in duration-300">
            <div className="w-10 h-10 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="font-serif-luxury text-xl text-white mb-1">Inscripción Completada</h3>
            <p className="text-xs text-zinc-400 font-mono">
              Hemos remitido tu credencial de cortesía a <strong>{email}</strong>. Puedes aplicar el código <span className="text-emerald-400 font-bold">BIENVENUE10</span> en la cesta.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Introduce tu dirección de correo..."
                  className="w-full bg-[#18181B] text-zinc-200 text-xs pl-10 pr-4 py-3.5 border border-[#27272A] focus:outline-none focus:border-zinc-400 font-mono placeholder:text-zinc-600"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 bg-[#ECEAE4] hover:bg-white text-[#0D0D0E] text-xs font-semibold uppercase tracking-[0.18em] transition-all cursor-pointer whitespace-nowrap"
              >
                Suscribirse
              </button>
            </div>
            {error && <p className="text-xs text-red-400 font-mono mt-2">{error}</p>}
            <p className="text-[10px] text-zinc-500 font-mono mt-3">
              Sin publicidad masiva. Máximo dos envíos al mes. Cancelación con un clic.
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
