"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoBlocked, setVideoBlocked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const playVideo = async () => {
      try {
        await video.play();
        setVideoBlocked(false);
      } catch (error) {
        console.log("Video autoplay blocked:", error);
        setVideoBlocked(true);
      }
    };

    playVideo();
  }, []);

  function startProblem(problem: string) {
    localStorage.setItem(
      "quickProblem",
      JSON.stringify({ problem })
    );

    window.location.href = "/problem";
  }

  async function startVideo() {
    const video = videoRef.current;

    if (!video) return;

    try {
      video.muted = true;
      await video.play();
      setVideoBlocked(false);
    } catch (error) {
      console.error("Video play error:", error);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="hidden w-[250px] shrink-0 border-r border-slate-800 bg-[#111827] px-5 py-6 lg:block">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 text-white">
              <span className="text-sm font-bold">SC</span>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Student</p>
              <p className="text-xs text-slate-400">Copilot</p>
            </div>
          </div>

          <nav className="space-y-2">
            <NavItem href="/" icon="⌂" label="Dashboard" active />
            <NavItem href="/problem" icon="✦" label="My Problem" />
            <NavItem href="/analysis" icon="◉" label="AI Analysis" />
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
              Understand your gap. Take the next step. Get placement ready.
            </p>
          </div>
        </aside>

        {/* MAIN */}
        <section className="flex min-w-0 flex-1 flex-col">
          {/* HEADER */}
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-500">
                Student Copilot
              </p>

              <h1 className="mt-1 text-xl font-bold sm:text-2xl">
                Placement Preparation
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500 sm:block">
                AI Placement Assistant
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                K
              </div>
            </div>
          </header>

          {/* CONTENT */}
          <div className="mx-auto w-full max-w-7xl space-y-6 px-5 py-6 sm:px-8">
            {/* ================= HERO ================= */}
            <section className="relative overflow-hidden rounded-[32px] bg-slate-950 shadow-2xl">
              {/* VIDEO */}
              <div className="relative h-[500px] w-full overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label="Students learning with technology"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                >
                  <source
                    src="/dashboard-bg.mp4"
                    type="video/mp4"
                  />
                </video>

                {/* LIGHT OVERLAY */}
                <div className="pointer-events-none absolute inset-0 bg-black/20" />

                {/* LEFT GRADIENT */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />

                {/* BOTTOM GRADIENT */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

                {/* CONTENT */}
                <div className="absolute inset-0 z-20 flex items-center p-7 sm:p-10 lg:p-12">
                  <div className="max-w-3xl">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      AI-powered placement preparation
                    </span>

                    <h2 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                      Stop wondering what to prepare.
                      <span className="block text-indigo-300">
                        Start with your next best action.
                      </span>
                    </h2>

                    <p className="mt-6 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
                      Student Copilot helps you identify your placement gaps,
                      prioritize what matters most, and follow a personalized
                      preparation plan.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        href="/problem"
                        className="rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-900 shadow-xl transition hover:bg-slate-100"
                      >
                        Start My Analysis →
                      </Link>

                      <Link
                        href="/coach"
                        className="rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
                      >
                        Talk to AI Coach
                      </Link>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-4 text-xs text-white/70">
                      <span>✓ Personalized</span>
                      <span>✓ Action-focused</span>
                      <span>✓ Student-friendly</span>
                    </div>
                  </div>
                </div>

                {/* READINESS CARD */}
                <div className="absolute bottom-7 right-7 z-30 hidden w-[280px] rounded-3xl border border-white/20 bg-slate-950/65 p-5 shadow-2xl backdrop-blur-xl md:block">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white/60">
                        Placement Readiness
                      </p>

                      <p className="mt-1 text-4xl font-bold text-white">
                        68%
                      </p>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-indigo-400/30 bg-indigo-500/20 text-xs font-bold text-white">
                      AI
                    </div>
                  </div>

                  <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/15">
                    <div className="h-full w-[68%] rounded-full bg-indigo-400" />
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[11px] text-white/60">
                      Personalized estimate
                    </span>

                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                      Developing
                    </span>
                  </div>
                </div>

                {/* PLAY BUTTON ONLY IF AUTOPLAY FAILS */}
                {videoBlocked && (
                  <button
                    type="button"
                    onClick={startVideo}
                    className="absolute bottom-6 left-6 z-40 flex items-center gap-2 rounded-xl border border-white/20 bg-black/50 px-4 py-3 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-black/70"
                  >
                    <span>▶</span>
                    Play background animation
                  </button>
                )}
              </div>
            </section>

            {/* QUICK START */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                  Quick Start
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                  What do you want to solve today?
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Pick the area where you need the most help.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <QuickStartCard
                  icon="01"
                  title="Resume"
                  description="Make your resume stronger for placements."
                  onClick={() =>
                    startProblem("I need help improving my resume")
                  }
                />

                <QuickStartCard
                  icon="02"
                  title="Projects"
                  description="Build stronger and more relevant projects."
                  onClick={() =>
                    startProblem("I need help improving my projects")
                  }
                />

                <QuickStartCard
                  icon="03"
                  title="Interview"
                  description="Practice answering placement questions."
                  onClick={() =>
                    startProblem("I need help preparing for interviews")
                  }
                />

                <QuickStartCard
                  icon="04"
                  title="Skills"
                  description="Know what technical skills to prioritize."
                  onClick={() =>
                    startProblem("I need help improving my technical skills")
                  }
                />
              </div>
            </section>

            {/* READINESS */}
            <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                      Readiness Overview
                    </p>

                    <h3 className="mt-1 text-xl font-bold">
                      Where you stand
                    </h3>
                  </div>

                  <Link
                    href="/analysis"
                    className="text-sm font-semibold text-indigo-600"
                  >
                    View analysis →
                  </Link>
                </div>

                <div className="mt-7 space-y-6">
                  <ReadinessRow title="Technical Skills" value={61} />
                  <ReadinessRow title="Projects" value={54} />
                  <ReadinessRow title="Resume" value={76} />
                  <ReadinessRow title="Interview" value={58} />
                </div>
              </div>

              <div className="rounded-3xl border border-indigo-100 bg-indigo-50/70 p-6 shadow-sm sm:p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                  ✦
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  Today&apos;s Focus
                </p>

                <h3 className="mt-2 text-2xl font-bold leading-tight">
                  Start with your biggest gap.
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  You do not need to fix everything today. Focus on the area
                  where one action can create the biggest improvement.
                </p>

                <Link
                  href="/analysis"
                  className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
                >
                  Find My Biggest Gap →
                </Link>
              </div>
            </section>

            {/* JOURNEY */}
            <section>
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                  Your Journey
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                  From confusion to action
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  A simple preparation loop built around your needs.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <JourneyCard
                  step="01"
                  title="My Problem"
                  description="Tell Student Copilot what is blocking your preparation."
                  href="/problem"
                />

                <JourneyCard
                  step="02"
                  title="AI Analysis"
                  description="Understand your readiness and priority gaps."
                  href="/analysis"
                />

                <JourneyCard
                  step="03"
                  title="Action Plan"
                  description="Get practical tasks for your next 7 days."
                  href="/plan"
                />

                <JourneyCard
                  step="04"
                  title="AI Coach"
                  description="Practice and ask questions whenever you need help."
                  href="/coach"
                />
              </div>
            </section>

            {/* FINAL CTA */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                    Ready when you are
                  </p>

                  <h3 className="mt-1 text-2xl font-bold">
                    Your placement journey starts with one problem.
                  </h3>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Tell Student Copilot what you are struggling with and get a
                    focused next step.
                  </p>
                </div>

                <Link
                  href="/problem"
                  className="inline-flex shrink-0 items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
                >
                  Start Now →
                </Link>
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

function QuickStartCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-xs font-bold text-indigo-600">
          {icon}
        </span>

        <span className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-500">
          →
        </span>
      </div>

      <h4 className="mt-5 font-semibold text-slate-900">
        {title}
      </h4>

      <p className="mt-1 text-sm leading-5 text-slate-500">
        {description}
      </p>
    </button>
  );
}

function ReadinessRow({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">
          {title}
        </span>

        <span className="text-sm font-bold text-slate-900">
          {value}%
        </span>
      </div>

      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-indigo-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function JourneyCard({
  step,
  title,
  description,
  href,
}: {
  step: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-indigo-500">
          {step}
        </span>

        <span className="text-slate-300">→</span>
      </div>

      <h4 className="mt-5 font-semibold text-slate-900">
        {title}
      </h4>

      <p className="mt-1 text-sm leading-5 text-slate-500">
        {description}
      </p>
    </Link>
  );
}