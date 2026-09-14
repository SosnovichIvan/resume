import type { ReactNode } from "react";
import { BackLink } from "./BackLink";
import { Icon } from "./Icon";
import { PageTransition } from "./PageTransition";

export function PageShell({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
 return <PageTransition><div className={`mx-auto px-4 py-8 sm:px-6 lg:px-8 ${wide ? "max-w-5xl" : "max-w-4xl"}`}>{children}</div></PageTransition>;
}

export function PageHeader({ title, description, icon }: { title: string; description: ReactNode; icon: string }) {
 return <header className="mb-8">
  <BackLink />
  <h1 className="mb-2 flex items-center gap-3 text-3xl font-bold">
   <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300"><Icon name={icon} className="h-6 w-6" /></span>
   {title}
  </h1>
  <p className="text-slate-600 dark:text-slate-300">{description}</p>
 </header>;
}
