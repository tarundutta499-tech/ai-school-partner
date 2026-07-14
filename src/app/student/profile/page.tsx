"use client";

import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { 
  User, 
  GraduationCap, 
  Languages, 
  Flame, 
  Target 
} from "lucide-react";

export default function StudentProfilePage() {
  const router = useRouter();
  const { 
    preferredLanguage, 
    setPreferredLanguage,
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
    setLearningGoal
  } = useApp();

  const handleSubmitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile configurations saved! Your AI tutor has customized your learning pathways.");
    router.push("/dashboard/student");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-card border border-card-border p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full bg-primary/10 blur-[80px] pointer-events-none"></div>

        {/* Title */}
        <div className="flex items-center gap-2 mb-2">
          <User className="w-6 h-6 text-primary" />
          <h3 className="font-black text-lg">Setup Student Learning Profile</h3>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Help the AI customize your classes. Selecting your preferred language and learning style dictates how the AI tutor constructs study models and maps.
        </p>

        <form onSubmit={handleSubmitProfile} className="space-y-6">
          {/* Metadata Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Student Name</label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3 py-2 bg-muted border border-card-border rounded-xl text-xs focus:outline-none focus:border-primary"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Grade / Class</label>
              <input
                type="text"
                required
                value={gradeClass}
                onChange={(e) => setGradeClass(e.target.value)}
                placeholder="E.g., Class 10"
                className="w-full px-3 py-2 bg-muted border border-card-border rounded-xl text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Section</label>
              <input
                type="text"
                required
                value={section}
                onChange={(e) => setSection(e.target.value)}
                placeholder="E.g., A"
                className="w-full px-3 py-2 bg-muted border border-card-border rounded-xl text-xs focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Roll Number</label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="w-full px-3 py-2 bg-muted border border-card-border rounded-xl text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">School Name</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full px-3 py-2 bg-muted border border-card-border rounded-xl text-xs focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* AI Customization Parameters */}
          <div className="border-t border-card-border/80 pt-6 space-y-4">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest block">AI Learning Customizations</span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                  <Languages className="w-3.5 h-3.5 text-primary" />
                  Preferred Language
                </label>
                <select
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                  className="w-full px-3 py-2 bg-muted border border-card-border rounded-xl text-xs focus:outline-none focus:border-primary font-semibold"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Spanish">Spanish (Español)</option>
                  <option value="Tamil">Tamil (தமிழ்)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-secondary" />
                  Cognitive Learning Style
                </label>
                <select
                  value={learningStyle}
                  onChange={(e) => setLearningStyle(e.target.value)}
                  className="w-full px-3 py-2 bg-muted border border-card-border rounded-xl text-xs focus:outline-none focus:border-primary font-semibold"
                >
                  <option value="Visual">Visual (Uses metaphors & illustrations)</option>
                  <option value="Auditory">Auditory (Optimized for ElevenLabs voice streams)</option>
                  <option value="Reading">Reading / Writing (Structured detailed chapters)</option>
                  <option value="Kinesthetic">Kinesthetic (Quiz & flashcard heavy)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-rose-500" />
                Weak Subjects / Topics
              </label>
              <input
                type="text"
                value={weakSubjects}
                onChange={(e) => setWeakSubjects(e.target.value)}
                placeholder="E.g., Chemistry, Physics"
                className="w-full px-3 py-2 bg-muted border border-card-border rounded-xl text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-emerald-500" />
                Primary Learning Goal
              </label>
              <textarea
                value={learningGoal}
                onChange={(e) => setLearningGoal(e.target.value)}
                className="w-full h-20 p-3 bg-muted border border-card-border rounded-xl text-xs focus:outline-none focus:border-primary"
                placeholder="E.g. Clear competitive tests, pass mid-terms..."
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-xl shadow-md duo-button hover:brightness-110 cursor-pointer"
          >
            Launch My Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
