import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

// ====== GOOGLE ADS — PLACEHOLDER (عدّل قبل الرفع) ======
const AW_ID = "AW-XXXXXXXXXX"; // TODO

export const metadata: Metadata = {
  title:
    "سيلفر ساندس الساحل الشمالي | Silversands North Coast من اورا — أسعار 2026 ومقدم 5%",
  description:
    "قرية سيلفر ساندس الساحل الشمالي Silversands من اورا ديفلوبرز على 485 فدان عند الكيلو 222 بين سيدي حنيش وألماظة باي — شاليهات وتاون هاوس وتوين وفيلات بتشطيب كامل وتكييفات، بمراحل SilverWalk وSilverBay وذا كوف. أسعار استرشادية تبدأ من 8,800,000 جنيه بمقدم 5% وتقسيط حتى 10 سنوات. اطلب البرايس ليست الآن.",
  keywords: [
    "سيلفر ساندس الساحل الشمالي",
    "Silversands North Coast",
    "أسعار سيلفر ساندس",
    "سيلفر ساندس اورا",
    "اورا ديفلوبرز",
    "ORA Developers",
    "SilverWalk",
    "SilverBay",
    "شاليهات سيدي حنيش",
    "قرى الساحل الشمالي",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "سيلفر ساندس الساحل الشمالي — اورا | أسعار 2026",
    description:
      "شاليهات وفيلات على لاجون كريستالي وشاطئ خاص. مقدم 5% وتقسيط حتى 10 سنوات.",
    type: "website",
    locale: "ar_EG",
    images: ["/images/hero.webp"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,600;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-sand text-ink antialiased">
        {children}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${AW_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${AW_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
