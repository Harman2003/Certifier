import { TotalRevenueOptions, TotalRevenueSeries } from '@/utils/dashChart';
import React from 'react'
import ReactApexChart from 'react-apexcharts';

const GraphContainer = () => {
  return (
    <div className="col-span-3 row-span-2 rounded-2xl shadow-sm bg-white p-4">
      <div className="font-semibold text-gray-600">Monthly Certificates Data</div>
      <ReactApexChart
        series={TotalRevenueSeries}
        type="bar"
        height={'90%'}
        options={TotalRevenueOptions}
      />
    </div>
  );
}

export default GraphContainer
