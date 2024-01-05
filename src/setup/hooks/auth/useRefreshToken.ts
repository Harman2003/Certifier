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
    id:string
  }> {
    try {
      const response = await axios.get("/auth/refresh", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("refresh token");
      const {name, email, id, picture, role, accessToken} = response.data;
      const authObject= {
        name: name,
        email: email,
        id: id,
        picture: picture,
        role: role,
        accessToken: accessToken,
      }
      localStorage.setItem(
        "auth",
        JSON.stringify({...authObject})
      );
      setAuth({...authObject});

      return {
        email: authObject.email,
        newAccessToken: authObject.accessToken,
        role: authObject.role,
        id:authObject.id
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
