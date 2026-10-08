"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";

type EvidenceEntry = {
  id: string;
  anonymousName: string;
  year: string;
  mainProblem: string;
  biggestChallenge: string;
  currentTools: string;
  wouldUse: string;
  quote: string;
};

const emptyForm: Omit<EvidenceEntry, "id"> = {
  anonymousName: "",
  year: "",
  mainProblem: "",
  biggestChallenge: "",
  currentTools: "",
  wouldUse: "",
  quote: "",
};

export default function EvidencePage() {
  const [entries, setEntries] = useState<EvidenceEntry[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const stored = localStorage.getItem("studentEvidence");

      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setEntries(parsed);
        }
      }
    } catch (error) {
      console.error("Evidence loading error:", error);
    }
  }, []);

  const progress = Math.min(entries.length, 5);

  const completionText = useMemo(() => {
    if (entries.length >= 5) {
      return "Minimum evidence target reached";
    }

    return `${5 - entries.length} more student response${
      5 - entries.length === 1 ? "" : "s"
    } needed`;
  }, [entries.length]);

  function updateField(
    field: keyof Omit<EvidenceEntry, "id">,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
    setSaved(false);
  }

  function submitEvidence(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !form.mainProblem.trim() ||
      !form.biggestChallenge.trim() ||
      !form.currentTools.trim() ||
      !form.wouldUse.trim()
    ) {
      return;
    }

    const newEntry: EvidenceEntry = {
      id: `evidence-${Date.now()}`,
      ...form,
      anonymousName: form.anonymousName.trim() || "Anonymous Student",
      year: form.year.trim() || "Not specified",
      mainProblem: form.mainProblem.trim(),
      biggestChallenge: form.biggestChallenge.trim(),
      currentTools: form.currentTools.trim(),
      wouldUse: form.wouldUse.trim(),
      quote: form.quote.trim(),
    };

    const updatedEntries = [...entries, newEntry];

    setEntries(updatedEntries);
    localStorage.setItem(
      "studentEvidence",
      JSON.stringify(updatedEntries)
    );

    setForm(emptyForm);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  function deleteEntry(id: string) {
    const updatedEntries = entries.filter((entry) => entry.id !== id);

    setEntries(updatedEntries);
    localStorage.setItem(
      "studentEvidence",
      JSON.stringify(updatedEntries)
    );
  }

  function clearEvidence() {
    setEntries([]);
    localStorage.removeItem("studentEvidence");
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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 text-white">
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
            <NavItem href="/progress" icon="↗" label="Progress" />
            <NavItem href="/evidence" icon="◎" label="Evidence" active />
          </nav>

          <div className="mt-10 rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
              Research evidence
            </p>

            <p className="mt-2 text-sm leading-5 text-slate-300">
              Capture real student responses to validate the problem.
            </p>
          </div>
        </aside>

        {/* MAIN */}
        <section className="flex-1">
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-500">
                Evidence
              </p>

              <h1 className="mt-1 text-xl font-bold sm:text-2xl">
                Student Research
              </h1>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
              K
            </div>
          </header>

          <div className="mx-auto max-w-7xl space-y-6 px-5 py-6 sm:px-8">
            {/* HERO */}
            <section className="overflow-hidden rounded-[28px] bg-slate-950 p-6 text-white shadow-xl sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[1fr_300px] lg:items-center">
                <div>
                  <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-300">
                    Problem validation
                  </span>

                  <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
                    Talk to students.{" "}
                    <span className="text-indigo-300">
                      Prove the problem.
                    </span>
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                    Collect genuine student feedback about placement
                    preparation problems, existing tools and willingness to
                    use a solution like Student Copilot.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href="#collect"
                      className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                    >
                      Add Student Response →
                    </a>

                    <Link
                      href="/"
                      className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Back to Dashboard
                    </Link>
                  </div>
                </div>

                {/* TARGET */}
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Research target
                  </p>

                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <span className="text-5xl font-bold">
                        {entries.length}
                      </span>

                      <span className="ml-2 text-sm text-slate-400">
                        responses
                      </span>
                    </div>

                    <span className="text-sm font-semibold text-indigo-300">
                      / 5 target
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-5 gap-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div
                        key={`target-${index}`}
                        className={`h-2 rounded-full ${
                          index < entries.length
                            ? "bg-indigo-400"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="mt-4 text-xs text-slate-400">
                    {completionText}
                  </p>
                </div>
              </div>
            </section>

            {/* NOTICE */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  !
                </div>

                <div>
                  <p className="text-sm font-semibold text-amber-900">
                    Use real student responses only
                  </p>

                  <p className="mt-1 text-xs leading-5 text-amber-800">
                    Do not invent survey results, quotes or percentages.
                    Responses should come from actual students you speak to.
                    Keep the information anonymous.
                  </p>
                </div>
              </div>
            </div>

            {/* FORM */}
            <section
              id="collect"
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                  Interview / survey entry
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                  Add a student response
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Avoid unnecessary personal information. Anonymous responses
                  are enough for this prototype.
                </p>
              </div>

              <form onSubmit={submitEvidence} className="mt-7 space-y-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field
                    label="Student label"
                    placeholder="Anonymous Student 1"
                    value={form.anonymousName}
                    onChange={(value) =>
                      updateField("anonymousName", value)
                    }
                  />

                  <Field
                    label="Academic year"
                    placeholder="2nd year / 3rd year / Final year"
                    value={form.year}
                    onChange={(value) => updateField("year", value)}
                  />
                </div>

                <Field
                  label="What is their main placement preparation problem?"
                  placeholder="Example: I don't know what to prepare first."
                  value={form.mainProblem}
                  onChange={(value) =>
                    updateField("mainProblem", value)
                  }
                  required
                  textarea
                />

                <Field
                  label="What is the biggest challenge they face?"
                  placeholder="Example: Too many resources and no clear plan."
                  value={form.biggestChallenge}
                  onChange={(value) =>
                    updateField("biggestChallenge", value)
                  }
                  required
                  textarea
                />

                <Field
                  label="What tools or methods do they use today?"
                  placeholder="Example: YouTube, Google, college groups, coding platforms."
                  value={form.currentTools}
                  onChange={(value) =>
                    updateField("currentTools", value)
                  }
                  required
                  textarea
                />

                <Field
                  label="Would they use a tool like Student Copilot?"
                  placeholder="Record their real answer and why."
                  value={form.wouldUse}
                  onChange={(value) =>
                    updateField("wouldUse", value)
                  }
                  required
                  textarea
                />

                <Field
                  label="Optional direct quote"
                  placeholder="Write only a short quote actually said by the student."
                  value={form.quote}
                  onChange={(value) => updateField("quote", value)}
                  textarea
                />

                <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-slate-400">
                    Keep responses anonymous and based on real conversations.
                  </p>

                  <button
                    type="submit"
                    className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Save Student Response →
                  </button>
                </div>

                {saved && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    Student response saved successfully.
                  </div>
                )}
              </form>
            </section>

            {/* SAVED RESPONSES */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                    Collected evidence
                  </p>

                  <h3 className="mt-1 text-2xl font-bold">
                    Student Responses
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    These are stored locally in your browser for the prototype.
                  </p>
                </div>

                {entries.length > 0 && (
                  <button
                    type="button"
                    onClick={clearEvidence}
                    className="text-xs font-semibold text-red-500 hover:text-red-600"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="mt-6 space-y-4">
                {entries.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-xl text-slate-400">
                      ◎
                    </div>

                    <h4 className="mt-4 font-semibold text-slate-700">
                      No responses collected yet
                    </h4>

                    <p className="mt-1 text-sm text-slate-400">
                      Talk to real students and add their responses above.
                    </p>
                  </div>
                ) : (
                  entries.map((entry, index) => (
                    <div
                      key={entry.id}
                      className="rounded-2xl border border-slate-200 p-5"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600">
                            {index + 1}
                          </div>

                          <div>
                            <h4 className="font-semibold text-slate-900">
                              {entry.anonymousName}
                            </h4>

                            <p className="text-xs text-slate-400">
                              {entry.year}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteEntry(entry.id)}
                          className="text-xs font-medium text-slate-400 hover:text-red-500"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <ResponseBox
                          label="Main problem"
                          value={entry.mainProblem}
                        />

                        <ResponseBox
                          label="Biggest challenge"
                          value={entry.biggestChallenge}
                        />

                        <ResponseBox
                          label="Current tools"
                          value={entry.currentTools}
                        />

                        <ResponseBox
                          label="Would use Student Copilot?"
                          value={entry.wouldUse}
                        />
                      </div>

                      {entry.quote && (
                        <div className="mt-4 rounded-2xl bg-indigo-50/70 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                            Student quote
                          </p>

                          <p className="mt-2 text-sm italic leading-6 text-slate-700">
                            “{entry.quote}”
                          </p>
                        </div>
                      )}
                    </div>
                  ))
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

function Field({
  label,
  placeholder,
  value,
  onChange,
  required = false,
  textarea = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  textarea?: boolean;
}) {
  const commonClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100";

  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </span>

      {textarea ? (
        <textarea
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={4}
          className={`${commonClass} resize-none`}
        />
      ) : (
        <input
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={commonClass}
        />
      )}
    </label>
  );
}

function ResponseBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm leading-6 text-slate-700">
        {value}
      </p>
    </div>
  );
}