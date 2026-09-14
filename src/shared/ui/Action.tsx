import { forwardRef, type ButtonHTMLAttributes } from "react";

export const IconButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { "aria-label": string }>(function IconButton({ className = "", type = "button", ...props }, ref) {
 return <button {...props} ref={ref} type={type} className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-brand-300 ${className}`} />;
});
