"use client";

import { useNetworkConfiguration } from "@/context/network-configuration-provider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function NetworkSwitcher() {
  const { networkConfiguration, setNetworkConfiguration } = useNetworkConfiguration();

  return (
    <div className="relative">
      <Select
        value={networkConfiguration}
        onValueChange={(value) => setNetworkConfiguration(value)}
      >
        <SelectTrigger
          className="w-[60px] text-sm font-medium text-white  
          bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 
          rounded-lg transition-all shadow-sm"
        >
          <SelectValue placeholder="Select Network" />
        </SelectTrigger>

        <SelectContent className="bg-slate-900/60 text-white ">
          <SelectItem value="mainnet-beta">Mainnet</SelectItem>
          <SelectItem value="devnet">Devnet</SelectItem>
          <SelectItem value="testnet">Testnet</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}