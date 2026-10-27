import React, { useState } from 'react';
import { ShoppingBag, Search, ShoppingCart, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentTab: 'home' | 'products' | 'cart';
  setCurrentTab: (tab: 'home' | 'products' | 'cart') => void;
  cartCount: number;
  openCartDrawer: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  cartCount,
  openCartDrawer,
  searchQuery,
  setSearchQuery,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: 'home' | 'products' | 'cart') => {
    setCurrentTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0 select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm group-hover:bg-emerald-700 transition-colors">
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                Shop<span className="text-emerald-600">Easy</span>
              </span>
              <span className="hidden sm:block text-[10px] font-medium tracking-wider uppercase text-slate-500">
                Simple Essentials
              </span>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation & Cart Actions */}
          <div className="flex items-center gap-2 sm:gap-6">
            {/* Desktop Navigation */}
            <nav className="hidden sm:flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => handleNavClick('home')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  currentTab === 'home'
                    ? 'text-emerald-700 bg-emerald-50/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('products')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  currentTab === 'products'
                    ? 'text-emerald-700 bg-emerald-50/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => handleNavClick('cart')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                  currentTab === 'cart'
                    ? 'text-emerald-700 bg-emerald-50/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Cart
              </button>
            </nav>

            {/* Quick Cart Button with badge */}
            <button
              onClick={openCartDrawer}
              aria-label={`Open shopping cart with ${cartCount} items`}
              className="relative p-2.5 rounded-lg text-slate-700 hover:text-emerald-600 hover:bg-slate-50 transition-colors flex items-center gap-2 border border-slate-200/80 cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline text-xs font-semibold text-slate-800">
                Cart
              </span>
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-bold leading-none text-white bg-emerald-600 rounded-full">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="sm:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
              currentTab === 'home'
                ? 'bg-emerald-50 text-emerald-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('products')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
              currentTab === 'products'
                ? 'bg-emerald-50 text-emerald-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => handleNavClick('cart')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium flex items-center justify-between ${
              currentTab === 'cart'
                ? 'bg-emerald-50 text-emerald-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>Cart</span>
            <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
              {cartCount} items
            </span>
          </button>
        </div>
      )}
    </header>
  );
};
