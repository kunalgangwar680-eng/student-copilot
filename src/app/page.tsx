"use client";

import { useState } from "react";

export default function Home() {
  const [problem, setProblem] = useState("");

  const quickActions = [
    {
      icon: "💼",
      title: "Find an internship",
      text: "Need help getting your first opportunity?",
    },
    {
      icon: "🚀",
      title: "Build a project",
      text: "Turn your idea into a practical project.",
    },
    {
      icon: "📚",
      title: "Improve my skills",
      text: "Create a focused learning path.",
    },
    {
      icon: "🎯",
      title: "Plan my next step",
      text: "Not sure what you should do next?",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#111827]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-[245px] flex-col justify-between border-r border-[#e8eaee] bg-white px-5 py-6 lg:flex">
          <div>
            {/* Logo */}
            <div className="mb-10 flex items-center gap-3 px-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111827] text-lg text-white">
                S
              </div>
              <div>
                <h1 className="text-[15px] font-semibold tracking-tight">
                  Student Copilot
                </h1>
                <p className="text-[11px] text-gray-400">AI for student life</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              <div className="flex cursor-pointer items-center gap-3 rounded-xl bg-[#f1f3f5] px-3 py-2.5 text-sm font-medium">
                <span>⌂</span>
                Dashboard
              </div>

              <div className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 transition hover:bg-gray-50">
                <span>◉</span>
                My Problems
              </div>

              <div className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 transition hover:bg-gray-50">
                <span>✓</span>
                Action Plan
              </div>

              <div className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 transition hover:bg-gray-50">
                <span>✦</span>
                Opportunities
              </div>

              <div className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 transition hover:bg-gray-50">
                <span>↗</span>
                Progress
              </div>
            </nav>
          </div>

          <div>
            <div className="mb-4 border-t border-[#eceef1]" />

            <div className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-500 hover:bg-gray-50">
              <span>⚙</span>
              Settings
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-[#eceef1] p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8eefc] text-sm font-semibold text-[#3157c8]">
                K
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">Kunal</p>
                <p className="truncate text-xs text-gray-400">Student</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Area */}
        <section className="flex-1">
          {/* Top Bar */}
          <header className="flex items-center justify-between border-b border-[#e8eaee] bg-white px-5 py-4 sm:px-8">
            <div>
              <p className="text-xs text-gray-400">Student Copilot</p>
              <h2 className="text-lg font-semibold tracking-tight">
                Dashboard
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden h-10 rounded-xl border border-[#e5e7eb] bg-white px-4 text-sm text-gray-600 transition hover:bg-gray-50 sm:block">
                Help
              </button>

              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white text-gray-600">
                🔔
              </button>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111827] text-sm font-medium text-white">
                K
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1250px] px-5 py-7 sm:px-8 lg:px-10">
            {/* Welcome */}
            <div className="mb-7">
              <p className="mb-1 text-sm text-gray-400">Good morning, Kunal</p>

              <h3 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                What do you want to
                <span className="text-[#3157c8]"> solve today?</span>
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                Tell Student Copilot what you are struggling with. AI will
                understand the problem and turn it into clear next steps.
              </p>
            </div>

            {/* AI Input Card */}
            <div className="rounded-3xl border border-[#e7e9ed] bg-white p-4 shadow-[0_10px_30px_rgba(17,24,39,0.04)] sm:p-5">
              <div className="rounded-2xl border border-[#eceef2] bg-[#fafbfc] p-4 sm:p-5">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111827] text-sm text-white">
                    ✦
                  </div>
                  <span className="text-sm font-semibold">Talk to AI</span>
                </div>

                <textarea
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="Example: I want an internship, but I don't have a strong project and I don't know where to start..."
                  className="min-h-[125px] w-full resize-none border-0 bg-transparent text-sm leading-6 text-gray-700 outline-none placeholder:text-gray-400"
                />

                <div className="mt-4 flex flex-col gap-3 border-t border-[#eceef2] pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-gray-400">
                    Your information is used only to personalize your plan.
                  </p>

                  <button
                    disabled={!problem.trim()}
                    className="rounded-xl bg-[#111827] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1f2937] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Analyze problem →
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-9">
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
                    Quick actions
                  </p>
                  <h4 className="mt-1 text-xl font-semibold">
                    Start with a common problem
                  </h4>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {quickActions.map((action) => (
                  <button
                    key={action.title}
                    onClick={() =>
                      setProblem(
                        `${action.title}. ${action.text} Please help me create a practical plan.`
                      )
                    }
                    className="group rounded-2xl border border-[#e7e9ed] bg-white p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(17,24,39,0.06)]"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3f5f8] text-lg">
                      {action.icon}
                    </div>

                    <h5 className="text-sm font-semibold">{action.title}</h5>

                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      {action.text}
                    </p>

                    <div className="mt-4 text-xs font-medium text-gray-400 transition group-hover:text-[#3157c8]">
                      Start →
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-9 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
              {/* Recent */}
              <div className="rounded-3xl border border-[#e7e9ed] bg-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
                      Your workspace
                    </p>
                    <h4 className="mt-1 text-xl font-semibold">
                      Recent activity
                    </h4>
                  </div>

                  <button className="text-xs font-medium text-[#3157c8]">
                    View all →
                  </button>
                </div>

                <div className="mt-6 divide-y divide-[#eef0f2]">
                  <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2ff]">
                        💼
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Internship preparation
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          Action plan created
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full bg-[#f3f4f6] px-3 py-1 text-[11px] text-gray-500">
                      Today
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5f3ff]">
                        🚀
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Portfolio project
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          In progress
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full bg-[#f3f4f6] px-3 py-1 text-[11px] text-gray-500">
                      65%
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="rounded-3xl bg-[#111827] p-6 text-white">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
                  Weekly progress
                </p>

                <h4 className="mt-2 text-2xl font-semibold">
                  Keep moving forward.
                </h4>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  You have completed 7 of 10 planned actions this week.
                </p>

                <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[70%] rounded-full bg-white" />
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                  <span>7 completed</span>
                  <span>70%</span>
                </div>

                <button className="mt-7 w-full rounded-xl bg-white px-4 py-3 text-sm font-medium text-[#111827] transition hover:bg-gray-100">
                  Open my action plan
                </button>
              </div>
            </div>

            {/* Mobile nav */}
            <div className="mt-8 flex items-center justify-between rounded-2xl border border-[#e7e9ed] bg-white p-2 lg:hidden">
              {["⌂", "◉", "✓", "✦", "↗"].map((item, index) => (
                <button
                  key={index}
                  className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm ${
                    index === 0
                      ? "bg-[#111827] text-white"
                      : "text-gray-500"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}