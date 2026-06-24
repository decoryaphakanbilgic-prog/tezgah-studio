import React, { useState } from 'react';
import { MessageSquare, ChevronRight } from 'lucide-react';

// ── CDN helpers ────────────────────────────────────────────────────────────────
const W  = 'https://static.wixstatic.com/media/';
const WM = 'https://upload.wikimedia.org/wikipedia/';

// Inline SVG text logo for brands without a public logo URL
const svgLogo = (text: string, sub?: string) => {
  const body = sub
    ? `<text x='120' y='34' text-anchor='middle' font-family='Arial,sans-serif' font-size='17' font-weight='700' fill='%23222'>${text}</text><text x='120' y='56' text-anchor='middle' font-family='Arial,sans-serif' font-size='13' fill='%23777'>${sub}</text>`
    : `<text x='120' y='48' text-anchor='middle' font-family='Arial,sans-serif' font-size='20' font-weight='700' fill='%23222'>${text}</text>`;
  return `data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 80'>${body}</svg>`;
};

interface Project {
  id: string;
  logo: string;
  logoClass?: string;
  client: string;
  title: string;
  location: string;
  description: string;
}

interface Section {
  key: string;
  label: string;
  projects: Project[];
}

const SECTIONS: Section[] = [
  {
    key: 'saglik',
    label: 'Sağlık Alanı Referansları',
    projects: [
      {
        id: 's1',
        logo: WM + 'commons/thumb/f/ff/Ac%C4%B1badem_Grup_logo.svg/250px-Ac%C4%B1badem_Grup_logo.svg.png',
        logoClass: 'max-h-[52px]',
        client: 'Acıbadem Sağlık Grubu',
        title: 'Acıbadem Atakent Halkalı Hastanesi',
        location: 'Halkalı, İstanbul',
        description: 'Termoform banyo duvar kaplamaları ve hasta odası tezgah uygulamaları.',
      },
      {
        id: 's2',
        logo: W + '8d8965_c205190f26d54b9c9d78a174eaee376f~mv2.png/v1/fill/w_234,h_140,al_c,lg_1,q_85,enc_avif,quality_auto/indir%20(1).png',
        client: 'Memorial Sağlık Grubu',
        title: 'Memorial Okmeydanı Hastanesi',
        location: 'Okmeydanı, İstanbul',
        description: 'Hasta masaları, duş tekneleri ve giriş bankosu akrilik uygulamaları.',
      },
      {
        id: 's3',
        logo: W + '8d8965_edc70854eb9441918cba24d5746f50c0~mv2.png/v1/fill/w_234,h_140,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/hizmet_hastanesi_logo.png',
        client: 'Bakırköy Hizmet Hastanesi',
        title: 'Bakırköy Hizmet Hastanesi',
        location: 'Bakırköy, İstanbul',
        description: 'Islak hacim akrilik tezgah ve kaplama uygulamaları.',
      },
      {
        id: 's4',
        logo: WM + 'commons/thumb/f/ff/Ac%C4%B1badem_Grup_logo.svg/250px-Ac%C4%B1badem_Grup_logo.svg.png',
        logoClass: 'max-h-[52px]',
        client: 'Acıbadem Sağlık Grubu',
        title: 'Acıbadem Bakırköy Klinik',
        location: 'Bakırköy, İstanbul',
        description: 'Hasta tezgahları, lavabolar ve resepsiyon bankosu uygulamaları.',
      },
      {
        id: 's5',
        logo: W + '8d8965_c205190f26d54b9c9d78a174eaee376f~mv2.png/v1/fill/w_234,h_140,al_c,lg_1,q_85,enc_avif,quality_auto/indir%20(1).png',
        client: 'Memorial Sağlık Grubu',
        title: 'Memorial Wellness — Zorlu Center',
        location: 'Zorlu Center, İstanbul',
        description: 'Wellness merkezi akrilik tezgah ve yüzey kaplama uygulamaları.',
      },
      {
        id: 's6',
        logo: WM + 'commons/thumb/f/ff/Ac%C4%B1badem_Grup_logo.svg/250px-Ac%C4%B1badem_Grup_logo.svg.png',
        logoClass: 'max-h-[52px]',
        client: 'Acıbadem Sağlık Grubu',
        title: 'Acıbadem Zekeriyaköy',
        location: 'Zekeriyaköy, İstanbul',
        description: 'Hasta masaları, lavabolu tezgahlar ve resepsiyon unsurları.',
      },
      {
        id: 's7',
        logo: svgLogo('Medicine', 'Hospital'),
        client: 'Medicine Hospital',
        title: 'Medicine Hospital Güneşli',
        location: 'Güneşli, İstanbul',
        description: 'Tesis genelinde kapsamlı akrilik solid surface uygulamaları.',
      },
      {
        id: 's8',
        logo: WM + 'commons/thumb/f/ff/Ac%C4%B1badem_Grup_logo.svg/250px-Ac%C4%B1badem_Grup_logo.svg.png',
        logoClass: 'max-h-[52px]',
        client: 'Acıbadem Üniversitesi',
        title: 'Kerem Aydınlar Kampüsü',
        location: 'İstanbul',
        description: 'Üniversite kampüsü laboratuvar tezgahları ve ıslak hacim uygulamaları.',
      },
      {
        id: 's9',
        logo: WM + 'en/thumb/e/e5/Istanbul_Medipol_University_Logo.png/250px-Istanbul_Medipol_University_Logo.png',
        client: 'Medipol Acıbadem',
        title: 'Medipol Acıbadem Hastanesi',
        location: 'İstanbul',
        description: 'Hasta odası banyo tezgahları akrilik solid surface uygulamaları.',
      },
      {
        id: 's10',
        logo: W + '8d8965_c205190f26d54b9c9d78a174eaee376f~mv2.png/v1/fill/w_234,h_140,al_c,lg_1,q_85,enc_avif,quality_auto/indir%20(1).png',
        client: 'Memorial Sağlık Grubu',
        title: 'Memorial Ataşehir',
        location: 'Ataşehir, İstanbul',
        description: 'Resepsiyon, doktor masaları, ıslak hacim ve laboratuvar tezgahları.',
      },
      {
        id: 's11',
        logo: W + '8d8965_ea8bf2b4d32545f78127d71b508610b6~mv2.png/v1/fill/w_312,h_140,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/indir.png',
        client: 'Florence Nightingale',
        title: 'Florence Nightingale Ataşehir',
        location: 'Ataşehir, İstanbul',
        description: 'Hasta masaları, duş tekneleri ve giriş bankosu uygulamaları.',
      },
      {
        id: 's12',
        logo: W + '8d8965_c6aba242634849dcb9839c4802ee899a~mv2.png/v1/fill/w_287,h_140,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/indir%20(2).png',
        client: 'Ulus İnfinity Clinic',
        title: 'Ulus İnfinity Regenerative Clinic',
        location: 'Ulus, İstanbul',
        description: 'Resepsiyon tezgahları, doktor masaları ve laboratuvar yüzeyleri.',
      },
    ],
  },

  {
    key: 'konut',
    label: 'Toplu Konut Referansları',
    projects: [
      {
        id: 'k1',
        logo: W + '8d8965_9a6ae218bbbf43bc9159216e66de2698~mv2.jpg/v1/fill/w_234,h_140,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/find_2018623_41621406.jpg',
        client: 'Timur İnşaat / Nef',
        title: 'Timur İnşaat Nef Projeleri',
        location: 'İstanbul',
        description: 'Sosyal alan ve ıslak hacim akrilik solid surface uygulamaları.',
      },
      {
        id: 'k2',
        logo: W + '8d8965_dad892ef1e9648a7ae18a16a20afdb42~mv2.jpg/v1/fill/w_234,h_140,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo.jpg',
        client: 'Tahincioğlu',
        title: 'Nida Park Kayaşehir',
        location: 'Kayaşehir, İstanbul',
        description: 'Akrilik banyo tezgahları ve kaplama uygulamaları.',
      },
      {
        id: 'k3',
        logo: W + '8d8965_ef1b5fe8b7a643a5a5c12c8c11177d01~mv2.png/v1/fill/w_252,h_140,al_c,lg_1,q_85,enc_avif,quality_auto/logo.png',
        client: 'Nuhoğlu',
        title: 'Yenitepe Kadıköy',
        location: 'Kadıköy, İstanbul',
        description: 'Mutfak ve banyo akrilik solid surface tezgah uygulamaları.',
      },
      {
        id: 'k4',
        logo: W + '8d8965_65fee1df94fc429db21df8c493df0f25~mv2.jpg/v1/fill/w_234,h_140,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/MUxUe2NZ_400x400.jpg',
        client: 'İnvest',
        title: 'Vadi Koru',
        location: 'İstanbul',
        description: 'Mutfak ve banyo akrilik tezgah uygulamaları.',
      },
      {
        id: 'k5',
        logo: svgLogo('TIMTAŞ'),
        client: 'Timtaş',
        title: 'Tim Towers İncek',
        location: 'İncek, Ankara',
        description: 'Mutfak ve banyo tezgah kaplama uygulamaları.',
      },
      {
        id: 'k6',
        logo: 'https://www.mesa.com.tr/img/mesa-logo3.png',
        client: 'Mesa',
        title: 'Mesa Cadde Projesi',
        location: 'İstanbul',
        description: 'Mutfak ve banyo akrilik solid surface kaplama uygulamaları.',
      },
      {
        id: 'k7',
        logo: 'https://www.artas.com.tr/assets/img/logo.png',
        client: 'Artaş',
        title: 'Vadi İstanbul Park',
        location: 'Kâğıthane, İstanbul',
        description: 'Çok katlı rezidanslarda mutfak ve banyo tezgah kaplamaları.',
      },
      {
        id: 'k8',
        logo: W + '8d8965_35ddc86cf2904ec7811bca31b861b5da~mv2.jpg/v1/fill/w_202,h_140,al_c,lg_1,q_80,enc_avif,quality_auto/cengelkoy-park-logo.jpg',
        client: 'Dossa Dossi Grup',
        title: 'Çengelköy Park Evler',
        location: 'Çengelköy, İstanbul',
        description: 'Akrilik banyo tezgah uygulamaları.',
      },
      {
        id: 'k9',
        logo: WM + 'en/thumb/1/1a/Istanbul_Technical_University_logo.svg/250px-Istanbul_Technical_University_logo.svg.png',
        client: 'İstanbul Teknik Üniversitesi',
        title: 'İTÜ Gölet Yurtları',
        location: 'Maslak, İstanbul',
        description: 'Öğrenci yurdu ortak mutfak akrilik tezgah uygulamaları.',
      },
      {
        id: 'k10',
        logo: W + '8d8965_5b262eac9a1c457dafa4b5466151d563~mv2.png/v1/fill/w_234,h_140,al_c,lg_1,q_85,enc_avif,quality_auto/g%C3%B6kdeniz_PNG.png',
        client: 'Gülsa & Bay Yapı',
        title: 'Gökdeniz Kartal Projesi',
        location: 'Kartal, İstanbul',
        description: 'Mutfak ve banyo akrilik solid surface uygulamaları.',
      },
      {
        id: 'k11',
        logo: svgLogo('INNSA', 'Tower'),
        client: 'INNSA Tower',
        title: 'Zeytindalı Konakları Zekeriyaköy',
        location: 'Zekeriyaköy, İstanbul',
        description: 'Gizli sifon sistemli akrilik banyo lavabolu tezgah ve çamaşırlık ünitesi.',
      },
      {
        id: 'k12',
        logo: 'https://www.artas.com.tr/assets/img/logo.png',
        client: 'Artaş',
        title: 'Avrupa Konutları Atakent 4',
        location: 'Atakent, İstanbul',
        description: 'Rezidans dairelerinde mutfak ve banyo akrilik tezgah uygulamaları.',
      },
      {
        id: 'k13',
        logo: 'https://www.artas.com.tr/assets/img/logo.png',
        client: 'Artaş',
        title: 'Avrupa Konutları Başakşehir',
        location: 'Başakşehir, İstanbul',
        description: 'Mutfak ve banyo tezgah kaplama uygulamaları.',
      },
      {
        id: 'k14',
        logo: WM + 'commons/f/f3/Ko%C3%A7_University.png',
        client: 'Koç Üniversitesi',
        title: 'Koç Üniversitesi Yurtları',
        location: 'Sarıyer, İstanbul',
        description: 'Toplu konut projesinde mutfak akrilik solid surface tezgah uygulamaları.',
      },
    ],
  },

  {
    key: 'metro',
    label: 'Metro İstasyon Referansları',
    projects: [
      {
        id: 'm1',
        logo: WM + 'en/thumb/6/6d/Istanbul_Metropolitan_Municipality_emblem.png/250px-Istanbul_Metropolitan_Municipality_emblem.png',
        client: 'İstanbul Büyükşehir Belediyesi',
        title: 'M7 Mecidiyeköy–Mahmutbey Hattı',
        location: 'İstanbul Metro Ağı',
        description: '15 istasyonda istasyona özel tasarımlı akrilik duvar kaplamaları — 20.000 m²\'yi aşan uygulama.',
      },
      {
        id: 'm2',
        logo: WM + 'commons/thumb/4/4c/Alarko_Holding_logo_2024.svg/250px-Alarko_Holding_logo_2024.svg.png',
        client: 'Alarko (Ana Yüklenici)',
        title: 'M7 Hattı İstasyon Uygulamaları',
        location: 'İstanbul',
        description: 'M7 metro hattı ana yüklenicisi kapsamında akrilik duvar kaplama uygulamaları.',
      },
      {
        id: 'm3',
        logo: WM + 'en/thumb/6/6d/Istanbul_Metropolitan_Municipality_emblem.png/250px-Istanbul_Metropolitan_Municipality_emblem.png',
        client: 'İBB Ulaşım',
        title: 'M7 Yıldız & Fulya İstasyonları',
        location: 'Beşiktaş, İstanbul',
        description: 'M7 metro hattı ek istasyonlarında özel tasarımlı akrilik kaplama uygulamaları.',
      },
      {
        id: 'm4',
        logo: WM + 'en/thumb/6/6d/Istanbul_Metropolitan_Municipality_emblem.png/250px-Istanbul_Metropolitan_Municipality_emblem.png',
        client: 'İBB Ulaşım',
        title: 'M9 Masko & Bahariye İstasyonları',
        location: 'İstanbul',
        description: 'M9 metro hattında iki istasyon akrilik duvar kaplama uygulamaları.',
      },
      {
        id: 'm5',
        logo: W + '8d8965_2416d64d715748f4b1fa14a29cb6e9d7~mv2.jpg/v1/fill/w_213,h_140,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/tc-turkiye-cumhuriyeti-ulastirma-ve-altyapi-bakanligi1903.jpg',
        client: 'T.C. Ulaştırma ve Altyapı Bakanlığı',
        title: 'Sabiha Gökçen Havalimanı Metro İstasyonu',
        location: 'Pendik, İstanbul',
        description: 'Havalimanı metro istasyonu akrilik duvar panel prototip ve numune uygulamaları.',
      },
      {
        id: 'm6',
        logo: WM + 'en/thumb/6/6d/Istanbul_Metropolitan_Municipality_emblem.png/250px-Istanbul_Metropolitan_Municipality_emblem.png',
        client: 'İBB Ulaşım',
        title: 'M9 Hattı Devam İstasyonları',
        location: 'İstanbul',
        description: 'M9 hattı ek istasyon akrilik kaplama tasarım ve uygulama çalışmaları.',
      },
    ],
  },

  {
    key: 'ozel',
    label: 'Özel Proje Referansları',
    projects: [
      {
        id: 'o1',
        logo: WM + 'commons/thumb/0/00/Turkish_Airlines_logo_2019_compact.svg/250px-Turkish_Airlines_logo_2019_compact.svg.png',
        client: 'Türk Hava Yolları',
        title: 'THY Satış Gişe Tezgahları',
        location: 'Dünya Geneli',
        description: 'Türk Hava Yolları\'nın küresel satış ofislerinde kullanılan gişe ve satış tezgahı uygulamaları.',
      },
      {
        id: 'o2',
        logo: WM + 'commons/thumb/0/08/IST_airport_logo.svg/250px-IST_airport_logo.svg.png',
        client: 'İstanbul Havalimanı',
        title: 'İstanbul Havalimanı',
        location: 'Arnavutköy, İstanbul',
        description: 'Havalimanı içi akrilik ürün bakım, onarım ve yenileme uygulamaları.',
      },
      {
        id: 'o3',
        logo: W + '8d8965_bc913b54d84240fb9439359c8e31a7d6~mv2.jpg/v1/fill/w_234,h_140,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/kanyon-avm-logo.jpg',
        client: 'Kanyon AVM',
        title: 'Kanyon Alışveriş Merkezi',
        location: 'Levent, İstanbul',
        description: 'Termoform silindirik ve kare kolon kaplamaları ile mağaza cephe duvar uygulamaları.',
      },
      {
        id: 'o4',
        logo: WM + 'commons/thumb/c/c8/Havelsan_logo.svg/250px-Havelsan_logo.svg.png',
        client: 'Havelsan',
        title: 'Havelsan Genel Merkezi',
        location: 'Ankara',
        description: 'VIP resepsiyon tezgahları ve genel merkez mutfak tezgah uygulamaları.',
      },
      {
        id: 'o5',
        logo: W + '8d8965_3f9eab2e0bb840e98c8d4fb527ce7aa9~mv2.png/v1/fill/w_234,h_140,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/indir%20(1).png',
        client: 'Al Hallab 1881',
        title: 'Al Hallab Restoran — Fişekhane',
        location: 'Eminönü, İstanbul',
        description: 'Resepsiyon bankosu, duvar kaplamaları ve mutfak tezgah bölümleri komple akrilik uygulama.',
      },
      {
        id: 'o6',
        logo: WM + 'en/thumb/4/4d/Garanti_BBVA_Logo.svg/250px-Garanti_BBVA_Logo.svg.png',
        client: 'Garanti BBVA',
        title: 'Garanti BBVA Şubeleri',
        location: 'Türkiye Geneli',
        description: 'Numaratör kiosk akrilik kaplamaları ve şube tezgah uygulamaları.',
      },
      {
        id: 'o7',
        logo: WM + 'commons/thumb/5/5f/Ziraat_Bankas%C4%B1_2025_Logo.svg/250px-Ziraat_Bankas%C4%B1_2025_Logo.svg.png',
        client: 'Ziraat Bankası',
        title: 'Ziraat Bankası Şubeleri',
        location: 'Türkiye Geneli',
        description: 'Şube tezgah ve resepsiyon bankosu akrilik kaplama uygulamaları.',
      },
      {
        id: 'o8',
        logo: W + '8d8965_984230bd0e6b457f8f054697fcb91eac~mv2.jpg/v1/fill/w_234,h_140,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/ziraat-katilim-bankasi3774.jpg',
        client: 'Ziraat Katılım Bankası',
        title: 'Ziraat Katılım Şubeleri',
        location: 'Türkiye Geneli',
        description: 'Resepsiyon bankosu akrilik kaplama uygulamaları.',
      },
      {
        id: 'o9',
        logo: WM + 'commons/thumb/0/0c/DenizBank_logo.svg/250px-DenizBank_logo.svg.png',
        client: 'Denizbank',
        title: 'Denizbank Genel Merkezi',
        location: 'İstanbul',
        description: 'Banka tezgah uygulamaları ve spor salonu akrilik kaplamaları.',
      },
      {
        id: 'o10',
        logo: WM + 'commons/thumb/0/04/Vak%C4%B1fbank_logo.svg/250px-Vak%C4%B1fbank_logo.svg.png',
        client: 'Vakıfbank',
        title: 'Vakıfbank Şubeleri',
        location: 'Türkiye Geneli',
        description: 'Şube tezgah ve resepsiyon bankosu akrilik solid surface kaplama uygulamaları.',
      },
      {
        id: 'o11',
        logo: W + '8d8965_aa34024e3a5d4b9f957083d922886299~mv2.png/v1/fill/w_234,h_140,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/vakifkatilimdikeysloganlilogo.png',
        client: 'Vakıf Katılım Bankası',
        title: 'Vakıf Katılım Şubeleri',
        location: 'Türkiye Geneli',
        description: 'Akrilik resepsiyon bankosu kaplama uygulamaları.',
      },
      {
        id: 'o12',
        logo: W + '8d8965_d9b0b7e552d049a4867a9d1b38062101~mv2.png/v1/fill/w_234,h_140,al_c,lg_1,q_85,enc_avif,quality_auto/malpas.png',
        client: 'Malpas Hotel',
        title: 'Malpas Hotel Girne',
        location: 'Girne, Kuzey Kıbrıs',
        description: 'Yemek alanları, tezgahlar ve büfe üniteleri dahil otel geneli akrilik uygulamaları.',
      },
      {
        id: 'o13',
        logo: WM + 'commons/thumb/0/05/ISG_logo.svg/250px-ISG_logo.svg.png',
        client: 'Sabiha Gökçen Havalimanı',
        title: 'SGH "Yöresel Tatlar" Dükkanı',
        location: 'Pendik, İstanbul',
        description: 'Satış tezgahı, raf sistemi, servis bankosu, bar tezgahı ve kasiyer alanı uygulamaları.',
      },
      {
        id: 'o14',
        logo: W + '8d8965_49279d204c34436f9454e1d4c9cfb9ed~mv2.jpg/v1/fill/w_234,h_140,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/okyanus-koleji-logo.jpg',
        client: 'Okyanus Koleji',
        title: 'Okyanus Koleji Bahçelievler',
        location: 'Bahçelievler, İstanbul',
        description: 'Kantin tezgahı ve mutfak tezgah kaplama uygulamaları.',
      },
      {
        id: 'o15',
        logo: W + '8d8965_8efb030fb6d2471ba4fff62a6f7d1e3d~mv2.jpg/v1/fill/w_234,h_140,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/17945_I_istanbul_modern_logo.jpg',
        client: 'İstanbul Modern',
        title: 'İstanbul Modern Antrepo Müzesi',
        location: 'Beşiktaş, İstanbul',
        description: 'Restore edilmiş antrepo yapısında termoform ıslak hacim tezgahları ve duvar kaplamaları.',
      },
      {
        id: 'o16',
        logo: 'https://www.mallofistanbul.com.tr/assets/images/frontend/svg/logo.svg',
        client: 'Mall of Istanbul',
        title: 'Mall of Istanbul Kayseri Mutfak',
        location: 'İstanbul',
        description: 'Gıda dağıtım tezgahı ve tepsi kaydırma ünitesi uygulamaları.',
      },
      {
        id: 'o17',
        logo: WM + 'commons/thumb/9/9f/T%C3%BCrk_Telekom_logo.svg/250px-T%C3%BCrk_Telekom_logo.svg.png',
        client: 'TTNET',
        title: 'TTNET Genel Merkezi',
        location: 'İstanbul',
        description: 'Islak hacim ve kafeterya akrilik tezgah ve lavabo uygulamaları.',
      },
      {
        id: 'o18',
        logo: W + '8d8965_2f89b2a47b264496ac6adb0a5810781b.jpg/v1/fill/w_234,h_140,al_c,lg_1,q_80,enc_avif,quality_auto/fatihotel_JPG.jpg',
        client: 'Osmanbey Fatih Hotel',
        title: 'Osmanbey Fatih Hotel',
        location: 'İstanbul',
        description: 'Tüm odalarda gizli sifon sistemli banyo tezgahları ve lavabo uygulamaları.',
      },
      {
        id: 'o19',
        logo: W + '8d8965_f53c8188ed4445668afaa3a658aa6bff.jpg/v1/fill/w_210,h_140,al_c,lg_1,q_80,enc_avif,quality_auto/1389611_611106402331128_236004199_a.jpg',
        client: 'Venus Thermal Boutique Hotel',
        title: 'Venus Thermal Boutique Hotel',
        location: 'Güre, Balıkesir',
        description: 'Tüm odalarda panelli mutfak tezgahları, banyo tezgahları ve duş tekneleri.',
      },
    ],
  },
];

