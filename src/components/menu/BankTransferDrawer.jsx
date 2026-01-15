"use client";

import { useState } from "react";
import { Info, Copy, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

function CopyableField({ id, label, value, copiedId, setCopiedId }) {
  const isCopied = copiedId === id;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value ?? "");
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 1200);
    } catch (e) {
      // Fallback simple (por si el navegador bloquea clipboard)
      try {
        const el = document.createElement("textarea");
        el.value = value ?? "";
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);

        setCopiedId(id);
        window.setTimeout(() => setCopiedId(null), 1200);
      } catch {
        // no-op
      }
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm">
        {label}
      </Label>

      <div className="relative">
        <Input
          id={id}
          value={value ?? ""}
          disabled
          className="pr-12"
          aria-disabled="true"
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          onClick={handleCopy}
          aria-label={`Copiar ${label}`}
        >
          {isCopied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

export default function BankTransferDrawer({
  data = {
    clave: "9912884000124889123",
    nombre: "David Herrera R.",
    banco: "BBVA, Bancomer.",
    concepto: "Consumo restaurante",
  },
}) {
  const [copiedId, setCopiedId] = useState(null);

  return (
    <Drawer>
      {/* Floating button */}
      <DrawerTrigger asChild>
        <Button
          type="button"
          className="fixed bottom-6 right-6 z-[10] h-12 w-12 rounded-full shadow-lg"
          aria-label="Ver datos de transferencia"
        >
          <Info className="h-5 w-5" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="mx-auto w-full max-w-md z-[60]">
        <div className="px-6 pb-6 pt-3">
          <DrawerHeader className="px-0">
            <DrawerTitle className="text-2xl">
              Datos de transferencia
            </DrawerTitle>
          </DrawerHeader>

          <div className="mt-6 space-y-6">
            <CopyableField
              id="transfer-clave"
              label="Clave"
              value={data.clave}
              copiedId={copiedId}
              setCopiedId={setCopiedId}
            />

            <CopyableField
              id="transfer-nombre"
              label="Nombre"
              value={data.nombre}
              copiedId={copiedId}
              setCopiedId={setCopiedId}
            />

            <CopyableField
              id="transfer-banco"
              label="Entidad bancaria"
              value={data.banco}
              copiedId={copiedId}
              setCopiedId={setCopiedId}
            />

            <CopyableField
              id="transfer-concepto"
              label="Concepto"
              value={data.concepto}
              copiedId={copiedId}
              setCopiedId={setCopiedId}
            />

            <Button
              type="button"
              className="w-full"
              onClick={() => {
                // TODO: aquí luego conectamos WhatsApp + comprobante
              }}
            >
              Enviar comprobante por Whatsapp
            </Button>

            {/* feedback accesible para “copiado” */}
            <p className="sr-only" aria-live="polite">
              {copiedId ? "Copiado" : ""}
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
