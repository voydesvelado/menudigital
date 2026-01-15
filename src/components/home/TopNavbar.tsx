import Image from "next/image";
import Link from "next/link";

export function TopNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
        <Link
          href="/"
          aria-label="Ir al inicio"
          className="inline-flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Image
            src="https://rvivezcozdjpgkwqgroq.supabase.co/storage/v1/object/public/menu-images/Landing/Logos/LumoBlack.svg"
            alt="Lumo"
            width={108}
            height={28}
            priority
          />
        </Link>
      </div>
    </header>
  );
}
