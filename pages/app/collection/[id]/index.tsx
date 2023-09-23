import { useGetUserProfile } from "@/hooks/useGetUserProfile";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { MdEdit } from "react-icons/md";
import { NftCollection } from "../../profile/creator";
import { BiArrowBack } from "react-icons/bi";

const nftCollections: NftCollection = {
  id: "0xF997897484a21E8dB5C2869983E60263aF91eF8d",
  address: "0xF997897484a21E8dB5C2869983E60263aF91eF8d",
  name: "Test Collection",
  image:
    "https://i.seadn.io/gcs/files/a11611a00abf48ed80b497da005c5cda.png?auto=format&dpr=1&w=2048",
  price: 0.1,
  introduction: "This is a test collection",
  nfts: [
    "https://i.seadn.io/gcs/files/a11611a00abf48ed80b497da005c5cda.png?auto=format&dpr=1&w=2048",
    "https://i.seadn.io/gcs/files/a11611a00abf48ed80b497da005c5cda.png?auto=format&dpr=1&w=2048",
    "https://i.seadn.io/gcs/files/a11611a00abf48ed80b497da005c5cda.png?auto=format&dpr=1&w=2048",
  ],
};

export default function NftCollection() {
  const router = useRouter();
  const { id } = router.query;
  //   const { data } = useGetUserProfile(id as string);
  const data = nftCollections;

  return (
    <div className="flex flex-col items-center">
      <div className="w-[90%]">
        <div className="flex justify-between px-3">
          <button className="text-3xl" onClick={() => router.back()}>
            <BiArrowBack />
          </button>
          <Link href={`/app/collection/${data.id}/edit`}>
            <MdEdit className="text-[#195573] text-3xl" />
          </Link>
        </div>
        <div className="mt-5 w-full ">
          <div className="w-full px-2 py-1 border-b border-[#195573] text-[#195573] text-xl ">
            Address
          </div>
          <div className="text-lg">
            {data?.address.slice(0, 10) + "..." + data?.address.slice(-10)}
          </div>
        </div>
        <div className="mt-5 w-full ">
          <div className="w-full px-2 py-1 border-b border-[#195573] text-[#195573] text-xl ">
            Name
          </div>
          <div className="text-lg">{data?.name}</div>
        </div>
        <div className="mt-5 w-full flex justify-center">
          <Image
            src={data?.image}
            alt={data?.name}
            className="w-50 h-50 rounded-lg"
            width={20}
            height={20}
          />
        </div>
        <div className="mt-5 w-full ">
          <div className="w-full px-2 py-1 border-b border-[#195573] text-[#195573] text-xl">
            Introduction
          </div>
          <div className="text-lg">{data?.introduction}</div>
        </div>

        <div className="mt-5 w-full ">
          <div className="w-full px-2 py-1 border-b border-[#195573] text-[#195573] text-xl">
            Price
          </div>
          <div className="text-lg">{data?.price} MATIC</div>
        </div>
        <div className="mt-5 w-full ">
          <div className="w-full px-2 py-1 border-b border-[#195573] text-[#195573] text-xl">
            Samples
          </div>
          <div className="mt-2 w-full grid grid-cols-3">
            {data?.nfts &&
              data?.nfts.map((nft, index) => (
                <div key={nft + index} className="flex justify-center">
                  <Image
                    className="w-28 h-28 rounded-lg"
                    src={nft}
                    alt={`Sample${index}`}
                    width={20}
                    height={20}
                    priority
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
