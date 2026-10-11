export type ProductCategory = 'gorras' | 'perfumes' | 'relojes' | 'carteras' | 'accesorios';

export interface ProductVariant {
  name: string; // e.g. "Talla", "Volumen", "Acabado"
  options: {
    id: string;
    label: string;
    inStock: boolean;
    priceModifier?: number;
  }[];
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  isLimited?: boolean;
  inStock: boolean;
  stockCount: number;
  description: string;
  details: string[];
  materials: string;
  dimensionsOrSpecs?: string;
  images: string[];
  variants?: ProductVariant;
  featured?: boolean;
}

export interface CartItem {
  id: string; // cart item unique ID (productId + variant option id)
  product: Product;
  selectedVariant?: {
    variantName: string;
    optionId: string;
    optionLabel: string;
    priceModifier?: number;
  };
  quantity: number;
  unitPrice: number;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minAmount?: number;
  description: string;
}

export interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  postalCode: string;
  country: string;
  deliveryType: 'standard' | 'express' | 'boutique';
  paymentMethod: 'card' | 'transfer' | 'cash';
  cardDetails?: {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvc: string;
  };
  giftWrap?: boolean;
  orderNotes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  giftWrapCost: number;
  total: number;
  customer: CheckoutForm;
  createdAt: string;
  status: 'confirmado' | 'en_preparacion';
  trackingNumber: string;
  estimatedDelivery: string;
}
