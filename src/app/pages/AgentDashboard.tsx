import { useState, useEffect } from "react";
import {
  Shield,
  Clock,
  CheckCircle2,
  Coffee,
  Send,
  Flame,
  TrendingUp,
  Star,
  Target,
  HeartPulse,
  Lock,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

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

const MOODS = [
  { emoji: "😫", label: "Exhausted", value: 1 },
  { emoji: "😟", label: "Stressed", value: 2 },
  { emoji: "😐", label: "Neutral", value: 3 },
  { emoji: "🙂", label: "Good", value: 4 },
  { emoji: "😄", label: "Energized", value: 5 },
];

const TASKS = [
  { id: 1, title: "Handle escalated ticket #4892", priority: "high", done: false, time: "9:30 AM" },
  { id: 2, title: "Complete compliance training module 3", priority: "medium", done: true, time: "10:00 AM" },
  { id: 3, title: "Submit daily performance report", priority: "medium", done: false, time: "11:00 AM" },
  { id: 4, title: "Team sync call with Alpha Squad", priority: "low", done: false, time: "12:00 PM" },
  { id: 5, title: "Follow up on customer survey #2231", priority: "low", done: true, time: "2:00 PM" },
];

function CircularProgress({ pct, label, sublabel, color }: { pct: number; label: string; sublabel: string; color: string }) {
  const data = [
    { value: pct },
    { value: 100 - pct },
  ];
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-40 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={-270}
              innerRadius={52}
              outerRadius={68}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill={color} />
              <Cell fill="#E9ECEF" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold" style={{ color: COLORS.navy }}>{pct}%</span>
          <span className="text-xs text-gray-400">{label}</span>
        </div>
      </div>
      <p className="text-xs text-center text-gray-500 mt-1">{sublabel}</p>
    </div>
  );
}

