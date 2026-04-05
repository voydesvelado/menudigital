"use client";

import { useMemo, useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";

import OnboardingShell from "@/components/onboarding/OnboardingShell";
import { useOnboarding } from "@/components/onboarding/OnboardingProvider";
import { slugify } from "@/lib/slugify";

import RestaurantHeader from "@/components/menu/RestaurantHeader";
import SearchBar from "@/components/menu/SearchBar";
import CategoryChips from "@/components/menu/CategoryChips";
import MenuSection from "@/components/menu/MenuSection";

const PRIMARY = "#00685f";

/** Convert onboarding dishes/sections into the shape menu components expect */
function buildCategories(sections, dishes) {
  return sections
    .map((sectionName) => {
      const items = (dishes[sectionName] ?? []).map((d) => ({
        id: d.id,
        title: d.name,
        price: d.price,
        description: d.description,
      }));
      return {
        id: slugify(sectionName) || sectionName,
        title: sectionName,
        items,
      };
    })
    .filter((c) => c.items.length > 0);
}

export default function OnboardingStep5() {
  const router = useRouter();
  const { onboarding, setOnboarding } = useOnboarding();

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Guards
  useEffect(() => {
    if (!onboarding.businessName)      { router.replace("/onboarding"); return; }
    if (!onboarding.foodTypes?.length) { router.replace("/onboarding/category"); return; }
    if (!onboarding.sections?.length)  { router.replace("/onboarding/sections"); return; }
  }, [onboarding.businessName, onboarding.foodTypes, onboarding.sections, router]);

  const categories = useMemo(
    () => buildCategories(onboarding.sections ?? [], onboarding.dishes ?? {}),
    [onboarding.sections, onboarding.dishes]
  );

  const chipCategories = useMemo(() => [
    { id: "all", label: "Todo" },
    ...categories.map((c) => ({ id: c.id, label: c.title })),
  ], [categories]);

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories
      .filter((cat) => activeCategory === "all" || cat.id === activeCategory)
      .map((cat) => ({
        ...cat,
        items: q
          ? cat.items.filter((it) =>
              `${it.title} ${it.description}`.toLowerCase().includes(q)
            )
          : cat.items,
      }))
      .filter((cat) => cat.items.length > 0);
  }, [categories, query, activeCategory]);

  const totalDishes = useMemo(
    () => categories.reduce((sum, c) => sum + c.items.length, 0),
    [categories]
  );

  async function handlePublish() {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        restaurant: {
          name: onboarding.businessName,
          slug: onboarding.businessSlug,
          currency: "MXN",
        },
        menu: {
          name: "Menú principal",
          isPublished: true,
        },
        categories: (onboarding.sections ?? []).map((sectionName, idx) => ({
          name: sectionName,
          sortOrder: idx,
          items: (onboarding.dishes?.[sectionName] ?? []).map((d) => ({
            name: d.name,
            description: d.description || "",
            price: parseFloat(d.price),
          })),
        })),
      };

      if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error("API URL no configurada. Contacta al soporte.");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/create-menu`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || data?.message || "No se pudo crear el menú.");
      }

      if (!data?.slug || typeof data.slug !== "string") {
        throw new Error("Respuesta inesperada del servidor. Intenta de nuevo.");
      }

      const name = encodeURIComponent(onboarding.businessName);
      setOnboarding({
        businessName: "",
        businessSlug: "",
        foodTypes: [],
        sections: [],
        dishes: {},
        csvFile: null,
        logoFile: null,
        parsedMenu: null,
      });

      router.push(`/onboarding/done?slug=${data.slug}&name=${name}`);
    } catch (e) {
      setSubmitError(e.message || "Error inesperado al finalizar.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <OnboardingShell
      step={5}
      onBack={() => router.push("/onboarding/dishes")}
      onCta={handlePublish}
      ctaLabel="Publicar menú"
      ctaLoading={isSubmitting}
      contentClassName="pt-8"
    >
      {/* Header */}
      <div className="w-full mb-4 space-y-3">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5" style={{ color: PRIMARY }} />
          <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
            Vista previa
          </h1>
        </div>

        {totalDishes === 0 ? (
          <p className="text-sm text-gray-400">
            Aún no has agregado platillos.{" "}
            <button
              type="button"
              onClick={() => router.push("/onboarding/dishes")}
              className="font-medium underline"
              style={{ color: PRIMARY }}
            >
              Agregar platillos
            </button>
          </p>
        ) : (
          <p className="text-sm text-gray-400">
            {totalDishes} {totalDishes === 1 ? "platillo" : "platillos"} en{" "}
            {categories.length} {categories.length === 1 ? "sección" : "secciones"}
          </p>
        )}

        {submitError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3">
            <p className="text-sm font-semibold text-red-700">No se pudo publicar</p>
            <p className="text-sm text-red-600 mt-1">{submitError}</p>
          </div>
        ) : null}
      </div>

      {/* Menu preview — bleed to screen edges */}
      {categories.length > 0 ? (
        <div className="w-full -mx-6 min-w-[calc(100%+3rem)]">
          <div
            className="sticky top-0 z-40 border-b"
            style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)" }}
          >
            <RestaurantHeader name={onboarding.businessName} />
            <div className="px-6">
              <SearchBar value={query} onChange={setQuery} placeholder="Buscar en el menú" />
            </div>
            <div className="px-6 pb-1">
              <CategoryChips
                categories={chipCategories}
                activeId={activeCategory}
                onSelect={setActiveCategory}
              />
            </div>
          </div>

          <div className="pb-4">
            {filteredCategories.map((category) => (
              <MenuSection key={category.id} title={category.title} items={category.items} />
            ))}
          </div>
        </div>
      ) : null}
    </OnboardingShell>
  );
}
