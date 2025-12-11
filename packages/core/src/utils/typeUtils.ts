/**
 * 检查是否为对象（非数组、非null）
 */
export function isPlainObject(
  value: unknown,
): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * 检查是否为函数
 */
export function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === 'function';
}

/**
 * 检查是否为数组
 */
export function isArray(value: unknown): value is any[] {
  return Array.isArray(value);
}

/**
 * 检查是否为Map
 */
export function isMap(value: unknown): value is Map<any, any> {
  return value instanceof Map;
}

/**
 * 检查是否为空对象
 */
export function isEmptyObject(
  value: unknown,
): value is Record<string, unknown> {
  return isPlainObject(value) && Object.keys(value).length === 0;
}

/**
 * 检查是否为字符串
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * 检查是否为数字
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
