import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronDown, ChevronUp, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';

interface UsageArea {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  applications: string[];
}

const USAGE_AREAS: UsageArea[] = [
  {
    id: 'konut',
    num: '01',
    title: 'Konutlar',
    subtitle: 'Yaşam Alanlarınız İçin',
    description: 'Mutfaktan banyoya, pencere denizliklerinden duş teknelerine kadar evinizin her noktasında estetik ve dayanıklı tezgah çözümleri sunuyoruz. Günlük kullanımın yoğunluğuna karşı yıllarca ilk günkü görünümünü koruyan yüzeyler.',
    image: '/usage-areas/konut.jpg',
    applications: [
      'Mutfak tezgahları ve arka paneller',
      'Banyo tezgahları ve lavabo bankoları',
      'Pencere denizlikleri',
      'Duş tekneleri ve küvet kaplamaları',
      'Banyo yer ve duvar kaplamaları',
      'Ada mutfak yüzeyleri',
      'Yemek ve oturma masaları',
    ],
  },
  {
    id: 'saglik',
    num: '02',
    title: 'Sağlık Merkezleri',
    subtitle: 'Hijyen ve Sterilite Önce Gelir',
    description: 'Hastane, klinik ve laboratuvarlarda hijyen en kritik gerekliliktir. Gözeneksiz ve antimikrobiyal yüzeyler bakteri barındırmaz, dezenfektan kimyasallara karşı tam direnç gösterir. Sağlık alanları için TSE ve uluslararası hijyen sertifikalı seçenekler sunuyoruz.',
    image: '/usage-areas/hastane.jpg',
    applications: [
      'Karşılama ve hemşire bankoları',
      'Laboratuvar tezgahları',
      'Hasta odası tezgahları',
      'Hasta odası duş tekneleri',
      'Ameliyathane duvar kaplamaları',
      'Doktor odası tezgahları',
      'Yönlendirme panoları ve çarpma bantları',
    ],
  },
  {
    id: 'avm',
    num: '03',
    title: 'Alışveriş & Eğlence Merkezleri',
    subtitle: 'Yüksek Trafik, Üstün Dayanıklılık',
    description: 'Binlerce kişinin günlük kullandığı AVM ve eğlence merkezlerinde darbe, çizik ve yoğun temizlik kimyasallarına karşı üstün direnç şarttır. Estetik görünümü uzun yıllar boyu koruyan ultra kompakt ve kuvars yüzeyleri bu ortamlar için ideal seçenektir.',
    image: '/usage-areas/avm.jpg',
    applications: [
      'Karşılama ve bilgilendirme bankoları',
      'Genel WC tezgahları',
      'Atrium cephe kaplamaları',
      'Fast food ve gıda tezgahları',
      'Oturma grupları ve masalar',
      'Süs havuzu, çiçeklik ve kolon kaplamaları',
      'Standlar ve teşhir üniteleri',
    ],
  },
  {
    id: 'turizm',
    num: '04',
    title: 'Turistik Tesisler',
    subtitle: 'Otel, Resort & Butik Projeler',
    description: 'Oteller, resortlar ve butik tatil tesislerinde lüks sunum ile uzun ömürlülük bir arada. Tekrar eden mekanik yük ve nem koşullarına karşı dayanıklı, aynı zamanda misafirlerinizi etkileyen şık ve modern yüzey çözümleri.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
    applications: [
      'Lobi ve resepsiyon bankoları',
      'Oda mutfak ve banyo tezgahları',
      'SPA ve wellness merkezi yüzeyleri',
      'Restoran masa ve bankoları',
      'Açık büfe tezgahları',
      'Havuz kenarı ve teras yüzeyleri',
      'Konferans salonu masaları',
    ],
  },
  {
    id: 'havalimanı',
    num: '05',
    title: 'Havalimanları',
    subtitle: 'Kesintisiz Servis Ortamları',
    description: '7/24 kesintisiz hizmet veren havalimanlarında aşınmaya, darbeye ve güçlü temizlik ürünlerine karşı maksimum direnç sunan tezgah çözümleri. Büyük yüzey alanları için renk ve desen sürekliliği sağlayan plaka eşleştirme hizmeti de sunulmaktadır.',
    image: '/usage-areas/havalimanı.jpg',
    applications: [
      'Genel WC tezgahları',
      'Karşılama ve tanıtım bankoları',
      'Check-in ve gişe bankoları',
      'Café ve lounge banko ve masaları',
      'Servis tezgahları',
      'Oturma grupları',
      'Pencere denizlikleri ve duvar kaplamaları',
    ],
  },
  {
    id: 'ofis',
    num: '06',
    title: 'Ofisler & Mağazalar',
    subtitle: 'Kurumsal Kimlik Yüzeyleri',
    description: 'Modern kurumsal ofisler ve prestijli mağazalarda marka kimliğinizi yansıtan, şık, dayanıklı ve kolayca temizlenebilen tezgah ve yüzey çözümleri. Renk özelleştirme ve logo entegrasyon seçenekleri mevcuttur.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
    applications: [
      'Karşılama ve resepsiyon bankoları',
      'Toplantı odası masaları',
      'Kasa ve teşhir bankoları',
      'WC tezgahları',
      'Mutfak ve açık büfe tezgahları',
      'Cephe ve kolon kaplamaları',
      'Pencere söve ve denizlikleri',
    ],
  },
  {
    id: 'spor',
    num: '07',
    title: 'Spor Tesisleri',
    subtitle: 'Nem ve Kimyasallara Tam Direnç',
    description: 'Spor salonları, yüzme havuzları ve fitness merkezlerinde klorlu su, terleme ve güçlü dezenfektanlara karşı tam direnç. Gözeneksiz yapısı sayesinde nem emmeyen, koku barındırmayan ve uzun yıllar yeni görünümünü koruyan yüzeyler.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
    applications: [
      'WC ve soyunma odası tezgahları',
      'Duş tekneleri ve duvar kaplamaları',
      'Bar ve resepsiyon bankoları',
      'Oturma bankları',
      'Havuz kenarı yüzeyleri',
      'Pencere denizlikleri',
    ],
  },
  {
    id: 'egitim',
    num: '08',
    title: 'Eğitim Kurumları',
    subtitle: 'Okul & Üniversite Projeleri',
    description: 'Okullar, üniversiteler ve eğitim merkezlerinde yoğun günlük kullanıma karşı sağlam, çizilmeye dayanıklı ve kolay temizlenebilir yüzeyler. Öğrencilerin ve personelin güvenli kullanımı için onaylı, çevre dostu malzeme seçenekleri.',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80',
    applications: [
      'WC tezgahları',
      'Karşılama ve idare bankoları',
      'Masalar ve oturma üniteleri',
      'Laboratuvar tezgahları',
      'Pencere denizlikleri',
      'Kantin ve yemekhane tezgahları',
    ],
  },
];

