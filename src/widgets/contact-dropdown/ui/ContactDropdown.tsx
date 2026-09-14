"use client";

import { useEffect, useId, useRef, useState } from "react";
import { profile } from "@/entities/profile/model/data";
import { Button, Icon, IconButton } from "@/shared/ui";

export function ContactDropdown({ bare = false }: { bare?: boolean }) {
 const [open, setOpen] = useState(false);
 const [status, setStatus] = useState("");
 const ref = useRef<HTMLDivElement>(null);
 const trigger = useRef<HTMLButtonElement>(null);
 const panelId = useId();

 useEffect(() => {
  if (!open) return;
  const outside = (event: MouseEvent) => {
   if (!ref.current?.contains(event.target as Node)) setOpen(false);
  };
  const escape = (event: KeyboardEvent) => {
   if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
  };
  document.addEventListener("mousedown", outside);
  document.addEventListener("keydown", escape);
  return () => {
   document.removeEventListener("mousedown", outside);
   document.removeEventListener("keydown", escape);
  };
 }, [open]);

 const copy = async (label: string, value: string) => {
  try {
   await navigator.clipboard.writeText(value);
   setStatus(`${label} скопирован`);
  } catch {
   setStatus("Не удалось скопировать. Выделите контакт и скопируйте вручную.");
  }
 };
 const props = {
  ref: trigger,
  "aria-label": "Связаться",
  "aria-expanded": open,
  "aria-controls": panelId,
  onClick: () => { setOpen(!open); setStatus(""); },
 };
 return <div ref={ref} className="relative" onBlur={event => {
  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
 }}>
  {bare ? <IconButton {...props} title="Связаться"><Icon name="send" className="h-4 w-4" /></IconButton>
   : <Button {...props}><Icon name="send" className="h-4 w-4" />Связаться</Button>}
  {open && <div id={panelId} className="absolute right-0 z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
   {profile.contacts.map(contact => <div key={contact.label} className="flex items-center gap-2 border-b border-slate-100 px-3 py-2 dark:border-slate-700">
    <Icon name={contact.icon} className="h-4 w-4 shrink-0 text-brand-600 dark:text-brand-300" />
    <div className="min-w-0 flex-1">
     <p className="text-xs text-slate-600 dark:text-slate-300">{contact.label}</p>
     <a href={contact.href} className="flex min-h-11 items-center break-all text-sm font-medium text-slate-800 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 dark:text-slate-100">{contact.value}</a>
    </div>
    <IconButton aria-label={`Скопировать ${contact.label}`} onClick={() => copy(contact.label, contact.value)}><Icon name="copy" className="h-4 w-4" /></IconButton>
   </div>)}
   <p role="status" className={status ? "px-4 py-3 text-sm text-slate-700 dark:text-slate-200" : "sr-only"}>{status}</p>
  </div>}
 </div>;
}
