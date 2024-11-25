import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/Form/LoginForm";
import RegistrationForm from "./components/Form/RegistrationForm";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Setting";
import Servers from "./components/Servers";
import { Server, ServerStatus } from "./@types/server.types.d";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [server, setServer] = useState<Server[]>([{
    id: 1,
    name: "server 1",
    status: ServerStatus.active,
  },
  {
    id: 2,
    name: "server 2",
    status: ServerStatus.active,
  },{
    id: 3,
    name: "server 1",
    status: ServerStatus.inactive,
  }])
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<LoginForm onLogin={setIsAuthenticated} />}
          />

          <Route path="/register" element={<RegistrationForm />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard servers={server} /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={isAuthenticated ? <Settings/> : <Navigate to="/login" />}
          />
          <Route
            path="/servers"
            element={isAuthenticated ? <Servers servers={server} setServers={setServer} /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
