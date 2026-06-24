import React from 'react';
import { ArrowLeft, X } from 'lucide-react';

interface Props {
  page: 'gizlilik' | 'kullanim' | 'kvkk';
  onBack?: () => void;
  onClose?: () => void;
}

const CONTENT = {
  gizlilik: {
    title: 'Gizlilik Politikası',
    updated: '23 Haziran 2026',
    sections: [
      {
        heading: '1. Giriş',
        body: `Decoryap Yapı Malzemeleri ("Decoryap", "biz" veya "şirket") olarak, www.tezgahyap.com.tr adresinde sunduğumuz hizmetleri kullanan ziyaretçilerimizin gizliliğine büyük önem veriyoruz. Bu Gizlilik Politikası, hangi kişisel verileri topladığımızı, bu verileri nasıl işlediğimizi ve haklarınızı açıklamaktadır.`,
      },
      {
        heading: '2. Toplanan Veriler',
        body: `Sitemizi ziyaret ettiğinizde veya hizmetlerimizden yararlandığınızda aşağıdaki veriler toplanabilir:\n\n• **Kimlik Bilgileri:** Ad, soyad (teklif formu doldurduğunuzda)\n• **İletişim Bilgileri:** E-posta adresi, telefon numarası, adres\n• **Teknik Veriler:** IP adresi, tarayıcı türü, ziyaret tarihi ve saati, incelenen sayfalar\n• **Hesap Bilgileri:** Google hesabınız aracılığıyla giriş yapmanız hâlinde ad, e-posta ve profil fotoğrafı\n• **Teklif Bilgileri:** Proje detayları, ölçüler, malzeme tercihleri`,
      },
      {
        heading: '3. Verilerin Kullanım Amacı',
        body: `Topladığımız veriler şu amaçlarla kullanılmaktadır:\n\n• Teklif hazırlama ve müşteri hizmetleri sunma\n• Hesap oluşturma ve kimlik doğrulama\n• Hizmet kalitesini iyileştirme\n• Yasal yükümlülüklerin yerine getirilmesi\n• Tarafınızla iletişim kurma (izin vermeniz hâlinde pazarlama iletişimi)`,
      },
      {
        heading: '4. Verilerin Paylaşımı',
        body: `Kişisel verileriniz; açık rızanız olmaksızın üçüncü taraflarla paylaşılmaz. Aşağıdaki durumlarda paylaşım yapılabilir:\n\n• Yasal yükümlülük kapsamında yetkili kurum ve kuruluşlarla\n• Hizmet sunumunu sağlayan iş ortakları ve tedarikçilerle (gizlilik sözleşmesi çerçevesinde)\n• Firebase (Google) kimlik doğrulama ve veritabanı hizmetleri`,
      },
      {
        heading: '5. Veri Güvenliği',
        body: `Kişisel verilerinizi korumak için endüstri standardı teknik ve idari önlemler alınmaktadır. Verileriniz şifreli bağlantı (SSL/TLS) üzerinden iletilmekte ve güvenli bulut altyapısında (Google Firebase) saklanmaktadır.`,
      },
      {
        heading: '6. Çerezler (Cookies)',
        body: `Sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerez kullanabilir. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz; ancak bu durumda bazı özellikler düzgün çalışmayabilir.`,
      },
      {
        heading: '7. Haklarınız',
        body: `6698 sayılı KVKK kapsamında aşağıdaki haklara sahipsiniz:\n\n• Kişisel verilerinize erişim talep etme\n• Yanlış veya eksik verilerin düzeltilmesini isteme\n• Verilerinizin silinmesini talep etme\n• Veri işlemeye itiraz etme\n• Veri taşınabilirliği talep etme\n\nBu haklarınızı kullanmak için info@decoryap.com adresine yazabilirsiniz.`,
      },
      {
        heading: '8. Politika Değişiklikleri',
        body: `Bu politikayı zaman zaman güncelleyebiliriz. Önemli değişiklikler olması hâlinde sizi e-posta veya site üzerinden bilgilendireceğiz.`,
      },
      {
        heading: '9. İletişim',
        body: `Gizlilik politikamıza ilişkin sorularınız için:\n\nDecoryap Yapı Malzemeleri\nHabibler Yayla Mh. Konak Cd. No:11, Sultangazi, İstanbul\nE-posta: info@decoryap.com\nTelefon: +90 (212) 650 22 20`,
      },
    ],
  },

  kullanim: {
    title: 'Kullanım Şartları',
    updated: '23 Haziran 2026',
    sections: [
      {
        heading: '1. Kabul',
        body: `www.tezgahyap.com.tr adresini ("Site") ziyaret ederek veya hizmetlerimizden yararlanarak bu Kullanım Şartları'nı kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız lütfen siteyi kullanmayınız.`,
      },
      {
        heading: '2. Hizmetin Kapsamı',
        body: `Tezgah Studio; mutfak ve banyo tezgahı materyalleri, markalar ve renk koleksiyonları hakkında bilgi sunan, teklif almayı kolaylaştıran bir platformdur. Sitede yer alan fiyat bilgileri tahmini nitelikte olup kesin teklif için iletişime geçilmesi gerekmektedir.`,
      },
      {
        heading: '3. Kullanıcı Hesabı',
        body: `Hesap oluşturmanız hâlinde:\n\n• Verdiğiniz bilgilerin doğru ve güncel olmasından siz sorumlusunuz\n• Hesap güvenliğinizi korumak sizin sorumluluğunuzdadır\n• Hesabınızın yetkisiz kullanımını derhal bildirmeniz gerekmektedir\n• Hesap, başkasına devredilemez`,
      },
      {
        heading: '4. Yasak Kullanımlar',
        body: `Aşağıdaki kullanımlar kesinlikle yasaktır:\n\n• Siteyi yasadışı amaçlarla kullanmak\n• Diğer kullanıcıların verilerine izinsiz erişim sağlamak\n• Sisteme zarar verecek yazılım ya da kod göndermek\n• Otomatik araçlarla (bot, scraper) içerik toplamak\n• Yanıltıcı bilgi paylaşmak`,
      },
      {
        heading: '5. Fikri Mülkiyet',
        body: `Sitede yer alan tüm içerik (metin, görsel, tasarım, logo, marka adı) Decoryap'a veya lisans verenlere aittir. İzin alınmadan kopyalanamaz, dağıtılamaz veya ticari amaçla kullanılamaz.`,
      },
      {
        heading: '6. Sorumluluk Sınırlaması',
        body: `Decoryap; teknik arızalar, bilgi hataları veya üçüncü taraf hizmetlerinden kaynaklanan zararlardan sorumlu tutulamaz. Site "olduğu gibi" sunulmaktadır ve sürekli erişilebilirlik garanti edilmez.`,
      },
      {
        heading: '7. Üçüncü Taraf Bağlantılar',
        body: `Sitede üçüncü taraf web sitelerine bağlantılar bulunabilir. Bu sitelerin içerik ve gizlilik politikalarından Decoryap sorumlu değildir.`,
      },
      {
        heading: '8. Değişiklikler',
        body: `Kullanım şartlarını önceden bildirmeksizin değiştirme hakkımız saklıdır. Güncel şartlar her zaman bu sayfada yayınlanır.`,
      },
      {
        heading: '9. Uygulanacak Hukuk',
        body: `Bu şartlar Türkiye Cumhuriyeti hukukuna tabidir. Anlaşmazlıklarda İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.`,
      },
    ],
  },

  kvkk: {
    title: 'KVKK Aydınlatma Metni',
    updated: '23 Haziran 2026',
    sections: [
      {
        heading: 'Veri Sorumlusu',
        body: `6698 Sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca kişisel verileriniz; veri sorumlusu sıfatıyla Decoryap Yapı Malzemeleri (Habibler Yayla Mh. Konak Cd. No:11, Sultangazi, İstanbul) tarafından aşağıda açıklanan amaç ve kapsamda işlenmektedir.`,
      },
      {
        heading: 'İşlenen Kişisel Veriler',
        body: `Tarafınızdan toplanan kişisel veriler şunlardır:\n\n• **Kimlik:** Ad, soyad\n• **İletişim:** Telefon numarası, e-posta adresi, adres\n• **Müşteri İşlemi:** Teklif talepleri, proje bilgileri, yazışma kayıtları\n• **Dijital İz:** IP adresi, çerez verileri, oturum bilgileri\n• **Görsel:** Google hesabı profil fotoğrafı (giriş yapılması hâlinde)`,
      },
      {
        heading: 'Kişisel Verilerin İşlenme Amaçları',
        body: `Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:\n\n• Teklif hazırlama ve müşteri hizmetleri yürütme\n• Sözleşme süreçlerinin yönetimi\n• Müşteri memnuniyeti ve şikayet süreçleri\n• Hukuki yükümlülüklerin yerine getirilmesi\n• Pazarlama faaliyetleri (açık rıza alınması hâlinde)\n• Bilgi güvenliği süreçlerinin yürütülmesi`,
      },
      {
        heading: 'Kişisel Verilerin Aktarılması',
        body: `Kişisel verileriniz;\n\n• Yasal yükümlülükler kapsamında kamu kurum ve kuruluşlarına\n• Hizmet alınan iş ortakları ve tedarikçilere (gizlilik sözleşmesi çerçevesinde)\n• Google LLC bünyesindeki Firebase platformuna (kimlik doğrulama ve veri depolama hizmeti)\n\naktarılabilir.`,
      },
      {
        heading: 'Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi',
        body: `Kişisel verileriniz;\n\n• Web sitesi üzerinden teklif formu, hesap kaydı ve iletişim formu aracılığıyla otomatik olarak\n• E-posta, telefon veya yüz yüze görüşme yoluyla otomatik olmayan yöntemlerle\n\nKVKK'nın 5. ve 6. maddelerinde belirtilen;\n• Sözleşmenin kurulması ve ifası\n• Yasal yükümlülüğün yerine getirilmesi\n• Meşru menfaat\n• Açık rıza\n\nhukuki sebeplerine dayanılarak toplanmaktadır.`,
      },
      {
        heading: 'KVKK Kapsamındaki Haklarınız',
        body: `KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:\n\n• Kişisel verilerinizin işlenip işlenmediğini öğrenme\n• Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme\n• İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme\n• Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme\n• Eksik veya yanlış işlenmiş kişisel verilerin düzeltilmesini isteme\n• Kişisel verilerin silinmesini veya yok edilmesini isteme\n• Düzeltme, silme veya yok etme işlemlerinin üçüncü kişilere bildirilmesini talep etme\n• İşlenen verilerin otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme\n• Kanuna aykırı işlenmesi nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme`,
      },
      {
        heading: 'Başvuru Yöntemi',
        body: `Haklarınızı kullanmak için aşağıdaki kanallardan başvurabilirsiniz:\n\n**Yazılı Başvuru:**\nHabibler Yayla Mh. Konak Cd. No:11, Sultangazi, İstanbul\n(Zarfın üzerine "Kişisel Verilerin Korunması Kanunu Kapsamında Bilgi Talebi" yazınız)\n\n**E-posta:**\ninfo@decoryap.com\n(Konu satırına "KVKK Başvurusu" yazınız)\n\nBaşvurularınız 30 gün içinde yanıtlanacaktır. Başvurunun gerektirmesi hâlinde ek bilgi talep edilebilir.`,
      },
    ],
  },
};

