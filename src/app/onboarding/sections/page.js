"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Reorder, useDragControls } from "framer-motion";
import { GripVertical, X, Plus, BookOpen } from "lucide-react";

import OnboardingShell, { TipCard } from "@/components/onboarding/OnboardingShell";
import { useOnboarding } from "@/components/onboarding/OnboardingProvider";

const PRIMARY       = "#00685f";
const SURFACE_LOW   = "#eef4ff";
const OUTLINE       = "#6d7a77";
const ERROR         = "#ba1a1a";

// Default sections per food type — used to pre-populate
const FOOD_TYPE_SECTIONS = {
  tacos:        ["Tacos", "Bebidas", "Extras"],
  pizzas:       ["Pizzas", "Pastas", "Bebidas"],
  cafeteria:    ["Cafés", "Snacks", "Bebidas"],
  sushi:        ["Rollos", "Entradas", "Bebidas"],
  hamburguesas: ["Hamburguesas", "Papas", "Bebidas"],
  corrida:      ["Sopa", "Plato fuerte", "Bebidas"],
  postres:      ["Postres", "Cafés", "Bebidas"],
  bar:          ["Cocteles", "Cervezas", "Botanas"],
  china:        ["Entradas", "Platos fuertes", "Bebidas"],
  mariscos:     ["Mariscos", "Entradas", "Bebidas"],
  parrilla:     ["Cortes", "Guarniciones", "Bebidas"],
  otro:         ["Entradas", "Platos fuertes", "Bebidas"],
};

function buildDefaultSections(foodTypes) {
  if (!foodTypes?.length) return ["Sección 1", "Bebidas"];
  const first = foodTypes[0];
  return FOOD_TYPE_SECTIONS[first] ?? ["Entradas", "Platos fuertes", "Bebidas"];
}

// ─── Draggable row ────────────────────────────────────────────────────────────
function SectionRow({ value, onRemove }) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={value}
      dragListener={false}
      dragControls={controls}
      className="flex items-center justify-between h-12 px-4 rounded-[10px] bg-[#F9FAFB] hover:bg-[#eef4ff] transition-colors select-none"
      style={{ touchAction: "none" }}
    >
      {/* Drag handle */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          type="button"
          aria-label="Arrastrar"
          onPointerDown={(e) => controls.start(e)}
          className="cursor-grab active:cursor-grabbing flex-shrink-0 touch-none"
          style={{ color: OUTLINE }}
        >
          <GripVertical className="h-5 w-5" />
        </button>
        <span className="text-base font-medium text-gray-900 truncate">{value}</span>
      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={() => onRemove(value)}
        aria-label={`Eliminar ${value}`}
        className="flex-shrink-0 p-1 rounded-md transition-colors ml-2"
        style={{ color: OUTLINE }}
        onMouseEnter={(e) => (e.currentTarget.style.color = ERROR)}
        onMouseLeave={(e) => (e.currentTarget.style.color = OUTLINE)}
      >
        <X className="h-5 w-5" />
      </button>
    </Reorder.Item>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function OnboardingStep3() {
  const router = useRouter();
  const { onboarding, setOnboarding } = useOnboarding();

  const inputRef = useRef(null);
  const [draft, setDraft] = useState("");
  const [sections, setSections] = useState(() => {
    if (onboarding.sections?.length) return onboarding.sections;
    return buildDefaultSections(onboarding.foodTypes);
  });
  const [duplicateError, setDuplicateError] = useState(false);

  // Guard
  useEffect(() => {
    if (!onboarding.businessName) router.replace("/onboarding");
    else if (!onboarding.foodTypes?.length) router.replace("/onboarding/category");
  }, [onboarding.businessName, onboarding.foodTypes, router]);

  function addSection() {
    const name = draft.trim();
    if (!name) return;

    const isDuplicate = sections.some(
      (s) => s.toLowerCase() === name.toLowerCase()
    );
    if (isDuplicate) {
      setDuplicateError(true);
      setTimeout(() => setDuplicateError(false), 2000);
      return;
    }

    setSections((prev) => [...prev, name]);
    setDraft("");
    inputRef.current?.focus();
  }

  function removeSection(value) {
    setSections((prev) => prev.filter((s) => s !== value));
  }

  function handleContinue() {
    setOnboarding((prev) => ({ ...prev, sections }));
    router.push("/onboarding/dishes");
  }

  return (
    <OnboardingShell
      step={3}
      onBack={() => router.push("/onboarding/category")}
      onCta={handleContinue}
      ctaLabel="Continuar con estas secciones"
      ctaDisabled={sections.length === 0}
    >
      {/* Headline */}
      <div className="w-full mb-8">
        <h1 className="text-[24px] font-bold text-gray-900 leading-tight tracking-tight mb-2">
          ¿Qué secciones tiene tu menú?
        </h1>
        <p className="text-[15px] font-medium" style={{ color: "#3d4947" }}>
          Puedes cambiarlas después, no te preocupes
        </p>
      </div>

      {/* Reorderable section list */}
      <div className="w-full mb-4">
        <Reorder.Group
          axis="y"
          values={sections}
          onReorder={setSections}
          className="space-y-3"
        >
          {sections.map((section) => (
            <SectionRow
              key={section}
              value={section}
              onRemove={removeSection}
            />
          ))}
        </Reorder.Group>
      </div>

      {/* Add section input */}
      <div className="w-full relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Plus className="h-5 w-5" style={{ color: PRIMARY }} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") { e.preventDefault(); addSection(); }
          }}
          placeholder="Agregar otra sección"
          aria-label="Nueva sección"
          className="w-full h-12 pl-12 pr-4 rounded-[10px] text-base outline-none transition-all"
          style={{
            background: SURFACE_LOW,
            color: "#121c28",
          }}
          onFocus={(e) => (e.target.style.boxShadow = `0 0 0 2px ${PRIMARY}66`)}
          onBlur={(e) => (e.target.style.boxShadow = "none")}
        />
        {/* Inline duplicate error */}
        {duplicateError ? (
          <p
            className="absolute -bottom-5 left-4 text-xs font-medium"
            style={{ color: ERROR }}
          >
            Esa sección ya existe
          </p>
        ) : null}
      </div>

      {/* Tip card */}
      <div className="mt-14 w-full">
        <TipCard
          icon={BookOpen}
          title="Consejo de Arquitecto"
          body="Organizar tu menú por categorías cortas ayuda a tus clientes a decidir un 20% más rápido."
        />
      </div>
    </OnboardingShell>
  );
}
