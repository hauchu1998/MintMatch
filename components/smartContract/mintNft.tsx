import { writeContract, prepareWriteContract } from "@wagmi/core";
import erc721ABI from "@/abi/ERC721_abi.json";

export const setNftApproval = async (contract: string, address: string) => {
  const config = await prepareWriteContract({
    address: contract as `0x${string}`,
    abi: erc721ABI,
    functionName: "saleMint",
    args: [address],
    chainId: 80001,
    value: BigInt(0.01 * 10 ** 18),
  });
  const { hash } = await writeContract(config);
  return hash;
};
