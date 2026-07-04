import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { PhoneFrame, CapsuleSafeArea } from "@/components/AppShell";
import { IllustrationBy, BrushLine, LeafMark } from "@/components/illustrations";
import { getStory, getConcept, CONCEPTS } from "@/lib/mock-data";

export const Route = createFileRoute("/concept/$id")({
  validateSearch: z.object({
    guessed: z.string().optional(),
  }),
  head: ({ params }) => {
    const story = getStory(params.id);
    const concept = story ? getConcept(story.conceptId) : undefined;
    return {
      meta: [
        { title: concept ? `${concept.name} · 事出有喻` : "解读 · 事出有喻" },
        { name: "description", content: concept?.oneLiner ?? "" },
      ],
    };
  },
  component: ConceptPage,
});

function ConceptPage() {
  const { id } = Route.useParams();
  const { guessed } = Route.useSearch();
  const story = getStory(id);
  const concept = story ? getConcept(story.conceptId) : undefined;

  const [whyOpen, setWhyOpen] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  if (!story || !concept) {
    return (
      <PhoneFrame>
        <div className="p-8 text-center" style={{ color: "var(--ink-soft)" }}>
          没有找到内容。
        </div>
      </PhoneFrame>
    );
  }

  const wrongGuess = guessed && guessed !== concept.id ? getConcept(guessed) : undefined;

  return (
    <PhoneFrame>
      <div className="sticky top-0 z-20 flex items-center justify-between px-5 pt-3 pb-3"
        style={{
          background: "color-mix(in oklch, var(--paper) 88%, transparent)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid color-mix(in oklch, var(--ink-faint) 18%, transparent)",
        }}
      >
        <Link to="/story/$id" params={{ id }} search={{ from: undefined, guessed: undefined }} style={{ color: "var(--ink)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6 L 9 12 L 15 18" />
          </svg>
        </Link>
        <div className="text-[13px]" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.05em" }}>
          解读
        </div>
        <div className="w-5" />
      </div>
      <CapsuleSafeArea />

      {/* Reveal header */}
      <div className={`wash-${concept.wash ?? story.wash} px-6 pt-5 pb-9`}>
        <div className="flex items-center gap-2" style={{ color: "var(--ink-faint)" }}>
          <LeafMark className="h-3.5 w-3.5 shrink-0" />
          <span
            className="text-[10px] tracking-[0.35em]"
            style={{ fontFamily: "var(--font-latin)" }}
          >
            THE STORY IS ABOUT
          </span>
          <span
            className="text-[12px] leading-none"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink-faint)" }}
          >
            · 故事真正讲的是
          </span>
        </div>

        <h1
          className="mt-4 text-[34px] font-medium leading-[1.15] tracking-tight"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          {concept.name}
          <span className="ink-stamp align-middle ml-2 relative -top-[6px]">
            {concept.domain}
          </span>
        </h1>

        <p
          className="mt-4 text-[15px] leading-[1.75]"
          style={{ color: "var(--ink-soft)", fontFamily: "var(--font-display)" }}
        >
          {concept.oneLiner}
        </p>
      </div>

      {/* Definition */}
      <Section label="具体解释">
        <div className="card-paper p-5">
          <p
            className="text-[14.5px]"
            style={{ lineHeight: 1.9, color: "var(--ink)", fontFamily: "var(--font-display)" }}
          >
            {expanded || (concept.definition?.length ?? 0) < 100
              ? concept.definition
              : concept.definition?.slice(0, 80) + "…"}
          </p>
          {(concept.definition?.length ?? 0) >= 100 && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-3 text-[12px]"
              style={{ color: "var(--ink-faint)" }}
            >
              {expanded ? "收起" : "展开阅读"}
            </button>
          )}
        </div>
      </Section>

      {wrongGuess && (
        <div className="px-6 mt-5">
          <button
            onClick={() => setWhyOpen(wrongGuess.id)}
            className="inline-flex items-center gap-2 text-[12px] px-3 py-2 rounded-full"
            style={{
              background: "color-mix(in oklch, var(--paper) 75%, transparent)",
              color: "var(--ink-soft)",
              border: "1px solid color-mix(in oklch, var(--ink-faint) 25%, transparent)",
            }}
          >
            <span>为什么不是「{wrongGuess.name}」？</span>
            <span style={{ color: "var(--ink-faint)" }}>→</span>
          </button>
        </div>
      )}

      {/* Mapping */}
      {concept.mapping && (
        <Section label="故事里如何对应">
          <ul className="space-y-2">
            {concept.mapping.map((m, i) => (
              <li
                key={i}
                className="flex items-start gap-3 py-3 px-4 rounded-xl"
                style={{
                  background: "color-mix(in oklch, var(--paper-soft) 70%, transparent)",
                  border: "1px solid color-mix(in oklch, var(--ink-faint) 15%, transparent)",
                }}
              >
                <span style={{ color: "var(--ink-faint)" }} className="mt-1">
                  <IllustrationBy kind={story.illustration} className="w-6 h-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <div
                    className="text-[14px] font-medium"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {m.from}
                  </div>
                  <div className="text-[12.5px] mt-1" style={{ color: "var(--ink-soft)" }}>
                    → {m.to}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Scenes */}
      {concept.scenes && (
        <Section label="现实中会发生在哪些地方">
          <ul className="space-y-4">
            {concept.scenes.map((s, i) => (
              <li key={i} className="flex gap-4">
                <div
                  className="shrink-0 text-[11px] tracking-widest pt-1"
                  style={{
                    color: "var(--ink-faint)",
                    fontFamily: "var(--font-latin)",
                    width: 32,
                  }}
                >
                  0{i + 1}
                </div>
                <div className="min-w-0">
                  <div
                    className="text-[14px] font-medium"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.title}
                  </div>
                  <p
                    className="text-[13px] mt-1"
                    style={{ color: "var(--ink-soft)", lineHeight: 1.8 }}
                  >
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Related */}
      {concept.related && concept.related.length > 0 && (
        <Section label="继续读">
          <ul className="grid grid-cols-2 gap-3">
            {concept.related.map((rid) => {
              const rc = getConcept(rid);
              if (!rc) return null;
              const target = findStoryByConcept(rid);
              return (
                <li key={rid}>
                  <Link
                    to="/story/$id"
                    params={{ id: target ?? id }}
                    search={{ from: "concept" as const }}
                    className="block rounded-2xl p-4 card-paper rise"
                  >
                    <div style={{ color: "var(--ink)" }}>
                      <IllustrationBy kind={rc.illustration} className="w-full h-[54px]" />
                    </div>
                    <div
                      className="mt-2 text-[14px] font-medium"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {rc.name}
                    </div>
                    <div className="text-[11.5px] mt-1 line-clamp-2" style={{ color: "var(--ink-soft)" }}>
                      {rc.oneLiner}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      {/* End actions */}
      <div className="px-6 mt-10">
        <div className="flex justify-center" style={{ color: "var(--ink-faint)" }}>
          <BrushLine className="w-[80px] h-[6px]" />
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2">
          <ActionButton label="继续看" primary />
          <ActionButton label="收藏" />
          <ActionButton label="分享" />
        </div>
      </div>

      {whyOpen && <WhyNotSheet conceptId={whyOpen} storyTitle={story.title} onClose={() => setWhyOpen(null)} />}
    </PhoneFrame>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="px-6 mt-8">
      <div className="mb-3 flex items-center gap-2">
        <span
          className="text-[11px] tracking-[0.25em]"
          style={{ color: "var(--ink-faint)" }}
        >
          {label}
        </span>
        <span className="flex-1" style={{ borderTop: "1px dashed color-mix(in oklch, var(--ink-faint) 30%, transparent)" }} />
      </div>
      {children}
    </section>
  );
}

function ActionButton({ label, primary }: { label: string; primary?: boolean }) {
  return (
    <button
      className="rounded-full py-3 text-[13px]"
      style={{
        background: primary ? "var(--ink)" : "transparent",
        color: primary ? "var(--paper)" : "var(--ink)",
        border: primary ? "1px solid var(--ink)" : "1px solid color-mix(in oklch, var(--ink-faint) 30%, transparent)",
        fontFamily: "var(--font-display)",
      }}
    >
      {label}
    </button>
  );
}

function WhyNotSheet({
  conceptId,
  storyTitle,
  onClose,
}: {
  conceptId: string;
  storyTitle: string;
  onClose: () => void;
}) {
  const c = getConcept(conceptId);
  if (!c) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center">
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0.2 0.02 60 / 0.35)" }}
        onClick={onClose}
      />
      <div
        className="phone-frame relative z-10 rounded-t-[28px] pb-8 pt-3"
        style={{ background: "var(--paper)" }}
      >
        <div className="flex justify-center pb-2">
          <span
            className="h-1 rounded-full"
            style={{ width: 40, background: "color-mix(in oklch, var(--ink) 25%, transparent)" }}
          />
        </div>
        <div className="px-6">
          <span
            className="text-[10px] tracking-[0.3em]"
            style={{ color: "var(--ink-faint)", fontFamily: "var(--font-latin)" }}
          >
            WHY NOT
          </span>
          <h2
            className="mt-2 text-[22px] font-medium"
            style={{ fontFamily: "var(--font-display)" }}
          >
            为什么不是「{c.name}」？
          </h2>
          <p className="mt-4 text-[13.5px]" style={{ color: "var(--ink-soft)", lineHeight: 1.9 }}>
            <b style={{ color: "var(--ink)", fontFamily: "var(--font-display)" }}>{c.name}</b>
            {" · "}
            {c.oneLiner}
          </p>
          <p className="mt-4 text-[13.5px]" style={{ color: "var(--ink-soft)", lineHeight: 1.9 }}>
            《{storyTitle}》里的主角其实并没有在这个逻辑里挣扎——它讲的是另一种更贴近路径与惯性的现象，而不是{c.name}的核心机制。
          </p>
          <button
            onClick={onClose}
            className="mt-6 w-full rounded-full py-3 text-[13px]"
            style={{
              background: "var(--ink)",
              color: "var(--paper)",
              fontFamily: "var(--font-display)",
              letterSpacing: "0.1em",
            }}
          >
            我明白了
          </button>
        </div>
      </div>
    </div>
  );
}

import { STORIES } from "@/lib/mock-data";
function findStoryByConcept(conceptId: string): string | undefined {
  return STORIES.find((s) => s.conceptId === conceptId)?.id;
}
