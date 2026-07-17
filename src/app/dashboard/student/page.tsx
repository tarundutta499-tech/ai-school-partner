"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Sparkles, 
  BookOpen, 
  Check, 
  Play, 
  Pause, 
  RotateCcw,
  Award,
  BookMarked,
  Calendar,
  Flame,
  Clock,
  ClipboardList,
  AlertCircle,
  TrendingUp,
  BrainCircuit,
  Lightbulb,
  Image as ImageIcon,
  Compass,
  FileSpreadsheet,
  Trophy,
  History,
  FileText,
  Bookmark,
  Coins,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  Bell
} from "lucide-react";

interface LessonData {
  id: string;
  title: string;
  subject: string;
  grade: string;
  board: string;
  difficulty: string;
  explanations: Record<string, string>;
  translations: Record<string, Record<string, string>>;
  importantPoints: string[];
  formulaSheet: { term: string; desc: string }[];
  mindMapNodes: { label: string; details: string }[];
  flashcards: { q: string; a: string }[];
  revisionNotes: string;
  summary: string;
  previousYearQuestions: { year: string; question: string; answer: string }[];
  mcqs: { question: string; options: string[]; answer: number; explanation: string }[];
  trueFalse: { statement: string; answer: boolean; explanation: string }[];
  fillInBlanks: { sentence: string; missingWord: string; explanation: string }[];
  practiceQuestions: string[];
  homeworkAssigned: string;
  conceptMastery: {
    state: "Not Started" | "Learning" | "Practicing" | "Mastered";
    confidence: number;
    revisionNeeded: boolean;
    recommendation: string;
  };
}

