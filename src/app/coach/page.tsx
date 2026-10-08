"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type Profile = {
  problem?: string;
  goal?: string;
  year?: string;
};

const starterPrompts = [
  "Help me improve my placement preparation",
  "Ask me 5 interview questions",
  "How should I improve my resume?",
  "Give me a plan for technical preparation",
];

export default function CoachPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);

    try {
      const savedProfile = localStorage.getItem("studentProfile");

      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfile(parsed);
      }
    } catch (error) {
      console.error("Profile loading error:", error);
    }

    setMessages([
      {
        id: "welcome-message",
        role: "assistant",
        content:
          "Hi! I’m Student Copilot. Tell me what is blocking your placement preparation, and I’ll help you turn it into a clear next step.",
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage(messageText?: string) {
    const text = (messageText ?? input).trim();

    if (!text || loading) {
      return;
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          problem: profile?.problem || "Placement preparation",
          goal: profile?.goal || "Get placement ready",
          year: profile?.year || "College student",
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error("Coach request failed");
      }

      const reply =
        data?.reply ||
        data?.message ||
        "I understand. Let's break that problem into one practical action you can complete today.";

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: String(reply),
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch (error) {
      console.error("Coach error:", error);

      setMessages((current) => [
        ...current,
        {
          id: `fallback-${Date.now()}`,
          role: "assistant",
          content:
            "I can still help you plan your next step. Start with one specific task today: improve one skill, one resume section, one project feature, or practice one interview question.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage();
  }

  function clearChat() {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content:
          "Fresh start. Tell me what you want to improve for your placement preparation.",
      },
    ]);
  }

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#f6f8fb] p-8">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-8 w-56 rounded bg-slate-200" />
          <div className="mt-8 h-[650px] rounded-3xl bg-slate-200" />
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
            <NavItem href="/coach" icon="💬" label="AI Coach" active />
            <NavItem href="/progress" icon="↗" label="Progress" />
            <NavItem href="/evidence" icon="◎" label="Evidence" />
          </nav>

          <div className="mt-10 rounded-2xl border border-indigo-400/20 bg-indigo-500/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
              AI Coach
            </p>

            <p className="mt-2 text-sm leading-5 text-slate-300">
              Ask, practice, improve, repeat.
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
                AI Coach
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={clearChat}
                className="hidden rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-50 sm:block"
              >
                New Chat
              </button>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                K
              </div>
            </div>
          </header>

          {/* CONTENT */}
          <div className="mx-auto grid w-full max-w-7xl flex-1 gap-6 px-5 py-6 lg:grid-cols-[1fr_320px] sm:px-8">
            {/* CHAT */}
            <section className="flex min-h-[calc(100vh-150px)] min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              {/* CHAT TOP */}
              <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
                    ✦
                    <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                  </div>

                  <div>
                    <h2 className="font-semibold">Student Copilot AI</h2>
                    <p className="text-xs text-slate-400">
                      Personal placement assistant
                    </p>
                  </div>
                </div>
              </div>

              {/* CONTEXT */}
              {profile && (
                <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-3 sm:px-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Context
                    </span>

                    {profile.problem && (
                      <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
                        {profile.problem}
                      </span>
                    )}

                    {profile.goal && (
                      <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-600">
                        {profile.goal}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* MESSAGES */}
              <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6 sm:px-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600">
                        AI
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                        message.role === "user"
                          ? "rounded-br-md bg-slate-900 text-white"
                          : "rounded-bl-md bg-slate-100 text-slate-700"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-600">
                      AI
                    </div>

                    <div className="rounded-2xl rounded-bl-md bg-slate-100 px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                        <span
                          className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                          style={{ animationDelay: "120ms" }}
                        />
                        <span
                          className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                          style={{ animationDelay: "240ms" }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* SUGGESTIONS */}
              <div className="border-t border-slate-100 px-5 py-3 sm:px-6">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {starterPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      disabled={loading}
                      className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* INPUT */}
              <form
                onSubmit={handleSubmit}
                className="border-t border-slate-200 bg-white p-4 sm:p-5"
              >
                <div className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 transition focus-within:border-indigo-300 focus-within:bg-white">
                  <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        sendMessage();
                      }
                    }}
                    rows={1}
                    placeholder="Ask your placement coach..."
                    className="max-h-32 min-h-[42px] flex-1 resize-none bg-transparent px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    disabled={loading}
                  />

                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    →
                  </button>
                </div>

                <p className="mt-2 text-center text-[11px] text-slate-400">
                  AI can make mistakes. Use its suggestions as preparation
                  support and verify important information.
                </p>
              </form>
            </section>

            {/* RIGHT PANEL */}
            <aside className="space-y-5">
              {/* COACH PROFILE */}
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-lg text-indigo-600">
                    ✦
                  </div>

                  <div>
                    <h3 className="font-semibold">Your AI Coach</h3>
                    <p className="text-xs text-slate-400">
                      Placement preparation
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <CoachPoint text="Personalized guidance" />
                  <CoachPoint text="Interview practice" />
                  <CoachPoint text="Resume improvement" />
                  <CoachPoint text="Technical preparation" />
                </div>
              </div>

              {/* QUICK ACTIONS */}
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                  Quick Actions
                </p>

                <div className="mt-4 space-y-2">
                  <QuickAction
                    icon="01"
                    title="Practice interview"
                    onClick={() =>
                      sendMessage(
                        "Start a mock placement interview and ask me questions one at a time."
                      )
                    }
                  />

                  <QuickAction
                    icon="02"
                    title="Improve resume"
                    onClick={() =>
                      sendMessage(
                        "Help me improve my resume for placements."
                      )
                    }
                  />

                  <QuickAction
                    icon="03"
                    title="Fix a weak skill"
                    onClick={() =>
                      sendMessage(
                        "Help me create a focused plan to improve my weakest technical skill."
                      )
                    }
                  />
                </div>
              </div>

              {/* PLAN LINK */}
              <div className="rounded-3xl border border-indigo-100 bg-indigo-50/70 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  Your Action Plan
                </p>

                <h3 className="mt-2 text-lg font-bold">
                  Turn advice into action.
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Complete your next task and keep building your placement
                  readiness.
                </p>

                <Link
                  href="/plan"
                  className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Open 7-Day Plan →
                </Link>
              </div>

              {/* AI NOTICE */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-600">
                  AI Transparency
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  You are chatting with an AI assistant. Avoid entering
                  passwords, API keys or other sensitive information.
                </p>
              </div>
            </aside>
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

function CoachPoint({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-xs text-emerald-600">
        ✓
      </div>

      <span className="text-sm text-slate-600">{text}</span>
    </div>
  );
}

function QuickAction({
  icon,
  title,
  onClick,
}: {
  icon: string;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition hover:border-indigo-100 hover:bg-indigo-50"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500">
        {icon}
      </span>

      <span className="flex-1 text-sm font-medium text-slate-700">
        {title}
      </span>

      <span className="text-slate-400">→</span>
    </button>
  );
}