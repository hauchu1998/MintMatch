import Image from "next/image";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProfileForm from "@/components/profileForm";
import { useEvmWalletNFTs } from "@moralisweb3/next";
import { EvmChain } from "@moralisweb3/common-evm-utils";

const registerApi = async (address: string, profile: any) => {
  const data = { ...profile, address };
  const res = await fetch(
    `https://ccf0-128-84-95-239.ngrok-free.app/profile/${address}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  console.log(res);
  return res;
};

export default function Register() {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    if (!isConnected || address === undefined) throw new Error("Not connected");
    console.log(data);
    const res = await registerApi(address, data);
    router.push("/app/profile");
  };

  useEffect(() => {
    if (!isConnected) {
      router.replace("/");
    }
  }, [isConnected, router]);
  return (
    <div className="flex flex-col items-center">
      <div className="w-[90%] mt-16">
        <ProfileForm profile={undefined} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
