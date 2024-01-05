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
  // const isOnboarding = (!orgContract && step < 6);

  return (
      <div className="w-full h-full grid grid-cols-6">
      <Onboarding/>
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
