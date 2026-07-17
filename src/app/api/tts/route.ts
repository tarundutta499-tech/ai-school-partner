import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { text, language } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const apiKey = process.env.AZURE_SPEECH_KEY;
    const region = process.env.AZURE_SPEECH_REGION || "eastus";

    if (!apiKey) {
      return NextResponse.json(
        { error: "Azure Speech Key not configured in env variables" },
        { status: 500 }
      );
    }

    // Select neural voice depending on selected language configuration
    let voiceName = "en-IN-NeerjaNeural"; // High quality Indian English neutral voice
    let locale = "en-IN";

    const langLower = (language || "English").toLowerCase();
    if (langLower === "hindi" || langLower === "hi") {
      voiceName = "hi-IN-SwaraNeural";
      locale = "hi-IN";
    } else if (langLower === "tamil" || langLower === "ta") {
      voiceName = "ta-IN-PallaviNeural";
      locale = "ta-IN";
    } else if (langLower === "telugu" || langLower === "te") {
      voiceName = "te-IN-ShrutiNeural";
      locale = "te-IN";
    } else if (langLower === "bengali" || langLower === "bn") {
      voiceName = "bn-IN-TanishaNeural";
      locale = "bn-IN";
    } else if (langLower === "marathi" || langLower === "mr") {
      voiceName = "mr-IN-AarohiNeural";
      locale = "mr-IN";
    } else if (langLower === "gujarati" || langLower === "gu") {
      voiceName = "gu-IN-DhwaniNeural";
      locale = "gu-IN";
    } else if (langLower === "kannada" || langLower === "kn") {
      voiceName = "kn-IN-SapnaNeural";
      locale = "kn-IN";
    } else if (langLower === "malayalam" || langLower === "ml") {
      voiceName = "ml-IN-SobhanaNeural";
      locale = "ml-IN";
    } else if (langLower === "punjabi" || langLower === "pa") {
      voiceName = "pa-IN-OjasNeural";
      locale = "pa-IN";
    } else if (langLower === "urdu" || langLower === "ur") {
      voiceName = "ur-IN-YasminNeural";
      locale = "ur-IN";
    }

    // Construct Azure Cognitive Services Text-to-Speech REST Endpoint
    const url = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;

    // SSML formatting for voice structure
    const ssml = `<speak version='1.0' xml:lang='${locale}'><voice xml:lang='${locale}' xml:gender='Female' name='${voiceName}'>${text}</voice></speak>`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": apiKey,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
        "User-Agent": "PathshalaAI",
      },
      body: ssml,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Azure Speech API Error: ${errorText}` },
        { status: response.status }
      );
    }

    const audioBuffer = await response.arrayBuffer();

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.byteLength.toString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
