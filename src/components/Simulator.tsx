import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, ArrowRight, RefreshCw, Layers, ShieldCheck, Palette, Compass, Star } from 'lucide-react';

interface SimulatorProps {
  onSelectCombination: (material: string, brand: string) => void;
}

// Predefined styles/options for the premium simulator
const CABINETS = [
  { id: 'white', name: 'Nordik Mat Beyaz', color: '#F4F4F3', text: 'text-neutral-850', bgClass: 'bg-stone-100', desc: 'Aydınlık, minimalist ve zamansız bir İskandinav havası.' },
  { id: 'anthracite', name: 'Zarif Mat Antrasit', color: '#2C302E', text: 'text-stone-300', bgClass: 'bg-neutral-800', desc: 'Maskülen, modern ve son derece dramatik lüks etkisi.' },
  { id: 'walnut', name: 'Lüks Sıcak Ceviz', color: '#5A3E2B', text: 'text-[#EFE2D6]', bgClass: 'bg-[#6D4C35]', isWood: true, desc: 'Doğal ahşabın sıcak ve asil ruhunu yansıtan premium cila.' },
  { id: 'sage', name: 'Asil Adaçayı Yeşili', color: '#859F89', text: 'text-neutral-900', bgClass: 'bg-[#8CA890]', desc: 'Doğa ile bütünleşik, huzurlu ve sofistike modern mat.' }
];

const COUNTERTOPS = [
  { 
    id: 'calacatta', 
    name: 'Calacatta Gold (Lüks Porselen)', 
    material: 'Porselen',
    brand: 'Dekton',
    color: '#FAF9F6', 
    pattern: 'radial-gradient(circle at 30% 20%, rgba(201,165,108,0.1) 0%, transparent 60%), repeating-linear-gradient(45deg, rgba(160,140,110,0.15) 0px, rgba(160,140,110,0.15) 2px, transparent 2px, transparent 40px)',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=500&q=80',
    desc: 'Lüks İtalyan mermerinin altın ve gri dramatik damarları.',
    specs: { durability: 5, stain: 5, heat: 5, price: '₺₺₺₺₺' }
  },
  { 
    id: 'marquina', 
    name: 'Nero Marquina (Lüks Siyah Kuvars)', 
    material: 'Kuvars',
    brand: 'Belenco',
    color: '#151515', 
    pattern: 'repeating-linear-gradient(-35deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 1.5px, transparent 1.5px, transparent 50px)',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=500&q=80',
    desc: 'Siyah asalet üzerinde uzanan ince beyaz geometrik damarlar.',
    specs: { durability: 4, stain: 5, heat: 3, price: '₺₺₺' }
  },
  { 
    id: 'sahara', 
    name: 'Sahara Dune (Kuvarsit Dokusu)', 
    material: 'Kuvarsit',
    brand: 'Silestone',
    color: '#E3DAC9', 
    pattern: 'radial-gradient(rgba(212,175,55,0.15) 10%, transparent 40%)',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80',
    desc: 'Çöl kumlarının sıcak, pürüzsüz ve sakin ipeksi tonları.',
    specs: { durability: 4, stain: 4, heat: 4, price: '₺₺₺₺' }
  },
  { 
    id: 'concrete', 
    name: 'Loft Grey (Sintret Beton)', 
    material: 'Porselen',
    brand: 'Laminam',
    color: '#8E908F', 
    pattern: 'radial-gradient(rgba(0,0,0,0.05) 5%, transparent 15%)',
    image: 'https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?auto=format&fit=crop&w=500&q=80',
    desc: 'Brüt betonun rustik ve endüstriyel lüks duruşu.',
    specs: { durability: 5, stain: 5, heat: 5, price: '₺₺₺₺' }
  }
];

const FLOORINGS = [
  { id: 'oak', name: 'Açık Doğal Meşe Parke', color: '#DDBB99', pattern: 'repeating-linear-gradient(90deg, #DDBB99 0px, #DDBB99 40px, #CCA580 41px, #CCA580 42px)' },
  { id: 'dark-stone', name: 'Koyu Grafit Taş Karolar', color: '#444444', pattern: 'radial-gradient(#333333 10%, transparent 80%)' },
  { id: 'cement', name: 'Modern Endüstriyel Mikrosimento', color: '#B3B3B3', pattern: 'none' }
];

