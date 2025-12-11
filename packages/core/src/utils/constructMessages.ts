// 构建消息
// registryMessageType('text', TextCard);
// registryMessageType('file', FileCard);
// registryMessageType('image', ImageCard);
// registryMessageType('markdown', MarkdownsCard);
// registryMessageType('loading', LoadingCard);

import { ExtMessage, TextMessage, FileMessage, ImageMessage, MarkdownMessage, LoadingMessage, IFileData, CardContent, CardMessage, MarkdownContent } from '../model';

/**
 * 构建文本消息
 * @param content 消息内容(必填)
 * @param options 可选参数(id, conversationId, role, timestamp, status)
 */
export function constructTextMessage(
    content: string,
    options?: Partial<Omit<TextMessage, 'type' | 'content'>>
  ): TextMessage {
    return {
      type: 'text',
      content,
      ...options
    };
  }
  
  /**
   * 构建图片消息
   * @param url 图片URL(必填)
   * @param options 可选参数(id, conversationId, role, timestamp, status, alt, width, height)
   */
  export function constructImageMessage(
    url: string,
    options?: Partial<Omit<ImageMessage, 'type' | 'url'>>
  ): ImageMessage {
    return {
      type: 'image',
      url,
      ...options
    };
  }
  
  /**
   * 构建文件消息
   * @param fileData 文件数据(必填)
   * @param options 可选参数(id, conversationId, role, timestamp, status)
   */
  export function constructFileMessage(
    fileData: IFileData,
    options?: Partial<Omit<FileMessage, 'type' | 'content'>>
  ): FileMessage {
    return {
      type: 'file',
      content: fileData,
      ...options
    };
  }
  
  /**
   * 构建卡片消息
   * @param cardContent 卡片内容(必填)
   * @param options 可选参数(id, conversationId, role, timestamp, status)
   */
  export function constructCardMessage(
    cardContent: CardContent,
    options?: Partial<Omit<CardMessage, 'type' | 'content'>>
  ): CardMessage {
    return {
      type: 'card',
      content: cardContent,
      ...options
    };
  }
  
  /**
   * 构建Markdown消息
   * @param markdownContents Markdown内容数组(必填)
   * @param options 可选参数(id, conversationId, role, timestamp, status)
   */
  export function constructMarkdownMessage(
    markdownContents: MarkdownContent[] | string,
    options?: Partial<Omit<MarkdownMessage, 'type' | 'content'>>
  ): MarkdownMessage {
    return {
      type: 'markdown',
      content: markdownContents,
      isStream: true,
      isActive: true,
      ...options
    };
  }
  
  /**
   * 构建加载消息
   * @param options 可选参数(id, conversationId, role, timestamp, status)
   */
  export function constructLoadingMessage(
    options?: Partial<Omit<LoadingMessage, 'type'>>
  ): LoadingMessage {
    return {
      type: 'loading',
      ...options
    };
  }
  
  /**
   * 构建扩展消息
   * @param options 可选参数(id, conversationId, role, timestamp, status)
   */
  export function constructExtMessage(
    content?: any,
    options?: Partial<Omit<ExtMessage, 'type'>>
  ): ExtMessage {
    return {
      type: 'ext',
      content,
      ...options
    };
  }
  