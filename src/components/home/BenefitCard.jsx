import Image from "next/image";

export default function BenefitCard({ imageURL, title, description }) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-muted/50 p-4">
      <div className="relative h-10 w-10 shrink-0 flex items-center justify-center">
        <Image
          src={imageURL}
          alt=""
          width={24}
          height={24}
          className="object-contain"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
