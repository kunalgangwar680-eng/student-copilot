"use client";

import { FormEvent, useEffect, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type StudentProfile = {
  problem?: string;
  goal?: string;
  year?: string;
  skills?: string;
  projects?: string;
  resume?: string;
  interview?: string;
};

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I’m Student Copilot. Tell me what’s blocking your placement preparation, and I’ll help you turn it into a clear next step.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [studentProfile, setStudentProfile] =
    useState<StudentProfile | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("studentProfile");

      if (saved) {
        setStudentProfile(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to load student profile:", error);
    }
  }, []);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = input.trim();

    if (!message || loading) return;

    const userMessage: Message = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          problem:
            studentProfile?.problem || "Placement preparation",
          goal:
            studentProfile?.goal || "Get placement ready",
          year:
            studentProfile?.year || "College student",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.reply || "AI Coach request failed"
        );
      }

      const aiReply =
        typeof data?.reply === "string" && data.reply.trim()
          ? data.reply.trim()
          : "I couldn't generate a response. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aiReply,
        },
      ]);
    } catch (error) {
      console.error("Coach error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I couldn't connect to the AI Coach right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function startNewChat() {
    setMessages([
      {
        role: "assistant",
        content:
          "Hi! I’m Student Copilot. Tell me what you want to improve for your placement preparation.",
      },
    ]);

    setInput("");
  }

  function useSuggestion(text: string) {
    setInput(text);
  }

  const suggestions = [
    "Help me improve my placement preparation",
    "Ask me 5 interview questions",
    "How should I improve my resume?",
    "Give me a plan for technical interviews",
  ];

  return (
    <main className="relative min-h-screen overflow-hidden text-slate-900">

      {/* =====================================================
          ANIMATED VIDEO BACKGROUND
      ====================================================== */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="fixed inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/dashboard-bg.mp4" type="video/mp4" />
      </video>

      {/* LIGHT OVERLAY - video stays clearly visible */}
      <div className="fixed inset-0 z-0 bg-white/25" />

      {/* VERY SOFT EXTRA LAYER */}
      <div className="fixed inset-0 z-0 bg-white/10" />


      {/* =====================================================
          PAGE CONTENT
      ====================================================== */}
      <div className="relative z-10 flex min-h-screen">

        {/* ===================================================
            SIDEBAR
        ==================================================== */}
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-slate-950/95 p-5 text-white shadow-2xl backdrop-blur-xl md:block">

          {/* Logo */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-xs font-bold shadow-lg shadow-indigo-500/30">
              SC
            </div>

            <div>
              <div className="text-sm font-bold leading-tight">
                Student
              </div>

              <div className="text-xs text-slate-400">
                Copilot
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">

            <a
              href="/"
              className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/5 text-xs">
                ◌
              </span>
              Dashboard
            </a>

            <a
              href="/problem"
              className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/5 text-xs">
                ✦
              </span>
              My Problem
            </a>

            <a
              href="/analysis"
              className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/5 text-xs">
                ◎
              </span>
              AI Analysis
            </a>

            <a
              href="/plan"
              className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/5 text-xs">
                ✓
              </span>
              Action Plan
            </a>

            {/* Active */}
            <a
              href="/coach"
              className="flex items-center gap-3 rounded-xl bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/30"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500 text-xs">
                ●
              </span>
              AI Coach
            </a>

            <a
              href="/progress"
              className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/5 text-xs">
                ↗
              </span>
              Progress
            </a>

            <a
              href="/evidence"
              className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/5 text-xs">
                ◎
              </span>
              Evidence
            </a>

          </nav>

          {/* Sidebar bottom card */}
          <div className="mt-10 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-4">
            <div className="text-[10px] font-semibold uppercase tracking-widest text-indigo-300">
              AI Coach
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-300">
              Ask, practice, improve, repeat.
            </p>
          </div>

        </aside>


        {/* ===================================================
            MAIN AREA
        ==================================================== */}
        <section className="flex min-h-screen min-w-0 flex-1 flex-col">

          {/* Header */}
          <header className="border-b border-white/60 bg-white/60 px-5 py-4 backdrop-blur-md md:px-8">
            <div className="flex items-center justify-between gap-4">

              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-indigo-600">
                  Student Copilot
                </div>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                  AI Coach
                </h1>
              </div>

              <div className="flex items-center gap-3">

                <button
                  type="button"
                  onClick={startNewChat}
                  className="rounded-xl border border-slate-200 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-white"
                >
                  New Chat
                </button>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white shadow-lg">
                  K
                </div>

              </div>
            </div>
          </header>


          {/* =================================================
              MAIN CONTENT
          ================================================== */}
          <div className="flex flex-1 flex-col px-4 py-5 md:px-8 md:py-7">

            <div className="mx-auto grid w-full max-w-7xl flex-1 gap-5 lg:grid-cols-[minmax(0,1fr)_240px]">

              {/* =================================================
                  CHAT CARD
              ================================================== */}
              <div className="flex min-h-[680px] flex-col overflow-hidden rounded-3xl border border-white/80 bg-white/88 shadow-[0_20px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl">

                {/* Chat Header */}
                <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">

                  <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                    ✦

                    <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
                  </div>

                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      Student Copilot AI
                    </div>

                    <div className="text-xs text-slate-400">
                      Personal placement assistant
                    </div>
                  </div>

                </div>


                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-5 py-6 md:px-8">

                  <div className="space-y-5">

                    {messages.map((message, index) => (

                      <div
                        key={`${message.role}-${index}`}
                        className={`flex ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >

                        <div
                          className={`flex max-w-[88%] gap-3 ${
                            message.role === "user"
                              ? "flex-row-reverse"
                              : ""
                          }`}
                        >

                          {/* Avatar */}
                          <div
                            className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold ${
                              message.role === "user"
                                ? "bg-slate-900 text-white"
                                : "bg-indigo-50 text-indigo-600"
                            }`}
                          >
                            {message.role === "user" ? "K" : "AI"}
                          </div>


                          {/* Message Bubble */}
                          <div
                            className={`rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                              message.role === "user"
                                ? "bg-indigo-600 text-white"
                                : "border border-slate-200 bg-slate-100 text-slate-700"
                            }`}
                          >

                            {message.role === "assistant" && (
                              <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                                AI
                              </div>
                            )}

                            <div className="whitespace-pre-wrap">
                              {message.content}
                            </div>

                          </div>

                        </div>

                      </div>

                    ))}


                    {/* Loading */}
                    {loading && (
                      <div className="flex justify-start">

                        <div className="flex items-start gap-3">

                          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-[10px] font-bold text-indigo-600">
                            AI
                          </div>

                          <div className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3">

                            <div className="flex items-center gap-1.5">

                              <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.3s]" />

                              <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.15s]" />

                              <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-400" />

                            </div>

                          </div>

                        </div>

                      </div>
                    )}

                  </div>

                </div>


                {/* Suggestions */}
                <div className="border-t border-slate-200 px-5 py-3">

                  <div className="flex gap-2 overflow-x-auto pb-1">

                    {suggestions.map((suggestion) => (

                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => useSuggestion(suggestion)}
                        className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                      >
                        {suggestion}
                      </button>

                    ))}

                  </div>

                </div>


                {/* Input */}
                <div className="px-5 pb-5 pt-2">

                  <form
                    onSubmit={sendMessage}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50"
                  >

                    <input
                      value={input}
                      onChange={(event) =>
                        setInput(event.target.value)
                      }
                      disabled={loading}
                      placeholder="Ask your placement coach..."
                      className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
                    />

                    <button
                      type="submit"
                      disabled={!input.trim() || loading}
                      aria-label="Send message"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
                    >
                      →
                    </button>

                  </form>

                  <p className="mt-2 text-center text-[10px] text-slate-400">
                    AI can make mistakes. Use its suggestions as
                    preparation support and verify important
                    information.
                  </p>

                </div>

              </div>


              {/* =================================================
                  RIGHT SIDEBAR
              ================================================== */}
              <div className="space-y-4">

                {/* AI Coach Card */}
                <div className="rounded-3xl border border-white/80 bg-white/88 p-4 shadow-[0_15px_45px_rgba(15,23,42,0.10)] backdrop-blur-xl">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      ✦
                    </div>

                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        Your AI Coach
                      </div>

                      <div className="text-xs text-slate-400">
                        Placement preparation
                      </div>
                    </div>

                  </div>


                  <div className="mt-5 space-y-3">

                    <CoachFeature text="Personalized guidance" />

                    <CoachFeature text="Interview practice" />

                    <CoachFeature text="Resume improvement" />

                    <CoachFeature text="Technical preparation" />

                  </div>

                </div>


                {/* Quick Actions */}
                <div className="rounded-3xl border border-white/80 bg-white/88 p-4 shadow-[0_15px_45px_rgba(15,23,42,0.10)] backdrop-blur-xl">

                  <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">
                    Quick Actions
                  </div>

                  <div className="mt-4 space-y-2">

                    <QuickAction
                      number="01"
                      label="Practice interview"
                      onClick={() =>
                        useSuggestion(
                          "Give me an interview question and evaluate my answer."
                        )
                      }
                    />

                    <QuickAction
                      number="02"
                      label="Improve resume"
                      onClick={() =>
                        useSuggestion(
                          "How should I improve my resume for software developer placements?"
                        )
                      }
                    />

                    <QuickAction
                      number="03"
                      label="Fix a weak skill"
                      onClick={() =>
                        useSuggestion(
                          "Help me identify and improve my weakest technical skill."
                        )
                      }
                    />

                  </div>

                </div>


                {/* Action Plan */}
                <div className="rounded-3xl border border-indigo-100 bg-indigo-50/90 p-4 shadow-[0_15px_45px_rgba(79,70,229,0.08)] backdrop-blur-xl">

                  <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">
                    Your Action Plan
                  </div>

                  <h3 className="mt-2 text-base font-bold text-slate-900">
                    Turn advice into action.
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Complete your next task and keep building
                    your placement readiness.
                  </p>

                  <a
                    href="/plan"
                    className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                  >
                    Open 7-Day Plan →
                  </a>

                </div>


                {/* AI Transparency */}
                <div className="rounded-2xl border border-white/70 bg-white/70 p-4 backdrop-blur-xl">

                  <div className="text-[10px] font-semibold text-slate-500">
                    AI Transparency
                  </div>

                  <p className="mt-1 text-[10px] leading-4 text-slate-400">
                    You are chatting with an AI assistant. Avoid
                    entering passwords, API keys or other sensitive
                    information.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}


/* ============================================================
   SMALL UI COMPONENTS
============================================================ */

function CoachFeature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5 text-xs text-slate-600">

      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-50 text-[10px] font-bold text-emerald-500">
        ✓
      </span>

      <span>{text}</span>

    </div>
  );
}


function QuickAction({
  number,
  label,
  onClick,
}: {
  number: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-3 text-left transition hover:border-indigo-200 hover:bg-indigo-50"
    >

      <div className="flex items-center gap-3">

        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-[9px] font-bold text-slate-500">
          {number}
        </span>

        <span className="text-xs font-medium text-slate-700">
          {label}
        </span>

      </div>

      <span className="text-sm text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-indigo-500">
        →
      </span>

    </button>
  );
}