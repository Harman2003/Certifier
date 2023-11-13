import Sidebar from "@/components/common/Sidebar";
import { sidebarContent } from "./utils/sidebarContent";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Events from "./components/Events/Main";
import Certification from "./components/Certification";
import AccessRequest from "./components/AccessRequest";
import Templates from "./components/Templates";
import ExportRecord from "./components/ExportRecord";
import AddEvent from "./components/Events/components/AddEvent";
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
            <Route path={"/certificates"} element={<Certification />} />
            <Route path={"/requests"} element={<AccessRequest />} />
            <Route path={"/templates"} element={<Templates />} />
            <Route path={"/export"} element={<ExportRecord />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Main;
