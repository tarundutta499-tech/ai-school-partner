import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, language } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured in environment variables. Please add it to your .env.local file to unlock live AI responses." },
        { status: 500 }
      );
    }

    // Attempt calling Gemini models with automated fallbacks (aligned to active diagnostic keys)
    const models = ["gemini-flash-latest", "gemini-2.5-flash", "gemini-2.0-flash", "gemini-pro-latest"];
    let lastError = "";
    let responseText = "";
    let success = false;

    const promptContext = `You are a friendly, highly intelligent school teacher. Explain the following student doubt in a detailed, clear, and very easy-to-understand way.
Explain it in the language the student used (primarily ${language || "English"}).
Provide a comprehensive explanation (around 1-2 paragraphs) using simple analogies so that a school student can understand it perfectly. Make sure the sentences are complete and flow naturally.
Student Query: "${message}"`;

    for (const model of models) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(geminiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: promptContext,
                  },
                ],
              },
            ],
            generationConfig: {
              maxOutputTokens: 4000,
              temperature: 0.7,
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
          if (responseText) {
            success = true;
            break;
          }
        } else {
          lastError += ` [${model}]: ${await response.text()} | `;
        }
      } catch (err: any) {
        lastError += ` [${model} catch]: ${err.message} | `;
      }
    }

    if (!success) {
      return NextResponse.json(
        { error: `Gemini API Error: All models failed. Last Error: ${lastError}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ text: responseText });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
