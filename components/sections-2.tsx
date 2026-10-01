import { infrastructure, investment, products, fmt } from "@/lib/site";
import { Reveal, Heading } from "./ui";
import CtaWhatsapp from "./cta-whatsapp";

export function Infrastructure() {
  return (
    <section className="bg-ink-2 py-20">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <Heading
            light
            eyebrow="The Numbers"
            title="مشروع على الشارع، مش جوه كمبوند"
            sub="سولانا إيست لين مشروع متوسط الحجم على واجهة طويلة من التسعين الجنوبي — ده اللي بيدي العيادات والشقق المخدومة قيمتها."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {infrastructure.map((f, i) => (
            <Reveal key={f.title} delay={i * 50}>
              <div className="h-full border-t-2 border-brass-2/60 pt-5">
                <h3 className="text-lg text-paper">{f.title}</h3>
                <p className="mt-3 text-[15px] leading-8 text-paper/65">
                  {f.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Investment() {
  return (
    <section id="investment" className="bg-paper py-20">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <Heading
            eyebrow="The Case"
            title="ليه سولانا إيست لين دلوقتي"
            sub="أربع نقاط بتفرق بين الشراء وقت الإطلاق والشراء بعد ما المتاح يخلص."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {investment.map((c, i) => (
            <Reveal key={c.title} delay={i * 60}>
              <div className="slab flex h-full gap-6 p-7 shadow-sm">
                <div className="shrink-0">
                  <p className="num text-3xl text-brass">{c.stat}</p>
                  <p className="mt-1 text-xs text-ink/50">{c.unit}</p>
                </div>
                <div>
                  <h3 className="text-lg text-ink">{c.title}</h3>
                  <p className="mt-2 text-[15px] leading-8 text-ink/70">
                    {c.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Compare() {
  const [a, b] = products;
  const rows: { label: string; a: string; b: string }[] = [
    { label: "النوع", a: "شقق فندقية مخدومة بالكامل", b: "عيادات طبية متشطبة بالحمامات" },
    { label: "المبنى", a: "G+3.5", b: "G+3 — مبنى واحد فقط" },
    { label: "الوحدات", a: "غرفة · غرفتين · 3 غرف", b: "من 57 لـ 155 م²" },
    { label: "تبدأ من", a: `${fmt(8_900_000)} جنيه`, b: `${fmt(14_000_000)} جنيه` },
    { label: "جدية الحجز", a: a.eoi, b: b.eoi },
    { label: "السداد", a: a.plan, b: `${b.dpLabel} · ${b.plan}` },
    { label: "الأنسب لـ", a: "سكن أو استثمار إيجاري بإدارة فندقية", b: "طبيب بيأسس عيادته أو مستثمر بيأجر لقطاع طبي" },
  ];

  return (
    <section id="compare" className="bg-sand/40 py-20">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <Heading
            eyebrow="Side by Side"
            title="سكني ولا ميديكال؟"
            sub="مقارنة مباشرة بين الطرحين قبل القرار."
          />
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-start">
              <thead>
                <tr>
                  <th className="w-40 border-b border-sand-2 p-4 text-start text-sm font-normal text-ink/50">
                    البند
                  </th>
                  <th className="border-b border-sand-2 p-4 text-start">
                    <span className="num block text-sm tracking-[0.14em] text-brass">
                      {a.nameEn}
                    </span>
                    <span className="mt-1 block text-base text-ink">
                      {a.name}
                    </span>
                  </th>
                  <th className="border-b border-sand-2 p-4 text-start">
                    <span className="num block text-sm tracking-[0.14em] text-brass">
                      {b.nameEn}
                    </span>
                    <span className="mt-1 block text-base text-ink">
                      {b.name}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label}>
                    <td className="border-b border-sand-2 p-4 align-top text-sm text-ink/55">
                      {r.label}
                    </td>
                    <td className="border-b border-sand-2 p-4 align-top text-[15px] text-ink">
                      {r.a}
                    </td>
                    <td className="border-b border-sand-2 p-4 align-top text-[15px] text-ink">
                      {r.b}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <CtaWhatsapp
            message="محتاج استشارة: أنسب لي شقة مخدومة ولا عيادة في سولانا إيست لين؟"
            className="mt-8 inline-block rounded-full bg-ink px-7 py-3 text-sm font-semibold text-paper transition hover:bg-ink-2"
          >
            اطلب استشارة لتحديد الأنسب
          </CtaWhatsapp>
        </Reveal>
      </div>
    </section>
  );
}
