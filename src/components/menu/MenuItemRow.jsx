// src/components/MenuItemRow.jsx
import Image from "next/image";

export default function MenuItemRow({ title, price, description, imageUrl }) {
  return (
    <div className="flex gap-4 py-4">
      {/* Textos */}
      <div className="flex flex-1 flex-col">
        <span className="text-[14px] font-medium">{title}</span>

        <span className="mt-[6px] text-[12px] font-normal">{price}</span>

        <span className="mt-[6px] text-[12px] font-normal text-[#787878]">
          {description}
        </span>
      </div>

      {/* Imagen condicional */}
      {imageUrl ? (
        <div className="relative h-[100px] w-[100px] flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={title || "Menu item"}
            fill
            sizes="100px"
            className="object-cover"
            // Si estas imágenes vienen de un bucket externo (Supabase), mejor configúralo en next.config.js
            // En emergencia (no recomendado): unoptimized
            // unoptimized
            priority={false}
          />
        </div>
      ) : null}
    </div>
  );
}
