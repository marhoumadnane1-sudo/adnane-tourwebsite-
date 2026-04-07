'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, FileText, XCircle, ChevronDown, CheckCircle } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { cn } from '@/lib/utils'

const tabs = [
  { id: 'cancellation', icon: XCircle,  labelEN: 'Cancellation Policy',       labelFR: "Politique d'Annulation",          labelAR: 'سياسة الإلغاء' },
  { id: 'privacy',      icon: Shield,   labelEN: 'Privacy Policy',             labelFR: 'Politique de Confidentialité',    labelAR: 'سياسة الخصوصية' },
  { id: 'terms',        icon: FileText, labelEN: 'Terms & Conditions',         labelFR: 'Conditions Générales',            labelAR: 'الشروط والأحكام' },
]

// ── CANCELLATION ──────────────────────────────────────────────────────────────

const cancellationEN = [
  { highlight: true,  title: 'Free Cancellation — More than 24 Hours Before Pickup', content: 'You may cancel your booking free of charge at any time up to 24 hours before your scheduled pickup time. No cancellation fee will be applied. You will receive a full confirmation of your cancellation via WhatsApp.' },
  { highlight: false, title: 'Late Cancellation — Less than 24 Hours Before Pickup',  content: 'Cancellations made less than 24 hours before the scheduled pickup time may incur a cancellation fee of up to 50% of the total booking price. This covers driver scheduling and vehicle preparation costs.' },
  { highlight: false, title: 'No-Show Policy',                                        content: 'If you do not appear at the agreed pickup location within 90 minutes of the scheduled time without prior notice, the booking will be considered a no-show. In this case, the full booking amount may be charged.' },
  { highlight: true,  title: 'Flight Delays & Cancellations',                         content: 'We track all flights in real time. If your flight is delayed, your driver will wait at no extra charge for up to 90 minutes after the actual landing time. If your flight is cancelled by the airline, you may reschedule your transfer free of charge.' },
  { highlight: false, title: 'How to Cancel',                                         content: 'To cancel or modify your booking, contact us directly via WhatsApp at +212 661 659 607 with your booking reference number. Cancellations are processed immediately.' },
  { highlight: false, title: 'Refunds',                                               content: 'If you paid online and qualify for a full refund, we will process it within 5–7 business days to your original payment method. Cash bookings (pay on arrival) have no refund as no payment was collected in advance.' },
]

const cancellationFR = [
  { highlight: true,  title: 'Annulation Gratuite — Plus de 24h Avant le Départ',  content: "Vous pouvez annuler votre réservation gratuitement jusqu'à 24 heures avant l'heure de prise en charge prévue. Aucun frais d'annulation ne sera appliqué. Vous recevrez une confirmation d'annulation par WhatsApp." },
  { highlight: false, title: 'Annulation Tardive — Moins de 24h Avant le Départ', content: "Les annulations effectuées moins de 24 heures avant le départ prévu peuvent entraîner des frais d'annulation pouvant atteindre 50% du montant total de la réservation." },
  { highlight: false, title: 'Politique de Non-Présentation',                      content: "Si vous ne vous présentez pas au lieu de prise en charge convenu dans les 90 minutes suivant l'heure prévue sans notification préalable, la réservation sera considérée comme une non-présentation." },
  { highlight: true,  title: 'Retards et Annulations de Vols',                     content: "Nous suivons tous les vols en temps réel. En cas de retard, votre chauffeur attendra gratuitement jusqu'à 90 minutes après l'atterrissage réel. En cas d'annulation par la compagnie aérienne, vous pouvez reporter votre transfert sans frais." },
  { highlight: false, title: 'Comment Annuler',                                    content: 'Pour annuler ou modifier votre réservation, contactez-nous par WhatsApp au +212 661 659 607 avec votre numéro de référence. Les annulations sont traitées immédiatement.' },
  { highlight: false, title: 'Remboursements',                                     content: "En cas de remboursement complet, nous traiterons le remboursement sous 5 à 7 jours ouvrables sur votre moyen de paiement d'origine." },
]

