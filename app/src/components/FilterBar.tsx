import { useState } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

interface FilterBarProps {
  totalProducts: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

const sortOptions = [
  { value: 'popular', label: 'Paling Populer' },
  { value: 'newest', label: 'Terbaru' },
  { value: 'price-low', label: 'Harga: Rendah ke Tinggi' },
  { value: 'price-high', label: 'Harga: Tinggi ke Rendah' },
  { value: 'best-seller', label: 'Best Seller' },
];

export default function FilterBar({
  totalProducts,
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
}: FilterBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="bg-white border-b sticky top-16 z-30">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Product Count */}
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{totalProducts}</span>{' '}
            produk ditemukan
          </div>

          {/* Sort & Filter */}
          <div className="flex items-center gap-2">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="appearance-none bg-gray-100 text-gray-700 text-sm font-medium py-2 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                isFilterOpen
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isFilterOpen ? 'max-h-40 mt-4' : 'max-h-0'
          }`}
        >
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">
                Rentang Harga
              </span>
              <button
                onClick={() => onPriceRangeChange([0, 500000])}
                className="text-xs text-blue-500 hover:underline"
              >
                Reset
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Min</label>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    onPriceRangeChange([Number(e.target.value), priceRange[1]])
                  }
                  className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  placeholder="0"
                />
              </div>
              <span className="text-gray-400 mt-5">-</span>
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Max</label>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    onPriceRangeChange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                  placeholder="500000"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
