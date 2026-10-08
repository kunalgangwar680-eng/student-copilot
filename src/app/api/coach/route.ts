import { NextResponse } from "next/server";
import OpenAI from "openai";

function demoReply(message: string, problem: string, goal: string) {
  const text = message.toLowerCase();

  if (text.includes("interview")) {
    return "Let's practice step by step. Start with this: Tell me about yourself and explain one project you are most proud of. Keep your answer structured around the problem, what you built, your role, and the result.";
  }

  if (text.includes("resume")) {
    return "Start with your strongest project. Rewrite each bullet using this structure: Action + Technology + Result. Keep the wording specific and focus on what you actually built or improved.";
  }

  if (text.includes("technical") || text.includes("skill")) {
    return "Choose one target role and focus on the technical skills most relevant to it. Spend 30–45 minutes today on one topic, solve a few questions, and write down the concepts you could not explain confidently.";
  }

  return `Based on your current problem — "${problem}" — and your goal — "${goal}" — start with one small action today. Pick your highest-priority gap, spend 30–45 minutes on it, and then review what improved. I can help you break the next step down too.`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

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
      return NextResponse.json(
        {
          reply: "Tell me what you want help with for your placement preparation.",
          aiUsed: false,
        },
        { status: 200 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    // No API key -> demo mode
    if (!apiKey) {
      return NextResponse.json(
        {
          reply: demoReply(message, problem, goal),
          aiUsed: false,
        },
        { status: 200 }
      );
    }

    try {
      const openai = new OpenAI({
        apiKey,
      });

      const prompt = `
You are Student Copilot, a practical AI coach for college students preparing for internships and placements.

Student context:
Problem: ${problem}
Goal: ${goal}
Academic year: ${year}

Student message:
${message}

Give a helpful, concise and actionable response.

Rules:
- Focus on placement preparation, resumes, projects, technical skills, interviews, confidence, time management and preparation strategy.
- Do not pretend to be a human.
- Do not ask for passwords, API keys or sensitive information.
- Give practical next steps.
- Keep the answer easy for a college student to understand.
`;

      const response = await openai.responses.create({
        model: process.env.OPENAI_MODEL || "gpt-5",
        input: prompt,
      });

      const reply = response.output_text?.trim();

      if (!reply) {
        return NextResponse.json(
          {
            reply: demoReply(message, problem, goal),
            aiUsed: false,
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        {
          reply,
          aiUsed: true,
        },
        { status: 200 }
      );
    } catch (aiError) {
      console.error("OpenAI Coach Error:", aiError);

      // Keep demo working even if the AI request fails
      return NextResponse.json(
        {
          reply: demoReply(message, problem, goal),
          aiUsed: false,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Coach Route Error:", error);

    return NextResponse.json(
      {
        reply:
          "I can still help you. Start with one specific placement task today, such as improving one resume section, practicing one interview question, or strengthening one technical skill.",
        aiUsed: false,
      },
      { status: 200 }
    );
  }
}