const EXTENDED_LESSON: LessonData = {
  id: "1",
  title: "Photosynthesis: Light Reactions & Energy conversion",
  subject: "Science / Biology",
  grade: "Class 10",
  board: "CBSE",
  difficulty: "Medium",
  explanations: {
    standard: "Photosynthesis is the process by which green plants manufacture carbohydrates from carbon dioxide and water in the presence of chlorophyll and sunlight, producing oxygen as a byproduct.",
    detailed: "In the light-dependent reactions of photosynthesis, photons of light excite electrons in the chlorophyll pigments located within the thylakoid membranes of chloroplasts. This triggers electron transport chains, leading to the photolysis of water molecules (releasing oxygen), and the synthesis of ATP and NADPH to power the dark reactions.",
    story: "Deep inside the Green Wood Forest, a little leaf named Leafy decided to build a solar power station. Leafy hired sunlight beams as operators, used water pipes from the deep ground, and carbon dioxide from the air. In the leaf kitchen, they baked delicious glucose cakes and let out cool fresh oxygen bubbles as celebration!",
    eli10: "Think of a leaf like a solar-powered bakery! Sunlight is the power source, water and carbon dioxide are the raw ingredients, and sweet sugar (glucose) is the fresh bread. As a happy bonus, the bakery releases fresh oxygen into the air for us to breathe!",
    cartoon: "BOOM! ZAP! Little Sunlight particles (Photon Rangers) crash onto the green shield of Chloroplast Castle. They break down Water (H2O) into Hydrogen ions and Oxygen gas, creating energy energy cells (ATP) to bake sugar blocks!",
    cricket: "Photosynthesis is like a cricket team chase! Sunlight is the pitch condition that sets the game's pace. Carbon dioxide and Water are the opening batsmen partnerships. They hit boundaries of ATP and score runs of glucose, while the crowd cheers as fresh Oxygen bubbles are released into the air!",
    realLife: "Just like placing a solar panel on your roof to charge your laptop batteries, green leaves contain micro-chloroplast 'solar panels' that charge plant cells, converting gas and water into organic food storage."
  },
  translations: {
    English: {
      standard: "Photosynthesis is the process by which green plants manufacture carbohydrates from carbon dioxide and water in the presence of chlorophyll and sunlight.",
      detailed: "In the light-dependent reactions of photosynthesis, photons of light excite electrons in chlorophyll, causing photolysis of water molecules and synthesizing ATP and NADPH.",
      story: "Leafy the Leaf baked delicious glucose cakes using sunlight Operators, water from pipes, and carbon dioxide from the wind.",
      eli10: "Think of a leaf like a solar-powered bakery! Ingredients are water and air, and glucose is the baked cookie.",
      cartoon: "Sunlight Photon Rangers crash onto Chloroplast Castle to release energy cells!",
      cricket: "Sunlight is the pitch, carbon dioxide and water are the opening batsmen scoring glucose runs.",
      realLife: "Just like placing a solar panel on your roof, plants have micro-chloroplasts to charge cell batteries."
    },
    Hindi: {
      standard: "प्रकाश संश्लेषण वह प्रक्रिया है जिसके द्वारा हरे पौधे क्लोरोफिल और सूर्य के प्रकाश की उपस्थिति में कार्बन डाइऑक्साइड और पानी से कार्बोहाइड्रेट का निर्माण करते हैं।",
      detailed: "प्रकाश संश्लेषण की प्रकाश-निर्भर अभिक्रियाओं में, प्रकाश के फोटॉन थाइलाकोइड झिल्ली में क्लोरोफिल इलेक्ट्रॉनों को उत्तेजित करते हैं, जिससे जल के अणुओं का प्रकाश अपघटन (फोटोलिसिस) होता है और एटीपी (ATP) का संश्लेषण होता है।",
      story: "एक छोटे से पत्ते 'हरी' ने एक सौर ऊर्जा बेकरी शुरू की। सूरज की किरणों ने काम संभाला, जड़ों से पानी आया, और उन्होंने मिलकर मीठा ग्लूकोज बनाया और ताज़ा ऑक्सीजन हवा में छोड़ा!",
      eli10: "पत्ती को एक छोटा सौर बेकरी समझें! पानी और हवा इसकी सामग्री हैं, और मीठी ग्लूकोज शक्कर बेक की गई रोटी है।",
      cartoon: "धूम! धड़ाका! सूर्य की किरणें 'पत्ती महल' पर हमला करती हैं और पानी को तोड़कर ऊर्जा के सेल बनाती हैं!",
      cricket: "प्रकाश संश्लेषण एक क्रिकेट मैच की तरह है! सूरज की रोशनी पिच है, पानी और हवा सलामी बल्लेबाज हैं जो ग्लूकोज के रन बनाते हैं और ऑक्सीजन का जश्न मनाते हैं!",
      realLife: "जैसे छत पर सोलर पैनल लगाकर बिजली बनाई जाती है, वैसे ही पत्तियां धूप से पौधे के लिए भोजन बनाती हैं।"
    },
    Spanish: {
      standard: "La fotosíntesis es el proceso mediante el cual las plantas verdes fabrican carbohidratos a partir de dióxido de carbono y agua.",
      detailed: "En las reacciones dependientes de la luz, los fotones excitan los electrones en la clorofila, provocando la fotólisis del agua y sintetizando ATP.",
      story: "La hoja Leafy horneó deliciosos pasteles de glucosa usando operadores de luz solar y dióxido de carbono.",
      eli10: "¡Imagina que la hoja es una panadería solar! Los ingredientes son agua y aire, y la glucosa es la galleta.",
      cartoon: "¡ZAP! Las partículas de luz solar chocan contra el castillo de cloroplastos para liberar células de energía.",
      cricket: "La luz solar es el campo de cricket, y el agua y el aire batean para anotar carreras de glucosa.",
      realLife: "Al igual que instalar paneles solares en tu techo, las plantas usan cloroplastos para cargar sus baterías."
    },
    Tamil: {
      standard: "ஒளிச்சேர்க்கை என்பது பசுமையான தாவரங்கள் சூரிய ஒளி மற்றும் பச்சையத்தின் முன்னிலையில் கார்பன் டை ஆக்சைடு மற்றும் நீரிலிருந்து மாவுச்சத்தை தயாரிக்கும் செயல்முறையாகும்.",
      detailed: "ஒளிச்சேர்க்கையின் ஒளி சார்ந்த வினைகளில், ஒளி துகள்கள் பச்சையத்தில் உள்ள எலக்ட்ரான்களை தூண்டி, நீரை உடைத்து ஏடிபி ஆற்றலை உருவாக்குகின்றன.",
      story: "இலை என்ற குட்டி சமையல்காரர் சூரிய ஒளியை பயன்படுத்தி குளுக்கோஸ் கேக் தயாரித்தார்.",
      eli10: "இலை என்பது ஒரு சூரியசக்தி பேக்கரி! நீர் மற்றும் காற்று மூலப்பொருட்கள், குளுக்கோஸ் ரொட்டி.",
      cartoon: "சூரிய ஒளி வீரர்கள் இலை கோட்டையை தாக்கி புதிய ஆற்றல் செல்களை உருவாக்குகிறார்கள்!",
      cricket: "சூரிய ஒளி என்பது கிரிக்கெட் பிட்ச், கார்பன் டை ஆக்சைடு மற்றும் நீர் தொடக்க ஆட்டக்காரர்கள் குளுக்கோஸ் ரன்கள் அடிக்கிறார்கள்.",
      realLife: "வீட்டு கூரையில் சோலார் பேனல் அமைப்பது போல, தாவரங்கள் குளோரோபிளாஸ்ட்களை பயன்படுத்தி ஆற்றலை சேமிக்கின்றன."
    }
  },
  importantPoints: [
    "Photosynthesis converts solar light energy into stable chemical energy (glucose).",
    "Photolysis of water occurs inside the thylakoid membranes, releasing Oxygen (O2).",
    "Chlorophyll pigments selectively absorb red and blue wavelengths of light."
  ],
  formulaSheet: [
    { term: "6CO2 + 6H2O + Sunlight", desc: "Chemical Reactants needed" },
    { term: "C6H12O6 + 6O2", desc: "Chemical Products created (Glucose + Oxygen)" },
    { term: "ATP & NADPH", desc: "Energy carrier molecules synthesised in light reactions" }
  ],
  mindMapNodes: [
    { label: "Light Reaction", details: "Thylakoids, splits water, produces ATP & Oxygen" },
    { label: "Dark Reaction / Calvin Cycle", details: "Stroma, fixes carbon dioxide into sugar" },
    { label: "External Factors", details: "Temperature, CO2 concentration, light intensity" }
  ],
  flashcards: [
    { q: "What triggers the light-dependent reaction?", a: "Photons of light hitting the photosystem II complex." },
    { q: "Where does photolysis take place?", a: "Inner thylakoid space." },
    { q: "What is the role of NADPH?", a: "Acts as a reducing agent in the dark reactions to make sugars." }
  ],
  revisionNotes: "Photosynthesis is divided into light reactions and dark reactions. Light reactions happen in thylakoids, capturing photon energy to synthesize high-energy molecules. Dark reactions happen in stroma, using those molecules to fix CO2 into sugar blocks.",
  summary: "Leaves act as biological factories. Using chlorophyll, they harness sunlight to split water, release oxygen, and generate glucose, which sustains almost all organic life on Earth.",
  previousYearQuestions: [
    { year: "CBSE 2024", question: "Explain the role of water during the light reaction phase of photosynthesis.", answer: "Water splits during photolysis to provide protons and replacement electrons for Photosystem II, releasing Oxygen gas." },
    { year: "ICSE 2023", question: "Name the products of the light reactions used in the dark reactions.", answer: "ATP and NADPH." }
  ],
  mcqs: [
    {
      question: "Which of the following molecules undergoes photolysis?",
      options: ["Carbon dioxide", "Oxygen", "Water", "Glucose"],
      answer: 2,
      explanation: "Water is split by light energy to yield protons, electrons, and oxygen."
    }
  ],
  trueFalse: [
    { statement: "Light reactions occur inside the stroma of chloroplasts.", answer: false, explanation: "Light reactions occur in the thylakoid membranes, while dark reactions occur in the stroma." }
  ],
  fillInBlanks: [
    { sentence: "Chlorophyll pigments absorb _____ and red light wavelengths.", missingWord: "blue", explanation: "Chlorophyll absorbs blue and red wavelengths, while reflecting green." }
  ],
  practiceQuestions: [
    "Draw a labelled diagram of a chloroplast pointing out stroma and thylakoids.",
    "Contrast light-dependent reactions with light-independent Calvin cycle."
  ],
  homeworkAssigned: "Draw and label the chloroplast, then write a 200-word summary explaining photolysis of water in photosynthesis.",
  conceptMastery: {
    state: "Practicing",
    confidence: 85,
    revisionNeeded: true,
    recommendation: "Review the formula sheet to clarify reactants before locking final quiz nodes."
  }
};

