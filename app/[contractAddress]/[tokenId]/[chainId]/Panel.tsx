/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";


interface Props {
  className?: string;
  chainId: number;
}

interface TableData {
  tokenid: number;
  tokenvalue: number;
}

export const Panel = ({
  className,
  chainId,
}: Props) => {

  return (
    <div
      className={clsx(
        className,
        "custom-scroll h-full space-y-3 overflow-y-auto rounded-t-xl border-t-0 bg-white px-5 pt-5"
      )}
    >
      <div className="mb-4 flex w-full items-center justify-center">
        <div className="h-[2.5px] w-[34px] bg-[#E4E4E4]"></div>
      </div>
      <h3 className="mt-16 font-palanquin text-center text-4xl font-bold text-slate-gray">
        Your highway to
        <span className="text-coral-red"> Exciting  Rewards </span>

      </h3>
      <div className="mt-32">
        <hr />
      </div>

      <div className="flex justify-center">
        <img className="w-[50%]" src="https://bafybeihsdfvdfbj4xe7w4syiysathqpnuzaxve6yi5a2f6uczy7ogsuf3a.ipfs.nftstorage.link/" />
      </div>


      <div className={"h-full"}>
        <p className="text-center text-sm text-gray-500">This coupon NFT can be redeemed on INVOICFY and is valid till 31/12/23</p>
      </div>

    </div>
  );
};
