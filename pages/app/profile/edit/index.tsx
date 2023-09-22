import { useGetUserProfile } from "@/hooks/useGetUserProfile";
import ProfileForm from "@/components/profileForm";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";

// const nfts = [
//   "https://ipfs.io/ipfs/QmSedCXYPfmbtCU2wM1nYE1YjAHqRsMWoqW6P4f43gcEgC?filename=0.jpg",
//   "https://ipfs.io/ipfs/QmNxwB5UBN68pMxu4Ja7FkyL7Y8LMgkweQLsQnArxadNNV?filename=3.jpg",
//   "https://ipfs.io/ipfs/Qma4q3J3nFUpENnTWbxQVYuBYbQS4nbgis2dNYHkBD5xXy?filename=2.jpg",
// ];

const EditProfileApi = async (address: string, profile: any) => {
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

export default function EditPersonalProfile() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { data } = useGetUserProfile();

  const handleSubmit = async (data: any) => {
    if (!isConnected || address === undefined) throw new Error("Not connected");
    console.log(data);
    const res = await EditProfileApi(address, data);
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
        <ProfileForm profile={data?.profile} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
