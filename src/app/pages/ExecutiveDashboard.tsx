import {
  TrendingDown,
  TrendingUp,
  DollarSign,
  Activity,
  Wifi,
  Server,
  Zap,
  AlertCircle,
  CheckCircle2,
  Clock,
  BarChart3,
  RefreshCw,
  Globe,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Area,
  AreaChart,
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

const TURNOVER_DATA = [
  { month: "Oct", actual: 9.2, predicted: 10.1, savings: 82000 },
  { month: "Nov", actual: 8.8, predicted: 9.5, savings: 94000 },
  { month: "Dec", actual: 8.1, predicted: 9.0, savings: 108000 },
  { month: "Jan", actual: 7.4, predicted: 8.2, savings: 124000 },
  { month: "Feb", actual: 6.8, predicted: 7.6, savings: 139000 },
  { month: "Mar", actual: 6.1, predicted: 7.1, savings: 155000 },
  { month: "Apr", actual: 5.5, predicted: 6.5, savings: 172000 },
  { month: "May", actual: 4.9, predicted: 5.9, savings: 188000 },
];

const WELLNESS_PRODUCTIVITY_DATA = [
  { month: "Oct", wellness: 58, sla: 79, csat: 81 },
  { month: "Nov", wellness: 62, sla: 82, csat: 83 },
  { month: "Dec", wellness: 66, sla: 84, csat: 85 },
  { month: "Jan", wellness: 70, sla: 87, csat: 87 },
  { month: "Feb", wellness: 74, sla: 89, csat: 88 },
  { month: "Mar", wellness: 78, sla: 91, csat: 90 },
  { month: "Apr", wellness: 82, sla: 93, csat: 92 },
  { month: "May", wellness: 86, sla: 94, csat: 94 },
];

const SITE_HEALTH = [
  { name: "CRM System (Salesforce)", uptime: 99.7, latency: 42, status: "healthy" },
  { name: "Call Routing Platform", uptime: 98.9, latency: 18, status: "healthy" },
  { name: "VPN Gateway (US-East)", uptime: 97.2, latency: 65, status: "warning" },
  { name: "Knowledge Base Portal", uptime: 99.9, latency: 28, status: "healthy" },
  { name: "QA Monitoring Suite", uptime: 95.8, latency: 102, status: "critical" },
  { name: "Workforce Mgmt (WFM)", uptime: 99.4, latency: 31, status: "healthy" },
];

const CustomTurnoverTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border rounded-xl p-3 shadow-lg" style={{ borderColor: COLORS.border }}>
        <p className="text-xs font-semibold mb-2" style={{ color: COLORS.navy }}>{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} className="text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-gray-500">{p.name}:</span>
            <span className="font-semibold" style={{ color: COLORS.navy }}>{p.value}%</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomWellnessTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border rounded-xl p-3 shadow-lg" style={{ borderColor: COLORS.border }}>
        <p className="text-xs font-semibold mb-2" style={{ color: COLORS.navy }}>{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} className="text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-gray-500">{p.name}:</span>
            <span className="font-semibold" style={{ color: COLORS.navy }}>{p.value}%</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function ExecutiveDashboard() {
  const latestData = WELLNESS_PRODUCTIVITY_DATA[WELLNESS_PRODUCTIVITY_DATA.length - 1];
  const latestTurnover = TURNOVER_DATA[TURNOVER_DATA.length - 1];
  const totalSavings = TURNOVER_DATA.reduce((sum, d) => sum + d.savings, 0);

  return (
    <div className="p-6 space-y-6" style={{ background: COLORS.ghost, minHeight: "100%" }}>
      {/* Executive Header */}
      <div
        className="rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        style={{ background: `linear-gradient(135deg, ${COLORS.navy} 0%, #243B55 100%)` }}
      >
        <div>
          <h2 className="text-white font-semibold">Executive Analytics — Q2 2026</h2>
          <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
            8-month trend since WorkPulse deployment. ROI and wellness insights.
          </p>
        </div>
        <div className="sm:ml-auto flex gap-4">
          <div className="text-center">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Total Savings</p>
            <p className="text-xl font-bold" style={{ color: COLORS.mint }}>${(totalSavings / 1000000).toFixed(1)}M</p>
          </div>
          <div className="text-center">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>ROI</p>
            <p className="text-xl font-bold" style={{ color: COLORS.mint }}>4.7x</p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Turnover Rate",
            value: `${latestTurnover.actual}%`,
            change: "-4.3% vs. last quarter",
            icon: TrendingDown,
            color: COLORS.green,
            positive: true,
          },
          {
            label: "Wellness Score",
            value: `${latestData.wellness}/100`,
            change: "+28pts since deployment",
            icon: Activity,
            color: COLORS.mint,
            positive: true,
          },
          {
            label: "SLA Compliance",
            value: `${latestData.sla}%`,
            change: "+15pts improvement",
            icon: TrendingUp,
            color: COLORS.amber,
            positive: true,
          },
          {
            label: "Attrition Cost Saved",
            value: `$${(totalSavings / 1000000).toFixed(1)}M`,
            change: "Vs. projected baseline",
            icon: DollarSign,
            color: COLORS.green,
            positive: true,
          },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl p-4 border" style={{ borderColor: COLORS.border }}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500">{kpi.label}</p>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: kpi.color + "18" }}>
                <kpi.icon size={14} style={{ color: kpi.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold" style={{ color: COLORS.navy }}>{kpi.value}</p>
            <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: kpi.color }}>
              <TrendingUp size={10} />
              {kpi.change}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Turnover Prediction */}
        <div className="bg-white rounded-xl border p-5" style={{ borderColor: COLORS.border }}>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold" style={{ color: COLORS.navy }}>Turnover Prediction Model</h3>
            <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full" style={{ background: COLORS.teal, color: COLORS.navy }}>
              <Zap size={10} />
              AI-Powered
            </div>
          </div>
          <p className="text-xs text-gray-400 mb-4">
            Actual turnover vs. predicted without WorkPulse intervention
          </p>

          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={TURNOVER_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[4, 11]} />
              <Tooltip content={<CustomTurnoverTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                formatter={(value) => <span style={{ color: "#64748B" }}>{value}</span>}
              />
              <Area
                type="monotone"
                dataKey="predicted"
                fill={COLORS.coral + "20"}
                stroke={COLORS.coral}
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Predicted (No WorkPulse)"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke={COLORS.mint}
                strokeWidth={3}
                dot={{ fill: COLORS.mint, r: 4, strokeWidth: 0 }}
                name="Actual Turnover"
              />
            </ComposedChart>
          </ResponsiveContainer>

          <div className="flex gap-3 mt-3 pt-3 border-t" style={{ borderColor: COLORS.border }}>
            <div className="flex-1 p-2 rounded-lg text-center" style={{ background: COLORS.green + "15" }}>
              <p className="text-xs font-semibold" style={{ color: COLORS.green }}>47% Reduction</p>
              <p className="text-xs text-gray-400">Turnover Rate</p>
            </div>
            <div className="flex-1 p-2 rounded-lg text-center" style={{ background: COLORS.mint + "15" }}>
              <p className="text-xs font-semibold" style={{ color: COLORS.mint }}>$188K</p>
              <p className="text-xs text-gray-400">Monthly Savings</p>
            </div>
            <div className="flex-1 p-2 rounded-lg text-center" style={{ background: COLORS.amber + "15" }}>
              <p className="text-xs font-semibold" style={{ color: COLORS.amber }}>89 Days</p>
              <p className="text-xs text-gray-400">Payback Period</p>
            </div>
          </div>
        </div>

        {/* Wellness vs Productivity */}
        <div className="bg-white rounded-xl border p-5" style={{ borderColor: COLORS.border }}>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold" style={{ color: COLORS.navy }}>Wellness ↔ Productivity Correlation</h3>
            <BarChart3 size={16} className="text-gray-400" />
          </div>
          <p className="text-xs text-gray-400 mb-4">
            As wellness scores rise, SLA compliance and CSAT improve in lock-step
          </p>

          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={WELLNESS_PRODUCTIVITY_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis
                yAxisId="wellness"
                orientation="left"
                tick={{ fontSize: 11, fill: COLORS.mint }}
                axisLine={false}
                tickLine={false}
                domain={[50, 100]}
              />
              <YAxis
                yAxisId="sla"
                orientation="right"
                tick={{ fontSize: 11, fill: COLORS.amber }}
                axisLine={false}
                tickLine={false}
                domain={[70, 100]}
              />
              <Tooltip content={<CustomWellnessTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                formatter={(value) => <span style={{ color: "#64748B" }}>{value}</span>}
              />
              <Line
                yAxisId="wellness"
                type="monotone"
                dataKey="wellness"
                stroke={COLORS.mint}
                strokeWidth={3}
                dot={{ fill: COLORS.mint, r: 4, strokeWidth: 0 }}
                name="Wellness Score"
              />
              <Line
                yAxisId="sla"
                type="monotone"
                dataKey="sla"
                stroke={COLORS.amber}
                strokeWidth={2}
                dot={{ fill: COLORS.amber, r: 3, strokeWidth: 0 }}
                name="SLA Compliance %"
              />
              <Line
                yAxisId="sla"
                type="monotone"
                dataKey="csat"
                stroke={COLORS.navy}
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
                name="CSAT Score"
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-3 pt-3 border-t" style={{ borderColor: COLORS.border }}>
            <p className="text-xs font-semibold mb-2" style={{ color: COLORS.navy }}>
              Correlation: <span style={{ color: COLORS.mint }}>r = 0.97 (Very Strong)</span>
            </p>
            <p className="text-xs text-gray-400">
              For every 10-point improvement in team wellness, SLA compliance increases by ~5.8 percentage points.
            </p>
          </div>
        </div>
      </div>

      {/* System Health Monitor */}
      <div className="bg-white rounded-xl border p-5" style={{ borderColor: COLORS.border }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold" style={{ color: COLORS.navy }}>System Health Monitor</h3>
            <p className="text-xs text-gray-400">Real-time infrastructure status · Refreshed every 60s</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full" style={{ background: COLORS.green + "18", color: COLORS.green }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: COLORS.green }} />
              5/6 Systems Healthy
            </div>
            <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <RefreshCw size={14} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SITE_HEALTH.map((sys) => {
            const statusColor = sys.status === "healthy" ? COLORS.green : sys.status === "warning" ? COLORS.amber : COLORS.coral;
            const StatusIcon = sys.status === "healthy" ? CheckCircle2 : sys.status === "warning" ? AlertCircle : AlertCircle;

            return (
              <div
                key={sys.name}
                className="flex items-center gap-3 p-3.5 rounded-xl border"
                style={{ borderColor: statusColor + "40", background: statusColor + "08" }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: statusColor + "20" }}>
                  <Server size={15} style={{ color: statusColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate" style={{ color: COLORS.navy }}>{sys.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Activity size={9} />
                      {sys.uptime}% up
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock size={9} />
                      {sys.latency}ms
                    </span>
                  </div>
                </div>
                <StatusIcon size={14} style={{ color: statusColor }} />
              </div>
            );
          })}
        </div>

        {/* Network Uptime Graph */}
        <div className="mt-4 pt-4 border-t" style={{ borderColor: COLORS.border }}>
          <p className="text-xs font-medium mb-3" style={{ color: COLORS.navy }}>Overall Network Uptime (Last 24h)</p>
          <div className="flex gap-1 h-8">
            {Array.from({ length: 48 }).map((_, i) => {
              const isDown = [12, 13, 38].includes(i);
              const isWarning = [11, 14, 37, 39].includes(i);
              return (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    background: isDown ? COLORS.coral : isWarning ? COLORS.amber : COLORS.mint,
                    opacity: isDown ? 1 : isWarning ? 0.8 : 0.7 + Math.random() * 0.3,
                  }}
                  title={`${Math.floor(i / 2)}:${i % 2 === 0 ? "00" : "30"} — ${isDown ? "Outage" : isWarning ? "Degraded" : "Healthy"}`}
                />
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>Now</span>
          </div>
        </div>

        {/* Incident History */}
        <div className="mt-4 pt-4 border-t" style={{ borderColor: COLORS.border }}>
          <p className="text-xs font-medium mb-2" style={{ color: COLORS.navy }}>Recent Incidents</p>
          <div className="space-y-2">
            {[
              { time: "06:12 AM", system: "VPN Gateway", desc: "Elevated latency detected (65ms vs 20ms baseline)", type: "warning" },
              { time: "Yesterday 11:34 PM", system: "QA Monitoring Suite", desc: "Service degradation — partial outage (14 min)", type: "critical" },
              { time: "May 8 2:15 PM", system: "CRM System", desc: "Scheduled maintenance completed — all systems normal", type: "resolved" },
            ].map((incident, i) => {
              const color = incident.type === "critical" ? COLORS.coral : incident.type === "warning" ? COLORS.amber : COLORS.green;
              return (
                <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg" style={{ background: color + "10" }}>
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: color }} />
                  <div>
                    <p className="text-xs font-medium" style={{ color: COLORS.navy }}>{incident.system} <span className="font-normal text-gray-400">· {incident.time}</span></p>
                    <p className="text-xs text-gray-500">{incident.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ROI Summary */}
      <div className="rounded-2xl p-5" style={{ background: `linear-gradient(135deg, ${COLORS.navy} 0%, #1a3a52 100%)` }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={16} style={{ color: COLORS.mint }} />
              <p className="font-semibold text-white">Business Impact Summary</p>
            </div>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              Since WorkPulse deployment 8 months ago
            </p>
          </div>
          <div className="flex gap-6">
            {[
              { label: "Cost Savings", value: "$1.06M", color: COLORS.mint },
              { label: "Turnover Drop", value: "−47%", color: COLORS.green },
              { label: "SLA Gain", value: "+15pp", color: COLORS.amber },
              { label: "CSAT Lift", value: "+13pp", color: COLORS.coral },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-xl font-bold" style={{ color: item.color }}>{item.value}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
