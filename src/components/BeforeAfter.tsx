import { useRef, useState } from "react";
import beforeImg from "@/assets/demo-before.jpg";
import afterImg from "@/assets/demo-after.png";

export const BeforeAfter = () => {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, next)));
  };

  return (
    <div
      ref={ref}
      className="relative w-full aspect-[3/4] sm:aspect-[4/3] max-w-2xl mx-auto rounded-2xl overflow-hidden glass-card select-none cursor-ew-resize"
      onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onClick={(e) => handleMove(e.clientX)}
    >
      {/* Before (full) */}
      <img
        src={beforeImg}
        alt="Original photo with colorful background"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      {/* After clipped */}
      <div
        className="absolute inset-0 checkered overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <img
          src={afterImg}
          alt="Cutout with transparent background"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-glow pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-gradient-primary grid place-items-center shadow-glow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary-foreground">
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-background/70 backdrop-blur text-muted-foreground border border-border/50">
        Before
      </span>
      <span className="absolute top-3 right-3 text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-primary/20 backdrop-blur text-primary border border-primary/30">
        After
      </span>
    </div>
  );
};
