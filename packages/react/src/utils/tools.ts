/**
 * 生成符合 UUID v4 标准的随机 UUID
 * 在现代浏览器中使用 crypto.randomUUID()，在旧环境中使用兼容实现
 */
export function generateUUID(): string {
  // 优先使用原生 crypto.randomUUID()
  if (typeof crypto !== 'undefined' && crypto?.randomUUID) {
    return crypto.randomUUID();
  }

  // 最后备选：纯 Math.random() 实现（不建议在生产环境使用）
  return generateUUIDFallback();
}

/**
 * 回退方案：使用 Math.random() 生成 UUID
 * 注意：这不是密码学安全的，仅用于兼容性
 */
function generateUUIDFallback(): string {
  let d = new Date().getTime();
  if (typeof performance !== 'undefined' && performance.now) {
    d += performance.now(); // 使用高精度时间戳
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
