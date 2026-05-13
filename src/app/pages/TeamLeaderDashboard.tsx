import { useState } from "react";
import {
  AlertTriangle,
  Users,
  CheckCircle,
  Coffee,
  RefreshCw,
  ChevronRight,
  Clock,
  Activity,
  ZapOff,
  UserCheck,
  CalendarDays,
  AlertCircle,
  BarChart2,
  Shuffle,
  X,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../components/ui/sheet";

const COLORS = {
  navy: "#1A2B3C",
  mint: "#48C9B0",
  teal: "#E0F2F1",
  green: "#27AE60",
  amber: "#F39C12",
  coral: "#F1948A",
  ghost: "#F8F9FA",
  border: "#E9ECEF",
};

type AgentStatus = "balanced" | "warning" | "critical";

interface Agent {
  id: number;
  name: string;
  initials: string;
  role: string;
  status: AgentStatus;
  score: number;
  calls: number;
  overtime: number;
  tasks: number;
  shift: string;
  color: string;
}

const AGENTS: Agent[] = [
  { id: 1, name: "Sarah Chen", initials: "SC", role: "Senior Agent", status: "balanced", score: 87, calls: 42, overtime: 0, tasks: 5, shift: "9AM–6PM", color: "#7C3AED" },
  { id: 2, name: "Marcus Williams", initials: "MW", role: "Agent II", status: "warning", score: 63, calls: 58, overtime: 2, tasks: 9, shift: "8AM–5PM", color: "#0891B2" },
  { id: 3, name: "Priya Patel", initials: "PP", role: "Agent I", status: "critical", score: 34, calls: 71, overtime: 5, tasks: 14, shift: "7AM–4PM", color: "#BE185D" },
  { id: 4, name: "James O'Brien", initials: "JO", role: "Senior Agent", status: "balanced", score: 91, calls: 38, overtime: 0, tasks: 4, shift: "10AM–7PM", color: "#047857" },
  { id: 5, name: "Leila Nguyen", initials: "LN", role: "Agent II", status: "warning", score: 59, calls: 61, overtime: 3, tasks: 11, shift: "9AM–6PM", color: "#B45309" },
  { id: 6, name: "Carlos Reyes", initials: "CR", role: "Agent I", status: "balanced", score: 78, calls: 44, overtime: 0, tasks: 6, shift: "8AM–5PM", color: "#1D4ED8" },
  { id: 7, name: "Ayasha Crow", initials: "AC", role: "Senior Agent", status: "critical", score: 28, calls: 79, overtime: 7, tasks: 16, shift: "7AM–4PM", color: "#9D174D" },
  { id: 8, name: "Tom Nakamura", initials: "TN", role: "Agent II", status: "balanced", score: 82, calls: 40, overtime: 1, tasks: 5, shift: "11AM–8PM", color: "#065F46" },
  { id: 9, name: "Fatima Al-Said", initials: "FA", role: "Agent I", status: "warning", score: 55, calls: 65, overtime: 4, tasks: 12, shift: "9AM–6PM", color: "#7C2D12" },
  { id: 10, name: "Ryan Park", initials: "RP", role: "Senior Agent", status: "balanced", score: 94, calls: 35, overtime: 0, tasks: 4, shift: "10AM–7PM", color: "#1E3A5F" },
  { id: 11, name: "Diana Ferrara", initials: "DF", role: "Agent II", status: "critical", score: 41, calls: 68, overtime: 6, tasks: 13, shift: "8AM–5PM", color: "#7C3AED" },
  { id: 12, name: "Kofi Mensah", initials: "KM", role: "Agent I", status: "balanced", score: 76, calls: 46, overtime: 0, tasks: 7, shift: "9AM–6PM", color: "#166534" },
];

const SHIFTS = [
  { id: 1, agent: "Sarah Chen", time: "9AM–6PM", day: "Mon", color: COLORS.mint },
  { id: 2, agent: "Marcus Williams", time: "8AM–5PM", day: "Mon", color: COLORS.amber },
  { id: 3, agent: "Priya Patel", time: "7AM–4PM", day: "Mon", color: COLORS.coral, warning: "Violates 11h rest rule" },
  { id: 4, agent: "James O'Brien", time: "10AM–7PM", day: "Tue", color: COLORS.mint },
  { id: 5, agent: "Leila Nguyen", time: "9AM–6PM", day: "Tue", color: COLORS.amber },
  { id: 6, agent: "Carlos Reyes", time: "8AM–5PM", day: "Wed", color: COLORS.mint },
  { id: 7, agent: "Ayasha Crow", time: "7AM–4PM", day: "Wed", color: COLORS.coral, warning: "Back-to-back doubles" },
  { id: 8, agent: "Tom Nakamura", time: "11AM–8PM", day: "Thu", color: COLORS.mint },
];

const STATUS_CONFIG = {
  balanced: { color: COLORS.green, bg: "#27AE6018", label: "Balanced", glow: "0 0 0 3px #27AE6030", pulse: false },
  warning: { color: COLORS.amber, bg: "#F39C1218", label: "At Risk", glow: "0 0 0 3px #F39C1230", pulse: false },
  critical: { color: COLORS.coral, bg: "#F1948A18", label: "Critical", glow: "0 0 0 6px #F1948A40, 0 0 0 12px #F1948A15", pulse: true },
};

function AgentCard({ agent, onClick }: { agent: Agent; onClick: () => void }) {
  const cfg = STATUS_CONFIG[agent.status];

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl border p-4 text-left transition-all duration-200 hover:scale-105 hover:shadow-md"
      style={{
        borderColor: cfg.color + "60",
        boxShadow: cfg.glow,
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{ background: agent.color }}
        >
          {agent.initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate" style={{ color: COLORS.navy }}>{agent.name}</p>
          <p className="text-xs text-gray-400">{agent.role}</p>
        </div>
        <div className="ml-auto">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: cfg.bg, color: cfg.color }}
          >
            {cfg.label}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg p-1.5" style={{ background: COLORS.ghost }}>
          <p className="text-sm font-bold" style={{ color: COLORS.navy }}>{agent.score}</p>
          <p className="text-xs text-gray-400">Score</p>
        </div>
        <div className="rounded-lg p-1.5" style={{ background: COLORS.ghost }}>
          <p className="text-sm font-bold" style={{ color: COLORS.navy }}>{agent.calls}</p>
          <p className="text-xs text-gray-400">Calls</p>
        </div>
        <div
          className="rounded-lg p-1.5"
          style={{ background: agent.overtime > 3 ? COLORS.coral + "20" : COLORS.ghost }}
        >
          <p className="text-sm font-bold" style={{ color: agent.overtime > 3 ? COLORS.coral : COLORS.navy }}>
            +{agent.overtime}h
          </p>
          <p className="text-xs text-gray-400">OT</p>
        </div>
      </div>
      {agent.status === "critical" && (
        <div className="mt-2 flex items-center gap-1 text-xs p-1.5 rounded-lg" style={{ background: COLORS.coral + "18", color: COLORS.coral }}>
          <AlertTriangle size={10} />
          <span>Click to intervene</span>
        </div>
      )}
    </button>
  );
}

