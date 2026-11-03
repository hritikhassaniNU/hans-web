export default function ProductPlate({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1" role="img" aria-label={`Photo of ${label} to follow`}>
      <circle cx="100" cy="100" r="62" />
      <circle cx="100" cy="100" r="40" strokeDasharray="3 4" />
      <circle cx="100" cy="100" r="14" />
      <path d="M100 18v28M100 154v28M18 100h28M154 100h28" />
      <text x="100" y="196" textAnchor="middle" fill="currentColor" stroke="none" fontSize="9" fontFamily="var(--mono)">Photo to follow</text>
    </svg>
  );
}
