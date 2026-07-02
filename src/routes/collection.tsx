import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame, CapsuleSafeArea, BrandMark } from "@/components/AppShell";
import { IllustrationBy, BrushLine, LeafMark } from "@/components/illustrations";
import { CONCEPTS, STORIES } from "@/lib/mock-data";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "收藏 · 事出有喻" },
      { name: "description", content: "你收藏的概念，随时回来复读。" },
    ],
  }),
  component: CollectionPage,
});

function CollectionPage() {
  // MVP: use a small demo set. Real app persists to storage.
  const [ids] = useState<string[]>(["path-dependence", "compound"]);
  const items = ids.map((id) => CONCEPTS[id]).filter(Boolean);

  return (
    <PhoneFrame>
      <CapsuleSafeArea />
      <header className="px-6 pt-3 pb-4 flex items-center justify-between">
        <BrandMark />
        <span
          className="text-[10px] tracking-[0.3em]"
          style={{ color: "var(--ink-faint)", fontFamily: "var(--font-latin)" }}
        >
          COLLECTION
        </span>
      </header>

      <div className="px-6">
        <h1
          className="text-[26px] font-medium leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          收藏
        </h1>
        <p className="mt-1 text-[12.5px]" style={{ color: "var(--ink-faint)" }}>
          {items.length > 0 ? `你收藏了 ${items.length} 个概念` : "把想再读一遍的概念留在这里"}
        </p>
      </div>

      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="px-6 mt-6 space-y-3">
          {items.map((c) => {
            const storyId = STORIES.find((s) => s.conceptId === c.id)?.id ?? STORIES[0].id;
            return (
              <li key={c.id}>
                <Link
                  to="/story/$id"
                  params={{ id: storyId }}
                  search={{ from: "concept" as const }}
                  className="flex gap-3 p-4 card-paper rise"
                >
                  <div
                    className="w-16 h-16 shrink-0 rounded-xl flex items-center justify-center"
                    style={{ background: "var(--paper-soft)", color: "var(--ink)" }}
                  >
                    <IllustrationBy kind={c.illustration} className="w-14 h-14" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] tracking-[0.2em]"
                        style={{ color: "var(--ink-faint)" }}
                      >
                        {c.domain}
                      </span>
                    </div>
                    <div
                      className="text-[16px] font-medium leading-tight mt-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {c.name}
                    </div>
                    <div className="text-[12px] mt-1 line-clamp-1" style={{ color: "var(--ink-soft)" }}>
                      {c.oneLiner}
                    </div>
                    <div
                      className="mt-2 flex items-center justify-between text-[11px]"
                      style={{ color: "var(--ink-faint)" }}
                    >
                      <span>3 天前收藏</span>
                      <span>继续阅读 →</span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </PhoneFrame>
  );
}

function EmptyState() {
  return (
    <div className="mt-16 px-6 flex flex-col items-center text-center">
      <div style={{ color: "var(--ink-soft)" }}>
        <IllustrationBy kind="seed" className="w-40 h-24" />
      </div>
      <div className="mt-5 flex items-center gap-2" style={{ color: "var(--ink-faint)" }}>
        <LeafMark className="h-3.5 w-3.5" />
        <BrushLine className="w-16 h-[6px]" />
      </div>
      <h2
        className="mt-3 text-[18px] font-medium"
        style={{ fontFamily: "var(--font-display)" }}
      >
        还没有收藏
      </h2>
      <p className="mt-2 text-[13px] max-w-[240px]" style={{ color: "var(--ink-soft)", lineHeight: 1.8 }}>
        读到一个想再看一遍的概念时，轻点收藏，它会安静地留在这里。
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px]"
        style={{
          background: "var(--ink)",
          color: "var(--paper)",
          fontFamily: "var(--font-display)",
          letterSpacing: "0.1em",
        }}
      >
        回到探索
      </Link>
    </div>
  );
}
