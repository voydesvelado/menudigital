import BenefitCard from "./BenefitCard";

export default function BenefitsSection() {
  const benefits = [
    {
      id: "print",
      imageURL:
        "https://rvivezcozdjpgkwqgroq.supabase.co/storage/v1/object/public/menu-images/Landing/Emojis/money.webp",
      title: "Reduce costos de impresión",
      description:
        "Evita reimpresiones cada vez que cambian precios o platillos.",
    },
    {
      id: "speed",
      imageURL:
        "https://rvivezcozdjpgkwqgroq.supabase.co/storage/v1/object/public/menu-images/Landing/Emojis/light.webp",
      title: "Actualiza en minutos",
      description: "Cambios inmediatos, sin esperas ni intermediarios.",
    },
    {
      id: "ux",
      imageURL:
        "https://rvivezcozdjpgkwqgroq.supabase.co/storage/v1/object/public/menu-images/Landing/Emojis/brain.webp",
      title: "Interfaz que vende más",
      description: "Un menú tipo Uber Eats que se entiende al instante.",
    },
    {
      id: "search",
      imageURL:
        "https://rvivezcozdjpgkwqgroq.supabase.co/storage/v1/object/public/menu-images/Landing/Emojis/search.webp",
      title: "Decisiones más rápidas en mesa",
      description: "Búsqueda y filtros para encontrar y pedir sin preguntar.",
    },
  ];

  return (
    <section
      className="mx-auto w-full max-w-md px-4 py-12"
      aria-labelledby="benefits-title"
    >
      <h2
        id="benefits-title"
        className="mb-8 text-center text-[24px] font-medium leading-tight tracking-tight"
      >
        Por qué usar un menú QR
      </h2>

      <div className="flex flex-col gap-4">
        {benefits.map((benefit) => (
          <BenefitCard
            key={benefit.id}
            imageURL={benefit.imageURL}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </div>
    </section>
  );
}
