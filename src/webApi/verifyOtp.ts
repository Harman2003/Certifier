import { axiosPrivate } from "@/setup/api/axios";
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
  console.log(email, token, otp);
  const response = await axiosPrivate.post(
    "/auth/verifyotp",
    {
      email: email,
      otp: otp,
    },
    { headers: { authorization: `bearer ${token}` } }
  );

  return response;
};
