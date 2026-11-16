import type { CoverFigure } from "@/data/papers";

/**
 * The diagram printed on a paper's cover, drawn by hand for that one paper
 * (there are no subject defaults). Each figure sits on a 100x100 field in
 * currentColor; strokes don't scale, so line weight holds from a spine-sized
 * thumbnail to the hero cover. Labels drop out on small covers, where they
 * would only be specks.
 *
 * To add one: add its key to CoverFigure in src/data/papers.ts, draw it
 * below, and set `figure` on the paper.
 */
export default function Figure({
  kind,
  stroke = 1.5,
  className = "",
}: {
  kind: CoverFigure;
  stroke?: number;
  className?: string;
}) {
  const line: Stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    vectorEffect: "non-scaling-stroke",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  const thin: Stroke = { ...line, strokeWidth: Math.max(stroke * 0.5, 0.75) };
  const dashed: Stroke = { ...thin, strokeDasharray: "2 3" };

  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className}>
      {FIGURES[kind]({ line, thin, dashed })}
    </svg>
  );
}

type Stroke = {
  fill: string;
  stroke: string;
  strokeWidth: number;
  vectorEffect: "non-scaling-stroke";
  strokeLinecap: "round";
  strokeLinejoin: "round";
  strokeDasharray?: string;
};
type Strokes = Record<"line" | "thin" | "dashed", Stroke>;

/** Math labels: STIX italic, like LaTeX's math mode. Hidden on small covers. */
function Label({
  x,
  y,
  children,
  anchor = "start",
  roman = false,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: "start" | "middle" | "end";
  roman?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fill="currentColor"
      stroke="none"
      fontSize={roman ? 5.5 : 7}
      className={roman ? "font-sans" : "font-math italic"}
    >
      {children}
    </text>
  );
}

const FIGURES: Record<CoverFigure, (s: Strokes) => React.ReactNode> = {
  /**
   * The complex plane: z = a + bi as a point and a vector of length r at
   * angle θ, its projections a and b, and its conjugate z̄ = a − bi mirrored
   * below the real axis. Origin (16, 60); z = (56, 28), so a = 40, b = 32,
   * r = √(40² + 32²) ≈ 51.22, θ = atan(32/40) ≈ 38.66°.
   */
  "complex-numbers": (s) => (
    <>
      {/* axes with arrowheads */}
      <path d="M4 60H97M94 57.5L97 60L94 62.5" {...s.thin} />
      <path d="M16 96V5M13.5 8L16 5L18.5 8" {...s.thin} />

      {/* |z| = r, traced as an arc through z */}
      <path d="M66.44 68.89A51.22 51.22 0 0 0 29.26 10.53" {...s.dashed} />

      {/* z and its projections onto each axis */}
      <path d="M16 60L56 28" {...s.line} />
      <path d="M56 28V60M56 28H16" {...s.dashed} />
      <path d="M25 60A9 9 0 0 0 23.03 54.38" {...s.thin} />

      {/* the conjugate, mirrored across the real axis */}
      <path d="M16 60L56 92" {...s.thin} />
      <path d="M56 60V92" {...s.dashed} />

      <circle cx={56} cy={28} r={2.4} fill="currentColor" />
      <circle cx={56} cy={92} r={2.2} fill="none" stroke="currentColor" strokeWidth={1.2} vectorEffect="non-scaling-stroke" />

      <g className="@max-[150px]:hidden">
        <Label x={59.5} y={25}>z = a + bi</Label>
        <Label x={60.5} y={95.5}>z̄ = a − bi</Label>
        <Label x={32} y={41}>r</Label>
        <Label x={28.4} y={57.6}>θ</Label>
        <Label x={58.5} y={67.5}>a</Label>
        <Label x={11.5} y={30.5} anchor="end">b</Label>
        <Label x={97} y={55.5} anchor="end" roman>Re</Label>
        <Label x={19.5} y={8.5} roman>Im</Label>
      </g>
    </>
  ),
};
