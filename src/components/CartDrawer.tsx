import React, { useState } from 'react';
import { CartItem, Coupon } from '../types';
import { formatPrice } from '../utils/formatters';
import { X, Trash2, ArrowRight, Tag, ShoppingBag, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (code: string) => { success: boolean; message: string };
  onRemoveCoupon: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  onProceedToCheckout
}) => {
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  const freeShippingThreshold = 150;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const shippingCost = isFreeShipping ? 0 : 15;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    if (!couponCodeInput.trim()) return;

    const res = onApplyCoupon(couponCodeInput.trim());
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponCodeInput('');
    } else {
      setCouponError(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121214] border-l border-[#27272A] text-[#ECEAE4] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-[#27272A] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4.5 h-4.5 text-zinc-300" />
              <h2 className="font-serif-luxury text-xl font-normal tracking-wide text-white">
                Cesta de Compra
              </h2>
              <span className="text-xs font-mono text-zinc-500">
                ({items.reduce((s, i) => s + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-1 transition-colors cursor-pointer"
              aria-label="Cerrar cesta"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          {items.length > 0 && (
            <div className="px-6 py-3 bg-[#18181B] border-b border-[#27272A] text-xs font-mono">
              {isFreeShipping ? (
                <div className="text-emerald-400 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>Cualifica para Envío Asegurado de Cortesía (0 €)</span>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between text-zinc-400 mb-1.5 text-[11px]">
                    <span>Faltan {formatPrice(amountNeededForFreeShipping)} para envío de cortesía</span>
                    <span className="tabular-nums">{Math.round(shippingProgress)}%</span>
                  </div>
                  <div className="w-full h-1 bg-[#27272A] overflow-hidden">
                    <div
                      className="h-full bg-[#ECEAE4] transition-all duration-300"
                      style={{ width: `${shippingProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#27272A]/70">
            {items.length > 0 ? (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-start group">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover bg-black border border-[#27272A] shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-serif-luxury text-base text-white truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-zinc-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                        title="Eliminar artículo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.selectedVariant && (
                      <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                        {item.selectedVariant.variantName}: <span className="text-zinc-300">{item.selectedVariant.optionLabel}</span>
                      </p>
                    )}

                    <div className="flex justify-between items-center mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#27272A] bg-[#18181B]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-xs text-zinc-400 hover:text-white cursor-pointer"
                          aria-label="Restar 1"
                        >
                          -
                        </button>
                        <span className="px-2.5 text-xs font-mono tabular-nums text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stockCount}
                          className="px-2 py-1 text-xs text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"
                          aria-label="Sumar 1"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-mono tabular-nums text-xs text-white">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-zinc-600 mb-3 stroke-1" />
                <p className="font-serif-luxury text-xl text-zinc-300 mb-1">Tu cesta está vacía</p>
                <p className="text-xs text-zinc-500 max-w-xs mb-6 font-light">
                  Aún no has incorporado piezas a tu selección personal.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#ECEAE4] text-[#0D0D0E] text-xs font-semibold uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
                >
                  Explorar Catálogo
                </button>
              </div>
            )}
          </div>

          {/* Drawer Footer / Checkout summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#27272A] bg-[#121214] space-y-4">
              
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#18181B] border border-emerald-900/40 text-xs">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{appliedCoupon.code} (-{appliedCoupon.discountPercent}%)</span>
                    </div>
                    <button
                      onClick={onRemoveCoupon}
                      className="text-zinc-500 hover:text-zinc-300 font-mono text-[11px] underline cursor-pointer"
                    >
                      Quitar
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCouponSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                      placeholder="Código de cortesía (ej. BIENVENUE10)"
                      className="flex-1 bg-[#18181B] border border-[#27272A] px-3 py-2 text-xs font-mono text-white placeholder:text-zinc-600 uppercase focus:outline-none focus:border-zinc-400"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-[#27272A] hover:bg-zinc-700 text-xs text-zinc-200 font-mono uppercase tracking-wider cursor-pointer transition-colors"
                    >
                      Aplicar
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-red-400 mt-1 font-mono">{couponError}</p>}
                {couponSuccess && <p className="text-[11px] text-emerald-400 mt-1 font-mono">{couponSuccess}</p>}
              </div>

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs font-mono pt-2 border-t border-[#27272A]/50">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="tabular-nums text-zinc-200">{formatPrice(subtotal)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Descuento ({appliedCoupon.code})</span>
                    <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Envío Especial Asegurado</span>
                  <span className="tabular-nums text-zinc-200">
                    {shippingCost === 0 ? 'Cortesía (0 €)' : formatPrice(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif-luxury text-white pt-2 border-t border-[#27272A]">
                  <span className="font-medium">Total Estimado</span>
                  <span className="font-mono tabular-nums font-semibold">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#ECEAE4] hover:bg-white text-[#0D0D0E] text-xs font-semibold uppercase tracking-[0.2em] transition-all cursor-pointer shadow-lg group"
              >
                <span>Tramitar Pedido</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <p className="text-[10px] text-center text-zinc-500 font-mono">
                Pasarela segura en modo demostración · Envíos con tracking privado
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
