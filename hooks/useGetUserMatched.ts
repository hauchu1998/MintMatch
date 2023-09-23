import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getUserProfileApi, useGetUserProfile } from "./useGetUserProfile";
import axios from "axios";
import { useAccount } from "wagmi";

type User = {
  address: string;
  labels: string[];
};

type Compatibility = {
  address: string;
  commonLabels: number;
};

const findMostCompatibleUsers = (
  currentUser: User,
  allUsers: User[]
): Compatibility[] => {
  const compatibilities: Compatibility[] = [];

  for (const user of allUsers) {
    // Skip the same user
    if (currentUser.address === user.address) continue;

    // Calculate the common labels
    const commonLabels = currentUser.labels.filter((label) =>
      user.labels.includes(label)
    ).length;

    compatibilities.push({ address: user.address, commonLabels });
  }

  // Sort by the number of common labels in ascending order
  return compatibilities.sort((a, b) => a.commonLabels - b.commonLabels);
};

export const useFindMostCompatibleUser = () => {
  const { data: fetchedUser, isLoading } = useGetUserProfile();
  const [mostCompatible, setMostCompatible] = useState<Compatibility[] | null>(
    null
  ); // Changed type here

  const users: User[] = [
    /* Fetch this from your API or state */
  ];

  useEffect(() => {
    if (!isLoading && fetchedUser) {
      const currentUser: User = {
        address: fetchedUser.address,
        labels: fetchedUser.profile.labels,
      };

      setMostCompatible(findMostCompatibleUsers(currentUser, users));
    }
  }, [fetchedUser, isLoading, users]);

  return { mostCompatible, isLoading };
};

const fetchUserMatched = async (address: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/stack/${address}`,
    {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    }
  );

  const rawStack = res.data?.stack;
  const stack = rawStack.map((profile: any) => {
    const nfts = profile.nfts.map((nft: any) => {
      const image = nft.image.replace("ipfs://", "https://ipfs.io/ipfs/");
      return {
        ...nft,
        image,
      };
    });
    return { ...profile, nfts };
  });
  console.log(stack);
  return stack;
};

export const useGetUserMatched = () => {
  const { address, isConnected } = useAccount();
  const enabled = isConnected && address !== undefined;
  return useQuery({
    enabled,
    queryKey: ["fetch all profiles"],
    queryFn: async () => {
      if (!enabled) throw new Error("Not connected");
      return fetchUserMatched(address);
    },
  });
};
