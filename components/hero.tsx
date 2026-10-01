import { site, fmt, minPrice, WA_DEFAULT } from "@/lib/site";
import { Ribbon } from "./ui";
import CtaWhatsapp from "./cta-whatsapp";
import LeadForm from "./lead-form";

const stats = [
  { value: "5%", label: "جدية الحجز" },
  { value: "9", label: "سنين تقسيط للسكني" },
  { value: "26.6", label: "فدان على التسعين" },
  { value: "1", label: "مبنى عيادات فقط" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <img
          src="/images/res-garden.webp"
          alt="سولانا إيست لين على شارع التسعين الجنوبي"
          className="kenburns h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/55" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-28">
        <div className="inline-flex items-center gap-3 rounded-full border border-brass-2/40 bg-ink/60 px-5 py-2 text-sm text-paper/85 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-brass-2" />
          طرح جديد: شقق فندقية مخدومة · عيادات ميديكا — المتاح محدود</div>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.1fr_420px]">
          <div>
            <p className="eyebrow">Solana East Lane · by ORA</p>
            <h1 className="mt-4 text-4xl leading-[1.25] text-paper md:text-6xl">
              سولانا إيست لين
            </h1>
            <Ribbon light />
            <p className="mt-4 max-w-xl text-lg leading-9 text-paper/80">
              مشروع جديد من أورا للتطوير العقاري مباشرة على شارع التسعين الجنوبي
              في التجمع الخامس: شقق فندقية مخدومة بالكامل، ومبنى عيادات
              ميديكا. أسعار تبدأ من{" "}
              <span className="num text-brass-2">{fmt(minPrice)}</span> جنيه.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#units"
                className="rounded-full bg-brass-2 px-7 py-3 font-semibold text-ink transition hover:bg-brass-2/85"
              >
                تصفّح الوحدات والأسعار
              </a>
              <CtaWhatsapp
                message={WA_DEFAULT}
                className="rounded-full border border-paper/30 px-7 py-3 font-semibold text-paper transition hover:border-brass-2 hover:text-brass-2"
              >
                واتساب مباشر
              </CtaWhatsapp>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-paper/10 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-ink/85 px-5 py-5">
                  <p className="num text-2xl text-brass-2">{s.value}</p>
                  <p className="mt-2 text-[13px] leading-6 text-paper/60">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-paper/45">
              {site.agency} — وسيط عقاري معتمد. أسعار استرشادية قابلة للتغيير.
            </p>
          </div>

          <div className="rounded-2xl bg-paper p-6 shadow-2xl">
            <p className="eyebrow">Register Interest</p>
            <h2 className="mt-2 text-xl text-ink">استلم الأسعار والمتاح</h2>
            <p className="mt-2 text-sm leading-7 text-ink/60">
              أسعار الإطلاق والمساحات المتاحة في الشقق المخدومة والعيادات.
            </p>
            <div className="mt-5">
              <LeadForm compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
