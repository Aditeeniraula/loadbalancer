import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

interface Metrics {
  activeServers: number;
  requestsPerMinute: number;
  averageLatency: number;
}

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchMockData = () => {
      try {
        const mockData = {
          activeServers: 12,
          requestsPerMinute: 420,
          averageLatency: 250,
        };
        setMetrics(mockData);
      } catch (err) {
        setError("Failed to fetch metrics");
      }
    };

    fetchMockData();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!metrics) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  const serverOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: ["Active Servers"],
    },
  };

  const requestOptions = {
    chart: {
      type: "line",
    },
    xaxis: {
      categories: ["Requests Per Minute"],
    },
  };

  const latencyOptions = {
    chart: {
      type: "radialBar",
    },
    labels: ["Average Latency (ms)"],
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="px-4 py-6 text-2xl font-bold">Load Balancer</div>
        <nav className="flex-1 px-4 py-2">
          <ul>
            <li className="py-2">
              <a href="#" className="text-gray-300 hover:text-white">
                Dashboard
              </a>
            </li>
            <li className="py-2">
              <a href="#" className="text-gray-300 hover:text-white">
                Servers
              </a>
            </li>
            <li className="py-2">
              <a href="#" className="text-gray-300 hover:text-white">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex-1 bg-gray-100">
        <header className="bg-white shadow-md p-4">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Active Servers</h2>
              <Chart
                options={serverOptions}
                series={[{ data: [metrics.activeServers] }]}
                type="bar"
                height={200}
              />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Requests Per Minute</h2>
              <Chart
                options={requestOptions}
                series={[{ data: [metrics.requestsPerMinute] }]}
                type="line"
                height={200}
              />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Average Latency</h2>
              <Chart
                options={latencyOptions}
                series={[metrics.averageLatency]}
                type="radialBar"
                height={200}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
