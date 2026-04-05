"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Store, Lightbulb } from "lucide-react";

import OnboardingShell, { TipCard } from "@/components/onboarding/OnboardingShell";
import { useOnboarding } from "@/components/onboarding/OnboardingProvider";
import { slugify } from "@/lib/slugify";

const MAX_NAME_LENGTH = 80;
const SURFACE_LOW = "#eef4ff";
const PRIMARY = "#00685f";

export default function OnboardingStep1() {
  const router = useRouter();
  const { setOnboarding } = useOnboarding();

  const [name, setName] = useState("");

  const slug = useMemo(
    () => (name.trim() ? slugify(name) : ""),
    [name]
  );

  const canContinue =
    name.trim().length >= 2 && name.trim().length <= MAX_NAME_LENGTH;

  function handleContinue() {
    if (!canContinue) return;
    setOnboarding((prev) => ({
      ...prev,
      businessName: name.trim(),
      businessSlug: slug,
    }));
    router.push("/onboarding/category");
  }

  return (
    <OnboardingShell
      step={1}
      onBack={() => router.push("/")}
      onCta={handleContinue}
      ctaDisabled={!canContinue}
    >
      {/* Hero emoji */}
      <div className="mb-10 flex flex-col items-center">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-sm"
          style={{
            background: SURFACE_LOW,
            border: "1px solid rgba(188,201,198,0.2)",
          }}
        >
          🍽️
        </div>
      </div>

      {/* Headline */}
      <div className="text-center mb-12 space-y-3 w-full">
        <h1 className="text-[24px] font-extrabold text-gray-900 tracking-tight leading-tight">
          ¿Cómo se llama tu negocio?
        </h1>
        <p className="text-[15px] text-gray-500 font-medium">
          Así aparecerá en tu menú digital
        </p>
      </div>

      {/* Input + tip */}
      <div className="w-full space-y-4">
        <div className="relative group">
          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleContinue()}
            maxLength={MAX_NAME_LENGTH}
            placeholder="Ej: Tacos Don Manuel"
            aria-label="Nombre de tu negocio"
            className="w-full h-14 px-6 pr-14 text-lg rounded-xl outline-none shadow-sm transition-all"
            style={{
              background: SURFACE_LOW,
              color: "#121c28",
              focusRing: "none",
            }}
            onFocus={(e) => (e.target.style.boxShadow = `0 0 0 3px ${PRIMARY}33`)}
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <Store
              className="h-5 w-5 transition-colors"
              style={{ color: name ? PRIMARY : `${PRIMARY}66` }}
            />
          </div>
        </div>

        {slug ? (
          <p className="text-sm text-gray-400 px-1">
            Tu URL:{" "}
            <span className="font-medium text-gray-600">/r/{slug}</span>
          </p>
        ) : null}

        <div className="mt-8">
          <TipCard
            icon={Lightbulb}
            title="Un buen nombre ayuda"
            body="Los nombres cortos y memorables facilitan que tus clientes compartan tu menú en redes sociales."
          />
        </div>
      </div>
    </OnboardingShell>
  );
}
