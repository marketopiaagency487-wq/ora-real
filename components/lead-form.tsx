"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { site, products } from "@/lib/site";
import { track } from "@/lib/track";
import { Reveal, Heading } from "./ui";
import CtaWhatsapp from "./cta-whatsapp";

const interests = [
  "شقة فندقية — غرفة",
  "شقة فندقية — غرفتين",
  "شقة فندقية — 3 غرف",
  "عيادة — ميديكا",
  "غير محدد / أريد استشارة",
];

export default function LeadForm({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    const form = e.currentTarget;
    const data = new FormData(form);

    const phone = String(data.get("phone") || "").replace(/\s|-/g, "");
    const okPhone =
      /^01[0125][0-9]{8}$/.test(phone) || /^\+?[1-9][0-9]{7,14}$/.test(phone);
    if (!okPhone) {
      setErr("برجاء إدخال رقم هاتف صحيح (مثال: 01012345678).");
      return;
    }
    if (String(data.get("name") || "").trim().length < 3) {
      setErr("برجاء إدخال الاسم بالكامل.");
      return;
    }

    data.append("access_key", site.web3forms);
    data.append("subject", "عميل جديد — سولانا إيست لين (أورا)");
    data.append("from_name", site.agency);

    setBusy(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        track("form");
        router.push("/thank-you");
      } else {
        setErr("تعذّر إرسال البيانات. برجاء المحاولة مرة أخرى أو التواصل واتساب.");
      }
    } catch {
      setErr("تعذّر الاتصال بالخادم. برجاء المحاولة مرة أخرى.");
    } finally {
      setBusy(false);
    }
  }

  const field =
    "w-full rounded-lg border border-sand-2 bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/40";

  const formEl = (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        className="hidden"
        aria-hidden="true"
      />
      <div>
        <label className="mb-2 block text-sm text-ink/70" htmlFor="name">
          الاسم بالكامل
        </label>
        <input id="name" name="name" required className={field} placeholder="الاسم" />
      </div>
      <div>
        <label className="mb-2 block text-sm text-ink/70" htmlFor="phone">
          رقم الهاتف
        </label>
        <input
          id="phone"
          name="phone"
          inputMode="tel"
          required
          className={`${field} num text-start`}
          placeholder="01012345678"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm text-ink/70" htmlFor="interest">
          الوحدة المهتم بها
        </label>
        <select id="interest" name="interest" className={field} defaultValue={interests[0]}>
          {interests.map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
      </div>
      {!compact && (
        <div>
          <label className="mb-2 block text-sm text-ink/70" htmlFor="note">
            ملاحظات (اختياري)
          </label>
          <textarea id="note" name="note" rows={3} className={field} />
        </div>
      )}

      {err && <p className="text-sm text-red-700">{err}</p>}

      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-full bg-ink py-3.5 font-semibold text-paper transition hover:bg-ink-2 disabled:opacity-60"
      >
        {busy ? "جارٍ الإرسال…" : "أرسل بياناتي"}
      </button>

      <p className="text-xs leading-6 text-ink/50">
        بإرسال البيانات أنت توافق على تواصل فريق {site.agency} معك بخصوص
        المشروع. نحن وسيط عقاري معتمد ولسنا الموقع الرسمي للمطور.
      </p>
    </form>
  );

  if (compact) return formEl;

  return (
    <section id="lead" className="bg-sand/40 py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2">
        <Reveal>
          <Heading
            eyebrow="Register Interest"
            title="سجّل اهتمامك واستلم أسعار الإطلاق"
            sub="هنبعتلك أسعار الإطلاق والمساحات المتاحة وخطوات دفع جدية الحجز."
          />
          <ul className="mt-8 space-y-3 text-[15px] text-ink/75">
            {products.map((p) => (
              <li key={p.slug} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                {p.name}: {p.scarcity}
              </li>
            ))}
            <li className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
              جدية حجز 5% — طرح جديد والمتاح محدود
            </li>
          </ul>
          <CtaWhatsapp
            message="مهتم بسولانا إيست لين من أورا على التسعين الجنوبي. برجاء إرسال الأسعار والمتاح."
            className="mt-8 inline-block text-[15px] text-ink underline underline-offset-8 transition hover:text-brass"
          >
            أو تواصل عبر واتساب مباشرة
          </CtaWhatsapp>
        </Reveal>

        <Reveal delay={70}>
          <div className="slab p-7 shadow-sm">{formEl}</div>
        </Reveal>
      </div>
    </section>
  );
}
