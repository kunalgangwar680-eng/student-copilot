import { NextResponse } from "next/server";
import { connection } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function GET() {
  // Make sure this route only runs when a real request arrives.
  // It must not call Gemini during the production build.
  await connection();

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          ok: false,
          error: "GEMINI_API_KEY is not configured",
        },
        { status: 500 },
      );
    }

    const model =
      process.env.GEMINI_MODEL || "gemini-3.7-flash";

    const ai = new GoogleGenAI({
      apiKey,
    });

    const response = await ai.models.generateContent({
      model,
      contents:
        "Reply with exactly: Gemini connection successful",
    });

    const text = response.text?.trim();

    return NextResponse.json({
      ok: true,
      model,
      message: text || "Gemini returned an empty response",
    });
  } catch (error) {
    console.error("Gemini test error:", error);

    const message =
      error instanceof Error
        ? error.message
        : String(error);

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      { status: 500 },
    );
  }
}