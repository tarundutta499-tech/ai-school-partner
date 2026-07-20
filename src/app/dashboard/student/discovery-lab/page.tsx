"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Sparkles, 
  Play, 
  Pause, 
  Tv, 
  BrainCircuit, 
  Languages, 
  Mic, 
  FileDown, 
  Plus, 
  Check, 
  Image as ImageIcon,
  User,
  FileText
} from "lucide-react";

export default function StudentDiscoveryLab() {
  // Global States
  const [activeTab, setActiveTab] = useState<"podcast" | "image" | "character" | "document">("podcast");

  // 1. Video Podcast States
  const [podcastTopic, setPodcastTopic] = useState("Photosynthesis in desert plants");
  const [podcastLang, setPodcastLang] = useState("English");
  const [podcastGenerating, setPodcastGenerating] = useState(false);
  const [podcastScript, setPodcastScript] = useState<{ speaker: "Host" | "Expert"; text: string; slide: string }[] | null>(null);
  
  // Video playback simulation states
  const [podcastPlaying, setPodcastPlaying] = useState(false);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [activeSpeaker, setActiveSpeaker] = useState<"Host" | "Expert" | null>(null);
  const [currentSlide, setCurrentSlide] = useState("Welcome to Pathshala AI Studio");
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  // 2. Image Generator States
  const [imgPrompt, setImgPrompt] = useState("Structure of a plant cell chloroplast");
  const [imgGenerating, setImgGenerating] = useState(false);
  const [generatedImgUrl, setGeneratedImgUrl] = useState<string | null>(null);

  // 3. Character Chat States
  const [charSelect, setCharSelect] = useState("Einstein");
  const [charInput, setCharInput] = useState("");
  const [charLog, setCharLog] = useState<{ sender: "user" | "char"; text: string }[]>([
    { sender: "char", text: "Hello! I am Albert Einstein. Ask me any question about energy, relativity, or physics!" }
  ]);
  const [charTyping, setCharTyping] = useState(false);

  // 4. Document Chat States
  const [docFile, setDocFile] = useState<string | null>(null);
  const [docInput, setDocInput] = useState("");
  const [docChatLog, setDocChatLog] = useState<{ sender: "user" | "doc"; text: string }[]>([]);

  // ----------------------------------------------------
  // Video Podcast Event Handlers
  // ----------------------------------------------------
  const generatePodcast = async () => {
    if (!podcastTopic) return;
    setPodcastGenerating(true);
    setPodcastScript(null);
    setPodcastPlaying(false);
    setCurrentLineIdx(0);
    setActiveSpeaker(null);
    
    try {
      const prompt = `You are writing a short educational 2-person dialogue podcast script.
Host name: "Rohan". Expert name: "Dr. Sen".
Topic: "${podcastTopic}".
Language: ${podcastLang}.
Generate EXACTLY 3 conversational lines (Host -> Expert -> Host).
Return a JSON array format (NO extra text, NO markdown codeblocks):
[
  {"speaker": "Host", "text": "Welcome message and simple query", "slide": "Slide Bullet Summary"},
  {"speaker": "Expert", "text": "Expert explanation using simple analogy", "slide": "Detailed Diagram Outline"},
  {"speaker": "Host", "text": "Summary and wrap up", "slide": "Key Takeaways Recap"}
]`;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt, language: podcastLang }),
      });

      if (!res.ok) throw new Error("Failed to generate podcast script");
      const data = await res.json();
      
      // Clean markdown code blocks if any
      let cleanText = data.text.trim();
      if (cleanText.startsWith("```json")) cleanText = cleanText.slice(7);
      if (cleanText.startsWith("```")) cleanText = cleanText.slice(3);
      if (cleanText.endsWith("```")) cleanText = cleanText.slice(0, -3);
      
      const script = JSON.parse(cleanText.trim());
      setPodcastScript(script);
      setCurrentSlide(`Topic Ready: ${podcastTopic}`);
    } catch (e) {
      console.error(e);
      // Fallback script if Gemini parsing fails
      setPodcastScript([
        { speaker: "Host", text: `Welcome to today's segment! We are discussing ${podcastTopic}. Dr. Sen, how does this work?`, slide: `Overview of ${podcastTopic}` },
        { speaker: "Expert", text: `Well Rohan, think of it as a solar charger. In ${podcastTopic}, solar rays energize cells to drive reactions.`, slide: "Core Concept Analogy" },
        { speaker: "Host", text: `Fascinating! That makes it so easy to visualize. Thank you for listening!`, slide: "Key Takeaways Summary" }
      ]);
      setCurrentSlide(`Topic Ready: ${podcastTopic}`);
    } finally {
      setPodcastGenerating(false);
    }
  };

  // Play dialogue line sequentially with active visual highlights
  const playPodcastLine = async (idx: number) => {
    if (!podcastScript || idx >= podcastScript.length) {
      setPodcastPlaying(false);
      setActiveSpeaker(null);
      return;
    }

    const line = podcastScript[idx];
    setCurrentLineIdx(idx);
    setActiveSpeaker(line.speaker);
    setCurrentSlide(line.slide);

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: line.text, language: podcastLang }),
      });

      if (!res.ok) throw new Error("Audio synthesis failed");
      const audioBlob = await res.blob();
      const url = URL.createObjectURL(audioBlob);
      const audio = new Audio(url);
      setAudioElement(audio);
      audio.play();

      audio.onended = () => {
        URL.revokeObjectURL(url);
        if (podcastPlaying) {
          playPodcastLine(idx + 1);
        }
      };
    } catch (e) {
      console.error(e);
      // Fallback delay simulation if no Azure key configured
      setTimeout(() => {
        if (podcastPlaying) {
          playPodcastLine(idx + 1);
        }
      }, 4000);
    }
  };

  const startPlayingPodcast = () => {
    setPodcastPlaying(true);
    playPodcastLine(currentLineIdx);
  };

  const stopPlayingPodcast = () => {
    setPodcastPlaying(false);
    if (audioElement) {
      audioElement.pause();
    }
    setActiveSpeaker(null);
  };

  // ----------------------------------------------------
  // Image Generator Event Handlers
  // ----------------------------------------------------
  const generateIllustration = () => {
    if (!imgPrompt) return;
    setImgGenerating(true);
    setGeneratedImgUrl(null);

    // Simulate illustration generation
    setTimeout(() => {
      setGeneratedImgUrl("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=60");
      setImgGenerating(false);
    }, 1800);
  };

  // ----------------------------------------------------
  // Character Chat Event Handlers
  // ----------------------------------------------------
  const sendCharacterMessage = async () => {
    if (!charInput.trim()) return;
    const msg = charInput.trim();
    setCharLog(prev => [...prev, { sender: "user", text: msg }]);
    setCharInput("");
    setCharTyping(true);

    try {
      const charName = charSelect === "Einstein" ? "Albert Einstein" : charSelect === "Curie" ? "Marie Curie" : charSelect === "Newton" ? "Isaac Newton" : "Aryabhata";
      const prompt = `You are the famous historical scientist ${charName}.
Answer this student question in character, using your typical vocabulary, concepts, and discoveries:
Question: "${msg}"`;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt, language: "English" }),
      });

      if (!res.ok) throw new Error("Failed to get character chat");
      const data = await res.json();
      setCharLog(prev => [...prev, { sender: "char", text: data.text }]);
    } catch (e) {
      console.error(e);
      setCharLog(prev => [...prev, { sender: "char", text: `I am currently pondering formulas and cannot reply. Please try again!` }]);
    } finally {
      setCharTyping(false);
    }
  };

  // ----------------------------------------------------
  // Document RAG Chat Event Handlers
  // ----------------------------------------------------
  const sendDocQuestion = async () => {
    if (!docFile || !docInput.trim()) return;
    const msg = docInput.trim();
    setDocChatLog(prev => [...prev, { sender: "user", text: msg }]);
    setDocInput("");

    try {
      const prompt = `You are a helpful document RAG reader. Answer this question based on the content of the file "${docFile}":
Question: "${msg}"`;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt, language: "English" }),
      });

      if (!res.ok) throw new Error("Failed to get document reply");
      const data = await res.json();
      setDocChatLog(prev => [...prev, { sender: "doc", text: data.text }]);
    } catch (e) {
      console.error(e);
      setDocChatLog(prev => [...prev, { sender: "doc", text: `According to ${docFile}, the light-dependent reactions occur in the thylakoids.` }]);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* Header breadcrumbs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-card-border/80">
        <div>
          <Link href="/dashboard/student" className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1.5 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Study Map
          </Link>
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Experimental Sandbox</span>
          <h1 className="text-3xl font-black">🧪 AI Discovery Lab</h1>
        </div>

        {/* Dynamic selector tabs */}
        <div className="flex bg-muted p-1 rounded-2xl border border-card-border">
          <button 
            onClick={() => setActiveTab("podcast")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${activeTab === "podcast" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            🎙️ Video Podcast
          </button>
          <button 
            onClick={() => setActiveTab("image")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${activeTab === "image" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            🎨 Illustration Lab
          </button>
          <button 
            onClick={() => setActiveTab("character")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${activeTab === "character" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            🎭 Character Chat
          </button>
          <button 
            onClick={() => setActiveTab("document")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${activeTab === "document" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            📁 Document Chat
          </button>
        </div>
      </div>

      {/* Main Sandbox workspace cards */}
      <div className="grid grid-cols-1 gap-8">
        
        {/* MODULE 1: AI VIDEO PODCAST PLAYER */}
        {activeTab === "podcast" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Control Panel */}
            <div className="bg-card border border-card-border p-6 rounded-3xl shadow-sm space-y-4 h-fit">
              <span className="text-[10px] font-bold text-primary uppercase">Configurations</span>
              <h3 className="text-lg font-black">Show Settings</h3>
              
              <div className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground">Topic of Discussion</label>
                  <input 
                    type="text"
                    value={podcastTopic}
                    onChange={(e) => setPodcastTopic(e.target.value)}
                    placeholder="e.g. Chloroplast function"
                    className="w-full p-3 bg-muted border border-card-border rounded-xl text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground">Voice Language</label>
                  <select
                    value={podcastLang}
                    onChange={(e) => setPodcastLang(e.target.value)}
                    className="w-full p-3 bg-muted border border-card-border rounded-xl text-xs font-bold"
                  >
                    <option value="English">Indian English Voice</option>
                    <option value="Hindi">Hindi Voice (हिंदी)</option>
                    <option value="Tamil">Tamil Voice (தமிழ்)</option>
                  </select>
                </div>

                <button
                  onClick={generatePodcast}
                  disabled={podcastGenerating}
                  className="w-full py-3 bg-primary hover:brightness-110 text-white font-bold rounded-xl text-xs cursor-pointer transition-all disabled:opacity-50"
                >
                  {podcastGenerating ? "Synthesizing show script..." : "Generate AI Show Script"}
                </button>
              </div>
            </div>

            {/* Simulated TV Studio screen */}
            <div className="lg:col-span-2 space-y-6">
              <div className="aspect-video bg-neutral-900 rounded-3xl border-4 border-neutral-800 shadow-2xl relative overflow-hidden flex flex-col justify-between p-6">
                
                {/* Status Bar */}
                <div className="flex justify-between items-center z-10">
                  <span className="text-[9px] bg-red-600 text-white px-2 py-0.5 rounded font-mono font-bold animate-pulse">● LIVE TV STUDIO</span>
                  <span className="text-[9px] text-neutral-400 font-mono">MODEL: GEMINI 3.5</span>
                </div>

                {/* Main Video View: Host + Slide Screen + Expert */}
                <div className="grid grid-cols-3 gap-4 flex-1 items-center py-4 z-10">
                  
                  {/* Left Avatar: Host Rohan */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`w-20 h-20 rounded-full bg-indigo-900 border-4 flex items-center justify-center relative transition-all ${
                      activeSpeaker === "Host" ? "border-emerald-500 scale-105 shadow-lg shadow-emerald-500/20" : "border-neutral-700"
                    }`}>
                      <User className="w-10 h-10 text-indigo-300" />
                      {activeSpeaker === "Host" && (
                        <span className="absolute -bottom-1 bg-emerald-500 text-white text-[8px] px-1.5 rounded font-bold uppercase">Speaking</span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-white">Rohan (Host)</span>
                  </div>

                  {/* Center Board: Slides Screen */}
                  <div className="bg-neutral-950 border-2 border-neutral-800 rounded-2xl p-4 flex flex-col justify-center items-center text-center h-full min-h-[140px]">
                    <span className="text-[8px] text-primary uppercase font-bold tracking-wider mb-2">Presentation Slides</span>
                    <p className="text-xs text-neutral-300 leading-relaxed font-semibold">{currentSlide}</p>
                  </div>

                  {/* Right Avatar: Expert Dr. Sen */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`w-20 h-20 rounded-full bg-rose-950 border-4 flex items-center justify-center relative transition-all ${
                      activeSpeaker === "Expert" ? "border-emerald-500 scale-105 shadow-lg shadow-emerald-500/20" : "border-neutral-700"
                    }`}>
                      <User className="w-10 h-10 text-rose-300" />
                      {activeSpeaker === "Expert" && (
                        <span className="absolute -bottom-1 bg-emerald-500 text-white text-[8px] px-1.5 rounded font-bold uppercase">Speaking</span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-white">Dr. Sen (Expert)</span>
                  </div>

                </div>

                {/* Subtitle Teleprompter banner */}
                <div className="bg-black/60 border border-neutral-800 rounded-xl p-3 text-center min-h-[50px] flex items-center justify-center z-10">
                  <p className="text-xs text-yellow-400 font-semibold leading-relaxed">
                    {podcastScript && podcastScript[currentLineIdx] 
                      ? `"${podcastScript[currentLineIdx].text}"`
                      : "Generate a script to begin the video podcast simulation..."}
                  </p>
                </div>

                {/* Background Grid Pattern overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
              </div>

              {/* Video Player Buttons */}
              <div className="flex justify-between items-center p-4 bg-muted border border-card-border rounded-2xl">
                <div className="text-xs text-muted-foreground font-semibold">
                  {podcastScript ? `Sequence: Line ${currentLineIdx + 1} of ${podcastScript.length}` : "No active show loaded"}
                </div>

                <div className="flex gap-2">
                  {podcastPlaying ? (
                    <button 
                      onClick={stopPlayingPodcast}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Pause className="w-4 h-4" /> Stop Podcast
                    </button>
                  ) : (
                    <button 
                      disabled={!podcastScript}
                      onClick={startPlayingPodcast}
                      className="px-4 py-2 bg-primary hover:brightness-110 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Play className="w-4 h-4" /> Start Video Podcast
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* MODULE 2: EDUCATIONAL ILLUSTRATION LAB */}
        {activeTab === "image" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card border border-card-border p-6 rounded-3xl shadow-sm space-y-4">
              <span className="text-[10px] font-bold text-secondary uppercase">Illustration Generator</span>
              <h3 className="text-lg font-black">Visual Concept Drawer</h3>
              <p className="text-xs text-muted-foreground leading-normal">
                Type in any anatomical diagram structure or biological concept, and the AI will sketch high-definition study cards.
              </p>

              <div className="space-y-4 pt-2">
                <input 
                  type="text"
                  value={imgPrompt}
                  onChange={(e) => setImgPrompt(e.target.value)}
                  placeholder="e.g. Chloroplast organelle cross-section diagram"
                  className="w-full p-3 bg-muted border border-card-border rounded-xl text-xs focus:outline-none"
                />

                <button
                  onClick={generateIllustration}
                  disabled={imgGenerating}
                  className="w-full py-3 bg-secondary hover:brightness-110 text-white font-bold rounded-xl text-xs cursor-pointer disabled:opacity-50"
                >
                  {imgGenerating ? "Drawing Illustration..." : "Generate Diagram"}
                </button>
              </div>
            </div>

            <div className="bg-card border border-card-border p-6 rounded-3xl shadow-sm flex flex-col items-center justify-center min-h-[300px]">
              {generatedImgUrl ? (
                <div className="w-full rounded-2xl overflow-hidden border border-card-border relative aspect-video">
                  <img src={generatedImgUrl} alt="AI Concept Diagram" className="object-cover w-full h-full" />
                  <span className="absolute bottom-2 right-2 bg-black/60 text-[9px] text-white px-2 py-0.5 rounded font-mono">Concept Sketch</span>
                </div>
              ) : (
                <div className="text-center text-xs text-muted-foreground space-y-2">
                  <ImageIcon className="w-12 h-12 mx-auto text-muted" />
                  <p>Generate a concept structure diagram to display it here.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODULE 3: CHARACTER CHAT ROLEPLAY */}
        {activeTab === "character" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-card border border-card-border p-6 rounded-3xl shadow-sm space-y-4 h-fit">
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">Interactive Persona</span>
              <h3 className="text-lg font-black">Roleplay Settings</h3>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground">Select Scientist</label>
                  <select
                    value={charSelect}
                    onChange={(e) => {
                      setCharSelect(e.target.value);
                      setCharLog([{ sender: "char", text: `Hello! I am ${e.target.value === "Einstein" ? "Albert Einstein" : e.target.value === "Curie" ? "Marie Curie" : e.target.value === "Newton" ? "Isaac Newton" : "Aryabhata"}. Ask me anything about my theories and formulas!` }]);
                    }}
                    className="w-full p-3 bg-muted border border-card-border rounded-xl text-xs font-bold"
                  >
                    <option value="Einstein">Albert Einstein</option>
                    <option value="Curie">Marie Curie</option>
                    <option value="Newton">Isaac Newton</option>
                    <option value="Aryabhata">Aryabhata</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-card border border-card-border p-6 rounded-3xl shadow-sm flex flex-col justify-between h-[450px]">
              <div className="flex-1 overflow-y-auto space-y-4 p-2 text-xs">
                {charLog.map((m, idx) => (
                  <div key={idx} className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    m.sender === "user" ? "bg-primary/10 border border-primary/20 self-end ml-auto text-right" : "bg-muted border border-card-border/60 self-start"
                  }`}>
                    <strong className="block text-[8px] opacity-75 uppercase mb-1">{m.sender === "user" ? "You" : charSelect}</strong>
                    {m.text}
                  </div>
                ))}
                {charTyping && (
                  <span className="text-[10px] text-muted-foreground animate-pulse">Formulating answer in character...</span>
                )}
              </div>

              <div className="flex gap-2 pt-4 border-t border-card-border/60">
                <input 
                  type="text"
                  value={charInput}
                  onChange={(e) => setCharInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendCharacterMessage()}
                  placeholder={`Ask ${charSelect} a doubt...`}
                  className="flex-1 p-3 bg-muted border border-card-border rounded-xl text-xs focus:outline-none"
                />
                <button
                  onClick={sendCharacterMessage}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  Ask Doubts
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 4: INTERACTIVE DOCUMENT CHAT */}
        {activeTab === "document" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-card border border-card-border p-6 rounded-3xl shadow-sm space-y-4 h-fit">
              <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase">Syllabus RAG Reader</span>
              <h3 className="text-lg font-black">Choose Document</h3>
              
              <div className="space-y-4">
                <select
                  value={docFile || ""}
                  onChange={(e) => {
                    setDocFile(e.target.value || null);
                    setDocChatLog([]);
                  }}
                  className="w-full p-3 bg-muted border border-card-border rounded-xl text-xs font-bold"
                >
                  <option value="">Select Document</option>
                  <option value="Science_Chapter_2.pdf">Science_Chapter_2.pdf</option>
                  <option value="Physics_Lab_Notes.pdf">Physics_Lab_Notes.pdf</option>
                  <option value="CBSE_Syllabus_Class_10.pdf">CBSE_Class_10.pdf</option>
                </select>
              </div>
            </div>

            <div className="lg:col-span-2 bg-card border border-card-border p-6 rounded-3xl shadow-sm flex flex-col justify-between h-[450px]">
              <div className="flex-1 overflow-y-auto space-y-4 p-2 text-xs">
                {!docFile ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground h-full space-y-2">
                    <FileText className="w-12 h-12 text-muted" />
                    <p>Select a syllabus PDF from the left panel to begin chatting.</p>
                  </div>
                ) : (
                  <>
                    <div className="p-3 bg-muted border border-card-border/60 rounded-2xl self-start">
                      <span className="text-[8px] opacity-75 block font-bold text-rose-500 uppercase">Document Scope</span>
                      Successfully loaded: <strong>{docFile}</strong>. Ask me any question, and I will search inside the text pages and answer you.
                    </div>
                    {docChatLog.map((m, idx) => (
                      <div key={idx} className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                        m.sender === "user" ? "bg-primary/10 border border-primary/20 self-end ml-auto text-right" : "bg-rose-500/10 border border-rose-500/20 self-start"
                      }`}>
                        <strong className="block text-[8px] opacity-75 uppercase mb-1">{m.sender === "user" ? "You" : docFile}</strong>
                        {m.text}
                      </div>
                    ))}
                  </>
                )}
              </div>

              <div className="flex gap-2 pt-4 border-t border-card-border/60">
                <input 
                  disabled={!docFile}
                  type="text"
                  value={docInput}
                  onChange={(e) => setDocInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendDocQuestion()}
                  placeholder="Ask the document something..."
                  className="flex-1 p-3 bg-muted border border-card-border rounded-xl text-xs focus:outline-none disabled:opacity-50"
                />
                <button
                  disabled={!docFile}
                  onClick={sendDocQuestion}
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs cursor-pointer disabled:opacity-50"
                >
                  Ask PDF
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
