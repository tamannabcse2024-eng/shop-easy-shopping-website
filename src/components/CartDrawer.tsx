import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  onNavigateToProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onNavigateToProducts,
}) => {
  if (!isOpen) return null;

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 50.0;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 4.99;
  const total = subtotal + shipping;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const neededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-900">Your Cart</h2>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="bg-slate-50 px-4 sm:px-6 py-2.5 border-b border-slate-200">
            {subtotal >= freeShippingThreshold ? (
              <p className="text-xs font-medium text-emerald-700 flex items-center gap-1.5">
                🎉 <span className="font-semibold">Congratulations!</span> You unlocked Free Standard Shipping!
              </p>
            ) : (
              <div className="space-y-1.5">
                <p className="text-xs text-slate-600">
                  Add <span className="font-semibold text-slate-900">${neededForFreeShipping.toFixed(2)}</span> more to qualify for <span className="font-medium text-emerald-700">Free Shipping</span>
                </p>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-slate-100">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Your cart is currently empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mt-1 mb-6">
                  Looks like you haven't added anything yet. Explore our 6 curated products!
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToProducts();
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.product.id} className="py-4 flex gap-4 items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-xl object-cover bg-slate-100 border border-slate-200/60 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-slate-900 truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        aria-label={`Remove ${item.product.name} from cart`}
                        className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-500 mt-0.5">
                      ${item.product.price.toFixed(2)} each
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity control */}
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer font-medium"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer font-medium"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-bold text-slate-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50/50 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-emerald-700 font-semibold">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total</span>
                  <span className="text-emerald-700">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Buy Now / Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero hassle checkout · 100% Guaranteed</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
