import { axiosPrivate } from "@/setup/api/axios";
import { AxiosResponse } from "axios";

export const sendOtp = async (email: string): Promise<AxiosResponse | void> => {
  console.log(email)
  const response = await axiosPrivate.post("/auth/sendotp", {email:email});
  return response;
};
