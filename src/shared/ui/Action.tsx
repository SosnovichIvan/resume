import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

export const actionClass = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900";
const primary = "bg-brand-600 text-white hover:bg-brand-700";
const secondary = "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700";

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" }>(function Button({ className = "", variant = "primary", type = "button", ...props }, ref) {
 return <button {...props} ref={ref} type={type} className={`${actionClass} ${variant === "primary" ? primary : secondary} ${className}`} />;
});

export const IconButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { "aria-label": string }>(function IconButton({ className = "", type = "button", ...props }, ref) {
 return <button {...props} ref={ref} type={type} className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-brand-300 ${className}`} />;
});

export function ExternalLink({ className = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
 return <a {...props} target="_blank" rel="noopener noreferrer" className={`${actionClass} ${secondary} ${className}`} />;
}
