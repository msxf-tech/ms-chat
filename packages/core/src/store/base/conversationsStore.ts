import { EventEmitter } from '../../event/index';
import {
  Conversation,
  CURRENT_CONVERSATION_ACTION_TYPE,
  CONVERSATION_ACTION_TYPE,
  PluginRegistration,
} from '../../model';
import { PluginSystem, createWrappedFunction } from '../pluginSystem';
export class ConversationsStore extends EventEmitter {
  private conversations: Conversation[] = [];
  private currentConversation: Conversation | null = null;
  private pluginSystem = new PluginSystem();

  constructor(plugins?: PluginRegistration[]) {
    super();
    plugins?.forEach((p) => this.pluginSystem.register(p));
    this.initialize();
  }
  // ======> conversation 会话管理开始
  initCurrentConversation(conversations: Conversation[] = []): void {
    this.conversations = conversations;
    this.emit(CONVERSATION_ACTION_TYPE.INIT, conversations);
  }
  getCurrentConversation(): Conversation | null {
    this.emit(CURRENT_CONVERSATION_ACTION_TYPE.GET, this.currentConversation);
    return this.currentConversation;
  }
  setCurrentConversation(conversationId: string): void {
    this.currentConversation =
      this.conversations.find((c) => c.conversationId === conversationId) ||
      null;
    this.emit(CURRENT_CONVERSATION_ACTION_TYPE.SET, this.currentConversation);
  }
  // 添加对话
  addConversation(conversation: Conversation): void {
    if (
      this.conversations.some(
        (c) => c.conversationId === conversation.conversationId,
      )
    ) {
      throw new Error('Conversation ID already exists');
    }
    this.conversations.push(conversation);
    this.emit(CONVERSATION_ACTION_TYPE.ADD, conversation);
  }
  // 删除对话
  deleteConversation(conversationId: string): boolean {
    const initialLength = this.conversations.length;
    this.conversations = this.conversations.filter(
      (c) => c.conversationId !== conversationId,
    );
    this.emit(CONVERSATION_ACTION_TYPE.DELETE, conversationId);
    return this.conversations.length !== initialLength;
  }
  // 更新对话
  updateConversation(
    conversationId: string,
    updates: Partial<Conversation>,
  ): boolean {
    const index = this.conversations.findIndex(
      (c) => c.conversationId === conversationId,
    );
    if (index === -1) return false;
    this.conversations[index] = { ...this.conversations[index], ...updates };
    this.emit(CONVERSATION_ACTION_TYPE.UPDATE, {
      conversationId,
      updates: { ...updates },
    });
    return true;
  }
  // 查询单个对话
  getConversation(conversationId: string): Conversation | undefined {
    this.emit(CONVERSATION_ACTION_TYPE.GET, conversationId);
    return this.conversations.find((c) => c.conversationId === conversationId);
  }
  // 查询所有对话
  getAllConversations(): Conversation[] {
    this.emit(CONVERSATION_ACTION_TYPE.GETALL, this.conversations);
    return [...this.conversations];
  }
  // 按状态筛选对话
  getConversationsByStatus(status: number): Conversation[] {
    this.emit(CONVERSATION_ACTION_TYPE.GETSTATUS, status);
    return this.conversations.filter((c) => c.status === status);
  }
  // ======> conversation 会话管理结束
  // ======> query 用户输入管理结束
  initialize() {
    this.addConversation = createWrappedFunction(
        this.addConversation.bind(this),
        'addConversation',
        this.pluginSystem,
    );
  }
}
