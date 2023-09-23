import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount, useConnect, useQuery } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useGetUserProfile } from "@/hooks/useGetUserProfile";
import axios from "axios";

const fetchdata = async () => {
  const res = await axios.get(
    "https://04d5-172-58-238-198.ngrok-free.app/profile/0x123455789111",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(res.data);
  return res.data;
};

fetchdata();

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useGetUserProfile();
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  useEffect(() => {
    if (isLoading) return;
    if (data) {
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
          onClick={() => connect()}
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
