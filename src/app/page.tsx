"use client";

import { useState } from "react";

export default function Home() {
  const [problem, setProblem] = useState("");

  const quickActions = [
    {
      icon: "💼",
      title: "Internship",
      subtitle: "Find your next opportunity",
      value:
        "I am not getting internships and need a clear preparation plan.",
    },
    {
      icon: "📄",
      title: "Resume",
      subtitle: "Improve your shortlist chances",
      value: "My resume is not getting shortlisted.",
    },
    {
      icon: "🚀",
      title: "Projects",
      subtitle: "Build stronger proof",
      value: "I don't have strong projects for my portfolio.",
    },
    {
      icon: "🎤",
      title: "Interview",
      subtitle: "Practice with confidence",
      value: "I am not confident in interviews.",
    },
  ];

  const startAnalysis = (value: string) => {
    if (!value.trim()) return;

    localStorage.setItem(
      "quickProblem",
      JSON.stringify({
        problem: value,
      })
    );

    window.location.href = "/problem";
  };

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#111827]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-[245px] flex-col justify-between border-r border-[#e7e9ed] bg-white px-5 py-6 lg:flex">
          <div>
            {/* Brand */}
            <div className="mb-9 flex items-center gap-3 px-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111827] text-sm font-bold text-white">
                SC
              </div>

              <div>
                <h1 className="text-[15px] font-semibold">
                  Student Copilot
                </h1>

                <p className="text-[11px] text-gray-400">
                  Placement companion
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              <a
                href="/"
                className="flex items-center gap-3 rounded-xl bg-[#111827] px-3 py-2.5 text-sm font-medium text-white"
              >
                <span>⌂</span>
                Dashboard
              </a>

              <a
                href="/problem"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 transition hover:bg-[#f7f8fa]"
              >
                <span>◉</span>
                My Problem
              </a>

              <a
                href="/analysis"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 transition hover:bg-[#f7f8fa]"
              >
                <span>✦</span>
                AI Analysis
              </a>

              <a
                href="/plan"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 transition hover:bg-[#f7f8fa]"
              >
                <span>✓</span>
                Your Action Plan
              </a>

              <a
                href="/coach"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 transition hover:bg-[#f7f8fa]"
              >
                <span>✧</span>
                AI Coach
              </a>

              <a
                href="/progress"
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 transition hover:bg-[#f7f8fa]"
              >
                <span>↗</span>
                Progress
              </a>
            </nav>

            {/* Research */}
            <div className="mt-8">
              <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                Research
              </p>

              <a
                href="/evidence"
                className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 transition hover:bg-[#f7f8fa]"
              >
                <span>◎</span>
                Student Evidence
              </a>
            </div>
          </div>

          {/* Bottom */}
          <div>
            <div className="mb-4 border-t border-[#eceef1]" />

            <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500">
              <span>⚙</span>
              Settings
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[#e7e9ed] bg-[#fafbfc] p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef2ff] text-sm font-semibold text-[#3157c8]">
                K
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">Kunal</p>

                <p className="truncate text-xs text-gray-400">
                  Student
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <section className="min-w-0 flex-1">
          {/* Top Bar */}
          <header className="flex items-center justify-between border-b border-[#e7e9ed] bg-white px-5 py-4 sm:px-8">
            <div>
              <p className="text-xs text-gray-400">
                Placement Preparation
              </p>

              <h2 className="text-lg font-semibold">
                Dashboard
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden rounded-xl border border-[#e7e9ed] bg-white px-4 py-2 text-xs text-gray-500 sm:block">
                AI is ready
              </div>

              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e7e9ed] bg-white text-sm"
              >
                🔔
              </button>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111827] text-sm font-medium text-white">
                K
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1240px] px-5 py-7 sm:px-8 lg:px-10">
            {/* Hero */}
            <div className="relative overflow-hidden rounded-[28px] border border-[#e7e9ed] bg-white p-6 sm:p-8">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#eef2ff] blur-3xl" />

              <div className="relative">
                <div className="mb-3 inline-flex rounded-full bg-[#f1f3f5] px-3 py-1 text-[11px] font-medium text-gray-600">
                  Student Copilot AI
                </div>

                <h1 className="max-w-3xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
                  Good morning, Kunal 👋
                  <br />
                  <span className="text-[#3157c8]">
                    What do you want to solve today?
                  </span>
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                  Tell us what you are struggling with in your placement or
                  internship preparation. Student Copilot turns that problem
                  into clear next steps.
                </p>

                <div className="mt-7 flex flex-col gap-3 lg:max-w-3xl lg:flex-row">
                  <input
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        startAnalysis(problem);
                      }
                    }}
                    placeholder="Example: My resume is not getting shortlisted..."
                    className="h-13 flex-1 rounded-2xl border border-[#dfe3e8] bg-[#fafbfc] px-4 text-sm outline-none transition focus:border-[#3157c8]"
                  />

                  <button
                    type="button"
                    onClick={() => startAnalysis(problem)}
                    disabled={!problem.trim()}
                    className="rounded-2xl bg-[#111827] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1f2937] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Check My Problem →
                  </button>
                </div>

                <p className="mt-3 text-[11px] text-gray-400">
                  AI-generated guidance · Focused on student preparation
                </p>
              </div>
            </div>

            {/* Placement Readiness */}
            <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[26px] border border-[#e7e9ed] bg-white p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                      Placement Readiness
                    </p>

                    <h2 className="mt-1 text-xl font-semibold">
                      Your Current Snapshot
                    </h2>
                  </div>

                  <a
                    href="/progress"
                    className="text-xs font-medium text-[#3157c8]"
                  >
                    View Progress →
                  </a>
                </div>

                <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["Resume", "74%"],
                    ["Projects", "71%"],
                    ["Skills", "78%"],
                    ["Interview", "58%"],
                  ].map(([name, value]) => (
                    <div
                      key={name}
                      className="rounded-2xl bg-[#fafbfc] p-4"
                    >
                      <p className="text-xs text-gray-500">
                        {name}
                      </p>

                      <p className="mt-2 text-2xl font-semibold">
                        {value}
                      </p>

                      <div className="mt-3 h-2 rounded-full bg-[#e9edf1]">
                        <div
                          className="h-full rounded-full bg-[#111827]"
                          style={{ width: value }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Focus */}
              <div className="rounded-[26px] bg-[#111827] p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                  Today&apos;s Focus
                </p>

                <h2 className="mt-2 text-2xl font-semibold leading-tight">
                  Strengthen your resume
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  Based on your current preparation snapshot, improving your
                  resume is one of the highest-impact actions you can take.
                </p>

                <a
                  href="/plan"
                  className="mt-6 block rounded-2xl bg-white px-4 py-3 text-center text-sm font-medium text-[#111827]"
                >
                  Open Your Action Plan →
                </a>
              </div>
            </div>

            {/* Quick Start */}
            <div className="mt-8">
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                  Quick Start
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  What do you need help with?
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {quickActions.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => startAnalysis(item.value)}
                    className="group rounded-[22px] border border-[#e7e9ed] bg-white p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(17,24,39,0.06)]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3f4f6] text-lg">
                        {item.icon}
                      </div>

                      <span className="text-gray-300 transition group-hover:text-[#3157c8]">
                        →
                      </span>
                    </div>

                    <h3 className="mt-5 text-sm font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      {item.subtitle}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Journey */}
            <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
              <div className="rounded-[26px] border border-[#e7e9ed] bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                  Your Journey
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Placement Preparation Flow
                </h2>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    ["01", "My Problem", "/problem"],
                    ["02", "AI Analysis", "/analysis"],
                    ["03", "Your Action Plan", "/plan"],
                    ["04", "AI Coach", "/coach"],
                  ].map(([number, title, href]) => (
                    <a
                      href={href}
                      key={number}
                      className="flex items-center gap-4 rounded-2xl border border-[#eceef2] p-4 transition hover:bg-[#fafbfc]"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f3f4f6] text-xs font-semibold">
                        {number}
                      </div>

                      <span className="flex-1 text-sm font-medium">
                        {title}
                      </span>

                      <span className="text-gray-300">→</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* AI Coach */}
              <div className="rounded-[26px] border border-[#e7e9ed] bg-white p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#111827] text-white">
                  ✦
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
                  AI Coach
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  Not sure what to do next?
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Ask about your resume, projects, interview preparation,
                  skills, or your next best step.
                </p>

                <a
                  href="/coach"
                  className="mt-6 block rounded-2xl bg-[#f3f4f6] px-4 py-3 text-center text-sm font-medium transition hover:bg-[#eceef1]"
                >
                  Talk to AI Coach →
                </a>
              </div>
            </div>

            {/* Evidence */}
            <div className="mt-6 rounded-2xl border border-[#e7e9ed] bg-white p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-700">
                    Built around real student preparation problems
                  </p>

                  <p className="mt-1 text-[11px] text-gray-400">
                    Student Copilot validates the problem through real student
                    feedback.
                  </p>
                </div>

                <a
                  href="/evidence"
                  className="text-xs font-medium text-[#3157c8]"
                >
                  View Student Evidence →
                </a>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="mt-6 flex items-center justify-between rounded-2xl border border-[#e7e9ed] bg-white p-2 lg:hidden">
              {[
                ["/", "⌂"],
                ["/problem", "◉"],
                ["/plan", "✓"],
                ["/coach", "✦"],
                ["/progress", "↗"],
              ].map(([href, icon]) => (
                <a
                  href={href}
                  key={href}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    href === "/"
                      ? "bg-[#111827] text-white"
                      : "text-gray-500"
                  }`}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}