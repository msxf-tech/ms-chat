<template>
  <MSChat
    ref="msChatRef"
    :draggable="true"
    :mode="mode"
    :conversationId="conversationId"
    :conversations="conversations"
    :messageList="messageList"
    :chatConfig="chatConfig"
    :sendMsg="sendMsg"
    :uploadFiles="uploadFiles"
    :onSwitchConversation="onSwitchConversation"
    :onAddConversation="onAddConversation"
    :onDeleteConversation="onDeleteConversation"
    :onUpdateConversation="onUpdateConversation"
  >
    <template #ext="slotProps">
      <div style="color: brown">
        我是扩展消息{{ slotProps }}
      </div>
    </template>
    <template #mdExt="mdExt">
      {{ mdExt }}
    </template>
    
    <template #sender-top="senderTop">
      输入框的插槽
    </template>
  </MSChat>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { constructMarkdownMessage, constructExtMessage, constructTextMessage } from '@ms-chat/core';
import { chatInit } from '../request/api/index';

import {
  MSChat,
  registryMessageType,
  EventSourceService,
} from '../../src/index';
import CustomMessage from './CustomMessage.vue';

defineProps({
  mode: {
    type: String,
    default: 'pc',
  },
});

const msChatRef = ref();

const uploadFiles = (files: unknown[]) => {
  console.log('上传文件列表：', files)
}
const chatConfig = ref({
  conversations: {
    hidden: true,
    options: {},
  },
  header: {
    hidden: false,
    options: {
      title: 'aaa'
    },
  },
  chatMessages: {
    hide: true,
    options: {},
  },
  sender: {
    show: true,
    options: {
      maxlength: 100,
      pending: false,
      disabled: false,
      hidden: false,
      placeholder: '尽管问我',
      onfocus: () => {
        console.log('sender 聚焦');
      },
    },
  },
  bubble: {
    left: {
      name: '小美',
      avatar: {
        src: 'https://gips0.baidu.com/it/u=2671712032,2326996121&fm=3042&app=3042&f=JPEG&wm=1,baiduai3,0,0,13,9&wmo=5,5&w=480&h=640'
      },
    },
    right: {
      name: '阿Q',
      avatar: {
        src: 'https://image.baidu.com/front/aigc?atn=aigc&fr=home_hover&imgcontent=%7B%22aigcQuery%22%3A%22%22%2C%22imageAigcId%22%3A%22%22%7D&isImmersive=1&pd=image_content&quality=1&ratio=1%3A1&sa=searchpromo_shijian_photohp_inspire&tn=aigc&top=%7B%22sfhs%22%3A1%7D&word=%E8%BF%90%E5%8A%A8%E6%91%84%E5%BD%B1%EF%BC%8C%E5%B0%8F%E7%94%B7%E5%AD%A9%EF%BC%8C%E9%AB%98%E5%B0%94%E5%A4%AB%E7%90%83%EF%BC%8C%E4%B8%93%E6%B3%A8%E7%9A%84%E7%9C%BC%E7%A5%9E%EF%BC%8C%E9%AB%98%E5%B0%94%E5%A4%AB%E7%90%83%E5%9C%BA%EF%BC%8C4K%E8%B6%85%E6%B8%85%EF%BC%8C%E5%86%99%E5%AE%9E%E9%A3%8E%E6%A0%BC%EF%BC%8C%E5%8A%A8%E6%84%9F%E5%8D%81%E8%B6%B3%EF%BC%8C%E9%98%B3%E5%85%89%E6%98%8E%E5%AA%9A%EF%BC%8C%E7%BB%86%E8%85%BB%E7%9A%AE%E8%82%A4',
      },
    },
  },
  welcome: {
    options: {
      content: {
        title: '我是马小i，欢迎提问',
        describe: '我是你的办公助手，问你想问的，知道的我都会说的',
        prompt: {
          title: '推荐问题',
          list: ['公司的核心价值观时什么？', '公司的业务范围有多广？'],
        }
      }
    }
  }
});
const conversationId = ref();
const conversations = ref([]);
const messageList = ref<any>([]);

