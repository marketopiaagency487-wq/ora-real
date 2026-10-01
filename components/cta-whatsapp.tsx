"use client";

import { waLink } from "@/lib/site";
import { track } from "@/lib/track";

export default function CtaWhatsapp({
  message,
  className = "",
  children,
}: {
  message: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener"
      onClick={() => track("whatsapp")}
      className={className}
    >
      {children}
    </a>
  );
}
