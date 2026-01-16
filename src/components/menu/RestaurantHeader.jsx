import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RestaurantHeader({ logoSrc, name }) {
  return (
    <header className="w-full px-4 pt-4">
      <div className="flex items-center gap-3">
        {/* Back to home */}
        {/* <Link
          href="/"
          aria-label="Volver al inicio"
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
        </Link> */}

        {/* Logo or restaurant name */}
        {logoSrc ? (
          <Image
            src={logoSrc}
            alt={`${name} logo`}
            width={140}
            height={32}
            priority
            className="h-8 w-auto object-contain"
          />
        ) : (
          <h1 className="text-2xl font-semibold tracking-tight">{name}</h1>
        )}
      </div>
    </header>
  );
}
