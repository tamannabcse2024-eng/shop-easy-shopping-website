import React, { useState } from 'react';
import { CartItem, CustomerInfo, PlacedOrder } from '../types';
import { X, CheckCircle2, ShoppingBag, ShieldCheck, CreditCard, DollarSign, Smartphone } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderSuccess: (order: PlacedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState<CustomerInfo>({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
  });

  const [orderPlaced, setOrderPlaced] = useState<PlacedOrder | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formError, setFormError] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 50.0 || subtotal === 0 ? 0 : 4.99;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.address.trim()) {
      setFormError('Please fill in your name, email, and delivery address.');
      return;
    }
    setFormError(null);

    setIsSubmitting(true);

    // Simulate swift confirmation
    setTimeout(() => {
      const generatedOrder: PlacedOrder = {
        orderId: `SE-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        items: [...cartItems],
        subtotal,
        shipping,
        tax,
        total,
        customer: formData,
      };

      setOrderPlaced(generatedOrder);
      setIsSubmitting(false);
      onOrderSuccess(generatedOrder);
    }, 700);
  };

  const handleFinish = () => {
    setOrderPlaced(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8">
        
        {/* Close Button (only if not confirmed) */}
        {!orderPlaced && (
          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="absolute right-4 top-4 z-10 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Order Confirmed Success Screen */}
        {orderPlaced ? (
          <div className="p-6 sm:p-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                Order Confirmed
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-2">Thank you for your order!</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Your order <strong className="text-slate-800">#{orderPlaced.orderId}</strong> has been successfully placed.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 text-left border border-slate-100 text-xs sm:text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Recipient:</span>
                <span className="font-semibold text-slate-800">{orderPlaced.customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Shipping To:</span>
                <span className="font-medium text-slate-800 truncate max-w-xs">
                  {orderPlaced.customer.address}, {orderPlaced.customer.city}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment:</span>
                <span className="font-medium text-slate-800 uppercase">
                  {orderPlaced.customer.paymentMethod === 'cod' ? 'Cash On Delivery' : orderPlaced.customer.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200">
                <span className="text-slate-700 font-semibold">Total Paid:</span>
                <span className="text-emerald-700 font-bold text-base">
                  ${orderPlaced.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50/60 rounded-xl text-xs text-emerald-800 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>A confirmation email has been sent to {orderPlaced.customer.email}</span>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-colors cursor-pointer shadow-sm"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl font-bold text-slate-900">Checkout</h2>
              <span className="text-xs text-slate-500">({cartItems.length} items)</span>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-5">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <span>{formError}</span>
                </div>
              )}
              
              {/* Shipping Address */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  1. Shipping Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Delivery Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="124 Market Street, Apt 4B"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="New York"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        placeholder="10001"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="pt-2 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  2. Payment Method
                </h3>
                <div className="grid grid-cols-3 gap-2.5">
                  <label
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer text-center transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 font-semibold ring-1 ring-emerald-600'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="sr-only"
                    />
                    <CreditCard className="w-5 h-5 mb-1.5" />
                    <span className="text-xs">Credit/Debit</span>
                  </label>

                  <label
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer text-center transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 font-semibold ring-1 ring-emerald-600'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="sr-only"
                    />
                    <DollarSign className="w-5 h-5 mb-1.5" />
                    <span className="text-xs">Cash on Delivery</span>
                  </label>

                  <label
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border cursor-pointer text-center transition-all ${
                      formData.paymentMethod === 'upi'
                        ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 font-semibold ring-1 ring-emerald-600'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                      className="sr-only"
                    />
                    <Smartphone className="w-5 h-5 mb-1.5" />
                    <span className="text-xs">Instant / UPI</span>
                  </label>
                </div>
              </div>

              {/* Order Breakdown */}
              <div className="bg-slate-50 rounded-xl p-3.5 text-xs text-slate-600 space-y-1.5 border border-slate-200/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (5%)</span>
                  <span className="font-semibold text-slate-900">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Due</span>
                  <span className="text-emerald-700 text-base">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                {isSubmitting ? 'Processing Order...' : `Confirm Order ($${total.toFixed(2)})`}
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
