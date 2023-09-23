import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";
import { BsImages } from "react-icons/bs";
import { IoSend, IoHammerOutline } from "react-icons/io5";
import { TransactionModal } from "@/components/nftTransaction";
import { SellerMessage, BuyerMessage } from "@/components/nftTransaction";
import { TokenBalanceType } from "alchemy-sdk";
import next from "next";

export interface NftMessage {
  contract: string;
  tokenId: number;
  tokenUri: string;
  image: string;
  timestamp: string;
}

export interface TxMessage {
  action: string;
  seller: string;
  buyer: string;
  contract: string;
  tokenId: number;
  tokenUri: string;
  image: string;
  price: number;
}

const chatHistory_db = [
  {
    from: "0x2eD5018aaFB29C969FF443c95D5CD2d21cB709aA",
    type: "nft",
    message: JSON.stringify({
      contract: "0x1234...5678",
      tokenId: 0,
      tokenUri: "Mn9hFs-fpKnO3QZbpqQCnbQB_gbTrWjUalO969wfK-LoQcdD4KQwf7wZwD-34",
      image:
        "https://i.seadn.io/gae/iYaSGhz-OqLV07CKHB9u68uDdYRvcSpMoF47FEreNitnVPpLrzoYPPus8JBGh49qMWqIk7dfu2NaHbEmtGiNnvrlEgmkN3m4_TgF-A?auto=format&dpr=1&w=2048",
    }),
    timestamp: "7:00 PM",
  },
  {
    from: "0xE2A794de195D92bBA0BA64e006FcC3568104245d",
    type: "text",
    message:
      "Many books require no thought from those who read them, and for a very simple reason; they made no such demand upon those who wrote them",
    timestamp: "7:00 PM",
  },
  {
    from: "0x2eD5018aaFB29C969FF443c95D5CD2d21cB709aA",
    type: "text",
    message:
      "Many books require no thought from those who read them, and for a very simple reason; they made no such demand upon those who wrote them",
    timestamp: "7:00 PM",
  },
  {
    from: "0x2eD5018aaFB29C969FF443c95D5CD2d21cB709aA",
    type: "text",
    message:
      "Many books require no thought from those who read them, and for a very simple reason; they made no such demand upon those who wrote them",
    timestamp: "7:00 PM",
  },
  {
    from: "0xE2A794de195D92bBA0BA64e006FcC3568104245d",
    type: "nft",
    message: JSON.stringify({
      contract: "0x1234asdfasdf...5678",
      tokenId: 0,
      tokenUri:
        "Mn9hFs-fpKnOasdfasdf3QZbpqQCnbQB_gbTrWjUalO969wfK-LoQcdD4KQwf7wZwD-34",
      image:
        "https://i.seadn.io/gae/kXognhEHC07v0E9mDsXuLqOdwjJBvg-jP--JUL8zy3_OSoVH1Cma-3CaU5UNcV32DvJF9ZvCJwYTckgdljGLBCx0VaoBXLWFdlyD?auto=format&dpr=1&w=512",
    }),
    timestamp: "7:00 PM",
  },
  {
    from: "0xE2A794de195D92bBA0BA64e006FcC3568104245d",
    type: "text",
    message:
      "Many books require no thought from those who read them, and for a very simple reason; they made no such demand upon those who wrote them",
    timestamp: "7:00 PM",
  },
  {
    from: "system",
    type: "text",
    message: "NFT owner Approved the transaction",
    timestamp: "7:00 PM",
  },
  {
    from: "0xE2A794de195D92bBA0BA64e006FcC3568104245d",
    type: "text",
    message:
      "Many books require no thought from those who read them, and for a very simple reason; they made no such demand upon those who wrote them",
    timestamp: "7:00 PM",
  },
  {
    from: "0x2eD5018aaFB29C969FF443c95D5CD2d21cB709aA",
    type: "tx",
    message: JSON.stringify({
      action: "BuyerProposed",
      contract: "0x1234...5678",
      seller: "0xE2A794de195D92bBA0BA64e006FcC3568104245d",
      buyer: "0x2eD5018aaFB29C969FF443c95D5CD2d21cB709aA",
      tokenId: 0,
      tokenUri: "Mn9hFs-fpKnO3QZbpqQCnbQB_gbTrWjUalO969wfK-LoQcdD4KQwf7wZwD-34",
      image:
        "https://i.seadn.io/gae/iYaSGhz-OqLV07CKHB9u68uDdYRvcSpMoF47FEreNitnVPpLrzoYPPus8JBGh49qMWqIk7dfu2NaHbEmtGiNnvrlEgmkN3m4_TgF-A?auto=format&dpr=1&w=2048",
      price: 0.001,
    }),
    timestamp: "7:00 PM",
  },
];

