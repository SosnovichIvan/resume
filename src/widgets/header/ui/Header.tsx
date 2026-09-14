import Image from "next/image";
import { actionClass } from "@/shared/ui/Action";
import { profile } from "@/entities/profile/model/data";
import { Icon, ExternalLink, SkillList } from "@/shared/ui";

export function Header() {
 return <header className="mb-10">
  <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
   <Image src="/avatar.jpg" alt="Фото Ивана Сосновича" width={160} height={160} priority unoptimized className="h-32 w-32 shrink-0 rounded-full border-4 border-brand-200 object-cover md:h-40 md:w-40 dark:border-brand-900" />
   <div className="min-w-0 flex-1">
    <p className="mb-2 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><span className="h-2 w-2 rounded-full bg-success-500" />Открыт к предложениям</p>
    <h1 className="mb-3 text-3xl font-extrabold sm:text-4xl">{profile.name}</h1>
    <p className="mb-2 text-xl font-medium">{profile.hero.title}</p>
    <p className="mb-3 max-w-2xl text-xl font-semibold leading-snug text-slate-900 sm:text-2xl dark:text-slate-50">{profile.hero.headline}</p>
    <p className="mb-4 max-w-2xl text-slate-600 dark:text-slate-300">{profile.hero.summary}</p>
    <p className="mb-5 text-sm text-slate-600 dark:text-slate-300">В коммерческой разработке с {profile.careerStartYear} года · {profile.location}</p>
    <div className="mb-5 flex flex-wrap gap-3">
     <a href="mailto:isosnovich@yandex.ru" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"><Icon name="mail" className="h-4 w-4" />Связаться по email</a>
     <a href="/resume.pdf" download="Соснович Иван Владимирович.pdf" className={`${actionClass} border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700`}>Скачать резюме PDF</a>
     <ExternalLink href="https://t.me/ivanSVladimirovich">Telegram</ExternalLink>
     <ExternalLink href="https://github.com/SosnovichIvan">GitHub</ExternalLink>
    </div>
    <SkillList skills={profile.hero.skills} />
   </div>
  </div>
  <ul className="mt-8 grid gap-4 sm:grid-cols-3" aria-label="Избранные результаты">
   {profile.hero.results.map(({value, label}) => <li key={value} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
    <p className="mb-1 text-xl font-bold text-brand-700 dark:text-brand-300">{value}</p><p className="text-sm text-slate-600 dark:text-slate-300">{label}</p>
   </li>)}
  </ul>
 </header>;
}
