import { writeContract, prepareWriteContract } from "@wagmi/core";
import erc721ABI from "@/abi/ERC721_abi.json";

export const setNftApproval = async (contract: string, tokenId: number) => {
  const config = await prepareWriteContract({
    address: contract as `0x${string}`,
    abi: erc721ABI,
    functionName: "approve",
    args: [process.env.NEXT_PUBLIC_MINT_MATCH_ADDRESS, tokenId],
    chainId: 80001,
  });
  const { hash } = await writeContract(config);
  return hash;
};
