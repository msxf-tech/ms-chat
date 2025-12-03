import React, { useRef, useState, useEffect } from 'react';
import { MSChat, EventSourceService } from '../../../src/index';
import { constructTextMessage } from '../../../../core/src/utils';
import { chatInit } from '../../request/apis/chat';

// import '@ms-chat/react/dist/style.css'

interface MainProps {
  mode: 'h5' | 'pc' | 'bubble';
}

const Main: React.FC<MainProps> = ({ mode }) => {
  const msChatRef = useRef<any>(null);

  const [chatConfig, setChatConfig] = useState({
    conversation: { hidden: false, options: {} },
    header: { hidden: false, options: { title: 'aaa' } },
    chatMessages: { hidden: false, options: {} },
    sender: {
      hidden: false,
      options: {
        maxlength: 100,
        pending: false,
        disabled: false,
        hidden: false,
        placeholder: '尽管问我',
        onFocus: () => console.log('sender 聚焦'),
      },
    },
    bubble: {
      left: {
        name: '小美',
        avatar: {
          src: 'https://gips0.baidu.com/it/u=2671712032,2326996121&fm=3042&app=3042&f=JPEG&wm=1,baiduai3,0,0,13,9&wmo=5,5&w=480&h=640',
        },
      },
      right: {
        name: '阿Q',
        avatar: {
          src: 'https://gips3.baidu.com/it/u=3837009761,3977665615&fm=3042&app=3042&f=JPEG&wm=1,baiduai3,0,0,13,9&wmo=5,5&w=1024&h=1024',
        },
      },
    },
    welcome: {
      hidden: false,
      options: {
        content: {},
      },
    },
  });

  // 当前会话
  const [conversationId, setConversationId] = useState('');
  // 历史会话消息
  const [conversations, setConversations] = useState<any[]>([]);
  // 当前会话历史数据
  const [messageList, setMessageList] = useState<any[]>([]);

  // 初始化左侧 Conversations
  const initConversations = async () => {
    const res = await chatInit({});
    if (res.data) {
      const introPreQuestionList = res.data.introPreQuestionList || [];
      const list = introPreQuestionList?.map((item) => ({
        conversationId: item.order,
        name: item.question,
      }));
      setConversations(list);
      if (list?.length >= 1) {
        setConversationId(list[0].conversationId);
      }
    }

    msChatRef.current.pushMessage({
      id: '0000',
      type: 'ext',
      content: '哈哈哈哈',
      role: 'system',
    });
  };

  // 初始化
  const initWelcome = async () => {
    const res = await chatInit({});
    if (res.data) {
      setChatConfig((prev) => ({
        ...prev,
        welcome: {
          ...prev.welcome,
          options: {
            ...prev.welcome.options,
            content: {
              title: res.data.name,
              describe: res.data.intro,
              prompt: {
                title: '推荐问题',
                list: res.data.introPreQuestionList.map(
                  (item) => item.question
                ),
              },
            },
          },
        },
      }));
    }
  };

  // 切换会话
  const onSwitchConversation = (conversation) => {
    console.log('conversation===', conversation);
    // const newMessageList = new Array(100).fill(1).map((item, index) => {
    //   return {
    //     id: index,
    //     type: 'text',
    //     role: index % 2 === 0 ? 'user' : 'system',
    //     content: '你好',
    //   };
    // });

    msChatRef.current.switchConversation(conversation);
    setTimeout(() => {
      setMessageList([
        {
          id: 1,
          type: 'text',
          role: 'user',
          content: '你好',
        },
        {
          id: 2,
          type: 'text',
          role: 'system',
          content: '哈哈哈哈',
        },
        {
          id: 3,
          type: 'text',
          role: 'user',
          content: '你好',
        },
        {
          id: 4,
          type: 'markdown',
          role: 'system',
          content:
            '要隐藏 `tooltip`，你可以通过配置 `tooltip` 的显示控制选项来实现。具体来说，可以通过设置 `hiddenColumns` 参数来控制是否显示某些列的 `tooltip`。`hiddenColumns` 参数是一个布尔值，默认值为 `true`，表示开启隐藏列（叶子节点有效）。\n\n如果你希望完全隐藏 `tooltip`，可以考虑在 `TooltipOperation` 配置中设置 `hiddenColumns` 为 `true`，或者在 `TooltipShowOptions` 中不提供 `content` 或者将 `content` 设置为空字符串或 `null`。\n\n### 示例代码\n\n```jsx\n<MsCharts\n  tooltip={{\n    hiddenColumns: true, // 隐藏某些列的 tooltip\n    show: {\n      content: null, // 完全隐藏 tooltip\n    }\n  }}\n/>\n```\n\n### 详细配置\n\n- **hiddenColumns**: `boolean`，默认值为 `true`，表示开启隐藏列（叶子节点有效）。\n- **content**: `ReactNode | string | (cell, defaultTooltipShowOptions: TooltipShowOptions) => ReactNode | string`，用于自定义 `tooltip` 内容。设置为 `null` 或空字符串可以隐藏 `tooltip`。\n\n希望这些信息能帮助你实现 `tooltip` 的隐藏功能。如果有更多问题，请随时提问。',
        },
        {
          id: 5,
          type: 'file',
          role: 'user',
          name: '我是上传的文件.xlsx',
          size: 819212,
        },
      ]);
    }, 1000);
  };

  // 新建会话
  const onAddConversation = () => {
    const addParams = {
      conversationId: new Date().getTime(),
      name: '新对话',
      createTime: new Date(),
    };
    msChatRef.current.addConversation(addParams);
  };

  const onDeleteConversation = (conversationId: string) => {
    msChatRef.current.deleteConversation(conversationId);
  };

  const onUpdateConversation = (params: any) => {
    msChatRef.current?.updateConversation(params);
  };

  // sendMsg
  const sendMsg = async (msg: string) => {
    if (!msChatRef.current) return;

    msChatRef.current.pushMessage(
      constructTextMessage(msg, {
        id: `${Date.now()}`,
        role: 'user',
        conversationId: 'mfvviyz1kkp1',
        bubble: {
          name: '阿Y',
          avatar: {
            src: 'https://img0.baidu.com/it/u=339517772,157864144&fm=253&fmt=auto&app=138&f=JPEG?w=428&h=285',
          },
        },
      })
    );

    const contentId = Date.now() + 2;
    let resContent = '';

    function throttle(fn: Function, wait = 300) {
      let prev = 0;
      return function (...args: any[]) {
        const now = Date.now();
        if (now - prev >= wait) {
          prev = now;
          fn.apply(this, args);
        }
      };
    }

    const _sendMsg = (msg: string, isActive: boolean) => {
      msChatRef.current.pushMessage({
        id: contentId,
        type: 'markdown',
        content: msg,
        role: 'system',
        isStream: true,
        isActive: !!isActive
      });
    };

    const sendMsgThrottle = throttle(_sendMsg, 30);

    const sse = new EventSourceService<{ message: string }>();
    sse.connect(
      {
        url: '/openapi/abp/v1/chat/completions',
        headers: {
          'Content-Type': 'application/json',
          'app-id': '471068217232781312',
          'api-key': 'ak-170003c900a64f899eec',
          Authorization: 'Bearer sk-b3571aa64a494b42a371',
        },
        openWhenHidden: true,
        body: {
          chatId: 'mfvviyz1kkp1',
          stream: true,
          detail: false,
          requestId: Date.now() + 1,
          messages: [
            {
              content: msg,
              role: 'user',
            },
          ],
        },
        method: 'POST',
      },
      {
        onOpen: async (response: any) => {
          if (response.status !== 200) {
            throw new Error(`请求失败: ${response.status}`);
          }
          console.log('连接已建立');
        },
        onMessage: (eventData: any) => {
          if (eventData.choices?.[0]?.delta?.content) {
            resContent += eventData.choices[0].delta.content;
          }
          sendMsgThrottle(resContent, true);
        },
        onClose: () => {
          sendMsgThrottle(resContent, false);
          console.log('返回结束标签');
        },
        onError: (err: any) => {
          console.error('连接异常:', err);
          sse.disconnect();
          throw err;
        },
      }
    );
  };

  useEffect(() => {
    initWelcome();
    initConversations();
  }, []);

  return (
    <MSChat
      ref={msChatRef}
      mode={mode}
      draggable
      chatConfig={chatConfig}
      conversationId={conversationId}
      conversations={conversations}
      messageList={messageList}
      onSendMsg={sendMsg}
      onAddConversation={onAddConversation}
      onDeleteConversation={onDeleteConversation}
      onUpdateConversation={onUpdateConversation}
      slots={{
        // bubbleHeader: () => <div>bubbleHeader 插槽</div>,
        bubbleFooter: () => <div>bubbleFooter 插槽</div>,
        senderTop: <div>senderTop 插槽</div>,
        senderHeader: <div>senderHeader 插槽</div>,
        senderFooter: <div>senderFooter 插槽</div>,
        bubbleCardExt: (props) => {
          console.log('props===', props);
          return <div>我是自定义卡片</div>;
        },
      }}
      onSwitchConversation={onSwitchConversation}
    />
  );
};

export default Main;
