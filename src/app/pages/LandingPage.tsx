import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Zap, ArrowRight, CheckCircle, TrendingUp, Shield, Users, BarChart3, Activity } from "lucide-react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const HERO_BG = "https://images.unsplash.com/photo-1766066014237-00645c74e9c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWxsJTIwY2VudGVyJTIwb2ZmaWNlJTIwd29ya3NwYWNlfGVufDF8fHx8MTc3ODQxMTM1OXww&ixlib=rb-4.1.0&q=80&w=1080";

const CASE_STUDIES = [
  {
    tag: "WAIT TIME OPTIMIZATION",
    tagColor: "#48C9B0",
    company: "Alorica",
    title: "Decreased Wait Times",
    desc: "Reduced customer waiting times and improved service consistency through optimized call routing and balanced agent workloads.",
    metric: "–34%",
    metricLabel: "Avg. Wait Time",
  },
  {
    tag: "RETENTION STRATEGY",
    tagColor: "#F39C12",
    company: "TTEC",
    title: "Reduced Turnover",
    desc: "Leveraging predictive burnout analytics and smart scheduling to increase agent satisfaction and lower costly attrition rates.",
    metric: "+28%",
    metricLabel: "Retention Rate",
  },
  {
    tag: "BURNOUT PREVENTION",
    tagColor: "#F1948A",
    company: "Accenture",
    title: "Workload Health",
    desc: "Proactively identifying employees at risk of fatigue caused by high project pressure and strict global deadlines.",
    metric: "–41%",
    metricLabel: "Burnout Incidents",
  },
];

const FEATURES = [
  { icon: Activity, label: "Real-time Wellness Monitoring", color: "#48C9B0" },
  { icon: BarChart3, label: "Predictive Burnout Analytics", color: "#27AE60" },
  { icon: Users, label: "Team Leader Command Center", color: "#F39C12" },
  { icon: Shield, label: "Anonymous Feedback Portal", color: "#1A2B3C" },
];

