import React from "react";

const ReplicaOverview = () => {
  const activityLog = [
    { text: "Replica 4 was added", color: "bg-blue-500" },
    { text: "Replica 4 passed health check", color: "bg-yellow-500" },
    { text: "Replica 3 was not added", color: "bg-red-500" },
    { text: "Replica 5 was  added", color: "bg-blue-500" },
    { text: "Replica 6 was  added", color: "bg-blue-500" },
  ];

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex-1 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Replica Overview</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-700">
              Available Replica
            </h3>
            <p className="text-2xl font-bold text-green-500">4</p>
          </div>
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-700">
              Unavailable Replica
            </h3>
            <p className="text-2xl font-bold text-red-500">1</p>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white shadow-md rounded-lg p-4 h-64 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Activity Log</h2>
        <ul className="space-y-2">
          {activityLog.map((log, index) => (
            <li
              key={index}
              className="flex items-center justify-between border p-2 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full ${log.color}`}></span>
                <p className="text-sm font-medium text-gray-700">{log.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReplicaOverview;
