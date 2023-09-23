import Image from "next/image";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { updateUserProfile } from "@/api/firebase";
import ProfileForm from "@/components/profileForm";

export default function Register() {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    if (!isConnected || address === undefined) throw new Error("Not connected");
    await updateUserProfile(address, data);
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
