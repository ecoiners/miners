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
          className="w-[140px] text-sm font-medium text-white border border-green-500/30 
          bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 
          focus:ring-2 focus:ring-emerald-400 rounded-lg transition-all shadow-sm"
        >
          <SelectValue placeholder="Select Network" />
        </SelectTrigger>

        <SelectContent className="bg-slate-900 text-white border border-emerald-500/20">
          <SelectItem value="mainnet-beta">Mainnet</SelectItem>
          <SelectItem value="devnet">Devnet</SelectItem>
          <SelectItem value="testnet">Testnet</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}