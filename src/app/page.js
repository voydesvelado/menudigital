import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BenefitsSection from "@/components/home/BenefitsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import SeoBenefitsSection from "@/components/home/SeoBenefitsSection";
import { TopNavbar } from "@/components/home/TopNavbar";

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

      <main className="mx-auto w-full max-w-md px-4 pb-10">
        {/* Imagen del menú (340px height) */}
        <section className="pt-6" aria-label="Vista previa del menú">
          <div className="relative w-full rounded-3xl bg-muted aspect-[1/1]">
            <Image
              src="https://rvivezcozdjpgkwqgroq.supabase.co/storage/v1/object/public/menu-images/Landing/Hero/HeroBanner.png"
              alt="Ejemplo de menú digital con QR tipo Uber Eats"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover"
            />
          </div>
        </section>

        {/* Contenido */}
        <section className="pt-8">
          <h1 className="text-[32px] font-medium leading-snug tracking-tight">
            <span className="metal-text-dark inline-block">
              Menú digital con QR para
              <br />
              vender más
            </span>
          </h1>

          <p className="mt-3 text-[16px] font-normal leading-relaxed text-muted-foreground">
            Convierte tu menú físico en una experiencia digital tipo Uber Eats.
            Tus clientes encuentran más rápido, exploran más platillos y
            consumen más por mesa.
          </p>

          {/* CTAs */}
          <div className="mt-6 flex gap-3">
            <Button
              asChild
              variant="outline"
              className="h-11 flex-1 rounded-full text-[14px] font-medium"
            >
              <Link href="/r/tu-restaurante" aria-label="Ver ejemplo del menú">
                Ver ejemplo
              </Link>
            </Button>
            <Button
              asChild
              className="h-11 flex-1 rounded-full text-[14px] font-medium"
            >
              <a
                href="https://wa.me/52TU_NUMERO?text=Hola%20quiero%20una%20demo%20del%20men%C3%BA%20digital"
                aria-label="Hablar por WhatsApp"
              >
                Hablar por WhatsApp
              </a>
            </Button>
          </div>

          <p className="mt-3 text-[14px] font-normal text-muted-foreground">
            Respuesta rápida por WhatsApp. Sin compromiso.
          </p>
        </section>
      </main>

      <SeoBenefitsSection />
      <BenefitsSection />
      <HowItWorksSection />
    </>
  );
}
