export default function GlowDivider({ className = '' }) {
  return (
    <div className={`h-px w-full my-16 md:my-24 ${className}`}>
      <div
        className="h-full w-full max-w-6xl mx-auto"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(20, 184, 166, 0.4) 30%, rgba(56, 189, 248, 0.3) 70%, transparent)'
        }}
      />
    </div>
  );
}
