import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Phone, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  activePage: string;
  onNavigate: (page: any) => void;
  savedColorsCount: number;
  onOpenFavorites: () => void;
  onStartQuote: () => void;
  onLoginClick: () => void;
}

export default function Header({
  activePage,
  onNavigate,
  savedColorsCount,
  onOpenFavorites,
  onStartQuote,
  onLoginClick,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAdmin, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Ana Sayfa' },
    { id: 'brands', label: 'Markalar' },
    { id: 'usage-areas', label: 'Uygulama Alanları' },
    { id: 'projects', label: 'Projeler' },
    { id: 'randevu', label: 'Randevu' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-100'
          : 'bg-white border-b border-stone-100'
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12 gap-8" style={{ height: '72px' }}>

        {/* Logo */}
        <button
          onClick={() => { onNavigate('home'); setIsOpen(false); }}
          className="shrink-0 group flex flex-col items-start focus:outline-none"
          id="logo-button"
        >
          <span className="font-serif text-xl font-bold tracking-tight text-neutral-900 group-hover:text-amber-500 transition-colors duration-300">
            Tezgah<span className="text-amber-500 font-light"> Studio</span>
          </span>
          <span className="font-mono text-[10px] tracking-[0.28em] text-stone-400 uppercase">
            Lüks Tezgah Platformu
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center overflow-hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative px-2.5 py-2 text-[13px] font-medium tracking-normal rounded-lg transition-all duration-200 whitespace-nowrap ${
                activePage === item.id
                  ? 'text-amber-600 bg-amber-50'
                  : 'text-stone-500 hover:text-neutral-900 hover:bg-stone-50'
              }`}
              id={`nav-item-${item.id}`}
            >
              {item.label}
              {activePage === item.id && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-4 rounded-full bg-amber-500" />
              )}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {/* Phone */}
          <a
            href="tel:+902126502220"
            className="hidden xl:flex items-center gap-2 text-[13px] text-stone-500 hover:text-amber-600 transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="font-medium">+90 (212) 650 22 20</span>
          </a>

          {/* Kullanıcı girişi */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 rounded-full border border-stone-200 pl-1 pr-3 py-1 hover:border-amber-300 transition-colors"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName ?? ''} className="h-7 w-7 rounded-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="h-7 w-7 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xs">
                    {user.displayName?.[0] ?? 'U'}
                  </div>
                )}
                <span className="text-[12px] font-medium text-neutral-700 max-w-[100px] truncate">
                  {user.displayName?.split(' ')[0]}
                </span>
              </button>
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-stone-100 shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-stone-100">
                    <p className="text-xs font-semibold text-neutral-800 truncate">{user.displayName}</p>
                    <p className="text-xs text-stone-400 truncate">{user.email}</p>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => { onNavigate('admin'); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Shield className="h-3.5 w-3.5" />
                      Admin Paneli
                    </button>
                  )}
                  <button
                    onClick={() => { logout(); setShowUserMenu(false); }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-1.5 rounded-full border border-stone-200 px-4 py-2 text-[12px] font-medium text-neutral-700 hover:border-amber-400 hover:text-amber-600 transition-all duration-200"
            >
              <User className="h-3.5 w-3.5" />
              Giriş Yap
            </button>
          )}

          {/* CTA */}
          <button
            onClick={onStartQuote}
            className="flex items-center gap-1.5 rounded-full bg-amber-500 px-5 py-2.5 text-[13px] font-semibold tracking-wide text-white shadow-sm hover:bg-amber-600 transition-all duration-200"
            id="quick-quote-button"
          >
            <span>Teklif Al</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-neutral-700"
            id="mobile-menu-toggle"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-stone-100 shadow-lg" id="mobile-nav-panel">
          <div className="px-5 py-5 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); setIsOpen(false); }}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  activePage === item.id
                    ? 'bg-amber-50 text-amber-600'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-neutral-900'
                }`}
                id={`mobile-nav-${item.id}`}
              >
                <span>{item.label}</span>
                {activePage === item.id && <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />}
              </button>
            ))}
          </div>
          <div className="px-5 pb-5 pt-2 border-t border-stone-100 flex gap-3">
            <a
              href="tel:+902126502220"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-stone-200 py-3 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>Ara</span>
            </a>
            <button
              onClick={() => { onStartQuote(); setIsOpen(false); }}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 py-3 text-sm font-semibold text-white hover:bg-amber-600 transition-colors"
              id="mobile-quote-btn"
            >
              <span>Teklif Al</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
