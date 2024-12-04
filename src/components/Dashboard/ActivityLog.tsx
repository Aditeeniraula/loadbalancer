/*import React from "react";

// Define the type for a single activity log item
interface ActivityLogItem {
  text: string;
  color: string;
}

// Define props type for the ActivityLog component
interface ActivityLogProps {
  logs: ActivityLogItem[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ logs }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 h-64 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Activity Log</h2>
      <ul className="space-y-2">
        {logs.map((log, index) => (
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
  );
};

export default ActivityLog;
*/
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Replica {
  id: number;
  name: string;
  url: string;
  Status: string;
  HealthCheckEndpoint: string;
  created_at: string;
  updated_at: string;
}

interface ActivityLogItem {
  ID: number;
  Type: string;
  Message: string;
  ReplicaID: number;
  CreatedAt: string;
  UpdatedAt: string;
  Replica: Replica;
}

const ActivityLog: React.FC = () => {
  const [activityLog, setActivityLog] = useState<ActivityLogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/admin/activity-logs"
        );
        setActivityLog(response.data.data); // Ensure response structure matches
      } catch (error) {
        setError("Failed to fetch activity logs.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) return <div className="text-center py-6">Loading logs...</div>;
  if (error)
    return <div className="text-center py-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold mb-4">Activity Logs</h1>
      <div className="space-y-2">
        {activityLog.map((log) => (
          <div
            key={log.ID}
            className={`flex items-start p-4 rounded-lg shadow-md ${
              log.Type === "success"
                ? "bg-green-100 border-green-400"
                : "bg-red-100 border-red-400"
            } border`}
          >
            <div className="flex-1">
              <p
                className={`font-medium text-lg ${
                  log.Type === "success" ? "text-green-700" : "text-red-700"
                }`}
              >
                {log.Message}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Replica Name:</strong> {log.Replica.name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Status:</strong> {log.Replica.Status}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Health Check:</strong>{" "}
                <a
                  href={log.Replica.HealthCheckEndpoint}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Check
                </a>
              </p>
            </div>
            <div className="text-sm text-gray-500">
              <p>
                <strong>Created:</strong>{" "}
                {new Date(log.CreatedAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated:</strong>{" "}
                {new Date(log.UpdatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
