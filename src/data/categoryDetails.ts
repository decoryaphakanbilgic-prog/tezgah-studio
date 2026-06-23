export interface ColorSample {
  name: string;
  image: string;
  code?: string;
  finish?: string;
}

export interface BrandDetail {
  id: string;
  name: string;
  origin: string;
  tagline: string;
  description: string;
  logo?: string;
  colors: ColorSample[];
  brochureUrl?: string;
  websiteUrl?: string;
}

export interface CategoryDetail {
  id: string;
  title: string;
  subtitle: string;
  heroImage: string;
  description: string;
  longDescription: string;
  priceRange: string;
  durability: number;
  heatResistance: number;
  maintenance: string;
  idealFor: string[];
  keyFeatures: { title: string; desc: string }[];
  brands: BrandDetail[];
}

export const CATEGORY_DETAILS: Record<string, CategoryDetail> = {
  'dogal-tas': {
    id: 'dogal-tas',
    title: 'Doğal Taş Tezgahlar',
    subtitle: 'Doğanın eşsiz güzelliği, milyonlarca yılın sanatı',
    heroImage: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85',
    description: 'Mermer, granit, kuvarsit ve oniks gibi doğal taşlar; her biri benzersiz desen ve renk özelliğiyle mutfak ve banyolara doğanın ruhunu taşır.',
    longDescription: 'Doğal taş tezgahlar, milyonlarca yıl boyunca doğanın yarattığı eşsiz desenleri evinize taşır. Her levha dünyada bir teki olan bir sanat eseridir. Mermerden granit\'e, kuvarsit\'ten oniks\'e kadar geniş bir yelpazede sunduğumuz doğal taş tezgahlar; hem estetik hem de dayanıklılık açısından üstün özellikler sunar.',
    priceRange: '₺₺₺ — ₺₺₺₺₺',
    durability: 4,
    heatResistance: 5,
    maintenance: 'Yıllık taş bakım ürünü uygulanması önerilir. Asitli temizleyicilerden kaçının.',
    idealFor: ['Lüks mutfaklar', 'Banyo tezgahları', 'Özel villa projeleri', 'Butik otel lobi'],
    keyFeatures: [
      { title: 'Her Taş Benzersiz', desc: 'Doğal oluşum sürecinde elde edilen eşsiz desen, renk ve damarlar — hiçbir levha diğeriyle aynı değildir.' },
      { title: 'Isı Direnci Yüksek', desc: 'Sıcak tava ve tencere direnci mükemmeldir. Özellikle granit extreme ısıya karşı dayanıklıdır.' },
      { title: 'Ömür Boyu Dayanıklılık', desc: 'Düzgün bakımda onlarca yıl ilk günkü görünümünü korur. Nesillere aktarılabilir.' },
      { title: 'Değer Katan Yatırım', desc: 'Doğal taş tezgahlar evin satış değerini artırır. Lüks segment alıcılar için öncelikli tercih.' },
      { title: 'Profesyonel Bakım', desc: 'Yıllık cilalama ve sealant uygulaması ile leke ve çizik direnci arttırılabilir.' },
      { title: 'Geniş Çeşitlilik', desc: 'Mermer, granit, kuvarsit, oniks, traverten ve daha fazlası. Her zevke ve bütçeye uygun seçenek.' },
    ],
    brands: [
      {
        id: 'carrara-mermer',
        name: 'Carrara & İtalyan Mermer',
        origin: 'İtalya',
        tagline: 'Rönesans\'tan gelen zarafet',
        description: 'Dünyaca ünlü İtalyan mermer ocaklarından ithal edilen Carrara, Calacatta ve Statuario mermerleri. Narin damarları ve saf beyazıyla mutfaklara sanatsallık katıyor.',
        colors: [
          { name: 'Carrara Bianco', image: 'https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?auto=format&fit=crop&w=400&q=80', finish: 'Parlak / Mat' },
          { name: 'Calacatta Gold', image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=400&q=80', finish: 'Parlak' },
          { name: 'Statuario Venato', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80', finish: 'Parlak / Honed' },
          { name: 'Nero Marquina', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80', finish: 'Parlak' },
          { name: 'Emperador Dark', image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=400&q=80', finish: 'Parlak / Mat' },
          { name: 'Botticino Classico', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', finish: 'Parlak' },
        ],
        brochureUrl: '#',
        websiteUrl: '#',
      },
      {
        id: 'türk-mermeri',
        name: 'Türk Mermerleri',
        origin: 'Türkiye',
        tagline: 'Afyon\'dan Marmara\'ya yerli güzellik',
        description: 'Afyon beyazı, Bilecik beige, Marmara ereğlisi ve daha fazlası. Türkiye\'nin dünya standartlarındaki mermer rezervlerinden elde edilen seçkin taşlar.',
        colors: [
          { name: 'Afyon Beyazı', image: 'https://images.unsplash.com/photo-1573408259280-f6ad3163e1e1?auto=format&fit=crop&w=400&q=80', finish: 'Parlak' },
          { name: 'Bilecik Beige', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&q=80', finish: 'Parlak / Honed' },
          { name: 'Marmara White', image: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?auto=format&fit=crop&w=400&q=80', finish: 'Parlak' },
          { name: 'Denizli Travertine', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=400&q=80', finish: 'Honed / Filled' },
        ],
        brochureUrl: '#',
      },
      {
        id: 'granit',
        name: 'Granit Koleksiyonu',
        origin: 'Brezilya / Hindistan / İtalya',
        tagline: 'Sertlik ve estetik bir arada',
        description: 'Granit, doğal taşlar arasında en sert ve en dayanıklı olanıdır. Çizilmeye ve ısıya karşı üstün direnciyle mutfak tezgahlarının en popüler seçeneğidir.',
        colors: [
          { name: 'Absolute Black', image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=400&q=80', finish: 'Parlak / Leather' },
          { name: 'Kashmir White', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400&q=80', finish: 'Parlak' },
          { name: 'Bianco Antico', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', finish: 'Parlak' },
          { name: 'Tan Brown', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=80', finish: 'Parlak / Mat' },
          { name: 'Blue Pearl', image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=400&q=80', finish: 'Parlak' },
          { name: 'Giallo Veneziano', image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=400&q=80', finish: 'Parlak' },
        ],
        brochureUrl: '#',
      },
    ],
  },

  'kuvars': {
    id: 'kuvars',
    title: 'Kuvars Tezgahlar',
    subtitle: 'Mühendislik harikası, pratik lüks',
    heroImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=85',
    description: '%93+ doğal kuvars kristalinden üretilen kompozit tezgahlar; doğal taşın güzelliğini, modern teknolojinin dayanıklılığıyla birleştirir.',
    longDescription: 'Kuvars tezgahlar, doğal kuvars mineralinin reçine bağlayıcılarla birleştirilerek üretilmesiyle elde edilir. Bu mühendislik ürünü; doğal taşın estetiğini, bakım kolaylığı ve tutarlı görünümle birleştirerek günümüzün en çok tercih edilen tezgah malzemesi haline gelmiştir. Leke tutmaması, çizilmeye dayanıklılığı ve geniş renk seçenekleriyle öne çıkar.',
    priceRange: '₺₺₺ — ₺₺₺₺',
    durability: 5,
    heatResistance: 3,
    maintenance: 'Sealing gerektirmez. Hafif sabunlu su ile temizlenir. Çok kolay bakım.',
    idealFor: ['Yoğun kullanımlı mutfaklar', 'Aile evleri', 'Restoran mutfakları', 'Ofis mutfakları'],
    keyFeatures: [
      { title: 'Sealing Gerektirmez', desc: 'Gözeneksiz yapısı sayesinde leke tutmaz, yıllık bakım uygulaması gerekmez.' },
      { title: 'Tutarlı Desen', desc: 'Büyük projelerde tüm levhalar aynı desene sahip olur. Doğal taşta bulunmayan bir avantaj.' },
      { title: 'Antibakteriyel', desc: 'Gözeneksiz yapı, bakteri ve mikrop üremesini engeller. Mutfak hijyeni için ideal.' },
      { title: 'Çizilmeye Dayanıklı', desc: 'Mohs sertlik ölçeğinde 7+ değeriyle bıçak ve çizilmeye karşı üstün direnç.' },
      { title: 'Geniş Renk Paleti', desc: 'Doğal taş desenlerinden modern uni renklere kadar 100\'ü aşkın renk seçeneği.' },
      { title: 'Uzun Ömürlü Garanti', desc: 'Önde gelen markalar 10-25 yıl ürün garantisi sunuyor.' },
    ],
    brands: [
      {
        id: 'cimstone',
        name: 'Çimstone',
        origin: 'Türkiye',
        tagline: 'Türkiye\'nin öncü kuvars markası',
        description: '2002\'den bu yana Türkiye\'nin lider kuvars tezgah üreticisi. %93 doğal kuvars içeriğiyle üretilen Çimstone; 200\'ü aşkın renk seçeneği ve güçlü yerel servis ağıyla rakipsiz.',
        colors: [
          { name: 'Bianco Carrara', code: 'CS-1141', image: 'https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?auto=format&fit=crop&w=400&q=80', finish: 'Parlak / Mat' },
          { name: 'Calacatta Extra', code: 'CS-1145', image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=400&q=80', finish: 'Parlak' },
          { name: 'Emprador', code: 'CS-9231', image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=400&q=80', finish: 'Parlak' },
          { name: 'Absolute Nero', code: 'CS-8010', image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=400&q=80', finish: 'Parlak / Mat' },
          { name: 'Pearl Grey', code: 'CS-4060', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400&q=80', finish: 'Mat' },
          { name: 'Concrete Ash', code: 'CS-7320', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=400&q=80', finish: 'Mat' },
        ],
        brochureUrl: '#',
        websiteUrl: 'https://www.cimstone.com.tr',
      },
      {
        id: 'belenco',
        name: 'Belenco',
        origin: 'Türkiye',
        tagline: 'Lüks koleksiyonlar, yerli üretim',
        description: 'Türkiye\'nin prestijli kuvars markası Belenco, İtalyan estetik anlayışını yerli üretimle buluşturur. Özellikle Statuario ve Calacatta serileri mimarlık dünyasında büyük ilgi görüyor.',
        colors: [
          { name: 'Statuario Maximus', code: 'BL-1001', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80', finish: 'Parlak' },
          { name: 'Calacatta Viola', code: 'BL-1008', image: 'https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?auto=format&fit=crop&w=400&q=80', finish: 'Parlak' },
          { name: 'Mont Blanc', code: 'BL-2001', image: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?auto=format&fit=crop&w=400&q=80', finish: 'Parlak / Mat' },
          { name: 'Midnight Black', code: 'BL-9001', image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=400&q=80', finish: 'Parlak' },
          { name: 'Dove Grey', code: 'BL-5510', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&q=80', finish: 'Mat' },
        ],
        brochureUrl: '#',
        websiteUrl: 'https://www.belenco.com',
      },
      {
        id: 'silestone',
        name: 'Silestone',
        origin: 'İspanya',
        tagline: 'Dünyanın 1 numaralı kuvars markası',
        description: 'İspanyol Cosentino grubunun kuvars markası Silestone, dünya genelinde 1 numaralı satıcı konumunda. HybriQ teknolojisi ile %20 daha az su ve enerji tüketimini sürdürülebilir üretimle birleştiriyor.',
        colors: [
          { name: 'White Arabesque', code: 'SL-4141', image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=400&q=80', finish: 'Suede / Parlak' },
          { name: 'Eternal Calacatta Gold', code: 'SL-4200', image: 'https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?auto=format&fit=crop&w=400&q=80', finish: 'Parlak' },
          { name: 'Iconic Black', code: 'SL-N-700', image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=400&q=80', finish: 'Lappato' },
          { name: 'Pulsar', code: 'SL-4236', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=80', finish: 'Suede' },
          { name: 'Ocean Storm', code: 'SL-5210', image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=400&q=80', finish: 'Parlak' },
          { name: 'Cala Veil', code: 'SL-4350', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80', finish: 'Parlak' },
        ],
        brochureUrl: '#',
        websiteUrl: 'https://www.silestone.com',
      },
      {
        id: 'caesarstone',
        name: 'Caesarstone',
        origin: 'İsrail',
        tagline: 'Kuvars tezgahın öncüsü',
        description: '1987\'den bu yana kuvars tezgah sektörünün öncüsü olan Caesarstone, 40\'ı aşkın ülkede satış yapıyor. Chromica ve Supernatural serileri mimari projelerin gözdesi.',
        colors: [
          { name: 'Statuario Maximus', code: 'CS-5143', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80', finish: 'Parlak' },
          { name: 'Empira White', code: 'CS-5141', image: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?auto=format&fit=crop&w=400&q=80', finish: 'Parlak' },
          { name: 'Rugged Concrete', code: 'CS-4033', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=400&q=80', finish: 'Mat' },
          { name: 'Turbine Grey', code: 'CS-4001', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400&q=80', finish: 'Mat' },
        ],
        brochureUrl: '#',
        websiteUrl: 'https://www.caesarstone.com',
      },
    ],
  },

  'porselen': {
    id: 'porselen',
    title: 'Porselen & Seramik Tezgahlar',
    subtitle: 'Ultra-kompakt levhalar, sınırsız mimari özgürlük',
    heroImage: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=1600&q=85',
    description: 'Dekton, Neolith ve Laminam gibi ultra-kompakt porselen yüzeyler; ısı, çizik ve UV ışınlarına karşı mutlak direnç sunar.',
    longDescription: 'Porselen ve seramik tezgahlar, yüksek basınç ve sıcaklık altında sinterize edilen ultra-kompakt levhalar olarak üretilir. Doğal taş ve kuvarsın ötesine geçen bu malzemeler; 300°C üzeri ısıya, güçlü kimyasallara ve UV ışınlarına karşı dayanıklılığıyla özellikle açık alan (teras, balkon) mutfak projeleri için mükemmel seçenektir.',
    priceRange: '₺₺₺₺ — ₺₺₺₺₺',
    durability: 5,
    heatResistance: 5,
    maintenance: 'Çok kolay. Güçlü kimyasallarla bile temizlenebilir. Tamamen gözeneksiz.',
    idealFor: ['Açık alan mutfaklar', 'Mimari projeler', 'Ticari mutfaklar', 'Lüks otel projeleri'],
    keyFeatures: [
      { title: '300°C Isı Direnci', desc: 'Sıcak tava ve fırın tepsilerini direkt koyabilirsiniz. Renk veya doku değişimi olmaz.' },
      { title: 'UV Dayanıklı', desc: 'Açık alan ve balkon mutfakları için ideal. Güneş ışığında renk atmaz.' },
      { title: 'Kimyasal Direnci', desc: 'Güçlü asit ve bazlarla temizlenebilir. Endüstriyel mutfak kalitesi.' },
      { title: 'İnce & Hafif Levhalar', desc: '6mm\'den başlayan inceliğiyle mevcut yüzeylerin üzerine uygulanabilir. Tadilat kolaylığı.' },
      { title: 'Büyük Format', desc: '3200x1500mm\'ye kadar kesintisiz büyük levhalar. Fugasız görünüm imkânı.' },
      { title: 'Sonsuz Tasarım', desc: 'Tahta, beton, metal, taş imitasyonu dahil sınırsız desen seçeneği.' },
    ],
    brands: [
      {
        id: 'dekton',
        name: 'Dekton by Cosentino',
        origin: 'İspanya',
        tagline: 'Ultra-kompakt yüzeyin lideri',
        description: 'Cosentino\'nun ultra-kompakt yüzey markası Dekton, cam, porselen ve kuvarsın 20 yılı aşkın özelliklerini tek bir malzemede birleştirir. TSP (Teknolojik Sinterizasyon Süreci) ile üretilir.',
        colors: [
          { name: 'Blanc Concrete', code: 'DK-BLC', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=400&q=80', finish: 'Mat' },
          { name: 'Bergen', code: 'DK-BRG', image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=400&q=80', finish: 'Mat' },
          { name: 'Khalo', code: 'DK-KHL', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80', finish: 'Polished' },
          { name: 'Rem', code: 'DK-REM', image: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?auto=format&fit=crop&w=400&q=80', finish: 'Mat' },
          { name: 'Slim 4', code: 'DK-SL4', image: 'https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?auto=format&fit=crop&w=400&q=80', finish: 'Polished' },
          { name: 'Laurent', code: 'DK-LRT', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80', finish: 'Mat' },
        ],
        brochureUrl: '#',
        websiteUrl: 'https://www.dekton.com',
      },
      {
        id: 'laminam',
        name: 'Laminam',
        origin: 'İtalya',
        tagline: 'İtalyan inceliği, sonsuz büyüklük',
        description: 'Modena\'da üretilen Laminam, dünyanın en ince seramik levhalarını sunar. 3mm kalınlıkta 3200x1500mm boyutlarında üretilebilen Laminam; mimarlık projelerinin vazgeçilmezi.',
        colors: [
          { name: 'Ardesia Antracite', code: 'LM-ARD', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=80', finish: 'Naturale' },
          { name: 'Calce Bianco', code: 'LM-CLB', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&q=80', finish: 'Naturale' },
          { name: 'Marmo Statuario', code: 'LM-MRS', image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=400&q=80', finish: 'Lucidato' },
          { name: 'Oxide Nero', code: 'LM-OXN', image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=400&q=80', finish: 'Strutturato' },
        ],
        brochureUrl: '#',
        websiteUrl: 'https://www.laminam.it',
      },
      {
        id: 'neolith',
        name: 'Neolith',
        origin: 'İspanya',
        tagline: 'Doğanın derinliklerinden esinlenilmiş',
        description: 'Sintered stone teknolojisinin öncüsü Neolith; %100 doğal hammaddelerden üretilen, tamamen çevre dostu ultra-kompakt levhalar sunar. 20 yıl garanti.',
        colors: [
          { name: 'Estatuario', code: 'NL-EST', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80', finish: 'Polished' },
          { name: 'Iron', code: 'NL-IRN', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=400&q=80', finish: 'Silk' },
          { name: 'Calacatta', code: 'NL-CAL', image: 'https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?auto=format&fit=crop&w=400&q=80', finish: 'Polished' },
          { name: 'Amazon', code: 'NL-AMZ', image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=400&q=80', finish: 'Riverwashed' },
          { name: 'Cement Ash', code: 'NL-CMA', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400&q=80', finish: 'Silk' },
        ],
        brochureUrl: '#',
        websiteUrl: 'https://www.neolith.com',
      },
    ],
  },

  'akrilik': {
    id: 'akrilik',
    title: 'Akrilik / Solid Surface Tezgahlar',
    subtitle: 'Fugasız, şekillendirilebilir, kusursuz yüzeyler',
    heroImage: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=1600&q=85',
    description: 'Akrilik solid surface tezgahlar; tam fugasız birleştirme, lavabo entegrasyonu ve sonsuz şekillendirme imkânıyla modern mutfakların gözdesidir.',
    longDescription: 'Solid surface (katı yüzey) malzemeler, akrilik reçine ve doğal mineral dolgu maddelerinin birleşiminden üretilir. Bu malzemelerin en büyük avantajı; özel ısıtma ve şekillendirme teknikleriyle çok karmaşık geometrilerde bile kusursuz fugasız birleştirme yapılabilmesidir. Tezgah ve lavaboyu tek parça olarak üretmek mümkündür.',
    priceRange: '₺₺ — ₺₺₺₺',
    durability: 3,
    heatResistance: 2,
    maintenance: 'Çizikler zımparayla onarılabilir. Kimyasal direnci orta. Sıcak nesneleri direkt koymayın.',
    idealFor: ['Modern minimalist mutfaklar', 'Tezgah-lavabo entegrasyonu', 'Sağlık tesisleri', 'Ofis mutfakları'],
    keyFeatures: [
      { title: 'Tam Fugasız Birleşim', desc: 'Özel yapıştırıcı ile levhalar arasında sıfır fuga elde edilir. Bakteri barınma riski ortadan kalkar.' },
      { title: 'Lavabo Entegrasyonu', desc: 'Tezgah ve lavabo aynı malzemeden tek parça olarak üretilebilir. Temizliği kolaylaşır.' },
      { title: 'Onarılabilir', desc: 'Çizik ve hafif hasarlar profesyonel zımpalama ile tamamen giderilebilir. Uzun ömür garantisi.' },
      { title: 'Sonsuz Şekil İmkânı', desc: 'Isıyla yumuşatılarak eğrisel, oval veya özel geometrik formlara şekillendirilebilir.' },
      { title: 'Geniş Renk Skalası', desc: 'Yüzlerce renk seçeneği; düz renkler, mineral görünümler ve ahşap imitasyonları.' },
      { title: 'Hafif Konstrüksiyon', desc: 'Doğal taşa göre çok daha hafif. Taşıma ve kurulum kolaylığı.' },
    ],
    brands: [
      {
        id: 'corian',
        name: 'Corian® by DuPont',
        origin: 'ABD',
        tagline: '50 yılı aşkın solid surface geleneği',
        description: '1967\'de DuPont tarafından icat edilen Corian, solid surface kategorisinin yaratıcısı. Dünya genelinde en güvenilen ve en çok tercih edilen solid surface markasıdır.',
        colors: [
          { name: 'Glacier White', code: 'DPT-GW', image: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?auto=format&fit=crop&w=400&q=80', finish: 'Mat' },
          { name: 'Deep Nocturne', code: 'DPT-DN', image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=400&q=80', finish: 'Mat' },
          { name: 'Concrete', code: 'DPT-CON', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=400&q=80', finish: 'Mat' },
          { name: 'Silver Birch', code: 'DPT-SB', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&q=80', finish: 'Mat' },
          { name: 'Cameo White', code: 'DPT-CW', image: 'https://images.unsplash.com/photo-1573408259280-f6ad3163e1e1?auto=format&fit=crop&w=400&q=80', finish: 'Mat' },
          { name: 'Lava Rock', code: 'DPT-LR', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=80', finish: 'Mat' },
        ],
        brochureUrl: '#',
        websiteUrl: 'https://www.corian.com',
      },
      {
        id: 'hi-macs',
        name: 'HI-MACS® by LG',
        origin: 'Güney Kore',
        tagline: 'LG\'nin doğaya dokunan tasarımları',
        description: 'LG\'nin solid surface markası HI-MACS, doğal mineral esintisi taşıyan yüzey desenleriyle öne çıkıyor. Özellikle Luna ve Alpine serileri tasarımcıların favorisi.',
        colors: [
          { name: 'Alpine White', code: 'HM-AW', image: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?auto=format&fit=crop&w=400&q=80', finish: 'Mat' },
          { name: 'Luna Beige', code: 'HM-LB', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', finish: 'Mat' },
          { name: 'Black Quartz', code: 'HM-BQ', image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=400&q=80', finish: 'Mat' },
          { name: 'Terrazzo Warm', code: 'HM-TW', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=80', finish: 'Mat' },
        ],
        brochureUrl: '#',
        websiteUrl: 'https://www.himacs.eu',
      },
      {
        id: 'staron',
        name: 'Staron® by Samsung',
        origin: 'Güney Kore',
        tagline: 'Samsung\'un yüzey inovasyonu',
        description: 'Samsung\'un solid surface markası Staron, özellikle sağlık sektörü ve ticari projelerde tercih ediliyor. Anti-bakteriyel sertifikası ve ISO belgeleriyle güven veriyor.',
        colors: [
          { name: 'Pebble Beach', code: 'ST-PB', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400&q=80', finish: 'Mat' },
          { name: 'Sanded Citrine', code: 'ST-SC', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80', finish: 'Mat' },
          { name: 'Tempest', code: 'ST-TMP', image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=400&q=80', finish: 'Mat' },
        ],
        brochureUrl: '#',
        websiteUrl: 'https://staron.com',
      },
    ],
  },

  'ekonomik': {
    id: 'ekonomik',
    title: 'Ekonomik & Alternatif Tezgahlar',
    subtitle: 'Akıllı seçim, güçlü estetik',
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
    description: 'Laminat, kompakt laminat, ahşap, beton ve paslanmaz çelik; her bütçeye uygun güçlü ve estetik tezgah alternatifleri.',
    longDescription: 'Ekonomik tezgah çözümleri; sınırlı bütçeli projelerde ve belirli tasarım anlayışlarında mükemmel sonuçlar verir. Kompakt laminat ve yüksek basınçlı laminat ürünler endüstriyel dayanıklılık sunarken, ahşap tezgahlar sıcak ve doğal bir atmosfer yaratır. Beton tezgahlar endüstriyel chic estetiğin vazgeçilmezi, paslanmaz çelik ise profesyonel mutfakların tercihidir.',
    priceRange: '₺ — ₺₺₺',
    durability: 3,
    heatResistance: 2,
    maintenance: 'Değişir. Ahşapta yağlama, laminatta hafif temizlik yeterlidir.',
    idealFor: ['Kiralık daire projeleri', 'Ofis mutfakları', 'Endüstriyel tarz', 'Hızlı teslim projeleri'],
    keyFeatures: [
      { title: 'Bütçe Dostu', desc: 'Premium alternatiflerin %30-70 daha uygun fiyatına benzer estetik elde edebilirsiniz.' },
      { title: 'Hızlı Teslim', desc: 'Stok ürünlerden üretim imkânıyla çok kısa sürede teslim edilebilir.' },
      { title: 'Geniş Seçenek', desc: 'Onlarca desen ve renk seçeneği; taş imitasyonu, ahşap desen, düz renkler.' },
      { title: 'Kolay Tadilat', desc: 'Gerektiğinde daha kolay ve ekonomik değiştirme imkânı sunar.' },
      { title: 'Endüstriyel Estetik', desc: 'Kompakt laminat ve paslanmaz çelik modern endüstriyel tasarım için ideal.' },
      { title: 'Islanabilir Ortam', desc: 'Kompakt laminat; su, buhar ve neme karşı yüksek dirençlidir.' },
    ],
    brands: [
      {
        id: 'egger',
        name: 'EGGER Laminat',
        origin: 'Avusturya',
        tagline: 'Avrupa\'nın en güçlü laminat markası',
        description: '1961\'den bu yana faaliyet gösteren Avusturyalı EGGER, yüksek basınçlı laminat (HPL) ve kompakt laminat alanında dünya lideri. Özellikle Eurodekor serisindeki ahşap ve taş imitasyonları çok gerçekçi.',
        colors: [
          { name: 'H3430 Natural Hickory', code: 'EG-H3430', image: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?auto=format&fit=crop&w=400&q=80', finish: 'Matt' },
          { name: 'H1313 Concrete Grey', code: 'EG-H1313', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=400&q=80', finish: 'Matt' },
          { name: 'F631 Snow', code: 'EG-F631', image: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?auto=format&fit=crop&w=400&q=80', finish: 'Matt' },
          { name: 'H1582 Dust Grey Oak', code: 'EG-H1582', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&q=80', finish: 'Matt' },
          { name: 'H3309 Chalet Oak', code: 'EG-H3309', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=80', finish: 'Synchronous' },
        ],
        brochureUrl: '#',
        websiteUrl: 'https://www.egger.com',
      },
      {
        id: 'ahsap-tezgah',
        name: 'Masif Ahşap Tezgahlar',
        origin: 'Türkiye / Avrupa',
        tagline: 'Doğanın sıcaklığı mutfağınızda',
        description: 'Meşe, kayın, ceviz ve egzotik ağaç türlerinden üretilen masif ahşap tezgahlar, özellikle Skandinav ve Rustik tarz mutfaklarda vazgeçilmez. Düzenli yağlama ile onlarca yıl kullanılabilir.',
        colors: [
          { name: 'Meşe Naturel', image: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?auto=format&fit=crop&w=400&q=80', finish: 'Yağlı / Vernikli' },
          { name: 'Ceviz Koyu', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', finish: 'Yağlı' },
          { name: 'Kayın Açık', image: 'https://images.unsplash.com/photo-1573408259280-f6ad3163e1e1?auto=format&fit=crop&w=400&q=80', finish: 'Vernikli' },
        ],
        brochureUrl: '#',
      },
      {
        id: 'paslanmaz-celik',
        name: 'Paslanmaz Çelik',
        origin: 'Türkiye / İtalya',
        tagline: 'Profesyonel mutfakların tercihi',
        description: 'AISI 304 ve 316 kalite paslanmaz çelik tezgahlar; profesyonel mutfaklar, endüstriyel chic tasarımlar ve ultra modern minimalist projeler için ideal. Hijyenik ve ömür boyu dayanıklı.',
        colors: [
          { name: 'Brushed Steel', image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=400&q=80', finish: 'Fırçalanmış' },
          { name: 'Polished Steel', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=80', finish: 'Parlak' },
          { name: 'Matte Steel', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80', finish: 'Mat' },
        ],
        brochureUrl: '#',
      },
    ],
  },
};
