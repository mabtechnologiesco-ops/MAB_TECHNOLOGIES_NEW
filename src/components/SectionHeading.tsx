interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  dark?: boolean;
  center?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
  center = true,
}: SectionHeadingProps) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span
        className={`text-xs font-bold tracking-[0.2em] ${
          dark ? "text-[#31C8FF]" : "text-[#078BFF]"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.5rem] ${
          dark ? "text-white" : "text-[#061A38]"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-relaxed ${dark ? "text-white/65" : "text-[#061A38]/60"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
