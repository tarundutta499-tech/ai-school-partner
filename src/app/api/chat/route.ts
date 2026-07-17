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

    // Call Google Gemini API endpoint directly
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const promptContext = `You are a friendly, highly intelligent school teacher. Explain the following student doubt in a very simple, clear, and easy-to-understand way.
Explain it in the language the student used (primarily ${language || "English"}).
Keep the response concise (max 3-4 sentences) so it is appropriate for voice reading.
Student Query: "${message}"`;

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
          maxOutputTokens: 250,
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Gemini API Error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't formulate an answer. Please try again.";

    return NextResponse.json({ text: aiText });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
