export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="60" height="60" rx="14" fill="#1D4ED8" />
      <path
        d="M8 32c6-10.5 14.5-16 24-16s18 5.5 24 16c-6 10.5-14.5 16-24 16S14 42.5 8 32z"
        fill="#fff"
      />
      <circle cx="32" cy="32" r="11" fill="#0B1220" />
      <path
        d="M26.5 32.5l4 4 7.5-8"
        stroke="#fff"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
