// export * from './chatStore';
// export * from './configStore';
export * from './registry';
import {
    MsgInput, Conversation, ChatConfig, Message } from '../model';
import { MsgInputStore } from './base/msgInputStore';
import { ConversationsStore } from './base/conversationsStore';
import { MessageListStore } from './base/messageListStore';
import { ChatConfigManager } from './base/configStore';
export class ChatStore {
    public msgInputStore: MsgInputStore;
    public conversationsStore: ConversationsStore;
    public messageListStore: MessageListStore;
    public configStore: ChatConfigManager;
    
    constructor(config?: ChatConfig) {
        // super();
        const { plugins = {} } = config || {}
        this.msgInputStore = new MsgInputStore(plugins?.msgInputPlugins);
        this.conversationsStore = new ConversationsStore(plugins?.conversationsPlugins);
        this.messageListStore = new MessageListStore(plugins?.messageListPlugins);
        this.configStore = new ChatConfigManager(config || {});
        // this.bindSubEvents()
    }
    // 适配层-用户消息
    setMsgInput = (m: MsgInput): void => this.msgInputStore.setMsgInput(m);
    initMsgInput = (): void => this.msgInputStore.initMsgInput();
    getMsgInput = (): MsgInput => this.msgInputStore.getMsgInput();
    // 适配层-会话列表
    initCurrentConversation = (c: Conversation[] = []): void => this.conversationsStore.initCurrentConversation(c);
    getCurrentConversation = (): Conversation | null => this.conversationsStore.getCurrentConversation();
    setCurrentConversation = (cid: string): void => this.conversationsStore.setCurrentConversation(cid);
    addConversation = (c: Conversation): void => this.conversationsStore.addConversation(c);
    deleteConversation = (cid: string): boolean => this.conversationsStore.deleteConversation(cid);
    updateConversation = (cid: string, u: Partial<Conversation>): boolean => this.conversationsStore.updateConversation(cid, u);
    getConversation = (cid: string): Conversation | undefined => this.conversationsStore.getConversation(cid);
    getAllConversations = (): Conversation[] => this.conversationsStore.getAllConversations();
    getConversationsByStatus = (s: number): Conversation[] => this.conversationsStore.getConversationsByStatus(s);
    // 适配层-消息
    addMessage = (m: Message): void => this.messageListStore.addMessage(m);
    addMessages = (msgs: Message[]): void => this.messageListStore.addMessages(msgs);
    updateMessages = (id: string, updates: Partial<Message>): boolean => this.messageListStore.updateMessages(id, updates);
    deleteMessage = (id: string): boolean => this.messageListStore.deleteMessage(id);
    deleteMessageByIndex = (index: number): boolean => this.messageListStore.deleteMessageByIndex(index);
    deleteMessages = (predicate: (m: Message) => boolean): number => this.messageListStore.deleteMessages(predicate);
    getMessage = (id: string): Message | undefined => this.messageListStore.getAllMessage(id);
    getAllMessages = (): Message[] => this.messageListStore.getAllMessages();
    getMessagesByType = <T extends Message>( typeGuard: (msg: Message) => msg is T ): T[] => this.messageListStore.getMessagesByType(typeGuard);
    getLatestMessages = (count: number): Message[] => this.messageListStore.getLatestMessages(count);
    initMessages = (list?: Message[]): void => this.messageListStore.initMessages(list);
    // 配置相关
    initConfig = <T extends keyof ChatConfig>(config: T): void => this.configStore.initConfig(config);
    getConfig = (): ChatConfig => this.configStore.getConfig();
    updateConfig = <T extends keyof ChatConfig>( key: T, newValue: Partial<ChatConfig[T]> ): void => this.configStore.updateConfig(key, newValue);
    deleteConfig= <T extends keyof ChatConfig>(key: T): void => this.configStore.deleteConfig(key);
    queryConfig= <T extends keyof ChatConfig>(key: T): ChatConfig[T] | undefined => this.configStore.queryConfig(key);
}
