import React, { useState } from 'react';
import { Product } from '../types';
import { X, Star, ShoppingCart, Check, ShieldCheck, Truck } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  const handleDirectBuy = () => {
    onBuyNow(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-900 shadow-xs cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Image */}
          <div className="relative bg-slate-100 aspect-square md:aspect-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span className="font-medium">{product.category}</span>
                <div className="flex items-center gap-1 text-slate-700">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{product.rating.toFixed(1)}</span>
                  <span>({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-slate-900">{product.name}</h2>

              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-slate-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Highlights */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  Key Specifications:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex items-center gap-4 text-xs text-slate-500 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Ships in 24 hours</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>ShopEasy Verified</span>
                </div>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">Quantity</label>
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 disabled:opacity-30 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-slate-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                    className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleAdd}
                  className={`py-3 px-4 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added {quantity} to cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDirectBuy}
                  className="py-3 px-4 rounded-xl font-medium text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all flex items-center justify-center cursor-pointer"
                >
                  Buy Now
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
