import { useQuery } from "react-query";
import axios from "@/setup/api/axios";
import { AxiosResponse } from "axios";
import useAxiosPrivate from "@/setup/hooks/useAxiosPrivate";
const useApiReceiver = (url: string, params: Object, isPrivate: boolean) => {
  const axiosPrivate = useAxiosPrivate();
  const { data, refetch, isLoading, status } = useQuery(
    ["useApiReceiver", url, params],
    ({ signal }) => apiCall(signal),
    { refetchOnWindowFocus: true }
  );

  const receive = () => refetch();
  return { data: data?.data, isLoading, status, receive };

  async function apiCall(signal?: AbortSignal): Promise<AxiosResponse | void> {
    console.log(params);
    const fetch = isPrivate ? axiosPrivate : axios;
    const response = await fetch.get(url, { params:params, signal });
    console.log(response?.data)
    return response;
  }
};

export default useApiReceiver;
