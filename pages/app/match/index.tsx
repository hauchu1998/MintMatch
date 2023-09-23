import React, { useEffect, useMemo, useRef, useState } from "react";
import { ConversationV2 } from "@xmtp/xmtp-js";
import Swipe from "@/components/swipe";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import TinderCard from "react-tinder-card";
import Image from "next/image";
import { swipeRight } from "@/api/firebase";
import { dir } from "console";
import { useGetAllProfiles } from "@/hooks/useGetAllProfiles";
import { useGetUserMatched } from "@/hooks/useGetUserMatched";
// import useXmtp from "@/hooks/useXmtp";
// import { useGetXmtpClient } from "@/hooks/useGetXmtpClient";

const data = [
  {
    address: "0xE2A794de195D92bBA0BA64e006FcC3568104245d",
    introduction: "Hi",
    labels: ["Art"],
    nfts: [
      {
        tokenUri: "0xE2A794de195D92bBA0BA64e006FcCaskldfjaksd",
        image:
          "https://i.seadn.io/gae/iYaSGhz-OqLV07CKHB9u68uDdYRvcSpMoF47FEreNitnVPpLrzoYPPus8JBGh49qMWqIk7dfu2NaHbEmtGiNnvrlEgmkN3m4_TgF-A?auto=format&dpr=1&w=2048",
      },
    ],
    username: "sloth 1",
  },
  {
    address: "0x2eD5018aaFB2sC969FF443c95D5CD2d21cB709aA",
    introduction: "Hey yo",
    labels: ["Game"],
    nfts: [
      {
        tokenUri: "0xE2A79sfhuewbaBA0BA64e006FcCaskldfjaksd",
        image:
          "https://i.seadn.io/gae/kXognhEHC07v0E9mDsXuLqOdwjJBvg-jP--JUL8zy3_OSoVH1Cma-3CaU5UNcV32DvJF9ZvCJwYTckgdljGLBCx0VaoBXLWFdlyD?auto=format&dpr=1&w=512",
      },
    ],
    username: "sloth 2",
  },
  {
    address: "0x82adc5C5624D5fa7902CAA307aDefeE307B3f37e",
    introduction: "Como estas",
    labels: ["Tech"],
    nfts: [
      {
        tokenUri: "0xE2A79ieksuwo2bBA0BA64e006FcCaskldfjaksd",
        image:
          "https://i.seadn.io/gae/ouRl9_rvoo3ZOscx8JyqVoTu-h9hbwJnZlhbbGrx46Mu1z-mt97GR4AALnv2faU1ErzrjNHPMaf0IqAvz-8eSlFfB03r5u9q-c9sQ2w?auto=format&dpr=1&w=512",
      },
    ],
    username: "sloth 3",
  },
];

export default function Match() {
  const { data, isLoading } = useGetUserMatched();
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [currIndex, setCurrIndex] = useState<number>(0);
  const [lastDirection, setLastDirection] = useState<string | undefined>();
  const currIndexRef = useRef(currIndex);
  const childRefs = useMemo(() => {
    if (data === undefined) return [];
    return Array(data.length)
      .fill(0)
      .map((i) => React.createRef<any>());
  }, [data]);

  const updateCurrIndex = (idx: number) => {
    setCurrIndex(idx);
    currIndexRef.current = idx;
  };

  const swiped = async (direction: any, index: number, cardAddress: string) => {
    setLastDirection(direction);
    updateCurrIndex(index - 1);
    if (direction === "right") {
      console.log(address, cardAddress);
      const matched = await swipeRight(address as string, cardAddress);
      if (matched) {
        alert("Match!!!");
        // if (xmtp && xmtp.client !== undefined) {
        //   (await xmtp.client.conversations.newConversation(
        //     cardAddress
        //   )) as ConversationV2<String>;
        // }
      }
    }
  };

  const outOfFrame = (name: string, idx: number) => {
    // console.log(name, idx, "left the screen!", currIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  useEffect(() => {
    if (!isConnected) {
      router.replace("/");
    }
  }, [isConnected, router]);

  useEffect(() => {
    if (data) {
      setCurrIndex(data.length - 1);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);
  return (
    <Swipe
      cardDeck={data.length}
      currIndex={currIndex}
      setCurrIndex={setCurrIndex}
      currIndexRef={currIndexRef}
      childRefs={childRefs}
      lastDirection={lastDirection}
      setLastDirection={setLastDirection}
    >
      {data.map((profile: any, index: number) => (
        <TinderCard
          ref={childRefs[index]}
          className="absolute w-full flex justify-center"
          key={profile.address}
          onSwipe={(dir) => swiped(dir, index, profile.address)}
          onCardLeftScreen={() =>
            outOfFrame(profile.username || profile.address, index)
          }
        >
          <div className="relative w-full h-[300px] rounded-lg">
            <Image
              className="rounded-lg w-full h-[300px] border border-[#195573]"
              src={profile.nfts[0].image}
              alt={`NFT${index}`}
              width={300}
              height={300}
              priority
            />
            <div className="absolute left-3 bottom-3 font-bold text-white text-xl truncate w-[90%]">
              {profile.username || profile.address}
            </div>
          </div>
        </TinderCard>
      ))}
    </Swipe>
  );
}
