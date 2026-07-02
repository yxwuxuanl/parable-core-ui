import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PhoneFrame, CapsuleSafeArea } from "@/components/AppShell";
import { IllustrationBy, LeafMark } from "@/components/illustrations";
import { CONCEPTS, STORIES } from "@/lib/mock-data";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "搜索 · 事出有喻" }] }),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const list = Object.values(CONCEPTS);
  const results = useMemo(() => {
    if (!q.trim()) return list.slice(0, 4);
    const k = q.toLowerCase();
    return list.filter(
      (c) =>
        c.name.toLowerCase().includes(k) ||
        c.oneLiner.toLowerCase().includes(k) ||
        c.domain.toLowerCase().includes(k)
    );
  }, [q]);

  return (
    <PhoneFrame>
      <CapsuleSafeArea />
      <div className="px-5 pt-3 pb-4 flex items-center gap-3">
        <Link to="/" style={{ color: "var(--ink)" }} aria-label="返回">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6 L 9 12 L 15 18" />
          </svg>
        </Link>
        <div
          className="flex-1 flex items-center gap-2 rounded-full px-4 py-2.5"
          style={{
            background: "var(--paper-soft)",
            border: "1px solid color-mix(in oklch, var(--ink-faint) 22%, transparent)",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" style={{ color: "var(--ink-faint)" }}>
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20 L 16 16" />
          </svg>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索一个概念"
            className="w-full bg-transparent outline-none text-[14px]"
            style={{ color: "var(--ink)" }}
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="text-[11px]"
              style={{ color: "var(--ink-faint)" }}
            >
              清除
            </button>
          )}
        </div>
      </div>

      {results.length === 0 ? (
        <EmptyResult q={q} />
      ) : (
        <ul className="px-6 mt-3 space-y-2">
          {!q.trim() && (
            <li
              className="pb-2 text-[10px] tracking-[0.3em]"
              style={{ color: "var(--ink-faint)", fontFamily: "var(--font-latin)" }}
            >
              大家在读
            </li>
          )}
          {results.map((c) => {
            const sid = STORIES.find((s) => s.conceptId === c.id)?.id ?? STORIES[0].id;
            return (
              <li key={c.id}>
                <button
                  onClick={() =>
                    navigate({
                      to: "/story/$id",
                      params: { id: sid },
                      search: { from: "concept" as const },
                    })
                  }
                  className="w-full flex items-center gap-3 p-3 rounded-2xl text-left"
                  style={{
                    background: "var(--card)",
                    border: "1px solid color-mix(in oklch, var(--ink-faint) 18%, transparent)",
                  }}
                >
                  <div
                    className="w-11 h-11 shrink-0 rounded-lg flex items-center justify-center"
                    style={{ background: "var(--paper-soft)", color: "var(--ink)" }}
                  >
                    <IllustrationBy kind={c.illustration} className="w-9 h-9" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className="text-[14.5px] font-medium"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {c.name}
                    </div>
                    <div className="text-[12px] mt-0.5 truncate" style={{ color: "var(--ink-soft)" }}>
                      {c.oneLiner}
                    </div>
                  </div>
                  <span style={{ color: "var(--ink-faint)", fontFamily: "var(--font-latin)" }}>→</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </PhoneFrame>
  );
}

function EmptyResult({ q }: { q: string }) {
  return (
    <div className="mt-16 flex flex-col items-center text-center px-6">
      <div style={{ color: "var(--ink-soft)" }}>
        <IllustrationBy kind="ripple" className="w-40 h-24" />
      </div>
      <div className="mt-4" style={{ color: "var(--ink-faint)" }}>
        <LeafMark className="h-4 w-4" />
      </div>
      <h2 className="mt-3 text-[17px] font-medium" style={{ fontFamily: "var(--font-display)" }}>
        没有找到「{q}」
      </h2>
      <p className="mt-2 text-[13px] max-w-[240px]" style={{ color: "var(--ink-soft)", lineHeight: 1.8 }}>
        这个词或许还在路上。换一个说法，或从首页里挑一个感兴趣的概念读读看。
      </p>
    </div>
  );
}
