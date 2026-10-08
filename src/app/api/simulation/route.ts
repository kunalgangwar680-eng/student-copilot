import { NextResponse } from "next/server";
import {
  generateGeminiJSON,
} from "@/lib/gemini";

type AptitudeQuestion = {
  question: string;
  options: string[];
  answer: number;
};

type HRQuestion = {
  question: string;
};

type HRAnswer = {
  question: string;
  answer: string;
};

type CodingAnswer = {
  question: string;
  answer: string;
};

const aptitudeBank: AptitudeQuestion[] = [
  {
    question:
      "If 30% of a number is 90, what is the number?",
    options: ["270", "300", "330", "360"],
    answer: 1,
  },
  {
    question:
      "What comes next: 4, 8, 16, 32, ?",
    options: ["48", "56", "64", "72"],
    answer: 2,
  },
  {
    question:
      "A product costing ₹600 is sold for ₹750. What is the profit percentage?",
    options: ["20%", "25%", "30%", "35%"],
    answer: 1,
  },
  {
    question:
      "Which data structure follows FIFO?",
    options: [
      "Stack",
      "Queue",
      "Tree",
      "Graph",
    ],
    answer: 1,
  },
  {
    question:
      "If 3 workers complete a task in 12 days, how many days would 6 workers take at the same rate?",
    options: ["3", "6", "9", "18"],
    answer: 1,
  },
  {
    question:
      "Which word is closest in meaning to 'accurate'?",
    options: [
      "Correct",
      "Fast",
      "Complex",
      "Large",
    ],
    answer: 0,
  },
  {
    question:
      "If 5x = 45, what is x?",
    options: ["5", "7", "9", "11"],
    answer: 2,
  },
  {
    question:
      "Which of these is a programming language?",
    options: [
      "HTTP",
      "Python",
      "HTML",
      "CSS",
    ],
    answer: 1,
  },
  {
    question:
      "A class has 50 students and 40% are girls. How many girls are there?",
    options: ["15", "20", "25", "30"],
    answer: 1,
  },
  {
    question:
      "What is the next number: 7, 14, 28, 56, ?",
    options: ["84", "98", "112", "120"],
    answer: 2,
  },
  {
    question:
      "Which protocol is commonly used for secure web communication?",
    options: [
      "FTP",
      "HTTP",
      "HTTPS",
      "SMTP",
    ],
    answer: 2,
  },
  {
    question:
      "What is the time complexity of binary search on a sorted array?",
    options: [
      "O(n)",
      "O(log n)",
      "O(n²)",
      "O(1)",
    ],
    answer: 1,
  },
];

const hrBank: HRQuestion[] = [
  {
    question:
      "Tell me about yourself and your interest in software development.",
  },
  {
    question:
      "What is one strength that helps you work effectively in a team?",
  },
  {
    question:
      "Tell me about a project you are proud of.",
  },
  {
    question:
      "Describe a difficult problem you faced and how you solved it.",
  },
  {
    question:
      "Why do you want this software developer role?",
  },
  {
    question:
      "How do you handle feedback when someone points out a mistake?",
  },
  {
    question:
      "How do you manage your time when several tasks have the same deadline?",
  },
  {
    question:
      "What are you currently doing to improve your technical skills?",
  },
];

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];

  for (
    let i = copy.length - 1;
    i > 0;
    i--
  ) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [copy[i], copy[j]] = [
      copy[j],
      copy[i],
    ];
  }

  return copy;
}

function fallbackAptitude() {
  return shuffle(
    aptitudeBank
  ).slice(0, 8);
}

function fallbackHR() {
  return shuffle(
    hrBank
  ).slice(0, 4);
}

