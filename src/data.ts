export interface Brand {
  id: string;
  name: string;
  logo: string;
  logoSrc?: string;
  logoScale?: number;
  description: string;
  longDescription: string;
  materials: string[];
  colorsCount: number;
  origin: "Yerli" | "Global";
  tier: "Premium" | "Standart";
  advantages: string[];
  disadvantages: string[];
  maintenance: string;
  websiteUrl?: string;
  colorsUrl?: string;
  documents: { title: string; size: string; url?: string }[];
}

export interface MaterialCategory {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  advantages: string[];
  disadvantages: string[];
  averagePrice: "Lüks" | "Yüksek" | "Orta-Yüksek" | "Orta";
  priceDetails: string;
  usageAreas: string[];
  relatedBrands: string[];
}

export interface CountertopColor {
  id: string;
  name: string;
  brand: string;
  brandId: string;
  materialType: string;
  colorGroup: "Beyaz" | "Gri" | "Siyah" | "Bej" | "Doğal";
  effect: "Damarlı" | "Düz" | "Beton" | "Traverten" | "Dokulu" | "Granit";
  finish: "Mat" | "Parlak" | "İpeksi";
  suitability: string[]; // ['İç mekan', 'Dış mekan', 'Yoğun Kullanım']
  image: string;
}

export interface InspirationProject {
  id: string;
  title: string;
  category: "Mutfak" | "Banyo" | "Ticari" | "Özel Tasarım";
  location: string;
  designer: string;
  materialUsed: string;
  image: string;
}

export interface TechSpecComparison {
  material: string;
  durability: number; // 1-5 stars
  stainResistance: number;
  heatResistance: number;
  maintenanceEase: number;
  outdoorSuitability: boolean;
  priceLevel: string; // e.g. "₺₺₺₺"
  visualImpact: string;
  recommendedUse: string;
}

