import { Conversation } from '../model';
// 定义函数接口
interface ClickRowHandler {
    (row: any): void;
}
export interface IConversationProps {
    list?: Conversation[];
    loadingStr?: string;
    loading: boolean;
    clickRowHandle: ClickRowHandler
}
export const conversationPropsDefault = {
    list: [],
    loadingStr: '',
    loading: false,
    clickRowHandle: () => {}
}
// keyof ConversationEmits
export interface ConversationEmits {
    clickItem: Function
}