import { AxiosInstance, AxiosResponse } from "axios";

export const uploadImg = async ({
  form,
  axios,
}: {
  form: FormData;
  axios: AxiosInstance;
}): Promise<AxiosResponse | void> => {
  const response = await axios.post("/common/upload", form, {headers:{'Content-Type': 'multipart/form-data'}});
  return response;
}
