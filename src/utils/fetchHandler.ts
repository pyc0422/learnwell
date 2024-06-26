import { request } from "http";

const BASE_URL = 'https://take-home-assessment-423502.uc.r.appspot.com/api/videos';

type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';

interface FetchOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: Record<string, any>;
}

export const fetchHandler = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<Record<string, any>> => {

  const requestOptions: RequestInit = {
    method: options.method || 'GET',
    headers:  {
      'accept': 'application/json',
      ...options.headers}
  }

  if (requestOptions.method !== 'GET') {
    requestOptions.headers= {
      'Content-Type':'Application/json',
      ...requestOptions.headers
    }
  }

  if(options.body) {
    requestOptions.body = JSON.stringify(options.body);
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, requestOptions);
  if (!res.ok) {
    //throw new Error(`HTTP error! Status: ${res.status}`);
    return {status: res.status};
  }
  const json = await res.json();
  console.log('json', json)
  return json;
}