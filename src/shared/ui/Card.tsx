interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 ${
        hover
          ? "transition-colors duration-200 hover:border-indigo-400 dark:hover:border-indigo-500"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
