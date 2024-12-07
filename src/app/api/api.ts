import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

const SPRING_API_URL = process.env.NEXT_PUBLIC_SPRING_API_URL;

const springApi: AxiosInstance = axios.create({
  baseURL: SPRING_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const addTokenToHeaders = (config: AxiosRequestConfig, token: string | null): AxiosRequestConfig => {
  const updatedConfig = { ...config };
  if (token) {
    updatedConfig.headers = {
      ...updatedConfig.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return updatedConfig;
};

const makeRequest = async (
    apiInstance: AxiosInstance,
    method: Method,
    url: string,
    token: string | null = null,
    data: unknown = null,
    isMultipart: boolean = false, // 멀티파트 요청인지 여부
) => {
  let config: AxiosRequestConfig = {
    method,
    url,
    data,
  };

  // 멀티파트 요청 처리
  if (isMultipart && data instanceof FormData) {
    config.headers = { 'Content-Type': 'multipart/form-data' };
  }

  // 토큰 추가
  config = addTokenToHeaders(config, token);

  try {
    const response: AxiosResponse = await apiInstance(config);
    return response.data;
  } catch (error) {
    let message = '';
    if (error instanceof Error) message = error.message;
    else message = String(error);
    return { body: { message } };
  }
};

export const springApiRequest = (
    method: Method,
    url: string,
    token: string | null = null,
    data: unknown = null,
    isMultipart: boolean = false, // 멀티파트 요청 플래그 추가
) => {
  return makeRequest(springApi, method, url, token, data, isMultipart);
};