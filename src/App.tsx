// import RangeSlider from './hooks/Slider'
// import { DataTableDemo } from './pages/Table'
import { Routes, Route } from "react-router-dom";
// import Welcome from "./pages/welcome/welcome";
// import NotFound from "./pages/404/notFound";
// import Admin from "./pages/admin/admin";
// import Homepage from "./pages/welcome/home";
// import Validation from "./pages/validation/validate";
import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from './pages/Home/HomePage';
import LandingPage from "./pages/Home/LandingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
const client = new QueryClient();
  return (
    <div className="App h-screen w-screen">
      {/* <QueryClientProvider client={client}>
            <Routes>
              <Route path="/signup" element={<Welcome current={false} />} />
              <Route path="/login" element={<Welcome current={true} />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="/" element={<Homepage />} />
              <Route path="/validate" element={<Validation />} />
              <Route
                path="/signupOrg"
                element={<Welcome current={{ isLog: false, isOrg: true }} />}
              />
              <Route
                path="/loginOrg"
                element={<Welcome current={{ isLog: true, isOrg: true }} />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </QueryClientProvider> */}
      {/* <Signup/> */}

      <QueryClientProvider client={client}>
        <Routes>
          <Route path="/">
            <Route index element={<LandingPage />} />
            <Route path="/auth/*" element={<HomePage />} />
          </Route>
        </Routes>
      </QueryClientProvider>
      <ToastContainer />
    </div>
  );
}

export default App
