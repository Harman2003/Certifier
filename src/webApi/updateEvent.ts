import { calcDuration } from "@/utils/calcDuration";
import { AxiosInstance, AxiosResponse } from "axios";
interface updateEventProps {
  eventId: string;
  name: string;
  type: string;
  duration: string;
  durationType: string;
  managers: string[];
  description: string;
  templateId: string;
  image: string;
  axios: AxiosInstance;
}
export const updateEvent = async ({
  eventId,
  name,
  type,
  duration,
  durationType,
  managers,
  description,
  templateId,
  image,
  axios,
}: updateEventProps): Promise<AxiosResponse | void> => {
  const totalDuration = calcDuration(duration, durationType);
  const response = await axios.put("/events/update", {
    eventId: eventId,
    name: name,
    type: type,
    duration: totalDuration,
    managers: managers,
    description: description,
    templateId: templateId,
    image: image,
  });
  return response;
};
