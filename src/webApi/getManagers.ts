import axios from "@/setup/api/axios";
import { AxiosResponse } from "axios";

let previousRequest:any = null;
export const getManagers = async (query: string): Promise<AxiosResponse | void> => {
  if (previousRequest) {
    previousRequest.cancel();
  }
  const controller = new AbortController();
  const response = await axios.get(
    "/org/get_managers",
    {params:{search:query} , signal:controller.signal}
  );

  previousRequest = {
    cancel: () => controller.abort(),
  };
  return response;
};
