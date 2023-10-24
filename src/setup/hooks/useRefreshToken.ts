import axios from "../api/axios";
import useAuth from "./useAuth";
import { useNavigate, useLocation } from "react-router-dom";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function refresh(): Promise<{
    email: string;
    newAccessToken: string;
    role: string;
  }> {
    try {
      const response = await axios.get("/auth/refresh", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // console.log(response);
      localStorage.setItem(
        "auth",
        JSON.stringify({
          email: response.data.email,
          accessToken: response.data.accessToken,
          role: response.data.role,
        })
      );

      setAuth({
        email: response.data.username,
        accessToken: response.data.accessToken,
        role: response.data.role,
      });

      return {
        email: response.data.email,
        newAccessToken: response.data.accessToken,
        role: response.data.role,
      };
    } catch (err) {
      navigate("/login", { state: { from: location } });
      throw err;
    }
  }
  return refresh;
};

export default useRefreshToken;
