import React, { useEffect, useState } from "react";
import { httpBase } from "../../utils/axios.utils";

interface Replica {
  id: number;
  name: string;
  url: string;
  Status: string;
}

interface ReplicaDetailsItem {
  Replica: Replica;
}

const ReplicaDetails: React.FC = () => {
  const [replicaDetails, setReplicaDetails] = useState<ReplicaDetailsItem[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReplicaDetails = async () => {
    try {
      const response = await httpBase().get("activity-logs");
      setReplicaDetails(response.data.data);
    } catch (error: any) {
      console.log(error);
      setError("Failed to fetch activity logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReplicaDetails();

    const intervalId = setInterval(fetchReplicaDetails, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (loading) return <div className="text-center py-6">Loading logs...</div>;
  if (error)
    return <div className="text-center py-6 text-red-500">{error}</div>;

  return (
    <div className="flex-1 bg-white shadow-md rounded-lg p-4 max-h-80 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Replica Details</h2>
      {replicaDetails.length > 0 ? (
        <ul className="space-y-4">
          {replicaDetails.map((item, index) => {
            const status = item.Replica.Status;
            let statusColor = "";

            if (status === "active") {
              statusColor = "bg-green-500";
            } else if (status === "inactive") {
              statusColor = "bg-red-500";
            } else if (status === "health-checking") {
              statusColor = "bg-yellow-500";
            }

            return (
              <li
                key={index}
                className="flex items-center justify-between border p-2 rounded-lg"
              >
                <div>
                  <span className="font-semibold">{item.Replica.name}</span>
                  <p className="text-sm text-gray-500">{item.Replica.url}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-4 h-4 rounded-full ${statusColor}`}
                  ></span>
                  <span className="text-sm">{status}</span>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-500">No replicas added yet.</p>
      )}
    </div>
  );
};

export default ReplicaDetails;
