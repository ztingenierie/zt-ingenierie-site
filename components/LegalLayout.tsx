export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-extrabold text-night">{title}</h1>
      <p className="mt-2 text-sm text-ink/60">Dernière mise à jour : {updated}</p>
      <div className="prose-legal mt-8 space-y-6 text-ink/90 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-night [&_li]:ml-5 [&_li]:list-disc [&_p]:leading-relaxed">
        {children}
      </div>
    </div>
  );
}
