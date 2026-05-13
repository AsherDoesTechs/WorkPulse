import { useState } from "react";
import { Bell, Mail, Smartphone, Volume2, Shield, Globe } from "lucide-react";

const COLORS = {
  navy: "#1A2B3C",
  mint: "#48C9B0",
  teal: "#E0F2F1",
  ghost: "#F8F9FA",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    soundAlerts: false,
    workloadWarnings: true,
    slaBreaches: true,
    weeklyReports: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const notificationItems = [
    {
      key: "emailAlerts",
      title: "Email Alerts",
      description: "Receive important updates and wellness alerts via email.",
      icon: Mail,
    },
    {
      key: "pushNotifications",
      title: "Push Notifications",
      description: "Enable real-time notifications on your mobile devices.",
      icon: Smartphone,
    },
    {
      key: "soundAlerts",
      title: "Sound Alerts",
      description: "Play audio alerts for critical team updates.",
      icon: Volume2,
    },
    {
      key: "workloadWarnings",
      title: "Workload Warnings",
      description: "Get notified when workload thresholds are exceeded.",
      icon: Bell,
    },
    {
      key: "slaBreaches",
      title: "SLA Breach Alerts",
      description: "Instant alerts for SLA risks and escalations.",
      icon: Shield,
    },
    {
      key: "weeklyReports",
      title: "Weekly Wellness Reports",
      description: "Receive wellness summaries every Monday morning.",
      icon: Globe,
    },
  ];

  return (
    <div
      className="min-h-screen px-6 py-6"
      style={{ background: COLORS.ghost }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: COLORS.navy }}
          >
            Notifications
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage alerts, reminders, and system notifications.
          </p>
        </div>

        {/* Notifications Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Top Section */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: COLORS.teal }}
            >
              <Bell size={20} style={{ color: COLORS.mint }} />
            </div>

            <div>
              <h2
                className="text-lg font-semibold"
                style={{ color: COLORS.navy }}
              >
                Notification Preferences
              </h2>

              <p className="text-xs text-gray-400">
                Customize how WorkPulse communicates with you.
              </p>
            </div>
          </div>

          {/* Notification Items */}
          <div className="p-6 space-y-4">
            {notificationItems.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: COLORS.teal }}
                  >
                    <item.icon size={20} style={{ color: COLORS.mint }} />
                  </div>

                  <div>
                    <h3
                      className="text-sm font-semibold"
                      style={{ color: COLORS.navy }}
                    >
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Toggle */}
                <button
                  onClick={() =>
                    toggleNotification(item.key as keyof typeof notifications)
                  }
                  className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                    notifications[item.key as keyof typeof notifications]
                      ? "bg-[#48C9B0]"
                      : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${
                      notifications[item.key as keyof typeof notifications]
                        ? "left-8"
                        : "left-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Status Card */}
        <div
          className="mt-6 rounded-2xl p-6 text-white"
          style={{ background: COLORS.navy }}
        >
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-semibold">Notification Status</h3>

              <p className="text-sm text-white/60 mt-1">
                Your team wellness monitoring system is currently active.
              </p>
            </div>

            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#27AE60" }}
              />
              <span className="text-sm font-medium">Notifications Enabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
