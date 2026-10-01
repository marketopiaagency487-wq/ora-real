"use client";

import { useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${seen ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Ribbon({ light = false }: { light?: boolean }) {
  const stroke = light ? "#e8c88a" : "#b28a45";
  return (
    <svg
      viewBox="0 0 320 46"
      className="h-10 w-56 -scale-x-100"
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M2 12C60 2 120 24 178 14c40-7 90 2 140 -6"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.95"
      />
      <path
        d="M2 26C60 16 120 38 178 28c40-7 90 2 140 -6"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M2 40C60 30 120 52 178 42c40-7 90 2 140 -6"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.25"
      />
    </svg>
  );
}

export function Heading({
  eyebrow,
  title,
  sub,
  light = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2
        className={`mt-3 text-3xl leading-tight md:text-4xl ${
          light ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </h2>
      <div className="ribbon-rule mt-5 w-40" />
      {sub && (
        <p
          className={`mt-5 text-base leading-8 ${
            light ? "text-paper/75" : "text-ink/70"
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
