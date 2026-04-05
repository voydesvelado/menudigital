"use client";

import Link from "next/link";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWizard } from "@/components/admin/WizardProvider";

export default function AdminMenuPage() {
  const router = useRouter();
  const { wizard, setWizard } = useWizard();

  const [csvFile, setCsvFile] = useState(null);
  const [logoFile] = useState(null); // reserved for future logo upload

  // Si entran directo a /admin/menu sin el paso 1
  useEffect(() => {
    if (!wizard.restaurantName) router.replace("/admin");
  }, [wizard.restaurantName, router]);

  const canContinue = useMemo(() => !!csvFile, [csvFile]);

  function handleBack() {
    router.push("/admin");
  }

  function handleContinue() {
    if (!csvFile) return;

    // Guardamos en el wizard
    setWizard((prev) => ({
      ...prev,
      csvFile,
      logoFile, // dummy por ahora
    }));

    // Siguiente paso (preview) — lo creamos después
    router.push("/admin/preview");
  }

  return (
    <main className="min-h-screen mx-auto w-full max-w-md border-gray bg-background">
      <header className="px-4 pt-6">
        <p className="text-sm font-semibold tracking-tight">TU MENU DIGITAL</p>
      </header>

      <section className="px-4 pt-10" aria-labelledby="step2-title">
        <h1 id="step2-title" className="text-2xl font-semibold tracking-tight">
          Carga de menú y logo
        </h1>

        <div className="mt-6 space-y-6">
          {/* CSV */}
          <div className="space-y-3">
            <label
              htmlFor="csv-upload"
              className="text-sm font-medium"
            >
              Menú en .CSV
            </label>

            <Input
              id="csv-upload"
              type="file"
              accept=".csv,text/csv"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                if (file && file.size > 5 * 1024 * 1024) {
                  alert("El archivo es demasiado grande. El máximo es 5 MB.");
                  e.target.value = "";
                  return;
                }
                setCsvFile(file);
              }}
            />

            {csvFile ? (
              <p className="text-xs text-muted-foreground">
                Archivo: <span className="font-medium">{csvFile.name}</span>
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Sube tu menú en CSV. No necesitas IDs ni formatos complicados.
              </p>
            )}

            {/* Download template */}
            <Button asChild variant="outline" size="sm" className="w-fit">
              <Link href="/menu-template.csv" download>
                Descargar plantilla CSV
              </Link>
            </Button>
          </div>

          {/* Logo dummy */}
          <div className="space-y-2">
            <label htmlFor="logo-upload" className="text-sm font-medium">
              Logo (opcional)
            </label>

            <Input
              id="logo-upload"
              type="file"
              accept="image/*"
              disabled
            />

            <p className="text-xs text-muted-foreground">
              Próximamente podrás subir tu logo (por ahora es opcional).
            </p>
          </div>

          {/* Actions */}
          <div className="mt-10 flex gap-3">
            <Button
              type="button"
              variant="secondary"
              className="h-12 flex-1 rounded-xl"
              onClick={handleBack}
            >
              Regresar
            </Button>

            <Button
              type="button"
              className="h-12 flex-1 rounded-xl"
              onClick={handleContinue}
              disabled={!canContinue}
            >
              Continuar
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
