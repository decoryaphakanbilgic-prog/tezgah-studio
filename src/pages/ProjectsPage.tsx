import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, MapPin, Building2, MessageSquare, ChevronRight } from 'lucide-react';

interface Project {
  id: string;
  client: string;
  title: string;
  category: 'saglik' | 'konut' | 'metro' | 'ticari';
  location: string;
  description: string;
  image: string;
  featured?: boolean;
  scale?: string;
}

const PROJECTS: Project[] = [
  // ── SAĞLIK ──────────────────────────────────────────────────────────────────
  {
    id: 's1', client: 'Acıbadem Sağlık Grubu', title: 'Acıbadem Atakent Halkalı Hastanesi',
    category: 'saglik', location: 'Halkalı, İstanbul',
    description: 'Hasta odası tezgahları, termoform banyo duvar kaplamaları ve yoğun bakım ünitesi uygulamaları.',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=900&q=80', featured: true,
  },
  {
    id: 's2', client: 'Memorial Sağlık Grubu', title: 'Memorial Okmeydanı Hastanesi',
    category: 'saglik', location: 'Okmeydanı, İstanbul',
    description: 'Hasta masa tezgahları, duş tekneleri ve giriş karşılama bankosu uygulamaları.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 's3', client: 'Acıbadem Sağlık Grubu', title: 'Acıbadem Bakırköy Klinik',
    category: 'saglik', location: 'Bakırköy, İstanbul',
    description: 'Hasta tezgahları, lavabolar ve resepsiyon bankosu akrilik uygulamaları.',
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 's4', client: 'Memorial Sağlık Grubu', title: 'Memorial Wellness — Zorlu Center',
    category: 'saglik', location: 'Zorlu Center, İstanbul',
    description: 'Wellness merkezi akrilik tezgah ve kaplama uygulamaları.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 's5', client: 'Acıbadem Sağlık Grubu', title: 'Acıbadem Zekeriyaköy',
    category: 'saglik', location: 'Zekeriyaköy, İstanbul',
    description: 'Hasta masaları, lavabolu tezgahlar ve resepsiyon unsurları.',
    image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 's6', client: 'Medicine Hospital', title: 'Medicine Hospital Güneşli',
    category: 'saglik', location: 'Güneşli, İstanbul',
    description: 'Tesis genelinde kapsamlı akrilik solid surface uygulamaları.',
    image: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 's7', client: 'Florence Nightingale', title: 'Florence Nightingale Ataşehir',
    category: 'saglik', location: 'Ataşehir, İstanbul',
    description: 'Hasta masaları, duş tekneleri ve giriş bankosu uygulamaları.',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 's8', client: 'Acıbadem Üniversitesi', title: 'Kerem Aydınlar Kampüsü',
    category: 'saglik', location: 'İstanbul',
    description: 'Üniversite kampüsü laboratuvar tezgahları ve ıslak hacim uygulamaları.',
    image: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 's9', client: 'Medipol Acıbadem', title: 'Medipol Acıbadem Hastanesi',
    category: 'saglik', location: 'İstanbul',
    description: 'Hasta odası banyo tezgahları akrilik solid surface uygulamaları.',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 's10', client: 'Ulus İnfinity Clinic', title: 'Ulus İnfinity Regenerative Clinic',
    category: 'saglik', location: 'Ulus, İstanbul',
    description: 'Resepsiyon tezgahları, doktor masaları ve laboratuvar yüzeyleri.',
    image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=900&q=80',
  },

  // ── TOPLU KONUT ─────────────────────────────────────────────────────────────
  {
    id: 'k1', client: 'Tahincioğlu', title: 'Nida Park Kayaşehir',
    category: 'konut', location: 'Kayaşehir, İstanbul',
    description: 'Toplu konut projesi; mutfak ve banyo akrilik tezgah uygulamaları.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80', featured: true,
  },
  {
    id: 'k2', client: 'Artaş', title: 'Vadi İstanbul Park',
    category: 'konut', location: 'Kâğıthane, İstanbul',
    description: 'Çok katlı rezidans; mutfak ve banyo tezgah kaplamaları.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'k3', client: 'Artaş', title: 'Avrupa Konutları Atakent 4',
    category: 'konut', location: 'Atakent, İstanbul',
    description: 'Avrupa Konutları serisinde mutfak ve banyo akrilik tezgah uygulamaları.',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'k4', client: 'INNSA Tower', title: 'Zeytindalı Konakları Zekeriyaköy',
    category: 'konut', location: 'Zekeriyaköy, İstanbul',
    description: 'Gizli sifon sistemli akrilik banyo lavabolu tezgah ve çamaşırlık ünitesi.',
    image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'k5', client: 'Nuhoğlu', title: 'Yenitepe Kadıköy',
    category: 'konut', location: 'Kadıköy, İstanbul',
    description: 'Mutfak ve banyo akrilik solid surface tezgah uygulamaları.',
    image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'k6', client: 'İTÜ', title: 'İTÜ Gölet Yurtları',
    category: 'konut', location: 'Maslak, İstanbul',
    description: 'Üniversite öğrenci yurdu ortak mutfak tezgah uygulamaları.',
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'k7', client: 'Koç Üniversitesi', title: 'Koç Üniversitesi Yurtları',
    category: 'konut', location: 'Sarıyer, İstanbul',
    description: 'Toplu konut projesinde mutfak akrilik solid surface tezgah uygulamaları.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'k8', client: 'Mesa', title: 'Mesa Cadde Projesi',
    category: 'konut', location: 'İstanbul',
    description: 'Rezidans dairelerinde mutfak ve banyo akrilik tezgah kaplama uygulamaları.',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=900&q=80',
  },

  // ── METRO ────────────────────────────────────────────────────────────────────
  {
    id: 'm1', client: 'İstanbul Büyükşehir Belediyesi', title: 'M7 Mecidiyeköy-Mahmutbey Hattı — 15 İstasyon',
    category: 'metro', location: 'İstanbul Metro Ağı',
    description: 'İstasyona özel tasarımlı akrilik duvar kaplamaları; 20.000 m²\'yi aşan uygulama alanı.',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=900&q=80',
    featured: true, scale: '20.000+ m²',
  },
  {
    id: 'm2', client: 'İstanbul Büyükşehir Belediyesi', title: 'M7 Yıldız & Fulya İstasyonları',
    category: 'metro', location: 'Beşiktaş, İstanbul',
    description: 'M7 hattı Yıldız ve Fulya istasyonlarında akrilik duvar kaplama uygulamaları.',
    image: 'https://images.unsplash.com/photo-1555207655-47bf26a35d1b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'm3', client: 'İstanbul Büyükşehir Belediyesi', title: 'M9 Masko & Bahariye İstasyonları',
    category: 'metro', location: 'İstanbul',
    description: 'M9 metro hattı iki istasyonunda özel tasarımlı akrilik kaplama uygulamaları.',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'm4', client: 'İstanbul Havalimanı', title: 'Sabiha Gökçen Havalimanı Metro İstasyonu',
    category: 'metro', location: 'Pendik, İstanbul',
    description: 'Havalimanı metro istasyonu akrilik duvar panel prototip ve numune uygulamaları.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80',
  },

  // ── TİCARİ & ÖZEL ────────────────────────────────────────────────────────────
  {
    id: 't1', client: 'Türk Hava Yolları', title: 'THY Satış Gişe Tezgahları',
    category: 'ticari', location: 'Dünya Geneli',
    description: 'Türk Hava Yolları\'nın küresel satış ofislerinde kullanılan gişe ve satış tezgahı uygulamaları.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80',
    featured: true, scale: 'Dünya Geneli',
  },
  {
    id: 't2', client: 'İstanbul Havalimanı', title: 'İstanbul Havalimanı Bakım & Onarım',
    category: 'ticari', location: 'Arnavutköy, İstanbul',
    description: 'Havalimanı içi akrilik ürün bakım, onarım ve yenileme uygulamaları.',
    image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 't3', client: 'Kanyon AVM', title: 'Kanyon Alışveriş Merkezi',
    category: 'ticari', location: 'Levent, İstanbul',
    description: 'Termoform silindirik ve kare kolon kaplamaları ile mağaza cephe duvar uygulamaları.',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 't4', client: 'İstanbul Modern', title: 'İstanbul Modern Antrepo Müzesi',
    category: 'ticari', location: 'Beşiktaş, İstanbul',
    description: 'Restore edilmiş antrepo yapısında termoform ıslak hacim tezgahları ve duvar kaplamaları.',
    image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    id: 't5', client: 'Al Hallab 1881', title: 'Al Hallab Restoran — Fişekhane',
    category: 'ticari', location: 'Eminönü, İstanbul',
    description: 'Resepsiyon bankosu, duvar kaplamaları ve mutfak tezgah bölümleri akrilik uygulaması.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 't6', client: 'Garanti BBVA', title: 'Garanti BBVA Şubeleri',
    category: 'ticari', location: 'Türkiye Geneli',
    description: 'Numaratör kiosk akrilik kaplamaları ve şube tezgah uygulamaları.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 't7', client: 'Ziraat Bankası', title: 'Ziraat Bankası Şubeleri',
    category: 'ticari', location: 'Türkiye Geneli',
    description: 'Banka şubesi tezgah ve resepsiyon bankosu akrilik kaplama uygulamaları.',
    image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 't8', client: 'Malpas Hotel', title: 'Malpas Hotel Girne',
    category: 'ticari', location: 'Girne, Kuzey Kıbrıs',
    description: 'Yemek alanları, tezgahlar ve büfe üniteleri dahil otel geneli akrilik uygulamaları.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 't9', client: 'Havelsan', title: 'Havelsan Genel Merkezi',
    category: 'ticari', location: 'Ankara',
    description: 'VIP karşılama tezgahları ve genel merkez mutfak tezgah uygulamaları.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 't10', client: 'Zorlu Center', title: 'Zorlu Center Sinema',
    category: 'ticari', location: 'Zorlu Center, İstanbul',
    description: 'Sinema girişi bankosu ve çeşitli kaplama uygulamaları.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 't11', client: 'Sabiha Gökçen Havalimanı', title: 'SGH "Yöresel Tatlar" Dükkanı',
    category: 'ticari', location: 'Pendik, İstanbul',
    description: 'Satış tezgahı, raf sistemi, servis bankosu, bar tezgahı ve kasiyer alanı uygulamaları.',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 't12', client: 'Vakıfbank', title: 'Vakıfbank Şubeleri',
    category: 'ticari', location: 'Türkiye Geneli',
    description: 'Şube tezgah ve resepsiyon bankosu akrilik solid surface kaplama uygulamaları.',
    image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=900&q=80',
  },
];

