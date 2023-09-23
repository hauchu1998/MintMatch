import Chat from "@/components/chat";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const db = [
  {
    id: "0",
    type: "user",
    profile:
      "https://i.seadn.io/gae/Mn9hFs-fpKnO3QZbpqQCnbQB_gbTrWjUalO969wfK-LoQcdD4KQwf7wZwD-343hSvr7ghDArNi0WnUChUg561o7OlNDll5EVisfBXg?auto=format&dpr=1&w=512",
    address: "0x1234...5678",
    username: "Dr. Sloth",
    message: "Hello, how are you? Im fine thank you, and you.",
  },
  {
    id: "1",
    type: "user",
    profile:
      "https://i.seadn.io/gae/K1B56oy_EjqmTWJCufZfOLWMtDNgayOqftaVIXtq3AX2BqAVGCGz_094-H7ibUA4FrjsOyadNG7db7LoVG4SUP6PtGEsK3Y0yUO4?auto=format&dpr=1&w=512",
    address: "0x1234...5678",
    username: "",
    message: "Hello, how are you?",
  },
  {
    id: "2",
    type: "user",
    profile:
      "https://i.seadn.io/gae/a3qJDUSGm2nE_dI8u7ZEqts-ptC5x6xGfbJsfcI7D9X-9N9kgk9ZXu0MZbWjvoeaT8kSDewR8bkwv6dhtv0LHHzyduNNJzn2BAr1low?auto=format&dpr=1&w=512",
    address: "0x1234...5678",
    username: "Sloth Boy",
    message: "Hello, how are you?",
  },
  {
    id: "3",
    type: "creator",
    profile:
      "https://i.seadn.io/gae/ZDfflNHApNsQFK-qcPdhHI03YkExjnLasUI55GnmmIPWawAs4rxIQ8xKUwbgmlrEI4C9b1_D3OeZbP5RiP2hGxxc41eVLAKmbytQ?auto=format&dpr=1&w=512",
    address: "0x1234...5678",
    username: "Sloth Mom",
    message: "Hello, how are you?",
  },
  {
    id: "4",
    type: "creator",
    profile:
      "https://i.seadn.io/gae/FUHLitlCjBnl6IO--KrMRHHXViNzYETQLSj_z4VAdrWR3EXcw94VEN8eFf60Z-tINBoB7ibK8xer4uvkzN_9pfPROZSujYO8P6hc?auto=format&dpr=1&w=512",
    address: "0x1234...5678",
    username: "asdfjasdf",
    message: "Hello, how are you?",
  },
];

interface Message {
  id: string;
  type: string;
  profile: string;
  address: string;
  username: string;
  message: string;
}

export default function Messages() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const data = db;
  const [messages, setMessages] = useState<Message[]>();
  const [mode, setMode] = useState("all");

  useEffect(() => {
    if (mode === "all") {
      setMessages(data);
    } else {
      setMessages(data.filter((message) => message.type === mode));
    }
  }, [data, setMessages, mode]);

  useEffect(() => {
    if (!isConnected) {
      router.replace("/");
    }
  }, [isConnected, router]);
  return (
    <div className="w-full mt-10">
      <div className="flex gap-3 px-3">
        <div
          className={`${
            mode === "all"
              ? "bg-[#195573] text-white"
              : "border border-[#195573]"
          } rounded-full px-2`}
          onClick={() => setMode("all")}
        >
          All
        </div>
        <div
          className={`${
            mode === "user"
              ? "bg-[#195573] text-white"
              : "border border-[#195573]"
          } rounded-full px-2`}
          onClick={() => setMode("user")}
        >
          User
        </div>
        <div
          className={`${
            mode === "creator"
              ? "bg-[#195573] text-white"
              : "border border-[#195573]"
          } rounded-full px-2`}
          onClick={() => setMode("creator")}
        >
          Creator
        </div>
      </div>
      {messages &&
        messages.map((message, idx) => (
          <Chat
            key={message.address + idx}
            id={message.id}
            profile={message.profile}
            username={message.username}
            address={message.address}
            message={message.message}
          />
        ))}
    </div>
  );
}
