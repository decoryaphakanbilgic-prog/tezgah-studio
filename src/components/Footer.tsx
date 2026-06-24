import React from 'react';
import { Mail, Phone, MapPin, Award, Instagram, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onLegal: (page: 'gizlilik' | 'kullanim' | 'kvkk') => void;
}

export default function Footer({ onNavigate, onLegal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-950 text-stone-200">
      {/* Upper footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">

          {/* Column 1: Brand intro */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Tezgah<span className="text-gold-400"> Studio</span>
              </span>
              <span className="font-mono text-[11px] tracking-[0.25em] text-neutral-500 uppercase">
                Lüks Tezgah Platformu
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed font-light">
              Mermer, kuvars, porselen, akrilik ve doğal taş yüzeyler için en lüks markaları ve renkleri dijital showroom kalitesinde bir araya getiren premium seçim ve fiyat rehberliği platformu.
            </p>
            <div className="flex items-center space-x-1.5 text-[13px] font-mono tracking-wider text-gold-400 uppercase">
              <Award className="h-4 w-4" />
              <span>Seçkin Yapı Malzemeleri Ortağı</span>
            </div>
          </div>

          {/* Column 2: Contact & Studio Info */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold text-white tracking-wide">
              Merkez Ofis
            </h4>
            <div className="space-y-3 text-xs font-light text-neutral-400">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 shrink-0 text-gold-400 mt-0.5" />
                <span className="leading-relaxed">
                  Habibler Yayla Mh. Konak Cd. No:11<br />
                  Sultangazi, İstanbul, Türkiye
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gold-400 shrink-0" />
                <span>+90 (212) 650 22 20</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gold-400 shrink-0" />
                <span>info@decoryap.com</span>
              </div>
            </div>
            <div className="pt-2">
              <p className="text-xs text-neutral-500 italic">
                *Çalışma Saatleri: H.İçi 08:30 - 18:30 | Cumartesi 08:30 - 13:00
              </p>
            </div>
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://instagram.com/decoryap"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-xs text-neutral-400 hover:text-gold-300 transition-colors"
              >
                <Instagram className="h-4 w-4 text-gold-400" />
                <span>@decoryap</span>
              </a>
              <a
                href="https://wa.me/905444148290"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-xs text-neutral-400 hover:text-gold-300 transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-gold-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Lower footer */}
      <div className="border-t border-neutral-800 bg-black">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-6 sm:px-8 md:flex-row lg:px-12 text-xs text-neutral-500 font-light">
          <p>© {currentYear} Tezgah Studio. Tüm Hakları Saklıdır.</p>
          <div className="mt-3 flex space-x-6 md:mt-0">
            <button onClick={() => onLegal('gizlilik')} className="hover:text-neutral-300 transition-colors">Gizlilik Politikası</button>
            <button onClick={() => onLegal('kullanim')} className="hover:text-neutral-300 transition-colors">Kullanım Şartları</button>
            <button onClick={() => onLegal('kvkk')} className="hover:text-neutral-300 transition-colors">KVKK Aydınlatma Metni</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