export const BRANDS: Brand[] = [
  {
    id: "cimstone",
    name: "Çimstone",
    logo: "Ç",
    logoSrc: "/logos/cimstone.png",
    logoScale: 1.6,
    description: "Türkiye'nin kuvars tezgah öncüsü; İtalyan Breton teknolojisiyle üretilen gözeneksiz, hijyenik ve dayanıklı yüzeyler.",
    longDescription: "1997'de kurulan Çimstone, İtalyan Breton teknolojisiyle %93 doğal kuvars mineralini yüksek basınç ve vakumla harmanlayarak Türkiye'nin ilk ve en köklü kuvars marka kimliğini oluşturmuştur. Mohs sertlik skalasında 7 değeriyle çizilmeye karşı son derece dirençlidir. Gözeneksiz yapısı bakteri ve mantar üremesini engeller. Mutfak tezgahından banyo bankosuna, ofis çalışma yüzeyinden zemin kaplamasına kadar geniş kullanım alanına sahiptir. Türkiye genelinde yaygın bayi ağı ve hızlı tedarik imkânıyla öne çıkar.",
    materials: ["Kuvars"],
    colorsCount: 32,
    origin: "Yerli",
    tier: "Standart",
    advantages: [
      "Mohs 7 sertlik — çizilmeye karşı üstün direnç",
      "Gözeneksiz yapı — leke tutmaz, hijyenik",
      "Geniş Türkiye bayi & servis ağı",
      "NSF/ANSI gıda güvenliği sertifikası",
      "UV stabilizan katkı — iç mekanda renk değişmez"
    ],
    disadvantages: [
      "Direkt yüksek ısı temasına (200°C+) karşı koruma önerilir",
      "Dış mekan uzun süreli UV maruziyetinde solma riski"
    ],
    maintenance: "Günlük temizlik için ılık su ve birkaç damla bulaşık deterjanıyla ıslatılmış mikrofiber bez yeterlidir. Asit veya çamaşır suyu içermeyen nötr temizleyiciler tercih edilmelidir.",
    websiteUrl: "https://www.cimstone.com",
    colorsUrl: "https://www.cimstone.com/tr/urunler",
    documents: [
      { title: "Çimstone Ürün Kataloğu 2025", size: "—", url: "/catalogs/cimstone-katalog.pdf" },
      { title: "Teknik Bilgi & Garanti Koşulları", size: "—", url: "/catalogs/cimstone-teknik.pdf" }
    ]
  },
  {
    id: "belenco",
    name: "Belenco",
    logo: "B",
    logoSrc: "/logos/belenco.png",
    logoScale: 1.6,
    description: "Ödüllü Türk kuvars markası; gerçekçi mermer damar efektleri ve NSF sertifikalı hijyenik yüzeyler.",
    longDescription: "2008'de İstanbul'da kurulan Belenco, %93 doğal kuvars içeriğiyle üretim yapan Türkiye'nin premium kuvars markasıdır. BREF, HAUS ve SIGNATURE koleksiyonlarıyla geniş bir renk ve doku yelpazesi sunar. Calacatta, Statuario ve Arabescato mermerlerinden ilham alınan damarlı serileri mimari projelerinin gözdesidir. NSF/ANSI 51 Gıda Güvenliği ve Greenguard Gold çevre sertifikalarına sahiptir. Yurt içi ve yurt dışında 40'tan fazla ülkeye ihracat yapmaktadır.",
    materials: ["Kuvars"],
    colorsCount: 45,
    origin: "Yerli",
    tier: "Premium",
    advantages: [
      "Gerçekçi Calacatta ve Statuario mermer görünümlü seriler",
      "NSF/ANSI 51 Gıda Güvenliği & Greenguard Gold sertifikası",
      "Mohs 7 sertlik — yüksek çizilme direnci",
      "Islak alan ve mutfak için antibakteriyel onaylı",
      "40'tan fazla ülkeye ihracat — küresel kalite standardı"
    ],
    disadvantages: [
      "Dış mekanda uzun süreli UV maruziyetinde renk değişimi riski",
      "Bazı açık damarlı desenlerde birleşim noktası hafif görünebilir"
    ],
    maintenance: "pH nötr sıvı deterjan ve ıslak bezle silinir. Çamaşır suyu, asit ve aşındırıcı ovma bezleri kullanılmamalıdır. Güçlü lekeler için Belenco onaylı temizleyici önerilir.",
    websiteUrl: "https://www.belenco.com",
    colorsUrl: "https://www.belenco.com/tr/collection",
    documents: [
      { title: "Belenco Genel Katalog 2025", size: "—", url: "/catalogs/belenco-katalog.pdf" },
      { title: "Bakım & Kullanım Rehberi", size: "—", url: "/catalogs/belenco-bakim.pdf" }
    ]
  },
  {
    id: "coante",
    name: "Coante",
    logo: "C",
    logoSrc: "/logos/coante.png",
    logoScale: 1.6,
    description: "Breton teknolojisiyle üretilen yerli kuvars; derin cila parlaklığı ve fiyat-performans dengesiyle öne çıkan yüzeyler.",
    longDescription: "Coante, İtalyan Breton ekipmanlarıyla üretilen, %93 doğal kuvars içerikli Türk kuvars yüzey markasıdır. İnce damar geçişleri ve yüksek cila parlaklığıyla özellikle modern mutfak ve banyo projelerinde tercih edilir. Düşük gözenek yapısı sayesinde hijyenik ve kolay bakımlıdır. Fiyat-performans dengesinde üst sıralarda yer alır.",
    materials: ["Kuvars"],
    colorsCount: 28,
    origin: "Yerli",
    tier: "Standart",
    advantages: [
      "Yüksek cila parlaklığı ve renk derinliği",
      "Düşük su emme oranı — hijyenik kullanım",
      "Fiyat-performans açısından rekabetçi",
      "Geniş yerli servis ve kesim ağı"
    ],
    disadvantages: [
      "Doğrudan yüksek ısı temasına karşı koruyucu altlık önerilir",
      "Renk koleksiyonu diğer markalara kıyasla daha sınırlı"
    ],
    maintenance: "Krem deterjan içermeyen ıslak bezle günlük silme yeterlidir. Kireç birikintileri için seyreltik sirke yerine kireç çözücü sıvı tercih edilmelidir.",
    documents: [
      { title: "Coante Koleksiyon Kataloğu", size: "—", url: "/catalogs/coante-katalog.pdf" },
      { title: "Teknik Şartname", size: "—", url: "/catalogs/coante-teknik.pdf" }
    ]
  },
  {
    id: "silestone",
    name: "Silestone",
    logo: "S",
    logoSrc: "/logos/silestone.png",
    logoScale: 1.6,
    description: "Cosentino'nun küresel kuvars markası; HybriQ+ teknolojisi, 25 yıl garanti ve 60+ renk koleksiyonu.",
    longDescription: "1990'da İspanya'da kurulan Silestone, Cosentino grubunun amiral gemisi kuvars markasıdır. 2021'de tanıtılan HybriQ+ teknolojisiyle artık %100 yenilenebilir enerji ve %99 geri dönüştürülmüş su kullanılarak üretilmektedir. Klasik Polished'dan dokuya dokunuşlu Suede ve volkanik görünümlü Volcano yüzey seçenekleriyle farklı estetik tercihlere cevap verir. 25 yıllık üretici garantisiyle sektörün en uzun garantisini sunar. Türkiye dahil 110'dan fazla ülkede satılmaktadır.",
    materials: ["Kuvars", "Hibrit Yüzey"],
    colorsCount: 60,
    origin: "Global",
    tier: "Premium",
    advantages: [
      "HybriQ+ — %100 yenilenebilir enerjiyle sürdürülebilir üretim",
      "25 yıl üretici garantisi — sektörün en uzun garantisi",
      "Polished / Suede / Volcano — 3 farklı yüzey dokusu",
      "N-Boost teknolojisi — renkleri daha parlak ve derin gösterir",
      "NSF/ANSI 51 Gıda Güvenliği sertifikası"
    ],
    disadvantages: [
      "Premium fiyat segmentinde yer alır",
      "Yetkili Cosentino ustası ile montaj önerilir"
    ],
    maintenance: "Günlük temizlik için ıslak bez ve hafif bulaşık deterjanı yeterlidir. Cosentino'nun özel Q-Action temizleyicisi derin temizlik için idealdir. Asit ve aşındırıcılardan kaçınılmalıdır.",
    websiteUrl: "https://www.silestone.com/tr",
    colorsUrl: "https://www.silestone.com/tr/renk-koleksiyonu/",
    documents: [
      { title: "Silestone Koleksiyon Kataloğu 2025", size: "—", url: "/catalogs/silestone-katalog.pdf" },
      { title: "HybriQ+ Sürdürülebilirlik Raporu", size: "—", url: "/catalogs/silestone-hybriq.pdf" }
    ]
  },
  {
    id: "dekton",
    name: "Dekton",
    logo: "D",
    logoSrc: "/logos/dekton.png",
    logoScale: 1.6,
    description: "Cosentino'nun ultra kompakt sinterlenmiş yüzeyi; ısı, çizilme ve UV'ye mutlak direnç, iç ve dış mekan mükemmelliği.",
    longDescription: "2013'te piyasaya sürülen Dekton, cam, porselen ve kuvarsın hammaddelerini Cosentino'nun özel TSP (Tecnología de Sinterización de Partículas) yöntemiyle 1.200°C'de birleştirerek üretilir. Sıfır gözenekli ve sıfır su emişli yapısı onu dış cephe, terasa ve profesyonel mutfaklarda benzersiz kılar. 4mm'den 30mm'ye kadar farklı kalınlıklarda üretilir. 600 cm'ye varan uzunluklardaki büyük format plakalarıyla minimum derzli kesintisiz yüzeyler oluşturulabilir.",
    materials: ["Sinterlenmiş Taş", "Ultra Kompakt Yüzey"],
    colorsCount: 55,
    origin: "Global",
    tier: "Premium",
    advantages: [
      "300°C anlık ısıya tam dayanım — sıcak tencere doğrudan konulabilir",
      "Sıfır UV hassasiyeti — dış mekanda hiç solmaz",
      "Asit, leke ve çizilmeye karşı üstün koruma",
      "4mm ince plakadan 30mm kalına geniş kalınlık seçeneği",
      "600 cm uzunluğa kadar büyük format — minimum derz"
    ],
    disadvantages: [
      "Köşe ve kenarlarda keskin darbe kırılma riski",
      "Kesim için özel elmas bıçak ve uzman işçilik gerektirir"
    ],
    maintenance: "Neredeyse hiçbir şey lekeleyemez. Kireç, çamaşır suyu veya asit bazlı ürünler bile yüzeye zarar vermez. Günlük temizlik için ıslak bez yeterlidir.",
    websiteUrl: "https://www.cosentino.com/tr-tr/dekton/",
    colorsUrl: "https://www.cosentino.com/tr-tr/dekton/koleksiyonlari/",
    documents: [
      { title: "Dekton Genel Katalog 2025", size: "—", url: "/catalogs/dekton-katalog.pdf" },
      { title: "Teknik Uygulama Kılavuzu", size: "—", url: "/catalogs/dekton-teknik.pdf" }
    ]
  },
  {
    id: "neolith",
    name: "Neolith",
    logo: "N",
    logoSrc: "/logos/neolith.png",
    logoScale: 1.6,
    description: "Sinterlenmiş taşın mucidi İspanyol marka; doğal mineral içerikli, ultra hafif ve geniş formatlı porselen plakalar.",
    longDescription: "2012'de İspanya'da kurulan The Size Group bünyesindeki Neolith, sinterlenmiş taş kategorisinin öncü markalarından biridir. Feldspat, kuvars, cam ve doğal pigmentlerden oluşan %100 doğal hammadde içeriğiyle reçine ve polimerden tamamen arındırılmıştır. 3200×1500 mm'ye ulaşan büyük format plakaları sayesinde mutfak tezgahı, banyo, duvar ve yer kaplamasında minimum derzli tasarımlar mümkün olur. Silika tozuna minimum maruz kalma özelliğiyle çevre ve işçi sağlığına duyarlı üretim anlayışı öne çıkar.",
    materials: ["Sinterlenmiş Taş", "Porselen"],
    colorsCount: 50,
    origin: "Global",
    tier: "Premium",
    advantages: [
      "%100 doğal mineral — reçine, polimer ve plastik içermez",
      "Düşük silika emisyonu — işçi ve kullanıcı sağlığı için güvenli",
      "3mm'den 20mm'ye geniş kalınlık skalası",
      "UV dayanımlı — dış cephe ve teras için ideal",
      "Yüksek ısı direnci — doğrudan ısı temasına dayanır"
    ],
    disadvantages: [
      "Köşe ve kenarlarda uzman işçilik gerektirir",
      "Büyük format plakalar nakliyede kırılgandır"
    ],
    maintenance: "Sıradan ıslak bezle silinir. Kireç birikintileri için seyreltik asetik asit kullanılabilir. Ağır lekeler için nötr deterjan önerilir.",
    websiteUrl: "https://neolith.com/tr/",
    colorsUrl: "https://neolith.com/tr/koleksiyon/",
    documents: [
      { title: "Neolith Koleksiyon Kataloğu 2025", size: "—", url: "/catalogs/neolith-katalog.pdf" },
      { title: "Teknik Bilgi & Montaj Rehberi", size: "—", url: "/catalogs/neolith-teknik.pdf" }
    ]
  },
  {
    id: "laminam",
    name: "Laminam",
    logo: "L",
    logoSrc: "/logos/laminam.png",
    logoScale: 1.6,
    description: "İtalyan mimari porselen lideri; 3mm ultra ince ve 1620×3240mm dev formatlı plakalarıyla minimum derzli yüzeyler.",
    longDescription: "2001'de İtalya'da kurulan Laminam, ultra ince büyük formatlı porselen plakaların dünya lideridir. 1620×3240 mm'ye ulaşan plaka boyutları ve 3mm'ye inen kalınlığıyla iç mimariye eşsiz esneklik sağlar. Doğal İtalyan mermer ve breş desenleri, beton ve metal efektleri mükemmel hassasiyetle üretilmektedir. Mutfak tezgahının yanı sıra duvar, zemin, dış cephe ve mobilya kaplamada kullanılır. Leed ve Greenguard Gold sertifikalarına sahiptir.",
    materials: ["Porselen", "Seramik"],
    colorsCount: 40,
    origin: "Global",
    tier: "Premium",
    advantages: [
      "3mm ultra ince — mevcut yüzey üzerine uygulama imkânı",
      "1620×3240 mm dev format — neredeyse sıfır derz",
      "İtalyan mermer, breş ve beton serilerinde mükemmel doku replikasyonu",
      "Greenguard Gold & LEED sertifikalı — iç hava kalitesine katkı",
      "Isı, leke ve UV'ye yüksek direnç"
    ],
    disadvantages: [
      "Büyük format nakliye ve taşıma özel ekipman gerektirir",
      "Premium fiyat segmentinde yer alır"
    ],
    maintenance: "pH nötr deterjan ve ıslak bezle kolayca temizlenir. Metalik ve mat yüzeylerde aşındırıcı temizleyici kullanılmamalıdır.",
    websiteUrl: "https://laminam.com/en/",
    colorsUrl: "https://laminam.com/en/products/",
    documents: [
      { title: "Laminam Genel Katalog 2025", size: "—", url: "/catalogs/laminam-katalog.pdf" },
      { title: "Teknik Uygulama Rehberi", size: "—", url: "/catalogs/laminam-teknik.pdf" }
    ]
  },
  {
    id: "corian",
    name: "Corian (DuPont)",
    logo: "Co",
    logoSrc: "/logos/corian.png",
    logoScale: 1.6,
    description: "DuPont'un ikonik akrilik solid surface markası; dikişsiz birleşim, termoform esnekliği ve sahada tamir edilebilirlik.",
    longDescription: "1967'de DuPont tarafından icat edilen Corian, %33 akrilik polimer ve %67 doğal mineral dolgudan oluşur. Isıyla şekillendirilebilir (termoform) yapısı sayesinde kavisli kenarlar, entegre lavabolar ve kesintisiz yüzeyler üretmek mümkündür. Renk, kütlenin tümüne işlendiğinden yüzey çizilse bile zımparalanarak ilk günkü görünümüne kavuşturulabilir. 100'den fazla renk seçeneği ve 3 yüzey dokusuyla (gloss, matte, satin) geniş estetik seçenek sunar. Mutfak dışında sağlık, eğitim ve ticari mobilya sektöründe de yaygın kullanılmaktadır.",
    materials: ["Akrilik / Solid Surface"],
    colorsCount: 100,
    origin: "Global",
    tier: "Premium",
    advantages: [
      "Tam dikişsiz birleşim — ek yeri görünmez",
      "Termoform — kavis, kıvrım ve entegre lavabo tasarımı",
      "Çizilme olursa sahada zımparalanarak tamiri mümkün",
      "Renk kütlenin tümüne işli — yüzey aşınsa bile renk değişmez",
      "100+ renk ve 3 yüzey dokusu (Gloss / Matte / Satin)"
    ],
    disadvantages: [
      "Doğrudan yüksek ısı temasında iz ve deformasyon riski",
      "Sert ve sivri darbelerde çizilme olabilir (kolayca tamir edilse de)"
    ],
    maintenance: "Günlük temizlikte ıslak bez ve birkaç damla bulaşık deterjanı yeterlidir. Mat yüzeylerde Scotch-Brite gibi hafif aşındırıcı süngerle dairesel ovma ile çizikler giderilebilir.",
    websiteUrl: "https://www.corian.com",
    colorsUrl: "https://www.corian.com/en/products/colors",
    documents: [
      { title: "2026 Corian Inspirational Brochure Emea", size: "—", url: "https://www.corian.com.tr/sites/corian.com.tr/IMG/pdf/corian_inspirational_brochure_emea.pdf" },
      { title: "Corian Tasarım & Renk Kataloğu 2025", size: "—", url: "/catalogs/corian-katalog.pdf" },
      { title: "Teknik Uygulama Kılavuzu", size: "—", url: "/catalogs/corian-teknik.pdf" }
    ]
  },
  {
    id: "himacs",
    name: "HI-MACS (LX Hausys)",
    logo: "H",
    logoSrc: "/logos/himacs.png",
    logoScale: 1.6,
    description: "LX Hausys'in akrilik solid surface markası; ışık geçirgen seriler, antibakteriyel yapı ve mükemmel termoform kabiliyeti.",
    longDescription: "Güney Koreli LX Hausys (eski adıyla LG Hausys) tarafından üretilen HI-MACS, %100 gözeneksiz akrilik solid surface yapısıyla Corian ile aynı kategoride yer alır. Dünyada eşi olmayan Alpine White serisiyle birlikte ışığı içinden geçiren yarı şeffaf renk seçenekleri sunar. Isıyla kolayca şekillendirilebilir yapısı; kavisli kenarlar, entegre lavabolar ve organik formlar için idealdir. NSF/ANSI 51 Gıda Güvenliği, Greenguard Gold ve İsviçre Hijyen Enstitüsü sertifikalarına sahiptir.",
    materials: ["Akrilik / Solid Surface"],
    colorsCount: 110,
    origin: "Global",
    tier: "Premium",
    advantages: [
      "Işık geçirgen (translucent) renk seçenekleri — eşsiz iç aydınlatma efekti",
      "NSF, Greenguard Gold & İsviçre Hijyen Enstitüsü sertifikası",
      "%100 gözeneksiz — bakteri ve mantar üremez",
      "Termoform ile kavisli ve organik form tasarımı",
      "Çizilme tamiri sahada zımparayla mümkün"
    ],
    disadvantages: [
      "Sert cisimlerle çizilme riski (doğası gereği yumuşak polimer yüzey)",
      "Doğrudan ısı temasında iz bırakabilir"
    ],
    maintenance: "Günlük kullanımda ıslak bez ve pH nötr deterjan yeterlidir. Çizikler ince Scotch-Brite sünger ile dairesel hareketlerle giderilebilir. Çamaşır suyu ve asit kullanılmamalıdır.",
    websiteUrl: "https://www.himacs.eu",
    colorsUrl: "https://www.himacs.eu/en/colours/",
    documents: [
      { title: "HI-MACS Genel Katalog 2025", size: "—", url: "/catalogs/himacs-katalog.pdf" },
      { title: "Teknik Uygulama & Garanti Rehberi", size: "—", url: "/catalogs/himacs-teknik.pdf" }
    ]
  },
  {
    id: "naturalstone",
    name: "Doğal Taş Koleksiyonu",
    logo: "DT",
    logoSrc: "/logos/naturalstone.png",
    logoScale: 1.6,
    description: "Dünya ocaklarından özenle seçilmiş mermer, kuvarsit, granit ve oniks; her plaka tek ve benzersiz bir sanat eseri.",
    longDescription: "Decoryap Doğal Taş Koleksiyonu, İtalya, Türkiye, Brezilya, Hindistan ve Portekiz başta olmak üzere dünyanın önde gelen mermer ve doğal taş ocaklarından temin edilen özel plakaları bir araya getirir. Calacatta Gold, Statuario Venato ve Arabescato gibi İtalyan mermerlerin yanı sıra Taj Mahal Kuvarsiti, Van Gölü Traverten ve Ege Mermer serilerini bünyesinde barındırır. Her plaka; yüzlerce milyon yıllık jeolojik sürecin ürünü olduğundan renk, damar ve doku açısından tektir. Doğallık ve lüksün doruk noktasını simgeler.",
    materials: ["Mermer", "Granit", "Kuvarsit", "Traverten", "Oniks"],
    colorsCount: 60,
    origin: "Global",
    tier: "Premium",
    advantages: [
      "Her plaka eşsiz — birebir aynı iki plaka yoktur",
      "Milyonlarca yıllık jeolojik sürecin ürünü — doğal lüks",
      "Yüksek yeniden satış değeri — gayrimenkul değer artışına katkı",
      "Geniş menşei seçeneği: İtalya, Türkiye, Brezilya, Hindistan",
      "Zemin, duvar ve tezgah için çok yönlü kullanım"
    ],
    disadvantages: [
      "Asit ve sirke gibi pH düşük maddeler mermer yüzeyini matlaştırabilir",
      "Yılda 1 kez koruyucu emprenye uygulaması gerektirir",
      "Granit ve poroz taşlarda leke emme riski — erken müdahale şart"
    ],
    maintenance: "Yalnızca pH nötr taş sabunu ve yumuşak bezle silinmelidir. Limon suyu, sirke ve asitli ürünlerden kesinlikle kaçınılmalıdır. Yılda bir kez uzman tarafından koruyucu emprenye uygulanması önerilir.",
    documents: [
      { title: "Özel Mermer ve Kuvarsit Koleksiyon Kitabı", size: "35.2 MB" }
    ]
  }
];

