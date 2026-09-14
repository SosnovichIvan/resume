import type { Metadata } from "next";
import { personalProjects } from "@/entities/personal-project/model/data";
import { PersonalProjectCard } from "@/entities/personal-project/ui/PersonalProjectCard";
import { PageShell, PageHeader } from "@/shared/ui";

export const metadata: Metadata = { title: "Личные проекты — Соснович Иван" };

export default function Page() {
 return <PageShell>
  <PageHeader title="Личные проекты" description="Продукты и эксперименты с использованием ИИ" icon="laptop" />
  <div className="space-y-6">{personalProjects.map(item => <PersonalProjectCard key={item.id} project={item} />)}</div>
 </PageShell>;
}
