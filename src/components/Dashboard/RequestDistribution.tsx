import React from "react";
import Chart from "react-apexcharts";

const RequestDistribution = () => {
  const chartOptions = {
    chart: {
      type: "pie",
    },
    labels: ["Replica 1", "Replica 2", "Replica 3", "Replica 4"],
    colors: ["#98FB98", "#7CFC00", "#FF6347", "#FFC0CB"],
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
    },
  };

  const chartSeries = [15, 35, 25, 25];

  return (
    <div className="w-full h-auto bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Request Distribution</h2>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="pie"
        width="100%"
        height={300}
      />
    </div>
  );
};

export default RequestDistribution;
