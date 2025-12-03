import React, { useContext } from 'react';
import { List as AntdList } from 'antd';
import VirtualList from 'rc-virtual-list';
import ChatMessageBubble from '../../../ChatMessageBubble/index';
import { ChatListContext } from '../../contexts';
import FloatBtn from '../FloatBtn/index';
import './index.less';

interface IListProps {
  [scopeSlot: string]: any;
}

const List: React.FC<IListProps> = (scopeSlots = {}) => {
  const store = useContext(ChatListContext);

  if (store?.isEmptyData) return null;

  return (
    <>
      <div className="chat-message-list" ref={store?.scrollbarRef}>
        <AntdList split={false}>
          <VirtualList
            ref={store?.virtualListRef} // 绑定 virtualListRef
            style={{ width: '100%' }}
            itemKey="id"
            height={store?.containerHeight}
            data={store?.runData || []}
            onScroll={store?.handleScroll}
          >
            {(item: any) => (
              <AntdList.Item key={item.id}>
                <ChatMessageBubble {...item} {...scopeSlots} />
              </AntdList.Item>
            )}
          </VirtualList>
        </AntdList>
      </div>
      <FloatBtn />
    </>
  );
};

export default List;
