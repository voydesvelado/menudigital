"use client";

import { motion, useReducedMotion } from "framer-motion";
import BenefitCard from "./BenefitCard";

export default function BenefitsSection() {
  const reduceMotion = useReducedMotion();

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

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
        delayChildren: reduceMotion ? 0 : 0.02,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      className="mx-auto w-full max-w-md px-4 py-12"
      aria-labelledby="benefits-title"
    >
      <motion.h2
        id="benefits-title"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 text-center text-[24px] font-medium leading-tight tracking-tight"
      >
        Por qué usar un menú QR
      </motion.h2>

      <motion.div
        className="flex flex-col gap-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-110px" }}
      >
        {benefits.map((benefit) => (
          <motion.div key={benefit.id} variants={item}>
            <BenefitCard
              imageURL={benefit.imageURL}
              title={benefit.title}
              description={benefit.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
