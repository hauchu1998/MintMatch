import React, { useEffect, useMemo, useRef, useState } from "react";
import { AiFillHeart, AiOutlineReload } from "react-icons/ai";
import { ImCross } from "react-icons/im";

interface SwipeProps {
  cardDeck: number;
  currIndex: number;
  currIndexRef: any;
  setCurrIndex: Function;
  lastDirection: string | undefined;
  setLastDirection: Function;
  childRefs: any[];
  children: React.ReactNode;
}

export default function Swipe(props: SwipeProps) {
  const cardDeck = props.cardDeck;
  const currIndex = props.currIndex;
  const [canGoBack, setCanGoBack] = useState<boolean>(true);
  const [canSwipe, setCanSwipe] = useState<boolean>(true);

  const updateCurrIndex = (idx: number) => {
    props.setCurrIndex(idx);
    props.currIndexRef.current = idx;
  };

  const swipeCard = async (dir: string) => {
    if (canSwipe && currIndex < cardDeck) {
      await props.childRefs[currIndex].current.swipe(dir);
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currIndex + 1;
    updateCurrIndex(newIndex);
    props.setLastDirection("");
    await props.childRefs[newIndex].current.restoreCard();
  };

  useEffect(() => {
    setCanGoBack(currIndex < cardDeck - 1);
    setCanSwipe(currIndex >= 0);
  }, [currIndex, setCanGoBack, setCanSwipe, cardDeck]);

  return (
    <div className="flex flex-col items-center">
      <div className="mt-24 w-[80%]">
        <div className=" w-full h-[300px] flex justify-center relative">
          {props.children}
        </div>
        <div className="mt-20 w-full grid grid-cols-3 gap-3">
          <div className="flex justify-center">
            <button
              className="w-16 h-16 rounded-full bg-white flex justify-center items-center"
              onClick={() => swipeCard("left")}
            >
              <ImCross className="text-red-500 text-3xl" />
            </button>
          </div>

          <div className="flex justify-center">
            <button
              className="w-16 h-16 rounded-full bg-white flex justify-center items-center"
              onClick={() => goBack()}
            >
              <AiOutlineReload className="text-purple-500 text-4xl" />
            </button>
          </div>

          <div className="flex justify-center">
            <button
              className="w-16 h-16 rounded-full bg-white flex justify-center items-center"
              onClick={() => swipeCard("right")}
            >
              <AiFillHeart className="text-green-500 text-4xl" />
            </button>
          </div>
        </div>
        {props.lastDirection ? (
          <div className="mt-10 w-full text-2xl  text-center font-bold">
            You swiped {props.lastDirection}
          </div>
        ) : (
          <div className="mt-5 w-full text-xl  text-center font-bold">
            Swipe a card or press a button to get Restore Card button visible!
          </div>
        )}
      </div>
    </div>
  );
}
