"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [imageReady, setImageReady] = useState(false);

  // Fallback: si por alguna razón onLoadingComplete tarda o no llega,
  // no bloqueamos la UI (evita “hero congelado” en edge cases).
  useEffect(() => {
    const t = setTimeout(() => setImageReady(true), 900);
    return () => clearTimeout(t);
  }, []);

  const ease = [0.16, 1, 0.3, 1];

  const textWrap = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.07,
        delayChildren: reduceMotion ? 0 : 0.06,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease },
    },
  };

  // Reveal “portfolio vibe”: clip + scale super sutil + blur->clear
  // IMPORTANTE: corre solo cuando imageReady === true
  const imageReveal = {
    hidden: reduceMotion
      ? { opacity: 1 }
      : {
          opacity: 0,
          scale: 1.03,
          filter: "blur(10px)",
          clipPath: "inset(14% 10% 14% 10% round 24px)",
        },
    show: reduceMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          clipPath: "inset(0% 0% 0% 0% round 24px)",
          transition: { duration: 1.0, ease },
        },
  };

  return (
    <main className="mx-auto w-full max-w-md px-4 pb-10">
      {/* Imagen hero */}
      <section className="pt-6" aria-label="Vista previa del menú">
        <motion.div
          // Clave: no arrancamos animación hasta que la imagen esté lista
          initial="hidden"
          animate={imageReady ? "show" : "hidden"}
          variants={imageReveal}
          className="relative w-full overflow-hidden rounded-3xl bg-muted aspect-[1/1]"
        >
          <Image
            src="https://rvivezcozdjpgkwqgroq.supabase.co/storage/v1/object/public/menu-images/Landing/Hero/HeroBanner.png"
            alt="Ejemplo de menú digital con QR tipo Uber Eats"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover"
            onLoadingComplete={() => setImageReady(true)}
          />

          {/* overlay sutil para premium feel + oculta micro banding durante blur */}
          {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" /> */}

          {/* opcional: shimmer mini mientras carga (NO brinca layout) */}
          {!reduceMotion && !imageReady && (
            <div className="pointer-events-none absolute inset-0 animate-pulse bg-black/5" />
          )}
        </motion.div>
      </section>

      {/* Contenido */}
      <motion.section
        className="pt-8"
        variants={textWrap}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          variants={fadeUp}
          className="text-[32px] font-medium leading-snug tracking-tight"
        >
          <span className="metal-text-dark inline-block">
            Menú digital con QR para
            <br />
            vender más
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-3 text-[16px] font-normal leading-relaxed text-muted-foreground"
        >
          Convierte tu menú físico en una experiencia digital tipo Uber Eats.
          Tus clientes encuentran más rápido, exploran más platillos y consumen
          más por mesa.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-6 flex gap-3">
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
              href="https://wa.me/522211814454?text=Hola,%20me%20interesa%20implementar%20un%20men%C3%BA%20digital%20con%20QR%20en%20mi%20restaurante"
              aria-label="Hablar por WhatsApp"
              target="_blank"
            >
              Hablar por WhatsApp
            </a>
          </Button>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-3 text-[14px] font-normal text-muted-foreground"
        >
          Respuesta rápida por WhatsApp. Sin compromiso.
        </motion.p>
      </motion.section>
    </main>
  );
}
