"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Mic, MicOff, Sparkles, Languages, Volume2, ArrowLeft } from "lucide-react";

export default function PublicVoiceDemo() {
  const [lang, setLang] = useState<"en-IN" | "hi-IN" | "ta-IN">("en-IN");
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [recognition, setRecognition] = useState<any>(null);
  const [rateLimit, setRateLimit] = useState(0);

  useEffect(() => {
    // Initialize Web Speech API Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = lang;

      rec.onresult = (event: any) => {
        const resultText = event.results[0][0].transcript;
        setTranscript(resultText);
        handleSendVoicePrompt(resultText);
      };

      rec.onerror = (e: any) => {
        console.error("Speech Recognition Error:", e);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      setRecognition(rec);
    }
  }, [lang]);

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
    } else {
      if (rateLimit >= 5) {
        alert("Demo limit reached (5 prompts max for guest session). Sign in to unlock unlimited voice chats!");
        return;
      }
      setTranscript("");
      setAiResponse("");
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
      setIsPlayingAudio(false);
      try {
        recognition?.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSendVoicePrompt = async (text: string) => {
    setRateLimit(prev => prev + 1);
    setAiResponse("AI is formulating your scientific answer...");
    
    try {
      const langName = lang === "hi-IN" ? "Hindi" : lang === "ta-IN" ? "Tamil" : "English";
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, language: langName }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "AI API Call failed" }));
        const fallbackMessage = err.error || "Failed to connect to AI server.";
        setAiResponse(fallbackMessage);
        speakBack(fallbackMessage, langName);
        return;
      }

      const data = await res.json();
      const aiReply = data.text;
      setAiResponse(aiReply);
      speakBack(aiReply, langName);
    } catch (error: any) {
      console.error(error);
      const fallbackMessage = "Error connecting to AI. Make sure you set your GEMINI_API_KEY in the environment.";
      setAiResponse(fallbackMessage);
      speakBack(fallbackMessage, "English");
    }
  };

  const speakBack = async (textToSpeak: string, language: string) => {
    setIsPlayingAudio(true);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToSpeak, language }),
      });

      if (!res.ok) {
        console.error("Speech response failed. Azure credentials not configured.");
        setIsPlayingAudio(false);
        return;
      }

      const audioBlob = await res.blob();
      const url = URL.createObjectURL(audioBlob);
      const audio = new Audio(url);
      setAudioElement(audio);
      audio.play();
      audio.onended = () => {
        setIsPlayingAudio(false);
        URL.revokeObjectURL(url);
      };
    } catch (e) {
      console.error(e);
      setIsPlayingAudio(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="w-full max-w-xl bg-card border border-card-border p-8 rounded-3xl shadow-2xl space-y-6 text-center">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-card-border">
          <Link href="/" className="text-muted-foreground hover:text-foreground text-xs font-bold flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <span className="text-xs font-black text-primary flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-secondary" /> Pathshala AI Voice Lab
          </span>
          <div className="w-12"></div>
        </div>

        <div>
          <h2 className="text-xl font-black">🗣️ Live AI Voice Tutor (Demo)</h2>
          <p className="text-xs text-muted-foreground mt-1.5 leading-normal">
            Choose your language, tap the microphone to speak your question about science/photosynthesis, and the AI will talk back to you!
          </p>
        </div>

        {/* Language Selection */}
        <div className="flex items-center justify-center gap-2 p-2 bg-muted rounded-2xl border border-card-border/80">
          <Languages className="w-4 h-4 text-muted-foreground" />
          <span className="text-[10px] font-bold uppercase text-muted-foreground">Select Language:</span>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as any)}
            className="text-xs bg-card border border-card-border p-1 rounded-lg font-bold"
          >
            <option value="en-IN">Indian English Voice</option>
            <option value="hi-IN">Hindi Voice (हिंदी)</option>
            <option value="ta-IN">Tamil Voice (தமிழ்)</option>
          </select>
        </div>

        {/* Visualizer Pulsing Orb */}
        <div className="py-6 flex justify-center">
          <button
            onClick={toggleListening}
            className={`w-32 h-32 rounded-full flex flex-col items-center justify-center border-4 shadow-xl transition-all cursor-pointer ${
              isListening
                ? "bg-rose-500 border-rose-600 scale-105 animate-pulse text-white shadow-rose-500/20"
                : isPlayingAudio
                ? "bg-primary border-primary-foreground/20 text-white animate-bounce shadow-primary/20"
                : "bg-gradient-to-r from-primary to-secondary hover:brightness-110 text-white border-white/10 active:scale-95"
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="w-8 h-8 mb-1.5" />
                <span className="text-[9px] uppercase font-bold tracking-wider animate-pulse">Listening...</span>
              </>
            ) : (
              <>
                <Mic className="w-8 h-8 mb-1.5" />
                <span className="text-[9px] uppercase font-bold tracking-wider">Tap to Speak</span>
              </>
            )}
          </button>
        </div>

        {/* Text Transcript Panel */}
        <div className="space-y-4 text-left">
          {transcript && (
            <div className="p-3 bg-muted border border-card-border rounded-xl space-y-1">
              <span className="text-[9px] uppercase font-bold text-muted-foreground block">You said:</span>
              <p className="text-xs text-foreground italic">"{transcript}"</p>
            </div>
          )}

          {aiResponse && (
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[9px] uppercase font-bold text-primary block">AI Tutor Response:</span>
                {isPlayingAudio && (
                  <span className="text-[9px] text-emerald-500 font-bold flex items-center gap-1 animate-pulse">
                    <Volume2 className="w-3.5 h-3.5" /> Speaking...
                  </span>
                )}
              </div>
              <p className="text-xs leading-normal text-foreground">{aiResponse}</p>
            </div>
          )}
        </div>

        {/* Rate limit warning */}
        <div className="pt-2 text-[10px] text-muted-foreground flex justify-between items-center border-t border-card-border/60">
          <span>Demo Usage: {rateLimit}/5 Prompts</span>
          <Link href="/auth" className="text-primary font-bold hover:underline">
            Unlock Unlimited Access →
          </Link>
        </div>

      </div>
    </div>
  );
}
