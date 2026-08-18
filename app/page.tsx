"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   إعدادات أساسية — عدّل قبل الرفع
   ============================================================ */
const PHONE = "01001050018";
const PHONE_INTL = "+201001050018";
const WA_NUM = "201001050018";
const waLink = (msg: string) =>
  `https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`;
const WA_DEFAULT = waLink(
  "مرحباً، أريد الاستفسار عن أسعار سيلفر ساندس الساحل الشمالي Silversands من اورا ديفلوبرز"
);
const WEB3FORMS_KEY = "f8edb7d0-abd8-49c6-bf1c-f71073b981dc"; // TODO

const CONV_FORM = "AW-XXXXXXXXXX/FORM_LABEL"; // TODO
const CONV_WHATSAPP = "AW-XXXXXXXXXX/WA_LABEL"; // TODO
const CONV_CALL = "AW-XXXXXXXXXX/CALL_LABEL"; // TODO

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
const fire = (l: string) => window.gtag?.("event", "conversion", { send_to: l });
const trackWA = () => fire(CONV_WHATSAPP);
const trackCall = () => fire(CONV_CALL);

const COUNTRIES = [
  { c: "EG", d: "+20", n: "مصر", re: /^1[0125][0-9]{8}$/ },
  { c: "SA", d: "+966", n: "السعودية", re: /^5[0-9]{8}$/ },
  { c: "AE", d: "+971", n: "الإمارات", re: /^5[0-9]{8}$/ },
  { c: "KW", d: "+965", n: "الكويت", re: /^[0-9]{8}$/ },
  { c: "QA", d: "+974", n: "قطر", re: /^[0-9]{8}$/ },
  { c: "OM", d: "+968", n: "عُمان", re: /^[0-9]{8}$/ },
  { c: "BH", d: "+973", n: "البحرين", re: /^[0-9]{8}$/ },
  { c: "US", d: "+1", n: "أمريكا", re: /^[0-9]{10}$/ },
];

/* ============================================================
   المحتوى
   ============================================================ */
const HERO_KPIS = [
  ["8.8M", "أسعار تبدأ من (جنيه)"],
  ["5%", "مقدم حجز"],
  ["10 سنوات", "تقسيط يصل إلى"],
];

const DEV_BADGES = [
  "اورا ديفلوبرز — نجيب ساويرس",
  "485 فدان",
  "ماستر بلان WATG العالمية",
  "تشطيب كامل بالتكييفات",
];

const PROJECT_FACTS = [
  ["485", "فدان — مساحة سيلفر ساندس"],
  ["ك 222", "طريق اسكندرية - مطروح"],
  ["WATG", "مصمم الماستر بلان"],
  ["5 دول", "اورا تعمل في أكثر من"],
];

const LOCATION_STATS = [
  ["ك 222", "بين سيدي حنيش وألماظة باي"],
  ["30 دقيقة", "من العلمين الجديدة"],
  ["قريب", "من طريق الفوكا الجديد"],
  ["برج العرب", "أقرب مطار دولي"],
];

const NEARBY = [
  "ألماظة باي",
  "سيدي حنيش",
  "رأس الحكمة",
  "العلمين الجديدة",
  "طريق الفوكا الجديد",
  "الطريق الساحلي الدولي",
];

/* المراحل — من الطرح الرسمي */
const PHASES = [
  ["SilverWalk", "سيلفر ووك — ممشى ولاجون كريستالي وشقق وكوندو"],
  ["SilverBay", "سيلفر باي — إطلالة مباشرة على اللاجون الكبير"],
  ["The Cove", "ذا كوف — أقل سعر دخول في المشروع"],
  ["Crystalline", "كريستالين — شاليهات على المسطحات المائية"],
  ["Silver Town", "سيلفر تاون — تصميم متوسطي وأطول فترة سداد"],
  ["Branded Residences", "وحدات فندقية بخدمات متكاملة"],
];

const UNITS = [
  {
    id: "chalets",
    img: "/images/unit-chalets.webp",
    alt: "شاليهات سيلفر ساندس الساحل الشمالي بتشطيب كامل — SilverWalk من اورا",
    badge: "أقل سعر دخول 8.8M",
    badgeTone: "bg-lagoon text-white",
    title: "شاليهات وكوندو",
    sub: "شاليهات للبيع في سيلفر ساندس سيدي حنيش",
    area: "غرفة – 4 غرف",
    rows: [
      ["ذا كوف — أقل سعر دخول", "من 8,800,000 جنيه"],
      ["شاليه غرفتين", "من 27,719,000 جنيه"],
      ["شاليه 3 غرف", "من 32,943,000 جنيه"],
      ["شاليه 4 غرف", "من 37,559,000 جنيه"],
    ],
  },
  {
    id: "townhouse",
    img: "/images/unit-condos.webp",
    alt: "تاون هاوس وتوين هاوس للبيع في سيلفر ساندس الساحل الشمالي",
    badge: "بحدائق خاصة",
    badgeTone: "bg-bronze text-white",
    title: "تاون هاوس وتوين هاوس",
    sub: "تاون هاوس للبيع في الساحل الشمالي",
    area: "بحدائق ومساحات واسعة",
    rows: [
      ["تاون هاوس", "من 43,817,000 جنيه"],
      ["توين هاوس", "من 48,929,000 جنيه"],
      ["التشطيب", "كامل + تكييفات"],
      ["الإطلالة", "لاجون أو مساحات خضراء"],
    ],
  },
  {
    id: "villas",
    img: "/images/unit-villas.webp",
    alt: "فيلات مستقلة للبيع في قرية سيلفر ساندس اورا الساحل الشمالي",
    badge: "أعلى خصوصية",
    badgeTone: "bg-stone text-white",
    title: "فيلات مستقلة",
    sub: "فيلات للبيع في سيلفر ساندس اورا",
    area: "فيلا M و فيلا L",
    rows: [
      ["فيلا M", "من 66,541,000 جنيه"],
      ["فيلا L", "من 73,878,000 جنيه"],
      ["الحدائق", "خاصة لكل فيلا"],
      ["الإطلالة", "بحر أو لاجون مباشرة"],
    ],
  },
];

