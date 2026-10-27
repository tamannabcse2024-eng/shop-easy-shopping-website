import React from 'react';
import { CartItem } from '../types';
import { Trash2, ArrowLeft, ArrowRight, ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartView: React.FC<CartViewProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  onContinueShopping,
}) => {
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 50.0;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 4.99;
  const estimatedTax = subtotal * 0.05; // 5% sample tax
  const total = subtotal + shipping + (subtotal > 0 ? estimatedTax : 0);
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const neededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-xs">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Your shopping cart is empty</h2>
        <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
          Explore our collection of 6 essentials, add items to your cart, and experience seamless checkout.
        </p>
        <div className="mt-6">
          <button
            onClick={onContinueShopping}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Discover Products</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review your selected items ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClearCart}
            className="text-xs text-slate-500 hover:text-red-600 font-medium cursor-pointer underline underline-offset-2 transition-colors"
          >
            Clear All Items
          </button>
          <button
            onClick={onContinueShopping}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Shopping</span>
          </button>
        </div>
      </div>

      {/* Free Shipping Alert Banner */}
      <div className="mt-6 bg-slate-50 rounded-xl p-4 border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          {subtotal >= freeShippingThreshold ? (
            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
              🎉 Free Shipping is unlocked on this order!
            </span>
          ) : (
            <span className="text-xs text-slate-700">
              Add <strong className="text-slate-900">${neededForFreeShipping.toFixed(2)}</strong> more to get <strong className="text-emerald-700">Free Shipping</strong> (Threshold: $50)
            </span>
          )}
          <span className="text-xs text-slate-500 font-medium">
            {progressToFreeShipping.toFixed(0)}% reached
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressToFreeShipping}%` }}
          />
        </div>
      </div>

      {/* Content Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Cart Items Table / List */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="hidden sm:grid grid-cols-12 p-4 text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-b border-slate-200">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Unit Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Subtotal</div>
          </div>

          <div className="divide-y divide-slate-100">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="p-4 sm:p-5 flex flex-col sm:grid sm:grid-cols-12 items-center gap-4 hover:bg-slate-50/50 transition-colors"
              >
                {/* Product Col */}
                <div className="col-span-6 flex items-center gap-4 w-full">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover bg-slate-100 border border-slate-200/70 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                      {item.product.category}
                    </span>
                    <h3 className="text-sm font-semibold text-slate-900 truncate">
                      {item.product.name}
                    </h3>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="mt-1.5 inline-flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                {/* Unit Price */}
                <div className="col-span-2 sm:text-center text-xs text-slate-600 sm:font-medium">
                  <span className="sm:hidden text-slate-400 mr-2">Price:</span>
                  ${item.product.price.toFixed(2)}
                </div>

                {/* Quantity Controls */}
                <div className="col-span-2 flex justify-center items-center w-full sm:w-auto">
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                      className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer font-medium"
                    >
                      -
                    </button>
                    <span className="w-9 text-center text-xs font-semibold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                      className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer font-medium"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Row Subtotal */}
                <div className="col-span-2 text-right w-full sm:w-auto flex justify-between sm:block">
                  <span className="sm:hidden text-xs text-slate-500">Item Total:</span>
                  <span className="text-sm font-bold text-slate-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Order Summary
            </h2>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal ({totalItemsCount} items)</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-emerald-700 font-semibold">FREE</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (5%)</span>
                <span className="font-semibold text-slate-900">${estimatedTax.toFixed(2)}</span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-bold text-slate-900">
                <span>Total Amount</span>
                <span className="text-emerald-700 text-lg">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full mt-4 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Buy Now / Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Fast dispatch in 1-2 business days</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Secure SSL checkout</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
