import { AxiosHeaders, Method, RawAxiosRequestHeaders } from "axios";
import axiosInstance from "./axiosInstance";

type MethodsHeaders = Partial<
  {
    [Key in Method as Lowercase<Key>]: AxiosHeaders;
  } & { common: AxiosHeaders }
>;

export const getRequest = (data: {
  url: string;
  params?: any;
  headers?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders;
}) => {
  const { url, params, headers } = data;
  return axiosInstance.get(url, {
    params,
    headers,
  });
};

export const postRequest = (data: {
  url: string;
  payload?: any;
  params?: any;
  headers?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders;
}) => {
  const { url, params, headers, payload } = data;
  return axiosInstance.post(url, payload, {
    params,
    headers,
  });
};

export const putRequest = (data: {
  url: string;
  payload?: any;
  params?: any;
  headers?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders;
}) => {
  const { url, params, headers, payload } = data;
  return axiosInstance.put(url, payload, {
    params,
    headers,
  });
};

export const patchRequest = (data: {
  url: string;
  payload?: any;
  params?: any;
  headers?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders;
}) => {
  const { url, params, headers, payload } = data;
  return axiosInstance.patch(url, payload, {
    params,
    headers,
  });
};
