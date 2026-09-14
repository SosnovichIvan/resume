interface LogoProps {
 className?: string;
}

/** Выбранный знак из трёх модулей; анимация отключается через reduced-motion. */
export function Logo({ className = "h-11 w-11" }: LogoProps) {
 return (
  <span className={`inline-flex shrink-0 items-center justify-center rounded-xl bg-[#0B1014] p-1 ${className}`} aria-hidden="true">
   <picture className="block h-full w-full">
    <source media="(prefers-reduced-motion: reduce)" srcSet="/logo-static.svg" />
   {/* SVG содержит собственный prefers-reduced-motion, размер зарезервирован. */}
   <img src="/logo-loop.svg" alt="" width="36" height="36" className="h-full w-full object-contain" />
   </picture>
  </span>
 );
}
