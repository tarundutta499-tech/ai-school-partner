"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp, Role } from "@/context/AppContext";
import { Sun, Moon, Sparkles, GraduationCap, Users, ShieldAlert, ShieldCheck, Award, School, Bell } from "lucide-react";

export default function Navigation() {
  const { role, setRole, theme, toggleTheme, preferredLanguage, currency, setCurrency } = useApp();
  const pathname = usePathname();
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    if (newRole === "student") router.push("/dashboard/student");
    else if (newRole === "parent") router.push("/dashboard/parent");
    else if (newRole === "teacher") router.push("/dashboard/teacher");
    else if (newRole === "admin") router.push("/dashboard/admin");
    else if (newRole === "superadmin") router.push("/dashboard/superadmin");
    else if (newRole === "sandbox") router.push("/sandbox");
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-card-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Pathshala AI
          </span>
        </Link>

        {/* Dynamic Navigation Roles (Linear style tabs) */}
        <nav className="hidden md:flex bg-muted/60 p-1 rounded-full border border-card-border/80">
          <button
            onClick={() => handleRoleChange("student")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              role === "student" && pathname.startsWith("/dashboard/student")
                ? "bg-primary text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Student View
          </button>
          <button
            onClick={() => handleRoleChange("parent")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              role === "parent" && pathname.startsWith("/dashboard/parent")
                ? "bg-secondary text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Parent View
          </button>
          <button
            onClick={() => handleRoleChange("teacher")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              role === "teacher" && pathname.startsWith("/dashboard/teacher")
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Teacher View
          </button>
          <button
            onClick={() => handleRoleChange("admin")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              role === "admin" && pathname.startsWith("/dashboard/admin")
                ? "bg-rose-600 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <School className="w-3.5 h-3.5" />
            Admin View
          </button>
          <button
            onClick={() => handleRoleChange("superadmin")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              role === "superadmin" && pathname.startsWith("/dashboard/superadmin")
                ? "bg-rose-700 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Super Admin View
          </button>
          <button
            onClick={() => handleRoleChange("sandbox")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              role === "sandbox" && pathname.startsWith("/sandbox")
                ? "bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-900 shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            AI Sandbox
          </button>
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* Currency Switcher */}
          <div className="flex bg-muted p-1 rounded-xl border border-card-border/80 text-xs">
            <button 
              onClick={() => setCurrency("INR")}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold cursor-pointer ${currency === "INR" ? "bg-card text-foreground" : "text-muted-foreground"}`}
            >
              INR (₹)
            </button>
            <button 
              onClick={() => setCurrency("USD")}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold cursor-pointer ${currency === "USD" ? "bg-card text-foreground" : "text-muted-foreground"}`}
            >
              USD ($)
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 bg-muted/80 px-3 py-1 rounded-lg text-xs border border-card-border/80">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-muted-foreground">Lang:</span>
            <span className="font-semibold text-foreground">{preferredLanguage}</span>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-card-border hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Dynamic Notifications Alert Hub Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl border border-card-border hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 relative cursor-pointer animate-pulse-slow"
              title="Notifications hub"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-72 bg-card border border-card-border rounded-2xl shadow-2xl p-4 z-50 text-xs space-y-3 glass">
                <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest block border-b border-card-border pb-2">Active Notifications Hub</span>
                <div className="space-y-2.5">
                  <div className="p-2 bg-muted rounded-xl border border-card-border/60">
                    <p className="font-bold text-foreground">Homework Alert</p>
                    <span className="text-[10px] text-muted-foreground leading-normal block">James P. assigned chloroplast model sheets. Due tomorrow.</span>
                  </div>
                  <div className="p-2 bg-muted rounded-xl border border-card-border/60">
                    <p className="font-bold text-foreground">Exam Preparation Warning</p>
                    <span className="text-[10px] text-muted-foreground leading-normal block">Mid-Term exam in 7 days. Revision timeline sprints auto-generated.</span>
                  </div>
                  <div className="p-2 bg-muted rounded-xl border border-card-border/60">
                    <p className="font-bold text-foreground">Parent Alerts Context</p>
                    <span className="text-[10px] text-muted-foreground leading-normal block">Custom learning guidelines applied: explaining science visually.</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/dashboard/student"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-primary to-secondary hover:brightness-110 active:scale-95 transition-all shadow-md duo-button"
          >
            Enter Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}
