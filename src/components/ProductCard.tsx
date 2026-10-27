import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingCart, Star, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  onBuyNow,
}) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1200);
  };

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-md hover:border-slate-300 transition-all duration-200">
      
      {/* Product Image Container */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Quick View Button overlay */}
        <button
          onClick={() => onQuickView(product)}
          aria-label={`Quick view details for ${product.name}`}
          className="absolute right-3 top-3 p-2 rounded-lg bg-white/90 backdrop-blur-xs text-slate-700 hover:text-emerald-700 shadow-sm opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          <Eye className="w-4 h-4" />
        </button>

        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute left-3 top-3 bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
            Save ${(product.originalPrice - product.price).toFixed(0)}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
          <span className="font-medium text-slate-500">{product.category}</span>
          <div className="flex items-center gap-1 text-slate-600">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-slate-700">{product.rating.toFixed(1)}</span>
            <span className="text-slate-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Product Name */}
        <h3
          onClick={() => onQuickView(product)}
          className="text-base font-semibold text-slate-900 line-clamp-1 hover:text-emerald-700 cursor-pointer transition-colors"
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Short description */}
        <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price row */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
            In Stock
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={handleAdd}
            className={`w-full py-2.5 px-3 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-800 hover:bg-slate-200 active:scale-98'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5 text-slate-600" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          <button
            onClick={() => onBuyNow(product)}
            className="w-full py-2.5 px-3 rounded-xl font-medium text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs active:scale-98 transition-all flex items-center justify-center cursor-pointer"
          >
            Buy Now
          </button>
        </div>

      </div>

    </div>
  );
};
