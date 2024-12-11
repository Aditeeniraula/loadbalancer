import React, { useState, useEffect } from "react";
import ActivityLog from "./ActivityLog";
import { useReplicas } from "../../core/hooks/fetch/useReplicas";
import { ReplicaDetailResponse } from "../../types/response.types";


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
