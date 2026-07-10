import Link from "next/link";
import { Icon } from "./Icon";

export function BackLink() {
	return (
		<Link
			href="/"
			className="group mb-6 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-300"
		>
			<Icon
				name="arrow-left"
				className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
			/>
			На главную
		</Link>
	);
}