function renderBody(body: string) {
  return body.split('\n').map((line, i) => {
    if (line.startsWith('• **')) {
      const match = line.match(/^• \*\*(.+?)\*\*:? ?(.*)$/);
      if (match) {
        return (
          <li key={i} className="flex gap-2 text-stone-600 text-sm leading-relaxed">
            <span className="text-amber-500 shrink-0 mt-0.5">•</span>
            <span><strong className="text-neutral-800">{match[1]}:</strong> {match[2]}</span>
          </li>
        );
      }
    }
    if (line.startsWith('• ')) {
      return (
        <li key={i} className="flex gap-2 text-stone-600 text-sm leading-relaxed">
          <span className="text-amber-500 shrink-0 mt-0.5">•</span>
          <span>{line.slice(2)}</span>
        </li>
      );
    }
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={i} className="font-semibold text-neutral-800 text-sm mt-3">{line.slice(2, -2)}</p>;
    }
    if (line === '') return <div key={i} className="h-2" />;
    return <p key={i} className="text-stone-600 text-sm leading-relaxed">{line}</p>;
  });
}

export default function LegalPage({ page, onBack, onClose }: Props) {
  const content = CONTENT[page];
  const isModal = !!onClose;

  if (isModal) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
          onClick={onClose}
        />
        {/* Panel */}
        <div className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Modal header */}
          <div className="bg-neutral-900 text-white px-6 py-5 flex items-start justify-between gap-4 shrink-0">
            <div>
              <h2 className="text-xl font-serif font-bold text-white">{content.title}</h2>
              <p className="text-white/40 text-xs mt-0.5">Son güncelleme: {content.updated}</p>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors mt-0.5"
              aria-label="Kapat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {/* Scrollable content */}
          <div className="overflow-y-auto px-6 py-6 space-y-5 bg-neutral-50">
            {content.sections.map((section, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-stone-200">
                <h3 className="font-bold text-neutral-900 text-sm mb-3 pb-2.5 border-b border-stone-100">
                  {section.heading}
                </h3>
                <div className="space-y-1.5">
                  {renderBody(section.body)}
                </div>
              </div>
            ))}
            <p className="text-center text-xs text-stone-400 pb-2">
              © {new Date().getFullYear()} Decoryap Yapı Malzemeleri. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-neutral-900 text-white py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Geri Dön
          </button>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">{content.title}</h1>
          <p className="text-white/40 text-sm">Son güncelleme: {content.updated}</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
        {content.sections.map((section, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-stone-200">
            <h2 className="font-bold text-neutral-900 text-base mb-4 pb-3 border-b border-stone-100">
              {section.heading}
            </h2>
            <div className="space-y-1.5">
              {renderBody(section.body)}
            </div>
          </div>
        ))}
        <div className="text-center text-xs text-stone-400 pb-8">
          <p>© {new Date().getFullYear()} Decoryap Yapı Malzemeleri. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </div>
  );
}
