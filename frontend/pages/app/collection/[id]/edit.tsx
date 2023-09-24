import { useRouter } from "next/router";
import { NftCollection } from "../../profile/creator";
import CollectionForm from "@/components/collectionForm";

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

export default function EditCollection() {
  const router = useRouter();
  const { id } = router.query;
  //   const { data } = useGetUserProfile(id as string);
  const data = nftCollections;

  return (
    <div className="flex flex-col items-center">
      <div className="w-[90%] mt-5">
        <CollectionForm collection={data} />
      </div>
    </div>
  );
}
