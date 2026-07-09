export interface SkillCategory {
  id: string;
  title: string;
  level: number;
  skills: string[];
  description: string;
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    level: 95,
    description:
      "Основная специализация: сложные интерфейсы, высоконагруженные списки, формы, real-time данные.",
    skills: [
      "React.js",
      "TypeScript",
      "Next.js",
      "Redux / Redux Toolkit",
      "Vue.js",
      "Material UI",
      "Ant Design",
      "Styled Components",
      "Sass / CSS",
      "Formik",
      "Web Workers",
      "WebSockets",
      "Axios",
      "БЭМ",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    level: 85,
    description:
      "Проектирование API, авторизация, работа с БД и real-time каналами.",
    skills: [
      "NestJS",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "MongoDB",
      "JWT / Role Guard",
      "REST API",
      "Протоколы обмена сообщениями",
      "Go (базово)",
    ],
  },
  {
    id: "infra",
    title: "Сборка и инфраструктура",
    level: 80,
    description: "Сборка, контейнеризация и деплой приложений.",
    skills: ["Webpack", "Vite", "Docker", "Nginx", "npm", "CI/CD"],
  },
  {
    id: "testing",
    title: "Тестирование и качество",
    level: 90,
    description:
      "Автоматизированное тестирование и инженерные практики качества кода.",
    skills: [
      "Jest",
      "Vitest",
      "Cypress",
      "Code Review",
      "SOLID",
      "FSD-архитектура",
      "Рефакторинг кода",
      "Структуры данных",
    ],
  },
  {
    id: "soft",
    title: "Лидерство и процессы",
    level: 90,
    description:
      "Управление командами разработки и выстраивание процессов.",
    skills: [
      "Руководство командой (до 3 чел.)",
      "Наставничество",
      "Груминг задач",
      "Планирование спринтов",
      "Проведение собеседований",
      "Формирование контрактов API",
      "Тайм-менеджмент",
    ],
  },
];

export interface Education {
  title: string;
  org: string;
  year: string;
  kind: "education" | "course";
}

export const education: Education[] = [
  {
    title: "Информационные системы и технологии",
    org: "Московский технологический институт",
    year: "н. в.",
    kind: "education",
  },
  {
    title: "Мидл фронтенд-разработчик",
    org: "Яндекс Практикум",
    year: "2021",
    kind: "course",
  },
  {
    title: "Frontend Developer",
    org: "Elbrus Bootcamp",
    year: "2021",
    kind: "course",
  },
  {
    title: "Фронтенд-разработчик",
    org: "Яндекс Практикум",
    year: "2020",
    kind: "course",
  },
];
