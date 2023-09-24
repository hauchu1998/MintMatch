import { useRouter } from "next/router";
import { CgProfile } from "react-icons/cg";
import { LuHeartHandshake } from "react-icons/lu";
import { MdOutlineExplore } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import { useAccount } from "wagmi";

export default function Footer() {
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.replace(`/app/${path}`);
  };

  if (router.pathname.split("/").at(-2) === "messages") {
    return <></>;
  }
  return (
    <div className="w-full fixed bottom-0 bg-[#195573] flex justify-center py-3">
      <div className="w-[80%] grid grid-cols-4">
        <button
          className="flex justify-center"
          onClick={() => navigateTo("profile")}
        >
          <CgProfile className="text-white text-4xl" />
        </button>
        <button
          className="flex justify-center"
          onClick={() => navigateTo("match")}
        >
          <LuHeartHandshake className="text-white text-4xl" />
        </button>
        <button
          className="flex justify-center"
          onClick={() => navigateTo("explore")}
        >
          <MdOutlineExplore className="text-white text-4xl" />
        </button>
        <button
          className="flex justify-center"
          onClick={() => navigateTo("messages")}
        >
          <AiOutlineMessage className="text-white text-4xl" />
        </button>
      </div>
    </div>
  );
}
