import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { fetchUserProfiles } from "@/api/firebase";
import axios from "axios";

export const getUserProfileApi = async (address: string) => {
  const res = await axios.get(
    "https://04d5-172-58-238-198.ngrok-free.app/profile/0x123455789121",
    {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    }
  );
  return res.data;
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
