import Studio from "@/components/Studio";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-6 sm:px-6">
      <header className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-accent text-lg font-black text-white shadow-lg shadow-brand/40">
            Z
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight">ZT Video Studio</div>
            <div className="text-[11px] text-white/40">Générateur vidéo IA</div>
          </div>
        </div>
        <a
          href="https://fal.ai/dashboard/keys"
          target="_blank"
          rel="noreferrer"
          className="btn-ghost"
        >
          Connecter une clé
        </a>
      </header>

      <section className="relative mt-6 overflow-hidden rounded-3xl border border-white/10 bg-ink-800/40 px-6 py-12 text-center sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-grid-glow" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Veo 3.1 · Kling 3.0 · Seedance 2.0 · Minimax · Wan
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            Des vidéos{" "}
            <span className="bg-gradient-to-r from-brand-400 via-accent to-brand-400 bg-clip-text text-transparent">
              ultra-réalistes
            </span>{" "}
            depuis un simple prompt
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/60 sm:text-lg">
            Décris ta scène, ajoute une ou plusieurs images de référence, choisis
            un mouvement caméra — et laisse le modèle générer ta vidéo.
          </p>
        </div>
      </section>

      <Studio />
    </main>
  );
}
