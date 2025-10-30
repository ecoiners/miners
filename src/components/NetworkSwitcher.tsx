import { FC } from "react";
import dynamic from "next/dynamic";
import { useNetworkConfiguration } from "../context/NetworkConfigurationProvider";

const NetworkSwitcher: FC = () => {
  const { networkConfiguration, setNetworkConfiguration } = useNetworkConfiguration();

  return (
    <div className="relative">
      <select
        value={networkConfiguration}
        onChange={(e) => setNetworkConfiguration(e.target.value || "devnet")}
        className="appearance-none text-sm font-medium rounded-lg border border-green-500/20 bg-slate-800/60 px-3 py-1.5 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all cursor-pointer"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(16,185,129,0.25), rgba(20,184,166,0.25))",
        }}
      >
        <option value="mainnet-beta" className="bg-slate-900">Mainnet</option>
        <option value="devnet" className="bg-slate-900">Devnet</option>
        <option value="testnet" className="bg-slate-900">Testnet</option>
      </select>
    </div>
  );
};

export default dynamic(() => Promise.resolve(NetworkSwitcher), { ssr: false });


/* v1
import { FC } from "react";
import dynamic from "next/dynamic";

// internal import 
import {
	useNetworkConfiguration
} from "../context/NetworkConfigurationProvider";
import NetworkSwitcherSVG from "./SVG/NetworkSwitcherSVG";

const NetworkSwitcher: FC = () => {
	const {
		networkConfiguration,
		setNetworkConfiguration
	} = useNetworkConfiguration();
	
	return (
		<>
		  <input type="checkbox" id="checkbox" />
			<label className="switch bg-transparent rounded-md">
			  <select
				  value={networkConfiguration}
					onChange={(e) => setNetworkConfiguration(e.target.value || "devnet")}
					className="select max-w-xs border-none rounded-md bg-transparent "
				>
				  <option value="mainnet-beta">Mainnet</option>
					<option value="devnet">Devnet</option>
					<option value="testnet">Testnet</option>
				</select>
			</label>
		</>
	);
};

export default dynamic(() => Promise.resolve(NetworkSwitcher), {
	ssr: false
});
*/