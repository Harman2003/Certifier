import { ApexOptions } from "apexcharts";
export const TotalRevenueSeries = [
  {
    name: "Last Year",
    data: [100, 130, 110, 85, 70, 65, 60, 68],
  },
  {
    name: "Running Year",
    data: [40, 84, 72, 60, 108, 110, 120, 130],
  },
];

export const TotalRevenueOptions: ApexOptions = {
  chart: {
    type: "area",
    toolbar: {
      show: false,
    },
  },
  colors: ["#f59b47", "#4ff76b"],
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      columnWidth: "55%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    show: true,
  },
  stroke: {
    // colors: ["transparent"],
    width: 4,
    curve: "smooth",
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
  },
  yaxis: {
    title: {
      text: "Number of Certificates",
      style: {
        fontWeight: 500,
        fontSize: "16px",
        color: "#9CA3AF",
      },
    },
  },
  fill: {
    opacity: 1,
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
  },
  tooltip: {
    y: {
      formatter(val: number) {
        return `$ ${val} thousands`;
      },
    },
  },
};
