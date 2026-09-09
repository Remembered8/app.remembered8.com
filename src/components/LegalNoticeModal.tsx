'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Language } from '@/lib/i18n';
import { CONTROLLER, isControllerComplete } from '@/lib/controller';
import { NECESSARY_STORAGE } from '@/lib/storage';
import { openConsentPreferences } from '@/components/CookieConsent';

type LegalTab = 'privacy' | 'cookies';

interface LegalNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialTab?: LegalTab;
}

interface Section {
  heading: string;
  paragraphs: string[];
}

interface LegalCopy {
  title: string;
  tabs: Record<LegalTab, string>;
  updated: string;
  managePreferences: string;
  close: string;
  controllerHeading: string;
  controllerRegistration: string;
  controllerDpo: string;
  controllerIncomplete: string;
  privacy: Section[];
  cookies: Section[];
  cookieTable: {
    columns: [string, string, string, string];
    rows: [string, string, string, string][];
  };
}

/**
 * The strictly necessary rows, built from the storage declarations so the
 * policy cannot fall behind what the app actually writes.
 */
function necessaryRows(
  language: Language,
  categoryLabel: string
): [string, string, string, string][] {
  const site = language === 'tr' ? 'bu site' : 'this site';
  return NECESSARY_STORAGE.map((entry) => [
    `${entry.key} (${site})`,
    categoryLabel,
    entry.purpose[language],
    entry.retention[language],
  ]);
}

