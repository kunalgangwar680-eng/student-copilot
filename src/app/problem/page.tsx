"use client";

import { useEffect, useState } from "react";

type Profile = {
  problem: string;
  goal: string;
  year: string;
};

export default function ProblemPage() {
  const [problem, setProblem] = useState("");
  const [goal, setGoal] = useState("");
  const [year, setYear] = useState("");

  const problems = [
    "I am not getting internships",
    "I don't know what skills to learn",
    "My resume is not getting shortlisted",
    "I am not confident in interviews",
    "I don't have strong projects",
  ];

  useEffect(() => {
    const savedQuickProblem = localStorage.getItem("quickProblem");

    if (savedQuickProblem) {
      try {
        const parsed = JSON.parse(savedQuickProblem);

        if (parsed?.problem) {
          setProblem(parsed.problem);
        }
      } catch {
        console.error("Could not read quick problem.");
      }
    }

    const savedProfile = localStorage.getItem("studentProfile");

    if (savedProfile) {
      try {
        const parsed: Profile = JSON.parse(savedProfile);

        if (parsed.problem) setProblem(parsed.problem);
        if (parsed.goal) setGoal(parsed.goal);
        if (parsed.year) setYear(parsed.year);
      } catch {
        console.error("Could not restore profile.");
      }
    }
  }, []);

  const handleAnalyze = () => {
    if (!problem.trim() || !goal.trim() || !year) return;

    const profile = {
      problem: problem.trim(),
      goal: goal.trim(),
      year,
    };

    localStorage.setItem("studentProfile", JSON.stringify(profile));
    localStorage.removeItem("quickProblem");

    window.location.href = "/analysis";
  };

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#111827]">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-[245px] flex-col justify-between border-r border-[#e7e9ed] bg-white px-5 py-6 lg:flex">
          <div>
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

            <nav className="space-y-1">
              <a
                href="/"
                className="block rounded-xl px-3 py-2.5 text-sm text-gray-500 hover:bg-[#f7f8fa]"
              >
                ⌂ Dashboard
              </a>

              <div className="rounded-xl bg-[#111827] px-3 py-2.5 text-sm font-medium text-white">
                ◉ My Problem
              </div>

              <a
                href="/analysis"
                className="block rounded-xl px-3 py-2.5 text-sm text-gray-500 hover:bg-[#f7f8fa]"
              >
                ✦ AI Analysis
              </a>

              <a
                href="/plan"
                className="block rounded-xl px-3 py-2.5 text-sm text-gray-500 hover:bg-[#f7f8fa]"
              >
                ✓ Your Action Plan
              </a>

              <a
                href="/coach"
                className="block rounded-xl px-3 py-2.5 text-sm text-gray-500 hover:bg-[#f7f8fa]"
              >
                ✧ AI Coach
              </a>

              <a
                href="/progress"
                className="block rounded-xl px-3 py-2.5 text-sm text-gray-500 hover:bg-[#f7f8fa]"
              >
                ↗ Progress
              </a>
            </nav>

            <div className="mt-8">
              <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                Research
              </p>

              <a
                href="/evidence"
                className="mt-2 block rounded-xl px-3 py-2.5 text-sm text-gray-500 hover:bg-[#f7f8fa]"
              >
                ◎ Student Evidence
              </a>
            </div>
          </div>

          <div>
            <div className="mb-4 border-t border-[#eceef1]" />

            <div className="rounded-xl px-3 py-2.5 text-sm text-gray-500">
              ⚙ Settings
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[#e7e9ed] bg-[#fafbfc] p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eef2ff] text-sm font-semibold text-[#3157c8]">
                K
              </div>

              <div>
                <p className="text-sm font-medium">Kunal</p>
                <p className="text-xs text-gray-400">Student</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <section className="flex-1">
          <header className="flex items-center justify-between border-b border-[#e7e9ed] bg-white px-5 py-4 sm:px-8">
            <div>
              <p className="text-xs text-gray-400">
                Placement Preparation
              </p>

              <h2 className="text-lg font-semibold">
                My Problem
              </h2>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111827] text-sm font-medium text-white">
              K
            </div>
          </header>

          <div className="mx-auto max-w-[900px] px-5 py-8 sm:px-8 lg:py-12">

            {/* Stepper */}
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111827] text-xs font-semibold text-white">
                1
              </div>

              <div className="h-px w-14 bg-gray-300" />

              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-xs text-gray-400">
                2
              </div>

              <div className="h-px w-14 bg-gray-300" />

              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-xs text-gray-400">
                3
              </div>

              <span className="ml-2 text-xs text-gray-400">
                Step 1 of 3
              </span>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="mb-2 text-sm font-medium text-[#3157c8]">
                Let&apos;s understand your challenge
              </p>

              <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                What&apos;s stopping you from
                <br />
                reaching your next opportunity?
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
                Share your real preparation problem. Student Copilot will
                identify the most important gaps and suggest practical next
                steps.
              </p>
            </div>

            {/* Problem choices */}
            <div className="mb-7">
              <p className="mb-3 text-sm font-semibold">
                Choose a common problem
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                {problems.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setProblem(item)}
                    className={`rounded-2xl border p-4 text-left text-sm transition ${
                      problem === item
                        ? "border-[#3157c8] bg-[#f3f6ff]"
                        : "border-[#e7e9ed] bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span>{item}</span>

                      {problem === item && (
                        <span className="font-semibold text-[#3157c8]">
                          ✓
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="rounded-3xl border border-[#e7e9ed] bg-white p-5 shadow-[0_10px_30px_rgba(17,24,39,0.04)] sm:p-6">

              <label
                htmlFor="problem"
                className="text-sm font-semibold"
              >
                Tell us more about your situation
              </label>

              <textarea
                id="problem"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Example: I am in my 2nd year, I have one project, but I am not getting internship opportunities..."
                className="mt-3 min-h-[150px] w-full resize-none rounded-2xl border border-[#e5e7eb] bg-[#fafbfc] p-4 text-sm leading-6 outline-none focus:border-[#3157c8]"
              />

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="goal"
                    className="text-sm font-semibold"
                  >
                    What is your main goal?
                  </label>

                  <input
                    id="goal"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="e.g. Get a software internship"
                    className="mt-2 h-12 w-full rounded-xl border border-[#e5e7eb] bg-[#fafbfc] px-4 text-sm outline-none focus:border-[#3157c8]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="year"
                    className="text-sm font-semibold"
                  >
                    Current year
                  </label>

                  <select
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="mt-2 h-12 w-full rounded-xl border border-[#e5e7eb] bg-[#fafbfc] px-4 text-sm outline-none focus:border-[#3157c8]"
                  >
                    <option value="">Select year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                </div>
              </div>

              {/* AI note */}
              <div className="mt-6 rounded-2xl bg-[#f6f7f9] p-4">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#111827] text-sm text-white">
                    ✦
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      AI-powered preparation analysis
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Your responses will be used to identify preparation
                      gaps and recommend next steps.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={!problem.trim() || !goal.trim() || !year}
                  className="rounded-xl bg-[#111827] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1f2937] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Analyze My Problem →
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}