import { Button } from '@/components/ui/button';
import { AiOutlineFileAdd as AddIcon } from "react-icons/ai";
import { Link } from 'react-router-dom';
import CardContainer from './components/CardContainer';
import ManagersContainer from './components/ManagersContainer';
import GraphContainer from './components/GraphContainer';
import PieChartContainer from './components/PieChartContainer';
const Dashboard = () => {
  return (
    <div className="w-full h-screen p-10  overflow-y-auto bg-neutral-100">
      <div className="flex justify-between items-end mb-6">
        <div className="text-4xl font-Poppins font-bold">Overview</div>
        <Link to={"/org/certificates/add"}>
          <Button className="bg-blue-700 gap-1 py-5 rounded-full hover:bg-blue-800">
            <AddIcon size={22} />
            <div>Download as PDF</div>
          </Button>
        </Link>
      </div>
      <div className="h-[80%] grid grid-cols-8 grid-rows-3 gap-6">
        <CardContainer/>
        <ManagersContainer/>
        <GraphContainer/>
        <PieChartContainer/>
      </div>
    </div>
  );
}

export default Dashboard
