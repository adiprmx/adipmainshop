import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Star, Eye, Check, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  soldCount: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  tags: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
}

interface EnhancedProductCardProps {
  product: Product;
  index: number;
  onViewDetail: (product: Product) => void;
}

export default function EnhancedProductCard({
  product,
  index,
  onViewDetail,
}: EnhancedProductCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayPrice, setDisplayPrice] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Price counter animation
  useEffect(() => {
    if (isVisible) {
      const duration = 600;
      const steps = 30;
      const increment = product.discountedPrice / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= product.discountedPrice) {
          setDisplayPrice(product.discountedPrice);
          clearInterval(timer);
        } else {
          setDisplayPrice(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, product.discountedPrice]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const calculateDiscount = () => {
    return Math.round(
      ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100
    );
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.discountedPrice,
      originalPrice: product.originalPrice,
      image: product.image,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const animationDelay = 200 + index * 100;

  return (
    <div
      ref={cardRef}
      onClick={() => onViewDetail(product)}
      className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionDelay: `${animationDelay}ms`,
        animation: isVisible ? `float 4s ease-in-out infinite ${index * 0.5}s` : 'none',
      }}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
              BARU
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
              BEST SELLER
            </span>
          )}
          {calculateDiscount() > 0 && (
            <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
              -{calculateDiscount()}%
            </span>
          )}
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetail(product);
            }}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-blue-500 hover:text-white transition-colors transform scale-0 group-hover:scale-100 duration-300"
            style={{ transitionDelay: '50ms' }}
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={handleAddToCart}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all transform scale-0 group-hover:scale-100 duration-300 ${
              isAdded ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {isAdded ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4">
        {/* Category Tag */}
        <span className="text-xs text-blue-500 font-medium uppercase tracking-wide">
          {product.category}
        </span>

        {/* Product Name */}
        <h3 className="text-sm font-semibold text-gray-900 mt-1 mb-2 line-clamp-2 min-h-[40px] group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium text-gray-900">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviewCount})</span>
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-blue-600 font-bold text-lg">
            Rp {formatPrice(displayPrice)}
          </span>
          <span className="text-gray-400 text-sm line-through">
            Rp {formatPrice(product.originalPrice)}
          </span>
        </div>

        {/* Sales Count */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Terjual {product.soldCount}</span>
          </div>
          
          {/* Tags */}
          <div className="flex gap-1">
            {product.tags.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
