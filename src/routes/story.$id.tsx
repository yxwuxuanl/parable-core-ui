import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { PhoneFrame, CapsuleSafeArea } from "@/components/AppShell";
import { IllustrationBy, BrushLine, LeafMark } from "@/components/illustrations";
import { getStory, getConcept, CONCEPTS } from "@/lib/mock-data";

const READ_KEY = "shiyouyouyu_read";

function markRead(id: string) {
  try {
    const raw = localStorage.getItem(READ_KEY) ?? "[]";
    const ids: string[] = JSON.parse(raw);
    if (!ids.includes(id)) {
      ids.push(id);
      localStorage.setItem(READ_KEY, JSON.stringify(ids));
    }
  } catch {
    /* ignore */
  }
}

export const Route = createFileRoute("/story/$id")({
  validateSearch: z.object({
    from: z.enum(["home", "concept"]).optional(),
    guessed: z.string().optional(),
  }),
  head: ({ params }) => {
    const story = getStory(params.id);
    return {
      meta: [
        { title: story ? `${story.title} · 事出有喻` : "故事 · 事出有喻" },
        { name: "description", content: story?.lede ?? "" },
      ],
    };
  },
  component: StoryPage,
});

function StoryPage() {
  const { id } = Route.useParams();
  const { from } = Route.useSearch();
  const story = getStory(id);

  const [showSheet, setShowSheet] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 40);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  if (!story) {
    return (
      <PhoneFrame>
        <div className="p-8 text-center" style={{ color: "var(--ink-soft)" }}>
          没有找到这个故事。
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      {/* Immersive top bar */}
      <div
        className="sticky top-0 z-30 flex items-center justify-between px-5 pt-3 pb-3 transition-all"
        style={{
          background: scrolled
            ? "color-mix(in oklch, var(--paper) 88%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled
            ? "1px solid color-mix(in oklch, var(--ink-faint) 18%, transparent)"
            : "1px solid transparent",
        }}
      >
        <Link to="/" style={{ color: "var(--ink)" }} aria-label="返回">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6 L 9 12 L 15 18" />
          </svg>
        </Link>
        <div
          className="text-[13px] font-medium transition-opacity"
          style={{
            fontFamily: "var(--font-display)",
            opacity: scrolled ? 1 : 0,
            letterSpacing: "0.05em",
          }}
        >
          {story.title}
        </div>
        <div className="flex items-center gap-3" style={{ color: "var(--ink)" }}>
          <BookmarkButton />
        </div>
      </div>
      <CapsuleSafeArea />

      <div ref={scrollRef}>
        {/* Cover */}
        <div className={`wash-${story.wash} px-6 pt-2 pb-8`}>
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
            <span style={{ color: "var(--ink-faint)" }}>· {story.minutes} 分钟阅读</span>
          </div>
          <h1
            className="mt-4 text-[30px] leading-tight font-medium"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {story.title}
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            {story.lede}
          </p>
          <div className="mt-4" style={{ color: "var(--ink)" }}>
            <IllustrationBy kind={story.illustration} className="w-full h-[160px]" />
          </div>
        </div>

        {/* Body */}
        <article className="px-7 pt-8">
          {story.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-[15.5px] mb-5"
              style={{
                lineHeight: 1.95,
                color: "var(--ink)",
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                textIndent: "2em",
              }}
            >
              {p}
            </p>
          ))}

          <div
            className="flex justify-center my-6"
            style={{ color: "var(--ink-faint)" }}
          >
            <BrushLine className="w-[80px] h-[6px]" />
          </div>
        </article>

        {/* Pull handle */}
        <div className="px-6 pt-4 pb-10 flex flex-col items-center gap-3">
          <p className="text-[12px]" style={{ color: "var(--ink-faint)" }}>
            继续下滑，看看这个故事在讲什么
          </p>
          <button
            onClick={() => {
              if (from === "concept") {
                window.location.href = `/concept/${story.id}`;
              } else {
                setShowSheet(true);
              }
            }}
            className="flex flex-col items-center gap-2"
            style={{ color: "var(--ink-soft)" }}
            aria-label="打开猜题"
          >
            <span
              className="h-1 rounded-full"
              style={{ width: 40, background: "color-mix(in oklch, var(--ink) 40%, transparent)" }}
            />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9 L 12 15 L 18 9" />
            </svg>
          </button>
        </div>
      </div>

      {showSheet && <GuessSheet storyId={story.id} onClose={() => setShowSheet(false)} />}
    </PhoneFrame>
  );
}

