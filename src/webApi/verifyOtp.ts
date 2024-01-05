import { AxiosInstance, AxiosResponse } from "axios";

export const verifyOtp = async ({
  email,
  otp,
  token,
  axios,
}: {
  email: string;
  otp: string;
  token: string;
  axios: AxiosInstance;
}): Promise<AxiosResponse | void> => {
  console.log(token);
  const response = await axios.post(
    "/auth/verifyotp",
    {
      email: email,
      otp: otp,
    },
    { headers: { authorization: `Bearer ${token}` } }
  );

  return response;
};
