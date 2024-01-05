import { AxiosInstance, AxiosResponse } from "axios";

export const sendOtp = async ({email, axios}:{email:string, axios:AxiosInstance}): Promise<AxiosResponse | void> => {
  console.log(email)
  const response = await axios.post("/auth/sendotp", {email:email});
  return response;
};