export default function StudentDashboard() {
  const { 
    preferredLanguage, 
    setPreferredLanguage, 
    lessons, 
    completeLesson,
    studentName,
    schoolName,
    gradeClass,
    section,
    xpPoints,
    coinsCount,
    learningStreak,
    activeClassFocus,
    activeHomeworkPrompt
  } = useApp();
  
  // Dashboard states
  const [selectedLesson, setSelectedLesson] = useState<LessonData | null>(null);
  const [activeTab, setActiveTab] = useState<"teach" | "multimedia" | "important" | "notes" | "assessment" | "doubts" | "revision">("teach");
  
  // Explanation settings state
  const [explanationMode, setExplanationMode] = useState<"standard" | "detailed" | "story" | "eli10" | "cartoon" | "cricket" | "realLife">("standard");

  // Azure Speech TTS States
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  // Handwritten Notebook OCR Scanner states
  const [showOcrModal, setShowOcrModal] = useState(false);
  const [ocrScanning, setOcrScanning] = useState(false);
  const [ocrResult, setOcrResult] = useState<{
    transcription: string;
    errorsFound: { error: string; correction: string }[];
    correctedText: string;
  } | null>(null);

  // Board Exam Matcher states
  const [boardType, setBoardType] = useState<"CBSE" | "ICSE">("CBSE");
  const [showMockExamModal, setShowMockExamModal] = useState(false);
  const [mockScore, setMockScore] = useState<number | null>(null);

  // Flashcards state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Interactive Doubt Asking Chat states
  const [doubtInput, setDoubtInput] = useState("");
  const [chatLog, setChatLog] = useState<{ sender: "user" | "ai"; text: string }[]>([
    { sender: "ai", text: `Hi ${studentName || "there"}! I'm your AI Teacher. Ask me any question or doubt about Photosynthesis, and I'll explain it simply.` }
  ]);

  // Quiz Engine States
  const [quizDifficulty, setQuizDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [quizTypeTab, setQuizTypeTab] = useState<"mcq" | "written" | "match">("mcq");
  
  // MCQ state
  const [selectedMcqAnswer, setSelectedMcqAnswer] = useState<number | null>(null);
  const [isMcqSubmitted, setIsMcqSubmitted] = useState(false);
  
  // Written Answer state
  const [writtenAnswer, setWrittenAnswer] = useState("");
  const [writtenFeedback, setWrittenFeedback] = useState("");
  const [isGrading, setIsGrading] = useState(false);

  // Match state
  const [matches, setMatches] = useState<Record<string, string>>({
    "Sunlight": "",
    "Water": "",
    "Chlorophyll": ""
  });

  // Revision Mode States
  const [countdownDays, setCountdownDays] = useState<30 | 15 | 7 | 3 | 1>(7);

  const startVoiceReal = async (textToSpeak: string) => {
    if (isPlayingAudio) {
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
      setIsPlayingAudio(false);
      return;
    }

    try {
      setIsPlayingAudio(true);
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToSpeak, language: preferredLanguage }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Azure API call failed" }));
        alert(err.error || "Failed to generate speech narration.");
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
    } catch (error) {
      console.error(error);
      setIsPlayingAudio(false);
      alert("Error playing voice narration. Verify your Azure key is active.");
    }
  };

  const runOcrSimulation = () => {
    setOcrScanning(true);
    setOcrResult(null);
    setTimeout(() => {
      setOcrResult({
        transcription: "Photosynthesis is the process where plants take in carbon dioxide and water to produce food. Light energy is captured by green pigment called Chlorophyl. Water is split to release Oxygen.",
        errorsFound: [
          { error: "Spelling error: 'Chlorophyl'", correction: "Correct spelling is 'Chlorophyll' (ends with double 'l')." },
          { error: "Conceptual gap: Light Splitting of Water", correction: "Explain that the splitting of water molecule is called 'photolysis' and occurs inside thylakoids." }
        ],
        correctedText: "Photosynthesis is the process where plants take in carbon dioxide and water to produce glucose. Light energy is captured by the green pigment called chlorophyll. Water is split via photolysis in the thylakoids to release oxygen gas."
      });
      setOcrScanning(false);
    }, 1800);
  };

  const submitMockExam = () => {
    setMockScore(85);
  };

  const handleSelectLesson = (lessonId: string) => {
    setSelectedLesson(EXTENDED_LESSON);
    setActiveTab("teach");
    setExplanationMode("standard");
    setIsFlipped(false);
    setCurrentCardIndex(0);
    setChatLog([
      { sender: "ai", text: `Hi ${studentName || "there"}! I'm your AI Teacher. Ask me any question or doubt about Photosynthesis, and I'll explain it simply.` }
    ]);
    setSelectedMcqAnswer(null);
    setIsMcqSubmitted(false);
    setWrittenAnswer("");
    setWrittenFeedback("");
    setMatches({
      "Sunlight": "",
      "Water": "",
      "Chlorophyll": ""
    });
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
    setIsPlayingAudio(false);
  };

  const handleAskDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtInput.trim()) return;

    const userText = doubtInput;
    setChatLog(prev => [...prev, { sender: "user", text: userText }]);
    setDoubtInput("");

    setTimeout(() => {
      let reply = `That is an excellent doubt! Regarding "${userText}": Inside the thylakoid membranes, chlorophyll operates like small power chargers. They absorb sunlight photons to energize electrons, which split water molecules.`;
      setChatLog(prev => [...prev, { sender: "ai", text: reply }]);
    }, 800);
  };

  const simulateAIGrading = () => {
    if (!writtenAnswer.trim()) return;
    setIsGrading(true);
    setTimeout(() => {
      setWrittenFeedback("AI Evaluation: Grade: 8.5/10. Great mention of electron excitation! Suggestion: explicitly list photolysis of water as the chemical source of Oxygen to secure a perfect score.");
      setIsGrading(false);
      completeLesson("1", 85);
    }, 1200);
  };

  const handleMatchSelect = (item: string, match: string) => {
    setMatches(prev => ({ ...prev, [item]: match }));
  };

  const getExplanationText = () => {
    if (!selectedLesson) return "";
    if (preferredLanguage !== "English") {
      const langData = selectedLesson.translations[preferredLanguage];
      if (langData) {
        return langData[explanationMode] || langData.standard;
      }
    }
    return selectedLesson.explanations[explanationMode] || selectedLesson.explanations.standard;
  };

  // Get revision content based on countdown
  const getRevisionPlan = () => {
    const plans = {
      30: {
        title: "30-Day Steady Revision Schedule",
        plan: "Read 1 chapter block daily, complete 1 custom flashcard batch, and attempt board MCQs every weekend.",
        expectedQ: "Explain standard light reaction components and Calvin cycle stromal reactions."
      },
      15: {
        title: "15-Day Intermediate Review Plan",
        plan: "Review formula sheets daily. Complete 2 weak-topic flashcard sessions and check previous year question (PYQ) keys.",
        expectedQ: "Compare cyclic and non-cyclic photophosphorylation processes."
      },
      7: {
        title: "7-Day High-Impact Sprint",
        plan: "Focus strictly on mind maps and expected question booklets. Limit study to one-page notes and solve mock boards.",
        expectedQ: "Illustrate the chloroplast anatomy labelling thylakoid stacks, stroma, and double membrane boundaries."
      },
      3: {
        title: "3-Day Rapid Recovery Plan",
        plan: "Solve fill-in-the-blanks, true/false sets, and review formulas. Re-read parent custom instructions visual notes.",
        expectedQ: "Define photolysis of water and state the primary waste gas byproduct."
      },
      1: {
        title: "1-Day Ultra Review / Night Before",
        plan: "Skip detailed books. Re-run voice narration summaries at 1.5x speed. Read through one-page cheat sheets. Sleep well!",
        expectedQ: "What are the chemical reactants and final products of the photosynthesis formula?"
      }
    };
    return plans[countdownDays];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome banner & Streaks */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/60 p-6 rounded-3xl border border-card-border">
        <div>
          <h1 className="text-2xl font-black">Hi, {studentName || "Student"}!</h1>
          <p className="text-xs text-muted-foreground mt-1">
            {gradeClass ? `${gradeClass}-${section || "A"}` : "Not Configured"} • {schoolName || "Configure School Profile"}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-500 px-3.5 py-1.5 rounded-2xl">
            <Flame className="w-5 h-5 fill-rose-500 animate-pulse" />
            <div>
              <p className="text-xs font-black leading-none">{learningStreak} Days</p>
              <span className="text-[9px] text-muted-foreground">Active Streak</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-600 px-3.5 py-1.5 rounded-2xl">
            <Award className="w-5 h-5" />
            <div>
              <p className="text-xs font-black leading-none">Bronze Tier</p>
              <span className="text-[9px] text-muted-foreground">{xpPoints} XP Gained</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Today's Tasks & Gamification Challenges */}
        <div className="space-y-6">
          <div className="bg-card border border-card-border p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="font-extrabold text-xs flex items-center gap-1.5 text-muted-foreground uppercase tracking-wider">
              <Clock className="w-4 h-4 text-primary" /> Today&apos;s Class Focus
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-primary/5 rounded-xl border border-primary/20 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-primary">{activeClassFocus}</p>
                  <span className="text-[9px] text-muted-foreground">Classroom Focus pinned by Teacher</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-500 animate-pulse">Live</span>
              </div>
            </div>
            
            <div className="p-3 bg-muted rounded-xl border border-card-border text-[10px] space-y-1.5">
              <span className="font-bold text-foreground uppercase tracking-wider block">Today&apos;s Homework:</span>
              <p className="leading-relaxed text-muted-foreground">{activeHomeworkPrompt}</p>
              <button 
                onClick={() => alert(`AI Teacher Mode: Explaining "${activeHomeworkPrompt}" step-by-step...`)} 
                className="w-full mt-2 py-1.5 bg-primary text-white font-bold rounded-lg text-[9px] cursor-pointer"
              >
                Get AI Homework Help
              </button>
            </div>
          </div>

          {/* Gamified Rewards & Challenges Card */}
          <div className="bg-card border-2 border-primary/30 p-6 rounded-3xl shadow-md space-y-4">
            <h3 className="font-extrabold text-xs flex items-center gap-1.5 text-primary uppercase tracking-wider">
              <Coins className="w-4 h-4 text-secondary" /> Rewards & Challenges
            </h3>
            
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-muted rounded-xl border border-card-border">
                <span className="text-[9px] text-muted-foreground block">Gained Coins</span>
                <span className="text-sm font-black text-amber-500">★ {coinsCount} Coins</span>
              </div>
              <div className="p-3 bg-muted rounded-xl border border-card-border">
                <span className="text-[9px] text-muted-foreground block">Active Level</span>
                <span className="text-sm font-black text-primary">Lvl 12 (Scholar)</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2 bg-muted rounded-lg border border-card-border flex justify-between items-center text-[10px]">
                <span>Daily Challenge: Grade 1 lesson quiz</span>
                <span className="font-bold text-emerald-500">Completed</span>
              </div>
              <div className="p-2 bg-muted rounded-lg border border-card-border flex justify-between items-center text-[10px]">
                <span>Weekly Challenge: 5-day active streak</span>
                <span className="font-bold text-primary">4/5 Days</span>
              </div>
            </div>
          </div>

          {/* Gamified Classroom Leaderboard */}
          <div className="bg-card border border-card-border p-6 rounded-3xl shadow-sm">
            <h3 className="font-extrabold text-xs flex items-center gap-1.5 text-amber-600 mb-4 uppercase tracking-wider">
              <Trophy className="w-4 h-4 text-amber-500" /> Class Leaderboard
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs p-2 bg-amber-500/10 rounded-xl border border-amber-500/20 font-bold">
                <span className="flex items-center gap-2">
                  <span className="font-extrabold text-amber-600">1</span>
                  <span>{studentName || "Student"} (You)</span>
                </span>
                <span>{xpPoints} XP</span>
              </div>
            </div>
          </div>

          {/* Section 15: Future Modules Preview */}
          <div className="bg-card border border-card-border p-6 rounded-3xl shadow-sm space-y-3">
            <h3 className="font-extrabold text-xs text-muted-foreground uppercase tracking-wider block">Platform Beta (Upcoming)</h3>
            <div className="space-y-2 text-[10px] text-muted-foreground leading-normal">
              <p>🚀 <strong>AR Science Experiments:</strong> Interactive 3D chloroplast thylakoid models launching in August.</p>
              <p>🏆 <strong>Olympiad & JEE/NEET Prep:</strong> CBSE Board foundation reference papers.</p>
              <p>✍ <strong>AI Essay Evaluator:</strong> Draft grading metrics.</p>
            </div>
          </div>
        </div>

        {/* Center: Curriculum Path Map */}
        <div className="bg-card border border-card-border rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-card-border/80 mb-6">
              <div>
                <span className="text-[9px] font-bold text-primary uppercase">Active Chapter</span>
                <h3 className="font-extrabold text-sm">Photosynthesis: Lesson roadmap</h3>
              </div>
              <button 
                onClick={() => handleSelectLesson("1")}
                className="px-3 py-1.5 rounded-xl bg-primary text-white text-[10px] font-bold flex items-center gap-1 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <BrainCircuit className="w-3.5 h-3.5" /> Continue Learning
              </button>
            </div>

            {/* Curriculum Roadmap Journey nodes */}
            <div className="relative py-8 flex flex-col items-center">
              <div className="absolute top-0 bottom-0 w-1 timeline-line rounded-full z-0"></div>

              {lessons.map((lesson, idx) => {
                const isCompleted = lesson.completed;
                const isFirstUncompleted = !isCompleted && (idx === 0 || lessons[idx - 1].completed);
                const isLocked = !isCompleted && !isFirstUncompleted;

                const offsetClasses = [
                  "translate-x-0",
                  "translate-x-12",
                  "translate-x-0",
                  "-translate-x-12",
                  "translate-x-0"
                ];

                return (
                  <div 
                    key={lesson.id} 
                    className={`relative z-10 my-6 flex flex-col items-center ${offsetClasses[idx % 5]}`}
                  >
                    <button
                      disabled={isLocked}
                      onClick={() => handleSelectLesson(lesson.id)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-md transition-all active:scale-95 duration-100 duo-button border-4 ${
                        isCompleted 
                          ? "bg-emerald-500 text-white border-emerald-600 hover:bg-emerald-600"
                          : isFirstUncompleted
                            ? "bg-primary text-white border-primary-foreground/20 hover:scale-105"
                            : "bg-muted text-muted-foreground border-card-border/60 cursor-not-allowed"
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: AI Lesson Drawer Panel */}
        <div className="flex flex-col gap-6">
          {selectedLesson ? (
            <div className="bg-card border-2 border-primary/40 rounded-3xl p-6 shadow-xl flex flex-col flex-1 relative justify-between min-h-[580px]">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                    {selectedLesson.subject}
                  </span>
                  <button 
                    onClick={() => setSelectedLesson(null)}
                    className="text-muted-foreground hover:text-foreground text-xs font-bold"
                  >
                    Close ×
                  </button>
                </div>

                <h3 className="text-lg font-black mb-4">{selectedLesson.title}</h3>

                {/* Section 12: Concept Mastery state tracking */}
                <div className="p-3 bg-primary/5 border border-primary/10 rounded-2xl mb-4 text-[10px] space-y-2">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-primary flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Concept Mastery: {selectedLesson.conceptMastery.state}
                    </span>
                    <span className="text-secondary">Confidence: {selectedLesson.conceptMastery.confidence}%</span>
                  </div>
                  
                  <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-primary to-secondary h-full" style={{ width: `${selectedLesson.conceptMastery.confidence}%` }}></div>
                  </div>

                  {selectedLesson.conceptMastery.revisionNeeded && (
                    <div className="flex items-start gap-1.5 text-[9px] text-amber-600 leading-normal font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Revision Recommended: {selectedLesson.conceptMastery.recommendation}</span>
                    </div>
                  )}
                </div>

                {/* Subtabs representing the extensive per-chapter features */}
                <div className="grid grid-cols-3 gap-1 bg-muted p-1 rounded-xl border border-card-border mb-4">
                  <button onClick={() => setActiveTab("teach")} className={`py-1 text-[9px] font-bold rounded-lg transition-all ${activeTab === "teach" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>AI Explanations</button>
                  <button onClick={() => setActiveTab("multimedia")} className={`py-1 text-[9px] font-bold rounded-lg transition-all ${activeTab === "multimedia" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>Multimedia</button>
                  <button onClick={() => setActiveTab("important")} className={`py-1 text-[9px] font-bold rounded-lg transition-all ${activeTab === "important" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>Sheets & Map</button>
                  <button onClick={() => setActiveTab("notes")} className={`py-1 text-[9px] font-bold rounded-lg transition-all ${activeTab === "notes" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>Revision Notes</button>
                  <button onClick={() => setActiveTab("assessment")} className={`py-1 text-[9px] font-bold rounded-lg transition-all ${activeTab === "assessment" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>Assessments</button>
                  <button onClick={() => setActiveTab("revision")} className={`py-1 text-[9px] font-bold rounded-lg transition-all ${activeTab === "revision" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>Revision Mode</button>
                </div>

                {/* Tab content */}
                <div className="space-y-4">
                  
                  {/* TAB 1: AI EXPLANATIONS */}
                  {activeTab === "teach" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2 p-2 bg-muted rounded-xl border border-card-border">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Language Toggle:</span>
                        <select
                          value={preferredLanguage}
                          onChange={(e) => setPreferredLanguage(e.target.value)}
                          className="text-[10px] bg-card border border-card-border p-1 rounded-md font-bold"
                        >
                          <option value="English">English</option>
                          <option value="Hindi">Hindi (हिंदी)</option>
                          <option value="Spanish">Spanish (Español)</option>
                          <option value="Tamil">Tamil (தமிழ்)</option>
                        </select>
                      </div>

                      <div className="flex flex-wrap gap-1.5 p-2 bg-muted/40 rounded-xl border border-card-border/60">
                        <button onClick={() => setExplanationMode("standard")} className={`px-2 py-1 rounded-md text-[9px] font-bold ${explanationMode === "standard" ? "bg-primary text-white" : "bg-card border border-card-border"}`}>Explain Again</button>
                        <button onClick={() => setExplanationMode("eli10")} className={`px-2 py-1 rounded-md text-[9px] font-bold ${explanationMode === "eli10" ? "bg-primary text-white" : "bg-card border border-card-border"}`}>Explain Like I&apos;m 10</button>
                        <button onClick={() => setExplanationMode("story")} className={`px-2 py-1 rounded-md text-[9px] font-bold ${explanationMode === "story" ? "bg-primary text-white" : "bg-card border border-card-border"}`}>Explain Using Story</button>
                        <button onClick={() => setExplanationMode("cartoon")} className={`px-2 py-1 rounded-md text-[9px] font-bold ${explanationMode === "cartoon" ? "bg-primary text-white" : "bg-card border border-card-border"}`}>Explain Using Cartoon</button>
                        <button onClick={() => setExplanationMode("cricket")} className={`px-2 py-1 rounded-md text-[9px] font-bold ${explanationMode === "cricket" ? "bg-primary text-white" : "bg-card border border-card-border"}`}>Explain Using Cricket</button>
                        <button onClick={() => setExplanationMode("realLife")} className={`px-2 py-1 rounded-md text-[9px] font-bold ${explanationMode === "realLife" ? "bg-primary text-white" : "bg-card border border-card-border"}`}>Real-Life Examples</button>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-2 bg-primary/5 border border-primary/20 rounded-xl">
                        <span className="text-[10px] font-bold text-primary uppercase">AI Interactive Tools:</span>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => startVoiceReal(getExplanationText())}
                            className={`px-3 py-1 rounded-lg text-[9px] font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                              isPlayingAudio 
                                ? "bg-rose-500 text-white animate-pulse" 
                                : "bg-primary text-white hover:brightness-110"
                            }`}
                          >
                            🔊 {isPlayingAudio ? "Stop Audio" : "Read Aloud (Azure Speech)"}
                          </button>
                          
                          <button
                            onClick={() => {
                              setShowOcrModal(true);
                              setOcrResult(null);
                            }}
                            className="px-3 py-1 bg-secondary text-white hover:brightness-110 rounded-lg text-[9px] font-bold cursor-pointer transition-all flex items-center gap-1.5"
                          >
                            📷 Scan Notebook (AI OCR)
                          </button>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-muted/80 border border-card-border/80 text-xs leading-relaxed min-h-[160px]">
                        <p>{getExplanationText()}</p>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: MULTIMEDIA */}
                  {activeTab === "multimedia" && (
                    <div className="space-y-4">
                      <div className="p-4 bg-muted border border-card-border rounded-xl text-center">
                        <ImageIcon className="w-8 h-8 text-primary mx-auto mb-2" />
                        <p className="text-xs font-bold">Illustrative Graphic: Chloroplast Internal Anatomy</p>
                        <div className="w-full aspect-video bg-card border border-card-border/80 rounded-lg mt-2 flex items-center justify-center text-[10px] text-muted-foreground font-mono">
                          [SVG Illustration: Thylakoid Stacks & Photon absorption]
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: IMPORTANT POINTS */}
                  {activeTab === "important" && (
                    <div className="space-y-4">
                      <div className="p-3 bg-muted border border-card-border rounded-xl space-y-2">
                        <span className="text-[9px] font-bold text-primary uppercase block">Formula Sheet</span>
                        <div className="space-y-1 text-xs">
                          {selectedLesson.formulaSheet.map((f, i) => (
                            <div key={i} className="flex justify-between bg-card p-1.5 rounded border border-card-border/60">
                              <code className="font-bold text-primary">{f.term}</code>
                              <span className="text-muted-foreground">{f.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: REVISION NOTES */}
                  {activeTab === "notes" && (
                    <div className="space-y-4">
                      <div className="p-4 bg-muted border border-card-border rounded-xl text-xs space-y-2">
                        <span className="text-[9px] font-bold text-primary uppercase block">Revision Notes</span>
                        <p className="leading-relaxed text-muted-foreground">{selectedLesson.revisionNotes}</p>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: ASSESSMENTS */}
                  {activeTab === "assessment" && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-2.5 bg-muted rounded-xl border border-card-border text-[10px]">
                        <span className="font-bold text-muted-foreground uppercase">Adaptive Level:</span>
                        <div className="flex gap-1.5 font-bold">
                          <button onClick={() => setQuizDifficulty("easy")} className={`px-2 py-0.5 rounded ${quizDifficulty === "easy" ? "bg-primary text-white" : "bg-card border border-card-border"}`}>Easy</button>
                          <button onClick={() => setQuizDifficulty("medium")} className={`px-2 py-0.5 rounded ${quizDifficulty === "medium" ? "bg-primary text-white" : "bg-card border border-card-border"}`}>Medium</button>
                          <button onClick={() => setQuizDifficulty("hard")} className={`px-2 py-0.5 rounded ${quizDifficulty === "hard" ? "bg-primary text-white" : "bg-card border border-card-border"}`}>Hard</button>
                        </div>
                      </div>

                      <div className="flex bg-muted/60 p-1 rounded-lg border border-card-border text-[9px] font-bold">
                        <button onClick={() => setQuizTypeTab("mcq")} className={`flex-1 py-1 rounded ${quizTypeTab === "mcq" ? "bg-card text-foreground" : "text-muted-foreground"}`}>MCQs</button>
                        <button onClick={() => setQuizTypeTab("written")} className={`flex-1 py-1 rounded ${quizTypeTab === "written" ? "bg-card text-foreground" : "text-muted-foreground"}`}>AI Answers</button>
                      </div>

                      {quizTypeTab === "mcq" && (
                        <div className="p-3 bg-muted border border-card-border rounded-xl space-y-2">
                          <p className="text-xs font-bold">{selectedLesson.mcqs[0].question}</p>
                          <div className="grid grid-cols-2 gap-1.5 text-xs">
                            {selectedLesson.mcqs[0].options.map((opt, idx) => (
                              <button
                                key={idx}
                                disabled={isMcqSubmitted}
                                onClick={() => setSelectedMcqAnswer(idx)}
                                className={`p-2 border rounded-lg text-left text-[10px] ${selectedMcqAnswer === idx ? "bg-primary/10 border-primary font-bold" : "bg-card border-card-border"}`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 6: REVISION MODE */}
                  {activeTab === "revision" && (
                    <div className="space-y-4">
                      <div className="p-3 bg-muted border border-card-border rounded-2xl space-y-2">
                        <span className="text-[10px] font-bold text-primary uppercase block">Select Days Remaining for Exam:</span>
                        <div className="grid grid-cols-5 gap-1 text-xs text-center font-bold">
                          {[30, 15, 7, 3, 1].map((d) => (
                            <button
                              key={d}
                              onClick={() => setCountdownDays(d as any)}
                              className={`py-1.5 rounded-lg border ${countdownDays === d ? "bg-primary text-white border-primary shadow-sm" : "bg-card border-card-border"}`}
                            >
                              {d} Days
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-muted border border-card-border rounded-2xl space-y-3">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                          <History className="w-4 h-4 text-primary" />
                          {getRevisionPlan().title}
                        </div>
                        <p className="text-xs text-muted-foreground">{getRevisionPlan().plan}</p>
                      </div>

                      {/* Board Exam Matcher */}
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl space-y-3">
                        <span className="text-[10px] font-bold text-primary uppercase block">Board Exam Matcher & mock test</span>
                        <p className="text-[10px] text-muted-foreground">Practice solving CBSE/ICSE blueprint mock papers tailored to your countdown schedule.</p>
                        
                        <div className="flex gap-2 text-xs">
                          <select 
                            value={boardType} 
                            onChange={(e) => setBoardType(e.target.value as any)}
                            className="bg-card border border-card-border p-1.5 rounded-lg font-bold"
                          >
                            <option value="CBSE">CBSE Board Pattern</option>
                            <option value="ICSE">ICSE Board Pattern</option>
                          </select>
                          
                          <button
                            onClick={() => {
                              setShowMockExamModal(true);
                              setMockScore(null);
                            }}
                            className="flex-1 py-1.5 bg-primary text-white font-bold rounded-lg hover:brightness-110 cursor-pointer text-center"
                          >
                            Generate Mock Paper
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-card-border rounded-3xl p-6 shadow-sm text-center py-20">
              <BookMarked className="w-12 h-12 text-primary/40 mx-auto mb-4" />
              <h4 className="font-bold mb-2 text-sm">Awaiting Lesson Select</h4>
              <p className="text-xs text-muted-foreground px-6 leading-relaxed">
                Click "Continue Learning" or a numbered node in the map to activate your AI Teacher.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* AI OCR Notebook Scanner Modal */}
      {showOcrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-card border border-card-border p-6 rounded-3xl shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-card-border">
              <h3 className="font-extrabold text-base flex items-center gap-1.5 text-secondary">
                📷 AI Notebook OCR Scanner
              </h3>
              <button onClick={() => setShowOcrModal(false)} className="text-muted-foreground hover:text-foreground font-bold text-lg">×</button>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Upload a snapshot of your handwritten class notes or paper homework. Pathshala AI scans the text, identifies grammar or spelling errors, and suggests improvements.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-muted border-2 border-dashed border-card-border rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold mb-2">Simulate Notebook Photo Upload</span>
                <button
                  onClick={runOcrSimulation}
                  disabled={ocrScanning}
                  className="px-4 py-2 bg-secondary text-white font-bold rounded-xl text-xs hover:brightness-110 cursor-pointer disabled:opacity-50"
                >
                  {ocrScanning ? "Scanning Notebook..." : "Scan Test Notebook Page"}
                </button>
              </div>

              <div className="p-4 bg-muted rounded-2xl border border-card-border min-h-[140px] flex items-center justify-center">
                {!ocrScanning && !ocrResult && (
                  <span className="text-[10px] text-muted-foreground italic">Awaiting upload scan...</span>
                )}
                {ocrScanning && (
                  <div className="text-center space-y-2">
                    <span className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin block mx-auto"></span>
                    <span className="text-[10px] font-bold text-primary animate-pulse block">AI OCR analyzing handwriting...</span>
                  </div>
                )}
                {ocrResult && (
                  <div className="text-xs text-left w-full space-y-2">
                    <span className="text-[9px] font-bold text-emerald-500 uppercase block">✓ Scan Completed successfully</span>
                    <div>
                      <strong className="text-foreground">Transcribed Text:</strong>
                      <p className="p-2 bg-card rounded border border-card-border/60 text-[10px] mt-1 italic text-muted-foreground">{ocrResult.transcription}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {ocrResult && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl space-y-3 text-left">
                <span className="text-xs font-bold text-amber-600 block">AI Evaluation & Corrections:</span>
                <ul className="space-y-2 text-[10px] leading-relaxed text-muted-foreground">
                  {ocrResult.errorsFound.map((err: any, idx: number) => (
                    <li key={idx} className="flex gap-1.5 items-start">
                      <span className="text-rose-500 font-bold">✗</span>
                      <span><strong>{err.error}</strong>: {err.correction}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2.5 border-t border-card-border/60 space-y-1.5 text-xs font-semibold">
                  <span className="text-foreground block">Corrected Explanation Suggestion:</span>
                  <p className="p-3 bg-card rounded-xl border border-card-border/80 text-[11px] text-foreground leading-normal">{ocrResult.correctedText}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Board Mock Exam Modal */}
      {showMockExamModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-card border border-card-border p-6 rounded-3xl shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-card-border">
              <h3 className="font-extrabold text-base flex items-center gap-1.5 text-primary">
                📝 {boardType} Board Mock Paper: {selectedLesson?.title || "Lesson"}
              </h3>
              <button onClick={() => setShowMockExamModal(false)} className="text-muted-foreground hover:text-foreground font-bold text-lg">×</button>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed text-left">
              Solve this test structured exactly according to the latest **{boardType}** blueprint criteria (MCQs, Short answers, and long structured explanations).
            </p>

            <div className="p-4 bg-muted rounded-2xl border border-card-border space-y-4 max-h-[50vh] overflow-y-auto text-xs text-left">
              <div className="space-y-2">
                <span className="font-bold block text-primary">Section A: Objective Type (1 Mark)</span>
                <p>Q1. Which reactant provides the oxygen molecules released in photosynthesis?</p>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <button className="p-2 bg-card border border-card-border rounded-lg text-left">A. Carbon Dioxide</button>
                  <button className="p-2 bg-primary/10 border-primary font-bold rounded-lg text-left">B. Water (H2O)</button>
                  <button className="p-2 bg-card border border-card-border rounded-lg text-left">C. Glucose</button>
                  <button className="p-2 bg-card border border-card-border rounded-lg text-left">D. Chlorophyll</button>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-card-border/60">
                <span className="font-bold block text-primary">Section B: Short Answer (3 Marks)</span>
                <p>Q2. Outline three main differences between the light reaction and Calvin cycle reactions.</p>
                <textarea 
                  placeholder="Type your explanation answer here..." 
                  className="w-full h-16 p-2 bg-card border border-card-border rounded-xl focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-card-border">
              {mockScore === null ? (
                <button
                  onClick={submitMockExam}
                  className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl text-xs shadow hover:brightness-110 cursor-pointer"
                >
                  Submit Paper for AI Evaluation
                </button>
              ) : (
                <div className="text-xs space-y-1 text-left">
                  <span className="font-bold text-emerald-500">★ AI Score: {mockScore}% (Grade: A)</span>
                  <p className="text-[10px] text-muted-foreground leading-normal">Board Criteria Match: Outstanding presentation. Excellent structured breakdown of section B.</p>
                </div>
              )}

              <button
                onClick={() => setShowMockExamModal(false)}
                className="px-4 py-2 border border-card-border rounded-xl text-xs font-semibold hover:bg-muted"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
