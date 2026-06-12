import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="border-b border-slate-200">
      <nav aria-label="Navigation principale" className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Logo />
          <span>
            Accessi<span className="text-primary">Veille</span>
          </span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/fonctionnalites" className="hover:text-primary">
            Fonctionnalités
          </Link>
          <Link href="/tarifs" className="hover:text-primary">
            Tarifs
          </Link>
          <Link
            href="/audit-gratuit"
            className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary-dark"
          >
            Scan gratuit
          </Link>
        </div>
      </nav>
    </header>
  );
}
