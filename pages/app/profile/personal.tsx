import Image from "next/image";
import { useGetUserProfile } from "@/hooks/useGetUserProfile";
import { MdEdit } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchUserProfiles } from "@/api/firebase";

export default function Personal() {
  const router = useRouter();
  const { data, isLoading } = useGetUserProfile();

  if (!isLoading && !data) {
    router.push("/app/register");
  }

  return (
    <div className="mt-5 w-full">
      <div className="flex justify-end">
        <Link href="/app/profile/edit">
          <MdEdit className="text-[#195573] text-xl" />
        </Link>
      </div>
      <div className="mt-2 w-full grid grid-cols-2 gap-3">
        {data.nfts.map((nft: any, index: number) => (
          <div key={nft.tokenUri} className="w-full flex justify-center">
            <Image
              className="w-40 h-40 rounded-lg"
              src={nft.image}
              alt={`NFT${index}`}
              width={200}
              height={200}
              priority
            />
          </div>
        ))}
      </div>
      <div className="mt-5 w-full">
        <div className=" w-full py-1 border-b border-[#195573] text-[#195573] text-xl">
          Username
        </div>
        <div className="text-lg">{data.username}</div>
      </div>
      <div className="mt-3 w-full ">
        <div className="w-full py-1 border-b border-[#195573] text-[#195573] text-xl">
          Introduction
        </div>
        <div className="text-lg">{data.introduction}</div>
      </div>
      <div className="mt-3 w-full ">
        <div className="w-full py-1 border-b border-[#195573] text-[#195573] text-xl">
          Label
        </div>
        <div className="mt-3 grid grid-cols-4 gap-3 px-2">
          {data.labels.map((label: any) => (
            <div
              key={label}
              className="px-2 border border-[#195573] rounded-full text-center font-bold"
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
