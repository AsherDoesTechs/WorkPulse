import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, ChevronDown, GripVertical, AlertCircle, CheckCircle, Clock, Filter } from "lucide-react";
import { InterventionDrawer } from "../components/InterventionDrawer";
import { toast } from "sonner";

interface Agent {
  id: number;
  name: string;
  initials: string;
  color: string;
  status: "balanced" | "approaching" | "critical";
  score: number;
  load: number;
  tasksRemaining: number;
  hoursWorked: number;
  avgHandleTime: string;
  team: string;
}

const AGENTS: Agent[] = [
  { id: 1, name: "Alex Chen", initials: "AC", color: "#27AE60", status: "balanced", score: 88, load: 52, tasksRemaining: 4, hoursWorked: 3.5, avgHandleTime: "4:12", team: "Team Alpha" },
  { id: 2, name: "Maya Patel", initials: "MP", color: "#48C9B0", status: "balanced", score: 82, load: 60, tasksRemaining: 6, hoursWorked: 3.5, avgHandleTime: "3:55", team: "Team Alpha" },
  { id: 3, name: "Jordan Kim", initials: "JK", color: "#F39C12", status: "approaching", score: 62, load: 71, tasksRemaining: 9, hoursWorked: 5, avgHandleTime: "5:30", team: "Team Alpha" },
  { id: 4, name: "Sam Rivera", initials: "SR", color: "#F1948A", status: "critical", score: 35, load: 91, tasksRemaining: 14, hoursWorked: 6.5, avgHandleTime: "7:22", team: "Team Alpha" },
  { id: 5, name: "Taylor Brooks", initials: "TB", color: "#F1948A", status: "critical", score: 28, load: 94, tasksRemaining: 16, hoursWorked: 7, avgHandleTime: "8:10", team: "Team Alpha" },
  { id: 6, name: "Chris Morgan", initials: "CM", color: "#F39C12", status: "approaching", score: 58, load: 68, tasksRemaining: 8, hoursWorked: 4.5, avgHandleTime: "4:48", team: "Team Alpha" },
  { id: 7, name: "Dana White", initials: "DW", color: "#27AE60", status: "balanced", score: 91, load: 44, tasksRemaining: 3, hoursWorked: 3, avgHandleTime: "3:40", team: "Team Alpha" },
  { id: 8, name: "Riley Torres", initials: "RT", color: "#48C9B0", status: "balanced", score: 79, load: 55, tasksRemaining: 5, hoursWorked: 3.5, avgHandleTime: "4:05", team: "Team Alpha" },
  { id: 9, name: "Morgan Lee", initials: "ML", color: "#27AE60", status: "balanced", score: 85, load: 48, tasksRemaining: 3, hoursWorked: 3, avgHandleTime: "3:58", team: "Team Alpha" },
];

const STATUS_LABEL = {
  balanced: { label: "Balanced", color: "#27AE60", icon: CheckCircle },
  approaching: { label: "Approaching", color: "#F39C12", icon: AlertCircle },
  critical: { label: "Critical", color: "#F1948A", icon: AlertTriangle },
};

// Schedule data
interface Shift {
  id: string;
  agentId: number;
  agentName: string;
  day: string;
  start: string;
  end: string;
  hasViolation: boolean;
  violation?: string;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const SHIFTS: Shift[] = [
  { id: "s1", agentId: 1, agentName: "Alex Chen", day: "Mon", start: "09:00", end: "17:00", hasViolation: false },
  { id: "s2", agentId: 2, agentName: "Maya Patel", day: "Mon", start: "10:00", end: "18:00", hasViolation: false },
  { id: "s3", agentId: 4, agentName: "Sam Rivera", day: "Mon", start: "07:00", end: "19:00", hasViolation: true, violation: "Violates 11-hr rest rule — drag to adjust" },
  { id: "s4", agentId: 3, agentName: "Jordan Kim", day: "Tue", start: "09:00", end: "17:00", hasViolation: false },
  { id: "s5", agentId: 5, agentName: "Taylor Brooks", day: "Tue", start: "06:00", end: "18:00", hasViolation: true, violation: "12-hour shift exceeds daily limit" },
  { id: "s6", agentId: 6, agentName: "Chris Morgan", day: "Wed", start: "09:00", end: "17:30", hasViolation: false },
  { id: "s7", agentId: 7, agentName: "Dana White", day: "Wed", start: "08:00", end: "16:00", hasViolation: false },
  { id: "s8", agentId: 8, agentName: "Riley Torres", day: "Thu", start: "09:00", end: "17:00", hasViolation: false },
  { id: "s9", agentId: 9, agentName: "Morgan Lee", day: "Fri", start: "09:00", end: "17:00", hasViolation: false },
];

export function TeamDashboard() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [filter, setFilter] = useState<"all" | "balanced" | "approaching" | "critical">("all");
  const [hoveredShift, setHoveredShift] = useState<string | null>(null);
  const [draggedShift, setDraggedShift] = useState<string | null>(null);

