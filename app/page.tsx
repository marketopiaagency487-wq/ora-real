"use client";

import { useEffect, useRef, useState } from "react";

/* ====== إعدادات أساسية ====== */
const PHONE = "01001050018";
const PHONE_INTL = "+201001050018";
const WA_TEXT_AR = "مرحباً، أريد الاستفسار عن سيلفر ساندز الساحل الشمالي والحصول على البرايس ليست";
const WA_TEXT_EN = "Hello, I'd like to inquire about Silversands North Coast and get the latest price list";
const WEB3FORMS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY"; // TODO

const CONV_WHATSAPP = "AW-XXXXXXXXXX/WA_LABEL"; // TODO
const CONV_CALL = "AW-XXXXXXXXXX/CALL_LABEL"; // TODO

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
const trackWhatsApp = () =>
  window.gtag?.("event", "conversion", { send_to: CONV_WHATSAPP });
const trackCall = () =>
  window.gtag?.("event", "conversion", { send_to: CONV_CALL });

function validatePhone(raw: string): boolean {
  const p = raw.replace(/[\s\-()]/g, "");
  return [
    /^(\+?20)?01[0125][0-9]{8}$/,
    /^\+?9665[0-9]{8}$/,
    /^\+?9715[0-9]{8}$/,
    /^\+?965[0-9]{8}$/,
    /^\+?974[0-9]{8}$/,
    /^\+?973[0-9]{8}$/,
    /^\+?968[0-9]{8}$/,
  ].some((re) => re.test(p));
}

type Lang = "ar" | "en";