const cancellationAR = [
  { highlight: true,  title: 'إلغاء مجاني — أكثر من 24 ساعة قبل الموعد',     content: 'يمكنك إلغاء حجزك مجاناً في أي وقت حتى 24 ساعة قبل موعد الاستلام المحدد. لن يتم تطبيق أي رسوم إلغاء. ستتلقى تأكيداً للإلغاء عبر واتساب.' },
  { highlight: false, title: 'إلغاء متأخر — أقل من 24 ساعة قبل الموعد',     content: 'قد تؤدي الإلغاءات التي تتم قبل أقل من 24 ساعة إلى رسوم إلغاء تصل إلى 50% من إجمالي قيمة الحجز.' },
  { highlight: false, title: 'سياسة عدم الحضور',                              content: 'إذا لم تظهر في موقع الاستلام خلال 90 دقيقة دون إشعار مسبق، سيعتبر الحجز عدم حضور وقد يتم احتساب المبلغ كاملاً.' },
  { highlight: true,  title: 'تأخيرات وإلغاءات الرحلات',                     content: 'نتتبع جميع الرحلات في الوقت الفعلي. في حالة التأخير، سينتظر سائقك مجاناً حتى 90 دقيقة بعد وقت الهبوط الفعلي. في حالة إلغاء الرحلة، يمكنك إعادة جدولة نقلك مجاناً.' },
  { highlight: false, title: 'كيفية الإلغاء',                                  content: 'للإلغاء أو التعديل، تواصل معنا عبر واتساب على +212 661 659 607 مع رقم مرجع حجزك. تتم معالجة الإلغاءات فوراً.' },
  { highlight: false, title: 'المبالغ المستردة',                               content: 'في حالة الاسترداد الكامل، سنعالج المبلغ خلال 5–7 أيام عمل على وسيلة الدفع الأصلية.' },
]

// ── PRIVACY ───────────────────────────────────────────────────────────────────

const privacyEN = [
  { title: 'What Information We Collect',   content: 'When you make a booking, we collect your full name, email address, phone/WhatsApp number, pickup and drop-off addresses, flight number (if applicable), and travel date and time. We do not collect payment card details directly — online payments are processed securely by our payment provider.' },
  { title: 'How We Use Your Information',   content: 'Your information is used solely to confirm and manage your booking, communicate with you about your transfer, and send you a WhatsApp confirmation. We do not use your data for marketing without your explicit consent.' },
  { title: 'WhatsApp Communication',        content: 'By providing your WhatsApp number, you consent to receiving booking confirmation messages and driver coordination messages. We will never spam you or share your number with third parties.' },
  { title: 'Data Sharing',                  content: 'We do not sell, rent, or share your personal information with any third party, except your assigned driver who needs your name and pickup details to serve you.' },
  { title: 'Data Retention',                content: 'We retain your booking information for up to 12 months for operational and accounting purposes. After this period, your personal data is securely deleted.' },
  { title: 'Your Rights',                   content: 'You have the right to request access to, correction of, and deletion of your personal data. Contact us at nigor2.car@gmail.com to exercise these rights.' },
  { title: 'Cookies',                       content: 'Our website uses only essential cookies to remember your language preference and booking form progress. We do not use advertising or tracking cookies.' },
  { title: 'Security',                      content: 'All data transmission on our site uses HTTPS encryption. We take reasonable measures to protect your information from unauthorized access.' },
]

const privacyFR = [
  { title: 'Informations Collectées',           content: "Lors d'une réservation, nous collectons votre nom complet, email, numéro WhatsApp, adresses de prise en charge et de destination, numéro de vol et date de voyage." },
  { title: 'Utilisation de vos Données',        content: "Vos informations sont utilisées uniquement pour confirmer et gérer votre réservation et vous contacter par WhatsApp. Nous n'utilisons jamais vos données à des fins marketing sans votre consentement." },
  { title: 'Communication WhatsApp',            content: "En fournissant votre numéro WhatsApp, vous acceptez de recevoir des messages de confirmation et de coordination. Nous ne vous enverrons jamais de spam." },
  { title: 'Partage des Données',               content: "Nous ne vendons ni ne partageons vos informations personnelles avec des tiers, sauf votre chauffeur assigné." },
  { title: 'Conservation des Données',          content: "Nous conservons vos informations de réservation pendant 12 mois. Au-delà, vos données sont supprimées de manière sécurisée." },
  { title: 'Vos Droits',                        content: "Vous pouvez accéder, corriger ou supprimer vos données. Contactez-nous à nigor2.car@gmail.com." },
  { title: 'Cookies',                           content: "Notre site utilise uniquement des cookies essentiels pour la langue et la progression du formulaire. Aucun cookie publicitaire." },
  { title: 'Sécurité',                          content: "Toutes les transmissions utilisent le chiffrement HTTPS. Nous prenons des mesures raisonnables pour protéger vos informations." },
]

