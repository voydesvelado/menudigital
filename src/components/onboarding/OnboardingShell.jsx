"use client";

import { ArrowLeft, ChevronRight, Loader2 } from "lucide-react";

const PRIMARY = "#00685f";
const PRIMARY_DARK = "#008378";
const SURFACE_LOW = "#eef4ff";

export default function OnboardingShell({
  step,
  totalSteps = 5,
  onBack,
  ctaLabel = "Continuar",
  ctaSubtext,
  onCta,
  ctaDisabled = false,
  ctaLoading = false,
  contentClassName = "pt-12",
  children,
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top app bar */}
      <header className="flex flex-col items-start w-full pt-4 px-6 gap-4">
        <div className="flex items-center w-full justify-between">
          <button
            type="button"
            onClick={onBack}
            aria-label="Regresar"
            className="p-1 rounded-full hover:bg-teal-50 active:scale-95 transition-transform"
            style={{ color: PRIMARY }}
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          <span
            className="text-sm font-semibold tracking-tight"
            style={{ color: PRIMARY }}
          >
            Paso {step} de {totalSteps}
          </span>

          {/* Spacer for symmetry */}
          <div className="w-8" aria-hidden />
        </div>

        {/* Progress bar */}
        <div className="flex gap-2 w-full h-2 mb-2" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={totalSteps}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-full h-full transition-all duration-500"
              style={{
                background:
                  i < step
                    ? `linear-gradient(to right, ${PRIMARY}, ${PRIMARY_DARK})`
                    : "#d9e3f4",
              }}
            />
          ))}
        </div>
      </header>

      {/* Page content */}
      <main className={`flex-grow flex flex-col items-center px-6 pb-32 max-w-2xl mx-auto w-full ${contentClassName}`}>
        {children}
      </main>

      {/* Fixed bottom CTA */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex flex-col items-center justify-center px-6 pb-8 gap-2 bg-transparent backdrop-blur-xl">
        {ctaSubtext ? (
          <p className="text-xs font-medium text-gray-400">{ctaSubtext}</p>
        ) : null}
        <button
          type="button"
          onClick={onCta}
          disabled={ctaDisabled || ctaLoading}
          className="flex items-center justify-center h-14 w-full max-w-md rounded-xl text-white font-bold text-base uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none"
          style={{ background: `linear-gradient(to bottom, ${PRIMARY}, ${PRIMARY_DARK})` }}
        >
          {ctaLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              {ctaLabel}
              <ChevronRight className="ml-2 h-5 w-5" />
            </>
          )}
        </button>
      </nav>

      {/* Decorative ambient blurs */}
      <div
        className="fixed top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{ background: `${PRIMARY}0D` }}
        aria-hidden
      />
      <div
        className="fixed bottom-20 -left-20 w-48 h-48 rounded-full blur-3xl pointer-events-none"
        style={{ background: `${PRIMARY_DARK}0D` }}
        aria-hidden
      />
    </div>
  );
}

// Reusable tip card used across steps
export function TipCard({ icon: Icon, title, body }) {
  return (
    <div
      className="p-5 rounded-xl flex items-start gap-4"
      style={{ background: `${SURFACE_LOW}80` }}
    >
      <div
        className="p-2 bg-white rounded-lg shadow-sm flex-shrink-0"
        style={{ color: PRIMARY }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-bold text-gray-900">{title}</h4>
        <p className="text-xs text-gray-500 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
