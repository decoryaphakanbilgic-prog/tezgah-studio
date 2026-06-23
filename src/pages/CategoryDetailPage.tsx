import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Star, Download, ExternalLink, ChevronDown, ChevronUp, Phone, MessageSquare } from 'lucide-react';
import { CATEGORY_DETAILS, BrandDetail } from '../data/categoryDetails';

interface Props {
  categoryId: string;
  onNavigate: (page: string) => void;
  onQuote: () => void;
}

function DurabilityBar({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-stone-500 w-24 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-amber-600 w-6 text-right">{value}/5</span>
    </div>
  );
}

function BrandCard({ brand, onQuote }: { brand: BrandDetail; onQuote: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-stone-200 rounded-2xl overflow-hidden hover:border-amber-300 transition-colors duration-300">
      {/* Brand Header */}
      <div className="p-6 bg-white">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-neutral-900 text-lg">{brand.name}</h3>
              <span className="text-[11px] text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full font-medium">{brand.origin}</span>
            </div>
            <p className="text-xs text-amber-600 font-medium italic mb-3">{brand.tagline}</p>
            <p className="text-sm text-stone-600 leading-relaxed">{brand.description}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          {brand.brochureUrl && brand.brochureUrl !== '#' ? (
            <a
              href={brand.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 border border-stone-200 rounded-lg px-3 py-1.5 hover:border-amber-400 hover:text-amber-600 transition-colors"
            >
              <Download className="h-3.5 w-3.5" /> Broşür İndir (PDF)
            </a>
          ) : (
            <button
              className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-400 border border-stone-200 rounded-lg px-3 py-1.5 cursor-not-allowed"
              disabled
              title="Yakında"
            >
              <Download className="h-3.5 w-3.5" /> Broşür (Yakında)
            </button>
          )}
          {brand.websiteUrl && brand.websiteUrl !== '#' && (
            <a
              href={brand.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 border border-stone-200 rounded-lg px-3 py-1.5 hover:border-amber-400 hover:text-amber-600 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Web Sitesi
            </a>
          )}
          <button
            onClick={onQuote}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-amber-500 rounded-lg px-3 py-1.5 hover:bg-amber-600 transition-colors ml-auto"
          >
            Bu Markadan Teklif Al
          </button>
        </div>
      </div>

      {/* Color Samples Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-6 py-3 bg-stone-50 border-t border-stone-100 text-sm font-medium text-stone-600 hover:bg-stone-100 transition-colors"
      >
        <span>Renk & Desen Örnekleri ({brand.colors.length} adet)</span>
        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {/* Color Grid */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-stone-50 border-t border-stone-100">
              {brand.colors.map((color) => (
                <div key={color.name} className="group cursor-pointer" onClick={onQuote}>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-2 ring-2 ring-transparent group-hover:ring-amber-400 transition-all duration-300">
                    <img
                      src={color.image}
                      alt={color.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-[11px] font-semibold text-neutral-800 leading-tight">{color.name}</p>
                  {color.code && <p className="text-[10px] text-stone-400 font-mono">{color.code}</p>}
                  {color.finish && <p className="text-[10px] text-stone-400">{color.finish}</p>}
                </div>
              ))}
            </div>
            <div className="px-4 pb-4 bg-stone-50 text-center">
              <p className="text-xs text-stone-400">Görseller temsilidir. Gerçek renk örnekleri için showroomımızı ziyaret edin.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CategoryDetailPage({ categoryId, onNavigate, onQuote }: Props) {
  const category = CATEGORY_DETAILS[categoryId];

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-stone-500">Kategori bulunamadı.</p>
          <button onClick={() => onNavigate('home')} className="text-amber-600 underline text-sm">
            Ana sayfaya dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img
          src={category.heroImage}
          alt={category.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />

        {/* Back button */}
        <button
          onClick={() => onNavigate('home')}
          className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full"
        >
          <ArrowLeft className="h-4 w-4" /> Geri Dön
        </button>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Tezgah Kategorisi</p>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-2 leading-tight">{category.title}</h1>
            <p className="text-white/70 text-base max-w-2xl">{category.subtitle}</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-16">

        {/* Overview + Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl font-serif font-bold text-neutral-900">Genel Bakış</h2>
            <p className="text-stone-600 leading-relaxed">{category.longDescription}</p>
            <p className="text-sm text-stone-500 leading-relaxed">{category.maintenance}</p>
          </div>

          <div className="space-y-6">
            {/* Price */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
              <p className="text-xs text-stone-500 font-medium uppercase tracking-wider mb-1">Fiyat Aralığı</p>
              <p className="text-xl font-bold text-amber-600">{category.priceRange}</p>
            </div>

            {/* Scores */}
            <div className="bg-stone-50 border border-stone-100 rounded-2xl p-5 space-y-3">
              <p className="text-xs text-stone-500 font-medium uppercase tracking-wider mb-3">Performans</p>
              <DurabilityBar value={category.durability} label="Dayanıklılık" />
              <DurabilityBar value={category.heatResistance} label="Isı Direnci" />
            </div>

            {/* Ideal for */}
            <div className="space-y-2">
              <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">İdeal Kullanım</p>
              {category.idealFor.map((use) => (
                <div key={use} className="flex items-center gap-2 text-sm text-stone-600">
                  <Star className="h-3 w-3 text-amber-400 shrink-0" />
                  <span>{use}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-8">Avantajlar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.keyFeatures.map((feat, i) => (
              <div key={i} className="bg-stone-50 border border-stone-100 rounded-2xl p-5 hover:border-amber-200 transition-colors">
                <div className="h-8 w-8 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
                  <span className="text-amber-600 font-bold text-sm">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-semibold text-neutral-800 text-sm mb-1">{feat.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Brands */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-neutral-900">Markalar & Renk Örnekleri</h2>
              <p className="text-stone-500 text-sm mt-1">Her markanın renk örneklerine tıklayarak detayları inceleyin</p>
            </div>
            <span className="text-xs text-stone-400 bg-stone-100 rounded-full px-3 py-1">{category.brands.length} marka</span>
          </div>

          <div className="space-y-4">
            {category.brands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} onQuote={onQuote} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-neutral-900 rounded-3xl p-8 sm:p-12 text-center">
          <p className="text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">Ücretsiz Danışmanlık</p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
            {category.title.split(' ')[0]} Tezgah Fiyatı Öğrenin
          </h2>
          <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">
            Ölçü, malzeme ve marka seçimi için uzman ekibimizle görüşün. Aynı gün teklif garantisi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onQuote}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl px-8 py-4 transition-colors"
            >
              <MessageSquare className="h-5 w-5" /> Teklif Al
            </button>
            <a
              href="tel:+902126592228"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 text-white hover:bg-white/10 font-medium rounded-xl px-8 py-4 transition-colors text-sm"
            >
              <Phone className="h-4 w-4" /> +90 (212) 659 22 28
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
