import { GoogleGenAI } from "@google/genai";

const PRIMARY_MODEL =
  process.env.GEMINI_MODEL || "gemini-3.7-flash";

const FALLBACK_MODELS = [
  "gemini-3.6-flash",
  "gemini-3.5-flash-lite",
];

const MAX_RETRIES = 1;

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;

  try {
    return JSON.stringify(error);
  } catch {
    return "Unknown Gemini API error";
  }
}

function isRetryableError(error: unknown): boolean {
  const message = getErrorMessage(error);

  return (
    message.includes("503") ||
    message.includes("UNAVAILABLE") ||
    message.includes("429") ||
    message.includes("RESOURCE_EXHAUSTED") ||
    message.includes("500") ||
    message.includes("502") ||
    message.includes("504")
  );
}

async function callModel(
  ai: GoogleGenAI,
  model: string,
  prompt: string,
): Promise<string> {
  try {
    console.log(`[Gemini] Calling ${model}`);

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature: 0.3,
        maxOutputTokens: 450,
      },
    });

    const text = response.text?.trim();

    if (!text) {
      throw new Error(`Empty response from ${model}`);
    }

    return text;
  } catch (error) {
    console.error(
      `[Gemini] ${model} failed:`,
      getErrorMessage(error),
    );

    throw error;
  }
}

export async function generateGeminiText(
  prompt: string,
): Promise<{
  text: string;
  model: string;
}> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  if (!prompt?.trim()) {
    throw new Error("Gemini prompt is empty");
  }

  const ai = new GoogleGenAI({
    apiKey,
  });

  const models = [
    PRIMARY_MODEL,
    ...FALLBACK_MODELS.filter(
      (model) => model !== PRIMARY_MODEL,
    ),
  ];

  let lastError: unknown = null;

  for (const model of models) {
    try {
      const text = await callModel(
        ai,
        model,
        prompt,
      );

      return {
        text,
        model,
      };
    } catch (error) {
      lastError = error;

      if (!isRetryableError(error)) {
        throw new Error(getErrorMessage(error));
      }
    }
  }

  throw new Error(
    `All Gemini models are unavailable. Last error: ${getErrorMessage(
      lastError,
    )}`,
  );
}

export async function generateGeminiJSON<T>(
  prompt: string,
): Promise<T> {
  const jsonPrompt = `
Return ONLY valid JSON.
No markdown.
No code fences.
No explanation.

${prompt}
`;

  const result = await generateGeminiText(jsonPrompt);

  let raw = result.text.trim();

  raw = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(raw) as T;
  } catch {
    const firstObject = raw.indexOf("{");
    const firstArray = raw.indexOf("[");

    let start = -1;

    if (firstObject === -1) {
      start = firstArray;
    } else if (firstArray === -1) {
      start = firstObject;
    } else {
      start = Math.min(firstObject, firstArray);
    }

    const objectEnd = raw.lastIndexOf("}");
    const arrayEnd = raw.lastIndexOf("]");

    const end = Math.max(objectEnd, arrayEnd);

    if (start !== -1 && end > start) {
      try {
        return JSON.parse(
          raw.slice(start, end + 1),
        ) as T;
      } catch {
        // Final error below.
      }
    }

    throw new Error(`Invalid JSON from Gemini:\n${raw}`);
  }
}