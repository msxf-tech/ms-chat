export interface IMsgInputProps {
    maxlength: number | undefined,
    pending: boolean,
    disabled: boolean,
    hidden: boolean,
    placeholder: string,
    onfocus: Function
}

export const msgInputPropsDefault = {
    maxlength: undefined,
    pending: false,
    disabled: false,
    hidden: false,
    placeholder: '',
    onfocus: () => {}
}

export interface MsgInputEmits {
    sendMsg: Function,
    stopMsg: Function,
    uploadFiles: Function
}