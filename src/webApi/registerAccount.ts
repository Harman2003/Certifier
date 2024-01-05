import { AxiosInstance, AxiosResponse } from "axios";

export interface registerProps {
  fullname: string;
  email: string;
  password: string;
  role: string;
  picture: string;
  token: string;
  oauth: boolean;
  axios:AxiosInstance
}
export const registerAccount = async ({
  fullname,
  email,
  password,
  role,
  picture,
  token,
  oauth,
  axios
}:registerProps): Promise<AxiosResponse | void> => {
  const response = await axios.post(
    "/auth/register",
    {
      fullname: fullname,
      email: email,
      password: password,
      role: role,
      picture: picture,
      oauth: oauth,
    },
    { headers: { authorization: `bearer ${token}` } }
  );
  // console.log(response)
  // if (response.status == 200) {
  //   response.data.message = oauth?"Successfully Logged In":"Successfully Registered";
  // }
  return response;
};
