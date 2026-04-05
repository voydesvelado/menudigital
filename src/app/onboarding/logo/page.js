"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ImagePlus } from "lucide-react";

import OnboardingShell, { TipCard } from "@/components/onboarding/OnboardingShell";
import { useOnboarding } from "@/components/onboarding/OnboardingProvider";

const PRIMARY = "#00685f";
const SURFACE_LOW = "#eef4ff";

export default function OnboardingStep3() {
  const router = useRouter();
  const { onboarding } = useOnboarding();

  // Guard: must have completed prior steps
  useEffect(() => {
    if (!onboarding.businessName) router.replace("/onboarding");
    else if (!onboarding.foodTypes?.length) router.replace("/onboarding/category");
    else if (!onboarding.sections?.length) router.replace("/onboarding/sections");
  }, [onboarding.businessName, onboarding.foodTypes, onboarding.sections, router]);

  function handleContinue() {
    router.push("/onboarding/preview");
  }

  return (
    <OnboardingShell
      step={4}
      onBack={() => router.push("/onboarding/sections")}
      onCta={handleContinue}
      ctaLabel="Continuar sin logo"
    >
      {/* Hero emoji */}
      <div className="mb-10 flex flex-col items-center">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-sm"
          style={{ background: SURFACE_LOW, border: "1px solid rgba(188,201,198,0.2)" }}
        >
          🎨
        </div>
      </div>

      {/* Headline */}
      <div className="text-center mb-10 space-y-3 w-full">
        <h1 className="text-[24px] font-extrabold text-gray-900 tracking-tight leading-tight">
          Agregar logo
        </h1>
        <p className="text-[15px] text-gray-500 font-medium">
          Aparecerá en la parte superior de tu menú
        </p>
      </div>

      <div className="w-full space-y-4">
        {/* Upload zone — coming soon */}
        <div
          className="flex flex-col items-center justify-center w-full h-44 rounded-xl border-2 border-dashed"
          style={{ borderColor: "#bcc9c6", background: "transparent" }}
        >
          <ImagePlus className="h-9 w-9 mb-3 text-gray-300" />
          <p className="text-sm font-semibold text-gray-400">
            Próximamente disponible
          </p>
          <p className="text-xs mt-1 text-gray-300">
            Por ahora puedes continuar sin logo
          </p>
        </div>

        <TipCard
          icon={Sparkles}
          title="Opcional pero poderoso"
          body="Los menús con logo tienen un 40% más de interacciones. Podrás agregar tu logo desde el panel de administración."
        />
      </div>
    </OnboardingShell>
  );
}
