"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { 
  Award, 
  Users, 
  BookOpen, 
  Database,
  Plus,
  CheckCircle2,
  FileSpreadsheet,
  AlertTriangle,
  Sparkles,
  ClipboardCheck,
  FileDown,
  LineChart,
  Pin
} from "lucide-react";

interface StudentRow {
  name: string;
  email: string;
  completedLessons: number;
  averageScore: number;
  lastActive: string;
  status: "ahead" | "on-track" | "behind";
  riskDetails?: string;
}

export default function TeacherDashboard() {
  const { 
    studentName, 
    schoolName, 
    gradeClass, 
    section,
    activeClassFocus,
    setActiveClassFocus,
    activeHomeworkPrompt,
    setActiveHomeworkPrompt,
    lessons
  } = useApp();

  const [localFocus, setLocalFocus] = useState(activeClassFocus);
  const [localHomework, setLocalHomework] = useState(activeHomeworkPrompt);

  // Weakness Radar state hooks
  const [showRadarModal, setShowRadarModal] = useState(false);
  const [generatingSlides, setGeneratingSlides] = useState(false);
  const [slidesContent, setSlidesContent] = useState<string[] | null>(null);

  // AI Worksheet/Test and Lesson Planner states
  const [showTestModal, setShowTestModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [testDifficulty, setTestDifficulty] = useState("Medium");
  const [testQType, setTestQType] = useState("MCQ");
  const [testQuestions, setTestQuestions] = useState<{ q: string; points: string }[] | null>(null);
  const [generatingTest, setGeneratingTest] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<{ topic: string; duration: string; goals: string[]; flow: string[] } | null>(null);
  const [generatingPlan, setGeneratingPlan] = useState(false);

  const generateTestDocs = () => {
    setGeneratingTest(true);
    setTestQuestions(null);
    setTimeout(() => {
      setTestQuestions([
        { q: "Define photolysis of water and state the primary waste gas byproduct.", points: "3 Marks" },
        { q: "Where does the light-independent Calvin cycle reaction occur inside chloroplasts?", points: "1 Mark" },
        { q: "Outline cyclic vs non-cyclic photophosphorylation processes step-by-step.", points: "5 Marks" }
      ]);
      setGeneratingTest(false);
    }, 1200);
  };

  const generateLessonPlanDocs = () => {
    setGeneratingPlan(true);
    setGeneratedPlan(null);
    setTimeout(() => {
      setGeneratedPlan({
        topic: `Photosynthesis: Class 10th ${localFocus || "Light Reactions"}`,
        duration: "45 Minutes",
        goals: [
          "Understand light absorption by chlorophyll pigments.",
          "Trace the splitting of water molecules to release Oxygen gas.",
          "Identify ATP & NADPH synthesis pathways."
        ],
        flow: [
          "10 Mins: Introduction recap of chloroplast anatomy.",
          "20 Mins: Core diagram explanations & photon chemistry animation walkthrough.",
          "15 Mins: Practice board questions and check homework balances."
        ]
      });
      setGeneratingPlan(false);
    }, 1200);
  };

  const triggerGenerateSlides = () => {
    setGeneratingSlides(true);
    setSlidesContent(null);
    setTimeout(() => {
      setSlidesContent([
        "Slide 1: What is Photolysis? (Visual Breakdown)\n- Photo = Light, Lysis = Splitting.\n- Splitting of H2O molecules using absorbed light energy in thylakoids.",
        "Slide 2: The Core Chemical Equation\n- 2H2O + Light Energy -> 4H+ + 4e- + O2 (Waste Gas release).\n- Water acts as the electron donor to replace excited electrons in chlorophyll.",
        "Slide 3: Classroom Analogy (The Solar Charger)\n- Think of Chlorophyll as a solar battery charger. Sunlight excites electrons. To replace them, it splits water, dumping hydrogen protons inside the thylakoid."
      ]);
      setGeneratingSlides(false);
    }, 1500);
  };

  const handleUpdateFocus = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveClassFocus(localFocus);
    setActiveHomeworkPrompt(localHomework);
    alert(`Success: Classroom focus pinned to "${localFocus}"! Students dashboard updated.`);
  };

  const students: StudentRow[] = studentName ? [
    { name: studentName, email: `${studentName.toLowerCase().replace(/\s+/g, "")}@school.edu`, completedLessons: 0, averageScore: 0, lastActive: "Just now", status: "on-track" }
  ] : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-card-border/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Teacher Console</span>
          <h1 className="text-2xl font-black">Class Room {gradeClass || "Class"}-{section || "Section"} Science</h1>
          <p className="text-xs text-muted-foreground mt-1">School: <strong className="text-foreground">{schoolName || "Configure School Name"}</strong></p>
        </div>
        <div className="flex gap-2 text-xs font-bold">
          <button 
            onClick={() => {
              setShowTestModal(true);
              setTestQuestions(null);
            }} 
            className="px-3 py-1.5 rounded-xl border border-card-border bg-card hover:bg-muted cursor-pointer"
          >
            Create Test
          </button>
          <button 
            onClick={() => {
              setShowPlanModal(true);
              setGeneratedPlan(null);
            }} 
            className="px-3 py-1.5 rounded-xl border border-card-border bg-card hover:bg-muted cursor-pointer"
          >
            Generate Lesson Plan
          </button>
          <Link 
            href="/demo"
            className="px-3 py-1.5 rounded-xl border border-secondary text-secondary bg-secondary/5 hover:bg-secondary/10 hover:text-secondary-foreground transition-all cursor-pointer flex items-center gap-1 font-bold"
          >
            🎙️ AI Voice Lab
          </Link>
        </div>
      </div>

      {/* Dynamic Classroom Focus & Homework Controller */}
      <div className="bg-card border-2 border-indigo-600/30 p-6 rounded-3xl shadow-md space-y-4">
        <div className="flex items-center gap-2">
          <Pin className="w-5 h-5 text-indigo-600" />
          <h3 className="font-extrabold text-base">Classroom Sync: Pinned Active Topic</h3>
        </div>
        <p className="text-xs text-muted-foreground">
          Pin the chapter you are teaching in the classroom today. This automatically shifts the focus of your student&apos;s AI dashboards to highlight this topic and its homework support.
        </p>

        <form onSubmit={handleUpdateFocus} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end text-xs">
          <div className="space-y-1.5">
            <label className="text-[9px] uppercase font-bold text-muted-foreground">Today&apos;s Chapter Focus</label>
            <select 
              value={localFocus}
              onChange={(e) => setLocalFocus(e.target.value)}
              className="w-full p-2 bg-muted border border-card-border rounded-xl focus:outline-none font-bold"
            >
              {lessons.map((lesson) => (
                <option key={lesson.id} value={lesson.title}>{lesson.title}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-[9px] uppercase font-bold text-muted-foreground">Pinned Homework Prompt</label>
            <div className="flex gap-2">
              <input 
                type="text"
                required
                value={localHomework}
                onChange={(e) => setLocalHomework(e.target.value)}
                placeholder="Type today's assignment instructions..."
                className="flex-1 p-2 bg-muted border border-card-border rounded-xl focus:outline-none"
              />
              <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl cursor-pointer">
                Sync Focus
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 bg-card border border-card-border rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Class Average Engagement</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-extrabold">{students.length > 0 ? "100%" : "0%"}</p>
        </div>

        <div className="p-6 bg-card border border-card-border rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Curriculum Sync Rate</span>
            <BookOpen className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-extrabold">{students.length > 0 ? "100%" : "0%"}</p>
        </div>

        <div className="p-6 bg-card border border-card-border rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Students-at-Risk Flagged</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-extrabold">0 Students</p>
        </div>
      </div>

      {/* Main Roster & Database Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Student Roster Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-card-border rounded-3xl p-6 shadow-sm overflow-hidden">
            <h3 className="font-extrabold text-base mb-6">Student Roster & Metrics</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-card-border pb-3 text-muted-foreground">
                    <th className="py-3 font-semibold">Student</th>
                    <th className="py-3 font-semibold">Lessons Cleared</th>
                    <th className="py-3 font-semibold">Average Quiz Score</th>
                    <th className="py-3 font-semibold">Last Active</th>
                    <th className="py-3 font-semibold text-right">Progress Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-border/60">
                  {students.map((student, idx) => (
                    <tr key={idx} className="hover:bg-muted/40">
                      <td className="py-3.5 pr-2">
                        <p className="font-bold">{student.name}</p>
                        <span className="text-[10px] text-muted-foreground">{student.email}</span>
                      </td>
                      <td className="py-3.5 font-medium">{student.completedLessons}</td>
                      <td className="py-3.5">
                        <span className={`font-bold ${student.averageScore >= 85 ? "text-emerald-500" : "text-amber-500"}`}>
                          {student.averageScore}%
                        </span>
                      </td>
                      <td className="py-3.5 text-muted-foreground">{student.lastActive}</td>
                      <td className="py-3.5 text-right">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          student.status === "ahead" 
                            ? "bg-emerald-500/10 text-emerald-500"
                            : student.status === "on-track"
                              ? "bg-indigo-500/10 text-indigo-500"
                              : "bg-rose-500/10 text-rose-500"
                        }`}>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Classroom Topic Performance Map */}
          <div className="bg-card border border-card-border rounded-3xl p-6 shadow-sm space-y-4">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Topic-wise Performance</span>
            <div className="space-y-3 text-xs font-semibold">
              <div className="p-3 bg-muted rounded-xl border border-card-border flex justify-between items-center">
                <span>Chapter 1: Photosynthesis Basics</span>
                <span className="text-emerald-500">92% average</span>
              </div>
              <div className="p-3 bg-muted rounded-xl border border-card-border flex justify-between items-center">
                <span>Chapter 2: Light vs Dark Reactions</span>
                <span className="text-amber-500">76% average</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Action Panel */}
        <div className="space-y-6">
          {/* Worksheets and homework tools */}
          <div className="bg-card border border-card-border p-6 rounded-3xl shadow-sm space-y-4">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Worksheet & Notes Generator</span>
            <p className="text-xs text-muted-foreground leading-relaxed">Instantly generate printable study notes or board-aligned worksheets based on syllabus PDFs.</p>
            <div className="space-y-2">
              <button 
                onClick={() => {
                  setShowTestModal(true);
                  setTestQuestions(null);
                }} 
                className="w-full py-2 bg-indigo-600 hover:brightness-110 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ClipboardCheck className="w-4 h-4" /> Generate Practice Worksheet
              </button>
              <button 
                onClick={() => {
                  setShowPlanModal(true);
                  setGeneratedPlan(null);
                }} 
                className="w-full py-2 bg-muted border border-card-border text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileDown className="w-4 h-4" /> Download Chapter Lesson Notes
              </button>
            </div>
          </div>

          {/* Classroom Weakness Radar (AI Analytics) */}
          <div className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border-2 border-indigo-600/30 p-6 rounded-3xl shadow-sm space-y-4">
            <span className="text-xs font-bold text-indigo-600 flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" /> Classroom Weakness Radar
            </span>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-card border border-card-border rounded-xl space-y-1.5 text-left">
                <span className="text-[10px] font-bold text-rose-500 uppercase block">⚠️ Critical Bottleneck (Chapter 2)</span>
                <p className="text-[11px] leading-normal text-muted-foreground">
                  <strong>65% of students</strong> failed homework section B covering the Chemistry of <strong>Photolysis / Water splitting</strong>.
                </p>
                <div className="pt-2 flex justify-between items-center border-t border-card-border/60">
                  <span className="text-[9px] font-semibold text-muted-foreground">Action: Review recommended</span>
                  <button 
                    onClick={() => {
                      setShowRadarModal(true);
                      triggerGenerateSlides();
                    }}
                    className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[9px] font-bold transition-all cursor-pointer"
                  >
                    Generate Review Slides
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Review Slides Modal */}
      {showRadarModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-card border border-card-border p-6 rounded-3xl shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-card-border">
              <h3 className="font-extrabold text-base flex items-center gap-1.5 text-indigo-600">
                💡 AI Generated Review Slides: Photosynthesis Chemistry
              </h3>
              <button onClick={() => setShowRadarModal(false)} className="text-muted-foreground hover:text-foreground font-bold text-lg">×</button>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed text-left">
              These slides have been generated dynamically to help you address the conceptual gap detected in today's homework assessments. Use this deck to kickstart tomorrow's class review!
            </p>

            <div className="p-4 bg-muted rounded-2xl border border-card-border min-h-[160px] flex flex-col justify-center">
              {generatingSlides ? (
                <div className="text-center space-y-2">
                  <span className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin block mx-auto"></span>
                  <span className="text-[10px] font-bold text-indigo-600 animate-pulse block">Structuring slides & review analogies...</span>
                </div>
              ) : (
                slidesContent && (
                  <div className="space-y-4 text-left">
                    {slidesContent.map((slide, idx) => (
                      <div key={idx} className="p-3 bg-card rounded-xl border border-card-border/80 text-xs">
                        <pre className="font-sans whitespace-pre-wrap leading-relaxed text-foreground">{slide}</pre>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-card-border">
              <span className="text-[10px] font-semibold text-emerald-500">✓ Class materials ready to present</span>
              <button
                onClick={() => setShowRadarModal(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold"
              >
                Close & Sync to Board
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Test / Worksheet Generator Modal */}
      {showTestModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-card border border-card-border p-6 rounded-3xl shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-card-border">
              <h3 className="font-extrabold text-base text-indigo-600">
                📝 AI Exam & Worksheet Builder
              </h3>
              <button onClick={() => setShowTestModal(false)} className="text-muted-foreground hover:text-foreground font-bold text-lg">×</button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-muted-foreground uppercase text-[9px]">Select Difficulty</label>
                <select 
                  value={testDifficulty} 
                  onChange={(e) => setTestDifficulty(e.target.value)}
                  className="w-full p-2 bg-muted border border-card-border rounded-xl font-bold"
                >
                  <option value="Easy">Easy Level</option>
                  <option value="Medium">Medium Level</option>
                  <option value="Hard">Hard Board Prep</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-muted-foreground uppercase text-[9px]">Question Type</label>
                <select 
                  value={testQType} 
                  onChange={(e) => setTestQType(e.target.value)}
                  className="w-full p-2 bg-muted border border-card-border rounded-xl font-bold"
                >
                  <option value="MCQ">Board MCQs</option>
                  <option value="Short">Short Explanations</option>
                  <option value="Mix">Mixed Blueprint Paper</option>
                </select>
              </div>
            </div>

            <button
              onClick={generateTestDocs}
              disabled={generatingTest}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              {generatingTest ? "Synthesizing test blueprint..." : "Generate Worksheet / Mock Paper"}
            </button>

            {generatingTest && (
              <div className="text-center py-6 space-y-2">
                <span className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin block mx-auto"></span>
                <span className="text-[10px] text-indigo-600 animate-pulse font-bold">Assembling classroom test paper...</span>
              </div>
            )}

            {testQuestions && (
              <div className="space-y-3 pt-2 text-xs text-left max-h-[300px] overflow-y-auto pr-1">
                <span className="font-bold text-indigo-600 block">Generated Practice Sheet ({testDifficulty}):</span>
                <div className="space-y-2.5 p-3 bg-muted rounded-2xl border border-card-border">
                  {testQuestions.map((q, idx) => (
                    <div key={idx} className="space-y-1 p-2 bg-card border border-card-border/60 rounded-xl">
                      <p className="font-semibold text-foreground">Q{idx + 1}. {q.q}</p>
                      <span className="text-[9px] text-muted-foreground uppercase font-bold">{q.points}</span>
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={() => {
                    alert("Successfully compiled test! Sent to students dashboard.");
                    setShowTestModal(false);
                  }}
                  className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  Publish to Students Dashboards
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Generate Lesson Plan Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-card border border-card-border p-6 rounded-3xl shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-card-border">
              <h3 className="font-extrabold text-base text-indigo-600">
                📚 AI Lesson Planner & Study Notes
              </h3>
              <button onClick={() => setShowPlanModal(false)} className="text-muted-foreground hover:text-foreground font-bold text-lg">×</button>
            </div>

            <p className="text-xs text-muted-foreground leading-normal text-left">
              Draft structured 45-minute lesson timelines and reference notes for the active chapter.
            </p>

            <button
              onClick={generateLessonPlanDocs}
              disabled={generatingPlan}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              {generatingPlan ? "Structuring lesson outline..." : "Generate AI Lesson Plan"}
            </button>

            {generatingPlan && (
              <div className="text-center py-6 space-y-2">
                <span className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin block mx-auto"></span>
                <span className="text-[10px] text-indigo-600 animate-pulse font-bold">Aligning milestones to CBSE blueprint...</span>
              </div>
            )}

            {generatedPlan && (
              <div className="space-y-4 pt-2 text-xs text-left max-h-[300px] overflow-y-auto pr-1">
                <div className="p-3 bg-muted border border-card-border rounded-2xl space-y-2.5">
                  <div>
                    <strong className="text-foreground block">Topic Focus:</strong>
                    <p className="text-muted-foreground">{generatedPlan.topic} ({generatedPlan.duration})</p>
                  </div>

                  <div className="space-y-1">
                    <strong className="text-foreground block">Key Learning Goals:</strong>
                    <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                      {generatedPlan.goals.map((g, idx) => <li key={idx}>{g}</li>)}
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <strong className="text-foreground block">Lesson Milestones:</strong>
                    <ul className="list-decimal pl-4 space-y-1 text-muted-foreground">
                      {generatedPlan.flow.map((f, idx) => <li key={idx}>{f}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      alert("Notes compiled! PDF download started.");
                      setShowPlanModal(false);
                    }}
                    className="flex-1 py-2 bg-muted border border-card-border text-foreground font-bold rounded-xl cursor-pointer"
                  >
                    💾 Download PDF
                  </button>
                  <button 
                    onClick={() => {
                      alert("Linked syllabus outline to teacher calendar.");
                      setShowPlanModal(false);
                    }}
                    className="flex-1 py-2 bg-indigo-600 text-white font-bold rounded-xl cursor-pointer"
                  >
                    Link to Calendar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
