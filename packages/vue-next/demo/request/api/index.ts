import fetchEntity from '../index';

export function chatInit(data) {
  return fetchEntity({
    url: '/openapi/abp/v1/chat/chatInit',
    data,
  });
}


export function completions(data) {
  return fetchEntity({
    url: '/openapi/abp/v1/chat/completions',
    data,
  });
}