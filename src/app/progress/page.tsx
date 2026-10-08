"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Task = {
  id: string;
  day: number;
  title: string;
  description: string;
  duration: string;
  category: string;
  completed: boolean;
};

type Profile = {
  problem?: string;
  goal?: string;
  year?: string;
};

const fallbackTasks: Task[] = [
  {
    id: "day-1",
    day: 1,
    title: "Identify your biggest placement gap",
    description: "",
    duration: "30 min",
    category: "Focus",
    completed: false,
  },
  {
    id: "day-2",
    day: 2,
    title: "Improve one core technical skill",
    description: "",
    duration: "45 min",
    category: "Technical",
    completed: false,
  },
  {
    id: "day-3",
    day: 3,
    title: "Strengthen your flagship project",
    description: "",
    duration: "60 min",
    category: "Projects",
    completed: false,
  },
  {
    id: "day-4",
    day: 4,
    title: "Upgrade your resume",
    description: "",
    duration: "40 min",
    category: "Resume",
    completed: false,
  },
  {
    id: "day-5",
    day: 5,
    title: "Practice interview answers",
    description: "",
    duration: "30 min",
    category: "Interview",
    completed: false,
  },
  {
    id: "day-6",
    day: 6,
    title: "Run a mock interview",
    description: "",
    duration: "45 min",
    category: "Interview",
    completed: false,
  },
  {
    id: "day-7",
    day: 7,
    title: "Complete your readiness check",
    description: "",
    duration: "30 min",
    category: "Review",
    completed: false,
  },
];

