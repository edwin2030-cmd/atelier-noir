import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { formatPrice } from '../utils/formatters';
import { X, Check, ShoppingBag, Shield, Truck, RefreshCw } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    selectedVariant?: { variantName: string; optionId: string; optionLabel: string; priceModifier?: number },
    quantity?: number
  ) => void;
  allProducts: Product[];
  onSelectRelated: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  allProducts,
  onSelectRelated
}) => {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantOption, setSelectedVariantOption] = useState<string>('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Initialize or reset variant and image index when product changes
  useEffect(() => {
    if (product) {
      setSelectedImageIdx(0);
      setQuantity(1);
      setAddedSuccess(false);
      if (product.variants && product.variants.options.length > 0) {
        const firstAvailable = product.variants.options.find(o => o.inStock) || product.variants.options[0];
        setSelectedVariantOption(firstAvailable.id);
      } else {
        setSelectedVariantOption('');
      }
    }
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  // Selected variant details
  const selectedOptionObj = product.variants?.options.find(o => o.id === selectedVariantOption);
  const priceModifier = selectedOptionObj?.priceModifier || 0;
  const currentPrice = product.price + priceModifier;

  const handleAddToCart = () => {
    const variantData = product.variants && selectedOptionObj
      ? {
          variantName: product.variants.name,
          optionId: selectedOptionObj.id,
          optionLabel: selectedOptionObj.label,
          priceModifier: selectedOptionObj.priceModifier
        }
      : undefined;

    onAddToCart(product, variantData, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  // Related products (same category or featured, excluding current)
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.featured))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-5xl bg-[#121214] border border-[#27272A] text-[#ECEAE4] z-10 shadow-2xl my-auto max-h-[100vh] sm:max-h-[92vh] flex flex-col overflow-y-auto">
        
        {/* Top Header with Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#121214]/95 backdrop-blur-md border-b border-[#27272A]">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400">
            Ficha Técnica · {product.categoryLabel}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Cerrar modal de producto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Contiguous Purchase Module Split */}
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left: Gallery Column */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Main Image Stage */}
              <div className="relative aspect-[4/3] sm:aspect-[1/1] w-full bg-[#18181B] border border-[#27272A] overflow-hidden">
                <img
                  src={product.images[selectedImageIdx] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                
                {product.isLimited && (
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 border border-amber-500/30 text-amber-200 text-xs font-mono uppercase">
                    Pieza Numerada
                  </div>
                )}
              </div>

              {/* Thumbnails Row */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`relative w-20 h-20 shrink-0 bg-[#18181B] border cursor-pointer overflow-hidden transition-all ${
                        selectedImageIdx === idx
                          ? 'border-white opacity-100 ring-1 ring-white'
                          : 'border-[#27272A] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} vista ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Purchase & Details Column */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                {/* Meta unboxed info */}
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
                  <span>{product.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.inStock ? `${product.stockCount} disponibles` : 'Agotado'}</span>
                </div>

                <h1 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-white mb-2 leading-tight">
                  {product.name}
                </h1>

                <p className="text-zinc-400 text-xs sm:text-sm mb-4 font-light leading-relaxed">
                  {product.subtitle}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[#27272A]">
                  <span className="font-mono tabular-nums text-2xl font-medium text-white">
                    {formatPrice(currentPrice)}
                  </span>
                  {product.originalPrice && (
                    <span className="font-mono tabular-nums text-sm text-zinc-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-[11px] text-zinc-500 font-mono">IVA incluido</span>
                </div>

                {/* Variant Selector */}
                {product.variants && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2.5">
                      <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                        {product.variants.name}
                      </span>
                      {selectedOptionObj && (
                        <span className="text-xs font-mono text-zinc-300">
                          {selectedOptionObj.label}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSelectedVariantOption(option.id)}
                          disabled={!option.inStock}
                          className={`px-3.5 py-2 text-xs font-mono border transition-all cursor-pointer ${
                            selectedVariantOption === option.id
                              ? 'bg-[#ECEAE4] text-[#0D0D0E] border-[#ECEAE4] font-medium'
                              : option.inStock
                              ? 'bg-[#18181B] text-zinc-300 border-[#27272A] hover:border-zinc-500'
                              : 'bg-zinc-900/50 text-zinc-600 border-zinc-800 line-through cursor-not-allowed'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & Add to Cart Controls */}
                <div className="flex items-center gap-4 mb-6">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#27272A] bg-[#18181B]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="px-3 py-2.5 text-zinc-400 hover:text-white transition-colors disabled:opacity-30 cursor-pointer"
                      aria-label="Reducir cantidad"
                    >
                      -
                    </button>
                    <span className="px-3 font-mono tabular-nums text-xs font-medium text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      disabled={quantity >= product.stockCount}
                      className="px-3 py-2.5 text-zinc-400 hover:text-white transition-colors disabled:opacity-30 cursor-pointer"
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>

                  {/* Primary Add Action */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`flex-1 flex items-center justify-center gap-2.5 py-3 px-6 text-xs font-semibold uppercase tracking-[0.18em] transition-all cursor-pointer ${
                      addedSuccess
                        ? 'bg-emerald-600 text-white'
                        : product.inStock
                        ? 'bg-[#ECEAE4] hover:bg-white text-[#0D0D0E]'
                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    }`}
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Añadido a la Cesta</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>{product.inStock ? 'Añadir a la Cesta' : 'Agotado Temporal'}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Delivery & Assurance Guarantees */}
                <div className="grid grid-cols-3 gap-2 py-4 border-y border-[#27272A]/70 text-[11px] text-zinc-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>Envío 24/48h</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>Garantía 2 años</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>30 días cambio</span>
                  </div>
                </div>

                {/* Description & Technical Tabs */}
                <div className="mt-6 space-y-4">
                  <div>
                    <h4 className="text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2">
                      Descripción de la Casa
                    </h4>
                    <p className="text-xs text-zinc-300 font-light leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Craftsmanship Details */}
                  {product.details && product.details.length > 0 && (
                    <div>
                      <h4 className="text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2">
                        Especificaciones & Artesanía
                      </h4>
                      <ul className="space-y-1.5">
                        {product.details.map((detail, idx) => (
                          <li key={idx} className="text-xs text-zinc-400 flex items-start gap-2">
                            <span className="text-zinc-600 select-none">―</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Materials & Dimensions */}
                  <div className="pt-2 text-[11px] font-mono text-zinc-500 space-y-1">
                    <p><strong className="text-zinc-400">Materiales:</strong> {product.materials}</p>
                    {product.dimensionsOrSpecs && (
                      <p><strong className="text-zinc-400">Dimensiones / Calibre:</strong> {product.dimensionsOrSpecs}</p>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Related Products Recommendation Row */}
          {relatedProducts.length > 0 && (
            <div className="mt-14 pt-10 border-t border-[#27272A]">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                  Selección Afín
                </span>
                <span className="text-xs text-zinc-400 font-mono">Otras piezas recomendadas</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="p-3 bg-[#18181B] border border-[#27272A] hover:border-zinc-400 transition-colors cursor-pointer group flex items-center gap-3"
                  >
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      className="w-16 h-16 object-cover bg-black shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="overflow-hidden">
                      <p className="font-serif-luxury text-sm text-white group-hover:text-zinc-200 truncate">
                        {rel.name}
                      </p>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono truncate">
                        {rel.categoryLabel}
                      </p>
                      <p className="font-mono tabular-nums text-xs text-zinc-300 mt-0.5">
                        {formatPrice(rel.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
