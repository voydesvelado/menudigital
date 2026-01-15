import Image from "next/image";

export default function RestaurantHeader({ logoSrc, name }) {
  return (
    <header className="w-full px-4 pt-4">
      <div className="flex items-center">
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
