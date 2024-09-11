import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Sidebar from "./Sidebar";

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState({
    activeServers: 12,
    requestsPerMinute: 420,
    averageLatency: 250,
  });

  const serverOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: ["Active Servers"],
    },
    title: {
      text: "Active Servers",
      align: "center",
    },
  };

  const requestOptions = {
    chart: {
      type: "line",
    },
    xaxis: {
      categories: ["Requests Per Minute"],
    },
    title: {
      text: "Requests Per Minute",
      align: "center",
    },
  };

  const latencyOptions = {
    chart: {
      type: "radialBar",
    },
    labels: ["Average Latency (ms)"],
  };

  return (
    <Sidebar>
      <header className="bg-white shadow-md p-4">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
      </header>

      <main className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Chart
              options={serverOptions}
              series={[{ data: [metrics.activeServers] }]}
              type="bar"
              height={200}
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <Chart
              options={requestOptions}
              series={[{ data: [metrics.requestsPerMinute] }]}
              type="line"
              height={200}
            />
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <Chart
              options={latencyOptions}
              series={[metrics.averageLatency]}
              type="radialBar"
              height={200}
            />
          </div>
        </div>
      </main>
    </Sidebar>
  );
};

export default Dashboard;
