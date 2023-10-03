import { useWalletClient } from "wagmi";
import { polygonMumbai } from "@wagmi/core/chains";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const useEtherWalletClient = () => {
  const { data, isLoading, error } = useWalletClient({
    chainId: polygonMumbai.id,
  });

  const ethersWalletClient = {
    getAddress: async () => {
      const address = data?.account.address || ZERO_ADDRESS;
      return address;
    },
    signMessage: async (message: any) => {
      const signature = await data?.signMessage(message);
      return signature || "";
    },
  };

  const { signMessage, ...rest } = data || {};
  const mergedWalletClient = {
    data: {
      ...ethersWalletClient,
      ...rest,
    },
  };

  return { signer: mergedWalletClient.data, isLoading, error };
};

export default useEtherWalletClient;
