import LandingPage from "@/components/landing/LandingPage";

export const metadata = {
  title: "Lumo | Tu Menú Digital en 5 Minutos",
  description:
    "Crea tu menú digital gratis en 5 minutos. Tus clientes escanean el QR y ven tu menú en su celular. Sin PDFs, sin apps, sin complicaciones.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Lumo | Tu Menú Digital en 5 Minutos",
    description:
      "Menú digital con QR para restaurantes. Rápido, bonito y gratis.",
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return <LandingPage />;
}
