"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Icon } from "@/shared/ui";

interface ProjectCarouselProps { images: string[]; title: string; }

export function ProjectCarousel({ images, title }: ProjectCarouselProps) {
	const [current, setCurrent] = useState(0);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const pointerStartX = useRef<number | null>(null);
	const didSwipe = useRef(false);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const show = (index: number) => setCurrent((index + images.length) % images.length);

	useEffect(() => { if (!isFullscreen) return; closeButtonRef.current?.focus(); const onKeyDown = (event: globalThis.KeyboardEvent) => { if (event.key === "Escape") setIsFullscreen(false); }; document.addEventListener("keydown", onKeyDown); return () => document.removeEventListener("keydown", onKeyDown); }, [isFullscreen]);
	if (images.length === 0) return null;
	function handleKeyDown(event: KeyboardEvent<HTMLElement>) { if (event.key === "ArrowLeft") { event.preventDefault(); show(current - 1); } if (event.key === "ArrowRight") { event.preventDefault(); show(current + 1); } if (event.key === "Home") { event.preventDefault(); show(0); } if (event.key === "End") { event.preventDefault(); show(images.length - 1); } }
	function handlePointerDown(event: PointerEvent<HTMLButtonElement>) { pointerStartX.current = event.clientX; didSwipe.current = false; }
	function handlePointerUp(event: PointerEvent<HTMLButtonElement>) { if (pointerStartX.current === null) return; const distance = event.clientX - pointerStartX.current; pointerStartX.current = null; if (Math.abs(distance) < 40) return; didSwipe.current = true; show(current + (distance < 0 ? 1 : -1)); }
	function openFullscreen() { if (didSwipe.current) { didSwipe.current = false; return; } setIsFullscreen(true); }

	return <section aria-label={`Галерея: ${title}`} role="region" tabIndex={0} onKeyDown={handleKeyDown}>
		<button type="button" aria-label={`Открыть изображение ${current + 1} на полный экран`} onClick={openFullscreen} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} className="block w-full cursor-zoom-in touch-pan-y overflow-hidden rounded-2xl border border-surface-border bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-slate-700 dark:bg-slate-800"><Image src={images[current]} alt={`${title}, экран ${current + 1}`} width={1440} height={1020} priority className="h-96 w-full object-contain sm:h-[32rem]" /></button>
		<div className="mt-3 flex items-center gap-3"><span aria-live="polite" className="mr-auto text-sm text-slate-500 dark:text-slate-400">{String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span><button type="button" aria-label="Предыдущее изображение" onClick={() => show(current - 1)} className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:border-brand-400 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-500 dark:hover:text-brand-300"><Icon name="arrow-left" className="h-5 w-5" /></button><button type="button" aria-label="Следующее изображение" onClick={() => show(current + 1)} className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:border-brand-400 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-500 dark:hover:text-brand-300"><Icon name="arrow-right" className="h-5 w-5" /></button></div>
		<div aria-label="Миниатюры галереи" role="list" className="mt-4 flex gap-2 overflow-x-auto pb-1">{images.map((image, index) => <div key={image} role="listitem"><button type="button" aria-current={index === current} aria-label={`Показать кадр ${index + 1}`} onClick={() => show(index)} className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${index === current ? "border-brand-600 dark:border-brand-300" : "border-transparent hover:border-brand-400"}`}><Image src={image} alt="" fill sizes="80px" className="object-cover" /></button></div>)}</div>
		{isFullscreen && <div role="presentation" onClick={() => setIsFullscreen(false)} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 sm:p-8"><section role="dialog" aria-label={`Полноэкранный просмотр: ${title}`} onClick={(event) => event.stopPropagation()} className="relative flex h-full w-full items-center justify-center"><button ref={closeButtonRef} type="button" aria-label="Закрыть полноэкранный просмотр" onClick={() => setIsFullscreen(false)} className="absolute right-0 top-0 z-10 rounded-lg border border-white/40 bg-black/50 p-2 text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><Icon name="close" className="h-6 w-6" /></button><Image src={images[current]} alt={`${title}, экран ${current + 1}`} width={1440} height={1020} className="max-h-full max-w-full object-contain" /></section></div>}
	</section>;
}
