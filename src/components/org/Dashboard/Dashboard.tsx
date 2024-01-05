import CardContainer from "./components/CardContainer";
import ManagersContainer from "./components/ManagersContainer";
import GraphContainer from "./components/GraphContainer";
import PieChartContainer from "./components/PieChartContainer";
import DownloadCard from "./components/DownloadCard";
import RecentsContainer from "./components/RecentsContainer";
const Dashboard = () => {
  return (
    <div className="w-full h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden bg-neutral-100 flex items-center justify-center">
        <div className="h-full p-3 grid grid-cols-3 grid-rows-[repeat(8,minmax(0,1fr))] gap-6">
          <CardContainer />
          <DownloadCard />
          <GraphContainer />
          <ManagersContainer />
          <RecentsContainer />
        </div>
    </div>
  );
};

export default Dashboard;
