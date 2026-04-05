"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

import OnboardingShell from "@/components/onboarding/OnboardingShell";
import { useOnboarding } from "@/components/onboarding/OnboardingProvider";

const FOOD_TYPES = [
  { id: "tacos",        emoji: "🌮", label: "Tacos" },
  { id: "pizzas",       emoji: "🍕", label: "Pizzas" },
  { id: "cafeteria",    emoji: "☕", label: "Cafetería" },
  { id: "sushi",        emoji: "🍣", label: "Sushi" },
  { id: "hamburguesas", emoji: "🍔", label: "Hamburguesas" },
  { id: "corrida",      emoji: "🥘", label: "Comida corrida" },
  { id: "postres",      emoji: "🍰", label: "Postres" },
  { id: "bar",          emoji: "🍺", label: "Bar" },
  { id: "china",        emoji: "🥡", label: "Comida china" },
  { id: "mariscos",     emoji: "🔥", label: "Mariscos" },
  { id: "parrilla",     emoji: "🥩", label: "Cortes / Parrilla" },
  { id: "otro",         emoji: "➕", label: "Otro" },
];

const PRIMARY      = "#00685f";
const PRIMARY_MID  = "#0D9488";
const CHIP_ACTIVE_BG = "#F0FDFA";
const SURFACE_LOW  = "#eef4ff";

export default function OnboardingStep2() {
  const router = useRouter();
  const { onboarding, setOnboarding } = useOnboarding();

  const [selected, setSelected] = useState(() => new Set(onboarding.foodTypes ?? []));

  // Guard: step 1 must be done
  useEffect(() => {
    if (!onboarding.businessName) router.replace("/onboarding");
  }, [onboarding.businessName, router]);

  function toggle(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function handleContinue() {
    setOnboarding((prev) => ({ ...prev, foodTypes: Array.from(selected) }));
    router.push("/onboarding/sections");
  }

  return (
    <OnboardingShell
      step={2}
      onBack={() => router.push("/onboarding")}
      onCta={handleContinue}
      ctaDisabled={selected.size === 0}
    >
      {/* Headline */}
      <div className="w-full mb-8">
        <h1 className="text-[24px] font-bold text-gray-900 leading-tight tracking-tight mb-2">
          ¿Qué tipo de comida ofreces?
        </h1>
        <p className="text-[15px] font-medium" style={{ color: "#3d4947" }}>
          Esto nos ayuda a organizar tu menú
        </p>
      </div>

      {/* 2-column chip grid */}
      <div className="w-full grid grid-cols-2 gap-3">
        {FOOD_TYPES.map(({ id, emoji, label }) => {
          const isActive = selected.has(id);
          return (
            <button
              key={id}
              type="button"
              onClick={() => toggle(id)}
              className="h-[52px] px-4 flex items-center rounded-xl transition-all duration-200 active:scale-[0.98]"
              style={{
                background: isActive ? CHIP_ACTIVE_BG : SURFACE_LOW,
                border: isActive ? `2px solid ${PRIMARY_MID}` : "2px solid transparent",
                justifyContent: isActive ? "space-between" : "flex-start",
                gap: isActive ? undefined : "12px",
              }}
              aria-pressed={isActive}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl leading-none">{emoji}</span>
                <span
                  className="text-sm leading-none"
                  style={{
                    fontWeight: isActive ? 600 : 500,
                    color: "#121c28",
                  }}
                >
                  {label}
                </span>
              </div>
              {isActive ? (
                <CheckCircle2
                  className="h-5 w-5 flex-shrink-0"
                  style={{ color: PRIMARY_MID, fill: PRIMARY_MID, stroke: "white" }}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Decorative bottom card */}
      <div
        className="mt-12 w-full rounded-2xl overflow-hidden relative h-48 flex items-center justify-center"
        style={{ background: SURFACE_LOW }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${PRIMARY}1A, transparent)` }}
        />
        <p
          className="relative z-10 text-sm font-medium leading-relaxed text-center max-w-[200px]"
          style={{ color: PRIMARY }}
        >
          Selecciona todas las que apliquen a tu establecimiento
        </p>
      </div>
    </OnboardingShell>
  );
}
