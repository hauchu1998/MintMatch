import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { NftCollection } from "@/pages/app/profile/creator";
import { AiOutlineClose } from "react-icons/ai";

interface CollectionFormProps {
  collection: NftCollection | undefined;
}

export default function CollectionForm(props: CollectionFormProps) {
  const router = useRouter();
  const [address, setAddress] = useState<string | undefined>(
    props.collection?.address
  );
  const [name, setName] = useState<string | undefined>(props.collection?.name);
  const [image, setImage] = useState<string | undefined>(
    props.collection?.image
  );
  const [introduction, setIntroduction] = useState<string | undefined>(
    props.collection?.introduction
  );
  const [price, setPrice] = useState<number | undefined>(
    props.collection?.price
  );
  const [nfts, setNfts] = useState<string[]>(
    props.collection?.nfts || ["", "", ""]
  );

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "address") {
      setAddress(value);
    } else if (name === "name") {
      setName(value);
    } else if (name === "image") {
      setImage(value);
    } else if (name === "introduction") {
      setIntroduction(value);
    } else if (name === "price") {
      setPrice(value);
    }
  };

  const handleNftsChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "nft1") {
      setNfts([value, nfts[1], nfts[2]]);
    } else if (name === "nft2") {
      setNfts([nfts[0], value, nfts[2]]);
    } else if (name === "nft3") {
      setNfts([nfts[0], nfts[1], value]);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const filterNfts = nfts.filter((nft) => nft !== "");
    setNfts(filterNfts);
    router.push("/app/profile");
  };

  return (
    <div>
      <form>
        <div className="w-full ">
          <div className="w-full px-2 py-1 border-b border-[#195573] text-[#195573] text-xl">
            Address
          </div>
          <input
            type="text"
            className="mt-3 p-1 bg-transparent border border-[#195573] w-full rounded-lg focus:border-white"
            placeholder="type collection address"
            name="address"
            value={address || ""}
            onChange={handleChange}
          />
        </div>
        <div className="w-full ">
          <div className="mt-5 w-full px-2 py-1 border-b border-[#195573] text-[#195573] text-xl">
            Name
          </div>
          <input
            type="text"
            className="mt-3 p-1 bg-transparent border border-[#195573] w-full rounded-lg focus:border-white"
            placeholder="type collection name"
            name="name"
            value={name || ""}
            onChange={handleChange}
          />
        </div>
        <div className="w-full ">
          <div className="mt-5 w-full px-2 py-1 border-b border-[#195573] text-[#195573] text-xl">
            Image
          </div>
          <input
            type="text"
            className="mt-3 p-1 bg-transparent border border-[#195573] w-full rounded-lg focus:border-white"
            placeholder="type collection image url"
            name="image"
            value={image || ""}
            onChange={handleChange}
          />
          {image && (
            <div className="mt-3 flex justify-center">
              <Image
                className="w-40 h-40 rounded-lg"
                src={image}
                alt={`Collection Image}`}
                width={200}
                height={200}
                priority
              />
            </div>
          )}
        </div>
        <div className="w-full ">
          <div className="mt-5 w-full px-2 py-1 border-b border-[#195573] text-[#195573] text-xl">
            Price
          </div>
          <input
            type="text"
            className="mt-3 p-1 bg-transparent border border-[#195573] w-full rounded-lg focus:border-white"
            placeholder="type nft price"
            name="price"
            value={price || ""}
            onChange={handleChange}
          />
        </div>
        <div className="w-full ">
          <div className="mt-5 w-full px-2 py-1 border-b border-[#195573] text-[#195573] text-xl">
            Samples
          </div>
          <div className="w-full">
            <input
              type="text"
              className="mt-3 p-1 bg-transparent border border-[#195573] w-full rounded-lg focus:border-white"
              placeholder="type first NFT sample url"
              name="nft1"
              value={nfts[0]}
              onChange={handleNftsChange}
            />
            <input
              type="text"
              className="mt-3 p-1 bg-transparent border border-[#195573] w-full rounded-lg focus:border-white"
              placeholder="type second NFT sample url"
              name="nft2"
              value={nfts[1]}
              onChange={handleNftsChange}
            />
            <input
              type="text"
              className="mt-3 p-1 bg-transparent border border-[#195573] w-full rounded-lg focus:border-white"
              placeholder="type third NFT sample url"
              name="nft3"
              value={nfts[2]}
              onChange={handleNftsChange}
            />
          </div>
        </div>
        <div className="w-full flex justify-center mt-5 gap-4">
          <button
            type="button"
            className="px-8 py-1 border border-white bg-[#195573] text-white rounded-full"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-8 py-1 border border-white bg-[#195573] text-white rounded-full"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
