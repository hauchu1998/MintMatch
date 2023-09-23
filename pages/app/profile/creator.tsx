import Image from "next/image";
import Link from "next/link";

const nftCollections: NftCollection[] = [
  {
    id: "0xF997897484a21E8dB5C2869983E60263aF91eF8d",
    address: "0xF997897484a21E8dB5C2869983E60263aF91eF8d",
    name: "Test Collection",
    image:
      "https://i.seadn.io/gcs/files/a11611a00abf48ed80b497da005c5cda.png?auto=format&dpr=1&w=2048",
    price: 0.1,
    introduction: "This is a test collection",
    nfts: [],
  },
];

export interface NftCollection {
  id: string;
  address: string;
  name: string;
  image: string;
  price: number;
  introduction: string;
  nfts: string[];
}

export default function Creator() {
  // const { data } = useGetUserNftCollections();
  return (
    <div className="w-full mt-5 grid grid-cols-2 gap-2">
      {nftCollections.map((collection, idx) => (
        <div key={collection.address + idx}>
          <Link
            type="button"
            href={`/app/collection/${collection.id}`}
            className="w-full h-40 flex flex-col items-center rounded-lg"
          >
            <Image
              key={idx}
              src={collection.image}
              alt={collection.name}
              className="w-40 h-40 rounded-lg"
              width={20}
              height={20}
              priority
            />
          </Link>
          <div className="text-center text-sm">{collection.name}</div>
        </div>
      ))}
      <div className="w-full flex flex-col items-center">
        <Link
          type="button"
          href="/app/collection/new"
          className="w-40 h-40 bg-[#195573] flex items-center justify-center rounded-lg"
        >
          <div className="text-white text-4xl font-bold">+</div>
        </Link>
      </div>
    </div>
  );
}
