export default function ProcessStepCard({ step, title, description }) {
  return (
    <div className="flex items-center gap-4 rounded-[8px] border border-white/90 bg-black p-4">
      {/* Number */}
      <div className="flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center rounded-full bg-white">
        <span className="text-[18px] font-semibold leading-none text-black">
          {step}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <span className="text-[14px] font-semibold text-white">{title}</span>

        <span className="mt-1 text-[12px] font-normal text-white/80">
          {description}
        </span>
      </div>
    </div>
  );
}
