import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          ok: false,
          error: "GEMINI_API_KEY is missing",
        },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-3.8-flash",
      contents: "Reply with exactly: Gemini connection successful",
    });

    return NextResponse.json({
      ok: true,
      message: response.text || "No text returned",
      model: process.env.GEMINI_MODEL || "gemini-3.8-flash",
    });
  } catch (error) {
    console.error("Gemini test error:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown Gemini error",
      },
      { status: 500 }
    );
  }
}