export default function AgentDashboard() {
  const [showModal, setShowModal] = useState(true);
  const [mood, setMood] = useState(3);
  const [energy, setEnergy] = useState<"low" | "medium" | "high" | null>(null);
  const [surveyDone, setSurveyDone] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [tasks, setTasks] = useState(TASKS);
  const [breakTimer, setBreakTimer] = useState(23);

  useEffect(() => {
    const interval = setInterval(() => {
      setBreakTimer((prev) => (prev > 0 ? prev - 1 : 15));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSurveySubmit = () => {
    setSurveyDone(true);
    setShowModal(false);
  };

  const handleSendFeedback = () => {
    if (feedback.trim()) {
      setFeedbackSent(true);
      setFeedback("");
      setTimeout(() => setFeedbackSent(false), 4000);
    }
  };

  const toggleTask = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const completedTasks = tasks.filter((t) => t.done).length;
  const currentMoodObj = MOODS[mood - 1];

  const priorityColor = (p: string) =>
    p === "high" ? COLORS.coral : p === "medium" ? COLORS.amber : "#94A3B8";

  return (
    <div className="p-6 space-y-6" style={{ background: COLORS.ghost, minHeight: "100%" }}>
      {/* Micro-Survey Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md" style={{ borderTop: `4px solid ${COLORS.mint}` }}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2" style={{ color: COLORS.navy }}>
              <HeartPulse size={20} style={{ color: COLORS.mint }} />
              Daily Wellness Check-In
            </DialogTitle>
            <DialogDescription>
              Takes 30 seconds. Helps us keep your workload balanced. 🌿
            </DialogDescription>
          </DialogHeader>

          {/* Mood Slider */}
          <div className="space-y-4 py-2">
            <div>
              <p className="text-sm font-medium mb-3" style={{ color: COLORS.navy }}>
                How are you feeling right now?
              </p>
              <div className="flex justify-between gap-1">
                {MOODS.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setMood(m.value)}
                    className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 transition-all duration-150 ${
                      mood === m.value ? "scale-105" : "opacity-60 hover:opacity-80"
                    }`}
                    style={{
                      borderColor: mood === m.value ? COLORS.mint : COLORS.border,
                      background: mood === m.value ? COLORS.teal : "white",
                    }}
                  >
                    <span className="text-2xl">{m.emoji}</span>
                    <span className="text-xs" style={{ color: COLORS.navy }}>{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Energy Level */}
            <div>
              <p className="text-sm font-medium mb-3" style={{ color: COLORS.navy }}>
                Energy Level
              </p>
              <div className="flex gap-2">
                {(["low", "medium", "high"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setEnergy(lvl)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium capitalize transition-all duration-150 border`}
                    style={{
                      background: energy === lvl
                        ? lvl === "high" ? COLORS.mint : lvl === "medium" ? COLORS.amber : COLORS.coral
                        : "white",
                      color: energy === lvl ? "white" : COLORS.navy,
                      borderColor: energy === lvl
                        ? lvl === "high" ? COLORS.mint : lvl === "medium" ? COLORS.amber : COLORS.coral
                        : COLORS.border,
                    }}
                  >
                    {lvl === "low" ? "🪫 Low" : lvl === "medium" ? "⚡ Medium" : "🚀 High"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleSurveySubmit}
            disabled={!energy}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-150 disabled:opacity-40"
            style={{ background: energy ? COLORS.mint : "#ccc" }}
          >
            Submit & Start My Day
          </button>
          <p className="text-xs text-center text-gray-400">
            Your responses are anonymous and help our AI optimize your schedule.
          </p>
        </DialogContent>
      </Dialog>

      {/* Welcome Banner */}
      <div
        className="rounded-2xl p-5 flex items-center gap-4"
        style={{ background: `linear-gradient(135deg, ${COLORS.navy} 0%, #243B55 100%)` }}
      >
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: COLORS.mint + "22" }}>
          {surveyDone ? currentMoodObj.emoji : "👋"}
        </div>
        <div className="flex-1">
          <h2 className="text-white font-semibold">Good morning, Sarah Chen!</h2>
          <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>
            {surveyDone
              ? `Feeling ${currentMoodObj.label.toLowerCase()} today — your schedule has been optimized.`
              : "Complete your wellness check-in to personalize your workday."}
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Wellness Score</p>
          <p className="text-3xl font-bold" style={{ color: COLORS.mint }}>82</p>
          <p className="text-xs" style={{ color: COLORS.mint }}>+4 this week</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Wellness Score", value: "82/100", icon: HeartPulse, color: COLORS.green, trend: "+4%" },
          { label: "Focus Streak", value: "6 Days", icon: Flame, color: COLORS.mint, trend: "Personal best!" },
          { label: "Tasks Done", value: `${completedTasks}/${tasks.length}`, icon: CheckCircle2, color: COLORS.amber, trend: "On track" },
          { label: "Next Break In", value: `${breakTimer} min`, icon: Coffee, color: COLORS.coral, trend: "Scheduled" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-4 border" style={{ borderColor: COLORS.border }}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500">{stat.label}</p>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: stat.color + "18" }}>
                <stat.icon size={14} style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-xl font-bold" style={{ color: COLORS.navy }}>{stat.value}</p>
            <p className="text-xs mt-0.5" style={{ color: stat.color }}>{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Focus Timer */}
        <div className="bg-white rounded-xl border p-5" style={{ borderColor: COLORS.border }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold" style={{ color: COLORS.navy }}>Focus Timer</h3>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: COLORS.teal, color: COLORS.navy }}>Active</span>
          </div>
          <div className="flex justify-center mb-4">
            <CircularProgress pct={75} label="Load" sublabel="" color={COLORS.mint} />
          </div>
          <div className="p-3 rounded-xl text-center" style={{ background: COLORS.teal }}>
            <p className="text-sm font-medium" style={{ color: COLORS.navy }}>
              Current Load: 75% · <span style={{ color: COLORS.mint }}>2 tasks remaining</span>
            </p>
            <p className="text-xs mt-0.5 text-gray-500">15-min recovery break in {breakTimer} min</p>
          </div>

          <div className="mt-4 space-y-1">
            {[
              { label: "Email Responses", pct: 90, color: COLORS.coral },
              { label: "Call Queue", pct: 60, color: COLORS.amber },
              { label: "Tickets", pct: 45, color: COLORS.mint },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-medium" style={{ color: COLORS.navy }}>{item.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: COLORS.border }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-xl border p-5" style={{ borderColor: COLORS.border }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold" style={{ color: COLORS.navy }}>Today's Tasks</h3>
            <div className="flex items-center gap-1 text-xs" style={{ color: COLORS.mint }}>
              <Target size={12} />
              <span>{completedTasks}/{tasks.length} done</span>
            </div>
          </div>
          <div className="space-y-2">
            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className="w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-150 hover:bg-gray-50"
                style={{ opacity: task.done ? 0.6 : 1 }}
              >
                <div
                  className="mt-0.5 w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-all"
                  style={{
                    background: task.done ? COLORS.mint : "transparent",
                    borderColor: task.done ? COLORS.mint : COLORS.border,
                  }}
                >
                  {task.done && <CheckCircle2 size={10} className="text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${task.done ? "line-through text-gray-400" : ""}`} style={{ color: task.done ? undefined : COLORS.navy }}>
                    {task.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{task.time}</p>
                </div>
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: priorityColor(task.priority) + "22", color: priorityColor(task.priority) }}
                >
                  {task.priority}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t" style={{ borderColor: COLORS.border }}>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: COLORS.border }}>
              <div
                className="h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${(completedTasks / tasks.length) * 100}%`, background: COLORS.mint }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">{Math.round((completedTasks / tasks.length) * 100)}% complete</p>
          </div>
        </div>

        {/* Anonymous Feedback Portal */}
        <div className="bg-white rounded-xl border p-5" style={{ borderColor: COLORS.border }}>
          <div className="flex items-center gap-2 mb-1">
            <Shield size={16} style={{ color: COLORS.mint }} />
            <h3 className="font-semibold" style={{ color: COLORS.navy }}>Anonymous Feedback</h3>
          </div>
          <p className="text-xs text-gray-400 mb-4">Your identity is protected. Share freely. 🔒</p>

          <div className="flex items-center gap-2 p-3 rounded-xl mb-4" style={{ background: COLORS.teal }}>
            <Lock size={14} style={{ color: COLORS.navy }} />
            <p className="text-xs" style={{ color: COLORS.navy }}>
              End-to-end encrypted · Anonymous · Secure storage
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: COLORS.navy }}>
                Category
              </label>
              <div className="flex flex-wrap gap-1.5">
                {["Workload", "Management", "Tools & Systems", "Team Culture", "Other"].map((cat) => (
                  <button
                    key={cat}
                    className="px-2.5 py-1 rounded-full text-xs border transition-all hover:border-teal-400"
                    style={{ borderColor: COLORS.border, color: COLORS.navy }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block" style={{ color: COLORS.navy }}>
                Your Feedback
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share what's on your mind... Your voice matters and helps improve the workplace for everyone."
                rows={4}
                className="w-full text-sm p-3 rounded-xl border resize-none outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: COLORS.border,
                  color: COLORS.navy,
                }}
              />
            </div>
            {feedbackSent && (
              <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: "#27AE6018", color: COLORS.green }}>
                <CheckCircle2 size={14} />
                <p className="text-xs font-medium">Feedback submitted anonymously. Thank you! ✨</p>
              </div>
            )}
            <button
              onClick={handleSendFeedback}
              disabled={!feedback.trim()}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white transition-all disabled:opacity-40"
              style={{ background: COLORS.mint }}
            >
              <Send size={14} />
              Submit Anonymously
            </button>
          </div>

          {/* Wellness Resources */}
          <div className="mt-4 pt-4 border-t" style={{ borderColor: COLORS.border }}>
            <p className="text-xs font-medium mb-2" style={{ color: COLORS.navy }}>Quick Resources</p>
            <div className="space-y-1.5">
              {[
                { icon: "🧘", label: "2-min breathing exercise" },
                { icon: "📞", label: "EAP Helpline (free & confidential)" },
                { icon: "⭐", label: "Recognition & kudos board" },
              ].map((r) => (
                <button key={r.label} className="w-full flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 py-1 transition-colors">
                  <span>{r.icon}</span>
                  <span>{r.label}</span>
                  <TrendingUp size={10} className="ml-auto" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Banner */}
      <div className="rounded-xl p-4 flex items-center gap-3" style={{ background: `linear-gradient(135deg, ${COLORS.mint}22 0%, ${COLORS.teal} 100%)`, border: `1px solid ${COLORS.mint}40` }}>
        <Star size={20} style={{ color: COLORS.mint }} />
        <div>
          <p className="text-sm font-semibold" style={{ color: COLORS.navy }}>🎉 6-Day Wellness Streak!</p>
          <p className="text-xs text-gray-500">You've maintained a healthy score for 6 consecutive days. Keep it up!</p>
        </div>
        <button className="ml-auto text-xs font-medium px-3 py-1.5 rounded-lg" style={{ background: COLORS.mint, color: "white" }}>
          View Badges
        </button>
      </div>
    </div>
  );
}
