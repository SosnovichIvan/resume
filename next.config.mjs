/** @type {import('next').NextConfig} */

const securityHeaders = [
	// Запрет загрузки сайта во фреймах (анти-кликджекинг)
	{
		key: "X-Frame-Options",
		value: "DENY",
	},
	// Защита от MIME-sniffing
	{
		key: "X-Content-Type-Options",
		value: "nosniff",
	},
	// Блокировка активного контента (скриптов) на неизвестных источниках
	{
		key: "X-XSS-Protection",
		value: "1; mode=block",
	},
	// Strict Transport Security — включается только за HTTPS (см. DEPLOYMENT.md)
	{
		key: "Strict-Transport-Security",
		value: "max-age=31536000; includeSubDomains; preload",
	},
	// Только HTTPS-ресурсы для картинок remotePatterns
	{
		key: "Referrer-Policy",
		value: "strict-origin-when-cross-origin",
	},
	// Политика контента (базовая; см. DEPLOYMENT.md для максимального усиления)
	{
		key: "Content-Security-Policy",
		value:
			"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://images.unsplash.com; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
	},
	// Метка permissions: без геолокации, камеры, микрофона
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=()",
	},
];

const nextConfig = {
	output: "standalone",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
		],
	},
	async headers() {
		return [
			{
				source: "/:path*",
				headers: securityHeaders,
			},
		];
	},
	poweredByHeader: false,
};

export default nextConfig;
