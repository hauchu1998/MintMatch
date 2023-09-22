import { ConversationV2, Message, Stream } from '@xmtp/xmtp-js';
import { useCallback, useEffect, useState } from 'react';

import { XmtpContext } from '../contexts/XmtpContexts';
import useXmtp from './useXmtp';

type OnMessageCallback = () => void;

const useConversation = (
  peerAddress: string,
  onMessageCallback?: OnMessageCallback
) => {
  const { client, getMessages, dispatchMessages } = useXmtp();
  const [conversation, setConversation] = useState<ConversationV2<any> | null>(null);
  const [stream, setStream] = useState<Stream<any>>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const getConvo = async () => {
      if (!client) {
        return;
      }
      setConversation(await client.conversations.newConversation(peerAddress) as ConversationV2<String>);
    };
    getConvo();
  }, [client, peerAddress]);

  useEffect(() => {
    const closeStream = async () => {
      if (!stream) return;
      await stream.return();
    };
    closeStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peerAddress]);

  useEffect(() => {
    const listMessages = async () => {
      if (!conversation) return;

      setLoading(true);
      const msgs = await conversation.messages({ limit: 100 });
      if (dispatchMessages) {
        dispatchMessages({
          peerAddress: conversation.peerAddress,
          messages: msgs as unknown as Message[],
        });
      }

      if (onMessageCallback) {
        onMessageCallback();
      }
      setLoading(false);
    };
    listMessages();
  }, [conversation, dispatchMessages, onMessageCallback, setLoading]);
  
  useEffect(() => {
    const streamMessages = async () => {
      if (!conversation) return;
      const stream = await conversation.streamMessages();
      setStream(stream);
      for await (const msg of stream) {
        if (dispatchMessages) {
          dispatchMessages({
            peerAddress: conversation.peerAddress,
            messages: [msg as unknown as Message],
          });
        }

        if (onMessageCallback) {
          onMessageCallback();
        }
      }
    };
    streamMessages();
  }, [conversation, peerAddress, dispatchMessages, onMessageCallback]);

  const handleSend = useCallback(
    async (message: string) => {
      if (!conversation) return;
      await conversation.send(message);
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

export default useConversation;