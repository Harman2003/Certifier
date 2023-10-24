import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const VerifyAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(auth);
  return (
    <>
      {auth?.accessToken && auth?.user ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default VerifyAuth;
