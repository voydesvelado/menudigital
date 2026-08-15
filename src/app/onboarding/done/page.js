"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Copy, Check, Download, ArrowRight } from "lucide-react";
import Image from "next/image";

const PRIMARY      = "#00685f";
const PRIMARY_MID  = "#0D9488";
const PRIMARY_DARK = "#008378";
const WA_GREEN     = "#25D366";

function OnboardingDoneContent() {
  const router       = useRouter();
  const searchParams = useSearchParams();

  const slug           = searchParams.get("slug") ?? "";
  const restaurantName = decodeURIComponent(searchParams.get("name") ?? "Tu restaurante");

  const [menuUrl, setMenuUrl]           = useState("");
  const [copied, setCopied]             = useState(false);
  const [qrDownloading, setQrDownloading] = useState(false);

  useEffect(() => {
    if (!slug) { router.replace("/onboarding"); return; }
    setMenuUrl(`${window.location.origin}/r/${slug}`);
  }, [slug, router]);

  const qrSrc = menuUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=0&data=${encodeURIComponent(menuUrl)}`
    : null;

  async function handleCopy() {
    if (!menuUrl) return;
    try {
      await navigator.clipboard.writeText(menuUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch { /* ignore */ }
  }

  async function handleDownloadQr() {
    if (!menuUrl || qrDownloading) return;
    setQrDownloading(true);
    try {
      const src  = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=10&data=${encodeURIComponent(menuUrl)}`;
      const res  = await fetch(src);
      const blob = await res.blob();
      const href = URL.createObjectURL(blob);
      const a    = Object.assign(document.createElement("a"), { href, download: `qr-${slug}.png` });
      a.click();
      URL.revokeObjectURL(href);
    } catch { /* ignore */ } finally {
      setQrDownloading(false);
    }
  }

  function handleWhatsApp() {
    if (!menuUrl) return;
    const text = encodeURIComponent(`¡Mira nuestro menú digital! ${menuUrl}`);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  }

  if (!slug) return null;

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col items-center">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="flex flex-col items-start w-full pt-4 px-6 gap-4 bg-white">
        <div className="flex items-center justify-between w-full">
          {/* Back arrow area — left spacer keeps title centred */}
          <div className="w-8" aria-hidden />

          <span className="text-sm font-semibold tracking-tight text-gray-400">
            Onboarding Progress
          </span>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
          >
            Salir
          </button>
        </div>

        {/* All 5 segments filled */}
        <div className="flex w-full gap-2 mb-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-2 flex-1 rounded-full" style={{ background: PRIMARY }} />
          ))}
          {/* Last segment with animated fill indicator */}
          <div
            className="h-2 flex-1 rounded-full relative overflow-hidden"
            style={{ background: `linear-gradient(to right, ${PRIMARY}, ${PRIMARY_DARK})` }}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-end pr-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="white" aria-hidden>
                <path d="M1.5 5.5L3.5 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────────────── */}
      <main className="max-w-md w-full px-6 pt-12 pb-32 flex flex-col items-center text-center">

        {/* Success icon */}
        <div className="relative mb-8">
          {/* Pulse rings */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: `${PRIMARY}18` }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: `${PRIMARY}10` }}
            animate={{ scale: [1, 2.1, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          {/* Circle */}
          <motion.div
            className="relative w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: `${PRIMARY}18` }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.1 }}
          >
            {/* Animated checkmark */}
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden>
              <motion.path
                d="M9 22L17 30L33 14"
                stroke={PRIMARY}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, delay: 0.35, ease: "easeOut" }}
              />
            </svg>
          </motion.div>

          {/* 🎉 badge */}
          <motion.div
            className="absolute -top-2 -right-2 text-2xl leading-none"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 16, delay: 0.65 }}
            aria-hidden
          >
            🎉
          </motion.div>
        </div>

        {/* Headline */}
        <motion.div
          className="space-y-2 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-[26px] font-extrabold leading-tight tracking-tight">
            ¡Tu menú está listo!
          </h1>
          <p className="text-[16px] text-gray-500">Compártelo con tus clientes</p>
        </motion.div>

        {/* QR card */}
        <motion.div
          className="w-full rounded-[24px] p-8 mb-12 flex flex-col items-center"
          style={{
            background: "#fff",
            boxShadow: "0 8px 32px rgba(0,104,95,0.07)",
            border: "1px solid rgba(217,227,244,0.3)",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* QR image */}
          <div className="bg-white p-4 rounded-xl shadow-inner mb-4">
            {qrSrc ? (
              <Image
                src={qrSrc}
                alt={`QR code para ${restaurantName}`}
                width={200}
                height={200}
                unoptimized
                className="rounded"
              />
            ) : (
              <div className="w-[200px] h-[200px] rounded bg-gray-100 animate-pulse" />
            )}
          </div>

          <p className="font-bold text-lg tracking-wide" style={{ color: PRIMARY }}>
            {restaurantName}
          </p>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-medium">
            Menú Digital
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="w-full space-y-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          {/* Copy link — primary */}
          <button
            type="button"
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-3 h-14 rounded-xl text-white font-bold text-base uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-[0.98] transition-all duration-200"
            style={{ background: `linear-gradient(to bottom, ${PRIMARY}, ${PRIMARY_DARK})` }}
          >
            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            {copied ? "¡Copiado!" : "Copiar link del menú"}
          </button>

          {/* Download QR — outline */}
          <button
            type="button"
            onClick={handleDownloadQr}
            disabled={qrDownloading || !menuUrl}
            className="w-full flex items-center justify-center gap-3 bg-white h-14 rounded-xl font-bold text-base uppercase tracking-wider border-2 hover:bg-teal-50 active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
            style={{ borderColor: PRIMARY_MID, color: PRIMARY_MID }}
          >
            <Download className="h-5 w-5" />
            {qrDownloading ? "Descargando..." : "Descargar QR"}
          </button>

          {/* WhatsApp */}
          <button
            type="button"
            onClick={handleWhatsApp}
            className="w-full flex items-center justify-center gap-3 h-14 rounded-xl text-white font-bold text-base uppercase tracking-wider shadow-md hover:brightness-105 active:scale-[0.98] transition-all duration-200"
            style={{ background: WA_GREEN }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Compartir por WhatsApp
          </button>
        </motion.div>

        {/* Footer link */}
        <motion.a
          href={`/r/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 font-semibold flex items-center gap-2 hover:underline"
          style={{ color: PRIMARY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Ir a editar mi menú
          <ArrowRight className="h-4 w-4" />
        </motion.a>

      </main>
    </div>
  );
}

export default function OnboardingDone() {
  return (
    <Suspense fallback={<div className="bg-white min-h-screen" />}>
      <OnboardingDoneContent />
    </Suspense>
  );
}
