import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { fetchUserProfiles } from "@/api/firebase";
import axios from "axios";

export const getUserProfileApi = async (address: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/profile/${address}`,
    {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    }
  );
  return res.data?.profile;
};

export const useGetUserProfile = () => {
  const { address, isConnected } = useAccount();

  const enabled = isConnected && address !== undefined;
  return useQuery({
    enabled,
    queryKey: ["profile by address", address],
    queryFn: async () => {
      if (!enabled) throw new Error("Not connected");
      return fetchUserProfiles(address);
      // return getUserProfileApi(address);
    },
  });
};
