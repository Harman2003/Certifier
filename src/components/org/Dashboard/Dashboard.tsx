import { Button } from "@/components/ui/button";
import { AiOutlineFileAdd as AddIcon } from "react-icons/ai";
import CardContainer from "./components/CardContainer";
import ManagersContainer from "./components/ManagersContainer";
import GraphContainer from "./components/GraphContainer";
import PieChartContainer from "./components/PieChartContainer";
import DownloadCard from "./components/DownloadCard";
import Recents from "./components/RecentsContainer";
import RecentsContainer from "./components/RecentsContainer";
import ContractCard from "@/components/org/Dashboard/components/ContractCard";
import bg from "@/assets/onboardBG.svg";
import useWeb3 from "@/setup/hooks/web3/useWeb3";
const Dashboard = () => {
 const {orgContract} = useWeb3();
  return (
    <div className="w-full h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden bg-neutral-100 flex items-center justify-center">
      {orgContract ? (
        <div className="h-full p-3 grid grid-cols-3 grid-rows-[repeat(8,minmax(0,1fr))] gap-6">
          <CardContainer />
          <DownloadCard />
          <GraphContainer />
          <ManagersContainer />
          <RecentsContainer />
        </div>
      ) : (
        <ContractCard />
      )}
    </div>
  );
};

export default Dashboard;
