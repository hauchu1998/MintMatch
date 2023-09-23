import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!,
  network: Network.MATIC_MUMBAI,
};

const alchemy = new Alchemy(config);

interface Metadata {
  name: string;
  description: string;
  image: string;
}

const fetchUserNftsByWallet = async (address: string) => {
  const res = await alchemy.nft.getNftsForOwner(address);
  const nftList = res.ownedNfts.map((nft) => {
    if (
      nft.tokenUri &&
      nft.rawMetadata &&
      (nft.rawMetadata.image?.startsWith("ipfs://") ||
        nft.rawMetadata.image?.startsWith("https://ipfs.io/ipfs/"))
    ) {
      const image = nft.rawMetadata.image.replace(
        "ipfs://",
        "https://ipfs.io/ipfs/"
      );
      return {
        contract: nft.contract.address,
        tokenId: nft.tokenId,
        tokenUri: nft.tokenUri.raw,
        image,
      };
    } else {
      return undefined;
    }
  });
  return nftList.filter((nft) => nft !== undefined);
};

export const useGetUserNfts = () => {
  const { address, isConnected } = useAccount();
  const enabled = isConnected && address !== undefined;
  return useQuery({
    enabled,
    queryKey: ["nfts by address", address],
    queryFn: async () => {
      if (!enabled) throw new Error("Not connected");
      return fetchUserNftsByWallet(address);
    },
  });
};

// const AIRSTACK_API_KEY = process.env.NEXT_PUBLIC_AIRSTACK_API_KEY!;
// init(AIRSTACK_API_KEY);

// export const useGetUserNfts = () => {
//   const { address } = useAccount();
//   const query = `query MyQuery {
//         Mumbai: TokenBalances(
//           input: {filter: {owner: {_eq: "${address}"}, tokenType: {_in: [ERC1155, ERC721]}}, blockchain: polygon, limit: 50}
//         ) {
//           TokenBalance {
//             owner {
//               identity
//             }
//             amount
//             tokenAddress
//             tokenId
//             tokenType
//             tokenNfts {
//               contentValue {
//                 image {
//                   small
//                 }
//               }
//             }
//           }
//           pageInfo {
//             nextCursor
//             prevCursor
//           }
//         }
//       }`;
//   //   console.log(query);
//   return useQuery(query);
// };
