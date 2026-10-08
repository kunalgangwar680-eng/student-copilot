import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

type Profile = {
  problem?: string;
  goal?: string;
  year?: string;
};

const fallbackAnalysis = {
  overall: 68,
  technical: 61,
  projects: 54,
  resume: 76,
  interview: 58,
  summary:
    "You have a good starting point, but a few focused improvements can significantly strengthen your placement readiness.",
  gaps: [
    {
      title: "Project depth",
      description:
        "Your projects need stronger real-world problem solving and clearer outcomes.",
      priority: "High",
      action:
        "Strengthen one flagship project with one useful feature and a clear demo.",
    },
    {
      title: "Interview confidence",
      description:
        "More structured interview practice can improve your communication.",
      priority: "High",
      action:
        "Practice five interview questions every day.",
    },
    {
      title: "Technical consistency",
      description:
        "Your technical preparation would benefit from a regular routine.",
      priority: "Medium",
      action:
        "Choose one role-relevant skill and practice it for 30–45 minutes daily.",
    },
  ],
  aiUsed: false,
  mode: "fallback",
};

export async function POST(request: Request) {
  try {
    const body: Profile = await request.json();

    const problem =
      typeof body?.problem === "string" && body.problem.trim()
        ? body.problem.trim()
        : "General placement preparation";

    const goal =
      typeof body?.goal === "string" && body.goal.trim()
        ? body.goal.trim()
        : "Get placement ready";

    const year =
      typeof body?.year === "string" && body.year.trim()
        ? body.year.trim()
        : "College student";

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(fallbackAnalysis, {
        status: 200,
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    const model =
      process.env.GEMINI_MODEL || "gemini-3.8-flash";

    const prompt = `
You are Student Copilot, an AI placement-readiness assistant.

Analyze this college student's placement preparation.

Student problem:
${problem}

Student goal:
${goal}

Academic year:
${year}

Return ONLY valid JSON.

Use this exact structure:

{
  "overall": 0,
  "technical": 0,
  "projects": 0,
  "resume": 0,
  "interview": 0,
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
- Scores must be integers from 0 to 100.
- Return exactly 3 gaps.
- Make the gaps relevant to the student's problem.
- Make the actions practical and specific.
- Keep summary under 60 words.
- Do not invent personal information.
- Do not give medical or mental-health diagnoses.
`;

    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const rawText = response.text?.trim();

      if (!rawText) {
        return NextResponse.json(fallbackAnalysis, {
          status: 200,
        });
      }

      const cleaned = rawText
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

      const parsed = JSON.parse(cleaned);

      return NextResponse.json(
        {
          overall: clampScore(parsed.overall),
          technical: clampScore(parsed.technical),
          projects: clampScore(parsed.projects),
          resume: clampScore(parsed.resume),
          interview: clampScore(parsed.interview),
          summary:
            typeof parsed.summary === "string"
              ? parsed.summary
              : fallbackAnalysis.summary,
          gaps:
            Array.isArray(parsed.gaps) && parsed.gaps.length >= 3
              ? parsed.gaps.slice(0, 3).map(normalizeGap)
              : fallbackAnalysis.gaps,
          aiUsed: true,
          mode: "gemini",
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error("Gemini analysis error:", error);

      return NextResponse.json(fallbackAnalysis, {
        status: 200,
      });
    }
  } catch (error) {
    console.error("Analyze route error:", error);

    return NextResponse.json(fallbackAnalysis, {
      status: 200,
    });
  }
}

function clampScore(value: unknown) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 60;
  }

  return Math.max(0, Math.min(100, Math.round(number)));
}

function normalizeGap(gap: unknown) {
  const item =
    gap && typeof gap === "object"
      ? (gap as Record<string, unknown>)
      : {};

  const priority =
    item.priority === "High" ||
    item.priority === "Medium" ||
    item.priority === "Low"
      ? item.priority
      : "Medium";

  return {
    title:
      typeof item.title === "string"
        ? item.title
        : "Preparation gap",

    description:
      typeof item.description === "string"
        ? item.description
        : "This area needs focused improvement.",

    priority,

    action:
      typeof item.action === "string"
        ? item.action
        : "Create a focused practice routine for this area.",
  };
}