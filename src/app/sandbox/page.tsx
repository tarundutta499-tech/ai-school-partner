"use client";

import { useState } from "react";
import { 
  Terminal, 
  Database, 
  Cpu, 
  Sparkles, 
  Search, 
  Sliders,
  ChevronRight,
  TrendingDown,
  Layers,
  Coins,
  Play,
  CheckCircle,
  FileCheck,
  Server
} from "lucide-react";

interface VectorResult {
  chunk_id: string;
  source: string;
  text: string;
  similarity: number;
}

export default function AISandbox() {
  // Navigation tabs in Sandbox
  const [sandboxTab, setSandboxTab] = useState<"engine" | "database" | "cost" | "diagram">("engine");

  // Admin generation states
  const [adminBoard, setAdminBoard] = useState("CBSE");
  const [adminClass, setAdminClass] = useState("Class 6");
  const [adminSubject, setAdminSubject] = useState("Science");
  const [adminChapter, setAdminChapter] = useState("Photosynthesis");
  const [adminLang, setAdminLang] = useState("Hindi");

  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);
  const [generatedRecord, setGeneratedRecord] = useState<any | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState("Explain photolysis of water in photosynthesis simply");
  const [searchResults, setSearchResults] = useState<VectorResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const startPipelineSim = () => {
    setPipelineRunning(true);
    setPipelineStep(1);
    setPipelineLogs(["Initializing Orchestrated Content Generation Pipeline..."]);
    setGeneratedRecord(null);

    // Step 1: LLM text generation
    setTimeout(() => {
      setPipelineStep(2);
      setPipelineLogs(prev => [
        ...prev,
        "✔ Calling OpenAI GPT-4 & Google Gemini API for lesson texts...",
        "  - Generated simple lesson text in Hindi and English (1,480 tokens).",
        "  - Drafted 10 Board-aligned MCQs, flashcards, and mind map schemas."
      ]);
    }, 800);

    // Step 2: Image API diagram generation
    setTimeout(() => {
      setPipelineStep(3);
      setPipelineLogs(prev => [
        ...prev,
        "✔ Calling Google Imagen API for illustrative diagrams...",
        "  - Created diagram: 'photosynthesis_light_reaction_vector.png' with sunlight, carbon dioxide, and water labels."
      ]);
    }, 1600);

    // Step 3: ElevenLabs TTS voice synthesis
    setTimeout(() => {
      setPipelineStep(4);
      setPipelineLogs(prev => [
        ...prev,
        "✔ Triggering ElevenLabs TTS API to generate voice narration...",
        "  - Created natural voice-over audio file (Duration: 2 mins 14 secs).",
        "  - Formatted and synced voice timelines."
      ]);
    }, 2400);

    // Step 4: Database storage and indexing
    setTimeout(() => {
      setPipelineStep(5);
      setPipelineLogs(prev => [
        ...prev,
        "✔ Committing record to PostgreSQL database...",
        "  - Vectorizing chapter content (dimensions: 1536).",
        "  - Indexed in pgvector thylakoid table under CBSE_6_SCI_CH3.",
        "  - Generation cost: $0.14 USD."
      ]);
      setGeneratedRecord({
        id: "rec_cbse_6_sci_ch3",
        board: adminBoard,
        grade: adminClass,
        subject: adminSubject,
        chapter: adminChapter,
        language: adminLang,
        estimatedTime: "25 minutes",
        difficulty: "Easy",
        cost: "$0.14"
      });
      setPipelineRunning(false);
    }, 3200);
  };

  const handleSearchLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      setSearchResults([
        {
          chunk_id: "chunk_cbse_10_sci_c3_p2",
          source: "CBSE Class 10 Science, Ch 3 Page 22",
          text: "Water photolysis occurs on the inner side of the thylakoid membrane. Light energy breaks down water molecules into hydrogen ions (H+), electrons (e-), and oxygen (O2). 2H2O -> 4H+ + 4e- + O2.",
          similarity: 0.9124
        },
        {
          chunk_id: "chunk_ncert_bio_c6_p8",
          source: "NCERT Biology Reference Manual Chapter 6",
          text: "Splitting of water molecules provides electrons for the photosystem II reaction center, replacing those lost during photoexcitation.",
          similarity: 0.8247
        }
      ]);
      setIsSearching(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="pb-6 border-b border-card-border/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">Core Infrastructure Sandbox</span>
          <h1 className="text-2xl font-black">AI Content Orchestration Engine</h1>
          <p className="text-xs text-muted-foreground mt-1">Pitching a &quot;curriculum factory&quot; to schools and investors: generate once, serve forever.</p>
        </div>

        {/* Sandbox tabs */}
        <div className="flex bg-muted p-1 rounded-xl border border-card-border">
          <button 
            onClick={() => setSandboxTab("engine")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${sandboxTab === "engine" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
          >
            Orchestration Engine
          </button>
          <button 
            onClick={() => setSandboxTab("database")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${sandboxTab === "database" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
          >
            pgvector Database
          </button>
          <button 
            onClick={() => setSandboxTab("cost")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${sandboxTab === "cost" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
          >
            Cost Controls
          </button>
          <button 
            onClick={() => setSandboxTab("diagram")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${sandboxTab === "diagram" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
          >
            Architecture Diagram
          </button>
        </div>
      </div>

      {/* Main Tab Panels */}
      <div>
        
        {/* TAB 1: ORCHESTRATION ENGINE (Admin Console) */}
        {sandboxTab === "engine" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Admin selector */}
            <div className="bg-card border border-card-border p-6 rounded-3xl shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-primary" />
                <h3 className="font-extrabold text-base">Admin Generation Inputs</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Select target board metadata to trigger the automated content generation pipeline. Generated content is saved once and served forever.
              </p>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Board</label>
                  <select value={adminBoard} onChange={(e) => setAdminBoard(e.target.value)} className="w-full p-2 bg-muted border border-card-border rounded-xl">
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State Board">State Board</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Class / Grade</label>
                  <select value={adminClass} onChange={(e) => setAdminClass(e.target.value)} className="w-full p-2 bg-muted border border-card-border rounded-xl">
                    <option value="Class 6">Class 6</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Subject</label>
                  <input type="text" value={adminSubject} onChange={(e) => setAdminSubject(e.target.value)} className="w-full p-2 bg-muted border border-card-border rounded-xl" />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Chapter Name</label>
                  <input type="text" value={adminChapter} onChange={(e) => setAdminChapter(e.target.value)} className="w-full p-2 bg-muted border border-card-border rounded-xl" />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Output Language</label>
                  <select value={adminLang} onChange={(e) => setAdminLang(e.target.value)} className="w-full p-2 bg-muted border border-card-border rounded-xl">
                    <option value="Hindi">Hindi (हिंदी)</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish (Español)</option>
                  </select>
                </div>

                <button
                  onClick={startPipelineSim}
                  disabled={pipelineRunning}
                  className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-xl shadow-md duo-button disabled:opacity-50 cursor-pointer"
                >
                  {pipelineRunning ? "Running Pipeline..." : "Orchestrate Content Pipeline"}
                </button>
              </div>
            </div>

            {/* Simulated terminal logs */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-3xl text-xs font-mono text-slate-300 flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <span className="flex items-center gap-1.5 text-primary text-[10px] font-bold uppercase tracking-wider">
                    <Terminal className="w-4 h-4" /> Orchestrator Pipelines Log
                  </span>
                  <span className="text-[9px] text-slate-500">Pipeline Version: 2.1</span>
                </div>

                <div className="space-y-2 overflow-y-auto max-h-[250px]">
                  {pipelineLogs.map((log, idx) => (
                    <div key={idx} className={log.startsWith("✔") ? "text-emerald-400" : ""}>
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              {/* Generated Content Record details */}
              {generatedRecord && (
                <div className="mt-6 p-4 bg-slate-800/80 border border-slate-700/60 rounded-xl space-y-2 text-[10px]">
                  <p className="text-white font-bold">Generated Content Record (Served Forever):</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-semibold">
                    <div>
                      <span className="text-slate-500 block">Record Key</span>
                      <span>{generatedRecord.id}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Difficulty</span>
                      <span>{generatedRecord.difficulty}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Time Estimate</span>
                      <span>{generatedRecord.estimatedTime}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">AI Cost (Once)</span>
                      <span className="text-emerald-400 font-extrabold">{generatedRecord.cost}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PGVECTOR DATABASE SEARCH */}
        {sandboxTab === "database" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-card border border-card-border p-6 rounded-3xl shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-base">pgvector Search Matcher</h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Search curriculum materials using cosine similarity matching. The database stores thylakoid chapter chunks with their vectors.
              </p>

              <form onSubmit={handleSearchLookup} className="space-y-4">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 bg-muted border border-card-border rounded-xl text-xs"
                />
                <button type="submit" className="w-full py-2 bg-amber-500 text-white text-xs font-bold rounded-xl cursor-pointer">
                  {isSearching ? "Searching embeddings..." : "Query Database"}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 bg-card border border-card-border p-6 rounded-3xl shadow-sm space-y-4">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Cosine Similarity Results</span>
              {searchResults.length > 0 ? (
                <div className="space-y-3">
                  {searchResults.map((res, i) => (
                    <div key={i} className="p-4 bg-muted rounded-xl border border-card-border text-xs space-y-1.5">
                      <div className="flex justify-between items-center text-foreground font-bold">
                        <span>{res.source}</span>
                        <span className="text-amber-500 font-mono">Similarity: {res.similarity}</span>
                      </div>
                      <p className="text-muted-foreground italic">&ldquo;{res.text}&rdquo;</p>
                      <span className="text-[9px] text-muted-foreground font-mono block">Chunk ID: {res.chunk_id}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-12 text-xs text-muted-foreground border border-dashed border-card-border rounded-xl">
                  Submit a database query on the left to see matching chunks.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: COST CONTROLS */}
        {sandboxTab === "cost" && (
          <div className="bg-card border border-card-border p-8 rounded-3xl shadow-sm space-y-6">
            <div className="flex items-center gap-2">
              <Coins className="w-6 h-6 text-emerald-500" />
              <h3 className="font-extrabold text-lg">Cost-Control Optimization Dashboard</h3>
            </div>
            
            <p className="text-xs text-muted-foreground">
              By caching generated curriculum records and serving identical matching schemas to students of the same class/board, we cut LLM token costs by over 99.9%.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-muted rounded-2xl border border-card-border text-center">
                <span className="text-xs text-muted-foreground block mb-2">Total Students Served</span>
                <span className="text-3xl font-extrabold">10,000</span>
              </div>

              <div className="p-6 bg-rose-500/10 border border-rose-500/20 text-rose-600 rounded-2xl text-center">
                <span className="text-xs text-muted-foreground block mb-2">Cost (Generated Per Student Request)</span>
                <span className="text-3xl font-extrabold">$1,400.00</span>
              </div>

              <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-2xl text-center">
                <span className="text-xs text-muted-foreground block mb-2">Cost (Generate Once, Serve Forever)</span>
                <span className="text-3xl font-extrabold">$0.14</span>
              </div>
            </div>

            <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl text-xs leading-relaxed text-muted-foreground">
              <strong className="text-foreground">SaaS Margin Telemetry:</strong> This architecture creates a strong competitive moat. We maintain high quality by having experts audit the single generated content record, while keeping our recurring AI API spend near zero.
            </div>
          </div>
        )}

        {/* TAB 4: ARCHITECTURE DIAGRAM */}
        {sandboxTab === "diagram" && (
          <div className="bg-card border border-card-border p-8 rounded-3xl shadow-sm text-center">
            <h3 className="font-extrabold text-base mb-6">Orchestration Architecture Flow</h3>
            
            <div className="max-w-xl mx-auto flex flex-col items-center gap-4 text-xs font-semibold">
              <div className="p-3 bg-primary text-white rounded-xl shadow-md w-48">
                Student App
              </div>
              <div className="w-0.5 h-6 bg-card-border"></div>
              <div className="p-3 bg-secondary text-white rounded-xl shadow-md w-48">
                Backend API Orchestrator
              </div>
              <div className="w-0.5 h-6 bg-card-border"></div>
              
              <div className="grid grid-cols-3 gap-2 w-full max-w-md">
                <div className="p-2 bg-muted border border-card-border rounded-lg text-[10px]">
                  OpenAI/Gemini (Text)
                </div>
                <div className="p-2 bg-muted border border-card-border rounded-lg text-[10px]">
                  Imagen (Illustrations)
                </div>
                <div className="p-2 bg-muted border border-card-border rounded-lg text-[10px]">
                  ElevenLabs (Speech)
                </div>
              </div>

              <div className="w-0.5 h-6 bg-card-border"></div>
              <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-md w-48 flex items-center justify-center gap-1.5">
                <Database className="w-4 h-4" /> PostgreSQL + pgvector
              </div>
              <div className="w-0.5 h-6 bg-card-border"></div>
              <div className="p-3 bg-emerald-500 text-white rounded-xl shadow-md w-48">
                Student Dashboard
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
