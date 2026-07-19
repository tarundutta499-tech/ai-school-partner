import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const key = process.env.GEMINI_API_KEY || "NOT_SET";
  return NextResponse.json({
    hasKey: key !== "NOT_SET",
    keyPrefix: key !== "NOT_SET" ? key.slice(0, 8) + "..." : "none",
    keyLength: key.length,
    azureKeyPrefix: (process.env.AZURE_SPEECH_KEY || "NOT_SET").slice(0, 5) + "..."
  });
}
