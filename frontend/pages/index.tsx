import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useGetUserProfile } from "@/hooks/useGetUserProfile";
import { useIsConnected } from "@/hooks/useIsConnected";
import useEtherWalletClient from "@/hooks/useEtherWalletClient";
import { Client, useClient } from "@xmtp/react-sdk";

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useGetUserProfile();
  const isConnected = useIsConnected();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { address } = useAccount();
  console.log(isConnected, address);
  const { signer } = useEtherWalletClient();
  const { initialize } = useClient();
  const [steps, setSteps] = useState<number>(0);

  const handleWalletConnect = () => {
    connect();
    setSteps(1);
  };

  const handleInitXmtp = useCallback(async () => {
    const keys = await Client.getKeys(signer);
    await initialize({
      keys,
      signer,
      options: {
        env: "production",
      },
    });
    setSteps(2);
  }, [initialize, signer]);

  useEffect(() => {
    if (isConnected && steps === 0) {
      setSteps(1);
      return;
    }
    if (isLoading || !isConnected || steps < 2) return;
    if (data.address) {
      router.push("/app/match");
    } else {
      router.push("/app/register");
    }
  }, [data, isLoading, router, isConnected, steps]);

  return (
    <main className="absolute top-0 flex h-screen w-full flex-col items-center justify-center z-50">
      <div className="flex flex-col w-full items-center">
        <Image
          className="w-[80%]"
          src="/logo.png"
          alt="Mint Match Logo"
          width={516}
          height={288}
          priority
        />
      </div>
      {!isConnected && steps === 0 ? (
        <button
          className="absolute top-3/4 w-[40%] font-bold text-[#195573] border-[#195573] border-4 px-1 py-2 rounded-full hover:text-white hover:border-white hover:bg-[#195573]"
          onClick={handleWalletConnect}
        >
          Connect Wallet
        </button>
      ) : isConnected && steps === 1 ? (
        <button
          className="absolute top-3/4 w-[40%] font-bold text-[#195573] border-[#195573] border-4 px-1 py-2 rounded-full hover:text-white hover:border-white hover:bg-[#195573]"
          onClick={handleInitXmtp}
        >
          Connect To XMTP
        </button>
      ) : isLoading ? (
        <div className="absolute top-3/4 w-[40%] font-bold text-[#195573] px-1 py-2">
          Loading...
        </div>
      ) : (
        <div>Redirecting...</div>
      )}
    </main>
  );
}
