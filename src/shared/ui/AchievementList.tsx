import { Icon } from "./Icon";

export function AchievementList({ items }: { items: string[] }) {
 return <ul className="mb-5 space-y-2">
  {items.map(item => <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
   <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-success-600 dark:text-success-400" />
   <span>{item}</span>
  </li>)}
 </ul>;
}
