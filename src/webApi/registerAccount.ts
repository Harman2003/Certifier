import { axiosPrivate } from "@/setup/api/axios";
import { AxiosResponse } from "axios";

export const registerAccount = async ({
  fullname,
  email,
  password,
  role,
  orgid,
  token,
}: {
  fullname: string;
  email: string;
  password: string;
  role: string;
  orgid: string;
  token: string;
}): Promise<AxiosResponse | void> => {
  console.log(email, token);
  const response = await axiosPrivate.post(
    "/auth/register",
    {
      fullname: fullname,
      email: email,
      password: password,
      role: role,
      orgid: orgid,
    },
    { headers: { authorization: `bearer ${token}` } }
  );

  return response;
};
