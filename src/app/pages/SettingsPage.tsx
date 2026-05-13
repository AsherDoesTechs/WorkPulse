import { useState } from "react";
import {
  Settings,
  Shield,
  Moon,
  Smartphone,
  Globe,
  Lock,
  User,
  Save,
} from "lucide-react";

const COLORS = {
  navy: "#1A2B3C",
  mint: "#48C9B0",
  teal: "#E0F2F1",
  ghost: "#F8F9FA",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    darkMode: false,
    twoFactorAuth: true,
    mobileSync: true,
    autoUpdates: true,
    language: "English",
    timezone: "GMT+8 Philippines",
  });

  const toggleSetting = (key: keyof typeof settings) => {
    if (typeof settings[key] === "boolean") {
      setSettings((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    }
  };

  const settingsItems = [
    {
      key: "darkMode",
      title: "Dark Mode",
      description: "Switch between light and dark appearance.",
      icon: Moon,
    },
    {
      key: "twoFactorAuth",
      title: "Two-Factor Authentication",
      description: "Add an extra layer of account security.",
      icon: Shield,
    },
    {
      key: "mobileSync",
      title: "Mobile Sync",
      description: "Sync your dashboard across all devices.",
      icon: Smartphone,
    },
    {
      key: "autoUpdates",
      title: "Automatic Updates",
      description: "Keep your system updated automatically.",
      icon: Lock,
    },
  ];

  return (
    <div
      className="min-h-screen px-6 py-6"
      style={{ background: COLORS.ghost }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: COLORS.navy }}
          >
            Settings
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage account preferences and system configurations.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="xl:col-span-2 space-y-6">
            {/* General Settings */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: COLORS.teal }}
                >
                  <Settings size={20} style={{ color: COLORS.mint }} />
                </div>

                <div>
                  <h2
                    className="text-lg font-semibold"
                    style={{ color: COLORS.navy }}
                  >
                    General Preferences
                  </h2>

                  <p className="text-xs text-gray-400">
                    Customize your WorkPulse experience.
                  </p>
                </div>
              </div>

              {/* Settings Items */}
              <div className="p-6 space-y-4">
                {settingsItems.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                  >
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
                        toggleSetting(item.key as keyof typeof settings)
                      }
                      className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                        settings[item.key as keyof typeof settings]
                          ? "bg-[#48C9B0]"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${
                          settings[item.key as keyof typeof settings]
                            ? "left-8"
                            : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional Settings */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: COLORS.teal }}
                >
                  <Globe size={20} style={{ color: COLORS.mint }} />
                </div>

                <div>
                  <h2
                    className="text-lg font-semibold"
                    style={{ color: COLORS.navy }}
                  >
                    Language & Region
                  </h2>

                  <p className="text-xs text-gray-400">
                    Adjust localization preferences.
                  </p>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Language */}
                <div>
                  <label className="block text-xs text-gray-400 mb-2">
                    Preferred Language
                  </label>

                  <select
                    value={settings.language}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        language: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                  >
                    <option>English</option>
                    <option>Filipino</option>
                    <option>Japanese</option>
                    <option>Korean</option>
                  </select>
                </div>

                {/* Timezone */}
                <div>
                  <label className="block text-xs text-gray-400 mb-2">
                    Timezone
                  </label>

                  <select
                    value={settings.timezone}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        timezone: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2"
                  >
                    <option>GMT+8 Philippines</option>
                    <option>GMT+9 Japan</option>
                    <option>GMT-5 EST</option>
                    <option>GMT+0 UTC</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-semibold"
                  style={{ background: COLORS.mint }}
                >
                  JR
                </div>

                <h3
                  className="mt-4 text-lg font-semibold"
                  style={{ color: COLORS.navy }}
                >
                  Jamie Rivera
                </h3>

                <p className="text-sm text-gray-400">Team Lead · Alpha Squad</p>

                <div
                  className="mt-4 px-4 py-2 rounded-full text-xs font-medium"
                  style={{
                    background: COLORS.teal,
                    color: COLORS.navy,
                  }}
                >
                  System Administrator
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div
              className="rounded-2xl p-6 text-white"
              style={{ background: COLORS.navy }}
            >
              <div className="flex items-center gap-3 mb-5">
                <Shield size={20} style={{ color: COLORS.mint }} />

                <h3 className="text-lg font-semibold">Security Status</h3>
              </div>

              <div className="space-y-4">
                {[
                  {
                    label: "Account Protection",
                    status: "Secured",
                  },
                  {
                    label: "2FA Authentication",
                    status: "Enabled",
                  },
                  {
                    label: "Data Encryption",
                    status: "Active",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-white/70">{item.label}</span>

                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ background: "#27AE60" }}
                      />

                      <span className="text-sm font-medium">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-medium transition-all hover:opacity-90"
                style={{ background: COLORS.mint }}
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>

            {/* User Info */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: COLORS.teal }}
                >
                  <User size={18} style={{ color: COLORS.mint }} />
                </div>

                <div>
                  <h3 className="font-semibold" style={{ color: COLORS.navy }}>
                    Account Details
                  </h3>

                  <p className="text-xs text-gray-400">
                    Personal information overview
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Full Name</p>
                  <p className="font-medium" style={{ color: COLORS.navy }}>
                    Jamie Rivera
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-xs">Department</p>
                  <p className="font-medium" style={{ color: COLORS.navy }}>
                    Alpha Squad Operations
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-xs">Role</p>
                  <p className="font-medium" style={{ color: COLORS.navy }}>
                    Team Lead
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-xs">Status</p>
                  <p className="font-medium text-green-600">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
