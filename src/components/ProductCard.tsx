import React, { useState } from 'react';
import { Product } from '../types';
import { formatPrice } from '../utils/formatters';
import { ShoppingBag, Eye, ImageOff } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickAdd: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickAdd,
  onViewDetails
}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const currentImage = product.images[imageIndex] || product.images[0];

  return (
    <article className="group flex flex-col bg-[#141416] border border-[#27272A]/70 hover:border-zinc-500 transition-all duration-300">
      {/* Product Image Stage */}
      <div
        className="relative aspect-[4/3] sm:aspect-[1/1] w-full overflow-hidden bg-[#18181B] cursor-pointer"
        onClick={() => onViewDetails(product)}
        onMouseEnter={() => {
          if (product.images.length > 1) {
            setImageIndex(1);
          }
        }}
        onMouseLeave={() => setImageIndex(0)}
      >
        {!imageError ? (
          <img
            src={currentImage}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-zinc-500 bg-[#1A1A1D]">
            <ImageOff className="w-8 h-8 mb-2 stroke-1 text-zinc-600" />
            <span className="text-xs font-mono">{product.name}</span>
          </div>
        )}

        {/* Subtle unboxed status indicators (Zero-pill discipline) */}
        <div className="absolute top-3 left-3 flex items-center gap-2 text-[11px] font-mono tracking-wider">
          {product.isNew && (
            <span className="bg-black/60 backdrop-blur-sm text-zinc-200 px-2 py-0.5 border border-white/10 uppercase">
              Novedad
            </span>
          )}
          {product.isLimited && (
            <span className="bg-black/60 backdrop-blur-sm text-amber-200/90 px-2 py-0.5 border border-amber-500/20 uppercase">
              Edición Limitada
            </span>
          )}
        </div>

        {/* Action Overlay on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="px-3 py-1.5 bg-[#18181B]/90 hover:bg-[#27272A] text-zinc-200 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer border border-[#27272A]"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Detalles</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            disabled={!product.inStock}
            className={`px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              product.inStock
                ? 'bg-[#ECEAE4] hover:bg-white text-[#0D0D0E]'
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{product.inStock ? 'Añadir' : 'Agotado'}</span>
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Status: Clean unboxed metadata with typographic separators */}
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-zinc-500 uppercase mb-1.5">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.inStock ? `${product.stockCount} en taller` : 'Agotado temporal'}</span>
          </div>

          <h3
            onClick={() => onViewDetails(product)}
            className="font-serif-luxury text-lg sm:text-xl font-normal text-[#ECEAE4] group-hover:text-white transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-zinc-400 line-clamp-2 mt-1 font-light leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Variant Hints */}
        <div className="pt-3 border-t border-[#27272A]/60 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono tabular-nums text-sm sm:text-base font-medium text-[#ECEAE4]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="font-mono tabular-nums text-xs text-zinc-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {product.variants && (
            <span className="text-[11px] text-zinc-500 font-mono">
              {product.variants.options.length} {product.variants.name.toLowerCase()}s
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
