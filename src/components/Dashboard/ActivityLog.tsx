import React, { useEffect, useState } from "react";
import { httpBase } from "../../utils/axios.utils";

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
        const response = await httpBase().get("activity-logs");
        setActivityLog(response.data.data); // Ensure response structure matches
      } catch (error: any) {
        console.log(error);
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
