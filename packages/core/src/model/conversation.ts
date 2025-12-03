// import { Message } from './message';
export interface Conversation {
    conversationId: string
    name?: string
    createTime?: Date
    status?: number
}

export enum CONVERSATION_ACTION_TYPE {
    INIT = 'conversation:init',
    ADD = 'conversation:add',
    DELETE = 'conversation:delete',
    UPDATE = 'conversation:update',
    GET = 'conversation:get',
    GETALL = 'conversation:getall',
    GETSTATUS = 'conversation:getstatus'
}

export enum CURRENT_CONVERSATION_ACTION_TYPE {
    GET = 'current_conversation:get',
    SET = 'current_conversation:set'
}