const PLANS = [
  {
    tag: "ذا كوف · كريستالين",
    tagTone: "bg-lagoon text-white",
    title: "مقدم 5% وتقسيط 8 سنوات",
    rows: [
      ["ذا كوف", "5% + 5% — 8 سنوات"],
      ["كريستالين", "5% + 5% + 5% — 8 سنوات"],
      ["أقل سعر دخول", "من 8.8 مليون"],
    ],
  },
  {
    tag: "الأطول سدادًا",
    tagTone: "bg-bronze text-white",
    title: "سيلفر تاون — 10 سنوات",
    rows: [
      ["المقدم", "5% + 5%"],
      ["مدة التقسيط", "حتى 10 سنوات"],
      ["الطراز", "تصميم متوسطي"],
    ],
  },
  {
    tag: "فندقية",
    tagTone: "bg-stone text-white",
    title: "Branded Residences",
    rows: [
      ["المقدم", "5% + 5% + 5%"],
      ["مدة التقسيط", "حتى 6 سنوات"],
      ["الميزة", "خدمات فندقية متكاملة"],
    ],
  },
];

const AMENITIES = [
  ["لاجونات كريستالية", "مسطحات مائية صافية بشواطئ رملية بين الوحدات"],
  ["شاطئ خاص على المتوسط", "رمال بيضاء ومياه فيروزية في منطقة سيدي حنيش"],
  ["ممشى SilverWalk", "بروميناد بمطاعم وكافيهات على اللاجون مباشرة"],
  ["كلوب هاوس ونوادي", "مرافق خاصة لملاك الوحدات داخل كل مرحلة"],
  ["منطقة تجارية ومطاعم", "علامات محلية وعالمية داخل القرية"],
  ["حمامات سباحة متعددة", "موزعة على المراحل للكبار والأطفال"],
  ["مناطق رياضية وأنشطة", "ملاعب ومسارات مشي ودراجات"],
  ["أمن وإدارة من اورا", "حراسة 24/7 وإدارة تشغيل على مستوى فندقي"],
];

const WHY = [
  [
    "مطور دولي بسابقة أعمال في 5 دول",
    "اورا ديفلوبرز المملوكة لنجيب ساويرس تعمل في مصر والإمارات وقبرص واليونان وباكستان وجرينادا. الاسم الدولي ده بيفرق في حاجتين: مستوى التشغيل بعد التسليم، وقيمة إعادة البيع.",
  ],
  [
    "ماستر بلان من WATG العالمية",
    "المخطط العام صممته شركة Wimberly Allison Tong & Goo — من أشهر بيوت تصميم المنتجعات في العالم. وده اللي مخرج اللاجونات الكريستالية والممشى بالشكل ده، مش تخطيط تقليدي لصفوف وحدات.",
  ],
  [
    "أقل سعر دخول في منطقة مرتفعة",
    "مرحلة ذا كوف بتبدأ من 8.8 مليون جنيه — وده أقل سعر دخول طرحته اورا في سيلفر ساندس. في منطقة سيدي حنيش اللي أسعارها بترتفع باستمرار بعد صفقة رأس الحكمة، ده باب دخول مهم.",
  ],
  [
    "تنوع مراحل يناسب كل ميزانية",
    "من شاليه في ذا كوف إلى فيلا L بـ 73 مليون، ومن تقسيط 6 سنوات في الوحدات الفندقية إلى 10 سنوات في سيلفر تاون. التنوع ده معناه إنك مش مجبر تاخد نظام واحد — فيه مرحلة بتناسب ميزانيتك وهدفك.",
  ],
];

const GALLERY: [string, string][] = [
  ["/images/gallery-1.webp", "ممشى SilverWalk واللاجون الكريستالي في سيلفر ساندس الساحل الشمالي"],
  ["/images/gallery-2.webp", "مرحلة SilverBay بإطلالة على اللاجون — سيلفر ساندس اورا"],
  ["/images/gallery-3.webp", "لقطة جوية للاجونات سيلفر ساندس الساحل الشمالي"],
  ["/images/gallery-4.webp", "التخطيط العام لوحدات سيلفر ساندس سيدي حنيش"],
  ["/images/gallery-5.webp", "من داخل وحدات سيلفر ساندس — ريسبشن بإطلالة على اللاجون"],
  ["/images/gallery-6.webp", "غرفة نوم بوحدات سيلفر ساندس الساحل الشمالي بإطلالة مائية"],
  ["/images/gallery-7.webp", "ماستر بلان قرية سيلفر ساندس الساحل الشمالي من اورا"],
];

