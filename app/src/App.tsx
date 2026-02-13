import { useState, useMemo } from 'react';
import './App.css';
import { CartProvider } from './context/CartContext';
import EnhancedHeader from './components/EnhancedHeader';
import HeroCarousel from './components/HeroCarousel';
import CategorySection from './components/CategorySection';
import FilterBar from './components/FilterBar';
import EnhancedProductCard from './components/EnhancedProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';

// Enhanced product data
const productsData = [
  {
    id: 1,
    name: 'STYLE HAPPY TEAM',
    description: 'Preset cerah dan vibrant yang cocok untuk foto grup dan momen bahagia bersama teman-teman. Memberikan kesan energik dan positif.',
    originalPrice: 60000,
    discountedPrice: 50000,
    soldCount: 128,
    rating: 4.8,
    reviewCount: 45,
    image: '/yogi-saja-logo.jpg',
    category: 'Bright',
    tags: ['cerah', 'grup', 'vibrant'],
    isBestSeller: true,
  },
  {
    id: 2,
    name: 'STYLE BANG WAY',
    description: 'Preset dengan tone warm yang sempurna untuk foto portrait dan street photography. Memberikan kesan maskulin dan edgy.',
    originalPrice: 80000,
    discountedPrice: 70000,
    soldCount: 89,
    rating: 4.7,
    reviewCount: 32,
    image: '/yogi-saja-logo.jpg',
    category: 'Portrait',
    tags: ['warm', 'portrait', 'street'],
  },
  {
    id: 3,
    name: 'STYLE TANTE V2 KHARIS SOPAN',
    description: 'Preset elegant dengan tone soft yang cocok untuk foto formal dan acara keluarga. Memberikan kesan anggun dan berkelas.',
    originalPrice: 80000,
    discountedPrice: 68000,
    soldCount: 156,
    rating: 4.9,
    reviewCount: 67,
    image: '/yogi-saja-logo.jpg',
    category: 'Vintage',
    tags: ['elegant', 'soft', 'formal'],
    isBestSeller: true,
  },
  {
    id: 4,
    name: 'STYLE JDM GEN Z',
    description: 'Preset dengan aesthetic JDM yang trending di kalangan Gen Z. Tone biru-oranye yang iconic untuk foto otomotif dan lifestyle.',
    originalPrice: 135000,
    discountedPrice: 105000,
    soldCount: 234,
    rating: 4.9,
    reviewCount: 89,
    image: '/yogi-saja-logo.jpg',
    category: 'Cinematic',
    tags: ['JDM', 'trending', 'otomotif'],
    isNew: true,
    isBestSeller: true,
  },
  {
    id: 5,
    name: 'STYLE CINEMATIC V1',
    description: 'Preset film look yang memberikan kesan cinematic pada foto Anda. Sempurna untuk storytelling dan konten visual berkualitas tinggi.',
    originalPrice: 95000,
    discountedPrice: 75000,
    soldCount: 312,
    rating: 4.8,
    reviewCount: 124,
    image: '/yogi-saja-logo.jpg',
    category: 'Cinematic',
    tags: ['film', 'cinematic', 'storytelling'],
    isBestSeller: true,
  },
  {
    id: 6,
    name: 'STYLE MOODY DARK',
    description: 'Preset dengan tone gelap dan moody yang cocok untuk foto artistic dan atmospheric. Memberikan kesan mysterious dan dramatic.',
    originalPrice: 70000,
    discountedPrice: 55000,
    soldCount: 178,
    rating: 4.6,
    reviewCount: 56,
    image: '/yogi-saja-logo.jpg',
    category: 'Dark',
    tags: ['moody', 'dark', 'artistic'],
  },
  {
    id: 7,
    name: 'STYLE SUMMER VIBES',
    description: 'Preset cerah dengan tone warm yang sempurna untuk foto liburan dan pantai. Memberikan kesan santai dan menyenangkan.',
    originalPrice: 55000,
    discountedPrice: 45000,
    soldCount: 201,
    rating: 4.7,
    reviewCount: 78,
    image: '/yogi-saja-logo.jpg',
    category: 'Bright',
    tags: ['summer', 'pantai', 'liburan'],
    isNew: true,
  },
  {
    id: 8,
    name: 'STYLE RETRO 90s',
    description: 'Preset dengan aesthetic 90s yang nostalgic. Tone vintage dengan grain yang memberikan kesan klasik dan timeless.',
    originalPrice: 65000,
    discountedPrice: 52000,
    soldCount: 145,
    rating: 4.8,
    reviewCount: 43,
    image: '/yogi-saja-logo.jpg',
    category: 'Vintage',
    tags: ['retro', '90s', 'nostalgic'],
  },
];

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<typeof productsData[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...productsData];

    // Filter by category
    if (selectedCategory !== 'all') {
      const categoryMap: Record<string, string[]> = {
        bright: ['Bright'],
        dark: ['Dark'],
        vintage: ['Vintage'],
        cinematic: ['Cinematic'],
        portrait: ['Portrait'],
        trending: ['JDM GEN Z', 'CINEMATIC V1'],
        favorite: ['HAPPY TEAM', 'TANTE V2'],
      };
      const allowedCategories = categoryMap[selectedCategory];
      if (allowedCategories) {
        result = result.filter((p) =>
          allowedCategories.some((cat) => p.category.includes(cat) || p.name.includes(cat))
        );
      }
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    // Filter by price range
    result = result.filter(
      (p) => p.discountedPrice >= priceRange[0] && p.discountedPrice <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case 'price-high':
        result.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'best-seller':
        result.sort((a, b) => b.soldCount - a.soldCount);
        break;
      default:
        // popular - default order
        break;
    }

    return result;
  }, [selectedCategory, sortBy, priceRange, searchQuery]);

  const handleViewDetail = (product: typeof productsData[0]) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Scroll to products section
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <EnhancedHeader onSearch={handleSearch} />

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Category Section */}
        <div id="categories">
          <CategorySection
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Products Section */}
        <section id="products" className="py-8">
          {/* Filter Bar */}
          <FilterBar
            totalProducts={filteredProducts.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
          />

          {/* Products Grid */}
          <div className="max-w-6xl mx-auto px-4 py-6">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Produk Tidak Ditemukan
                </h3>
                <p className="text-gray-500 mb-4">
                  Coba ubah filter atau kata kunci pencarian Anda
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setPriceRange([0, 500000]);
                  }}
                  className="px-6 py-2.5 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product, index) => (
                  <EnhancedProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    onViewDetail={handleViewDetail}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Testimonials */}
        <div id="testimonials">
          <TestimonialsSection />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
