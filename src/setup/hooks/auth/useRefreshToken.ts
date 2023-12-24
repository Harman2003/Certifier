import axios from "../../api/axios";
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
      console.log("refresh token");
      const authObject= {
        name: response.data.name,
        email: response.data.email,
        id: response.data.id,
        picture: response.data.picture,
        role: response.data.role,
        accessToken: response.data.accessToken,
      }
      localStorage.setItem(
        "auth",
        JSON.stringify({...authObject})
      );
      setAuth({...authObject});

      return {
        email: response.data.email,
        newAccessToken: response.data.accessToken,
        role: response.data.role,
      };
    } catch (err) {
      console.log('userefresh')
      navigate("/auth/login", { state: { from: location } });
      throw err;
    }
  }
  return refresh;
};

export default useRefreshToken;