export const MATERIAL_CATEGORIES: MaterialCategory[] = [
  {
    id: "kuvars",
    name: "Kuvars (Quartz) Tezgahlar",
    description: "Kuvars mineralinin teknolojiyle birleşimi. Son derece sert, hijyenik ve modern tasarımlı plakalar.",
    longDescription: "Kuvars tezgahlar, yaklaşık %90-93 oranında doğal kuvars kristalinin az miktarda polyester reçine ve pigmentlerle vakum altında preslenmesiyle oluşturulan yapay taş yüzeylerdir. Günümüzde en popüler, en az zahmet gerektiren prestij mutfak tezgahı seçeneğidir.",
    advantages: [
      "Çizilmeye, lekelenmeye ve çatlamaya karşı çok yüksek direnç",
      "Asitli gıdalarla (limon, sirke) reaksiyona girmez, leke bırakmaz",
      "Geniş desen, mermer taklidi damarlı ve düz renk alternatifleri",
      "Gözeneksiz yapısı sayesinde kesinlikle bakteri ve küf barındırmaz"
    ],
    disadvantages: [
      "Çok yüksek ısıya maruz kaldığında içerisindeki reçine yanabilir / lekelenebilir",
      "UV ışınlarına dayanıksız olduğu için dış mekanlarda solma ve sararma yapabilir"
    ],
    averagePrice: "Orta-Yüksek",
    priceDetails: "Metraj, kalınlık, köşe bitiş işçiliği ve seçilen damarlı plakaya (çift plaka eşleştirme / bookmatch) göre fiyatlar değişiklik gösterir.",
    usageAreas: ["Mutfak Tezgahları", "Banyo Bankoları", "Ada Mutfaklar", "Resepsiyon Masaları"],
    relatedBrands: ["cimstone", "belenco", "coante", "silestone"]
  },
  {
    id: "porselen",
    name: "Porselen ve Sintre Taşlar",
    description: "Yüksek sıcaklıkta pişirilmiş cam ve porselen mineralleri. Isıya sıfır hassasiyet, solmayan renkler ve lüks görünüm.",
    longDescription: "Sıkıştırılmış ultra kompakt veya sinterlenmiş porselen yüzeyler, klinker reçine barındırmadan saf doğal minerallerin 1200 derecenin üzerindeki mega fırınlarda yüksek basınçla sinterlenmesi ile üretilir. Açık ve kapalı alanlarda mutlak direnç sağlar.",
    advantages: [
      "Mükemmel sıcaklık ve yüksek ısı dayanımı; fırından çıkan kızgın tencere direkt bırakılabilir",
      "Çizilmelere ve metal darbelere karşı zırh gibi serttir",
      "Tamamen UV dayanıklıdır, açık teras mutfaklarında rengi asla solmaz"
    ],
    disadvantages: [
      "Sert darbelere bağlı köşe ve kenar çıtlaması riski kuvarsa göre yüksektir",
      "Montaj ve kesim işçiliği çok yüksek hassasiyet gerektirdiği için işçilik maliyeti pahalıdır"
    ],
    averagePrice: "Lüks",
    priceDetails: "Porselen plakalar genellikle ithal olmasından ve usta işçiliğinin özel elmas kesiciler gerektirmesinden ötürü en lüks segmenttedir.",
    usageAreas: ["Dış Mekan Teraslar", "Mutfak Tezgahları", "Masa Yüzeyleri", "Şömine Kenarları", "Duvar Panel Kaplamaları"],
    relatedBrands: ["dekton", "neolith", "laminam"]
  },
  {
    id: "akrilik",
    name: "Akrilik / Solid Surface",
    description: "Dikişsiz ve kesintisiz tasarım esnekliği. Kavisli formlar, ışık geçirme özelliği ve yerinde zımparalanarak kolay yenilenme.",
    longDescription: "Akrilik tezgahlar, alüminyum trihidrat (mineral) dolgu maddelerinin akrilik reçinesiyle bağlandığı masif yüzeylerdir. Tasarımcılara hayallerindeki organik geometrileri, dikişsiz lavabo birleşimlerini ve ışıklı duvarları sunar.",
    advantages: [
      "Ek yerleri görünmez, bütünleşmiş ve lavaboyla yekpare tezgahlar kurulabilir",
      "%100 gözeneksizdir, sıvıları asla emmez ve son derece hijyeniktir",
      "Çizilmesi durumunda yerinde küçük bir zımpara makinesiyle sıfır plaka haline getirilebilir"
    ],
    disadvantages: [
      "Isı mukavemeti düşüktür; çok sıcak sigara veya sıcak tava iz bırakıp eritebilir",
      "Sertlik derecesi düşüktür, kuvars veya porselene göre kolay çizilir"
    ],
    averagePrice: "Orta",
    priceDetails: "İthalat bazlı malzeme olmasına rağmen kolay kalıplanması ve işlenmesi nedeniyle toplam proje maliyetlerinde dengeli bir seçenektir.",
    usageAreas: ["Hastane ve Laboratuvarlar (Hijyen)", "Eğrisel Ofis Masaları", "Banyo Tezgahları", "Restoran Bar Bankoları"],
    relatedBrands: ["corian", "himacs"]
  },
  {
    id: "dogaltas",
    name: "Doğal Taş & Mermer",
    description: "Doğanın milyarlarca yıllık imzası. Eşsiz güzellikteki damarlar, prestijli mermerler ve dayanıklı granit grupları.",
    longDescription: "Doğal mermerler kalsit bazlı yumuşak ve asidik sıvılara karşı hassas yapıda iken, doğal granit ve kuvarsitler silis minerali yoğun olduklarından çizilmeye ve lekeye lüks kuvarslara yakın seviyede dayanıklıdır. Her biri eşi olmayan bir sanat eseridir.",
    advantages: [
      "Doğanın getirdiği sıra dışı estetik, zarafet ve benzersiz doku zenginliği",
      "Uzun ömürlü olması ve ev değerini doğrudan artıran bir prestij ögesi olması"
    ],
    disadvantages: [
      "Mermerler asitli sıvılarla (kola, şarap, limon) temas ettiğinde kalıcı aşınma ve leke alır",
      "Yıllık emprenye ve koruyucu sıvı sürülmesi gibi özel bakım ritüelleri gerektirir"
    ],
    averagePrice: "Yüksek",
    priceDetails: "Blok kalitesine, taşın nadirliğine (Örn: Calacatta, Arabescato, Taj Mahal Kuvarsit) göre metrekare fiyatları lüksün de ötesine geçebilir.",
    usageAreas: ["Prestige Konut Mutfakları", "Lobi ve Resepsiyon Duvarları", "Banyo Islak zemin ve Kaplamalar"],
    relatedBrands: ["naturalstone"]
  }
];

