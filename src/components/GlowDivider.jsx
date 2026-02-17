export default function GlowDivider({ className = '' }) {
  return (
    <div className={`h-px w-full my-16 md:my-24 ${className}`}>
      <div
        className="h-full w-full max-w-6xl mx-auto"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--color-border-hover) 30%, var(--color-border-hover) 70%, transparent)'
        }}
      />
    </div>
  );
}
