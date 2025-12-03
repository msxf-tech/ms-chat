import { EventEmitter } from '../../event/index';
import {
  Message,
  MESSAGE_ACTION_TYPE,
  PluginRegistration,
} from '../../model';
import { PluginSystem, createWrappedFunction } from '../pluginSystem';
export class MessageListStore extends EventEmitter {
  private messageList: Message[] = [];
  private pluginSystem = new PluginSystem();

  constructor(plugins?: PluginRegistration[]) {
    super();
    plugins?.forEach((p) => this.pluginSystem.register(p));
    this.initialize();
  }
  // ======> conversation 会话管理结束
  // ======> chatList 消息管理开始
  // 添加消息
  addMessage(message: Message): void {
    this.messageList.push(message);
    this.emit(MESSAGE_ACTION_TYPE.ADD, message);
  }

  // 批量添加消息
  addMessages(messages: Message[]): void {
    this.messageList.push(...messages);
    this.emit(MESSAGE_ACTION_TYPE.ADDS, messages);
  }

  // 修改消息
  updateMessages(id: string, updates: Partial<Message>): boolean {
    const index = this.messageList.findIndex((c) => c.id === id);
    if (index === -1) return false;
    this.messageList[index] = {
      ...this.messageList[index],
      ...updates,
    } as Message;
    this.emit(MESSAGE_ACTION_TYPE.UPDATE, { id, updates: { ...updates } });
    return true;
  }

  // 删除消息(按id)
  deleteMessage(id: string): boolean {
    const initialLength = this.messageList.length;
    this.messageList = this.messageList.filter((c) => c.id !== id);
    this.emit(MESSAGE_ACTION_TYPE.DELETE, id);
    return this.messageList.length !== initialLength;
  }

  // 删除消息(按索引)
  deleteMessageByIndex(index: number): boolean {
    if (index < 0 || index >= this.messageList.length) return false;
    this.messageList.splice(index, 1);
    this.emit(MESSAGE_ACTION_TYPE.DELETE_IDX, index);
    return true;
  }

  // 删除消息(按条件)
  deleteMessages(predicate: (message: Message) => boolean): number {
    const initialLength = this.messageList.length;
    this.messageList = this.messageList.filter((msg) => !predicate(msg));
    this.emit(MESSAGE_ACTION_TYPE.DELETES, predicate);
    return initialLength - this.messageList.length;
  }

  // 获取单个消息（按id）
  getAllMessage(id: string): Message | undefined {
    this.emit(MESSAGE_ACTION_TYPE.GET, id);
    return this.messageList.find((c) => c.id === id);
  }

  // 获取所有消息 （返回浅副本）
  getAllMessages(): Message[] {
    const _messageList = [...this.messageList];
    this.emit(MESSAGE_ACTION_TYPE.GETALL, _messageList);
    return _messageList;
  }

  // 按类型筛选消息
  getMessagesByType<T extends Message>(
    typeGuard: (msg: Message) => msg is T,
  ): T[] {
    this.emit(MESSAGE_ACTION_TYPE.GETTYPE, typeGuard);
    return this.messageList.filter(typeGuard) as T[];
  }

  // 获取最新N条消息
  getLatestMessages(count: number): Message[] {
    this.emit(MESSAGE_ACTION_TYPE.GETLAST, count);
    return this.messageList.slice(-count);
  }

  // 清空消息列表
  initMessages(messageList: Message[] = []): void {
    this.messageList = messageList;
    this.emit(MESSAGE_ACTION_TYPE.INIT);
  }
  // ======> chatList 消息管理结束
  initialize() {
    this.addMessage = createWrappedFunction(
      this.addMessage.bind(this),
      'addMessage',
      this.pluginSystem,
    );
    this.deleteMessage = createWrappedFunction(
      this.deleteMessage.bind(this),
      'deleteMessage',
      this.pluginSystem,
    ) as unknown as (id: string) => boolean;
    this.updateMessages = createWrappedFunction(
      this.updateMessages.bind(this),
      'updateMessages',
      this.pluginSystem,
    ) as unknown as (id: string) => boolean;
  }
}
