"use client";

import { useSearchParams } from "next/navigation";


type EndpointTypes = "mainnet" | "devnet" | "localnet";

export default function useQueryContext() {
  const searchParams = useSearchParams();
  const cluster = searchParams.get("cluster");

  const endpoint = (cluster as EndpointTypes) || "mainnet";
  const hashClusterOption = endpoint !== "mainnet";

  const fmtUrlWithCluster = (url: string) => {
    if (hashClusterOption) {
      const mark = url.includes("?") ? "&" : "?";
      return decodeURIComponent(`${url}${mark}cluster=${endpoint}`);
    }
    return url;
  };

  return { fmtUrlWithCluster };
}