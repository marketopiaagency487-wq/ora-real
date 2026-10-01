import type { Metadata } from "next";
import Link from "next/link";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "تم استلام بياناتك — سولانا إيست لين",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main className="grid min-h-screen place-items-center bg-ink px-5 text-center">
      <div className="max-w-lg">
        <p className="eyebrow">Received</p>
        <h1 className="mt-4 text-3xl text-paper md:text-4xl">
          تم استلام بياناتك
        </h1>
        <div className="ribbon-rule mx-auto mt-6 w-40" />
        <p className="mt-6 text-[15px] leading-8 text-paper/70">
          سيتواصل معك أحد مستشاري المبيعات خلال دقائق لإرسال المتاح الحالي بالأسعار
          والمساحات المتاحة في سولانا إيست لين.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={waLink("سجلت بياناتي على الموقع وأنتظر أسعار سولانا إيست لين.")}
            target="_blank"
            rel="noopener"
            className="rounded-full bg-brass-2 px-7 py-3 font-semibold text-ink"
          >
            تحدث معنا الآن
          </a>
          <a
            href={`tel:${site.phoneIntl}`}
            className="num rounded-full border border-paper/30 px-7 py-3 font-semibold text-paper"
          >
            {site.phoneDisplay}
          </a>
        </div>
        <Link href="/" className="mt-8 inline-block text-sm text-paper/60 underline">
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </main>
  );
}
