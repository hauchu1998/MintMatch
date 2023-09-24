import { useQuery } from "@tanstack/react-query";
import { Client, useClient } from "@xmtp/react-sdk";
import { ethers } from "ethers";

// export const useUXmtpClient = async () => {
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const signer = provider.getSigner();
//   const { client, initialize } = useClient();
//   const keys = await Client.getKeys(signer, { env: "dev" });
//   const options = {
//     persistConversations: false,
//     env: "dev",
//   };
//   // await initialize({ keys, options, signer });

//   const enabled = signer !== undefined;
//   return useQuery({
//     enabled,
//     queryKey: ["getXmtpClient"],
//     queryFn: async () => {
//       const keys = await Client.getKeys(signer, { env: "dev" });
//       const client = await Client.create(null, {
//         env: "dev",
//         privateKeyOverride: keys,
//       });
//       return { client, signer };
//     },
//   });
// };
