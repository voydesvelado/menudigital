"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, Utensils, X, PencilLine } from "lucide-react";

import OnboardingShell from "@/components/onboarding/OnboardingShell";
import { useOnboarding } from "@/components/onboarding/OnboardingProvider";

const PRIMARY          = "#00685f";
const PRIMARY_MID      = "#0D9488";
const PRIMARY_DARK     = "#008378";
const SURFACE_LOW      = "#eef4ff";
const CHIP_INACTIVE_BG = "#F3F4F6";

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-8 bg-white rounded-3xl border-2 border-dashed border-gray-200">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ background: SURFACE_LOW }}
      >
        <Utensils className="h-8 w-8 text-gray-300" />
      </div>
      <h3 className="font-semibold text-lg text-gray-900 mb-1">
        Aún no hay platillos...
      </h3>
      <p className="text-sm text-gray-400 text-center mb-6">
        Tu menú está esperando su primera creación.
      </p>
      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 font-bold text-sm transition-colors hover:bg-teal-50"
        style={{ borderColor: PRIMARY, color: PRIMARY }}
      >
        <PenLine className="h-4 w-4" />
        Agregar primer platillo
      </button>
    </div>
  );
}

// ─── Inline form card ─────────────────────────────────────────────────────────
function DishForm({ initial, onSave, onCancel }) {
  const nameRef = useRef(null);
  const [name, setName]               = useState(initial?.name        ?? "");
  const [price, setPrice]             = useState(initial?.price       ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [errors, setErrors]           = useState({});

  useEffect(() => { nameRef.current?.focus(); }, []);

  function validate() {
    const e = {};
    if (!name.trim())   e.name  = "El nombre es requerido";
    if (!price.trim() || isNaN(parseFloat(price)) || parseFloat(price) < 0)
      e.price = "Ingresa un precio válido";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    onSave({ name: name.trim(), price: parseFloat(price).toFixed(2), description: description.trim() });
  }

  const inputCls = "w-full rounded-xl py-4 px-4 text-base outline-none transition-all placeholder:text-gray-300";
  const inputStyle = { background: SURFACE_LOW };
  const focusRing = (e) => (e.target.style.boxShadow = `0 0 0 2px ${PRIMARY}66`);
  const blurRing  = (e) => (e.target.style.boxShadow = "none");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
    >
      {/* Card header */}
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold flex items-center gap-2" style={{ color: PRIMARY }}>
          <PencilLine className="h-5 w-5" />
          {initial ? "Editar platillo" : "Nuevo platillo"}
        </h4>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Cancelar"
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
            Nombre del platillo
          </label>
          <input
            ref={nameRef}
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
            placeholder="Ej. Tacos de Pastor Especiales"
            className={inputCls}
            style={inputStyle}
            onFocus={focusRing}
            onBlur={blurRing}
          />
          {errors.name ? <p className="text-xs text-red-500 ml-1">{errors.name}</p> : null}
        </div>

        {/* Price */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
            Precio
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium text-gray-900 pointer-events-none">
              $
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => { setPrice(e.target.value); setErrors((p) => ({ ...p, price: undefined })); }}
              placeholder="0.00"
              className={`${inputCls} pl-8`}
              style={inputStyle}
              onFocus={focusRing}
              onBlur={blurRing}
            />
          </div>
          {errors.price ? <p className="text-xs text-red-500 ml-1">{errors.price}</p> : null}
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
            Descripción{" "}
            <span className="normal-case font-normal text-gray-300">(opcional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ingredientes, alérgenos o porción..."
            rows={3}
            className={`${inputCls} resize-none`}
            style={inputStyle}
            onFocus={focusRing}
            onBlur={blurRing}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-4 rounded-xl font-bold text-sm text-gray-500 hover:brightness-95 transition-all active:scale-95"
            style={{ background: "#E5E7EB" }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-[2] py-4 rounded-xl text-white font-bold text-sm shadow-lg active:scale-95 transition-all hover:brightness-110"
            style={{ background: `linear-gradient(to bottom, ${PRIMARY}, ${PRIMARY_DARK})` }}
          >
            Guardar platillo
          </button>
        </div>
      </form>
    </motion.div>
  );
}

// ─── Dish card ────────────────────────────────────────────────────────────────
function DishCard({ dish, onEdit }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18 }}
      className="flex items-center justify-between h-14 px-4 bg-white rounded-xl border border-gray-100 shadow-sm"
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{dish.name}</p>
        <p className="text-xs text-gray-400">${dish.price}</p>
      </div>
      <button
        type="button"
        onClick={() => onEdit(dish)}
        aria-label={`Editar ${dish.name}`}
        className="flex-shrink-0 ml-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <PenLine className="h-4 w-4 text-gray-400" />
      </button>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function OnboardingStep4() {
  const router = useRouter();
  const { onboarding, setOnboarding } = useOnboarding();

  // Guard
  useEffect(() => {
    if (!onboarding.businessName)     { router.replace("/onboarding"); return; }
    if (!onboarding.foodTypes?.length){ router.replace("/onboarding/category"); return; }
    if (!onboarding.sections?.length) { router.replace("/onboarding/sections"); return; }
  }, [onboarding.businessName, onboarding.foodTypes, onboarding.sections, router]);

  const sections = onboarding.sections ?? [];

  // Local dishes state: Record<sectionName, dish[]>
  const [dishes, setDishes] = useState(() => {
    const saved = onboarding.dishes ?? {};
    return Object.fromEntries(sections.map((s) => [s, saved[s] ?? []]));
  });

  const [activeSection, setActiveSection] = useState(sections[0] ?? "");
  const [showForm, setShowForm]           = useState(false);
  const [editingDish, setEditingDish]     = useState(null);
  const [isPublishing, setIsPublishing]   = useState(false);
  const [publishError, setPublishError]   = useState("");

  const currentItems = dishes[activeSection] ?? [];

  function openAdd() {
    setEditingDish(null);
    setShowForm(true);
  }

  function openEdit(dish) {
    setEditingDish(dish);
    setShowForm(true);
  }

  function handleSave({ name, price, description }) {
    setDishes((prev) => {
      const list = prev[activeSection] ?? [];
      if (editingDish) {
        return {
          ...prev,
          [activeSection]: list.map((d) =>
            d.id === editingDish.id ? { ...d, name, price, description } : d
          ),
        };
      }
      return {
        ...prev,
        [activeSection]: [...list, { id: `${Date.now()}`, name, price, description }],
      };
    });
    setShowForm(false);
    setEditingDish(null);
  }

  async function handleContinue() {
    setIsPublishing(true);
    setPublishError("");

    try {
      if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error("API URL no configurada. Contacta al soporte.");
      }

      const payload = {
        restaurant: {
          name: onboarding.businessName,
          slug: onboarding.businessSlug,
          currency: "MXN",
        },
        menu: { name: "Menú principal", isPublished: true },
        categories: (onboarding.sections ?? []).map((sectionName, idx) => ({
          name: sectionName,
          sortOrder: idx,
          items: (dishes[sectionName] ?? []).map((d) => ({
            name: d.name,
            description: d.description || "",
            price: parseFloat(d.price),
          })),
        })),
      };

      const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/create-menu`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || data?.message || "No se pudo crear el menú.");
      }
      if (!data?.slug || typeof data.slug !== "string") {
        throw new Error("Respuesta inesperada del servidor. Intenta de nuevo.");
      }

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

      const name = encodeURIComponent(onboarding.businessName);
      router.push(`/onboarding/done?slug=${data.slug}&name=${name}`);
    } catch (e) {
      setPublishError(e.message || "Error inesperado. Intenta de nuevo.");
    } finally {
      setIsPublishing(false);
    }
  }

  return (
    <OnboardingShell
      step={4}
      onBack={() => router.push("/onboarding/sections")}
      onCta={handleContinue}
      ctaSubtext="Puedes agregar más platillos después"
      ctaLoading={isPublishing}
      contentClassName="pt-8"
    >
      {/* Publish error */}
      {publishError ? (
        <div className="w-full mb-4 rounded-xl border border-red-200 bg-red-50 p-3">
          <p className="text-sm font-semibold text-red-700">No se pudo publicar</p>
          <p className="text-sm text-red-600 mt-0.5">{publishError}</p>
        </div>
      ) : null}

      {/* Headline */}
      <div className="w-full mb-6">
        <h1 className="text-[22px] font-bold text-gray-900 tracking-tight leading-tight mb-2">
          Ahora agrega tus platillos
        </h1>
        <p className="text-[15px] text-gray-500 leading-relaxed">
          Empieza con los más populares para atraer a tus primeros clientes.
        </p>
      </div>

      {/* Category tabs — bleed to screen edges */}
      <nav
        className="flex overflow-x-auto gap-3 pb-4 -mx-6 px-6 w-[calc(100%+3rem)]"
        style={{ scrollbarWidth: "none" }}
        aria-label="Secciones del menú"
      >
        {sections.map((section) => {
          const isActive = section === activeSection;
          const count = dishes[section]?.length ?? 0;
          return (
            <button
              key={section}
              type="button"
              onClick={() => { setActiveSection(section); setShowForm(false); }}
              className="whitespace-nowrap px-5 py-2.5 rounded-full font-medium text-sm transition-all active:scale-[0.98] flex-shrink-0"
              style={{
                background: isActive ? PRIMARY_MID : CHIP_INACTIVE_BG,
                color: isActive ? "#fff" : "#3d4947",
              }}
            >
              {section}
              {count > 0 ? (
                <span
                  className="ml-1.5 text-xs font-bold opacity-80"
                >
                  {count}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Content area */}
      <div className="w-full space-y-4">
        {/* Dish cards */}
        <AnimatePresence mode="popLayout">
          {currentItems.map((dish) => (
            <DishCard key={dish.id} dish={dish} onEdit={openEdit} />
          ))}
        </AnimatePresence>

        {/* Empty state — only when no items and no form */}
        {currentItems.length === 0 && !showForm ? (
          <EmptyState onAdd={openAdd} />
        ) : null}

        {/* Inline form */}
        <AnimatePresence>
          {showForm ? (
            <DishForm
              key="dish-form"
              initial={editingDish}
              onSave={handleSave}
              onCancel={() => { setShowForm(false); setEditingDish(null); }}
            />
          ) : null}
        </AnimatePresence>

        {/* "Add another" dashed button — only when there are items and form is closed */}
        {currentItems.length > 0 && !showForm ? (
          <button
            type="button"
            onClick={openAdd}
            className="w-full py-5 rounded-3xl border-2 border-dashed transition-all group flex items-center justify-center gap-3"
            style={{ borderColor: "#bcc9c6" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = PRIMARY;
              e.currentTarget.style.background = `${PRIMARY}08`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#bcc9c6";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <span
              className="font-bold text-gray-400 group-hover:text-primary transition-colors text-sm"
              style={{ color: "#6d7a77" }}
            >
              + Agregar otro platillo
            </span>
          </button>
        ) : null}
      </div>
    </OnboardingShell>
  );
}
