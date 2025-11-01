#!/usr/bin/env node
/**
 * Dark theme codemod (no deps).
 * - Sets Tailwind darkMode:'class' if tailwind.config.* exists.
 * - Adds className="dark" to <html> in app/layout.tsx (or src/app/layout.tsx) if present.
 * - Safe to re-run. Backs up changed files under .codemod-backups/
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const BACKUP_DIR = path.join(root, '.codemod-backups', `dark-${Date.now()}`);
fs.mkdirSync(BACKUP_DIR, { recursive: true });

function backupWrite(file, content) {
  const rel = path.relative(root, file);
  const backupPath = path.join(BACKUP_DIR, rel);
  fs.mkdirSync(path.dirname(backupPath), { recursive: true });
  if (fs.existsSync(file)) fs.copyFileSync(file, backupPath);
  fs.writeFileSync(file, content, 'utf8');
  console.log(`✔ Updated: ${rel}`);
}

function tryFiles(files) {
  for (const f of files) {
    const p = path.join(root, f);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

// 1) Tailwind: darkMode:'class'
function patchTailwind() {
  const config = tryFiles([
    'tailwind.config.ts',
    'tailwind.config.js',
    'tailwind.config.cjs',
    'tailwind.config.mjs'
  ]);
  if (!config) {
    console.warn('⚠ Tailwind config not found. Skipping Tailwind dark mode.');
    return;
  }
  let src = fs.readFileSync(config, 'utf8');

  // If darkMode already set, replace its value with 'class'
  if (/darkMode\s*:\s*['"`](?:media|class)['"`]/.test(src)) {
    src = src.replace(/darkMode\s*:\s*['"`](?:media|class)['"`]/, "darkMode: 'class'");
    backupWrite(config, src);
    return;
  }

  // Try to insert darkMode near top-level config export
  const exportRegexes = [
    /(export\s+default\s+{)([\s\S]*?)(})/m,
    /(module\.exports\s*=\s*{)([\s\S]*?)(})/m
  ];
  let patched = false;
  for (const rx of exportRegexes) {
    if (rx.test(src)) {
      src = src.replace(rx, (m, a, b, c) => {
        if (/darkMode\s*:/.test(b)) return m; // already has some darkMode; leave it
        const insert = `\n  darkMode: 'class',`;
        return `${a}${insert}${b}${c}`;
      });
      patched = true;
      break;
    }
  }
  if (patched) {
    backupWrite(config, src);
  } else {
    console.warn("⚠ Could not detect Tailwind export shape. Please set darkMode:'class' manually.");
  }
}

// 2) Next.js App Router: add className="dark" on <html>
function patchNextLayout() {
  const layout = tryFiles([
    'app/layout.tsx',
    'app/layout.jsx',
    'src/app/layout.tsx',
    'src/app/layout.jsx'
  ]);
  if (!layout) {
    console.warn('⚠ app/layout.* not found. Skipping HTML dark class.');
    return;
  }
  let src = fs.readFileSync(layout, 'utf8');
  const original = src;

  // Find the <html ...> opening tag and ensure className includes 'dark'
  const htmlOpenTagRx = /<html([^>]*)>/i;
  const m = src.match(htmlOpenTagRx);
  if (!m) {
    console.warn('⚠ <html> tag not found in layout. Skipping.');
    return;
  }
  const attrs = m[1] || '';
  let newAttrs = attrs;

  // Normalize class="..." -> className="..."
  newAttrs = newAttrs.replace(/\bclass="/g, 'className="');

  // If className exists, append; else add
  const classNameRx = /\bclassName\s*=\s*["']([^"']*)["']/;
  if (classNameRx.test(newAttrs)) {
    newAttrs = newAttrs.replace(classNameRx, (mm, val) => {
      if (/\bdark\b/.test(val)) return mm;
      return `className="${val} dark"`;
    });
  } else {
    newAttrs = `${newAttrs} className="dark"`;
  }

  const newOpenTag = `<html${newAttrs}>`;
  src = src.replace(htmlOpenTagRx, newOpenTag);

  if (src !== original) {
    backupWrite(layout, src);
  } else {
    console.log('ℹ No change needed in layout (already dark).');
  }
}

console.log('▶ Applying default dark theme…');
patchTailwind();
patchNextLayout();
console.log(`Backups: ${BACKUP_DIR}`);
console.log('Done.');
