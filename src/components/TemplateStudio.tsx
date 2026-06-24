import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sliders, Sparkles, Check, ChevronLeft, ChevronRight, Eye, ShieldAlert, Layers } from 'lucide-react';

interface TemplateStudioProps {
  currentTheme: 'milano' | 'nordic' | 'obsidian';
  onThemeChange: (theme: 'milano' | 'nordic' | 'obsidian') => void;
}

export default function TemplateStudio({ currentTheme, onThemeChange }: TemplateStudioProps) {
  const [isOpen, setIsOpen] = useState(true);

  const templates = [
    {
      id: 'milano' as const,
      num: 1,
      name: 'Milano Klasik',
      subtitle: 'Premium Geleneksel',
      desc: 'Sıcak krem rengi zemin, fildişi tonları ve zarif serif yazı karakterleri. Klasik lüks showroom hissiyatı.',
      accentClass: 'bg-amber-600',
      badge: 'Zarif & Sıcak'
    },
    {
      id: 'nordic' as const,
      num: 2,
      name: 'İskandinav Sade',
      subtitle: 'Modern Minimalizm',
      desc: 'Açık gri-kum tonları, keskin teknik kenarlıklar ve saf geometrik "sans-serif" estetiği.',
      accentClass: 'bg-neutral-950',
      badge: 'Temiz & Akıcı'
    },
    {
      id: 'obsidian' as const,
      num: 3,
      name: 'Cosmic Obsidian',
      subtitle: 'Ultra-Lüks Noir',
      desc: 'Derin obsidyen kömür arka planı, pürüzsüz parlayan pirinç çizgiler. Mermer ve porselen plaka detaylarını mükemmel öne çıkarır.',
      accentClass: 'bg-amber-500',
      badge: '★ Önerilen (Seçim 3)'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-80 md:w-[360px] bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl p-5 text-left text-neutral-900 dark:text-stone-100 backdrop-blur-luxury "
            style={{
              boxShadow: currentTheme === 'obsidian' 
                ? '0 20px 40px -15px rgba(217, 119, 6, 0.15), 0 0 0 1px rgba(217, 119, 6, 0.1)' 
                : '0 20px 40px -15px rgba(0, 0, 0, 0.12)'
            }}
            id="template-studio-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Sliders className="h-4.5 w-4.5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold tracking-wide text-neutral-900 dark:text-stone-100">
                    Stüdyo Stil Laboratuvarı
                  </h4>
                  <p className="font-mono text-[11px] tracking-widest text-neutral-400 uppercase">
                    Şablon Test Konsolu
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 px-2 py-1 rounded-md transition-colors font-mono"
              >
                Gizle
              </button>
            </div>

            <p className="text-[13px] text-neutral-500 dark:text-stone-400 leading-relaxed font-light mb-4">
              Tezgah Studio platformunu size en uygun tasarımla deneyimleyin. Şablonlar arasında geçiş yaparak renklerin ve plakaların sergilenme biçimini canlı olarak karşılaştırın:
            </p>

            {/* Template options */}
            <div className="space-y-3">
              {templates.map((tpl) => {
                const isActive = currentTheme === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    onClick={() => onThemeChange(tpl.id)}
                    className={`group w-full relative border rounded-xl p-3.5 text-left transition-all duration-300 flex flex-col justify-between ${
                      isActive
                        ? 'bg-amber-500/5 border-amber-500 ring-1 ring-amber-500/30'
                        : 'bg-stone-50/50 hover:bg-stone-50 dark:bg-stone-900/40 dark:hover:bg-stone-800/60 border-stone-200 dark:border-stone-800'
                    }`}
                    id={`btn-tpl-${tpl.id}`}
                  >
                    {/* Badge */}
                    <span 
                      className={`absolute top-3 right-3 font-mono text-[10px] tracking-wider px-2 py-0.5 rounded-full uppercase ${
                        isActive 
                          ? 'bg-amber-500 text-white font-bold' 
                          : 'bg-stone-200/60 dark:bg-stone-800 text-neutral-500 dark:text-stone-400'
                      }`}
                    >
                      {tpl.badge}
                    </span>

                    <div className="space-y-1 pr-16">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-mono text-xs font-bold text-neutral-400">
                          {tpl.num.toString().padStart(2, '0')}
                        </span>
                        <h5 className="text-xs font-bold tracking-wide text-neutral-800 dark:text-stone-200">
                          {tpl.name}
                        </h5>
                      </div>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">
                        {tpl.subtitle}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-500 dark:text-stone-400 leading-normal font-light mt-2">
                      {tpl.desc}
                    </p>

                    {/* Active check indicator */}
                    {isActive && (
                      <div className="absolute bottom-3 right-3 h-5 w-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Hint for decision maker */}
            <div className="mt-4 bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-start space-x-2.5">
              <Sparkles className="h-4 w-4 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800 dark:text-amber-400 leading-normal font-light">
                <strong>Hakan Bey'in Dikkatine:</strong> Seçtiğiniz <strong>Seçenek 3 (Obsidian Noir)</strong>, plakaların renk tonlarını ve damarlarını kuyumcu vitrinindeki pırlantalar gibi ön plana çıkaran ultra-lüks bir stildir.
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed-studio-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="group flex items-center space-x-2 bg-neutral-950 dark:bg-stone-900 border border-amber-500 text-white rounded-full px-5 py-3 hover:bg-neutral-900 shadow-2xl transition-all duration-300 hover:scale-105"
            style={{
              boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.3)'
            }}
            id="expand-template-studio-btn"
          >
            <Layers className="h-4 w-4 text-amber-400 animate-spin-slow" />
            <span className="text-xs font-mono font-medium tracking-widest uppercase">
              Şablon Test Paneli (3)
            </span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
