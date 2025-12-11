import { request } from './utils/request';

export interface IFetchOptions {
  method?: 'post' | 'get';
  data?: Record<string, any>;
  url: string;
  timeout?: number;
  headers?: Record<string, string>;
  responseType?: 'json' | 'blob';
}

/**
 * 保持与原来 fetchEntity 完全一致的调用签名
 */
export default function fetchEntity<T = any>(options: IFetchOptions) {
  return request<T>(options);
}
