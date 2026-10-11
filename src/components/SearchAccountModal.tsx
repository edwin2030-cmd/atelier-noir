import React, { useState } from 'react';
import { Product, Order } from '../types';
import { formatPrice } from '../utils/formatters';
import { X, Search, User, Package, Calendar, Check, ArrowRight } from 'lucide-react';

interface SearchAccountModalProps {
  mode: 'search' | 'account' | null;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  pastOrders: Order[];
}

export const SearchAccountModal: React.FC<SearchAccountModalProps> = ({
  mode,
  onClose,
  products,
  onSelectProduct,
  pastOrders
}) => {
  const [searchVal, setSearchVal] = useState('');
  const [trackingInput, setTrackingInput] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const [appointmentBoutique, setAppointmentBoutique] = useState('Madrid — Serrano 48');

  if (!mode) return null;

  const searchResults = searchVal.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.materials.toLowerCase().includes(searchVal.toLowerCase())
      )
    : [];

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const query = trackingInput.trim().toUpperCase();
    const found = pastOrders.find(
      (o) => o.id.toUpperCase() === query || o.trackingNumber.toUpperCase() === query
    );
    if (found) {
      setTrackedOrder(found);
    } else {
      setTrackedOrder(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-[#121214] border border-[#27272A] text-[#ECEAE4] z-10 shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#27272A] mb-6">
          <div className="flex items-center gap-2">
            {mode === 'search' ? (
              <Search className="w-4 h-4 text-zinc-400" />
            ) : (
              <User className="w-4 h-4 text-zinc-400" />
            )}
            <h3 className="font-serif-luxury text-xl text-white">
              {mode === 'search' ? 'Búsqueda en el Catálogo' : 'Concierge & Círculo Privado'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SEARCH MODE */}
        {mode === 'search' && (
          <div>
            <div className="relative mb-6">
              <Search className="w-4.5 h-4.5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                autoFocus
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Escribe el nombre de la pieza, cuero, perfume..."
                className="w-full bg-[#18181B] border border-[#27272A] text-xs pl-10 pr-4 py-3 text-white focus:outline-none focus:border-zinc-400 font-mono placeholder:text-zinc-600"
              />
            </div>

            {searchVal.trim() === '' ? (
              <div>
                <p className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider mb-3">
                  Sugerencias Rápidas
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Sac Weekend', 'Noir Absolu', 'Chronomètre Titane', 'Casquette Cachemire', 'Lunettes Solaires'].map(
                    (sug) => (
                      <button
                        key={sug}
                        onClick={() => setSearchVal(sug)}
                        className="px-3 py-1.5 bg-[#18181B] hover:bg-[#27272A] text-xs font-mono text-zinc-300 border border-[#27272A] transition-colors cursor-pointer"
                      >
                        {sug}
                      </button>
                    )
                  )}
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="max-h-72 overflow-y-auto divide-y divide-[#27272A]/50 pr-1">
                {searchResults.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      onSelectProduct(prod);
                      onClose();
                    }}
                    className="py-3 flex items-center justify-between gap-4 hover:bg-[#18181B] px-2 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-12 h-12 object-cover bg-black border border-[#27272A] shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <p className="font-serif-luxury text-base text-white group-hover:text-zinc-200 truncate">
                          {prod.name}
                        </p>
                        <p className="text-[11px] text-zinc-500 font-mono truncate">
                          {prod.categoryLabel} · {prod.subtitle}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono tabular-nums text-xs text-white shrink-0">
                      {formatPrice(prod.price)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-zinc-500 text-xs font-mono">
                No se encontraron coincidencias para "{searchVal}".
              </div>
            )}
          </div>
        )}

        {/* ACCOUNT & CONCIERGE MODE */}
        {mode === 'account' && (
          <div className="space-y-6">
            
            {/* Order Tracking Search */}
            <div className="p-4 bg-[#18181B] border border-[#27272A]">
              <h4 className="text-xs uppercase font-mono tracking-wider text-zinc-300 mb-2 flex items-center gap-2">
                <Package className="w-3.5 h-3.5" />
                <span>Localizador de Pedidos de Demostración</span>
              </h4>
              <form onSubmit={handleTrackOrder} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="Introduce ID (ej. AN-10492 o código NOIR-...)"
                  className="flex-1 bg-[#121214] border border-[#27272A] text-xs px-3 py-2 text-white font-mono placeholder:text-zinc-600 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#27272A] hover:bg-zinc-700 text-xs font-mono text-white transition-colors cursor-pointer"
                >
                  Consultar
                </button>
              </form>

              {trackedOrder ? (
                <div className="mt-3 p-3 bg-zinc-900 border border-zinc-700 text-xs font-mono space-y-1">
                  <p className="text-emerald-400 font-medium">Pedido #{trackedOrder.id} Localizado</p>
                  <p className="text-zinc-400">Destinatario: {trackedOrder.customer.fullName}</p>
                  <p className="text-zinc-400">Estado: <span className="text-white">Preparado en Taller</span></p>
                  <p className="text-zinc-400">Tracking: {trackedOrder.trackingNumber}</p>
                  <p className="text-zinc-300 font-serif-luxury text-sm pt-1">
                    Total: {formatPrice(trackedOrder.total)}
                  </p>
                </div>
              ) : trackingInput && (
                <p className="text-[11px] text-zinc-500 font-mono mt-1">
                  No se encontró ningún pedido reciente con ese identificador.
                </p>
              )}

              {pastOrders.length > 0 && !trackedOrder && (
                <div className="mt-2 text-[11px] font-mono text-zinc-500">
                  <span>Último pedido registrado en esta sesión: </span>
                  <button
                    onClick={() => {
                      setTrackingInput(pastOrders[pastOrders.length - 1].id);
                      setTrackedOrder(pastOrders[pastOrders.length - 1]);
                    }}
                    className="text-zinc-300 underline"
                  >
                    #{pastOrders[pastOrders.length - 1].id}
                  </button>
                </div>
              )}
            </div>

            {/* Boutique Appointment Reservation */}
            <div className="p-4 bg-[#18181B] border border-[#27272A]">
              <h4 className="text-xs uppercase font-mono tracking-wider text-zinc-300 mb-2 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Cita Privada en Boutique</span>
              </h4>
              <p className="text-xs text-zinc-400 font-light mb-3">
                Reserva 45 minutos exclusivos con un asesor de la Maison para descubrir piezas numeradas y servicio de marroquinería a medida.
              </p>

              {appointmentBooked ? (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Cita confirmada en {appointmentBoutique}. Te esperamos el próximo jueves a las 17:00h.</span>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={appointmentBoutique}
                    onChange={(e) => setAppointmentBoutique(e.target.value)}
                    className="bg-[#121214] border border-[#27272A] text-xs px-3 py-2 text-white font-mono focus:outline-none flex-1"
                  >
                    <option value="Madrid — Serrano 48">Boutique Madrid — Serrano 48</option>
                    <option value="París — Rue du Faubourg Saint-Honoré">Boutique París — Faubourg Saint-Honoré</option>
                    <option value="Milán — Via Montenapoleone 14">Boutique Milán — Montenapoleone 14</option>
                  </select>
                  <button
                    onClick={() => setAppointmentBooked(true)}
                    className="px-4 py-2 bg-[#ECEAE4] hover:bg-white text-[#0D0D0E] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Confirmar Cita
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