const FAQS = [
  {
    q: "ما هي أسعار سيلفر ساندس الساحل الشمالي 2026؟",
    a: "تبدأ الأسعار الاسترشادية في سيلفر ساندس من 8,800,000 جنيه في مرحلة ذا كوف (أقل سعر دخول بالمشروع). أما الشاليهات فتبدأ من 27,719,000 جنيه للغرفتين و32,943,000 للثلاث غرف و37,559,000 لأربع غرف، والتاون هاوس من 43,817,000 والتوين هاوس من 48,929,000، والفيلات المستقلة من 66,541,000 لفيلا M و73,878,000 لفيلا L. الأسعار تختلف بين المراحل وتتغير باستمرار — سجل بياناتك لتصلك القائمة الرسمية المحدثة.",
  },
  {
    q: "ما هي أنظمة السداد في سيلفر ساندس اورا؟",
    a: "تختلف أنظمة السداد حسب المرحلة: ذا كوف بمقدم 5% + 5% وتقسيط حتى 8 سنوات، كريستالين بمقدم 5% + 5% + 5% وتقسيط حتى 8 سنوات، سيلفر تاون بمقدم 5% + 5% وتقسيط يصل إلى 10 سنوات، والوحدات الفندقية Branded Residences بمقدم 5% + 5% + 5% وتقسيط حتى 6 سنوات.",
  },
  {
    q: "أين تقع قرية سيلفر ساندس بالظبط؟",
    a: "تقع سيلفر ساندس عند الكيلو 222 على طريق الإسكندرية - مرسى مطروح، تحديدًا بين منطقتي سيدي حنيش وألماظة باي في الامتداد الغربي للساحل الشمالي — وهي منطقة تشتهر بصفاء مياهها ورمالها البيضاء. المشروع على بُعد حوالي 30 دقيقة من مدينة العلمين الجديدة وقريب من طريق الفوكا الجديد ومنطقة رأس الحكمة.",
  },
  {
    q: "ما مساحة سيلفر ساندس وما هي مراحله؟",
    a: "يمتد سيلفر ساندس على مساحة 485 فدانًا، ويضم عدة مراحل لكل منها طابعها الخاص: SilverWalk بممشاه ولاجونه الكريستالي، SilverBay بإطلالته على اللاجون الكبير، The Cove أقل سعر دخول، Crystalline، Silver Town بالطراز المتوسطي، وAcclaro، بالإضافة إلى الوحدات الفندقية Branded Residences.",
  },
  {
    q: "هل تُسلَّم وحدات سيلفر ساندس بتشطيب كامل؟",
    a: "نعم — تُسلَّم وحدات سيلفر ساندس بتشطيب كامل مع التكييفات، وهو ما يوفر على المشتري تكلفة ووقت التشطيب ويجعل الوحدة جاهزة للاستخدام أو التأجير فور الاستلام.",
  },
  {
    q: "من صمم الماستر بلان لسيلفر ساندس؟",
    a: "الماستر بلان من تصميم شركة WATG العالمية (Wimberly Allison Tong & Goo) — واحدة من أعرق بيوت تصميم المنتجعات السياحية في العالم. وقد اعتمد التصميم على دمج المشروع مع الطبيعة بألوان البحر المتوسط، مع لاجونات كريستالية وممشى بحري يربط الوحدات بالخدمات.",
  },
  {
    q: "من هي شركة اورا ديفلوبرز؟",
    a: "ORA Developers شركة تطوير عقاري أسسها رجل الأعمال المهندس نجيب ساويرس، وتعمل في أكثر من خمس دول: مصر والإمارات وقبرص واليونان وباكستان وجرينادا. ومن مشروعاتها في مصر: أبراج زد الشيخ زايد (ZED West)، وكمبوند زد ايست بالتجمع الخامس، وسيلفر ساندس بالساحل الشمالي — وتُعرف بجودة التنفيذ ومستوى التشغيل الفندقي لمشروعاتها.",
  },
  {
    q: "هل سيلفر ساندس مناسب للاستثمار؟",
    a: "منطقة سيدي حنيش من أسرع مناطق الساحل الغربي نموًا في الأسعار خاصة بعد صفقة رأس الحكمة، واسم اورا الدولي ومستوى التشغيل الفندقي يدعمان القيمة الإيجارية وإعادة البيع. كما أن تنوع المراحل يتيح دخولًا بميزانيات مختلفة. سجل بياناتك ليساعدك مستشارنا في اختيار المرحلة الأنسب لهدفك الاستثماري.",
  },
];

/* ============================================================ */