/* ====== المحتوى ثنائي اللغة ====== */
const T = {
  ar: {
    dir: "rtl" as const,
    brand: "سيلفر ساندز",
    brandSub: "الساحل الشمالي",
    nav: [
      ["about", "عن المشروع"],
      ["prices", "الأسعار"],
      ["location", "الموقع"],
      ["amenities", "الخدمات"],
      ["faq", "أسئلة شائعة"],
      ["register", "سجل اهتمامك"],
    ],
    call: "اتصل الآن",
    heroTag: "من اورا ديفلوبرز — نجيب ساويرس · سيدي حنيش الكيلو 243",
    heroH1: "سيلفر ساندز الساحل الشمالي",
    heroH2: "شاليهات وفيلات على أنقى شواطئ الساحل — أسعار 2026 وتقسيط حتى 10 سنوات",
    heroP: "امتلك وحدتك في Silversands بين سيدي حنيش والماظة باي، بمياه فيروزية ورمال فضية، بأسعار استرشادية للمراحل الجديدة تبدأ من 8.8 مليون جنيه من مطور دولي بسابقة أعمال في 5 دول.",
    ctaPrice: "اطلب البرايس ليست الآن",
    ctaWa: "واتساب مباشر",
    facts: [
      ["8.8M", "أسعار استرشادية تبدأ من (جنيه)"],
      ["10 سنوات", "أنظمة سداد تصل إلى"],
      ["ك 243", "سيدي حنيش — اسكندرية/مطروح"],
      ["ORA", "مطور دولي في 5 دول"],
    ],
    aboutH: "عن قرية سيلفر ساندز الساحل الشمالي",
    aboutP: [
      "سيلفر ساندز هي درة مشروعات اورا ديفلوبرز الساحلية في مصر، على واحدة من أنقى بقاع الساحل الشمالي بين سيدي حنيش والماظة باي عند الكيلو 243 طريق اسكندرية - مرسى مطروح.",
      "اختار نجيب ساويرس موقع المشروع بعيدًا عن الزحام التقليدي، في منطقة تشتهر بمياهها الفيروزية الصافية ورمالها البيضاء الناعمة، وصمّمت القرية كمجتمع متكامل تخصص أغلب مساحته للخضرة واللاجونز والخدمات.",
      "يضم المشروع شاليهات وتاون هاوس وتوين هاوس وفيلات مستقلة بإطلالات بحرية، مع مراحل جديدة تُطرح بأنظمة سداد مرنة — ما يجعله من أقوى فرص التملك والاستثمار في الساحل الشمالي 2026.",
    ],
    pricesH: "أسعار سيلفر ساندز 2026",
    pricesP: "أسعار استرشادية قابلة للتغيير حسب أحدث برايس ليست معلنة من المطور — سجل بياناتك لتصلك القائمة الرسمية المحدثة.",
    units: [
      ["شاليهات المراحل الجديدة", "مساحات متنوعة بإطلالات على اللاجونز والبحر", "تبدأ من ~ 8.8 مليون جنيه"],
      ["شاليهات 3 غرف", "تشطيب راقي — مثالية للعائلات", "من ~ 32.9 مليون جنيه"],
      ["تاون هاوس وتوين هاوس", "بحدائق خاصة قرب الشاطئ", "من ~ 43.8 مليون جنيه"],
      ["فيلات مستقلة", "الصفوف الأولى — أعلى خصوصية", "من ~ 66.5 مليون جنيه"],
    ],
    payBox: "مقدمات ميسرة وتقسيط يصل إلى 10 سنوات",
    payBoxP: "اعرف مقدم الحجز الحالي والوحدات المتاحة في أحدث المراحل",
    payCta: "اعرف الأسعار التفصيلية",
    priceNote: "* جميع الأسعار المذكورة أسعار استرشادية وقابلة للتغيير من المطور دون إشعار مسبق.",
    locH: "موقع سيلفر ساندز — سيدي حنيش",
    locList: [
      "الكيلو 243 طريق اسكندرية - مرسى مطروح، بين سيدي حنيش والماظة باي",
      "بالقرب من طريق الفوكا الجديد ووصلة العلمين",
      "حوالي 4 كم من شواطئ سيدي حنيش الشهيرة بمياهها الفيروزية",
      "أقرب مطار: برج العرب الدولي",
      "منطقة الجيل الجديد من قرى الساحل الغربي الفاخرة",
    ],
    amenH: "خدمات ومميزات سيلفر ساندز",
    amenities: [
      "شاطئ رملي بمياه فيروزية صافية",
      "لاجونز ومسطحات مائية بين الوحدات",
      "منطقة تجارية ومطاعم وكافيهات عالمية",
      "حمامات سباحة متعددة وبيوت شاطئية",
      "ملاعب رياضية وجيم وسبا",
      "أمن وحراسة على مدار الساعة",
      "ممشى سياحي ومناطق فعاليات صيفية",
      "إدارة وصيانة من اورا ديفلوبرز",
    ],
    galleryH: "صور من سيلفر ساندز",
    devH: "عن اورا ديفلوبرز",
    devP: "ORA Developers أسسها رجل الأعمال نجيب ساويرس، وتعمل في أكثر من 5 دول حول العالم بمشروعات فاخرة في مصر وقبرص واليونان وباكستان وجرينادا. من سابقة أعمالها في مصر: زد الشيخ زايد، زد ايست بالقاهرة الجديدة، وسوليمار بالساحل — وتُعرف بجودة التنفيذ ومستوى التشغيل الفندقي لمشروعاتها.",
    devTags: ["ZED الشيخ زايد", "ZED East", "سوليمار", "أيا نابا مارينا — قبرص"],
    faqH: "أسئلة شائعة عن سيلفر ساندز",
    faqs: [
      ["كام سعر الشاليهات في سيلفر ساندز الساحل الشمالي؟", "الأسعار الاسترشادية للمراحل الجديدة تبدأ من حوالي 8.8 مليون جنيه، وشاليهات 3 غرف من حوالي 32.9 مليون جنيه، والفيلات المستقلة من حوالي 66.5 مليون جنيه. الأسعار في تحديث مستمر — سجل بياناتك للحصول على أحدث برايس ليست رسمية."],
      ["ما هي أنظمة السداد في سيلفر ساندز؟", "توفر اورا ديفلوبرز أنظمة سداد مرنة بمقدمات ميسرة وتقسيط يصل إلى 10 سنوات، وتختلف التفاصيل حسب المرحلة ونوع الوحدة."],
      ["أين تقع قرية سيلفر ساندز بالظبط؟", "تقع في الكيلو 243 على طريق اسكندرية - مرسى مطروح بين سيدي حنيش والماظة باي، في منطقة تشتهر بأنقى مياه الساحل الشمالي، بالقرب من طريق الفوكا الجديد."],
      ["من هو مطور سيلفر ساندز؟", "المطور هو اورا ديفلوبرز ORA Developers المملوكة لرجل الأعمال نجيب ساويرس، وتعمل في أكثر من 5 دول، ومن مشروعاتها في مصر: زد الشيخ زايد وزد ايست وسوليمار."],
      ["هل سيلفر ساندز مناسبة للاستثمار؟", "نعم — الموقع في منطقة سيدي حنيش من أسرع مناطق الساحل الغربي نموًا في الأسعار، واسم المطور الدولي ومستوى التشغيل يرفعان القيمة الإيجارية وإعادة البيع. سجل بياناتك ليساعدك مستشارنا في اختيار الوحدة الأنسب لهدفك."],
    ],
    regH: "سجل بياناتك — تصلك البرايس ليست فورًا",
    regP: "أحدث الأسعار والمساحات وعروض المراحل الجديدة في سيلفر ساندز",
    formName: "الاسم الكامل",
    formPhone: "رقم الموبايل (مصري أو خليجي)  01001234567",
    formWa: "رقم واتساب (اختياري — لو مختلف)",
    formUnit: "نوع الوحدة المطلوبة",
    formUnits: ["شاليه", "تاون / توين هاوس", "فيلا مستقلة", "استفسار عام / استثمار"],
    formBtn: "إرسال — اعرف الأسعار",
    formSending: "جاري الإرسال...",
    formAgree: "بالضغط على إرسال أنت توافق على",
    formPrivacy: "سياسة الخصوصية",
    formAgree2: "— بياناتك تُستخدم فقط للتواصل بخصوص استفسارك العقاري.",
    errName: "من فضلك اكتب الاسم",
    errPhone: "رقم الهاتف غير صحيح — يُقبل الأرقام المصرية والخليجية",
    errWa: "رقم الواتساب غير صحيح",
    errSend: "حدث خطأ، حاول مرة أخرى أو تواصل واتساب",
    errNet: "تعذر الإرسال — تأكد من الاتصال بالإنترنت",
    popupH: "برايس ليست سيلفر ساندز 2026",
    popupP: "سجل رقمك وهنبعتلك أحدث الأسعار والعروض على واتساب",
    footer: "منصة معلومات واستفسارات عقارية مستقلة يديرها فريق مبيعات معتمد لدى كبرى شركات التطوير العقاري في مصر. هذه الصفحة ليست الموقع الرسمي لشركة اورا ديفلوبرز، وجميع الأسماء والعلامات التجارية مملوكة لأصحابها. الأسعار والمساحات الواردة استرشادية وقابلة للتغيير وفق أحدث تحديثات المطور.",
    fAbout: "من نحن",
    fPrivacy: "سياسة الخصوصية",
    fDisclaimer: "إخلاء المسئولية",
    rights: "© 2026 جميع الحقوق محفوظة.",
    mobCall: "اتصال",
    mobWa: "واتساب",
    mobPrice: "الأسعار",
    cookies: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك وقياس أداء الحملات الإعلانية.",
    cookiesBtn: "موافق",
    langBtn: "EN",
  },
  en: {
    dir: "ltr" as const,
    brand: "Silversands",
    brandSub: "North Coast",
    nav: [
      ["about", "About"],
      ["prices", "Prices"],
      ["location", "Location"],
      ["amenities", "Amenities"],
      ["faq", "FAQ"],
      ["register", "Register"],
    ],
    call: "Call now",
    heroTag: "By ORA Developers — Naguib Sawiris · Sidi Heneish, KM 243",
    heroH1: "Silversands North Coast",
    heroH2: "Chalets & villas on the coast's clearest shores — 2026 prices, up to 10-year plans",
    heroP: "Own your unit at Silversands between Sidi Heneish and Almaza Bay — turquoise waters, silver sands, and indicative prices for the newest phases starting around EGP 8.8M, from an international developer active in 5 countries.",
    ctaPrice: "Get the price list",
    ctaWa: "WhatsApp us",
    facts: [
      ["8.8M", "Indicative prices from (EGP)"],
      ["10 yrs", "Payment plans up to"],
      ["KM 243", "Sidi Heneish — Alex/Matrouh Rd"],
      ["ORA", "International developer, 5 countries"],
    ],
    aboutH: "About Silversands North Coast",
    aboutP: [
      "Silversands is ORA Developers' flagship coastal destination in Egypt, set on one of the North Coast's most pristine stretches between Sidi Heneish and Almaza Bay at KM 243 of the Alexandria–Marsa Matrouh road.",
      "Naguib Sawiris chose this location away from the traditional crowds, in an area famous for its crystal turquoise waters and soft white sands. The village is master-planned as a complete community, with most of its land dedicated to greenery, lagoons and amenities.",
      "The project offers chalets, townhouses, twin houses and standalone villas with sea views, with new phases launched on flexible payment plans — making it one of the strongest ownership and investment opportunities on the North Coast in 2026.",
    ],
    pricesH: "Silversands prices 2026",
    pricesP: "Indicative prices, subject to the developer's latest official price list — register to receive the updated list.",
    units: [
      ["New-phase chalets", "Varied layouts overlooking lagoons and the sea", "From ~ EGP 8.8M"],
      ["3-bedroom chalets", "Premium finishing — ideal for families", "From ~ EGP 32.9M"],
      ["Town & twin houses", "Private gardens near the beach", "From ~ EGP 43.8M"],
      ["Standalone villas", "Front rows — maximum privacy", "From ~ EGP 66.5M"],
    ],
    payBox: "Easy down payments, plans up to 10 years",
    payBoxP: "Ask about the current down payment and units available in the latest phases",
    payCta: "Get detailed prices",
    priceNote: "* All prices shown are indicative and subject to change by the developer without prior notice.",
    locH: "Location — Sidi Heneish",
    locList: [
      "KM 243, Alexandria–Marsa Matrouh road, between Sidi Heneish and Almaza Bay",
      "Close to the new Fouka road and the Alamein link",
      "About 4 km from Sidi Heneish's famous turquoise beaches",
      "Nearest airport: Borg El Arab International",
      "The new generation of premium west-coast destinations",
    ],
    amenH: "Amenities at Silversands",
    amenities: [
      "Sandy beach with crystal turquoise water",
      "Lagoons and water features between units",
      "Commercial strip with international dining",
      "Multiple pools and beach houses",
      "Sports courts, gym and spa",
      "24/7 security and gated access",
      "Promenade and summer events zones",
      "Facility management by ORA Developers",
    ],
    galleryH: "Silversands in pictures",
    devH: "About ORA Developers",
    devP: "ORA Developers was founded by businessman Naguib Sawiris and operates in more than 5 countries, with luxury developments across Egypt, Cyprus, Greece, Pakistan and Grenada. In Egypt, its track record includes ZED Sheikh Zayed, ZED East in New Cairo, and Solymar on the coast — known for build quality and hotel-grade operation.",
    devTags: ["ZED Sheikh Zayed", "ZED East", "Solymar", "Ayia Napa Marina — Cyprus"],
    faqH: "Silversands FAQ",
    faqs: [
      ["How much do Silversands chalets cost?", "Indicative prices for the newest phases start around EGP 8.8M; 3-bedroom chalets from around EGP 32.9M and standalone villas from around EGP 66.5M. Prices update frequently — register to receive the latest official price list."],
      ["What payment plans are available?", "ORA offers flexible plans with easy down payments and installments of up to 10 years; details vary by phase and unit type."],
      ["Where exactly is Silversands?", "At KM 243 of the Alexandria–Marsa Matrouh road, between Sidi Heneish and Almaza Bay — an area famous for the North Coast's clearest waters, near the new Fouka road."],
      ["Who is the developer?", "ORA Developers, owned by Naguib Sawiris, active in over 5 countries; its Egyptian portfolio includes ZED Sheikh Zayed, ZED East and Solymar."],
      ["Is Silversands a good investment?", "Yes — Sidi Heneish is one of the fastest-appreciating areas on the west coast, and the developer's international brand and operations support both rental value and resale. Register and our consultant will help you match a unit to your goal."],
    ],
    regH: "Register — get the price list instantly",
    regP: "Latest prices, layouts and new-phase offers at Silversands",
    formName: "Full name",
    formPhone: "Mobile number (Egyptian or Gulf)  01001234567",
    formWa: "WhatsApp number (optional — if different)",
    formUnit: "Unit type",
    formUnits: ["Chalet", "Town / twin house", "Standalone villa", "General inquiry / investment"],
    formBtn: "Send — get prices",
    formSending: "Sending...",
    formAgree: "By submitting you agree to our",
    formPrivacy: "privacy policy",
    formAgree2: "— your data is used only to respond to your real-estate inquiry.",
    errName: "Please enter your name",
    errPhone: "Invalid phone — Egyptian and Gulf numbers are accepted",
    errWa: "Invalid WhatsApp number",
    errSend: "Something went wrong — try again or reach us on WhatsApp",
    errNet: "Couldn't send — check your connection",
    popupH: "Silversands price list 2026",
    popupP: "Leave your number and we'll send the latest prices on WhatsApp",
    footer: "An independent real-estate information and inquiries platform operated by an authorized sales team for Egypt's leading developers. This page is not the official website of ORA Developers; all names and trademarks belong to their owners. Prices and areas shown are indicative and subject to the developer's latest updates.",
    fAbout: "About us",
    fPrivacy: "Privacy policy",
    fDisclaimer: "Disclaimer",
    rights: "© 2026 All rights reserved.",
    mobCall: "Call",
    mobWa: "WhatsApp",
    mobPrice: "Prices",
    cookies: "We use cookies to improve your experience and measure ad performance.",
    cookiesBtn: "Accept",
    langBtn: "عربي",
  },
};

