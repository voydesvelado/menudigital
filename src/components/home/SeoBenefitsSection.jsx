import Image from "next/image";

const BENEFITS = [
  {
    title: "Una experiencia más intuitiva para tus clientes",
    description:
      "Facilita que encuentren lo que buscan con búsqueda y filtros claros, reduciendo dudas y mejorando la toma de decisiones al ordenar.",
    image:
      "https://rvivezcozdjpgkwqgroq.supabase.co/storage/v1/object/public/menu-images/Landing/Benefits/menu-busqueda-filtros.webp",
    alt: "Menú digital con búsqueda y filtros por categorías en restaurante",
  },
  {
    title: "Actualiza tu menú en minutos",
    description:
      "Crea distintos menús por horario, ajusta precios y gestiona tus platillos fácilmente desde un solo lugar.",
    image:
      "https://rvivezcozdjpgkwqgroq.supabase.co/storage/v1/object/public/menu-images/Landing/Benefits/menu-horarios-precios.webp",
    alt: "Menú digital con horarios y control de precios para restaurantes",
  },
  {
    title: "Mejora la percepción de tu restaurante",
    description:
      "Una navegación clara y ordenada genera confianza, reduce fricciones y aumenta la probabilidad de reseñas positivas.",
    image:
      "https://rvivezcozdjpgkwqgroq.supabase.co/storage/v1/object/public/menu-images/Landing/Benefits/menu-resenas-experiencia.webp",
    alt: "Menú digital profesional que mejora la experiencia del cliente",
  },
];

export default function SeoBenefitsSection() {
  return (
    <section
      aria-label="Beneficios del menú digital con QR"
      className="w-full bg-black"
    >
      <div className="mx-auto max-w-md px-4 py-16">
        <h2 className="text-[24px] text-center font-medium leading-tight metal-text tracking-tight">
          Beneficios clave para tu restaurante
        </h2>

        <div className="mt-12 space-y-16">
          {BENEFITS.map((benefit, index) => (
            <article key={index}>
              <div className="relative mb-6 h-[260px] w-full overflow-hidden rounded-3xl bg-zinc-900">
                <Image
                  src={benefit.image}
                  alt={benefit.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              <h3 className="text-[20px] font-medium leading-snug text-white">
                {benefit.title}
              </h3>

              <p className="mt-2 text-[16px] leading-relaxed text-zinc-400">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
