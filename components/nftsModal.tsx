import Image from "next/image";
import { useState } from "react";
import { AiOutlineClose, AiFillCheckCircle } from "react-icons/ai";
import { useGetUserNfts } from "@/hooks/useGetUserNfts";

interface NftsModalProps {
  selectedNfts: string[] | undefined;
  setSelectedNfts: Function;
  modalOn: boolean;
  setModalOn: Function;
}

// const nftList = [
//   "https://i.seadn.io/gae/iYaSGhz-OqLV07CKHB9u68uDdYRvcSpMoF47FEreNitnVPpLrzoYPPus8JBGh49qMWqIk7dfu2NaHbEmtGiNnvrlEgmkN3m4_TgF-A?auto=format&dpr=1&w=2048",
//   "https://i.seadn.io/gae/kXognhEHC07v0E9mDsXuLqOdwjJBvg-jP--JUL8zy3_OSoVH1Cma-3CaU5UNcV32DvJF9ZvCJwYTckgdljGLBCx0VaoBXLWFdlyD?auto=format&dpr=1&w=512",
//   "https://i.seadn.io/gae/ouRl9_rvoo3ZOscx8JyqVoTu-h9hbwJnZlhbbGrx46Mu1z-mt97GR4AALnv2faU1ErzrjNHPMaf0IqAvz-8eSlFfB03r5u9q-c9sQ2w?auto=format&dpr=1&w=512",
// ];

export default function NftsModal(props: NftsModalProps) {
  const { data: nftList, isLoading } = useGetUserNfts();
  const [nftsSelection, setNftsSelection] = useState<string[] | undefined>(
    props.selectedNfts
  );

  const checkIfInclude = (list: any[] | undefined, item: any) => {
    if (list === undefined) return false;
    return list.includes(item);
  };

  const handleSelectedNfts = (nft: string) => {
    if (nftsSelection === undefined || nftsSelection.length === 0) {
      setNftsSelection([nft]);
    } else if (checkIfInclude(nftsSelection, nft)) {
      setNftsSelection(nftsSelection.filter((item) => item !== nft));
    } else if (nftsSelection && nftsSelection.length < 4) {
      setNftsSelection([...nftsSelection, nft]);
    } else {
      alert("You can only select 4 NFTs");
    }
  };

  const closeModal = () => {
    props.setModalOn(false);
    setNftsSelection(props.selectedNfts);
  };

  const uploadNfts = () => {
    props.setModalOn(false);
    // setNftsSelection([]);
    props.setSelectedNfts(nftsSelection);
  };

  return (
    <div
      className={`${
        props.modalOn ? "visible" : "hidden"
      } fixed top-32 left-1/2 -translate-x-1/2 bg-black bg-opacity-90 w-[90%] h-[600px] p-2 overflow-scroll`}
    >
      <div className="relative w-full h-full">
        <div className="fixed top-0 w-full text-center font-bold text-xl text-white bg-black py-3 z-10">
          Select Nft
        </div>
        <button
          className="fixed top-2 right-2 font-bold text-2xl text-white z-20"
          onClick={closeModal}
        >
          <AiOutlineClose />
        </button>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="w-full px-3 grid grid-cols-2 gap-3 py-10">
            {nftList &&
              nftList.map((nft: any, index: number) => (
                <div
                  key={nft.tokenUri}
                  className="w-full flex justify-center z-0 relative"
                  onClick={() => handleSelectedNfts(nft)}
                >
                  <Image
                    className="w-40 h-40 rounded-lg"
                    src={nft.image}
                    alt={`NFT${index}`}
                    width={200}
                    height={200}
                    priority
                  />
                  {
                    //   @ts-ignore
                    nftsSelection && nftsSelection.includes(nft) && (
                      <div className="absolute top-3 left-3">
                        <AiFillCheckCircle className="text-green-400 text-4xl" />
                      </div>
                    )
                  }
                </div>
              ))}
          </div>
        )}

        <div className="fixed bottom-0 py-3 w-full flex justify-center bg-black">
          <button
            className="text-white bg-[#195573] rounded-full px-3 py-1 border border-white"
            onClick={uploadNfts}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
