import type { ReactNode } from "react";

// Content is visible in server HTML, even if JavaScript never loads.
export function PageTransition({ children }: { children: ReactNode }) {
 return <div className="page-enter">{children}</div>;
}

export function FadeInSection({ children }: { children: ReactNode; delay?: number }) {
 return <section>{children}</section>;
}
