import ProcessStepCard from "./ProcessStepCard";

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
      <div
        className="mx-auto w-full max-w-md px-4 py-12"
        aria-labelledby="how-title"
      >
        <h2
          id="how-title"
          className="text-[24px] text-center font-medium text-white leading-tight tracking-tight mb-8"
        >
          Cómo funciona tu menú digital con QR
        </h2>

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
      </div>
    </section>
  );
}
