#!/usr/bin/env node
/**
 * Content refactor codemod (no deps).
 * - Remove geographic mentions (LATAM, Latinoamérica, América Latina, Argentina, México).
 * - Replace "Hardening" -> "Refuerzo de seguridad".
 * - Replace "Recuperación post-incidente" (and variants) -> "Recuperación tras un hackeo".
 * - Back up changed files into .codemod-backups/
 */
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const BACKUP_DIR = path.join(repoRoot, '.codemod-backups', `content-${Date.now()}`);
fs.mkdirSync(BACKUP_DIR, { recursive: true });

const INCLUDE_EXTS = new Set(['.ts','.tsx','.js','.jsx','.md','.mdx','.json','.html','.css']);
const EXCLUDE_DIRS = new Set([
  'node_modules','.git','.next','dist','build','out','.turbo','.vercel','.cache','.nuxt'
]);

// ---- Replacement rules ----
const REPLACEMENTS = [
  { desc: 'Hardening -> Refuerzo de seguridad', pattern: /\bHardening\b/gi, replace: 'Refuerzo de seguridad' },

  { desc: 'Recuperación post-incidente -> Recuperación tras un hackeo',
    pattern: /\bRecuperaci[oó]n\s+post[\s-]?incidente\b/gi, replace: 'Recuperación tras un hackeo' },
  { desc: 'Recuperación post incidente -> Recuperación tras un hackeo',
    pattern: /\bRecuperaci[oó]n\s+post\s+incidente\b/gi, replace: 'Recuperación tras un hackeo' },
  { desc: 'postincidente -> tras un hackeo (rare compound)',
    pattern: /\bpostincidente\b/gi, replace: 'tras un hackeo' },

  // Remove geography mentions
  { desc: 'Remove LATAM', pattern: /\bLATAM\b/gi, replace: '' },
  { desc: 'Remove LatAm', pattern: /\bLatAm\b/gi, replace: '' },
  { desc: 'Remove Latinoamérica', pattern: /\bLatinoam[eé]rica\b/gi, replace: '' },
  { desc: 'Remove América Latina', pattern: /\bAm[eé]rica\s+Latina\b/gi, replace: '' },
  { desc: 'Remove Argentina', pattern: /\bArgentina\b/gi, replace: '' },
  { desc: 'Remove México/Méjico', pattern: /\bM[eé]x(ic)o\b|\bM[eé]jico\b/gi, replace: '' },
];

const GEO_PARENTHETICALS = [
  // Remove parenthetical geography like "(en LATAM)" "(Latinoamérica)" etc.
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
  let text = fs.readFileSync(filePath, 'utf8');
  let original = text;
  let fileChanges = 0;

  // Remove parenthetical geography
  GEO_PARENTHETICALS.forEach((rx) => {
    text = text.replace(rx, () => {
      fileChanges++;
      inc('Remove geo parenthetical');
      return ' ';
    });
  });

  // Simple replacements
  for (const r of REPLACEMENTS) {
    const before = text;
    text = text.replace(r.pattern, () => {
      fileChanges++;
      inc(r.desc);
      return r.replace;
    });
    if (before !== text && r.desc.startsWith('Remove') && /\s{2,}/.test(text)) {
      // collapse double spaces introduced by removals
      text = text.replace(/\s{2,}/g, ' ');
    }
  }

  if (text !== original) {
    // Backup and write
    const rel = path.relative(repoRoot, filePath);
    const backupPath = path.join(BACKUP_DIR, rel);
    fs.mkdirSync(path.dirname(backupPath), { recursive: true });
    fs.copyFileSync(filePath, backupPath);
    fs.writeFileSync(filePath, text, 'utf8');
    changedFiles++;
    console.log(`✔ Updated: ${rel} (${fileChanges} changes)`);
  }
}

function inc(key) {
  changeCounts[key] = (changeCounts[key] || 0) + 1;
}

console.log('▶ Running content refactor…');
walk(repoRoot);
console.log('\nSummary:');
console.log(`  Files changed: ${changedFiles}`);
Object.entries(changeCounts).forEach(([k, v]) => {
  console.log(`  ${k}: ${v}`);
});
console.log(`\nBackups: ${BACKUP_DIR}`);
console.log('Done.');
