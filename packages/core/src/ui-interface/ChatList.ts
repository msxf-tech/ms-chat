import { Message } from '../model';
export interface IChatListProps {
    list?: Message[];
    loadingStr?: string;
    loading: boolean;
}

export const ChatListPropsDefault = {
    list: () => [],
    loadingStr: '',
    loading: false,
}