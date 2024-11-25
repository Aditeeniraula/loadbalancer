import React from "react";
import Sidebar from "./Sidebar";
import Chart from "react-apexcharts";

export interface Server {
  id: number;
  name: string;
  status: "active" | "inactive";
}

interface DashboardProps {
  servers: Server[];
}

const Dashboard: React.FC<DashboardProps> = ({ servers }) => {
  const activeServers = servers.filter(
    (server) => server.status === "active"
  ).length;

  const activeServersOptions = {
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

  const activeServersSeries = [
    {
      name: "Active Servers",
      data: [activeServers],
    },
  ];

  const requestsOptions = {
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

  const requestsSeries = [
    {
      name: "Requests Per Minute",
      data: [420],
    },
  ];

  const latencyOptions = {
    chart: {
      type: "radialBar",
    },
    labels: ["Average Latency (ms)"],
  };

  const latencySeries = [250];
  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex-1 ml-64 bg-gray-100">
        <header className="bg-white shadow-md p-4">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Chart
                options={activeServersOptions}
                series={activeServersSeries}
                type="bar"
                height={200}
              />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <Chart
                options={requestsOptions}
                series={requestsSeries}
                type="line"
                height={200}
              />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <Chart
                options={latencyOptions}
                series={latencySeries}
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
