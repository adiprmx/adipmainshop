import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`px-4 mb-4 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        className={`relative flex items-center bg-white border rounded-lg h-11 transition-all duration-300 ${
          isFocused
            ? 'border-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.2)] scale-[1.02]'
            : 'border-gray-300'
        }`}
      >
        <Search
          className={`absolute left-3 w-5 h-5 transition-colors duration-300 ${
            isFocused ? 'text-blue-500' : 'text-gray-400'
          }`}
        />
        <input
          type="text"
          placeholder="Cari FLM..."
          className="w-full h-full pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 bg-transparent rounded-lg focus:outline-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
}
