import { AxiosInstance, AxiosResponse } from "axios";

export interface loginProps {
  email: string;
  password: string;
  token: string;
  oauth: boolean;
  axios:AxiosInstance
}
export const loginAccount = async ({
  email,
  password,
  token,
  oauth,
  axios
}: loginProps): Promise<AxiosResponse | void> => {
  const response = await axios.post(
    "/auth/login",
    {
      email: email,
      password: password,
      oauth: oauth,
    },
    {
      headers: {
        authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
    
  return response;
}