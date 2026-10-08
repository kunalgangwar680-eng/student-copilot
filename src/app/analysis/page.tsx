"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type AnalysisData = {
  overall: number;
  technical: number;
  projects: number;
  resume: number;
  interview: number;
  summary: string;
  gaps: {
    title: string;
    description: string;
    priority: "High" | "Medium" | "Low";
    action: string;
  }[];
};

const demoAnalysis: AnalysisData = {
  overall: 68,
  technical: 61,
  projects: 54,
  resume: 76,
  interview: 58,
  summary:
    "You have a solid starting point, but your placement readiness is being held back by project depth, interview confidence, and structured technical preparation.",
  gaps: [
    {
      title: "Project depth",
      description:
        "Your projects need stronger real-world problem solving and measurable outcomes.",
      priority: "High",
      action: "Strengthen one flagship project with features, impact and a clear demo.",
    },
    {
      title: "Interview confidence",
      description:
        "Your preparation should focus more on explaining your work clearly under pressure.",
      priority: "High",
      action: "Practice 5 interview questions every day with the AI Coach.",
    },
    {
      title: "Technical consistency",
      description:
        "Your fundamentals are developing, but your preparation needs a regular routine.",
      priority: "Medium",
      action: "Follow a focused daily technical practice schedule.",
    },
  ],
};

