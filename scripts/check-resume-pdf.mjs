import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const root = new URL("../", import.meta.url);
const manifest = JSON.parse(readFileSync(new URL("scripts/resume-pdf-manifest.json", root), "utf8"));
const expected = ["profile", "experience", "project", "personal-project", "education", "publication"]
 .map(entity => `src/entities/${entity}/model/data.json`);
expected.push("scripts/generate_resume_pdf.py", "public/avatar.jpg", "public/resume.pdf");
const stale = expected.filter(file => {
 const hash = createHash("sha256").update(readFileSync(new URL(file, root))).digest("hex");
 return manifest[file] !== hash;
});
if (stale.length) {
 console.error(`PDF is out of date (${stale.join(", ")}). Run npm run pdf, inspect the result, and commit the PDF and manifest together.`);
 process.exitCode = 1;
} else {
 console.log("PDF matches the current resume data and generator.");
}