function BookmarkButton() {
  const [on, setOn] = useState(false);
  return (
    <button onClick={() => setOn((v) => !v)} aria-label="收藏">
      <svg width="20" height="20" viewBox="0 0 24 24" fill={on ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4 h 12 v 17 l -6 -4 l -6 4 Z" />
      </svg>
    </button>
  );
}

function GuessSheet({ storyId, onClose }: { storyId: string; onClose: () => void }) {
  const story = getStory(storyId)!;
  const [picked, setPicked] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center">
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0.2 0.02 60 / 0.35)" }}
        onClick={onClose}
      />
      <div
        className="phone-frame relative z-10 rounded-t-[28px] pb-8 pt-3"
        style={{
          background: "var(--paper)",
          boxShadow: "0 -20px 60px -30px oklch(0.2 0.02 60 / 0.45)",
          animation: "sheet-in 320ms ease",
        }}
      >
        <div className="flex justify-center pb-2">
          <span
            className="h-1 rounded-full"
            style={{ width: 40, background: "color-mix(in oklch, var(--ink) 25%, transparent)" }}
          />
        </div>
        <div className="px-6 pt-2 pb-3 flex items-center gap-2" style={{ color: "var(--ink-faint)" }}>
          <LeafMark className="h-3.5 w-3.5" />
          <span
            className="text-[10px] tracking-[0.3em]"
            style={{ fontFamily: "var(--font-latin)" }}
          >
            A GENTLE GUESS
          </span>
        </div>
        <h2
          className="px-6 text-[20px] leading-snug font-medium"
          style={{ fontFamily: "var(--font-display)" }}
        >
          你觉得这个故事在讲什么？
        </h2>
        <p className="px-6 mt-1 text-[12px]" style={{ color: "var(--ink-faint)" }}>
          没有对错，只是让你先猜一下。
        </p>

        <ul className="px-4 mt-5 space-y-2.5">
          {story.options.map((cid) => {
            const c = CONCEPTS[cid];
            const active = picked === cid;
            return (
              <li key={cid}>
                <button
                  onClick={() => setPicked(cid)}
                  className="w-full flex items-center gap-3 rounded-2xl p-3 text-left transition-all"
                  style={{
                    background: active ? "var(--ink)" : "var(--card)",
                    color: active ? "var(--paper)" : "var(--ink)",
                    border: active
                      ? "1px solid var(--ink)"
                      : "1px solid color-mix(in oklch, var(--ink-faint) 22%, transparent)",
                  }}
                >
                  <div
                    className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center"
                    style={{
                      background: active
                        ? "color-mix(in oklch, var(--paper) 12%, transparent)"
                        : "var(--paper-soft)",
                      color: active ? "var(--paper)" : "var(--ink)",
                    }}
                  >
                    <IllustrationBy kind={c.illustration} className="w-10 h-10" />
                  </div>
                  <div className="min-w-0">
                    <div
                      className="text-[15px] font-medium"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {c.name}
                    </div>
                    <div
                      className="text-[12px] mt-0.5 line-clamp-1"
                      style={{ color: active ? "color-mix(in oklch, var(--paper) 80%, transparent)" : "var(--ink-soft)" }}
                    >
                      {c.oneLiner}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="px-6 mt-5">
          <button
            disabled={!picked}
            onClick={() => {
              if (!picked) return;
              navigate({
                to: "/concept/$id",
                params: { id: story.id },
                search: { guessed: picked },
              });
            }}
            className="w-full rounded-full py-3.5 text-[14px] font-medium transition-all"
            style={{
              background: picked ? "var(--ink)" : "color-mix(in oklch, var(--ink) 15%, transparent)",
              color: picked ? "var(--paper)" : "var(--ink-faint)",
              fontFamily: "var(--font-display)",
              letterSpacing: "0.1em",
            }}
          >
            看看故事真正讲的是
          </button>
          <button
            onClick={onClose}
            className="w-full text-center text-[12px] mt-3"
            style={{ color: "var(--ink-faint)" }}
          >
            再读一遍
          </button>
        </div>
      </div>
      <style>{`@keyframes sheet-in { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </div>
  );
}