const COPY: Record<Language, LegalCopy> = {
  en: {
    title: 'Privacy & cookie policy',
    tabs: { privacy: 'Privacy notice', cookies: 'Cookie policy' },
    updated: 'Last updated',
    managePreferences: 'Change cookie preferences',
    close: 'Close',
    controllerHeading: 'Controller details',
    controllerRegistration: 'Trade registry no.',
    controllerDpo: 'Data protection officer',
    controllerIncomplete:
      'The controller details below are not filled in yet. This notice is a draft and does not yet satisfy GDPR Art. 13 or KVKK Art. 10.',
    privacy: [
      {
        heading: 'Who is responsible',
        paragraphs: [
          `${CONTROLLER.legalName} operates ${CONTROLLER.site} and is the data controller for the personal data described here. For any question about this notice, or to exercise the rights below, write to ${CONTROLLER.email}.`,
        ],
      },
      {
        heading: 'What we collect',
        paragraphs: [
          'Memorial content you create: names, dates, biographies, photographs, audio recordings, family relationships and memory letters. You choose what to enter, and you may be entering information about other people, including deceased persons and living relatives.',
          'Technical data: IP address, browser and device type, referring page, and the pages you view. This is collected by our measurement tools only after you consent to analytics.',
          'Contact data: anything you send us by email, kept only as long as needed to answer you.',
        ],
      },
      {
        heading: 'Why we use it',
        paragraphs: [
          'To operate the archive and show the memorial pages you and others create (performance of the service you asked for).',
          'To understand how the archive is used and improve it, and to measure our campaigns. This happens on the basis of your consent, and only for the categories you switch on.',
          'To keep the service secure and to meet legal obligations (our legitimate interest and legal duties).',
        ],
      },
      {
        heading: 'Who we share it with',
        paragraphs: [
          'Google (Analytics 4), Microsoft (Clarity) and Meta (Pixel) act as our measurement providers and receive technical data only when you have consented to the matching category. Google AI (Gemini) processes the text you submit to the optional AI writing helpers in order to return a draft.',
          'Cloudflare hosts the site and the registry database, and therefore stores the dossiers and contributions on our behalf as a processor.',
          'We do not sell personal data. We do not share memorial content with advertisers.',
        ],
      },
      {
        heading: 'International transfers',
        paragraphs: [
          'Our measurement and AI providers process data outside the EEA and Turkey, including in the United States. Those transfers rely on the European Commission Standard Contractual Clauses and, where applicable, the EU-US Data Privacy Framework.',
        ],
      },
      {
        heading: 'How long we keep it',
        paragraphs: [
          'Memorial content is kept until you ask us to remove it, because the point of the archive is permanence. Analytics data is retained for at most 14 months. Consent records are kept for as long as the consent is valid plus the period needed to evidence it.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'You may request access, correction, deletion, restriction, portability, and object to processing. Where processing rests on consent, you may withdraw it at any time without affecting what happened before. Under KVKK Art. 11 you also have the right to learn whether your data is processed and to request that any harm be remedied.',
          `Contact ${CONTROLLER.email}. You may also complain to your local supervisory authority, or in Turkey to the Kişisel Verileri Koruma Kurumu (KVKK).`,
        ],
      },
      {
        heading: 'Children',
        paragraphs: [
          'The service is not directed at children under 16. If you believe a child has provided us with personal data, contact us and we will remove it.',
        ],
      },
    ],
    cookies: [
      {
        heading: 'What we use',
        paragraphs: [
          'Cookies and equivalent browser storage (localStorage) fall into three groups on this site. Strictly necessary storage is always active. Analytics and marketing tags load only after you switch the matching category on, and no third-party script is requested before that.',
        ],
      },
      {
        heading: 'Changing your mind',
        paragraphs: [
          'Use the button below, or the "cookie preferences" link in the footer, to change or withdraw your choices at any time. Withdrawing consent stops further collection; scripts already loaded in the current page are removed on your next page load.',
        ],
      },
      {
        heading: 'Blocking cookies in your browser',
        paragraphs: [
          'Every major browser lets you block or delete cookies from its settings. Blocking strictly necessary storage will stop the archive from remembering your language and your consent decision.',
        ],
      },
    ],
    cookieTable: {
      columns: ['Name / provider', 'Category', 'Purpose', 'Retention'],
      rows: [
        ...necessaryRows('en', 'Necessary'),
        ['_ga, _ga_* (Google Analytics 4)', 'Analytics', 'Distinguishes visitors and sessions, aggregated reporting', 'Up to 24 months'],
        ['_clck, _clsk (Microsoft Clarity)', 'Analytics', 'Session replay and interaction heatmaps', 'Up to 12 months'],
        ['_fbp (Meta Pixel)', 'Marketing', 'Campaign attribution and audience building', 'Up to 3 months'],
      ],
    },
  },
  tr: {
    title: 'Gizlilik ve çerez politikası',
    tabs: { privacy: 'Aydınlatma metni', cookies: 'Çerez politikası' },
    updated: 'Son güncelleme',
    managePreferences: 'Çerez tercihlerini değiştir',
    close: 'Kapat',
    controllerHeading: 'Veri sorumlusu bilgileri',
    controllerRegistration: 'Ticaret sicil no.',
    controllerDpo: 'Veri koruma sorumlusu',
    controllerIncomplete:
      'Aşağıdaki veri sorumlusu bilgileri henüz doldurulmadı. Bu metin taslaktır ve GDPR md. 13 ile KVKK md. 10 yükümlülüğünü henüz karşılamamaktadır.',
    privacy: [
      {
        heading: 'Veri sorumlusu',
        paragraphs: [
          `${CONTROLLER.site} adresini ${CONTROLLER.legalName} işletmektedir ve burada anlatılan kişisel veriler bakımından veri sorumlusudur. Bu metinle ilgili her soru ve aşağıdaki hakların kullanımı için ${CONTROLLER.email} adresine yazabilirsiniz.`,
        ],
      },
      {
        heading: 'Hangi verileri işliyoruz',
        paragraphs: [
          'Oluşturduğunuz kütük içeriği: isimler, tarihler, biyografiler, fotoğraflar, ses kayıtları, akrabalık bağları ve hatıra mektupları. Neyi gireceğinize siz karar verirsiniz ve bu bilgiler başkalarına, vefat etmiş kişilere ya da yaşayan yakınlara ait olabilir.',
          'Teknik veriler: IP adresi, tarayıcı ve cihaz türü, yönlendiren sayfa ve görüntülediğiniz sayfalar. Bunlar yalnızca analitik çerezlere onay verdikten sonra toplanır.',
          'İletişim verileri: bize e-posta ile ilettiğiniz her şey, yalnızca size cevap vermek için gereken süre boyunca saklanır.',
        ],
      },
      {
        heading: 'İşleme amaçları ve hukuki sebep',
        paragraphs: [
          'Arşivi çalıştırmak ve oluşturulan kütük sayfalarını göstermek için (sözleşmenin ifası).',
          'Arşivin nasıl kullanıldığını anlayıp geliştirmek ve kampanyalarımızı ölçmek için. Bu işleme açık rızanıza dayanır ve yalnızca açtığınız kategoriler için gerçekleşir.',
          'Hizmetin güvenliğini sağlamak ve hukuki yükümlülüklerimizi yerine getirmek için (meşru menfaat ve hukuki yükümlülük).',
        ],
      },
      {
        heading: 'Kimlerle paylaşıyoruz',
        paragraphs: [
          'Google (Analytics 4), Microsoft (Clarity) ve Meta (Pixel) ölçümleme sağlayıcılarımızdır ve yalnızca ilgili kategoriye onay verdiyseniz teknik veri alırlar. Google AI (Gemini), isteğe bağlı yapay zekâ yazım yardımcılarına gönderdiğiniz metni taslak üretmek için işler.',
          'Siteyi ve kütük veritabanını Cloudflare barındırır; dolayısıyla kütükleri ve katkıları veri işleyen sıfatıyla bizim adımıza saklar.',
          'Kişisel verileri satmıyoruz. Kütük içeriklerini reklam verenlerle paylaşmıyoruz.',
        ],
      },
      {
        heading: 'Yurt dışına aktarım',
        paragraphs: [
          'Ölçümleme ve yapay zekâ sağlayıcılarımız verileri AEA ve Türkiye dışında, Amerika Birleşik Devletleri dahil, işler. Bu aktarımlar Avrupa Komisyonu Standart Sözleşme Hükümlerine ve uygulanabildiği ölçüde AB-ABD Veri Gizliliği Çerçevesine dayanır.',
        ],
      },
      {
        heading: 'Saklama süreleri',
        paragraphs: [
          'Kütük içeriği, arşivin amacı kalıcılık olduğu için siz silinmesini isteyene kadar saklanır. Analitik veriler en fazla 14 ay tutulur. Rıza kayıtları, rızanın geçerli olduğu süre ve ispat için gereken ek süre boyunca saklanır.',
        ],
      },
      {
        heading: 'Haklarınız',
        paragraphs: [
          'Erişim, düzeltme, silme, işlemeyi sınırlandırma, veri taşınabilirliği ve itiraz haklarına sahipsiniz. İşleme açık rızaya dayanıyorsa rızanızı dilediğiniz an geri alabilirsiniz; bu, geri alma anına kadarki işlemeleri etkilemez. KVKK madde 11 uyarınca verilerinizin işlenip işlenmediğini öğrenme ve doğan zararın giderilmesini talep etme hakkınız da vardır.',
          `Bize ${CONTROLLER.email} adresinden ulaşın. Ayrıca bulunduğunuz ülkedeki denetim makamına, Türkiye'de ise Kişisel Verileri Koruma Kurumu'na (KVKK) şikâyette bulunabilirsiniz.`,
        ],
      },
      {
        heading: 'Çocuklar',
        paragraphs: [
          'Hizmet 16 yaşın altındaki çocuklara yönelik değildir. Bir çocuğun bize kişisel veri ilettiğini düşünüyorsanız bize bildirin, veriyi kaldıralım.',
        ],
      },
    ],
    cookies: [
      {
        heading: 'Neleri kullanıyoruz',
        paragraphs: [
          'Bu sitede çerezler ve eşdeğer tarayıcı depolaması (localStorage) üç gruba ayrılır. Zorunlu depolama her zaman aktiftir. Analitik ve pazarlama etiketleri yalnızca ilgili kategoriyi açtıktan sonra yüklenir; öncesinde hiçbir üçüncü taraf betiği istenmez.',
        ],
      },
      {
        heading: 'Kararınızı değiştirmek',
        paragraphs: [
          'Aşağıdaki düğmeyi ya da alt bilgideki "çerez tercihleri" bağlantısını kullanarak seçimlerinizi dilediğiniz an değiştirebilir veya geri alabilirsiniz. Rızayı geri almak sonraki toplamayı durdurur; açık sayfada halihazırda yüklenmiş betikler bir sonraki sayfa yüklemesinde kaldırılır.',
        ],
      },
      {
        heading: 'Tarayıcıdan engellemek',
        paragraphs: [
          'Bütün yaygın tarayıcılar ayarlarından çerezleri engellemenize veya silmenize izin verir. Zorunlu depolamayı engellemek, arşivin dil tercihinizi ve çerez kararınızı hatırlamasını durdurur.',
        ],
      },
    ],
    cookieTable: {
      columns: ['Ad / sağlayıcı', 'Kategori', 'Amaç', 'Saklama'],
      rows: [
        ...necessaryRows('tr', 'Zorunlu'),
        ['_ga, _ga_* (Google Analytics 4)', 'Analitik', 'Ziyaretçi ve oturumları ayırt eder, toplu raporlama', '24 aya kadar'],
        ['_clck, _clsk (Microsoft Clarity)', 'Analitik', 'Oturum tekrarı ve etkileşim ısı haritaları', '12 aya kadar'],
        ['_fbp (Meta Pixel)', 'Pazarlama', 'Kampanya atfı ve kitle oluşturma', '3 aya kadar'],
      ],
    },
  },
};

