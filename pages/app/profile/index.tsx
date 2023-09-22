import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Personal from "@/pages/app/profile/personal";
import Creator from "@/pages/app/profile/creator";

export default function Profile() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [userMode, setUserMode] = useState<boolean>(true);

  useEffect(() => {
    if (!isConnected) {
      router.replace("/");
    }
  }, [isConnected, router]);
  return (
    <div className="flex flex-col items-center">
      <div className="w-[90%]">
        <div className="w-full border-b border-[#195573] flex gap-1">
          <div
            className={`${
              userMode
                ? "bg-[#195573] text-white"
                : "border-x border-t border-[#195573]"
            } text-xl px-2`}
            onClick={() => setUserMode(true)}
          >
            Personal
          </div>
          <div
            className={`${
              !userMode
                ? "bg-[#195573] text-white"
                : "border-x border-t border-[#195573]"
            } text-xl px-2`}
            onClick={() => setUserMode(false)}
          >
            Creator
          </div>
        </div>
        {userMode ? <Personal /> : <Creator />}
      </div>
    </div>
  );
}
