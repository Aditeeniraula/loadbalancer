
import React from "react";
import { useReplicas } from "../../core/hooks/fetch/useReplicas";
import { ReplicaDetailResponse } from "../../types/response.types";


const ReplicaDetails: React.FC = () => {
  const { data, status } = useReplicas();

  if (status == 'pending') return <div className="text-center py-6">Loading logs...</div>;

  return status === 'success' && data?.data && (
    <div className="flex-1 bg-white shadow-md rounded-lg p-4 h-fit overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Replica Details</h2>
      <ul className="space-y-4">

        {Object(data?.data).map((item: ReplicaDetailResponse) => {
          const status = item.status;
          let statusColor = "";

          if (status === "active") {
            statusColor = "bg-green-500";
          } else if (status === "inactive") {
            statusColor = "bg-yellow-500";
          } else if (status === "disabled") {
            statusColor = "bg-red-500";
          }

          return (
            <li
              key={item.id}
              className="flex items-center justify-between border p-2 rounded-lg"
            >
              <div>
                <span className="font-semibold">{item.name}</span>
                <p className="text-sm text-gray-500">{item.url}</p>
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
    </div>
  );
};

export default ReplicaDetails;
