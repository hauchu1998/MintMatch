import { writeContract, prepareWriteContract } from "@wagmi/core";
import abi from "@/abi/abi.json";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(
  process.env.NEXT_PUBLIC_MINT_MATCH_ADDRESS!,
  abi,
  signer
);

export const transferNft = async (
  nftContract: string,
  seller: string,
  tokenId: number,
  price: number
) => {
<<<<<<< Updated upstream
  let transaction = {
    value: ethers.utils.parseEther(price * 1.1 + ""),
    gasLimit: ethers.utils.hexlify(5000000),
  };
  const res = await contract.transfer(
    seller,
    nftContract,
    tokenId,
    price * 10 ** 18,
    transaction
  );

  return res;
  // const config = await prepareWriteContract({
  //   address: process.env.NEXT_PUBLIC_MINT_MATCH_ADDRESS as `0x${string}`,
  //   abi: abi,
  //   functionName: "transfer",
  //   args: [seller, nftContract, tokenId, BigInt(price * 10 ** 18)],
  //   chainId: 80001,
  //   value: BigInt(price * 10 ** 18),
  // });
  // const { hash } = await writeContract(config);
  // return hash;
=======
  //   let transaction = {
  //     value: ethers.utils.parseEther(price * 1.1 + ""),
  //     gasLimit: ethers.utils.hexlify(5000000),
  //   };
  //   const res = await contract.transfer(
  //     seller,
  //     nftContract,
  //     tokenId,
  //     price * 10 ** 18,
  //     transaction
  //   );

  //   return res;
  const config = await prepareWriteContract({
    address: process.env.NEXT_PUBLIC_MINT_MATCH_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: "transfer",
    args: [seller, nftContract, tokenId, BigInt(price * 10 ** 18)],
    chainId: 80001,
    value: BigInt(price * 10 ** 18),
  });
  const { hash } = await writeContract(config);
  return hash;
>>>>>>> Stashed changes
};
