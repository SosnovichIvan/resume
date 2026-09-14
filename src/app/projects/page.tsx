import type { Metadata } from "next";
import { projects } from "@/entities/project/model/data";
import { ProjectCard } from "@/entities/project/ui/ProjectCard";
import { PageShell, PageHeader } from "@/shared/ui";

export const metadata: Metadata = { title: "Коммерческие проекты — Соснович Иван" };

export default function Page() {
 return <PageShell>
  <PageHeader title="Коммерческие проекты" description="Задачи, архитектура и результаты работы в командах" icon="folder" />
  <div className="space-y-6">{projects.map(item => <ProjectCard key={item.id} project={item} />)}</div>
 </PageShell>;
}
