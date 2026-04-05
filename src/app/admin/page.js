"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWizard } from "@/components/admin/WizardProvider";
import { slugify } from "@/lib/slugify";

const MAX_NAME_LENGTH = 80;

export default function AdminPage() {
  const router = useRouter();
  const { setWizard } = useWizard();

  const [restaurantName, setRestaurantName] = useState("");

  const restaurantSlug = useMemo(() => {
    if (!restaurantName.trim()) return "";
    return slugify(restaurantName);
  }, [restaurantName]);

  const canContinue =
    restaurantName.trim().length >= 2 &&
    restaurantName.trim().length <= MAX_NAME_LENGTH;

  function handleSubmit(e) {
    e.preventDefault();
    if (!canContinue) return;

    setWizard((prev) => ({
      ...prev,
      restaurantName: restaurantName.trim(),
      restaurantSlug,
    }));

    router.push("/admin/menu");
  }

  return (
    <main className="min-h-screen mx-auto w-full max-w-md border-gray bg-background">
      {/* Top label */}
      <header className="px-4 pt-6">
        <p className="text-sm font-semibold tracking-tight">TU MENU DIGITAL</p>
      </header>

      {/* Step content */}
      <section className="px-4 pt-24" aria-labelledby="admin-step-title">
        <h1
          id="admin-step-title"
          className="text-3xl font-semibold leading-tight tracking-tight"
        >
          Cuál es el nombre de tu restaurante?
        </h1>

        <form onSubmit={handleSubmit} className="mt-10">
          <label htmlFor="restaurant-name" className="sr-only">
            Nombre de tu restaurante
          </label>

          <Input
            id="restaurant-name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            placeholder="Nombre de tu restaurante"
            className="h-12 rounded-xl text-base"
            autoComplete="organization"
            maxLength={MAX_NAME_LENGTH}
          />

          <Button
            type="submit"
            className="mt-6 h-12 w-full rounded-xl text-base"
            disabled={!canContinue}
          >
            Continuar
          </Button>

          {restaurantSlug ? (
            <p className="mt-3 text-sm text-muted-foreground">
              URL sugerida:{" "}
              <span className="font-medium">/r/{restaurantSlug}</span>
            </p>
          ) : null}
        </form>
      </section>
    </main>
  );
}
