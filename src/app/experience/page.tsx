import type { Metadata } from "next";
import { experiences } from "@/entities/experience/model/data";
import { Badge, Card, Icon, PageTransition } from "@/shared/ui";
import { BackLink } from "@/shared/ui/BackLink";

export const metadata: Metadata = {
  title: "Опыт работы — Соснович Иван",
};

export default function ExperiencePage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <BackLink />
        <h1 className="mb-2 flex items-center gap-3 text-3xl font-bold">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
            <Icon name="briefcase" className="h-6 w-6" />
          </span>
          Опыт работы
        </h1>
        <p className="mb-8 text-slate-500 dark:text-slate-400">
          Общий стаж — 5 лет 5 месяцев · {experiences.length} компании
        </p>

        <div className="space-y-6">
          {experiences.map((job) => (
            <Card key={job.id} className="p-6">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{job.position}</h2>
                  <p className="font-medium text-indigo-600 dark:text-indigo-300">
                    {job.company}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-1 sm:items-end">
                  <Badge variant="muted">{job.period}</Badge>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {job.duration}
                  </span>
                </div>
              </div>

              <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
                {job.summary}
              </p>

              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Достижения
              </h3>
              <ul className="mb-5 space-y-2">
                {job.achievements.map((a) => (
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

              {job.projects && (
                <>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Проекты
                  </h3>
                  <div className="mb-5 grid gap-3 sm:grid-cols-2">
                    {job.projects.map((p) => (
                      <div
                        key={p.name}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900"
                      >
                        <h4 className="mb-2 font-semibold text-indigo-600 dark:text-indigo-300">
                          {p.name}
                        </h4>
                        <ul className="space-y-1.5">
                          {p.points.map((pt) => (
                            <li
                              key={pt}
                              className="text-xs leading-relaxed text-slate-600 dark:text-slate-300"
                            >
                              · {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div className="flex flex-wrap gap-2">
                {job.stack.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
