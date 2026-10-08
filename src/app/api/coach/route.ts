import { NextResponse } from "next/server";
import { generateGeminiText } from "@/lib/gemini";

type CoachRequest = {
  message?: string;
  studentProfile?: {
    name?: string;
    degree?: string;
    branch?: string;
    year?: string;
    targetRole?: string;
    skills?: string[];
    weakAreas?: string[];
  };
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CoachRequest;

    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please enter a message.",
        },
        { status: 400 },
      );
    }

    const profile = body.studentProfile ?? {};

    const prompt = `
You are Student Copilot, an AI placement-preparation coach for college students.

Your job is to give practical, clear and encouraging placement guidance.

Student profile:
- Name: ${profile.name || "Not provided"}
- Degree: ${profile.degree || "Not provided"}
- Branch: ${profile.branch || "Not provided"}
- Year: ${profile.year || "Not provided"}
- Target role: ${profile.targetRole || "Not provided"}
- Skills: ${profile.skills?.join(", ") || "Not provided"}
- Weak areas: ${profile.weakAreas?.join(", ") || "Not provided"}

Student message:
${message}

Instructions:
1. Answer the student's question directly.
2. Give actionable placement-focused advice.
3. Keep the response concise and easy to understand.
4. Do not make up student information.
5. When useful, give numbered next steps.
6. Be supportive but realistic.
7. Never claim that you completed an action that you did not actually complete.
`;

    const result = await generateGeminiText(prompt);

    return NextResponse.json({
      ok: true,
      reply: result.text,
      model: result.model,
    });
  } catch (error) {
    console.error("Coach API error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unable to generate AI response.";

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status: 500 },
    );
  }
}