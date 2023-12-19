import { useQuery } from "react-query";
import axios from "@/setup/api/axios";
import { AxiosResponse } from "axios";
import useAxiosPrivate from "@/setup/hooks/auth/useAxiosPrivate";
import useAuth from "@/setup/hooks/auth/useAuth";
const useApiReceiver = (url: string, params: Object, isPrivate: boolean) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { data, refetch, isLoading, status } = useQuery(
    ["useApiReceiver", url, params],
    ({ signal }) => apiCall(signal),
    { refetchOnWindowFocus: true }
  );

  const receive = () => refetch();
  return { data: data?.data, isLoading, status, receive };

  async function apiCall(signal?: AbortSignal): Promise<AxiosResponse | void> {
    console.log("call to api")
    const privateParams = { email: auth.email, role: auth.role, id:auth.id };
    const fetch = isPrivate ? axiosPrivate : axios;
    const response = await fetch.get(url, { params:{...params, ...privateParams}, signal });
    return response;
  }
};

export default useApiReceiver;
