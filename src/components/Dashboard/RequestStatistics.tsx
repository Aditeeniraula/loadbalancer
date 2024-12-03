import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestDistribution from "./RequestDistribution";

const RequestStatistics = () => {
  const [stats, setStats] = useState({
    successfulRequests: 0,
    failedRequests: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/get-statistics"
        );
        const { total, data } = response.data;

        setStats({
          successfulRequests: total.successful_requests,
          failedRequests: total.failed_requests,
        });
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex-1 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Request Statistics</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <h3 className="text-sm font-medium">Successful Requests</h3>
          <p className="text-2xl font-bold text-green-500">
            {stats.successfulRequests}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-sm font-medium">Failed Requests</h3>
          <p className="text-2xl font-bold text-red-500">
            {stats.failedRequests}
          </p>
        </div>
      </div>
      <RequestDistribution data={stats} />
    </div>
  );
};

export default RequestStatistics;
