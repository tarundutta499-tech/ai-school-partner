"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  GraduationCap, 
  Users, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Zap, 
  Play,
  Pause,
  HelpCircle,
  Mail,
  School,
  FileCheck,
  ShieldCheck,
  Calendar,
  Layers,
  MessageCircle
} from "lucide-react";

export default function LandingPage() {
  const { setRole } = useApp();
  const router = useRouter();

  // Test AI demo states
  const [isPlayingDemoAudio, setIsPlayingDemoAudio] = useState(false);
  const [demoText, setDemoText] = useState("Let's break down photosynthesis. Think of a green leaf as a tiny solar-powered chocolate bakery!");
  const [demoLanguage, setDemoLanguage] = useState("English");
  
  // FAQ accordion state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const translateDemo = (lang: string) => {
    setDemoLanguage(lang);
    if (lang === "Hindi") {
      setDemoText("आइए प्रकाश संश्लेषण को समझते हैं। सोचिए कि हरी पत्ती एक छोटी सौर ऊर्जा से चलने वाली चॉकलेट बेकरी है!");
    } else if (lang === "Spanish") {
      setDemoText("Expliquemos la fotosíntesis. ¡Imagina una hoja verde como una pequeña panadería de chocolate que funciona con energía solar!");
    } else if (lang === "Tamil") {
      setDemoText("ஒளிச்சேர்க்கையை எளிய முறையில் விளக்குவோம். ஒரு பச்சை இலையை சூரிய சக்தியில் இயங்கும் சாக்லேட் பேக்கரியாக கற்பனை செய்து பாருங்கள்!");
    } else {
      setDemoText("Let's break down photosynthesis. Think of a green leaf as a tiny solar-powered chocolate bakery!");
    }
  };

  const handleStart = (targetRole: "student" | "parent" | "teacher" | "sandbox") => {
    setRole(targetRole);
    if (targetRole === "student") router.push("/auth");
    else if (targetRole === "parent") router.push("/dashboard/parent");
    else if (targetRole === "teacher") router.push("/dashboard/teacher");
    else router.push("/sandbox");
  };

  const faqs = [
    { q: "How does the AI align with our specific school textbook curriculum?", a: "When your school joins, teachers upload the board syllabus and textbooks. Our pgvector system embeds these documents, meaning the AI tutor references your exact chapters, vocabulary rules, and teaching sequences." },
    { q: "Can parents monitor what the AI is teaching?", a: "Yes, the Parent dashboard gives complete insight. Parents see completed modules, quiz percentages, and can even edit the system prompts to customize the AI's explanation tone (e.g. adjust language difficulty)." },
    { q: "Which regional languages are supported?", a: "The AI translates lesson texts and practice papers instantly into Hindi, Spanish, Tamil, French, Telugu, German, and many more, helping children clarify complex ideas in their native languages." },
    { q: "Is this suitable for schools without 1-to-1 device programs?", a: "Absolutely. Teachers can generate practice question sheets, structured revision guides, and exam reviews, printing them directly as PDFs for standard classrooms." }
  ];

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Background glow elements */}
      <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[40%] rounded-full bg-primary/10 blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[55%] h-[45%] rounded-full bg-secondary/10 blur-[150px] pointer-events-none"></div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-6 animate-pulse-slow">
          <Sparkles className="w-3.5 h-3.5" />
          The Future of Personalized Curriculum Learning
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6">
          The AI Teacher That{" "}
          <span className="bg-gradient-to-r from-primary via-indigo-500 to-secondary bg-clip-text text-transparent">
            Learns With Your School
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
          A personal AI teacher that follows your school&apos;s specific curriculum, explains lesson materials in simple language, generates custom revisions, and communicates in the student&apos;s preferred language.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button
            onClick={() => handleStart("student")}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-110 active:scale-98 transition-all shadow-lg flex items-center justify-center gap-2 duo-button cursor-pointer"
          >
            Get Started (Free)
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => {
              setRole("teacher");
              router.push("/onboard/school");
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold border border-card-border hover:bg-muted text-foreground transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Book School Demo
          </button>
        </div>
      </section>

      {/* Features Matrix Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-card-border/60">
        <h2 className="text-3xl font-extrabold text-center mb-12">Core Platform Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-card border border-card-border rounded-2xl">
            <School className="w-8 h-8 text-primary mb-4" />
            <h4 className="font-bold text-lg mb-2">School Board Alignment</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Syncs with CBSE, ICSE, and local State syllabus boards. We index textbook PDFs, matching lessons with exact curriculum sequences.
            </p>
          </div>
          <div className="p-6 bg-card border border-card-border rounded-2xl">
            <Globe className="w-8 h-8 text-secondary mb-4" />
            <h4 className="font-bold text-lg mb-2">Regional Language Support</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Students choose their comfortable tongue (Hindi, Tamil, Spanish, French) to unlock difficult science, history, and literature terms.
            </p>
          </div>
          <div className="p-6 bg-card border border-card-border rounded-2xl">
            <Zap className="w-8 h-8 text-indigo-500 mb-4" />
            <h4 className="font-bold text-lg mb-2">Gamified Practice Labs</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Generates customized revision summaries, flip flashcards, and instant multi-choice quiz sets with comprehensive visual explanations.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/40 py-20 border-t border-b border-card-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-16">How Pathshala AI Integrates With Your School</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="text-center relative">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mx-auto mb-4 shadow-md">
                1
              </div>
              <h4 className="font-bold mb-2 text-sm">School Onboarding</h4>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                Admin signs up the school and uploads textbook files, exam calendars, and syllabi materials.
              </p>
            </div>

            <div className="text-center relative">
              <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-lg mx-auto mb-4 shadow-md">
                2
              </div>
              <h4 className="font-bold mb-2 text-sm">AI Vector Mapping</h4>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                Our pgvector thylakoid indexes documents, generating lesson nodes and quiz cards automatically.
              </p>
            </div>

            <div className="text-center relative">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-4 shadow-md">
                3
              </div>
              <h4 className="font-bold mb-2 text-sm">Interactive Studying</h4>
              <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                Students open dashboards, launch custom AI lessons, adjust explanation depth, and study in their preferred languages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive AI Teacher Demo */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-card border-2 border-primary/30 rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-black text-xl">Interactive AI Teacher Preview</h3>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => translateDemo("English")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${demoLanguage === "English" ? "bg-primary text-white" : "bg-muted border border-card-border"}`}
              >
                English
              </button>
              <button 
                onClick={() => translateDemo("Hindi")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${demoLanguage === "Hindi" ? "bg-primary text-white" : "bg-muted border border-card-border"}`}
              >
                Hindi (हिंदी)
              </button>
              <button 
                onClick={() => translateDemo("Spanish")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${demoLanguage === "Spanish" ? "bg-primary text-white" : "bg-muted border border-card-border"}`}
              >
                Spanish (Español)
              </button>
              <button 
                onClick={() => translateDemo("Tamil")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${demoLanguage === "Tamil" ? "bg-primary text-white" : "bg-muted border border-card-border"}`}
              >
                Tamil (தமிழ்)
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-muted border border-card-border text-sm leading-relaxed italic text-foreground min-h-[100px]">
              &ldquo;{demoText}&rdquo;
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsPlayingDemoAudio(!isPlayingDemoAudio)}
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all shadow-md"
              >
                {isPlayingDemoAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isPlayingDemoAudio ? "Stop Synthesizer" : "🔊 Listen (ElevenLabs TTS)"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Parent & Teacher Benefits Columns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-card-border/60">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Parent Benefits */}
          <div className="p-8 bg-card border border-card-border rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Users className="w-36 h-36 text-secondary" />
            </div>
            <span className="text-[10px] font-bold text-secondary uppercase tracking-widest block mb-2">For Families</span>
            <h3 className="text-xl font-bold mb-4">Complete Peace of Mind for Parents</h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Watch learning progress graphs in real-time.</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Edit system rules to configure visual or text explanation modes.</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Review syllabus checklists mapped with the school curriculum.</li>
            </ul>
          </div>

          {/* Teacher Benefits */}
          <div className="p-8 bg-card border border-card-border rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <BookOpen className="w-36 h-36 text-indigo-500" />
            </div>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-2">For Educators</span>
            <h3 className="text-xl font-bold mb-4">Automate Lesson Planning & Homework</h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Generate custom exams and board matching quizzes in seconds.</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Identify weak student topics and individual focus areas.</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Print PDF revision cards and sheets for class practice.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* School Dashboard Preview Block */}
      <section className="bg-muted/40 py-20 border-t border-card-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Centralized School Administration</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-12">
            Monitor curriculum alignment dashboards, teacher configurations, user invites, and student onboarding processes across the entire school.
          </p>

          <div className="max-w-4xl mx-auto bg-card border border-card-border rounded-2xl p-6 shadow-lg text-left">
            <div className="flex items-center justify-between pb-4 border-b border-card-border mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="font-bold text-xs">School Dashboard Panel (Global view)</span>
              </div>
              <span className="text-[10px] text-muted-foreground">Admin: Saint Jude School</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-xl border border-card-border">
                <span className="text-[10px] text-muted-foreground uppercase font-bold block mb-1">Total Classrooms</span>
                <span className="text-xl font-extrabold">24 Classrooms</span>
              </div>
              <div className="p-4 bg-muted rounded-xl border border-card-border">
                <span className="text-[10px] text-muted-foreground uppercase font-bold block mb-1">Active Teachers</span>
                <span className="text-xl font-extrabold">48 Onboarded</span>
              </div>
              <div className="p-4 bg-muted rounded-xl border border-card-border">
                <span className="text-[10px] text-muted-foreground uppercase font-bold block mb-1">Curriculum Status</span>
                <span className="text-xl font-extrabold text-emerald-500">100% Synced</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-extrabold text-center mb-16">What Parents & Teachers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-card border border-card-border rounded-2xl relative">
            <MessageCircle className="w-8 h-8 text-primary/10 absolute top-4 right-4" />
            <p className="text-xs text-muted-foreground italic mb-4 leading-relaxed">
              &quot;Pathshala AI has changed our study hours at home. Ethan used to struggle with class 10 chemistry terms, but now he translates them to Hindi, gets a simple explanation, and passes his school quizzes easily.&quot;
            </p>
            <span className="text-xs font-bold">— Sarah S., Parent</span>
          </div>

          <div className="p-6 bg-card border border-card-border rounded-2xl relative">
            <MessageCircle className="w-8 h-8 text-primary/10 absolute top-4 right-4" />
            <p className="text-xs text-muted-foreground italic mb-4 leading-relaxed">
              &quot;Pumping our lesson plans, books lists, and calendar calendars into the Onboarding portal gives us immediate study roadmaps for all classes. It saves my department hours of coordination.&quot;
            </p>
            <span className="text-xs font-bold">— Mr. James P., Biology Lead Teacher</span>
          </div>
        </div>
      </section>

      {/* Pricing matrix (already built, kept clean) */}

      {/* FAQ Section */}
      <section className="bg-muted/40 py-20 border-t border-card-border/60">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-card border border-card-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs flex justify-between items-center hover:bg-muted"
                >
                  <span>{faq.q}</span>
                  <span>{activeFaq === idx ? "−" : "+"}</span>
                </button>
                {activeFaq === idx && (
                  <div className="p-4 border-t border-card-border/60 text-xs text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-md mx-auto px-4 py-20">
        <div className="bg-card border border-card-border rounded-3xl p-8 shadow-sm">
          <h3 className="font-extrabold text-base mb-2 text-center">Contact School Partnerships</h3>
          <p className="text-xs text-muted-foreground text-center mb-6">Want to schedule an invite-code batch for your classroom?</p>
          
          <form onSubmit={(e) => { e.preventDefault(); alert("Thanks! We will contact you soon."); }} className="space-y-4">
            <input
              type="text"
              required
              placeholder="Your Name"
              className="w-full px-3 py-2 bg-muted border border-card-border rounded-xl text-xs focus:outline-none focus:border-primary"
            />
            <input
              type="email"
              required
              placeholder="School Email"
              className="w-full px-3 py-2 bg-muted border border-card-border rounded-xl text-xs focus:outline-none focus:border-primary"
            />
            <textarea
              required
              placeholder="How can we support your school?"
              className="w-full h-24 p-3 bg-muted border border-card-border rounded-xl text-xs focus:outline-none focus:border-primary"
            />
            <button className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow-md duo-button cursor-pointer">
              Send Query
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-card-border/60 py-8 text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Pathshala AI Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
