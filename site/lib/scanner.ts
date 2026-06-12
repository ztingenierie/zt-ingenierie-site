export type Severity = "bloquant" | "majeur" | "mineur";

export interface Issue {
  id: string;
  rgaa: string;
  label: string;
  severity: Severity;
  count: number;
  explanation: string;
  fix: string;
}

export interface ScanResult {
  url: string;
  finalUrl: string;
  score: number;
  checksRun: number;
  checksFailed: number;
  issues: Issue[];
  scannedAt: string;
}

const PRIVATE_HOST =
  /^(localhost|127\.|0\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)|\.(local|internal)$/i;

export function validateScanUrl(raw: string): URL {
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    throw new Error("URL invalide. Exemple attendu : https://www.monsite.fr");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Seuls les protocoles http et https sont acceptés.");
  }
  if (PRIVATE_HOST.test(url.hostname) || !url.hostname.includes(".")) {
    throw new Error("Cette adresse ne peut pas être analysée.");
  }
  return url;
}

function stripComments(html: string): string {
  return html.replace(/<!--[\s\S]*?-->/g, "");
}

function tagAttrs(tag: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const re = /([a-zA-Z-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(tag))) {
    attrs[m[1].toLowerCase()] = (m[3] ?? m[4] ?? m[5] ?? "").trim();
  }
  return attrs;
}

function matchTags(html: string, name: string): string[] {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) ?? [];
}

interface Check {
  id: string;
  rgaa: string;
  label: string;
  severity: Severity;
  explanation: string;
  fix: string;
  run: (html: string) => number;
}

