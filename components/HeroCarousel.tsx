import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    image: '/banner-1.jpg',
    title: 'Premium FLM Presets',
    subtitle: 'Tingkatkan kualitas foto Anda dengan koleksi preset terbaik',
    cta: 'Jelajahi Koleksi',
    color: 'from-blue-600 to-purple-600',
  },
  {
    id: 2,
    image: '/banner-2.jpg',
    title: 'Diskon Spesial 30%',
    subtitle: 'Dapatkan preset premium dengan harga terbaik hari ini',
    cta: 'Lihat Promo',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 3,
    image: '/banner-3.jpg',
    title: 'New Arrivals 2025',
    subtitle: 'Koleksi preset terbaru dengan style modern dan trendy',
    cta: 'Lihat Baru',
    color: 'from-teal-500 to-cyan-600',
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div className="relative w-full h-[280px] md:h-[360px] overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="min-w-full h-full relative"
          >
            {/* Background Image */}
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} opacity-70`} />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
              <div className="max-w-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg animate-fade-in">
                  {banner.title}
                </h2>
                <p className="text-white/90 text-sm md:text-base mb-4 drop-shadow-md">
                  {banner.subtitle}
                </p>
                <button className={`px-6 py-2.5 bg-white text-gray-900 rounded-full font-medium text-sm hover:scale-105 transition-transform duration-200 shadow-lg`}>
                  {banner.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
