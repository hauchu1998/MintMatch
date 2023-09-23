import { Client, Message, Conversation} from '@xmtp/xmtp-js';
import { createContext, Dispatch } from 'react';

export type MessageStoreEvent = {
  peerAddress: string;
  messages: Message[];
};

export type XmtpContextType = {
  client: Client | undefined;
  conversations: Conversation[];
  loadingConversations: boolean;
  getMessages: (peerAddress: string) => Message[];
  dispatchMessages?: Dispatch<MessageStoreEvent>;
  connect: () => void;
  disconnect: () => void;
};

export const XmtpContext = createContext<XmtpContextType>({
  client: undefined,
  conversations: [],
  loadingConversations: false,
  getMessages: () => [],
  connect: () => undefined,
  disconnect: () => undefined,
});

export default XmtpContext;