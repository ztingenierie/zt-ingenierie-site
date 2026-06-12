export default function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 120" className={className} role="img" aria-label="Attriba">
      <g fill="none" stroke="#F2730D" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 100 L60 20 L100 100" />
        <path d="M38 72 L98 72" stroke="currentColor" />
      </g>
      <text
        x="130"
        y="86"
        fontFamily="Inter, Arial, sans-serif"
        fontSize="64"
        fontWeight="800"
        fill="currentColor"
        letterSpacing="-1"
      >
        attriba
      </text>
      <circle cx="452" cy="80" r="7" fill="#F2730D" />
    </svg>
  );
}
