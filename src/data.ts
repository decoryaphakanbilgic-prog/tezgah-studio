export interface Brand {
  id: string;
  name: string;
  logo: string; // Will use a luxurious text-symbol placeholder or premium SVG
  description: string;
  longDescription: string;
  materials: string[];
  colorsCount: number;
  origin: "Yerli" | "Global";
  tier: "Premium" | "Standart";
  advantages: string[];
  disadvantages: string[];
  maintenance: string;
  documents: { title: string; size: string }[];
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
    description: "Kuvars esaslı kompoze taş teknolojisinin Türkiye'deki öncüsü, yüksek aşınma dirençli lüks yüzeyler.",
    longDescription: "İtalyan Breton teknolojisiyle üretilen Çimstone, kuvars mineralini yüksek teknolojiyle harmanlayarak gözeneksiz, hijyenik ve aşınmaya karşı son derece dayanıklı yüzeyler sunar. Türkiye'nin ve dünyanın en seçkin projelerinde mutfak tezgahı, banyo bankosu ve zemin kaplaması olarak tercih edilmektedir.",
    materials: ["Kuvars", "Yerleşik Taş"],
    colorsCount: 32,
    origin: "Yerli",
    tier: "Standart",
    advantages: ["Çizilmelere karşı olağanüstü direnç", "Leke tutmayan gözeneksiz doku", "Geniş yerli bayi ve tedarik ağı"],
    disadvantages: ["Çok aşırı yüksek sıcaklıklarda direkt temas önerilmez", "Dış mekan güneş ışığına (UV) hassastır"],
    maintenance: "Sadece ılık su, sabun ve mikrofiber bezle kolayca temizlenir. Asitli ağır kimyasallara gerek duymaz.",
    documents: [
      { title: "Çimstone Ürün Kataloğu 2026", size: "14.2 MB" },
      { title: "Teknik Bilgi Föyü & Garanti Koşulları", size: "2.4 MB" }
    ]
  },
  {
    id: "belenco",
    name: "Belenco",
    logo: "B",
    description: "Doğal kuvarsın mucizevi özelliklerini sanatsal tasarımlarla birleştiren ödüllü kuvars yüzeyler.",
    longDescription: "Belenco, doğanın en sert yarı değerli minerallerinden kuvarstan ilham alan, çağdaş yaşam alanları için üstün kaliteli kuvars yüzeyler tasarlar. Trend yaratan renk koleksiyonları ve gerçekçi mermer damar efektleri ile premium projelerin vazgeçilmezidir.",
    materials: ["Kuvars"],
    colorsCount: 45,
    origin: "Yerli",
    tier: "Premium",
    advantages: ["Yüksek darbe ve darbe dayanıklılığı", "Lüks damarlı mermer görünümleri", "Uluslararası hijyen sertifikaları (NSF)"],
    disadvantages: ["Ultraviyole (UV) ışınlarına karşı dış mekanda renk değişebilir", "Dikiş/ek yeri birleşimleri bazı desenlerde hafif belli olabilir"],
    maintenance: "pH nötr temizleyiciler kullanılması önerilir. Ağartıcı ve aşındırıcı toz deterjanlardan uzak durulmalıdır.",
    documents: [
      { title: "Belenco Trend & Tasarım Kitabı", size: "18.6 MB" },
      { title: "Kullanım ve Koruma Rehberi", size: "1.8 MB" }
    ]
  },
  {
    id: "coante",
    name: "Coante",
    logo: "C",
    description: "En gelişmiş Breton teknolojisiyle donatılmış, yüksek estetik standartlara sahip yeni nesil kuvars plakalar.",
    longDescription: "Coante, dünyanın en gelişmiş Breton teknolojisini kullanarak doğal kuvarsı estetik çizgiyle harmanlar. İnce damar geçişleri ve derinlik hissi veren yüzey tasarımlarıyla modern mutfaklarda sanatsal bir dokunuş sunar.",
    materials: ["Kuvars"],
    colorsCount: 28,
    origin: "Yerli",
    tier: "Standart",
    advantages: ["Mükemmel cila parlaklığı ve derinlik", "Düşük su emme oranı ile yüksek hijyen", "Fiyat-performans dengesi"],
    disadvantages: ["Direkt ısıtılmış döküm tencerelere karşı koruma plakası gerektirir"],
    maintenance: "Yumuşak bez ve krem içermeyen sıvı temizleyicilerle günde bir kere silmek ilk günkü parlaklığı korur.",
    documents: [
      { title: "Coante Koleksiyon Kataloğu", size: "12.1 MB" },
      { title: "Teknik Şartname ve Detaylar", size: "3.2 MB" }
    ]
  },
  {
    id: "silestone",
    name: "Silestone",
    logo: "S",
    description: "Cosentino'nun dünya devi kuvars markası; HybriQ teknolojisiyle sürdürülebilir, inovatif ve renkli.",
    longDescription: "İspanyol Cosentino grubu tarafından üretilen Silestone, %100 yenilenebilir elektrik ve %99 geri dönüştürülmüş su içeren inovatif HybriQ+ teknolojisi ile üretilir. Hibrit mineral ve mineral dışı bileşen formülüyle üst düzey mekanlar yaratır.",
    materials: ["Kuvars", "Hibrit Yüzey"],
    colorsCount: 60,
    origin: "Global",
    tier: "Premium",
    advantages: ["HybriQ+ ile ultra düşük silika ve sürdürülebilirlik", "Geniş kalınlık ve doku seçenekleri (Suede, Polished, Volcano)", "25 yıla kadar üretici garantisi"],
    disadvantages: ["Yüksek fiyat grubu", "Yetkili usta sertifikasyonu gerektirir"],
    maintenance: "Silestone temizliği son derece pratiktir. Q-Action temizleyici veya hafif bulaşık deterjanları önerilir.",
    documents: [
      { title: "Silestone Global Koleksiyon 2026", size: "22.4 MB" },
      { title: "HybriQ Teknolojisi Sürdürülebilirlik Raporu", size: "5.1 MB" }
    ]
  },
  {
    id: "dekton",
    name: "Dekton",
    logo: "D",
    description: "Cosentino'nun ultra kompakt sintre porselen yüzeyi. Isıya, çizilmeye ve UV ışınlarına mutlak direnç.",
    longDescription: "Dekton, cam, porselen ve kuvars yüzeylerin yapımında kullanılan hammaddelerin sofistike bir karışımıdır. Özel TSP (Sinterlenmiş Parçacık Teknolojisi) ile üretilir. Sınırsız mimari özgürlük, sıfır gözeneklilik ve üstün dış mekan performansı sunar.",
    materials: ["Porselen", "Dekton / Sintered Stone"],
    colorsCount: 55,
    origin: "Global",
    tier: "Premium",
    advantages: ["Ateşe ve yüksek ısıya tam dayanım (sıcak tencere konabilir)", "Sıfır UV hassasiyeti (asla solmaz, dış mekana mükemmel)", "Leke, asit ve darbelere karşı tam koruma"],
    disadvantages: ["Sert darbelere bağlı köşe kırılması hassasiyeti", "Kesim ve montaj için özel yüksek teknoloji elmas bıçaklar gerektirir"],
    maintenance: "Zorlu lekeler dahil hiçbir şey lekeleyemez. Çamaşır suyu veya asitli temizleyiciler bile yüzeye zarar vermez.",
    documents: [
      { title: "Dekton Mimari ve İç Mekan Fırsatları", size: "28.3 MB" },
      { title: "Uygulama ve Teknik Kesim Kılavuzu", size: "9.7 MB" }
    ]
  },
  {
    id: "neolith",
    name: "Neolith",
    logo: "N",
    description: "Doğal minerallerin yüksek basınç ve sıcaklıkta fırınlanmasıyla elde edilen olağanüstü hafif porselen.",
    longDescription: "Sinterlenmiş taş kategorisinin mucitlerinden Neolith, sürdürülebilir yöntemlerle üretilen geniş formatlı porselen plakaları ile bilinir. Mutfaklardan cephe kaplamalarına kadar lüks mimarinin tüm ihtiyaçlarına cevap verir.",
    materials: ["Porselen", "Seramik Yüzeyler"],
    colorsCount: 50,
    origin: "Global",
    tier: "Premium",
    advantages: ["Tamamen doğal bileşenler, reçinesiz üretim", "Yüksek ısı direnci ve mutlak yanmazlık", "Çok hafif ve ince kalınlık alternatifleri (3mm, 6mm, 12mm, 20mm)"],
    disadvantages: ["Köşe detaylarında uzman işçilik gereksinimi", "Plaka kenar darbe hassasiyeti"],
    maintenance: "Nemli bez ve sirke gibi organik asitler ya da standart deterjanlarla anında temizlenir.",
    documents: [
      { title: "Neolith Master Katalog", size: "31.5 MB" },
      { title: "Kurulum ve Derz Detayları", size: "4.5 MB" }
    ]
  },
  {
    id: "laminam",
    name: "Laminam",
    logo: "L",
    description: "İtalyan estetiğini devasa plakalarla buluşturan, mimari tasarımın öncüsü porselen kaplama lideri.",
    longDescription: "İtalya'da üretilen Laminam, geniş yüzeyleri mimari ve iç tasarım dünyasına armağan eder. Çok yönlülük, üst düzey dayanıklılık ve benzersiz İtalyan mermer replikasyonları sunmaktadır.",
    materials: ["Porselen", "Seramik Yüzeyler"],
    colorsCount: 40,
    origin: "Global",
    tier: "Premium",
    advantages: ["Sıra dışı İtari mermer ve beton dokuları", "Büyük boy plaka ölçüleri sayesinde minimum derz", "Dış cephe ve ıslak hacimler için ideal"],
    disadvantages: ["Maliyetlidir", "Nakliye ve taşıma uzmanlık gerektirir"],
    maintenance: "Hafif deterjanlarla temizlenmesi, metalik serilerde aşındırıcı ped kullanılmaması önerilir.",
    documents: [
      { title: "Laminam İtalyan Yüzeyler Koleksiyonu", size: "24.1 MB" }
    ]
  },
  {
    id: "corian",
    name: "Corian (DuPont)",
    logo: "Co",
    description: "DuPont'un akrilik katı yüzeyi. Ek yeri belli olmayan, kavisli ve organik tasarımlar için tek seçenek.",
    longDescription: "DuPont firmasının tescilli markası Corian, akrilik reçine ve doğal minerallerden oluşur. Termoform (ısı ile şekillenme) özelliği sayesinde kıvrımlı, yekpare, kendinden lavabolu tezgahlar tasarlanmasına olanak sağlar. Ek yeri asla belli olmaz.",
    materials: ["Akrilik / Solid Surface"],
    colorsCount: 48,
    origin: "Global",
    tier: "Premium",
    advantages: ["Tamamen ek yersiz, dikişsiz birleşimler", "Isıyla istenen her şekle girebilme", "Çizilirse yerinde zımparalanıp sıfır gibi tamir edilebilme"],
    disadvantages: ["Sıcak tencerelerle temasta erime yapabilir (ısı direnci düşüktür)", "Bıçak darbeleri ile nispeten kolay çizilir (kolay tamir edilse de)"],
    maintenance: "Dairesel hareketlerle ovulabilir, mat yüzeyler ince aşındırıcı bezlerle (Scotch-brite vb.) çiziklerinden arındırılabilir.",
    documents: [
      { title: "Corian Solid Surface Tasarım El Kitabı", size: "15.7 MB" },
      { title: "Renk ve Transparanlık Rehberi", size: "6.3 MB" }
    ]
  },
  {
    id: "himacs",
    name: "HI-MACS (LX Hausys)",
    logo: "H",
    description: "LX Hausys kalitesiyle esnek formlar, ışık geçirgen desenler ve hijyenik akrilik solid surface kaplamalar.",
    longDescription: "Eski adıyla LG Hausys, yeni adıyla LX Hausys üretimi olan HI-MACS, akrilik doğallığını modern polimer teknolojisiyle birleştirir. Işığı geçiren transparan renkleri ve mükemmel termoform mimarisi ile geleceğin tezgah tasarımlarını kurar.",
    materials: ["Akrilik / Solid Surface"],
    colorsCount: 42,
    origin: "Global",
    tier: "Premium",
    advantages: ["Yumuşacık ipeksi dokunuş hissi", "%100 gözeneksiz ve bakterisiz antibakteriyel yapı", "Zengin 3D kıvrım tasarımı yeteneği"],
    disadvantages: ["Yumuşak yüzey sertliği, sert cisimlerle kolayca çizilebilir"],
    maintenance: "Krem deterjan ve mikrofiber bez ile hafifçe dairesel silinerek tüm lekeler arındırılır.",
    documents: [
      { title: "LX HI-MACS Genel Kataloğu", size: "20.9 MB" },
      { title: "Termoform Şekillendirme Detayları", size: "4.1 MB" }
    ]
  },
  {
    id: "naturalstone",
    name: "Doğal Taş Koleksiyonu",
    logo: "DT",
    description: "Mermer, kuvarsit ve granitlerin zamansız şıklığı. Her plakası doğa tarafından tasarlanmış tek ve benzersiz tablolar.",
    longDescription: "Doğal Taş Koleksiyonu, dünyanın çeşitli ocaklarından çıkarılan en lüks mermer, granit, kuvarsit, traverten ve oniks plakalarını bir araya getirir. Teknoloji ile değil, milyonlarca yıllık jeolojik süreçlerle üretilmiş eşsiz sanat eserleridir.",
    materials: ["Mermer", "Granit", "Doğal Taş"],
    colorsCount: 50,
    origin: "Global",
    tier: "Premium",
    advantages: ["Benzersiz lüks ve prestijli görünüm", "Zamana meydan okuyan derin ve doğal kristalli doku", "Tekrarı olmayan damar dünyası"],
    disadvantages: ["Limon, sirke gibi asitlerle lekelenir ve matlaşır (mermer için)", "Periyodik olarak koruyucu cila/emprenye uygulaması gerektirir"],
    maintenance: "Kesinlikle kimyasal içermeyen sadece saf su bazlı taş sabunları ile silinmelidir. Yılda 1 koruyucu solvent sürülmelidir.",
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
