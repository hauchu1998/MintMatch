import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useGetUserProfile } from "@/hooks/useGetUserProfile";

export default function Home() {
  const router = useRouter();
  // const { client, initialize} = useClient()
  const { data, isLoading } = useGetUserProfile();
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const connectWallet = async () => {
    connect();
  };

  useEffect(() => {
    if (isLoading) return;
    if (data && data.address) {
      router.push("/app/match");
    } else {
      router.push("/app/register");
    }
  }, [data, isLoading, router]);

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
      {!isConnected ? (
        <button
          className="absolute top-3/4 w-[40%] font-bold text-[#195573] border-[#195573] border-4 px-1 py-2 rounded-full hover:text-white hover:border-white hover:bg-[#195573]"
          onClick={connectWallet}
        >
          Connect Wallet
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
