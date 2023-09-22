import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";
import { BsImages } from "react-icons/bs";
import { IoSend, IoHammerOutline } from "react-icons/io5";

const chatHistory = [
  {
    from: "0x2eD5018aaFB29C969FF443c95D5CD2d21cB709aA",
    message: "",
    nft: {
      contract: "0x1234...5678",
      tokenId: 0,
      tokenUri: "Mn9hFs-fpKnO3QZbpqQCnbQB_gbTrWjUalO969wfK-LoQcdD4KQwf7wZwD-34",
      image:
        "https://i.seadn.io/gae/iYaSGhz-OqLV07CKHB9u68uDdYRvcSpMoF47FEreNitnVPpLrzoYPPus8JBGh49qMWqIk7dfu2NaHbEmtGiNnvrlEgmkN3m4_TgF-A?auto=format&dpr=1&w=2048",
    },
    timestamp: "7:00 PM",
  },
  {
    from: "0xE2A794de195D92bBA0BA64e006FcC3568104245d",
    message:
      "Many books require no thought from those who read them, and for a very simple reason; they made no such demand upon those who wrote them",
    timestamp: "7:00 PM",
  },
  {
    from: "0x2eD5018aaFB29C969FF443c95D5CD2d21cB709aA",
    message:
      "Many books require no thought from those who read them, and for a very simple reason; they made no such demand upon those who wrote them",
    timestamp: "7:00 PM",
  },
  {
    from: "0x2eD5018aaFB29C969FF443c95D5CD2d21cB709aA",
    message:
      "Many books require no thought from those who read them, and for a very simple reason; they made no such demand upon those who wrote them",
    timestamp: "7:00 PM",
  },
  {
    from: "0xE2A794de195D92bBA0BA64e006FcC3568104245d",
    message: "",
    nft: {
      contract: "0x1234asdfasdf...5678",
      tokenId: 0,
      tokenUri:
        "Mn9hFs-fpKnOasdfasdf3QZbpqQCnbQB_gbTrWjUalO969wfK-LoQcdD4KQwf7wZwD-34",
      image:
        "https://i.seadn.io/gae/kXognhEHC07v0E9mDsXuLqOdwjJBvg-jP--JUL8zy3_OSoVH1Cma-3CaU5UNcV32DvJF9ZvCJwYTckgdljGLBCx0VaoBXLWFdlyD?auto=format&dpr=1&w=512",
    },
    timestamp: "7:00 PM",
  },
  {
    from: "0xE2A794de195D92bBA0BA64e006FcC3568104245d",
    message:
      "Many books require no thought from those who read them, and for a very simple reason; they made no such demand upon those who wrote them",
    timestamp: "7:00 PM",
  },
  {
    from: "system",
    message: "NFT owner Approved the transaction",
    timestamp: "7:00 PM",
  },
  {
    from: "0xE2A794de195D92bBA0BA64e006FcC3568104245d",
    message:
      "Many books require no thought from those who read them, and for a very simple reason; they made no such demand upon those who wrote them",
    timestamp: "7:00 PM",
  },
  {
    from: "0x2eD5018aaFB29C969FF443c95D5CD2d21cB709aA",
    message: "",
    nft: undefined,
    proposeTx: {
      contract: "0x1234...5678",
      tokenId: 0,
      tokenUri: "Mn9hFs-fpKnO3QZbpqQCnbQB_gbTrWjUalO969wfK-LoQcdD4KQwf7wZwD-34",
      image:
        "https://i.seadn.io/gae/iYaSGhz-OqLV07CKHB9u68uDdYRvcSpMoF47FEreNitnVPpLrzoYPPus8JBGh49qMWqIk7dfu2NaHbEmtGiNnvrlEgmkN3m4_TgF-A?auto=format&dpr=1&w=2048",
      price: 0.001,
    },
  },
];

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
  const [text, setText] = useState<string>("");
  const [modalOn, setModalOn] = useState<boolean>(false);
  const messagesEndRef = useRef<any>(null);

  const handleTextChange = (e: any) => {
    setText(e.target.value);
  };

  const isHost = (from: string) => {
    return from === roomInfo.host;
  };

  const handleSendText = () => {
    if (text === "" || address === undefined) return;
    const currentTime = new Date();
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const ampm = hour >= 12 ? "PM" : "AM";
    chatHistory.push({
      from: address,
      message: text,
      timestamp: `${hour}:${minute} ${ampm}`,
    });
    setText("");
    scrollToBottom();
  };

  const clickGoBack = () => {
    router.back();
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
        <button className="text-xl" onClick={clickGoBack}>
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
            if (chat.from === "system") {
              return (
                <div
                  key={chat.from + idx}
                  className="w-full flex justify-center"
                >
                  <div className="mt-5 w-[75%] px-3 py-2 text-center text-sm text-white bg-blue-950 border-2 border-white rounded-full">
                    {chat.message}
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
                  {chat.message && (
                    <div className="w-full break-words">{chat.message}</div>
                  )}
                  {chat.nft && (
                    <div className="w-full flex justify-center">
                      <button>
                        <Image
                          className="w-30 h-30 rounded-lg"
                          src={chat.nft.image}
                          alt={`${chat.from}'s NFT ${chat.nft.tokenUri}`}
                          width={200}
                          height={200}
                          priority
                        />
                      </button>
                    </div>
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
          value={text}
          rows={1}
          className="rounded-lg px-3 py-1 w-full bg-white "
          onChange={handleTextChange}
        />
        <button className="text-white text-2xl" onClick={handleSendText}>
          <IoSend />
        </button>
      </div>
    </div>
  );
}
