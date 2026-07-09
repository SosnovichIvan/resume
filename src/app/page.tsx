import { profile } from "@/entities/profile/model/data";
import { experiences } from "@/entities/experience/model/data";
import { skillCategories } from "@/entities/skill/model/data";
import { articles } from "@/entities/article/model/data";
import { projects } from "@/entities/project/model/data";
import {
  Badge,
  Card,
  Icon,
  SectionHeader,
  PageTransition,
  FadeInSection,
} from "@/shared/ui";
import { Header } from "@/widgets/header/ui/Header";

export default function HomePage() {
  const lastJob = experiences[0];
  const topSkills = skillCategories.slice(0, 3);
  const topProjects = projects.slice(0, 2);
  const lastArticle = articles[0];

  return (
    <PageTransition>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Header />

        {/* About + Contacts */}
        <FadeInSection>
          <div className="mb-10 grid gap-6 md:grid-cols-3">
            <Card className="p-6 md:col-span-2">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <Icon name="user" className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                Обо мне
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {profile.about}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                Открыт к предложениям
              </div>
            </Card>
            <Card className="p-6">
              <h2 className="mb-3 text-lg font-semibold">Контакты</h2>
              <div className="space-y-2.5">
                {profile.contacts.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener"
                    className="flex items-center gap-3 text-sm text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-300"
                  >
                    <Icon name={c.icon} className="h-4 w-4 shrink-0" />
                    <span className="truncate">{c.value}</span>
                  </a>
                ))}
              </div>
            </Card>
          </div>
        </FadeInSection>

        {/* Experience preview: only last job */}
        <FadeInSection delay={0.05}>
          <div className="mb-10">
            <SectionHeader
              icon="briefcase"
              title="Опыт работы"
              viewAllHref="/experience"
              viewAllLabel={`Все места работы (${experiences.length})`}
            />
            <Card hover className="p-6">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{lastJob.position}</h3>
                  <p className="font-medium text-indigo-600 dark:text-indigo-300">
                    {lastJob.company}
                  </p>
                </div>
                <Badge variant="muted">{lastJob.period}</Badge>
              </div>
              <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
                {lastJob.summary}
              </p>
              <ul className="mb-4 space-y-2">
                {lastJob.achievements.slice(0, 3).map((a) => (
                  <li
                    key={a}
                    className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
                  >
                    <Icon
                      name="check"
                      className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400"
                    />
                    {a}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {lastJob.stack.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </Card>
          </div>
        </FadeInSection>

        {/* Skills preview */}
        <FadeInSection delay={0.05}>
          <div className="mb-10">
            <SectionHeader
              icon="code"
              title="Навыки"
              viewAllHref="/skills"
              viewAllLabel={`Все навыки (${skillCategories.length} категорий)`}
            />
            <div className="grid gap-4 sm:grid-cols-3">
              {topSkills.map((cat) => (
                <Card key={cat.id} hover className="p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-semibold">{cat.title}</h3>
                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">
                      {cat.level}%
                    </span>
                  </div>
                  <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"
                      style={{ width: `${cat.level}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.slice(0, 4).map((s) => (
                      <Badge key={s} variant="muted">
                        {s}
                      </Badge>
                    ))}
                    {cat.skills.length > 4 && (
                      <Badge variant="muted">+{cat.skills.length - 4}</Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* Projects preview */}
        <FadeInSection delay={0.05}>
          <div className="mb-10">
            <SectionHeader
              icon="folder"
              title="Проекты"
              viewAllHref="/projects"
              viewAllLabel={`Все проекты (${projects.length})`}
            />
            <div className="grid gap-4 md:grid-cols-2">
              {topProjects.map((p) => (
                <Card key={p.id} hover className="flex flex-col p-6">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="font-semibold">{p.name}</h3>
                    <Badge variant="muted">{p.company}</Badge>
                  </div>
                  <p className="mb-4 flex-1 text-sm text-slate-600 dark:text-slate-300">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* Articles preview */}
        <FadeInSection delay={0.05}>
          <div className="mb-10">
            <SectionHeader
              icon="article"
              title="Статьи"
              viewAllHref="/articles"
            />
            <a
              href={lastArticle.href}
              target="_blank"
              rel="noopener"
              className="group block"
            >
              <Card hover className="flex items-center gap-4 p-5">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${lastArticle.gradient} text-white`}
                >
                  <Icon name="article" className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
                    {lastArticle.title}
                  </h3>
                  <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
                    {lastArticle.description}
                  </p>
                </div>
                <Icon
                  name="external-link"
                  className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-300"
                />
              </Card>
            </a>
          </div>
        </FadeInSection>

        <footer className="border-t border-slate-200 pt-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          © 2026 Соснович Иван · React · Next.js · FSD · Tailwind
        </footer>
      </div>
    </PageTransition>
  );
}
