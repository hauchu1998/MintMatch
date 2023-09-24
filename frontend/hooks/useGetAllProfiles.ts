import { fetchAllProfiles } from "@/api/firebase";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAccount } from "wagmi";

const getAllProfilesApi = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/profile/all`,
    {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    }
  );
  return res.data?.profiles;
};

export const useGetAllProfiles = () => {
  const { address, isConnected } = useAccount();
  const enabled = isConnected && address !== undefined;
  return useQuery({
    enabled,
    queryKey: ["fetch all profiles"],
    queryFn: async () => {
      if (!enabled) throw new Error("Not connected");
      return getAllProfilesApi();
    },
  });
};
