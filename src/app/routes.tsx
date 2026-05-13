import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { AgentDashboard } from "./pages/AgentDashboard";
import { TeamLeaderDashboard } from "./pages/TeamLeaderDashboard";
import { ExecutiveDashboard } from "./pages/ExecutiveDashboard";
import { MobileMockup } from "./pages/MobileMockup";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: AgentDashboard },
      { path: "team", Component: TeamLeaderDashboard },
      { path: "executive", Component: ExecutiveDashboard },
      { path: "mobile", Component: MobileMockup },
    ],
  },
]);
