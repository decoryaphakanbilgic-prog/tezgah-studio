import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Compass, Ruler, Award, SlidersHorizontal, Sparkles, 
  Check, Plus, Search, ArrowRight, ChevronRight, Info, 
  FileText, Phone, Mail, MapPin, X, HeartOff, 
  MessageSquare, Calendar, ChevronDown, CheckCircle, 
  ExternalLink, Download, Sliders, LayoutGrid, Eye, HelpCircle, AlertCircle
} from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import QuoteWizard from './components/QuoteWizard';
import Simulator from './components/Simulator';
import TemplateStudio from './components/TemplateStudio';
import AuthModal from './components/AuthModal';
import AdminPanel from './pages/AdminPanel';
import CategoryDetailPage from './pages/CategoryDetailPage';
import LegalPage from './pages/LegalPage';
import BrandLogoBar from './components/BrandLogoBar';
import { AuthProvider } from './context/AuthContext';
import { 
  BRANDS, 
  MATERIAL_CATEGORIES, 
  COUNTERTOP_COLORS, 
  INSPIRATIONS, 
  TECHNICAL_COMPARISONS,
  Brand,
  MaterialCategory,
  CountertopColor
} from './data';

const pageContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.03
    }
  }
};

const pageItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function App() {
  const [theme, setTheme] = useState<'milano' | 'nordic' | 'obsidian'>('obsidian');
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  
  // Favorites system saved in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('tezgahstudio_favs');
    return saved ? JSON.parse(saved) : [];
  });

  // Quote cart system saved in localStorage
  const [quoteCart, setQuoteCart] = useState<string[]>(() => {
    const saved = localStorage.getItem('tezgahstudio_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Keep track of pre-selected category when jumping to quote wizard
  const [selectedCategoryForWizard, setSelectedCategoryForWizard] = useState<'Perakende' | 'Butik Proje' | 'Toplu Proje' | null>(null);
  const [selectedMaterialForWizard, setSelectedMaterialForWizard] = useState<string | null>(null);
  const [selectedBrandForWizard, setSelectedBrandForWizard] = useState<string | null>(null);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [legalPage, setLegalPage] = useState<'gizlilik' | 'kullanim' | 'kvkk' | null>(null);

  // Home Hero slider states
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=90",
      title: "Türkiye'nin En Prestijli Tezgah Ustası",
      subtitle: "20 yılı aşkın deneyimle mermer, kuvars, granit ve çimstone tezgahlarda kusursuz işçilik."
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90",
      title: "Hayalinizdeki Mutfak Bir Ölçüm Uzağınızda",
      subtitle: "Ücretsiz keşif ve ölçüm hizmetiyle projenizi yerinde değerlendiriyoruz. Aynı gün teklif."
    },
    {
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=90",
      title: "500+ Tamamlanan Proje, Binlerce Mutlu Müşteri",
      subtitle: "Konut, otel, mimari ofis ve ticari alanlarda Türkiye genelinde hizmet veriyoruz."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('tezgahstudio_favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('tezgahstudio_cart', JSON.stringify(quoteCart));
  }, [quoteCart]);

  // Brand Page Filters
  const [brandSearch, setBrandSearch] = useState('');
  const [brandOriginFilter, setBrandOriginFilter] = useState<'Tümü' | 'Yerli' | 'Global'>('Tümü');
  const [brandMaterialFilter, setBrandMaterialFilter] = useState<string>('Tümü');

  // Color Page Filters
  const [colorSearch, setColorSearch] = useState('');
  const [colorGroupFilter, setColorGroupFilter] = useState<string>('Tümü');
  const [colorEffectFilter, setColorEffectFilter] = useState<string>('Tümü');
  const [colorFinishFilter, setColorFinishFilter] = useState<string>('Tümü');
  const [colorSuitabilityFilter, setColorSuitabilityFilter] = useState<string>('Tümü');

  // Inspiration Page Filters
  const [inspirationCategoryFilter, setInspirationCategoryFilter] = useState<string>('Tümü');

  // Toggle favorite helper
  const handleToggleFavorite = (colorId: string) => {
    setFavorites(prev => 
      prev.includes(colorId) ? prev.filter(id => id !== colorId) : [...prev, colorId]
    );
  };

  // Toggle quote cart helper
  const handleToggleQuoteCart = (colorId: string) => {
    setQuoteCart(prev => 
      prev.includes(colorId) ? prev.filter(id => id !== colorId) : [...prev, colorId]
    );
  };

  // Navigate helper
  const handleNavigate = (page: string) => {
    setActivePage(page);
    setSelectedCategoryForWizard(null);
    setSelectedMaterialForWizard(null);
    setSelectedBrandForWizard(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start Quote helper with specific path
  const handleStartQuoteWithCategory = (cat: 'Perakende' | 'Butik Proje' | 'Toplu Proje') => {
    setSelectedCategoryForWizard(cat);
    setSelectedMaterialForWizard(null);
    setSelectedBrandForWizard(null);
    setActivePage('quote-wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartGenericQuote = () => {
    setSelectedCategoryForWizard(null);
    setSelectedMaterialForWizard(null);
    setSelectedBrandForWizard(null);
    setActivePage('quote-wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSimulatorCombo = (material: string, brand: string) => {
    setSelectedCategoryForWizard(null); // Or default to retail
    setSelectedMaterialForWizard(material);
    setSelectedBrandForWizard(brand);
    setActivePage('quote-wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered Brands
  const filteredBrands = useMemo(() => {
    return BRANDS.filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(brandSearch.toLowerCase()) || 
                            brand.description.toLowerCase().includes(brandSearch.toLowerCase());
      const matchesOrigin = brandOriginFilter === 'Tümü' || brand.origin === brandOriginFilter;
      const matchesMaterial = brandMaterialFilter === 'Tümü' || brand.materials.includes(brandMaterialFilter);
      return matchesSearch && matchesOrigin && matchesMaterial;
    });
  }, [brandSearch, brandOriginFilter, brandMaterialFilter]);

  // Filtered Colors
  const filteredColors = useMemo(() => {
    return COUNTERTOP_COLORS.filter(color => {
      const matchesSearch = color.name.toLowerCase().includes(colorSearch.toLowerCase()) || 
                            color.brand.toLowerCase().includes(colorSearch.toLowerCase());
      const matchesGroup = colorGroupFilter === 'Tümü' || color.colorGroup === colorGroupFilter;
      const matchesEffect = colorEffectFilter === 'Tümü' || color.effect === colorEffectFilter;
      const matchesFinish = colorFinishFilter === 'Tümü' || color.finish === colorFinishFilter;
      
      let matchesSuitability = true;
      if (colorSuitabilityFilter !== 'Tümü') {
        matchesSuitability = color.suitability.includes(colorSuitabilityFilter);
      }
      
      return matchesSearch && matchesGroup && matchesEffect && matchesFinish && matchesSuitability;
    });
  }, [colorSearch, colorGroupFilter, colorEffectFilter, colorFinishFilter, colorSuitabilityFilter]);

  // Saved colors full records
  const savedColorsFull = useMemo(() => {
    return COUNTERTOP_COLORS.filter(color => favorites.includes(color.id));
  }, [favorites]);

  // Selected colors in quote full records
  const quoteCartFull = useMemo(() => {
    return COUNTERTOP_COLORS.filter(color => quoteCart.includes(color.id));
  }, [quoteCart]);

  return (
    <AuthProvider>
    <div className={`relative min-h-screen flex flex-col justify-between selection:bg-amber-200 theme-${theme}`}>
      
      {/* Top Banner Message for Premium Vibe */}
      <div className="bg-neutral-950 text-stone-200 text-[10px] font-mono tracking-[0.2em] py-2 px-6 text-center uppercase border-b border-[var(--border-color)]">
        <span className="flex items-center justify-center gap-3">
          <span>Türkiye'nin En Seçkin Mimari Yüzey ve Lüks Tezgah Platformu</span>
          <span>•</span>
          <Phone className="inline h-3 w-3 text-gold-400" />
          <span>+90 (212) 650 22 20</span>
        </span>
      </div>

      {/* Frosted glass header navigation */}
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
        savedColorsCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesDrawerOpen(true)}
        onStartQuote={handleStartGenericQuote}
        onLoginClick={() => setShowAuthModal(true)}
      />

      {/* Main Container */}
      <main className="flex-1 bg-[#faf9f6]">

        {/* 1. HOME VIEW */}
        {activePage === 'home' && (
          <motion.div variants={pageContainerVariants} initial="hidden" animate="visible" exit="hidden">
            {/* Elegant Hero Slider Area */}
            <div className="relative h-[85vh] w-full overflow-hidden bg-neutral-950">
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentHeroSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <img
                    src={heroSlides[currentHeroSlide].image}
                    alt={heroSlides[currentHeroSlide].title}
                    className="w-full h-full object-cover scale-105 transform translate-y-0 animate-[pan_30s_infinite_alternate]"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Overlay shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-transparent" />
              <div className="absolute inset-0 bg-black/30" />

              {/* Central Premium Copy and Steps Selector */}
              <div className="absolute inset-x-0 bottom-0 sm:top-1/2 sm:-translate-y-1/2 flex flex-col items-center justify-center px-6 text-center max-w-7xl mx-auto z-10 py-12 sm:py-0">
                <span className="font-mono text-xs text-gold-400 uppercase tracking-[0.3em] mb-4">
                  Tezgah Studio
                </span>
                
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentHeroSlide}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center"
                  >
                    <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl leading-tight">
                      {heroSlides[currentHeroSlide].title}
                    </h1>
                    
                    <p className="mt-4 text-xs sm:text-sm text-stone-200/90 font-light max-w-2.5xl leading-relaxed">
                      {heroSlides[currentHeroSlide].subtitle}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Subtitle instructions */}
                <div className="mt-12 w-full max-w-5xl">
                  <div className="mb-4 text-gold-400 font-mono text-[10px] uppercase tracking-[0.25em] flex items-center justify-center space-x-2">
                    <span className="w-10 h-[1.5px] bg-gold-500/50"></span>
                    <span>Projeniz İçin Hangi Kategoride Hizmet Almak İstiyorsunuz?</span>
                    <span className="w-10 h-[1.5px] bg-gold-500/50"></span>
                  </div>

                  {/* 3 Major Selector Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Retail Card */}
                    <button
                      onClick={() => handleStartQuoteWithCategory('Perakende')}
                      className="group relative bg-white/10 backdrop-blur-luxury border border-white/20 hover:border-gold-400 rounded-2xl p-6 text-left transition-luxury hover:bg-white/15 focus:outline-none"
                      id="card-choice-perakende"
                    >
                      <div className="absolute top-4 right-4 h-6 w-6 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-gold-500 group-hover:text-white group-hover:border-gold-500 transition-all">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                      <span className="font-mono text-[10px] text-gold-400 uppercase tracking-widest block mb-1">Seçenek 01</span>
                      <h4 className="font-serif text-lg font-bold text-white tracking-wide">Perakende Konut</h4>
                      <p className="text-[11px] text-stone-300 font-light mt-1.5 leading-relaxed">
                        Ev, mutfak, banyo, ada banyosu ve küçük bireysel mülk yerleşimli mutfak yenileme işleriniz için.
                      </p>
                      <span className="inline-block pt-3 text-[9px] font-mono tracking-widest text-gold-200 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                        Fiyat Teklifi Gör →
                      </span>
                    </button>

                    {/* Boutique Card */}
                    <button
                      onClick={() => handleStartQuoteWithCategory('Butik Proje')}
                      className="group relative bg-white/10 backdrop-blur-luxury border border-white/20 hover:border-gold-400 rounded-2xl p-6 text-left transition-luxury hover:bg-white/15 focus:outline-none"
                      id="card-choice-butik"
                    >
                      <div className="absolute top-4 right-4 h-6 w-6 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-gold-500 group-hover:text-white group-hover:border-gold-500 transition-all">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                      <span className="font-mono text-[10px] text-gold-400 uppercase tracking-widest block mb-1">Seçenek 02</span>
                      <h4 className="font-serif text-lg font-bold text-white tracking-wide">Butik Tasarım Proje</h4>
                      <p className="text-[11px] text-stone-300 font-light mt-1.5 leading-relaxed">
                        Villa, özel tasarım mutfaklar, restoran, cafe barları, prestijli mimari iç mekan projeleri.
                      </p>
                      <span className="inline-block pt-3 text-[9px] font-mono tracking-widest text-gold-200 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                        Keşif & Teklif Al →
                      </span>
                    </button>

                    {/* Bulk Corporate Card */}
                    <button
                      onClick={() => handleStartQuoteWithCategory('Toplu Proje')}
                      className="group relative bg-white/10 backdrop-blur-luxury border border-white/20 hover:border-gold-400 rounded-2xl p-6 text-left transition-luxury hover:bg-white/15 focus:outline-none"
                      id="card-choice-toplu"
                    >
                      <div className="absolute top-4 right-4 h-6 w-6 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-gold-500 group-hover:text-white group-hover:border-gold-500 transition-all">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                      <span className="font-mono text-[10px] text-gold-400 uppercase tracking-widest block mb-1">Seçenek 03</span>
                      <h4 className="font-serif text-lg font-bold text-white tracking-wide">Toplu Kurumsal / Taahhüt</h4>
                      <p className="text-[11px] text-stone-300 font-light mt-1.5 leading-relaxed">
                        Otel, lüks rezidans, toplu konut mutfakları, mimari ofis ve müteahhitlik özel siparişleri.
                      </p>
                      <span className="inline-block pt-3 text-[9px] font-mono tracking-widest text-gold-200 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                        İş Ortağı Fiyatı Al →
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Dot Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentHeroSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentHeroSlide ? 'w-6 bg-gold-400' : 'w-2 bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Brand Logo Marquee */}
            <BrandLogoBar />

            {/* Section: Showcase Video */}
            <motion.section variants={pageItemVariants} className="relative w-full bg-neutral-950 overflow-hidden">
              <div className="relative w-full overflow-hidden" style={{ paddingTop: '56.25%' }}>
                <iframe
                  className="absolute w-full h-full"
                  style={{ top: '-18%', left: '-5%', width: '110%', height: '136%', transform: 'none' }}
                  src="https://www.youtube.com/embed/hviGNsy7L-M?autoplay=1&mute=1&loop=1&playlist=hviGNsy7L-M&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0"
                  title="Tezgah Studio Showcase"
                  frameBorder="0"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                />
                {/* Tüm tıklamaları engelleyen şeffaf katman */}
                <div className="absolute inset-0 z-10" style={{ background: 'transparent', cursor: 'default' }} />
                {/* Gradient geçişi */}
                <div className="absolute inset-0 z-20 bg-gradient-to-b from-neutral-950/30 via-transparent to-neutral-950/30 pointer-events-none" />
              </div>
            </motion.section>

            {/* Section 2: Showroom Statement */}
            <motion.section variants={pageItemVariants} className="py-20 bg-stone-warm">
              <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 space-y-6">
                  <span className="font-mono text-xs text-gold-600 uppercase tracking-widest block">Neden Tezgah Studio?</span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
                    Hayalinizdeki Mimariyi Lüks Yüzeylerle Taçlandırın
                  </h2>
                  <p className="text-sm text-neutral-600 leading-relaxed font-light">
                    Mutfak ve banyo tezgahları sadece bir çalışma alanı değil; mekanın ruhunu, kalitesini ve lüks algısını belirleyen en önemli mimari odaktır.
                  </p>
                  <p className="text-sm text-neutral-600 leading-relaxed font-light">
                    Tezgah Studio olarak, İtalya ve İspanya'nın dünya lideri porselen teknoloji devlerinden yerli kuvars zanaatkarlığının gururlarına kadar en seçkin markaları tek bir çatı altında topluyoruz. Size sadece malzeme değil, uzman lazer şablon ölçümü ve ömürlük premium işçilik sunuyoruz.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => handleNavigate('tech-info')}
                      className="group inline-flex items-center space-x-2 border-b border-gold-500 pb-1 text-xs font-semibold tracking-widest text-neutral-950 uppercase hover:text-gold-600 hover:border-gold-600 transition-colors"
                    >
                      <span>Malzemeleri Karşılaştır</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-3 gap-4">
                  <div className="relative rounded-2xl overflow-hidden shadow-md h-96">
                    <img
                      src="/banyo-tezgah.jpg"
                      alt="Banyo Tezgah Modelleri"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-md h-96">
                    <img
                      src="/mutfak-tezgah.jpg"
                      alt="Mutfak Tezgahları"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-md h-96">
                    <img
                      src="/gri-tezgah.jpg"
                      alt="Tezgah Üretimi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section 3: Tezgah Kategorileri */}
            <motion.section variants={pageItemVariants} className="py-7 bg-[#f0e9d8] relative overflow-hidden">
              <div className="relative mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
                {/* Başlık alanı */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[9px] text-amber-600 uppercase tracking-[0.3em]">Tezgah Kategorileri</span>
                    <span className="w-px h-3 bg-stone-300" />
                    <h2 className="font-serif text-base font-bold text-neutral-900">Ürün Grupları</h2>
                  </div>
                  <p className="hidden md:block text-[11px] text-amber-800/70 font-medium italic max-w-xs text-right leading-relaxed">Doğal taştan akrilik yüzeylere, her kullanım alanı ve bütçeye özel premium tezgah çözümleri</p>
                </div>

                {/* Kategori listesi */}
                <div className="divide-y divide-stone-200/70">
                  {[
                    { num: '01', id: 'dogal-tas', title: 'Doğal Taş Tezgahlar', desc: 'Mermer, granit, kuvarsit, oniks, traverten.', image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=200&q=80' },
                    { num: '02', id: 'kuvars', title: 'Kuvars Tezgahlar', desc: 'Çimstone, Belenco, Silestone, Caesarstone ve benzeri markalar.', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=200&q=80' },
                    { num: '03', id: 'porselen', title: 'Porselen & Seramik Tezgahlar', desc: 'Dekton, Laminam, Neolith, SapienStone, büyük ebat seramikler.', image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=200&q=80' },
                    { num: '04', id: 'akrilik', title: 'Akrilik / Solid Surface Tezgahlar', desc: 'Corian, Hi-Macs, Staron, Tristone.', image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=200&q=80' },
                    { num: '05', id: 'ekonomik', title: 'Ekonomik & Alternatif Tezgahlar', desc: 'Laminat, kompakt laminat, ahşap, beton, paslanmaz çelik.', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=200&q=80' },
                  ].map((cat) => (
                    <div
                      key={cat.num}
                      onClick={() => { setSelectedCategoryId(cat.id); handleNavigate('category-detail'); }}
                      className="group flex items-center gap-4 py-2.5 cursor-pointer transition-all duration-200 hover:bg-white/70 px-3 -mx-3 rounded-xl"
                    >
                      <div className="shrink-0 h-9 w-9 rounded-full overflow-hidden ring-1 ring-stone-200 group-hover:ring-amber-400 transition-all duration-200 shadow-sm">
                        <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                      </div>
                      <span className="shrink-0 font-mono text-[10px] text-stone-300 tracking-widest w-5">{cat.num}</span>
                      <div className="shrink-0 h-5 w-px bg-stone-200" />
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-6">
                        <h4 className="text-[13px] font-semibold text-neutral-800 tracking-tight group-hover:text-amber-600 transition-colors duration-200">{cat.title}</h4>
                        <p className="text-[11px] text-stone-400 font-light sm:text-right">{cat.desc}</p>
                      </div>
                      <ArrowRight className="shrink-0 h-3.5 w-3.5 text-stone-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Section 4: Hot Dynamic Selection Banner */}
            <motion.section variants={pageItemVariants} className="py-24 bg-neutral-950 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <img 
                  src="https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80" 
                  alt="Background" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="mx-auto max-w-5xl px-6 text-center relative z-10 space-y-6">
                <span className="font-mono text-xs text-gold-400 uppercase tracking-widest">Kolay ve Akıllı Süreç</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                  Kafanız Mı Karışık? Birlikte Tasarlayalım
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 font-light max-w-2xl mx-auto leading-relaxed">
                  Onlarca marka, yüzlerce taş rengi ve teknik kıyaslamalar arasında kaybolmayın. Adım adım yönlendiren formumuz sayesinde bütçenize ve kullanım alanınıza en uyumlu lüks tezgah alternatiflerini bizzat mimarımız çıkartsın.
                </p>

                <div className="pt-4">
                  <button
                    onClick={handleStartGenericQuote}
                    className="rounded-full bg-gold-500 hover:bg-gold-600 text-neutral-950 px-10 py-4 text-xs font-semibold tracking-widest uppercase shadow-md transition-colors"
                  >
                    Hemen Seçime Başla & Teklif Al
                  </button>
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}

        {/* 2. BRANDS VIEW */}
        {activePage === 'brands' && (
          <motion.div variants={pageContainerVariants} initial="hidden" animate="visible" exit="hidden" className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 space-y-10" id="brands-page">
            <motion.div variants={pageItemVariants} className="text-center md:text-left space-y-2">
              <span className="font-mono text-xs text-gold-600 uppercase tracking-widest block">Koleksiyonlar</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">Anlaşmalı Markalarımız</h2>
              <p className="text-xs sm:text-sm text-stone-500 font-light max-w-2xl">
                Dilediğiniz markanın fiziksel dayanıklılık, menşei ve koleksiyon detaylarını inceleyin.
              </p>
            </motion.div>

            {/* Clean Filter Panel for Brands */}
            <motion.div variants={pageItemVariants} className="bg-white border border-stone-200/60 rounded-2xl p-6 shadow-xs grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              {/* Filter 1: Search */}
              <div className="space-y-1 md:col-span-2">
                <label className="block text-[10px] font-bold text-neutral-600 uppercase tracking-wider">Arama</label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Marka adı veya malzeme yazın..."
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    className="w-full text-xs pl-9 pr-4 py-2 bg-stone-50 border border-stone-300 rounded-lg outline-none focus:bg-white focus:border-gold-500 transition-colors"
                    id="brand-search-input"
                  />
                </div>
              </div>

              {/* Filter 2: Origin */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-neutral-600 uppercase tracking-wider">Menşei</label>
                <div className="flex space-x-1">
                  {(['Tümü', 'Yerli', 'Global'] as const).map((origin) => (
                    <button
                      key={origin}
                      onClick={() => setBrandOriginFilter(origin)}
                      className={`text-[10px] font-semibold tracking-wider uppercase flex-1 py-2 text-center rounded-lg border transition-all ${
                        brandOriginFilter === origin
                          ? 'bg-neutral-950 text-white border-neutral-950'
                          : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-400'
                      }`}
                      id={`filter-origin-${origin}`}
                    >
                      {origin}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter 3: Material Category */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-neutral-600 uppercase tracking-wider">Malzeme Türü</label>
                <select
                  value={brandMaterialFilter}
                  onChange={(e) => setBrandMaterialFilter(e.target.value)}
                  className="w-full text-xs py-2 px-3 border border-stone-300 bg-stone-50 rounded-lg outline-none focus:bg-white focus:border-gold-500"
                  id="filter-brand-material"
                >
                  <option value="Tümü">Tümü</option>
                  <option value="Kuvars">Kuvars</option>
                  <option value="Porselen">Porselen</option>
                  <option value="Akrilik / Solid Surface">Akrilik / Solid Surface</option>
                  <option value="Mermer">Mermer</option>
                  <option value="Doğal Taş">Doğal Taş</option>
                </select>
              </div>
            </motion.div>

            {/* Brands Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBrands.map((brand) => (
                <motion.div
                  key={brand.id}
                  variants={pageItemVariants}
                  className="group bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-luxury flex flex-col justify-between interactive-card hover-gold-glow"
                  id={`brand-card-${brand.id}`}
                >
                  <div className="p-6 space-y-4">
                    {/* Upper */}
                    <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-11 w-11 rounded-full bg-neutral-950 text-white flex items-center justify-center font-serif font-bold text-sm">
                          {brand.logo}
                        </div>
                        <div>
                          <h3 className="font-bold text-neutral-900 tracking-wide text-sm uppercase">{brand.name}</h3>
                          <span className="text-[10px] text-stone-500 font-mono tracking-widest block">{brand.origin} Üretim</span>
                        </div>
                      </div>
                      <span className={`text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full border ${
                        brand.tier === 'Premium' ? 'border-amber-200 bg-amber-50/50 text-amber-800' : 'border-stone-200 bg-stone-50/50 text-stone-600'
                      }`}>
                        {brand.tier}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-600 leading-relaxed font-light min-h-[50px]">
                      {brand.description}
                    </p>

                    {/* Tag highlights */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {brand.materials.map((m) => (
                        <span key={m} className="bg-stone-100 text-stone-600 text-[9px] font-medium px-2 py-0.5 rounded">
                          {m}
                        </span>
                      ))}
                      <span className="bg-gold-50 text-gold-800 text-[9px] font-semibold px-2 py-0.5 rounded">
                        {brand.colorsCount} Renk Koleksiyonu
                      </span>
                    </div>
                  </div>

                  {/* CTA Footer */}
                  <div className="bg-stone-warm border-t border-stone-100 p-4 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setSelectedBrand(brand);
                      }}
                      className="text-center border border-stone-300 py-2.5 text-[10px] font-semibold tracking-wider text-stone-700 bg-white hover:bg-neutral-50 rounded-lg uppercase"
                      id={`brand-btn-details-${brand.id}`}
                    >
                      Koleksiyonu Gör
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCategoryForWizard(null);
                        setSelectedBrand(brand.name);
                        setActivePage('quote-wizard');
                      }}
                      className="text-center bg-neutral-950 text-white hover:bg-gold-600 py-2.5 text-[10px] font-semibold tracking-wider rounded-lg uppercase transition-colors"
                      id={`brand-btn-quote-${brand.id}`}
                    >
                      Teklif Al
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredBrands.length === 0 && (
              <div className="text-center py-16 bg-white border border-stone-200/60 rounded-2xl space-y-2">
                <AlertCircle className="h-8 w-8 text-stone-400 mx-auto" />
                <h4 className="text-sm font-semibold text-neutral-800">Aramanıza Uygun Marka Bulunamadı</h4>
                <p className="text-xs text-stone-500 max-w-sm mx-auto font-light">Lütfen filtreleri sıfırlayarak tekrar arama yapınız.</p>
                <button
                  onClick={() => {
                    setBrandSearch('');
                    setBrandOriginFilter('Tümü');
                    setBrandMaterialFilter('Tümü');
                  }}
                  className="rounded-full bg-neutral-950 px-5 py-2 text-[10px] tracking-widest text-white uppercase font-semibold mt-3"
                  id="reset-brand-filters"
                >
                  Filtreleri Sıfırla
                </button>
              </div>
            )}
          </motion.div>
        )}


        {/* 4. COLORS VIEW */}
        {/* 5. PROJECTS INSPIRATION VIEW */}
        {activePage === 'projects' && (
          <motion.div variants={pageContainerVariants} initial="hidden" animate="visible" exit="hidden" className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 space-y-10" id="projects-page">
            <motion.div variants={pageItemVariants} className="text-center md:text-left space-y-2">
              <span className="font-mono text-xs text-gold-600 uppercase tracking-widest block">Galeri & Vizyon</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">Uygulama Alanları & Proje İlhamı</h2>
              <p className="text-xs sm:text-sm text-stone-500 font-light max-w-2xl">
                Seçkin mimarlarımızın imzasını taşıyan, mutfak adalarından monolitik ticari bankolara kadar lüks referanslarımız.
              </p>
            </motion.div>

            {/* Category selection chips */}
            <motion.div variants={pageItemVariants} className="flex flex-wrap justify-center sm:justify-start gap-1 pb-4 border-b border-stone-200">
              {['Tümü', 'Mutfak', 'Banyo', 'Ticari', 'Özel Tasarım'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setInspirationCategoryFilter(cat)}
                  className={`px-5 py-2 text-xs font-semibold tracking-wider rounded-full border transition-all ${
                    inspirationCategoryFilter === cat
                      ? 'bg-neutral-950 text-white border-neutral-950'
                      : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'
                  }`}
                  id={`btn-proj-filter-${cat}`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INSPIRATIONS.filter(p => inspirationCategoryFilter === 'Tümü' || p.category === inspirationCategoryFilter).map((proj) => (
                <motion.div
                  key={proj.id}
                  variants={pageItemVariants}
                  className="group bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-luxury flex flex-col interactive-card hover-gold-glow"
                  id={`proj-card-${proj.id}`}
                >
                  <div className="relative h-64 overflow-hidden bg-stone-150">
                    <img 
                      src={proj.image} 
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-neutral-850 px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase border border-white/20">
                      {proj.category}
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-stone-400 tracking-wider block uppercase">{proj.location}</span>
                      <h4 className="font-serif text-lg font-bold text-neutral-900 group-hover:text-gold-600 transition-colors">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-neutral-500 font-light italic">
                        Tasarımcı: {proj.designer}
                      </p>
                    </div>

                    <div className="border-t border-stone-100 pt-3 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-stone-400 uppercase font-bold block mb-0.5">Kullanılan Malzeme</span>
                        <span className="text-xs font-medium text-neutral-850">{proj.materialUsed}</span>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedCategoryForWizard(null);
                          setSelectedMaterialForWizard(proj.materialUsed.split(' ')[0]); // Preselect category/material family
                          setSelectedBrandForWizard(null);
                          setActivePage('quote-wizard');
                        }}
                        className="text-[10px] font-bold text-white bg-neutral-950 hover:bg-gold-600 px-3 py-1.5 rounded transition-colors uppercase"
                        id={`proj-cta-${proj.id}`}
                      >
                        Benzer Teklif Al
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 6. TECHNICAL COMPARISON TABLE */}
        {activePage === 'tech-info' && (
          <motion.div variants={pageContainerVariants} initial="hidden" animate="visible" exit="hidden" className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 space-y-10" id="tech-page">
            <motion.div variants={pageItemVariants} className="text-center md:text-left space-y-2">
              <span className="font-mono text-xs text-gold-600 uppercase tracking-widest block">Karşılaştırma Laboratuvarı</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">Malzeme Karşılaştırma Matrisi</h2>
              <p className="text-xs sm:text-sm text-stone-500 font-light max-w-2xl">
                Projenize yönelik en doğru kimyasal bileşimi seçebilmeniz için malzemelerin zorluk dirençlerini sayılarla analiz edin.
              </p>
            </motion.div>

            {/* Desktop Table View */}
            <motion.div variants={pageItemVariants} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs hidden md:block">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-950 text-white font-mono text-[10px] uppercase tracking-wider">
                    <th className="p-4 pl-6">Tezgah Materyali</th>
                    <th className="p-4 text-center">Çizilme Dayanımı</th>
                    <th className="p-4 text-center">Leke Direnci</th>
                    <th className="p-4 text-center">Yüksek Isı Direnci</th>
                    <th className="p-4 text-center">Bakım Kolaylığı</th>
                    <th className="p-4 text-center">Dış Mekan Uygunluğu</th>
                    <th className="p-4 text-center">Maliyet Segmenti</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs">
                  {TECHNICAL_COMPARISONS.map((row) => (
                    <React.Fragment key={row.material}>
                      <tr className="hover:bg-stone-50/50 transition-colors font-medium">
                        <td className="p-4 pl-6 text-neutral-900 font-serif text-sm font-bold">{row.material}</td>
                        {/* Star render helper */}
                        <td className="p-4 text-center text-amber-500 font-bold">
                          {"★".repeat(row.durability) + "☆".repeat(5-row.durability)}
                        </td>
                        <td className="p-4 text-center text-amber-500 font-bold">
                          {"★".repeat(row.stainResistance) + "☆".repeat(5-row.stainResistance)}
                        </td>
                        <td className="p-4 text-center text-amber-500 font-bold">
                          {"★".repeat(row.heatResistance) + "☆".repeat(5-row.heatResistance)}
                        </td>
                        <td className="p-4 text-center text-amber-500 font-bold">
                          {"★".repeat(row.maintenanceEase) + "☆".repeat(5-row.maintenanceEase)}
                        </td>
                        <td className="p-4 text-center">
                          {row.outdoorSuitability ? (
                            <span className="inline-block bg-emerald-50 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-100 uppercase">Mükemmel</span>
                          ) : (
                            <span className="inline-block bg-red-50 text-red-800 text-[10px] font-semibold px-2 py-0.5 rounded border border-red-100 uppercase">Tavsiye Edilmez</span>
                          )}
                        </td>
                        <td className="p-4 text-center font-bold font-mono tracking-widest text-neutral-950 bg-gold-50/20">{row.priceLevel}</td>
                      </tr>
                      {/* Secondary row with text guidance */}
                      <tr className="bg-stone-50/20 text-stone-500 text-[11px] font-light italic">
                        <td colSpan={7} className="p-3 pl-6 border-b border-stone-200/50 leading-relaxed">
                          <span className="not-italic font-bold text-neutral-700">Görsel Karakter: </span> {row.visualImpact} <span className="mx-2">|</span> 
                          <span className="not-italic font-bold text-neutral-700">Doğru Uygulama: </span> {row.recommendedUse}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Mobile Cards for Info of Matrix */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {TECHNICAL_COMPARISONS.map((row) => (
                <motion.div key={row.material} variants={pageItemVariants} className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-xs">
                  <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                    <h4 className="font-serif text-base font-bold text-neutral-900">{row.material}</h4>
                    <span className="font-mono text-xs font-bold bg-gold-100 text-gold-800 px-2.5 py-0.5 rounded">
                      Fiyat: {row.priceLevel}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs font-light">
                    <div>
                      <span className="text-stone-400 block">Çizilme Dayanımı:</span>
                      <span className="text-amber-500 font-bold">{"★".repeat(row.durability)}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Leke Direnci:</span>
                      <span className="text-amber-500 font-bold">{"★".repeat(row.stainResistance)}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Yüksek Isı Direnci:</span>
                      <span className="text-amber-500 font-bold">{"★".repeat(row.heatResistance)}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Bakım Kolaylığı:</span>
                      <span className="text-amber-500 font-bold">{"★".repeat(row.maintenanceEase)}</span>
                    </div>
                    <div className="col-span-2 pt-2">
                      <span className="text-stone-400 block">Dış Mekan Uyumu:</span>
                      <span className="font-medium text-neutral-800">
                        {row.outdoorSuitability ? "✅ Güneş/UV Işınlarına Dayanıklı" : "❌ Sadece İç Mekan Önerilir"}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-stone-100 pt-3 text-[11px] text-stone-600 font-light space-y-1 leading-relaxed">
                    <p><strong>Görsel Etki:</strong> {row.visualImpact}</p>
                    <p><strong>Doğru Kullanım:</strong> {row.recommendedUse}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Warning Advice */}
            <motion.div variants={pageItemVariants} className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start space-x-3 text-amber-900 text-xs leading-relaxed font-light">
              <Info className="h-5 w-5 shrink-0 text-amber-800 mt-0.5" />
              <div>
                <strong>Profesyonel Mimar Tavsiyesi:</strong> Tezgahlarımızın ömrü sadece seçilen malzemenin sertliğine bağlı değildir. Köşe birleşimlerinin pürüzsüzlüğü, evye alttan yapıştırma kesimlerindeki elmas payları ve süpürgeliklerin silikon yalıtımı toplam kalitenin %60'ını oluşturur. Tezgah Studio olarak tüm montaj işçiliklerinde 2 yıl resmi garanti ve sızdırmazlık sertifikası sunuyoruz.
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* 6.5 INTERACTIVE SIMULATOR VIEW */}
        {/* 7. STEPPER WIZARD PATH */}
        {activePage === 'quote-wizard' && (
          <motion.div variants={pageContainerVariants} initial="hidden" animate="visible" exit="hidden" className="mx-auto max-w-5xl px-6 py-6 sm:px-8" id="wizard-segment">
            <QuoteWizard
              initialCategory={selectedCategoryForWizard}
              initialMaterial={selectedMaterialForWizard}
              initialBrand={selectedBrandForWizard}
              onCancel={() => handleNavigate('home')}
              onComplete={(quoteData) => {
                // Clear state on submission
                setQuoteCart([]);
                setSelectedCategoryForWizard(null);
                setSelectedMaterialForWizard(null);
                setSelectedBrandForWizard(null);
              }}
            />
          </motion.div>
        )}

        {/* Kategori Detay Sayfası */}
        {activePage === 'category-detail' && selectedCategoryId && (
          <div className="min-h-screen bg-white">
            <CategoryDetailPage
              categoryId={selectedCategoryId}
              onNavigate={handleNavigate}
              onQuote={() => handleNavigate('quote-wizard')}
            />
          </div>
        )}

        {/* Yasal Sayfalar */}
        {activePage === 'legal' && legalPage && (
          <div className="min-h-screen bg-neutral-50">
            <LegalPage page={legalPage} onBack={() => { setLegalPage(null); handleNavigate('home'); }} />
          </div>
        )}

      </main>

      {/* FOOTER */}
      <Footer onNavigate={handleNavigate} onLegal={(p) => { setLegalPage(p); handleNavigate('legal'); }} />

      {/* FAVORITES DRAWER SLIDEOUT SHEET */}
      {isFavoritesDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="favorites-drawer">
          <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-xs transition-opacity" onClick={() => setIsFavoritesDrawerOpen(false)} />
          
          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md bg-stone-warm flex flex-col justify-between shadow-2xl border-l border-stone-200">
              
              {/* Drawer Front / Header */}
              <div className="bg-neutral-950 text-white px-6 py-6 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                  <h3 className="font-serif text-lg font-bold tracking-wide">Favori Renklerim</h3>
                </div>
                <button
                  onClick={() => setIsFavoritesDrawerOpen(false)}
                  className="rounded-full bg-white/10 hover:bg-white/20 p-1.5 transition-colors text-white"
                  id="close-favs-drawer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Drawer Body lists favorites */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                {savedColorsFull.length === 0 ? (
                  <div className="text-center py-20 space-y-3">
                    <HeartOff className="h-10 w-10 text-stone-400 mx-auto" strokeWidth={1} />
                    <h4 className="text-xs font-semibold text-neutral-800">Favori Listeniz Boş</h4>
                    <p className="text-[11px] text-stone-500 font-light max-w-xs mx-auto leading-relaxed">
                      Ürünler sayfasında hoşunuza giden kuvars, porselen veya doğal mermer serilerinin üzerindeki kalp ikonuna tıklayarak buraya kaydedebilirsiniz.
                    </p>
                    <button
                      onClick={() => {
                        setIsFavoritesDrawerOpen(false);
                        handleNavigate('colors');
                      }}
                      className="text-[10px] font-bold text-gold-600 border border-gold-300 rounded-lg px-4 py-2 hover:bg-gold-50/30 transition-colors"
                      id="drawer-browse-colors"
                    >
                      Renkleri İncele
                    </button>
                  </div>
                ) : (
                  savedColorsFull.map((col) => (
                    <div 
                      key={col.id} 
                      className="bg-white border rounded-xl overflow-hidden p-3 flex space-x-3 items-center relative group"
                      id={`drawer-fav-item-${col.id}`}
                    >
                      <div className="h-14 w-14 rounded-lg overflow-hidden shrink-0 bg-stone-100">
                        <img src={col.image} alt={col.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="text-[9px] font-bold text-gold-600 block uppercase tracking-wider">{col.brand} • {col.materialType}</span>
                        <h4 className="font-semibold text-neutral-900 text-xs tracking-wide">{col.name}</h4>
                        <span className="text-[10px] text-stone-400 font-light block">{col.finish} Yüzey</span>
                      </div>
                      
                      {/* Delete option */}
                      <button
                        onClick={() => handleToggleFavorite(col.id)}
                        className="text-stone-400 hover:text-red-500 p-1 rounded-full hover:bg-stone-50 transition-colors shrink-0"
                        title="Favoriden Çıkar"
                        id={`drawer-btn-rem-${col.id}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer footer option */}
              <div className="border-t border-stone-200 bg-white p-6 space-y-3.5">
                {savedColorsFull.length > 0 && (
                  <>
                    <h5 className="text-xs font-bold text-neutral-850 uppercase tracking-wider text-left">Toplu İşlemler</h5>
                    <button
                      onClick={() => {
                        // Batch add all favorites to quote cart
                        savedColorsFull.forEach(col => {
                          if (!quoteCart.includes(col.id)) {
                            setQuoteCart(prev => [...prev, col.id]);
                          }
                        });
                        setIsFavoritesDrawerOpen(false);
                        setSelectedCategoryForWizard(null);
                        setActivePage('quote-wizard');
                      }}
                      className="w-full bg-neutral-950 font-bold hover:bg-gold-600 text-stone-warm py-3 text-xs tracking-widest uppercase rounded-xl transition-colors text-center shadow-xs"
                      id="drawer-bulk-quote"
                    >
                      Tüm Fiyat Taleplerini Al
                    </button>
                  </>
                )}
                <button
                  onClick={() => setIsFavoritesDrawerOpen(false)}
                  className="w-full border border-stone-300 text-stone-600 hover:text-neutral-950 py-2.5 text-xs tracking-widest uppercase rounded-xl transition-colors text-center"
                  id="drawer-close-btn"
                >
                  Kapat ve Devam Et
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* BRAND INTERACTIVE DETAILED OVERLAY MODAL */}
      {selectedBrand && (
        <div className="fixed inset-0 z-50 overflow-y-auto" id="brand-detail-modal">
          {/* backdrop */}
          <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity" onClick={() => setSelectedBrand(null)} />
          
          <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-6 lg:p-8 z-10 relative">
            <div className="w-full max-w-4xl bg-stone-warm border border-stone-200 rounded-3xl overflow-hidden shadow-2xl relative text-left">
              
              {/* Close Button top corner */}
              <button
                onClick={() => setSelectedBrand(null)}
                className="absolute top-5 right-5 z-25 h-9 w-9 bg-neutral-950/30 hover:bg-neutral-950/60 transition-colors text-white rounded-full flex items-center justify-center border border-white/15"
                id="close-brand-modal"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                
                {/* Left brand card segment */}
                <div className="md:col-span-4 bg-neutral-950 text-stone-200 p-8 flex flex-col justify-between">
                  <div className="space-y-6 pt-4">
                    <div className="h-16 w-16 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white font-serif font-black text-xl shadow-lg">
                      {selectedBrand.logo}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-mono">{selectedBrand.origin} Lüks Malzemesi</span>
                      <h3 className="font-serif text-3xl font-bold tracking-tight text-white mt-1">{selectedBrand.name}</h3>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-light">
                      {selectedBrand.description}
                    </p>
                  </div>

                  <div className="pt-10 border-t border-white/10 space-y-4">
                    <div className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">Hızlı Bilgiler</div>
                    <div className="text-xs space-y-2.5 font-light">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Üretim Menşei:</span>
                        <span className="font-medium text-white">{selectedBrand.origin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Koleksiyon Sayısı:</span>
                        <span className="font-medium text-stone-200">{selectedBrand.colorsCount} Seçkin Desen</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Temizlik Bakımı:</span>
                        <span className="font-medium text-stone-200">Son Derece Kolay</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right extensive detail hub */}
                <div className="md:col-span-8 p-8 space-y-8 max-h-[85vh] overflow-y-auto no-scrollbar bg-white">
                  
                  {/* Detailed summary */}
                  <div className="space-y-3">
                    <span className="font-mono text-[10px] text-gold-600 uppercase tracking-widest font-bold">Zanaat Hikayesi</span>
                    <h4 className="font-serif text-lg font-bold text-neutral-950">Mükemmele Ulaşan Teknoloji</h4>
                    <p className="text-xs text-stone-600 leading-relaxed font-light">{selectedBrand.longDescription}</p>
                  </div>

                  {/* Suitability lists */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-100">
                      <h4 className="text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 flex items-center space-x-1">
                        <Check className="h-4 w-4" />
                        <span>Fiziksel Mukavemeti</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs font-light text-neutral-600">
                        {selectedBrand.advantages.map((adv, i) => (
                          <li key={i}>• {adv}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-amber-50/40 p-4 rounded-xl border border-amber-100">
                      <h4 className="text-amber-800 text-xs font-bold uppercase tracking-wider mb-2 flex items-center space-x-1">
                        <X className="h-4 w-4" />
                        <span>Bakım ve Kısıtlar</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs font-light text-neutral-600">
                        {selectedBrand.disadvantages.map((dis, i) => (
                          <li key={i}>• {dis}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Brand specific catalog documents download list */}
                  <div className="space-y-4">
                    <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Dökümanlar & Sertifikalar</span>
                    <div className="space-y-2">
                      {selectedBrand.documents.map((doc, idx) => (
                        <div key={idx} className="border border-stone-200 rounded-xl p-3 flex items-center justify-between hover:bg-stone-50 transition-colors">
                          <div className="flex items-center space-x-2.5 text-stone-600">
                            <FileText className="h-5 w-5 text-gold-500 shrink-0" />
                            <div className="text-left">
                              <span className="text-xs font-semibold text-neutral-900 block">{doc.title}</span>
                              <span className="text-[10px] text-stone-400 font-mono block">PDF • {doc.size}</span>
                            </div>
                          </div>
                          
                          <button 
                            onClick={() => alert(`"${doc.title}" kataloğu indirilmeye başlandı.`)} 
                            className="bg-neutral-100 hover:bg-neutral-900 hover:text-white p-2 rounded-lg transition-colors text-neutral-700"
                            title="İndir"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Brand colors show dynamic */}
                  <div className="space-y-4 pt-2">
                    <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Popüler {selectedBrand.name} Renkleri</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {COUNTERTOP_COLORS.filter(col => col.brandId === selectedBrand.id).map(col => (
                        <div key={col.id} className="border border-stone-200/50 rounded-xl p-2 bg-stone-warm/50 text-center space-y-1.5">
                          <div className="h-16 w-full rounded-lg overflow-hidden bg-stone-200">
                            <img src={col.image} className="w-full h-full object-cover" alt={col.name} referrerPolicy="no-referrer" />
                          </div>
                          <span className="text-[10px] font-bold text-neutral-900 block truncate px-1">{col.name}</span>
                          <span className="text-[9px] text-stone-500 block">{col.finish} Yüzey</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Trigger Action bar */}
                  <div className="border-t border-stone-100 pt-6 flex items-center justify-end space-x-3">
                    <button
                      onClick={() => setSelectedBrand(null)}
                      className="border border-stone-300 py-2.5 px-6 rounded-full text-xs font-semibold tracking-wider text-neutral-700 uppercase hover:bg-stone-50"
                      id="close-modal-bottom-btn"
                    >
                      Kapat
                    </button>
                    <button
                      onClick={() => {
                        const brandName = selectedBrand.name;
                        setSelectedBrand(null);
                        setSelectedCategoryForWizard(null);
                        setSelectedBrand(brandName);
                        setActivePage('quote-wizard');
                      }}
                      className="bg-neutral-950 hover:bg-gold-600 py-2.5 px-6 rounded-full text-xs font-semibold text-white tracking-widest uppercase transition-colors"
                      id="brand-modal-quote-btn"
                    >
                      Bu Markadan Teklif Al
                    </button>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      )}


      {/* Auth Modal */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}

      {/* Admin Panel — tam sayfa overlay */}
      {activePage === 'admin' && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          <AdminPanel onNavigate={handleNavigate} />
        </div>
      )}
    </div>
    </AuthProvider>
  );
}