/** Date the policy text last changed. Update it whenever the copy above changes. */
const LAST_UPDATED = '2026-09-09';

/** Privacy notice and cookie policy, shown as a modal from the footer. */
export const LegalNoticeModal: React.FC<LegalNoticeModalProps> = ({
  isOpen,
  onClose,
  language,
  initialTab = 'privacy',
}) => {
  const [tab, setTab] = useState<LegalTab>(initialTab);
  const controllerComplete = isControllerComplete();
  const t = COPY[language];

  if (!isOpen) return null;

  const sections = tab === 'privacy' ? t.privacy : t.cookies;

  return (
    <div data-modal="overlay" className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto bg-black/60 p-3 sm:p-6">
      <div data-modal="panel" className="w-full max-w-3xl border border-[#111111] bg-[#FAF8F5]">
        <div className="sticky top-0 flex items-center justify-between gap-4 border-b border-[#111111] bg-[#FAF8F5] px-4 py-3">
          <h2 className="font-serif-display text-lg font-black tracking-tight text-[#111111]">
            {t.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="text-[#777777] hover:text-[#111111] cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex gap-4 border-b border-[#111111]/15 px-4 pt-3">
          {(['privacy', 'cookies'] as LegalTab[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`-mb-px border-b-2 pb-2 font-mono text-[11px] font-bold uppercase tracking-wider cursor-pointer ${
                tab === key
                  ? 'border-[#111111] text-[#111111]'
                  : 'border-transparent text-[#777777] hover:text-[#111111]'
              }`}
            >
              {t.tabs[key]}
            </button>
          ))}
        </div>

        <div className="space-y-5 px-4 py-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#777777]">
            {t.updated}: {LAST_UPDATED}
          </p>

          {tab === 'privacy' && (
            <section className="space-y-2 border border-[#E5E5DF] bg-white p-3">
              <h3 className="font-serif-display text-sm font-bold tracking-tight text-[#111111]">
                {t.controllerHeading}
              </h3>

              {!controllerComplete && (
                <p className="border-l-2 border-[#8C5828] bg-[#FBF3EA] px-2 py-1.5 font-mono text-[11px] leading-relaxed text-[#8C5828]">
                  {t.controllerIncomplete}
                </p>
              )}

              <address className="font-serif text-sm not-italic leading-relaxed text-[#444444]">
                <span className="block font-bold text-[#111111]">{CONTROLLER.legalName}</span>
                {/* Keyed by position: unfilled lines all share the same blank value. */}
                {CONTROLLER.address.map((line, index) => (
                  <span key={index} className="block">
                    {line}
                  </span>
                ))}
                <a href={`mailto:${CONTROLLER.email}`} className="block underline underline-offset-2">
                  {CONTROLLER.email}
                </a>
                {CONTROLLER.phone && <span className="block">{CONTROLLER.phone}</span>}
                {CONTROLLER.registrationNumber && (
                  <span className="block">
                    {t.controllerRegistration}: {CONTROLLER.registrationNumber}
                  </span>
                )}
                {CONTROLLER.dataProtectionOfficer && (
                  <span className="block">
                    {t.controllerDpo}: {CONTROLLER.dataProtectionOfficer}
                  </span>
                )}
              </address>
            </section>
          )}

          {sections.map((section) => (
            <section key={section.heading} className="space-y-2">
              <h3 className="font-serif-display text-sm font-bold tracking-tight text-[#111111]">
                {section.heading}
              </h3>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index} className="font-serif text-sm leading-relaxed text-[#444444]">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          {tab === 'cookies' && (
            <div className="overflow-x-auto border border-[#E5E5DF] bg-white">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#111111]/20">
                    {t.cookieTable.columns.map((column) => (
                      <th
                        key={column}
                        className="px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#111111]"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.cookieTable.rows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#E5E5DF] last:border-b-0">
                      {row.map((cell, index) => (
                        <td
                          key={index}
                          className="px-3 py-2 align-top font-serif text-xs leading-relaxed text-[#444444]"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              onClose();
              openConsentPreferences();
            }}
            className="border border-[#111111] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#111111] transition-colors hover:bg-[#111111] hover:text-white cursor-pointer"
          >
            {t.managePreferences}
          </button>
        </div>
      </div>
    </div>
  );
};
