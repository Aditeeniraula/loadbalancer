import React, { useState, useEffect } from "react";
import ActivityLog from "./ActivityLog";
import { httpBase } from "../../utils/axios.utils";
interface Replica {
  name: string;
  successful_requests: number;
  failed_requests: number;
}

const ReplicaOverview: React.FC = () => {
  const [replicaData, setReplicaData] = useState<Replica[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReplicaData = async () => {
      try {
        const response = await httpBase().get("get-statistics");
        if (!response) {
          throw new Error("Failed to fetch replica data");
        }
        const data = await response.data;

        if (data.success) {
          setReplicaData(data.data);
        } else {
          setError("Failed to fetch replica data");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReplicaData();
  }, []);

  const availableReplicas = replicaData.filter(
    (replica) => replica.failed_requests === 0,
  ).length;

  const unavailableReplicas = replicaData.filter(
    (replica) => replica.failed_requests > 0,
  ).length;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="bg-white shadow-md rounded-lg p-4 max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">Replica Overview</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-700">
              Available Replica
            </h3>
            <p className="text-2xl font-bold text-green-500">
              {availableReplicas}
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-700">
              Unavailable Replica
            </h3>
            <p className="text-2xl font-bold text-red-500">
              {unavailableReplicas}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center bg-blue-50 border border-blue-200 rounded-lg p-4 max-h-32 overflow-hidden">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-full">
                <span className="font-bold text-lg text-white">✔</span>
              </div>
              <div>
                <h3 className="text-xs font-medium text-gray-700">HTTP/SSL</h3>
              </div>
            </div>
          </div>

          <div className="flex items-center bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-h-32 overflow-hidden">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center bg-yellow-500 rounded-full">
                <span className="text-white font-bold text-lg">−</span>
              </div>
              <div>
                <h3 className="text-xs font-medium text-gray-700">
                  Rate Limit
                </h3>
                <p className="text-sm font-semibold text-yellow-500">100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ActivityLog />
    </div>
  );
};

export default ReplicaOverview;
