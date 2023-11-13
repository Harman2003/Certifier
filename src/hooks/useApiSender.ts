import { AxiosResponse} from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
const useApiSender = (apiCall:any) => {
  const { mutateAsync, isLoading, data:response ,status} = useMutation(apiCall, {
    onSuccess: (response:AxiosResponse) => {
      console.log(response.data);
    },
    onSettled(res, error) {
      let message;
      if (error) {
        message = (error as any).response?.data?.message;
        if (!message) message = "Something went wrong";
        toast.error(message);
      } else {
        message = res?.data?.message;
        if (!message) message = "Success";
        toast.success(message);
        }
    },
  });
  const send = async (params:any) => mutateAsync(params);
  return {
    send,
    isLoading,
    data:response?.data,
    status
  };
};
export default useApiSender;
