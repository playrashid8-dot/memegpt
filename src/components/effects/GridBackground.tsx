interface GridBackgroundProps {
  animated?: boolean;
  perspective?: boolean;
}

export default function GridBackground({ animated = false, perspective = false }: GridBackgroundProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {perspective && (
        <div className="absolute inset-x-0 top-0 h-[60%] grid-bg-perspective opacity-25 sm:opacity-40 hidden sm:block" />
      )}
      <div className={`absolute inset-0 ${animated ? "grid-bg-animated" : "grid-bg"} opacity-50 sm:opacity-80`} />
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0,255,136,0.12) 0%, transparent 55%), radial-gradient(ellipse at 85% 85%, rgba(0,240,255,0.05) 0%, transparent 40%), radial-gradient(ellipse at 10% 60%, rgba(168,85,247,0.04) 0%, transparent 35%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </div>
  );
}
