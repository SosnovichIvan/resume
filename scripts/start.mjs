import { access, cp } from "node:fs/promises";
import { parseArgs } from "node:util";

const root = new URL("../", import.meta.url);
const { values } = parseArgs({
 options: {
  hostname: { type: "string", default: "127.0.0.1" },
  port: { type: "string", default: process.env.PORT || "3000" },
 },
});
if (!/^\d+$/.test(values.port) || Number(values.port) < 1 || Number(values.port) > 65535) {
 throw new Error("Port must be an integer between 1 and 65535.");
}
const server = new URL(".next/standalone/server.js", root);
try {
 await access(server);
} catch {
 throw new Error("Production build is missing. Run npm run build first.");
}
// Match Docker: standalone needs both public files and Next's generated assets.
await cp(new URL("public/", root), new URL(".next/standalone/public/", root), { recursive: true });
await cp(new URL(".next/static/", root), new URL(".next/standalone/.next/static/", root), { recursive: true });
process.env.PORT = values.port;
process.env.HOSTNAME = values.hostname;
await import(server.href);
