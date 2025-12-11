import fetchEntity from '../index';

// 初始化
export function chatInit(data: Record<string, any>) {
  return fetchEntity({
    url: '/openapi/abp/v1/chat/chatInit',
    data,
  });
}

// 对话
export function completions(data: Record<string, any>) {
  return fetchEntity({
    url: '/openapi/abp/v1/chat/completions',
    data,
  });
}

// 获取请求问题的推荐问题
export function recommendQuestionReq(data: Record<string, any>) {
  return fetchEntity({
    url: '/openapi/abp/v1/chat/recommendQuestionReq',
    data,
  });
}
