import React, { useContext } from 'react';
import { Empty } from 'antd';
import { ChatListContext } from '../../contexts';

const EmptyComponent: React.FC = () => {
  const store = useContext(ChatListContext);

  if (!store?.isEmptyData) return null;

  return <Empty description="暂无数据" />;
};

export default EmptyComponent;
