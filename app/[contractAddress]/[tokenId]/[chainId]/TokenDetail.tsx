import { Variants, motion } from "framer-motion";
import { GalverseLogo, TokenboundLogo } from "@/components/icon";
import { Panel } from "./Panel";
import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";
import {useEffect, useState}  from "react";

interface Props {
  className?: string;
  isOpen: boolean;
  handleOpenClose: (arg0: boolean) => void;
  chainId: number;
  tokenId:number;
  logo?: string;
}

interface TableData {
  tokenid: number;
  tokenvalue: number;
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
  tokenId,
  logo,
}: Props) => {
  let currentAnimate = isOpen ? "open" : "closed";
  const [tokenVal, setTokenVal] = useState(0);

  useEffect(() => {

    async function fetchData() {
      try {
    
        const privateKey =
          "59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";
        const wallet = new Wallet(privateKey);
        // To avoid connecting to the browser wallet (locally, port 8545).
        // For example: "https://polygon-mumbai.g.alchemy.com/v2/YOUR_ALCHEMY_KEY"
        const provider = getDefaultProvider("https://polygon-mumbai.g.alchemy.com/v2/YLn2OY6C8bmGyCuiBSMahWkGW0T0sTf6");
        const signer = wallet.connect(provider);
    
        const db = new Database({ signer });
        const tableName = "tokendata_80001_8072";
        
        if (tableName !== undefined) {
          const { results } = await db
            .prepare(`SELECT * FROM ${tableName}`)
            .all<TableData>();
          console.log(`Read data from table '${tableName}':`);
          console.log(results[tokenId].tokenvalue);
          console.log(tokenId)
          setTokenVal(results[tokenId].tokenvalue);
        }
      } catch (err: any) {
        console.error(err.message);
      }
  

    }
    fetchData();
  }, []); 

  return (
    <div className={className}>
      <motion.div
        className="absolute left-4 top-4 z-10 rounded-full cursor-pointer"
        whileHover="hover"
        variants={iconVariant}
        initial="hovered"
      >
        {/* <CustomLogo onClick={() => handleOpenClose(!isOpen)} /> */}

        <button onClick={() => handleOpenClose(!isOpen)} className="border-slate-gray bg-slate-gray flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none rounded-full  text-white  w-full">
          {tokenVal} USD 💰
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
