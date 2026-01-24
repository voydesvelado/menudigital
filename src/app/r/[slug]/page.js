"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import RestaurantHeader from "@/components/menu/RestaurantHeader";
import SearchBar from "@/components/menu/SearchBar";
import CategoryChips from "@/components/menu/CategoryChips";
import MenuSection from "@/components/menu/MenuSection";
import MenuLoading from "@/components/menu/MenuLoading";
import BankTransferDrawer from "@/components/menu/BankTransferDrawer";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

function formatPrice(priceCents, currency = "MXN") {
  const amount = priceCents / 100;
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function RestaurantPage() {
  const params = useParams();
  const slug = params?.slug;

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const [restaurant, setRestaurant] = useState(null); // ya “normalizado” para tu UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Animaciones
  const reduceMotion = useReducedMotion();

  const ease = [0.16, 1, 0.3, 1];

  const page = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.35, ease },
    },
  };

  const list = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.06,
        delayChildren: reduceMotion ? 0 : 0.02,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease },
    },
  };

  // Fetch al backend
  useEffect(() => {
    if (!slug) return;

    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError("");

        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL no está definido");

        const res = await fetch(`${baseUrl}/restaurants/${slug}`, {
          signal: controller.signal,
        });

        if (res.status === 404) {
          setRestaurant(null);
          setError("Restaurante no encontrado.");
          return;
        }

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();

        // Normaliza al shape que tu UI actual usa:
        // restaurant.name
        // restaurant.categories[].title
        // restaurant.categories[].items[].title / description (+ price opcional)
        const normalized = {
          id: data.restaurant.id,
          name: data.restaurant.name,
          slug: data.restaurant.slug,
          currency: data.restaurant.currency || "MXN",
          // Nota: tu API manda menu.categories con { id, name, items[] }
          categories: (data.menu?.categories || []).map((cat) => ({
            id: cat.id,
            title: cat.name,
            sortOrder: cat.sortOrder ?? 0,
            items: (cat.items || []).map((it) => ({
              id: it.id,
              title: it.name,
              description: it.description || "",
              // por si tus componentes muestran precio como string:
              price: formatPrice(it.priceCents, data.restaurant.currency),
              priceCents: it.priceCents,
              imageUrl: it.imageUrl || null,
            })),
          })),
        };

        setRestaurant(normalized);
      } catch (e) {
        if (e?.name === "AbortError") return;
        console.error(e);
        setError("No se pudo cargar el menú. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [slug]);

  const chipCategories = useMemo(() => {
    if (!restaurant) return [{ id: "all", label: "Todo" }];

    return [
      { id: "all", label: "Todo" },
      ...restaurant.categories.map((c) => ({ id: c.id, label: c.title })),
    ];
  }, [restaurant]);

  const filteredCategories = useMemo(() => {
    if (!restaurant) return [];

    const q = query.trim().toLowerCase();

    return restaurant.categories
      .filter((cat) => activeCategory === "all" || cat.id === activeCategory)
      .map((cat) => {
        const items =
          q.length === 0
            ? cat.items
            : cat.items.filter((item) =>
                `${item.title} ${item.description}`.toLowerCase().includes(q),
              );

        return { ...cat, items };
      })
      .filter((cat) => cat.items.length > 0);
  }, [restaurant, query, activeCategory]);

  // UI states
  if (loading) {
    return <MenuLoading />;
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background p-6">
        <p className="text-sm">{error}</p>
      </main>
    );
  }

  if (!restaurant) {
    return <MenuLoading />;
  }

  return (
    <motion.main
      className="min-h-screen mx-auto w-full max-w-md border-gray bg-background"
      variants={page}
      initial="hidden"
      animate="show"
    >
      {/* Sticky top bar */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 border-b">
        <RestaurantHeader name={restaurant.name} />

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

      {/* Content (stagger clean + crossfade when filtering) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCategory}-${query}`}
          variants={list}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, transition: { duration: 0.2, ease } }}
        >
          {filteredCategories.map((category) => (
            <motion.div key={category.id} variants={item}>
              <MenuSection title={category.title} items={category.items} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <BankTransferDrawer
        data={{
          clave: "9912884000124889123",
          nombre: "David Herrera R.",
          banco: "BBVA, Bancomer.",
          concepto: "Consumo restaurante",
        }}
      />
    </motion.main>
  );
}
