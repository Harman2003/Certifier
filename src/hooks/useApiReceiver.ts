import { useQuery } from "react-query";

const useApiReceiver = (apiCall:Function, params:any) => {
  const { data, refetch, isLoading, isError } = useQuery(
    ["useApiReceiver", params],
    ({ signal }) => apiCall(params, signal),
    { refetchOnWindowFocus: true, cacheTime: 0 }
  );

  const receive = () => refetch();
  return { data, isLoading, isError, receive };

  // async function apiCall(
  //   url: string,
  //   params: Params,
  //   signal?: AbortSignal
  // ): Promise<AxiosResponse | void> {
  //   try {
  //     const response = await axiosPrivate.get(url, { ...params, signal });
  //     return response;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
};

export default useApiReceiver;
