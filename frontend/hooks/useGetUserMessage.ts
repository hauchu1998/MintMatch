import { Conversation, Message, Stream } from "@xmtp/xmtp-js";
import { useState, useEffect, useContext } from "react";
import XmtpContext from "../contexts/xmtpContext";
import useMessageStore from "./useMessageStore";

type OnMessageCallback = () => void;

const useConversation = (
  peerAddress: string,
  onMessageCallback?: OnMessageCallback
) => {
  const { client, convoMessages } = useContext(XmtpContext);
  const { messageStore, dispatchMessages } = useMessageStore();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [stream, setStream] = useState<Stream<Message>>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getConvo = async () => {
      if (!client || !peerAddress) {
        return;
      }
      setConversation(await client.conversations.newConversation(peerAddress));
    };
    getConvo();
  }, [peerAddress]);

  useEffect(() => {
    const closeStream = async () => {
      if (!stream) return;
      await stream.return();
    };
    closeStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!conversation) return;
    const listMessages = () => {
      setLoading(true);
      if (dispatchMessages) {
        dispatchMessages({
          peerAddress: conversation.peerAddress,
          messages: convoMessages.get(conversation.peerAddress) ?? [],
        });
      }
      if (onMessageCallback) {
        onMessageCallback();
      }
      setLoading(false);
    };
    const streamMessages = async () => {
      const stream = await conversation.streamMessages();
      setStream(stream);
      for await (const msg of stream) {
        if (dispatchMessages) {
          await dispatchMessages({
            peerAddress: conversation.peerAddress,
            messages: [msg as unknown as Messag],
          });
        }
        if (onMessageCallback) {
          onMessageCallback();
        }
      }
    };
    listMessages();
    streamMessages();
  }, [conversation, convoMessages, dispatchMessages, onMessageCallback]);

  const handleSend = async (message: string) => {
    if (!conversation) return;
    await conversation.send(message);
  };

  return {
    loading,
    messages: messageStore[peerAddress] ?? [],
    sendMessage: handleSend,
  };
};

export default useConversation;
