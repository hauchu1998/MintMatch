import { BsList } from "react-icons/bs";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

export default function Navbar() {
  const router = useRouter();
  const { address } = useAccount();
  const title = router.pathname.split("/").at(-1);

  const captialize = (str: string | undefined) => {
    if (str === undefined) return "404";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (router.pathname.split("/").at(-2) === "message") {
    return <></>;
  }

  return (
    <div className="w-full h-16 sticky top-0 text-[#195573] flex items-center">
      <div className="incline absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="text-2xl text-center ">{captialize(title)}</div>
        <div className="text-xs">{`${address?.slice(0, 5)}...${address?.slice(
          -5
        )}`}</div>
      </div>
    </div>
  );
}
