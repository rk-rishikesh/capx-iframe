import { Variants, motion } from "framer-motion";
import { GalverseLogo, TokenboundLogo } from "@/components/icon";
import { Panel } from "./Panel";

interface Props {
  className?: string;
  isOpen: boolean;
  handleOpenClose: (arg0: boolean) => void;
  chainId: number;
  logo?: string;
}

const variants = {
  closed: { y: "100%", transition: { duration: 0.75 } },
  open: { y: "0", transition: { duration: 0.75 }, height: "85%" },
} as Variants;

const iconVariant = {
  hover: {
    opacity: 1,
    boxShadow: "0px 1px 14px 0px rgba(0, 0, 0, 0.12)",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  unHovered: {
    opacity: 0.7,
    boxShadow: "none",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

type LogoType = {
  [logo: string]: any;
};

const Logo: LogoType = {
  DEFAULT: TokenboundLogo,
  GALVERSE: GalverseLogo,
};

export const TokenDetail = ({
  className,
  isOpen,
  handleOpenClose,
  chainId,
  logo,
}: Props) => {
  let currentAnimate = isOpen ? "open" : "closed";

  return (
    <div className={className}>
      <motion.div
        className="absolute left-4 top-4 z-10 rounded-full cursor-pointer"
        whileHover="hover"
        variants={iconVariant}
        initial="unHovered"
      >
        {/* <CustomLogo onClick={() => handleOpenClose(!isOpen)} /> */}

        <button onClick={() => handleOpenClose(!isOpen)} className="border-coral-red bg-coral-red flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none rounded-full  text-white  w-full">
          480 🥤 TOKENS
        </button>

      </motion.div>
      {isOpen && (
        <motion.div
          className={`absolute max-w-[1080px] z-10 w-full bottom-0 overflow-y-auto custom-scroll`}
          animate={currentAnimate}
          variants={variants}
          initial="closed"
        >
          <Panel
            chainId={chainId}
          />
        </motion.div>
      )}
    </div>
  );
};
