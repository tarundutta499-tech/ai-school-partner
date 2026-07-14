"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Role = "student" | "parent" | "teacher" | "sandbox" | "admin" | "superadmin";

interface LessonProgress {
  id: string;
  title: string;
  completed: boolean;
  score?: number;
}

interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
}

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  preferredLanguage: string;
  setPreferredLanguage: (lang: string) => void;
  lessons: LessonProgress[];
  completeLesson: (id: string, score?: number) => void;
  parentInstructions: string;
  setParentInstructions: (instr: string) => void;
  languages: LanguageConfig[];
  
  // Currency preference state
  currency: "INR" | "USD";
  setCurrency: (curr: "INR" | "USD") => void;

  // Student Profile dynamic states
  studentName: string;
  setStudentName: (name: string) => void;
  schoolName: string;
  setSchoolName: (school: string) => void;
  gradeClass: string;
  setGradeClass: (gc: string) => void;
  section: string;
  setSection: (sec: string) => void;
  rollNumber: string;
  setRollNumber: (roll: string) => void;
  learningStyle: string;
  setLearningStyle: (style: string) => void;
  weakSubjects: string;
  setWeakSubjects: (sub: string) => void;
  learningGoal: string;
  setLearningGoal: (goal: string) => void;
  
  // Gamification telemetry
  xpPoints: number;
  addXp: (amount: number) => void;
  coinsCount: number;
  addCoins: (amount: number) => void;
  learningStreak: number;
  setLearningStreak: (streak: number) => void;

  // B2B Classroom Sync States (Hybrid Model)
  activeClassFocus: string;
  setActiveClassFocus: (focus: string) => void;
  activeHomeworkPrompt: string;
  setActiveHomeworkPrompt: (prompt: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>("student");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [preferredLanguage, setPreferredLanguage] = useState<string>("English");
  const [parentInstructions, setParentInstructions] = useState<string>(
    "Explain using simple visual metaphors and real-world science examples. Ask short follow-up questions."
  );

  // Global currency selector (defaults to INR)
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  // Student details state (defaults can be customized by the user dynamically)
  const [studentName, setStudentName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [gradeClass, setGradeClass] = useState("");
  const [section, setSection] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [learningStyle, setLearningStyle] = useState("Visual");
  const [weakSubjects, setWeakSubjects] = useState("");
  const [learningGoal, setLearningGoal] = useState("");

  // Gamification states
  const [xpPoints, setXpPoints] = useState(0);
  const [coinsCount, setCoinsCount] = useState(0);
  const [learningStreak, setLearningStreak] = useState(0);

  // B2B Hybrid Focus states
  const [activeClassFocus, setActiveClassFocus] = useState("Introduction to Photosynthesis");
  const [activeHomeworkPrompt, setActiveHomeworkPrompt] = useState(
    "Draw and label the chloroplast, then write a 200-word summary explaining photolysis of water in photosynthesis."
  );

  const addXp = (amount: number) => setXpPoints((prev) => prev + amount);
  const addCoins = (amount: number) => setCoinsCount((prev) => prev + amount);

  const languages: LanguageConfig[] = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "hi", name: "Hindi", nativeName: "हिंदी" },
    { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬी" },
    { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
    { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
    { code: "te", name: "Telugu", nativeName: "తెలుగు" },
    { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
    { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
    { code: "mr", name: "Marathi", nativeName: "मराठी" },
    { code: "bn", name: "Bengali", nativeName: "বাংলা" },
    { code: "ur", name: "Urdu", nativeName: "اردو" },
    { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" }
  ];

  const [lessons, setLessons] = useState<LessonProgress[]>([
    { id: "1", title: "Introduction to Photosynthesis", completed: true, score: 100 },
    { id: "2", title: "Light and Dark Reactions", completed: false },
    { id: "3", title: "Structure of Chloroplast", completed: false },
    { id: "4", title: "Factors Affecting Photosynthesis", completed: false },
    { id: "5", title: "Importance of Photosynthesis", completed: false },
  ]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const completeLesson = (id: string, score?: number) => {
    setLessons((prev) =>
      prev.map((l) => (l.id === id ? { ...l, completed: true, score } : l))
    );
    addXp(50);
    addCoins(10);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        theme,
        toggleTheme,
        preferredLanguage,
        setPreferredLanguage,
        lessons,
        completeLesson,
        parentInstructions,
        setParentInstructions,
        languages,
        currency,
        setCurrency,
        studentName,
        setStudentName,
        schoolName,
        setSchoolName,
        gradeClass,
        setGradeClass,
        section,
        setSection,
        rollNumber,
        setRollNumber,
        learningStyle,
        setLearningStyle,
        weakSubjects,
        setWeakSubjects,
        learningGoal,
        setLearningGoal,
        xpPoints,
        addXp,
        coinsCount,
        addCoins,
        learningStreak,
        setLearningStreak,
        activeClassFocus,
        setActiveClassFocus,
        activeHomeworkPrompt,
        setActiveHomeworkPrompt
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
