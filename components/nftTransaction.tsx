import Image from "next/image";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useAccount } from "wagmi";
import { setNftApproval } from "@/api/smartContract/setNftApproval";

interface SellerMessageProps {
  proposedNftTx: any;
  sellerAgree: Function;
  sellerDeny: Function;
}

export const SellerMessage = (props: SellerMessageProps) => {
  const tx = props.proposedNftTx;
  if (tx.action === "OwnerProposed") {
    return (
      <div className="break-words ">
        You proposed to sell <span className="text-yellow-400">{tx.buyer}</span>{" "}
        a NFT which token ID is {tx.tokenId} on contract {tx.contract} in{" "}
        {tx.price} MATIC. Waiting to reply...
      </div>
    );
  }

  if (tx.action === "BuyerProposed") {
    return (
      <div className="w-full">
        <div className="w-full break-words ">
          <span className="text-yellow-400">{tx.buyer}</span> proposed to buy a
          NFT which token ID is {tx.tokenId} on contract {tx.contract} in{" "}
          {tx.price} MATIC.Do you agree?
        </div>
        <div className="mt-2 flex justify-center gap-3">
          <button
            className="px-2  border border-gray-400 rounded-lg"
            onClick={() => props.sellerDeny()}
          >
            No
          </button>
          <button
            className="px-2  border border-gray-400 rounded-lg"
            onClick={() => props.sellerAgree(tx)}
          >
            Yes
          </button>
        </div>
      </div>
    );
  }

  if (tx.action === "SellerAgree") {
    return (
      <div className="w-full">
        <div className="w-full break-words ">
          Congrats with the deal! Please wait{" "}
          <span className="text-yellow-400">{tx.owner}</span> to execute the
          transfer process!
        </div>
      </div>
    );
  }
};

interface BuyerMessageProp {
  proposedNftTx: any;
  buyerAgree: Function;
  buyerDeny: Function;
  executeTransfer: Function;
}

export const BuyerMessage = (props: BuyerMessageProp) => {
  const tx = props.proposedNftTx;

  if (tx.action === "BuyerProposed") {
    return (
      <div className="break-words ">
        You proposed to buy a NFT which token ID is {tx.tokenId} on contract{" "}
        {tx.contract} in {tx.price} MATIC from{" "}
        <span className="text-yellow-400">{tx.owner}</span>. Waiting to reply...
      </div>
    );
  }

  if (tx.action === "OwnerProposed") {
    return (
      <div className="w-full">
        <div className="w-full break-words ">
          <span className="text-yellow-400">{tx.owner}</span> proposed to sell
          you a NFT which token ID is {tx.tokenId} on contract {tx.contract} in{" "}
          {tx.price} MATIC.Do you agree?
        </div>
        <div className="mt-2 flex justify-center gap-3">
          <button
            className="px-2  border border-gray-400"
            onClick={() => props.buyerDeny()}
          >
            No
          </button>
          <button
            className="px-2  border border-gray-400"
            onClick={() => props.buyerAgree(tx)}
          >
            Yes
          </button>
        </div>
      </div>
    );
  }

  if (tx.action === "SellerAgree") {
    return (
      <div className="w-full">
        <div className="w-full break-words ">
          <span className="text-yellow-400">{tx.seller}</span> agree on your
          proposal. Please execute the transfer process!
        </div>
        <div className="mt-2 flex justify-center">
          <button
            className="px-2  border border-gray-400 rounded-lg"
            onClick={() => props.executeTransfer(tx)}
          >
            Execute
          </button>
        </div>
      </div>
    );
  }
};

interface TransactionModalProps {
  setModalOn: Function;
  proposedNftTx: any;
  handleSendMessage: Function;
}

export const TransactionModal = (props: TransactionModalProps) => {
  const proposedNftTx = props.proposedNftTx;
  const [price, setPrice] = useState<number>(0);
  const { address } = useAccount();

  const closeModal = () => {
    props.setModalOn(false);
    setPrice(0);
  };

  const handlePriceChange = (e: any) => {
    setPrice(e.target.value);
  };

  const proposeTx = async (action: string) => {
    props.handleSendMessage({ ...proposedNftTx, price: Number(price), action });
    if (action === "OwnerProposed") {
      const res = await setNftApproval(
        proposedNftTx.contract,
        proposedNftTx.tokenId
      );
    }

    props.setModalOn(false);
  };

  return (
    <div className="fixed top-32 left-1/2 -translate-x-1/2 bg-blue-950 w-[90%] rounded-lg flex flex-col items-center p-2 text-white">
      <button
        className="fixed top-2 right-2 font-bold text-2xl  z-20"
        onClick={closeModal}
      >
        <AiOutlineClose />
      </button>
      <div className="w-full text-center font-bold text-xl">
        {proposedNftTx.seller === address ? "Sell" : "Buy"} NFT
      </div>
      <div className="w-full">
        From: <br />
        <span className="w-full break-words text-yellow-400">
          {proposedNftTx.seller}
        </span>
      </div>
      <div className="mt-2 w-full">
        To: <br />
        <span className="w-full break-words text-yellow-400">
          {proposedNftTx.buyer}
        </span>
      </div>
      <div className="mt-2 w-full">
        Contract: <br />
        {proposedNftTx.contract}
      </div>
      <div className="mt-2 w-full">token ID:{proposedNftTx.tokenId}</div>
      <div className="mt-2 w-full flex gap-1">
        <label className="">Price:</label>
        <input
          type="text"
          name="price"
          value={price}
          className="px-1 rounded-lg bg-transparent border w-16 border-white text-center"
          onChange={handlePriceChange}
        />
        <p>MATIC</p>
      </div>
      <Image
        className="mt-2 w-30 h-30 rounded-lg"
        src={proposedNftTx.image}
        alt="NFT"
        width={20}
        height={20}
        priority
      />
      <button
        type="button"
        className="mt-2 border-2 border-white  px-2 py-1 rounded-full"
        onClick={() =>
          proposeTx(
            proposedNftTx.seller === address ? "OwnerProposed" : "BuyerProposed"
          )
        }
      >
        Propose
      </button>
    </div>
  );
};
