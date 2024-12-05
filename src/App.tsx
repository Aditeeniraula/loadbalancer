import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/Form/LoginForm";
import RegistrationForm from "./components/Form/RegistrationForm";
import Dashboard from "./components/Dashboard/Dashboard";
import Settings from "./components/Setting";
import Servers from "./components/Servers";
import ReplicaDetails from "./components/Dashboard/ReplicaDetails";
import { Server, ServerStatus } from "./@types/server.types.d";
import { QueryClient, QueryClientProvider } from "react-query";
import ForgotPassword from "./components/Form/ForgotPassword";
import EnterOTP from "./components/Form/EnterOTP";
import ResetPassword from "./components/Form/ResetPassword";

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [server, setServer] = useState<Server[]>([
    {
      id: 1,
      name: "server 1",
      status: ServerStatus.active,
    },
    {
      id: 2,
      name: "server 2",
      status: ServerStatus.active,
    },
    {
      id: 3,
      name: "server 3",
      status: ServerStatus.inactive,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<LoginForm onLogin={setIsAuthenticated} />}
            />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/enter-otp" element={<EnterOTP />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard servers={server} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/settings"
              element={
                isAuthenticated ? (
                  <Settings />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/servers"
              element={
                isAuthenticated ? (
                  <Servers servers={server} setServers={setServer} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/replica-details"
              element={
                isAuthenticated ? (
                  <ReplicaDetails />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
