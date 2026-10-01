"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site, waLink } from "@/lib/site";
import { track } from "@/lib/track";

const nav = [
  { href: "#products", label: "سكني وعيادات" },
  { href: "#units", label: "الوحدات والأسعار" },
  { href: "#compare", label: "مقارنة" },
  { href: "#calc", label: "حاسبة التقسيط" },
  { href: "#location", label: "الموقع" },
  { href: "#gallery", label: "الصور" },
  { href: "#lead", label: "التسجيل" },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-ink/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5">
        <Link href="/" className="flex flex-col leading-none">
          <span className="num text-lg tracking-[0.28em] text-paper">SOLANA EAST LANE</span>
          <span className="mt-1 text-[11px] text-brass-2">
            by ORA — التسعين الجنوبي
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-paper/80 transition hover:text-brass-2"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phoneIntl}`}
            onClick={() => track("call")}
            className="num hidden rounded-full border border-paper/25 px-4 py-2 text-sm text-paper transition hover:border-brass-2 hover:text-brass-2 sm:block"
          >
            {site.phoneDisplay}
          </a>
          <a
            href={waLink(
              "مهتم بسولانا إيست لين من أورا على التسعين الجنوبي. برجاء إرسال الأسعار والمتاح."
            )}
            onClick={() => track("whatsapp")}
            target="_blank"
            rel="noopener"
            className="rounded-full bg-brass-2 px-5 py-2 text-sm font-semibold text-ink transition hover:bg-brass-2/85"
          >
            تواصل الآن
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="القائمة"
            aria-expanded={open}
            className="ms-1 grid h-10 w-10 place-items-center rounded-full border border-paper/25 text-paper lg:hidden"
          >
            <span className="text-lg leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-paper/10 bg-ink/98 px-5 py-4 lg:hidden">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block border-b border-paper/10 py-3 text-paper/85"
            >
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
