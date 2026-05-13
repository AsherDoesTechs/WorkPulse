import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router";
import {
  Activity,
  User,
  Users,
  BarChart3,
  Smartphone,
  Bell,
  Settings,
  ChevronRight,
  Zap,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { path: "/", label: "Agent Wellness", icon: User, exact: true },
  { path: "/team", label: "Team Command", icon: Users },
  { path: "/executive", label: "Executive Analytics", icon: BarChart3 },
  { path: "/mobile", label: "Mobile Preview", icon: Smartphone },
];

const COLORS = {
  navy: "#1A2B3C",
  mint: "#48C9B0",
  teal: "#E0F2F1",
  ghost: "#F8F9FA",
};

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const currentView = NAV_ITEMS.find((item) =>
    item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path)
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: COLORS.ghost }}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col w-64 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: COLORS.navy }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: COLORS.mint }}>
            <Activity size={18} className="text-white" />
          </div>
          <div>
            <span className="text-white font-semibold tracking-tight">WorkPulse</span>
            <p className="text-xs" style={{ color: COLORS.mint }}>BPO Wellness Engine</p>
          </div>
          <button className="ml-auto lg:hidden text-white/60 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 pb-2 text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
            Dashboards
          </p>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group ${
                  isActive ? "text-white" : "text-white/60 hover:text-white hover:bg-white/5"
                }`
              }
              style={({ isActive }) =>
                isActive ? { background: COLORS.mint + "22", borderLeft: `3px solid ${COLORS.mint}` } : {}
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon size={16} style={{ color: isActive ? COLORS.mint : undefined }} />
                  <span className="text-sm font-medium">{item.label}</span>
                  {isActive && <ChevronRight size={14} className="ml-auto" style={{ color: COLORS.mint }} />}
                </>
              )}
            </NavLink>
          ))}

          <div className="pt-4">
            <p className="px-3 pb-2 text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
              System
            </p>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-150">
              <Bell size={16} />
              <span className="text-sm font-medium">Notifications</span>
              <span className="ml-auto text-xs rounded-full px-1.5 py-0.5" style={{ background: COLORS.mint + "33", color: COLORS.mint }}>3</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-150">
              <Settings size={16} />
              <span className="text-sm font-medium">Settings</span>
            </button>
          </div>
        </nav>

        {/* Wellness Status Mini Widget */}
        <div className="mx-3 mb-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
          <div className="flex items-center gap-2 mb-2">
            <Zap size={14} style={{ color: COLORS.mint }} />
            <span className="text-xs font-medium" style={{ color: COLORS.mint }}>Team Pulse</span>
          </div>
          <div className="space-y-1.5">
            {[
              { label: "Overall Wellness", pct: 82, color: "#27AE60" },
              { label: "Workload Balance", pct: 68, color: "#F39C12" },
              { label: "SLA Compliance", pct: 94, color: "#48C9B0" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between mb-0.5">
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{item.label}</span>
                  <span className="text-xs font-medium text-white">{item.pct}%</span>
                </div>
                <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <div className="h-1 rounded-full transition-all" style={{ width: `${item.pct}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Profile */}
        <div className="px-3 pb-4 pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ background: COLORS.mint }}>
              JR
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Jamie Rivera</p>
              <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>Team Lead · Alpha Squad</p>
            </div>
            <button className="text-white/40 hover:text-white/70 transition-colors">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="flex items-center gap-4 px-6 py-4 bg-white border-b" style={{ borderColor: "#E9ECEF" }}>
          <button
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} style={{ color: COLORS.navy }} />
          </button>
          <div>
            <h1 className="text-base font-semibold" style={{ color: COLORS.navy }}>
              {currentView?.label || "Dashboard"}
            </h1>
            <p className="text-xs text-gray-400">Sunday, May 10, 2026</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: "#E0F2F1", color: COLORS.navy }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: COLORS.mint }} />
              Live Monitoring
            </div>
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell size={18} style={{ color: COLORS.navy }} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "#F1948A" }} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
