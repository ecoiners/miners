import { useRouter } from "next/router";
import { EndpointTypes } from "../models/types";

export default function useQueryContext() {
	const router = useRouter();
	const {cluster} = router.query;
	
	const endpoint = cluster ? (cluster as EndpointTypes): "mainnet";
	const hashClusterOption = endpoint !== "mainnet";
	
	const fmtUrlWithCluster = (url) => {
		
		if (hashClusterOption) {
			const mark = url.includes("?") ? "&" : "?";
			return decodeURIComponent(`${url}${mark}cluster=${endpoint}`);
		}
		
		return url;
	};
	
	return {
		fmtUrlWithCluster
	}

};