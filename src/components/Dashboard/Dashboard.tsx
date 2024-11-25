import React, { useState } from "react";
import Sidebar from "../Sidebar";
import ReplicaOverview from "./ReplicaOverview";
import RequestStatistics from "./RequestStatistics";
import ReplicaDetails from "./ReplicaDetails";
import Probe from "./Probe";
import AddReplica from "./AddReplica";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Replica");
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="ml-64 flex-1 p-4">
        <h1 className="text-xl font-bold mb-4">Dashboard</h1>

        <div className="flex space-x-3 border-b mb-4">
          <button
            className={`py-1 px-3 text-sm ${
              activeTab === "Replica"
                ? "border-b-2 border-blue-500 text-blue-500 font-medium"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Replica")}
          >
            Replica
          </button>
          <button
            className={`py-1 px-3 text-sm ${
              activeTab === "Probe"
                ? "border-b-2 border-blue-500 text-blue-500 font-medium"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Probe")}
          >
            Probe
          </button>
          <button
            className={`py-1 px-3 text-sm ${
              activeTab === "Add Replica"
                ? "border-b-2 border-blue-500 text-blue-500 font-medium"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Add Replica")}
          >
            Add Replica
          </button>
        </div>

        {activeTab === "Replica" ? (
          <div className="grid grid-cols-3 gap-4">
            <ReplicaOverview />
            <RequestStatistics />
            <ReplicaDetails />
          </div>
        ) : activeTab === "Probe" ? (
          <Probe />
        ) : (
          <AddReplica />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
