import axios from "@/setup/api/axios";
import { AxiosResponse } from "axios";

export const verifyOtp = async ({
  email,
  otp,
  token,
}: {
  email: string;
  otp: string;
  token: string;
}): Promise<AxiosResponse | void> => {
  console.log(token);
  const response = await axios.post(
    "/auth/verifyotp",
    {
      email: email,
      otp: otp,
    },
    { headers: { "authorization": `Bearer ${token}` } }
  );

  return response;
};
