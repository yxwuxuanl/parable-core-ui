import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LeafMark } from "./illustrations";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh w-full" style={{ background: "oklch(0.93 0.014 82)" }}>
      <div className="phone-frame paper-grain overflow-hidden">
        <div className="paper-grain-overlay" />
        <div className="relative z-10 pb-[92px]">{children}</div>
        <BottomTab />
      </div>
    </div>
  );
}

function BottomTab() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const items = [
    { to: "/", label: "探索", icon: ExploreIcon },
    { to: "/collection", label: "收藏", icon: BookmarkIcon },
  ] as const;

  return (
    <nav
      className="absolute bottom-0 left-0 right-0 z-20"
      style={{
        background: "color-mix(in oklch, var(--paper) 92%, transparent)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid color-mix(in oklch, var(--ink-faint) 20%, transparent)",
      }}
    >
      <ul className="flex items-stretch justify-around px-6 pt-2 pb-6">
        {items.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? path === "/" : path.startsWith(to);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className="flex flex-col items-center gap-1 py-1"
                style={{ color: active ? "var(--ink)" : "var(--ink-faint)" }}
              >
                <Icon active={active} />
                <span
                  className="text-[11px] tracking-wider"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ExploreIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 1.6 : 1.3} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9 L 10.5 10.5 L 9 15 L 13.5 13.5 Z" fill={active ? "currentColor" : "none"} opacity={active ? 0.8 : 1} />
    </svg>
  );
}
function BookmarkIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 1.4 : 1.3} strokeLinecap="round" strokeLinejoin="round" opacity={active ? 0.9 : 1}>
      <path d="M6 4 h 12 v 17 l -6 -4 l -6 4 Z" />
    </svg>
  );
}

export function CapsuleSafeArea() {
  // Reserve space for WeChat mini-program capsule area
  return <div aria-hidden style={{ height: 44 }} />;
}

export function BrandMark({ className }: { className?: string }) {
  return (
    <div className={"flex items-center gap-2 " + (className ?? "")}>
      <LeafMark className="h-4 w-4" />
      <span
        style={{ fontFamily: "var(--font-display)", letterSpacing: "0.25em", fontWeight: 500 }}
        className="text-[13px]"
      >
        事出有喻
      </span>
    </div>
  );
}
