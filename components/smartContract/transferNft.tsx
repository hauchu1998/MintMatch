import { writeContract, prepareWriteContract } from "@wagmi/core";
import abi from "@/abi/abi.json";

export const transferNft = async (
  seller: string,
  buyer: string,
  tokenId: number,
  price: number
) => {
  console.log(process.env.NEXT_PUBLIC_MINT_MATCH_ADDRESS, tokenId);
  const config = await prepareWriteContract({
    address: process.env.NEXT_PUBLIC_MINT_MATCH_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: "transfer",
    args: [seller, buyer, tokenId, BigInt(price * 10 ** 18)],
    chainId: 80001,
    value: BigInt(price * 10 ** 18),
  });
  const { hash } = await writeContract(config);
  return hash;
};
