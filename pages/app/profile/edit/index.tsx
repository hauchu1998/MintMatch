import { useGetUserProfile } from "@/hooks/useGetUserProfile";
import ProfileForm from "@/components/profileForm";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";
import { updateUserProfile } from "@/api/firebase";

export default function EditPersonalProfile() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { data } = useGetUserProfile();

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
      <div className="w-[90%] mt-8">
        <button className="text-3xl" onClick={() => router.back()}>
          <BiArrowBack />
        </button>
        <ProfileForm
          profile={{
            nfts: data.nfts,
            username: data.username,
            introduction: data.introduction,
            labels: data.labels,
          }}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
