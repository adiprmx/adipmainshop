import { 
  Instagram, 
  MessageCircle, 
  Mail, 
  MapPin,
  Crown,
  CreditCard,
  Shield,
  Truck
} from 'lucide-react';

const paymentMethods = [
  { name: 'GoPay', color: 'bg-blue-500' },
  { name: 'OVO', color: 'bg-purple-500' },
  { name: 'DANA', color: 'bg-blue-600' },
  { name: 'Transfer', color: 'bg-green-500' },
];

const quickLinks = [
  { name: 'Beranda', href: '#' },
  { name: 'Produk', href: '#' },
  { name: 'Cara Beli', href: '#' },
  { name: 'FAQ', href: '#' },
  { name: 'Kontak', href: '#' },
];

const categories = [
  { name: 'Bright', href: '#' },
  { name: 'Dark', href: '#' },
  { name: 'Vintage', href: '#' },
  { name: 'Cinematic', href: '#' },
  { name: 'Portrait', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Features Bar */}
      <div className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Garansi', desc: '100% Original' },
              { icon: CreditCard, title: 'Pembayaran', desc: 'Aman & Terpercaya' },
              { icon: Truck, title: 'Instant', desc: 'Download Langsung' },
              { icon: MessageCircle, title: 'Support', desc: '24/7 Online' },
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{feature.title}</h4>
                  <p className="text-gray-400 text-xs">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-6 h-6 text-amber-400" />
              <span className="text-xl font-bold">YOGI SJ SHOP</span>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Toko preset Lightroom Mobile terpercaya dengan koleksi terlengkap dan harga terbaik.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-pink-500 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:bg-blue-500 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Menu Cepat</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Kategori</h4>
            <ul className="space-y-3">
              {categories.map((cat, index) => (
                <li key={index}>
                  <a
                    href={cat.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Payment */}
          <div>
            <h4 className="font-semibold mb-4">Hubungi Kami</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MessageCircle className="w-4 h-4" />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>support@yogisjshop.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>

            <h4 className="font-semibold mb-3">Metode Pembayaran</h4>
            <div className="flex flex-wrap gap-2">
              {paymentMethods.map((method, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 ${method.color} text-white text-xs font-medium rounded-lg`}
                >
                  {method.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2025 YOGI SJ SHOP. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
                Syarat & Ketentuan
              </a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
                Kebijakan Privasi
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
