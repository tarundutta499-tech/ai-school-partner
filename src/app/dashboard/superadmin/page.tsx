"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Building2, 
  Users, 
  Cpu, 
  Coins, 
  Database, 
  Activity, 
  History, 
  Sparkles, 
  CheckCircle,
  FileSpreadsheet
} from "lucide-react";

export default function SuperAdminDashboard() {
  const { currency } = useApp();
  const [schools, setSchools] = useState<any[]>([]);

  // Simulation baselines (defaults to 0 but convertible)
  const [aiSpendData] = useState({
    totalGenerationRuns: 0,
    totalGenCost: 0.00,
    totalStudentsServed: 0,
    costIfPerStudent: 0.00,
    totalSavings: 0.00,
    apiSuccessRate: "--"
  });

  const formatPrice = (usdAmount: number) => {
    if (currency === "INR") {
      return `₹${(usdAmount * 83).toFixed(2)}`;
    }
    return `$${usdAmount.toFixed(2)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-card-border/80">
        <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Super Admin Console</span>
        <h1 className="text-2xl font-black">Global Platform Orchestrator</h1>
        <p className="text-xs text-muted-foreground mt-1">Global SaaS health, multi-school tenants, and AI Cost Telemetry logs.</p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-card border border-card-border rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Total Active Schools</span>
            <Building2 className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-extrabold">{schools.length} Schools</p>
        </div>

        <div className="p-6 bg-card border border-card-border rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Total Platform Users</span>
            <Users className="w-4 h-4 text-secondary" />
          </div>
          <p className="text-2xl font-extrabold">0 Users</p>
        </div>

        <div className="p-6 bg-card border border-card-border rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Total Content Chapters</span>
            <Database className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold">0 chapters</p>
        </div>

        <div className="p-6 bg-card border border-card-border rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">System Health status</span>
            <Activity className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-extrabold text-muted-foreground">Idle</p>
        </div>
      </div>

      {/* AI Cost Dashboard - Key Telemetry for Investors & Schools */}
      <div className="bg-card border-2 border-primary/20 p-6 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Coins className="w-56 h-56 text-muted-foreground" />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Cpu className="w-5 h-5 text-muted-foreground" />
          <h3 className="font-extrabold text-base">Investor AI Cost Efficiency Dashboard</h3>
        </div>

        <p className="text-xs text-muted-foreground mb-6">
          Track our core unit-economic moat. By generating curriculum records once and caching them globally across syllabus boundaries, we prevent recurring AI token expenditure.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-muted rounded-xl border border-card-border">
            <span className="text-[10px] text-muted-foreground uppercase font-bold block mb-1">Total Pipeline runs</span>
            <span className="text-xl font-extrabold">{aiSpendData.totalGenerationRuns} runs</span>
          </div>

          <div className="p-4 bg-muted rounded-xl border border-card-border">
            <span className="text-[10px] text-muted-foreground uppercase font-bold block mb-1">Cumulative Gen Cost</span>
            <span className="text-xl font-extrabold text-rose-500">{formatPrice(aiSpendData.totalGenCost)}</span>
          </div>

          <div className="p-4 bg-muted rounded-xl border border-card-border font-bold">
            <span className="text-[10px] text-muted-foreground uppercase font-bold block mb-1">Cost If Generated Live</span>
            <span className="text-xl text-muted-foreground">{formatPrice(aiSpendData.costIfPerStudent)}</span>
          </div>

          <div className="p-4 bg-muted border border-card-border text-muted-foreground rounded-xl font-black">
            <span className="text-[10px] uppercase font-bold block mb-1">Net Platform Savings</span>
            <span className="text-xl">{formatPrice(aiSpendData.totalSavings)} (--%)</span>
          </div>
        </div>
      </div>

      {/* Roster lists, Audit Logs, and health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Manage Schools List */}
        <div className="lg:col-span-2 bg-card border border-card-border rounded-3xl p-6 shadow-sm overflow-hidden">
          <h3 className="font-extrabold text-base mb-6">Onboarded School Tenants</h3>

          {schools.length === 0 ? (
            <div className="text-xs text-muted-foreground text-center py-12">
              No school tenants onboarded yet. Create a school profile or import catalogs.
            </div>
          ) : (
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-card-border pb-3 text-muted-foreground font-semibold">
                    <th className="py-2">School</th>
                    <th className="py-2">Total Students</th>
                    <th className="py-2">Active Plan</th>
                    <th className="py-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-border/60">
                  {schools.map((sch) => (
                    <tr key={sch.id} className="hover:bg-muted/40">
                      <td className="py-3 font-bold text-foreground">{sch.name}</td>
                      <td className="py-3">{sch.students}</td>
                      <td className="py-3 font-semibold">{sch.plan}</td>
                      <td className="py-3 text-right">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-500">{sch.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Global System Logs */}
        <div className="bg-card border border-card-border p-6 rounded-3xl shadow-sm space-y-4">
          <h3 className="font-extrabold text-base flex items-center gap-1.5">
            <History className="w-4 h-4 text-primary" /> Live Audit Log
          </h3>

          <div className="space-y-3 font-mono text-[9px] bg-muted p-4 rounded-xl border border-card-border text-muted-foreground">
            <p className="text-foreground font-semibold">SYSTEM STATUS: IDLE</p>
            <p>&gt; Awaiting incoming API triggers...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
