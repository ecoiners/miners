import { holesky } from "wagmi/chains";
import { getDefault } from "@rainbow-me/rainbowkit";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

export const config = getDefault({
	appName: "ECROP 100",
	projectId: projectId,
	chains: [holesky],
	ssr: true
});