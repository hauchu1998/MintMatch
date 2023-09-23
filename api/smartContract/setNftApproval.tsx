import { writeContract, prepareWriteContract } from "@wagmi/core";
import erc721ABI from "@/abi/ERC721_abi.json";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(
  process.env.NEXT_PUBLIC_MINT_MATCH_ADDRESS!,
  erc721ABI,
  signer
);

export const setNftApproval = async (contract: string, tokenId: number) => {
  console.log(contract, process.env.NEXT_PUBLIC_MINT_MATCH_ADDRESS, tokenId);
  const c = new ethers.Contract(contract!, erc721ABI, signer);
  const res = await c.approve(
    process.env.NEXT_PUBLIC_MINT_MATCH_ADDRESS,
    tokenId
  );
  // const config = await prepareWriteContract({
  //   address: contract as `0x${string}`,
  //   abi: erc721ABI,
  //   functionName: "approve",
  //   args: [process.env.NEXT_PUBLIC_MINT_MATCH_ADDRESS, tokenId],
  //   chainId: 80001,
  // });
  // const { hash } = await writeContract(config);
  return res;
};
