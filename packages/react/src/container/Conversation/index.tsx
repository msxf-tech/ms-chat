import React, { useContext } from 'react';
import Conversation from '../../components/Conversation';
import { ConversationContext } from '../../contexts';
import { Conversation as IConversation } from '../../types/index';

interface IConversationContainerProps {
  onAddConversation?: () => void;
  onSwitchConversation?: (conversation: IConversation) => void;
  onUpdateConversation?: (conversation: IConversation) => void;
  onDeleteConversation?: (conversationId: string) => void;
}

const ConversationContainer: React.FC<IConversationContainerProps> = ({
  onAddConversation,
  onSwitchConversation,
  onUpdateConversation,
  onDeleteConversation,
}) => {
  const conversationStore = useContext(ConversationContext);

  if (!conversationStore) {
    return null;
  }

  const handleCompAddConversation = async () => {
    onAddConversation?.();
  };

  const handleCompSwitchConversation = (conversation: IConversation) => {
    onSwitchConversation?.(conversation);
  };

  const handleCompUpdateConversation = (conversation: IConversation) => {
    onUpdateConversation?.(conversation);
  };

  const handleCompDeleteConversation = (conversationId: string) => {
    onDeleteConversation?.(conversationId);
  };

  return (
    <Conversation
      conversationId={conversationStore?.curConversationId}
      conversationList={conversationStore?.conversationList}
      onAddConversation={handleCompAddConversation}
      onSwitchConversation={handleCompSwitchConversation}
      onDeleteConversation={handleCompDeleteConversation}
      onUpdateConversation={handleCompUpdateConversation}
    />
  );
};

export default ConversationContainer;
