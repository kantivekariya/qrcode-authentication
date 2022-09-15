import axios from "axios";
import { getLocalState } from "../utils/helpers";

const instance = axios.create({
  timeout: 10000,
  params: {},
});

/* Store requests */
const sourceRequest: Record<string, any> = {};

/* Add a request interceptor */
instance.interceptors.request.use(
  async (request: any) => {
    const access_token = getLocalState("access_token");

    if (access_token) {
      request.headers.common["authorization"] = access_token;
    }

    /* If the application exists cancel */
    if (sourceRequest[request.url]) {
      sourceRequest[request.url].cancel("Previous same call cancellation");
    }

    /* Store or update application token */
    const axiosSource = axios.CancelToken.source();
    sourceRequest[request.url] = { cancel: axiosSource.cancel };
    request.cancelToken = axiosSource.token;

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiService = {
  request(config = {}) {
    return instance.request(config);
  },
  getData(url: string, config = {}) {
    return instance.get(url, config);
  },
  postData(url: string, data?: any, config?: Record<string, any>) {
    return instance.post(url, data, config);
  },
  putData(url: string, data?: any, config?: Record<string, any>) {
    return instance.put(url, data, config);
  },
  patchData(url: string, data?: any) {
    return instance.patch(url, data);
  },
  deleteData(url: string, config = {}) {
    return instance.delete(url, config);
  },
};
