import {
  registryMessageType,
  EventSourceService,
  ThemeManager,
  themeDefault,
} from '@ms-chat/core';

import MSChat from './App';

import ChatMessageBubble from './components/ChatMessageBubble/index';
import ChatMessageCard from './components/ChatMessageCard/index';
import ChatMessages from './components/ChatMessages/index';
import Conversation from './components/Conversation/index';
import Header from './components/Header/index';
import Sender from './components/Sender/index';
import Welcome from './components/Welcome/index';

import TextCard from './components/ChatMessageCard/components/TextCard/index';
import ImageCard from './components/ChatMessageCard/components/ImageCard/index';
import FileCard from './components/ChatMessageCard/components/FileCard/index';
import MarkdownsCard from './components/ChatMessageCard/components/MarkdownCard/index';
import LoadingCard from './components/ChatMessageCard/components/LoadingCard/index';

registryMessageType('text', TextCard);
registryMessageType('file', FileCard);
registryMessageType('image', ImageCard);
registryMessageType('markdown', MarkdownsCard);
registryMessageType('loading', LoadingCard);

const themeConfig = new ThemeManager(themeDefault);

import * as Core from '@ms-chat/core';

export {
  MSChat,
  ChatMessageBubble,
  ChatMessageCard,
  ChatMessages,
  Conversation,
  Header,
  Sender,
  Welcome,
  EventSourceService,
  registryMessageType,
  themeConfig,
  Core,
};

export default {
  MSChat,
  ChatMessageBubble,
  ChatMessageCard,
  ChatMessages,
  Conversation,
  Header,
  Sender,
  Welcome,
  EventSourceService,
  registryMessageType,
  themeConfig,
  Core,
};
