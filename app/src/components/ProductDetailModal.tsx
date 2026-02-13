import { useEffect, useState } from 'react';
import { X, Star, ShoppingCart, Check, Share2, Heart } from 'lucide-react';
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
  features?: string[];
}

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
}: ProductDetailModalProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const calculateDiscount = () => {
    return Math.round(
      ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100
    );
  };

  const handleAddToCart = () => {
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

  const features = product.features || [
    'Preset siap pakai untuk Lightroom Mobile',
    'Cocok untuk foto indoor & outdoor',
    'Hasil edit profesional dalam sekali klik',
    'File DNG dengan instruksi pemakaian',
  ];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-all duration-500 ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image Section */}
          <div className="relative aspect-square bg-gradient-to-br from-gray-900 to-black">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {calculateDiscount() > 0 && (
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-red-500 text-white text-sm font-bold rounded-full">
                DISKON {calculateDiscount()}%
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="p-6">
            {/* Category */}
            <span className="text-sm text-blue-500 font-medium uppercase tracking-wide">
              {product.category}
            </span>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 mt-2 mb-3">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-900">
                {product.rating}
              </span>
              <span className="text-sm text-gray-400">
                ({product.reviewCount} ulasan)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-blue-600">
                Rp {formatPrice(product.discountedPrice)}
              </span>
              <span className="text-lg text-gray-400 line-through">
                Rp {formatPrice(product.originalPrice)}
              </span>
            </div>

            {/* Sales Info */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-1">
                <ShoppingCart className="w-4 h-4" />
                {product.soldCount} terjual
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Fitur:</h4>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  isAdded
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-[1.02]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    Ditambahkan!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Tambah ke Keranjang
                  </>
                )}
              </button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  isLiked
                    ? 'bg-pink-100 text-pink-500'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
                />
              </button>
              <button className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
