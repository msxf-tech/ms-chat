import React, { useContext } from 'react';
import { FloatButton } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import { ChatListContext } from '../../contexts';
import './index.less';

const FloatBtn: React.FC = () => {
  const store = useContext(ChatListContext);

  if (store?.isEmptyData || !store?.showFloatBtn) return null;

  return (
    <FloatButton
      style={{ position: 'absolute', right: 20, bottom: 20 }}
      shape="circle"
      icon={<ArrowDownOutlined />}
      onClick={store?.handleScrollToPosition}
    />
  );
};

export default FloatBtn;
