// ─────────────────────────────────────────────────────────────
//  كل بيانات الصفحة من هنا. عدّل هنا فقط.
// ─────────────────────────────────────────────────────────────

export const site = {
  url: "https://solana-eastlane.example.com", // ← غيّرها بالدومين الفعلي
  agency: "Grandeur Spaces",
  project: "سولانا إيست لين",
  projectEn: "Solana East Lane",
  developer: "أورا للتطوير العقاري",
  developerEn: "ORA Developers",

  phone: "01030083122",
  phoneIntl: "+201030083122",
  phoneDisplay: "01030083122",
  whatsapp: "201030083122",
  email: "leads@grandeur-spaces.com",

  // ← ضع مفتاح Web3Forms هنا قبل النشر
  web3forms: "",

  // ← Google Ads: ضع الـ tag و labels قبل النشر
  gtag: "",
  conv: {
    form: "",
    whatsapp: "",
    call: "",
  },
} as const;

export const WA_DEFAULT =
  "مهتم بسولانا إيست لين من أورا على التسعين الجنوبي. برجاء إرسال الأسعار والمتاح.";

export const waLink = (msg: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;

// ─────────────────────────────  المشروع  ─────────────────────────────

export const location = {
  headline: "مباشرة على شارع التسعين الجنوبي",
  body:
    "سولانا إيست لين في التجمع الخامس بالقاهرة الجديدة، على شارع التسعين الجنوبي مباشرة، بمساحة 26.6 فدان وواجهة ممتدة 1.1 كم على الشارع.",
  points: [
    { name: "الموقع", detail: "شارع التسعين الجنوبي — التجمع الخامس" },
    { name: "مساحة المشروع", detail: "26.6 فدان" },
    { name: "الواجهة على التسعين", detail: "1.1 كم" },
    { name: "عدد المباني", detail: "8 مباني" },
    { name: "الارتفاعات", detail: "G+3 للعيادات · G+3.5 للسكني" },
    { name: "المطور", detail: "أورا — م. نجيب ساويرس" },
  ],
};

// أرقام المشروع
export const infrastructure = [
  { title: "26.6 فدان", body: "مساحة المشروع على شارع التسعين الجنوبي مباشرة." },
  { title: "1.1 كم واجهة", body: "عرض المشروع على الشارع — واجهة تجارية وطبية مكشوفة." },
  { title: "8 مباني", body: "مبنى واحد فقط مخصص للعيادات، والباقي سكني ومخدوم." },
  { title: "متشطب بالكامل", body: "العيادات متشطبة بالحمامات، والشقق مخدومة بالكامل." },
];

// لماذا الآن
export const investment = [
  {
    stat: "1",
    unit: "مبنى",
    title: "مبنى عيادات واحد بس",
    body: "من 8 مباني في المشروع، مبنى واحد بس للعيادات. المعروض الطبي محدود على واجهة التسعين.",
  },
  {
    stat: "5%",
    unit: "جدية حجز",
    title: "دخول بسعر الإطلاق",
    body: "طرح جديد بجدية حجز 5%. أسعار الإطلاق عادةً أقل سعر هتلاقيه للمشروع.",
  },
  {
    stat: "1.1",
    unit: "كم واجهة",
    title: "على شارع التسعين مباشرة",
    body: "مش جوه كمبوند بعيد عن الشارع. الوصول والظهور مباشر لأهم محور في التجمع.",
  },
  {
    stat: "9",
    unit: "سنين",
    title: "تقسيط طويل",
    body: "الشقق المخدومة تقسيط حتى 9 سنين، والعيادات 5% + 5% بعد 3 شهور والباقي على 8.5 سنة.",
  },
];

export const amenities = [
  { title: "شقق مخدومة بالكامل", body: "إدارة وخدمات فندقية للوحدات السكنية — مناسبة للسكن أو للإيجار." },
  { title: "مطور بإدارة تشغيل", body: "أورا بتدير الخدمات بنفسها، وده بيحافظ على قيمة الوحدة وإيجارها." },
  { title: "لوبي واستقبال للعيادات", body: "ريسبشن مشترك للعيادات بتشطيب فندقي في مبنى ميديكا." },
  { title: "عيادات متشطبة بالحمامات", body: "استلام عيادة جاهزة للتجهيز الطبي من غير أعمال تشطيب." },
  { title: "محلات وصيدليات وكافيهات", body: "دور أرضي تجاري بصيدليات ومحلات وكافيهات على الممشى." },
  { title: "ممشى وبلازا مفتوحة", body: "مساحات مشاة ومناطق جلوس ولاندسكيب بين المباني." },
];

// ─────────────────────────────  المنتجات  ─────────────────────────────

export type Unit = {
  type: string;
  spec: string;
  price: number;
  image: string;
};

export type Product = {
  slug: string;
  name: string;
  nameEn: string;
  eyebrow: string;
  intro: string;
  scarcity: string;
  eoi: string;
  dp: number; // للحاسبة
  dpLabel: string;
  years: number;
  plan: string;
  terms: [string, string][];
  image: string;
  highlights: string[];
  groups: { title: string; note?: string; units: Unit[] }[];
};

export const products: Product[] = [
  {
    slug: "serviced",
    name: "شقق فندقية مخدومة",
    nameEn: "SERVICED APARTMENTS",
    eyebrow: "New Launch",
    intro:
      "شقق فندقية بإدارة وخدمات أورا، في مباني G+3.5 وسط لاندسكيب على التسعين الجنوبي. غرفة وغرفتين و3 غرف — للسكن أو للإيجار.",
    scarcity: "طرح جديد — المتاح محدود",
    eoi: "5%",
    dp: 5,
    dpLabel: "جدية حجز 5%",
    years: 9,
    plan: "تقسيط حتى 9 سنين",
    terms: [
      ["جدية الحجز", "5%"],
      ["التقسيط", "حتى 9 سنين"],
      ["المبنى", "G+3.5"],
      ["التشطيب", "مخدومة بالكامل"],
    ],
    image: "/images/res-walkway.webp",
    highlights: [
      "إدارة وخدمات فندقية بالكامل",
      "مباني G+3.5 وسط لاندسكيب",
      "مباشرة على التسعين الجنوبي",
      "تبدأ من 8.9 مليون جنيه",
    ],
    groups: [
      {
        title: "شقق",
        units: [
          { type: "شقة فندقية", spec: "غرفة نوم واحدة", price: 8_900_000, image: "/images/res-building-a.webp" },
          { type: "شقة فندقية", spec: "غرفتين نوم", price: 13_900_000, image: "/images/res-building-cd.webp" },
          { type: "شقة فندقية", spec: "3 غرف نوم", price: 18_000_000, image: "/images/res-building-lm.webp" },
        ],
      },
    ],
  },
  {
    slug: "medica",
    name: "ميديكا — عيادات",
    nameEn: "MEDICA CLINICS",
    eyebrow: "Medical Building",
    intro:
      "المبنى الطبي الوحيد في المشروع على واجهة التسعين. عيادات من 57 لـ 155 م² متشطبة بالكامل بالحمامات، في مبنى G+3 بلوبي واستقبال مشترك.",
    scarcity: "مبنى عيادات واحد فقط من 8 مباني",
    eoi: "5%",
    dp: 10,
    dpLabel: "5% مقدم + 5% بعد 3 شهور",
    years: 8.5,
    plan: "8.5 سنة أقساط متساوية",
    terms: [
      ["المقدم", "5%"],
      ["بعد 3 شهور", "5%"],
      ["التقسيط", "8.5 سنة"],
      ["التشطيب", "كامل بالحمامات"],
    ],
    image: "/images/medica-plaza.webp",
    highlights: [
      "متشطبة بالكامل بالحمامات",
      "لوبي وريسبشن مشترك",
      "صيدليات ومحلات في الدور الأرضي",
      "تبدأ من 14 مليون جنيه",
    ],
    groups: [
      {
        title: "عيادات",
        units: [
          { type: "عيادة", spec: "57 – 65 م²", price: 14_000_000, image: "/images/medica-clinic.webp" },
          { type: "عيادة", spec: "73 م²", price: 18_000_000, image: "/images/medica-office.webp" },
          { type: "عيادة", spec: "83 م²", price: 20_000_000, image: "/images/medica-reception.webp" },
          { type: "عيادة", spec: "93 م²", price: 23_000_000, image: "/images/medica-facade.webp" },
          { type: "عيادة", spec: "135 – 155 م²", price: 36_000_000, image: "/images/medica-street.webp" },
        ],
      },
    ],
  },
];

export const allUnits = products.flatMap((p) =>
  p.groups.flatMap((g) => g.units.map((u) => ({ ...u, product: p.name })))
);

export const minPrice = Math.min(...allUnits.map((u) => u.price));

// ─────────────────────────────  الأسئلة  ─────────────────────────────

export const faqs = [
  {
    q: "إيه نظام السداد في الشقق الفندقية؟",
    a: "جدية حجز 5% وتقسيط حتى 9 سنين. جدول السداد الرسمي من أورا هو المعتمد وقت التعاقد.",
  },
  {
    q: "إيه نظام السداد في عيادات ميديكا؟",
    a: "5% مقدم و5% بعد 3 شهور، والباقي على 8.5 سنة أقساط متساوية، ووديعة صيانة 10%.",
  },
  {
    q: "المشروع فين بالظبط؟",
    a: "مباشرة على شارع التسعين الجنوبي في التجمع الخامس بالقاهرة الجديدة، على مساحة 26.6 فدان وبواجهة 1.1 كم.",
  },
  {
    q: "العيادات بتستلم بأي تشطيب؟",
    a: "متشطبة بالكامل بالحمامات، في مبنى G+3 بلوبي وريسبشن مشترك.",
  },
  {
    q: "مين المطور؟",
    a: "أورا للتطوير العقاري، المملوكة لرجل الأعمال م. نجيب ساويرس.",
  },
  {
    q: "أحجز إزاي؟",
    a: "سجل بياناتك أو ابعتلنا واتساب، وهنبعتلك المتاح والأسعار وخطوات دفع جدية الحجز.",
  },
];

export const fmt = (n: number) => n.toLocaleString("en-US");