export default function AnalysisPage() {
  const [profile, setProfile] = useState<{
    problem?: string;
    goal?: string;
    year?: string;
  } | null>(null);

  const [analysis, setAnalysis] = useState<AnalysisData>(demoAnalysis);
  const [loading, setLoading] = useState(true);
  const [aiUsed, setAiUsed] = useState(false);

  useEffect(() => {
    async function loadAnalysis() {
      try {
        const savedProfile = localStorage.getItem("studentProfile");

        if (!savedProfile) {
          setLoading(false);
          return;
        }

        const parsedProfile = JSON.parse(savedProfile);
        setProfile(parsedProfile);

        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parsedProfile),
        });

        if (!response.ok) {
          throw new Error("Analysis request failed");
        }

        const data = await response.json();

        if (data) {
          setAnalysis({
            overall: Number(data.overall ?? demoAnalysis.overall),
            technical: Number(data.technical ?? demoAnalysis.technical),
            projects: Number(data.projects ?? demoAnalysis.projects),
            resume: Number(data.resume ?? demoAnalysis.resume),
            interview: Number(data.interview ?? demoAnalysis.interview),
            summary: data.summary ?? demoAnalysis.summary,
            gaps:
              Array.isArray(data.gaps) && data.gaps.length > 0
                ? data.gaps
                : demoAnalysis.gaps,
          });

          setAiUsed(Boolean(data.aiUsed));
        }
      } catch (error) {
        console.error("Analysis error:", error);
        setAnalysis(demoAnalysis);
        setAiUsed(false);
      } finally {
        setLoading(false);
      }
    }

    loadAnalysis();
  }, []);

  const scoreItems = [
    { label: "Technical Skills", value: analysis.technical },
    { label: "Projects", value: analysis.projects },
    { label: "Resume", value: analysis.resume },
    { label: "Interview", value: analysis.interview },
  ];

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="hidden w-[250px] shrink-0 border-r border-slate-800 bg-[#111827] px-5 py-6 lg:block">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
              <span className="text-lg font-bold">SC</span>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Student</p>
              <p className="text-xs text-slate-400">Copilot</p>
            </div>
          </div>

          <nav className="space-y-2">
            <NavItem href="/" icon="⌂" label="Dashboard" />
            <NavItem href="/problem" icon="✦" label="My Problem" />
            <NavItem
              href="/analysis"
              icon="◉"
              label="AI Analysis"
              active
            />
            <NavItem href="/plan" icon="✓" label="Action Plan" />
            <NavItem href="/coach" icon="💬" label="AI Coach" />
            <NavItem href="/progress" icon="↗" label="Progress" />
            <NavItem href="/evidence" icon="◎" label="Evidence" />
          </nav>

          <div className="mt-10 rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
              Student Copilot
            </p>
            <p className="mt-2 text-sm leading-5 text-slate-300">
              Turn your placement problems into clear next actions.
            </p>
          </div>
        </aside>

        {/* MAIN */}
        <section className="flex-1">
          {/* TOP BAR */}
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-indigo-500">
                AI Analysis
              </p>
              <h1 className="mt-1 text-xl font-bold sm:text-2xl">
                Your Placement Readiness
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500 sm:block">
                {aiUsed ? "AI analysis active" : "Demo analysis"}
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                K
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl space-y-6 px-5 py-6 sm:px-8">
            {/* LOADING */}
            {loading ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 animate-pulse rounded-xl bg-indigo-100" />

                  <div className="space-y-2">
                    <div className="h-4 w-44 animate-pulse rounded bg-slate-200" />
                    <div className="h-3 w-72 animate-pulse rounded bg-slate-100" />
                  </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-32 animate-pulse rounded-2xl bg-slate-100"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* PROFILE CONTEXT */}
                {profile && (
                  <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 px-5 py-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                          Analysis based on your input
                        </p>

                        <p className="mt-1 text-sm text-slate-700">
                          {profile.problem || "Placement preparation"}
                        </p>
                      </div>

                      <div className="flex gap-2 text-xs">
                        {profile.goal && (
                          <span className="rounded-full bg-white px-3 py-1.5 font-medium text-slate-600">
                            {profile.goal}
                          </span>
                        )}

                        {profile.year && (
                          <span className="rounded-full bg-white px-3 py-1.5 font-medium text-slate-600">
                            {profile.year}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* HERO */}
                <section className="overflow-hidden rounded-[28px] bg-slate-950 p-6 text-white shadow-xl sm:p-8">
                  <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                    <div>
                      <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-200">
                        Personalized readiness scan
                      </span>

                      <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
                        You are{" "}
                        <span className="text-indigo-300">
                          {analysis.overall}% placement ready
                        </span>
                      </h2>

                      <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                        {analysis.summary}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                          href="/plan"
                          className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                        >
                          View My Action Plan →
                        </Link>

                        <Link
                          href="/coach"
                          className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                          Talk to AI Coach
                        </Link>
                      </div>
                    </div>

                    <div className="flex justify-center lg:justify-end">
                      <ScoreRing score={analysis.overall} />
                    </div>
                  </div>
                </section>

                {/* SCORE CARDS */}
                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {scoreItems.map((item) => (
                    <ScoreCard
                      key={item.label}
                      label={item.label}
                      value={item.value}
                    />
                  ))}
                </section>

                {/* PRIORITY GAPS */}
                <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                          What is holding you back?
                        </p>

                        <h3 className="mt-1 text-xl font-bold">
                          Priority Gaps
                        </h3>
                      </div>

                      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500">
                        {analysis.gaps.length} focus areas
                      </span>
                    </div>

                    <div className="mt-6 space-y-4">
                      {analysis.gaps.map((gap, index) => (
                        <div
                          key={`${gap.title}-${index}`}
                          className="rounded-2xl border border-slate-200 p-5 transition hover:border-indigo-200 hover:shadow-sm"
                        >
                          <div className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600">
                              0{index + 1}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="font-semibold text-slate-900">
                                  {gap.title}
                                </h4>

                                <PriorityBadge priority={gap.priority} />
                              </div>

                              <p className="mt-1 text-sm leading-6 text-slate-500">
                                {gap.description}
                              </p>

                              <div className="mt-3 rounded-xl bg-slate-50 p-3">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                  Recommended action
                                </p>
                                <p className="mt-1 text-sm font-medium text-slate-700">
                                  {gap.action}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI INSIGHT */}
                  <div className="rounded-3xl border border-indigo-100 bg-indigo-50/70 p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-lg text-white shadow-lg shadow-indigo-600/20">
                      ✦
                    </div>

                    <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-indigo-600">
                      AI Insight
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-slate-900">
                      Start with your biggest gap
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      You do not need to fix everything at once. Student
                      Copilot prioritizes the areas that can create the biggest
                      improvement in your placement readiness.
                    </p>

                    <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
                      <p className="text-xs font-semibold text-slate-400">
                        TODAY&apos;S BEST MOVE
                      </p>

                      <p className="mt-2 text-sm font-semibold text-slate-800">
                        Spend 30–45 minutes improving your highest-priority
                        gap.
                      </p>

                      <Link
                        href="/plan"
                        className="mt-4 inline-flex text-sm font-semibold text-indigo-600"
                      >
                        Start today&apos;s task →
                      </Link>
                    </div>
                  </div>
                </section>

                {/* BOTTOM CTA */}
                <section className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                      Next step
                    </p>

                    <h3 className="mt-1 text-xl font-bold">
                      Turn this analysis into action.
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Your personalized 7-day plan is ready.
                    </p>
                  </div>

                  <Link
                    href="/plan"
                    className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Open 7-Day Plan →
                  </Link>
                </section>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function NavItem({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
        active
          ? "bg-indigo-500/15 text-white"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
          active
            ? "bg-indigo-500 text-white"
            : "bg-white/5 text-slate-400"
        }`}
      >
        {icon}
      </span>

      {label}
    </Link>
  );
}

function ScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 58;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative h-44 w-44">
      <svg className="h-44 w-44 -rotate-90" viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r="58"
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="10"
        />

        <circle
          cx="70"
          cy="70"
          r="58"
          fill="none"
          stroke="rgb(129,140,248)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold">{score}</span>
        <span className="text-xs text-slate-400">out of 100</span>
      </div>
    </div>
  );
}

function ScoreCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className="text-sm font-bold text-slate-900">{value}%</span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all duration-700"
          style={{ width: `${value}%` }}
        />
      </div>

      <p className="mt-3 text-xs text-slate-400">
        {value >= 75
          ? "Strong"
          : value >= 60
          ? "Developing"
          : "Needs focus"}
      </p>
    </div>
  );
}

function PriorityBadge({
  priority,
}: {
  priority: "High" | "Medium" | "Low";
}) {
  const classes =
    priority === "High"
      ? "bg-red-50 text-red-600"
      : priority === "Medium"
      ? "bg-amber-50 text-amber-600"
      : "bg-emerald-50 text-emerald-600";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${classes}`}
    >
      {priority} Priority
    </span>
  );
}