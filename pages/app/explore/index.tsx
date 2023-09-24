import { useRouter } from "next/router";
import Image from "next/image";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { useAccount } from "wagmi";
import { NftCollection } from "../profile/creator";
import Swipe from "@/components/swipe";
import TinderCard from "react-tinder-card";

const db: NftCollection[] = [
  {
    id: "0xF997897484a21E8dB5C2869983E60263aF91eF8d",
    address: "0xF997897484a21E8dB5C2869983E60263aF91eF8d",
    name: "Test Collection",
    image:
      "https://i.seadn.io/gcs/files/a11611a00abf48ed80b497da005c5cda.png?auto=format&dpr=1&w=2048",
    price: 0.1,
    introduction: "This is a test collection, asdfjk;jk;sadfjk;kja;skdjf;fl",
    nfts: [
      "https://i.seadn.io/gcs/files/a11611a00abf48ed80b497da005c5cda.png?auto=format&dpr=1&w=2048",
      "https://i.seadn.io/gcs/files/a11611a00abf48ed80b497da005c5cda.png?auto=format&dpr=1&w=2048",
      "https://i.seadn.io/gcs/files/a11611a00abf48ed80b497da005c5cda.png?auto=format&dpr=1&w=2048",
    ],
  },
  {
    id: "0xF997897484a21E8dB5C2869983E60263aF91eF8d",
    address: "0xF997897484a21E8dB5C2869983E60263aF91eF8d",
    name: "Test Collection",
    image:
      "https://i.seadn.io/gcs/files/a11611a00abf48ed80b497da005c5cda.png?auto=format&dpr=1&w=2048",
    price: 0.1,
    introduction: "This is a test collection",
    nfts: [
      "https://i.seadn.io/gcs/files/a11611a00abf48ed80b497da005c5cda.png?auto=format&dpr=1&w=2048",
      "https://i.seadn.io/gcs/files/a11611a00abf48ed80b497da005c5cda.png?auto=format&dpr=1&w=2048",
      "https://i.seadn.io/gcs/files/a11611a00abf48ed80b497da005c5cda.png?auto=format&dpr=1&w=2048",
    ],
  },
  {
    id: "0xF997897484a21E8dB5C2869983E60263aF91eF8d",
    address: "0xF997897484a21E8dB5C2869983E60263aF91eF8d",
    name: "Test Collection",
    image:
      "https://i.seadn.io/gcs/files/a11611a00abf48ed80b497da005c5cda.png?auto=format&dpr=1&w=2048",
    price: 0.1,
    introduction: "This is a test collection",
    nfts: [
      "https://i.seadn.io/gcs/files/a11611a00abf48ed80b497da005c5cda.png?auto=format&dpr=1&w=2048",
      "https://i.seadn.io/gcs/files/a11611a00abf48ed80b497da005c5cda.png?auto=format&dpr=1&w=2048",
      "https://i.seadn.io/gcs/files/a11611a00abf48ed80b497da005c5cda.png?auto=format&dpr=1&w=2048",
    ],
  },
  {
    id: "0xF997897484a21E8dB5C2869983E60263aF91eF8d",
    address: "0xF997897484a21E8dB5C2869983E60263aF91eF8d",
    name: "Test Collection",
    image:
      "https://i.seadn.io/gcs/files/a11611a00abf48ed80b497da005c5cda.png?auto=format&dpr=1&w=2048",
    price: 0.1,
    introduction:
      "This is a test collection that develop by a couple cornell tech students",
    nfts: [
      "https://i.seadn.io/gcs/files/a11611a00abf48ed80b497da005c5cda.png?auto=format&dpr=1&w=2048",
      "https://i.seadn.io/gcs/files/a11611a00abf48ed80b497da005c5cda.png?auto=format&dpr=1&w=2048",
      "https://i.seadn.io/gcs/files/a11611a00abf48ed80b497da005c5cda.png?auto=format&dpr=1&w=2048",
    ],
  },
];

export default function Explore() {
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
    currIndexRef.current >= idx && childRefs[idx].current.restoreCard();
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
      {db.map((collection, index) => (
        <TinderCard
          ref={childRefs[index]}
          className="absolute -top-20 w-full flex justify-center"
          key={collection.name + index}
          onSwipe={(dir) => swiped(dir, index)}
          onCardLeftScreen={() => outOfFrame(collection.name, index)}
        >
          <div className="bg-[#195573] p-2 w-full rounded-lg">
            <div className="flex justify-center">
              <Image
                className="rounded-lg w-[80%] h-[240px] border border-[#195573]"
                src={collection.image}
                alt={`NFT${index}`}
                width={300}
                height={300}
                priority
              />
            </div>

            <div className="font-bold text-white text-xl">
              {collection.name}
            </div>
            <div className="font-bold text-white text-xl">
              {"price: " + collection.price + " MATIC"}
            </div>
            <div className="font-bold w-full max-h-10 bg-transparent text-white truncate">
              {collection.introduction}
            </div>
            <div className="mt-3 grid grid-cols-3">
              {collection.nfts.map((nft, index) => (
                <Image
                  key={nft + index}
                  className="rounded-lg w-full border border-[#195573]"
                  src={collection.image}
                  alt={`NFT${index}`}
                  width={30}
                  height={30}
                  priority
                />
              ))}
            </div>
          </div>
        </TinderCard>
      ))}
    </Swipe>
  );
}