interface Props {
  onNavigate: (page: string) => void;
  onQuote: () => void;
}

export default function UsageAreasPage({ onNavigate, onQuote }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-neutral-950 py-16 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #d97706 0%, transparent 60%)' }} />
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Ana Sayfa
        </button>
        <div className="max-w-3xl">
          <span className="font-mono text-xs text-amber-400 uppercase tracking-[0.2em] block mb-3">
            Tezgah & Yüzey Çözümleri
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Uygulama Alanları
          </h1>
          <p className="text-white/60 text-base leading-relaxed max-w-2xl">
            Konuttan hastaneye, havalimanından eğitim kurumuna kadar her ortamda doğru malzeme seçimi hem estetiği hem de uzun ömürlülüğü belirler. Projenizin gereksinimlerine özel çözüm sunuyoruz.
          </p>
        </div>
      </div>

      {/* Areas Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {USAGE_AREAS.map((area, index) => {
            const isExpanded = expandedId === area.id;
            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group border border-stone-200 rounded-2xl overflow-hidden hover:border-amber-300 hover:shadow-md transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                    <span className="font-mono text-xs text-amber-400 tracking-[0.2em] uppercase">{area.num}</span>
                    <h2 className="font-serif text-xl font-bold text-white mt-0.5">{area.title}</h2>
                    <p className="text-white/60 text-xs mt-0.5">{area.subtitle}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <p className="text-sm text-stone-600 leading-relaxed">{area.description}</p>

                  {/* Expandable application list */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : area.id)}
                    className="w-full flex items-center justify-between text-xs font-semibold text-neutral-700 bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-200 rounded-xl px-4 py-2.5 transition-colors"
                  >
                    <span>Uygulama Alanları ({area.applications.length})</span>
                    {isExpanded ? <ChevronUp className="h-4 w-4 text-amber-500" /> : <ChevronDown className="h-4 w-4" />}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden space-y-1.5"
                      >
                        {area.applications.map((app) => (
                          <li key={app} className="flex items-start gap-2 text-xs text-stone-600">
                            <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                            <span>{app}</span>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={onQuote}
                    className="w-full text-center bg-neutral-950 hover:bg-amber-500 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
                  >
                    Bu Alan İçin Teklif Al
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-stone-50 border-t border-stone-100 py-16 px-6 text-center">
        <span className="font-mono text-xs text-amber-600 uppercase tracking-widest block mb-3">Ücretsiz Danışmanlık</span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
          Projenize Özel Çözüm Bulalım
        </h2>
        <p className="text-stone-500 text-sm max-w-md mx-auto mb-8">
          Kullanım alanınızı ve ihtiyaçlarınızı paylaşın; uzman ekibimiz en uygun malzeme ve marka önerisini sunsun.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onQuote}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl px-8 py-4 transition-colors"
          >
            <MessageSquare className="h-5 w-5" /> Teklif Al
          </button>
          <a
            href="tel:+902126502220"
            className="inline-flex items-center gap-2 border border-stone-300 text-neutral-700 hover:bg-stone-100 font-medium rounded-xl px-8 py-4 transition-colors text-sm"
          >
            <Phone className="h-4 w-4" /> +90 (212) 650 22 20
          </a>
        </div>
      </div>
    </div>
  );
}
