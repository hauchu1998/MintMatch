import React from "react";
import Navbar from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/router";
import { Mooli } from "next/font/google";

const mooli = Mooli({
  weight: "400",
  subsets: ["latin"],
});

interface BaseAppProps {
  children: React.ReactNode;
}

export default function BaseApp(props: BaseAppProps) {
  const router = useRouter();
  if (router.pathname === "/") {
    return <div className="w-full min-h-screen">{props.children}</div>;
  }
  return (
    <div className={`min-h-screen overflow-hidden relative ${mooli.className}`}>
      <Navbar />
      {props.children}
      <div className="h-20"></div>
      <Footer />
    </div>
  );
}
