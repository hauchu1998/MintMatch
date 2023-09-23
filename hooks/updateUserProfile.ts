import { queryClient } from "@/pages/_app";
import axios from "axios";

const registerUserProfileApi = async (address: string, profile: any) => {
  const res = await axios.post(
    `https://04d5-172-58-238-198.ngrok-free.app/profile/${address}`,
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
    `https://04d5-172-58-238-198.ngrok-free.app/profile/${address}`,
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
