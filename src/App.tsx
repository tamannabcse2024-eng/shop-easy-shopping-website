/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, PlacedOrder } from './types';
import { PRODUCTS, CATEGORIES } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CartView } from './components/CartView';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { SlidersHorizontal, ArrowUpDown, Sparkles, ShoppingBag } from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<'home' | 'products' | 'cart'>('home');
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  // Modals & Drawers
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart State with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('shopeasy_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('shopeasy_cart_v1', JSON.stringify(cartItems));
    } catch {
      // Ignore write errors if storage quota full
    }
  }, [cartItems]);

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    setToastMessage(`Added "${product.name}" to cart`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
    setToastMessage('All items removed from your cart');
  };

  const handleBuyNow = (product: Product, quantity = 1) => {
    handleAddToCart(product, quantity);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: PlacedOrder) => {
    // Clear cart once order is confirmed
    setCartItems([]);
    setToastMessage(`Order ${order.orderId} placed successfully!`);
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        cartCount={totalCartCount}
        openCartDrawer={() => setIsCartDrawerOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          if (q.trim() && currentTab === 'cart') {
            setCurrentTab('products');
          }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'cart' ? (
          <CartView
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onCheckout={() => setIsCheckoutOpen(true)}
            onContinueShopping={() => setCurrentTab('products')}
          />
        ) : (
          <>
            {/* Show Hero on Home View */}
            {currentTab === 'home' && (
              <Hero onShopNow={() => setCurrentTab('products')} />
            )}

            {/* Products Section */}
            <section
              id="products-section"
              className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
            >
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{currentTab === 'home' ? 'Featured Selection' : 'Our Catalog'}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
                    {searchQuery
                      ? `Results for "${searchQuery}"`
                      : currentTab === 'home'
                      ? 'Simple Everyday Essentials'
                      : 'All Products'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Showing {filteredProducts.length} of {PRODUCTS.length} curated products
                  </p>
                </div>

                {/* Filters & Sorting */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Category interactive buttons */}
                  <div className="flex items-center gap-1 p-1 bg-slate-200/60 rounded-xl overflow-x-auto max-w-full">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                          selectedCategory === cat
                            ? 'bg-white text-slate-900 shadow-xs font-semibold'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Sort selector */}
                  <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 shadow-2xs">
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="text-xs font-medium text-slate-700 bg-transparent focus:outline-none cursor-pointer"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="name">Name: A to Z</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              {filteredProducts.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
                    <SlidersHorizontal className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-800">
                    No products found matching your search
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Try searching for another keyword or reset the category filter.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mt-8">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={(prod) => handleAddToCart(prod, 1)}
                      onQuickView={(prod) => setQuickViewProduct(prod)}
                      onBuyNow={(prod) => handleBuyNow(prod, 1)}
                    />
                  ))}
                </div>
              )}

              {/* Bottom Callout banner */}
              {currentTab === 'home' && (
                <div className="mt-14 bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center md:text-left">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Why ShopEasy?
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold">
                      No sign-up hassle. No hidden fees. Just easy checkout.
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                      We believe online shopping should be intuitive and direct. Pick your items, review your cart with real-time totals, and checkout in under 30 seconds.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentTab('products');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs sm:text-sm rounded-xl shrink-0 transition-colors cursor-pointer shadow-md"
                  >
                    Explore Full Store
                  </button>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartDrawerOpen(false);
          setIsCheckoutOpen(true);
        }}
        onNavigateToProducts={() => {
          setIsCartDrawerOpen(false);
          setCurrentTab('products');
        }}
      />

      {/* Quick View Product Modal */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(prod, qty) => handleAddToCart(prod, qty)}
        onBuyNow={(prod, qty) => handleBuyNow(prod, qty)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Action Toast Alert */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
        onAction={() => {
          setIsCartDrawerOpen(true);
        }}
        actionLabel="View Cart"
      />

      {/* Mandatory Footer with © 2026 ShopEasy */}
      <Footer onNavigate={(tab) => setCurrentTab(tab)} />

    </div>
  );
}
