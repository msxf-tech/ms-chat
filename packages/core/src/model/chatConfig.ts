import { IHeaderProps, IMsgInputProps, IWelcomeProps, IConversationProps } from '../ui-interface'; 
import { PluginRegistration } from './plugin';
import { Bubble } from './bubble';
export interface ChatConfig {
    // chatList?: {
    //     hidden: boolean,
    //     options: IChatListProps
    // },
    conversation?: {
        hidden: boolean,
        options: IConversationProps
    },
    header?: {
        hidden: boolean,
        options: IHeaderProps
    },
    sender?: {
        hidden: boolean,
        options: IMsgInputProps
    },
    // message?: {
    //     hidden: boolean,
    //     options: IMessageProps
    // },
    welcome?: {
        hidden: boolean,
        options: IWelcomeProps
    },
    plugins?: {
        msgInputPlugins?: PluginRegistration[],
        conversationsPlugins?: PluginRegistration[]
        messageListPlugins?: PluginRegistration[]
    },
    bubble?: Bubble
}
export enum CHATCONFIG_ACTION_TYPE {
    QUERY = 'chatconfig:query',
    DELETE = 'chatconfig:delete',
    UPDATE = 'chatconfig:update',
    GET = 'chatconfig:get',
    INIT = 'chatconfig:init'
}