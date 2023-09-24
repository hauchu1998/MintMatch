import { queryClient } from "@/pages/_app";
import axios from "axios";

const registerUserProfileApi = async (address: string, profile: any) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/profile/${address}`,
    { address, ...profile },
    {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    }
  );
  queryClient.invalidateQueries({
    queryKey: ["profile by address", address],
  });
  const data = res.data;
  return data;
};

const updateUserProfileApi = async (address: string, profile: any) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/profile/${address}`,
    { address, ...profile },
    {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    }
  );
  queryClient.invalidateQueries({
    queryKey: ["profile by address", address],
  });
  const data = res.data;
  return data;
};
