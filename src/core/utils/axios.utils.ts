import axios, { AxiosRequestConfig } from "axios";

const httpBase = (
  includeHeader = false,
  additionalConfig: AxiosRequestConfig<any> = {},
  additionalHeader: Record<string, string> | undefined = undefined,
) => {
  // /**
  //  * AUTH TOKEN
  //  */
  // const token = useAuthStore.getState().token;

  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,
    headers: additionalHeader && includeHeader ? { ...additionalHeader } : {},
    ...additionalConfig,
  });

  /**
   * REQUEST INTERCEPTORS
   */
  instance.interceptors.request.use((config) => {
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    config.headers["Accept"] = "application/json";
    if (
      config.method === "POST" ||
      config.method === "PUT" ||
      config.method === "PATCH"
    ) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  });

  /**
   * RESPONSE INTERCEPTORS
   */
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: any) => {
      // const statusCode = error?.response?.status;
      console.log(error);
      // if (statusCode === 401) {
      //   const token = await getLocalStorage(AppConfig.auth_token);

      //   if (token) {
      //     localStorage.clear();
      //     useAuthStore.getState().resetState();
      //     // toast that session has expired
      //   }
      // } else if (statusCode === 403) {
      //   // router navigate to 403 page
      //   throw new Error("i am 403 error");
      // }
      return Promise.reject(error);
    },
  );
  return instance;
};

export default httpBase;