export default function Page() {
  const [annOpen, setAnnOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [cookiesOk, setCookiesOk] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [slide, setSlide] = useState(0);
  const popupShown = useRef(false);

  useEffect(() => {
    const show = () => {
      if (popupShown.current || sessionStorage.getItem("sv_popup")) return;
      popupShown.current = true;
      sessionStorage.setItem("sv_popup", "1");
      setPopupOpen(true);
    };
    const t = setTimeout(show, 18000);
    const onScroll = () => {
      const sc =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      if (sc >= 0.55) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => setCookiesOk(!!localStorage.getItem("sv_cookies")), []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ============ Announcement ============ */}
      {annOpen && (
        <div className="fixed top-0 inset-x-0 z-50 bg-bronze text-white text-center text-xs sm:text-sm py-2 px-9">
          <span className="ann-pulse font-semibold">
            مراحل جديدة — SilverWalk &amp; SilverBay · مقدم 5% وتقسيط حتى 10 سنوات
          </span>
          <button
            aria-label="إغلاق الشريط"
            onClick={() => setAnnOpen(false)}
            className="absolute top-1.5 left-3 text-white/70 hover:text-white text-lg leading-none"
          >
            ✕
          </button>
        </div>
      )}

      {/* ============ Header ============ */}
      <header
        className={`fixed inset-x-0 z-40 bg-ink/95 backdrop-blur border-b border-white/10 transition-all ${
          annOpen ? "top-9" : "top-0"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-3">
          <a href="#top" className="text-white font-bold text-base sm:text-lg leading-tight shrink-0">
            <span className="font-latin italic text-lagoon-3 text-lg sm:text-xl">Silversands</span>{" "}
            الساحل
            <span className="block text-[10px] font-normal text-white/50">
              فريق مبيعات معتمد
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-5 text-sm text-white/80">
            <a href="#about" className="hover:text-lagoon-3 transition-colors">عن المشروع</a>
            <a href="#location" className="hover:text-lagoon-3 transition-colors">الموقع</a>
            <a href="#units" className="hover:text-lagoon-3 transition-colors">الوحدات والأسعار</a>
            <a href="#plans" className="hover:text-lagoon-3 transition-colors">أنظمة السداد</a>
            <a href="#amenities" className="hover:text-lagoon-3 transition-colors">الخدمات</a>
            <a href="#faq" className="hover:text-lagoon-3 transition-colors">أسئلة شائعة</a>
          </nav>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={WA_DEFAULT}
              target="_blank"
              rel="noopener"
              onClick={trackWA}
              className="hidden sm:inline-flex rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white"
            >
              واتساب
            </a>
            <a
              href={`tel:${PHONE_INTL}`}
              onClick={trackCall}
              className="hidden xl:inline-flex rounded-full bg-bronze px-4 py-2 text-sm font-semibold text-white"
            >
              {PHONE}
            </a>
            <button
              aria-label="القائمة"
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden text-white p-2"
            >
              <span className="block w-6 h-0.5 bg-white mb-1.5" />
              <span className="block w-6 h-0.5 bg-white mb-1.5" />
              <span className="block w-6 h-0.5 bg-white" />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="lg:hidden bg-ink border-t border-white/10 px-4 py-3 flex flex-col gap-3 text-white/90">
            {[
              ["about", "عن المشروع"],
              ["location", "الموقع"],
              ["units", "الوحدات والأسعار"],
              ["plans", "أنظمة السداد"],
              ["amenities", "الخدمات"],
              ["faq", "أسئلة شائعة"],
            ].map(([id, l]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {l}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* ============ HERO + form ============ */}
      <section
        id="top"
        className={`relative ${annOpen ? "pt-28" : "pt-20"} pb-14 md:pb-20`}
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(34,32,28,.88), rgba(34,32,28,.7) 45%, rgba(34,32,28,.94)), url(/images/hero.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-[1.12fr_1fr] gap-10 items-start">
          <div className="text-white pt-3">
            <p className="inline-block rounded-full border border-lagoon/50 bg-lagoon/15 px-4 py-1.5 text-xs sm:text-sm text-lagoon-3 mb-6">
              اورا ديفلوبرز — سيدي حنيش · الكيلو 222
            </p>
            <h1 className="text-[26px] sm:text-4xl lg:text-5xl font-extrabold leading-[1.35] mb-5">
              <span className="font-latin italic text-lagoon-3">Silversands</span>
              <span className="block mt-2">
                سيلفر ساندس الساحل الشمالي — شاليهات وفيلات على لاجون كريستالي
              </span>
            </h1>
            <p className="text-white/85 md:text-lg leading-relaxed mb-8 max-w-xl">
              امتلك وحدتك في قرية سيلفر ساندس من اورا ديفلوبرز على 485 فدانًا بين
              سيدي حنيش وألماظة باي، بماستر بلان من WATG العالمية وتشطيب كامل
              بالتكييفات — أسعار تبدأ من 8.8 مليون بمقدم 5% وتقسيط حتى 10 سنوات.
            </p>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-8 max-w-lg">
              {HERO_KPIS.map(([v, l]) => (
                <div
                  key={l}
                  className="rounded-xl bg-white/10 border border-white/20 px-2 py-4 text-center backdrop-blur-sm"
                >
                  <div className="text-base sm:text-2xl font-extrabold text-lagoon-3">
                    {v}
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/75 mt-1 leading-tight">
                    {l}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#lead"
                className="rounded-full bg-bronze px-7 py-3 font-bold text-white hover:bg-bronze-2 transition-colors"
              >
                اطلب قائمة الأسعار
              </a>
              <a
                href={WA_DEFAULT}
                target="_blank"
                rel="noopener"
                onClick={trackWA}
                className="rounded-full border border-white/35 px-7 py-3 font-bold text-white hover:bg-white/10 transition-colors"
              >
                واتساب مباشر
              </a>
            </div>
          </div>

          <div id="lead" className="scroll-mt-28">
            <div className="rounded-2xl bg-white shadow-2xl p-6 sm:p-7">
              <h2 className="text-lg sm:text-xl font-bold text-ink mb-1.5">
                سجل اهتمامك واستلم البروشور وقائمة الأسعار
              </h2>
              <p className="text-sm text-ink/55 mb-5 leading-relaxed">
                سيتواصل معك مستشار عقاري بأحدث وحدات سيلفر ساندس المتاحة
                والمراحل المطروحة
              </p>
              <LeadForm formLocation="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ Developer strip ============ */}
      <section className="bg-stone text-white py-14 md:py-16">
        <div className="mx-auto max-w-5xl px-4 text-center reveal">
          <p className="font-latin text-lagoon-3 tracking-[0.25em] text-xs sm:text-sm mb-3">
            ORA DEVELOPERS
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-5">
            عن شركة اورا ديفلوبرز
          </h2>
          <p className="text-white/75 leading-relaxed max-w-3xl mx-auto mb-8">
            اورا ديفلوبرز شركة تطوير عقاري أسسها رجل الأعمال المهندس نجيب
            ساويرس، وتعمل في أكثر من خمس دول حول العالم: مصر والإمارات وقبرص
            واليونان وباكستان وجرينادا. ومن مشروعاتها في السوق المصري: أبراج زد
            الشيخ زايد ZED West، وكمبوند زد ايست بالتجمع الخامس، وقرية سيلفر
            ساندس بالساحل الشمالي — وتُعرف بجودة التنفيذ ومستوى التشغيل الفندقي
            لمشروعاتها بعد التسليم.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 text-sm">
            {DEV_BADGES.map((b) => (
              <span
                key={b}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-white/85"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ About ============ */}
      <section id="about" className="py-16 md:py-20 bg-sand scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="reveal">
            <p className="text-lagoon font-semibold text-sm mb-2">عن المشروع</p>
            <h2 className="text-2xl md:text-3xl font-bold text-ink mb-5 leading-snug">
              قرية سيلفر ساندس الساحل الشمالي — 485 فدانًا من الرمال الفضية
            </h2>
            <div className="space-y-4 text-ink/70 leading-relaxed">
              <p>
                سيلفر ساندس هي الوجهة الساحلية الأبرز لاورا ديفلوبرز في مصر،
                تمتد على 485 فدانًا عند الكيلو 222 على طريق الإسكندرية - مرسى
                مطروح، بين منطقتي سيدي حنيش وألماظة باي — وهي من أنقى بقاع
                الساحل الشمالي مياهًا ورمالًا.
              </p>
              <p>
                صمّمت الماستر بلان شركة{" "}
                <span className="font-latin italic">WATG</span> العالمية، وهي من
                أعرق بيوت تصميم المنتجعات في العالم، فجاء المشروع بلاجونات
                كريستالية وممشى بحري يربط الوحدات بالخدمات، بألوان مستوحاة من
                البحر المتوسط.
              </p>
              <p>
                ينقسم المشروع إلى مراحل لكل منها طابعها الخاص وسعرها المختلف —
                ما يعني أن هناك مرحلة تناسب كل ميزانية، من شاليه في ذا كوف حتى
                فيلا مستقلة بإطلالة بحرية.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-7">
              {PROJECT_FACTS.map(([v, l]) => (
                <div key={l} className="border-r-2 border-bronze pr-3">
                  <div className="text-xl font-extrabold text-lagoon">{v}</div>
                  <div className="text-xs text-ink/55 mt-1 leading-tight">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal">
            <img
              src="/images/about.webp"
              alt="قرية سيلفر ساندس الساحل الشمالي من اورا ديفلوبرز — لقطة جوية"
              className="rounded-2xl w-full shadow-xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ============ Phases ============ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-lagoon font-semibold text-sm mb-2 reveal">
            مراحل المشروع
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-ink text-center mb-4 reveal">
            مراحل سيلفر ساندس — لكل مرحلة طابعها وسعرها
          </h2>
          <p className="text-center text-ink/60 max-w-2xl mx-auto mb-10 reveal leading-relaxed">
            سيلفر ساندس مش مرحلة واحدة بسعر واحد. الأسعار وأنظمة السداد بتختلف
            بشكل كبير من مرحلة للتانية — وده أهم حاجة تعرفها قبل ما تقارن.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {PHASES.map(([en, ar]) => (
              <div
                key={en}
                className="reveal rounded-xl bg-sand border hairline p-5 hover:border-lagoon/40 transition-colors"
              >
                <p className="font-latin italic text-lg text-lagoon mb-1">{en}</p>
                <p className="text-sm text-ink/65 leading-relaxed">{ar}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <figure className="reveal rounded-2xl overflow-hidden shadow-lg bg-sand">
              <img
                src="/images/life-1.webp"
                alt="ممشى SilverWalk واللاجون الكريستالي بقرية سيلفر ساندس الساحل الشمالي"
                className="w-full h-[240px] sm:h-[300px] object-cover"
                loading="lazy"
              />
              <figcaption className="p-5">
                <h3 className="font-bold text-ink mb-1.5">
                  <span className="font-latin italic">SilverWalk</span> — الممشى
                  واللاجون
                </h3>
                <p className="text-sm text-ink/60 leading-relaxed">
                  بروميناد بمطاعم وكافيهات على حافة لاجون كريستالي برمال بيضاء،
                  تحيط به الوحدات مباشرة.
                </p>
              </figcaption>
            </figure>

            <figure className="reveal rounded-2xl overflow-hidden shadow-lg bg-sand">
              <img
                src="/images/life-2.webp"
                alt="مرحلة SilverBay بإطلالة على اللاجون الكبير في سيلفر ساندس اورا"
                className="w-full h-[240px] sm:h-[300px] object-cover"
                loading="lazy"
              />
              <figcaption className="p-5">
                <h3 className="font-bold text-ink mb-1.5">
                  <span className="font-latin italic">SilverBay</span> — على
                  اللاجون الكبير
                </h3>
                <p className="text-sm text-ink/60 leading-relaxed">
                  وحدات بإطلالة مباشرة على أكبر مسطح مائي داخل المشروع، بشواطئ
                  رملية خاصة.
                </p>
              </figcaption>
            </figure>
          </div>

          <div className="text-center mt-9 reveal">
            <a
              href="#lead"
              className="inline-block rounded-full bg-lagoon px-8 py-3 font-bold text-white hover:bg-lagoon-2 transition-colors"
            >
              اعرف الفرق بين المراحل وأسعارها
            </a>
          </div>
        </div>
      </section>

      {/* ============ Location ============ */}
      <section id="location" className="py-16 md:py-20 bg-ink text-white scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="reveal order-2 md:order-1 rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/images/masterplan.webp"
              alt="ماستر بلان قرية سيلفر ساندس الساحل الشمالي — الكيلو 222 سيدي حنيش"
              className="w-full"
              loading="lazy"
            />
          </div>
          <div className="reveal order-1 md:order-2">
            <p className="text-lagoon-3 font-semibold text-sm mb-2">
              الموقع والماستر بلان
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-5 leading-snug">
              موقع سيلفر ساندس — بين سيدي حنيش وألماظة باي
            </h2>
            <p className="text-white/75 leading-relaxed mb-7">
              تقع قرية سيلفر ساندس عند الكيلو 222 على طريق الإسكندرية - مرسى
              مطروح، في الامتداد الغربي للساحل الشمالي الذي شهد أكبر قفزة في
              الأسعار بعد صفقة رأس الحكمة. المنطقة تشتهر بصفاء مياهها ورمالها
              البيضاء، وقريبة من طريق الفوكا الجديد وعلى بُعد حوالي 30 دقيقة من
              مدينة العلمين الجديدة.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-7">
              {LOCATION_STATS.map(([v, l]) => (
                <div key={l} className="border-r-2 border-bronze pr-3">
                  <div className="text-lg sm:text-xl font-extrabold text-lagoon-3">{v}</div>
                  <div className="text-xs text-white/65 mt-1 leading-tight">{l}</div>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-white/80 mb-3">
                أبرز المناطق المحيطة:
              </p>
              <div className="flex flex-wrap gap-2">
                {NEARBY.map((n) => (
                  <span
                    key={n}
                    className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-white/80"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Units & prices ============ */}
      <section id="units" className="py-16 md:py-20 bg-sand-2 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-lagoon font-semibold text-sm mb-2 reveal">
            الوحدات والأسعار
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-ink text-center mb-3 reveal">
            أسعار سيلفر ساندس الساحل الشمالي 2026
          </h2>
          <p className="text-center text-ink/55 max-w-2xl mx-auto mb-10 reveal leading-relaxed">
            يضم سيلفر ساندس شاليهات وكوندو وتاون هاوس وتوين هاوس وفيلات مستقلة
            للبيع في الساحل الشمالي — جميعها بتشطيب كامل وتكييفات. الأسعار
            التالية استرشادية وتختلف حسب المرحلة والإطلالة.
          </p>

          <div className="grid lg:grid-cols-3 gap-6">
            {UNITS.map((u) => (
              <div
                key={u.id}
                className="reveal rounded-2xl bg-white border hairline overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={u.img}
                    alt={u.alt}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <span
                    className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold shadow ${u.badgeTone}`}
                  >
                    {u.badge}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-lg text-ink">{u.title}</h3>
                  <p className="text-xs text-ink/45 mt-1">{u.sub}</p>
                  <p className="text-sm text-lagoon font-semibold mt-2 mb-4">
                    {u.area}
                  </p>
                  <ul className="space-y-2.5 flex-1">
                    {u.rows.map(([a, p]) => (
                      <li
                        key={a}
                        className="flex justify-between gap-3 text-sm border-b hairline pb-2.5 last:border-0"
                      >
                        <span className="text-ink/70">{a}</span>
                        <span className="text-ink font-semibold whitespace-nowrap">
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#lead"
                    className="mt-6 block text-center rounded-xl bg-ink text-white py-3 font-semibold hover:bg-stone-2 transition-colors"
                  >
                    اطلب سعر هذه الوحدات
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-ink/45 text-center mt-6 leading-relaxed max-w-3xl mx-auto">
            * جميع الأسعار والمساحات وأنظمة السداد المذكورة استرشادية وقابلة
            للتغيير وفقًا لتحديثات الشركة المطورة وتوافر الوحدات وقت الحجز،
            وتختلف بشكل كبير بين مراحل المشروع.
          </p>
        </div>
      </section>

      {/* ============ Payment plans ============ */}
      <section id="plans" className="py-16 md:py-20 bg-sand scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-lagoon font-semibold text-sm mb-2 reveal">
            أنظمة السداد
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-ink text-center mb-3 reveal">
            أنظمة سداد وتقسيط سيلفر ساندس حسب المرحلة
          </h2>
          <p className="text-center text-ink/55 max-w-2xl mx-auto mb-10 reveal leading-relaxed">
            كل مرحلة في سيلفر ساندس ليها نظام سداد مختلف — اختار اللي يناسب
            سيولتك.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((p) => (
              <div
                key={p.title}
                className="reveal rounded-2xl bg-white border hairline p-6 flex flex-col shadow-sm"
              >
                <span
                  className={`self-start rounded-full px-3 py-1 text-xs font-semibold mb-4 ${p.tagTone}`}
                >
                  {p.tag}
                </span>
                <h3 className="font-bold text-lg text-ink mb-5">{p.title}</h3>
                <dl className="space-y-3 flex-1">
                  {p.rows.map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between gap-3 text-sm border-b hairline pb-3 last:border-0"
                    >
                      <dt className="text-ink/60">{k}</dt>
                      <dd className="text-ink font-bold">{v}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href="#lead"
                  className="mt-6 block text-center rounded-xl border-2 border-lagoon text-lagoon py-2.5 font-semibold hover:bg-lagoon hover:text-white transition-colors"
                >
                  اطلب تفاصيل النظام
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Amenities ============ */}
      <section id="amenities" className="py-16 md:py-20 bg-sand-2 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-lagoon font-semibold text-sm mb-2 reveal">
            الخدمات والمرافق
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-ink text-center mb-10 reveal">
            خدمات ومميزات قرية سيلفر ساندس الساحل الشمالي
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AMENITIES.map(([t, d]) => (
              <div
                key={t}
                className="reveal rounded-xl bg-white border hairline p-5 hover:border-lagoon/40 transition-colors"
              >
                <div className="w-9 h-0.5 bg-bronze mb-3" />
                <h3 className="font-bold text-ink mb-1.5">{t}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Why invest ============ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-center text-lagoon font-semibold text-sm mb-2 reveal">
            مميزات الاستثمار
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-ink text-center mb-10 reveal">
            لماذا تشتري في سيلفر ساندس الساحل الشمالي؟
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {WHY.map(([t, d], i) => (
              <div key={t} className="reveal flex gap-4">
                <div className="shrink-0 grid place-items-center w-10 h-10 rounded-full bg-lagoon text-white font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-ink mb-1.5">{t}</h3>
                  <p className="text-sm text-ink/65 leading-relaxed">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Gallery ============ */}
      <section id="gallery" className="py-16 md:py-20 bg-stone scroll-mt-24">
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-center text-lagoon-3 font-semibold text-sm mb-2 reveal">
            معرض الصور
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-9 reveal">
            صور قرية سيلفر ساندس الساحل الشمالي
          </h2>

          <div className="reveal relative rounded-2xl overflow-hidden shadow-2xl bg-white">
            <img
              src={GALLERY[slide][0]}
              alt={GALLERY[slide][1]}
              className="w-full h-[240px] sm:h-[480px] object-cover"
              loading="lazy"
            />
            <button
              aria-label="الصورة السابقة"
              onClick={() => setSlide((s) => (s - 1 + GALLERY.length) % GALLERY.length)}
              className="absolute top-1/2 -translate-y-1/2 right-3 grid place-items-center w-11 h-11 rounded-full bg-white/90 text-ink text-xl hover:bg-white shadow"
            >
              ❯
            </button>
            <button
              aria-label="الصورة التالية"
              onClick={() => setSlide((s) => (s + 1) % GALLERY.length)}
              className="absolute top-1/2 -translate-y-1/2 left-3 grid place-items-center w-11 h-11 rounded-full bg-white/90 text-ink text-xl hover:bg-white shadow"
            >
              ❮
            </button>
            <p className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/90 to-transparent text-white text-xs sm:text-sm px-4 pt-8 pb-3 text-center">
              {GALLERY[slide][1]}
            </p>
          </div>

          <div className="flex justify-center gap-2 mt-5 flex-wrap">
            {GALLERY.map((g, i) => (
              <button
                key={g[0]}
                aria-label={`صورة ${i + 1}`}
                onClick={() => setSlide(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === slide ? "w-7 bg-bronze-2" : "w-2.5 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <div className="text-center mt-8 reveal">
            <a
              href="#lead"
              className="inline-block rounded-full bg-bronze px-8 py-3 font-bold text-white hover:bg-bronze-2 transition-colors"
            >
              اطلب بروشور سيلفر ساندس والأسعار
            </a>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="py-16 md:py-20 bg-sand scroll-mt-24">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-ink text-center mb-9">
            أسئلة شائعة عن سيلفر ساندس الساحل الشمالي
          </h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div
                key={f.q}
                className="reveal rounded-xl bg-white border hairline overflow-hidden"
              >
                <button
                  className="w-full text-right px-5 py-4 font-semibold text-ink flex justify-between items-center gap-3"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className="text-lagoon shrink-0 text-lg">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <p className="px-5 pb-5 text-ink/65 leading-relaxed">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Final CTA ============ */}
      <section className="py-16 md:py-20 bg-lagoon text-white">
        <div className="mx-auto max-w-3xl px-4 text-center reveal">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            جاهز لامتلاك وحدتك في سيلفر ساندس؟
          </h2>
          <p className="text-white/85 mb-8 leading-relaxed">
            تواصل معنا الآن لمعرفة الوحدات المتاحة في المراحل المطروحة وأحدث
            الأسعار وأنظمة السداد.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${PHONE_INTL}`}
              onClick={trackCall}
              className="rounded-full bg-white text-lagoon px-7 py-3 font-bold hover:bg-sand transition-colors"
            >
              اتصل بالمستشار العقاري
            </a>
            <a
              href={WA_DEFAULT}
              target="_blank"
              rel="noopener"
              onClick={trackWA}
              className="rounded-full bg-[#25D366] px-7 py-3 font-bold text-white"
            >
              تحدث عبر واتساب
            </a>
            <a
              href="#lead"
              className="rounded-full border border-white/50 px-7 py-3 font-bold hover:bg-white/10 transition-colors"
            >
              احجز وحدتك الآن
            </a>
          </div>
        </div>
      </section>

      {/* ============ Footer ============ */}
      <footer className="bg-ink border-t border-white/10 text-white/60 text-sm">
        <div className="mx-auto max-w-6xl px-4 py-10 space-y-5">
          <p className="leading-relaxed">
            منصة معلومات واستفسارات عقارية مستقلة يديرها فريق مبيعات معتمد لدى
            كبرى شركات التطوير العقاري في مصر. هذه الصفحة ليست الموقع الرسمي
            لشركة اورا ديفلوبرز (ORA Developers) ولا تتبعها إداريًا، وجميع
            الأسماء والعلامات التجارية مملوكة لأصحابها. الأسعار والمساحات
            الواردة استرشادية وقابلة للتغيير وفق أحدث تحديثات المطور.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="/about/" className="hover:text-lagoon-3">من نحن</a>
            <a href="/privacy/" className="hover:text-lagoon-3">سياسة الخصوصية</a>
            <a href="/disclaimer/" className="hover:text-lagoon-3">إخلاء المسئولية</a>
            <a href={`tel:${PHONE_INTL}`} onClick={trackCall} className="hover:text-lagoon-3">
              {PHONE}
            </a>
          </div>
          <p>© 2026 جميع الحقوق محفوظة.</p>
        </div>
      </footer>

      {/* ============ Floating ============ */}
      <div className="fixed bottom-24 md:bottom-8 left-4 z-40 flex flex-col gap-3">
        <a
          href={WA_DEFAULT}
          target="_blank"
          rel="noopener"
          onClick={trackWA}
          aria-label="تواصل واتساب"
          className="wa-pulse grid place-items-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" aria-hidden>
            <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.33 4.95L2 22l5.3-1.39a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.83 9.83 0 0 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.34c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.25 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
          </svg>
        </a>
        <a
          href={`tel:${PHONE_INTL}`}
          onClick={trackCall}
          aria-label="اتصال هاتفي"
          className="grid place-items-center w-14 h-14 rounded-full bg-bronze text-white shadow-lg"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden>
            <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3.5a1 1 0 0 1 1-1H7.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.21 2.2Z" />
          </svg>
        </a>
      </div>

      {/* ============ Mobile bar ============ */}
      <div className="fixed md:hidden bottom-0 inset-x-0 z-40 bg-ink border-t border-white/10 grid grid-cols-3 text-center text-sm text-white">
        <a href={`tel:${PHONE_INTL}`} onClick={trackCall} className="py-3.5 font-semibold">
          اتصال
        </a>
        <a
          href={WA_DEFAULT}
          target="_blank"
          rel="noopener"
          onClick={trackWA}
          className="py-3.5 font-semibold bg-[#25D366]"
        >
          واتساب
        </a>
        <a href="#lead" className="py-3.5 font-semibold bg-bronze">
          الأسعار
        </a>
      </div>

      {/* ============ Popup ============ */}
      {popupOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4"
          onClick={() => setPopupOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="إغلاق"
              className="absolute top-3 left-3 text-ink/40 text-xl"
              onClick={() => setPopupOpen(false)}
            >
              ✕
            </button>
            <span className="inline-block rounded-full bg-bronze/20 text-bronze px-3 py-1 text-xs font-semibold mb-3">
              مراحل SilverWalk و SilverBay
            </span>
            <h3 className="text-xl font-bold text-ink mb-1.5">
              برايس ليست سيلفر ساندس 2026
            </h3>
            <p className="text-sm text-ink/55 mb-5">
              سجل رقمك وهنبعتلك البروشور وأسعار كل مرحلة على واتساب
            </p>
            <LeadForm formLocation="popup" compact />
          </div>
        </div>
      )}

      {/* ============ Cookies ============ */}
      {!cookiesOk && (
        <div className="fixed bottom-16 md:bottom-4 inset-x-4 md:inset-x-auto md:left-4 md:max-w-sm z-50 rounded-xl bg-white shadow-2xl border hairline p-4 text-sm text-ink/70">
          نستخدم ملفات تعريف الارتباط لتحسين تجربتك وقياس أداء الحملات
          الإعلانية.{" "}
          <a href="/privacy/" className="text-lagoon underline">
            سياسة الخصوصية
          </a>
          <button
            className="mt-3 w-full rounded-lg bg-ink text-white py-2 font-semibold"
            onClick={() => {
              localStorage.setItem("sv_cookies", "1");
              setCookiesOk(true);
            }}
          >
            موافق
          </button>
        </div>
      )}
    </main>
  );
}

/* ============================================================
   Lead form
   ============================================================ */
function LeadForm({
  formLocation,
  compact = false,
}: {
  formLocation: string;
  compact?: boolean;
}) {
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const [dial, setDial] = useState("+20");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    const fd = new FormData(e.currentTarget);
    if (fd.get("botcheck")) return;

    const name = String(fd.get("name") || "").trim();
    const raw = String(fd.get("phone") || "").replace(/[\s\-()]/g, "");
    const local = raw.replace(/^0+/, "");
    const country = COUNTRIES.find((c) => c.d === dial)!;

    if (name.length < 2) return setErr("من فضلك اكتب الاسم بالكامل");
    if (!country.re.test(local))
      return setErr(`رقم غير صحيح — تأكد من رقم ${country.n}`);

    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "Lead جديد — سيلفر ساندس الساحل الشمالي",
          from_name: "Silversands Landing",
          name,
          phone: `${dial}${local}`,
          country: country.n,
          unit: fd.get("unit") || "—",
          source: formLocation,
          page: "silversands-north-coast",
        }),
      });
      const data = await res.json();
      if (data.success) {
        fire(CONV_FORM);
        setDone(true);
      } else {
        setErr("حدث خطأ، حاول مرة أخرى أو تواصل عبر واتساب");
      }
    } catch {
      setErr("تعذر الإرسال — تأكد من الاتصال بالإنترنت");
    } finally {
      setSending(false);
    }
  }

  if (done)
    return (
      <div className="text-center py-4">
        <div className="mx-auto grid place-items-center w-14 h-14 rounded-full bg-lagoon text-white text-2xl mb-4">
          ✓
        </div>
        <h3 className="text-lg font-bold text-ink mb-2">
          تم استلام طلبك بنجاح!
        </h3>
        <p className="text-sm text-ink/60 leading-relaxed mb-5">
          شكرًا لتواصلك — سيتصل بك مستشار عقاري هاتفيًا أو عبر واتساب بتفاصيل
          مراحل سيلفر ساندس المتاحة والأسعار.
        </p>
        <a
          href={WA_DEFAULT}
          target="_blank"
          rel="noopener"
          onClick={trackWA}
          className="block rounded-xl bg-[#25D366] text-white py-3 font-bold"
        >
          تواصل عبر واتساب مباشرة
        </a>
        <p className="text-[11px] text-ink/40 mt-4">
          خصوصية تامة — بياناتك تُستخدم فقط للتواصل بخصوص استفسارك العقاري
        </p>
      </div>
    );

  return (
    <form onSubmit={submit} className="space-y-3.5" noValidate>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <input
        name="name"
        placeholder="الاسم بالكامل"
        className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-ink placeholder:text-ink/40 focus:outline-none focus:border-lagoon"
      />

      <div className="flex gap-2" dir="rtl">
        <select
          aria-label="كود الدولة"
          value={dial}
          onChange={(e) => setDial(e.target.value)}
          className="w-28 shrink-0 rounded-xl border border-slate-300 px-2 py-3 bg-white text-ink text-sm focus:outline-none focus:border-lagoon"
        >
          {COUNTRIES.map((c) => (
            <option key={c.c} value={c.d}>
              {c.c} {c.d}
            </option>
          ))}
        </select>
        <input
          name="phone"
          inputMode="tel"
          dir="ltr"
          placeholder="رقم الموبايل"
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 bg-white text-ink placeholder:text-ink/40 text-right focus:outline-none focus:border-lagoon"
        />
      </div>

      {!compact && (
        <select
          name="unit"
          defaultValue=""
          className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-ink/70 focus:outline-none focus:border-lagoon"
        >
          <option value="" disabled>
            نوع الوحدة المطلوبة
          </option>
          <option>شاليه / كوندو</option>
          <option>تاون هاوس</option>
          <option>توين هاوس</option>
          <option>فيلا مستقلة</option>
          <option>وحدة فندقية Branded</option>
          <option>استفسار عام / استثمار</option>
        </select>
      )}

      {err && <p className="text-red-600 text-sm font-semibold">{err}</p>}

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-xl bg-bronze py-3.5 font-bold text-white hover:bg-bronze-2 transition-colors disabled:opacity-60"
      >
        {sending ? "جاري الإرسال..." : "احجز وحدتك الآن"}
      </button>

      <p className="text-[11px] text-ink/45 text-center leading-relaxed">
        بالضغط على إرسال أنت توافق على{" "}
        <a href="/privacy/" className="underline">سياسة الخصوصية</a> — بياناتك
        تُستخدم فقط للتواصل بخصوص استفسارك العقاري.
      </p>
    </form>
  );
}
