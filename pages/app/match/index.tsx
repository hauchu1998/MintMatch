import React, { useEffect, useMemo, useRef, useState } from "react";
import Swipe from "@/components/swipe";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import TinderCard from "react-tinder-card";
import Image from "next/image";

const db = [
  {
    name: "sloth 1",
    url: "https://i.seadn.io/gae/iYaSGhz-OqLV07CKHB9u68uDdYRvcSpMoF47FEreNitnVPpLrzoYPPus8JBGh49qMWqIk7dfu2NaHbEmtGiNnvrlEgmkN3m4_TgF-A?auto=format&dpr=1&w=2048",
  },
  {
    name: "sloth 2",
    url: "https://i.seadn.io/gae/kXognhEHC07v0E9mDsXuLqOdwjJBvg-jP--JUL8zy3_OSoVH1Cma-3CaU5UNcV32DvJF9ZvCJwYTckgdljGLBCx0VaoBXLWFdlyD?auto=format&dpr=1&w=512",
  },
  {
    name: "sloth 3",
    url: "https://i.seadn.io/gae/ouRl9_rvoo3ZOscx8JyqVoTu-h9hbwJnZlhbbGrx46Mu1z-mt97GR4AALnv2faU1ErzrjNHPMaf0IqAvz-8eSlFfB03r5u9q-c9sQ2w?auto=format&dpr=1&w=512",
  },
];

export default function Match() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [currIndex, setCurrIndex] = useState<number>(db.length - 1);
  const [lastDirection, setLastDirection] = useState<string | undefined>();
  const currIndexRef = useRef(currIndex);
  const childRefs = useMemo(() => {
    return Array(db.length)
      .fill(0)
      .map((i) => React.createRef<any>());
  }, []);

  const updateCurrIndex = (idx: number) => {
    setCurrIndex(idx);
    currIndexRef.current = idx;
  };

  const swiped = (direction: any, index: number) => {
    setLastDirection(direction);
    updateCurrIndex(index - 1);
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
  return (
    <Swipe
      cardDeck={db.length}
      currIndex={currIndex}
      setCurrIndex={setCurrIndex}
      currIndexRef={currIndexRef}
      childRefs={childRefs}
      lastDirection={lastDirection}
      setLastDirection={setLastDirection}
    >
      {db.map((profile, index) => (
        <TinderCard
          ref={childRefs[index]}
          className="absolute w-full flex justify-center"
          key={profile.name + index}
          onSwipe={(dir) => swiped(dir, index)}
          onCardLeftScreen={() => outOfFrame(profile.name, index)}
        >
          <div className="relative w-full h-[300px] rounded-lg">
            <Image
              className="rounded-lg w-full h-[300px] border border-[#195573]"
              src={profile.url}
              alt={`NFT${index}`}
              width={300}
              height={300}
              priority
            />
            <div className="absolute left-3 bottom-3 font-bold text-white text-xl">
              {profile.name}
            </div>
          </div>
        </TinderCard>
      ))}
    </Swipe>
  );
}
