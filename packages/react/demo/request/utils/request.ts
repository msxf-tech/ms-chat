type Method = 'get' | 'post';

interface FetchOptions {
  url: string;
  method?: Method;
  data?: Record<string, any>;
  timeout?: number;
  headers?: Record<string, string>;
  responseType?: 'json' | 'blob';
}

const DEFAULT_TIMEOUT = 90_000;

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'app-id': '471068217232781312',
  'api-key': 'ak-170003c900a64f899eec',
  Authorization: 'Bearer sk-b3571aa64a494b42a371',
};

/**
 * 核心请求方法
 */
export async function request<T = any>(
  options: FetchOptions
): Promise<T | null> {
  const {
    url,
    method = 'post',
    data = {},
    timeout = DEFAULT_TIMEOUT,
    headers = {},
    responseType = 'json',
  } = options;

  // 1. 构造请求地址（GET 场景拼 query）
  let finalUrl = url;
  const init: RequestInit = {
    method: method.toUpperCase(),
    headers: { ...DEFAULT_HEADERS, ...headers },
    mode: 'cors',
  };

  if (method === 'get') {
    const sp = new URLSearchParams(data as any);
    finalUrl += (url.includes('?') ? '&' : '?') + sp.toString();
  } else {
    init.body = JSON.stringify(data);
  }

  // 2. 超时包装
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  init.signal = controller.signal;

  try {
    const res = await fetch(finalUrl, init);
    clearTimeout(timer);

    // 3. 业务状态码处理
    if (res.status >= 200 && res.status < 300) {
      const payload =
        responseType === 'blob' ? await res.blob() : await res.json();
      console.log(payload?.msg || payload?.message);
      return payload;
    }

    if (res.status === 401) {
      console.error('请求出错-401');
    } else {
      console.error(`请求出错-${res.status}`);
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}
