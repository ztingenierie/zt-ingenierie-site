import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-content gap-8 px-4 py-10 text-sm text-slate2 sm:grid-cols-3">
        <div>
          <p className="font-semibold text-ink">AccessiVeille</p>
          <p className="mt-2">
            Votre site accessible. Et qui le reste. Pré-audit, veille et livrables RGAA/EAA pour
            agences et PME françaises.
          </p>
        </div>
        <nav aria-label="Liens du pied de page" className="flex flex-col gap-2">
          <Link href="/audit-gratuit" className="hover:text-primary">Scan gratuit</Link>
          <Link href="/tarifs" className="hover:text-primary">Tarifs</Link>
          <Link href="/fonctionnalites" className="hover:text-primary">Fonctionnalités</Link>
          <a href="mailto:contact@accessiveille.fr" className="hover:text-primary">contact@accessiveille.fr</a>
        </nav>
        <nav aria-label="Informations légales" className="flex flex-col gap-2">
          <Link href="/mentions-legales" className="hover:text-primary">Mentions légales</Link>
          <Link href="/cgv" className="hover:text-primary">CGV / CGU</Link>
          <Link href="/confidentialite" className="hover:text-primary">Politique de confidentialité</Link>
        </nav>
      </div>
      <p className="border-t border-slate-200 py-4 text-center text-xs text-slate2">
        © {new Date().getFullYear()} AccessiVeille — Un scan automatisé ne couvre qu'une partie des
        critères RGAA et ne constitue pas un audit de conformité.
      </p>
    </footer>
  );
}
