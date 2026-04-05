"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  UtensilsCrossed,
  XCircle,
  CheckCircle2,
  Check,
  Star,
  PlusCircle,
  ArrowRight,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const PRODUCT_NAME = "Lumo";
const CTA_HREF     = "/onboarding";

const PRIMARY      = "#00685f";
const PRIMARY_DARK = "#008378";
const SURFACE      = "#f8f9ff";
const SURFACE_LOW  = "#eef4ff";
const ON_SURFACE   = "#121c28";
const ON_SURFACE_V = "#3d4947";

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
      }}
    >
      {children}
    </div>
  );
}

// ─── Stars ────────────────────────────────────────────────────────────────────
function Stars() {
  return (
    <div className="flex gap-1" style={{ color: PRIMARY }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-current" />
      ))}
    </div>
  );
}

// ─── Hero Menu Card (Hero) ────────────────────────────────────────────────────
const HERO_TABS = ["Tacos", "Bebidas", "Extras"];
const HERO_ITEMS = [
  {
    name: "Tacos al Pastor",
    desc: "Piña, cebolla y cilantro recién picado.",
    price: "$110",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDE4vJsw406LE13PrywNjRZmEwIGzolfPjPZvB1YIZSqlJlOhGwK0tCdGh8oMsiThuKjtAGBH9MzFHCYfMGuQzaEOjPvtTuRqMP9sQPqb9h636g6MkpLX-MLwMFzwiNl8fbjBpWNLDVCFJaBcZFbyEKJkY3KpUl49sAEY0nLSr0NnLhdzAmI_fYg15zFiG9SQjypbpCW0AzTvhAXYx0zDiGC69zPp3APou3QujOIFREYbXuQPK7cbjfchcO4rH3p5bvokic32UhdA",
  },
  {
    name: "Gringa de Queso",
    desc: "Tortilla de harina con queso fundido.",
    price: "$95",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmu7e6wDOgRES9K8IEqHGGmPk44Dypd5NXlFGQm73qoMenWLKk4hZ07FGDeNnbil2YBQtO1_dJNATm2bWnpOmSU4LE4tkwudoOOIj31WohGJBfoLMhLRoKmCtbT_SRa--3TK70SuGR852hsdZK7h3kWbReFpmpbwrXUFulrpaNhEx4ZeS8n3o3q4744f1Hx5UqsieS8t4iQIUOACkvDBkWIWZ4AbFfIAIOKH6S_8nIF7uhNdrA9VyaKhPUe1V65oEgwFnTgLrZ1A",
  },
];

