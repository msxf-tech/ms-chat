import React, { useContext } from 'react';
import type { UploadFile } from 'antd/es/upload/interface';
import Sender from '../../components/Sender';
import { ChatStoreContext, PushMessageContext } from '../../contexts';

interface SenderContainerProps {
  [scopeSlot: string]: any;
  onSendMsg?: (query: string) => void;
  onStopMsg?: () => void;
  onUploadFiles?: (files: UploadFile[]) => void;
}

const SenderContainer: React.FC<SenderContainerProps> = (props) => {
  const { onSendMsg, onStopMsg, onUploadFiles, ...scopeSlots } = props;
  const chatStore = useContext(ChatStoreContext);
  const pushMessageStore = useContext(PushMessageContext);

  if (!chatStore) {
    return null;
  }

  const senderHidden = chatStore?.state?.chatConfig?.sender?.hidden;
  const options: any = chatStore?.state.chatConfig?.sender?.options || {};

  const input = {
    pending: pushMessageStore?.pending || false,
    query: chatStore?.state.msgInput?.query || '',
    maxlength: options?.maxlength || Number.MAX_SAFE_INTEGER,
    disabled: options?.disabled || false,
    hidden: options?.hidden || false,
    placeholder: options?.placeholder || '',
    onfocus: options?.onfocus || (() => {}),
  };

  const handleUpdateQuery = (query: string) => {
    chatStore?.setMsgInput({ query });
  };

  const handleSendMsg = (query: string) => {
    onSendMsg?.(query);
  };

  const handleStopMsg = () => {
    onStopMsg?.();
  };

  const handleUploadFiles = (files: UploadFile[]) => {
    onUploadFiles?.(files);
  };

  if (senderHidden) {
    return null;
  }

  return (
    <Sender
      input={input}
      {...scopeSlots}
      onUpdateQuery={handleUpdateQuery}
      onSendMsg={handleSendMsg}
      onStopMsg={handleStopMsg}
      onUploadFiles={handleUploadFiles}
    />
  );
};

export default SenderContainer;
