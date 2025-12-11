import React, { useContext } from 'react';
import HeaderComponent from '../../components/Header';
import { ChatStoreContext } from '../../contexts';

const HeaderContainer: React.FC = () => {
  const chatStore = useContext(ChatStoreContext);

  if (!chatStore) {
    return null;
  }

  const headerHidden = chatStore?.state?.chatConfig?.header?.hidden;
  // 当前会话标题
  const curTitle = chatStore?.state?.chatConfig?.header?.options?.title;

  if (headerHidden) {
    return null;
  }

  return <HeaderComponent title={curTitle} />;
};

export default HeaderContainer;
