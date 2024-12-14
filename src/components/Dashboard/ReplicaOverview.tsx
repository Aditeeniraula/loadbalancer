import React, { useState, useEffect } from "react";
import ActivityLog from "./ActivityLog";
import { ReplicaDetailResponse } from "../../types/response.types";
import { useReplicas } from "../../core/hooks/useReplicas";


const ReplicaOverview: React.FC = () => {
  const { data, status } = useReplicas();

  const [replicaStat, setReplicaStat] = useState<{ available: number, unavaiable: number }>({
    available: 0,
    unavaiable: 0,
  });

  useEffect(() => {
    if (status === 'success') {
      const available = Object(data?.data).filter((replica: ReplicaDetailResponse) => replica.status === 'active').length;
      const unavaiable = Object(data?.data).filter((replica: ReplicaDetailResponse) => replica.status !== 'active').length;

      setReplicaStat({ available, unavaiable });
    }
  }, [data, status])

  return data && status === 'success' && (
    <div className="flex flex-col space-y-6">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Replica Overview</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-700">
              Available Replica
            </h3>
            <p className="text-2xl font-bold text-green-500">
              {replicaStat.available}
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-700">
              Unavailable Replica
            </h3>
            <p className="text-2xl font-bold text-red-500">
              {replicaStat.unavaiable}
            </p>
          </div>
        </div>
      </div>
      <ActivityLog />
    </div>
  );
};

export default ReplicaOverview;
