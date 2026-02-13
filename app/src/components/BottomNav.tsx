import { useState, useEffect } from 'react';
import { Home, ShoppingCart, FileText } from 'lucide-react';

type TabType = 'dashboard' | 'produk' | 'request';

export default function BottomNav() {
  const [activeTab, setActiveTab] = useState<TabType>('produk');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: Home },
    { id: 'produk' as TabType, label: 'Produk', icon: ShoppingCart },
    { id: 'request' as TabType, label: 'Request', icon: FileText },
  ];

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] transition-transform duration-600 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full relative transition-all duration-200 ${
                isActive ? 'text-blue-500' : 'text-gray-500'
              }`}
              style={{
                animation: isVisible
                  ? `scale-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${1400 + index * 100}ms forwards`
                  : 'none',
                opacity: 0,
              }}
            >
              {/* Active Indicator Background */}
              {isActive && (
                <div
                  className="absolute inset-x-4 top-1 bottom-1 bg-blue-50 rounded-xl -z-10 transition-all duration-300"
                  style={{
                    animation: 'fade-in 0.3s ease-out forwards',
                  }}
                />
              )}

              {/* Icon */}
              <div
                className={`relative transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
              >
                <Icon
                  className={`w-6 h-6 transition-all duration-200 ${
                    isActive ? 'stroke-[2.5px]' : 'stroke-2'
                  }`}
                />
                {isActive && (
                  <div className="absolute inset-0 animate-pulse-scale">
                    <Icon className="w-6 h-6 stroke-[2.5px] opacity-30" />
                  </div>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-xs mt-1 font-medium transition-all duration-200 ${
                  isActive ? 'opacity-100' : 'opacity-80'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Safe Area Spacer for Mobile */}
      <div className="h-safe-area-inset-bottom bg-white" />
    </nav>
  );
}
