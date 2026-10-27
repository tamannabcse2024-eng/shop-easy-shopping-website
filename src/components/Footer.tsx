import React, { useState } from 'react';
import { ShoppingBag, Heart, Mail, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'products' | 'cart') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3500);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Shop<span className="text-emerald-500">Easy</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Simple, clean, and honest shopping. Thoughtfully chosen everyday gear delivered directly to your doorstep.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cart')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cart
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Customer Support
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>Free Shipping over $50</li>
              <li>30-Day Hassle-Free Returns</li>
              <li>support@shopeasy.test</li>
              <li>Mon - Fri, 9am - 6pm EST</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Stay in the Loop
            </h4>
            <p className="text-xs text-slate-400">
              Receive updates on new seasonal drops and exclusive discounts.
            </p>
            {subscribed ? (
              <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 pt-1">
                <div className="relative flex-1">
                  <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar with mandatory copyright */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <p>© 2026 ShopEasy. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for easy, joyful shopping</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