const privacyAR = [
  { title: 'المعلومات التي نجمعها',        content: 'عند إجراء حجز، نجمع اسمك الكامل وبريدك الإلكتروني ورقم واتساب وعناوين الاستلام والتوصيل ورقم الرحلة وتاريخ السفر.' },
  { title: 'كيفية استخدام معلوماتك',      content: 'تُستخدم معلوماتك فقط لتأكيد وإدارة حجزك والتواصل معك عبر واتساب. لن نستخدم بياناتك لأغراض تسويقية دون موافقتك.' },
  { title: 'التواصل عبر واتساب',          content: 'بتقديم رقم واتساب، توافق على تلقي رسائل تأكيد الحجز وتنسيق السائق. لن نرسل رسائل غير مرغوب فيها.' },
  { title: 'مشاركة البيانات',             content: 'لا نشارك معلوماتك الشخصية مع أي طرف ثالث، إلا السائق المعين الذي يحتاج إلى اسمك وتفاصيل الاستلام.' },
  { title: 'الاحتفاظ بالبيانات',          content: 'نحتفظ بمعلومات حجزك لمدة 12 شهراً، ثم يتم حذفها بشكل آمن.' },
  { title: 'حقوقك',                       content: 'لديك حق الوصول إلى بياناتك وتصحيحها وحذفها. تواصل معنا على nigor2.car@gmail.com.' },
  { title: 'ملفات تعريف الارتباط',        content: 'يستخدم موقعنا فقط ملفات تعريف الارتباط الأساسية لتذكر اللغة وتقدم النموذج. لا توجد ملفات إعلانية.' },
  { title: 'الأمان',                       content: 'تستخدم جميع عمليات نقل البيانات تشفير HTTPS.' },
]

// ── TERMS ─────────────────────────────────────────────────────────────────────

const termsEN = [
  { title: 'Service Description',    content: 'NIGOR 2Transport (operated by Carolina Prestige Travel, Dossier N° 1754/T/2018) provides licensed private tourist transport services in Morocco. All transfers are private — no shared vehicles, no other passengers.' },
  { title: 'Booking Confirmation',   content: 'A booking is confirmed only when you receive a confirmation message via WhatsApp or email containing your booking reference number (N2T-XXXXXXXX). Submitting the form alone does not guarantee availability.' },
  { title: 'Pricing',                content: 'All prices are per vehicle, not per person. Prices are fixed and all-inclusive — they include driver, fuel, tolls, and taxes. No additional charges will be applied unless you request extra services.' },
  { title: 'Passenger Responsibility', content: 'Passengers are responsible for being ready at the agreed pickup location at the agreed time. NIGOR 2Transport is not responsible for missed flights due to late passenger arrival.' },
  { title: 'Luggage',                content: 'Each vehicle has a stated luggage capacity. Oversized luggage (surfboards, bikes, large sports equipment) must be declared at booking. We may refuse undeclared oversized items.' },
  { title: 'Passenger Conduct',      content: 'Our drivers are professionally trained and licensed. NIGOR 2Transport reserves the right to terminate a journey if a passenger behaves in a threatening or dangerous manner, without refund.' },
  { title: 'Force Majeure',          content: 'NIGOR 2Transport is not liable for delays caused by extreme weather, road closures, civil unrest, or acts of God. In such cases, we will make every effort to rebook you at no extra cost.' },
  { title: 'Vehicle Substitution',   content: 'In exceptional circumstances, we may substitute the booked vehicle with one of equal or greater capacity. You will be notified in advance if possible.' },
  { title: 'Governing Law',          content: 'These terms are governed by the laws of the Kingdom of Morocco. Any disputes shall be subject to the jurisdiction of the courts of Casablanca.' },
  { title: 'Contact',                content: 'NIGOR 2Transport · Carolina Prestige Travel · Ain Borja, Casablanca, Morocco · WhatsApp: +212 661 659 607 · Email: nigor2.car@gmail.com' },
]

