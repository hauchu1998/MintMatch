import Image from "next/image";
import { useRouter } from "next/router";

interface ChatProps {
  id: string;
  profile: string;
  username: string;
  address: string;
  message: string;
}

export default function Chat(props: ChatProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/app/messages/${props.id}`);
  };
  const { profile, username, address, message } = props;
  return (
    <div
      className="w-full px-4 py-2 grid grid-cols-5 border-b border-[#195573] items-center"
      onClick={handleClick}
    >
      <Image
        src={profile}
        className="rounded-full"
        alt={address}
        width={60}
        height={60}
      />
      <div className="w-full col-span-4 ">
        <div className="w-full text-sm font-bold truncate">
          {username ? username : address}
        </div>
        <div className="w-full truncate">{message}</div>
      </div>
    </div>
  );
}
