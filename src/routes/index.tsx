import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PhoneFrame, CapsuleSafeArea, BrandMark } from "@/components/AppShell";
import { IllustrationBy, BrushLine } from "@/components/illustrations";
import { STORIES, FEATURED_CONCEPTS, CONCEPTS, CATEGORIES } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "事出有喻 · 用寓言理解概念" },
      { name: "description", content: "每天读一个短故事，理解一个现实中真实存在的概念。" },
    ],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  return (
    <PhoneFrame>
      <CapsuleSafeArea />
      <Header />
      <SearchBar />
      <MainStoryDeck />
      <ConceptSection />
      <FooterMark />
    </PhoneFrame>
  );
}

function Header() {
  return (
    <header className="px-6 pt-3 pb-4 flex items-center justify-between">
      <BrandMark />
      <span
        className="text-[10px] tracking-[0.3em]"
        style={{ color: "var(--ink-faint)", fontFamily: "var(--font-latin)" }}
      >
        FABLES · CONCEPTS
      </span>
    </header>
  );
}

function SearchBar() {
  return (
    <div className="px-6 pb-5">
      <Link
        to="/search"
        className="flex items-center gap-3 rounded-full px-4 py-3"
        style={{
          background: "color-mix(in oklch, var(--paper-soft) 92%, transparent)",
          border: "1px solid color-mix(in oklch, var(--ink-faint) 22%, transparent)",
          color: "var(--ink-faint)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20 L 16 16" />
        </svg>
        <span className="text-[13px]">搜索一个概念</span>
      </Link>
    </div>
  );
}

function MainStoryDeck() {
  const [idx, setIdx] = useState(0);
  const story = STORIES[idx];

  return (
    <section className="px-6">
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <h2 style={{ fontFamily: "var(--font-display)" }} className="text-[22px] font-medium leading-tight">
            事出有喻
          </h2>
          <p style={{ color: "var(--ink-faint)" }} className="text-[12px] mt-1 tracking-wide">
            今天的故事，藏着一个你或许熟悉的概念
          </p>
        </div>
      </div>

      <Link
        to="/story/$id"
        params={{ id: story.id }}
        className={`block rise wash-${story.wash} rounded-3xl overflow-hidden`}
        style={{
          border: "1px solid color-mix(in oklch, var(--ink-faint) 20%, transparent)",
          boxShadow: "var(--shadow-paper)",
        }}
      >
        <div className="px-5 pt-5">
          <div className="flex items-center gap-2 text-[11px]" style={{ color: "var(--ink-soft)" }}>
            <span
              className="px-2 py-0.5 rounded-full"
              style={{
                background: "color-mix(in oklch, var(--paper) 80%, transparent)",
                border: "1px solid color-mix(in oklch, var(--ink-faint) 25%, transparent)",
              }}
            >
              {story.domain}
            </span>
            <span style={{ color: "var(--ink-faint)" }}>· {story.minutes} 分钟</span>
          </div>
          <h3
            style={{ fontFamily: "var(--font-display)" }}
            className="mt-3 text-[26px] font-medium leading-snug"
          >
            {story.title}
          </h3>
          <p
            className="mt-2 text-[13px] leading-relaxed"
            style={{ color: "var(--ink-soft)" }}
          >
            {story.lede}
          </p>
        </div>

        <div className="px-2 pt-3" style={{ color: "var(--ink)" }}>
          <IllustrationBy kind={story.illustration} className="w-full h-[150px]" />
        </div>

        <div className="flex items-center justify-between px-5 pb-4 pt-1">
          <BeanDots total={STORIES.length} active={idx} />
          <span
            className="text-[11px] tracking-widest"
            style={{ color: "var(--ink-faint)", fontFamily: "var(--font-latin)" }}
          >
            READ →
          </span>
        </div>
      </Link>

      {/* deck navigation */}
      <div className="flex justify-center gap-1.5 mt-3">
        {STORIES.map((_, i) => (
          <button
            key={i}
            aria-label={`切换到第 ${i + 1} 个故事`}
            onClick={() => setIdx(i)}
            className="h-[6px]"
            style={{
              width: i === idx ? 22 : 6,
              borderRadius: 999,
              background: i === idx ? "var(--ink)" : "color-mix(in oklch, var(--ink) 22%, transparent)",
              transition: "all 300ms ease",
            }}
          />
        ))}
      </div>
    </section>
  );
}

function BeanDots({ total, active }: { total: number; active: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className="h-[6px]"
          style={{
            width: i === active ? 18 : 6,
            borderRadius: 999,
            background: i === active ? "var(--ink)" : "color-mix(in oklch, var(--ink) 25%, transparent)",
          }}
        />
      ))}
    </div>
  );
}

