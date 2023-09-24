import { writeContract, prepareWriteContract } from "@wagmi/core";
import abi from "@/abi/abi.json";
import { ethers } from "ethers";

// const provider = new ethers.providers.Web3Provider(window.ethereum);
// const signer = provider.getSigner();

export const transferNft = async (
  nftContract: string,
  seller: string,
  tokenId: number,
  price: number
) => {
  const config = await prepareWriteContract({
    address: process.env.NEXT_PUBLIC_MINT_MATCH_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: "transfer",
    args: [seller, nftContract as `0x${string}`, tokenId, 2000],
    chainId: 80001,
    overrides: {
      value: 2000,
      gasLimit: ethers.BigNumber.from("200000"),
    },
  });
  const { hash } = await writeContract(config);
  return hash;
};
