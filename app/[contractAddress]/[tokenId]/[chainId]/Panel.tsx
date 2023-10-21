/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";

interface Props {
  className?: string;
  chainId: number;
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
      Scratch your way to 
          <span className="text-coral-red"> Exciting  Rewards </span>

        </h3>
      <div className="mt-32">
        <hr />
      </div>

      <div className="flex justify-center">
      <img className="w-[50%]" src="https://i.ibb.co/zrS9ZGc/image.png" />

        {/* <ul className="custom-scroll grid grid-cols-3 gap-2 overflow-y-auto">
          <img className="list-none" src="https://i.ibb.co/zrS9ZGc/image.png" />
          <img className="list-none" src="https://i.ibb.co/ZJqW4HD/image.png" />
          <img className="list-none" src="https://i.ibb.co/zGNcvsk/image.png" />

        </ul> */}
      </div>

    </div>
  );
};
