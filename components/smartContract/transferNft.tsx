import { writeContract, prepareWriteContract } from "@wagmi/core";
import erc721ABI from "@/abi/ERC721_abi.json";

export const transferNft = async (
  seller: string,
  buyer: string,
  tokenId: number,
  price: number
) => {
  const config = await prepareWriteContract({
    address: process.env.NEXT_PUBLIC_MINT_MATCH_ADDRESS as `0x${string}`,
    abi: erc721ABI,
    functionName: "trasferFrom",
    args: [seller, tokenId],
    chainId: 80001,
  });
  const { hash } = await writeContract(config);
  return hash;
};
