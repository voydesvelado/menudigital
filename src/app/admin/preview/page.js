"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Papa from "papaparse";

import { Button } from "@/components/ui/button";
import { useWizard } from "@/components/admin/WizardProvider";
import { slugify } from "@/lib/slugify";

import RestaurantHeader from "@/components/menu/RestaurantHeader";
import SearchBar from "@/components/menu/SearchBar";
import CategoryChips from "@/components/menu/CategoryChips";
import MenuSection from "@/components/menu/MenuSection";

function normalizeHeader(h) {
  return String(h || "")
    .trim()
    .toLowerCase();
}

export default function AdminPreviewPage() {
  const router = useRouter();
  const { wizard, setWizard } = useWizard();

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [parsedCategories, setParsedCategories] = useState([]);
  const [skippedRows, setSkippedRows] = useState(0);
  const [error, setError] = useState("");
  const [isParsing, setIsParsing] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Guard rails
  useEffect(() => {
    if (!wizard.restaurantName) router.replace("/admin");
    if (!wizard.csvFile) router.replace("/admin/menu");
  }, [wizard.restaurantName, wizard.csvFile, router]);

  // Parse CSV on mount (or when file changes)
  useEffect(() => {
    async function parseCsv() {
      if (!wizard.csvFile) return;

      setIsParsing(true);
      setError("");

      try {
        if (wizard.csvFile.size > 5 * 1024 * 1024) {
          throw new Error(
            "El archivo es demasiado grande. El máximo es 5 MB."
          );
        }

        const csvText = await wizard.csvFile.text();

        const result = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (h) => normalizeHeader(h),
        });

        if (result.errors?.length) {
          const first = result.errors[0];
          throw new Error(
            `Error en CSV (fila ${first.row ?? "?"}): ${first.message}`
          );
        }

        const rows = (result.data || []).filter(Boolean);

        if (rows.length === 0) {
          throw new Error(
            "Tu CSV está vacío. Descarga la plantilla y vuelve a intentar."
          );
        }

        const required = ["category", "item", "price", "description"];
        const missing = required.filter((k) => !(k in (rows[0] || {})));
        if (missing.length) {
          throw new Error(
            `Faltan columnas requeridas: ${missing.join(", ")}. Usa la plantilla CSV.`
          );
        }

        const categoriesMap = new Map();
        let skipped = 0;

        rows.forEach((r, idx) => {
          const categoryTitle = String(r.category || "").trim();
          const itemTitle = String(r.item || "").trim();
          const description = String(r.description || "").trim();

          const priceRaw = String(r.price || "")
            .trim()
            .replace(/\$/g, "");
          const price = parseFloat(priceRaw);

          if (
            !categoryTitle ||
            !itemTitle ||
            Number.isNaN(price) ||
            price < 0 ||
            !Number.isFinite(price)
          ) {
            skipped++;
            return;
          }

          const categoryId = slugify(categoryTitle) || `cat-${idx}`;

          if (!categoriesMap.has(categoryId)) {
            categoriesMap.set(categoryId, {
              id: categoryId,
              title: categoryTitle,
              items: [],
            });
          }

          const cat = categoriesMap.get(categoryId);
          cat.items.push({
            id: `${categoryId}-${cat.items.length + 1}`,
            title: itemTitle,
            price: parseFloat(price.toFixed(2)),
            description,
          });
        });

        setSkippedRows(skipped);

        const categories = Array.from(categoriesMap.values()).filter(
          (c) => c.items.length > 0
        );

        if (!categories.length) {
          throw new Error(
            "No se detectaron platillos válidos. Revisa que category, item y price estén llenos."
          );
        }

        setParsedCategories(categories);

        // Guardar en wizard por si luego finalizas
        setWizard((prev) => ({
          ...prev,
          parsedMenu: { categories },
        }));
      } catch (e) {
        setError(e.message || "No se pudo leer tu CSV.");
      } finally {
        setIsParsing(false);
      }
    }

    parseCsv();
  }, [wizard.csvFile, setWizard]);

  // Chips desde el JSON parseado
  const chipCategories = useMemo(() => {
    return [
      { id: "all", label: "Todo" },
      ...parsedCategories.map((c) => ({ id: c.id, label: c.title })),
    ];
  }, [parsedCategories]);

  // Filtrado por chip + búsqueda (reusa tu lógica actual)
  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();

    return parsedCategories
      .filter((cat) => activeCategory === "all" || cat.id === activeCategory)
      .map((cat) => {
        const items =
          q.length === 0
            ? cat.items
            : cat.items.filter((item) => {
                const hay = `${item.title} ${item.description}`.toLowerCase();
                return hay.includes(q);
              });
        return { ...cat, items };
      })
      .filter((cat) => cat.items.length > 0);
  }, [parsedCategories, query, activeCategory]);

  function handleBack() {
    router.push("/admin/menu");
  }

  async function handleFinalize() {
    if (!wizard?.parsedMenu?.categories?.length) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        restaurant: {
          name: wizard.restaurantName,
          slug: wizard.restaurantSlug,
          currency: "MXN",
        },
        menu: {
          name: "Menú principal",
          isPublished: true,
        },
        categories: wizard.parsedMenu.categories.map((c, idx) => ({
          name: c.title, // ojo: en tu UI usas title
          sortOrder: idx,
          items: c.items.map((it) => ({
            name: it.title,
            description: it.description || "",
            price: it.price, // "139.99" o 139.99, el backend lo convierte a cents
          })),
        })),
      };

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
        throw new Error(
          data?.error || data?.message || "No se pudo crear el menú."
        );
      }

      if (!data?.slug || typeof data.slug !== "string") {
        throw new Error("Respuesta inesperada del servidor. Intenta de nuevo.");
      }

      setWizard({
        restaurantName: "",
        restaurantSlug: "",
        csvFile: null,
        logoFile: null,
        parsedMenu: null,
      });

      router.push(`/r/${data.slug}`);
    } catch (e) {
      setSubmitError(e.message || "Error inesperado al finalizar.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen mx-auto w-full max-w-md border-gray bg-background">
      {/* Top label */}
      <header className="px-4 pt-6">
        <p className="text-sm font-semibold tracking-tight">TU MENU DIGITAL</p>
      </header>

      {/* Estado */}
      <section className="px-4 pt-6">
        <h1 className="text-xl font-semibold tracking-tight">Preview</h1>

        {submitError ? (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="text-sm font-medium text-red-700">
              No se pudo finalizar
            </p>
            <p className="mt-1 text-sm text-red-700">{submitError}</p>
          </div>
        ) : null}

        {isParsing ? (
          <p className="mt-2 text-sm text-muted-foreground">Leyendo tu CSV…</p>
        ) : null}

        {!isParsing && skippedRows > 0 ? (
          <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
            <p className="text-sm text-yellow-800">
              {skippedRows === 1
                ? "1 fila fue omitida por datos incompletos o inválidos."
                : `${skippedRows} filas fueron omitidas por datos incompletos o inválidos.`}
            </p>
          </div>
        ) : null}

        {error ? (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
            <p className="text-sm font-medium text-red-700">
              No se pudo importar
            </p>
            <p className="mt-1 text-sm text-red-700">{error}</p>

            <div className="mt-3 flex gap-3">
              <Button variant="secondary" onClick={handleBack}>
                Regresar
              </Button>
              <Button asChild variant="outline">
                <a href="/menu-template.csv" download>
                  Descargar plantilla CSV
                </a>
              </Button>
            </div>
          </div>
        ) : null}
      </section>

      {/* Preview del menú (solo si ya parseó y no hay error) */}
      {!error && parsedCategories.length > 0 ? (
        <>
          {/* Sticky like Uber Eats */}
          <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
            <RestaurantHeader name={wizard.restaurantName} />

            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Buscar en el menú"
            />

            <CategoryChips
              categories={chipCategories}
              activeId={activeCategory}
              onSelect={setActiveCategory}
            />

            <div className="h-3" />
          </div>

          {/* Sections */}
          <div className="pb-28">
            {filteredCategories.map((category) => (
              <MenuSection
                key={category.id}
                title={category.title}
                items={category.items}
              />
            ))}
          </div>

          {/* Bottom actions */}
          <div className="fixed bottom-0 left-0 right-0 border-t bg-background">
            <div className="mx-auto flex w-full max-w-md gap-3 px-4 py-4">
              <Button
                className="h-12 flex-1 rounded-xl"
                onClick={handleFinalize}
                disabled={isParsing || isSubmitting}
              >
                {isSubmitting ? "Finalizando..." : "Finalizar"}
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </main>
  );
}
