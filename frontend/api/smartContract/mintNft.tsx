import { writeContract, prepareWriteContract } from "@wagmi/core";
import erc721ABI from "@/abi/ERC721_abi.json";
import { ethers } from "ethers";

export const mintNft = async (contract: string, address: string) => {
  const config = await prepareWriteContract({
    address: contract as `0x${string}`,
    abi: erc721ABI,
    functionName: "saleMint",
    args: [address],
    chainId: 80001,
    overrides: {
      value: 2000,
      gasLimit: ethers.BigNumber.from("200000"),
    },
  });
  const { hash } = await writeContract(config);
  return hash;
};
