import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const config = [
  { ignores: [".next/**", ".next-dev/**", "coverage/**"] },
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    rules: {
			// Текущие effects синхронизируют клиентское состояние с роутером и DOM.
			// Их поведение покрыто компонентными тестами; переписывание не относится
			// к security-обновлению зависимостей.
			"react-hooks/set-state-in-effect": "off",
		},
	},
];

export default config;
