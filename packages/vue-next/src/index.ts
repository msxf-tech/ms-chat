import MSChat from './App.vue';

import ChatBubble from './components/ChatBubble/index.vue';
import ChatMessageCard from './components/ChatMessageCard/index.vue';
import ChatMessages from './components/ChatMessages/index.vue';
import ConversationItem from './components/ConversationItem/index.vue';
import Header from './components/Header/index.vue';
import Sender from './components/Sender/index.vue';
import Welcome from './components/Welcome/index.vue';
import MarkdownsCard from './components/ChatMessageCard/MarkdownsCard.vue';
import FileCard from './components/ChatMessageCard/FileCard.vue';
import TextCard from './components/ChatMessageCard/TextCard.vue';
import ImageCard from './components/ChatMessageCard/ImageCard.vue';
import LoadingCard from './components/ChatMessageCard/LoadingCard.vue';
import {
  registryMessageType,
  EventSourceService,
  themeDefault,
  ThemeManager,
} from '@ms-chat/core';

registryMessageType('text', TextCard);
registryMessageType('file', FileCard);
registryMessageType('image', ImageCard);
registryMessageType('markdown', MarkdownsCard);
registryMessageType('loading', LoadingCard);
function install() {}

const themeConfig = new ThemeManager(themeDefault);

export default {
  install,
  MSChat,
  ChatBubble,
  ChatMessageCard,
  ChatMessages,
  ConversationItem,
  Header,
  Sender,
  Welcome,
  EventSourceService,
  registryMessageType,
  themeConfig,
};

export {
  MSChat,
  ChatBubble,
  ChatMessageCard,
  ChatMessages,
  ConversationItem,
  Header,
  Sender,
  Welcome,
  EventSourceService,
  registryMessageType,
  themeConfig,
};
