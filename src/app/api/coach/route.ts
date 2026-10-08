import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

type CoachRequest = {
  message?: string;
  problem?: string;
  goal?: string;
  year?: string;
};

function getFallbackReply(message: string) {
  const text = message.toLowerCase();

  if (
    text.includes("5 interview") ||
    text.includes("interview questions")
  ) {
    return `Here are 5 software developer interview questions:

1. What is the difference between an array and a linked list?
2. Explain OOP concepts such as inheritance, encapsulation, abstraction, and polymorphism.
3. How does a REST API work?
4. What is the difference between SQL and NoSQL databases?
5. Tell me about a project you built and explain one technical challenge you solved.

Tip: Answer each question in your own words first. Then I can review your answers and improve them.`;
  }

  if (
    text.includes("resume") ||
    text.includes("cv")
  ) {
    return `To improve your software developer resume, focus on these areas:

1. Add 2–3 strong projects with measurable outcomes.
2. Put technical skills in a clear, easy-to-scan section.
3. Describe projects using what you built, how you built it, and the result.
4. Add GitHub or live project links where available.
5. Keep the resume focused on the role you are targeting.

Your biggest improvement area should be turning basic projects into clearly explained, practical projects.`;
  }

  if (
    text.includes("project") ||
    text.includes("projects")
  ) {
    return `For placements, choose a project that solves a real student problem and lets you demonstrate practical development skills.

A strong project can include:
- Frontend
- Backend/API
- Database
- Authentication or user roles
- Real-world workflow
- Deployment

For your profile, a placement-focused project like Student Copilot is especially useful because you can explain the problem, architecture, AI integration, and user impact during an interview.`;
  }

  if (
    text.includes("technical interview") ||
    text.includes("technical preparation") ||
    text.includes("prepare for technical")
  ) {
    return `Use this technical interview routine:

1. Practice DSA every day.
2. Revise core CS topics such as OOP, DBMS, OS, and computer networks.
3. Build and understand at least 2 solid projects.
4. Practice explaining your code and design decisions aloud.
5. Do timed interview practice every week.

Start with one weak area instead of trying to fix everything at once.`;
  }

  if (
    text.includes("placement preparation") ||
    text.includes("placement ready") ||
    text.includes("placement")
  ) {
    return `Break your placement preparation into four tracks:

1. Technical skills
2. Projects
3. Resume
4. Interview practice

Today, pick one weak area and complete one measurable task. For example, solve 2 DSA problems, improve one resume project description, or answer 5 interview questions.`;
  }

  return `I can help you with your placement preparation.

Try asking me about:
- Software developer interviews
- DSA
- OOP
- DBMS
- Resume improvement
- Projects
- Internships
- Placement preparation

For example: "Ask me 5 JavaScript interview questions."`;
}

export async function POST(request: Request) {
  try {
    const body: CoachRequest = await request.json();

    const message =
      typeof body?.message === "string"
        ? body.message.trim()
        : "";

    const problem =
      typeof body?.problem === "string" && body.problem.trim()
        ? body.problem.trim()
        : "Placement preparation";

    const goal =
      typeof body?.goal === "string" && body.goal.trim()
        ? body.goal.trim()
        : "Get placement ready";

    const year =
      typeof body?.year === "string" && body.year.trim()
        ? body.year.trim()
        : "College student";

    if (!message) {
      return NextResponse.json({
        reply: "Please enter a question.",
        aiUsed: false,
        mode: "validation",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // No API key -> safe fallback
    if (!apiKey) {
      return NextResponse.json({
        reply: getFallbackReply(message),
        aiUsed: false,
        mode: "fallback",
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    const prompt = `
You are Student Copilot, an AI placement coach for college students.

Student academic year:
${year}

Student's main problem:
${problem}

Student's goal:
${goal}

Student's question:
${message}

Answer the student's actual question directly.

Rules:
- Do not repeat a generic introduction.
- Do not say "I understand" unless it is genuinely useful.
- If the student asks for a number of questions, provide exactly that number.
- Give practical and actionable advice.
- Focus on software development, internships, interviews, resumes, projects, technical skills, and placements.
- Use simple professional English.
- Keep the answer reasonably concise.
- Never request passwords, API keys, or other sensitive information.
`;

    console.log("Calling Gemini Coach with gemini-3.5-flash-lite...");

    const response = await Promise.race([
      ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
      }),
      new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error("Gemini request timed out"));
        }, 12000);
      }),
    ]);

    const reply =
      typeof response.text === "string"
        ? response.text.trim()
        : "";

    if (!reply) {
      console.warn("Gemini returned an empty response.");

      return NextResponse.json({
        reply: getFallbackReply(message),
        aiUsed: false,
        mode: "fallback-empty",
      });
    }

    console.log("Gemini Coach response received successfully.");

    return NextResponse.json({
      reply,
      aiUsed: true,
      mode: "gemini",
      model: "gemini-3.5-flash-lite",
    });
  } catch (error) {
    console.error("GEMINI COACH ERROR:", error);

    const errorText =
      error instanceof Error
        ? error.message.toLowerCase()
        : "";

    // Quota / rate limit
    if (
      errorText.includes("resource_exhausted") ||
      errorText.includes("quota") ||
      errorText.includes("rate limit")
    ) {
      return NextResponse.json({
        reply:
          "The AI Coach has temporarily reached its free AI usage limit. You can still use the built-in placement coach for now:\n\n" +
          getFallbackReply("placement preparation"),
        aiUsed: false,
        mode: "quota-fallback",
      });
    }

    // Other temporary failures
    return NextResponse.json({
      reply: getFallbackReply(message),
      aiUsed: false,
      mode: "fallback-error",
    });
  }
}