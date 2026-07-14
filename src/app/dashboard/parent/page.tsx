"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Users, 
  Sparkles, 
  Settings, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  BookOpen,
  MessageSquareCode,
  Calendar,
  AlertCircle,
  FileCheck,
  Download,
  AlertTriangle
} from "lucide-react";

export default function ParentDashboard() {
  const { parentInstructions, setParentInstructions, lessons, studentName, gradeClass } = useApp();
  const [parentLang, setParentLang] = useState<"en" | "hi">("en");

  const completedCount = lessons.filter(l => l.completed).length;
  const averageScore = lessons.reduce((acc, curr) => acc + (curr.score || 0), 0) / (completedCount || 1);

  // Translations
  const t = {
    en: {
      portal: "Parent Portal",
      welcome: "Welcome back, Parent",
      reviewing: "Reviewing stats for:",
      sibling1: studentName ? `${studentName} (${gradeClass || "Class"})` : "Active Student",
      sibling2: "Secondary Sibling",
      studyTime: "Study Time (This Week)",
      currAlign: "Curriculum Alignment",
      avgScore: "Average Quiz Score",
      lessonsCleared: "Lessons Cleared",
      customInstructions: "Custom AI Tutor Instructions",
      customDesc: "Customize the tone, style, and vocabulary level of the AI teacher. These custom parameters will override prompt templates when explaining new textbook materials to your child.",
      activePrompt: "Active System Prompts (Parent Control override):",
      livePrompt: "Live Prompt Context Builder:",
      promptMetaphor: "You are an expert Class 10 Science teacher. When explaining the lesson text, abide by the parent request: ",
      translatePref: " Translating response where appropriate into student preference.",
      save: "Save Parameters",
      recentActivity: "Recent Activity Log",
      completedQuiz: "completed Photosynthesis quiz",
      unlockedUnit: "Unlocked Unit 3: Light Reactions",
      customUpdated: "Custom tutor prompt updated",
      failedQuiz: "Failed quiz: Chloroplast Structure",
      today: "Today",
      yesterday: "Yesterday",
      attendance: "Attendance Record",
      hwCompl: "Homework Completion",
      weakTopics: "Weak Topics",
      upcomingExams: "Upcoming Exams Schedule",
      aiRecommend: "AI Recommended Focus Areas",
      reportDown: "Daily/Weekly/Monthly Reports",
      presentDays: "96.4% Attendance (Active)",
      completedHw: "8 of 9 Tasks completed",
      recommendList: [
        "Strengthen photolysis definitions in Biology by practicing class 10 PYQs.",
        "Attempt extra short-answer chemistry equation balances."
      ]
    },
    hi: {
      portal: "अभिभावक पोर्टल",
      welcome: "आपका स्वागत है, अभिभावक",
      reviewing: "छात्र के आंकड़े:",
      sibling1: studentName ? `छात्र: ${studentName} (${gradeClass || "कक्षा"})` : "सक्रिय छात्र",
      sibling2: "द्वितीय संतान",
      studyTime: "पढ़ाई का समय (इस सप्ताह)",
      currAlign: "पाठ्यक्रम प्रगति संरेखण",
      avgScore: "औसत क्विज़ स्कोर",
      lessonsCleared: "पूरे किए गए पाठ",
      customInstructions: "कस्टम एआई शिक्षक निर्देश",
      customDesc: "एआई शिक्षक के समझाने के तरीके और कठिन शब्दों के स्तर को अपने अनुसार बदलें। यह निर्देश बच्चे को समझाते समय सबसे पहले ध्यान में रखा जाएगा।",
      activePrompt: "सक्रिय सिस्टम निर्देश (अभिभावक नियंत्रण):",
      livePrompt: "लाइव निर्देश बिल्डर:",
      promptMetaphor: "आप एक अनुभवी विज्ञान शिक्षक हैं। पाठ समझाते समय, अभिभावक के इस निर्देश का पालन करें: ",
      translatePref: " बच्चे की सुविधा के अनुसार सरल भाषा में समझाएं।",
      save: "सुरक्षित करें",
      recentActivity: "हाल की गतिविधियां",
      completedQuiz: "ने प्रकाश संश्लेषण क्विज़ पूरा किया",
      unlockedUnit: "इकाई ३ अनलॉक की गई: प्रकाश अभिक्रियाएं",
      customUpdated: "कस्टम एआई निर्देश अपडेट किए गए",
      failedQuiz: "क्विज़ में असफल: क्लोरोप्लास्ट की संरचना",
      today: "आज",
      yesterday: "कल",
      attendance: "उपस्थिति रिकॉर्ड",
      hwCompl: "गृहकार्य पूर्णता",
      weakTopics: "कमजोर विषय",
      upcomingExams: "आगामी परीक्षा कार्यक्रम",
      aiRecommend: "एआई अनुशंसित ध्यान क्षेत्र",
      reportDown: "दैनिक/साप्ताहिक/मासिक रिपोर्ट",
      presentDays: "९६.४% उपस्थिति (सक्रिय)",
      completedHw: "९ में से ८ कार्य पूरे",
      recommendList: [
        "कक्षा १० के बोर्ड प्रश्नों का अभ्यास करके जीव विज्ञान में मजबूत करें।",
        "अतिरिक्त लघु उत्तरीय रसायन विज्ञान समीकरणों का अभ्यास करें।"
      ]
    }
  }[parentLang];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-card-border/80">
        <div>
          <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">{t.portal}</span>
          <h1 className="text-2xl font-black text-foreground">{t.welcome}</h1>
          <p className="text-xs text-muted-foreground mt-1">{t.reviewing} <strong className="text-foreground">{studentName} ({gradeClass})</strong></p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-muted p-1 rounded-xl border border-card-border">
            <button 
              onClick={() => setParentLang("en")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg ${parentLang === "en" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              English
            </button>
            <button 
              onClick={() => setParentLang("hi")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg ${parentLang === "hi" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              हिंदी
            </button>
          </div>

          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-xl border border-card-border bg-card text-xs font-semibold hover:bg-muted">
              {t.sibling1}
            </button>
            <button className="px-3 py-1.5 rounded-xl border border-card-border bg-card text-xs font-medium text-muted-foreground hover:bg-muted">
              {t.sibling2}
            </button>
          </div>
        </div>
      </div>

      {/* Stripe-style stats grids */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-card border border-card-border rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-muted-foreground">{t.studyTime}</span>
            <Clock className="w-4 h-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold">{parentLang === "hi" ? "४.८ घंटे" : "4.8 hours"}</span>
            <span className="text-xs text-emerald-500 font-bold">+12%</span>
          </div>
        </div>

        <div className="p-6 bg-card border border-card-border rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-muted-foreground">{t.currAlign}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold">{parentLang === "hi" ? "९२% पूर्ण" : "92% Done"}</span>
            <span className="text-xs text-muted-foreground">CBSE Board</span>
          </div>
        </div>

        <div className="p-6 bg-card border border-card-border rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-muted-foreground">{t.avgScore}</span>
            <TrendingUp className="w-4 h-4 text-secondary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold">{Math.round(averageScore)}%</span>
            <span className="text-xs text-secondary font-bold">Top 15%</span>
          </div>
        </div>

        <div className="p-6 bg-card border border-card-border rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-muted-foreground">{t.lessonsCleared}</span>
            <BookOpen className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold">{completedCount} / {lessons.length}</span>
            <span className="text-xs text-muted-foreground">Biology</span>
          </div>
        </div>
      </div>

      {/* Expanded Sections: Attendance, homework lists, telemetry details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: AI Prompt overrides & Attendance list */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Custom system prompts controller */}
          <div className="bg-card border-2 border-secondary/40 rounded-3xl p-6 shadow-md relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-secondary" />
              <h3 className="font-extrabold text-base">{t.customInstructions}</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-6">{t.customDesc}</p>
            <div className="space-y-4">
              <textarea
                value={parentInstructions}
                onChange={(e) => setParentInstructions(e.target.value)}
                className="w-full h-24 p-4 bg-muted border border-card-border rounded-xl text-xs leading-relaxed focus:outline-none focus:border-secondary"
              />
              <button 
                onClick={() => alert("Saved!")}
                className="px-4 py-2 bg-secondary text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
              >
                {t.save}
              </button>
            </div>
          </div>

          {/* Attendance & Homework grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Attendance */}
            <div className="bg-card border border-card-border p-6 rounded-2xl shadow-sm space-y-3">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">{t.attendance}</span>
              <p className="text-base font-extrabold text-foreground">{t.presentDays}</p>
              <div className="flex gap-1.5">
                {[1,2,3,4,5,6,7].map((day) => (
                  <span key={day} className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 text-[10px] font-extrabold flex items-center justify-center">P</span>
                ))}
              </div>
            </div>

            {/* Homework Checklist */}
            <div className="bg-card border border-card-border p-6 rounded-2xl shadow-sm space-y-3">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">{t.hwCompl}</span>
              <p className="text-base font-extrabold text-foreground">{t.completedHw}</p>
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[88%]"></div>
              </div>
            </div>

          </div>

          {/* AI recommendations */}
          <div className="bg-card border border-card-border p-6 rounded-3xl shadow-sm space-y-4">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-primary" /> {t.aiRecommend}
            </span>
            <ul className="space-y-3 text-xs leading-relaxed">
              {t.recommendList.map((rec, i) => (
                <li key={i} className="flex gap-2.5 items-start p-3 bg-muted rounded-xl border border-card-border/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Reports & Upcoming Exams */}
        <div className="space-y-6">
          {/* Daily/Weekly/Monthly reports download */}
          <div className="bg-card border border-card-border p-6 rounded-3xl shadow-sm space-y-4">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">{t.reportDown}</span>
            <p className="text-xs text-muted-foreground leading-relaxed">Download summaries containing average homework timelines, active learning charts, and boards sync.</p>
            <div className="space-y-2 text-xs">
              <button onClick={() => alert("Downloading Weekly Report PDF...")} className="w-full p-2.5 rounded-xl border border-card-border bg-muted hover:bg-card-border flex items-center justify-between font-bold">
                <span>Download Weekly Report</span>
                <Download className="w-4 h-4 text-muted-foreground" />
              </button>
              <button onClick={() => alert("Downloading Monthly Report PDF...")} className="w-full p-2.5 rounded-xl border border-card-border bg-muted hover:bg-card-border flex items-center justify-between font-bold">
                <span>Download Monthly Report</span>
                <Download className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Upcoming exams */}
          <div className="bg-card border border-card-border p-6 rounded-3xl shadow-sm space-y-4">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">{t.upcomingExams}</span>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-muted rounded-xl border border-card-border flex justify-between items-center font-bold">
                <span>Science Mid-Term</span>
                <span className="text-[10px] bg-indigo-500/10 text-indigo-500 px-2.5 py-0.5 rounded-full">Oct 12</span>
              </div>
              <div className="p-3 bg-muted rounded-xl border border-card-border flex justify-between items-center font-bold">
                <span>Mathematics Test</span>
                <span className="text-[10px] bg-indigo-500/10 text-indigo-500 px-2.5 py-0.5 rounded-full">Nov 18</span>
              </div>
            </div>
          </div>

          {/* Weak Topics */}
          <div className="bg-card border border-card-border p-6 rounded-3xl shadow-sm space-y-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">{t.weakTopics}</span>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-500 border border-rose-500/20">Chloroplast Photolysis</span>
              <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-500 border border-rose-500/20">Quadratic Roots</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
