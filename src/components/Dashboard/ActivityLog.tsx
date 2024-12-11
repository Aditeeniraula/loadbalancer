import React from "react";
import { useActivityLogs } from "../../core/hooks/fetch/useActivityLogs";
import { ActivityLogResponse } from "../../types/response.types";



const ActivityLog: React.FC = () => {
  const { data, status } = useActivityLogs();

  return data && status == 'success' &&
    (
      <div className="space-y-4 bg-white shadow-md rounded-lg p-4" >
        <h1 className="text-lg font-semibold mb-4">Activity Logs</h1>
        <div className="space-y-2 overflow-y-auto h-fit">
          {Object(data?.data).map((item: ActivityLogResponse) => (
            <div
              key={item.id}
              className={`flex items-start p-4 rounded-lg shadow-md ${item.type === "success"
                ? "bg-green-100 border-green-400"
                : "bg-red-100 border-red-400"
                } border`}
            >
              <div className="flex-1">
                <p
                  className={`font-medium text-lg ${item.type === "success" ? "text-green-700" : "text-red-700"
                    }`}
                >
                  {item.message}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Replica Name:</strong> {item?.replica?.name}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Status:</strong> {item?.replica?.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div >
    );
};

export default ActivityLog;
