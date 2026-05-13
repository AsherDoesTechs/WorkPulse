import { motion, AnimatePresence } from "motion/react";
import {
  X,
  AlertTriangle,
  Shuffle,
  Coffee,
  MessageSquare,
  Phone,
  Clock,
  Activity,
  TrendingDown,
} from "lucide-react";
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

interface Props {
  agent: Agent | null;
  onClose: () => void;
}

const STATUS_META = {
  balanced: { label: "Balanced", color: "#27AE60", bg: "#27AE60" },
  approaching: { label: "Approaching Threshold", color: "#F39C12", bg: "#F39C12" },
  critical: { label: "Critical Burnout Risk", color: "#F1948A", bg: "#F1948A" },
};

const ACTIVITY_LOG = [
  { time: "10:42", event: "High load detected (89%)", type: "warning" },
  { time: "09:30", event: "Skipped scheduled micro-break", type: "alert" },
  { time: "09:00", event: "Shift started", type: "info" },
  { time: "Yesterday", event: "Wellness score dropped –12 pts", type: "alert" },
];

export function InterventionDrawer({ agent, onClose }: Props) {
  const handleAction = (action: string) => {
    toast.success(`Action initiated: ${action}`, {
      description: `Applied to ${agent?.name}`,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {agent && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-96 bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#1A2B3C] px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                    style={{ background: agent.color }}
                  >
                    {agent.initials}
                  </div>
                  {agent.status === "critical" && (
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0.3, 0.8] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 rounded-full border-2 border-[#F1948A]"
                    />
                  )}
                </div>
                <div>
                  <p className="text-white font-semibold">{agent.name}</p>
                  <p className="text-white/50 text-xs">{agent.team}</p>
                </div>
              </div>
              <button onClick={onClose} className="text-white/40 hover:text-white p-1.5 rounded-lg hover:bg-white/10">
                <X size={18} />
              </button>
            </div>

            {/* Status badge */}
            <div
              className="px-5 py-3 flex items-center gap-2"
              style={{ background: STATUS_META[agent.status].bg + "15", borderBottom: `2px solid ${STATUS_META[agent.status].bg}30` }}
            >
              <AlertTriangle size={14} style={{ color: STATUS_META[agent.status].color }} />
              <span
                className="text-sm font-semibold"
                style={{ color: STATUS_META[agent.status].color }}
              >
                {STATUS_META[agent.status].label}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
              {/* Metrics */}
              <div>
                <h3 className="text-[#1A2B3C] mb-3" style={{ fontSize: "0.875rem" }}>Live Metrics</h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { label: "Wellness Score", value: agent.score, unit: "/100", color: agent.score < 50 ? "#F1948A" : agent.score < 70 ? "#F39C12" : "#27AE60" },
                    { label: "Current Load", value: agent.load, unit: "%", color: agent.load > 85 ? "#F1948A" : agent.load > 65 ? "#F39C12" : "#48C9B0" },
                    { label: "Tasks Remaining", value: agent.tasksRemaining, unit: " tasks", color: "#1A2B3C" },
                    { label: "Hours Worked", value: agent.hoursWorked, unit: "h today", color: "#1A2B3C" },
                  ].map(({ label, value, unit, color }) => (
                    <div key={label} className="bg-[#F8F9FA] rounded-xl p-3 border border-[#E9ECEF]">
                      <p className="text-[#1A2B3C]/50 text-xs mb-1">{label}</p>
                      <p style={{ color, fontWeight: 700, fontSize: "1.2rem" }}>
                        {value}<span style={{ fontSize: "0.75rem", fontWeight: 400, color: "#1A2B3C", opacity: 0.5 }}>{unit}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Wellness bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-[#1A2B3C]">Wellness Trend</span>
                  <div className="flex items-center gap-1 text-xs text-[#F1948A]">
                    <TrendingDown size={12} />
                    <span>Declining</span>
                  </div>
                </div>
                <div className="h-2 bg-[#E9ECEF] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${agent.score}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: agent.score < 50 ? "#F1948A" : agent.score < 70 ? "#F39C12" : "#27AE60",
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-[#1A2B3C]/40">Critical</span>
                  <span className="text-xs text-[#1A2B3C]/40">Optimal</span>
                </div>
              </div>

              {/* Intervention Actions */}
              <div>
                <h3 className="text-[#1A2B3C] mb-3" style={{ fontSize: "0.875rem" }}>Intervention Actions</h3>
                <div className="space-y-2.5">
                  <button
                    onClick={() => handleAction("Redistribute 2 tasks to team")}
                    className="w-full flex items-center gap-3 p-3.5 rounded-xl border-2 border-[#48C9B0]/30 bg-[#E0F2F1] hover:border-[#48C9B0] transition-all group text-left"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#48C9B0] flex items-center justify-center shrink-0">
                      <Shuffle size={15} className="text-[#1A2B3C]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A2B3C]">Redistribute Tasks</p>
                      <p className="text-xs text-[#1A2B3C]/50">Move 2 tasks to balanced agents</p>
                    </div>
                  </button>
                  <button
                    onClick={() => handleAction("Auto-grant 15-min break")}
                    className="w-full flex items-center gap-3 p-3.5 rounded-xl border-2 border-[#27AE60]/30 bg-[#27AE60]/5 hover:border-[#27AE60] transition-all text-left"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#27AE60] flex items-center justify-center shrink-0">
                      <Coffee size={15} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A2B3C]">Auto-Grant Break</p>
                      <p className="text-xs text-[#1A2B3C]/50">Schedule immediate 15-min recovery</p>
                    </div>
                  </button>
                  <button
                    onClick={() => handleAction("Send wellness message")}
                    className="w-full flex items-center gap-3 p-3.5 rounded-xl border-2 border-[#1A2B3C]/10 bg-[#F8F9FA] hover:border-[#1A2B3C]/30 transition-all text-left"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#1A2B3C] flex items-center justify-center shrink-0">
                      <MessageSquare size={15} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A2B3C]">Send Check-In Message</p>
                      <p className="text-xs text-[#1A2B3C]/50">Discreet 1:1 wellness check</p>
                    </div>
                  </button>
                  <button
                    onClick={() => handleAction("Direct call to agent")}
                    className="w-full flex items-center gap-3 p-3.5 rounded-xl border-2 border-[#F1948A]/20 bg-[#F1948A]/5 hover:border-[#F1948A]/50 transition-all text-left"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#F1948A] flex items-center justify-center shrink-0">
                      <Phone size={15} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A2B3C]">Direct Call</p>
                      <p className="text-xs text-[#1A2B3C]/50">Immediate voice check-in</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Activity Log */}
              <div>
                <h3 className="text-[#1A2B3C] mb-3" style={{ fontSize: "0.875rem" }}>Recent Activity</h3>
                <div className="space-y-2">
                  {ACTIVITY_LOG.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{
                          background: item.type === "alert" ? "#F1948A" : item.type === "warning" ? "#F39C12" : "#48C9B0",
                        }}
                      />
                      <div>
                        <p className="text-xs text-[#1A2B3C]">{item.event}</p>
                        <p className="text-xs text-[#1A2B3C]/40 mt-0.5">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
