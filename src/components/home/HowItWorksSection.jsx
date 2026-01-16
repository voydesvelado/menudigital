import ProcessStepCard from "./ProcessStepCard";
import Link from "next/link";

export default function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      title: "Digitalizamos tu menú",
      description:
        "Nos compartes tu menú y lo convertimos en una experiencia móvil.",
    },
    {
      step: 2,
      title: "Te entregamos tu QR",
      description: "Listo para imprimir o usar en mesas, cartas o paredes.",
    },
    {
      step: 3,
      title: "Empiezas a vender más",
      description: "Tus clientes exploran, deciden más rápido y consumen más.",
    },
  ];

  return (
    <section className="w-full bg-black">
      <div className="mx-auto w-full max-w-md px-4 py-12">
        {/* Title */}
        <h2
          id="how-title"
          className="mb-8 text-center text-[24px] font-medium leading-tight tracking-tight text-white"
        >
          Nuestro proceso
        </h2>

        {/* Steps */}
        <div className="flex flex-col gap-4">
          {steps.map((s) => (
            <ProcessStepCard
              key={s.step}
              step={s.step}
              title={s.title}
              description={s.description}
            />
          ))}
        </div>

        {/* Mini CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-[24px] font-medium leading-tight">
            <span className="metal-text">Tu comida ya es buena.</span>
            <br />
            <span className="metal-text">
              Tu menú debería estar a la altura.
            </span>
          </p>

          <div className="mt-8">
            <Link
              href="https://wa.me/XXXXXXXXXX"
              target="_blank"
              className="inline-flex w-full items-center justify-center rounded-full bg-white h-11 px-6 py-4 text-[16px] font-medium text-black transition hover:opacity-90"
            >
              Hablar por WhatsApp
            </Link>
          </div>

          <p className="mt-12 text-sm text-white/60">Lumo 2026</p>
        </div>
      </div>
    </section>
  );
}
