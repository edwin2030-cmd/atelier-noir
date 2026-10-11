import React, { useState } from 'react';
import { CartItem, Coupon, Order, CheckoutForm } from '../types';
import { formatPrice, generateOrderId, generateTrackingNumber } from '../utils/formatters';
import { X, CheckCircle, ShieldCheck, CreditCard, Building2, Banknote, Package, Truck, ArrowLeft, Printer } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedCoupon: Coupon | null;
  onOrderComplete: (order: Order) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedCoupon,
  onOrderComplete,
  onClearCart
}) => {
  // Steps: 'form' | 'confirmation'
  const [currentStep, setCurrentStep] = useState<'form' | 'confirmation'>('form');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Form State
  const [formData, setFormData] = useState<CheckoutForm>({
    fullName: 'Alejandro Martínez de la Vega',
    email: 'a.martinez@atelier-client.com',
    phone: '+34 612 345 678',
    address: 'Calle Serrano 48, 3º Dcha',
    apartment: '',
    city: 'Madrid',
    postalCode: '28001',
    country: 'España',
    deliveryType: 'standard',
    paymentMethod: 'card',
    cardDetails: {
      cardNumber: '4242 •••• •••• 4242',
      cardHolder: 'A. MARTINEZ DE LA VEGA',
      expiryDate: '08/28',
      cvc: '741'
    },
    giftWrap: true,
    orderNotes: 'Por favor, incluir tarjeta caligrafiada en sobre lacrado.'
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Financial math
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  const isFreeShipping = subtotal >= 150 || formData.deliveryType === 'boutique';
  const shippingCost = isFreeShipping ? 0 : formData.deliveryType === 'express' ? 25 : 15;
  const giftWrapCost = formData.giftWrap ? 10 : 0;
  const total = Math.max(0, subtotal - discountAmount + shippingCost + giftWrapCost);

  const fillTestCard = () => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: 'card',
      cardDetails: {
        cardNumber: '4242 4242 4242 4242',
        cardHolder: 'A. MARTINEZ DE LA VEGA',
        expiryDate: '11/28',
        cvc: '931'
      }
    }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'El nombre completo es requerido';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'Introduce un email válido';
    if (!formData.phone.trim()) errors.phone = 'Introduce un teléfono de contacto';
    if (formData.deliveryType !== 'boutique') {
      if (!formData.address.trim()) errors.address = 'La dirección de envío es requerida';
      if (!formData.city.trim()) errors.city = 'La ciudad es requerida';
      if (!formData.postalCode.trim()) errors.postalCode = 'El código postal es requerido';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = generateOrderId();
      const tracking = generateTrackingNumber();
      
      const newOrder: Order = {
        id: orderId,
        items: [...items],
        subtotal,
        discount: discountAmount,
        shippingCost,
        giftWrapCost,
        total,
        customer: formData,
        createdAt: new Date().toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: 'confirmado',
        trackingNumber: tracking,
        estimatedDelivery: '3 a 5 días hábiles'
      };

      setCompletedOrder(newOrder);
      onOrderComplete(newOrder);
      onClearCart();
      setIsSubmitting(false);
      setCurrentStep('confirmation');
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={() => {
          if (currentStep === 'confirmation') {
            onClose();
          }
        }}
      />

      <div className="relative w-full max-w-4xl bg-[#121214] border border-[#27272A] text-[#ECEAE4] z-10 shadow-2xl my-auto max-h-[100vh] sm:max-h-[92vh] flex flex-col overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#121214]/95 backdrop-blur-md border-b border-[#27272A]">
          <div className="flex items-center gap-3">
            <span className="font-serif-luxury text-xl tracking-[0.18em] text-white">
              ATELIER NOIR
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-xs font-mono uppercase text-zinc-400">
              {currentStep === 'form' ? 'Tramitación de Pedido' : 'Confirmación Oficial'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 transition-colors cursor-pointer"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: FORM & BREAKDOWN */}
        {currentStep === 'form' ? (
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* Left Column: Buyer, Shipping & Payment Details */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* 1. Datos Personales */}
                <div>
                  <h3 className="text-xs uppercase font-mono tracking-widest text-zinc-400 mb-4 pb-2 border-b border-[#27272A] flex items-center gap-2">
                    <span className="text-white">01.</span> Información del Comprador
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 mb-1">Nombre Completo</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-[#18181B] border border-[#27272A] text-xs px-3.5 py-2.5 text-white focus:outline-none focus:border-zinc-400"
                      />
                      {formErrors.fullName && <p className="text-[11px] text-red-400 mt-0.5">{formErrors.fullName}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Correo Electrónico</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[#18181B] border border-[#27272A] text-xs px-3.5 py-2.5 text-white focus:outline-none focus:border-zinc-400"
                        />
                        {formErrors.email && <p className="text-[11px] text-red-400 mt-0.5">{formErrors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Teléfono</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-[#18181B] border border-[#27272A] text-xs px-3.5 py-2.5 text-white focus:outline-none focus:border-zinc-400"
                        />
                        {formErrors.phone && <p className="text-[11px] text-red-400 mt-0.5">{formErrors.phone}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Modalidad de Entrega */}
                <div>
                  <h3 className="text-xs uppercase font-mono tracking-widest text-zinc-400 mb-4 pb-2 border-b border-[#27272A] flex items-center gap-2">
                    <span className="text-white">02.</span> Modalidad de Entrega
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, deliveryType: 'standard' })}
                      className={`p-3 text-left border text-xs font-mono transition-all cursor-pointer ${
                        formData.deliveryType === 'standard'
                          ? 'border-white bg-[#18181B] text-white'
                          : 'border-[#27272A] bg-[#141416] text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <Truck className="w-4 h-4 mb-2" />
                      <p className="font-semibold text-white">Courier Asegurado</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">3-5 días · {isFreeShipping ? '0 €' : '15 €'}</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, deliveryType: 'express' })}
                      className={`p-3 text-left border text-xs font-mono transition-all cursor-pointer ${
                        formData.deliveryType === 'express'
                          ? 'border-white bg-[#18181B] text-white'
                          : 'border-[#27272A] bg-[#141416] text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <Package className="w-4 h-4 mb-2" />
                      <p className="font-semibold text-white">Express 24/48h</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Prioridad · 25 €</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, deliveryType: 'boutique' })}
                      className={`p-3 text-left border text-xs font-mono transition-all cursor-pointer ${
                        formData.deliveryType === 'boutique'
                          ? 'border-white bg-[#18181B] text-white'
                          : 'border-[#27272A] bg-[#141416] text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <Building2 className="w-4 h-4 mb-2" />
                      <p className="font-semibold text-white">Boutique Insignia</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Recogida · 0 €</p>
                    </button>
                  </div>

                  {formData.deliveryType !== 'boutique' ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 mb-1">Dirección de Entrega</label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Calle, número, piso..."
                          className="w-full bg-[#18181B] border border-[#27272A] text-xs px-3.5 py-2.5 text-white focus:outline-none focus:border-zinc-400"
                        />
                        {formErrors.address && <p className="text-[11px] text-red-400 mt-0.5">{formErrors.address}</p>}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono text-zinc-400 mb-1">Ciudad</label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full bg-[#18181B] border border-[#27272A] text-xs px-3.5 py-2.5 text-white focus:outline-none focus:border-zinc-400"
                          />
                          {formErrors.city && <p className="text-[11px] text-red-400 mt-0.5">{formErrors.city}</p>}
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono text-zinc-400 mb-1">Código Postal</label>
                          <input
                            type="text"
                            value={formData.postalCode}
                            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                            className="w-full bg-[#18181B] border border-[#27272A] text-xs px-3.5 py-2.5 text-white focus:outline-none focus:border-zinc-400"
                          />
                          {formErrors.postalCode && <p className="text-[11px] text-red-400 mt-0.5">{formErrors.postalCode}</p>}
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-[11px] font-mono text-zinc-400 mb-1">País</label>
                          <input
                            type="text"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className="w-full bg-[#18181B] border border-[#27272A] text-xs px-3.5 py-2.5 text-white focus:outline-none focus:border-zinc-400"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 bg-[#18181B] border border-[#27272A] text-xs font-mono text-zinc-300">
                      <p className="font-semibold text-white mb-1">Boutique Madrid · Calle de Serrano 48</p>
                      <p className="text-zinc-400 text-[11px]">Tu paquete se preparará en nuestro cofre de bienvenida y estará listo para recogida en 24 horas.</p>
                    </div>
                  )}
                </div>

                {/* 3. Método de Pago (Modo Prueba Simulado Requerido) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs uppercase font-mono tracking-widest text-zinc-400 pb-2 flex items-center gap-2">
                      <span className="text-white">03.</span> Método de Pago (Modo Demostración)
                    </h3>
                  </div>

                  {/* Clarifying Disclaimer */}
                  <div className="p-2.5 bg-zinc-900/80 border border-zinc-700/60 mb-4 text-[11px] font-mono text-amber-300/90 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      <strong>Entorno de Simulación:</strong> Las opciones de pago son demostraciones interactivas. No se procesará ningún cargo real.
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className={`p-3 text-center border text-xs font-mono transition-all cursor-pointer ${
                        formData.paymentMethod === 'card'
                          ? 'border-white bg-[#18181B] text-white'
                          : 'border-[#27272A] bg-[#141416] text-zinc-400'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 mx-auto mb-1.5" />
                      <span>Tarjeta (Prueba)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'transfer' })}
                      className={`p-3 text-center border text-xs font-mono transition-all cursor-pointer ${
                        formData.paymentMethod === 'transfer'
                          ? 'border-white bg-[#18181B] text-white'
                          : 'border-[#27272A] bg-[#141416] text-zinc-400'
                      }`}
                    >
                      <Building2 className="w-4 h-4 mx-auto mb-1.5" />
                      <span>Transferencia</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'cash' })}
                      className={`p-3 text-center border text-xs font-mono transition-all cursor-pointer ${
                        formData.paymentMethod === 'cash'
                          ? 'border-white bg-[#18181B] text-white'
                          : 'border-[#27272A] bg-[#141416] text-zinc-400'
                      }`}
                    >
                      <Banknote className="w-4 h-4 mx-auto mb-1.5" />
                      <span>Efectivo / Entrega</span>
                    </button>
                  </div>

                  {/* Payment sub-panels */}
                  {formData.paymentMethod === 'card' && (
                    <div className="p-4 bg-[#18181B] border border-[#27272A] space-y-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[11px] font-mono text-zinc-400">Datos de Tarjeta Simulada</span>
                        <button
                          type="button"
                          onClick={fillTestCard}
                          className="text-[10px] text-zinc-300 hover:text-white underline font-mono cursor-pointer"
                        >
                          Rellenar tarjeta de prueba
                        </button>
                      </div>

                      <div>
                        <input
                          type="text"
                          value={formData.cardDetails?.cardNumber || ''}
                          onChange={(e) => setFormData({
                            ...formData,
                            cardDetails: { ...formData.cardDetails!, cardNumber: e.target.value }
                          })}
                          placeholder="4242 4242 4242 4242"
                          className="w-full bg-[#121214] border border-[#27272A] px-3 py-2 text-xs font-mono text-white focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={formData.cardDetails?.expiryDate || ''}
                          onChange={(e) => setFormData({
                            ...formData,
                            cardDetails: { ...formData.cardDetails!, expiryDate: e.target.value }
                          })}
                          placeholder="MM/AA"
                          className="w-full bg-[#121214] border border-[#27272A] px-3 py-2 text-xs font-mono text-white focus:outline-none"
                        />
                        <input
                          type="text"
                          value={formData.cardDetails?.cvc || ''}
                          onChange={(e) => setFormData({
                            ...formData,
                            cardDetails: { ...formData.cardDetails!, cvc: e.target.value }
                          })}
                          placeholder="CVC"
                          className="w-full bg-[#121214] border border-[#27272A] px-3 py-2 text-xs font-mono text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'transfer' && (
                    <div className="p-4 bg-[#18181B] border border-[#27272A] text-xs font-mono space-y-2">
                      <p className="text-zinc-200 font-medium">Instrucciones de Transferencia Bancaria (Demo):</p>
                      <p className="text-zinc-400 text-[11px]">
                        <strong>IBAN Simulado:</strong> ES91 2100 0418 4502 0005 1324<br />
                        <strong>Beneficiario:</strong> Atelier Noir Haute Maroquinerie S.L.<br />
                        <strong>Concepto:</strong> Tu nombre o referencia generada tras confirmar.
                      </p>
                      <p className="text-zinc-500 text-[10px]">Las piezas quedan reservadas durante 48 horas en el taller.</p>
                    </div>
                  )}

                  {formData.paymentMethod === 'cash' && (
                    <div className="p-4 bg-[#18181B] border border-[#27272A] text-xs font-mono space-y-1">
                      <p className="text-zinc-200 font-medium">Pago en Efectivo contra Entrega:</p>
                      <p className="text-zinc-400 text-[11px]">
                        El importe total de <strong>{formatPrice(total)}</strong> se abonará al mensajero de seguridad en el momento de la entrega física.
                      </p>
                    </div>
                  )}
                </div>

                {/* Gift Wrap checkbox */}
                <div className="pt-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.giftWrap}
                      onChange={(e) => setFormData({ ...formData, giftWrap: e.target.checked })}
                      className="w-4 h-4 bg-[#18181B] border-[#27272A] text-zinc-200 focus:ring-0 rounded-none cursor-pointer"
                    />
                    <span className="text-xs font-mono text-zinc-300">
                      Empaquetado Couture de Regalo (+10 €) · Caja rígida negra y cinta de grosgrain
                    </span>
                  </label>
                </div>

              </div>

              {/* Right Column: Order Summary & Confirmation CTA */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-[#18181B] border border-[#27272A] p-6">
                <div>
                  <h3 className="text-xs uppercase font-mono tracking-widest text-zinc-400 mb-4 pb-2 border-b border-[#27272A]">
                    Resumen del Pedido ({items.length} {items.length === 1 ? 'artículo' : 'artículos'})
                  </h3>

                  {/* Items mini list */}
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-[#27272A]/40 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="pt-2 first:pt-0 flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover bg-black border border-[#27272A] shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-serif-luxury text-sm text-white truncate">{item.product.name}</p>
                          <p className="text-[10px] text-zinc-400 font-mono">
                            Cant: {item.quantity} {item.selectedVariant && `· ${item.selectedVariant.optionLabel}`}
                          </p>
                        </div>
                        <span className="text-xs font-mono tabular-nums text-zinc-200">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Math Breakdown */}
                  <div className="space-y-2 text-xs font-mono border-t border-[#27272A] pt-4">
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
                      <span>Envío ({formData.deliveryType})</span>
                      <span className="tabular-nums text-zinc-200">
                        {shippingCost === 0 ? 'Cortesía (0 €)' : formatPrice(shippingCost)}
                      </span>
                    </div>

                    {formData.giftWrap && (
                      <div className="flex justify-between text-zinc-400">
                        <span>Packaging Couture</span>
                        <span className="tabular-nums text-zinc-200">{formatPrice(giftWrapCost)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-base font-serif-luxury text-white pt-3 border-t border-[#27272A]">
                      <span>Total Definitivo</span>
                      <span className="font-mono tabular-nums font-semibold">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-[#ECEAE4] hover:bg-white text-[#0D0D0E] text-xs font-semibold uppercase tracking-[0.2em] transition-all cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? 'Formalizando Registro...' : 'Confirmar Pedido de Demostración'}
                  </button>

                  <p className="text-[10px] text-center text-zinc-500 font-mono">
                    Al confirmar, se generará una orden oficial de prueba simulada.
                  </p>
                </div>
              </div>

            </div>
          </form>
        ) : (
          /* STEP 2: COMPLETE ORDER CONFIRMATION VIEW */
          <div className="p-6 sm:p-10 lg:p-14 text-center max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500 block mb-2">
                Demostración Completada con Éxito
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white">
                Pedido {completedOrder?.id} Formalizado
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm mt-2 font-light">
                Gracias, <strong className="text-zinc-200">{completedOrder?.customer.fullName}</strong>. Hemos registrado tu solicitud en el taller de Atelier Noir.
              </p>
            </div>

            {/* Official Order Receipt Card */}
            <div className="p-6 bg-[#18181B] border border-[#27272A] text-left text-xs font-mono space-y-3">
              <div className="flex justify-between pb-3 border-b border-[#27272A]">
                <span className="text-zinc-400">Número de Seguimiento:</span>
                <span className="text-white font-semibold">{completedOrder?.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Fecha y Hora:</span>
                <span className="text-zinc-200">{completedOrder?.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Modalidad de Envío:</span>
                <span className="text-zinc-200 capitalize">{completedOrder?.customer.deliveryType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Método de Pago:</span>
                <span className="text-zinc-200 capitalize">
                  {completedOrder?.customer.paymentMethod === 'card' && 'Tarjeta (Sandbox Demo)'}
                  {completedOrder?.customer.paymentMethod === 'transfer' && 'Transferencia Bancaria'}
                  {completedOrder?.customer.paymentMethod === 'cash' && 'Efectivo contra Entrega'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Destino:</span>
                <span className="text-zinc-200">
                  {completedOrder?.customer.city}, {completedOrder?.customer.country}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#27272A] text-sm text-white font-serif-luxury">
                <span>Total Facturado (Simulado):</span>
                <span className="font-mono tabular-nums font-semibold">{formatPrice(completedOrder?.total || 0)}</span>
              </div>
            </div>

            {/* Notice regarding real vs simulated */}
            <p className="text-[11px] text-zinc-500 font-mono">
              Nota técnica: Esta transacción se ha ejecutado en modo demostración. No se han almacenado credenciales bancarias ni realizado cargos monetarios reales.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 border border-[#27272A] hover:border-zinc-400 text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir Resumen</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#ECEAE4] hover:bg-white text-[#0D0D0E] text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer"
              >
                Volver a la Tienda
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