export function LandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav style={{ background: "#1A2B3C" }} className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#48C9B0] flex items-center justify-center">
                <Zap size={16} className="text-[#1A2B3C]" strokeWidth={2.5} />
              </div>
              <span className="text-white font-semibold text-lg tracking-wide">WorkPulse</span>
            </div>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-8">
              {["Product", "Solutions", "Case Studies", "Pricing"].map((item) => (
                <button
                  key={item}
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="hidden sm:block text-white/70 hover:text-white text-sm transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-[#48C9B0] hover:bg-[#3ab89f] text-[#1A2B3C] text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Request Demo
              </button>
              {/* Mobile menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white/70 hover:text-white ml-1"
              >
                <div className="flex flex-col gap-1.5 w-5">
                  <span className="block h-0.5 bg-current rounded-full" />
                  <span className="block h-0.5 bg-current rounded-full" />
                  <span className="block h-0.5 bg-current rounded-full" />
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 px-4 py-3 space-y-2">
            {["Product", "Solutions", "Case Studies", "Pricing"].map((item) => (
              <button key={item} className="block text-white/70 hover:text-white text-sm py-1.5 w-full text-left">
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#E0F2F1] text-[#1A2B3C] px-3 py-1.5 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-[#48C9B0]" />
                <span className="text-xs font-medium">AI-Powered BPO Wellness Platform</span>
              </div>
              <h1 className="text-[#1A2B3C] mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 700, lineHeight: 1.15 }}>
                From Burnout
                <br />
                to Balance.
              </h1>
              <p className="text-[#1A2B3C]/60 mb-8 max-w-md" style={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
                The AI-driven workforce engine for modern BPOs designed to optimize performance and employee wellness—in real time.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="bg-[#48C9B0] hover:bg-[#3ab89f] text-[#1A2B3C] font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
                >
                  Get Started Free
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="border border-[#E9ECEF] text-[#1A2B3C] hover:bg-[#F8F9FA] font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  View Live Demo
                </button>
              </div>
              <div className="flex flex-wrap gap-4">
                {["No credit card required", "14-day free trial", "GDPR compliant"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-sm text-[#1A2B3C]/50">
                    <CheckCircle size={14} className="text-[#27AE60]" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div
                className="rounded-2xl overflow-hidden shadow-2xl border border-[#E9ECEF]"
                style={{ background: "#E0F2F1" }}
              >
                {/* Mini browser chrome */}
                <div className="bg-[#1A2B3C]/5 px-4 py-2.5 flex items-center gap-2 border-b border-white/50">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F1948A]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F39C12]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27AE60]" />
                  </div>
                  <div className="flex-1 bg-white/60 rounded text-center text-xs text-[#1A2B3C]/40 py-0.5">
                    workpulse.io/dashboard
                  </div>
                </div>
                <div className="p-6">
                  {/* Mini dashboard preview */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { label: "Wellness Score", value: "84%", color: "#27AE60" },
                      { label: "At-Risk Agents", value: "3", color: "#F1948A" },
                      { label: "SLA Compliance", value: "97.2%", color: "#48C9B0" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white rounded-xl p-3 shadow-sm">
                        <p style={{ fontSize: "10px", color: "#1A2B3C", opacity: 0.5 }} className="mb-1 uppercase tracking-wide">
                          {stat.label}
                        </p>
                        <p style={{ fontSize: "1.25rem", fontWeight: 700, color: stat.color }}>
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  {/* Pulse line */}
                  <div className="bg-white rounded-xl p-3 shadow-sm mb-3">
                    <p style={{ fontSize: "10px", color: "#1A2B3C", opacity: 0.5 }} className="mb-2 uppercase tracking-wide">
                      Team Wellness Pulse
                    </p>
                    <svg width="100%" height="40" viewBox="0 0 200 40" fill="none">
                      <polyline
                        points="0,30 20,28 40,20 60,22 80,15 100,18 120,10 140,14 160,8 180,12 200,10"
                        stroke="#48C9B0"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <polyline
                        points="0,30 20,28 40,20 60,22 80,15 100,18 120,10 140,14 160,8 180,12 200,10"
                        stroke="#48C9B0"
                        strokeWidth="8"
                        fill="none"
                        strokeOpacity="0.1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {/* Heatmap preview */}
                  <div className="flex gap-2">
                    {["#27AE60", "#27AE60", "#F39C12", "#27AE60", "#F1948A", "#27AE60"].map((color, i) => (
                      <div
                        key={i}
                        className="flex-1 h-8 rounded-lg opacity-80"
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                  <p className="text-center text-[#1A2B3C]/40 mt-3" style={{ fontSize: "11px" }}>
                    Dashboard Preview
                  </p>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2.5 border border-[#E9ECEF]"
              >
                <div className="w-8 h-8 rounded-full bg-[#E0F2F1] flex items-center justify-center">
                  <TrendingUp size={14} className="text-[#27AE60]" />
                </div>
                <div>
                  <p style={{ fontSize: "11px", fontWeight: 600, color: "#1A2B3C" }}>SLA Improved</p>
                  <p style={{ fontSize: "10px", color: "#27AE60" }}>+12% this month</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="py-10 border-y border-[#E9ECEF] bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: color + "15" }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <p className="text-sm font-medium text-[#1A2B3C]/80">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section style={{ background: "#1A2B3C" }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 style={{ color: "#48C9B0", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 600 }}>
              Proven Solutions for BPO Challenges
            </h2>
            <p className="text-white/50 mt-3 text-sm">
              Trusted by leading contact centers worldwide
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {CASE_STUDIES.map((cs, i) => (
              <motion.div
                key={cs.company}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 hover:border-[#48C9B0]/30 rounded-xl p-6 group cursor-pointer transition-all hover:bg-white/8"
              >
                <div
                  className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4"
                  style={{ background: cs.tagColor + "20", color: cs.tagColor, letterSpacing: "0.08em" }}
                >
                  {cs.tag}
                </div>
                <h3 style={{ color: "white", fontSize: "1.15rem", fontWeight: 600, marginBottom: "4px" }}>
                  {cs.company}: {cs.title}
                </h3>
                <p className="text-white/50 text-sm mb-5 leading-relaxed">{cs.desc}</p>
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <p style={{ color: cs.tagColor, fontSize: "1.5rem", fontWeight: 700 }}>{cs.metric}</p>
                    <p className="text-white/40 text-xs">{cs.metricLabel}</p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-white/20 group-hover:text-[#48C9B0] transition-colors"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-[#E0F2F1]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 style={{ color: "#1A2B3C", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700 }} className="mb-4">
            Ready to protect your team from burnout?
          </h2>
          <p className="text-[#1A2B3C]/60 mb-8">
            Join 200+ BPO companies using WorkPulse to improve wellness and productivity simultaneously.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-[#1A2B3C] hover:bg-[#243344] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors inline-flex items-center gap-2"
          >
            Enter the Platform
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#1A2B3C" }} className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#48C9B0] flex items-center justify-center">
              <Zap size={12} className="text-[#1A2B3C]" strokeWidth={2.5} />
            </div>
            <span className="text-white/60 text-sm">WorkPulse Inc.</span>
          </div>
          <p className="text-white/30 text-sm">
            © 2026 WorkPulse Inc. Designed for Modern BPO Excellence.
          </p>
          <div className="flex gap-4">
            {["Privacy", "Terms", "Security"].map((item) => (
              <button key={item} className="text-white/30 hover:text-white/60 text-xs transition-colors">
                {item}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
