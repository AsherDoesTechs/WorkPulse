import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./styles/index.css";

import { Layout } from "./app/components/Layout";

// Pages (ALL must be default exports)
import AgentDashboard from "./app/pages/AgentDashboard";
import TeamDashboard from "./app/pages/TeamDashboard";
import ExecutiveDashboard from "./app/pages/ExecutiveDashboard";
import MobileMockup from "./app/pages/MobileMockup";
import NotificationsPage from "./app/pages/NotificationsPage";
import SettingsPage from "./app/pages/SettingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <AgentDashboard />,
      },
      {
        path: "team",
        element: <TeamDashboard />,
      },
      {
        path: "executive",
        element: <ExecutiveDashboard />,
      },
      {
        path: "mobile",
        element: <MobileMockup />,
      },
      {
        path: "notifications",
        element: <NotificationsPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Root element with id "root" was not found.');
}

createRoot(rootElement).render(<App />);
