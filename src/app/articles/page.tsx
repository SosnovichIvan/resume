import type { Metadata } from "next";
import { articles } from "@/entities/article/model/data";
import { Card, Icon, PageTransition } from "@/shared/ui";
import { BackLink } from "@/shared/ui/BackLink";

export const metadata: Metadata = {
  title: "Статьи — Соснович Иван",
};

export default function ArticlesPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <BackLink />
        <h1 className="mb-2 flex items-center gap-3 text-3xl font-bold">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
            <Icon name="article" className="h-6 w-6" />
          </span>
          Статьи
        </h1>
        <p className="mb-8 text-slate-500 dark:text-slate-400">
          Публикации и технические материалы
        </p>

        <div className="space-y-4">
          {articles.map((a) => (
            <a
              key={a.id}
              href={a.href}
              target="_blank"
              rel="noopener"
              className="group block"
            >
              <Card hover className="flex items-center gap-4 p-5">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${a.gradient} text-white`}
                >
                  <Icon name="article" className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
                    {a.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {a.description}
                  </p>
                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    {a.source}
                  </p>
                </div>
                <Icon
                  name="external-link"
                  className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-300"
                />
              </Card>
            </a>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
