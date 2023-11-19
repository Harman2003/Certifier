import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const VerifyAuth = ({ allowedRoles }: {allowedRoles: string[]}) => {
  const { auth } = useAuth();
  const location = useLocation();
  
  return(
    !auth?.accessToken ?
      <Navigate to="/auth/login" state={{ from: location }} replace />
      : !allowedRoles?.includes(auth?.role)
        ? <Navigate to="/notfound" state={{from:location}} replace />
        : <Outlet />
  )
};

export default VerifyAuth;
