import { AxiosInstance, AxiosResponse } from "axios";

export const createTemplate = async ({
  form,
  axios,
}: {
  form: FormData;
  axios: AxiosInstance;
  }): Promise<AxiosResponse | void> => {
  const response = await axios.post("/template/create", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};
