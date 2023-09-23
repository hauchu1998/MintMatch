import { Message } from '@xmtp/xmtp-js';
import { useCallback, useReducer } from 'react';
import { MessageStoreEvent } from '../contexts/XmtpContexts';

type MessageDeduper = (message: Message) => boolean;
type MessageStore = { [address: string]: Message[] };

const buildMessageDeduper = (state: Message[]): MessageDeduper => {
  const existingMessageKeys = new Set(state.map((msg) => msg.id));
  return (msg: Message) => !existingMessageKeys.has(msg.id);
};

const useMessageStore = () => {
  const [messageStore, dispatchMessages] = useReducer(
    (state: MessageStore, { peerAddress, messages }: MessageStoreEvent) => {
      const existing = state[peerAddress] || [];
      const deduper = buildMessageDeduper(existing);
      const newMessages = messages.filter(deduper);

      if (!newMessages.length) {
        return state;
      }

      console.log('Dispatching new messages for peer address', peerAddress);

      return {
        ...state,
        [peerAddress]: existing.concat(newMessages),
      };
    },
    {}
  );

  const getMessages = useCallback(
    (peerAddress: string) => messageStore[peerAddress] || [],
    [messageStore]
  );

  return {
    getMessages,
    dispatchMessages,
  };
};

export default useMessageStore;
