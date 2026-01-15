import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Búsqueda",
}) {
  return (
    <div className="w-full px-4 pt-3">
      {/* label hidden pero útil para accesibilidad/SEO */}
      <label htmlFor="menu-search" className="sr-only">
        Buscar en el menú
      </label>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="menu-search"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          inputMode="search"
          className="h-12 rounded-2xl bg-muted pl-10"
        />
      </div>
    </div>
  );
}
