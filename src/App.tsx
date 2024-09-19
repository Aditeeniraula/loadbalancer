import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Servers from "./components/Servers";
import { Server, ServerStatus } from "./@types/server.types";

function App() {
  const [servers, setServers] = useState<Server[]>([
    { id: 1, name: "Server 1", status: ServerStatus.active },
    { id: 2, name: "Server 2", status: ServerStatus.inactive },
    { id: 3, name: "Server 3", status: ServerStatus.inactive },
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard servers={servers} />} />
        <Route
          path="/servers"
          element={<Servers servers={servers} setServers={setServers} />}
        />
        <Route path="*" element={<Dashboard servers={servers} />} />
      </Routes>
    </Router>
  );
}

export default App;
