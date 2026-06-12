import Link from "next/link";
import Logo from "./Logo";

const links = [
  { href: "/offre", label: "Notre offre" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-night/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" aria-label="Accueil Attriba" className="text-night">
          <Logo className="h-9 w-auto" />
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-night">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hidden hover:text-chantier sm:block">
              {l.label}
            </Link>
          ))}
          <Link
            href="/tarifs"
            className="rounded-lg bg-chantier px-4 py-2 font-semibold text-white shadow hover:bg-chantier/90"
          >
            Commander un mémoire
          </Link>
        </nav>
      </div>
    </header>
  );
}
