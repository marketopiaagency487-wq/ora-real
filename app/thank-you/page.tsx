"use client";
import { useEffect } from "react";
const CONV_FORM = "AW-XXXXXXXXXX/FORM_LABEL"; // TODO
declare global { interface Window { gtag?: (...a: unknown[]) => void } }
export default function ThankYou() {
  useEffect(() => { window.gtag?.("event", "conversion", { send_to: CONV_FORM }); }, []);
  return (
    <main className="min-h-screen grid place-items-center bg-deep px-4 text-center text-white">
      <div>
        <div className="text-6xl mb-6">✓</div>
        <h1 className="text-3xl font-bold mb-3">تم استلام طلبك بنجاح — Thank you!</h1>
        <p className="text-white/75 mb-8 max-w-md mx-auto">سيتواصل معك مستشارنا العقاري خلال دقائق بتفاصيل سيلفر ساندز. Our consultant will contact you shortly.</p>
        <a href="https://wa.me/201001050018" className="inline-block rounded-full bg-[#25D366] px-8 py-3.5 font-bold">WhatsApp — واتساب</a>
        <p className="mt-6"><a href="/" className="text-sun underline">العودة للصفحة الرئيسية — Back home</a></p>
      </div>
    </main>
  );
}
