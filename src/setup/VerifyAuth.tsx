import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const VerifyAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(auth);
  return (
    <>
      {auth?.accessToken && auth?.email ? (
        <Outlet />
      ) : (
        <Navigate to="/auth/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default VerifyAuth;