  const balanced = AGENTS.filter((a) => a.status === "balanced").length;
  const approaching = AGENTS.filter((a) => a.status === "approaching").length;
  const critical = AGENTS.filter((a) => a.status === "critical").length;

  const filtered = filter === "all" ? AGENTS : AGENTS.filter((a) => a.status === filter);

  const getAuraStyle = (agent: Agent) => {
    if (agent.status === "critical") return { boxShadow: "0 0 0 4px #F1948A40, 0 0 0 8px #F1948A20" };
    if (agent.status === "approaching") return { boxShadow: "0 0 0 3px #F39C1240" };
    return { boxShadow: "0 0 0 3px #27AE6030" };
  };

  return (
    <div className="p-4 lg:p-6 min-h-full bg-[#F8F9FA]">
      <InterventionDrawer agent={selectedAgent} onClose={() => setSelectedAgent(null)} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-[#1A2B3C]">Team Alpha Command Center</h1>
          <p className="text-[#1A2B3C]/50 text-sm mt-0.5">
            Live monitoring · {AGENTS.length} agents on shift
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#27AE60] animate-pulse" />
          <span className="text-sm text-[#27AE60] font-medium">Live</span>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { status: "balanced" as const, count: balanced, label: "Balanced", color: "#27AE60" },
          { status: "approaching" as const, count: approaching, label: "Approaching", color: "#F39C12" },
          { status: "critical" as const, count: critical, label: "Critical Risk", color: "#F1948A" },
        ].map(({ status, count, label, color }) => (
          <button
            key={status}
            onClick={() => setFilter(filter === status ? "all" : status)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              filter === status ? "shadow-md" : "border-[#E9ECEF] bg-white hover:shadow-sm"
            }`}
            style={filter === status ? { borderColor: color, background: color + "10" } : {}}
          >
            <p style={{ color, fontSize: "1.75rem", fontWeight: 700, lineHeight: 1 }}>{count}</p>
            <p className="text-xs mt-1" style={{ color: filter === status ? color : "#1A2B3C", opacity: filter === status ? 1 : 0.5 }}>
              {label}
            </p>
          </button>
        ))}
      </div>

      {/* Live Heatmap */}
      <div className="bg-white rounded-xl border border-[#E9ECEF] shadow-sm p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-[#1A2B3C]">Live Wellness Heatmap</h2>
            <p className="text-[#1A2B3C]/40 text-xs mt-0.5">Click any agent to intervene</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#27AE60]" />
              <span className="text-[#1A2B3C]/60">Balanced</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#F39C12]" />
              <span className="text-[#1A2B3C]/60">Approaching</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#F1948A]" />
              <span className="text-[#1A2B3C]/60">Critical</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-9 gap-4">
          {filtered.map((agent) => (
            <motion.button
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all hover:bg-[#F8F9FA] group"
            >
              <div className="relative">
                {/* Pulsing aura for critical */}
                {agent.status === "critical" && (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full"
                      style={{ background: "#F1948A", filter: "blur(4px)" }}
                    />
                    <motion.div
                      animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.3 }}
                      className="absolute inset-0 rounded-full"
                      style={{ background: "#F1948A", filter: "blur(8px)" }}
                    />
                  </>
                )}
                {agent.status === "approaching" && (
                  <motion.div
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: "#F39C12", filter: "blur(4px)", opacity: 0.3 }}
                  />
                )}

                <div
                  className="relative w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm z-10"
                  style={{
                    background: agent.color,
                    ...getAuraStyle(agent),
                  }}
                >
                  {agent.initials}
                </div>

                {/* Status indicator */}
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white z-20"
                  style={{ background: STATUS_LABEL[agent.status].color }}
                />
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-[#1A2B3C] truncate max-w-[60px]">{agent.name.split(" ")[0]}</p>
                <p
                  className="text-xs font-bold"
                  style={{ color: STATUS_LABEL[agent.status].color }}
                >
                  {agent.score}%
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Critical Alert Banner */}
        <AnimatePresence>
          {critical > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 p-3 rounded-xl bg-[#F1948A]/10 border border-[#F1948A]/30 flex items-center gap-3"
            >
              <AlertTriangle size={16} className="text-[#F1948A] shrink-0" />
              <p className="text-sm text-[#1A2B3C]">
                <span className="font-semibold text-[#F1948A]">{critical} agents</span> are at critical burnout risk.
                Click their avatar to intervene immediately.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Smart Scheduler */}
      <div className="bg-white rounded-xl border border-[#E9ECEF] shadow-sm p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-[#1A2B3C]">Smart Scheduler</h2>
            <p className="text-[#1A2B3C]/40 text-xs mt-0.5">
              Drag shifts to resolve compliance violations
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-[#F39C12]" />
              <span className="text-[#1A2B3C]/60">Compliance Gap</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-[#48C9B0]" />
              <span className="text-[#1A2B3C]/60">Compliant</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="text-left p-2 text-xs font-medium text-[#1A2B3C]/40 w-32">Agent</th>
                {DAYS.map((day) => (
                  <th key={day} className="p-2 text-xs font-medium text-[#1A2B3C]/40 text-center w-24">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {AGENTS.slice(0, 6).map((agent) => (
                <tr key={agent.id} className="border-t border-[#F8F9FA]">
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0"
                        style={{ background: agent.color, fontSize: "10px", fontWeight: 700 }}
                      >
                        {agent.initials}
                      </div>
                      <span className="text-xs font-medium text-[#1A2B3C] truncate">{agent.name.split(" ")[0]}</span>
                    </div>
                  </td>
                  {DAYS.map((day) => {
                    const shift = SHIFTS.find(
                      (s) => s.agentId === agent.id && s.day === day
                    );
                    return (
                      <td key={day} className="p-1.5">
                        {shift ? (
                          <div
                            draggable
                            onDragStart={() => setDraggedShift(shift.id)}
                            onDragEnd={() => {
                              setDraggedShift(null);
                              if (shift.hasViolation) {
                                toast.success("Shift rescheduled", {
                                  description: "Compliance gap resolved ✓",
                                });
                              }
                            }}
                            onMouseEnter={() => setHoveredShift(shift.id)}
                            onMouseLeave={() => setHoveredShift(null)}
                            className={`relative rounded-lg p-2 cursor-grab active:cursor-grabbing transition-all group ${
                              shift.hasViolation
                                ? "bg-[#F39C12]/10 border-2 border-[#F39C12]/50 hover:border-[#F39C12]"
                                : "bg-[#48C9B0]/10 border border-[#48C9B0]/30 hover:border-[#48C9B0]"
                            } ${draggedShift === shift.id ? "opacity-50 scale-95" : ""}`}
                          >
                            <div className="flex items-center gap-1 mb-0.5">
                              <GripVertical size={10} className="text-[#1A2B3C]/30" />
                              {shift.hasViolation ? (
                                <AlertCircle size={10} className="text-[#F39C12]" />
                              ) : (
                                <Clock size={10} className="text-[#48C9B0]" />
                              )}
                            </div>
                            <p
                              className="text-center"
                              style={{ fontSize: "10px", fontWeight: 600, color: shift.hasViolation ? "#F39C12" : "#1A2B3C" }}
                            >
                              {shift.start}–{shift.end}
                            </p>
                            {/* Tooltip */}
                            {hoveredShift === shift.id && shift.hasViolation && (
                              <motion.div
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute left-0 top-full mt-1.5 z-50 bg-[#1A2B3C] text-white rounded-lg px-3 py-2 shadow-lg w-52"
                              >
                                <p style={{ fontSize: "11px", lineHeight: 1.4 }}>
                                  ⚠️ {shift.violation}
                                </p>
                              </motion.div>
                            )}
                          </div>
                        ) : (
                          <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => {
                              setDraggedShift(null);
                              toast.success("Shift moved", { description: "Compliance check passed ✓" });
                            }}
                            className="h-10 rounded-lg border border-dashed border-[#E9ECEF] hover:border-[#48C9B0] hover:bg-[#E0F2F1]/50 transition-all"
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Compliance Alert */}
        <div className="mt-4 flex items-center gap-3 p-3 bg-[#F39C12]/5 border border-[#F39C12]/20 rounded-xl">
          <AlertCircle size={15} className="text-[#F39C12] shrink-0" />
          <p className="text-xs text-[#1A2B3C]">
            <span className="font-semibold text-[#F39C12]">2 compliance gaps</span> detected. Highlighted shifts violate the{" "}
            <span className="font-semibold">11-hour rest rule</span>. Drag to adjust.
          </p>
        </div>
      </div>
    </div>
  );
}
