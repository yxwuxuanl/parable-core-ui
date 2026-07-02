/**
 * Line-art illustrations · 日系线稿 + 少量淡彩
 * All strokes use currentColor so callers can tint via text-*.
 * Wash tints use CSS variables.
 */
import type { ReactElement, SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { tint?: string };

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PathIllustration({ tint = "var(--ochre)", ...p }: Props) {
  return (
    <svg viewBox="0 0 200 140" {...p}>
      {/* soft wash */}
      <ellipse cx="100" cy="118" rx="70" ry="8" fill={tint} opacity="0.25" />
      <path d="M20 120 Q 60 60 100 70 T 180 40" {...strokeProps} />
      <path d="M30 128 Q 70 90 110 100 T 185 80" {...strokeProps} strokeDasharray="2 4" opacity="0.6" />
      {/* trees */}
      <g {...strokeProps}>
        <path d="M55 90 v 12" />
        <path d="M52 90 q 3 -8 6 0" />
        <path d="M130 55 v 10" />
        <path d="M127 55 q 3 -7 6 0" />
        <path d="M160 40 v 10" />
        <path d="M157 40 q 3 -7 6 0" />
      </g>
      {/* footprints */}
      <g fill="currentColor" opacity="0.5">
        <ellipse cx="40" cy="122" rx="2.5" ry="1.2" />
        <ellipse cx="55" cy="115" rx="2.5" ry="1.2" />
        <ellipse cx="72" cy="105" rx="2.5" ry="1.2" />
        <ellipse cx="90" cy="92" rx="2.5" ry="1.2" />
      </g>
      {/* sun */}
      <circle cx="170" cy="30" r="10" fill={tint} opacity="0.4" />
      <circle cx="170" cy="30" r="10" {...strokeProps} />
    </svg>
  );
}

export function CrowdIllustration({ tint = "var(--sage)", ...p }: Props) {
  return (
    <svg viewBox="0 0 200 140" {...p}>
      <path d="M0 110 Q 100 130 200 105" fill={tint} opacity="0.25" />
      <path d="M0 110 Q 100 130 200 105" {...strokeProps} />
      {/* figures — squatting silhouettes */}
      <g {...strokeProps}>
        {[40, 70, 100, 130, 160].map((x, i) => (
          <g key={x} transform={`translate(${x} ${105 - (i === 0 ? 0 : 2)})`}>
            <circle cx="0" cy="-24" r="4" />
            <path d="M-5 -20 Q 0 -8 5 -20" />
            <path d="M-6 -8 L -6 0" />
            <path d="M6 -8 L 6 0" />
          </g>
        ))}
      </g>
      {/* ripples */}
      <g {...strokeProps} opacity="0.5">
        <ellipse cx="100" cy="120" rx="20" ry="3" />
        <ellipse cx="100" cy="120" rx="40" ry="5" opacity="0.5" />
      </g>
    </svg>
  );
}

export function SeedIllustration({ tint = "var(--blush)", ...p }: Props) {
  return (
    <svg viewBox="0 0 200 140" {...p}>
      <path d="M0 118 Q 100 128 200 118 L 200 140 L 0 140 Z" fill={tint} opacity="0.2" />
      <path d="M0 118 Q 100 128 200 118" {...strokeProps} />
      {/* trees at various growth */}
      <g {...strokeProps}>
        <path d="M40 118 v -18" />
        <path d="M35 108 q 5 -12 10 0" />
        <path d="M90 118 v -34" />
        <circle cx="90" cy="80" r="10" fill={tint} opacity="0.35" />
        <circle cx="90" cy="80" r="10" />
        <path d="M150 118 v -52" />
        <circle cx="150" cy="60" r="16" fill={tint} opacity="0.35" />
        <circle cx="150" cy="60" r="16" />
      </g>
      {/* small seed dot */}
      <circle cx="20" cy="118" r="2" fill="currentColor" />
    </svg>
  );
}

export function RippleIllustration({ tint = "var(--mist)", ...p }: Props) {
  return (
    <svg viewBox="0 0 200 140" {...p}>
      <rect x="0" y="0" width="200" height="140" fill={tint} opacity="0.18" />
      <g {...strokeProps}>
        <circle cx="100" cy="70" r="8" />
        <circle cx="100" cy="70" r="20" opacity="0.7" />
        <circle cx="100" cy="70" r="34" opacity="0.5" />
        <circle cx="100" cy="70" r="50" opacity="0.3" />
        <circle cx="100" cy="70" r="66" opacity="0.15" />
      </g>
      <circle cx="100" cy="70" r="2" fill="currentColor" />
    </svg>
  );
}

export function MirrorIllustration({ tint = "var(--mist)", ...p }: Props) {
  return (
    <svg viewBox="0 0 200 140" {...p}>
      <rect x="70" y="20" width="60" height="90" rx="30" fill={tint} opacity="0.25" />
      <rect x="70" y="20" width="60" height="90" rx="30" {...strokeProps} />
      <path d="M85 40 q 15 -8 30 8" {...strokeProps} opacity="0.6" />
      <path d="M100 118 v 12" {...strokeProps} />
      <path d="M85 130 h 30" {...strokeProps} />
    </svg>
  );
}

export function GateIllustration({ tint = "var(--blush)", ...p }: Props) {
  return (
    <svg viewBox="0 0 200 140" {...p}>
      <path d="M0 118 h 200" {...strokeProps} />
      <g {...strokeProps}>
        <path d="M50 118 v -70" />
        <path d="M150 118 v -70" />
        <path d="M40 48 h 120" />
        <path d="M40 40 h 120" />
      </g>
      <circle cx="100" cy="80" r="14" fill={tint} opacity="0.4" />
      <circle cx="100" cy="80" r="14" {...strokeProps} />
    </svg>
  );
}

export function IllustrationBy({ kind, className, tint }: { kind: string; className?: string; tint?: string }) {
  const map: Record<string, (p: Props) => ReactElement> = {
    path: PathIllustration,
    crowd: CrowdIllustration,
    seed: SeedIllustration,
    ripple: RippleIllustration,
    mirror: MirrorIllustration,
    gate: GateIllustration,
  };
  const C = map[kind] ?? PathIllustration;
  return <C className={className} tint={tint} />;
}

/* Small decorative marks */
export function BrushLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 6" className={className} aria-hidden>
      <path d="M2 3 Q 30 0 60 3 T 118 3" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function LeafMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M4 20 C 8 8 16 6 20 4 C 18 12 12 18 4 20 Z" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 20 L 14 10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}
