import { TotalRevenueOptions, TotalRevenueSeries } from '@/utils/dashChart';
import ReactApexChart from 'react-apexcharts';

const GraphContainer = () => {
  return (
    <div className="col-span-2 row-span-5 rounded-2xl bg-white p-4">
      <div className="font-bold text-2xl font-Poppins text-gray-800">Monthly Certificates Data</div>
      <ReactApexChart
        series={TotalRevenueSeries}
        type="area"
        height={'90%'}
        options={TotalRevenueOptions}
      />
    </div>
  );
}

export default GraphContainer
