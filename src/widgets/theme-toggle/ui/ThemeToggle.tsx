"use client";

import { useSyncExternalStore } from "react";
import { Icon, IconButton } from "@/shared/ui";

const subscribe = (notify: () => void) => {
 const observer = new MutationObserver(notify);
 observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
 return () => observer.disconnect();
};
const getTheme = () => document.documentElement.classList.contains("dark");
const serverTheme = () => false;

export function ThemeToggle({ bare = false, className = "" }: { bare?: boolean; className?: string }) {
 const isDark = useSyncExternalStore(subscribe, getTheme, serverTheme);
 const toggle = () => {
  const next = !document.documentElement.classList.contains("dark");
  document.documentElement.classList.toggle("dark", next);
  try { localStorage.setItem("theme", next ? "dark" : "light"); } catch { /* Theme still works in memory. */ }
 };
 return <IconButton onClick={toggle} aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"} className={`${bare ? "" : "border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"} ${className}`}>
  <Icon name={isDark ? "sun" : "moon"} className="h-5 w-5" />
 </IconButton>;
}