const ALL_KEYS = ['all', ...SECTIONS.map(s => s.key)];
const TAB_LABELS: Record<string, string> = {
  all: 'Tümü',
  saglik: 'Sağlık',
  konut: 'Toplu Konut',
  metro: 'Metro & Altyapı',
  ozel: 'Ticari & Özel',
};

interface Props {
  onNavigate: (page: string) => void;
  onQuote: () => void;
}

export default function ProjectsPage({ onNavigate, onQuote }: Props) {
  const [activeTab, setActiveTab] = useState('all');

  const visibleSections = activeTab === 'all'
    ? SECTIONS
    : SECTIONS.filter(s => s.key === activeTab);

  const totalCount = SECTIONS.reduce((n, s) => n + s.projects.length, 0);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="bg-neutral-950 pt-12 pb-10 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 25% 60%, #d97706 0%, transparent 55%)' }} />
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors"
        >
          ← Ana Sayfa
        </button>
        <div className="max-w-4xl">
          <span className="font-mono text-xs text-amber-400 uppercase tracking-[0.2em] block mb-3">
            Referanslarımız
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Güven Veren İsimler,<br className="hidden sm:block" /> Kanıtlanmış Kalite
          </h1>
          <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
            Hastanelerden metro istasyonlarına, büyük otellerden üniversite kampüslerine
            kadar Türkiye'nin dört bir yanında tamamladığımız referans projelerimiz.
          </p>
        </div>
        {/* Stats row */}
        <div className="mt-8 flex flex-wrap gap-5">
          {[
            { n: totalCount + '+', l: 'Referans Proje' },
            { n: '20.000+', l: 'm² Uygulama Alanı' },
            { n: '4', l: 'Ana Sektör' },
            { n: '15+', l: 'Yıllık Deneyim' },
          ].map(s => (
            <div key={s.l} className="border border-white/10 rounded-xl px-5 py-3">
              <p className="font-serif text-2xl font-bold text-amber-400 leading-none">{s.n}</p>
              <p className="text-white/40 text-xs mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Filter tabs ──────────────────────────────────────────────────────── */}
      <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-sm border-b border-stone-100 px-6 sm:px-8 lg:px-12 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
          {ALL_KEYS.map(key => {
            const count = key === 'all'
              ? totalCount
              : (SECTIONS.find(s => s.key === key)?.projects.length ?? 0);
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  activeTab === key
                    ? 'bg-neutral-950 text-white border-neutral-950'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                }`}
              >
                {TAB_LABELS[key]}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  activeTab === key ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Sections ─────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 space-y-16">
        {visibleSections.map(section => (
          <div key={section.key}>
            {/* Section header */}
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 whitespace-nowrap">
                {section.label}
              </h2>
              <div className="flex-1 h-px bg-stone-200" />
              <span className="text-xs text-stone-400 font-medium whitespace-nowrap">
                {section.projects.length} referans
              </span>
            </div>

            {/* Project cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {section.projects.map(proj => (
                <div
                  key={proj.id}
                  className="group relative bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-amber-300 hover:shadow-md transition-all duration-300"
                >
                  {/* Logo area */}
                  <div className="bg-white px-5 py-4 h-[130px] flex items-center">
                    <img
                      src={proj.logo}
                      alt={proj.client}
                      className={`w-auto object-contain object-left ${proj.logoClass ?? 'max-h-full'}`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>

                  {/* Semi-transparent details bar — 50% opacity */}
                  <div className="bg-white/50 backdrop-blur-sm border-t border-stone-200/50 px-4 py-3">
                    <p className="text-[13px] font-semibold text-amber-600 uppercase tracking-wider truncate">
                      {proj.client}
                    </p>
                    <h3 className="font-bold text-neutral-900 text-[11px] leading-snug mt-0.5">
                      {proj.title}
                    </h3>
                    <p className="text-[11px] text-stone-500 leading-relaxed mt-1">
                      {proj.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <div className="bg-neutral-950 py-14 px-6 text-center mt-4">
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
            <MessageSquare className="h-4 w-4" />
            Teklif Al
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
          >
            Ana Sayfaya Dön <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