function HeroMenuCard() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="max-w-md mx-auto">
      <div
        className="rounded-3xl shadow-xl overflow-hidden border"
        style={{ borderColor: "rgba(61,73,71,0.1)", background: "#fff" }}
      >
        {/* Restaurant header */}
        <div className="p-6" style={{ background: PRIMARY, color: "#fff" }}>
          <h3 className="text-xl font-bold mb-1">Taquería El Fogón</h3>
          <p className="text-xs opacity-80">El sabor auténtico de México</p>
        </div>

        {/* Tabs */}
        <div
          className="flex border-b px-4"
          style={{ borderColor: "rgba(61,73,71,0.1)" }}
        >
          {HERO_TABS.map((tab, i) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(i)}
              className="px-4 py-3 text-sm border-b-2 transition-colors"
              style={{
                borderColor: activeTab === i ? PRIMARY : "transparent",
                color: activeTab === i ? PRIMARY : "#3d4947",
                fontWeight: activeTab === i ? 700 : 500,
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="p-4 space-y-4">
          {HERO_ITEMS.map((item) => (
            <div key={item.name} className="flex gap-4 items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.img}
                alt={item.name}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold" style={{ color: "#121c28" }}>{item.name}</h4>
                <p className="text-xs truncate" style={{ color: "#3d4947" }}>{item.desc}</p>
                <span className="text-sm font-bold mt-1 block" style={{ color: PRIMARY }}>{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-sm text-center mt-4" style={{ color: "#3d4947" }}>
        Menú de ejemplo · El tuyo se verá igual de profesional
      </p>

      <div className="flex justify-center mt-6">
        <a
          href="/r/fogon"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 font-bold text-sm transition-colors hover:opacity-80"
          style={{ borderColor: PRIMARY, color: PRIMARY }}
        >
          Ver ejemplo en vivo
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// ─── Demo Menu Mockup (Section 4) ────────────────────────────────────────────
function DemoMockup() {
  return (
    <div
      className="rounded-3xl shadow-xl overflow-hidden border"
      style={{ borderColor: `${ON_SURFACE_V}1A`, background: "#fff" }}
    >
      {/* Header */}
      <div className="p-6" style={{ background: PRIMARY, color: "#fff" }}>
        <h3 className="text-xl font-bold mb-1">Taquería El Fogón</h3>
        <p className="text-xs opacity-80">El sabor auténtico de México</p>
      </div>

      {/* Tabs */}
      <div
        className="flex border-b px-4"
        style={{ borderColor: `${ON_SURFACE_V}1A` }}
      >
        {["Tacos", "Bebidas", "Extras"].map((tab, i) => (
          <button
            key={tab}
            type="button"
            className="px-4 py-3 text-sm font-medium border-b-2 transition-colors"
            style={{
              borderColor: i === 0 ? PRIMARY : "transparent",
              color: i === 0 ? PRIMARY : ON_SURFACE_V,
              fontWeight: i === 0 ? 700 : 500,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="p-4 space-y-4">
        {[
          {
            name: "Tacos al Pastor",
            desc: "Piña, cebolla y cilantro recién picado.",
            price: "$110",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDE4vJsw406LE13PrywNjRZmEwIGzolfPjPZvB1YIZSqlJlOhGwK0tCdGh8oMsiThuKjtAGBH9MzFHCYfMGuQzaEOjPvtTuRqMP9sQPqb9h636g6MkpLX-MLwMFzwiNl8fbjBpWNLDVCFJaBcZFbyEKJkY3KpUl49sAEY0nLSr0NnLhdzAmI_fYg15zFiG9SQjypbpCW0AzTvhAXYx0zDiGC69zPp3APou3QujOIFREYbXuQPK7cbjfchcO4rH3p5bvokic32UhdA",
          },
          {
            name: "Gringa de Queso",
            desc: "Tortilla de harina con queso fundido.",
            price: "$95",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmu7e6wDOgRES9K8IEqHGGmPk44Dypd5NXlFGQm73qoMenWLKk4hZ07FGDeNnbil2YBQtO1_dJNATm2bWnpOmSU4LE4tkwudoOOIj31WohGJBfoLMhLRoKmCtbT_SRa--3TK70SuGR852hsdZK7h3kWbReFpmpbwrXUFulrpaNhEx4ZeS8n3o3q4744f1Hx5UqsieS8t4iQIUOACkvDBkWIWZ4AbFfIAIOKH6S_8nIF7uhNdrA9VyaKhPUe1V65oEgwFnTgLrZ1A",
          },
        ].map((item) => (
          <div key={item.name} className="flex gap-4 items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.img}
              alt={item.name}
              className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold" style={{ color: ON_SURFACE }}>{item.name}</h4>
              <p className="text-xs truncate" style={{ color: ON_SURFACE_V }}>{item.desc}</p>
              <span className="text-sm font-bold mt-1 block" style={{ color: PRIMARY }}>{item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CTA Button ───────────────────────────────────────────────────────────────
function CtaButton({ children, className = "", style = {} }) {
  return (
    <Link
      href={CTA_HREF}
      className={`flex items-center justify-center font-bold text-white rounded-xl active:scale-95 transition-all duration-150 shadow-lg ${className}`}
      style={{
        background: `linear-gradient(to bottom, ${PRIMARY}, ${PRIMARY_DARK})`,
        height: 56,
        ...style,
      }}
    >
      {children}
    </Link>
  );
}

// ─── Section 1: Hero ─────────────────────────────────────────────────────────
function HeroSection({ heroCTARef }) {
  return (
    <section
      className="px-6 py-16 flex flex-col items-center text-center"
      style={{ background: SURFACE }}
    >
      <FadeIn>
        <h1
          className="font-extrabold tracking-tighter leading-tight mb-4"
          style={{ fontSize: "clamp(2rem, 8vw, 3rem)", color: ON_SURFACE }}
        >
          Tu menú digital listo<br />en 5 minutos
        </h1>
      </FadeIn>

      <FadeIn delay={80}>
        <p
          className="text-lg mb-8 max-w-md mx-auto leading-relaxed"
          style={{ color: ON_SURFACE_V }}
        >
          Tus clientes escanean el QR y ven tu menú en su celular de forma rápida, moderna y profesional.
        </p>
      </FadeIn>

      <FadeIn delay={160} className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto">
        <div ref={heroCTARef} className="w-full">
          <CtaButton className="w-full text-lg">
            Crear mi menú gratis
          </CtaButton>
        </div>
        <p className="text-xs font-medium" style={{ color: ON_SURFACE_V }}>
          Gratis para siempre · No necesitas tarjeta · Listo en 5 minutos
        </p>
      </FadeIn>

      <FadeIn delay={240} className="mt-16 w-full">
        <HeroMenuCard />
      </FadeIn>
    </section>
  );
}

// ─── Section 2: Problem ───────────────────────────────────────────────────────
function ProblemSection() {
  return (
    <section className="px-6 py-16" style={{ background: SURFACE_LOW }}>
      <FadeIn>
        <h2
          className="text-2xl font-bold tracking-tight text-center mb-2"
          style={{ color: ON_SURFACE }}
        >
          ¿Tu menú QR abre un PDF?
        </h2>
        <p className="text-base text-center mb-12" style={{ color: ON_SURFACE_V }}>
          Eso es lo que ven tus clientes:
        </p>
      </FadeIn>

      <div className="grid gap-6 max-w-md mx-auto">
        {/* Bad */}
        <FadeIn delay={80}>
          <div
            className="bg-white p-6 rounded-xl"
            style={{ border: "1px solid #FEE2E2" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="h-6 w-6 flex-shrink-0" style={{ color: "#ba1a1a" }} />
              <span className="font-bold" style={{ color: ON_SURFACE }}>La experiencia PDF</span>
            </div>
            <ul className="space-y-3 text-sm" style={{ color: ON_SURFACE_V }}>
              {[
                "Se ve diminuto en el celular",
                "Imposible de leer sin hacer zoom",
                "No puedes cambiar precios fácil",
                "Se siente anticuado",
              ].map((t) => (
                <li key={t}>✕ {t}</li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {/* Good */}
        <FadeIn delay={160}>
          <div
            className="bg-white p-6 rounded-xl"
            style={{ border: "2px solid #D1FAE5" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="h-6 w-6 flex-shrink-0" style={{ color: PRIMARY }} />
              <span className="font-bold" style={{ color: ON_SURFACE }}>{PRODUCT_NAME}</span>
            </div>
            <ul className="space-y-3 text-sm" style={{ color: ON_SURFACE_V }}>
              {[
                "Se adapta perfecto al celular",
                "Bonito, rápido, profesional",
                "Cambias precios en segundos",
                "Tus clientes quedan impresionados",
              ].map((t, i) => (
                <li key={t} style={{ color: i === 0 ? PRIMARY : undefined, fontWeight: i === 0 ? 600 : undefined }}>
                  ✓ {t}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Section 3: How it Works ──────────────────────────────────────────────────
const STEPS = [
  {
    title: "Pon el nombre de tu negocio",
    desc: "Solo necesitas el nombre y qué tipo de comida ofreces.",
  },
  {
    title: "Agrega tus platillos y precios",
    desc: "Escríbelos uno por uno o sube una foto de tu menú actual y lo llenamos por ti.",
  },
  {
    title: "Comparte tu QR",
    desc: "Te damos un link y un código QR listo para imprimir. Tus clientes lo escanean y ven tu menú al instante.",
  },
];

function HowItWorksSection() {
  return (
    <section className="px-6 py-16" style={{ background: "#fff" }}>
      <FadeIn>
        <h2
          className="text-2xl font-bold tracking-tight text-center mb-16"
          style={{ color: ON_SURFACE }}
        >
          Así de fácil es crear tu menú
        </h2>
      </FadeIn>

      <div className="relative max-w-xs mx-auto">
        {/* Dotted vertical line */}
        <div
          className="absolute left-6 top-8 bottom-8 w-px border-l-2 border-dashed"
          style={{ borderColor: `${PRIMARY}4D` }}
          aria-hidden
        />

        {STEPS.map((step, i) => (
          <FadeIn key={step.title} delay={i * 100}>
            <div className={`relative flex items-start gap-6 ${i < STEPS.length - 1 ? "mb-16" : ""}`}>
              <div
                className="z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg"
                style={{ background: PRIMARY, color: "#fff" }}
              >
                {i + 1}
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2" style={{ color: ON_SURFACE }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: ON_SURFACE_V }}>
                  {step.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={300} className="flex justify-center mt-16">
        <CtaButton className="px-10 text-base">
          Crear mi menú gratis
        </CtaButton>
      </FadeIn>
    </section>
  );
}

// ─── Section 4: Demo ─────────────────────────────────────────────────────────
function DemoSection() {
  return (
    <section className="px-6 py-16 overflow-hidden" style={{ background: SURFACE_LOW }}>
      <FadeIn>
        <h2
          className="text-2xl font-bold tracking-tight text-center mb-12"
          style={{ color: ON_SURFACE }}
        >
          Así se ve tu menú
        </h2>
      </FadeIn>

      <FadeIn delay={80} className="max-w-md mx-auto">
        <DemoMockup />
        <p className="text-sm text-center mt-4" style={{ color: ON_SURFACE_V }}>
          Menú de ejemplo · El tuyo se verá igual de profesional
        </p>
        <div className="flex justify-center mt-6">
          <Link
            href="/r/fogon"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 font-bold text-sm transition-colors hover:opacity-80"
            style={{ borderColor: PRIMARY, color: PRIMARY }}
          >
            Ver ejemplo en vivo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}

// ─── Section 5: Social Proof ──────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "Cambié mi PDF por esto y mis ventas de extras subieron un 20%. Los clientes aman las fotos.",
    name: "Mario G.",
    place: "La Pizzería",
  },
  {
    quote: "Es increíblemente fácil de usar. Lo configuré en una mañana libre y ya está en todas las mesas.",
    name: "Sofía R.",
    place: "Café Central",
  },
  {
    quote: "Mis clientes siempre se quejaban del PDF. Ahora escanean y ven todo perfecto. Lo hice en 10 minutos.",
    name: "María González",
    place: "Fonda La Lupita, Puebla",
  },
];

const STATS = [
  { value: "+500", label: "menús creados" },
  { value: "+200", label: "restaurantes" },
  { value: "4.9",  label: "estrellas" },
];

function SocialProofSection() {
  return (
    <section className="py-16" style={{ background: "#fff" }}>
      <FadeIn>
        <h2
          className="text-2xl font-bold tracking-tight text-center mb-12 px-6"
          style={{ color: ON_SURFACE }}
        >
          Restaurantes que ya usan {PRODUCT_NAME}
        </h2>
      </FadeIn>

      {/* Stats */}
      <FadeIn delay={80}>
        <div className="px-6 mb-12 flex flex-wrap justify-center gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <span
                className="block text-3xl font-black"
                style={{ color: PRIMARY }}
              >
                {s.value}
              </span>
              <span
                className="text-xs uppercase tracking-widest font-bold"
                style={{ color: ON_SURFACE_V }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Testimonials — horizontal scroll with snap */}
      <div
        className="flex overflow-x-auto gap-4 px-6 pb-2"
        style={{ scrollbarWidth: "none", scrollSnapType: "x mandatory" }}
      >
        {TESTIMONIALS.map((t, i) => (
          <FadeIn
            key={t.name}
            delay={i * 80}
            className="min-w-[280px] flex-shrink-0"
            style={{ scrollSnapAlign: "center" }}
          >
            <div
              className="h-full p-6 rounded-2xl border"
              style={{ background: SURFACE_LOW, borderColor: "transparent" }}
            >
              <Stars />
              <p
                className="italic text-sm my-4 leading-relaxed"
                style={{ color: ON_SURFACE }}
              >
                "{t.quote}"
              </p>
              <p className="font-bold text-xs" style={{ color: ON_SURFACE }}>
                — {t.name}
              </p>
              <p className="text-xs mt-0.5" style={{ color: ON_SURFACE_V }}>
                {t.place}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ─── Section 6: Pricing ───────────────────────────────────────────────────────
const FREE_FEATURES = [
  "Menú digital completo",
  "QR code para imprimir",
  "Edita cuando quieras",
  "Platillos ilimitados",
];

const PRO_FEATURES = [
  "Todo lo del plan Gratis",
  "Fotos con inteligencia artificial",
  "Dominio personalizado",
  "Analytics de visitas",
  "Soporte prioritario",
];

function PricingSection() {
  return (
    <section className="px-6 py-16" style={{ background: SURFACE_LOW }}>
      <FadeIn>
        <h2
          className="text-2xl font-bold tracking-tight text-center mb-12"
          style={{ color: ON_SURFACE }}
        >
          Simple y sin sorpresas
        </h2>
      </FadeIn>

      <div className="grid gap-8 max-w-sm mx-auto">
        {/* Free */}
        <FadeIn delay={80}>
          <div
            className="bg-white p-8 rounded-2xl"
            style={{ border: "1px solid #E5E7EB" }}
          >
            <p className="text-sm font-semibold mb-2" style={{ color: PRIMARY }}>
              Gratis para siempre
            </p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-black" style={{ color: ON_SURFACE }}>$0</span>
              <span className="text-sm" style={{ color: ON_SURFACE_V }}>/mes</span>
            </div>
            <ul className="space-y-3 mb-8">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm" style={{ color: ON_SURFACE_V }}>
                  <Check className="h-4 w-4 flex-shrink-0" style={{ color: PRIMARY }} />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={CTA_HREF}
              className="flex items-center justify-center w-full py-3 rounded-xl border-2 font-bold text-sm transition-colors hover:opacity-80"
              style={{ borderColor: PRIMARY, color: PRIMARY }}
            >
              Empezar gratis
            </Link>
          </div>
        </FadeIn>

        {/* Pro */}
        <FadeIn delay={160}>
          <div
            className="p-8 rounded-2xl relative shadow-xl"
            style={{
              background: PRIMARY,
              color: "#fff",
              border: `2px solid ${PRIMARY}`,
            }}
          >
            {/* Popular badge */}
            <div
              className="absolute -top-4 left-1/2 -translate-x-1/2 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full"
              style={{ background: "#773215" }}
            >
              Popular
            </div>
            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-black">$149</span>
              <span className="text-sm opacity-70">MXN/mes</span>
            </div>
            <ul className="space-y-3 mb-8 opacity-90">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-white">
                  <Check className="h-4 w-4 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={CTA_HREF}
              className="flex items-center justify-center w-full py-3 rounded-xl font-bold text-sm shadow-lg transition-all hover:opacity-90 active:scale-95"
              style={{ background: "#fff", color: PRIMARY }}
            >
              Probar Pro gratis 14 días
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={240}>
          <p className="text-center text-sm" style={{ color: ON_SURFACE_V }}>
            ¿Tienes más de 3 sucursales?{" "}
            <a
              href="https://wa.me/?text=Hola%2C%20quiero%20info%20sobre%20el%20plan%20empresarial"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline"
              style={{ color: PRIMARY }}
            >
              Escríbenos por WhatsApp
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Section 7: Final CTA ─────────────────────────────────────────────────────
function FinalCTASection() {
  return (
    <section
      className="px-6 py-20 text-center"
      style={{ background: PRIMARY }}
    >
      <FadeIn>
        <h2 className="text-3xl font-extrabold text-white tracking-tighter leading-tight mb-4">
          Tu menú digital en 5 minutos
        </h2>
        <p className="text-base mb-8 mx-auto max-w-xs" style={{ color: "rgba(255,255,255,0.9)" }}>
          Sin tarjeta, sin contratos, sin complicaciones.
        </p>
      </FadeIn>

      <FadeIn delay={80} className="flex flex-col items-center gap-4">
        <Link
          href={CTA_HREF}
          className="flex items-center justify-center font-bold text-lg rounded-xl active:scale-95 transition-all duration-150 shadow-2xl w-full max-w-xs"
          style={{
            background: "#fff",
            color: PRIMARY,
            height: 56,
          }}
        >
          Crear mi menú gratis ahora
        </Link>
        <a
          href="https://wa.me/?text=Hola%2C%20tengo%20dudas%20sobre%20el%20men%C3%BA%20digital"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white underline"
          style={{ opacity: 0.9 }}
        >
          ¿Dudas? Escríbenos por WhatsApp →
        </a>
      </FadeIn>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="w-full py-12 px-8 flex flex-col items-center gap-6"
      style={{ background: SURFACE_LOW }}
    >
      <div className="flex items-center gap-2">
        <UtensilsCrossed className="h-5 w-5" style={{ color: PRIMARY }} />
        <span className="text-base font-bold" style={{ color: ON_SURFACE }}>
          {PRODUCT_NAME}
        </span>
      </div>
      <div className="flex gap-6 text-sm" style={{ color: ON_SURFACE_V }}>
        {["Privacidad", "Términos", "Contacto"].map((link) => (
          <a key={link} href="#" className="hover:underline transition-colors">
            {link}
          </a>
        ))}
      </div>
      <p className="text-xs text-center" style={{ color: ON_SURFACE_V }}>
        © 2026 {PRODUCT_NAME}. Hecho en México 🇲🇽
      </p>
    </footer>
  );
}

// ─── Sticky Bottom CTA ────────────────────────────────────────────────────────
function StickyBottomCTA({ visible }) {
  return (
    <nav
      className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-4 pb-4 md:hidden"
      style={{
        background: `${SURFACE}CC`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 -4px 24px rgba(0,104,95,0.08)",
        transition: "transform 0.3s ease, opacity 0.3s ease",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
      aria-hidden={!visible}
    >
      <Link
        href={CTA_HREF}
        tabIndex={visible ? 0 : -1}
        className="flex flex-col items-center justify-center text-white rounded-xl px-6 py-3 mx-2 mb-2 hover:scale-105 transition-transform active:scale-95"
        style={{ background: `linear-gradient(to bottom, ${PRIMARY}, ${PRIMARY_DARK})` }}
      >
        <PlusCircle className="h-5 w-5 mb-1" />
        <span className="text-[10px] font-bold uppercase tracking-wider">
          Crear mi menú gratis
        </span>
      </Link>
    </nav>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const heroCTARef  = useRef(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const el = heroCTARef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="antialiased" style={{ background: SURFACE }}>
      {/* ── Navbar ─────────────────────────────────────────────── */}
      <header
        className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4"
        style={{ background: `${SURFACE}E6`, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
      >
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-5 w-5" style={{ color: PRIMARY }} />
          <span className="text-lg font-black tracking-tighter" style={{ color: ON_SURFACE }}>
            {PRODUCT_NAME}
          </span>
        </div>
        <Link
          href="/login"
          className="text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: ON_SURFACE_V }}
        >
          Iniciar sesión
        </Link>
      </header>

      {/* ── Sections ───────────────────────────────────────────── */}
      <main className="pt-[72px]">
        <HeroSection heroCTARef={heroCTARef} />
        <ProblemSection />
        <HowItWorksSection />
        <DemoSection />
        <SocialProofSection />
        <PricingSection />
        <FinalCTASection />
        <Footer />
        {/* Spacer so content doesn't hide behind sticky nav on mobile */}
        <div className="h-24 md:hidden" aria-hidden />
      </main>

      <StickyBottomCTA visible={showSticky} />
    </div>
  );
}