const CATEGORIES = [
  { key: 'all',    label: 'Tümü',              count: PROJECTS.length },
  { key: 'saglik', label: 'Sağlık',            count: PROJECTS.filter(p => p.category === 'saglik').length },
  { key: 'konut',  label: 'Toplu Konut',       count: PROJECTS.filter(p => p.category === 'konut').length },
  { key: 'metro',  label: 'Metro & Altyapı',   count: PROJECTS.filter(p => p.category === 'metro').length },
  { key: 'ticari', label: 'Ticari & Özel',     count: PROJECTS.filter(p => p.category === 'ticari').length },
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  saglik: 'bg-blue-50 text-blue-700 border-blue-200',
  konut:  'bg-green-50 text-green-700 border-green-200',
  metro:  'bg-purple-50 text-purple-700 border-purple-200',
  ticari: 'bg-amber-50 text-amber-700 border-amber-200',
};

const CATEGORY_LABELS: Record<string, string> = {
  saglik: 'Sağlık',
  konut:  'Toplu Konut',
  metro:  'Metro & Altyapı',
  ticari: 'Ticari & Özel',
};

interface Props {
  onNavigate: (page: string) => void;
  onQuote: () => void;
}

export default function ProjectsPage({ onNavigate, onQuote }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  const featured = PROJECTS.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-neutral-950 py-14 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 60%, #d97706 0%, transparent 55%)' }} />
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Ana Sayfa
        </button>
        <div className="max-w-4xl">
          <span className="font-mono text-xs text-amber-400 uppercase tracking-[0.2em] block mb-3">
            Referanslarımız
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Güven Veren Projeler,<br />Kanıtlanmış Kalite
          </h1>
          <p className="text-white/55 text-base leading-relaxed max-w-2xl">
            Hastanelerden metro istasyonlarına, lüks rezidanslardan uluslararası havalimanlarına kadar
            Türkiye'nin dört bir yanında tamamladığımız referans projelerimiz.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
          {[
            { num: '80+', label: 'Tamamlanan Proje' },
            { num: '20K+', label: 'm² Uygulama' },
            { num: '4',   label: 'Sektör' },
            { num: '15+', label: 'Yıllık Deneyim' },
          ].map(s => (
            <div key={s.label} className="border border-white/10 rounded-xl px-4 py-3">
              <p className="font-serif text-2xl font-bold text-amber-400">{s.num}</p>
              <p className="text-white/45 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-14">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-amber-600 uppercase tracking-widest">Öne Çıkan</span>
          <div className="flex-1 h-px bg-stone-100" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              style={{ height: 260 }}
            >
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/30 to-transparent" />
              {proj.scale && (
                <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {proj.scale}
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border mb-2 ${CATEGORY_COLORS[proj.category]}`}>
                  {CATEGORY_LABELS[proj.category]}
                </span>
                <h3 className="font-serif text-base font-bold text-white leading-snug mb-0.5">{proj.title}</h3>
                <p className="text-white/55 text-xs flex items-center gap-1">
                  <MapPin className="h-3 w-3" />{proj.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* All Projects */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-amber-600 uppercase tracking-widest">Tüm Referanslar</span>
          <div className="flex-1 h-px bg-stone-100" />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
                activeCategory === cat.key
                  ? 'bg-neutral-950 text-white border-neutral-950'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
              }`}
            >
              {cat.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                activeCategory === cat.key ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((proj, i) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="group bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-amber-300 hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent" />
                  <span className={`absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[proj.category]}`}>
                    {CATEGORY_LABELS[proj.category]}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mb-1">
                      <Building2 className="h-3 w-3 shrink-0" />
                      <span className="font-medium">{proj.client}</span>
                    </div>
                    <h3 className="font-semibold text-neutral-900 text-sm leading-snug">{proj.title}</h3>
                  </div>

                  <p className="text-xs text-stone-500 leading-relaxed flex-1">{proj.description}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                    <span className="text-[11px] text-stone-400 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />{proj.location}
                    </span>
                    {proj.scale && (
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                        {proj.scale}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className="bg-neutral-950 py-16 px-6 text-center">
        <span className="font-mono text-xs text-amber-400 uppercase tracking-widest block mb-3">Projeniz İçin</span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
          Referanslarımıza Bir Yenisini Ekleyelim
        </h2>
        <p className="text-white/50 text-sm max-w-md mx-auto mb-8">
          Kurumsal ya da bireysel projeniz için ücretsiz keşif ve teklif alın.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onQuote}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl px-8 py-4 transition-colors"
          >
            <MessageSquare className="h-5 w-5" /> Teklif Al
          </button>
          <button
            onClick={() => onNavigate('usage-areas')}
            className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 rounded-xl px-8 py-4 transition-colors text-sm"
          >
            Uygulama Alanları <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
