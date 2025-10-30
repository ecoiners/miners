import { FC } from "react";
import dynamic from "next/dynamic";
import { useNetworkConfiguration } from "../context/NetworkConfigurationProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const NetworkSwitcher: FC = () => {
  const { networkConfiguration, setNetworkConfiguration } = useNetworkConfiguration();

  const networks = [
    { value: "mainnet-beta", label: "Mainnet", status: "live", color: "bg-green-500" },
    { value: "devnet", label: "Devnet", status: "development", color: "bg-blue-500" },
    { value: "testnet", label: "Testnet", status: "testing", color: "bg-yellow-500" },
  ];

  const getCurrentNetwork = () => {
    return networks.find(net => net.value === networkConfiguration) || networks[1];
  };

  const currentNetwork = getCurrentNetwork();

  return (
    <div className="flex items-center gap-2">
      {/* Mobile Badge Version */}
      <div className="sm:hidden">
        <Badge 
          variant="outline"
          className={`
            border-green-500/30 text-white text-xs px-3 py-1.5 font-medium
            ${currentNetwork.value === "mainnet-beta" ? "bg-green-500/20 border-green-500/50" : ""}
            ${currentNetwork.value === "devnet" ? "bg-blue-500/20 border-blue-500/50" : ""}
            ${currentNetwork.value === "testnet" ? "bg-yellow-500/20 border-yellow-500/50" : ""}
          `}
        >
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${currentNetwork.color}`} />
            {currentNetwork.label}
          </div>
        </Badge>
      </div>

      {/* Desktop/Tablet Select Version */}
      <div className="hidden sm:block">
        <Select
          value={networkConfiguration}
          onValueChange={(value) => setNetworkConfiguration(value || "devnet")}
        >
          <SelectTrigger className={`
            w-[140px] md:w-[160px] text-sm font-medium border bg-slate-800/60 
            text-white focus:ring-2 focus:ring-green-500 transition-all hover:bg-slate-800/80
            backdrop-blur-sm
            ${currentNetwork.value === "mainnet-beta" ? "border-green-500/40 hover:border-green-500/60" : ""}
            ${currentNetwork.value === "devnet" ? "border-blue-500/40 hover:border-blue-500/60" : ""}
            ${currentNetwork.value === "testnet" ? "border-yellow-500/40 hover:border-yellow-500/60" : ""}
          `}>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${currentNetwork.color}`} />
              <SelectValue>
                <span className="text-white">{currentNetwork.label}</span>
              </SelectValue>
            </div>
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border border-green-500/20 backdrop-blur-md">
            {networks.map((network) => (
              <SelectItem 
                key={network.value} 
                value={network.value}
                className="text-white hover:bg-slate-800/60 focus:bg-slate-800/60 focus:text-green-400"
              >
                <div className="flex items-center gap-2 py-1">
                  <div className={`w-2 h-2 rounded-full ${network.color}`} />
                  <span>{network.label}</span>
                  <Badge 
                    variant="secondary" 
                    className={`
                      ml-auto text-xs px-1.5 py-0 h-4
                      ${network.value === "mainnet-beta" ? "bg-green-500/20 text-green-400" : ""}
                      ${network.value === "devnet" ? "bg-blue-500/20 text-blue-400" : ""}
                      ${network.value === "testnet" ? "bg-yellow-500/20 text-yellow-400" : ""}
                    `}
                  >
                    {network.status}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(NetworkSwitcher), { ssr: false });