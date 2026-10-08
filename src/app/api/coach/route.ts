import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

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
      return NextResponse.json({
        reply: "Please enter a message.",
        aiUsed: false,
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply: "Gemini API key is not configured.",
        aiUsed: false,
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    const prompt = `
You are Student Copilot, an AI placement coach for college students.

Academic year: ${year}

Student problem: ${problem}

Student goal: ${goal}

Student message: ${message}

Answer the student's actual question directly.

Focus on:
- software developer interviews
- resume
- projects
- technical skills
- internships
- placements

Be practical, clear and actionable.

If the student asks for interview questions,
actually provide the requested interview questions.
Do not repeat a generic message.
`;

    console.log("Calling Gemini Coach...");

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const reply =
      typeof response.text === "string"
        ? response.text.trim()
        : "";

    if (!reply) {
      return NextResponse.json({
        reply: "No response was generated. Please try again.",
        aiUsed: false,
      });
    }

    console.log("Gemini Coach response received.");

    return NextResponse.json({
      reply,
      aiUsed: true,
      mode: "gemini",
      model: "gemini-3.5-flash",
    });
  } catch (error) {
    console.error("GEMINI COACH ERROR:", error);

    return NextResponse.json({
      reply: "Gemini Coach could not respond right now. Please try again.",
      aiUsed: false,
    });
  }
}