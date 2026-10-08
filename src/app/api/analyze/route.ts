import { NextResponse } from "next/server";
import OpenAI from "openai";

const demoAnalysis = {
  overall: 68,
  technical: 61,
  projects: 54,
  resume: 76,
  interview: 58,
  summary:
    "You have a solid starting point, but your placement readiness is being held back by project depth, interview confidence, and structured technical preparation.",
  gaps: [
    {
      title: "Project depth",
      description:
        "Your projects need stronger real-world problem solving and measurable outcomes.",
      priority: "High",
      action:
        "Strengthen one flagship project with features, impact and a clear demo.",
    },
    {
      title: "Interview confidence",
      description:
        "Your preparation needs more practice explaining your work clearly.",
      priority: "High",
      action:
        "Practice 5 interview questions every day with the AI Coach.",
    },
    {
      title: "Technical consistency",
      description:
        "Your fundamentals are developing, but your preparation needs a regular routine.",
      priority: "Medium",
      action:
        "Follow a focused daily technical practice schedule.",
    },
  ],
  aiUsed: false,
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const problem = body?.problem || "General placement preparation";
    const goal = body?.goal || "Get placement ready";
    const year = body?.year || "College student";

    const apiKey = process.env.OPENAI_API_KEY;

    // No API key = safe demo mode
    if (!apiKey) {
      return NextResponse.json(demoAnalysis, { status: 200 });
    }

    const openai = new OpenAI({
      apiKey,
    });

    const prompt = `
You are Student Copilot, an AI placement-readiness assistant.

Analyze this student:

Problem:
${problem}

Goal:
${goal}

Academic year:
${year}

Return ONLY valid JSON.

Required JSON format:
{
  "overall": number,
  "technical": number,
  "projects": number,
  "resume": number,
  "interview": number,
  "summary": "string",
  "gaps": [
    {
      "title": "string",
      "description": "string",
      "priority": "High",
      "action": "string"
    },
    {
      "title": "string",
      "description": "string",
      "priority": "Medium",
      "action": "string"
    },
    {
      "title": "string",
      "description": "string",
      "priority": "Low",
      "action": "string"
    }
  ]
}

Rules:
- Scores must be between 0 and 100.
- Keep the response practical and student-friendly.
- Give exactly 3 gaps.
- Do not diagnose medical or mental-health conditions.
`;

    try {
      const response = await openai.responses.create({
        model: process.env.OPENAI_MODEL || "gpt-5",
        input: prompt,
      });

      const text = response.output_text?.trim();

      if (!text) {
        return NextResponse.json(demoAnalysis, { status: 200 });
      }

      // Remove accidental markdown code fences
      const cleaned = text
        .replace(/^```json/i, "")
        .replace(/^```/i, "")
        .replace(/```$/i, "")
        .trim();

      const parsed = JSON.parse(cleaned);

      const result = {
        overall: Number(parsed.overall ?? demoAnalysis.overall),
        technical: Number(parsed.technical ?? demoAnalysis.technical),
        projects: Number(parsed.projects ?? demoAnalysis.projects),
        resume: Number(parsed.resume ?? demoAnalysis.resume),
        interview: Number(parsed.interview ?? demoAnalysis.interview),
        summary: String(parsed.summary ?? demoAnalysis.summary),
        gaps:
          Array.isArray(parsed.gaps) && parsed.gaps.length >= 1
            ? parsed.gaps.slice(0, 3)
            : demoAnalysis.gaps,
        aiUsed: true,
      };

      return NextResponse.json(result, { status: 200 });
    } catch (aiError) {
      console.error("AI analysis failed:", aiError);

      // AI/API problem -> keep app working
      return NextResponse.json(
        {
          ...demoAnalysis,
          aiUsed: false,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Analyze route error:", error);

    return NextResponse.json(
      {
        ...demoAnalysis,
        aiUsed: false,
      },
      { status: 200 }
    );
  }
}