import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, ArrowRight, Check, Sparkles, UploadCloud, 
  MapPin, Phone, Mail, FileText, CheckCircle, ShieldAlert,
  HardHat, ClipboardCheck, Ruler, Calendar
} from 'lucide-react';
import { BRANDS, MATERIAL_CATEGORIES, COUNTERTOP_COLORS } from '../data';

interface QuoteWizardProps {
  initialCategory?: 'Perakende' | 'Butik Proje' | 'Toplu Proje' | null;
  initialMaterial?: string | null;
  initialBrand?: string | null;
  onComplete: (data: any) => void;
  onCancel: () => void;
}

export default function QuoteWizard({
  initialCategory = null,
  initialMaterial = null,
  initialBrand = null,
  onComplete,
  onCancel
}: QuoteWizardProps) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<'Perakende' | 'Butik Proje' | 'Toplu Proje' | null>(initialCategory);
  
  // Selections
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(initialMaterial);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(initialBrand);
  const [selectedColorGroup, setSelectedColorGroup] = useState<string | null>(null);
  
  // Custom form inputs
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'İstanbul',
    district: '',
    approxMeasure: '',
    applicationArea: 'Mutfak Tezgahı',
    installRequested: true,
    discoveryRequested: true,
    notes: '',
    attachment: null as File | null,
    attachmentName: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // Sync category if initialCategory changes
  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
      setStep(2); // Jump to material selection directly if starting with pre-chosen category
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialMaterial) {
      setSelectedMaterial(initialMaterial);
      setStep(3); // Go directly to brand choosing
    }
  }, [initialMaterial]);

  useEffect(() => {
    if (initialBrand) {
      setSelectedBrand(initialBrand);
      setStep(4); // Go directly to color style selection
    }
  }, [initialBrand]);

  const handleCategorySelect = (cat: 'Perakende' | 'Butik Proje' | 'Toplu Proje') => {
    setCategory(cat);
    setStep(2);
  };

  const validateStep5 = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Ad soyad alanı zorunludur.';
    if (!formData.phone.trim()) errs.phone = 'Telefon numarası zorunludur.';
    if (!formData.email.trim()) errs.email = 'E-posta adresi zorunludur.';
    if (!formData.district.trim()) errs.district = 'İlçe bilgisi zorunludur.';
    if (!formData.approxMeasure.trim()) errs.approxMeasure = 'Yaklaşık ölçü veya metraj belirtiniz.';
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 2 && !selectedMaterial) {
      alert('Lütfen devam etmek için bir tezgah malzemesi seçiniz.');
      return;
    }
    if (step === 3 && !selectedBrand) {
      alert('Lütfen devam etmek için bir marka seçiniz veya "Farketmez" seçeneğini belirleyiniz.');
      return;
    }
    if (step === 4) {
      // Color group optional, can proceed
      setStep(5);
      return;
    }
    if (step === 5) {
      if (validateStep5()) {
        setSubmitted(true);
        onComplete({
          category,
          material: selectedMaterial,
          brand: selectedBrand,
          colorGroup: selectedColorGroup,
          ...formData
        });
      }
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      onCancel();
    } else {
      setStep(step - 1);
    }
  };

  // Categories helper
  const categoryInfo = {
    Perakende: {
      title: "Perakende Bireysel",
      desc: "Ev, mutfak, banyo, ada mutfak, çamaşır odası vb. kendi mülkünüz için bireysel yenileme işleri."
    },
    'Butik Proje': {
      title: "Butik Proje",
      desc: "Villa, cafe/restoran, butik oteller, ofis tasarımları ve size özel mimari iç mekan uygulamaları."
    },
    'Toplu Proje': {
      title: "Toplu Toplu Proje",
      desc: "Otel projeleri, çok daireli rezidanslar, konut projeleri, müteahhitlik ve kurumsal iş birlikleri."
    }
  };

  const materialTypes = [
    { name: 'Kuvars (Quartz)', detail: 'Belenco, Çimstone, Silestone dayanıklılığı, lekesizlik.' },
    { name: 'Porselen & Sintre Taş', detail: 'Dekton, Neolith, Laminam yüksek ısı ve UV mukavemeti.' },
    { name: 'Akrilik / Solid Surface', detail: 'DuPont Corian, HI-MACS dikişsiz kavisli şıklık.' },
    { name: 'Mermer', detail: 'Klasik lüks, yaşayan damarlar ve prestij.' },
    { name: 'Kuvarsit', detail: 'Doğal taşın en serti, mermer zarafetiyle granit gücü.' },
    { name: 'Granit', detail: 'Doğal volkanik magma gücü, aşınmaz yapılar.' },
    { name: 'Dekton / Sintered Stone', detail: 'Üst düzey porselen levhalar.' },
    { name: 'Seramik Yüzeyler', detail: 'Minimalist geniş ölçekli plakalar.' },
    { name: 'Kompakt Laminat', detail: 'Hafif, su geçirmez panel kompakt kurgular.' },
    { name: 'Farketmez / Uzman Tavsiyesi', detail: 'Mimarımızın projenize göre önermesini isteyin.' }
  ];

  const colorGroups = [
    { name: "Beyaz Tonlar", desc: "Zarafetin simgesi, asil ve aydınlık damarlı beyazlar", code: "bg-white border-stone-300" },
    { name: "Gri Tonlar", desc: "Minimalist, beton dokulu, modern endüstriyel griler", code: "bg-stone-400 border-stone-500" },
    { name: "Siyah Tonlar", desc: "Dramatik mermer damarları içeren asil koyu siyahlar", code: "bg-neutral-900 border-neutral-950" },
    { name: "Bej / Sıcak Taş", desc: "Krem rengi, traverten geçişleri, sıcak ve samimi tonlar", code: "bg-amber-100 border-amber-200" },
    { name: "Karışık & Benzersiz", desc: "Doğal taşın rengarenk kristalli karma dokuları", code: "bg-gradient-to-r from-stone-300 via-amber-200 to-neutral-500 border-stone-400" },
  ];

  // Helper file upload trigger
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        attachment: file,
        attachmentName: file.name
      }));
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl bg-white border border-stone-200 rounded-3xl p-8 sm:p-12 text-center shadow-xl my-12" id="quote-success-panel">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-6">
          <CheckCircle className="h-10 w-10 animate-bounce" />
        </div>
        <h3 className="font-serif text-3xl font-bold text-neutral-900 mb-4 tracking-tight">Talebiniz Alınmıştır</h3>
        <p className="text-sm text-neutral-600 leading-relaxed max-w-lg mx-auto mb-8">
          Sayın <strong className="text-neutral-900">{formData.fullName}</strong>, <strong className="text-gold-600">{category ? categoryInfo[category]?.title : ''}</strong> projeniz için oluşturduğunuz fiyat talebi uzman teknik ekibimize ulaştı. Tasarımcılarımız projenizi inceleyip 24 saat içinde en doğru marka kurgusu ve fiyat teklifiyle tarafınıza dönüş yapacaktır.
        </p>

        {/* Highlighted steps on how we process */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-b border-stone-100 py-6 mb-8 text-left text-xs text-stone-600">
          <div className="space-y-1">
            <div className="flex items-center space-x-1.5 text-gold-600 font-medium">
              <ClipboardCheck className="h-4 w-4" />
              <span>1. Teknik Analiz</span>
            </div>
            <p className="font-light text-[11px]">Ölçüler ve seçilen malzeme bazında en verimli plaka optimizasyonu yapılır.</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-1.5 text-gold-600 font-medium">
              <Ruler className="h-4 w-4" />
              <span>2. Keşif & Detay</span>
            </div>
            <p className="font-light text-[11px]">Gerekmesi halinde yerinde ücretsiz lazer ölçümü ile şablon çıkartılır.</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-1.5 text-gold-600 font-medium">
              <HardHat className="h-4 w-4" />
              <span>3. Kusursuz Montaj</span>
            </div>
            <p className="font-light text-[11px]">Usta zanaatkarlarımız tarafından kesimi yapılan tezgahınız titizlikle monte edilir.</p>
          </div>
        </div>

        <button
          onClick={onCancel}
          className="rounded-full bg-neutral-950 px-8 py-3 text-xs font-semibold tracking-widest text-white uppercase transition-colors hover:bg-gold-600"
          id="success-return-btn"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl bg-stone-warm border border-stone-200/65 rounded-3xl overflow-hidden shadow-xl my-8" id="quote-wizard-container">
      {/* Header of Wizard */}
      <div className="bg-neutral-950 px-8 py-6 text-white flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-neutral-400">Teklif İsteme Sihirbazı</span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight mt-1 flex items-center">
            Adım Adım Fiyat Taslağı
            <Sparkles className="h-4 w-4 text-gold-400 ml-2 animate-pulse" />
          </h2>
        </div>
        <button
          onClick={onCancel}
          className="text-xs bg-white/10 hover:bg-white/20 text-neutral-300 rounded-full px-4 py-1.5 transition-colors focus:outline-none"
          id="wizard-cancel-btn"
        >
          Kapat
        </button>
      </div>

      {/* Real-time Step Progress Bar */}
      <div className="border-b border-stone-200 bg-white/70 px-8 py-4">
        <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-stone-500 uppercase">
          <span className={step >= 1 ? "text-gold-700 font-bold" : ""}>1. Proje Türü</span>
          <ArrowRight className="h-3 w-3 text-stone-300" />
          <span className={step >= 2 ? "text-gold-700 font-bold" : ""}>2. Malzeme</span>
          <ArrowRight className="h-3 w-3 text-stone-300" />
          <span className={step >= 3 ? "text-gold-700 font-bold" : ""}>3. Marka Tercihi</span>
          <ArrowRight className="h-3 w-3 text-stone-300" />
          <span className={step >= 4 ? "text-gold-700 font-bold" : ""}>4. Renk Serisi</span>
          <ArrowRight className="h-3 w-3 text-stone-300" />
          <span className={step >= 5 ? "text-gold-700 font-bold" : ""}>5. Form & Gönderım</span>
        </div>
        <div className="w-full bg-stone-100 h-1 rounded-full mt-3 overflow-hidden">
          <div 
            className="bg-gold-500 h-full transition-all duration-300" 
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Core Wizard Body */}
      <div className="p-6 sm:p-10 min-h-[420px] flex flex-col justify-between bg-white/40">
        
        {/* STEP 1: Project category selector */}
        {step === 1 && (
          <div className="space-y-6" id="wizard-step-1">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h3 className="font-serif text-2xl font-bold text-neutral-900">Projenizin İmajını Belirleyin</h3>
              <p className="text-xs text-neutral-500 font-light">Size en uygun zanaatkarlığı, plaka ölçü opsiyonlarını ve fiyatlandırma algoritmalarını hazırlayabilmemiz için proje alanınızı seçin.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
              <button
                onClick={() => handleCategorySelect('Perakende')}
                className={`group border rounded-2xl p-6 text-left transition-luxury hover:shadow-lg bg-stone-warm/50 flex flex-col justify-between h-56 relative ${
                  category === 'Perakende' ? 'border-gold-500 ring-1 ring-gold-500 bg-gold-50/20' : 'border-neutral-200 hover:border-gold-300'
                }`}
                id="btn-perakende-select"
              >
                <div>
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gold-100 text-gold-700 font-serif font-black text-lg mb-4">P</div>
                  <h4 className="font-semibold text-neutral-950 text-base">Perakende Mutfak</h4>
                  <p className="text-xs text-neutral-500 mt-2 font-light leading-relaxed">
                    Ev, yazlık, villa mutfaklarında tezgah yenileme, ada mutfak modülleri ve bireysel banyo bankoları.
                  </p>
                </div>
                <div className="flex items-center text-[10px] font-mono tracking-widest text-gold-600 uppercase group-hover:translate-x-1.5 transition-transform mt-3">
                  Seç ve Devam Et <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </div>
              </button>

              <button
                onClick={() => handleCategorySelect('Butik Proje')}
                className={`group border rounded-2xl p-6 text-left transition-luxury hover:shadow-lg bg-stone-warm/50 flex flex-col justify-between h-56 relative ${
                  category === 'Butik Proje' ? 'border-gold-500 ring-1 ring-gold-500 bg-gold-50/20' : 'border-neutral-200 hover:border-gold-300'
                }`}
                id="btn-butik-select"
              >
                <div>
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gold-100 text-gold-700 font-serif font-black text-lg mb-4">B</div>
                  <h4 className="font-semibold text-neutral-950 text-base">Butik Tasarım Proje</h4>
                  <p className="text-xs text-neutral-500 mt-2 font-light leading-relaxed">
                    Özel restoran tezgahları, mağaza karşılama bankoları, cafe tasarımları ve mimari iç mekan çözümleri.
                  </p>
                </div>
                <div className="flex items-center text-[10px] font-mono tracking-widest text-gold-600 uppercase group-hover:translate-x-1.5 transition-transform mt-3">
                  Seç ve Devam Et <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </div>
              </button>

              <button
                onClick={() => handleCategorySelect('Toplu Proje')}
                className={`group border rounded-2xl p-6 text-left transition-luxury hover:shadow-lg bg-stone-warm/50 flex flex-col justify-between h-56 relative ${
                  category === 'Toplu Proje' ? 'border-gold-500 ring-1 ring-gold-500 bg-gold-50/20' : 'border-neutral-200 hover:border-gold-300'
                }`}
                id="btn-toplu-select"
              >
                <div>
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gold-100 text-gold-700 font-serif font-black text-lg mb-4">T</div>
                  <h4 className="font-semibold text-neutral-950 text-base">Toplu Taahhüt Projesi</h4>
                  <p className="text-xs text-neutral-500 mt-2 font-light leading-relaxed">
                    Müteahhitlik projeleri, çok daireli konutlar, oteller, rezidanslar ve yüksek adetli mutfak / banyo siparişleri.
                  </p>
                </div>
                <div className="flex items-center text-[10px] font-mono tracking-widest text-gold-600 uppercase group-hover:translate-x-1.5 transition-transform mt-3">
                  Seç ve Devam Et <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Countertop material selector */}
        {step === 2 && (
          <div className="space-y-6" id="wizard-step-2">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h3 className="font-serif text-2xl font-bold text-neutral-900">Arzu Ettiğiniz Materyal Nedir?</h3>
              <p className="text-xs text-neutral-500 font-light">Fiziksel davranışları, kalınlığı, dayanıklılığı ve bütçe baremi en çok değişen parametre malzemedir.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
              {materialTypes.map((mat) => (
                <button
                  key={mat.name}
                  onClick={() => {
                    setSelectedMaterial(mat.name);
                    // Autofill some matches back to state
                    if (formData.materialPreference !== mat.name) {
                      setFormData(prev => ({ ...prev, materialPreference: mat.name }));
                    }
                  }}
                  className={`border rounded-xl p-4 text-left transition-all duration-200 flex justify-between items-center bg-white ${
                    selectedMaterial === mat.name ? 'border-gold-500 ring-1 ring-gold-500 bg-gold-50/10' : 'border-stone-200 hover:border-stone-400'
                  }`}
                  id={`mat-btn-${mat.name.replace(/\//g, '')}`}
                >
                  <div className="pr-3">
                    <h4 className="text-xs font-semibold text-neutral-900 tracking-wide uppercase">{mat.name}</h4>
                    <p className="text-[11px] text-neutral-500 mt-1 font-light leading-snug">{mat.detail}</p>
                  </div>
                  <div className={`h-4 w-4 shrink-0 rounded-full border flex items-center justify-center ${selectedMaterial === mat.name ? 'border-gold-500 bg-gold-500 text-white' : 'border-stone-300'}`}>
                    {selectedMaterial === mat.name && <Check className="h-2.5 w-2.5" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Brand selector */}
        {step === 3 && (
          <div className="space-y-6" id="wizard-step-3">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h3 className="font-serif text-2xl font-bold text-neutral-900">Marka Eğiliminiz Var Mı?</h3>
              <p className="text-xs text-neutral-500 font-light">Fiyat ve renk kartelaları markadan markaya değişmektedir. Tercihiniz yoksa projenize en uygun olanı biz öneririz.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {BRANDS.map((br) => (
                <button
                  key={br.id}
                  onClick={() => {
                    setSelectedBrand(br.name);
                    setFormData(prev => ({ ...prev, brandPreference: br.name }));
                  }}
                  className={`border rounded-xl p-4 text-center transition-all bg-stone-warm flex flex-col justify-center items-center gap-1.5 ${
                    selectedBrand === br.name ? 'border-gold-500 ring-1 ring-gold-500 bg-gold-50/20' : 'border-neutral-200 hover:border-gold-400'
                  }`}
                  id={`brand-btn-${br.id}`}
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-neutral-950 text-white font-serif font-black text-xs">
                    {br.logo}
                  </div>
                  <span className="text-xs font-medium text-neutral-900">{br.name}</span>
                  <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">{br.origin}</span>
                </button>
              ))}
              <button
                onClick={() => {
                  setSelectedBrand("Farketmez / Bütçeme Özel Önerilsin");
                  setFormData(prev => ({ ...prev, brandPreference: "Farketmez / Bütçeme Özel Önerilsin" }));
                }}
                className={`border rounded-xl p-4 text-center transition-all bg-stone-warm flex flex-col justify-center items-center gap-1.5 col-span-2 sm:col-span-1 border-dashed ${
                  selectedBrand === "Farketmez / Bütçeme Özel Önerilsin" ? 'border-gold-500 ring-1 ring-gold-500 bg-gold-50/20' : 'border-neutral-300 hover:border-neutral-500'
                }`}
                id="brand-btn-any"
              >
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 font-bold text-xs border border-dashed border-neutral-400">
                  ?
                </div>
                <span className="text-xs font-medium text-neutral-900">Farketmez</span>
                <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">Öneri Al</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Color style selector */}
        {step === 4 && (
          <div className="space-y-6" id="wizard-step-4">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h3 className="font-serif text-2xl font-bold text-neutral-900">Arka Plan Renk & Doku Eğilimi</h3>
              <p className="text-xs text-neutral-500 font-light">Hayalinizdeki mekanın genel renk atmosferini belirtebilirsiniz.</p>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
              {colorGroups.map((group) => (
                <button
                  key={group.name}
                  onClick={() => {
                    setSelectedColorGroup(group.name);
                    setFormData(prev => ({ ...prev, colorPreference: group.name }));
                  }}
                  className={`w-full border rounded-xl p-4 text-left transition-all flex items-center space-x-4 bg-white ${
                    selectedColorGroup === group.name ? 'border-gold-500 ring-1 ring-gold-500 bg-gold-50/10' : 'border-stone-200 hover:border-stone-300'
                  }`}
                  id={`color-grp-${group.name.replace(/\s/g, '')}`}
                >
                  <div className={`h-8 w-8 rounded-lg shrink-0 border shadow-inner ${group.code}`} />
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">{group.name}</h4>
                    <p className="text-[11px] text-neutral-500 mt-0.5 font-light">{group.desc}</p>
                  </div>
                  <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center ${selectedColorGroup === group.name ? 'border-gold-500 bg-gold-500 text-white' : 'border-stone-300'}`}>
                    {selectedColorGroup === group.name && <Check className="h-3 w-3" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: Contact details, installation & submission */}
        {step === 5 && (
          <div className="space-y-5" id="wizard-step-5">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <h3 className="font-serif text-2xl font-bold text-neutral-900">Proje Detayları ve İletişim</h3>
              <p className="text-xs text-neutral-500 font-light">En doğru plaka verimliliğini hesaplayabilmemiz için aşağıdaki detayları girin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[320px] overflow-y-auto pr-2 no-scrollbar p-1">
              {/* Left col */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">Adınız Soyadınız *</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Örn: Ahmet Yılmaz"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className={`w-full text-xs border bg-stone-50 rounded-lg px-3 py-2.5 outline-none transition-colors focus:bg-white focus:border-gold-500 ${errors.fullName ? 'border-red-400' : 'border-stone-300'}`}
                      id="input-fullname"
                    />
                    {errors.fullName && <p className="text-[10px] text-red-500 mt-0.5">{errors.fullName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">Telefon No *</label>
                    <input
                      type="tel"
                      placeholder="0532..."
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className={`w-full text-xs border bg-stone-50 rounded-lg px-3 py-2.5 outline-none transition-colors focus:bg-white focus:border-gold-500 ${errors.phone ? 'border-red-400' : 'border-stone-300'}`}
                      id="input-phone"
                    />
                    {errors.phone && <p className="text-[10px] text-red-500 mt-0.5">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">E-posta Adresi *</label>
                    <input
                      type="email"
                      placeholder="ahmet@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full text-xs border bg-stone-50 rounded-lg px-3 py-2.5 outline-none transition-colors focus:bg-white focus:border-gold-500 ${errors.email ? 'border-red-400' : 'border-stone-300'}`}
                      id="input-email"
                    />
                    {errors.email && <p className="text-[10px] text-red-500 mt-0.5">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">Şehir *</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full text-xs border border-stone-300 bg-stone-50 rounded-lg px-3 py-2.5 outline-none focus:bg-white focus:border-gold-500"
                      id="select-city"
                    >
                      <option value="İstanbul">İstanbul</option>
                      <option value="Ankara">Ankara</option>
                      <option value="İzmir">İzmir</option>
                      <option value="Bursa">Bursa</option>
                      <option value="Antalya">Antalya</option>
                      <option value="Muğla">Muğla</option>
                      <option value="Diğer (Global / Yurtdışı)">Yurtdışı / Diğer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">İlçe *</label>
                    <input
                      type="text"
                      placeholder="Örn: Beşiktaş"
                      value={formData.district}
                      onChange={(e) => setFormData({...formData, district: e.target.value})}
                      className={`w-full text-xs border bg-stone-50 rounded-lg px-3 py-2.5 outline-none transition-colors focus:bg-white focus:border-gold-500 ${errors.district ? 'border-red-400' : 'border-stone-300'}`}
                      id="input-district"
                    />
                    {errors.district && <p className="text-[10px] text-red-500 mt-0.5">{errors.district}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">Uygulama Alanı</label>
                  <select
                    value={formData.applicationArea}
                    onChange={(e) => setFormData({...formData, applicationArea: e.target.value})}
                    className="w-full text-xs border border-stone-300 bg-stone-50 rounded-lg px-3 py-2.5 outline-none focus:bg-white focus:border-gold-500"
                    id="select-application-area"
                  >
                    <option value="Mutfak Tezgahı">Mutfak Tezgahı</option>
                    <option value="Banyo Bankosu">Banyo Bankosu & Duvar</option>
                    <option value="Dev Ada Mutfak Bloğu">Yekpare Ada Mutfak Bloğu</option>
                    <option value="Açık Alan Barbekü / Teras">Açık Alan Teras / Barbekü (Dış Mekan)</option>
                    <option value="Restoran / Cafe Bankoları">Resepsiyon & Bar Bankosu (Ticari)</option>
                    <option value="Dış Cephe & Zemin">Dış Cephe ve Zemin Kaplama</option>
                  </select>
                </div>
              </div>

              {/* Right col */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">Yaklaşık Metraj / Ölçü *</label>
                  <input
                    type="text"
                    placeholder="Örn: 3.5 Metretül veya L mutfak (60x320 cm + 60x150 cm)"
                    value={formData.approxMeasure}
                    onChange={(e) => setFormData({...formData, approxMeasure: e.target.value})}
                    className={`w-full text-xs border bg-stone-50 rounded-lg px-3 py-2.5 outline-none transition-colors focus:bg-white focus:border-gold-500 ${errors.approxMeasure ? 'border-red-400' : 'border-stone-300'}`}
                    id="input-measure"
                  />
                  {errors.approxMeasure && <p className="text-[10px] text-red-500 mt-0.5">{errors.approxMeasure}</p>}
                  <span className="text-[9px] text-stone-500 font-light block mt-1">Önemli: Net ölçü olmasa da yaklaşık tahmininiz plaka optimizasyonunu hesaplamamıza yardım eder.</span>
                </div>

                {/* Additional services Checkboxes */}
                <div className="space-y-1.5 pt-2">
                  <span className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider">Ek Hizmet İstekleri</span>
                  
                  <label className="flex items-center space-x-2.5 cursor-pointer py-1 text-xs select-none">
                    <input
                      type="checkbox"
                      checked={formData.installRequested}
                      onChange={(e) => setFormData({...formData, installRequested: e.target.checked})}
                      className="rounded text-gold-600 focus:ring-gold-500 h-4 w-4 border-stone-300 bg-stone-50"
                      id="check-install"
                    />
                    <span className="text-neutral-750 font-light">Ölçüme Göre Nakliye + Montaj Dahil Fiyat Almak İstiyorum</span>
                  </label>

                  <label className="flex items-center space-x-2.5 cursor-pointer py-1 text-xs select-none">
                    <input
                      type="checkbox"
                      checked={formData.discoveryRequested}
                      onChange={(e) => setFormData({...formData, discoveryRequested: e.target.checked})}
                      className="rounded text-gold-600 focus:ring-gold-500 h-4 w-4 border-stone-300 bg-stone-50"
                      id="check-discovery"
                    />
                    <span className="text-neutral-750 font-light">Yerler Hazır Olduğunda Ücretsiz Lazer Ölçüm - Keşif İstiyorum</span>
                  </label>
                </div>

                {/* File Upload Simulation */}
                <div>
                  <span className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">Proje Çizimi / El Çizimi / Karalama PDF</span>
                  <div className="relative border border-dashed border-stone-300 bg-stone-50/50 rounded-lg p-3 text-center hover:border-gold-400 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="input-file-upload"
                    />
                    <UploadCloud className="h-5 w-5 text-stone-400 mx-auto mb-1" />
                    <span className="text-[10px] text-stone-600 font-light block">
                      {formData.attachmentName ? formData.attachmentName : "Çizim sürükleyin veya göz atın (PDF, JPG, PNG)"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Full width element */}
              <div className="md:col-span-2 pt-1">
                <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">Eklemek İstediğiniz Notlar veya Detaylar</label>
                <textarea
                  placeholder="Lavabo tipi (alttan yapıştırma / tezgahüstü), evye markası, süpürgelik yüksekliği veya özel kenar pahı isteklerinizi buraya yazabilirsiniz..."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full text-xs border border-stone-300 bg-stone-50 rounded-lg px-3 py-2.5 outline-none focus:bg-white focus:border-gold-500 h-16 resize-none"
                  id="textarea-notes"
                />
              </div>
            </div>

            <div className="pt-2 flex items-start space-x-2 border-t border-stone-100">
              <ShieldAlert className="h-4.5 w-4.5 text-gold-600 shrink-0 mt-0.5" />
              <p className="text-[10px] text-stone-500 font-light leading-relaxed">
                <strong>Güvenli Bilgi Paylaşımı:</strong> Talebiniz uzman ekibimiz tarafından incelenir. Kişisel verileriniz KVKK kapsamında korunmakta olup, sadece teklif sürecinin yürütülmesi amacıyla kullanılmaktadır.
              </p>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex items-center justify-between border-t border-stone-200/60 pt-6 mt-8">
          <button
            onClick={handleBack}
            className="flex items-center space-x-1.5 text-xs font-semibold tracking-wider text-neutral-700 hover:text-neutral-950 uppercase"
            id="wizard-prev-btn"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{step === 1 ? 'Vazgeç' : 'Geri DöN'}</span>
          </button>
          
          <button
            onClick={handleNext}
            className="group flex items-center space-x-2 rounded-full bg-neutral-950 px-6 py-3 text-xs font-semibold tracking-widest text-stone-warm uppercase transition-all hover:bg-gold-600 active:translate-y-0.5"
            id="wizard-next-btn"
          >
            <span>{step === 5 ? 'Fiyat Talebi Gönder' : 'İleri'}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </div>
  );
}
