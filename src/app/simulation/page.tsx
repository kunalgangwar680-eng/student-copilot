"use client";

import { useState } from "react";

type Stage =
  | "schedule"
  | "aptitude"
  | "hr"
  | "coding"
  | "result";

type AptitudeQuestion = {
  question: string;
  options: string[];
  answer: number;
};

type HRQuestion = {
  question: string;
};

type HRAnswer = {
  question: string;
  answer: string;
};

type CodingAnswer = {
  question: string;
  answer: string;
};

type ResultData = {
  aptitudeScore: number;
  hrScore: number;
  codingScore: number;
  overallScore: number;
  level: string;
  strengths: string[];
  weakAreas: string[];
  feedback: string;
};

const codingQuestions = [
  {
    question:
      "Write a JavaScript function that returns the largest number in an array.",
  },
  {
    question:
      "Explain how you would check whether a string is a palindrome. Write code or pseudocode.",
  },
];

export default function SimulationPage() {
  const [stage, setStage] =
    useState<Stage>("schedule");

  const [role, setRole] =
    useState("Software Developer");

  const [year, setYear] =
    useState("2nd Year");

  const [schedule, setSchedule] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [aptitudeQuestions, setAptitudeQuestions] =
    useState<AptitudeQuestion[]>([]);

  const [aptitudeIndex, setAptitudeIndex] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState<number | null>(null);

  const [aptitudeCorrect, setAptitudeCorrect] =
    useState(0);

  const [hrQuestions, setHrQuestions] =
    useState<HRQuestion[]>([]);

  const [hrIndex, setHrIndex] =
    useState(0);

  const [hrAnswer, setHrAnswer] =
    useState("");

  const [hrAnswers, setHrAnswers] =
    useState<HRAnswer[]>([]);

  const [codingIndex, setCodingIndex] =
    useState(0);

  const [codingAnswer, setCodingAnswer] =
    useState("");

  const [codingAnswers, setCodingAnswers] =
    useState<CodingAnswer[]>([]);

  const [result, setResult] =
    useState<ResultData | null>(null);

  async function startSimulation() {
    setLoading(true);

    const sessionSeed =
      `${Date.now()}-${Math.random()}`;

    try {
      localStorage.setItem(
        "placementSimulation",
        JSON.stringify({
          role,
          year,
          schedule,
          sessionSeed,
        })
      );

      // Generate fresh aptitude set
      const aptitudeResponse = await fetch(
        "/api/simulation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "generate_aptitude",
            role,
            year,
            sessionSeed,
          }),
        }
      );

      const aptitudeData =
        await aptitudeResponse.json();

      const questions =
        aptitudeData?.questions || [];

      setAptitudeQuestions(questions);
      setAptitudeIndex(0);
      setSelectedAnswer(null);
      setAptitudeCorrect(0);

      // Generate fresh HR set
      const hrResponse = await fetch(
        "/api/simulation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "generate_hr",
            role,
            year,
            sessionSeed,
          }),
        }
      );

      const hrData = await hrResponse.json();

      setHrQuestions(
        hrData?.questions || []
      );

      setHrIndex(0);
      setHrAnswers([]);
      setHrAnswer("");

      setCodingIndex(0);
      setCodingAnswers([]);
      setCodingAnswer("");

      setResult(null);
      setStage("aptitude");
    } catch (error) {
      console.error(
        "Simulation start error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  function submitAptitude() {
    if (
      selectedAnswer === null ||
      !aptitudeQuestions.length
    ) {
      return;
    }

    const current =
      aptitudeQuestions[aptitudeIndex];

    if (
      selectedAnswer === current.answer
    ) {
      setAptitudeCorrect(
        (prev) => prev + 1
      );
    }

    if (
      aptitudeIndex ===
      aptitudeQuestions.length - 1
    ) {
      setSelectedAnswer(null);
      setStage("hr");
      return;
    }

    setAptitudeIndex(
      (prev) => prev + 1
    );

    setSelectedAnswer(null);
  }

  function submitHR() {
    if (
      !hrAnswer.trim() ||
      !hrQuestions.length ||
      loading
    ) {
      return;
    }

    const nextAnswers = [
      ...hrAnswers,
      {
        question:
          hrQuestions[hrIndex].question,
        answer: hrAnswer.trim(),
      },
    ];

    setHrAnswers(nextAnswers);
    setHrAnswer("");

    if (
      hrIndex ===
      hrQuestions.length - 1
    ) {
      setCodingIndex(0);
      setCodingAnswer("");
      setCodingAnswers([]);
      setStage("coding");
      return;
    }

    setHrIndex(
      (prev) => prev + 1
    );
  }

  async function submitCoding() {
    if (
      !codingAnswer.trim() ||
      loading
    ) {
      return;
    }

    const nextCodingAnswers = [
      ...codingAnswers,
      {
        question:
          codingQuestions[codingIndex]
            .question,
        answer:
          codingAnswer.trim(),
      },
    ];

    setCodingAnswers(
      nextCodingAnswers
    );

    if (
      codingIndex <
      codingQuestions.length - 1
    ) {
      setCodingIndex(
        (prev) => prev + 1
      );

      setCodingAnswer("");
      return;
    }

    setLoading(true);

    try {
      const aptitudeScore = Math.round(
        (aptitudeCorrect /
          Math.max(
            aptitudeQuestions.length,
            1
          )) *
          100
      );

      const saved =
        localStorage.getItem(
          "placementSimulation"
        );

      let sessionSeed = "";

      try {
        sessionSeed = saved
          ? JSON.parse(saved).sessionSeed ||
            ""
          : "";
      } catch {
        sessionSeed = "";
      }

      const response = await fetch(
        "/api/simulation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "final_evaluate",
            role,
            year,
            sessionSeed,
            aptitudeScore,
            hrAnswers,
            codingAnswers:
              nextCodingAnswers,
          }),
        }
      );

      const data = await response.json();

      setResult({
        aptitudeScore:
          data?.aptitudeScore ??
          aptitudeScore,
        hrScore:
          data?.hrScore ?? 60,
        codingScore:
          data?.codingScore ?? 60,
        overallScore:
          data?.overallScore ?? 60,
        level:
          data?.level ??
          "Intermediate",
        strengths:
          data?.strengths ?? [],
        weakAreas:
          data?.weakAreas ?? [],
        feedback:
          data?.feedback ??
          "Keep practicing regularly.",
      });

      setStage("result");
    } catch (error) {
      console.error(
        "Final evaluation error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  function restart() {
    setStage("schedule");
    setAptitudeQuestions([]);
    setAptitudeIndex(0);
    setSelectedAnswer(null);
    setAptitudeCorrect(0);

    setHrQuestions([]);
    setHrIndex(0);
    setHrAnswer("");
    setHrAnswers([]);

    setCodingIndex(0);
    setCodingAnswer("");
    setCodingAnswers([]);

    setResult(null);
  }

  const currentAptitude =
    aptitudeQuestions[aptitudeIndex];

  const currentHR =
    hrQuestions[hrIndex];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-5 py-4 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
            Student Copilot
          </div>

          <div className="mt-1 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                Placement Simulation
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Aptitude → AI HR → Coding → Final Readiness
              </p>
            </div>

            <div className="hidden rounded-full bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-600 sm:block">
              AI Powered
            </div>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl gap-2 px-5 py-3 md:px-8">

          <ProgressStep
            number="1"
            label="Aptitude"
            active={stage === "aptitude"}
            done={
              stage === "hr" ||
              stage === "coding" ||
              stage === "result"
            }
          />

          <ProgressStep
            number="2"
            label="AI HR"
            active={stage === "hr"}
            done={
              stage === "coding" ||
              stage === "result"
            }
          />

          <ProgressStep
            number="3"
            label="Coding"
            active={stage === "coding"}
            done={stage === "result"}
          />

          <ProgressStep
            number="4"
            label="Result"
            active={stage === "result"}
            done={false}
          />

        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">

        {/* =============================================
            SCHEDULE
        ============================================== */}
        {stage === "schedule" && (
          <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-[1.2fr_0.8fr]">

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-8">

              <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600">
                Start Assessment
              </span>

              <h2 className="mt-4 text-3xl font-black">
                Test your placement readiness
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Every new session generates a fresh aptitude
                and AI HR question set.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-2">

                <Field label="Target role">
                  <select
                    value={role}
                    onChange={(e) =>
                      setRole(e.target.value)
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

                <Field label="Academic year">
                  <select
                    value={year}
                    onChange={(e) =>
                      setYear(e.target.value)
                    }
                    className="input"
                  >
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                    <option>Graduate</option>
                  </select>
                </Field>

                <Field label="Assessment date & time">
                  <input
                    type="datetime-local"
                    value={schedule}
                    onChange={(e) =>
                      setSchedule(
                        e.target.value
                      )
                    }
                    className="input"
                  />
                </Field>

              </div>

              <button
                onClick={startSimulation}
                disabled={loading}
                className="mt-7 w-full rounded-2xl bg-indigo-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading
                  ? "Generating Fresh Questions..."
                  : "Schedule & Start Assessment →"}
              </button>

            </div>

            <div className="space-y-4">

              <InfoCard
                number="01"
                title="Fresh Aptitude"
                text="AI generates a new mix of quant, reasoning, verbal and CS questions for each session."
              />

              <InfoCard
                number="02"
                title="AI HR Round"
                text="Every session gets a fresh set of HR questions based on the student's role."
              />

              <InfoCard
                number="03"
                title="Coding Test"
                text="Complete practical developer-focused coding questions."
              />

              <InfoCard
                number="04"
                title="Final Evaluation"
                text="Get your overall placement readiness, level and weak areas."
              />

            </div>

          </div>
        )}

        {/* =============================================
            APTITUDE
        ============================================== */}
        {stage === "aptitude" &&
          currentAptitude && (
            <div className="mx-auto max-w-3xl">

              <div className="mb-5 flex items-center justify-between">

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Round 1
                  </div>

                  <h2 className="mt-1 text-2xl font-bold">
                    AI-Generated Aptitude Test
                  </h2>
                </div>

                <div className="rounded-full bg-white px-4 py-2 text-xs font-bold shadow-sm">
                  {aptitudeIndex + 1} /{" "}
                  {aptitudeQuestions.length}
                </div>

              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

                <div className="mb-4 inline-flex rounded-full bg-indigo-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  Fresh Question
                </div>

                <h3 className="text-lg font-bold leading-7">
                  {currentAptitude.question}
                </h3>

                <div className="mt-6 space-y-3">

                  {currentAptitude.options.map(
                    (option, index) => (
                      <button
                        key={`${option}-${index}`}
                        onClick={() =>
                          setSelectedAnswer(index)
                        }
                        className={`w-full rounded-2xl border p-4 text-left text-sm transition ${
                          selectedAnswer ===
                          index
                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                            : "border-slate-200 bg-white hover:border-indigo-200"
                        }`}
                      >
                        <span className="mr-3 font-bold">
                          {String.fromCharCode(
                            65 + index
                          )}
                        </span>

                        {option}
                      </button>
                    )
                  )}

                </div>

                <button
                  onClick={submitAptitude}
                  disabled={
                    selectedAnswer === null
                  }
                  className="mt-6 w-full rounded-2xl bg-slate-900 px-5 py-4 text-sm font-bold text-white disabled:opacity-40"
                >
                  {aptitudeIndex ===
                  aptitudeQuestions.length - 1
                    ? "Finish Aptitude →"
                    : "Next Question →"}
                </button>

              </div>

            </div>
          )}

        {/* =============================================
            HR
        ============================================== */}
        {stage === "hr" &&
          currentHR && (
            <div className="mx-auto max-w-3xl">

              <div className="mb-5 flex items-center justify-between">

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Round 2
                  </div>

                  <h2 className="mt-1 text-2xl font-bold">
                    AI HR Interview
                  </h2>
                </div>

                <div className="rounded-full bg-white px-4 py-2 text-xs font-bold shadow-sm">
                  Question {hrIndex + 1} /{" "}
                  {hrQuestions.length}
                </div>

              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-xs font-bold text-white">
                    AI
                  </div>

                  <div>
                    <div className="text-sm font-bold">
                      AI HR Interviewer
                    </div>

                    <div className="text-xs text-slate-400">
                      {role}
                    </div>
                  </div>

                </div>

                <div className="mt-7 rounded-2xl bg-indigo-50 p-5">

                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                    Fresh AI Question
                  </div>

                  <p className="text-lg font-semibold leading-8">
                    {currentHR.question}
                  </p>

                </div>

                <textarea
                  value={hrAnswer}
                  onChange={(e) =>
                    setHrAnswer(
                      e.target.value
                    )
                  }
                  rows={7}
                  placeholder="Answer like you are in a real interview..."
                  className="mt-6 w-full resize-none rounded-2xl border border-slate-200 p-4 text-sm leading-6 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                />

                <button
                  onClick={submitHR}
                  disabled={!hrAnswer.trim()}
                  className="mt-4 w-full rounded-2xl bg-slate-900 px-5 py-4 text-sm font-bold text-white disabled:opacity-40"
                >
                  {hrIndex ===
                  hrQuestions.length - 1
                    ? "Finish HR Round →"
                    : "Submit Answer →"}
                </button>

              </div>

            </div>
          )}

        {/* =============================================
            CODING
        ============================================== */}
        {stage === "coding" && (
          <div className="mx-auto max-w-3xl">

            <div className="mb-5 flex items-center justify-between">

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Round 3
                </div>

                <h2 className="mt-1 text-2xl font-bold">
                  Coding Test
                </h2>
              </div>

              <div className="rounded-full bg-white px-4 py-2 text-xs font-bold shadow-sm">
                {codingIndex + 1} /{" "}
                {codingQuestions.length}
              </div>

            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

              <div className="rounded-2xl bg-slate-950 p-5 text-white">

                <div className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  Coding Question
                </div>

                <p className="mt-3 text-sm leading-7 text-slate-200">
                  {
                    codingQuestions[
                      codingIndex
                    ].question
                  }
                </p>

              </div>

              <textarea
                value={codingAnswer}
                onChange={(e) =>
                  setCodingAnswer(
                    e.target.value
                  )
                }
                rows={12}
                placeholder="Write your code or pseudocode here..."
                className="mt-5 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-6 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
              />

              <button
                onClick={submitCoding}
                disabled={
                  !codingAnswer.trim() ||
                  loading
                }
                className="mt-4 w-full rounded-2xl bg-indigo-600 px-5 py-4 text-sm font-bold text-white disabled:opacity-40"
              >
                {loading
                  ? "Generating Final Result..."
                  : codingIndex ===
                      codingQuestions.length - 1
                    ? "Finish Coding & Get Result →"
                    : "Submit Coding Answer →"}
              </button>

            </div>

          </div>
        )}

        {/* =============================================
            RESULT
        ============================================== */}
        {stage === "result" &&
          result && (
            <div className="space-y-5">

              <div className="rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm">

                <div className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                  Placement Simulation Complete
                </div>

                <h2 className="mt-3 text-3xl font-black">
                  Your Placement Readiness
                </h2>

                <div className="mx-auto mt-6 flex h-36 w-36 items-center justify-center rounded-full border-8 border-indigo-100 bg-indigo-50">

                  <div>
                    <div className="text-5xl font-black text-indigo-600">
                      {result.overallScore}
                    </div>

                    <div className="text-xs font-bold text-slate-400">
                      / 100
                    </div>
                  </div>

                </div>

                <div className="mt-5 inline-flex rounded-full bg-emerald-50 px-5 py-2 text-sm font-bold text-emerald-700">
                  {result.level}
                </div>

                <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-500">
                  {result.feedback}
                </p>

              </div>

              <div className="grid gap-4 md:grid-cols-3">

                <ScoreCard
                  label="Aptitude"
                  score={
                    result.aptitudeScore
                  }
                />

                <ScoreCard
                  label="AI HR"
                  score={
                    result.hrScore
                  }
                />

                <ScoreCard
                  label="Coding"
                  score={
                    result.codingScore
                  }
                />

              </div>

              <div className="grid gap-5 lg:grid-cols-2">

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Strong Areas
                  </div>

                  <div className="mt-4 space-y-3">

                    {result.strengths.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="rounded-xl bg-emerald-50 p-3 text-sm"
                        >
                          ✓ {item}
                        </div>
                      )
                    )}

                  </div>

                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                  <div className="text-xs font-bold uppercase tracking-wider text-rose-500">
                    Improve These
                  </div>

                  <div className="mt-4 space-y-3">

                    {result.weakAreas.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="rounded-xl bg-rose-50 p-3 text-sm"
                        >
                          {index + 1}. {item}
                        </div>
                      )
                    )}

                  </div>

                </div>

              </div>

              <div className="flex flex-col gap-3 sm:flex-row">

                <a
                  href="/plan"
                  className="flex-1 rounded-2xl bg-indigo-600 px-5 py-4 text-center text-sm font-bold text-white hover:bg-indigo-700"
                >
                  Improve with Action Plan →
                </a>

                <button
                  onClick={restart}
                  className="flex-1 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-bold hover:bg-slate-50"
                >
                  Take New Simulation
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

function ProgressStep({
  number,
  label,
  active,
  done,
}: {
  number: string;
  label: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <div
      className={`flex flex-1 items-center gap-2 rounded-xl px-3 py-2 ${
        active
          ? "bg-indigo-50 text-indigo-700"
          : done
            ? "bg-emerald-50 text-emerald-700"
            : "bg-slate-50 text-slate-400"
      }`}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-xs font-bold shadow-sm">
        {done ? "✓" : number}
      </span>

      <span className="hidden text-xs font-bold sm:block">
        {label}
      </span>
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

function InfoCard({
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

function ScoreCard({
  label,
  score,
}: {
  label: string;
  score: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="text-xs font-semibold text-slate-400">
        {label}
      </div>

      <div className="mt-2 text-3xl font-black">
        {score}
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all"
          style={{
            width: `${Math.max(
              0,
              Math.min(100, score)
            )}%`,
          }}
        />
      </div>

    </div>
  );
}