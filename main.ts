import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One complete story in exactly six words: a trip planned
// for two, taken by one. The missing traveller is the turn.
const STORY = "He bought two tickets. Traveled alone.";

const words = STORY.trim().split(/\s+/);
if (words.length !== 6 || words.some((w) => w.length === 0)) {
  throw new Error(`entry must be exactly six words, got ${words.length}`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, STORY, "utf8");

// Read back and confirm the file holds exactly that story.
const written = readFileSync(target, "utf8");
if (written !== STORY) {
  throw new Error("entry.txt does not match the six-word story");
}
