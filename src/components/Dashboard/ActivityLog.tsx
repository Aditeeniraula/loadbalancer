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
  Replica: Replica | null;
}

const ActivityLog: React.FC = () => {
  const [activityLog, setActivityLog] = useState<ActivityLogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = async () => {
    try {
      const response = await httpBase().get("activity-logs");
      setActivityLog(response.data.data);
    } catch (error: any) {
      console.log(error);
      setError("Failed to fetch activity logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();

    const intervalId = setInterval(fetchLogs, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (loading) return <div className="text-center py-6">Loading logs...</div>;
  if (error)
    return <div className="text-center py-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold mb-4">Activity Logs</h1>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {activityLog.map((log) => {
          // Check if Replica is null or undefined
          const replica = log.Replica;
          if (!replica) return null;
        
        return (
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
                <strong>Replica Name:</strong> {replica.name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Status:</strong> {replica.Status}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Health Check:</strong>{" "}
                <a
                  href={replica.HealthCheckEndpoint}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Check
                </a>
              </p>
            </div>
          </div>
        );
        })}
      </div>
    </div>
  );
};

export default ActivityLog;
