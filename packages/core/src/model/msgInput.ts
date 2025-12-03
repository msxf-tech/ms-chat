export enum QUERY_ACTION_TYPE {
  INIT = 'query:init',
  SET = 'query:set',
  GET = 'query:get',
}
export interface MsgInput {
  query: string;
}

export const msgInputDefault = {
  query: '',
};
// export interface IMsgInputPropsProps {
//     maxlength?: number
//     pending: boolean
//     disabled: boolean
//     hidden: boolean
//     onfocus: () => void
// }

// export interface MsgInputComponentProps {
//     input: IMsgInputPropsProps
// }