export default function ProgressPage() {
  const [tasks, setTasks] = useState<Task[]>(fallbackTasks);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const savedProfile = localStorage.getItem("studentProfile");

      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }

      const savedPlan = localStorage.getItem("studentPlan");

      if (savedPlan) {
        const parsedPlan = JSON.parse(savedPlan);

        if (Array.isArray(parsedPlan) && parsedPlan.length > 0) {
          setTasks(parsedPlan);
        }
      }
    } catch (error) {
      console.error("Progress loading error:", error);
    }
  }, []);

  const completed = useMemo(() => {
    return tasks.filter((task) => task.completed).length;
  }, [tasks]);

  const remaining = tasks.length - completed;

  const completionRate = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  const categoryStats = useMemo(() => {
    const categories = [
      "Technical",
      "Projects",
      "Resume",
      "Interview",
      "Focus",
      "Review",
    ];

    return categories
      .map((category) => {
        const categoryTasks = tasks.filter(
          (task) => task.category === category
        );

        if (categoryTasks.length === 0) {
          return null;
        }

        const done = categoryTasks.filter(
          (task) => task.completed
        ).length;

        return {
          category,
          done,
          total: categoryTasks.length,
          percentage: Math.round((done / categoryTasks.length) * 100),
        };
      })
      .filter(
        (
          item
        ): item is {
          category: string;
          done: number;
          total: number;
          percentage: number;
        } => item !== null
      );
  }, [tasks]);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#f6f8fb] p-8">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-8 w-64 rounded bg-slate-200" />
          <div className="mt-8 h-44 rounded-3xl bg-slate-200" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="h-32 rounded-2xl bg-slate-200" />
            <div className="h-32 rounded-2xl bg-slate-200" />
            <div className="h-32 rounded-2xl bg-slate-200" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="hidden w-[250px] shrink-0 border-r border-slate-800 bg-[#111827] px-5 py-6 lg:block">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
              <span className="text-sm font-bold">SC</span>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Student</p>
              <p className="text-xs text-slate-400">Copilot</p>
            </div>
          </div>

          <nav className="space-y-2">
            <NavItem href="/" icon="⌂" label="Dashboard" />
            <NavItem href="/problem" icon="✦" label="My Problem" />
            <NavItem href="/analysis" icon="◉" label="AI Analysis" />
            <NavItem href="/plan" icon="✓" label="Action Plan" />
            <NavItem href="/coach" icon="💬" label="AI Coach" />
            <NavItem href="/progress" icon="↗" label="Progress" active />
            <NavItem href="/evidence" icon="◎" label="Evidence" />
          </nav>

          <div className="mt-10 rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
              Progress tracking
            </p>

            <p className="mt-2 text-sm leading-5 text-slate-300">
              See what you have completed and what needs attention next.
            </p>
          </div>
        </aside>

        {/* MAIN */}
        <section className="flex-1">
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-500">
                Progress
              </p>

              <h1 className="mt-1 text-xl font-bold sm:text-2xl">
                Your Placement Journey
              </h1>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
              K
            </div>
          </header>

          <div className="mx-auto max-w-7xl space-y-6 px-5 py-6 sm:px-8">
            {/* PROFILE */}
            {profile && (
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  Current focus
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
                    {profile.problem || "Placement preparation"}
                  </span>

                  {profile.goal && (
                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
                      {profile.goal}
                    </span>
                  )}

                  {profile.year && (
                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
                      {profile.year}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* HERO */}
            <section className="overflow-hidden rounded-[28px] bg-slate-950 p-6 text-white shadow-xl sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_350px] lg:items-center">
                <div>
                  <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-300">
                    Your live progress
                  </span>

                  <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
                    You have completed{" "}
                    <span className="text-indigo-300">
                      {completed} of {tasks.length} actions.
                    </span>
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                    Keep completing small tasks to move from preparation to
                    placement readiness.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/plan"
                      className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                    >
                      Continue My Plan →
                    </Link>

                    <Link
                      href="/coach"
                      className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Ask AI Coach
                    </Link>
                  </div>
                </div>

                {/* CIRCLE */}
                <div className="flex justify-center lg:justify-end">
                  <ProgressRing value={completionRate} />
                </div>
              </div>
            </section>

            {/* STATS */}
            <section className="grid gap-4 md:grid-cols-3">
              <StatCard
                icon="✓"
                label="Completed"
                value={String(completed)}
                helper="Actions finished"
              />

              <StatCard
                icon="◷"
                label="Remaining"
                value={String(remaining)}
                helper="Actions left"
              />

              <StatCard
                icon="↗"
                label="Completion"
                value={`${completionRate}%`}
                helper="Overall plan progress"
              />
            </section>

            {/* BREAKDOWN */}
            <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                    Skill breakdown
                  </p>

                  <h3 className="mt-1 text-xl font-bold">
                    Where your effort is going
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Track progress across your preparation areas.
                  </p>
                </div>

                <div className="mt-6 space-y-5">
                  {categoryStats.length > 0 ? (
                    categoryStats.map((item) => (
                      <div key={item.category}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-700">
                            {item.category}
                          </span>

                          <span className="text-xs font-semibold text-slate-400">
                            {item.done}/{item.total}
                          </span>
                        </div>

                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-500">
                      Complete your first action to start tracking progress.
                    </div>
                  )}
                </div>
              </div>

              {/* NEXT STEP */}
              <div className="rounded-3xl border border-indigo-100 bg-indigo-50/70 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
                  ✦
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  Recommended next step
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  {remaining > 0
                    ? "Keep your momentum going."
                    : "You completed your 7-day plan!"}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {remaining > 0
                    ? "Open your Action Plan and complete the next unfinished task. Consistency matters more than doing everything at once."
                    : "Review your results with AI Coach and create your next preparation target."}
                </p>

                <Link
                  href={remaining > 0 ? "/plan" : "/coach"}
                  className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  {remaining > 0
                    ? "Continue Action Plan →"
                    : "Plan Next Step →"}
                </Link>
              </div>
            </section>

            {/* COMPLETED ACTIONS */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                    Activity
                  </p>

                  <h3 className="mt-1 text-xl font-bold">
                    Completed Actions
                  </h3>
                </div>

                <span className="text-xs text-slate-400">
                  {completed} completed
                </span>
              </div>

              <div className="mt-5 space-y-2">
                {completed > 0 ? (
                  tasks
                    .filter((task) => task.completed)
                    .map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-sm font-bold text-white">
                          ✓
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-slate-800">
                            {task.title}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            Day {task.day} · {task.category}
                          </p>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-xl text-slate-400">
                      ✓
                    </div>

                    <p className="mt-4 font-semibold text-slate-700">
                      No completed actions yet
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Complete your first task from the Action Plan.
                    </p>

                    <Link
                      href="/plan"
                      className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
                    >
                      Open Action Plan →
                    </Link>
                  </div>
                )}
              </div>
            </section>
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

function ProgressRing({ value }: { value: number }) {
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const safeValue = Math.min(100, Math.max(0, value));
  const offset = circumference - (safeValue / 100) * circumference;

  return (
    <div className="relative h-44 w-44">
      <svg
        className="h-44 w-44 -rotate-90"
        viewBox="0 0 140 140"
      >
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="10"
        />

        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="rgb(129,140,248)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold">{safeValue}%</span>
        <span className="mt-1 text-xs text-slate-400">completed</span>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  helper,
}: {
  icon: string;
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600">
          {icon}
        </div>

        <span className="text-3xl font-bold text-slate-900">
          {value}
        </span>
      </div>

      <p className="mt-5 text-sm font-semibold text-slate-800">
        {label}
      </p>

      <p className="mt-1 text-xs text-slate-400">{helper}</p>
    </div>
  );
}