export interface Article {
  id: string;
  title: string;
  description: string;
  href: string;
  source: string;
  gradient: string;
}

export const articles: Article[] = [
  {
    id: "habr-sber",
    title: "Статья в блоге Сбербанка",
    description:
      "Публикация в корпоративном блоге Сбербанка на Хабре о фронтенд-разработке.",
    href: "https://habr.com/ru/companies/sberbank/articles/959400/",
    source: "habr.com",
    gradient: "from-blue-500 to-purple-600",
  },
];
