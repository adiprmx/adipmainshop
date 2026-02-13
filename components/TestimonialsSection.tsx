import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Ahmad Rizky',
    avatar: 'AR',
    role: 'Fotografer',
    rating: 5,
    content: 'Presetnya keren banget! Foto-foto saya jadi terlihat lebih profesional. Sangat recommended untuk yang baru mulai belajar editing.',
    product: 'STYLE CINEMATIC V1',
  },
  {
    id: 2,
    name: 'Siti Nurhaliza',
    avatar: 'SN',
    role: 'Content Creator',
    rating: 5,
    content: 'Sudah beli 5 preset berbeda dan semuanya bagus. Hasilnya konsisten dan mudah digunakan di Lightroom Mobile.',
    product: 'STYLE HAPPY TEAM',
  },
  {
    id: 3,
    name: 'Budi Santoso',
    avatar: 'BS',
    role: 'Videographer',
    rating: 5,
    content: 'Harga terjangkau tapi kualitas premium. Customer service juga responsif dan ramah. Bakal repeat order!',
    product: 'STYLE JDM GEN Z',
  },
  {
    id: 4,
    name: 'Dewi Lestari',
    avatar: 'DL',
    role: 'Influencer',
    rating: 5,
    content: 'Preset favoritku! Feed Instagram jadi lebih aesthetic dan banyak yang nanya preset apa yang aku pakai.',
    product: 'STYLE MOODY DARK',
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      className="py-12 px-4 bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-blue-500 font-medium text-sm uppercase tracking-wide">
            Testimoni
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
            Apa Kata Pelanggan Kami?
          </h2>
          <p className="text-gray-500 mt-2">
            Ribuan creator sudah mempercayai preset kami
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div
          className={`relative transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="min-w-full px-4"
                >
                  <div className="bg-white rounded-3xl p-8 shadow-lg relative">
                    {/* Quote Icon */}
                    <div className="absolute -top-4 left-8 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Quote className="w-4 h-4 text-white" />
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      "{testimonial.content}"
                    </p>

                    {/* Product Badge */}
                    <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full mb-6">
                      {testimonial.product}
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-blue-500 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-3 gap-4 mt-12 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: '10K+', label: 'Pelanggan' },
            { value: '50+', label: 'Preset' },
            { value: '4.9', label: 'Rating' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 bg-white rounded-2xl shadow-sm"
            >
              <div className="text-2xl md:text-3xl font-bold text-blue-600">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