const CHECKS: Check[] = [
  {
    id: "img-alt",
    rgaa: "RGAA 1.1",
    label: "Images sans alternative textuelle",
    severity: "bloquant",
    explanation:
      "Chaque image porteuse d'information doit avoir un attribut alt. Sans lui, un lecteur d'écran annonce le nom du fichier ou rien du tout.",
    fix: 'Ajouter alt="description de l\'image" (ou alt="" si l\'image est purement décorative).',
    run: (html) => matchTags(html, "img").filter((t) => !("alt" in tagAttrs(t))).length,
  },
  {
    id: "html-lang",
    rgaa: "RGAA 8.3",
    label: "Langue de la page absente",
    severity: "bloquant",
    explanation:
      "L'attribut lang sur <html> permet aux synthèses vocales de choisir la bonne prononciation. Son absence rend la lecture vocale incompréhensible.",
    fix: 'Déclarer <html lang="fr"> sur l\'élément racine.',
    run: (html) => {
      const tag = matchTags(html, "html")[0];
      return tag && (tagAttrs(tag).lang ?? "") !== "" ? 0 : 1;
    },
  },
  {
    id: "title",
    rgaa: "RGAA 8.5",
    label: "Titre de page absent ou vide",
    severity: "bloquant",
    explanation:
      "Le <title> est la première information annoncée par un lecteur d'écran et le repère principal entre onglets.",
    fix: "Renseigner un <title> unique et descriptif pour chaque page.",
    run: (html) => {
      const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      return m && m[1].trim().length > 0 ? 0 : 1;
    },
  },
  {
    id: "empty-links",
    rgaa: "RGAA 6.1",
    label: "Liens sans intitulé",
    severity: "majeur",
    explanation:
      "Un lien dont le contenu est vide (icône seule, image sans alt) est annoncé « lien » sans autre information : impossible de savoir où il mène.",
    fix: "Donner un intitulé visible, un aria-label, ou un alt à l'image contenue dans le lien.",
    run: (html) => {
      const links = html.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) ?? [];
      return links.filter((a) => {
        const open = a.match(/<a\b[^>]*>/i)![0];
        const attrs = tagAttrs(open);
        if ((attrs["aria-label"] ?? "").trim() || (attrs["aria-labelledby"] ?? "").trim() || (attrs.title ?? "").trim()) return false;
        const inner = a.replace(/<a\b[^>]*>/i, "").replace(/<\/a>$/i, "");
        const hasAltImg = (inner.match(/<img\b[^>]*>/gi) ?? []).some((img) => (tagAttrs(img).alt ?? "").trim() !== "");
        const text = inner.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
        return text === "" && !hasAltImg;
      }).length;
    },
  },
  {
    id: "h1",
    rgaa: "RGAA 9.1",
    label: "Titre principal (h1) absent",
    severity: "majeur",
    explanation:
      "Sans hiérarchie de titres, la navigation rapide au lecteur d'écran (saut de titre en titre) est impossible.",
    fix: "Structurer la page avec un h1 unique puis des h2/h3 cohérents.",
    run: (html) => (matchTags(stripComments(html), "h1").length === 0 ? 1 : 0),
  },
  {
    id: "input-label",
    rgaa: "RGAA 11.1",
    label: "Champs de formulaire sans étiquette",
    severity: "majeur",
    explanation:
      "Un champ sans label associé est annoncé « édition » sans contexte : l'utilisateur ne sait pas quoi saisir.",
    fix: "Associer un <label for=\"id\">, ou à défaut un aria-label, à chaque champ.",
    run: (html) => {
      const labelFor = new Set(
        (html.match(/<label\b[^>]*>/gi) ?? []).map((l) => tagAttrs(l).for ?? "").filter(Boolean)
      );
      const fields = [...matchTags(html, "input"), ...matchTags(html, "select"), ...matchTags(html, "textarea")];
      return fields.filter((t) => {
        const a = tagAttrs(t);
        const type = (a.type ?? "text").toLowerCase();
        if (["hidden", "submit", "button", "image", "reset"].includes(type)) return false;
        return !(
          (a["aria-label"] ?? "").trim() ||
          (a["aria-labelledby"] ?? "").trim() ||
          (a.title ?? "").trim() ||
          (a.id && labelFor.has(a.id))
        );
      }).length;
    },
  },
  {
    id: "iframe-title",
    rgaa: "RGAA 2.1",
    label: "Cadres (iframe) sans titre",
    severity: "mineur",
    explanation:
      "Chaque iframe doit avoir un attribut title décrivant son contenu pour être identifiable au lecteur d'écran.",
    fix: 'Ajouter title="Description du contenu du cadre" à chaque <iframe>.',
    run: (html) => matchTags(html, "iframe").filter((t) => (tagAttrs(t).title ?? "").trim() === "").length,
  },
  {
    id: "empty-buttons",
    rgaa: "RGAA 11.9",
    label: "Boutons sans intitulé",
    severity: "majeur",
    explanation:
      "Un bouton vide (icône seule) est annoncé « bouton » sans indication d'action.",
    fix: "Ajouter un texte visible ou un aria-label décrivant l'action du bouton.",
    run: (html) => {
      const buttons = html.match(/<button\b[^>]*>[\s\S]*?<\/button>/gi) ?? [];
      return buttons.filter((b) => {
        const open = b.match(/<button\b[^>]*>/i)![0];
        const attrs = tagAttrs(open);
        if ((attrs["aria-label"] ?? "").trim() || (attrs["aria-labelledby"] ?? "").trim() || (attrs.title ?? "").trim()) return false;
        const text = b.replace(/<[^>]+>/g, "").trim();
        return text === "";
      }).length;
    },
  },
  {
    id: "zoom-blocked",
    rgaa: "RGAA 10.4",
    label: "Zoom utilisateur bloqué",
    severity: "majeur",
    explanation:
      "user-scalable=no ou maximum-scale=1 empêche les personnes malvoyantes d'agrandir le texte sur mobile.",
    fix: "Retirer user-scalable=no et maximum-scale de la balise meta viewport.",
    run: (html) => {
      const metas = matchTags(html, "meta").filter((m) => (tagAttrs(m).name ?? "").toLowerCase() === "viewport");
      return metas.some((m) => /user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*1(\.0*)?\b/i.test(tagAttrs(m).content ?? "")) ? 1 : 0;
    },
  },
  {
    id: "doc-structure",
    rgaa: "RGAA 12.6",
    label: "Zones de navigation non identifiées",
    severity: "mineur",
    explanation:
      "Les zones principales (navigation, contenu, pied de page) doivent être identifiables via les balises sémantiques ou les rôles ARIA pour permettre la navigation rapide.",
    fix: "Utiliser <nav>, <main>, <footer> (ou role=navigation/main/contentinfo).",
    run: (html) => {
      const hasMain = matchTags(html, "main").length > 0 || /role\s*=\s*["']?main/i.test(html);
      const hasNav = matchTags(html, "nav").length > 0 || /role\s*=\s*["']?navigation/i.test(html);
      return hasMain && hasNav ? 0 : 1;
    },
  },
];

const SEVERITY_WEIGHT: Record<Severity, number> = { bloquant: 3, majeur: 2, mineur: 1 };

export function analyzeHtml(html: string, url: string, finalUrl: string): ScanResult {
  const issues: Issue[] = [];
  let failedWeight = 0;
  let totalWeight = 0;

  for (const check of CHECKS) {
    totalWeight += SEVERITY_WEIGHT[check.severity];
    let count = 0;
    try {
      count = check.run(html);
    } catch {
      continue;
    }
    if (count > 0) {
      failedWeight += SEVERITY_WEIGHT[check.severity];
      issues.push({
        id: check.id,
        rgaa: check.rgaa,
        label: check.label,
        severity: check.severity,
        count,
        explanation: check.explanation,
        fix: check.fix,
      });
    }
  }

  const order: Severity[] = ["bloquant", "majeur", "mineur"];
  issues.sort((a, b) => order.indexOf(a.severity) - order.indexOf(b.severity));

  return {
    url,
    finalUrl,
    score: Math.round(((totalWeight - failedWeight) / totalWeight) * 100),
    checksRun: CHECKS.length,
    checksFailed: issues.length,
    issues,
    scannedAt: new Date().toISOString(),
  };
}

export async function fetchPage(url: URL): Promise<{ html: string; finalUrl: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12_000);
  try {
    const res = await fetch(url.toString(), {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "AccessiVeille-Scan/0.1 (+https://accessiveille.fr/audit-gratuit)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    if (!res.ok) {
      throw new Error(`Le site a répondu avec le statut ${res.status}.`);
    }
    const reader = res.body?.getReader();
    if (!reader) throw new Error("Réponse illisible.");
    const chunks: Uint8Array[] = [];
    let received = 0;
    const MAX = 2_000_000;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.length;
      chunks.push(value);
      if (received > MAX) {
        controller.abort();
        break;
      }
    }
    const html = new TextDecoder("utf-8").decode(
      chunks.reduce((acc, c) => {
        const merged = new Uint8Array(acc.length + c.length);
        merged.set(acc);
        merged.set(c, acc.length);
        return merged;
      }, new Uint8Array(0))
    );
    return { html, finalUrl: res.url || url.toString() };
  } finally {
    clearTimeout(timer);
  }
}
