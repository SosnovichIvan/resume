"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Icon } from "@/shared/ui";

interface ProjectImage { src: string; alt: string; caption: string; fit?: "cover" | "contain"; }
interface ProjectCarouselProps { images: ProjectImage[]; title: string; }

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
		<button type="button" aria-label={`Открыть изображение ${current + 1} на полный экран`} onClick={openFullscreen} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} className="group relative block aspect-[16/10] w-full cursor-zoom-in touch-pan-y overflow-hidden rounded-2xl border border-surface-border bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-slate-700 dark:bg-slate-800"><Image src={images[current].src} alt={images[current].alt} fill sizes="(max-width: 896px) 100vw, 896px" priority className={`${images[current].fit === "contain" ? "object-contain" : "object-cover object-top"} transition-transform duration-500 group-hover:scale-[1.015]`} /><span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">Открыть полный скриншот</span></button>
		<div className="mt-3 flex items-center gap-3"><div className="mr-auto"><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{images[current].caption}</p><span aria-live="polite" className="text-xs text-slate-500 dark:text-slate-400">{String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span></div>{images.length > 1 && <><button type="button" aria-label="Предыдущее изображение" onClick={() => show(current - 1)} className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:border-brand-400 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-500 dark:hover:text-brand-300"><Icon name="arrow-left" className="h-5 w-5" /></button><button type="button" aria-label="Следующее изображение" onClick={() => show(current + 1)} className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:border-brand-400 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-500 dark:hover:text-brand-300"><Icon name="arrow-right" className="h-5 w-5" /></button></>}</div>
		{images.length > 1 && <div aria-label="Миниатюры галереи" role="list" className="mt-4 flex gap-2 overflow-x-auto pb-1">{images.map((image, index) => <div key={image.src} role="listitem"><button type="button" aria-current={index === current} aria-label={`Показать кадр ${index + 1}: ${image.caption}`} onClick={() => show(index)} className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 bg-slate-100 p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:bg-slate-900 ${index === current ? "border-brand-600 dark:border-brand-300" : "border-transparent hover:border-brand-400"}`}><Image src={image.src} alt="" fill sizes="80px" className={image.fit === "contain" ? "object-contain" : "object-cover object-top"} /></button></div>)}</div>}
		{isFullscreen && <div role="presentation" onClick={() => setIsFullscreen(false)} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 sm:p-8"><section role="dialog" aria-modal="true" aria-label={`Полноэкранный просмотр: ${title}`} onClick={(event) => event.stopPropagation()} className="relative flex h-full w-full items-center justify-center"><button ref={closeButtonRef} type="button" aria-label="Закрыть полноэкранный просмотр" onClick={() => setIsFullscreen(false)} className="absolute right-0 top-0 z-10 rounded-lg border border-white/40 bg-black/50 p-2 text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><Icon name="close" className="h-6 w-6" /></button><Image src={images[current].src} alt={images[current].alt} width={1440} height={1020} className="max-h-full max-w-full object-contain" /></section></div>}
	</section>;
}
