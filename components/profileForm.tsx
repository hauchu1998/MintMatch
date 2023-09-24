import { useState } from "react";
import Image from "next/image";
import NftsModal from "./nftsModal";
import { useRouter } from "next/router";

interface ProfileFormProps {
  profile: ProfileInfo | undefined;
  handleSubmit: Function;
}

interface ProfileInfo {
  nfts: string[];
  username: string;
  introduction: string;
  labels: string[];
}

const labels = ["Art", "Game", "Tech", "Cute", "Sports", "Animals", "Music"];

export default function ProfileForm(props: ProfileFormProps) {
  const [selectedNfts, setSelectedNfts] = useState<any[] | undefined>(
    props.profile?.nfts
  );
  const [introduction, setIntroduction] = useState<string | undefined>(
    props.profile?.introduction
  );
  const [username, setUsername] = useState<string | undefined>(
    props.profile?.username
  );
  const [selectedLabels, setSelectedLabels] = useState<string[] | undefined>(
    props.profile?.labels
  );
  const [modalOn, setModalOn] = useState<boolean>(false);

  const handleSelectedLabels = (label: string) => {
    if (selectedLabels === undefined || selectedLabels.length === 0) {
      setSelectedLabels([label]);
    } else if (checkIfInclude(selectedLabels, label)) {
      setSelectedLabels(selectedLabels.filter((item) => item !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  const checkIfInclude = (list: any[] | undefined, item: any) => {
    if (list === undefined) return false;
    return list.includes(item);
  };
  const handleIntroChange = (e: any) => {
    setIntroduction(e.target.value);
  };

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e: any) => {
    const data = {
      nfts: selectedNfts,
      username: username,
      introduction: introduction,
      labels: selectedLabels,
    };
    props.handleSubmit(data);
  };
  return (
    <div className="">
      <form className="w-full">
        <div className="w-full grid grid-cols-2 gap-3">
          {Array(4)
            .fill(0)
            .map((_, index) => {
              return (
                <div
                  key={`profileNft${index}`}
                  className="w-full flex justify-center"
                >
                  <button
                    type="button"
                    className="w-40 h-40 bg-[#195573] flex items-center justify-center rounded-lg"
                    onClick={() => setModalOn(true)}
                  >
                    {selectedNfts && selectedNfts.length - 1 >= index ? (
                      <Image
                        className="w-40 h-40 rounded-lg"
                        src={selectedNfts[index].image}
                        alt={`NFT${index}`}
                        width={200}
                        height={200}
                        priority
                      />
                    ) : (
                      <div className="text-white text-4xl font-bold">+</div>
                    )}
                  </button>
                </div>
              );
            })}
        </div>
        <div className="w-full ">
          <div className="mt-10 w-full px-2 py-1 border-b border-[#195573] text-[#195573] text-xl">
            Username
          </div>
          <input
            type="text"
            className="mt-3 p-1 bg-transparent border border-[#195573] w-full rounded-lg focus:border-white"
            placeholder="type your intro"
            value={username || ""}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="w-full ">
          <div className="mt-10 w-full px-2 py-1 border-b border-[#195573] text-[#195573] text-xl">
            Introduction
          </div>
          <textarea
            className="mt-3 p-1 bg-transparent border border-[#195573] w-full rounded-lg focus:border-white"
            placeholder="type your intro"
            rows={4}
            value={introduction || ""}
            onChange={handleIntroChange}
          />
        </div>
        <div className="w-full ">
          <div className="mt-5 w-full px-2 py-1 border-b border-[#195573] text-[#195573] text-xl">
            Label
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2 px-2">
            {labels.map((label) => (
              <button
                key={label}
                type="button"
                className={`px-2 rounded-full text-center font-bold border ${
                  checkIfInclude(selectedLabels, label)
                    ? "border-white text-white bg-[#195573]"
                    : "border-[#195573]"
                }`}
                onClick={() => handleSelectedLabels(label)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center mt-10">
          <button
            type="button"
            className="px-8 py-1 border border-white bg-[#195573] text-white rounded-full"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
      <NftsModal
        selectedNfts={selectedNfts}
        setSelectedNfts={setSelectedNfts}
        modalOn={modalOn}
        setModalOn={setModalOn}
        maxLength={4}
      />
    </div>
  );
}
