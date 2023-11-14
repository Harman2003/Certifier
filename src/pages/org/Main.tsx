import Sidebar from "@/components/common/Sidebar";
import { sidebarContent } from "./utils/sidebarContent";
import Navbar from "../../components/common/Navbar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../../components/org/Dashboard/Dashboard";
import Events from "../../components/org/Events/Events";
import Certification from "../../components/org/Certification/Certification";
import AccessRequest from "../../components/org/AccessRequests/AccessRequest";
import ExportRecord from "../../components/org/ExportRecord/ExportRecord";

const Main = () => {
  return (
    <div className="grid grid-cols-5">
      <aside className="col-span-1">
        <Sidebar content={sidebarContent} />
      </aside>
      <div className="col-span-4">
        <header className="h-20 sticky top-0 bg-white/95 shadow-md z-50">
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path={"/"} element={<Dashboard />} />
            <Route path="/events/*" element={<Events/>}/>
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
