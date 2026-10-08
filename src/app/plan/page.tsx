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

const defaultTasks: Task[] = [
  {
    id: "day-1",
    day: 1,
    title: "Identify your biggest placement gap",
    description:
      "Write down the one skill or preparation area that is currently blocking your progress.",
    duration: "30 min",
    category: "Focus",
    completed: false,
  },
  {
    id: "day-2",
    day: 2,
    title: "Improve one core technical skill",
    description:
      "Practice a focused set of technical questions based on your target role.",
    duration: "45 min",
    category: "Technical",
    completed: false,
  },
  {
    id: "day-3",
    day: 3,
    title: "Strengthen your flagship project",
    description:
      "Improve one project by adding a useful feature and preparing a simple explanation.",
    duration: "60 min",
    category: "Projects",
    completed: false,
  },
  {
    id: "day-4",
    day: 4,
    title: "Upgrade your resume",
    description:
      "Rewrite one project or experience section using clear actions and measurable outcomes.",
    duration: "40 min",
    category: "Resume",
    completed: false,
  },
  {
    id: "day-5",
    day: 5,
    title: "Practice interview answers",
    description:
      "Answer common HR and project questions aloud and improve your clarity.",
    duration: "30 min",
    category: "Interview",
    completed: false,
  },
  {
    id: "day-6",
    day: 6,
    title: "Run a mock interview",
    description:
      "Use AI Coach to simulate a placement interview and note your weak answers.",
    duration: "45 min",
    category: "Interview",
    completed: false,
  },
  {
    id: "day-7",
    day: 7,
    title: "Complete your readiness check",
    description:
      "Review your progress, fix one remaining gap and prepare your next-week target.",
    duration: "30 min",
    category: "Review",
    completed: false,
  },
];

function buildTasks(profile: Profile): Task[] {
  const problem = (profile.problem || "").toLowerCase();
  const goal = (profile.goal || "").toLowerCase();

  const tasks = defaultTasks.map((task) => ({
    ...task,
    completed: false,
  }));

  if (problem.includes("resume")) {
    tasks[0] = {
      ...tasks[0],
      title: "Audit your current resume",
      description:
        "Find the three weakest sections in your resume and identify exactly what needs improvement.",
    };

    tasks[3] = {
      ...tasks[3],
      title: "Rewrite your resume impact",
      description:
        "Improve your project and experience bullets using action, technology and measurable outcomes.",
    };
  }

  if (problem.includes("project")) {
    tasks[2] = {
      ...tasks[2],
      title: "Build one stronger project feature",
      description:
        "Choose one feature that solves a real user problem and make it demo-ready.",
    };
  }

  if (problem.includes("interview")) {
    tasks[4] = {
      ...tasks[4],
      title: "Practice your top 10 interview questions",
      description:
        "Answer common HR and technical questions and focus on structure, clarity and confidence.",
    };

    tasks[5] = {
      ...tasks[5],
      title: "Complete an AI mock interview",
      description:
        "Use Student Copilot to simulate an interview and identify your weakest answers.",
    };
  }

  if (
    problem.includes("skill") ||
    problem.includes("technical") ||
    goal.includes("developer") ||
    goal.includes("software")
  ) {
    tasks[1] = {
      ...tasks[1],
      title: "Create a focused technical practice set",
      description:
        "Select the most important technical topics for your target role and practice them consistently.",
    };
  }

  return tasks;
}

function normalizeTasks(rawTasks: unknown): Task[] | null {
  if (!Array.isArray(rawTasks) || rawTasks.length === 0) {
    return null;
  }

  const normalized = rawTasks
    .slice(0, 7)
    .map((task, index) => {
      if (!task || typeof task !== "object") {
        return null;
      }

      const item = task as Record<string, unknown>;

      return {
        id: `day-${index + 1}`,
        day: index + 1,
        title:
          typeof item.title === "string"
            ? item.title
            : defaultTasks[index]?.title || `Day ${index + 1}`,
        description:
          typeof item.description === "string"
            ? item.description
            : defaultTasks[index]?.description || "",
        duration:
          typeof item.duration === "string"
            ? item.duration
            : defaultTasks[index]?.duration || "30 min",
        category:
          typeof item.category === "string"
            ? item.category
            : defaultTasks[index]?.category || "Focus",
        completed: Boolean(item.completed),
      };
    })
    .filter((task): task is Task => task !== null);

  return normalized.length === 7 ? normalized : null;
}

