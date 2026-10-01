import { Reveal, Heading } from "./ui";
import CtaWhatsapp from "./cta-whatsapp";

const pillars = [
  {
    title: "أورا للتطوير العقاري",
    body: "مطور م. نجيب ساويرس، اتأسس باسم Gemini واتغير اسمه لأورا في 2018.",
  },
  {
    title: "محفظة مشروعات كبيرة",
    body: "ZED في الشيخ زايد والقاهرة الجديدة، Solana في نيو زايد، وسولانا إيست في التجمع.",
  },
  {
    title: "سولانا إيست لين",
    body: "26.6 فدان على شارع التسعين الجنوبي، 8 مباني منها مبنى عيادات واحد.",
  },
  {
    title: "منتجات مخدومة",
    body: "خبرة أورا في الشقق المخدومة والإدارة بتفرق في قيمة الوحدة وعائد الإيجار.",
  },
];

export default function Developer() {
  return (
    <section id="developer" className="bg-ink-2 py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div className="frame h-full min-h-[320px]">
            <img
              src="/images/medica-facade.webp"
              alt="واجهة مبنى ميديكا"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={70}>
          <Heading
            light
            eyebrow="The Developer"
            title="من يقف خلف المشروع"
            sub="اسم المطور هو أهم ضمان في الطروحات الجديدة، وأورا من أقوى الأسماء في السوق."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <div key={p.title} style={{ transitionDelay: `${i * 40}ms` }}>
                <h3 className="text-base text-paper">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-8 text-paper/65">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
          <CtaWhatsapp
            message="برجاء إرسال بروشور سولانا إيست لين والمتاح في الشقق والعيادات."
            className="mt-8 inline-block rounded-full border border-paper/30 px-6 py-3 text-sm font-semibold text-paper transition hover:border-brass-2 hover:text-brass-2"
          >
            اطلب البروشور والمتاح
          </CtaWhatsapp>
        </Reveal>
      </div>
    </section>
  );
}
