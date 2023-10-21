"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { isNil } from "lodash";
import { TokenboundClient } from "@tokenbound/sdk";
import { useNft } from "@/lib/hooks";
import { TbaOwnedNft } from "@/lib/types";
import { TokenDetail } from "./TokenDetail";
import { HAS_CUSTOM_IMPLEMENTATION } from "@/lib/constants";

interface TokenParams {
  params: {
    tokenId: string;
    contractAddress: string;
    chainId: string;
  };
  searchParams: {
    disableloading: string;
    logo?: string;
  };
}

export default function Token({ params, searchParams }: TokenParams) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [nfts, setNfts] = useState<TbaOwnedNft[]>([]);
  const [lensNfts, setLensNfts] = useState<TbaOwnedNft[]>([]);
  const { tokenId, contractAddress, chainId } = params;
  const { disableloading, logo } = searchParams;
  const [showTokenDetail, setShowTokenDetail] = useState(false);
  const chainIdNumber = parseInt(chainId);
  const tokenboundClient = new TokenboundClient({ chainId: chainIdNumber });

  const {
    data: nftImages,
    nftMetadata,
    loading: nftMetadataLoading,
  } = useNft({
    tokenId: parseInt(tokenId as string),
    contractAddress: params.contractAddress as `0x${string}`,
    hasCustomImplementation: HAS_CUSTOM_IMPLEMENTATION,
    chainId: chainIdNumber,
  });

  useEffect(() => {
    if (!isNil(nftImages) && nftImages.length) {
      const imagePromises = nftImages.map((src: string) => {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = resolve;
          image.onerror = reject;
          image.src = src;
        });
      });

      Promise.all(imagePromises)
        .then(() => {
          setImagesLoaded(true);
        })
        .catch((error) => {
          console.error("Error loading images:", error);
        });
    }
  }, [nftImages, nftMetadataLoading]);


  

  const showLoading = disableloading !== "true" && nftMetadataLoading;

  return (
    <div className="h-screen w-screen bg-slate-100">
      <div className="max-w-screen relative mx-auto aspect-square max-h-screen overflow-hidden bg-white">
        <div className="relative h-full w-full">

            <TokenDetail
              isOpen={showTokenDetail}
              handleOpenClose={setShowTokenDetail}
              chainId={chainIdNumber}
              logo={logo}
            />
          <div className="max-h-1080[px] relative h-full w-full max-w-[1080px]">
            {showLoading ? (
              <div className="absolute self-center left-[45%] top-[50%] z-10 h-20 w-20 -translate-x-[50%] -translate-y-[50%] animate-bounce">
                {/* <TbLogo /> */}
                <img src="https://cdn-icons-png.flaticon.com/512/5736/5736436.png" />
              </div>
            ) : (
              <div
                className={`bg-white h-full w-full grid grid-cols-1 grid-rows-1 transition ${imagesLoaded ? "" : "blur-xl"
                  }`}
              >
                {!isNil(nftImages) ? (
                  <>
                    <div className="bg-[url(https://s3.amazonaws.com/ionic-marketplace/cordova-plugin-scratch/icon.jpg)] bg-cover">
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
