import React, { useEffect, useState } from "react";
import RequestDistribution from "./RequestDistribution";
import { StatisticsResponse } from "../../types/response.types";
import { useStatistics } from "../../core/hooks/useStatistics";

const RequestStatistics = () => {

  const { data, status } = useStatistics();

  const [totalStats, setTotalStats] = useState({
    successfulRequests: 0,
    failedRequests: 0,
  });

  useEffect(() => {
    if (status === "success") {
      let totalSuccessfulRequests = 0;
      let totalFailedRequests = 0;
      Object(data?.data).forEach((item: StatisticsResponse) => {
        totalSuccessfulRequests += item.successful_requests;
        totalFailedRequests += item.failed_requests;
      });

      setTotalStats({
        successfulRequests: totalSuccessfulRequests,
        failedRequests: totalFailedRequests,
      });
    }
  }, [status, data]);

  return (
    <div className="flex-1 bg-white shadow-md rounded-lg p-4 h-fit">
      <h2 className="text-lg font-semibold mb-4">Request Statistics</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <h3 className="text-sm font-medium">Successful Requests</h3>
          <p className="text-2xl font-bold text-green-500">
            {totalStats.successfulRequests}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-sm font-medium">Failed Requests</h3>
          <p className="text-2xl font-bold text-red-500">
            {totalStats.failedRequests}
          </p>
        </div>
      </div>
      {status === "success" && data && <RequestDistribution data={data?.data as StatisticsResponse[]} />}

    </div>
  );
};

export default RequestStatistics;