interface ShiftCardProps {
  shift: typeof SHIFTS[0];
  isDragging: boolean;
  onDragStart: (id: number) => void;
  onDrop: (id: number) => void;
}

function ShiftCard({ shift, isDragging, onDragStart, onDrop }: ShiftCardProps) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(shift.id)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(shift.id)}
      className="group flex items-start gap-2 p-2.5 rounded-lg border cursor-grab active:cursor-grabbing transition-all duration-150"
      style={{
        borderColor: shift.color + "50",
        background: shift.color + "10",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div className="w-1 h-full rounded-full flex-shrink-0 self-stretch" style={{ background: shift.color }} />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold truncate" style={{ color: COLORS.navy }}>{shift.agent}</p>
        <p className="text-xs text-gray-400">{shift.day} · {shift.time}</p>
        {shift.warning && (
          <div className="flex items-center gap-1 mt-1">
            <AlertCircle size={10} style={{ color: COLORS.coral }} />
            <span className="text-xs" style={{ color: COLORS.coral }}>{shift.warning}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function TeamLeaderDashboard() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [breaks, setBreaks] = useState<Record<number, boolean>>({});

  const openIntervention = (agent: Agent) => {
    setSelectedAgent(agent);
    setDrawerOpen(true);
  };

  const grantBreak = (agentId: number) => {
    setBreaks((prev) => ({ ...prev, [agentId]: true }));
  };

  const balanced = AGENTS.filter((a) => a.status === "balanced").length;
  const warning = AGENTS.filter((a) => a.status === "warning").length;
  const critical = AGENTS.filter((a) => a.status === "critical").length;

  return (
    <div className="p-6 space-y-6" style={{ background: COLORS.ghost, minHeight: "100%" }}>
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Agents", value: AGENTS.length, icon: Users, color: COLORS.navy },
          { label: "Balanced", value: balanced, icon: CheckCircle, color: COLORS.green },
          { label: "Approaching Limit", value: warning, icon: Activity, color: COLORS.amber },
          { label: "Critical Risk", value: critical, icon: ZapOff, color: COLORS.coral },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-4 border" style={{ borderColor: COLORS.border }}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500">{stat.label}</p>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: stat.color + "18" }}>
                <stat.icon size={14} style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Live Heatmap */}
        <div className="xl:col-span-2 bg-white rounded-xl border p-5" style={{ borderColor: COLORS.border }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold" style={{ color: COLORS.navy }}>Live Agent Heatmap</h3>
              <p className="text-xs text-gray-400">Click a critical agent to open the intervention panel</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              {[
                { color: COLORS.green, label: "Balanced" },
                { color: COLORS.amber, label: "Warning" },
                { color: COLORS.coral, label: "Critical" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-gray-500">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {AGENTS.map((agent) => (
              <AgentCard key={agent.id} agent={agent} onClick={() => openIntervention(agent)} />
            ))}
          </div>
        </div>

        {/* Smart Scheduler */}
        <div className="bg-white rounded-xl border p-5" style={{ borderColor: COLORS.border }}>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold" style={{ color: COLORS.navy }}>Smart Scheduler</h3>
            <CalendarDays size={16} className="text-gray-400" />
          </div>
          <p className="text-xs text-gray-400 mb-3">Drag shifts to resolve compliance gaps</p>

          <div className="flex items-center gap-2 p-2.5 rounded-lg mb-3" style={{ background: COLORS.coral + "15", border: `1px solid ${COLORS.coral}30` }}>
            <AlertCircle size={14} style={{ color: COLORS.coral }} />
            <p className="text-xs" style={{ color: COLORS.coral }}>
              <strong>2 compliance gaps</strong> detected this week
            </p>
          </div>

          <div className="space-y-2">
            {["Mon", "Tue", "Wed", "Thu"].map((day) => {
              const dayShifts = SHIFTS.filter((s) => s.day === day);
              return (
                <div key={day}>
                  <p className="text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">{day}</p>
                  <div className="space-y-1.5">
                    {dayShifts.map((shift) => (
                      <ShiftCard
                        key={shift.id}
                        shift={shift}
                        isDragging={draggingId === shift.id}
                        onDragStart={setDraggingId}
                        onDrop={() => setDraggingId(null)}
                      />
                    ))}
                    {dayShifts.length === 0 && (
                      <div
                        className="p-2 rounded-lg border-2 border-dashed text-center text-xs text-gray-300"
                        style={{ borderColor: COLORS.border }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => setDraggingId(null)}
                      >
                        Drop shift here
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 rounded-xl" style={{ background: COLORS.teal }}>
            <div className="flex items-center gap-2 mb-2">
              <Clock size={13} style={{ color: COLORS.navy }} />
              <p className="text-xs font-semibold" style={{ color: COLORS.navy }}>AI Scheduling Tip</p>
            </div>
            <p className="text-xs text-gray-600">
              Move Priya's Wednesday shift to Thursday to eliminate the rest-period violation and reduce overtime by 18%.
            </p>
            <button className="mt-2 text-xs font-medium" style={{ color: COLORS.mint }}>
              Auto-fix → Apply suggestion
            </button>
          </div>
        </div>
      </div>

      {/* Intervention Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto" style={{ borderLeft: `3px solid ${COLORS.coral}` }}>
          {selectedAgent && (
            <>
              <SheetHeader className="pb-4">
                <SheetTitle className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: selectedAgent.color }}
                  >
                    {selectedAgent.initials}
                  </div>
                  <div>
                    <p style={{ color: COLORS.navy }}>{selectedAgent.name}</p>
                    <p className="text-xs font-normal text-gray-400">{selectedAgent.role} · {selectedAgent.shift}</p>
                  </div>
                  <span
                    className="ml-auto text-xs px-2 py-1 rounded-full font-medium"
                    style={{
                      background: STATUS_CONFIG[selectedAgent.status].bg,
                      color: STATUS_CONFIG[selectedAgent.status].color,
                    }}
                  >
                    {STATUS_CONFIG[selectedAgent.status].label}
                  </span>
                </SheetTitle>
              </SheetHeader>

              {/* Risk Summary */}
              <div className="px-4 space-y-4">
                <div className="p-4 rounded-xl" style={{ background: COLORS.coral + "15", border: `1px solid ${COLORS.coral}30` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={16} style={{ color: COLORS.coral }} />
                    <p className="text-sm font-semibold" style={{ color: COLORS.coral }}>Burnout Risk Detected</p>
                  </div>
                  <div className="space-y-1.5 text-xs text-gray-600">
                    <p>• Wellness score: <strong style={{ color: COLORS.coral }}>{selectedAgent.score}/100</strong> (Critical)</p>
                    <p>• Overtime this week: <strong style={{ color: COLORS.coral }}>+{selectedAgent.overtime}h</strong></p>
                    <p>• Active tasks: <strong style={{ color: COLORS.coral }}>{selectedAgent.tasks} open items</strong></p>
                    <p>• Call volume: <strong>{selectedAgent.calls} calls today</strong> (38% above avg)</p>
                  </div>
                </div>

                {/* Wellness Bars */}
                <div>
                  <p className="text-sm font-semibold mb-3" style={{ color: COLORS.navy }}>Wellness Breakdown</p>
                  <div className="space-y-2">
                    {[
                      { label: "Emotional Wellbeing", pct: selectedAgent.score - 10, color: COLORS.coral },
                      { label: "Workload Capacity", pct: selectedAgent.score + 5, color: COLORS.amber },
                      { label: "Engagement Level", pct: selectedAgent.score + 15, color: COLORS.green },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">{item.label}</span>
                          <span style={{ color: item.color }}>{Math.min(item.pct, 100)}%</span>
                        </div>
                        <div className="h-2 rounded-full" style={{ background: COLORS.border }}>
                          <div
                            className="h-2 rounded-full transition-all"
                            style={{ width: `${Math.min(item.pct, 100)}%`, background: item.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Intervention Actions */}
                <div>
                  <p className="text-sm font-semibold mb-3" style={{ color: COLORS.navy }}>Intervention Actions</p>
                  <div className="space-y-2">
                    <button
                      onClick={() => grantBreak(selectedAgent.id)}
                      disabled={breaks[selectedAgent.id]}
                      className="w-full flex items-center gap-3 p-3.5 rounded-xl text-sm font-medium transition-all disabled:opacity-60"
                      style={{
                        background: breaks[selectedAgent.id] ? COLORS.ghost : COLORS.mint,
                        color: breaks[selectedAgent.id] ? COLORS.green : "white",
                      }}
                    >
                      <Coffee size={16} />
                      {breaks[selectedAgent.id] ? "✓ Break Granted (15 min)" : "Auto-Grant 15-min Break"}
                    </button>

                    <button
                      className="w-full flex items-center gap-3 p-3.5 rounded-xl border text-sm font-medium transition-all hover:bg-gray-50"
                      style={{ borderColor: COLORS.border, color: COLORS.navy }}
                    >
                      <Shuffle size={16} />
                      Redistribute 3 Tasks to Team
                    </button>

                    <button
                      className="w-full flex items-center gap-3 p-3.5 rounded-xl border text-sm font-medium transition-all hover:bg-gray-50"
                      style={{ borderColor: COLORS.border, color: COLORS.navy }}
                    >
                      <UserCheck size={16} />
                      Schedule 1:1 Check-In
                    </button>

                    <button
                      className="w-full flex items-center gap-3 p-3.5 rounded-xl border text-sm font-medium transition-all hover:bg-gray-50"
                      style={{ borderColor: COLORS.border, color: COLORS.navy }}
                    >
                      <BarChart2 size={16} />
                      View Full Wellness Report
                    </button>
                  </div>
                </div>

                {/* AI Recommendation */}
                <div className="p-4 rounded-xl" style={{ background: COLORS.teal }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Activity size={14} style={{ color: COLORS.navy }} />
                    <p className="text-xs font-semibold" style={{ color: COLORS.navy }}>AI Recommendation</p>
                  </div>
                  <p className="text-xs text-gray-600">
                    Based on historical patterns, granting an immediate break + redistributing 3 tasks reduces burnout probability by <strong>67%</strong> for agents in this profile.
                  </p>
                </div>

                <button
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white"
                  style={{ background: COLORS.navy }}
                >
                  Apply All Recommendations
                </button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
