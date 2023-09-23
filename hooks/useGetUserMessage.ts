import { ConversationV2, Message, Stream } from '@xmtp/xmtp-js';
import { useCallback, useEffect, useState } from 'react';
import { XmtpContext } from '../contexts/XmtpContexts';
import useXmtp from './useXmtp';

type OnMessageCallback = () => void;

const useGetUserMessage = (peerAddress: string, onMessageCallback?: OnMessageCallback) => {
  const { client, getMessages, dispatchMessages } = useXmtp();
  const [conversation, setConversation] = useState<ConversationV2<any> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleMessages = useCallback(
    async (messages: Message[], shouldDispatch = true) => {
      if (shouldDispatch && dispatchMessages) {
        dispatchMessages({ peerAddress, messages });
      }
      if (onMessageCallback) {
        onMessageCallback();
      }
    },
    [dispatchMessages, onMessageCallback, peerAddress]
  );

  useEffect(() => {
    const initialize = async () => {
      if (client) {
        const convo = await client.conversations.newConversation(peerAddress) as ConversationV2<String>;
        setConversation(convo);
        const messages = await convo.messages({ limit: 100 });
        handleMessages(messages as unknown as Message[]);
        setLoading(false);

        const stream = await convo.streamMessages();
        for await (const msg of stream) {
          handleMessages([msg as unknown as Message]);
        }
      }
    };

    setLoading(true);
    initialize();
  }, [client, handleMessages, peerAddress]);

  const handleSend = useCallback(
    async (message: string) => {
      if (conversation) {
        await conversation.send(message);
      }
    },
    [conversation]
  );

  return {
    conversation,
    loading,
    messages: getMessages(peerAddress),
    sendMessage: handleSend,
  };
};

export default useGetUserMessage;
