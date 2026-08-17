import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

// ====== GOOGLE ADS — PLACEHOLDER (عدّل قبل الرفع) ======
const AW_ID = "AW-XXXXXXXXXX"; // TODO

export const metadata: Metadata = {
  title:
    "سيلفر ساندز الساحل الشمالي | Silversands North Coast by ORA — أسعار 2026",
  description:
    "قرية سيلفر ساندز الساحل الشمالي من اورا ديفلوبرز (نجيب ساويرس) — شاليهات وفيلات في سيدي حنيش الكيلو 243. أسعار استرشادية للمراحل تبدأ من 8.8 مليون جنيه وتقسيط حتى 10 سنوات. Silversands North Coast by ORA Developers — chalets & villas at Sidi Heneish. سجل الآن للحصول على البرايس ليست.",
  keywords: [
    "سيلفر ساندز الساحل الشمالي",
    "سيلفر ساند اورا",
    "Silversands North Coast",
    "Silver Sands ORA",
    "أسعار سيلفر ساندز",
    "اورا ديفلوبرز",
    "ORA Developers Naguib Sawiris",
    "شاليهات سيدي حنيش",
    "قرى الساحل الشمالي",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "سيلفر ساندز الساحل الشمالي — ORA | أسعار 2026",
    description:
      "شاليهات وفيلات سيلفر ساندز في سيدي حنيش من اورا ديفلوبرز. أسعار استرشادية وتقسيط حتى 10 سنوات.",
    type: "website",
    locale: "ar_EG",
    images: ["/images/hero-1.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-shell text-deep antialiased">
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
