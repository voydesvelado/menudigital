"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, X, FileSpreadsheet } from "lucide-react";
import Link from "next/link";

import OnboardingShell, { TipCard } from "@/components/onboarding/OnboardingShell";
import { useOnboarding } from "@/components/onboarding/OnboardingProvider";

const MAX_CSV_BYTES = 5 * 1024 * 1024; // 5 MB
const PRIMARY = "#00685f";
const SURFACE_LOW = "#eef4ff";

export default function OnboardingStep3() {
  const router = useRouter();
  const { onboarding, setOnboarding } = useOnboarding();

  const [csvFile, setCsvFile] = useState(null);
  const [sizeError, setSizeError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // Guard: must have completed steps 1 & 2
  useEffect(() => {
    if (!onboarding.businessName) router.replace("/onboarding");
    else if (!onboarding.foodTypes?.length) router.replace("/onboarding/category");
  }, [onboarding.businessName, onboarding.foodTypes, router]);

  function handleFile(file) {
    if (!file) return;
    if (file.size > MAX_CSV_BYTES) {
      setSizeError("El archivo es demasiado grande. El máximo es 5 MB.");
      return;
    }
    setSizeError("");
    setCsvFile(file);
  }

  function handleInputChange(e) {
    handleFile(e.target.files?.[0] ?? null);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === "text/csv" || file.name.endsWith(".csv"))) {
      handleFile(file);
    }
  }

  function handleContinue() {
    if (!csvFile) return;
    setOnboarding((prev) => ({ ...prev, csvFile }));
    router.push("/onboarding/logo");
  }

  return (
    <OnboardingShell
      step={3}
      onBack={() => router.push("/onboarding/category")}
      onCta={handleContinue}
      ctaDisabled={!csvFile}
    >
      {/* Hero emoji */}
      <div className="mb-10 flex flex-col items-center">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-sm"
          style={{ background: SURFACE_LOW, border: "1px solid rgba(188,201,198,0.2)" }}
        >
          📋
        </div>
      </div>

      {/* Headline */}
      <div className="text-center mb-10 space-y-3 w-full">
        <h1 className="text-[24px] font-extrabold text-gray-900 tracking-tight leading-tight">
          Sube tu menú en CSV
        </h1>
        <p className="text-[15px] text-gray-500 font-medium">
          Lo convertiremos en un menú digital al instante
        </p>
      </div>

      <div className="w-full space-y-4">
        {/* Drop zone */}
        <label
          htmlFor="csv-upload"
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className="flex flex-col items-center justify-center w-full h-44 rounded-xl border-2 border-dashed cursor-pointer transition-all"
          style={{
            borderColor: csvFile ? PRIMARY : isDragging ? PRIMARY : "#bcc9c6",
            background: csvFile ? `${SURFACE_LOW}` : isDragging ? `${SURFACE_LOW}80` : "transparent",
          }}
        >
          {csvFile ? (
            <>
              <FileText className="h-9 w-9 mb-2" style={{ color: PRIMARY }} />
              <p className="text-sm font-semibold" style={{ color: PRIMARY }}>
                {csvFile.name}
              </p>
              <p className="text-xs mt-1 text-gray-400">
                {(csvFile.size / 1024).toFixed(1)} KB — Toca para cambiar
              </p>
            </>
          ) : (
            <>
              <Upload className="h-9 w-9 mb-2 text-gray-400" />
              <p className="text-sm font-semibold text-gray-600">
                Seleccionar archivo CSV
              </p>
              <p className="text-xs mt-1 text-gray-400">
                o arrastra aquí tu archivo
              </p>
            </>
          )}

          <input
            id="csv-upload"
            type="file"
            accept=".csv,text/csv"
            className="sr-only"
            onChange={handleInputChange}
          />
        </label>

        {/* Clear file button */}
        {csvFile ? (
          <button
            type="button"
            onClick={() => setCsvFile(null)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
            Quitar archivo
          </button>
        ) : null}

        {/* Size error */}
        {sizeError ? (
          <p className="text-sm text-red-600">{sizeError}</p>
        ) : null}

        {/* Download template */}
        <Link
          href="/menu-template.csv"
          download
          className="inline-flex items-center gap-2 text-sm font-medium rounded-lg px-4 py-2 border transition-colors hover:bg-gray-50"
          style={{ color: PRIMARY, borderColor: `${PRIMARY}40` }}
        >
          <FileSpreadsheet className="h-4 w-4" />
          Descargar plantilla CSV
        </Link>

        <TipCard
          icon={FileText}
          title="Formato sencillo"
          body="Tu CSV necesita 4 columnas: category, item, price, description. Descarga la plantilla si no tienes una."
        />
      </div>
    </OnboardingShell>
  );
}
