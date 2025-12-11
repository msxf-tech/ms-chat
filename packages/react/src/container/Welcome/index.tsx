import React, { useContext } from 'react';
import Welcome from '../../components/Welcome';
import { ChatStoreContext } from '../../contexts';

interface WelcomeContainerProps {
  onSendMsg?: (query: string) => void;
}

const WelcomeContainer: React.FC<WelcomeContainerProps> = ({ onSendMsg }) => {
  const chatStore = useContext(ChatStoreContext);

  if (!chatStore) {
    return null;
  }

  const config = chatStore?.state?.chatConfig || {};
  const content = config?.welcome?.options?.content || {
    title: '',
    describe: '',
    prompt: {
      title: '',
      list: [],
    },
  };

  const handleSetInput = async (item: string) => {
    onSendMsg?.(item);
  };

  return <Welcome content={content} onSetInput={handleSetInput} />;
};

export default WelcomeContainer;
