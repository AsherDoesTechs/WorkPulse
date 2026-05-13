import { useState } from "react";
import {
  Bell,
  ChevronRight,
  Check,
  X,
  Activity,
  Users,
  Clock,
  AlertTriangle,
  Shield,
  MessageSquare,
  BarChart2,
  Smartphone,
  Star,
  Heart,
  Coffee,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";

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

function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto ${className}`}
      style={{
        width: 280,
        background: COLORS.navy,
        borderRadius: 44,
        padding: "10px 6px",
        boxShadow:
          "0 30px 80px rgba(26,43,60,0.35), 0 0 0 2px rgba(255,255,255,0.1)",
      }}
    >
      {/* Notch */}
      <div
        className="mx-auto mb-2 rounded-full"
        style={{
          width: 90,
          height: 26,
          background: "#0A1520",
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: "#1E3A5F" }}
        />
        <div
          className="w-3 h-3 rounded-full"
          style={{ background: "#1E3A5F" }}
        />
      </div>
      {/* Screen */}
      <div
        className="overflow-hidden"
        style={{ borderRadius: 36, background: "white", minHeight: 540 }}
      >
        {children}
      </div>
      {/* Home indicator */}
      <div className="flex justify-center mt-2">
        <div
          className="w-20 h-1 rounded-full"
          style={{ background: "rgba(255,255,255,0.3)" }}
        />
      </div>
    </div>
  );
}

function NotificationScreen() {
  const [dismissed, setDismissed] = useState(false);
  return (
    <div style={{ background: "#0A1520", minHeight: 540, padding: "20px 0 0" }}>
      {/* Status bar */}
      <div className="flex justify-between px-5 mb-6">
        <span className="text-xs text-white/80">9:41 AM</span>
        <div className="flex gap-1">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-1 rounded-sm"
                style={{
                  height: i * 3 + 2,
                  background: "white",
                  opacity: i <= 3 ? 1 : 0.3,
                }}
              />
            ))}
          </div>
          <span className="text-xs text-white/80">100%</span>
        </div>
      </div>

      {/* Lock screen time */}
      <div className="text-center mb-6">
        <p className="text-white/60 text-xs">Sunday, May 10</p>
        <p
          className="text-white font-light"
          style={{ fontSize: 56, lineHeight: 1 }}
        >
          9:41
        </p>
      </div>

      {/* WorkPulse Notification */}
      {!dismissed ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-4 p-3.5 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex items-start gap-2.5 mb-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: COLORS.mint }}
            >
              <Activity size={14} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-white">WorkPulse</p>
                <p className="text-xs text-white/40">now</p>
              </div>
              <p className="text-xs text-white/80 font-medium mt-0.5">
                ⚠️ Team Alpha Stress Spike
              </p>
            </div>
          </div>
          <p className="text-xs text-white/60 mb-3">
            3 agents in Team Alpha show elevated stress indicators. Recommended:
            immediate check-in or task redistribution.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setDismissed(true)}
              className="flex-1 py-2 rounded-xl text-xs font-semibold text-white"
              style={{ background: COLORS.mint }}
            >
              View Details
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="px-3 py-2 rounded-xl text-xs text-white/60"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-4 p-3.5 rounded-2xl text-center"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <Check size={20} className="text-white/40 mx-auto mb-2" />
          <p className="text-xs text-white/40">Notification dismissed</p>
          <button
            onClick={() => setDismissed(false)}
            className="text-xs mt-1"
            style={{ color: COLORS.mint }}
          >
            Show again
          </button>
        </motion.div>
      )}

      <div className="text-center mt-6">
        <p className="text-xs text-white/20">Swipe up to unlock</p>
      </div>
    </div>
  );
}

function SwipeApproveScreen() {
  const [swipeX, setSwipeX] = useState(0);
  const [approved, setApproved] = useState<boolean | null>(null);
  const maxSwipe = 180;

  const handleApprove = () => {
    setApproved(true);
    setTimeout(() => setApproved(null), 2000);
  };

  const handleDecline = () => {
    setApproved(false);
    setTimeout(() => setApproved(null), 2000);
  };

  return (
    <div style={{ minHeight: 540 }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3" style={{ background: COLORS.navy }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: COLORS.mint }}
            >
              <Activity size={12} className="text-white" />
            </div>
            <span className="text-white text-xs font-semibold">WorkPulse</span>
          </div>
          <Bell size={14} className="text-white/60" />
        </div>
        <h2 className="text-white text-sm font-semibold">Pending Approvals</h2>
        <p
          className="text-xs mt-0.5"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          2 requests need your attention
        </p>
      </div>

      <div className="p-4 space-y-3">
        {/* Shift Swap Card */}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ borderColor: COLORS.border }}
        >
          <div className="p-3" style={{ background: COLORS.amber + "12" }}>
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: "#B45309" }}
              >
                LN
              </div>
              <div>
                <p
                  className="text-xs font-semibold"
                  style={{ color: COLORS.navy }}
                >
                  Leila Nguyen
                </p>
                <p className="text-xs text-gray-400">Shift Swap Request</p>
              </div>
              <span
                className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: COLORS.amber + "20", color: COLORS.amber }}
              >
                Pending
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div
                className="flex-1 p-2 rounded-lg text-center"
                style={{ background: "white" }}
              >
                <p className="font-medium" style={{ color: COLORS.navy }}>
                  Tue May 13
                </p>
                <p className="text-xs text-gray-400">9AM–6PM</p>
              </div>
              <ArrowRight size={12} className="flex-shrink-0" />
              <div
                className="flex-1 p-2 rounded-lg text-center"
                style={{ background: "white" }}
              >
                <p className="font-medium" style={{ color: COLORS.navy }}>
                  Wed May 14
                </p>
                <p className="text-xs text-gray-400">10AM–7PM</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Reason: Medical appointment · Coverage: Carlos Reyes
            </p>
          </div>

          {/* Swipe to Approve */}
          {approved === null ? (
            <div className="p-3">
              <p className="text-xs text-center text-gray-400 mb-2">
                Swipe to decide
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleDecline}
                  className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl text-xs font-medium border transition-all hover:bg-red-50"
                  style={{
                    borderColor: COLORS.coral + "60",
                    color: COLORS.coral,
                  }}
                >
                  <X size={13} />
                  Decline
                </button>
                <button
                  onClick={handleApprove}
                  className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl text-xs font-medium text-white transition-all"
                  style={{ background: COLORS.mint }}
                >
                  <Check size={13} />
                  Approve
                </button>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 text-center"
              style={{
                background: approved
                  ? COLORS.green + "15"
                  : COLORS.coral + "15",
              }}
            >
              <p
                className="text-xs font-medium"
                style={{ color: approved ? COLORS.green : COLORS.coral }}
              >
                {approved ? "✓ Shift Swap Approved" : "✗ Request Declined"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Notification sent to Leila
              </p>
            </motion.div>
          )}
        </div>

        {/* OT Request */}
        <div
          className="rounded-2xl border p-3"
          style={{ borderColor: COLORS.border }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "#047857" }}
            >
              JO
            </div>
            <div>
              <p
                className="text-xs font-semibold"
                style={{ color: COLORS.navy }}
              >
                James O'Brien
              </p>
              <p className="text-xs text-gray-400">Overtime Request · +2h</p>
            </div>
            <span
              className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: COLORS.mint + "20", color: COLORS.mint }}
            >
              New
            </span>
          </div>
          <p className="text-xs text-gray-400 mb-2">
            Thursday May 15 · 6PM–8PM · Queue backup
          </p>
          <div className="flex gap-2">
            <button
              className="flex-1 py-2 rounded-xl text-xs font-medium border transition-all"
              style={{ borderColor: COLORS.border, color: COLORS.navy }}
            >
              Decline
            </button>
            <button
              className="flex-1 py-2 rounded-xl text-xs font-medium text-white"
              style={{ background: COLORS.mint }}
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WellnessCheckScreen() {
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState(3);

  return (
    <div style={{ minHeight: 540 }}>
      <div className="px-4 pt-4 pb-3" style={{ background: COLORS.navy }}>
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: COLORS.mint }}
          >
            <Heart size={12} className="text-white" />
          </div>
          <span className="text-white text-xs font-semibold">
            Wellness Check
          </span>
        </div>
      </div>

      <div className="p-4">
        {step === 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p
              className="text-sm font-semibold mb-1"
              style={{ color: COLORS.navy }}
            >
              How are you feeling?
            </p>
            <p className="text-xs text-gray-400 mb-4">
              Quick 2-question check-in
            </p>
            <div className="grid grid-cols-5 gap-1 mb-4">
              {["😫", "😟", "😐", "🙂", "😄"].map((emoji, i) => (
                <button
                  key={i}
                  onClick={() => setMood(i + 1)}
                  className="flex flex-col items-center py-2 rounded-xl transition-all"
                  style={{
                    background: mood === i + 1 ? COLORS.teal : COLORS.ghost,
                    border: `2px solid ${mood === i + 1 ? COLORS.mint : "transparent"}`,
                  }}
                >
                  <span className="text-xl">{emoji}</span>
                  <span
                    className="text-xs mt-0.5"
                    style={{ color: COLORS.navy, fontSize: 9 }}
                  >
                    {["Bad", "Meh", "Ok", "Good", "Great"][i]}
                  </span>
                </button>
              ))}
            </div>

            <div className="mb-4">
              <p
                className="text-xs font-medium mb-2"
                style={{ color: COLORS.navy }}
              >
                Energy Level
              </p>
              <div className="flex gap-2">
                {["🪫 Low", "⚡ Med", "🚀 High"].map((lvl) => (
                  <button
                    key={lvl}
                    className="flex-1 py-2 rounded-xl text-xs font-medium border"
                    style={{ borderColor: COLORS.border, color: COLORS.navy }}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white"
              style={{ background: COLORS.mint }}
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="text-center py-4">
              <div className="text-4xl mb-2">
                {["😫", "😟", "😐", "🙂", "😄"][mood - 1]}
              </div>
              <p className="font-semibold" style={{ color: COLORS.navy }}>
                Check-in Complete!
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Your schedule has been optimized
              </p>
            </div>

            <div className="space-y-2 mb-4">
              {[
                {
                  icon: Coffee,
                  text: "Break scheduled at 11:30 AM",
                  color: COLORS.mint,
                },
                {
                  icon: BarChart2,
                  text: "2 tasks reassigned to reduce load",
                  color: COLORS.amber,
                },
                {
                  icon: Shield,
                  text: "Data anonymized & stored securely",
                  color: COLORS.green,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl"
                  style={{ background: item.color + "12" }}
                >
                  <item.icon size={13} style={{ color: item.color }} />
                  <p className="text-xs" style={{ color: COLORS.navy }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep(0)}
              className="w-full py-2.5 rounded-xl text-xs font-medium border"
              style={{ borderColor: COLORS.border, color: COLORS.navy }}
            >
              <RefreshCw size={11} className="inline mr-1" />
              Reset Demo
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

const PHONE_SCREENS = [
  {
    id: "notification",
    title: "Push Notifications",
    desc: "Instant team stress alerts with one-tap action",
    icon: Bell,
    component: NotificationScreen,
  },
  {
    id: "approve",
    title: "Quick Approvals",
    desc: "Approve shift swaps & overtime with a tap",
    icon: Check,
    component: SwipeApproveScreen,
  },
  {
    id: "wellness",
    title: "Wellness Check-In",
    desc: "Daily mood & energy tracking on the go",
    icon: Heart,
    component: WellnessCheckScreen,
  },
];

export default function MobileMockup() {
  const [activeScreen, setActiveScreen] = useState(0);

  return (
    <div
      className="p-6 space-y-8"
      style={{ background: COLORS.ghost, minHeight: "100%" }}
    >
      {/* Header */}
      <div
        className="rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        style={{
          background: `linear-gradient(135deg, ${COLORS.navy} 0%, #243B55 100%)`,
        }}
      >
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: COLORS.mint + "22" }}
        >
          <Smartphone size={22} style={{ color: COLORS.mint }} />
        </div>
        <div>
          <h2 className="text-white font-semibold">Mobile Experience</h2>
          <p
            className="text-sm mt-0.5"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            WorkPulse on the go — iOS & Android companion app
          </p>
        </div>
        <div
          className="sm:ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
          style={{ background: COLORS.mint + "22", color: COLORS.mint }}
        >
          <Star size={11} />
          React Native-ready designs
        </div>
      </div>

      {/* Screen Selector */}
      <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
        <div className="flex gap-3">
          {PHONE_SCREENS.map((screen, i) => (
            <button
              key={screen.id}
              onClick={() => setActiveScreen(i)}
              className="flex flex-col items-center gap-2 px-4 py-3 rounded-2xl border transition-all duration-200"
              style={{
                borderColor: activeScreen === i ? COLORS.mint : COLORS.border,
                background: activeScreen === i ? COLORS.teal : "white",
                minWidth: 100,
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: activeScreen === i ? COLORS.mint : COLORS.ghost,
                }}
              >
                <screen.icon
                  size={16}
                  style={{ color: activeScreen === i ? "white" : COLORS.navy }}
                />
              </div>
              <p
                className="text-xs font-medium text-center leading-tight"
                style={{ color: COLORS.navy }}
              >
                {screen.title}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Phone Mockup */}
      <div className="flex flex-col items-center gap-6">
        <motion.div
          key={activeScreen}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <PhoneFrame>
            {activeScreen === 0 && <NotificationScreen />}
            {activeScreen === 1 && <SwipeApproveScreen />}
            {activeScreen === 2 && <WellnessCheckScreen />}
          </PhoneFrame>
        </motion.div>

        <div className="text-center max-w-sm">
          <h3 className="font-semibold mb-1" style={{ color: COLORS.navy }}>
            {PHONE_SCREENS[activeScreen].title}
          </h3>
          <p className="text-sm text-gray-500">
            {PHONE_SCREENS[activeScreen].desc}
          </p>
        </div>
      </div>

      {/* Mobile Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            icon: Bell,
            title: "Smart Push Alerts",
            desc: "Priority-filtered notifications. No alert fatigue — only what matters, when it matters.",
            color: COLORS.coral,
          },
          {
            icon: Check,
            title: "One-Tap Approvals",
            desc: "Approve shift swaps and overtime requests in seconds, right from your lock screen.",
            color: COLORS.mint,
          },
          {
            icon: Heart,
            title: "Daily Check-Ins",
            desc: "30-second wellness pulse surveys with AI-powered schedule optimization.",
            color: COLORS.amber,
          },
          {
            icon: Users,
            title: "Team Overview",
            desc: "Monitor your team's real-time wellness status from anywhere in the world.",
            color: COLORS.green,
          },
          {
            icon: MessageSquare,
            title: "Anonymous Feedback",
            desc: "Submit encrypted, anonymous feedback on the go. Your identity, protected always.",
            color: COLORS.navy,
          },
          {
            icon: BarChart2,
            title: "Dashboard Access",
            desc: "Full executive and team dashboards optimized for mobile viewing and interaction.",
            color: "#7C3AED",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-xl border p-4"
            style={{ borderColor: COLORS.border }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
              style={{ background: feature.color + "18" }}
            >
              <feature.icon size={16} style={{ color: feature.color }} />
            </div>
            <p
              className="text-sm font-semibold mb-1"
              style={{ color: COLORS.navy }}
            >
              {feature.title}
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      {/* App Store Badges */}
      <div className="flex flex-col items-center gap-3 py-4">
        <p className="text-sm font-medium text-gray-400">
          Available on all platforms
        </p>
        <div className="flex gap-3">
          {["📱 iOS App Store", "🤖 Google Play", "🌐 Web App"].map(
            (platform) => (
              <div
                key={platform}
                className="px-4 py-2 rounded-xl border text-xs font-medium cursor-pointer hover:shadow-sm transition-all"
                style={{
                  borderColor: COLORS.border,
                  color: COLORS.navy,
                  background: "white",
                }}
              >
                {platform}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
