import { useState } from 'react';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Palette, 
  Camera, 
  Film,
  TrendingUp,
  Heart
} from 'lucide-react';

const categories = [
  { id: 'all', name: 'Semua', icon: Sparkles, color: 'bg-blue-500' },
  { id: 'bright', name: 'Bright', icon: Sun, color: 'bg-amber-500' },
  { id: 'dark', name: 'Dark', icon: Moon, color: 'bg-slate-700' },
  { id: 'vintage', name: 'Vintage', icon: Palette, color: 'bg-rose-500' },
  { id: 'cinematic', name: 'Cinematic', icon: Film, color: 'bg-purple-600' },
  { id: 'portrait', name: 'Portrait', icon: Camera, color: 'bg-teal-500' },
  { id: 'trending', name: 'Trending', icon: TrendingUp, color: 'bg-red-500' },
  { id: 'favorite', name: 'Favorit', icon: Heart, color: 'bg-pink-500' },
];

interface CategorySectionProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategorySection({ 
  selectedCategory, 
  onSelectCategory 
}: CategorySectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation on mount
  useState(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  });

  return (
    <section className="py-6 px-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Kategori</h3>
        <button className="text-sm text-blue-500 font-medium hover:underline">
          Lihat Semua
        </button>
      </div>

      {/* Horizontal Scroll Categories */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`flex flex-col items-center min-w-[72px] transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-2 transition-all duration-300 ${
                  isSelected
                    ? `${category.color} text-white shadow-lg scale-110`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span
                className={`text-xs font-medium transition-colors ${
                  isSelected ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