type ChatHistory = {
  from: string;
  type: string;
  message: string;
  timestamp: string;
};

interface ChatRoomProps {
  roodId: string;
  host: string;
  hostUsername: string;
  hostProfile: string;
  guest: string;
  guestUsername: string;
  guestProfile: string;
}

const db = {
  roomId: "1234",
  type: "creator",
  host: "0xE2A794de195D92bBA0BA64e006FcC3568104245d",
  hostUsername: "host",
  hostProfile:
    "https://i.seadn.io/gae/Mn9hFs-fpKnO3QZbpqQCnbQB_gbTrWjUalO969wfK-LoQcdD4KQwf7wZwD-343hSvr7ghDArNi0WnUChUg561o7OlNDll5EVisfBXg?auto=format&dpr=1&w=512",
  guest: "0x2eD5018aaFB29C969FF443c95D5CD2d21cB709aA",
  guestUsername: "guest",
  guestProfile:
    "https://i.seadn.io/gae/PqDwiFkgouVCPhl2MauGCGDVn9X7RBcGtrSe9mZlAsGbU54_kJPbz2CdhIofA9-hGNOp-bV4HORfaQmgOaChwEk__WHXqxGZSszhSg?auto=format&dpr=1&w=512",
};

export default function ChatRoom() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const roomInfo = db;
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>(chatHistory_db);
  const [textMessage, setTextMessage] = useState<string>("");
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [proposedNftTx, setProposedNftTx] = useState<any>(undefined);
  const messagesEndRef = useRef<any>(null);

  const onClickNft = (owner: string, nft: any) => {
    const buyer = roomInfo.host === owner ? roomInfo.guest : roomInfo.host;
    setProposedNftTx({ ...nft, seller: owner, buyer });
    setModalOn(true);
  };

  const handleTextChange = (e: any) => {
    setTextMessage(e.target.value);
  };

  const isHost = (from: string) => {
    return from === roomInfo.host;
  };

  const getTimestamp = () => {
    const currentTime = new Date();
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const ampm = hour >= 12 ? "PM" : "AM";
    return `${hour}:${minute} ${ampm}`;
  };

  const handleSellerAgree = (tx: any) => {
    const nextStep = {
      action: "SellerAgree",
      contract: tx.contract,
      seller: tx.seller,
      buyer: tx.buyer,
      tokenId: tx.tokenId,
      tokenUri: tx.tokenUri,
      image: tx.image,
      price: tx.price,
    };
    setChatHistory((prev) => [
      ...prev,
      {
        from: "system",
        type: "text",
        message: "NFT owner approved the transaction",
        timestamp: getTimestamp(),
      },
      {
        from: address!,
        type: "tx",
        message: JSON.stringify(nextStep),
        timestamp: getTimestamp(),
      },
    ]);
    scrollToBottom();
  };
  const handleSellerDeny = () => {
    setChatHistory((prev) => [
      ...prev,
      {
        from: "system",
        type: "text",
        message: "NFT owner denied the transaction",
        timestamp: getTimestamp(),
      },
    ]);
    scrollToBottom();
  };
  const handleBuyerAgree = (tx: any) => {
    const nextStep = {
      action: "SellerAgree",
      contract: tx.contract,
      seller: tx.seller,
      buyer: tx.buyer,
      tokenId: tx.tokenId,
      tokenUri: tx.tokenUri,
      image: tx.image,
      price: tx.price,
    };
    setChatHistory((prev) => [
      ...prev,
      {
        from: "system",
        type: "text",
        message: "Buyer agreed with the proposal",
        timestamp: getTimestamp(),
      },
      {
        from: address!,
        type: "tx",
        message: JSON.stringify(nextStep),
        timestamp: getTimestamp(),
      },
    ]);
    scrollToBottom();
  };
  const handleBuyerDeny = () => {
    setChatHistory((prev) => [
      ...prev,
      {
        from: "system",
        type: "text",
        message: "Buyer rejected with the proposal",
        timestamp: getTimestamp(),
      },
    ]);
    scrollToBottom();
  };
  const handleExecuteTransfer = () => {};

  const handleSendText = () => {
    if (textMessage === "" || address === undefined) return;

    setChatHistory((prev) => [
      ...prev,
      {
        from: address,
        type: "text",
        message: textMessage,
        timestamp: getTimestamp(),
      },
    ]);

    setTextMessage("");
    scrollToBottom();
  };

  const handleSendNft = (nft: any) => {
    if (address === undefined) return;
    chatHistory.push({
      from: address,
      type: "nft",
      message: JSON.stringify(nft),
      timestamp: getTimestamp(),
    });
    setTextMessage("");
    scrollToBottom();
  };

  const handleSendTx = (tx: any) => {
    if (address === undefined) return;

    setChatHistory((prev) => [
      ...prev,
      {
        from: address,
        type: "tx",
        message: JSON.stringify(tx),
        timestamp: getTimestamp(),
      },
    ]);
    setTextMessage("");
    scrollToBottom();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(
    () => messagesEndRef.current?.scrollIntoView({ behavior: "instant" }),
    []
  );

  useEffect(() => {
    if (!isConnected) {
      router.replace("/");
    }
  }, [isConnected, router]);
  return (
    <div className="w-full flex flex-col items-center relative">
      <div className="fixed top-0 w-full flex items-center gap-3 bg-[#195573] text-white px-3 py-2">
        <button className="text-xl" onClick={() => router.back()}>
          <BiArrowBack />
        </button>
        <Image
          src={roomInfo.guestProfile}
          className="w-12 h-12 rounded-full"
          alt="guest profile"
          width={80}
          height={80}
          priority
        />
        <p className="text-lg">
          {roomInfo.guestUsername
            ? roomInfo.guestUsername
            : `${roomInfo.guest?.slice(0, 5)}...${roomInfo.guest?.slice(-5)}`}
        </p>
      </div>
      <div className="w-[95%]">
        {
          // @ts-ignore
          chatHistory.map((chat, idx) => {
            const message =
              chat.type === "nft"
                ? (JSON.parse(chat.message) as NftMessage)
                : chat.type === "tx"
                ? (JSON.parse(chat.message) as TxMessage)
                : chat.message;
            if (chat.from === "system") {
              return (
                <div
                  key={chat.from + idx}
                  className="w-full flex justify-center"
                >
                  <div className="mt-5 w-[75%] px-3 py-2 text-center text-sm text-white bg-blue-950 border-2 border-white rounded-full">
                    {message as string}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={chat.from + idx}
                className={`w-full flex ${
                  isHost(chat.from) ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`mt-5 w-[75%] px-3 py-2 ${
                    isHost(chat.from)
                      ? "text-white bg-[#195573]"
                      : "text-[#195573] bg-white"
                  } rounded-lg`}
                >
                  {chat.type === "text" && (
                    <div className="w-full break-words">{chat.message}</div>
                  )}
                  {chat.type === "nft" && (
                    <div className="w-full flex justify-center">
                      <button
                        onClick={() =>
                          onClickNft(chat.from, message as NftMessage)
                        }
                      >
                        <Image
                          className="w-30 h-30 rounded-lg"
                          src={(message as NftMessage).image!}
                          alt={`${chat.from}'s NFT ${
                            (message as NftMessage).tokenUri
                          }`}
                          width={200}
                          height={200}
                          priority
                        />
                      </button>
                    </div>
                  )}
                  {chat.type === "tx" &&
                  (message as TxMessage).seller === address ? (
                    <SellerMessage
                      proposedNftTx={message as TxMessage}
                      sellerAgree={handleSellerAgree}
                      sellerDeny={handleSellerDeny}
                    />
                  ) : (
                    <BuyerMessage
                      proposedNftTx={message as TxMessage}
                      buyerAgree={handleBuyerAgree}
                      buyerDeny={handleBuyerDeny}
                      executeTransfer={handleExecuteTransfer}
                    />
                  )}
                  <div className="text-sm text-gray-500 text-end">
                    {chat.timestamp}
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
      <div ref={messagesEndRef} className="mt-16" />
      <div className="w-full fixed bottom-0 gap-3 px-5 py-2 flex items-center bg-[#195573]">
        <BsImages className="text-white text-3xl" />
        {
          // @ts-ignore
          roomInfo.type === "creator" && (
            <IoHammerOutline
              className="text-white text-3xl"
              // onClick={() => setModalOn(true)}
            />
          )
        }
        <textarea
          name="textmessage"
          placeholder="..."
          value={textMessage}
          rows={1}
          className="rounded-lg px-3 py-1 w-full bg-white "
          onChange={handleTextChange}
        />
        <button className="text-white text-2xl" onClick={handleSendText}>
          <IoSend />
        </button>
      </div>
      {modalOn && (
        <TransactionModal
          setModalOn={setModalOn}
          proposedNftTx={proposedNftTx}
          handleSendMessage={handleSendTx}
        />
      )}
    </div>
  );
}
