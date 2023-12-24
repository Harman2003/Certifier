import Sidebar from "@/components/common/Sidebar";
import { sidebarContent } from "./utils/sidebarContent";
import Navbar from "../../components/common/Navbar";
import { Routes, Route } from "react-router-dom";
import Events from "../../components/org/Events/Events";
import Dashboard from "../../components/org/Dashboard/Dashboard";
import Certification from "../../components/org/Certification/Certification";
import AccessRequest from "../../components/org/AccessRequests/AccessRequest";
import ExportRecord from "../../components/org/ExportRecord/ExportRecord";
import Onboarding from "../Home/Onboarding";
import { useState } from "react";
import useWeb3 from "@/setup/hooks/web3/useWeb3";
import { SquareLoader } from "@/components/utils/contractLoader";

const Main = () => {
  const isOnboardingDone = localStorage.getItem("onboarding");
  const [step, setStep] = useState<number>(isOnboardingDone?3:0);
  const { orgContract, loading } = useWeb3();
  const isOnboarding = !orgContract && step < 6;

  return loading ? (
    <SquareLoader />
  ) : (
    <div className="w-full h-full grid grid-cols-6">
      {isOnboarding && <Onboarding step={step} setStep={setStep} />}
      <aside className="col-span-1">
        <Sidebar content={sidebarContent} />
      </aside>
      <div className="col-span-5">
        <header className="h-16 bg-white/95 border-b border-gray-200/75">
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path={"/"} element={<Dashboard />} />
            <Route path="/events/*" element={<Events />} />
            <Route path={"/certificates/*"} element={<Certification />} />
            <Route path={"/requests"} element={<AccessRequest />} />
            <Route path={"/export"} element={<ExportRecord />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Main;
