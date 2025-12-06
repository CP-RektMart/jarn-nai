import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const dbDir = path.join(projectRoot, "src", "db");
const outFile = path.join(dbDir, "all.json");

const files = fs
  .readdirSync(dbDir)
  .filter((f) => f.endsWith(".json") && f !== "all.json");

const all = files.flatMap((file) => {
  const content = fs.readFileSync(path.join(dbDir, file), "utf-8");
  const data = JSON.parse(content);
  return Array.isArray(data) ? data : [data];
});

fs.writeFileSync(outFile, JSON.stringify(all, null, 2));
console.log("Wrote", outFile, "with", all.length, "instructors");