const FIXTURES = [
  { id: 'gold', name: 'Fırçalanmış Altın (Luxury)', color: '#D4AF37', borderClass: 'border-[#D4AF37]' },
  { id: 'black', name: 'Mat Siyah (Contemporary)', color: '#111111', borderClass: 'border-neutral-900' },
  { id: 'chrome', name: 'Ayna Parlaklığında Krom (Classic)', color: '#C0C0C0', borderClass: 'border-stone-300' }
];

export default function Simulator({ onSelectCombination }: SimulatorProps) {
  const [cabinet, setCabinet] = useState(CABINETS[0]);
  const [countertop, setCountertop] = useState(COUNTERTOPS[0]);
  const [flooring, setFlooring] = useState(FLOORINGS[0]);
  const [fixture, setFixture] = useState(FIXTURES[0]);

  const [activeTab, setActiveTab] = useState<'cabinet' | 'countertop' | 'floor' | 'fixture'>('countertop');

  const resetSelections = () => {
    setCabinet(CABINETS[0]);
    setCountertop(COUNTERTOPS[0]);
    setFlooring(FLOORINGS[0]);
    setFixture(FIXTURES[0]);
    setActiveTab('countertop');
  };

  const handleApplyCombo = () => {
    // Notify parent to direct to QuoteWizard with pre-selected material and brand
    onSelectCombination(countertop.material, countertop.brand);
  };

  return (
    <div className="space-y-6" id="simulator-container">
      {/* Upper header segment */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div className="space-y-2">
          <span className="font-mono text-xs text-gold-600 uppercase tracking-widest flex items-center space-x-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Mimar Kurgu Köşesi</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">
            Mutfak Tasarım Simülatörü
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-light max-w-2xl">
            Lüks tezgah kaplamalarının farklı dolap renkleri, zemin dokuları ve batarya detaylarıyla sergilediği mükemmel uyumu interaktif olarak test edin.
          </p>
        </div>

        <button
          onClick={resetSelections}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 border border-stone-300 rounded-lg text-neutral-600 hover:text-neutral-950 hover:bg-stone-100 text-xs font-semibold transition-colors uppercase tracking-widest shrink-0 self-start md:self-auto"
          id="btn-simulator-reset"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Sıfırla</span>
        </button>
      </div>

      {/* Simulator Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COLUMN: Visual Live Simulation View Box (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-neutral-950 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl min-h-[480px] lg:min-h-[580px] text-white">
          
          {/* Accent lighting glare overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-10" />
          
          {/* Top header spec row */}
          <div className="relative z-25 flex items-center justify-between border-b border-white/10 pb-4">
            <div className="space-y-1">
              <span className="text-xs uppercase font-mono tracking-widest text-gold-400">Aktif Kombinasyon</span>
              <h3 className="font-serif text-lg font-bold text-white tracking-wide">{countertop.name}</h3>
            </div>
            <div className="bg-neutral-900/90 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl text-center">
              <span className="text-[11px] text-stone-400 block uppercase font-bold">Stil Uyumu</span>
              <span className="text-xs font-semibold text-emerald-400">Mükemmel (%98)</span>
            </div>
          </div>

          {/* VIRTUAL KITCHEN MOCKUP INTERFACE: RENDERED PURELY WITH TAILWIND & EMBEDDED STYLES FOR ULTRAPRECISION */}
          <div className="my-auto py-8 relative w-full aspect-video max-w-lg mx-auto flex flex-col justify-center">
            
            {/* Visual Frame Wrapper representing a luxury Kitchen Island Section */}
            <div className="relative w-full h-64 border border-white/10 rounded-2xl overflow-hidden bg-neutral-900/60 shadow-lg flex flex-col justify-between">
              
              {/* BACK CABINETS SECTOR */}
              <div 
                className="h-28 w-full p-4 relative flex items-end justify-around transition-all duration-700 ease-out"
                style={{ 
                  backgroundColor: cabinet.color,
                  backgroundImage: cabinet.isWood ? 'linear-gradient(90deg, rgba(0,0,0,0.1) 0px, transparent 1px, transparent 60px)' : 'none',
                  backgroundSize: '100% 100%'
                }}
              >
                {/* Cabinet Lines to represent modular drawers & shelves */}
                <div className="absolute inset-x-0 top-0 h-1/2 border-b border-black/10 flex justify-between">
                  <div className="w-1/3 border-r border-black/10" />
                  <div className="w-1/3 border-r border-black/10" />
                </div>
                <div className="absolute inset-y-0 left-1/2 -ml-[1px] w-[2px] bg-black/10" />

                {/* Cabinet Handles / Knobs with selected fixture metal */}
                <div className="absolute left-1/4 top-[40%] transform -translate-y-1/2 flex items-center space-x-1">
                  <div className={`w-12 h-1 rounded-sm shadow-sm transition-all duration-500`} style={{ backgroundColor: fixture.color }} />
                </div>
                <div className="absolute right-1/4 top-[40%] transform -translate-y-1/2 flex items-center space-x-1">
                  <div className={`w-12 h-1 rounded-sm shadow-sm transition-all duration-500`} style={{ backgroundColor: fixture.color }} />
                </div>

                <div className="relative z-10 px-3 py-1 bg-neutral-950/40 rounded backdrop-blur-xs text-[11px] uppercase tracking-widest text-white/90">
                  {cabinet.name} Dolaplar
                </div>
              </div>

              {/* THE COUNTERTOP PLATE - PERSPECTIVE EFFECT (SLANTED SECTOR WITH SELECTED PATTERN) */}
              <div className="relative h-16 w-full -mt-2 z-20 flex flex-col items-center justify-center">
                
                {/* 3D Slanted surface */}
                <div 
                  className="absolute inset-0 origin-center scale-x-105 border-y border-white/20 transition-all duration-700 shadow-xl"
                  style={{ 
                    backgroundColor: countertop.color,
                    backgroundImage: countertop.pattern,
                    boxShadow: 'inset 0 10px 15px -3px rgba(0,0,0,0.4), 0 4px 6px -1px rgba(0,0,0,0.2)'
                  }}
                />

                {/* Sub-countertop edge profile showing thickness (luxury bevel profile) */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-[10px] transition-all duration-700" 
                  style={{ 
                    backgroundColor: countertop.color,
                    filter: 'brightness(0.75)',
                    borderTop: '1px solid rgba(255,255,255,0.1)'
                  }}
                />

                {/* Tap / Faucet rising from Countertop surface */}
                <div className="absolute top-[-15px] left-1/2 transform -translate-x-1/2 z-25 flex flex-col items-center">
                  {/* Faucet body */}
                  <div className="w-2 h-7 rounded-t-lg transition-all duration-500" style={{ backgroundColor: fixture.color }} />
                  {/* Faucet spout spout curv */}
                  <div className="w-5 h-2 -mt-7 -ml-3 rounded-b-md transition-all duration-500" style={{ backgroundColor: fixture.color }} />
                  {/* Faucet handle lever */}
                  <div className="w-3 h-1 mt-3 ml-2 transition-all duration-500" style={{ backgroundColor: fixture.color }} />
                </div>

                <div className="relative z-30 font-serif text-xs font-bold px-3 py-0.5 rounded-full bg-neutral-950 text-gold-400 border border-gold-500/30 uppercase tracking-widest">
                  {countertop.name} Thickness Profile (20mm)
                </div>
              </div>

              {/* FLOORING LOWER SECTOR */}
              <div 
                className="h-20 w-full p-4 flex items-end justify-center relative transition-all duration-700"
                style={{ 
                  backgroundColor: flooring.color,
                  backgroundImage: flooring.pattern
                }}
              >
                <span className="relative z-10 px-3 py-1 bg-neutral-950/60 rounded backdrop-blur-xs text-[11px] uppercase tracking-widest text-white/90">
                  {flooring.name} Zemin
                </span>
              </div>

            </div>

            {/* Simulated environment properties badges */}
            <div className="absolute right-4 bottom-4 z-30 flex space-x-1.5">
              <span className="bg-neutral-900/90 border border-white/10 px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
                Batarya: {fixture.name.split(' (')[0]}
              </span>
            </div>
          </div>

          {/* Bottom dynamic pairing notes */}
          <div className="relative z-20 bg-neutral-900/60 border border-white/5 rounded-2xl p-4 flex items-start space-x-3 mt-4">
            <Palette className="h-5 w-5 text-gold-400 shrink-0 mt-0.5 animate-pulse" />
            <div className="space-y-1">
              <h5 className="text-xs font-bold text-neutral-100 uppercase tracking-wider">Mimar Tasarım Notu</h5>
              <p className="text-[13px] text-stone-300 font-light leading-relaxed">
                <strong>{cabinet.name}</strong> dolaplar ile <strong>{countertop.name}</strong> birlikteliği derin kontrastlı, yüksek görsel etkiye sahip modern-lüks bir atmosfer yaratır. <strong>{fixture.name.split(' (')[0]}</strong> kulp ve batarya seçimi ile tasarımı asilce taçlandırdınız.
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Selection Tabs and Details (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs space-y-6">
          
          <div className="space-y-6">
            {/* Control Tabs Row */}
            <div className="grid grid-cols-4 gap-1.5 border-b border-stone-100 pb-4">
              {[
                { id: 'countertop', label: 'Tezgah Plaka', icon: Layers },
                { id: 'cabinet', label: 'Dolap Kapak', icon: Palette },
                { id: 'floor', label: 'Zemin Parke', icon: Compass },
                { id: 'fixture', label: 'Armatür Kulp', icon: ShieldCheck }
              ].map((tab) => {
                const IconComponent = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                      isSelected 
                        ? 'bg-neutral-950 border-neutral-950 text-white shadow-sm' 
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                    id={`tab-sim-${tab.id}`}
                  >
                    <IconComponent className="h-4.5 w-4.5 mb-1" />
                    <span className="text-[11px] font-bold uppercase tracking-wider leading-none block whitespace-pre-line">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Selection Options Frame depending on active Tab */}
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {activeTab === 'countertop' && (
                  <motion.div
                    key="countertop-pane"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block">Mevcut Tezgah Seçenekleri ({COUNTERTOPS.length})</span>
                    <div className="grid grid-cols-1 gap-2.5">
                      {COUNTERTOPS.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setCountertop(option)}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                            countertop.id === option.id 
                              ? 'border-neutral-950 bg-stone-50 ring-2 ring-neutral-950' 
                              : 'border-stone-200/85 hover:border-stone-400 bg-white'
                          }`}
                          id={`option-countertop-${option.id}`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-xl overflow-hidden bg-neutral-150 shrink-0 border border-stone-200">
                              <img src={option.image} alt={option.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h5 className="text-xs font-bold text-neutral-900 tracking-wide">{option.name}</h5>
                              <span className="text-xs text-stone-500 font-light block">{option.desc}</span>
                            </div>
                          </div>
                          {countertop.id === option.id && (
                            <div className="h-5 w-5 bg-neutral-950 text-white rounded-full flex items-center justify-center shrink-0">
                              <Check className="h-3 w-3 stroke-[3px]" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'cabinet' && (
                  <motion.div
                    key="cabinet-pane"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block">Kapak Lake/Kaplama Seçenekleri ({CABINETS.length})</span>
                    <div className="grid grid-cols-1 gap-2.5">
                      {CABINETS.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setCabinet(option)}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                            cabinet.id === option.id 
                              ? 'border-neutral-950 bg-stone-50 ring-2 ring-neutral-950' 
                              : 'border-stone-200 border-dashed hover:border-stone-400 bg-white'
                          }`}
                          id={`option-cabinet-${option.id}`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`h-8 w-8 rounded-lg shadow-inner ${option.bgClass} shrink-0 border border-stone-300`} />
                            <div>
                              <h5 className="text-xs font-bold text-neutral-900 tracking-wide">{option.name}</h5>
                              <span className="text-xs text-stone-500 font-light block">{option.desc}</span>
                            </div>
                          </div>
                          {cabinet.id === option.id && (
                            <div className="h-5 w-5 bg-neutral-950 text-white rounded-full flex items-center justify-center shrink-0">
                              <Check className="h-3 w-3 stroke-[3px]" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'floor' && (
                  <motion.div
                    key="floor-pane"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block">Zemin Kaplaması ({FLOORINGS.length})</span>
                    <div className="grid grid-cols-1 gap-2.5">
                      {FLOORINGS.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setFlooring(option)}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                            flooring.id === option.id 
                              ? 'border-neutral-950 bg-stone-50 ring-2 ring-neutral-950' 
                              : 'border-stone-200 hover:border-stone-400 bg-white'
                          }`}
                          id={`option-flooring-${option.id}`}
                        >
                          <div className="flex items-center space-x-3">
                            <div 
                              className="h-8 w-8 rounded-lg shadow-inner shrink-0 border border-stone-350" 
                              style={{ backgroundColor: option.color, backgroundImage: option.pattern, backgroundSize: '25px 25px' }}
                            />
                            <div>
                              <h5 className="text-xs font-bold text-neutral-900 tracking-wide">{option.name}</h5>
                              <span className="text-xs text-stone-500 font-light block">Zemin uyumu ve derinlik kurgusu oluşturur.</span>
                            </div>
                          </div>
                          {flooring.id === option.id && (
                            <div className="h-5 w-5 bg-neutral-950 text-white rounded-full flex items-center justify-center shrink-0">
                              <Check className="h-3 w-3 stroke-[3px]" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'fixture' && (
                  <motion.div
                    key="fixture-pane"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block">Aksesuar Metal Bitiş Reflektörü ({FIXTURES.length})</span>
                    <div className="grid grid-cols-1 gap-2.5">
                      {FIXTURES.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setFixture(option)}
                          className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                            fixture.id === option.id 
                              ? 'border-neutral-950 bg-stone-50 ring-2 ring-neutral-950' 
                              : 'border-stone-200 hover:border-stone-400 bg-white'
                          }`}
                          id={`option-fixture-${option.id}`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`h-8 w-8 rounded-full shadow-md shrink-0 border ${option.borderClass}`} style={{ backgroundColor: option.color }} />
                            <div>
                              <h5 className="text-xs font-bold text-neutral-900 tracking-wide">{option.name}</h5>
                              <span className="text-xs text-stone-500 font-light block">Kulp, batarya ve aydınlatma armatürlerinde seçilen bitiş.</span>
                            </div>
                          </div>
                          {fixture.id === option.id && (
                            <div className="h-5 w-5 bg-neutral-950 text-white rounded-full flex items-center justify-center shrink-0">
                              <Check className="h-3 w-3 stroke-[3px]" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Active Option Specs and Detailed Action Row */}
          <div className="border-t border-stone-150 pt-5 space-y-4">
            
            {/* Technical analysis list */}
            <div className="bg-stone-50 border border-stone-200/50 rounded-2xl p-4 space-y-2.5 text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block">Seçilen Malzeme Kimyasal Değerleri</span>
              <div className="grid grid-cols-2 gap-3 font-light text-stone-600">
                <div className="flex justify-between items-center border-b border-stone-150 pb-1.5">
                  <span>Marka:</span>
                  <span className="font-bold text-neutral-950">{countertop.brand}</span>
                </div>
                <div className="flex justify-between items-center border-b border-stone-150 pb-1.5">
                  <span>Isı Dayanımı:</span>
                  <span className="text-amber-500 font-semibold">{"★".repeat(countertop.specs.heat) + "☆".repeat(5-countertop.specs.heat)}</span>
                </div>
                <div className="flex justify-between items-center border-b border-stone-150 pb-1.5">
                  <span>Leke Direnci:</span>
                  <span className="text-amber-500 font-semibold">{"★".repeat(countertop.specs.stain) + "☆".repeat(5-countertop.specs.stain)}</span>
                </div>
                <div className="flex justify-between items-center border-b border-stone-150 pb-1.5">
                  <span>Çizilme Dayanımı:</span>
                  <span className="text-amber-500 font-semibold">{"★".repeat(countertop.specs.durability) + "☆".repeat(5-countertop.specs.durability)}</span>
                </div>
              </div>
            </div>

            {/* Direct Action triggers */}
            <button
              onClick={handleApplyCombo}
              className="w-full inline-flex items-center justify-center space-x-2 rounded-full bg-neutral-950 hover:bg-gold-600 text-white font-bold py-4 text-xs tracking-widest uppercase shadow-md transition-all duration-300"
              id="btn-simulator-apply-combo"
            >
              <span>Bu Kombinasyonla Fiyat Al</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
