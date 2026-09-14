import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const result = spawnSync(process.env.RESUME_PYTHON || "python3", [fileURLToPath(new URL("generate_resume_pdf.py", import.meta.url))], { stdio: "inherit" });
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
