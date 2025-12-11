import URI from 'urijs';

import { type UseFetchReturn, createFetch } from '@vueuse/core';

interface IFetchOptions {
  method?: 'post' | 'get';
  data: object;
  url: string;
  timeout?: number;
  headers?: object;
  responseType?: string;
}

export function fetchInstance(customOptions?: IFetchOptions) {
  return createFetch({
    baseUrl: '',
    fetchOptions: {
      mode: 'cors',
    },
    options: {
      timeout: customOptions?.timeout ?? 90 * 1000,
      // updateDataOnError: true,
      async beforeFetch({ options, cancel, url }) {
        options.headers = {
          'Content-Type': 'application/json',
          'app-id': '471068217232781312',
          'api-key': 'ak-170003c900a64f899eec',
          'Authorization': 'Bearer sk-b3571aa64a494b42a371'
        };
        return { options, url };
      },

      afterFetch(ctx) {
        const { data, response } = ctx;
        if (data instanceof Blob) {
          return ctx;
        } else if (response.status >= 200 && response.status < 300) {
          console.log(data.msg || data.message)
        } else if (response.status === 401) {
          console.log(`请求出错-401`);
        } else {
          console.log(`请求出错-${response.status || ''}`);
          ctx.data = null;
        }
        return ctx;
      },
      onFetchError(ctx) {
        return ctx;
      },
    },
  });
}

export function fetchAsync(options: IFetchOptions) {
  const curFetch = fetchInstance(options);
  const { method, data } = options;
  let { url } = options;

  switch (method) {
    case 'get':
      url = new URI(url).query(data);
      return curFetch(url).get().json();
    case 'post':
    default:
      return curFetch(url).post(data).json();
  }
}

export async function fetchSync(options: IFetchOptions) {
  const curFetch = fetchInstance(options);
  const { method, data } = options;
  let { url } = options;
  let res: any;
  switch (method) {
    case 'get':
      url = new URI(url).query(data);
      res = await curFetch(url).get().json();
      break;
    case 'post':
    default:
      if (options.responseType === 'blob') {
        res = await curFetch(url).post(data).blob();
      } else {
        res = await curFetch(url).post(data).json();
      }
  }
  if (res.error.value) {
    return null;
  } else {
    return Promise.resolve(res.data.value);
  }
}

/**
 * @export fetchEntity
 * @template T 默认为useFetch的返回定义，config.sync为true时，可自定返回描述
 * @param {IFetchOptions} options
 * @param {IConfig} [config]
 * @return {*}  {T}
 */
export default function fetchEntity<
  T = UseFetchReturn<any> & PromiseLike<UseFetchReturn<any>>,
>(options: IFetchOptions): T {
  return fetchAsync(options) as T;
}