const termsFR = [
  { title: 'Description du Service',     content: "NIGOR 2Transport (Carolina Prestige Travel, Dossier N° 1754/T/2018) fournit des services de transport touristique privé agréés au Maroc. Tous les transferts sont privés." },
  { title: 'Confirmation de Réservation', content: "Une réservation est confirmée uniquement à la réception d'un message de confirmation contenant votre numéro de référence (N2T-XXXXXXXX)." },
  { title: 'Tarification',               content: "Tous les prix sont par véhicule, tout compris — chauffeur, carburant, péages et taxes. Aucun frais caché." },
  { title: 'Responsabilité du Passager', content: "Les passagers sont responsables d'être prêts au lieu de prise en charge à l'heure convenue. NIGOR 2Transport n'est pas responsable des vols manqués." },
  { title: 'Bagages',                    content: "Les bagages surdimensionnés doivent être déclarés lors de la réservation." },
  { title: 'Conduite des Passagers',     content: "NIGOR 2Transport se réserve le droit de mettre fin à un voyage si un passager se comporte de manière dangereuse, sans remboursement." },
  { title: 'Force Majeure',              content: "NIGOR 2Transport n'est pas responsable des retards causés par des circonstances indépendantes de notre volonté." },
  { title: 'Substitution de Véhicule',  content: "Dans des circonstances exceptionnelles, nous pouvons substituer le véhicule par un modèle de capacité égale ou supérieure." },
  { title: 'Droit Applicable',          content: "Ces conditions sont régies par les lois du Royaume du Maroc. Tout litige sera soumis aux tribunaux de Casablanca." },
  { title: 'Contact',                   content: "NIGOR 2Transport · Carolina Prestige Travel · Ain Borja, Casablanca, Maroc · WhatsApp: +212 661 659 607 · Email: nigor2.car@gmail.com" },
]

const termsAR = [
  { title: 'وصف الخدمة',              content: 'تقدم NIGOR 2Transport (Carolina Prestige Travel، ملف رقم 1754/T/2018) خدمات نقل سياحي خاص مرخصة في المغرب. جميع عمليات النقل خاصة.' },
  { title: 'تأكيد الحجز',             content: 'يتم تأكيد الحجز فقط عند تلقي رسالة تأكيد تحتوي على رقم مرجع حجزك (N2T-XXXXXXXX).' },
  { title: 'التسعير',                  content: 'جميع الأسعار للسيارة وشاملة — تشمل السائق والوقود والرسوم والضرائب. لا رسوم خفية.' },
  { title: 'مسؤولية الركاب',          content: 'الركاب مسؤولون عن التواجد في موقع الاستلام في الوقت المتفق عليه. لا تتحمل NIGOR 2Transport مسؤولية تفويت الرحلات.' },
  { title: 'الأمتعة',                  content: 'يجب الإعلان عن الأمتعة الكبيرة وقت الحجز. نحتفظ بحق رفض الأمتعة غير المُعلنة.' },
  { title: 'سلوك الركاب',             content: 'تحتفظ NIGOR 2Transport بحق إنهاء الرحلة إذا تصرف الراكب بطريقة خطرة، دون استرداد.' },
  { title: 'القوة القاهرة',            content: 'لا تتحمل NIGOR 2Transport المسؤولية عن التأخيرات الناجمة عن ظروف خارجة عن إرادتنا.' },
  { title: 'استبدال المركبة',          content: 'في ظروف استثنائية، قد نستبدل المركبة بأخرى ذات سعة مماثلة أو أكبر.' },
  { title: 'القانون المطبق',           content: 'تخضع هذه الشروط لقوانين المملكة المغربية. تخضع أي نزاعات لاختصاص محاكم الدار البيضاء.' },
  { title: 'التواصل',                  content: 'NIGOR 2Transport · Carolina Prestige Travel · عين البرجة، الدار البيضاء، المغرب · واتساب: +212 661 659 607 · البريد: nigor2.car@gmail.com' },
]

// ── ACCORDION ─────────────────────────────────────────────────────────────────

