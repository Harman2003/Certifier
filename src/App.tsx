import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/Home/HomePage";
import LandingPage from "./pages/Home/LandingPage";
import OrgPage from "./pages/org/Main";
import UserPage from "./pages/user/Main";
import ManagerPage from "./pages/manager/Main";
import Templates from "./pages/templates/Main";
import NotFound from "./pages/404/notFound";
function App() {
  return (
    <div className="App h-screen w-screen overflow-hidden">
      <Routes>
        <Route path="/">
          <Route index element={<LandingPage />} />
          <Route path="/auth/*" element={<HomePage />} />
          <Route path={"/templates"} element={<Templates />} />
          <Route path="/org/*" element={<OrgPage />} />
          <Route path="/manager/*" element={<ManagerPage />} />
          <Route path="/user/*" element={<UserPage />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