export const COUNTERTOP_COLORS: CountertopColor[] = [
  {
    id: "calacatta_gold",
    name: "Calacatta Gold Luxury",
    brand: "Dekton",
    brandId: "dekton",
    materialType: "Porselen",
    colorGroup: "Beyaz",
    effect: "Damarlı",
    finish: "Mat",
    suitability: ["İç mekan", "Dış mekan", "Yoğun Kullanım"],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "statutuario_venato",
    name: "Statuario Venato",
    brand: "Silestone",
    brandId: "silestone",
    materialType: "Kuvars",
    colorGroup: "Beyaz",
    effect: "Damarlı",
    finish: "Parlak",
    suitability: ["İç mekan"],
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "barents_white",
    name: "Barents White",
    brand: "Çimstone",
    brandId: "cimstone",
    materialType: "Kuvars",
    colorGroup: "Beyaz",
    effect: "Düz",
    finish: "Parlak",
    suitability: ["İç mekan"],
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "metropolis_grey",
    name: "Metropolis Grey",
    brand: "Belenco",
    brandId: "belenco",
    materialType: "Kuvars",
    colorGroup: "Gri",
    effect: "Beton",
    finish: "Mat",
    suitability: ["İç mekan"],
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sombre_dark",
    name: "Sombre Dark Concrete",
    brand: "Neolith",
    brandId: "neolith",
    materialType: "Porselen",
    colorGroup: "Siyah",
    effect: "Beton",
    finish: "Mat",
    suitability: ["İç mekan", "Dış mekan", "Yoğun Kullanım"],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "marquina_select",
    name: "Marquina Intense",
    brand: "Laminam",
    brandId: "laminam",
    materialType: "Porselen",
    colorGroup: "Siyah",
    effect: "Damarlı",
    finish: "Parlak",
    suitability: ["İç mekan", "Yoğun Kullanım"],
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "travertine_classico",
    name: "Travertine Classico Warm",
    brand: "Doğal Taş Koleksiyonu",
    brandId: "naturalstone",
    materialType: "Doğal Taş",
    colorGroup: "Bej",
    effect: "Traverten",
    finish: "Mat",
    suitability: ["İç mekan", "Dış mekan"],
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "taj_mahal_quartzite",
    name: "Taj Mahal Premium",
    brand: "Doğal Taş Koleksiyonu",
    brandId: "naturalstone",
    materialType: "Doğal Taş",
    colorGroup: "Bej",
    effect: "Damarlı",
    finish: "İpeksi",
    suitability: ["İç mekan", "Yoğun Kullanım"],
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "aurora_gold",
    name: "Aurora Gold Wave",
    brand: "Coante",
    brandId: "coante",
    materialType: "Kuvars",
    colorGroup: "Bej",
    effect: "Damarlı",
    finish: "Parlak",
    suitability: ["İç mekan"],
    image: "https://images.unsplash.com/photo-1527359395202-74d613d285a9?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "aurora_akrilik",
    name: "Aurora Cream Solid",
    brand: "HI-MACS (LX Hausys)",
    brandId: "himacs",
    materialType: "Akrilik / Solid Surface",
    colorGroup: "Bej",
    effect: "Düz",
    finish: "İpeksi",
    suitability: ["İç mekan"],
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "siberian_glace",
    name: "Siberian Glace Core",
    brand: "Corian (DuPont)",
    brandId: "corian",
    materialType: "Akrilik / Solid Surface",
    colorGroup: "Beyaz",
    effect: "Düz",
    finish: "İpeksi",
    suitability: ["İç mekan"],
    image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sahara_noir_porcelain",
    name: "Sahara Noir Intense",
    brand: "Dekton",
    brandId: "dekton",
    materialType: "Porselen",
    colorGroup: "Siyah",
    effect: "Damarlı",
    finish: "Mat",
    suitability: ["İç mekan", "Dış mekan", "Yoğun Kullanım"],
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80"
  }
];

