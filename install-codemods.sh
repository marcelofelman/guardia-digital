#!/usr/bin/env bash
set -euo pipefail

mkdir -p scripts .codemod-backups
added=0

write_file () {
  local path="$1"
  local content="$2"
  mkdir -p "$(dirname "$path")"
  printf "%s" "$content" > "$path"
  chmod +x "$path" || true
  echo "✔ Wrote $path"
  added=$((added+1))
}

CONTENT_REFACTOR='#!/usr/bin/env node
/**
 * Content refactor codemod (no deps).
 * - Remove geographic mentions (LATAM, Latinoamérica, América Latina, Argentina, México).
 * - Replace "Hardening" -> "Refuerzo de seguridad".
 * - Replace "Recuperación post-incidente" (and variants) -> "Recuperación tras un hackeo".
 * - Back up changed files into .codemod-backups/
 */
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const BACKUP_DIR = path.join(repoRoot, ".codemod-backups", `content-${Date.now()}`);
fs.mkdirSync(BACKUP_DIR, { recursive: true });

const INCLUDE_EXTS = new Set([".ts",".tsx",".js",".jsx",".md",".mdx",".json",".html",".css"]);
const EXCLUDE_DIRS = new Set([
  "node_modules",".git",".next","dist","build","out",".turbo",".vercel",".cache",".nuxt"
]);

const REPLACEMENTS = [
  { desc: "Hardening -> Refuerzo de seguridad", pattern: /\bHardening\b/gi, replace: "Refuerzo de seguridad" },
  { desc: "Recuperación post-incidente -> Recuperación tras un hackeo", pattern: /\bRecuperaci[oó]n\s+post[\s-]?incidente\b/gi, replace: "Recuperación tras un hackeo" },
  { desc: "Recuperación post incidente -> Recuperación tras un hackeo", pattern: /\bRecuperaci[oó]n\s+post\s+incidente\b/gi, replace: "Recuperación tras un hackeo" },
  { desc: "postincidente -> tras un hackeo (rare compound)", pattern: /\bpostincidente\b/gi, replace: "tras un hackeo" },

  { desc: "Remove LATAM", pattern: /\bLATAM\b/gi, replace: "" },
  { desc: "Remove LatAm", pattern: /\bLatAm\b/gi, replace: "" },
  { desc: "Remove Latinoamérica", pattern: /\bLatinoam[eé]rica\b/gi, replace: "" },
  { desc: "Remove América Latina", pattern: /\bAm[eé]rica\s+Latina\b/gi, replace: "" },
  { desc: "Remove Argentina", pattern: /\bArgentina\b/gi, replace: "" },
  { desc: "Remove México/Méjico", pattern: /\bM[eé]x(ic)o\b|\bM[eé]jico\b/gi, replace: "" },
];

const GEO_PARENTHETICALS = [
  /\s*\((?:en\s+)?(?:LATAM|LatAm|Latinoam[eé]rica|Am[eé]rica\s+Latina|Argentina|M[eé]x(ic)o|M[eé]jico)\)\s*/gi
];

let changedFiles = 0;
let changeCounts = {};

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.isDirectory()) {
      if (EXCLUDE_DIRS.has(e.name)) continue;
      walk(path.join(dir, e.name));
    } else {
      const ext = path.extname(e.name);
      if (!INCLUDE_EXTS.has(ext)) continue;
      const filePath = path.join(dir, e.name);
      refactorFile(filePath);
    }
  }
}

function refactorFile(filePath) {
  let text = fs.readFileSync(filePath, "utf8");
  let original = text;
  let fileChanges = 0;

  GEO_PARENTHETICALS.forEach((rx) => {
    text = text.replace(rx, () => {
      fileChanges++;
      inc("Remove geo parenthetical");
      return " ";
    });
  });

  for (const r of REPLACEMENTS) {
    const before = text;
    text = text.replace(r.pattern, () => {
      fileChanges++;
      inc(r.desc);
      return r.replace;
    });
    if (before !== text && r.desc.startsWith("Remove") && /\s{2,}/.test(text)) {
      text = text.replace(/\s{2,}/g, " ");
    }
  }

  if (text !== original) {
    const rel = path.relative(repoRoot, filePath);
    const backupPath = path.join(BACKUP_DIR, rel);
    fs.mkdirSync(path.dirname(backupPath), { recursive: true });
    fs.copyFileSync(filePath, backupPath);
    fs.writeFileSync(filePath, text, "utf8");
    changedFiles++;
    console.log(`✔ Updated: ${rel} (${fileChanges} changes)`);
  }
}

function inc(key) {
  changeCounts[key] = (changeCounts[key] || 0) + 1;
}