function AccordionItem({
  title, content, highlight, isRTL,
}: { title: string; content: string; highlight?: boolean; isRTL: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={cn(
      'border rounded-2xl overflow-hidden transition-all duration-200',
      highlight ? 'border-green-200 bg-green-50/40' : 'border-sand-dark bg-white',
      open && 'shadow-card'
    )}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'w-full flex items-center justify-between gap-4 px-6 py-4',
          isRTL ? 'flex-row-reverse text-right' : 'text-left'
        )}
      >
        <div className={cn('flex items-center gap-3', isRTL && 'flex-row-reverse')}>
          {highlight && <CheckCircle size={15} className="text-green-500 shrink-0" />}
          <span className="font-semibold text-sm text-charcoal leading-snug">{title}</span>
        </div>
        <ChevronDown
          size={16}
          className={cn('text-charcoal/30 shrink-0 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className={cn(
              'px-6 pb-5 text-sm text-charcoal/60 leading-relaxed border-t border-sand pt-4',
              isRTL && 'text-right'
            )}>
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function PolicyContent() {
  const { language, isRTL } = useTranslation()
  const [activeTab, setActiveTab] = useState<'cancellation' | 'privacy' | 'terms'>('cancellation')

  const dataMap = {
    cancellation: { en: cancellationEN, fr: cancellationFR, ar: cancellationAR },
    privacy:      { en: privacyEN,      fr: privacyFR,      ar: privacyAR      },
    terms:        { en: termsEN,        fr: termsFR,        ar: termsAR        },
  }

  const getContent = () => (dataMap[activeTab] as any)[language] ?? dataMap[activeTab].en

  const getTabLabel = (tab: typeof tabs[0]) =>
    language === 'ar' ? tab.labelAR : language === 'fr' ? tab.labelFR : tab.labelEN

  const pageTitle    = language === 'ar' ? 'السياسات والشروط'   : language === 'fr' ? 'Politiques & Conditions' : 'Policies & Terms'
  const pageSubtitle = language === 'ar'
    ? 'سياسة الإلغاء · سياسة الخصوصية · الشروط والأحكام'
    : language === 'fr'
    ? "Politique d'annulation · Confidentialité · Conditions générales"
    : 'Cancellation Policy · Privacy Policy · Terms & Conditions'
  const lastUpdated  = language === 'ar' ? 'آخر تحديث: أبريل 2025' : language === 'fr' ? 'Dernière mise à jour : Avril 2025' : 'Last updated: April 2025'
  const contactNote  = language === 'ar'
    ? 'للأسئلة حول هذه السياسات، تواصل معنا عبر واتساب على +212 661 659 607 أو عبر البريد الإلكتروني nigor2.car@gmail.com'
    : language === 'fr'
    ? 'Pour toute question, contactez-nous par WhatsApp au +212 661 659 607 ou par email à nigor2.car@gmail.com'
    : 'For questions about these policies, contact us on WhatsApp at +212 661 659 607 or by email at nigor2.car@gmail.com'

  return (
    <div className="pt-20 min-h-screen bg-cream">

      {/* Header */}
      <div className="bg-charcoal py-16 relative overflow-hidden">
        <div className="absolute inset-0 zellige-bg opacity-40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/20 border border-gold/30 rounded-full text-gold text-sm font-semibold mb-4">
              <Shield size={14} />
              NIGOR 2Transport
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">{pageTitle}</h1>
            <p className="text-white/50 text-base mb-2">{pageSubtitle}</p>
            <p className="text-white/30 text-xs">{lastUpdated}</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Tab selector */}
        <div className={cn('flex flex-col sm:flex-row gap-3 mb-10', isRTL && 'sm:flex-row-reverse')}>
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  'flex-1 flex items-center gap-3 px-5 py-4 rounded-2xl border-2 font-semibold text-sm transition-all duration-200',
                  isRTL && 'flex-row-reverse',
                  isActive
                    ? 'border-terracotta bg-terracotta text-white shadow-glow'
                    : 'border-sand-dark bg-white text-charcoal/60 hover:border-terracotta/40 hover:bg-sand/30'
                )}
              >
                <Icon size={18} className="shrink-0" />
                <span>{getTabLabel(tab)}</span>
              </button>
            )
          })}
        </div>

        {/* Accordion content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + language}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            {getContent().map((item: any, i: number) => (
              <AccordionItem
                key={i}
                title={item.title}
                content={item.content}
                highlight={item.highlight}
                isRTL={isRTL}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Contact note */}
        <div className={cn(
          'mt-10 p-6 bg-white border border-sand-dark rounded-2xl shadow-card text-center',
          isRTL && 'text-right'
        )}>
          <p className="text-sm text-charcoal/50 leading-relaxed">{contactNote}</p>
        </div>
      </div>
    </div>
  )
}
