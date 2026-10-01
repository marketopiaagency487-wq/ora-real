import Link from "next/link";
import { site } from "@/lib/site";

export default function Legal({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-paper">
      <div className="bg-ink py-10">
        <div className="mx-auto max-w-3xl px-5">
          <Link href="/" className="num text-sm tracking-[0.28em] text-paper">
            SOLANA EAST LANE
          </Link>
          <h1 className="mt-4 text-3xl text-paper">{title}</h1>
          <div className="ribbon-rule mt-5 w-40" />
        </div>
      </div>
      <div className="mx-auto max-w-3xl space-y-5 px-5 py-14 text-[15px] leading-8 text-ink/75">
        {children}
        <p className="pt-6 text-sm">
          للتواصل:{" "}
          <a className="num text-ink underline" href={`tel:${site.phoneIntl}`}>
            {site.phoneDisplay}
          </a>{" "}
          — {site.email}
        </p>
        <Link href="/" className="inline-block pt-4 text-ink underline">
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </main>
  );
}
