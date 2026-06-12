const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const docsDir = path.join(__dirname, "..", "docs");
const files = fs.readdirSync(docsDir).filter((f) => f.endsWith(".md")).sort();

let body = "";
const toc = [];
files.forEach((f, i) => {
  const md = fs.readFileSync(path.join(docsDir, f), "utf8");
  const id = `doc-${i + 1}`;
  const title = (md.match(/^#\s+(.+)$/m) || [, f])[1];
  toc.push(`<li><a href="#${id}">${title}</a></li>`);
  body += `<section id="${id}">${marked.parse(md)}</section><hr class="sep"/>`;
});

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Attriba — Dossier business complet 2026-2028</title>
<style>
  :root { --night:#0F2A43; --chantier:#F2730D; --paper:#F7F6F2; --ink:#1E232A; }
  * { box-sizing: border-box; }
  body { margin:0; font-family: -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
         background: var(--paper); color: var(--ink); line-height:1.65; font-size:16px; }
  .wrap { max-width: 760px; margin: 0 auto; padding: 16px; }
  header.hero { background: var(--night); color:#fff; padding: 32px 16px; text-align:center; }
  header.hero h1 { margin:0; font-size:1.7em; }
  header.hero p { color: rgba(255,255,255,.85); margin:.6em auto 0; max-width:560px; }
  .badge { display:inline-block; background:var(--chantier); color:#fff; border-radius:999px;
           padding:4px 14px; font-size:.8em; font-weight:700; margin-bottom:12px; }
  nav.toc { background:#fff; border:1px solid #ddd; border-radius:12px; padding:16px 16px 16px 8px; margin:20px 0; }
  nav.toc ol { margin:0; padding-left:28px; }
  nav.toc a { color: var(--night); }
  h1 { color: var(--night); font-size:1.45em; border-bottom:3px solid var(--chantier); padding-bottom:.3em; margin-top:1.6em; }
  h2 { color: var(--night); font-size:1.2em; margin-top:1.5em; }
  h3 { color: var(--night); font-size:1.05em; }
  a { color:#3E6C97; }
  blockquote { border-left:4px solid var(--chantier); margin:1em 0; padding:.4em 1em; background:#fff; border-radius:0 8px 8px 0; }
  code, pre { background:#eceae4; border-radius:6px; padding:2px 5px; font-size:.9em; }
  pre { padding:12px; overflow-x:auto; }
  .tablewrap, table { width:100%; }
  table { border-collapse:collapse; background:#fff; font-size:.85em; display:block; overflow-x:auto; }
  th, td { border:1px solid #d8d5cd; padding:7px 9px; text-align:left; vertical-align:top; }
  th { background:var(--night); color:#fff; white-space:nowrap; }
  tr:nth-child(even) td { background:#faf9f6; }
  hr.sep { border:none; border-top:4px double var(--chantier); margin:40px 0; }
  footer { text-align:center; color:#777; font-size:.85em; padding:24px; }
</style>
</head>
<body>
<header class="hero">
  <span class="badge">DOSSIER COMPLET — 2026-2028</span>
  <h1>Attriba</h1>
  <p><strong>Le mémoire technique qui gagne des marchés. Livré en 48 h.</strong><br/>
  Toute la stratégie, le business plan, le marketing, le légal et le plan d'exécution — en un seul document.</p>
</header>
<div class="wrap">
<nav class="toc"><strong>Sommaire</strong><ol>${toc.join("")}</ol></nav>
${body}
</div>
<footer>Attriba — dossier généré le ${new Date().toLocaleDateString("fr-FR")} · le code du site est dans le dépôt (voir README.md et DEPLOIEMENT.md)</footer>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, "..", "docs", "DOSSIER-COMPLET.html"), html);
console.log("OK", files.length, "documents fusionnés");
