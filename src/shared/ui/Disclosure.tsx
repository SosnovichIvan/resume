import type { ReactNode } from "react";

// Native disclosure remains operable before hydration and without JavaScript.
export function Disclosure({ title = "Подробнее", children }: { title?: string; children: ReactNode }) {
 return <details className="group mt-3">
  <summary className="min-h-11 cursor-pointer rounded-lg py-3 text-sm font-medium text-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 dark:text-brand-300">{title}</summary>
  <div className="pt-2">{children}</div>
 </details>;
}
