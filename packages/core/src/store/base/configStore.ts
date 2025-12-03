import { ChatConfig, CHATCONFIG_ACTION_TYPE } from '../../model';
import { EventEmitter } from '../../event/index';
export class ChatConfigManager extends EventEmitter {
  private config: ChatConfig;

  constructor(initialConfig: ChatConfig) {
    super();
    this.config = initialConfig;
  }

  // 获取完整配置
  initConfig(config = {}): void {
    this.config = config;
    this.emit(CHATCONFIG_ACTION_TYPE.INIT, this.config);
  }

  // 获取完整配置
  getConfig(): ChatConfig {
    this.emit(CHATCONFIG_ACTION_TYPE.GET, this.config);
    return this.config;
  }

  // 更新配置项
  updateConfig<T extends keyof ChatConfig>(
    key: T,
    newValue: Partial<ChatConfig[T]>,
  ) {
    this.config[key] = { ...this.config[key], ...newValue };
    this.emit(CHATCONFIG_ACTION_TYPE.UPDATE, { ...newValue });
  }

  // 删除配置项
  deleteConfig<T extends keyof ChatConfig>(key: T) {
    delete this.config[key];
    this.emit(CHATCONFIG_ACTION_TYPE.DELETE, key);
  }

  // 查询配置项
  queryConfig<T extends keyof ChatConfig>(key: T): ChatConfig[T] | undefined {
    this.emit(CHATCONFIG_ACTION_TYPE.QUERY, key);
    return this.config[key];
  }
}
