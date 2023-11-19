import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/Home/HomePage";
import LandingPage from "./pages/Home/LandingPage";
import OrgPage from "./pages/org/Main";
import UserPage from "./pages/user/Main";
import ManagerPage from "./pages/manager/Main";
import Templates from "./pages/templates/Main";
import NotFound from "./pages/404/notFound";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "react-query";
import VerifyAuth from "./setup/VerifyAuth";
function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <div className="App h-screen w-screen overflow-hidden">
        <Routes>
          <Route path="/">
            <Route index element={<LandingPage />} />
            <Route
              path="/auth/*"
              element={
                <GoogleOAuthProvider clientId="168245098231-7q552uqbffg3lf5f6hp841jju1fluf9b.apps.googleusercontent.com">
                  <HomePage />
                </GoogleOAuthProvider>
              }
            />

            <Route element={<VerifyAuth allowedRoles={["org", "manager"]} />}>
              <Route path={"/templates"} element={<Templates />} />
            </Route>

            <Route element={<VerifyAuth allowedRoles={["org"]} />}>
              <Route path="/org/*" element={<OrgPage />} />
            </Route>

            <Route element={<VerifyAuth allowedRoles={["manager"]} />}>
              <Route path="/manager/*" element={<ManagerPage />} />
            <Route />

            <Route element={<VerifyAuth allowedRoles={["user"]} />}>
                <Route path="/user/*" element={<UserPage />} />
            </Route>
            </Route>

            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