const HERO_IMGS = ["/images/hero-1.jpg", "/images/hero-2.jpg", "/images/hero-3.jpg"];

export default function Page() {
  const [lang, setLang] = useState<Lang>("ar");
  const t = T[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [cookiesOk, setCookiesOk] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [slide, setSlide] = useState(0);
  const popupShown = useRef(false);

  const waLink =
    "https://wa.me/201001050018?text=" +
    encodeURIComponent(lang === "ar" ? WA_TEXT_AR : WA_TEXT_EN);

  /* sync html dir/lang */
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
  }, [lang, t.dir]);

  /* hero crossfade */
  useEffect(() => {
    const i = setInterval(() => setSlide((s) => (s + 1) % HERO_IMGS.length), 5000);
    return () => clearInterval(i);
  }, []);

  /* popup: 55% scroll أو 16 ثانية */
  useEffect(() => {
    const show = () => {
      if (popupShown.current || sessionStorage.getItem("sv_popup")) return;
      popupShown.current = true;
      sessionStorage.setItem("sv_popup", "1");
      setPopupOpen(true);
    };
    const timer = setTimeout(show, 16000);
    const onScroll = () => {
      const sc =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      if (sc >= 0.55) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setCookiesOk(!!localStorage.getItem("sv_cookies"));
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [lang]);

  return (
    <main className="overflow-x-hidden" dir={t.dir}>
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-40 bg-deep/92 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <a href="#" className="text-white font-bold text-lg">
            <span className="font-serif text-xl tracking-wide">{t.brand}</span>{" "}
            <span className="text-sun">{t.brandSub}</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            {t.nav.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="hover:text-sun transition-colors">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="rounded-full border border-white/30 px-3 py-1.5 text-sm text-white hover:bg-white/10"
              aria-label="Switch language"
            >
              {t.langBtn}
            </button>
            <a
              href={`tel:${PHONE_INTL}`}
              onClick={trackCall}
              className="hidden sm:inline-flex rounded-full bg-sun px-4 py-2 text-sm font-semibold text-deep hover:opacity-90 transition-opacity"
            >
              {t.call} {PHONE}
            </a>
            <button
              aria-label="Menu"
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden text-white p-2"
            >
              <span className="block w-6 h-0.5 bg-white mb-1.5" />
              <span className="block w-6 h-0.5 bg-white mb-1.5" />
              <span className="block w-6 h-0.5 bg-white" />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="md:hidden bg-deep border-t border-white/10 px-4 py-3 flex flex-col gap-3 text-white/90">
            {t.nav.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* Hero with crossfade */}
      <section className="relative min-h-[92vh] flex items-center pt-16">
        {HERO_IMGS.map((img, i) => (
          <div
            key={img}
            className="hero-slide absolute inset-0"
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: slide === i ? 1 : 0,
            }}
          />
        ))}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(23,50,60,.8), rgba(23,50,60,.55) 55%, rgba(23,50,60,.93))",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center text-white">
          <p className="inline-block rounded-full border border-sun/50 bg-sun/10 px-4 py-1.5 text-sm text-sun mb-6">
            {t.heroTag}
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.35] mb-3">
            {t.heroH1}
          </h1>
          <p className="font-serif text-sun/90 text-lg md:text-2xl italic mb-5">
            Silversands · North Coast by ORA
          </p>
          <h2 className="text-xl md:text-3xl font-semibold text-white/95 mb-6 leading-relaxed">
            {t.heroH2}
          </h2>
          <p className="max-w-2xl mx-auto text-white/85 md:text-lg mb-9">{t.heroP}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#register"
              className="rounded-full bg-sun px-8 py-3.5 font-bold text-deep hover:opacity-90 transition-opacity"
            >
              {t.ctaPrice}
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener"
              onClick={trackWhatsApp}
              className="rounded-full border border-white/40 px-8 py-3.5 font-bold hover:bg-white/10 transition-colors"
            >
              {t.ctaWa}
            </a>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="bg-teal text-white">
        <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {t.facts.map(([v, l]) => (
            <div key={l} className="reveal">
              <div className="text-2xl md:text-3xl font-extrabold text-sun">{v}</div>
              <div className="text-sm text-white/75 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-shell">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="reveal">
            <h2 className="text-3xl font-bold text-deep mb-5 leading-snug">{t.aboutH}</h2>
            <div className="space-y-4 text-deep/75 leading-relaxed">
              {t.aboutP.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="reveal">
            <img
              src="/images/about.jpg"
              alt={lang === "ar" ? "شاليهات سيلفر ساندز الساحل الشمالي" : "Silversands North Coast chalets"}
              className="rounded-2xl shadow-xl w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Prices */}
      <section id="prices" className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-deep text-center mb-3">{t.pricesH}</h2>
          <p className="text-center text-deep/55 mb-10 max-w-2xl mx-auto">{t.pricesP}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.units.map(([u, a, p]) => (
              <div
                key={u}
                className="reveal rounded-2xl border border-deep/10 bg-shell p-6 flex flex-col"
              >
                <h3 className="font-bold text-lg text-deep mb-2">{u}</h3>
                <p className="text-sm text-deep/60 flex-1">{a}</p>
                <div className="mt-4 pt-4 border-t border-deep/10 font-semibold text-teal">{p}</div>
              </div>
            ))}
          </div>
          <div className="reveal mt-10 rounded-2xl bg-deep text-white p-8 text-center">
            <p className="text-xl font-bold mb-2">{t.payBox}</p>
            <p className="text-white/75 mb-5">{t.payBoxP}</p>
            <a
              href="#register"
              className="inline-block rounded-full bg-sun px-8 py-3 font-bold text-deep hover:opacity-90 transition-opacity"
            >
              {t.payCta}
            </a>
          </div>
          <p className="text-xs text-deep/40 text-center mt-4">{t.priceNote}</p>
        </div>
      </section>

      {/* Location */}
      <section id="location" className="py-20 bg-deep text-white">
        <div className="mx-auto max-w-4xl px-4 reveal">
          <h2 className="text-3xl font-bold mb-6 text-center">{t.locH}</h2>
          <ul className="space-y-3 text-white/85 max-w-2xl mx-auto">
            {t.locList.map((x) => (
              <li key={x} className="flex gap-3">
                <span className="text-sun mt-1">◆</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Amenities */}
      <section id="amenities" className="py-20 bg-shell">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-deep text-center mb-10">{t.amenH}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.amenities.map((a) => (
              <div
                key={a}
                className="reveal rounded-xl bg-white border border-deep/10 p-5 text-sm text-deep/70 leading-relaxed"
              >
                {a}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-deep text-center mb-10">{t.galleryH}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              "/images/gallery-1.jpg",
              "/images/gallery-2.jpg",
              "/images/gallery-3.jpg",
            ].map((src, i) => (
              <img
                key={src}
                src={src}
                alt={lang === "ar" ? `سيلفر ساندز — صورة ${i + 1}` : `Silversands — photo ${i + 1}`}
                className="reveal rounded-2xl w-full h-64 object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Developer */}
      <section className="py-20 bg-teal text-white">
        <div className="mx-auto max-w-4xl px-4 text-center reveal">
          <p className="font-serif text-2xl text-sun mb-3 tracking-[0.15em]">ORA DEVELOPERS</p>
          <h2 className="text-3xl font-bold mb-5">{t.devH}</h2>
          <p className="text-white/85 leading-relaxed mb-7">{t.devP}</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {t.devTags.map((x) => (
              <span key={x} className="rounded-full border border-white/25 px-4 py-1.5 text-white/85">
                {x}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-shell">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold text-deep text-center mb-10">{t.faqH}</h2>
          <div className="space-y-3">
            {t.faqs.map(([q, a], i) => (
              <div key={q} className="reveal rounded-xl bg-white border border-deep/10 overflow-hidden">
                <button
                  className={`w-full px-5 py-4 font-semibold text-deep flex justify-between items-center gap-3 ${lang === "ar" ? "text-right" : "text-left"}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{q}</span>
                  <span className="text-teal shrink-0">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <p className="px-5 pb-5 text-deep/65 leading-relaxed">{a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section id="register" className="py-20 bg-deep">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-3">{t.regH}</h2>
          <p className="text-white/70 text-center mb-8">{t.regP}</p>
          <LeadForm t={t} lang={lang} formLocation="main" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-deep border-t border-white/10 text-white/60 text-sm">
        <div className="mx-auto max-w-6xl px-4 py-10 space-y-5">
          <p className="leading-relaxed">{t.footer}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="/about/" className="hover:text-sun">{t.fAbout}</a>
            <a href="/privacy/" className="hover:text-sun">{t.fPrivacy}</a>
            <a href="/disclaimer/" className="hover:text-sun">{t.fDisclaimer}</a>
            <a href={`tel:${PHONE_INTL}`} onClick={trackCall} className="hover:text-sun">
              {PHONE}
            </a>
          </div>
          <p>{t.rights}</p>
        </div>
      </footer>

      {/* Floating buttons */}
      <div
        className={`fixed bottom-24 md:bottom-8 z-40 flex flex-col gap-3 ${lang === "ar" ? "left-4" : "right-4"}`}
      >
        <a
          href={waLink}
          target="_blank"
          rel="noopener"
          onClick={trackWhatsApp}
          aria-label="WhatsApp"
          className="wa-pulse grid place-items-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" aria-hidden>
            <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.33 4.95L2 22l5.3-1.39a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.83 9.83 0 0 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.34c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.25 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
          </svg>
        </a>
        <a
          href={`tel:${PHONE_INTL}`}
          onClick={trackCall}
          aria-label="Call"
          className="grid place-items-center w-14 h-14 rounded-full bg-sun text-deep shadow-lg"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden>
            <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3.5a1 1 0 0 1 1-1H7.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.21 2.2Z" />
          </svg>
        </a>
      </div>

      {/* Mobile bottom bar */}
      <div className="fixed md:hidden bottom-0 inset-x-0 z-40 bg-deep border-t border-white/10 grid grid-cols-3 text-center text-sm text-white">
        <a href={`tel:${PHONE_INTL}`} onClick={trackCall} className="py-3.5 font-semibold">
          {t.mobCall}
        </a>
        <a
          href={waLink}
          target="_blank"
          rel="noopener"
          onClick={trackWhatsApp}
          className="py-3.5 font-semibold bg-[#25D366]"
        >
          {t.mobWa}
        </a>
        <a href="#register" className="py-3.5 font-semibold bg-sun text-deep">
          {t.mobPrice}
        </a>
      </div>

      {/* Popup */}
      {popupOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4"
          onClick={() => setPopupOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close"
              className={`absolute top-3 text-deep/40 text-xl ${lang === "ar" ? "left-3" : "right-3"}`}
              onClick={() => setPopupOpen(false)}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-deep mb-1 text-center">{t.popupH}</h3>
            <p className="text-sm text-deep/55 text-center mb-5">{t.popupP}</p>
            <LeadForm t={t} lang={lang} formLocation="popup" compact />
          </div>
        </div>
      )}

      {/* Cookie consent */}
      {!cookiesOk && (
        <div
          className={`fixed bottom-16 md:bottom-4 inset-x-4 md:inset-x-auto md:max-w-sm z-50 rounded-xl bg-white shadow-2xl border border-deep/10 p-4 text-sm text-deep/70 ${lang === "ar" ? "md:left-4" : "md:right-4"}`}
        >
          {t.cookies}{" "}
          <a href="/privacy/" className="text-teal underline">
            {t.fPrivacy}
          </a>
          <button
            className="mt-3 w-full rounded-lg bg-deep text-white py-2 font-semibold"
            onClick={() => {
              localStorage.setItem("sv_cookies", "1");
              setCookiesOk(true);
            }}
          >
            {t.cookiesBtn}
          </button>
        </div>
      )}
    </main>
  );
}

/* ====== Lead form ====== */
function LeadForm({
  t,
  lang,
  formLocation,
  compact = false,
}: {
  t: (typeof T)["ar"] | (typeof T)["en"];
  lang: Lang;
  formLocation: string;
  compact?: boolean;
}) {
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    const fd = new FormData(e.currentTarget);
    if (fd.get("botcheck")) return;

    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const whatsapp = String(fd.get("whatsapp") || "").trim();

    if (name.length < 2) return setErr(t.errName);
    if (!validatePhone(phone)) return setErr(t.errPhone);
    if (whatsapp && !validatePhone(whatsapp)) return setErr(t.errWa);

    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "Lead جديد — سيلفر ساندز الساحل الشمالي",
          from_name: "Silversands Landing",
          name,
          phone,
          whatsapp: whatsapp || "—",
          unit: fd.get("unit") || "—",
          language: lang,
          source: formLocation,
          page: "silversands-north-coast",
        }),
      });
      const data = await res.json();
      if (data.success) window.location.href = "/thank-you/";
      else setErr(t.errSend);
    } catch {
      setErr(t.errNet);
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3.5" noValidate>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <input
        name="name"
        placeholder={t.formName}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-deep placeholder:text-deep/40 focus:outline-none focus:border-teal"
      />
      <input
        name="phone"
        inputMode="tel"
        dir="ltr"
        placeholder={t.formPhone}
        className={`w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-deep placeholder:text-deep/40 focus:outline-none focus:border-teal ${lang === "ar" ? "text-right" : "text-left"}`}
      />
      <input
        name="whatsapp"
        inputMode="tel"
        dir="ltr"
        placeholder={t.formWa}
        className={`w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-deep placeholder:text-deep/40 focus:outline-none focus:border-teal ${lang === "ar" ? "text-right" : "text-left"}`}
      />
      {!compact && (
        <select
          name="unit"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-deep/70 focus:outline-none focus:border-teal"
          defaultValue=""
        >
          <option value="" disabled>
            {t.formUnit}
          </option>
          {t.formUnits.map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>
      )}
      {err && <p className="text-red-500 text-sm font-semibold">{err}</p>}
      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-xl bg-sun py-3.5 font-bold text-deep hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {sending ? t.formSending : t.formBtn}
      </button>
      <p className="text-[11px] text-white/50 text-center leading-relaxed">
        {t.formAgree}{" "}
        <a href="/privacy/" className="underline">
          {t.formPrivacy}
        </a>{" "}
        {t.formAgree2}
      </p>
    </form>
  );
}
