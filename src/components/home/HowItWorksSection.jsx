"use client";

import { motion, useReducedMotion } from "framer-motion";
import ProcessStepCard from "./ProcessStepCard";
import Link from "next/link";

export default function HowItWorksSection() {
  const reduceMotion = useReducedMotion();

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

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.09,
        delayChildren: reduceMotion ? 0 : 0.03,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="w-full bg-black" aria-labelledby="how-title">
      <div className="mx-auto w-full max-w-md px-4 py-12">
        {/* Title */}
        <motion.h2
          id="how-title"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 text-center text-[24px] font-medium leading-tight tracking-tight text-white"
        >
          Nuestro proceso
        </motion.h2>

        {/* Steps (stagger clean) */}
        <motion.div
          className="flex flex-col gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-110px" }}
        >
          {steps.map((s) => (
            <motion.div key={s.step} variants={item}>
              <ProcessStepCard
                step={s.step}
                title={s.title}
                description={s.description}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Mini CTA Section */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="mt-16 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[24px] font-medium leading-tight"
          >
            <span className="metal-text">Tu comida ya es buena.</span>
            <br />
            <span className="metal-text">
              Tu menú debería estar a la altura.
            </span>
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8">
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="https://wa.me/522211814454?text=Hola,%20me%20interesa%20implementar%20un%20men%C3%BA%20digital%20con%20QR%20en%20mi%20restaurante"
                target="_blank"
                className="inline-flex w-full items-center justify-center rounded-full bg-white h-11 px-6 py-4 text-[16px] font-medium text-black transition hover:opacity-90"
              >
                Hablar por WhatsApp
              </Link>
            </motion.div>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-12 text-sm text-white/60">
            Lumo 2026
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
