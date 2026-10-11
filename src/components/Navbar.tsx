import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { ProductCategory } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategory: (category: ProductCategory | 'todos') => void;
  activeCategory: ProductCategory | 'todos';
  onOpenSearch: () => void;
  onOpenAccount: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onSelectCategory,
  activeCategory,
  onOpenSearch,
  onOpenAccount
}) => {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; category: ProductCategory | 'todos' }[] = [
    { label: 'Colección', category: 'todos' },
    { label: 'Gorras', category: 'gorras' },
    { label: 'Perfumes', category: 'perfumes' },
    { label: 'Relojes', category: 'relojes' },
    { label: 'Carteras', category: 'carteras' },
    { label: 'Accesorios', category: 'accesorios' }
  ];

  const handleNavClick = (category: ProductCategory | 'todos') => {
    onSelectCategory(category);
    setMobileMenuOpen(false);
    const catalogElement = document.getElementById('catalogo');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0D0D0E]/95 backdrop-blur-md border-b border-[#27272A]/70">
      {/* Top Promotional Announcement */}
      {!bannerDismissed && (
        <div className="bg-[#18181B] border-b border-[#27272A]/60 px-4 py-2 text-center text-xs tracking-wider text-zinc-300 flex items-center justify-between h-9">
          <div className="w-6" aria-hidden="true" />
          <p className="truncate">
            <span>Envío asegurado de cortesía en pedidos sobre 150 €</span>
            <span className="mx-2 text-zinc-600">·</span>
            <span className="text-zinc-200">Código promocional: <strong className="font-semibold text-white tracking-widest">BIENVENUE10</strong> (-10%)</span>
          </p>
          <button
            onClick={() => setBannerDismissed(true)}
            className="text-zinc-500 hover:text-zinc-300 p-1 transition-colors"
            aria-label="Cerrar anuncio"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation Bar — Top Bar 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-serif-luxury text-2xl sm:text-3xl tracking-[0.22em] font-medium text-[#ECEAE4] hover:text-white transition-colors whitespace-nowrap shrink-0"
        >
          ATELIER NOIR
        </a>

        {/* Zone 2: Navigation Links (Clean single-line text links) */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.16em] font-medium text-zinc-400">
          {navItems.map((item) => (
            <button
              key={item.category}
              onClick={() => handleNavClick(item.category)}
              className={`transition-colors whitespace-nowrap py-1 relative cursor-pointer ${
                activeCategory === item.category
                  ? 'text-[#ECEAE4] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[#ECEAE4]'
                  : 'hover:text-zinc-200'
              }`}
            >
              {item.label}
            </button>
          ))}
          <a
            href="#editorial"
            className="hover:text-zinc-200 transition-colors whitespace-nowrap py-1"
          >
            Editorial
          </a>
        </nav>

        {/* Zone 3: Interactive Affordances (Search, Account, Cart) */}
        <div className="flex items-center gap-4 sm:gap-5 shrink-0">
          <button
            onClick={onOpenSearch}
            className="text-zinc-300 hover:text-white transition-colors p-1.5 cursor-pointer"
            aria-label="Buscar en el catálogo"
            title="Buscar"
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={onOpenAccount}
            className="text-zinc-300 hover:text-white transition-colors p-1.5 cursor-pointer hidden sm:block"
            aria-label="Cuenta y Concierge"
            title="Mi Cuenta & Concierge"
          >
            <User className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 text-zinc-300 hover:text-white transition-colors p-1.5 cursor-pointer"
            aria-label={`Ver cesta de compra, ${cartCount} artículos`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-xs font-mono tabular-nums tracking-wider text-zinc-300 hidden sm:inline">
              ({cartCount})
            </span>
            {cartCount > 0 && (
              <span className="sm:hidden absolute -top-1 -right-1 w-4 h-4 bg-[#ECEAE4] text-[#0D0D0E] text-[10px] font-bold flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-zinc-300 hover:text-white p-1.5 cursor-pointer"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121214] border-b border-[#27272A] px-6 py-6 animate-in slide-in-from-top duration-200">
          <p className="text-[11px] uppercase tracking-widest text-zinc-500 mb-4 font-mono">
            Explorar Categorías
          </p>
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.category}
                onClick={() => handleNavClick(item.category)}
                className={`text-left text-sm uppercase tracking-wider py-1.5 cursor-pointer ${
                  activeCategory === item.category
                    ? 'text-white font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="#editorial"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left text-sm uppercase tracking-wider py-1.5 text-zinc-400 hover:text-zinc-200"
            >
              Editorial & Manifiesto
            </a>
            <div className="pt-4 border-t border-[#27272A] flex justify-between items-center text-xs text-zinc-400">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="flex items-center gap-2 hover:text-white"
              >
                <User className="w-4 h-4" />
                <span>Concierge & Círculo Privado</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
