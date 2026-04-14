export type BlogLang = "en" | "fr" | "ar";

export interface ArticleTrans {
  title: string;
  description: string;
  keywords: string[];
  content: string;
}

export interface BlogArticle {
  slug: string;
  date: string;
  readTime: number;
  coverImage: string;
  translations: Record<BlogLang, ArticleTrans>;
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "transfer-aeroport-casablanca-cmn",
    date: "2026-03-15",
    readTime: 5,
    coverImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    translations: {
      fr: {
        title: "Transfert Aéroport Casablanca CMN : Tout ce qu'il faut savoir",
        description: "Guide complet pour organiser votre transfert depuis ou vers l'aéroport Mohammed V de Casablanca (CMN). Prix, conseils, réservation en ligne.",
        keywords: ["transfer CMN Casablanca", "transfert aéroport CMN", "taxi aéroport Casablanca", "navette CMN", "transfert Mohammed V"],
        content: `
## Transfert Aéroport Casablanca CMN : le guide complet

L'aéroport international Mohammed V de Casablanca (code IATA : CMN) est le principal hub aérien du Maroc. Chaque année, des millions de voyageurs transitent par cet aéroport et se posent la même question : comment rejoindre leur destination en toute sécurité et sans mauvaise surprise ?

### Pourquoi choisir un transfert privé depuis l'aéroport CMN ?

À votre arrivée à l'aéroport Mohammed V, plusieurs options s'offrent à vous : taxi, train, bus ou transfert privé. Les taxis de l'aéroport sont souvent source de litiges sur les prix, surtout pour les voyageurs étrangers. Le train est pratique mais limité en termes de destination. Le transfert privé, lui, combine confort, ponctualité et prix fixe.

Avec **NIGOR 2Transport**, votre chauffeur vous attend directement dans le hall des arrivées avec un panneau à votre nom. Pas d'attente, pas de négociation : tout est réglé à l'avance.

### Les destinations desservies depuis CMN

Depuis l'aéroport de Casablanca, nous proposons des transferts vers toutes les grandes villes du Maroc :

- **Casablanca** (centre-ville, Ain Borja, Anfa) : à partir de 150 DH
- **Rabat** : à partir de 350 DH
- **Marrakech** : à partir de 950 DH
- **Fès** : à partir de 950 DH
- **Tanger** : à partir de 1 200 DH
- **Agadir** : à partir de 1 500 DH
- **Essaouira** : à partir de 1 200 DH
- **Chefchaouen** : à partir de 1 300 DH

Ces tarifs sont **par véhicule**, toutes taxes et péages inclus. Pas de supplément bagage, pas de frais cachés.

### Comment réserver votre transfert CMN ?

La réservation se fait en 3 étapes simples depuis notre site :

1. **Sélectionnez votre trajet** : choisissez "Transfert Aéroport", indiquez CMN comme aéroport, et votre ville de destination.
2. **Choisissez votre véhicule** : Skoda Superb pour 1 à 3 passagers, Mercedes Vito pour 4 à 7, ou Mercedes Sprinter pour les grands groupes.
3. **Confirmez vos informations** : nom, téléphone, numéro de vol et adresse de l'hôtel.

Votre chauffeur sera informé en temps réel en cas de retard de vol. Vous ne payez rien de plus si votre avion arrive avec 2 heures de retard.

### Conseils pratiques pour votre transfert CMN

**Arrivée à Casablanca :**
- Après avoir récupéré vos bagages, dirigez-vous vers la sortie Arrivées. Votre chauffeur vous y attend avec un panneau.
- Partagez votre numéro de vol lors de la réservation pour que le chauffeur ajuste son heure d'arrivée automatiquement.
- Prévoyez 45 minutes à 1h30 de trajet vers le centre-ville selon la circulation.

**Départ depuis Casablanca :**
- Prévoyez d'être à l'aéroport au moins 2h avant pour les vols intérieurs, 3h pour les vols internationaux.
- Le chauffeur vous récupère à l'adresse indiquée lors de la réservation.
- Inutile de chercher un taxi de nuit : nous opérons 24h/24, 7j/7.

### Notre flotte de véhicules

Tous nos véhicules sont récents, climatisés et entretenus régulièrement :

- **Skoda Superb** : berline confortable idéale pour 1 à 3 passagers avec bagages
- **Mercedes E-Class** : berline premium pour les voyages d'affaires
- **Mercedes Vito** : van spacieux pour 4 à 7 passagers
- **Mercedes Sprinter** : minibus pour les groupes de 8 à 14 personnes

### NIGOR 2Transport : votre partenaire de confiance

Basés à Casablanca (Ain Borja), nous opérons depuis plusieurs années sur tous les trajets depuis et vers l'aéroport CMN. Notre priorité : votre ponctualité et votre confort. Nos chauffeurs sont professionnels, parlent français et anglais, et connaissent parfaitement les routes du Maroc.

**Réservez votre transfert dès maintenant** et voyagez l'esprit tranquille. Prix fixe, chauffeur ponctuel, aucun supplément.
        `.trim(),
      },
      en: {
        title: "Casablanca CMN Airport Transfer: The Complete Guide",
        description: "Complete guide to organising your transfer to or from Casablanca Mohammed V Airport (CMN). Prices, tips and online booking.",
        keywords: ["CMN airport transfer", "Casablanca airport taxi", "CMN shuttle", "Mohammed V transfer", "private transfer Casablanca"],
        content: `
## Casablanca CMN Airport Transfer: The Complete Guide

Mohammed V International Airport in Casablanca (IATA code: CMN) is Morocco's main aviation hub. Millions of travellers pass through each year, all asking the same question: how do I reach my destination safely and without unpleasant surprises?

### Why choose a private transfer from CMN airport?

On arrival at Mohammed V Airport, you have several options: taxi, train, bus or private transfer. Airport taxis are frequently a source of price disputes, especially for foreign travellers. The train is practical but limited in terms of destinations. Private transfer combines comfort, punctuality and a fixed price.

With **NIGOR 2Transport**, your driver waits for you directly in the arrivals hall with a sign bearing your name. No waiting, no negotiation — everything is settled in advance.

### Destinations served from CMN

From Casablanca airport, we offer transfers to all major Moroccan cities:

- **Casablanca** (city centre, Ain Borja, Anfa): from 150 MAD
- **Rabat**: from 350 MAD
- **Marrakech**: from 950 MAD
- **Fès**: from 950 MAD
- **Tanger**: from 1,200 MAD
- **Agadir**: from 1,500 MAD
- **Essaouira**: from 1,200 MAD
- **Chefchaouen**: from 1,300 MAD

These rates are **per vehicle**, including all taxes and motorway tolls. No luggage surcharge, no hidden fees.

### How to book your CMN transfer

Booking takes 3 simple steps on our website:

1. **Select your route**: choose "Airport Transfer", enter CMN as the airport and your destination city.
2. **Choose your vehicle**: Skoda Superb for 1–3 passengers, Mercedes Vito for 4–7, or Mercedes Sprinter for large groups.
3. **Confirm your details**: name, phone number, flight number and hotel address.

Your driver will be notified in real time of any flight delays. You pay nothing extra if your plane arrives up to 2 hours late.

### Practical tips for your CMN transfer

**Arriving in Casablanca:**
- After collecting your luggage, head to the Arrivals exit. Your driver will be waiting with a sign.
- Share your flight number when booking so the driver automatically adjusts their arrival time.
- Allow 45 minutes to 1.5 hours to the city centre depending on traffic.

**Departing from Casablanca:**
- Arrive at the airport at least 2 hours before domestic flights, 3 hours for international flights.
- The driver picks you up at the address you gave when booking.
- No need to hunt for a night taxi — we operate 24/7.

### Our vehicle fleet

All our vehicles are modern, air-conditioned and regularly maintained:

- **Skoda Superb**: comfortable saloon ideal for 1–3 passengers with luggage
- **Mercedes E-Class**: premium saloon for business travel
- **Mercedes Vito**: spacious van for 4–7 passengers
- **Mercedes Sprinter**: minibus for groups of 8–14 people

### NIGOR 2Transport: your trusted partner

Based in Casablanca (Ain Borja), we have been operating on all routes to and from CMN airport for several years. Our priority: your punctuality and comfort. Our drivers are professional, speak French and English, and know Morocco's roads perfectly.

**Book your transfer now** and travel with complete peace of mind. Fixed price, punctual driver, no extra charges.
        `.trim(),
      },
      ar: {
        title: "دليل النقل من والى مطار الدار البيضاء CMN",
        description: "دليل شامل لتنظيم رحلة النقل من وإلى مطار محمد الخامس الدولي بالدار البيضاء (CMN). الأسعار والنصائح والحجز عبر الإنترنت.",
        keywords: ["نقل مطار CMN", "تاكسي مطار الدار البيضاء", "نقل خاص CMN", "نقل محمد الخامس", "نقل خاص الدار البيضاء"],
        content: `
## دليل النقل من والى مطار الدار البيضاء CMN

يُعدّ مطار محمد الخامس الدولي في الدار البيضاء (الرمز الدولي: CMN) المحطة الجوية الرئيسية في المغرب. يمرّ عبره ملايين المسافرين كل عام، وكلهم يتساءلون: كيف أصل إلى وجهتي بأمان ودون مفاجآت غير سارّة؟

### لماذا تختار النقل الخاص من مطار CMN؟

عند وصولك إلى مطار محمد الخامس، تتوفر أمامك عدة خيارات: سيارة الأجرة، والقطار، والحافلة، والنقل الخاص. كثيرًا ما تكون سيارات الأجرة في المطار مصدرًا للنزاعات حول الأسعار، لا سيما بالنسبة للزوار الأجانب. أما القطار فهو مريح لكنه محدود من حيث الوجهات. في المقابل، يجمع النقل الخاص بين الراحة والالتزام بالمواعيد والسعر الثابت.

مع **NIGOR 2Transport**، ينتظرك سائقك مباشرةً في صالة الوصول حاملاً لافتةً باسمك. لا انتظار، لا تفاوض — كل شيء محدد مسبقًا.

### الوجهات التي تُغطيها من مطار CMN

من مطار الدار البيضاء، نوفر خدمة النقل إلى جميع المدن الرئيسية المغربية:

- **الدار البيضاء** (وسط المدينة، عين البرجة، أنفا): ابتداءً من 150 درهم
- **الرباط**: ابتداءً من 350 درهم
- **مراكش**: ابتداءً من 950 درهم
- **فاس**: ابتداءً من 950 درهم
- **طنجة**: ابتداءً من 1200 درهم
- **أكادير**: ابتداءً من 1500 درهم
- **الصويرة**: ابتداءً من 1200 درهم
- **شفشاون**: ابتداءً من 1300 درهم

هذه الأسعار **للسيارة كاملةً**، شاملةً لجميع الضرائب ورسوم الطريق السريع. لا رسوم إضافية على الأمتعة، ولا تكاليف خفية.

### كيف تحجز رحلة النقل من مطار CMN؟

الحجز يتم في 3 خطوات بسيطة عبر موقعنا:

1. **حدد مسارك**: اختر "نقل المطار"، وأدخل CMN كمطار الانطلاق، ثم المدينة التي تريد الوصول إليها.
2. **اختر سيارتك**: سكودا سوبرب لـ1-3 ركاب، مرسيدس فيتو لـ4-7 ركاب، أو مرسيدس سبرينتر للمجموعات الكبيرة.
3. **أكد بياناتك**: الاسم، ورقم الهاتف، ورقم الرحلة، وعنوان الفندق.

سيُخطَر سائقك في الوقت الفعلي بأي تأخير في الرحلة. لن تدفع أي مبلغ إضافي إذا تأخرت طائرتك حتى ساعتين.

### نصائح عملية لرحلة النقل من CMN

**عند الوصول إلى الدار البيضاء:**
- بعد استلام أمتعتك، اتجه نحو مخرج الوصول. سيكون سائقك في انتظارك بلافتة تحمل اسمك.
- أرسل رقم رحلتك عند الحجز حتى يضبط السائق وقت وصوله تلقائيًا.
- احتسب من 45 دقيقة إلى ساعة ونصف للوصول إلى وسط المدينة حسب حركة المرور.

**عند المغادرة من الدار البيضاء:**
- احرص على الوصول إلى المطار قبل ساعتين على الأقل للرحلات الداخلية، وثلاث ساعات للرحلات الدولية.
- يأتيك السائق إلى العنوان الذي أدخلته عند الحجز.
- لا حاجة للبحث عن سيارة أجرة ليلاً — نحن نعمل على مدار الساعة طوال أيام الأسبوع.

### أسطولنا من المركبات

جميع سياراتنا حديثة ومكيّفة وتخضع لصيانة دورية منتظمة:

- **سكودا سوبرب**: سيدان مريحة مثالية لـ1-3 ركاب مع أمتعة
- **مرسيدس E-Class**: سيدان فاخرة لرحلات الأعمال
- **مرسيدس فيتو**: حافلة صغيرة فسيحة لـ4-7 ركاب
- **مرسيدس سبرينتر**: ميني باص للمجموعات من 8 إلى 14 شخصًا

### NIGOR 2Transport: شريكك الموثوق

نحن متمركزون في الدار البيضاء (عين البرجة)، ونعمل منذ سنوات على جميع المسارات من وإلى مطار CMN. أولويتنا: التزامك بالمواعيد وراحتك. سائقونا محترفون، يتحدثون الفرنسية والإنجليزية، ويعرفون طرق المغرب معرفةً تامة.

**احجز رحلة النقل الآن** وسافر بكل طمأنينة. سعر ثابت، سائق في الموعد، بدون رسوم إضافية.
        `.trim(),
      },
    },
  },
  {
    slug: "navette-aeroport-casablanca",
    date: "2026-02-20",
    readTime: 6,
    coverImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
    translations: {
      fr: {
        title: "Navette Aéroport Casablanca : Privé vs Taxi vs Bus",
        description: "Comparatif complet des options de transport depuis l'aéroport de Casablanca CMN : navette privée, taxi, train et bus. Découvrez la meilleure option pour vous.",
        keywords: ["navette aéroport Casablanca", "transport aéroport CMN", "taxi CMN Casablanca", "train aéroport Casablanca", "comment aller aéroport Casablanca"],
        content: `
## Navette Aéroport Casablanca : quel transport choisir ?

Vous arrivez à l'aéroport Mohammed V de Casablanca et vous vous demandez comment rejoindre votre destination ? Ce guide compare toutes les options disponibles pour vous aider à faire le meilleur choix selon votre budget, votre groupe et vos priorités.

### Option 1 : Le taxi depuis l'aéroport CMN

**Avantages :**
- Disponible immédiatement, sans réservation
- Peut s'arrêter en route si nécessaire

**Inconvénients :**
- Tarifs variables, souvent surévalués pour les touristes
- Litiges fréquents sur le prix final
- Capacité limitée à 3 passagers avec peu de bagages

**Tarif indicatif** : 300 à 500 DH vers le centre de Casablanca

### Option 2 : Le train ONCF (Casa Voyageurs)

**Avantages :**
- Prix fixe et abordable (50 à 100 DH selon la classe)
- Horaires réguliers (toutes les 30 min environ)
- Évite les embouteillages

**Inconvénients :**
- Dessert uniquement Casablanca
- Pas disponible pour les autres villes (Marrakech, Fès, Agadir...)
- Derniers trains tôt le soir

**Tarif** : environ 50 DH en 2ème classe vers Casa Voyageurs

### Option 3 : Le bus CTM / Supratours

**Avantages :**
- Prix économique
- Dessert plusieurs villes

**Inconvénients :**
- Horaires fixes, peu flexibles
- Confort moyen sur les longs trajets
- Pas idéal après un long vol international

### Option 4 : La navette privée (Transfert NIGOR 2Transport)

**Avantages :**
- **Chauffeur qui vous attend dans le hall** avec panneau à votre nom
- **Prix fixe annoncé à l'avance** — pas de mauvaise surprise
- **Toutes destinations** : Marrakech, Fès, Agadir, Essaouira, Tanger...
- **Attente gratuite** si le vol est retardé (jusqu'à 2h)
- **Véhicules spacieux** et climatisés pour 1 à 14 passagers
- **Disponible 24h/24, 7j/7**

### Notre recommandation

Pour un **voyageur solo** arrivant à Casablanca, le train reste une bonne option économique. Mais dès que vous êtes **en famille, en groupe**, ou que vous partez vers **une autre ville**, la navette privée est clairement la meilleure option.

Avec **NIGOR 2Transport**, réservez en ligne en 3 minutes. Votre chauffeur sera là, même si votre vol a du retard.
        `.trim(),
      },
      en: {
        title: "Casablanca Airport Shuttle: Private vs Taxi vs Bus",
        description: "Complete comparison of transport options from Casablanca CMN airport: private shuttle, taxi, train and bus. Find the best option for you.",
        keywords: ["Casablanca airport shuttle", "CMN airport transport", "CMN taxi", "Casablanca airport train", "how to get from Casablanca airport"],
        content: `
## Casablanca Airport Shuttle: Which Transport to Choose?

You've arrived at Mohammed V Airport in Casablanca and you're wondering how to reach your destination. This guide compares all available options to help you choose based on your budget, group size and priorities.

### Option 1: Taxi from CMN Airport

**Advantages:**
- Available immediately, no reservation needed
- Can make stops along the way

**Disadvantages:**
- Variable fares, often inflated for tourists
- Frequent disputes over the final price
- Limited to 3 passengers with little luggage

**Estimated fare**: 300–500 MAD to central Casablanca (subject to negotiation)

### Option 2: ONCF Train (Casa Voyageurs)

**Advantages:**
- Fixed and affordable price (50–100 MAD depending on class)
- Regular timetable (every ~30 minutes)
- Avoids traffic jams

**Disadvantages:**
- Only serves Casablanca (Casa Voyageurs, Casa Port)
- Not available for other cities (Marrakech, Fès, Agadir...)
- Last trains run early in the evening

**Fare**: approx. 50 MAD in 2nd class to Casa Voyageurs

### Option 3: CTM / Supratours Bus

**Advantages:**
- Economical price
- Serves several cities

**Disadvantages:**
- Fixed timetables with little flexibility
- Average comfort on long journeys
- Not ideal after a long international flight

### Option 4: Private Shuttle (NIGOR 2Transport Transfer)

**Advantages:**
- **Driver waiting for you in the arrivals hall** with a sign bearing your name
- **Fixed price agreed in advance** — no nasty surprises
- **All destinations**: Marrakech, Fès, Agadir, Essaouira, Tanger...
- **Free waiting** if your flight is delayed (up to 2 hours)
- **Spacious, air-conditioned vehicles** for 1–14 passengers
- **Available 24/7**

### Our Recommendation

For a **solo traveller** arriving in Casablanca, the train remains a good economical option. But as soon as you're **with family or a group**, or heading to **another city**, the private shuttle is clearly the best option — superior comfort, punctuality and value.

With **NIGOR 2Transport**, book online in 3 minutes. Your driver will be there even if your flight is delayed.
        `.trim(),
      },
      ar: {
        title: "نقل مطار الدار البيضاء: خاص مقابل تاكسي مقابل حافلة",
        description: "مقارنة شاملة لخيارات النقل من مطار الدار البيضاء CMN: النقل الخاص، وسيارة الأجرة، والقطار، والحافلة. اكتشف الخيار الأنسب لك.",
        keywords: ["نقل مطار الدار البيضاء", "وسائل النقل مطار CMN", "تاكسي CMN", "قطار مطار الدار البيضاء", "كيف أصل من مطار الدار البيضاء"],
        content: `
## نقل مطار الدار البيضاء: أيّ وسيلة مواصلات تختار؟

وصلت للتو إلى مطار محمد الخامس في الدار البيضاء وتتساءل كيف تصل إلى وجهتك. يقارن هذا الدليل جميع الخيارات المتاحة لمساعدتك في اتخاذ أفضل قرار وفقًا لميزانيتك وحجم مجموعتك وأولوياتك.

### الخيار الأول: سيارة الأجرة من مطار CMN

**المزايا:**
- متوفرة فورًا، دون حاجة إلى حجز مسبق
- يمكنها التوقف في الطريق عند الحاجة

**العيوب:**
- أسعار متفاوتة، كثيرًا ما تكون مبالغًا فيها بالنسبة للسياح
- نزاعات متكررة حول السعر النهائي
- السعة محدودة بـ3 ركاب مع أمتعة قليلة

**السعر التقريبي**: 300-500 درهم إلى وسط الدار البيضاء

### الخيار الثاني: قطار ONCF (كاسا فوياجور)

**المزايا:**
- سعر ثابت وميسور (50-100 درهم حسب الدرجة)
- مواعيد منتظمة (كل 30 دقيقة تقريبًا)
- يتفادى الازدحام المروري

**العيوب:**
- يخدم الدار البيضاء فحسب
- غير متوفر للمدن الأخرى (مراكش وفاس وأكادير...)
- آخر القطارات يغادر مبكرًا في المساء

**السعر**: نحو 50 درهمًا بالدرجة الثانية

### الخيار الثالث: حافلة CTM / Supratours

**المزايا:**
- سعر اقتصادي
- تخدم عدة مدن

**العيوب:**
- مواعيد ثابتة وقليلة المرونة
- راحة متوسطة في الرحلات الطويلة
- غير مثالية بعد رحلة دولية طويلة

### الخيار الرابع: النقل الخاص (NIGOR 2Transport)

**المزايا:**
- **سائق ينتظرك في صالة الوصول** بلافتة تحمل اسمك
- **سعر ثابت متفق عليه مسبقًا** — لا مفاجآت غير سارة
- **جميع الوجهات**: مراكش وفاس وأكادير والصويرة وطنجة...
- **انتظار مجاني** في حال تأخر رحلتك (حتى ساعتين)
- **سيارات فسيحة ومكيفة** تتسع من 1 إلى 14 راكبًا
- **متاح على مدار الساعة طوال أيام الأسبوع**

### توصيتنا

بالنسبة لـ**المسافر الفردي** القادم إلى الدار البيضاء، يبقى القطار خيارًا اقتصاديًا جيدًا. لكن بمجرد أن تكون **مع عائلة أو مجموعة**، أو متجهًا إلى **مدينة أخرى**، فإن النقل الخاص هو الخيار الأفضل بلا منازع.

مع **NIGOR 2Transport**، احجز عبر الإنترنت في 3 دقائق. سائقك سيكون في انتظارك حتى لو تأخرت رحلتك.
        `.trim(),
      },
    },
  },
  {
    slug: "transfert-prive-maroc",
    date: "2026-01-10",
    readTime: 7,
    coverImage: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80",
    translations: {
      fr: {
        title: "Transfert Privé au Maroc : Le Guide Complet 2026",
        description: "Tout savoir sur les transferts privés au Maroc en 2026 : principales routes, prix, conseils et comment réserver. Guide complet par NIGOR 2Transport.",
        keywords: ["transfert privé Maroc", "transport privé Maroc", "chauffeur privé Maroc", "transfert ville Maroc", "taxi privé Maroc"],
        content: `
## Transfert Privé au Maroc : Le Guide Complet 2026

Le Maroc est une destination fascinante, riche en paysages, en culture et en villes impériales. Mais se déplacer d'une ville à l'autre peut vite devenir un casse-tête si vous ne préparez pas votre logistique de transport. Le transfert privé s'impose comme la solution la plus confortable, la plus sûre et souvent la plus économique pour les groupes.

### Pourquoi le transfert privé est la meilleure option au Maroc ?

Les transports en commun existent au Maroc (bus CTM, trains ONCF, grands taxis), mais ils ont des limites importantes :

- **Horaires fixes** qui ne correspondent pas forcément à vos plans
- **Qualité variable** selon les compagnies
- **Capacité limitée** pour les bagages et les groupes
- **Impossibilité** d'aller door-to-door dans les médinas ou les zones rurales

### Les principales routes de transfert au Maroc

#### Casablanca ↔ Marrakech
L'une des routes les plus demandées. Distance : environ 240 km, trajet : 2h30 à 3h via l'autoroute A7.

**Prix indicatif** : à partir de 950 DH pour une berline (1-3 pax)

#### Casablanca ↔ Rabat
Trajet de 90 km, environ 1h à 1h30 selon la circulation.

**Prix indicatif** : à partir de 350 DH

#### Marrakech ↔ Essaouira
Route côtière magnifique de 175 km, 2h30 de trajet. Essaouira n'est pas accessible par le train.

**Prix indicatif** : à partir de 750 DH

#### Fès ↔ Chefchaouen
Route de 200 km dans les montagnes du Rif, environ 3h.

**Prix indicatif** : à partir de 800 DH

#### Marrakech ↔ Ouarzazate
Route de 200 km sur les routes de montagne de l'Atlas. 3h à 3h30 de trajet.

**Prix indicatif** : à partir de 900 DH

#### Agadir ↔ Marrakech
330 km via l'autoroute, environ 3h30.

**Prix indicatif** : à partir de 1 100 DH

### Nos conseils pour organiser vos déplacements

**1. Réservez à l'avance**
En haute saison (mai-juin, septembre-octobre), les véhicules se réservent rapidement. Réservez au moins 48h à l'avance.

**2. Communiquez votre adresse exacte**
Les médinas de Fès, Marrakech ou Rabat ont des ruelles inaccessibles aux véhicules. Indiquez le point d'accès le plus proche de votre riad.

**3. Prévoyez les péages**
Les autoroutes marocaines sont à péage. Chez NIGOR 2Transport, les péages sont inclus dans le prix affiché.

**4. Optez pour le bon véhicule**
- 1 à 3 passagers : Skoda Superb ou Mercedes E-Class
- 4 à 7 passagers : Mercedes Vito
- 8 à 14 passagers : Mercedes Sprinter

### Les transferts multi-jours

**Formules disponibles :**
- **Demi-journée (5h)** : idéal pour une excursion depuis Marrakech
- **Journée complète (10h)** : parfait pour relier deux villes avec des arrêts
- **2 jours** : avec remise de 5%
- **3 jours et plus** : avec remise de 10%

### Pourquoi choisir NIGOR 2Transport ?

✅ **Prix fixes et transparents** : le prix affiché est le prix payé, sans supplément surprise
✅ **Chauffeurs professionnels** : expérimentés, ponctuels et parlant français/anglais
✅ **Flotte récente** : véhicules climatisés, régulièrement entretenus
✅ **Disponibilité 24h/24** : même pour les départs très tôt ou très tard
✅ **Réservation en ligne simple** : confirmation immédiate par email
✅ **Suivi de vol** : votre chauffeur adapte son heure d'arrivée en cas de retard

**Réservez votre transfert privé au Maroc** directement sur notre site et voyagez sereinement.
        `.trim(),
      },
      en: {
        title: "Private Transfer in Morocco: The Complete 2026 Guide",
        description: "Everything you need to know about private transfers in Morocco in 2026: main routes, prices, tips and how to book. Complete guide by NIGOR 2Transport.",
        keywords: ["private transfer Morocco", "private transport Morocco", "private driver Morocco", "city transfer Morocco", "private taxi Morocco"],
        content: `
## Private Transfer in Morocco: The Complete 2026 Guide

Morocco is a fascinating destination, rich in landscapes, culture and imperial cities. But getting from one city to another can quickly become a headache without proper transport planning. Private transfer stands out as the most comfortable, safest and often most economical solution for groups.

### Why private transfer is the best option in Morocco

Public transport exists in Morocco (CTM buses, ONCF trains, grand taxis), but it has significant limitations:

- **Fixed schedules** that may not match your plans
- **Variable quality** depending on the operator
- **Limited capacity** for luggage and groups
- **Inability** to travel door-to-door in medinas or rural areas

### The main transfer routes in Morocco

#### Casablanca ↔ Marrakech
One of the most requested routes. Approximately 240 km, 2.5 to 3 hours via the A7 motorway.

**Estimated price**: from 950 MAD for a saloon (1–3 pax)

#### Casablanca ↔ Rabat
90 km, about 1 to 1.5 hours depending on traffic.

**Estimated price**: from 350 MAD

#### Marrakech ↔ Essaouira
Beautiful 175 km coastal route, 2.5 hours. Essaouira is not accessible by train.

**Estimated price**: from 750 MAD

#### Fès ↔ Chefchaouen
200 km through the Rif mountains, approximately 3 hours.

**Estimated price**: from 800 MAD

#### Marrakech ↔ Ouarzazate
200 km on Atlas mountain roads. 3 to 3.5 hours of breathtaking scenery.

**Estimated price**: from 900 MAD

#### Agadir ↔ Marrakech
330 km on the motorway, approximately 3.5 hours.

**Estimated price**: from 1,100 MAD

### Tips for travelling around Morocco

**1. Book in advance**
In high season (May–June, September–October), vehicles book up quickly. Reserve at least 48 hours ahead.

**2. Provide your exact address**
The medinas of Fès, Marrakech and Rabat have narrow lanes inaccessible to vehicles. Give the nearest access point to your riad or send a Google Maps link.

**3. Motorway tolls are included**
Moroccan motorways are tolled. At NIGOR 2Transport, tolls are included in the displayed price.

**4. Choose the right vehicle**
- 1 to 3 passengers: Skoda Superb or Mercedes E-Class
- 4 to 7 passengers: Mercedes Vito
- 8 to 14 passengers: Mercedes Sprinter

### Multi-day transfers: private driver hire

**Available packages:**
- **Half day (5h)**: ideal for an excursion from Marrakech (Ourika Valley, Aït Ben Haddou...)
- **Full day (10h)**: perfect for connecting two cities with stops en route
- **2 days**: with 5% discount
- **3 days or more**: with 10% discount

### Why choose NIGOR 2Transport?

✅ **Fixed and transparent pricing**: the price shown is the price you pay — no hidden surcharges
✅ **Professional drivers**: experienced, punctual, speaking French and English
✅ **Modern fleet**: air-conditioned vehicles, regularly maintained
✅ **Available 24/7**: even for very early or very late departures
✅ **Simple online booking**: immediate email confirmation
✅ **Flight tracking**: your driver adjusts arrival time in case of delay

**Book your private transfer in Morocco** directly on our website and travel with complete peace of mind.
        `.trim(),
      },
      ar: {
        title: "النقل الخاص في المغرب: الدليل الشامل 2026",
        description: "كل ما تحتاج معرفته عن خدمات النقل الخاص في المغرب 2026: أهم المسارات والأسعار والنصائح وطريقة الحجز. دليل شامل من NIGOR 2Transport.",
        keywords: ["نقل خاص المغرب", "مواصلات خاصة المغرب", "سائق خاص المغرب", "نقل بين المدن المغرب", "تاكسي خاص المغرب"],
        content: `
## النقل الخاص في المغرب: الدليل الشامل 2026

المغرب وجهة رائعة غنية بالمناظر الطبيعية والثقافة والمدن الإمبراطورية. غير أن التنقل من مدينة إلى أخرى قد يتحول إلى متاهة إن لم تخطط للوجستيات النقل مسبقًا. يتصدر النقل الخاص قائمة الحلول الأكثر راحةً وأمانًا والأقل تكلفةً للمجموعات.

### لماذا النقل الخاص هو الأفضل في المغرب؟

تتوفر وسائل النقل العام في المغرب (حافلات CTM، وقطارات ONCF، والسيارات الكبيرة)، لكنها تعاني من قيود بالغة:

- **مواعيد ثابتة** لا تتوافق بالضرورة مع خططك
- **جودة متفاوتة** حسب الشركة
- **طاقة استيعابية محدودة** للأمتعة والمجموعات
- **عدم القدرة** على الوصول من الباب إلى الباب في المدن القديمة أو المناطق الريفية

### أبرز مسارات النقل في المغرب

#### الدار البيضاء ↔ مراكش
أحد أكثر المسارات طلبًا. المسافة نحو 240 كم والرحلة من 2.5 إلى 3 ساعات عبر الطريق السريع A7.

**السعر التقريبي**: ابتداءً من 950 درهم للسيدان (1-3 ركاب)

#### الدار البيضاء ↔ الرباط
مسافة 90 كم، نحو ساعة إلى ساعة ونصف.

**السعر التقريبي**: ابتداءً من 350 درهم

#### مراكش ↔ الصويرة
طريق ساحلي رائع بطول 175 كم، 2.5 ساعة. لا يصل القطار إلى الصويرة.

**السعر التقريبي**: ابتداءً من 750 درهم

#### فاس ↔ شفشاون
مسار 200 كم في جبال الريف، نحو 3 ساعات.

**السعر التقريبي**: ابتداءً من 800 درهم

#### مراكش ↔ ورزازات
200 كم على طرق جبال الأطلس. من 3 إلى 3.5 ساعات بمناظر خلابة.

**السعر التقريبي**: ابتداءً من 900 درهم

#### أكادير ↔ مراكش
330 كم عبر الطريق السريع، نحو 3.5 ساعات.

**السعر التقريبي**: ابتداءً من 1100 درهم

### نصائحنا لتنظيم تنقلاتك

**1. احجز مسبقًا**
في موسم الذروة (مايو-يونيو، سبتمبر-أكتوبر)، تُحجز السيارات بسرعة. احجز قبل 48 ساعة على الأقل.

**2. حدد عنوانك بدقة**
تمتلئ المدن القديمة بأزقة ضيقة لا تصلها السيارات. حدد أقرب نقطة دخول لريادك أو أرسل رابط Google Maps.

**3. رسوم الطريق السريع مشمولة**
الطرق السريعة المغربية بالرسوم. في NIGOR 2Transport، تكون هذه الرسوم مشمولة في السعر المعروض.

**4. اختر السيارة المناسبة**
- من 1 إلى 3 ركاب: سكودا سوبرب أو مرسيدس E-Class
- من 4 إلى 7 ركاب: مرسيدس فيتو
- من 8 إلى 14 راكبًا: مرسيدس سبرينتر

### النقل متعدد الأيام

**الباقات المتاحة:**
- **نصف يوم (5 ساعات)**: مثالي لرحلة يومية من مراكش
- **يوم كامل (10 ساعات)**: مثالي للتنقل بين مدينتين مع توقفات
- **يومان**: مع خصم 5%
- **3 أيام فأكثر**: مع خصم 10%

### لماذا تختار NIGOR 2Transport؟

✅ **أسعار ثابتة وشفافة**: السعر المعروض هو السعر المدفوع، بلا رسوم مخفية
✅ **سائقون محترفون**: ذوو خبرة، ملتزمون بالمواعيد، يتحدثون الفرنسية والإنجليزية
✅ **أسطول حديث**: سيارات مكيّفة تخضع لصيانة دورية
✅ **متاح 24/7**: حتى للمغادرات المبكرة جدًا أو المتأخرة جدًا
✅ **حجز بسيط عبر الإنترنت**: تأكيد فوري بالبريد الإلكتروني
✅ **متابعة رحلتك**: يضبط سائقك وقت وصوله في حال التأخر

**احجز رحلة النقل الخاص في المغرب** مباشرةً عبر موقعنا وسافر بكل اطمئنان.
        `.trim(),
      },
    },
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}

export function getArticleTrans(article: BlogArticle, lang: BlogLang): ArticleTrans {
  return article.translations[lang] ?? article.translations.fr;
}

export function formatBlogDate(dateStr: string, lang: BlogLang = "en"): string {
  const locale = lang === "fr" ? "fr-FR" : lang === "ar" ? "ar-MA" : "en-US";
  return new Date(dateStr).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
