import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BenefitsSection from "@/components/home/BenefitsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import SeoBenefitsSection from "@/components/home/SeoBenefitsSection";
import { TopNavbar } from "@/components/home/TopNavbar";
import HeroSection from "@/components/home/HeroSection";

// SEO (App Router)
export const metadata = {
  title: "Menú digital con QR para restaurantes | Menú QR",
  description:
    "Convierte tu menú físico en una experiencia tipo Uber Eats para que tus clientes encuentren más rápido, exploren más platillos y aumenten el consumo por mesa.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Menú digital con QR para restaurantes",
    description:
      "Menú digital tipo Uber Eats: búsqueda, categorías y mejor experiencia para vender más.",
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Menú QR",
    url: "https://tudominio.com",
    description:
      "Menú digital con QR para restaurantes con navegación tipo Uber Eats.",
  };

  return (
    <>
      {/* Structured Data (SEO) */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <TopNavbar />
      <HeroSection />
      <SeoBenefitsSection />
      <BenefitsSection />
      <HowItWorksSection />
    </>
  );
}
