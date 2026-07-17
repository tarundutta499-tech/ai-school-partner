"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { 
  Sparkles, 
  Mail, 
  Lock, 
  Phone, 
  ShieldCheck, 
  KeyRound, 
  Globe 
} from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const { setRole, setIsLoggedIn } = useApp();
  const [authMethod, setAuthMethod] = useState<"email" | "otp" | "invite">("email");

  // Input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();
    
    setIsLoggedIn(true);

    if (normalizedEmail === "admin@school.edu" && normalizedPassword === "admin123") {
      setRole("admin");
      router.push("/onboard/school");
    } else if (normalizedEmail === "teacher@school.edu" && normalizedPassword === "teacher123") {
      setRole("teacher");
      router.push("/dashboard/teacher");
    } else if (normalizedEmail === "parent@school.edu" && normalizedPassword === "parent123") {
      setRole("parent");
      router.push("/dashboard/parent");
    } else if (normalizedEmail === "superadmin@school.edu" && normalizedPassword === "super123") {
      setRole("superadmin");
      router.push("/dashboard/superadmin");
    } else {
      setRole("student");
      router.push("/student/profile");
    }
  };

  const handleGoogleLogin = () => {
    // Simulated Google Firebase popup
    setIsLoggedIn(true);
    setRole("student");
    router.push("/student/profile");
  };

  return (
    <div className="relative flex-1 flex items-center justify-center py-16 px-4">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary/10 blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-card border border-card-border p-8 rounded-3xl shadow-xl glass z-10 space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-md mx-auto">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-black">Welcome to Pathshala AI</h2>
          <p className="text-xs text-muted-foreground">Sign in to sync with your school curriculum</p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-muted p-1 rounded-xl border border-card-border">
          <button
            onClick={() => setAuthMethod("email")}
            className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${
              authMethod === "email" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            Email Login
          </button>
          <button
            onClick={() => setAuthMethod("otp")}
            className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${
              authMethod === "otp" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            Phone OTP
          </button>
          <button
            onClick={() => setAuthMethod("invite")}
            className={`flex-1 py-2 text-[10px] font-bold rounded-lg transition-all ${
              authMethod === "invite" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            Invite Code
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          
          {authMethod === "email" && (
            <>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@school.edu"
                    className="w-full pl-10 pr-4 py-2 bg-muted border border-card-border rounded-xl text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2 bg-muted border border-card-border rounded-xl text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </>
          )}

          {authMethod === "otp" && (
            <>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-4 py-2 bg-muted border border-card-border rounded-xl text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">OTP Code</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="6-Digit Code"
                    className="w-full pl-10 pr-4 py-2 bg-muted border border-card-border rounded-xl text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </>
          )}

          {authMethod === "invite" && (
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">School Invite Code</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="SCH-JUDE-10A-2026"
                  className="w-full pl-10 pr-4 py-2 bg-muted border border-card-border rounded-xl text-xs focus:outline-none focus:border-primary font-mono uppercase"
                />
              </div>
              <p className="text-[9px] text-muted-foreground">Provided by your school administrator or homeroom teacher.</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-xl shadow-md duo-button hover:brightness-110 cursor-pointer"
          >
            Sign In / Register
          </button>
        </form>

        {/* OAuth Separator */}
        <div className="relative flex items-center justify-center my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-card-border"></span>
          </div>
          <span className="relative bg-card px-3 text-[10px] text-muted-foreground uppercase font-semibold">Or Connect With</span>
        </div>

        {/* Social Authentication Button */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full py-2.5 bg-muted hover:bg-card-border border border-card-border text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Globe className="w-4 h-4 text-rose-500" />
          Continue with Google
        </button>

        {/* Mock accounts credentials lookup list */}
        <div className="pt-4 border-t border-card-border/60 space-y-2 text-[10px] text-muted-foreground leading-normal">
          <span className="font-bold text-foreground block">Demo Portal Accounts (Testing):</span>
          <p>🔑 School Admin: <code className="text-primary font-bold">admin@school.edu</code> (pass: <code className="font-mono text-foreground font-bold">admin123</code>)</p>
          <p>🔑 Teacher View: <code className="text-indigo-600 font-bold">teacher@school.edu</code> (pass: <code className="font-mono text-foreground font-bold">teacher123</code>)</p>
          <p>🔑 Parent View: <code className="text-secondary font-bold">parent@school.edu</code> (pass: <code className="font-mono text-foreground font-bold">parent123</code>)</p>
          <p>🔑 Super Admin: <code className="text-rose-500 font-bold">superadmin@school.edu</code> (pass: <code className="font-mono text-foreground font-bold">super123</code>)</p>
        </div>
      </div>
    </div>
  );
}
