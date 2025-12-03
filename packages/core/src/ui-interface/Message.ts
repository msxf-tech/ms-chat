import { Message } from '../model';
export interface IMessageProps {
  className: String;
  info: Message;
}

export const messagePropsDefault = {
  className: {
    type: String,
    default: '',
  },
  info: {
    type: Object,
    default: () => {
      return {};
    },
  },
};

export type FileStatus = 'uploading' | 'done' | 'error';
export interface IFileMessageProps {
  type: 'file';
  name: string;
  size: Number;
  description: String;
  status: FileStatus;
  percent?: number;
}

export interface IImageMessageProps {
  type: 'image';
  url: string;
  alt?: string;
  width?: number;
}

export interface ITextMessageProps {
  type: 'text';
  content?: string;
}

export interface ILoadingMessageProps {
  type: 'loading';
}

export interface IMarkdownMessageProps {
  type: 'markdown';
  content?: string | string[];
}
