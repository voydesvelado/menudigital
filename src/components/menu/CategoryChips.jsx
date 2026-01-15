import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CategoryChips({ categories = [], activeId, onSelect }) {
  return (
    <div className="w-full px-4 pt-3">
      <div className="-mx-4 overflow-x-auto px-4">
        <div className="flex w-max gap-3">
          {categories.map((c) => {
            const isActive = c.id === activeId;

            return (
              <Button
                key={c.id}
                type="button"
                variant={isActive ? "default" : "secondary"}
                onClick={() => onSelect?.(c.id)}
                aria-pressed={isActive}
                className={cn(
                  "h-10 rounded-full px-4 text-base whitespace-nowrap",
                  // si quieres que el activo se sienta más “chip”
                  isActive && "shadow-sm"
                )}
              >
                {c.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
