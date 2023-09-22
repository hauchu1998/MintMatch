import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export const getUserProfileApi = async (address: string) => {
  // const res = await fetch(
  //   `https://ccf0-128-84-95-239.ngrok-free.app/profile/0x123456789`
  // );
  // console.log(res.json());
  return {
    address,
    profile: {
      nfts: [
        {
          tokenUri: "https://ipfs.io/ipfs/QmZ1Z2Z3Z4Z5Z6Z7Z8Z9Z0",
          image:
            "https://i.seadn.io/gae/iYaSGhz-OqLV07CKHB9u68uDdYRvcSpMoF47FEreNitnVPpLrzoYPPus8JBGh49qMWqIk7dfu2NaHbEmtGiNnvrlEgmkN3m4_TgF-A?auto=format&dpr=1&w=2048",
        },
        {
          tokenUri: "https://ipfs.io/ipfs/QmZ1Z2Z3Z4Z5Zasdfa6Z7Z8Z9Z0",
          image:
            "https://i.seadn.io/gae/kXognhEHC07v0E9mDsXuLqOdwjJBvg-jP--JUL8zy3_OSoVH1Cma-3CaU5UNcV32DvJF9ZvCJwYTckgdljGLBCx0VaoBXLWFdlyD?auto=format&dpr=1&w=512",
        },
        {
          tokenUri: "https://ipfs.io/ipfs/QmZ1Z2Z3Z4Z5Z6Z7Z8Z9Z0asdfasdffv",
          image:
            "https://i.seadn.io/gae/ouRl9_rvoo3ZOscx8JyqVoTu-h9hbwJnZlhbbGrx46Mu1z-mt97GR4AALnv2faU1ErzrjNHPMaf0IqAvz-8eSlFfB03r5u9q-c9sQ2w?auto=format&dpr=1&w=512",
        },
      ],
      username: "Sloth",
      introduction:
        "I am a web3 developer and I love to build cool stuffs with web3",
      labels: ["Art", "Game", "Tech"],
    },
  };
};

export const useGetUserProfile = () => {
  const { address, isConnected } = useAccount();

  const enabled = isConnected && address !== undefined;
  return useQuery({
    enabled,
    queryKey: ["profile by address", address],
    queryFn: async () => {
      if (!enabled) throw new Error("Not connected");
      return getUserProfileApi(address);
    },
  });
};