export default function PlanPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const savedProfile = localStorage.getItem("studentProfile");

      if (!savedProfile) {
        return;
      }

      const parsedProfile: Profile = JSON.parse(savedProfile);
      setProfile(parsedProfile);

      const savedPlan = localStorage.getItem("studentPlan");

      if (savedPlan) {
        try {
          const parsedPlan = JSON.parse(savedPlan);
          const normalizedPlan = normalizeTasks(parsedPlan);

          if (normalizedPlan) {
            setTasks(normalizedPlan);
            localStorage.setItem(
              "studentPlan",
              JSON.stringify(normalizedPlan)
            );
            return;
          }
        } catch (planError) {
          console.error("Saved plan parse error:", planError);
        }
      }

      const generatedTasks = buildTasks(parsedProfile);
      setTasks(generatedTasks);
      localStorage.setItem("studentPlan", JSON.stringify(generatedTasks));
    } catch (error) {
      console.error("Plan loading error:", error);
    }
  }, []);

  const completed = useMemo(() => {
    return tasks.filter((task) => task.completed).length;
  }, [tasks]);

  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  function toggleTask(id: string) {
    const updatedTasks = tasks.map((task) => {
      if (task.id !== id) {
        return task;
      }

      return {
        ...task,
        completed: !task.completed,
      };
    });

    setTasks(updatedTasks);
    localStorage.setItem("studentPlan", JSON.stringify(updatedTasks));
  }

  function resetPlan() {
    const freshTasks = profile ? buildTasks(profile) : defaultTasks;

    setTasks(freshTasks);
    localStorage.setItem("studentPlan", JSON.stringify(freshTasks));
  }

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#f6f8fb] p-8">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-8 w-64 rounded bg-slate-200" />
          <div className="mt-8 h-40 rounded-3xl bg-slate-200" />
          <div className="mt-6 h-96 rounded-3xl bg-slate-200" />
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
            <NavItem href="/plan" icon="✓" label="Action Plan" active />
            <NavItem href="/coach" icon="💬" label="AI Coach" />
            <NavItem href="/progress" icon="↗" label="Progress" />
            <NavItem href="/evidence" icon="◎" label="Evidence" />
          </nav>

          <div className="mt-10 rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
              Your next 7 days
            </p>

            <p className="mt-2 text-sm leading-5 text-slate-300">
              Small actions. Clear progress. Better placement readiness.
            </p>
          </div>
        </aside>

        {/* MAIN */}
        <section className="flex-1">
          {/* HEADER */}
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-500">
                Action Plan
              </p>

              <h1 className="mt-1 text-xl font-bold sm:text-2xl">
                Your 7-Day Placement Plan
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={resetPlan}
                className="hidden rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-50 sm:block"
              >
                Reset Plan
              </button>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                K
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl space-y-6 px-5 py-6 sm:px-8">
            {/* CONTEXT */}
            {profile && (
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 px-5 py-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                      Plan generated for you
                    </p>

                    <p className="mt-1 text-sm text-slate-700">
                      {profile.problem || "Placement preparation"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
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
              </div>
            )}

            {/* HERO */}
            <section className="overflow-hidden rounded-[28px] bg-slate-950 p-6 text-white shadow-xl sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_350px] lg:items-center">
                <div>
                  <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-300">
                    Personalized execution plan
                  </span>

                  <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
                    Progress comes from{" "}
                    <span className="text-indigo-300">
                      consistent action.
                    </span>
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                    Student Copilot turns your biggest placement gaps into
                    small actions you can complete every day.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/coach"
                      className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                    >
                      Open AI Coach →
                    </Link>

                    <Link
                      href="/analysis"
                      className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      View Analysis
                    </Link>
                  </div>
                </div>

                {/* PROGRESS */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      Plan Progress
                    </span>

                    <span className="text-2xl font-bold">{progress}%</span>
                  </div>

                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-indigo-400 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="mt-4 flex justify-between text-xs text-slate-400">
                    <span>{completed} completed</span>
                    <span>{tasks.length - completed} remaining</span>
                  </div>
                </div>
              </div>
            </section>

            {/* PLAN HEADER */}
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                    Your journey
                  </p>

                  <h3 className="mt-1 text-2xl font-bold">
                    7 days. 7 actions.
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Complete one focused task at a time.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-500">
                    {completed}/{tasks.length} done
                  </span>

                  <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-600">
                    {progress}% complete
                  </span>
                </div>
              </div>

              {/* TASK LIST */}
              <div className="mt-6 space-y-3">
                {tasks.map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => toggleTask(task.id)}
                    className={`group w-full rounded-2xl border p-4 text-left transition sm:p-5 ${
                      task.completed
                        ? "border-emerald-200 bg-emerald-50/60"
                        : "border-slate-200 bg-white hover:border-indigo-200 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* DAY / CHECK */}
                      <div
                        className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition ${
                          task.completed
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                        }`}
                      >
                        {task.completed ? "✓" : task.day}
                      </div>

                      {/* CONTENT */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4
                            className={`font-semibold ${
                              task.completed
                                ? "text-emerald-800 line-through"
                                : "text-slate-900"
                            }`}
                          >
                            {task.title}
                          </h4>

                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                            {task.category}
                          </span>
                        </div>

                        <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
                          {task.description}
                        </p>

                        <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
                          <span>◷ {task.duration}</span>
                          <span>•</span>
                          <span>Day {task.day}</span>
                        </div>
                      </div>

                      {/* STATUS */}
                      <div className="hidden sm:block">
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                            task.completed
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {task.completed ? "Completed" : "Mark done"}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* BOTTOM CARDS */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-indigo-100 bg-indigo-50/60 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
                  ✦
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  Need help with a task?
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Ask Student Copilot what to do, how to do it, or practice
                  before you submit your work.
                </p>

                <Link
                  href="/coach"
                  className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Ask AI Coach →
                </Link>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                  Keep going
                </p>

                <h3 className="mt-2 text-xl font-bold">
                  Every completed task counts.
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Your completed actions are saved in the browser and reflected
                  on the Progress screen.
                </p>

                <Link
                  href="/progress"
                  className="mt-5 inline-flex text-sm font-semibold text-indigo-600"
                >
                  View Progress →
                </Link>
              </div>
            </div>
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