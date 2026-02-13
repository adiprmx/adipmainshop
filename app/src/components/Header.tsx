import { useState, useEffect } from 'react';
import { Crown } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-4 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.08)]'
          : 'bg-white'
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Crown Logo */}
        <div
          className={`relative transition-transform duration-300 ${
            scrolled ? 'scale-90' : 'scale-100'
          }`}
        >
          <Crown
            className="w-6 h-6 text-amber-500 animate-crown-pulse"
            strokeWidth={2.5}
          />
        </div>

        {/* Brand Text */}
        <h1
          className="text-lg font-bold text-gray-900 tracking-wide"
          style={{
            animation: 'fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards',
            opacity: 0,
          }}
        >
          YOGI SJ SHOP
        </h1>
      </div>
    </header>
  );
}
