"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site, waLink } from "@/lib/site";
import { track } from "@/lib/track";
import LeadForm from "./lead-form";

const WA_MSG =
  "مهتم بسولانا إيست لين من أورا على التسعين الجنوبي. برجاء إرسال الأسعار والمتاح.";

export function FloatingCtas() {
  return (
    <div className="fixed bottom-24 end-4 z-40 flex flex-col gap-3 md:bottom-6">
      <a
        href={waLink(WA_MSG)}
        target="_blank"
        rel="noopener"
        onClick={() => track("whatsapp")}
        aria-label="واتساب"
        className="grid h-13 w-13 place-items-center rounded-full bg-[#25D366] p-3.5 shadow-lg transition hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
          <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.06c-.25.69-1.44 1.32-1.99 1.36-.53.04-1.02.22-3.45-.72-2.9-1.15-4.74-4.12-4.88-4.31-.14-.19-1.16-1.55-1.16-2.96 0-1.41.74-2.1 1-2.39.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.15.12.32.02.51-.09.19-.14.31-.28.48-.14.17-.3.37-.42.5-.14.14-.29.29-.12.57.16.29.73 1.2 1.56 1.95 1.07.95 1.97 1.25 2.26 1.39.28.14.45.12.61-.07.17-.19.71-.83.9-1.11.19-.29.38-.24.64-.14.26.09 1.67.79 1.95.93.29.14.48.22.55.34.07.12.07.69-.18 1.39Z" />
        </svg>
      </a>
      <a
        href={`tel:${site.phoneIntl}`}
        onClick={() => track("call")}
        aria-label="اتصال"
        className="grid h-13 w-13 place-items-center rounded-full bg-ink p-3.5 shadow-lg transition hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-brass-2">
          <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2Z" />
        </svg>
      </a>
    </div>
  );
}

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-sand-2 bg-paper/98 backdrop-blur md:hidden">
      <a
        href={`tel:${site.phoneIntl}`}
        onClick={() => track("call")}
        className="py-3.5 text-center text-sm font-semibold text-ink"
      >
        اتصل
      </a>
      <a
        href={waLink(WA_MSG)}
        target="_blank"
        rel="noopener"
        onClick={() => track("whatsapp")}
        className="border-x border-sand-2 py-3.5 text-center text-sm font-semibold text-ink"
      >
        واتساب
      </a>
      <a
        href="#lead"
        className="bg-ink py-3.5 text-center text-sm font-semibold text-paper"
      >
        سجّل
      </a>
    </div>
  );
}

export function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    let fired = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      setOpen(true);
    };
    const t = setTimeout(fire, 16000);
    const onScroll = () => {
      const p =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (p > 0.55) fire();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, [done]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-ink/70 px-4 py-8">
      <div className="relative max-h-full w-full max-w-md overflow-y-auto rounded-2xl bg-paper p-7">
        <button
          onClick={() => {
            setOpen(false);
            setDone(true);
          }}
          aria-label="إغلاق"
          className="absolute end-4 top-4 text-2xl leading-none text-ink/50"
        >
          ✕
        </button>
        <p className="eyebrow">Price List</p>
        <h3 className="mt-3 text-2xl text-ink">استلم المتاح بالأسعار</h3>
        <p className="mt-3 text-[15px] leading-8 text-ink/70">
          اترك رقمك ويصلك أسعار الإطلاق والمتاح في الشقق المخدومة والعيادات.
        </p>
        <div className="mt-6">
          <LeadForm compact />
        </div>
      </div>
    </div>
  );
}

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem("cookie-ok")) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-14 z-50 mx-auto max-w-3xl rounded-xl bg-ink px-5 py-4 text-paper shadow-xl md:bottom-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm leading-7 text-paper/80">
          نستخدم ملفات تعريف الارتباط لتحسين التجربة وقياس أداء الحملات.
        </p>
        <button
          onClick={() => {
            try {
              window.localStorage.setItem("cookie-ok", "1");
            } catch {}
            setShow(false);
          }}
          className="rounded-full bg-brass-2 px-5 py-2 text-sm font-semibold text-ink"
        >
          موافق
        </button>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink pb-24 pt-16 text-paper md:pb-16">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="num text-lg tracking-[0.28em] text-paper">SOLANA EAST LANE</p>
            <p className="mt-2 text-sm text-brass-2">سولانا إيست لين — by ORA</p>
            <p className="mt-4 text-sm leading-7 text-paper/60">
              شارع التسعين الجنوبي، التجمع الخامس، القاهرة الجديدة.
            </p>
          </div>
          <div>
            <p className="text-sm text-paper/50">تواصل</p>
            <a
              href={`tel:${site.phoneIntl}`}
              onClick={() => track("call")}
              className="num mt-3 block text-lg text-paper"
            >
              {site.phoneDisplay}
            </a>
            <a
              href={waLink(WA_MSG)}
              target="_blank"
              rel="noopener"
              onClick={() => track("whatsapp")}
              className="mt-2 block text-sm text-paper/70 hover:text-brass-2"
            >
              واتساب
            </a>
            <p className="mt-2 text-sm text-paper/60">{site.email}</p>
          </div>
          <div>
            <p className="text-sm text-paper/50">روابط</p>
            <div className="mt-3 space-y-2 text-sm text-paper/70">
              <Link href="/about" className="block hover:text-brass-2">
                من نحن
              </Link>
              <Link href="/privacy" className="block hover:text-brass-2">
                سياسة الخصوصية
              </Link>
              <Link href="/disclaimer" className="block hover:text-brass-2">
                إخلاء المسؤولية
              </Link>
            </div>
          </div>
        </div>

        <div className="ribbon-rule my-10" />

        <p className="text-xs leading-7 text-paper/45">
          {site.agency} وسيط عقاري معتمد، وهذا الموقع ليس الموقع الرسمي لشركة
          أورا للتطوير العقاري. جميع الأسعار والمساحات استرشادية وقابلة للتغيير دون إشعار
          مسبق، والمعتمد هو ما يصدر رسميًا من المطور.
        </p>
        <p className="mt-4 text-xs text-paper/35">
          © {new Date().getFullYear()} {site.agency}
        </p>
      </div>
    </footer>
  );
}
