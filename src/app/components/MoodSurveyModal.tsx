import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

interface Props {
  open: boolean;
  onClose: () => void;
}

const MOODS = [
  { emoji: "😫", label: "Exhausted", value: 1 },
  { emoji: "😟", label: "Stressed", value: 2 },
  { emoji: "😐", label: "Neutral", value: 3 },
  { emoji: "🙂", label: "Good", value: 4 },
  { emoji: "😄", label: "Energized", value: 5 },
];

const ENERGY_LEVELS = [
  { label: "Low", color: "#F1948A", desc: "I'm running on empty" },
  { label: "Medium", color: "#F39C12", desc: "Getting through the day" },
  { label: "High", color: "#27AE60", desc: "Feeling great today!" },
];

export function MoodSurveyModal({ open, onClose }: Props) {
  const [moodValue, setMoodValue] = useState(3);
  const [energy, setEnergy] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const currentMood = MOODS[moodValue - 1];

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setMoodValue(3);
      setEnergy(null);
      setNote("");
    }, 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#1A2B3C]/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#1A2B3C] px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#48C9B0] flex items-center justify-center">
                    <Zap size={15} className="text-[#1A2B3C]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Daily Wellness Check-In</h3>
                    <p className="text-white/50 text-xs mt-0.5">Takes about 30 seconds</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/40 hover:text-white transition-colors p-1"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="px-6 py-6">
              {!submitted ? (
                <>
                  {/* Mood Slider */}
                  <div className="mb-6">
                    <label className="text-[#1A2B3C] font-semibold mb-4 block">
                      How are you feeling today?
                    </label>
                    {/* Emoji Display */}
                    <div className="flex justify-center mb-5">
                      <motion.div
                        key={moodValue}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col items-center"
                      >
                        <span style={{ fontSize: "3.5rem" }}>{currentMood.emoji}</span>
                        <span className="text-sm font-medium text-[#1A2B3C]/60 mt-1">
                          {currentMood.label}
                        </span>
                      </motion.div>
                    </div>
                    {/* Slider */}
                    <div className="px-2">
                      <Slider
                        min={1}
                        max={5}
                        step={1}
                        value={[moodValue]}
                        onValueChange={(val) => setMoodValue(val[0])}
                        className="mb-3"
                      />
                      <div className="flex justify-between text-lg mt-1">
                        {MOODS.map((m) => (
                          <button
                            key={m.value}
                            onClick={() => setMoodValue(m.value)}
                            className={`transition-all ${moodValue === m.value ? "scale-125" : "opacity-50 hover:opacity-75"}`}
                          >
                            {m.emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Energy Level */}
                  <div className="mb-6">
                    <label className="text-[#1A2B3C] font-semibold mb-3 block">
                      Energy Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {ENERGY_LEVELS.map((lvl) => (
                        <button
                          key={lvl.label}
                          onClick={() => setEnergy(lvl.label)}
                          className={`p-3 rounded-xl border-2 transition-all text-center ${
                            energy === lvl.label
                              ? "border-current shadow-sm"
                              : "border-[#E9ECEF] hover:border-gray-300"
                          }`}
                          style={energy === lvl.label ? { borderColor: lvl.color, background: lvl.color + "15" } : {}}
                        >
                          <p
                            className="font-semibold text-sm"
                            style={{ color: energy === lvl.label ? lvl.color : "#1A2B3C" }}
                          >
                            {lvl.label}
                          </p>
                          <p className="text-xs text-[#1A2B3C]/40 mt-0.5 leading-tight">
                            {lvl.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Optional Note */}
                  <div className="mb-6">
                    <label className="text-[#1A2B3C] font-semibold mb-2 block text-sm">
                      Anything on your mind? <span className="text-[#1A2B3C]/40 font-normal">(optional)</span>
                    </label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Share how you're really feeling..."
                      rows={2}
                      className="w-full border border-[#E9ECEF] rounded-xl px-3 py-2.5 text-sm text-[#1A2B3C] placeholder:text-[#1A2B3C]/30 resize-none focus:outline-none focus:border-[#48C9B0] transition-colors"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={onClose}
                      className="flex-1 py-2.5 text-sm text-[#1A2B3C]/50 hover:text-[#1A2B3C] border border-[#E9ECEF] rounded-xl hover:bg-[#F8F9FA] transition-colors"
                    >
                      Skip today
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!energy}
                      className="flex-1 py-2.5 text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
                      style={{ background: "#48C9B0", color: "#1A2B3C" }}
                    >
                      Submit Check-In
                    </button>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-[#1A2B3C] font-semibold mb-2">Check-in Complete!</h3>
                  <p className="text-[#1A2B3C]/50 text-sm">
                    Your wellness data has been logged. Have a great shift!
                  </p>
                  <div className="mt-4 h-1.5 rounded-full bg-[#E0F2F1] overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.8 }}
                      className="h-full rounded-full bg-[#48C9B0]"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
