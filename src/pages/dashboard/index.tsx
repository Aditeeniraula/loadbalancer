import React, { useState } from "react";
import ReplicaOverview from "../../components/Dashboard/ReplicaOverview";
import RequestStatistics from "../../components/Dashboard/RequestStatistics";
import ReplicaDetails from "../replicas";
import Probe from "../../components/Dashboard/Probe";
import AddReplica from "../../components/Dashboard/AddReplica";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("Replica");

    return (
        <div className="flex flex-row bg-gray-100 min-h-screen">
            <div className="flex-1 ml-64">
                <nav className="flex items-center bg-[#31356e] text-white py-3 px-6 shadow-md">
                    <h1 className="text-lg font-bold">Dashboard</h1>
                    <div className="flex ml-auto space-x-4">
                        <button
                            className={`py-1 px-4 rounded-md ${activeTab === "Replica" ? "bg-blue-700" : "hover:bg-blue-600"
                                }`}
                            onClick={() => setActiveTab("Replica")}
                        >
                            Replica
                        </button>
                        <button
                            className={`py-1 px-4 rounded-md ${activeTab === "Probe" ? "bg-blue-700" : "hover:bg-blue-600"
                                }`}
                            onClick={() => setActiveTab("Probe")}
                        >
                            Probe
                        </button>
                        <button
                            className={`py-1 px-4 rounded-md ${activeTab === "Add Replica"
                                ? "bg-blue-700"
                                : "hover:bg-blue-600"
                                }`}
                            onClick={() => setActiveTab("Add Replica")}
                        >
                            Add Replica
                        </button>
                    </div>
                </nav>

                <div className="p-6">
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
        </div>
    );
};

export default Dashboard;
