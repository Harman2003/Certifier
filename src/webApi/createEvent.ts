import { calcDuration } from "@/utils/calcDuration";
import { AxiosInstance, AxiosResponse } from "axios";
interface createEventProps {
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
export const createEvent = async ({
  name,
  type,
  duration,
  durationType,
  managers,
  description,
  templateId,
  image,
  axios,
}: createEventProps): Promise<AxiosResponse | void> => {
  const totalDuration = calcDuration(duration, durationType);
  console.log(totalDuration)
  const response = await axios.post("/events/create", {
    name: name,
    type: type,
    duration: totalDuration,
    managers: managers,
    description: description,
    templateId: templateId,
    image:image
  });
  return response;
};
