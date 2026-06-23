import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle, ChevronDown, AlertCircle } from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
}

const RANDEVU_TURLERI = [
  { id: 'kesif', label: 'Keşif & Ölçü', desc: 'Yerinde ölçü alımı ve ürün seçimi danışmanlığı' },
  { id: 'toplanti', label: 'Toplantı', desc: 'Proje değerlendirme ve tasarım görüşmesi' },
  { id: 'danismanlik', label: 'Danışmanlık', desc: 'Malzeme ve marka seçimi için uzman görüşü' },
  { id: 'montaj', label: 'Montaj & Kurulum', desc: 'Tezgah montajı için randevu' },
];

const SAAT_DILIMLERI = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
];

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function RandevuPage({ onNavigate }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [selectedTur, setSelectedTur] = useState('');
  const [form, setForm] = useState({
    ad_soyad: '',
    telefon: '',
    email: '',
    tarih: '',
    saat: '',
    adres: '',
    notlar: '',
  });

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTur) return;
    setStatus('sending');

    const templateParams = {
      ad_soyad: form.ad_soyad,
      telefon: form.telefon,
      email: form.email,
      randevu_turu: RANDEVU_TURLERI.find(t => t.id === selectedTur)?.label ?? selectedTur,
      tarih: form.tarih,
      saat: form.saat,
      adres: form.adres || '—',
      notlar: form.notlar || '—',
      to_email: 'hakan.bilgic@decoryap.com',
    };

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_RANDEVU,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6 py-20">
        <div className="text-center space-y-5 max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-neutral-900">Randevu Talebiniz Alındı</h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            En kısa sürede sizinle iletişime geçerek randevunuzu onaylayacağız.
            Acil durumlar için <span className="font-semibold text-amber-700">+90 (212) 650 22 20</span> numaramızı arayabilirsiniz.
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl px-8 py-3 transition-colors text-sm"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Hero */}
      <div className="bg-neutral-950 py-12 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="font-mono text-[10px] text-amber-400 uppercase tracking-[0.3em]">Ücretsiz</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">Randevu Oluştur</h1>
          <p className="text-stone-400 text-sm font-light max-w-lg mx-auto leading-relaxed">
            Keşif, ölçü veya toplantı için size uygun gün ve saati seçin, talebinizi gönderin.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 sm:px-8">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">

          {/* Randevu Türü */}
          <div className="space-y-3">
            <h2 className="font-semibold text-neutral-900 text-sm tracking-tight">Randevu Türü <span className="text-red-400">*</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {RANDEVU_TURLERI.map(tur => (
                <button
                  key={tur.id}
                  type="button"
                  onClick={() => setSelectedTur(tur.id)}
                  className={`text-left rounded-xl border p-4 transition-all duration-200 ${
                    selectedTur === tur.id
                      ? 'border-amber-400 bg-amber-50 ring-1 ring-amber-400'
                      : 'border-stone-200 bg-white hover:border-amber-300'
                  }`}
                >
                  <p className={`text-sm font-semibold ${selectedTur === tur.id ? 'text-amber-700' : 'text-neutral-800'}`}>{tur.label}</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">{tur.desc}</p>
                </button>
              ))}
            </div>
            {!selectedTur && status === 'error' && (
              <p className="text-xs text-red-500">Lütfen randevu türü seçin.</p>
            )}
          </div>

          {/* Tarih & Saat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-amber-500" /> Tercih Ettiğiniz Tarih <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                name="tarih"
                min={today}
                required
                value={form.tarih}
                onChange={handleChange}
                className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 bg-white"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-amber-500" /> Tercih Ettiğiniz Saat <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <select
                  name="saat"
                  required
                  value={form.saat}
                  onChange={handleChange}
                  className="w-full appearance-none border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 bg-white"
                >
                  <option value="">Saat seçin</option>
                  {SAAT_DILIMLERI.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Kişisel Bilgiler */}
          <div className="space-y-3">
            <h2 className="font-semibold text-neutral-900 text-sm tracking-tight">İletişim Bilgileri</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-amber-500" /> Ad Soyad <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="ad_soyad"
                  required
                  placeholder="Adınız ve soyadınız"
                  value={form.ad_soyad}
                  onChange={handleChange}
                  className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-neutral-800 placeholder:text-stone-300 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-amber-500" /> Telefon <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="telefon"
                  required
                  placeholder="05xx xxx xx xx"
                  value={form.telefon}
                  onChange={handleChange}
                  className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-neutral-800 placeholder:text-stone-300 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-amber-500" /> E-posta
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="ornek@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-neutral-800 placeholder:text-stone-300 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5 text-amber-500" /> Adres / İlçe
                </label>
                <input
                  type="text"
                  name="adres"
                  placeholder="İlçe veya adres bilgisi"
                  value={form.adres}
                  onChange={handleChange}
                  className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-neutral-800 placeholder:text-stone-300 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Notlar */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-700">Eklemek İstedikleriniz</label>
            <textarea
              name="notlar"
              rows={3}
              placeholder="Projeniz hakkında kısa bilgi verebilirsiniz..."
              value={form.notlar}
              onChange={handleChange}
              className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-neutral-800 placeholder:text-stone-300 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 bg-white resize-none"
            />
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm">
              <AlertCircle className="h-4 w-4 shrink-0" />
              Gönderim sırasında bir hata oluştu. Lütfen tekrar deneyin veya bizi arayın.
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'sending' || !selectedTur}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3.5 transition-colors text-sm"
          >
            {status === 'sending' ? 'Gönderiliyor...' : 'Randevu Talebi Gönder'}
          </button>

          <p className="text-center text-[11px] text-stone-400">
            Randevunuz onaylandıktan sonra tarafınıza bilgi verilecektir.<br />
            Çalışma saatleri: H.İçi 08:30–18:30 | Cumartesi 08:30–13:00
          </p>
        </form>
      </div>
    </div>
  );
}
