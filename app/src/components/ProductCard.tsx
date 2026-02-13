import { useState, useEffect, useRef } from 'react';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  name: string;
  originalPrice: number;
  discountedPrice: number;
  soldCount: number;
  image: string;
  index: number;
}

export default function ProductCard({
  name,
  originalPrice,
  discountedPrice,
  soldCount,
  image,
  index,
}: ProductCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayPrice, setDisplayPrice] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

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
      const increment = discountedPrice / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= discountedPrice) {
          setDisplayPrice(discountedPrice);
          clearInterval(timer);
        } else {
          setDisplayPrice(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, discountedPrice]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const animationDelay = 700 + index * 100;
  const flipAnimation = index % 2 === 0 ? 'animate-flip-in' : 'animate-flip-in-right';

  return (
    <div
      ref={cardRef}
      className={`product-card-3d bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] animate-float ${
        isVisible ? flipAnimation : 'opacity-0'
      }`}
      style={{
        animationDelay: `${animationDelay}ms`,
        animationFillMode: 'forwards',
      }}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-black">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-400 hover:scale-110"
        />
      </div>

      {/* Product Content */}
      <div className="p-3">
        {/* Product Name */}
        <h3
          className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 min-h-[40px]"
          style={{
            animation: isVisible
              ? `fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${animationDelay + 300}ms forwards`
              : 'none',
            opacity: 0,
          }}
        >
          {name}
        </h3>

        {/* Price Section */}
        <div
          className="mb-2"
          style={{
            animation: isVisible
              ? `fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${animationDelay + 400}ms forwards`
              : 'none',
            opacity: 0,
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-blue-500 font-bold text-base">
              Rp {formatPrice(displayPrice)}
            </span>
            <span className="text-gray-400 text-sm line-through relative">
              Rp {formatPrice(originalPrice)}
            </span>
          </div>
        </div>

        {/* Sales Count */}
        <div
          className="flex items-center gap-1 text-gray-500 text-xs mb-3"
          style={{
            animation: isVisible
              ? `fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${animationDelay + 450}ms forwards`
              : 'none',
            opacity: 0,
          }}
        >
          <ShoppingCart className="w-3 h-3" />
          <span>Terjual: {soldCount}</span>
        </div>

        {/* Buttons */}
        <div
          className="flex gap-2"
          style={{
            animation: isVisible
              ? `fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${animationDelay + 500}ms forwards`
              : 'none',
            opacity: 0,
          }}
        >
          <button className="flex-1 py-2.5 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 active:scale-95">
            Play
          </button>
          <button className="flex-1 py-2.5 px-4 bg-blue-500 rounded-lg text-sm font-medium text-white hover:brightness-110 hover:scale-[1.02] transition-all duration-200 active:scale-95 btn-shimmer">
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
