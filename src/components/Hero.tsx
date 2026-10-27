import React from 'react';
import { ArrowRight, Truck, ShieldCheck, RotateCcw } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-slate-50/30 to-white pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Curated Spring Collection 2026
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Everyday essentials, <br className="hidden sm:inline" />
              <span className="text-emerald-700">thoughtfully made.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Welcome to ShopEasy. Discover our handpicked selection of premium daily gear — designed for simplicity, durability, and comfort.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onShopNow}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm shadow-sm transition-all hover:shadow cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <div className="text-xs text-slate-500 font-medium py-1">
                ⭐ 4.9/5 Average rating across 600+ reviews
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-lg border border-slate-200/60 bg-white group">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
                alt="ShopEasy Lifestyle Essentials"
                className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="eager"
              />
              <div className="p-4 bg-white/95 backdrop-blur-xs flex items-center justify-between border-t border-slate-100">
                <div>
                  <p className="text-xs font-semibold text-slate-900">Curated Showcase</p>
                  <p className="text-xs text-slate-500">6 simple, versatile pieces</p>
                </div>
                <button
                  onClick={onShopNow}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-2 cursor-pointer"
                >
                  View all
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Feature Badges / Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 sm:pt-14 mt-8 border-t border-slate-200/70">
          <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-slate-100 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">Free Delivery</h4>
              <p className="text-xs text-slate-500">On all domestic orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-slate-100 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">30-Day Easy Returns</h4>
              <p className="text-xs text-slate-500">Simple money-back guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-slate-100 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">Secure & Simple</h4>
              <p className="text-xs text-slate-500">Instant order confirmation</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
