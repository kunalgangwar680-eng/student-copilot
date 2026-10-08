"use client";

import { useEffect, useState } from "react";

type Mode =
  | "loading"
  | "locked"
  | "ready"
  | "matched"
  | "feedback"
  | "done";

type SimulationResult = {
  aptitudeScore?: number;
  hrScore?: number;
  codingScore?: number;
  overallScore?: number;
  level?: string;
};

const peerPool = [
  {
    id: "SC-214",
    level: "Intermediate",
    role: "Software Developer",
  },
  {
    id: "SC-328",
    level: "Intermediate",
    role: "Software Developer",
  },
  {
    id: "SC-417",
    level: "Advanced",
    role: "Software Developer",
  },
  {
    id: "SC-502",
    level: "Beginner",
    role: "Software Developer",
  },
];

export default function PeerInterviewPage() {
  const [mode, setMode] =
    useState<Mode>("loading");

  const [result, setResult] =
    useState<SimulationResult | null>(
      null
    );

  const [role, setRole] =
    useState("Software Developer");

  const [level, setLevel] =
    useState("Intermediate");

  const [slot, setSlot] =
    useState("Today • 6:00 PM");

  const [peerName, setPeerName] =
    useState("");

  const [peerLevel, setPeerLevel] =
    useState("");

  const [feedback, setFeedback] =
    useState("");

  const [aiFeedback, setAiFeedback] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(
          "placementSimulationResult"
        );

      if (!saved) {
        setMode("locked");
        return;
      }

      const parsed: SimulationResult =
        JSON.parse(saved);

      setResult(parsed);

      const aptitudePassed =
        Number(
          parsed.aptitudeScore || 0
        ) >= 60;

      const hrPassed =
        Number(
          parsed.hrScore || 0
        ) >= 60;

      if (
        aptitudePassed &&
        hrPassed
      ) {
        setMode("ready");
      } else {
        setMode("locked");
      }
    } catch (error) {
      console.error(
        "Peer eligibility error:",
        error
      );

      setMode("locked");
    }
  }, []);

  function findMatch() {
    const compatiblePeers =
      peerPool.filter(
        (peer) =>
          peer.role === role
      );

    if (
      compatiblePeers.length === 0
    ) {
      setPeerName("Student #SC214");
      setPeerLevel("Intermediate");
    } else {
      const randomIndex =
        Math.floor(
          Math.random() *
            compatiblePeers.length
        );

      const selected =
        compatiblePeers[randomIndex];

      setPeerName(
        `Student #${selected.id}`
      );

      setPeerLevel(
        selected.level
      );
    }

    setMode("matched");
  }

  function confirmInterview() {
    localStorage.setItem(
      "peerInterview",
      JSON.stringify({
        peerName,
        peerLevel,
        role,
        level,
        slot,
        status: "scheduled",
      })
    );

    setMode("feedback");
  }

  async function submitFeedback() {
    if (!feedback.trim()) {
      return;
    }

    setLoading(true);

    try {
      const response =
        await fetch(
          "/api/coach",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              message: `
I completed a peer interview.

Target role: ${role}
My level: ${level}
Peer level: ${peerLevel}

Peer feedback:
${feedback}

Please provide:
1. What I did well
2. What I should improve
3. One practical action for today
4. One interview confidence tip

Keep the answer practical and concise.
`,
              problem:
                "Improve interview confidence and interview performance",
              goal:
                "Become placement ready",
              year: level,
            }),
          }
        );

      const data =
        await response.json();

      if (
        typeof data?.reply === "string"
      ) {
        setAiFeedback(
          data.reply
        );
      } else {
        setAiFeedback(
          "Focus on clear answers, structured communication, project explanation and regular interview practice."
        );
      }

      setMode("done");
    } catch (error) {
      console.error(
        "Peer AI feedback error:",
        error
      );

      setAiFeedback(
        "Focus on clear answers, project explanation, communication and interview confidence. Practice one mock interview again this week."
      );

      setMode("done");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setPeerName("");
    setPeerLevel("");
    setFeedback("");
    setAiFeedback("");
    setMode("ready");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white px-5 py-4 md:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
            Student Copilot
          </div>

          <div className="mt-1 flex items-center justify-between gap-4">

            <div>
              <h1 className="text-2xl font-black">
                Peer Interview Exchange
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Practice with another student and build interview confidence.
              </p>
            </div>

            <div className="hidden rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 sm:block">
              Eligibility Based
            </div>

          </div>

        </div>
      </header>

      {/* ==================================================
          MAIN
      ================================================== */}
      <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">

        {/* LOADING */}
        {mode === "loading" && (
          <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

            <h2 className="mt-5 text-xl font-bold">
              Checking eligibility...
            </h2>

          </div>
        )}

        {/* ==================================================
            LOCKED
        ================================================== */}
        {mode === "locked" && (
          <div className="mx-auto max-w-3xl">

            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                🔒
              </div>

              <div className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">
                Peer Interview Locked
              </div>

              <h2 className="mt-2 text-3xl font-black">
                Clear the required rounds first.
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
                Peer Interview unlocks after the student
                scores at least 60 in both Aptitude and
                AI HR.
              </p>

              <div className="mx-auto mt-6 grid max-w-lg gap-3 sm:grid-cols-2">

                <Requirement
                  label="Aptitude"
                  score={
                    result?.aptitudeScore ||
                    0
                  }
                />

                <Requirement
                  label="AI HR"
                  score={
                    result?.hrScore ||
                    0
                  }
                />

              </div>

              <a
                href="/simulation"
                className="mt-7 inline-flex rounded-2xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700"
              >
                Take Placement Simulation →
              </a>

            </div>

          </div>
        )}

        {/* ==================================================
            READY
        ================================================== */}
        {mode === "ready" && (
          <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-[1.1fr_0.9fr]">

            <div className="rounded-3xl border border-emerald-200 bg-white p-7 shadow-sm">

              <div className="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                ✓ Eligible
              </div>

              <h2 className="mt-4 text-3xl font-black">
                Peer Interview unlocked.
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                You cleared the required preparation rounds.
                Now practice with another student.
              </p>

              <div className="mt-7 grid gap-4">

                <Field label="Target Role">
                  <select
                    value={role}
                    onChange={(e) =>
                      setRole(
                        e.target.value
                      )
                    }
                    className="input"
                  >
                    <option>
                      Software Developer
                    </option>

                    <option>
                      Frontend Developer
                    </option>

                    <option>
                      Backend Developer
                    </option>

                    <option>
                      Full Stack Developer
                    </option>
                  </select>
                </Field>

                <Field label="Your Level">
                  <select
                    value={level}
                    onChange={(e) =>
                      setLevel(
                        e.target.value
                      )
                    }
                    className="input"
                  >
                    <option>
                      Beginner
                    </option>

                    <option>
                      Intermediate
                    </option>

                    <option>
                      Advanced
                    </option>
                  </select>
                </Field>

                <Field label="Preferred Slot">
                  <select
                    value={slot}
                    onChange={(e) =>
                      setSlot(
                        e.target.value
                      )
                    }
                    className="input"
                  >
                    <option>
                      Today • 6:00 PM
                    </option>

                    <option>
                      Today • 7:00 PM
                    </option>

                    <option>
                      Tomorrow • 5:00 PM
                    </option>

                    <option>
                      Tomorrow • 6:00 PM
                    </option>
                  </select>
                </Field>

              </div>

              <button
                onClick={
                  findMatch
                }
                className="mt-7 w-full rounded-2xl bg-indigo-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700"
              >
                Find Interview Partner →
              </button>

            </div>

            <div className="space-y-4">

              <Benefit
                number="01"
                title="Practice Both Sides"
                text="Take turns as interviewer and candidate."
              />

              <Benefit
                number="02"
                title="Build Confidence"
                text="Practice speaking before the real interview."
              />

              <Benefit
                number="03"
                title="Get Real Feedback"
                text="Your peer shares what you did well and what to improve."
              />

              <Benefit
                number="04"
                title="AI Improvement"
                text="Student Copilot converts feedback into practical advice."
              />

            </div>

          </div>
        )}

        {/* ==================================================
            MATCHED
        ================================================== */}
        {mode === "matched" && (
          <div className="mx-auto max-w-3xl">

            <div className="rounded-3xl border border-indigo-100 bg-white p-8 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                🎯
              </div>

              <div className="mt-5 text-xs font-bold uppercase tracking-wider text-indigo-600">
                Match Found
              </div>

              <h2 className="mt-2 text-3xl font-black">
                Your interview partner is ready.
              </h2>

              <div className="mx-auto mt-7 max-w-lg rounded-2xl bg-slate-50 p-5 text-left">

                <div className="flex items-center justify-between">

                  <div>
                    <div className="text-xs text-slate-400">
                      Interview Partner
                    </div>

                    <div className="mt-1 text-lg font-bold">
                      {peerName}
                    </div>
                  </div>

                  <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    Eligible
                  </div>

                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">

                  <Info
                    label="Role"
                    value={role}
                  />

                  <Info
                    label="Peer Level"
                    value={peerLevel}
                  />

                  <Info
                    label="Interview Slot"
                    value={slot}
                  />

                  <Info
                    label="Format"
                    value="Peer Interview"
                  />

                </div>

              </div>

              <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-slate-500">
                You both take turns as interviewer and candidate.
              </p>

              <button
                onClick={
                  confirmInterview
                }
                className="mt-7 w-full rounded-2xl bg-slate-900 px-5 py-4 text-sm font-bold text-white hover:bg-slate-800"
              >
                Confirm Interview Schedule →
              </button>

            </div>

          </div>
        )}

        {/* ==================================================
            FEEDBACK
        ================================================== */}
        {mode === "feedback" && (
          <div className="mx-auto max-w-3xl">

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="inline-flex rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600">
                Interview Completed
              </div>

              <h2 className="mt-4 text-3xl font-black">
                Add your peer's feedback
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Ask your peer what you did well and what you
                should improve. Student Copilot will turn that
                feedback into your next action.
              </p>

              <textarea
                value={feedback}
                onChange={(e) =>
                  setFeedback(
                    e.target.value
                  )
                }
                rows={8}
                placeholder="Example: My technical answers were good, but I need to explain my projects more clearly..."
                className="mt-6 w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm leading-6 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
              />

              <button
                onClick={
                  submitFeedback
                }
                disabled={
                  !feedback.trim() ||
                  loading
                }
                className="mt-4 w-full rounded-2xl bg-indigo-600 px-5 py-4 text-sm font-bold text-white disabled:opacity-40"
              >
                {loading
                  ? "AI is analyzing feedback..."
                  : "Get AI Improvement Advice →"}
              </button>

            </div>

          </div>
        )}

        {/* ==================================================
            DONE
        ================================================== */}
        {mode === "done" && (
          <div className="mx-auto max-w-4xl space-y-5">

            <div className="rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
                ✓
              </div>

              <div className="mt-5 text-xs font-bold uppercase tracking-wider text-emerald-600">
                Peer Interview Complete
              </div>

              <h2 className="mt-2 text-3xl font-black">
                Great job. Keep practicing.
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                You completed a peer interview and converted
                the experience into improvement guidance.
              </p>

            </div>

            <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-7">

              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                AI Improvement Advice
              </div>

              <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                {aiFeedback}
              </p>

            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              <a
                href="/plan"
                className="flex-1 rounded-2xl bg-indigo-600 px-5 py-4 text-center text-sm font-bold text-white hover:bg-indigo-700"
              >
                Open Action Plan →
              </a>

              <button
                onClick={reset}
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold hover:bg-slate-50"
              >
                Find Another Partner
              </button>

            </div>

          </div>
        )}

      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.875rem;
          border: 1px solid rgb(226 232 240);
          background: white;
          padding: 0.75rem 0.875rem;
          font-size: 0.875rem;
          outline: none;
        }

        .input:focus {
          border-color: rgb(129 140 248);
          box-shadow: 0 0 0 4px rgb(238 242 255);
        }
      `}</style>
    </main>
  );
}

/* ============================================================
   COMPONENTS
============================================================ */

function Requirement({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  const passed = score >= 60;

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">

      <div className="flex items-center justify-between">

        <span className="text-xs font-semibold text-slate-500">
          {label}
        </span>

        <span
          className={`rounded-full px-2 py-1 text-[10px] font-bold ${
            passed
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-600"
          }`}
        >
          {passed
            ? "PASSED"
            : "NOT PASSED"}
        </span>

      </div>

      <div className="mt-2 text-2xl font-black">
        {score}
      </div>

    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </label>

      {children}
    </div>
  );
}

function Benefit({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex gap-3">

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600">
          {number}
        </div>

        <div>
          <div className="text-sm font-bold">
            {title}
          </div>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {text}
          </p>
        </div>

      </div>

    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </div>

      <div className="mt-1 text-sm font-semibold">
        {value}
      </div>
    </div>
  );
}