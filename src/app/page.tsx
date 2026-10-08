"use client";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">

        {/* =====================================================
            SIDEBAR
        ====================================================== */}
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-slate-950 p-5 text-white md:block">

          {/* Logo */}
          <div className="mb-9 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-xs font-black shadow-lg shadow-indigo-900/30">
              SC
            </div>

            <div>
              <div className="text-sm font-bold">
                Student
              </div>

              <div className="text-xs text-slate-400">
                Copilot
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">

            <SidebarItem
              href="/"
              label="Dashboard"
              active
              icon={<DashboardIcon />}
            />

            <SidebarItem
              href="/problem"
              label="My Problem"
              icon={<ProblemIcon />}
            />

            <SidebarItem
              href="/analysis"
              label="AI Analysis"
              icon={<AnalysisIcon />}
            />

            <SidebarItem
              href="/plan"
              label="Action Plan"
              icon={<PlanIcon />}
            />

            <SidebarItem
              href="/coach"
              label="AI Coach"
              icon={<CoachIcon />}
            />

            {/* IMPORTANT: INTERVIEW ICON */}
            <SidebarItem
              href="/simulation"
              label="Placement Simulation"
              icon={<InterviewIcon />}
            />

            {/* IMPORTANT: PEER INTERVIEW ICON */}
            <SidebarItem
              href="/peer-interview"
              label="Peer Interview"
              icon={<PeerInterviewIcon />}
            />

            <SidebarItem
              href="/progress"
              label="Progress"
              icon={<ProgressIcon />}
            />

            <SidebarItem
              href="/evidence"
              label="Evidence"
              icon={<EvidenceIcon />}
            />

          </nav>

          {/* Sidebar info */}
          <div className="mt-10 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4">

            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-300">
              Student Copilot
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-300">
              Understand your gaps. Take action. Become
              placement-ready.
            </p>

          </div>
        </aside>

        {/* =====================================================
            MAIN AREA
        ====================================================== */}
        <section className="min-w-0 flex-1">

          {/* Header */}
          <header className="border-b border-slate-200 bg-white px-5 py-4 md:px-8">

            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">

              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-indigo-600">
                  Student Copilot
                </div>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                  Placement Dashboard
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Your preparation, analyzed and organized
                  in one place.
                </p>
              </div>

              <div className="flex items-center gap-3">

                <a
                  href="/simulation"
                  className="hidden rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 sm:inline-flex"
                >
                  Start Simulation →
                </a>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                  K
                </div>

              </div>

            </div>

          </header>

          {/* =====================================================
              CONTENT
          ====================================================== */}
          <div className="px-4 py-6 md:px-8 md:py-8">

            <div className="mx-auto max-w-7xl space-y-6">

              {/* =================================================
                  HERO WITH VIDEO
              ================================================== */}
              <section className="relative min-h-[440px] overflow-hidden rounded-[32px] border border-slate-800 bg-[#071735] shadow-2xl">

                {/* Video only inside hero */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="absolute inset-0 h-full w-full object-cover opacity-75"
                >
                  <source
                    src="/dashboard-bg.mp4"
                    type="video/mp4"
                  />
                </video>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#06183d]/50" />

                <div className="absolute inset-0 bg-blue-900/20" />

                <div className="absolute inset-0 bg-gradient-to-r from-[#04132f]/80 via-[#08265a]/45 to-[#0b3d7a]/25" />

                {/* Content */}
                <div className="relative z-10 flex min-h-[440px] items-center p-6 md:p-10 lg:p-12">

                  <div className="grid w-full gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">

                    {/* Left */}
                    <div>

                      <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-100 backdrop-blur-md">
                        AI-Powered Placement Preparation
                      </div>

                      <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-tight text-white drop-shadow-2xl md:text-5xl lg:text-6xl">
                        Know what is stopping you from becoming
                        placement-ready.
                      </h2>

                      <p className="mt-5 max-w-2xl text-sm leading-7 text-blue-50 md:text-base">
                        Student Copilot helps you identify your
                        biggest preparation gaps, create a focused
                        action plan, practice with AI, and measure
                        your progress.
                      </p>

                      <div className="mt-7 flex flex-col gap-3 sm:flex-row">

                        <a
                          href="/problem"
                          className="rounded-2xl bg-white px-5 py-3.5 text-center text-sm font-bold text-[#09245a] shadow-xl transition hover:bg-slate-100"
                        >
                          Find My Gaps →
                        </a>

                        <a
                          href="/simulation"
                          className="rounded-2xl border border-white/25 bg-white/10 px-5 py-3.5 text-center text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20"
                        >
                          Take Placement Simulation
                        </a>

                      </div>

                      <div className="mt-7 flex flex-wrap gap-2">

                        <HeroPill text="AI Analysis" />
                        <HeroPill text="AI Coach" />
                        <HeroPill text="Placement Simulation" />
                        <HeroPill text="Peer Interview" />

                      </div>

                    </div>

                    {/* Right readiness card */}
                    <div className="rounded-3xl border border-white/20 bg-[#071a40]/65 p-6 shadow-2xl backdrop-blur-md md:p-7">

                      <div className="flex items-start justify-between gap-4">

                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                            Placement Readiness
                          </div>

                          <div className="mt-2 text-5xl font-black text-white">
                            —
                          </div>

                          <div className="mt-1 text-xs text-blue-100">
                            Complete your profile to get your score
                          </div>
                        </div>

                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-8 border-white/10 bg-white/10 text-xs font-bold text-white backdrop-blur-md">
                          Start
                        </div>

                      </div>

                      <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full w-[18%] rounded-full bg-blue-300" />
                      </div>

                      <p className="mt-3 text-xs leading-5 text-blue-100">
                        Your readiness score becomes more useful
                        as you add your skills, projects, resume
                        and interview information.
                      </p>

                      <a
                        href="/analysis"
                        className="mt-5 inline-flex rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#09245a] transition hover:bg-slate-100"
                      >
                        Start AI Analysis →
                      </a>

                    </div>

                  </div>

                </div>

              </section>

              {/* =================================================
                  STATS
              ================================================== */}
              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <StatCard
                  label="AI Analysis"
                  value="Ready"
                  description="Find your top gaps"
                  href="/analysis"
                  icon={<AnalysisIcon />}
                />

                <StatCard
                  label="Action Plan"
                  value="7 Days"
                  description="Focused preparation"
                  href="/plan"
                  icon={<PlanIcon />}
                />

                <StatCard
                  label="AI Coach"
                  value="Live"
                  description="Ask placement questions"
                  href="/coach"
                  icon={<CoachIcon />}
                />

                <StatCard
                  label="Simulation"
                  value="3 Rounds"
                  description="Aptitude + AI HR + Coding"
                  href="/simulation"
                  icon={<InterviewIcon />}
                />

              </section>

              {/* =================================================
                  FEATURE CARDS
              ================================================== */}
              <section className="grid gap-5 lg:grid-cols-3">

                <FeatureCard
                  number="01"
                  title="My Problem"
                  description="Tell Student Copilot what is blocking your placement preparation."
                  href="/problem"
                  button="Tell Your Problem"
                  icon={<ProblemIcon />}
                />

                <FeatureCard
                  number="02"
                  title="AI Analysis"
                  description="Get a personalized readiness assessment and your top priority gaps."
                  href="/analysis"
                  button="Run AI Analysis"
                  icon={<AnalysisIcon />}
                />

                <FeatureCard
                  number="03"
                  title="Action Plan"
                  description="Turn your biggest weaknesses into practical tasks you can complete."
                  href="/plan"
                  button="Open Action Plan"
                  icon={<PlanIcon />}
                />

              </section>

              {/* =================================================
                  PLACEMENT SIMULATION
              ================================================== */}
              <section className="overflow-hidden rounded-3xl border border-indigo-100 bg-slate-950 p-6 text-white shadow-2xl md:p-8">

                <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">

                  <div>

                    <div className="inline-flex rounded-full bg-indigo-500/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                      Placement Experience
                    </div>

                    <div className="mt-4 flex items-center gap-3">

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600">
                        <InterviewIcon />
                      </div>

                      <h2 className="text-2xl font-black md:text-3xl">
                        Test yourself like a real placement process.
                      </h2>

                    </div>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                      Take an aptitude test, complete an AI HR
                      round, solve coding questions, and get a final
                      placement readiness assessment.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      <DarkPill text="Aptitude" />
                      <DarkPill text="AI HR" />
                      <DarkPill text="Coding" />
                      <DarkPill text="Final Score" />
                    </div>

                  </div>

                  <a
                    href="/simulation"
                    className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-900/30 transition hover:bg-indigo-500"
                  >
                    Start Placement Simulation →
                  </a>

                </div>

              </section>

              {/* =================================================
                  PEER INTERVIEW
              ================================================== */}
              <section className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6 shadow-lg md:p-8">

                <div className="grid gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-center">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                    <PeerInterviewIcon />
                  </div>

                  <div>

                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                      Build Interview Confidence
                    </div>

                    <h2 className="mt-2 text-2xl font-black text-slate-900">
                      Practice with another student.
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                      Clear the required preparation rounds, find an
                      eligible peer, schedule an interview and use
                      the experience to improve your confidence.
                    </p>

                  </div>

                  <a
                    href="/peer-interview"
                    className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700"
                  >
                    Practice with a Peer →
                  </a>

                </div>

              </section>

              {/* =================================================
                  AI COACH + PROGRESS
              ================================================== */}
              <section className="grid gap-5 lg:grid-cols-2">

                {/* AI Coach */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">

                  <div className="flex items-center justify-between">

                    <div>

                      <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">
                        AI Coach
                      </div>

                      <h3 className="mt-2 text-xl font-bold">
                        Need help with preparation?
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        Ask about interviews, resume, projects,
                        technical skills or placements.
                      </p>

                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                      <CoachIcon />
                    </div>

                  </div>

                  <a
                    href="/coach"
                    className="mt-6 inline-flex rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold text-white"
                  >
                    Open AI Coach →
                  </a>

                </div>

                {/* Progress */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">

                  <div className="flex items-center justify-between">

                    <div>

                      <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                        Progress
                      </div>

                      <h3 className="mt-2 text-xl font-bold">
                        Track your preparation
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        See completed tasks and understand how your
                        preparation is moving forward.
                      </p>

                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                      <ProgressIcon />
                    </div>

                  </div>

                  <a
                    href="/progress"
                    className="mt-6 inline-flex rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white"
                  >
                    View Progress →
                  </a>

                </div>

              </section>

              {/* Footer */}
              <footer className="py-4 text-center text-[10px] text-slate-400">
                Student Copilot • AI-powered placement preparation
              </footer>

            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ============================================================
   SIDEBAR ITEM
============================================================ */

function SidebarItem({
  href,
  label,
  icon,
  active = false,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
        active
          ? "bg-indigo-600 font-semibold text-white shadow-lg shadow-indigo-900/30"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
          active
            ? "bg-white/10"
            : "bg-white/5 group-hover:bg-white/10"
        }`}
      >
        {icon}
      </span>

      <span className="truncate">
        {label}
      </span>
    </a>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  label,
  value,
  description,
  href,
  icon,
}: {
  label: string;
  value: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
    >
      <div className="flex items-start justify-between">

        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {label}
          </div>

          <div className="mt-2 text-2xl font-black text-slate-900">
            {value}
          </div>

          <div className="mt-1 text-xs text-slate-500">
            {description}
          </div>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {icon}
        </div>

      </div>

      <div className="mt-4 text-xs font-bold text-indigo-600 transition group-hover:translate-x-0.5">
        Open →
      </div>
    </a>
  );
}

/* ============================================================
   FEATURE CARD
============================================================ */

function FeatureCard({
  number,
  title,
  description,
  href,
  button,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  href: string;
  button: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="flex items-center justify-between">

        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {icon}
        </span>

        <span className="text-xs font-bold text-slate-300">
          {number}
        </span>

      </div>

      <h3 className="mt-5 text-xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>

      <div className="mt-6 inline-flex rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white">
        {button}
      </div>
    </a>
  );
}

/* ============================================================
   PILLS
============================================================ */

function HeroPill({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
      {text}
    </span>
  );
}

function DarkPill({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300">
      {text}
    </span>
  );
}

/* ============================================================
   ICONS
============================================================ */

function DashboardIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function ProblemIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-1 .8-1.7 1.3-1.7 2.7" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function AnalysisIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="m7 15 3-4 3 2 5-6" />
    </svg>
  );
}

function PlanIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 11l3 3L21 5" />
      <path d="M21 12v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10" />
    </svg>
  );
}

function CoachIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a8.5 8.5 0 0 1-9 8 8.8 8.8 0 0 1-4-.9L3 21l1.5-4A7.7 7.7 0 0 1 3 12a8.5 8.5 0 0 1 9-8 8.5 8.5 0 0 1 9 8Z" />
      <path d="M8 12h.01" />
      <path d="M12 12h.01" />
      <path d="M16 12h.01" />
    </svg>
  );
}

/* INTERVIEW ICON */
function InterviewIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="12" r="2.2" />
      <path d="M13.5 10h4" />
      <path d="M13.5 13h4" />
      <path d="M7.5 16h9" />
    </svg>
  );
}

/* PEER INTERVIEW ICON */
function PeerInterviewIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="8" r="3" />
      <path d="M2.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M13 19a5.5 5.5 0 0 1 8.5 0" />
    </svg>
  );
}

function ProgressIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M7 15l3-3 3 2 4-5" />
    </svg>
  );
}

function EvidenceIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3h9l3 3v15H6z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
    </svg>
  );
}