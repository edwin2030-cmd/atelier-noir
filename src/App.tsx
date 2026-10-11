/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Product, CartItem, Coupon, Order, ProductCategory } from './types';
import { INITIAL_PRODUCTS, DEMO_COUPONS } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CollectionsGrid } from './components/CollectionsGrid';
import { CatalogSection } from './components/CatalogSection';
import { EditorialStory } from './components/EditorialStory';
import { BenefitsSection } from './components/BenefitsSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchAccountModal } from './components/SearchAccountModal';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  
  // Cart state persisted to localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_noir_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Applied Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem('atelier_noir_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Past Orders state
  const [pastOrders, setPastOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_noir_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Navigation & Filter state
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'todos'>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers state
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchAccountMode, setSearchAccountMode] = useState<'search' | 'account' | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('atelier_noir_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Could not persist cart to localStorage', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem('atelier_noir_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('atelier_noir_coupon');
      }
    } catch (e) {
      console.warn('Could not persist coupon to localStorage', e);
    }
  }, [appliedCoupon]);

  useEffect(() => {
    try {
      localStorage.setItem('atelier_noir_orders', JSON.stringify(pastOrders));
    } catch (e) {
      console.warn('Could not persist orders to localStorage', e);
    }
  }, [pastOrders]);

  const addToast = useCallback((type: 'success' | 'info' | 'warning', message: string) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    selectedVariant?: { variantName: string; optionId: string; optionLabel: string; priceModifier?: number },
    quantity: number = 1
  ) => {
    const variantKey = selectedVariant ? `${product.id}-${selectedVariant.optionId}` : product.id;
    const itemPrice = product.price + (selectedVariant?.priceModifier || 0);

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === variantKey);
      if (existingIndex > -1) {
        const next = [...prev];
        const newQty = Math.min(product.stockCount, next[existingIndex].quantity + quantity);
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: newQty
        };
        return next;
      } else {
        return [
          ...prev,
          {
            id: variantKey,
            product,
            selectedVariant,
            quantity,
            unitPrice: itemPrice
          }
        ];
      }
    });

    addToast('success', `${product.name} añadido a la cesta.`);
  };

  const handleQuickAdd = (product: Product) => {
    let defaultVariant;
    if (product.variants && product.variants.options.length > 0) {
      const firstInStock = product.variants.options.find((o) => o.inStock) || product.variants.options[0];
      defaultVariant = {
        variantName: product.variants.name,
        optionId: firstInStock.id,
        optionLabel: firstInStock.label,
        priceModifier: firstInStock.priceModifier
      };
    }
    handleAddToCart(product, defaultVariant, 1);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const clamped = Math.min(item.product.stockCount, newQty);
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => {
      const itemToRemove = prev.find((i) => i.id === cartItemId);
      if (itemToRemove) {
        addToast('info', `${itemToRemove.product.name} retirado de la cesta.`);
      }
      return prev.filter((i) => i.id !== cartItemId);
    });
  };

  const handleApplyCoupon = (code: string): { success: boolean; message: string } => {
    const normalized = code.trim().toUpperCase();
    const found = DEMO_COUPONS.find((c) => c.code === normalized);
    if (!found) {
      return { success: false, message: 'Código no reconocido. Prueba BIENVENUE10 (-10%) o NOIR15 (-15%).' };
    }

    const currentSubtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    if (found.minAmount && currentSubtotal < found.minAmount) {
      return {
        success: false,
        message: `El código ${found.code} requiere una cesta mínima de ${found.minAmount} €.`
      };
    }

    setAppliedCoupon(found);
    addToast('success', `Cupón ${found.code} aplicado: ${found.discountPercent}% de reducción.`);
    return { success: true, message: `Descuento del ${found.discountPercent}% aplicado con éxito.` };
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    addToast('info', 'Código promocional retirado.');
  };

  const handleClearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const handleOrderComplete = (order: Order) => {
    setPastOrders((prev) => [order, ...prev]);
    addToast('success', `Pedido ${order.id} formalizado correctamente en el taller.`);
  };

  // Scroll helpers
  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNewArrivalsClick = () => {
    setSelectedCategory('todos');
    scrollToCatalog();
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0D0D0E] text-[#ECEAE4] flex flex-col font-sans-luxury">
      
      {/* Navigation Header */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        activeCategory={selectedCategory}
        onOpenSearch={() => setSearchAccountMode('search')}
        onOpenAccount={() => setSearchAccountMode('account')}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExploreClick={scrollToCatalog}
          onNewArrivalsClick={handleNewArrivalsClick}
        />

        {/* 2. Visual Collections Grid */}
        <CollectionsGrid
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
          }}
        />

        {/* 3. Official Catalog Section with Filters, Search and Sorting */}
        <CatalogSection
          products={products}
          selectedCategory={selectedCategory}
          onCategoryChange={(cat) => setSelectedCategory(cat)}
          onQuickAdd={handleQuickAdd}
          onViewDetails={(product) => setSelectedProductForDetail(product)}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
        />

        {/* 4. High-Fashion Editorial Campaign & Manifesto */}
        <EditorialStory
          onDiscoverClick={scrollToCatalog}
        />

        {/* 5. Purchase Benefits, Packaging & Return Guarantees */}
        <BenefitsSection />

        {/* 6. Newsletter Subscription */}
        <NewsletterSection />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
        }}
      />

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={handleAddToCart}
        allProducts={products}
        onSelectRelated={(relatedProd) => setSelectedProductForDetail(relatedProd)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Process Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedCoupon={appliedCoupon}
        onOrderComplete={handleOrderComplete}
        onClearCart={handleClearCart}
      />

      {/* Search & Concierge Modal */}
      <SearchAccountModal
        mode={searchAccountMode}
        onClose={() => setSearchAccountMode(null)}
        products={products}
        onSelectProduct={(product) => setSelectedProductForDetail(product)}
        pastOrders={pastOrders}
      />

      {/* Refined Toast Notifications */}
      <ToastContainer
        toasts={toasts}
        onDismiss={handleDismissToast}
      />
    </div>
  );
}