console.log("▶ Running content refactor…");
walk(repoRoot);
console.log("\\nSummary:");
console.log(`  Files changed: ${changedFiles}`);
Object.entries(changeCounts).forEach(([k, v]) => {
  console.log(`  ${k}: ${v}`);
});
console.log(`\\nBackups: ${BACKUP_DIR}`);
console.log("Done.");
'

THEME_DARKIFY='#!/usr/bin/env node
/**
 * Dark theme codemod (no deps).
 * - Sets Tailwind darkMode:"class" if tailwind.config.* exists.
 * - Adds className="dark" to <html> in app/layout.tsx (or src/app/layout.tsx) if present.
 * - Safe to re-run. Backs up changed files under .codemod-backups/
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const BACKUP_DIR = path.join(root, ".codemod-backups", `dark-${Date.now()}`);
fs.mkdirSync(BACKUP_DIR, { recursive: true });

function backupWrite(file, content) {
  const rel = path.relative(root, file);
  const backupPath = path.join(BACKUP_DIR, rel);
  fs.mkdirSync(path.dirname(backupPath), { recursive: true });
  if (fs.existsSync(file)) fs.copyFileSync(file, backupPath);
  fs.writeFileSync(file, content, "utf8");
  console.log(`✔ Updated: ${rel}`);
}

function tryFiles(files) {
  for (const f of files) {
    const p = path.join(root, f);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

// 1) Tailwind: darkMode:"class"
function patchTailwind() {
  const config = tryFiles([
    "tailwind.config.ts",
    "tailwind.config.js",
    "tailwind.config.cjs",
    "tailwind.config.mjs",
  ]);
  if (!config) {
    console.warn("⚠ Tailwind config not found. Skipping Tailwind dark mode.");
    return;
  }
  let src = fs.readFileSync(config, "utf8");

  if (/darkMode\s*:\s*["\'](?:media|class)["\']/.test(src)) {
    src = src.replace(/darkMode\s*:\s*["\'](?:media|class)["\']/, "darkMode: \\"class\\"");
    backupWrite(config, src);
    return;
  }

  const exportRegexes = [
    /(export\\s+default\\s+{)([\\s\\S]*?)(})/m,
    /(module\\.exports\\s*=\\s*{)([\\s\\S]*?)(})/m,
  ];
  let patched = false;
  for (const rx of exportRegexes) {
    if (rx.test(src)) {
      src = src.replace(rx, (m, a, b, c) => {
        if (/darkMode\\s*:/.test(b)) return m;
        const insert = "\\n  darkMode: \\"class\\",";
        return `${a}${insert}${b}${c}`;
      });
      patched = true;
      break;
    }
  }
  if (patched) {
    backupWrite(config, src);
  } else {
    console.warn("⚠ Could not detect Tailwind export shape. Please set darkMode:\'class\' manually.");
  }
}

// 2) Next.js App Router: add className="dark" on <html>
function patchNextLayout() {
  const layout = tryFiles([
    "app/layout.tsx",
    "app/layout.jsx",
    "src/app/layout.tsx",
    "src/app/layout.jsx",
  ]);
  if (!layout) {
    console.warn("⚠ app/layout.* not found. Skipping HTML dark class.");
    return;
  }
  let src = fs.readFileSync(layout, "utf8");
  const original = src;

  const htmlOpenTagRx = /<html([^>]*)>/i;
  const m = src.match(htmlOpenTagRx);
  if (!m) {
    console.warn("⚠ <html> tag not found in layout. Skipping.");
    return;
  }
  const attrs = m[1] || "";
  let newAttrs = attrs;

  newAttrs = newAttrs.replace(/\\bclass="/g, "className=\\"");

  const classNameRx = /\\bclassName\\s*=\\s*["\']([^"\']*)["\']/;
  if (classNameRx.test(newAttrs)) {
    newAttrs = newAttrs.replace(classNameRx, (mm, val) => {
      if (/\\bdark\\b/.test(val)) return mm;
      return `className="\${val} dark"`;
    });
  } else {
    newAttrs = `${newAttrs} className="dark"`;
  }

  const newOpenTag = `<html\${newAttrs}>`;
  src = src.replace(htmlOpenTagRx, newOpenTag);

  if (src !== original) {
    backupWrite(layout, src);
  } else {
    console.log("ℹ No change needed in layout (already dark).");
  }
}

console.log("▶ Applying default dark theme…");
patchTailwind();
patchNextLayout();
console.log(`Backups: \${BACKUP_DIR}`);
console.log("Done.");
'

write_file "scripts/content-refactor.mjs" "$CONTENT_REFACTOR"
write_file "scripts/theme-darkify.mjs" "$THEME_DARKIFY"

echo
echo "Created $added files."
echo "Next steps:"
echo "  node scripts/content-refactor.mjs"
echo "  node scripts/theme-darkify.mjs"