function ConceptSection() {
  const [cat, setCat] = useState<string>("全部");
  const concepts = useMemo(
    () =>
      FEATURED_CONCEPTS.map((id) => CONCEPTS[id]).filter(
        (c) => cat === "全部" || c.domain === cat
      ),
    [cat]
  );

  return (
    <section className="px-6 mt-10">
      <div className="flex items-baseline justify-between">
        <div>
          <h2 style={{ fontFamily: "var(--font-display)" }} className="text-[18px] font-medium">
            探索新概念
          </h2>
          <div style={{ color: "var(--ink-faint)" }} className="mt-1">
            <BrushLine className="w-[64px] h-[6px]" />
          </div>
        </div>
        <span
          className="text-[11px] tracking-widest"
          style={{ color: "var(--ink-faint)", fontFamily: "var(--font-latin)" }}
        >
          {concepts.length} · IDEAS
        </span>
      </div>

      {/* category chips */}
      <div className="mt-4 -mx-6 px-6 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 pb-1">
          {CATEGORIES.map((c) => {
            const active = c === cat;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className="px-3 py-1.5 text-[12px] whitespace-nowrap rounded-full"
                style={{
                  color: active ? "var(--paper)" : "var(--ink-soft)",
                  background: active ? "var(--ink)" : "transparent",
                  border: active
                    ? "1px solid var(--ink)"
                    : "1px solid color-mix(in oklch, var(--ink-faint) 30%, transparent)",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-3">
        {concepts.map((c) => (
          <li key={c.id}>
            <Link
              to="/story/$id"
              params={{ id: findStoryByConcept(c.id) ?? STORIES[0].id }}
              search={{ from: "concept" as const }}
              className="block h-full rounded-2xl p-4 rise card-paper"
            >
              <div style={{ color: "var(--ink)" }}>
                <IllustrationBy kind={c.illustration} className="w-full h-[72px]" />
              </div>
              <div className="mt-2">
                <div
                  className="text-[10px] tracking-[0.2em]"
                  style={{ color: "var(--ink-faint)" }}
                >
                  {c.domain}
                </div>
                <h3
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-[16px] font-medium leading-tight mt-1"
                >
                  {c.name}
                </h3>
                <p
                  className="text-[12px] mt-1 leading-relaxed line-clamp-2"
                  style={{ color: "var(--ink-soft)" }}
                >
                  {c.oneLiner}
                </p>
              </div>
              <div
                className="mt-3 pt-2 text-[10px] flex items-center justify-between"
                style={{
                  color: "var(--ink-faint)",
                  borderTop: "1px solid color-mix(in oklch, var(--ink-faint) 18%, transparent)",
                }}
              >
                <span>{c.readers.toLocaleString()} 人读过</span>
                <span style={{ fontFamily: "var(--font-latin)" }}>→</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function findStoryByConcept(conceptId: string): string | undefined {
  return STORIES.find((s) => s.conceptId === conceptId)?.id;
}

function FooterMark() {
  return (
    <div
      className="flex flex-col items-center gap-2 mt-12 pb-6"
      style={{ color: "var(--ink-faint)" }}
    >
      <BrushLine className="w-[80px] h-[6px]" />
      <span
        className="text-[10px] tracking-[0.4em]"
        style={{ fontFamily: "var(--font-latin)" }}
      >
        A FABLE A DAY
      </span>
    </div>
  );
}
