import { ContactDropdown } from "@/widgets/contact-dropdown/ui/ContactDropdown";
import { ThemeToggle } from "@/widgets/theme-toggle/ui/ThemeToggle";

export function HeaderActions() {
 return <div className="flex items-center rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
  <ThemeToggle bare />
  <ContactDropdown bare />
 </div>;
}
