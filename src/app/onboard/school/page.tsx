"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { 
  School, 
  Sparkles, 
  CheckCircle, 
  ChevronRight
} from "lucide-react";

export default function SchoolOnboard() {
  const router = useRouter();
  const { setSchoolName } = useApp();
  
  // Form parameters
  const [localSchoolName, setLocalSchoolName] = useState("");
  const [board, setBoard] = useState("CBSE");
  const [academicYear, setAcademicYear] = useState("2026-27");
  const [classes, setClasses] = useState("");
  const [subjects, setSubjects] = useState("");

  const handleFinishOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localSchoolName) return;
    
    // Save to global context
    setSchoolName(localSchoolName);
    
    alert("School parameters configured successfully! Welcome to the Admin Console.");
    router.push("/dashboard/admin");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <div className="bg-card border border-card-border p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[120px] h-[120px] rounded-full bg-primary/10 blur-[60px] pointer-events-none"></div>

        {/* Title */}
        <div className="flex items-center gap-2 mb-2">
          <School className="w-6 h-6 text-primary" />
          <h3 className="font-black text-lg">School Metadata Setup</h3>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          Initialize your school profile here. You can manually define class scopes, calendars, and chapters directly within the admin console dashboard after setup.
        </p>

        <form onSubmit={handleFinishOnboarding} className="space-y-6 text-xs font-semibold">
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase">School Name</label>
            <input
              type="text"
              required
              value={localSchoolName}
              onChange={(e) => setLocalSchoolName(e.target.value)}
              placeholder="E.g., Greenfield Public School"
              className="w-full px-3 py-2 bg-muted border border-card-border rounded-xl text-xs focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Educational Board</label>
              <select
                value={board}
                onChange={(e) => setBoard(e.target.value)}
                className="w-full px-3 py-2 bg-muted border border-card-border rounded-xl text-xs focus:outline-none focus:border-primary font-bold"
              >
                <option value="CBSE">CBSE (Central Board)</option>
                <option value="ICSE">ICSE / ISC</option>
                <option value="IB">International Baccalaureate (IB)</option>
                <option value="State Board">State Board Curriculum</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Academic Session Year</label>
              <input
                type="text"
                required
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="E.g., 2026-27"
                className="w-full px-3 py-2 bg-muted border border-card-border rounded-xl text-xs focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Target Classes (e.g. 6-12)</label>
              <input
                type="text"
                required
                value={classes}
                onChange={(e) => setClasses(e.target.value)}
                placeholder="E.g., Classes 6 to 10"
                className="w-full px-3 py-2 bg-muted border border-card-border rounded-xl text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Subject Departments</label>
              <input
                type="text"
                required
                value={subjects}
                onChange={(e) => setSubjects(e.target.value)}
                placeholder="E.g., Science, Mathematics"
                className="w-full px-3 py-2 bg-muted border border-card-border rounded-xl text-xs focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-md hover:brightness-110 cursor-pointer"
          >
            Complete School Onboarding &rarr;
          </button>
        </form>
      </div>
    </div>
  );
}
