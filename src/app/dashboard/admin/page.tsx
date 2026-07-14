"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  School, 
  Users, 
  Cpu, 
  TrendingUp, 
  CreditCard, 
  Calendar,
  Layers,
  FileBarChart2,
  PieChart,
  UserPlus,
  Mail,
  Phone,
  FileSpreadsheet,
  CheckCircle,
  Plus
} from "lucide-react";

export default function AdminDashboard() {
  const { schoolName, currency } = useApp();
  const [selectedRange, setSelectedRange] = useState("This Month");

  // User provisioning form states
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherSubject, setTeacherSubject] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentRoll, setStudentRoll] = useState("");
  const [studentGrade, setStudentGrade] = useState("Class 10");
  const [parentPhone, setParentPhone] = useState("");
  
  const [provisionLogs, setProvisionLogs] = useState<string[]>([
    "Initial B2B sandbox activated. Awaiting admin registration inputs."
  ]);

  const handleInviteTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherEmail) return;
    const logMsg = `[Teacher] Invited ${teacherEmail} for ${teacherSubject || "General"}. Token generated, invite email sent.`;
    setProvisionLogs((prev) => [logMsg, ...prev]);
    setTeacherEmail("");
    alert(`Success: Single-use invitation link dispatched to ${teacherEmail}`);
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !parentPhone) return;
    const logMsg = `[Student] Created profile for ${studentName} (${studentGrade}, Roll ${studentRoll || "N/A"}). Linked to Parent phone: ${parentPhone}. Auto-sms OTP link triggered.`;
    setProvisionLogs((prev) => [logMsg, ...prev]);
    setStudentName("");
    setStudentRoll("");
    setParentPhone("");
    alert(`Success: Student registered! Linking invite dispatched to parent mobile: ${parentPhone}`);
  };

  const handleBulkCSVImport = () => {
    alert("Simulating Bulk CSV Upload: Parsed 24 students and auto-created parent pairing records.");
    setProvisionLogs((prev) => [
      "[Bulk Onboard] Imported 24 student rows. 24 parent OTP pairing keys generated.",
      ...prev
    ]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-card-border/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider">School Admin Console</span>
          <h1 className="text-2xl font-black">{schoolName || "Configure School Name"}</h1>
          <p className="text-xs text-muted-foreground mt-1">Global settings, subscription limits, and curriculum heatmaps.</p>
        </div>
        
        <select 
          value={selectedRange} 
          onChange={(e) => setSelectedRange(e.target.value)}
          className="bg-card border border-card-border p-2 rounded-xl text-xs font-bold"
        >
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
          <option value="Academic Year">Academic Year 2026-27</option>
        </select>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-card border border-card-border rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Total Onboarded Students</span>
            <Users className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-extrabold">0</p>
        </div>

        <div className="p-6 bg-card border border-card-border rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Total Teachers</span>
            <Users className="w-4 h-4 text-secondary" />
          </div>
          <p className="text-2xl font-extrabold">0</p>
        </div>

        <div className="p-6 bg-card border border-card-border rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">AI Credits Consumption</span>
            <Cpu className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold">0 XP</p>
        </div>

        <div className="p-6 bg-card border border-card-border rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Active Subscription</span>
            <CreditCard className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-500">Not Activated</p>
        </div>
      </div>

      {/* User Provisioning Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Forms column */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-card border border-card-border p-6 rounded-3xl shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-card-border">
              <h3 className="font-extrabold text-base flex items-center gap-1.5"><UserPlus className="w-5 h-5 text-primary" /> User Provisioning Center</h3>
              <button 
                onClick={handleBulkCSVImport}
                className="px-3 py-1 bg-muted hover:bg-card-border text-[10px] font-bold rounded-lg border border-card-border flex items-center gap-1 cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" /> Bulk Import Students (CSV)
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs">
              
              {/* Invite Teacher */}
              <form onSubmit={handleInviteTeacher} className="space-y-4 bg-muted/40 p-4 rounded-2xl border border-card-border/60">
                <span className="font-bold text-[10px] text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">Invite Pedagogue (Teacher)</span>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-muted-foreground">Teacher Email</label>
                  <input 
                    type="email"
                    required
                    value={teacherEmail}
                    onChange={(e) => setTeacherEmail(e.target.value)}
                    placeholder="teacher@school.edu"
                    className="w-full p-2 bg-card border border-card-border rounded-xl focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-muted-foreground">Subject Specialization</label>
                  <input 
                    type="text"
                    value={teacherSubject}
                    onChange={(e) => setTeacherSubject(e.target.value)}
                    placeholder="E.g., Science / Biology"
                    className="w-full p-2 bg-card border border-card-border rounded-xl focus:outline-none"
                  />
                </div>
                <button type="submit" className="w-full py-2 bg-indigo-600 text-white font-bold rounded-xl text-[10px] cursor-pointer">
                  Send Invite Token Link
                </button>
              </form>

              {/* Create Student and Parent Link */}
              <form onSubmit={handleCreateStudent} className="space-y-4 bg-muted/40 p-4 rounded-2xl border border-card-border/60">
                <span className="font-bold text-[10px] text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Create Student & Parent Link</span>
                <div className="space-y-2">
                  <input 
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Student Name"
                    className="w-full p-2 bg-card border border-card-border rounded-xl focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text"
                      required
                      value={studentRoll}
                      onChange={(e) => setStudentRoll(e.target.value)}
                      placeholder="Roll No."
                      className="p-2 bg-card border border-card-border rounded-xl focus:outline-none"
                    />
                    <select 
                      value={studentGrade}
                      onChange={(e) => setStudentGrade(e.target.value)}
                      className="p-2 bg-card border border-card-border rounded-xl focus:outline-none font-bold"
                    >
                      <option value="Class 10">Class 10</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 8">Class 8</option>
                    </select>
                  </div>
                  <input 
                    type="text"
                    required
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    placeholder="Parent Mobile (Phone OTP pairing)"
                    className="w-full p-2 bg-card border border-card-border rounded-xl focus:outline-none"
                  />
                </div>
                <button type="submit" className="w-full py-2 bg-emerald-600 text-white font-bold rounded-xl text-[10px] cursor-pointer">
                  Register & Invite Parent
                </button>
              </form>

            </div>
          </div>

          {/* Activity Logs */}
          <div className="bg-card border border-card-border p-6 rounded-3xl shadow-sm space-y-4">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Provisioning Operations Log</span>
            <div className="space-y-2 text-xs font-mono bg-muted p-4 rounded-xl border border-card-border text-muted-foreground leading-relaxed max-h-48 overflow-y-auto">
              {provisionLogs.map((log, idx) => (
                <p key={idx} className="border-b border-card-border/40 pb-1.5 last:border-0">{log}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Right side widgets: billing, reports */}
        <div className="space-y-6">
          
          {/* Subscription and Billing */}
          <div className="bg-card border-2 border-primary/20 p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-extrabold text-base">Subscription & billing</h3>
            </div>
            
            <div className="p-3.5 bg-muted rounded-2xl border border-card-border/60 text-xs font-semibold space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tier:</span>
                <span>Trial / Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Price:</span>
                <span>{currency === "INR" ? "₹0/mo" : "$0/mo"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">AI Credit Balance:</span>
                <span className="font-extrabold">{currency === "INR" ? "₹0 / ₹7,999" : "$0 / $99"}</span>
              </div>
            </div>

            <button onClick={() => alert("Redirecting to Stripe Billing Portal...")} className="w-full py-2 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer">
              Manage Payments
            </button>
          </div>

          {/* Download Reports */}
          <div className="bg-card border border-card-border p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <FileBarChart2 className="w-4 h-4" /> Global Reports download
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">Download consolidated board metrics, AI credit logs, and school attendance sheets.</p>
            <button disabled onClick={() => alert("Downloading...")} className="w-full py-2.5 bg-muted border border-card-border text-xs font-bold rounded-xl cursor-not-allowed opacity-50">
              No reports available
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
