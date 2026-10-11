import React, { useState, useMemo } from 'react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { CATEGORIES_CONFIG } from '../data/products';
import { Search, SlidersHorizontal, X, Sparkles } from 'lucide-react';

interface CatalogSectionProps {
  products: Product[];
  selectedCategory: ProductCategory | 'todos';
  onCategoryChange: (category: ProductCategory | 'todos') => void;
  onQuickAdd: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

type SortOption = 'destacados' | 'precio-asc' | 'precio-desc' | 'novedades';

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  selectedCategory,
  onCategoryChange,
  onQuickAdd,
  onViewDetails,
  searchQuery,
  onSearchChange
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('destacados');
  const [onlyLimited, setOnlyLimited] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'todos' && p.category !== selectedCategory) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchSub = p.subtitle.toLowerCase().includes(q);
          const matchCat = p.categoryLabel.toLowerCase().includes(q);
          const matchMat = p.materials.toLowerCase().includes(q);
          if (!matchName && !matchSub && !matchCat && !matchMat) return false;
        }
        // Special filters
        if (onlyLimited && !p.isLimited) return false;
        if (onlyNew && !p.isNew) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'precio-asc') return a.price - b.price;
        if (sortBy === 'precio-desc') return b.price - a.price;
        if (sortBy === 'novedades') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        // Default 'destacados'
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, onlyLimited, onlyNew, sortBy]);

  const hasActiveFilters = searchQuery !== '' || onlyLimited || onlyNew || selectedCategory !== 'todos';

  const resetFilters = () => {
    onCategoryChange('todos');
    onSearchChange('');
    setOnlyLimited(false);
    setOnlyNew(false);
    setSortBy('destacados');
  };

  return (
    <section id="catalogo" className="py-20 lg:py-28 bg-[#0D0D0E] border-b border-[#27272A]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="mb-10">
          <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-mono block mb-2">
            Catálogo Oficial
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-[#ECEAE4]">
              Inventario de Objetos
            </h2>
            <p className="text-xs font-mono text-zinc-400">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'pieza disponible' : 'piezas catalogadas'}
            </p>
          </div>
        </div>

        {/* Category Tabs (Segmented Controls with Click Handlers) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#27272A]/60 scrollbar-none">
          {CATEGORIES_CONFIG.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id as ProductCategory | 'todos')}
              className={`px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] whitespace-nowrap transition-all cursor-pointer border ${
                selectedCategory === cat.id
                  ? 'bg-[#ECEAE4] text-[#0D0D0E] border-[#ECEAE4]'
                  : 'bg-transparent text-zinc-400 border-transparent hover:text-white hover:border-[#27272A]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-10 bg-[#121214] p-4 border border-[#27272A]/70">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por nombre, cuero, notas o material..."
              className="w-full bg-[#18181B] text-zinc-200 text-xs pl-10 pr-9 py-2.5 border border-[#27272A] focus:outline-none focus:border-zinc-400 placeholder:text-zinc-600 font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white p-0.5 cursor-pointer"
                title="Limpiar búsqueda"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Toggle Filters */}
          <div className="md:col-span-4 flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => setOnlyNew(!onlyNew)}
              className={`px-3 py-2 text-xs font-mono tracking-wider transition-colors cursor-pointer border ${
                onlyNew
                  ? 'bg-zinc-800 text-white border-zinc-600'
                  : 'bg-[#18181B] text-zinc-400 border-[#27272A] hover:text-zinc-200'
              }`}
            >
              Novedades
            </button>

            <button
              onClick={() => setOnlyLimited(!onlyLimited)}
              className={`px-3 py-2 text-xs font-mono tracking-wider transition-colors cursor-pointer border ${
                onlyLimited
                  ? 'bg-zinc-800 text-white border-zinc-600'
                  : 'bg-[#18181B] text-zinc-400 border-[#27272A] hover:text-zinc-200'
              }`}
            >
              Edición Limitada
            </button>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-zinc-400 hover:text-white underline font-mono cursor-pointer ml-auto sm:ml-0"
              >
                Restablecer
              </button>
            )}
          </div>

          {/* Sorting Dropdown */}
          <div className="md:col-span-3 flex items-center justify-end gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-[#18181B] text-zinc-300 text-xs px-3 py-2 border border-[#27272A] focus:outline-none focus:border-zinc-400 font-mono cursor-pointer w-full sm:w-auto"
            >
              <option value="destacados">Orden: Destacados</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
              <option value="novedades">Novedades Primero</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickAdd={onQuickAdd}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-[#27272A] bg-[#121214] p-8 max-w-xl mx-auto">
            <Sparkles className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
            <h3 className="font-serif-luxury text-2xl text-white mb-2">No se encontraron piezas</h3>
            <p className="text-zinc-400 text-xs mb-6 font-light">
              No hay objetos que coincidan con los criterios de búsqueda o filtros seleccionados en este momento.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 bg-[#ECEAE4] text-[#0D0D0E] text-xs font-semibold uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
            >
              Ver Todo el Catálogo
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
