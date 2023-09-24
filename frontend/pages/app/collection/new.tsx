import CollectionForm from "@/components/collectionForm";

export default function NewCollection() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[90%] mt-5">
        <CollectionForm collection={undefined} />
      </div>
    </div>
  );
}
