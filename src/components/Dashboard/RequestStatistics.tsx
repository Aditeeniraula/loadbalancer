import React from "react";
import RequestDistribution from "./RequestDistribution";

const RequestStatistics = () => {
  return (
    <div className="flex-1 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Request Statistics</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <h3 className="text-sm font-medium">Successful Requests</h3>
          <p className="text-2xl font-bold text-green-500">1000</p>
        </div>
        <div className="text-center">
          <h3 className="text-sm font-medium">Failed Requests</h3>
          <p className="text-2xl font-bold text-red-500">1000</p>
        </div>
      </div>
      <RequestDistribution />
    </div>
  );
};

export default RequestStatistics;
