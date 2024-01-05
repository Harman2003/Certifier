import { calcDuration } from "@/utils/calcDuration";
import { AxiosInstance, AxiosResponse } from "axios";
interface deleteEventProps {
  id:string
  axios: AxiosInstance;
}
export const deleteEvent = async ({
  id,
  axios
}: deleteEventProps): Promise<AxiosResponse | void> => {
  const response = await axios.delete("/events/remove", {params:{eventId:id}});
  return response;
};