export const INSPIRATIONS: InspirationProject[] = [
  {
    id: "proj_1",
    title: "Yalı Dairesi Modern Mutfak",
    category: "Mutfak",
    location: "Yeniköy, İstanbul",
    designer: "Studio Sanat Mimarlık",
    materialUsed: "Dekton Calacatta Gold 20mm",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "proj_2",
    title: "Minimalist Villa Islak Hacim",
    category: "Banyo",
    location: "Bodrum, Muğla",
    designer: "Escape From Sofa",
    materialUsed: "HI-MACS Aurora Cream",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "proj_3",
    title: "Lüks Otel Resepsiyon Bankosu",
    category: "Ticari",
    location: "Levent, İstanbul",
    designer: "Metex Design Group",
    materialUsed: "Taj Mahal Premium Kuvarsit",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "proj_4",
    title: "Michelin Yıldızlı Restoran Barı",
    category: "Ticari",
    location: "Nişantaşı, İstanbul",
    designer: "Yalın Tan + Partners",
    materialUsed: "Laminam Marquina Plaka",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "proj_5",
    title: "Gastronomi Adası & Mutfak",
    category: "Mutfak",
    location: "Çeşme, İzmir",
    designer: "Ayşe Özdemir İç Mimarlık",
    materialUsed: "Belenco White Glamour",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "proj_6",
    title: "Custom Monolitik Konsol Masa",
    category: "Özel Tasarım",
    location: "Bebek, İstanbul",
    designer: "Esra Kazmirci İç Mimarlık",
    materialUsed: "Corian DuPont Arctic Ice",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80"
  }
];

