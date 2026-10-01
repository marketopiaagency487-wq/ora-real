import Header from "@/components/header";
import Hero from "@/components/hero";
import Products from "@/components/products";
import Units from "@/components/units";
import Calculator from "@/components/calculator";
import Developer from "@/components/developer";
import { Location, Amenities, Gallery, Faq } from "@/components/sections";
import { Infrastructure, Investment, Compare as CompareTable } from "@/components/sections-2";
import LeadForm from "@/components/lead-form";
import {
  FloatingCtas,
  MobileBar,
  LeadPopup,
  CookieConsent,
  Footer,
} from "@/components/chrome";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Products />
        <Units />
        <CompareTable />
        <Calculator />
        <Amenities />
        <Infrastructure />
        <Location />
        <Investment />
        <Developer />
        <Gallery />
        <Faq />
        <LeadForm />
      </main>
      <Footer />
      <FloatingCtas />
      <MobileBar />
      <LeadPopup />
      <CookieConsent />
    </>
  );
}
