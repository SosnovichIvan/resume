"use client";

import { useState } from "react";
import { Icon } from "@/shared/ui";

const TELEGRAM_LINK = "https://t.me/ivanSVVladimirovich";

interface Toast {
  id: number;
  type: "success" | "error";
  text: string;
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);

  function addToast(type: Toast["type"], text: string) {
    const id = Date.now();
    setToasts((t) => [...t, { id, type, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }

  function handleContact() {
    // Build message text with name and note.
    const parts: string[] = [];
    if (name.trim()) parts.push(`Имя: ${name.trim()}`);
    if (note.trim()) parts.push(`Сообщение: ${note.trim()}`);
    const text = parts.length > 0 ? encodeURIComponent(parts.join("\n")) : "";

    const url = text ? `${TELEGRAM_LINK}?text=${text}` : TELEGRAM_LINK;
    addToast("success", "Открываю Telegram...");
    setTimeout(() => window.open(url, "_blank"), 500);
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleContact();
    }
  }

  return (
    <>
      {/* Toast notifications */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-28 right-6 z-[1100] flex flex-col gap-2"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto max-w-xs rounded-xl px-4 py-3 text-sm font-medium shadow-lg ${
              t.type === "success"
                ? "bg-green-600 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {t.text}
          </div>
        ))}
      </div>

      {/* Contact modal */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[1040] cursor-pointer"
          />
          <div
            className="pointer-events-auto fixed bottom-28 right-6 z-[1050] flex w-[380px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800 sm:w-[400px]"
            role="dialog"
            aria-label="Связаться с Иваном"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center gap-3 border-b border-slate-200 p-4 dark:border-slate-700">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-pink-500">
                <Icon name="telegram" className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-slate-50">
                  Напишите мне
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Откроется Telegram-чат
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Закрыть"
                className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-3 p-4">
              <input
                type="text"
                placeholder="Ваше имя (необязательно)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full cursor-text rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-50"
              />
              <textarea
                placeholder="Сообщение (необязательно)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                onKeyDown={handleKeyDown}
                className="w-full resize-none cursor-text rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-400 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-50"
              />
              <button
                onClick={handleContact}
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
              >
                <Icon name="telegram" className="h-4 w-4" />
                Написать в Telegram
              </button>
              <p className="text-center text-xs text-slate-400">
                Откроется чат с @ivanSVVladimirovich
              </p>
            </div>
          </div>
        </>
      )}

      {/* Pulsating wavy circle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Закрыть" : "Написать в Telegram"}
        className="pointer-events-auto fixed bottom-6 right-6 z-[1000] flex h-16 w-16 cursor-pointer items-center justify-center rounded-full shadow-xl transition-transform hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        {/* Wave rings */}
        <span aria-hidden="true" className="absolute inset-0 cursor-pointer rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 ai-btn-ring-1" />
        <span aria-hidden="true" className="absolute inset-0 cursor-pointer rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 ai-btn-ring-2" />
        <span aria-hidden="true" className="absolute inset-0 cursor-pointer rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 ai-btn-ring-3" />

        {/* Main circle */}
        <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-pink-600 shadow-lg">
          <Icon
            name={open ? "arrow-left" : "telegram"}
            className="h-6 w-6 text-white"
          />
        </span>
      </button>
    </>
  );
}
