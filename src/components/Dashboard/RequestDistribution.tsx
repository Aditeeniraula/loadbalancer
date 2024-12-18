import React from "react";
import Chart from "react-apexcharts";
import { StatisticsResponse } from "../../types/response.types";

interface RequestDistributionProps {
  data: StatisticsResponse[];
}


const colorsList = ["#00C7AA", "#5F9E00", "#D14F3A", "#E6A1A1", "FFABFA", "01FFCC"]

const RequestDistribution: React.FC<RequestDistributionProps> = ({ data }) => {
  const labels: any[] = Object(data).map((item: StatisticsResponse) => {
    return item.url;
  });

  const seriesData = Object(data).map((item: StatisticsResponse) => {
    return item.successful_requests;
  });

  const colors = Object(data).map((_: StatisticsResponse, index: number) => {
    if (index >= colorsList.length) {
      return colorsList[index % colorsList.length];
    }
    return colorsList[index];

  });

  const chartOptions = {
    chart: {
      type: "pie",
    },
    labels: labels,
    colors: colors,
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
    },
  };

  return (
    <div className="w-full h-auto bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Request Distribution</h2>
      <Chart
        series={seriesData}
        options={chartOptions}
        type="pie"
        width="100%"
        height={300}
      />
    </div>
  );
};

export default RequestDistribution;
