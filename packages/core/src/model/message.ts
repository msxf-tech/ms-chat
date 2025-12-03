import { BubbleItem } from './bubble';
export enum FileState {
    Primary = 'primary',
    Success = 'success',
    Info = 'info',
    Warning = 'warning',
    Error = 'error'
}
// 基础消息接口
export interface IMessageInfo {
    id?: string;
    conversationId?: string;
    type: 'card' | 'markdown' | 'text' | 'welcome' | 'ext' | 'file' | 'loading' | unknown;
    role?: 'user' | 'system';
    timestamp?: Date | number;
    status?: Number;
    content?: string | IFileData | CardContent | MarkdownContent[] | any;
    isStream?: boolean;
    isActive?: boolean;
    bubble?: BubbleItem;
}
export interface IFileData {
    fileId?: string;
    name: string;
    fileSize?: number;
    suffix?: string;
    previewUrl?: string;
    type?: FileState;
}
// 文本消息
export interface TextMessage extends IMessageInfo {
    type: 'text';
    content: string;
}

// 扩展消息
export interface ExtMessage extends IMessageInfo {
    type: 'ext';
    content: any;
}

// 加载态消息
export interface LoadingMessage extends IMessageInfo {
    type: 'loading';
}

// 图片消息
export interface ImageMessage extends IMessageInfo {
    type: 'image';
    url: string;
    alt?: string;
    width?: number;
    height?: number;
}

export interface FileMessage extends IMessageInfo {
    type: 'file'
    content: IFileData
}

// 欢迎语
export interface IWelcomeContent {
    title: string;
    describe: string;
    prompt: {
      title: string;
      list: string[];
    };
}
export interface WelcomeContent {
    type: 'welcome'
    content: IWelcomeContent
}

export interface CardContent {
    type: string
    content: any
}

// 卡片消息
export interface CardMessage extends IMessageInfo {
    type: 'card';
    content: CardContent;
}

export interface MarkdownContent {
    id?: string
    type?: 'ext' | unknown
    content: string
}

export interface MarkdownMessage extends IMessageInfo {
    type: 'markdown';
    content: MarkdownContent[] | string;
}

// 消息类型联合
export type Message = TextMessage | ImageMessage | FileMessage | CardMessage | MarkdownMessage | LoadingMessage;

// 参与者模型
export interface Participant {
    id: string;
    name: string;
    avatar?: string;
    role: 'user' | 'assistant' | 'system' | 'ai';
}

export enum MESSAGE_ACTION_TYPE {
    ADD = 'message:add',
    ADDS = 'message:adds',
    DELETE = 'message:delete',
    DELETE_IDX = 'message:deleteidx',
    DELETES = 'message:deletes',
    GET = 'message:get',
    GETALL = 'message:getall',
    GETTYPE = 'message:gettype',
    GETLAST = 'message:getlast',
    UPDATE = 'message:update',
    INIT = 'message:init'
}

