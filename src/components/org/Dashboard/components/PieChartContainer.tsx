import event_types from "@/utils/eventTypes";
import React from "react";
import ReactApexChart from "react-apexcharts";

const PieChartContainer = () => {
  return (
    <div className="col-span-3 row-span-2 rounded-2xl shadow-sm bg-white p-4 flex flex-col">
      <div className="font-semibold text-gray-600">
        Event Types Chart
      </div>
      <div className="w-full h-full mt-6"></div>
      <ReactApexChart
        type="donut"
        series={[15, 20, 30, 10, 5, 10]}
        width={"100%"}
        height={"90%"}
        options={{
          colors: [
            "#add8e6",
            "#87CEEB",
            "#6ca6cd",
            "#4a708b",
            "#206085",
            "#064569",
          ],
          chart: { type: "donut" },
          legend: {
            position: "right",
          },
          labels: event_types,
          dataLabels: {
            enabled: true,
            formatter: function (val: number) {
              return Math.round(val) + "%";
            },

            style: {
              fontWeight: 400,
            },
          },
          responsive: [
            {
              breakpoint: 480,
            },
          ],
        }}
      />
    </div>
  );
};

export default PieChartContainer;