function fallbackFinalEvaluation(
  aptitudeScore: number,
  hrAnswers: HRAnswer[],
  codingAnswers: CodingAnswer[]
) {
  const hrScore = Math.max(
    45,
    Math.min(
      95,
      45 + hrAnswers.length * 10
    )
  );

  const codingScore = Math.max(
    45,
    Math.min(
      95,
      45 + codingAnswers.length * 20
    )
  );

  const overallScore = Math.round(
    aptitudeScore * 0.34 +
      hrScore * 0.33 +
      codingScore * 0.33
  );

  return {
    aptitudeScore,
    hrScore,
    codingScore,
    overallScore,
    level:
      overallScore >= 80
        ? "Advanced"
        : overallScore >= 60
          ? "Intermediate"
          : "Beginner",
    strengths: [
      "Completed the placement assessment",
      "Willingness to practice",
    ],
    weakAreas: [
      "Interview answer structure",
      "Technical problem solving",
      "Aptitude speed",
    ],
    feedback:
      "Keep practicing consistently and focus on your weakest areas.",
  };
}

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const action =
      body?.action || "";

    const role =
      body?.role ||
      "Software Developer";

    const year =
      body?.year ||
      "College student";

    const sessionSeed =
      body?.sessionSeed ||
      `${Date.now()}-${Math.random()}`;

    // ======================================================
    // APTITUDE
    // ======================================================

    if (
      action ===
      "generate_aptitude"
    ) {
      if (
        !process.env.GEMINI_API_KEY
      ) {
        return NextResponse.json({
          success: true,
          aiUsed: false,
          mode: "fallback",
          questions:
            fallbackAptitude(),
        });
      }

      try {
        const prompt = `
You are an aptitude question generator for a college placement platform.

Target role:
${role}

Academic year:
${year}

Unique session:
${sessionSeed}

Generate EXACTLY 8 new aptitude questions.

Mix:
- Quantitative aptitude
- Logical reasoning
- Verbal ability
- Basic programming / CS aptitude

Each question must have exactly four options and one correct answer.

Return ONLY valid JSON:

{
  "questions": [
    {
      "question": "",
      "options": ["", "", "", ""],
      "answer": 0
    }
  ]
}

The answer is a zero-based option index.
Do not use markdown.
`;

        const result =
          await generateGeminiJSON<{
            questions: AptitudeQuestion[];
          }>(prompt);

        if (
          !Array.isArray(
            result.questions
          ) ||
          result.questions.length !== 8
        ) {
          throw new Error(
            "Invalid aptitude response"
          );
        }

        return NextResponse.json({
          success: true,
          aiUsed: true,
          mode: "gemini",
          questions:
            result.questions,
        });
      } catch (error) {
        console.error(
          "APTITUDE AI ERROR:",
          error
        );

        return NextResponse.json({
          success: true,
          aiUsed: false,
          mode: "fallback",
          questions:
            fallbackAptitude(),
        });
      }
    }

    // ======================================================
    // HR
    // ======================================================

    if (
      action ===
      "generate_hr"
    ) {
      if (
        !process.env.GEMINI_API_KEY
      ) {
        return NextResponse.json({
          success: true,
          aiUsed: false,
          mode: "fallback",
          questions:
            fallbackHR(),
        });
      }

      try {
        const prompt = `
You are an expert placement HR interviewer.

Target role:
${role}

Academic year:
${year}

Unique session:
${sessionSeed}

Generate EXACTLY 4 fresh HR questions.

Cover:
1. Introduction / motivation
2. Strength or weakness
3. Project / experience
4. Behavioral / situational

Every new session must produce a different set.

Return ONLY valid JSON:

{
  "questions": [
    { "question": "" },
    { "question": "" },
    { "question": "" },
    { "question": "" }
  ]
}

No markdown.
`;

        const result =
          await generateGeminiJSON<{
            questions: HRQuestion[];
          }>(prompt);

        if (
          !Array.isArray(
            result.questions
          ) ||
          result.questions.length !== 4
        ) {
          throw new Error(
            "Invalid HR response"
          );
        }

        return NextResponse.json({
          success: true,
          aiUsed: true,
          mode: "gemini",
          questions:
            result.questions,
        });
      } catch (error) {
        console.error(
          "HR AI ERROR:",
          error
        );

        return NextResponse.json({
          success: true,
          aiUsed: false,
          mode: "fallback",
          questions:
            fallbackHR(),
        });
      }
    }

    // ======================================================
    // FINAL EVALUATION
    // ======================================================

    if (
      action ===
      "final_evaluate"
    ) {
      const aptitudeScore =
        Number(
          body?.aptitudeScore || 0
        );

      const hrAnswers: HRAnswer[] =
        Array.isArray(
          body?.hrAnswers
        )
          ? body.hrAnswers
          : [];

      const codingAnswers:
        CodingAnswer[] =
        Array.isArray(
          body?.codingAnswers
        )
          ? body.codingAnswers
          : [];

      if (
        !process.env.GEMINI_API_KEY
      ) {
        return NextResponse.json({
          success: true,
          aiUsed: false,
          mode: "fallback",
          ...fallbackFinalEvaluation(
            aptitudeScore,
            hrAnswers,
            codingAnswers
          ),
        });
      }

      try {
        const hrText =
          hrAnswers
            .map(
              (item, index) =>
                `HR ${index + 1}: ${item.question}\nAnswer: ${item.answer}`
            )
            .join("\n\n");

        const codingText =
          codingAnswers
            .map(
              (item, index) =>
                `Coding ${index + 1}: ${item.question}\nAnswer: ${item.answer}`
            )
            .join("\n\n");

        const prompt = `
You are an expert placement evaluator.

Role:
${role}

Academic year:
${year}

Aptitude score:
${aptitudeScore}/100

HR answers:
${hrText}

Coding answers:
${codingText}

Evaluate the complete placement simulation.

Return ONLY valid JSON:

{
  "aptitudeScore": 0,
  "hrScore": 0,
  "codingScore": 0,
  "overallScore": 0,
  "level": "Beginner",
  "strengths": ["", ""],
  "weakAreas": ["", "", ""],
  "feedback": ""
}

Rules:
- Every score must be 0-100.
- Keep aptitudeScore equal to supplied score.
- Evaluate the actual HR and coding answers.
- Overall score combines all three rounds.
- Level must be Beginner, Intermediate or Advanced.
- Exactly 3 weak areas.
- Give concise actionable feedback.
`;

        const result =
          await generateGeminiJSON<{
            aptitudeScore: number;
            hrScore: number;
            codingScore: number;
            overallScore: number;
            level: string;
            strengths: string[];
            weakAreas: string[];
            feedback: string;
          }>(prompt);

        return NextResponse.json({
          success: true,
          aiUsed: true,
          mode: "gemini",
          ...result,
        });
      } catch (error) {
        console.error(
          "FINAL EVALUATION AI ERROR:",
          error
        );

        return NextResponse.json({
          success: true,
          aiUsed: false,
          mode: "fallback",
          ...fallbackFinalEvaluation(
            aptitudeScore,
            hrAnswers,
            codingAnswers
          ),
        });
      }
    }

    return NextResponse.json(
      {
        success: false,
        error:
          "Invalid simulation action",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error(
      "SIMULATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Simulation request failed",
      },
      { status: 500 }
    );
  }
}