const controller = new AbortController();
const signal = controller.signal;

// 切换会话
const onSwitchConversation = (id) => {
  messageList.value = [
    {
      id: '1',
      type: 'text',
      role: 'user',
      content: '你能做什么！你能做什么！你能做什么！',
    },
    {
      id: '2',
      type: 'text',
      role: 'system',
      content: '哈哈哈',
    },
    {
      id: '3',
      type: 'text',
      role: 'user',
      content: '你好你好你好',
    },
    {
      id: '4',
      type: 'text',
      role: 'system',
      content: '我在我在我在',
    },
    {
      id: '5',
      type: 'custom',
      role: 'system',
      content: '你好，我是自定义数据',
    },
  ];
};

// 新建会话
const onAddConversation = () => {
  const addParams = {
    conversationId: new Date().getTime(),
    name: '新对话',
    createTime: new Date(),
  }
  msChatRef.value.addConversation(addParams);
}

const onDeleteConversation = (conversationId: string) => {
  msChatRef.value.deleteConversation(conversationId);
}

const onUpdateConversation = (params: any) => {
  msChatRef.value?.updateConversation(params);
}

// sendMsg
const sendMsg = async (msg: string) => {
  msChatRef.value.pushMessage(constructTextMessage(msg, {
    id: `${Date.now()}`,
    role: 'user',
    conversationId: conversations.value[0].conversationId,
    bubble: {
      name: '阿Y',
      avatar: {
        src: 'https://img0.baidu.com/it/u=339517772,157864144&fm=253&fmt=auto&app=138&f=JPEG?w=428&h=285'
      }
    }
  }));

  const contentId = Date.now() + 2;
  let resContent = ''; // 初始化为空

  function throttle(fn, wait = 300) {
    let prev = 0;               // 上一次触发的时间
    return function (...args) {
      const now = Date.now();
      if (now - prev >= wait) {
        prev = now;
        fn.apply(this, args);   // 立即执行
      }
    };
  }

  function _sendMsg(msg) {
    console.log('sse msg', msg.length, contentId)
    msChatRef.value.pushMessage({
      id: contentId,
      type: 'markdown',
      content: msg,
      role: 'system'
    });
  }
  const sendMsgThrottle = throttle(_sendMsg, 30);
  // _sendMsg('adsasddsdsssa');
  // return;
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
        chatId: conversations.value[0].conversationId,
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
          // 非200状态码处理
          throw new Error(`请求失败: ${response.status}`);
        }
        console.log('连接已建立');
        // stopQueue.value?.shift?.();
      },
      onMessage: (eventData: any) => {
        // const eventData = JSON.parse(event.data); // 解析流式数据
        if (eventData.choices?.[0]?.delta?.content) {
          resContent += eventData.choices[0].delta.content;
        }
        sendMsgThrottle(resContent)
      },
      onClose() {
        console.log('返回结束标签');
      },
      onError(err: any) {
        console.error('连接异常:', err);
        // controller.abort();
        sse.disconnect();
        throw err;
      },
    },
  );
  return;
};

// 初始化左侧 Conversations
const initConversations = async () => {
  const res = await chatInit({});
  if (res.data) {
    const introPreQuestionList =
      res.data?.value?.data?.introPreQuestionList || [];
    const list = introPreQuestionList?.map((item) => ({
      conversationId: item.order,
      name: item.question,
    }));
    conversations.value = list;
    if (list?.length >= 1) {
      conversationId.value = list[0].conversationId;
    }
  }
};

// 初始化 MessageList
const initMessageList = async () => {
  messageList.value = new Array(10).fill(1).map((item, index) => {
    return {
      id: index,
      type: 'text',
      role: index % 2 === 0 ? 'user' : 'system',
      content: '你好',
    };
  });
};
// 注册自定义组件
registryMessageType('custom', CustomMessage);

onMounted(() => {
  console.log('msChatRef===', msChatRef.value);
  initConversations();
  initMessageList();
});
</script>

<style scoped></style>
