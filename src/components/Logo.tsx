interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-auto",
    md: "h-8 w-auto",
    lg: "h-10 w-auto",
  };

  return (
    <img
      src="/mab-technologies-logo.png"
      alt="MAB Technologies SL logo"
      className={`${sizeClasses[size]} object-contain object-center ${className}`}
      width={size === "sm" ? 48 : size === "md" ? 64 : 80}
      height={size === "sm" ? 32 : size === "md" ? 42 : 54}
      loading="eager"
      decoding="async"
    />
  );
}