export const TECHNICAL_COMPARISONS: TechSpecComparison[] = [
  {
    material: "Kuvars (Quartz)",
    durability: 4,
    stainResistance: 5,
    heatResistance: 3,
    maintenanceEase: 5,
    outdoorSuitability: false,
    priceLevel: "₺₺ - ₺₺₺",
    visualImpact: "Modern ve Homojen damarlar, parıltılı lüks dokular.",
    recommendedUse: "Yoğun aile mutfakları, iç mekan banyolar, ticari bankolar."
  },
  {
    material: "Porselen & Sintre Taş",
    durability: 5,
    stainResistance: 5,
    heatResistance: 5,
    maintenanceEase: 5,
    outdoorSuitability: true,
    priceLevel: "₺₺₺₺ - ₺₺₺₺₺",
    visualImpact: "Sıra dışı matlık ve derin, pürüzsüz mermer/beton replikası.",
    recommendedUse: "Premium dış mekan barbekü tezgahları, lüks şömineler, fırın yanı tezgahlar."
  },
  {
    material: "Akrilik (Solid Surface)",
    durability: 3,
    stainResistance: 4,
    heatResistance: 2,
    maintenanceEase: 4,
    outdoorSuitability: false,
    priceLevel: "₺₺ - ₺₺₺",
    visualImpact: "%100 birleşimsiz akışkan dalgalı 3D kıvrımlar, yarı saydam ışıklılık.",
    recommendedUse: "Eğrisel resepsiyon masaları, yekpare banyo lavaboları, hijyenik hastane labları."
  },
  {
    material: "Mermer & Doğal Kuvarsit",
    durability: 3,
    stainResistance: 2,
    heatResistance: 4,
    maintenanceEase: 2,
    outdoorSuitability: true,
    priceLevel: "₺₺₺ - ₺₺₺₺₺",
    visualImpact: "Eşsiz doğallık, her plakada farklılaşan dramatik damar sanatı.",
    recommendedUse: "Düşük sirkülasyonlu ıslak hacimler, sunum adaları, prestij kurguları."
  }
];
