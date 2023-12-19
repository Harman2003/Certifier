import { Button } from "@/components/ui/button";
import { AiOutlineFileAdd as AddIcon } from "react-icons/ai";
import { Link } from "react-router-dom";
import CardContainer from "./components/CardContainer";
import ManagersContainer from "./components/ManagersContainer";
import GraphContainer from "./components/GraphContainer";
import PieChartContainer from "./components/PieChartContainer";
import DownloadCard from "./components/DownloadCard";
import Recents from "./components/RecentsContainer";
import RecentsContainer from "./components/RecentsContainer";
const Dashboard = () => {
  return (
    <div className="w-full h-screen p-10  overflow-y-auto bg-neutral-100">
      <div className="h-full grid grid-cols-3 grid-rows-[repeat(8,minmax(0,1fr))] gap-6">
        <CardContainer />
        <DownloadCard />
        <GraphContainer />
        {/* <PieChartContainer /> */}
        <ManagersContainer />
        <RecentsContainer/>
      </div>
    </div>
  );
};

export default Dashboard;
