"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

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
  const reduceMotion = useReducedMotion();

  const section = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
        delayChildren: reduceMotion ? 0 : 0.02,
      },
    },
  };

  const card = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const imageWrap = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const image = {
    hidden: { scale: reduceMotion ? 1 : 1.03 },
    show: {
      scale: 1,
      transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      aria-label="Beneficios del menú digital con QR"
      className="w-full bg-black"
    >
      <div className="mx-auto max-w-md px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[24px] text-center font-medium leading-tight metal-text tracking-tight"
        >
          Beneficios clave para tu restaurante
        </motion.h2>

        <motion.div
          variants={section}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="mt-12 space-y-16"
        >
          {BENEFITS.map((benefit, index) => (
            <motion.article key={index} variants={card}>
              {/* Image container */}
              <motion.div
                variants={imageWrap}
                className="relative mb-6 h-[260px] w-full overflow-hidden rounded-3xl bg-zinc-900"
              >
                {/* Subtle overlay (premium feel) */}
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/30 via-transparent to-white/5" />

                <motion.div variants={image} className="absolute inset-0">
                  <Image
                    src={benefit.image}
                    alt={benefit.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover"
                    loading="lazy"
                  />
                </motion.div>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-110px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: reduceMotion ? 0 : 0.04,
                }}
                className="text-[20px] font-medium leading-snug text-white"
              >
                {benefit.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-110px" }}
                transition={{
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                  delay: reduceMotion ? 0 : 0.08,
                }}
                className="mt-2 text-[16px] leading-relaxed text-zinc-400"
              >
                {benefit.description}
              </motion.p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
